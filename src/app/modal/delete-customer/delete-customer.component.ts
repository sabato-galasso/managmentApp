import { Component, Inject, Optional } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { WareHouse } from '../../models/WareHouse'

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.scss'],
})
export class DeleteCustomerComponent {
  action: string
  localData: any

  constructor(
    public dialogRef: MatDialogRef<DeleteCustomerComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: WareHouse
  ) {
    this.localData = { ...data }
    this.action = this.localData.action
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.localData })
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' })
  }
}
