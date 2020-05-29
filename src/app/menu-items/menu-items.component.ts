import {Component, Input, OnInit} from '@angular/core';
import {MenuResponse} from "../models/Menu/MenuResponse";

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent implements OnInit {

  constructor() { }

  @Input() menu: MenuResponse;
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;


  ngOnInit() {
  }


}
