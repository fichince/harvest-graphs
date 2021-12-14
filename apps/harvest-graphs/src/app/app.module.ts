import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgxEchartsModule } from 'ngx-echarts';

import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { GraphConfigMenuComponent } from './components/graph-config-menu/graph-config-menu.component';
import { ButtonGroupComponent } from './components/button-group/button-group.component';
import { TimeFramePickerComponent } from './components/time-frame-picker/time-frame-picker.component';
import { GraphComponent } from './components/graph/graph.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphConfigMenuComponent,
    ButtonGroupComponent,
    TimeFramePickerComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
