import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core'
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
export class DraggableItemComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @Input() disabled: boolean
  @Input() idx: number
  @Input() active: boolean
  @Input() position: any
  dragPosition: { x: 0; y: 0 }
  ids: string[] = []
  private unsubscribe$ = new Subject<void>()

  constructor(
    private settingsTableService: SettingsTableService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.position) {
      this.dragPosition = {
        x: this.position.positionX,
        y: this.position.positionY,
      }
    }
  }

  ngAfterViewInit() {
    if (this.position) {
      this.dragPosition = {
        x: this.position.positionX,
        y: this.position.positionY,
      }
    }
  }

  dragEnd($event: CdkDragEnd, number: number) {
    const { offsetLeft, offsetTop } = $event.source.element.nativeElement
    const { x, y } = $event.distance
    let positionX = offsetLeft - x
    let positionY = offsetTop - y
    console.log({ positionX, positionY, id: number })
    console.log(number)
    this.settingsTableService
      .updatePositionTable({
        positionX,
        positionY,
        id: 'esterno_' + number,
      })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.openSnackBar('Posizione aggiornata', 1000, 'bottom')
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
      panelClass: '',
    })
  }
}
