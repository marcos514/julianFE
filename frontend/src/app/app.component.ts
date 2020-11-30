import { Component, OnInit } from '@angular/core';

export interface Producto {
  ID: string;
  CantidadUnidad: string;
  Nombre: string,
  Descripcion: string;
  Medidas: string;
  Empresa: string;
  Codigo : string;
	Precio: string;
	Categorias: string[];
	Activo: boolean;
}



@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'my-app';

  clickMessage = '';

  onClickMe() {
    // @ts-ignore
    window.backend.ConseguirTodosLosProductos().then(result => {
        let productos = [];
        result.forEach(p => {
          productos.push(createNewProduct(p))
        });
        localStorage.setItem("productos", JSON.stringify(productos))
      }
    );
  }
}


/** Builds and returns a new User. */
function createNewProduct(obj): Producto {
  return {
    ID: obj['ID'],
    CantidadUnidad: obj['CantidadUnidad'],
    Nombre: obj['Nombre'],
    Descripcion: obj['Descripcion'],
    Medidas: obj['Medidas'],
    Empresa: obj['Empresa'],
    Codigo : obj['Codigo'],
    Precio: obj['Precio'],
    Categorias: ['ASDAS'],
    Activo: obj['Activo'],
  };
}