import mongoose, {ConnectOptions} from "mongoose";
import colors from "colors";
import {Product} from "../../models";

export const ProductInstance = new Product();

export const initDatabase = async () => {
  const mongoDB = process.env['MONGODB_CONNECT_STRING']
    || colors.bgRed("There is nothing we can do :( (failed to obtain DB connection string)\n@napoleon");

  console.log(colors.bgGreen("Database connection string: " + mongoDB));

  mongoose.connection.on('connected', () => {
    console.log(colors.bgGreen('Connected to MongoDB!'));
  });

  mongoose.connection.on('error', (err) => {
    console.log(colors.bgRed('Error occurred while connecting to MongoDB.'));
    console.error(err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB.');
  });

  try {
    await mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true} as ConnectOptions);
    return true;
  } catch (err) {
    console.error(new Error("MongoDB Connection Error"));
    return false;
  }
}