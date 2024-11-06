"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express")); // Import express and types
const connection_1 = require("./database/connection");
require("./models/_associations");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
dotenv_1.default.config();
// Define a port
const port = process.env.PORT || 3001;
// Wrap the logic inside an async function
const startServer = async () => {
    await (0, connection_1.testConnection)(); // Call your async function here
    // Sync all models with the database
    // await sequelize.sync({ alter: true, force: false });
    // Serve files in the 'uploads' folder statically
    app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
    app.use((0, cors_1.default)());
    // Middleware to parse incoming requests with JSON
    app.use(express_1.default.json());
    // Import route files
    const Routes = require('./routes/routes');
    // Use the routes
    app.use(Routes);
    // Basic route
    app.get('/', (req, res) => {
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
