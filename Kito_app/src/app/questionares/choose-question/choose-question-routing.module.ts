import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseQuestionPage } from './choose-question.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseQuestionPageRoutingModule {}
