import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-app';
  path = ""

  clickMessage = '';

  ngOnInit(){
    // @ts-ignore
    window.backend.SetFullPath().then(result => {});
    // @ts-ignore
    window.backend.GetFullPath().then(result => {
      this.path = result
    });
  }

  onClickMe() {
    // @ts-ignore
    window.backend.basic().then(result =>
      this.clickMessage = result
    );
    window.location.href = '#/productos'
  }
}
