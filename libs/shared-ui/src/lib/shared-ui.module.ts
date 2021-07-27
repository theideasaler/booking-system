import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideTabsComponent } from './side-tabs/side-tabs.component';
import { AccordionComponent } from './accordion/accordion.component';
import { SideTabComponent } from './side-tabs/side-tab/side-tab.component';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  declarations: [SideTabsComponent, AccordionComponent, SideTabComponent],
  exports: [SideTabsComponent, AccordionComponent, SideTabComponent, MatIconModule, MatTooltipModule],
})
export class SharedUiModule {}
