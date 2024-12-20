import mongoose from "mongoose";

const connectToDb = async () => {
    const connection =await  mongoose.connect(process.env.MONGO_CONNECT_URI);
    if(!connection){
        console.log('connecting error...')
    }else{
        console.log('connected to database...')
    }
}

export default connectToDb