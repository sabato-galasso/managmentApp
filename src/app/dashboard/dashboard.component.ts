import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { version } from '../../../package.json'
import { map, startWith, takeUntil } from 'rxjs/operators'
import { Observable, Subject, fromEvent, Subscription } from 'rxjs'
import { FormControl } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { CreateCustomerComponent } from '../modal/create-customer/create-customer.component'
import { CustomerService } from '../services/customer.service'
import { SlugifyPipe } from '../utility/slugify.pipe'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { MatSidenav } from '@angular/material/sidenav'
import { ConnectionService } from 'ngx-connection-service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('drawer1') drawer1: MatSidenav

  private name: any
  userActived: any

  constructor(
    private auth: AuthService,
    public dialog: MatDialog,
    private customerService: CustomerService,
    private slugifyPipe: SlugifyPipe,
    private snackBar: MatSnackBar,
    public router: Router,
    private connectionService: ConnectionService
  ) {
    this.connectionService
      .monitor()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((currentState) => {
        this.hasNetworkConnection = currentState.hasNetworkConnection
        this.hasInternetAccess = currentState.hasInternetAccess
        if (this.hasNetworkConnection && this.hasInternetAccess) {
          this.status = 'ONLINE'
        } else {
          this.status = 'OFFLINE'
        }
      })

    this.connectionService.updateOptions({
      heartbeatExecutor: (options) =>
        new Observable<any>((subscriber) => {
          // if (Math.random() > 0.5) {
          subscriber.next()
          subscriber.complete()
          //   } else {
          // throw new Error('Connection error')
          // }
        }),
    })
  }

  userName: string
  versionApp: string

  myControl = new FormControl()
  options: string[] = []
  filteredOptions: Observable<string[]>
  private unsubscribe$ = new Subject<void>()

  hasNetworkConnection: boolean
  hasInternetAccess: boolean
  status: string

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase()
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    )
  }

  ngOnInit() {
    this.userName = localStorage.getItem('user')
    this.versionApp = version
    this.customerService
      .getCustomer()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res && res.length > 0) {
          res.forEach((el) => {
            this.options.push(el.name)
          })
        }
      })

    this.customerService
      .openCustomerData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.userActived = res
      })

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    )
  }

  logout() {
    this.auth.logout()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCustomerComponent, {
      width: '350px',
      data: { name: this.name },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let data = {
          name: result,
          slug: this.slugifyPipe.transform(result),
        }
        this.customerService
          .createCustomer(data)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            (result) => {
              this.openSnackBar('Cliente aggiunto!', 'Chiudi')
              this.options.push(result.name)
            },
            (error) => {
              this.openSnackBar(error, 'Chiudi')
            }
          )
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    })
  }

  clearSearchField() {
    this.myControl.patchValue('')
  }

  redirectTo(uri: string) {
    this.drawer1.close().then(() => {
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate([uri]))
    })
  }

  open() {
    if (!this.drawer1.opened) {
      this.drawer1.open().then((res) => {
        this.customerService
          .openCustomerData()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((res) => {
            this.userActived = res
          })
      })
    } else {
      this.drawer1.close()
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
