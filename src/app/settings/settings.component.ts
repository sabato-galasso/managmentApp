import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SettingsTable } from '../models/SettingsTable'
import { SettingsTableService } from '../services/settings-table.service'
import { ItemMenu } from '../models/ItemMenu'
import { Subject, Subscription } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTable } from '@angular/material/table'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  // Subsciptions
  private componetDestroyed = new Subject()
  subscriptionGetSettings: Subscription

  constructor(
    private fb: FormBuilder,
    private settingsTableService: SettingsTableService,
    public dialog: MatDialog
  ) {
    this.createForm()
  }

  @ViewChild('fform', { static: true }) feedbackFormDirective
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatTable, { static: true }) table: MatTable<ItemMenu>

  tablesForm: FormGroup
  setTable: SettingsTable
  setTableCopy: SettingsTable
  errMessFeed: string
  showSpinner = false

  gettedSetting: SettingsTable

  formErrors = {
    quantity: 1,
    price: 10,
  }

  validationMessages = {
    quantity: {
      required: 'Quantity is required.',
      minlength: 'Numero minimo di tavoli - 1',
    },
    price: {
      required: 'Price is required.',
    },
  }

  createForm(): void {
    this.tablesForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.minLength(1)]],
      internal: [1, [Validators.required, Validators.minLength(1)]],
      external_s: [1, [Validators.required, Validators.minLength(1)]],
      external_c: [1, [Validators.required, Validators.minLength(1)]],
      price: [10, [Validators.required]],
    })

    this.tablesForm.valueChanges.subscribe((data) => this.onValueChanged(data))

    this.onValueChanged()
    // reset validation messages now
  }

  getSetting() {
    this.subscriptionGetSettings = this.settingsTableService
      .getSettingsTable()
      .subscribe(
        (tables) => {
          this.gettedSetting = tables
          this.setTableCopy = tables
          this.tablesForm.controls.quantity.setValue(
            this.gettedSetting.quantity
          )
          this.tablesForm.controls.internal.setValue(
            this.gettedSetting.internal
          )
          this.tablesForm.controls.external_s.setValue(
            this.gettedSetting.external_s
          )
          this.tablesForm.controls.external_c.setValue(
            this.gettedSetting.external_c
          )
          this.tablesForm.controls.price.setValue(this.gettedSetting.price)
        },
        (errmess) => {
          this.gettedSetting = null
          this.setTableCopy = null
          this.errMessFeed = errmess as any
        },
        () => {
          this.showSpinner = false
        }
      )
  }

  onSubmit() {
    this.setTable = this.tablesForm.value
    this.setTable._id = this.gettedSetting._id || '0'
    this.showSpinner = true

    this.settingsTableService.submitSettingsTable(this.setTable).subscribe(
      (tables) => {
        this.setTable = tables
        this.setTableCopy = tables
      },
      (errmess) => {
        this.setTable = null
        this.setTableCopy = null
        this.errMessFeed = errmess as any
      },
      () => {
        this.showSpinner = false
      }
    )
  }

  onValueChanged(data?: any) {
    if (!this.tablesForm) {
      return
    }
    const form = this.tablesForm
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = ''
        const control = form.get(field)
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field]
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' '
            }
          }
        }
      }
    }
  }

  ngOnInit(): void {
    this.getSetting()
  }

  ngOnDestroy() {
    this.componetDestroyed.next()
    this.componetDestroyed.unsubscribe()
  }
}
