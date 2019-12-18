import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SettingsTable} from '../models/SettingsTable';
import {SettingsTableService} from '../services/settings-table.service';
import {MatDialog, MatTable} from '@angular/material';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';



export interface UsersData {
  name: string;
  category: string;
  id: number;
}

const ELEMENT_DATA: UsersData[] = [
  {id: 1560608769632, category: 'Artificial Intelligence', name: 'Artificial Intelligence'},
  {id: 1560608796014,  category: 'Artificial Intelligence', name: 'Machine Learning'},
  {id: 1560608787815,  category: 'Artificial Intelligence', name: 'Robotic Process Automation'},
  {id: 1560608805101,  category: 'Artificial Intelligence', name: 'Blockchain'}
];
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private fb: FormBuilder, private settingsTableService: SettingsTableService, public dialog: MatDialog) {
    this.createForm();
  }

  @ViewChild('fform', {static: true}) feedbackFormDirective;

  tablesForm: FormGroup;
  setTable: SettingsTable;
  setTableCopy: SettingsTable;
  errMessFeed: string;
  showSpinner = false;

  gettedSetting: SettingsTable;


  // Table
  displayedColumns: string[] = ['id', 'category', 'name', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;


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

    this.onValueChanged(); // (reset validation messages now
  }

getSetting() {
  this.settingsTableService.getSettingsTable().subscribe(tables => {
      this.gettedSetting = tables;
      this.setTableCopy = tables;
      this.tablesForm.controls.quantity.setValue(this.gettedSetting.quantity);
      this.tablesForm.controls.price.setValue(this.gettedSetting.price);

    },
    errmess => { this.gettedSetting = null; this.setTableCopy = null; this.errMessFeed = errmess as any; },
    () => {console.log('Observable finished', this.gettedSetting);  this.showSpinner = false; }
  );
}

  onSubmit() {
    this.setTable = this.tablesForm.value;
    this.setTable._id = this.gettedSetting._id;
    this.showSpinner = true;
    this.settingsTableService.submitSettingsTable(this.setTable).subscribe(tables => {
        this.setTable = tables; this.setTableCopy = tables;
      },
      errmess => { this.setTable = null; this.setTableCopy = null; this.errMessFeed = errmess as any; },
      () => {console.log('Observable finished');  this.showSpinner = false; }
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
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '350px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj) {
    const d = new Date();
    this.dataSource.push({
      id: d.getTime(),
      name: row_obj.name
    });
    this.table.renderRows();

  }
  updateRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === row_obj.id) {
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== row_obj.id;
    });
  }


ngOnInit(): void {
    this.getSetting();
  }




}
