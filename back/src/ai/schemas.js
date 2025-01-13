import { SchemaType } from "@google/generative-ai"
import { Schema } from "mongoose"

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
                }
            },
        required: ["tipo", "mensaje"]
        
    }

    static productList = {
        description: "Selecciona los productos del menu que fueron elegidos por el usuario en su mensaje",
        type: SchemaType.OBJECT,
        properties: {
            orden: {
                type: SchemaType.ARRAY,
                description: "Listado de productos solicitados por el usuario. Deben existir en el menu",
                items: {
                    type: SchemaType.OBJECT,
                    properties: {
                        objectId: {
                            type: SchemaType.STRING,
                            description: "ObjectId del producto seleccionado"
                        },
                        nombre: {
                            type: SchemaType.STRING,
                            description: "Nombre del producto solicitado"
                        },
                        cantidad: {
                            type: SchemaType.NUMBER,
                            description: "Cantidad solicitada del producto"
                        },
                        precioUnitario: {
                            type: SchemaType.NUMBER,
                            description: "Precio unitario del producto"
                        }
                    }
                },
                nullable: false
            },
            direccion: {
                type: SchemaType.STRING,
                description: "Dirección indicada por el cliente para realizar el envío. Consiste en al menos un nombre de calle y una altura, opcionalmente piso y departamento. Puede encontrarse luego de un 'para' 'a' o 'hacia', además de otras formas más explicitas. Si el usuario no incluyó su dirección, debe ser null",
                nullable: true
            }
        }
    }
}