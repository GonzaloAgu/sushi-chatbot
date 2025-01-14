export interface IProducto {
    nombre: string,
    precio: number
}
  
export interface IProductoSolicitado extends IProducto {
    cantidad: number,
    objectId: string
}

export interface IOrden {
  listaProductos: IProductoSolicitado[],
  direccion: string
}

export interface IMessage {
    text: string,
    role: "user" | "assistant",
    type?: "otro" | "orden" | "menu",
    orden?: IOrden
}