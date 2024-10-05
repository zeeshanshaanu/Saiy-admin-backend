import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import DBconnection from './config/dbConnection.js';
import userRoutes from "./routes/auth/Auth-routes.js"
////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Policy
app.use(cors());

// DB-Connection
DBconnection(DATABASE_URL)

// Load Routes
app.use("/api/user", userRoutes);

////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
app.listen(port, () => {
    console.log(`Server listening at http://localhost/:${port}`)
})
