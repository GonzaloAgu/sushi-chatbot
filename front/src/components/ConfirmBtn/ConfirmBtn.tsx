function ConfirmBtn() {
    const handleClick = () => {
        console.log("confirmado")
    }
    
    return <button onClick={handleClick}>Confirmar pedido</button>;
}

export default ConfirmBtn;