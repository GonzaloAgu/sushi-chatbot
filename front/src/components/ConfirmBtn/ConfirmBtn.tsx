import { useContext, useEffect } from "react";
import { OrdenContext } from "../Chat/Chat"

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function ConfirmBtn() {
    const orden = useContext(OrdenContext);

    const handleClick = () => {
        console.log(orden)
        fetch(apiUrl + "/ordenar", {
            method: "POST",
            body: JSON.stringify(orden),
            "headers": {
                "content-type": "application/json"
            },
        }) 
    }
    
    return <button onClick={handleClick}>Confirmar pedido ✅</button>;
}

export default ConfirmBtn;