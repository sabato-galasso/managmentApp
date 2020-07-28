import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-online-status',
  templateUrl: './online-status.component.html',
  styleUrls: ['./online-status.component.scss'],
})
export class OnlineStatusComponent implements OnInit {
  @Input() onlineStatus: string
  constructor() {}

  ngOnInit(): void {}
}
