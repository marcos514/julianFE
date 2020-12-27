import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { ProductosComponent } from './pages/productos/productos.component';

const routes: Routes = [
  {path:'productos', component:ProductosComponent},
  {path:'clientes', component:ClientesComponent},
  {path:'facturas', component:FacturasComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash:true})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
