import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent implements OnInit {

  constructor() { }

  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;


  ngOnInit() {
  }


}
