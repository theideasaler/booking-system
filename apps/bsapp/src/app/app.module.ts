import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SharedUiModule } from '@booking-system/shared-ui';
import { DataAccessHomeModule } from '@booking-system/data-access-home';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule.forRoot([], { developmentMode: false }),
    NgxsLoggerPluginModule.forRoot(),
    SharedUiModule,
    DataAccessHomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
