import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './index/main.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { 
    path: '',
    component: MainComponent
  },
  {
    path: 'result/:testid/:userid',
    component: ResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { 
 
}
