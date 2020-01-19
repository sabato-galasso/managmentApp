import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
@Component({
  selector: 'app-toast',
  template: 'passed in {{ data }}',
})
export class ToastComponent  {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

}
