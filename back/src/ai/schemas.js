import { SchemaType } from "@google/generative-ai"

export default class GeminiResponseSchemas {
    static default = {
        description: "Respuesta predeterminada del modelo",
        type: SchemaType.OBJECT,
        properties: {
                tipo: {
                    type: SchemaType.STRING,
                    description: "Tipo de mensaje que envio el usuario (Puede ser igual a alguno de los siguientes tres: 'orden', 'menu',  'otro')",
                    nullable: false
                },
                mensaje: {
                    type: SchemaType.STRING,
                    description: "Mensaje a escribirle al usuario en la respuesta",
                    nullable: false
                },
                orden: {
                    type: SchemaType.ARRAY,
                    description: "Listado de productos solicitados por el usuario",
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            nombre: {
                                type: SchemaType.STRING,
                                description: "Nombre del producto solicitado"
                            },
                            cantidad: {
                                type: SchemaType.NUMBER,
                                description: "Cantidad solicitada del producto"
                            }
                        }
                    },
                    nullable: true
                }
            },
        required: ["tipo", "mensaje"]
        
    }

    static productList = {
        type: SchemaType.STRING,
        productos: SchemaType.ARRAY
    }
}