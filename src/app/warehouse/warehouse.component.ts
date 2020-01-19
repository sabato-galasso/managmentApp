import {ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {WarehouseService} from '../services/warehouse.service';
import {FormControl} from '@angular/forms';
import {WareHouse} from '../models/WareHouse';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['_id', 'name', 'category', 'quantity', 'price', 'actions'];
  errMessFeed: string;
  showSpinner = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  catogories: any[] = [
    {value: '', viewValue: 'Tutto'},
    {value: 'super-alcolici', viewValue: 'Super Alcolici'},
    {value: 'bevande', viewValue: 'Bevande'},
    {value: 'birra', viewValue: 'Birra'},
    {value: 'cibi', viewValue: 'Cibi'}
  ];

  positionFilter = new FormControl();
  nameFilter = new FormControl();
  quantityFilter = new FormControl();
  globalFilter = '';

  filteredValues = {
    category: '', name: '' , price: '', _id: '', quantity: ''
  };

  // Subsciptions
  private componetDestroyed = new Subject();
   subscriptionFilterName: Subscription;
   subscriptionFilterCategory: Subscription;
   subscriptionFilterQuantity: Subscription;
  subscriptionGetItems: Subscription;
   subscriptionFilterUpdateItems: Subscription;
   subscriptionDeleteItems: Subscription;
   subscriptionAddtems: Subscription;

  dataSource = new MatTableDataSource([]);

  constructor(private warehouseService: WarehouseService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar
              ) {}

  ngOnInit(): void {
    this.loadData();
    this.subscriptionFilterCategory = this.positionFilter.valueChanges.subscribe((categoryFilterValue) => {
      this.filteredValues.category = categoryFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.subscriptionFilterName =  this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
      this.filteredValues.name = nameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.subscriptionFilterQuantity =  this.quantityFilter.valueChanges.subscribe((quantityFilterValue) => {
      this.filteredValues.quantity = quantityFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  public loadData() {
        this.showSpinner = true;
        this.subscriptionGetItems = this.warehouseService.getWareHouse()
      .subscribe(items => {
          this.showSpinner = true;
          this.dataSource.data = items;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        errmess => { this.errMessFeed = errmess as any;
                     this.openSnackBar(this.errMessFeed, 'Undo'); },
        () => {console.log('Observable finished', this.dataSource);  this.showSpinner = false; }
      );
}

  refresh() {
    this.loadData();
}

  customFilterPredicate() {
    const myFilterPredicate = (data: WareHouse, filter: string): boolean => {
      let globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.name.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }

      const searchString = JSON.parse(filter);
      return data.category.toString().trim().indexOf(searchString.category) !== -1 &&
        data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1 &&
        data.quantity.toString().trim().toLowerCase().indexOf(searchString.quantity.toLowerCase()) !== -1;
    };
    return myFilterPredicate;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  updateDataTableValue(data) {

    this.subscriptionFilterUpdateItems = this.warehouseService.updateWareHouse(data).subscribe(items => {
        this.showSpinner = true;
      },
      errmess => {
      this.errMessFeed = errmess as any;
      this.openSnackBar(this.errMessFeed, 'Undo'); },
      () => {console.log('Observable finished', this.dataSource); this.refresh(); this.showSpinner = false; }
      );
  }

   disableIt(event) {
    const which = event.which;
    if (which === 38 || which === 40) {
      event.preventDefault();
    }
  }

  incrementQuantity(data) {
    debugger
    if (data.quantity === null || data.quantity < 0 || data.quantity === undefined) {
      data.quantity = 0;
    } else {
      data.quantity++;
    }
    //this.updateDataTableValue(data);
  }
  decrementQuantity(data) {
    if (data.quantity === null || data.quantity < 0 || data.quantity === undefined) {
      data.quantity = 0;
    } else {
      data.quantity--;
    }
    //this.updateDataTableValue(data);
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Aggiungi') {
        this.addRowData(result.data);
      } else if (result.event === 'Elimina') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(rowObj: WareHouse) {

    this.subscriptionAddtems = this.warehouseService.addWareHouse(rowObj).subscribe(items => {
        this.showSpinner = true;
      },
      errmess => {
      this.errMessFeed = errmess as any;
      this.openSnackBar(this.errMessFeed, 'Undo');
      },
      () => {
        this.refresh();
        this.showSpinner = false; }
    );
  }

  deleteRowData(rowObj: WareHouse) {
    this.subscriptionDeleteItems = this.warehouseService.deleteWareHouseRow(rowObj).subscribe(items => {
        this.showSpinner = true;
      },
      errmess => { this.errMessFeed = errmess as any;
                   this.openSnackBar(this.errMessFeed, 'Undo');
      },
      () => {
        this.refresh();
        this.showSpinner = false; }
    );

  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}
