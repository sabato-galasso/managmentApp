import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormControl} from "@angular/forms";
import {Subject, Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {WarehouseService} from "../../services/warehouse.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MenuManagerServiceService} from "../../services/menu-manager-service.service";
import {WareHouse} from "../../models/WareHouse";
import {MenuCategoryResponse} from "../../models/Menu/MenuCategoryResponse";
import {SlugifyPipe} from "../../utility/slugify.pipe";
import {DialogBoxCreateCategoryComponent} from "../../modal/dialog-box-menu-category/dialog-box-create-category.component";

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.scss']
})
export class MenuCategoryComponent implements OnInit {


  displayedColumns: string[] = ['_id','nameCategory', 'name-first-level', 'updated_at', 'actions'];
  errMessFeed: string;
  showSpinner = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  positionFilter = new FormControl();
  nameFilter = new FormControl();
  quantityFilter = new FormControl();

  filteredValues = {
    category: '', nameArticle: '' , quantity: ''
  };

  // Subsciptions
  private componetDestroyed = new Subject();
  subscriptionFilterName: Subscription;
  subscriptionFilterCategory: Subscription;
  subscriptionFilterQuantity: Subscription;
  subscriptionGetItems: Subscription;
  subscriptionFilterUpdateItems: Subscription;
  subscriptionDeleteItems: Subscription;
  subscriptionAddItems: Subscription;

  dataSource = new MatTableDataSource([]);

  constructor(private warehouseService: WarehouseService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private menuService: MenuManagerServiceService,
              private slugifyPipe: SlugifyPipe
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.subscriptionFilterCategory = this.positionFilter.valueChanges.subscribe((categoryFilterValue) => {
      this.filteredValues.category = categoryFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.subscriptionFilterName =  this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
      this.filteredValues.nameArticle = nameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.subscriptionFilterQuantity =  this.quantityFilter.valueChanges.subscribe((quantityFilterValue) => {

      this.filteredValues.quantity = quantityFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  loadData() {
    this.showSpinner = true;
    this.subscriptionGetItems = this.menuService.getCategories()
      .subscribe(items => {

          this.showSpinner = true;
          this.dataSource.data = items;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        errMess => { this.errMessFeed = errMess as any;
          this.openSnackBar(this.errMessFeed, 'Undo'); },
        () => {console.log('Observable finished', this.dataSource);  this.showSpinner = false; }
      );
  }

  refresh() {
    this.loadData();
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
      console.log('sdsds',data.quantity,filter)
      const searchString = JSON.parse(filter);
      if (data && data.category && data.name && data.quantity) {
        return data.category.toString().trim().includes(searchString.category) &&
          data.name.toString().trim().toLowerCase().includes(searchString.name)  &&
          data.quantity.toString().trim().toLowerCase().includes(searchString.quantity)
      } else {
        return false;
      }
    };
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  updateDataTableValue(data) {

  /*  if(data.name)
      data.slugCategory = this.slugifyPipe.transform(data.name)

    if(data.nameFirstLevel)
      data.slugCategoryFirst = this.slugifyPipe.transform(data.nameFirstLevel)*/
    this.subscriptionFilterUpdateItems = this.menuService.updateCategory(data).subscribe(items => {
        this.showSpinner = true;
      },
      errMess => {
        this.errMessFeed = errMess as any;
        this.openSnackBar(this.errMessFeed, 'Undo'); },
      () => {console.log('Observable finished', this.dataSource); this.refresh(); this.showSpinner = false; }
    );
  }

  openDialog(action, obj) {

    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxCreateCategoryComponent, {
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

  addRowData(rowObj: MenuCategoryResponse) {

    if(rowObj.nameCategory){
      rowObj.slugCategory = this.slugifyPipe.transform(rowObj.nameCategory)
    }
    if(rowObj.nameFirstLevel){
      rowObj.slugCategoryFirst = this.slugifyPipe.transform(rowObj.nameFirstLevel) || ''
    }
   this.menuService.addCategory(rowObj).subscribe(items => {
        this.showSpinner = true;
      },
      errMess => {
        this.errMessFeed = errMess as any;
        this.openSnackBar(this.errMessFeed, 'Undo');
      },
      () => {
        this.refresh();
        this.showSpinner = false; }
    );
  }

  deleteRowData(rowObj: MenuCategoryResponse) {
    this.subscriptionDeleteItems = this.menuService.deleteCategory(rowObj).subscribe(items => {
        this.showSpinner = true;
      },
      errMess => { this.errMessFeed = errMess as any;
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
