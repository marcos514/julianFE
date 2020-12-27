import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Factura, FacturaProducto } from 'src/app/interfaces/factura';
import { Cliente } from '../clientes/clientes.component';
import { Producto } from '../productos/productos.component';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  @Output() actualizarFactura = new EventEmitter();
  @Input() facturaProductos: Array<FacturaProducto>;
  @Input() cliente: Cliente;
  @Input() factura: Factura;
  @Input() clientes: Array<Cliente>;
  productosArray:Array<Producto> = [];
  productosDict = {};
  filtroCliente='';
  filtroProductos='';
  sorterCliente = {
    field:'',
    firstSort: true,
  }
  sorterProducto = {
    field:'',
    firstSort: true,
  }
  constructor() { }

  ngOnInit() {
    this.ConseguirProductos()
  }

  ConseguirProductos() {
    // @ts-ignore
    window.backend.ConseguirTodosLosProductos().then(productosBE => {
        productosBE.forEach(p => {
          this.productosDict[p['ID']] = p
        });

        this.productosArray= productosBE
      }
    );
  }

  sortProductos(field: string){
    console.log('Estoy en el click')
    if (this.sorterProducto.field != field){
      this.sorterProducto.field = field
      this.sorterProducto.firstSort = true
    }
    else {
      this.sorterProducto.firstSort = !this.sorterProducto.firstSort
    }
    this.productosArray.sort((a, b) => (this.sorterProducto.firstSort != (a[this.sorterProducto.field] > b[this.sorterProducto.field])) ? 1 : -1)
  }

  FiltrarProductos(){
    this.sorterProducto.field = ''
    // @ts-ignore
    window.backend.ConseguirTodosLosProductos().then(productos => {
      this.productosArray = productos.filter(p => {
        let values = Object.values(p).toString().toLowerCase()
        return values.includes(this.filtroProductos.toLowerCase())
      });
      this.productosArray.forEach(p => {
        this.productosArray[p['ID']] = p
      });
    });
  }


  sortClientes(field: string){
    console.log('Estoy en el click')
    if (this.sorterCliente.field != field){
      this.sorterCliente.field = field
      this.sorterCliente.firstSort = true
    }
    else {
      this.sorterCliente.firstSort = !this.sorterCliente.firstSort
    }
    this.clientes.sort((a, b) => (this.sorterCliente.firstSort != (a[this.sorterCliente.field] > b[this.sorterCliente.field])) ? 1 : -1)
  }

  FiltrarClientes(){
    this.sorterCliente.field = ''
    // @ts-ignore
    window.backend.ConseguirTodosLosClientes().then(clientes => {
      this.clientes = clientes.filter(c => {
        let values = Object.values(c).toString().toLowerCase()
        return values.includes(this.filtroCliente.toLowerCase())
      });
    });
  }

  AgregarAFactura(producto:Producto){
    let isAdded = false
    this.facturaProductos.forEach(fp => {
      if (fp.ProductoID == producto.ID) {
        isAdded = true
        fp.Precio = producto.Precio
        return
      }
    });
    if (!isAdded) {
      this.facturaProductos.push({
        ID: 0,
        ProductoID: producto.ID,
        Precio: producto.Precio,
        Producto: producto,
        FacturaID: this.factura.ID,
        Cantidad: 1
      })
    }
  }

  CalcularTotal(){
    this.factura.PrecioTotal = 0
    this.facturaProductos.forEach(fp => {
      if (fp.Cantidad > 0) {
        this.factura.PrecioTotal += this.productosDict[fp.ProductoID].Precio * fp.Cantidad
      }
      else{
        fp.Cantidad=0
      }
    });
  }

  ActualizarFactura(){
    // @ts-ignore
    window.backend.ActualizarFactura(this.factura.ID, this.factura.ClienteID, this.factura.PrecioTotal, this.facturaProductos).then(() => {
      this.actualizarFactura.emit()
    });
  }

  CrearCSV(){
    // @ts-ignore
    window.backend.ImprimirFacturaCSV(this.factura.ID, this.factura.ClienteID, this.factura.PrecioTotal, this.facturaProductos).then(() => {
      alert("Factura Creada")
    });
  }

  seleccionarCliente(cliente){
    this.factura.ClienteID = cliente.ID
    this.cliente = cliente
  }
}
