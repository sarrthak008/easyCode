import express, { urlencoded } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));

// CORS Configuration
app.use(cors({
    origin: ["http://localhost:5173", "https://www.easycode.support"],
    credentials: true,
}));

// Database Connection
import connectToDb from "./config/connectDB.js";

// Import Routers
import { authRouter } from "./routes/userAuth.js";
import { courseRouter } from "./routes/courseRoute.js";
import { requestRouter } from "./routes/requestRouter.js";
import { uploadRouter } from "./routes/uploadRouter.js";
import { quizRouter } from "./routes/quizRouter.js";
import { roleRouter } from "./routes/roleRoute.js";

// Utility Functions
import { responder } from "./utils/responder.js";

// Routes Setup
app.use('/api/auth', authRouter);
app.use('/api/course', courseRouter);
app.use('/api/request', requestRouter);
app.use('/api/image', uploadRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/role', roleRouter);

// Health Check Routes
app.get('/health', (req, res) => {
    responder(res, true, 'Server is running healthy', null, 200);
});

app.get('/connect', (req, res) => {
    responder(res, true, 'Connected to server', null, 200);
});

// 404 Route Handling
app.use("*", (req, res) => {
    responder(res, false, `${req.baseUrl} not found`, null, 404);
});

// Start Server and Connect to DB
app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
    connectToDb()
        .then(() => {
            console.log('Connected to the database');
        })
        .catch((err) => {
            console.error('Error connecting to the database:', err);
        });
});
