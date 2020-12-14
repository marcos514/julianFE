import { Component, OnInit } from '@angular/core';
import { Producto } from './interfaces/producto';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'my-app';

  clickMessage = '';

  redirect(endpoint: string){
    window.location.hash = `#/${ endpoint }`;
  }
}


// /** Builds and returns a new User. */
// function createNewProduct(obj): Producto {
//   return {
//     ID: obj['ID'],
//     CantidadUnidad: obj['CantidadUnidad'],
//     Nombre: obj['Nombre'],
//     Descripcion: obj['Descripcion'],
//     Medidas: obj['Medidas'],
//     Empresa: obj['Empresa'],
//     Codigo : obj['Codigo'],
//     Precio: obj['Precio'],
//     Categorias: obj['Categorias'],
//     Activo: obj['Activo'],
//   };
// }