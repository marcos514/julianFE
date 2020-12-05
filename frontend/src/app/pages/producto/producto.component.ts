import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Producto } from 'src/app/interfaces/producto';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public producto: Producto) {}

  onNoClick(): void {
    this.producto.ID = -10;
    this.dialogRef.close();
  }
  
}
