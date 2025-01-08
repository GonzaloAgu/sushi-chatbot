import { SchemaType } from "@google/generative-ai"

export default class GeminiResponseSchemas {
    static default = {
        type: SchemaType.STRING,
        message: SchemaType.STRING,
        list: SchemaType.ARRAY
    }

    static productList = {
        type: SchemaType.STRING,
        productos: [
            {
                nombre: SchemaType.STRING,
                precio: SchemaType.NUMBER
            }
        ]
    }
}