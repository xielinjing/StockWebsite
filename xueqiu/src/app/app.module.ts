import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './view/index/index.component';
import { ChooseComponent } from './view/choose/choose.component';
import { NewstockComponent } from './view/newstock/newstock.component';
import { RecommendComponent } from './component/recommend/recommend.component';
import { DayinfoComponent } from './component/dayinfo/dayinfo.component';
import { TimePipe } from './pipe/time.pipe';
import { CstockComponent } from './view/cstock/cstock.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ChooseComponent,
    NewstockComponent,
    RecommendComponent,
    DayinfoComponent,
    TimePipe,
    CstockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
