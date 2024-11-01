import { SectionComponent } from './section/section.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionBankComponent } from './question-bank/question-bank.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path:'home',
    component:SectionComponent
  },
  {
    path:'bank',
    component:QuestionBankComponent
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
