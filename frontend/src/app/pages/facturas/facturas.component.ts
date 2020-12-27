import { Component, OnInit } from '@angular/core';
import { Factura, FacturaProducto } from 'src/app/interfaces/factura';
import { Cliente } from '../clientes/clientes.component';
import { Producto } from '../productos/productos.component';


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  facturas: Array<Factura>;
  facturas_productos: Array<FacturaProducto>;
  facturaProductosSelected:Array<FacturaProducto>;
  filtro:string = ''
  factura:Factura
  productos = {}
  clientes = {}
  clientesArray: Array<Cliente>
  cliente:Cliente;
  sorter = {
    field:'',
    firstSort: true,
  }


  constructor() { }

  ngOnInit() {
    this.tomarClientes()
    this.ConseguirFacturas()
    this.ConseguirFacturasProductos()
  }

  tomarClientes() {
    // @ts-ignore
    window.backend.ConseguirTodosLosClientes().then(clientes => {
      this.clientesArray = clientes
      clientes.forEach(c => {
        this.clientes[c['ID']] = c
      });
    })
  }


  ConseguirFacturas() {
    // @ts-ignore
    window.backend.ConseguirFacturas().then(facturas => {
        this.facturas = facturas;
        // localStorage.setItem("productos", JSON.stringify(this.productos));
      }
    );
  }

  ConseguirFacturasProductos() {
    // @ts-ignore
    window.backend.ConseguirFacturasProductos().then(facturas_productos => {
        this.facturas_productos = facturas_productos;
      }
    );
  }
  // mergearProductos()

  sort(field: string){
    if (this.sorter.field != field){
      this.sorter.field = field
      this.sorter.firstSort = true
    }
    else {
      this.sorter.firstSort = !this.sorter.firstSort
    }
    this.facturas.sort((a, b) => (this.sorter.firstSort != (a[this.sorter.field] > b[this.sorter.field])) ? 1 : -1)
  }

  Filtrar(){
    this.sorter.field = ''
    // @ts-ignore
    window.backend.ConseguirFacturas().then(facturas => {
      this.facturas = facturas.filter(p => {
        let values = Object.values(p).toString().toLowerCase()
        return values.includes(this.filtro.toLowerCase())
      });
    });
  }

  actualizarFactura(){
    this.factura = null
    this.ngOnInit()
  }

  seleccionarFactura(factura) {
    this.factura = factura
    this.cliente = this.clientes[this.factura.ClienteID]
    this.facturaProductosSelected = []
    this.facturas_productos.forEach(fp => {
      if (fp.FacturaID == this.factura.ID) {
        this.facturaProductosSelected.push(fp)
      }
    });
  }


  crearFactura(){
    this.factura = {
      ID: -6,
	    ClienteID: -6,
	    Clientes: [],
	    Fecha: null,
	    PrecioTotal: 0,
	    FacturaProducto: []
    }
    this.cliente = {
      ID: -6,
      Mail: '',
      Nombre: '',
      Direccion: '',
      Numero: '',
    };
    this.facturaProductosSelected = []

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