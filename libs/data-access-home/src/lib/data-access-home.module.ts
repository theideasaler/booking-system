import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { DataAccessHomeState } from './data-access-home.state';
import { DataAccessHomeService } from './data-access-home.service';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([DataAccessHomeState])],
  providers: [DataAccessHomeService]
})
export class DataAccessHomeModule {}
