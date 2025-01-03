import express from 'express';
import router from './src/routes.js'
import { initDb } from './src/database.js';
import { geminiTest } from './src/gemini.js';


const PORT = 8080;
const app = express();

initDb()

app.use(router)

app.on('error', (error) => {
    console.error("An error occurred:", error);
});

app.listen(PORT, () => {
    console.log("Server listening on PORT", PORT);
})
