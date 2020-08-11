import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { WebsocketService } from '../../services/socket.service'
import { CustomerTableModel } from '../../models/CustomerTableModel'
import { MenuManagerServiceService } from '../../services/menu-manager-service.service'
import { MenuResponse } from '../../models/Menu/MenuResponse'
import _ from 'lodash'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { Location } from '@angular/common'

@Component({
  selector: 'app-tables-menu',
  templateUrl: './menu-first-level.component.html',
  styleUrls: ['./menu-first-level.component.scss'],
})
export class MenuFirstLevelComponent implements OnInit, OnDestroy {
  paramId: string
  customerTable: CustomerTableModel
  menu: MenuResponse[]
  private unsubscribe$ = new Subject<void>()

  constructor(
    private route: ActivatedRoute,
    private socketService: WebsocketService,
    private menuService: MenuManagerServiceService,
    private _location: Location,
    public router: Router
  ) {
    this.paramId = this.route.snapshot.params.id

    this.customerTable = {
      price: '0',
      timer: '0',
      status: 0,
    }
  }

  ngOnInit(): void {
    /* this.socketService.getSocket(this.paramId).subscribe(msg => {
      this.customerTable = msg
      console.log('ttttttt',msg)
    });*/

    /*   this.menuService.getMenu().subscribe(res => {

      this.menu = res
    })*/

    this.menuService
      .getCategories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.menu = _.uniqBy(res, 'slugCategory')
      })
  }

  closeTable() {
    /*this.socketService.emitCloseTable(this.paramId).subscribe(msg => {
      this.customerTable = msg
      console.log('ttttttt',msg)
    });  */
  }

  locationBack() {
    if (window.location.href.indexOf('interno') > -1) {
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['internal-room']))
    } else if (window.location.href.indexOf('esterno-pedana') > -1) {
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['external-room']))
    } else if (window.location.href.indexOf('biliardi') > -1) {
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['home']))
    } else {
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['/']))
      // this._location.back()
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
