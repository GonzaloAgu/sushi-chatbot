import assert from "assert";
import { sendChat } from "../src/services/chat.js";
import mongoose from "mongoose";
import { exit } from "process";
import { getMenu } from "../src/services/menu.js";
import { getAllPedidos } from "../src/services/pedidos.js";

before(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/saka");
});

after(async function () {
  await mongoose.connection.close();
});

describe("Getters", function() {
    it("Obtener menú", async function() {
        const response = await getMenu();
        assert.ok(response.length > 0, "Se devolvió un menú vacío")
        assert.ok(response[0].hasOwnProperty("precio"))
        assert.ok(response[0].hasOwnProperty("nombre"))
    })

    it("Obtener pedidos", async function() {
        const response = await getAllPedidos();
        assert.ok(response.length > 0, "Se devolvió un menú vacío")
        assert.ok(response[0].hasOwnProperty("productos"))
        assert.ok(response[0].hasOwnProperty("fecha"))
        assert.ok(response[0].hasOwnProperty("direccion"))
    })
    
})


describe("Consultas a LLM", function () {
  it("Mensaje generico", async function () {
    const response = await sendChat("Hola", []);
    assert.strictEqual(response.tipo, "otro");
  });

  it("Consulta menú", async function () {
    const response = await sendChat("Quiero ver el menú", []);
    assert.strictEqual(response.tipo, "menu");
    assert.strictEqual(
      response.mensaje.substring(0, 33),
      "¡Este es nuestro menú disponible!"
    );
  });

  it("Procesar orden (sin direccion)", async function () {
    const response = await sendChat("Quiero un sushi veggie", []);
    assert.strictEqual(response.tipo, "orden");
    assert.strictEqual(response.direccion, null);
    assert.strictEqual(
      response.mensaje,
      "Por favor indique su dirección para enviar su pedido."
    );
  });

  it("Procesar orden (con dirección)", async function () {
    const response = await sendChat(
      "Quiero un sushi veggie para enviar a Mitre 372",
      []
    );
    assert.strictEqual(response.tipo, "orden");
    assert.strictEqual(response.direccion.toLowerCase(), "mitre 372");
    assert.ok(response.orden.length > 0);
  });
});
