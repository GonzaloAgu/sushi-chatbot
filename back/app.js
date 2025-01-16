import express from 'express';
import router from './src/routes.js'
import cors from "cors"
import { initDb } from './src/db/database.js';


const PORT = 8080;
const app = express();

initDb()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use(router)

app.on('error', (error) => {
    console.error("An error occurred:", error);
});

app.listen(PORT, () => {
    console.log("Server escuchando en http://localhost:" + PORT);
})
