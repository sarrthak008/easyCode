import e from "cors";
import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_CONNECT_URI);
        if (!connection) {
            console.log('connecting error...')
        } else {
            console.log('connected to database...')
        }
    } catch (error) {
        console.log(error)
    }
}

export default connectToDb