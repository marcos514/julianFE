import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ComponentFactoryResolver, EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../productos/productos.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    this.prod_duplicado = this.producto
  }

  @Output() refrescarProducto = new EventEmitter();
  @Output() cancelarProducto = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Input() producto: Producto;
  prod_duplicado: Producto;

  actualizarCrearProducto(){
    // @ts-ignore
    window.backend.ActualizarProductos([this.producto]).then(productos => {
        // localStorage.setItem("productos", JSON.stringify(productos))
        console.log(JSON.stringify(productos))
        this.refrescarProducto.emit()
      }
    );
  }

  addCategoria(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    if (this.producto.Categorias[0] != "") {
      this.producto.Categorias.push(name)
    } else {
      this.producto.Categorias = [name]
    }
  }

  EliminarCategoria(i){
    this.producto.Categorias.splice(i, 1)
  }

  Refresh(){
    this.producto= this.prod_duplicado
    this.cancelarProducto.emit()
  }
}
