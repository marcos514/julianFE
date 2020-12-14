import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Array<Producto>
  producto: Producto
  sorter = {
    field:'',
    firstSort: true,
  }
  filtro:string


  constructor() { }

  ngOnInit() {
    this.productos = JSON.parse(localStorage.getItem('productos'))
  }

  showHideRow(producto:Producto) { 
    document.getElementsByClassName(`${producto.ID}-${producto.Codigo}`)[0].classList.toggle('hide-row')
  }

  crearProductoDialogue(): void {
    this.producto = {
      ID: -6,
      CantidadUnidad: 1,
      Nombre: '',
      Descripcion: '',
      Medidas: '',
      Empresa: '',
      Codigo : '',
      Precio: 0,
      Categorias: [],
      Activo: true,
    };
  }

  seleccionarProducto(p:Producto): void{
    console.log(p)
    this.producto = p
  }

  actualizarProducto(producto:Producto): void {
    // @ts-ignore
    window.backend.ActualizarProductos([producto]).then(result => {
        this.productos = result
        // console.log(JSON.stringify(result))
      }
    );
  }

  refrescarProductos() {
    this.producto = null
    // @ts-ignore
    window.backend.ConseguirTodosLosProductos().then(result => {
        let productos = [];
        result.forEach(p => {
          productos.push(createNewProduct(p))
        });
        this.productos = productos;
        // localStorage.setItem("productos", JSON.stringify(this.productos));
      }
    );
  }

  sort(field: string){
    console.log('Estoy en el click')
    if (this.sorter.field != field){
      this.sorter.field = field
      this.sorter.firstSort = true
    }
    else {
      this.sorter.firstSort = !this.sorter.firstSort
    }
    this.productos.sort((a, b) => (this.sorter.firstSort != (a[this.sorter.field] > b[this.sorter.field])) ? 1 : -1)
  }

  Filtrar(){
    this.sorter.field = ''
    this.productos = JSON.parse(localStorage.getItem('productos'));
    this.productos = this.productos.filter(p => {
      let values = Object.values(p).toString().toLowerCase()
      console.log(values)
      return values.includes(this.filtro.toLowerCase())
    })
  }

  actualizarProductosDeArchivo(){
    // @ts-ignore
    window.backend.ActualizarProductosDeArchivo().then(result => {
        let productos = [];
        result.forEach(p => {
          productos.push(createNewProduct(p))
        });
        this.productos = productos;
        // localStorage.setItem("productos", JSON.stringify(this.productos));
      }
    );
  }
}



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
    Categorias: obj['Categorias'],
    Activo: obj['Activo'],
  };
}