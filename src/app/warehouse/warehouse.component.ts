import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {WarehouseService} from '../services/warehouse.service';
import {WareHouse} from '../models/WareHouse';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'name', 'quantity', 'price'];
  dataSource;
  errMessFeed: string;
  showSpinner = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private warehouseService: WarehouseService) {
    const menuItems = [];

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(menuItems);
  }

  ngOnInit() {
    this.getItemsWarehouse();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getItemsWarehouse() {
     this.warehouseService.getWareHouse().subscribe(items => {
         this.dataSource.data = items;
         this.dataSource._updateChangeSubscription();

         console.log('Observableww finished', items);
      },
      errmess => { this.errMessFeed = errmess as any; },
      () => {console.log('Observable finished', this.dataSource);  this.showSpinner = false; }
    );
  }
}
