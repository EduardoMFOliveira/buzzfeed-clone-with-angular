import { Routes } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultComponent } from './components/result/result.component';

export const routes: Routes = [
  { path: 'quiz/:id', component: QuizComponent },
  { path: 'result', component: ResultComponent },
  { path: '', redirectTo: '/quiz/1', pathMatch: 'full' }
];