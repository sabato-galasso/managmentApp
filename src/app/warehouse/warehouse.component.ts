import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {WarehouseService} from '../services/warehouse.service';
import {FormControl} from '@angular/forms';
import {WareHouse} from '../models/WareHouse';
import {Subject, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['_id', 'name', 'category', 'quantity', 'price', 'delete'];
  dataSource = new MatTableDataSource([]);
  errMessFeed: string;
  showSpinner = false;

  @ViewChild(MatTable, {static: false}) table: MatTable<any>;
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

  // Filter Subsciption
  private componetDestroyed: Subject<any> = new Subject();
   subscriptionFilterName: Subscription;
   subscriptionFilterCategory: Subscription;
   subscriptionFilterQuantity: Subscription;
   subscriptionFilterItems: Subscription;
   subscriptionFilterUpdateItems: Subscription;


  constructor(private warehouseService: WarehouseService, private changeDetectorRefs: ChangeDetectorRef, public dialog: MatDialog) {
  }

  ngOnInit() {
    // this.refresh();
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

    this.subscriptionFilterItems = this.warehouseService.getWareHouse().subscribe(items => {
        this.showSpinner = true;
        this.dataSource.data = items;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      errmess => { this.errMessFeed = errmess as any; },
      () => {console.log('Observable finished', this.dataSource);  this.showSpinner = false; }
    );

    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  customFilterPredicate() {
    return (data: WareHouse, filter: string): boolean => {
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
  }

  applyFilter(filter) {
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  getItemsWarehouse() {
    this.subscriptionFilterItems = this.warehouseService.getWareHouse().subscribe(items => {
         this.showSpinner = true;
         this.dataSource.data = items;
      },
      errmess => { this.errMessFeed = errmess as any; },
      () => {console.log('Observable finished', this.dataSource);  this.showSpinner = false; }
    );
  }

  changeDataTableValue(data, el) {
    this.subscriptionFilterUpdateItems = this.warehouseService.updateWareHouse(data).subscribe(items => {
        this.showSpinner = true;
        console.log('Observableww finished', items);
      },
      errmess => { this.errMessFeed = errmess as any; },
      () => {console.log('Observable finished', this.dataSource);  this.showSpinner = false; }
      );
  }

  refresh(): void {
    this.subscriptionFilterItems = this.warehouseService.getWareHouse().subscribe(resources => {
      debugger;
      this.showSpinner = true;
      this.dataSource.data = resources;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
      errmess => { this.errMessFeed = errmess as any; },
      () => {console.log('Observable finished', this.dataSource);  this.showSpinner = false; }
    );
    this.changeDetectorRefs.detectChanges();
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '450px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: WareHouse) {
    const d = new Date();
    this.dataSource.data.push({
      id: d.getTime(),
      name: row_obj.name
    });
    this.table.renderRows();

  }

  deleteRowData(rowObj: WareHouse) {
    this.dataSource.data = this.dataSource.data.filter((value, key) => {
      return value._id !== rowObj._id;
    });
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}
