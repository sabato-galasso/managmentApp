import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { FormControl } from '@angular/forms'
import { forkJoin, Observable, Subject, Subscription } from 'rxjs'
import { MatTableDataSource } from '@angular/material/table'
import { WarehouseService } from '../../services/warehouse.service'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { WareHouse } from '../../models/WareHouse'
import { MenuManagerServiceService } from '../../services/menu-manager-service.service'
import { DialogBoxCreateMenuComponent } from '../../modal/dialog-box-menu/dialog-box-create-menu.component'
import { takeUntil } from 'rxjs/operators'
import { MenuResponse } from '../../models/Menu/MenuResponse'
import { SlugifyPipe } from '../../utility/slugify.pipe'

@Component({
  selector: 'app-menu-manager',
  templateUrl: './menu-manager.component.html',
  styleUrls: ['./menu-manager.component.scss'],
})
export class MenuManagerComponent implements OnInit {
  displayedColumns: string[] = [
    '_id',
    'name',
    'category',
    'categoryFirstLevel',
    'price',
    'updated_at',
    'actions',
  ]
  errMessFeed: string
  showSpinner = false

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort

  positionFilter = new FormControl()
  nameFilter = new FormControl()
  quantityFilter = new FormControl()

  filteredValues = {
    category: '',
    name: '',
    quantity: '',
  }

  selected = 'option2'

  // Subsciptions
  private unsubscribe$ = new Subject<void>()

  dataSource = new MatTableDataSource([])
  categories: MenuResponse[]
  loadedData: any

  constructor(
    private warehouseService: WarehouseService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private menuService: MenuManagerServiceService,
    private slugifyPipe: SlugifyPipe
  ) {}

  ngOnInit(): void {
    this.loadData()
    this.positionFilter.valueChanges.subscribe((categoryFilterValue) => {
      this.filteredValues.category = categoryFilterValue
      this.dataSource.filter = JSON.stringify(this.filteredValues)
    })

    this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
      this.filteredValues.name = nameFilterValue
      this.dataSource.filter = JSON.stringify(this.filteredValues)
    })

    this.quantityFilter.valueChanges.subscribe((quantityFilterValue) => {
      this.filteredValues.quantity = quantityFilterValue
      this.dataSource.filter = JSON.stringify(this.filteredValues)
    })
    this.dataSource.filterPredicate = this.customFilterPredicate()
  }

  loadData() {
    this.showSpinner = true
    this.requestDataFromMultipleSources()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (items) => {
          //
          this.showSpinner = true
          this.dataSource.data = items[0]
          this.dataSource.sort = this.sort
          this.dataSource.paginator = this.paginator
          this.categories = items[1]
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
    return (data: WareHouse, filter: string): boolean => {
      /* let globalMatch = !this.globalFilter;

       if (this.globalFilter) {
         // search all text fields
         globalMatch = data.name.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
       }

       if (!globalMatch) {
         return;
       }*/
      const searchString = JSON.parse(filter)
      if (data && data.category && data.name && data.quantity) {
        return (
          data.category.toString().trim().includes(searchString.category) &&
          data.name
            .toString()
            .trim()
            .toLowerCase()
            .includes(searchString.name) &&
          data.quantity
            .toString()
            .trim()
            .toLowerCase()
            .includes(searchString.quantity)
        )
      } else {
        return false
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action)
  }

  updateDataTableValue(data: MenuResponse) {
    /*if(data.category)
      data.slugCategory = this.slugifyPipe.transform(data.name)

    if(data.categoryFirstLevel)
      data.slugCategoryFirstLevel = this.slugifyPipe.transform(data.categoryFirstLevel)*/
    this.menuService.updateMenu(data).subscribe(
      (items) => {
        this.showSpinner = true
        this.openSnackBar('Dato salvato correttamente', 'Undo')
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
    const dialogRef = this.dialog.open(DialogBoxCreateMenuComponent, {
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

  addRowData(rowObj: MenuResponse) {
    if (rowObj.nameCategory)
      rowObj.slugCategory = this.slugifyPipe.transform(rowObj.nameCategory)

    if (rowObj.nameFirstLevel)
      rowObj.slugCategoryFirstLevel = this.slugifyPipe.transform(
        rowObj.nameFirstLevel
      )

    this.menuService.addMenu(rowObj).subscribe(
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

  deleteRowData(rowObj: MenuResponse) {
    this.menuService.deleteMenuRow(rowObj).subscribe(
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

  public requestDataFromMultipleSources(): Observable<any[]> {
    let response1 = this.menuService.getMenu()
    let response2 = this.menuService.getCategories()
    return forkJoin([response1, response2])
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
