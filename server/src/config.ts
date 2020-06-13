import dotenv from 'dotenv'
dotenv.config()

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    dbUri: process.env.MONGODB_URL || 'mongodb://localhost:27017/familyProud',
    logFormat: 'short',
    cors: {
        origin: true,
        credentials: true
    }
}

export default config;
