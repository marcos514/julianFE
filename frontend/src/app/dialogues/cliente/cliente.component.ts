import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  @Output() refrescarCliente = new EventEmitter();
  @Input() cliente: Cliente;

  actualizarCrearCliente(){
    // @ts-ignore
    window.backend.ActualizarCliente(this.cliente).then(clientes => {
        // localStorage.setItem("cliente", JSON.stringify(clientes))
        this.refrescarCliente.emit()
      }
    );
  }

}
