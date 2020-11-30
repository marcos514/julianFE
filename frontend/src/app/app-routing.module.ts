import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from './pages/productos/productos.component';
import { TableComponent } from './testing/table/table.component';

const routes: Routes = [
  { path: 'productos', component: ProductosComponent },
  { path: 'test', component: TableComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash:true})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
