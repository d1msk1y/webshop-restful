import mongooseReal from 'mongoose';
import {initDatabase} from "../../services/db";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();


describe('initDatabase', () => {
  it('should return true on successful connection', async () => {
    const result = await initDatabase();
    expect(result).toBe(true);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
