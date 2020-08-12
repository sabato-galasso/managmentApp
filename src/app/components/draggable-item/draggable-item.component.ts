import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { CdkDragEnd } from '@angular/cdk/drag-drop'
import { SettingsTableService } from '../../services/settings-table.service'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { MatSnackBarVerticalPosition } from '@angular/material/snack-bar/snack-bar-config'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-draggable-item',
  templateUrl: './draggable-item.component.html',
  styleUrls: ['./draggable-item.component.scss'],
})
export class DraggableItemComponent implements OnInit, OnDestroy {
  @Input() disabled: boolean
  @Input() idx: number
  @Input() active: boolean
  @Input() position: any
  @Input() name: string
  dragPosition: string
  ids: string[] = []
  private unsubscribe$ = new Subject<void>()
  labelName = ''

  constructor(
    private settingsTableService: SettingsTableService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.position) {
      this.dragPosition = this.position.style
      this.labelName = this.name.replace(/_/g, ' ')
    }
  }

  dragEnd($event: CdkDragEnd) {
    let style = window.getComputedStyle($event.source.element.nativeElement)
    let matrix = new WebKitCSSMatrix(style.webkitTransform)
    let positionX = 0
    let positionY = 0
    this.settingsTableService
      .updatePositionTable({
        positionX,
        positionY,
        id: this.name,
        style:
          'transform: translate3d(' +
          matrix.m41 +
          'px,' +
          matrix.m42 +
          'px,0px)',
      })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.openSnackBar('Posizione aggiornata', 1000, 'top')
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  openSnackBar(
    message: string,
    duration = 1000,
    verticalPosition: MatSnackBarVerticalPosition = 'top'
  ) {
    this._snackBar.open(message, '', {
      duration: duration,
      horizontalPosition: 'end',
      verticalPosition: verticalPosition,
      panelClass: 'panelClass',
    })
  }
}
