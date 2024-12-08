import mongoose from "mongoose";

type connectionObject = {
    isconnected?:number;
}
const connection :connectionObject = {}

async function dbconnect(): Promise<void> {
    if(connection.isconnected){
        console.log("db is already connected");
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {})
        connection.isconnected = db.connections[0].readyState;

        console.log("database connected successfully")
    } catch (error) {
        console.error("database connection error", error);
        process.exit(1);
    }
}

export default dbconnect