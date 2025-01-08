import { sendMessage } from "../ai/gemini.js"

export const sendChat = async (req, res) => {
    try {
        const response = await sendMessage(req.body.message);
        return res.json({message: response})
    } catch (e) {
        console.error("Error al comunicarse con la IA: ", e)
        return res.status(500).json({message: "Se produjo un error al comunicarse con la IA."})
    }
}