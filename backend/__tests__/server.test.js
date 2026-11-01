import request from "supertest";
import app from "../server.js"
import { test, expect, beforeAll } from "vitest";

let token;

beforeAll(async () => {
    const data = { username: "beforealluser", password: "testpassword" }
    const response = await request(app).post("/users").send(data);
    expect(response.status).toBe(201)

    const data2 = { username: "beforealluser", password: "testpassword" }
    const response2 = await request(app).post("/sessions").send(data2);
    
    token = response2.body.token;
    expect(token).toBeTruthy();
    expect(response2.status).toBe(200)
})

// Healthy endpoint
test("Healthy endpoint gives correct response", async () => {
    const response = await request(app).get("/healthy");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Port up and running.");
})

// Registration
test("Can create account", async () => {
    const data = { username: "testusername", password: "testpassword" }
    const response = await request(app).post("/users").send(data);

    expect(response.status).toBe(201)
})

// Login
test("Incorrect login credentials", async () => {
    const data = { username: "testusername", password: "WRONGtestpassword" }
    const response = await request(app).post("/sessions").send(data);

    expect(response.status).toBe(401)
})

test("Functional login", async () => {
    const data = { username: "testusername", password: "testpassword" }
    const response = await request(app).post("/sessions").send(data);

    expect(response.status).toBe(200)
})


// Logout

// Authentication

// Favourites
// test("Functional adding of favourite", async () => {
//     const data = { dinoID: "tyrannosaurus" }
//     const response = await request(app).post("/favourites/tyrannosaurus").send(data);

//     expect(response.status).toBe(200)
// })

// test("Functional retrieving of favourites", async () => {
//     const response = await request(app).get("/favourites").send(data);

//     expect(response.status).toBe(200)
// })

// test("Functional removing of favourite", async () => {
//     const data = { dinoID: "tyrannosaurus" }
//     const response = await request(app).delete("/favourites/tyrannosaurus").send(data);

//     expect(response.status).toBe(200)
// })

// Results

// Updating username


