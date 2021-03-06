import express from "express";
import http from "http";
import mongoose from "mongoose"
import cors from "cors";
import path from "path";
import compress from "compression";
import helmet from "helmet"

import config from "./config"
import router from "./routes"
import jsonErrorHandler from "./middleware/jsonErrorHandler";

const app = express()
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')))

// Middleware
app.use(compress())
app.use(helmet());
app.use(cors(config.cors))
app.use(express.json())
app.use(compress())
app.use(express.urlencoded({ 'extended': true }))

// Establish Routes
app.use('/api', router)

// Custom Error Middleware to send any errors back as JSON
app.use(jsonErrorHandler)

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
