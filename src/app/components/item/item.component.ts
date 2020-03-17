import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;

  counter = 0;

  @Output() valueChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


  valueChanged() { // You can give any function name
    this.counter = this.counter + 1;
    this.valueChange.emit(this.counter);
  }

}
