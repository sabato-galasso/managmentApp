import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent implements OnInit {

  constructor() { }

  @Input() category;
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;


  ngOnInit() {
  }


}
