import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Array<Cliente>
  filtro: string
  sorter = {
    field:'',
    firstSort: true,
  }
  cliente: Cliente

  constructor() { }

  ngOnInit() {
    this.tomarClientes()
  }

  tomarClientes() {
    this.cliente = null
    // @ts-ignore
    window.backend.ConseguirTodosLosClientes().then(clientes => {
      this.clientes = clientes
    })
  }

  reemplazarClientes() {
    this.cliente = null
    this.tomarClientes()
  }

  crearClienteBE(cliente:Cliente) {
    // @ts-ignore
    window.backend.CrearCliente(cliente).then(clientes => {
      this.clientes = clientes;
    });
  }

  crearCliente(): void {
    this.cliente = {
      ID: -6,
      Mail: '',
      Nombre: '',
      Direccion: '',
      Numero: '',
    };
  }

  seleccionarCliente(cliente) {
    this.cliente = cliente
  }

  Filtrar(){
    this.sorter.field = ''
    // @ts-ignore
    window.backend.ConseguirTodosLosClientes().then(clientes => {
      this.clientes = clientes.filter(p => {
        let values = Object.values(p).toString().toLowerCase()
        console.log(values)
        return values.includes(this.filtro.toLowerCase())
      });
    });
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
    this.clientes.sort((a, b) => (this.sorter.firstSort != (a[this.sorter.field] > b[this.sorter.field])) ? 1 : -1)
  }

}
