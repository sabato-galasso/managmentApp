import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  centered = false
  disabled = false
  unbounded = false

  radius: number
  color: string
  constructor() {}

  ngOnInit(): void {}
}
