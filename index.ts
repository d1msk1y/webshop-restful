import express from 'express';
import colors from "colors";
import {initDatabase} from "./services/db";

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});

async function main() {
    await initDatabase();
    console.log("Hello World!");
}

main().then(() => {
    console.log(colors.bgGreen('Application executed successfully!'));
});