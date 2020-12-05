import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { APP_BASE_HREF } from '@angular/common';
import { ProductosComponent } from './pages/productos/productos.component';
import { MaterialModuleModule } from './modules/material-module/material-module.module';


//Angular Material Modulse
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { TableComponent } from './testing/table/table.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { ProductoComponent } from './pages/producto/producto.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ClienteComponent } from './dialogues/cliente/cliente.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    TableComponent,
    ProductoComponent,
    ClientesComponent,
    ClienteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    //Angular Materials Imports
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatNativeDateModule,
    MaterialModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule
  ],
  entryComponents: [ProductosComponent, ProductoComponent, ClienteComponent],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue : { appearance: 'fill' } }],
  bootstrap: [AppComponent, ProductosComponent]
})
export class AppModule { }
