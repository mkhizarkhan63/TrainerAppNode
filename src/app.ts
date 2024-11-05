import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express'; // Import express and types
import sequelize, { testConnection } from './database/connection';
import './models/_associations';
import cors from 'cors';
import path from 'path';

const app = express();

dotenv.config();
// Define a port
const port = process.env.PORT || 3001;

// Wrap the logic inside an async function
const startServer = async () => {

    await testConnection(); // Call your async function here

    // Sync all models with the database
    //await sequelize.sync({ alter: true, force: false });

    // Serve files in the 'uploads' folder statically
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

    app.use(cors());
    // Middleware to parse incoming requests with JSON
    app.use(express.json());

    // Import route files
    const Routes = require('./routes/routes');

    // Use the routes
    app.use(Routes);


    // Basic route
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello World from Express!');

    });


    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

// Call the async function to start the server
startServer().catch(err => {
    console.error('Error starting the server:', err);
});