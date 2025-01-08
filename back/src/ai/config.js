import fs from 'fs';
import path from "path";

export const readPrompts = async () => {
    const data = fs.readFileSync(path.join(import.meta.dirname, "prompts.json"));
    return JSON.parse(data)
}