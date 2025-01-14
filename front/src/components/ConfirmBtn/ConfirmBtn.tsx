import { useContext, useState } from "react";
import { ChatContext, OrdenContext } from "../Chat/Chat";
import { IMessage } from "../../types";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function ConfirmBtn() {
  const orden = useContext(OrdenContext);
  const [disabled, setDisabled] = useState(false);
  const addMessage = useContext(ChatContext);

  const handleClick = async () => {
    setDisabled(true);

    try {
      const response = await fetch(apiUrl + "/ordenar", {
        method: "POST",
        body: JSON.stringify(orden),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const msg: IMessage = {
        role: "assistant",
        text: "Tu pedido ha sido confirmado y llegará muy pronto. ¡Gracias!",
        type: "otro",
      };

      if (addMessage) {
        addMessage(msg);
      } else {
        throw new Error("addMessage no está definido");
      }
    } catch (error) {
      console.error("Error al confirmar el pedido:", error);
      alert("Hubo un problema al confirmar el pedido. Inténtalo de nuevo.");
      setDisabled(false); 
    }
  };

  return (
    <button onClick={handleClick} disabled={disabled}>
      Confirmar pedido ✅
    </button>
  );
}

export default ConfirmBtn;
