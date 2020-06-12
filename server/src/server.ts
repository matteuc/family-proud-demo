import express from "express";
import http from "http";
import mongoose from "mongoose"
import cors from "cors";
import path from "path";
import compress from "compression";

import config from "./config"
import router from "./routes"

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')))

// Middleware
app.use(compress())
app.use(cors(config.cors))
app.use(express.json())
app.use(express.urlencoded({ 'extended': true }))

// Establish Routes
app.use('/api', router)

// Connect to the MongoDB instance
mongoose.connect(config.dbUri, err => {
    // If database fails to connect, stop the program and DON'T start the server
    if (err) {
        console.error('Database connection failure:', err.message)
        process.exit(1)
    }
    console.log('Connected to database', config.dbUri)

    // Start the server
    server.listen(config.port, () => console.log(`Server running on port ${config.port}`))
})
