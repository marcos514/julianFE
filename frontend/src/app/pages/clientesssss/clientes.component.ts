import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatMenuTrigger, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ClienteComponent } from 'src/app/dialogues/cliente/cliente.component';
import { Cliente } from 'src/app/interfaces/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit(){}

  displayedColumns: string[] = ['ID',
    'Mail',
    'Nombre',
    'Direccion',
    'Numero',
    'Actualizar'
  ];
  dataSource: MatTableDataSource<Cliente>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatMenuTrigger, {static: false}) contextMenu: MatMenuTrigger;

  constructor(public dialog: MatDialog) {
    // Create 100 users
    this.dataSource = new MatTableDataSource(JSON.parse(localStorage.getItem('clientes')));
    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(this.productos);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('paginator '+this.paginator)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('filterValue ' + filterValue)
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  actualizarClienteDialogue(cliente, index): void {
    const dialogRef = this.dialog.open(ClienteComponent, {
      width: '400px',
      data: cliente
    });

    dialogRef.afterClosed().subscribe(c => {
      console.log(`This is the cliente: ${ c.ID }`)
      if(c.ID != -10) {
        this.dataSource.data[index] = cliente;
        this.actualizarClienteBE(cliente)
      }
    });
  }

  crearProductoDialogue(): void {
    let c: Cliente = {
      ID: -6,
  	  Mail: '',
	    Nombre: '',
      Direccion: '',
      Numero: '',
    };

    const dialogRef = this.dialog.open(ClienteComponent, {
      width: '700px',
      data: c,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(cliente => {
      if(cliente.ID != '-10'){
        // @ts-ignore
        window.backend.CrearCliente(cliente).then(clientes => {
          this.dataSource.data = clientes;
          localStorage.setItem("clientes", JSON.stringify(clientes))
        });
      }
    });
  }


  actualizarClienteBE(cliente): void {
    // @ts-ignore
    window.backend.ActualizarCliente(cliente).then(clientes => {
        this.dataSource.data = clientes;
        localStorage.setItem("clientes", JSON.stringify(clientes))
      }
    );
  }

  RefrescarClientes() {
    // @ts-ignore
    window.backend.ConseguirTodosLosClientes().then(result => {
        let has_clientes = this.dataSource.data != null;
        let clientes = [];
        result.forEach(p => {
          clientes.push(crearCliente(p))
        });
        this.dataSource.data = clientes;
        localStorage.setItem("clientes", JSON.stringify(clientes));
        if(!has_clientes){
          window.location.reload()
        }
      }
    );
  }
}

function crearCliente(obj): Cliente {
  return {
    ID: obj['ID'],
	  Mail: obj['Mail'],
	  Nombre: obj['Nombre'],
    Direccion: obj['Direccion'],
    Numero: obj['Numero'],
  };
}