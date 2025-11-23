import dbConnect from "./Config/db.js";
import { app } from "./index.js";

dbConnect()
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server start `);
})