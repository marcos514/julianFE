import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

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

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, AfterViewInit {
  productos
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit(){}

  displayedColumns: string[] = ['ID',
    'CantidadUnidad',
    'Nombre',
    'Descripcion',
    'Medidas',
    'Empresa',
    'Codigo',
    'Precio',
    'Categorias',
    'Activo'
  ];
  dataSource: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatMenuTrigger, {static: false}) contextMenu: MatMenuTrigger;

  constructor() {
    // Create 100 users
    this.dataSource = new MatTableDataSource(JSON.parse(localStorage.getItem('productos')));
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

  redirectToUpdate(p: Producto) {
    console.log(p.Nombre)
    return ""
  }

}


/** Builds and returns a new User. */
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
//     Categorias: ['ASDAS'],
//     Activo: obj['Activo'],
//   };
// }
