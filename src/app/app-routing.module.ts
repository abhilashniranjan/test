import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { Chart2Component } from './chart2/chart2.component';
import { AaaComponent } from './aaa/aaa.component';


const routes: Routes = [
  {path:"",component:ChartComponent},
  {path:"cart",component:Chart2Component},
  /*
  //  {path:"new/:onedata/:twodata",component:Chart2Component}
*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
