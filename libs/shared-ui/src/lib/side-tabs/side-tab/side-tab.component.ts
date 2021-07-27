import { Component, Input, OnInit } from '@angular/core';
import { SearchItem } from '@booking-system/models';

@Component({
  selector: 'bs-side-tab',
  templateUrl: './side-tab.component.html',
  styleUrls: ['./side-tab.component.scss']
})
export class SideTabComponent implements OnInit {
  @Input() item!: SearchItem;
  @Input() active!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
