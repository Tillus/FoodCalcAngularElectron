import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bla',
  templateUrl: './bla.component.html',
  styleUrls: ['./bla.component.scss'],
})
export class BlaComponent {
  constructor() {}

  ngOnInit(): void {
    console.log('BlaComponent INIT');
  }
}
