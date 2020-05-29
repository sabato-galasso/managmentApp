// dialog-box-create-category.component.ts
import { Component, Inject, Optional } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MenuCategoryResponse} from "../../models/Menu/MenuCategoryResponse";


@Component({
  selector: 'app-dialog-box-menu-category',
  templateUrl: './dialog-box-create-category.component.html',
  styleUrls: ['./dialog-box-create-category.component.scss']
})
export class DialogBoxCreateCategoryComponent {

  action: string;
  localData: any;
  menuCategoryForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxCreateCategoryComponent>,
    private fb: FormBuilder,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: MenuCategoryResponse) {
    this.localData = {...data};
    this.action = this.localData.action;
  }


  createForm(): void {

    this.menuCategoryForm = this.fb.group(
      {
        nameCategory: ['', [Validators.required, Validators.minLength(3)]],
        nameFirstLevel: ['', [Validators.minLength(3)]],
      }
    );
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

}
