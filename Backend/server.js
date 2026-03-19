import { app } from "./index.js";
import dbConnect from "./Config/db.js";
dbConnect()
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server start `);
})