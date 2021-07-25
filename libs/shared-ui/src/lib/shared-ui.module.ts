import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideTabsComponent } from './side-tabs/side-tabs.component';
import { AccordionComponent } from './accordion/accordion.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SideTabsComponent,
    AccordionComponent
  ],
  exports: [
    SideTabsComponent,
    AccordionComponent
  ],
})
export class SharedUiModule {}
