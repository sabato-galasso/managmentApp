import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SettingsTable} from '../models/SettingsTable';
import {SettingsTableService} from '../services/settings-table.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @ViewChild('fform', {static: false}) feedbackFormDirective;

  tablesForm: FormGroup;
  setTable: SettingsTable;
  setTableCopy: SettingsTable;
  errMessFeed: string;
  showSpinner = false;

  gettedSetting: SettingsTable;

  constructor(private fb: FormBuilder, private settingsTableService: SettingsTableService) {
    this.createForm();
  }


  formErrors = {
    quantity: 1,
    price: 1
  };

  validationMessages = {
    quantity: {
      required:      'Quantity is required.',
      minlength:     'Numero minimo di tavoli - 1'
    },
    price: {
      required:      'Price is required.',
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

  ngOnInit(): void {
    this.getSetting();
  }

}
