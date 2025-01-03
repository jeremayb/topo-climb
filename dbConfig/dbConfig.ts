import mongoose from "mongoose";

export async function connect(){

    try {

        if (mongoose.connection.readyState >= 1) {
            return;
          }

        console.log(process.env.NEXT_PUBLIC_MONGO_URI);
        mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI!)

        const connection = mongoose.connection

        connection.on('connect', () => {
            console.log("Connected to MongoDB.")
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error.', err)
            process.exit();
        })
    } catch (error){
        console.log("Error connecting to db.", error)
    }
}