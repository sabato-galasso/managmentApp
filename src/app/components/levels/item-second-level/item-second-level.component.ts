import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-item-second-level',
  templateUrl: './item-second-level.component.html',
  styleUrls: ['./item-second-level.component.scss'],
})
export class ItemSecondLevelComponent implements OnInit {
  centered = false
  disabled = false
  unbounded = false

  radius: number
  color: string

  @Output() valueChange = new EventEmitter()
  @Input() level
  constructor() {}

  ngOnInit(): void {}
}
