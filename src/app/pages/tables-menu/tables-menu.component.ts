import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tables-menu',
  templateUrl: './tables-menu.component.html',
  styleUrls: ['./tables-menu.component.scss']
})
export class TablesMenuComponent implements OnInit {

  paramId:string;
  constructor(private route: ActivatedRoute) {
    this.paramId =  this.route.snapshot.params.id;
  }

  ngOnInit(): void {
  }

  catogories: any[] = [
    {
      value: 'bevande', viewValue: 'Bevande', children: [{
        spina: [{
          piccola: [{
            item1: '2'
          }
          ],
          media: [{
            item1: '2'

          }
          ],
        }

        ],
      }]
    },
    {value: 'cocktails', viewValue: 'Cocktails'},
    {value: 'birre', viewValue: 'Birre'},
    {value: 'alcolici', viewValue: 'Alcolici', children: 'alcolici'},
    {value: 'panini', viewValue: 'Panini',children: 'panini'}
  ];

}
