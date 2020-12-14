export interface Producto {
    ID: number;
    CantidadUnidad: number;
    Nombre: string,
    Descripcion: string;
    Medidas: string;
    Empresa: string;
    Codigo : string;
    Precio: number;
    Categorias: string[];
    Activo: boolean;
}