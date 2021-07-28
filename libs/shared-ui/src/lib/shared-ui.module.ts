import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideTabsComponent } from './side-tabs/side-tabs.component';
import { AccordionComponent } from './accordion/accordion.component';
import { SideTabComponent } from './side-tabs/side-tab/side-tab.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMasonryModule } from 'ngx-masonry';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    NgxMasonryModule,
    MatCardModule,
    MatButtonModule,
    InfiniteScrollModule
  ],
  declarations: [SideTabsComponent, AccordionComponent, SideTabComponent],
  exports: [
    SideTabsComponent,
    AccordionComponent,
    SideTabComponent,
    MatIconModule,
    MatTooltipModule,
    NgxMasonryModule,
    MatCardModule,
    MatButtonModule,
    InfiniteScrollModule
  ],
})
export class SharedUiModule {}
