import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchItem } from '@booking-system/models';

@Component({
  selector: 'bs-accordion-panel',
  templateUrl: './accordion-panel.component.html',
  styleUrls: ['./accordion-panel.component.scss']
})
export class AccordionPanelComponent implements OnInit {
  @Input() item!: SearchItem;
  @Input() active!: boolean;
  @Output() togglePanel = new EventEmitter<AccordionPanelComponent>();

  constructor() { }

  ngOnInit(): void {
  }

  activatePanel(){
    this.togglePanel.emit(this);
  }
}
