const mongoose = require('mongoose');
const dotenv = require('dotenv');

const port = process.env.PORT
const API = process.env.DATABASE_URL

mongoose.set('strictQuery',false)

const app = require("./app")
dotenv.config();

async function main() {
    await mongoose.connect(API);
    console.log('connected to database');
    app.listen(port, () => console.log("Server is live at port 8000"))
};
main();
