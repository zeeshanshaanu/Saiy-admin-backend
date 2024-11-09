import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import DBconnection from './config/dbConnection.js';
import userRoutes from "./routes/auth/Auth-routes.js";
import investorsRoutes from "./routes/Investors/Investors-route.js";
import portfolioRoutes from "./routes/portfolios/Portfolios-route.js";
import AssociateRoutes from "./routes/Associates/Associate-route.js";
import WithdrawalRoutes from "./routes/Withdrawals/Withdrawals-route.js";
import NotificationRoutes from "./routes/Notifications/Notifications-route.js";
import ActivityLogs from "./routes/Activity&Logs/ActivityLogs-route.js";

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
// app.use(
//     cors({
//         origin: [
//             "http://localhost:3000",
//             "https://spiffy-starburst-71ba6b.netlify.app"],
//         allowedHeaders: [
//             "Content-Type",
//             "Authorization",
//             "Cache-Control",
//             "Expires",
//             "Pragma",
//         ],
//         credentials: true,
//     })
// );

app.use(
    cors({
        origin: true,
        credentials: true,
        exposedHeaders: ["Content-Length", "Bearer"],
    })
);

// DB-Connection
DBconnection(DATABASE_URL)

// Load Routes
app.use("/api/user", userRoutes);
app.use("/api/investor", investorsRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/Associate", AssociateRoutes);
app.use("/api/Withdrawal", WithdrawalRoutes);
app.use("/api/notification", NotificationRoutes);
app.use("/api/entities", ActivityLogs);

app.get('/', (req, res) => {
    res.json({
        "path": "Home",
        "firstname ": "zeeshan",
        "lastname ": "zahoor updated",
        "lastname ": "zahoor",

    })
})


////////////////////////  **************************  /////////////////////////////
////////////////////////  **************************  /////////////////////////////
app.listen(port, () => {
    console.log(`Server listening at http://localhost/:${port}`)
})
