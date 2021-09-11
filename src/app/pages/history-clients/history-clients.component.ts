import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { FormControl } from '@angular/forms'
import { Subject, Subscription } from 'rxjs'
import { MatTableDataSource } from '@angular/material/table'
import { WarehouseService } from '../../services/warehouse.service'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { WareHouse } from '../../models/WareHouse'
import { CustomerService } from '../../services/customer.service'
import { DeleteCustomerComponent } from '../../modal/delete-customer/delete-customer.component'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-history-clients',
  templateUrl: './history-clients.component.html',
  styleUrls: ['./history-clients.component.scss'],
})
export class HistoryClientsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    '_id',
    'nTable',
    'statusTable',
    'consumazioni',
    'price',
    'updated_at',
    'actions',
  ]
  errMessFeed: string
  showSpinner = false

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort

  nameFilter = new FormControl()

  filteredValues = {
    nTable: '',
  }
  private unsubscribe$ = new Subject<void>()
  dataSource = new MatTableDataSource([])

  constructor(
    private warehouseService: WarehouseService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadData()
    this.nameFilter.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((nameFilterValue) => {
        this.filteredValues.nTable = nameFilterValue
        this.dataSource.filter = JSON.stringify(this.filteredValues)
      })
    this.dataSource.filterPredicate = this.customFilterPredicate()
  }

  public loadData() {
    this.showSpinner = true
    this.customerService.getHistory().subscribe(
      (items) => {
        this.showSpinner = true
        this.dataSource.data = items
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      },
      (errMess) => {
        this.errMessFeed = errMess as any
        this.openSnackBar(this.errMessFeed, 'Undo')
      },
      () => {
        this.showSpinner = false
      }
    )
  }

  refresh() {
    this.loadData()
  }

  customFilterPredicate() {
    return (data: any, filter: string): boolean => {
      const searchString = JSON.parse(filter)
      if (data && data.nTable) {
        return data.nTable
          .toString()
          .trim()
          .toLowerCase()
          .includes(searchString.nTable)
      } else {
        return false
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action)
  }

  updateDataTableValue(data) {
    this.warehouseService
      .updateWareHouse(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (items) => {
          this.showSpinner = true
        },
        (errMess) => {
          this.errMessFeed = errMess as any
          this.openSnackBar(this.errMessFeed, 'Undo')
        },
        () => {
          this.refresh()
          this.showSpinner = false
        }
      )
  }

  openDialog(action, obj) {
    obj.action = action
    const dialogRef = this.dialog.open(DeleteCustomerComponent, {
      width: '500px',
      data: obj,
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Aggiungi') {
        this.addRowData(result.data)
      } else if (result.event === 'Elimina') {
        this.deleteRowData(result.data)
      }
    })
  }

  addRowData(rowObj: WareHouse) {
    this.warehouseService
      .addWareHouse(rowObj)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (items) => {
          this.showSpinner = true
        },
        (errMess) => {
          this.errMessFeed = errMess as any
          this.openSnackBar(this.errMessFeed, 'Undo')
        },
        () => {
          this.refresh()
          this.showSpinner = false
        }
      )
  }

  deleteRowData(rowObj: any) {
    this.customerService
      .deleteByHistory(rowObj._id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (items) => {
          this.showSpinner = true
        },
        (errMess) => {
          this.errMessFeed = errMess as any
          this.openSnackBar(this.errMessFeed, 'Undo')
        },
        () => {
          this.refresh()
          this.showSpinner = false
        }
      )
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
