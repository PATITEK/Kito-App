import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionaresPage } from './questionares.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionaresPage
  },
  {
    path: 'choose-question',
    loadChildren: () => import('./choose-question/choose-question.module').then( m => m.ChooseQuestionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionaresPageRoutingModule {}
