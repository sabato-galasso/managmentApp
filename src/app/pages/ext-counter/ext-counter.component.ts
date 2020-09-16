import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-ext-counter',
  templateUrl: './ext-counter.component.html',
  styleUrls: ['./ext-counter.component.scss'],
})
export class ExtCounterComponent implements OnInit {
  tables = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  constructor() {}

  ngOnInit(): void {}
}
