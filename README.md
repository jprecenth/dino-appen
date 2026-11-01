# 🦖 Dino-appen

A dinosaur quiz application built as a school project (for my dino-obsessed nephew). The app allows users to create accounts, take dino quizzes, save favourite dinosaurs, and track their quiz results.

## Features

- User registration and login
- Secure password hashing
- Authentication using JSON Web Tokens (JWT)
- Quiz functionality and result tracking
- Save and remove favourite dinosaurs
- Update username
- View account information and statistics
- Persistent MySQL database

## Tech Stack

| Part | Technology |
|---|---|
| Mobile frontend | React Native |
| Mobile development | Expo |
| Backend | Node.js, Express |
| Database | MySQL 8.4 |
| Containerization | Docker, Docker Compose |
| Hosting | AWS EC2 |
| Web server / reverse proxy | Nginx |
| HTTPS | Certbot |
| Version control | GitHub |
| CI/CD | GitHub Actions |

## Project Structure

```text
dino-appen/
├── backend/
│   ├── __tests__/
│   ├── index.js
│   ├── server.js
│   ├── db.js
│   └── package.json
├── frontend/
│   ├── app/
│   ├── assets/
│   └── package.json
├── database/
│   ├── init.sql
│   └── init-test.sql
├── .github/
│   └── workflows/
│       └── deploy.yml
├── docker-compose.yml
└── .gitignore
```

## Architecture

The application consists of three main parts:

1. **Frontend:** The React Native application runs on mobile devices and communicates with the backend through HTTP requests.
2. **Backend:** The Express API handles authentication, database queries, quiz results, sessions, and favourite dinosaurs.
3. **Database:** MySQL stores user accounts, quiz results, sessions, and favourite dinosaurs.

The backend communicates with MySQL through a connection pool.

## Running the Project Locally

### Prerequisites

- Node.js and npm
- Docker and Docker Compose
- Expo Go on a mobile device
- Git

### 1. Clone the repository

```bash
git clone https://github.com/jprecenth/dino-appen.git
cd dino-appen
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Start the Expo development server

```bash
npx expo start
```

Follow the Expo instructions to open the application on your mobile device.

### 4. Start the backend and database

From the project root, start the Docker Compose services:

```bash
docker compose up --build -d
```

The backend and database use environment variables for their configuration. Make sure the required database credentials and JWT secret are configured before starting the services.

**Important:** The frontend must use an API URL that is reachable from the mobile device. When testing locally, this generally means using your computer's local network IP address rather than `localhost`.

## Database

The application uses MySQL 8.4.

The database is named `dinos` and contains the following tables:

| Table | Purpose |
|---|---|
| `users` | Stores user accounts and password hashes |
| `results` | Stores quiz results |
| `sessions` | Stores active user sessions |
| `favourites` | Stores users' favourite dinosaurs |

The database schema is initialized using `database/init.sql`.

A separate schema file, `database/init-test.sql`, is used for automated backend tests.

## Deployment

The application is deployed to an AWS EC2 instance using Docker Compose.

The deployment setup includes:

- Docker Compose to run the backend and MySQL containers
- Nginx as a reverse proxy
- DuckDNS for the application domain
- Certbot for HTTPS certificates

The mobile application communicates with the deployed backend through its HTTPS API endpoint.

## GitHub Actions – CI/CD

GitHub Actions automates testing and deployment whenever changes are pushed to the `master` branch.

The workflow consists of three jobs:

### 1. Frontend CI

- Checks out the repository
- Sets up Node.js
- Installs frontend dependencies
- Runs the frontend lint command

### 2. Backend CI

- Starts a temporary MySQL 8.4 service
- Installs backend dependencies
- Initializes a separate test database
- Runs automated backend tests using Vitest

The tests use a temporary database, keeping the production database separate.

### 3. Deployment

- Runs after the frontend and backend CI jobs succeed
- Connects to the EC2 instance through SSH
- Pulls the latest changes from GitHub
- Rebuilds and starts the backend Docker service

Deployment only runs for pushes to `master`, and only when the required CI jobs pass.

GitHub repository secrets are used for sensitive deployment configuration, including SSH credentials and the JWT secret.

## Environment Variables

The backend uses environment variables for configuration.

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `DB_HOST` | MySQL hostname |
| `DB_PORT` | MySQL port |
| `DB_NAME` | Database name |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `JWT_SECRET` | Secret used to sign JWTs |

Never commit real passwords, private keys, or JWT secrets to GitHub.

## Testing

Backend tests are written using **Vitest** and **Supertest**.

Run the backend tests from the `backend` directory:

```bash
npm test
```

The GitHub Actions workflow runs these tests automatically against a temporary MySQL database.

## Future Improvements

Potential future improvements include:

- Expanding the automated test coverage
- Adding more dinosaur quiz questions
- Improving the user experience and app design
- Adding further account and quiz statistics

---

**Dino-appen** 🦕

---

## Initial plan:

Dino-appen! 

Du kan: 

- Skapa ett konto / logga in, där tid och datum för skapat konto, användarnamn och hashat lösen sparas i ett table.
- Markera dinosaurier som sina favoriter (sparas i ett table) och kan ses på Profil-sidan
- Spela "Gissa dinosaurien" där man får en dinobild och ska svara vad den heter. Poängen och datum sparas i ett high score table och resultaten kan ses på Profil-sidan.

- Jag kommer börja med att sätta upp databasen och tables, samt skapa grundläggande sidor i React Native som navigeras med expo.
- Nästa steg efter det blir att bygga POST- och GET-funktioner.
- Jag kommer försöka göra liknande set-up som med Banksajten, med att hosta en instance på ec2.

![Skiss](/Dinoappen.png)

