import mongoose from 'mongoose';

const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_CONNECT_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (connection) {
      console.log('Connected to database...');
    }
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

export default connectToDb;
