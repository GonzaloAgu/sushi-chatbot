# Chatbot para tienda de Sushi

## Indice

- [Introduccion](#introducción)
- [Instalación](#instalación)
  - [Clonar repositorio](#1-clonar-repositorio)
  - [Backend](#2-backend)
  - [Frontend](#3-frontend)
- [Características](#características)
- [Endpoints](#endpoints)
- [Casos de uso](#casos-de-uso)
  - [Preguntar por el menú](#preguntar-por-el-menú)
  - [Hacer un pedido](#hacer-un-pedido)
  - [Preguntas frecuentes](#preguntas-frecuentes)

## Introducción
Este proyecto consiste en la creación de un chatbot para una tienda de sushi ficticia llamada "El infierno del Saka". Cumple el propósito de atender a los clientes y venderles los productos de la tienda.

## Instalación

### 1. Clonar repositorio
```bash
git clone https://github.com/GonzaloAgu/sushi-chatbot.git
```

### 2. Backend

> Se requiere **NodeJS 18 o versión superior** (se usa fetch) y que el servicio de **MongoDB** esté corriendo en la máquina. Al iniciar el backend, **se creará la base de datos y sus colecciones automáticamente**.

a) Renombrar el archivo .env.example a .env, y colocar una API key de Gemini. Se puede conseguir una [aquí](https://aistudio.google.com/apikey)

b) Ejecutar los siguientes comandos.

```bash
cd back
npm install
npm start
```

### 3. Frontend

#### **Importante**: se debe renombrar el archivo .env.example a .env. De forma predeterminada se incluye ``VITE_BACKEND_URL=localhost:8080`` que es la que debería funcionar para el backend si no se modificó.

```bash
cd front
npm install
npm run dev
```

## Características
- Uso de inteligencia artificial, permitiendo una comunicación flexible con el usuario en lenguaje natural.
- Mostrar el menú de la tienda cuando el cliente lo solicite.
- Procesar pedidos del usuario y almacenarlos en una base de datos.
- Respuesta a preguntas frecuentes respecto al negocio.
- Contexto de conversación completa.

### Endpoints

---

#### **POST /sendchat**

Se incluye en el body el nuevo mensaje a procesar, y un historial de mensajes anteriores que podría o no estar vacío (el historial se maneja en el lado del cliente, y tienen un orden temporal inverso (el primer mensaje del array es el ultimo recibido))
```json
{
  "message": "Mensaje del usuario",
  "contents":
    [
      {
        "role": "model",
        "parts": [{
            "text": "Mensaje anterior del LLM"
      }
    ]},
      {
        "role": "user",
        "parts": [{
          "text": "Mensaje anterior del usuario"
        }]
      }
    ]
}
```

#### Respuesta

```json
{
    "mensaje": "Mensaje devuelto por el LLM",
    "tipo": "otro | menu | orden",
    "orden": "Campo que aparece cuando tipo==orden, y contiene los productos solicitados por el cliente en su mensaje",
    "menu": "Campo que aparece cuando tipo==menu, y contiene todos los productos de la tienda"
}

  
```

---

#### **POST /ordenar**
Se incluye en el body un array de productos (solicitados por el cliente) y una dirección.
```json
"{
  "listaProductos": [{
    "objectId": "id del producto",
    "cantidad": "Unidades de producto solicitadas"
    "precio": "Precio unitario del producto"
  }],
  "direccion": "dirección de envío"
}
```

#### Respuesta

```json
{
    "ok": true,
    "listaProductos": [
        {
            "cantidad": 1,
            "nombre": "Nombre del producto",
            "objectId": "ID del producto",
            "precio": 10000
        }
    ],
    "direccion": "Dirección de envío",
    "montoTotal": 10000
}
  
```

## Casos de uso

### Preguntar por el menú
El menú se lee directamente desde la base de datos, asegurando que la IA no alucine productos que no existen o se equivoque en los precios.

![image](https://github.com/user-attachments/assets/153e8870-4377-4822-bcf3-4e6a6f9e79e2)

---
### Hacer un pedido
El usuario debe presionar el botón de confirmar para que el pedido se lleve a cabo. Puede hacer ajustes al pedido con mensajes subsiguientes (ejemplo: quita un teriyaki y agrega un roll veggie).

![image](https://github.com/user-attachments/assets/d07afb4d-f75c-4e6d-b9f5-2240d446c372)

---
### Preguntas frecuentes
El modelo está alimentado con información del negocio que puede ser fácilmente modificada o expandida a traves del archivo prompts.json.

![image](https://github.com/user-attachments/assets/7800ffc4-2f88-43bb-bc43-0a3474d5f354)

---
#### Preguntas configuradas de forma predeterminada:

- ¿Hacen envíos a domicilio?
- ¿Dónde está el local?
- ¿Llegan a (barrio)?
- ¿En qué días y horarios abren?
- ¿Qué medios de pago aceptan?


