import { ComponentFactoryResolver, EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  @Output() refrescarProducto = new EventEmitter();
  @Input() producto: Producto;

  actualizarCrearProducto(){
    // @ts-ignore
    window.backend.ActualizarProductos([this.producto]).then(productos => {
        localStorage.setItem("productos", JSON.stringify(productos))
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
}
