import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-item-first',
  templateUrl: './item-first.component.html',
  styleUrls: ['./item-first.component.scss']
})
export class ItemFirstComponent implements OnInit {
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;

  counter = 0;

  @Output() valueChange = new EventEmitter();
  @Input() level
  constructor() { }

  ngOnInit(): void {
  }

  valueChanged() {

  }
}
