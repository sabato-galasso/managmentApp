import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SettingsTable} from '../models/SettingsTable';
import {SettingsTableService} from '../services/settings-table.service';
import {ItemMenu} from '../models/ItemMenu';
import {Subject, Subscription} from 'rxjs';
import {WareHouse} from '../models/WareHouse';
import {DialogBoxSettingsComponent} from '../dialog-box-settings/dialog-box-settings.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {


  // Subsciptions
  private componetDestroyed = new Subject();
  subscriptionGetSettings: Subscription;
  subscriptionUpdateItems: Subscription;
  subscriptionFilterPrice: Subscription;
  subscriptionGetItems: Subscription;
  subscriptionFilterCategory: Subscription;
  subscriptionFilterName: Subscription;
  subscriptionDeleteItems: Subscription;
  subscriptionAddItems: Subscription;

  constructor(private fb: FormBuilder, private settingsTableService: SettingsTableService, public dialog: MatDialog,
              private snackBar: MatSnackBar
  ) {
    this.createForm();
  }


  @ViewChild('fform', {static: true}) feedbackFormDirective;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<ItemMenu>;

  tablesForm: FormGroup;
  setTable: SettingsTable;
  setTableCopy: SettingsTable;
  errMessFeed: string;
  showSpinner = false;

  gettedSetting: SettingsTable;

  positionFilter = new FormControl();
  nameFilter = new FormControl();
  priceFilter = new FormControl();
  globalFilter = '';
  filteredValues = {
    category: '', name: '' , price: '', _id: '', quantity: ''
  };

  catogories: any[] = [
    {value: '', viewValue: 'Tutto'},
    {value: 'super-alcolici', viewValue: 'Super Alcolici'},
    {value: 'bevande', viewValue: 'Bevande'},
    {value: 'birra', viewValue: 'Birra'},
    {value: 'cibi', viewValue: 'Cibi'},
    {value: 'vini', viewValue: 'Vini'},
  ];

  // Table
  displayedColumns: string[] = ['_id', 'category', 'name', 'price', 'updatedAt', 'actions'];
  dataSource = new MatTableDataSource([]);


  formErrors = {
    quantity: 1,
    price: 1
  };

  validationMessages = {
    quantity: {
      required: 'Quantity is required.',
      minlength: 'Numero minimo di tavoli - 1'
    },
    price: {
      required: 'Price is required.',
    }
  };


  createForm(): void {
    this.tablesForm = this.fb.group(
      {
        quantity: [1, [Validators.required, Validators.minLength(1)] ],
        price: [1, [Validators.required]],
      }
    );

    this.tablesForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
    // reset validation messages now
  }

  refresh() {
   this.loadData();
  }

  public loadData() {
    this.showSpinner = true;
    this.subscriptionGetItems = this.settingsTableService.getItemsMenu()
      .subscribe(items => {
          this.showSpinner = true;
          this.dataSource.data = items;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        errmess => { this.errMessFeed = errmess as any;
                     this.openSnackBar(this.errMessFeed, 'Undo'); },
        () => { this.showSpinner = false; }
      );
  }

getSetting() {
 this.subscriptionGetSettings = this.settingsTableService.getSettingsTable().subscribe(tables => {
      this.gettedSetting = tables;
      this.setTableCopy = tables;
      this.tablesForm.controls.quantity.setValue(this.gettedSetting.quantity);
      this.tablesForm.controls.price.setValue(this.gettedSetting.price);

    },
    errmess => { this.gettedSetting = null; this.setTableCopy = null; this.errMessFeed = errmess as any; },
    () => {  this.showSpinner = false; }
  );
}


  onSubmit() {
    this.setTable = this.tablesForm.value;
    this.setTable._id = this.gettedSetting._id || '0';
    this.showSpinner = true;
    this.settingsTableService.submitSettingsTable(this.setTable).subscribe(tables => {
        this.setTable = tables; this.setTableCopy = tables;
      },
      errmess => { this.setTable = null; this.setTableCopy = null; this.errMessFeed = errmess as any; },
      () => {  this.showSpinner = false; }
    );
  }


  onValueChanged(data?: any) {
    if (!this.tablesForm) { return; }
    const form = this.tablesForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxSettingsComponent, {
      width: '500px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Aggiungi') {
        this.addRowData(result.data);
      } else if (result.event === 'Modifica') {
        this.updateDataTableValue(result.data);
      } else if (result.event === 'Elimina') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(rowObj: ItemMenu) {

    this.subscriptionAddItems = this.settingsTableService.createRowData(rowObj).subscribe(items => {
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  updateDataTableValue(data) {
    this.subscriptionUpdateItems = this.settingsTableService.updateRowData(data).subscribe(items => {
        this.showSpinner = true;
      },
      errmess => {
        this.errMessFeed = errmess as any;
        this.openSnackBar(this.errMessFeed, 'Undo'); },
      () => { this.refresh(); this.showSpinner = false; }
    );
  }
  deleteRowData(rowObj: ItemMenu) {
    this.subscriptionDeleteItems = this.settingsTableService.deleteRowData(rowObj).subscribe(items => {
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
      if (data && data.category && data.name && data.price) {

        return data.toString().trim().indexOf(searchString.category) !== -1 &&
          data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1 &&
          data.price.toString().trim().toLowerCase().indexOf(searchString.price.toLowerCase()) !== -1;
      } else {
        return  false;
      }
    };
    return myFilterPredicate;
  }

ngOnInit(): void {
    this.getSetting();
    this.loadData();
    this.subscriptionFilterCategory = this.positionFilter.valueChanges.subscribe((categoryFilterValue) => {
    this.filteredValues.category = categoryFilterValue;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  });

    this.subscriptionFilterName =  this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
    this.filteredValues.name = nameFilterValue;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  });

    this.subscriptionFilterPrice =  this.priceFilter.valueChanges.subscribe((quantityFilterValue) => {
    this.filteredValues.price = quantityFilterValue;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  });
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }
}
