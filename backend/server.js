import express from 'express';
import cors from 'cors';
import mysql from "mysql2/promise"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.PORT || 3001;

const secret = process.env.JWT_SECRET;

if (!secret || Buffer.byteLength(secret, "utf8") < 32) {
    throw new Error("JWT_SECRET måste vara minst 32 byte");
}

app.use(express.json());
app.use(cors());

app.get("/healthy", (req, res) => {
    res.status(200).send("Port up and running.")
});

const pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
});

async function query(sql, params) {
    const [results] = await pool.execute(sql, params);
    return results
}

function requireAuth(req, res, next) {
    const match = /^Bearer (.+)$/.exec(req.get("authorization") ?? "");
    if (!match) return res.status(401).json({ error: "Missing token." })
    const token = match[1];

    try {
        const decoded = jwt.verify(token, secret, {
            algorithms: ['HS256'],
            issuer: "dino-appen",
            audience: "dino-appen-api"
        })
        if (typeof decoded !== "object" || decoded == null || typeof decoded.sub !== "string" || Number(decoded.sub) <= 0 || !Number.isSafeInteger(Number(decoded.sub))) {
            return res.status(401).send("Invalid token.")
        }
        const userID = Number(decoded.sub);
        req.userID = userID;
        next();
    }
    catch (error) {
        return res.status(401).send("Invalid or expired token.")
    }
}


//////////////////////////// LOGIN + REGISTRATION //////////////////////////// 

app.post("/users", async (req, res) => {
    const { username, password } = req.body;
    if (password.length < 8) {
        return res.status(400).send("The password needs to be 8 or more characters.");
    }
    try {
        const passwordHash = await bcrypt.hash(password, 12);

        const createUserSQL = "INSERT INTO users (username, passwordHash) VALUES (?, ?)";
        const createUserParams = [username, passwordHash];
        await query(createUserSQL, createUserParams)

        res.send("User created.")
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Failed to create user.")
    }
});

app.post("/sessions", async (req, res) => {
    const { username, password } = req.body;

    try {
        const signInSQL = "SELECT * FROM users WHERE username = ?";
        const signInResult = await query(signInSQL, [username])

        if (signInResult.length === 0) {
            return res.status(401).json({ error: "Wrong username or password." })
        }

        const correctPassword = await bcrypt.compare(password, signInResult[0].passwordHash);
        if (!correctPassword) {
            return res.status(401).json({ error: "Wrong username or password." })
        }

        const userID = signInResult[0].userID;
        const token = jwt.sign({ sub: String(userID) }, secret, {
            algorithm: "HS256",
            issuer: "dino-appen",
            audience: "dino-appen-api",
            expiresIn: "15m",
        });

        const newSessionSQL = "INSERT INTO sessions (userID, token) VALUES (?, ?) ON DUPLICATE KEY UPDATE token = VALUES(token)";
        await query(newSessionSQL, [userID, token])

        res.status(200).json({
            "token": token
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Session could not be verified.")
    }
})

//////////////////////////// ACCOUNT INFO //////////////////////////// 

app.get("/account", requireAuth, async (req, res) => {
    const userID = req.userID;

    try {
        const userSQL = "SELECT created_at, username FROM users WHERE userID = ?"
        const userResult = await query(userSQL, [userID])

        if (userResult.length === 0) {
            return res.status(404).json({
                error: "No such user found."
            })
        }
        const resultSQL = "SELECT points, created_at, resultID FROM results WHERE userID = ? ORDER BY points DESC";
        const resultResult = await query(resultSQL, [userID]);

        const favSQL = "SELECT dinoID FROM favourites WHERE userID = ?";
        const favResult = await query(favSQL, [userID])

        return res.status(200).json({
            username: userResult[0].username,
            accountCreation: userResult[0].created_at,
            results: resultResult,
            favourites: favResult.map(fav => fav.dinoID)
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Failed to retrieve user information.")
    }
})

//////////////////////////// RESULTS //////////////////////////// 

app.post("/results", requireAuth, async (req, res) => {
    const { points } = req.body;
    const userID = req.userID;

    try {
        const createResultSQL = "INSERT INTO results (points, userID) VALUES (?, ?)";
        const createResultParams = [points, userID];
        await query(createResultSQL, createResultParams)

        const userSQL = "SELECT points, resultID FROM results WHERE userID = ? ORDER BY points DESC";
        const userResult = await query(userSQL, [userID]);

        const notTopThreeResults = userResult.slice(3);
        for (const singleResult of notTopThreeResults) {
            const singleResultSQL = "DELETE FROM results WHERE resultID = ? AND userID = ?";
            const singleResultParams = [singleResult.resultID, userID]
            await query(singleResultSQL, singleResultParams)
        }
        res.send("Result saved.")
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Failed to save result.")
    }
})

app.get("/results", requireAuth, async (req, res) => {
    const userID = req.userID;

    try {
        const userSQL = "SELECT points, created_at, resultID FROM results WHERE userID = ? ORDER BY points DESC";
        const userResult = await query(userSQL, [userID]);

        return res.status(200).json({
            "results": userResult
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send("User could not be verified.")
    }
})

//////////////////////////// FAVOURITES //////////////////////////// 

app.post("/favourites/:dinoID", requireAuth, async (req, res) => {
    const userID = req.userID;
    const dinoID = req.params.dinoID;

    try {
        const addFavSQL = "INSERT IGNORE INTO favourites (dinoID, userID) VALUES (?, ?)";
        await query(addFavSQL, [dinoID, userID])
        return res.status(200).json({
            message: "Favourite added."
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Failed to add to favourites.");
    }
});

app.delete("/favourites/:dinoID", requireAuth, async (req, res) => {
    const userID = req.userID;
    const dinoID = req.params.dinoID;

    try {
        const deleteFavSQL = "DELETE FROM favourites WHERE dinoID = ? AND userID = ?";
        await query(deleteFavSQL, [dinoID, userID])
        return res.status(200).json({
            message: "Favourite removed."
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Failed to remove from favourites.");
    }
});

app.get("/favourites", requireAuth, async (req, res) => {
    const userID = req.userID;

    try {
        const favSQL = "SELECT dinoID FROM favourites WHERE userID = ?";
        const favResult = await query(favSQL, [userID])

        return res.status(200).json({
            "favourites": favResult
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send("User could not be verified.")
    }
})


app.listen(port, () => {
    console.log(`The backend is running on http://localhost:${port}`);
});

