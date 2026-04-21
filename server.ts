import 'dotenv/config'
import app from "./src/app.ts";
import connectDb from './src/db/db.ts';

const PORT = process.env.PORT;

connectDb();

app.listen(PORT, ()=>{
    console.log("server is running on PORT: ", PORT);
})