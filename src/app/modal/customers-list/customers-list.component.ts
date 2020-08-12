import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent implements OnInit {
  listCustomer: any
  constructor(
    public dialogRef: MatDialogRef<CustomersListComponent>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const grouped = data.listCustomer
      .sort((a, b) => a.localeCompare(b))
      .reduce((groups, contact) => {
        const letter = contact.charAt(0).toUpperCase()

        groups[letter] = groups[letter] || []
        groups[letter].push(contact)

        return groups
      }, {})

    const result = Object.keys(grouped).map((key) => ({
      key,
      contacts: grouped[key],
    }))
    this.listCustomer = result
    console.log(result)
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  ngOnInit(): void {}

  redirectTo(uri: string, action?: string) {
    if (action === 'find') {
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate([uri]))
        .finally(() => {
          this.dialogRef.close()
        })
    }
  }
}
