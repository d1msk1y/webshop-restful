import mongoose, {ConnectOptions} from "mongoose";
import colors from "colors";



export const initDatabase = async () => {
  const mongoDB = process.env['MONGODB_CONNECT_STRING']
    || colors.bgRed("There is nothing we can do :( (failed to obtain DB connection string)\n@napoleon");
  console.log(colors.bgGreen("Database connection string: " + mongoDB));
  try {
    await mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true} as ConnectOptions);

  } catch (err) {
    console.log('Failed to connect to database')
    console.error(err);
  }
}