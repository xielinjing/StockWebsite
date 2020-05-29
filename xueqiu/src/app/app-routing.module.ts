import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from "./view/index/index.component";
import { ChooseComponent } from "./view/choose/choose.component";
import { NewstockComponent } from "./view/newstock/newstock.component";
import { RecommendComponent } from "./component/recommend/recommend.component";
import { DayinfoComponent } from "./component/dayinfo/dayinfo.component";



const routes: Routes = [
  {
    path:"",
    component:IndexComponent,
    children:[
      {
        path:'',
        component:RecommendComponent
      },
      {
        path:"recommendation",
        component:RecommendComponent
      },
      {
        path:"dayinfo",
        component:DayinfoComponent
      },
      {
        path:"hushen",
        component:RecommendComponent
      },
      {
        path:"innovation",
        component:RecommendComponent
      }
      
    ]
  },
  {
    path:"screener",
    component:ChooseComponent
  },
  {
    path:"newstock",
    component:NewstockComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
