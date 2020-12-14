import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatMenuTrigger } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoComponent } from '../producto/producto.component';


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
    'Activo',
    'Actualizar'
  ];
  dataSource: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatMenuTrigger, {static: false}) contextMenu: MatMenuTrigger;

  constructor(public dialog: MatDialog) {
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

  openDialog(producto, index): void {
    const dialogRef = this.dialog.open(ProductoComponent, {
      width: '400px',
      data: producto
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result['Categorias']);
      result['Precio'] = Number(result['Precio']);
      this.dataSource.data[index] = result;
      this.actualizarProductos()
    });
  }

  crearProductoDialogue(): void {
    let p = {
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
    const dialogRef = this.dialog.open(ProductoComponent, {
      width: '700px',
      data: p,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(producto => {
      if(producto != undefined){
        // @ts-ignore
        window.backend.CrearProducto(producto).then(productos => {
          this.dataSource.data = productos;
          localStorage.setItem("productos", JSON.stringify(productos))
        });
      }
    });
  }


  actualizarProductos(): void {
    // @ts-ignore
    window.backend.ActualizarProductos(this.dataSource.data).then(result => {
        localStorage.setItem("productos", JSON.stringify(result))
        console.log("Funciono? " + JSON.stringify(result))
      }
    );
  }

  RefrescarProductos() {
    // @ts-ignore
    window.backend.ConseguirTodosLosProductos().then(result => {
        let has_products = this.dataSource.data != null;
        let productos = [];
        result.forEach(p => {
          productos.push(createNewProduct(p))
        });
        this.dataSource.data = productos;
        localStorage.setItem("productos", JSON.stringify(productos));
        if(!has_products){
          window.location.reload()
        }
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
