import { Cliente } from "./cliente";
import { Producto } from "./producto";

export interface Factura {
	ID: number;
	ClienteID: number;
	Clientes: Array<Cliente>
	Fecha: string;
	PrecioTotal: number;
	FacturaProducto: Array<FacturaProducto>;
}


export interface FacturaProducto {
	ID: number;
	ProductoID: number;
	Precio: number;
	Producto: Producto;
	FacturaID: number;
	Cantidad: number;
}