import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { GraphConfigMenuComponent } from './components/graph-config-menu/graph-config-menu.component';
import { ButtonGroupComponent } from './components/button-group/button-group.component';
import { TimeFramePickerComponent } from './components/time-frame-picker/time-frame-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphConfigMenuComponent,
    ButtonGroupComponent,
    TimeFramePickerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
