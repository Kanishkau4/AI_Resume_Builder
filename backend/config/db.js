import mongoose from "mongoose";

const connectDB = async () => {
    try {
        let mongoURI = process.env.MONGODB_URL;

        const dbName = "Project_0";

        if (!mongoURI) {
            throw new Error("Please provide MONGODB_URL in the .env file");
        }

        if (mongoURI.endsWith("/")) {
            mongoURI = mongoURI.slice(0, -1);
        }

        // Sometimes the URI might already have a database name or query params
        // But assuming it's a base URI like mongodb://localhost:27017 or similar mongodb+srv://... 

        const connectUri = `${mongoURI}/${dbName}`;

        const conn = await mongoose.connect(connectUri);
        console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
