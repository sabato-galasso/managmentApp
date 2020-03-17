import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-alcolici',
  templateUrl: './alcolici.component.html',
  styleUrls: ['./alcolici.component.scss']
})
export class AlcoliciComponent implements OnInit {

  paramId: string;
  items = [{'name':'test'}];

  constructor(private route: ActivatedRoute) {
    this.paramId =  this.route.snapshot.params.id;
  }

  ngOnInit(): void {
  }
  catogories: any[] = [
    {
      value: 'bevande', viewValue: 'panini', children: [{
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
    {value: 'cocktails', viewValue: 'panini'},
    {value: 'birre', viewValue: 'panini'},
    {value: 'alcolici', viewValue: 'Alcolici',children: 'alcolici'},
    {value: 'panini', viewValue: 'panini',children: 'panini'}
  ];

  detect($event: any) {
    console.log('event',$event)
    this.items.push({'name':'test'})
  }
}
