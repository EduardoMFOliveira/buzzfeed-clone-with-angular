import { Component, inject } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Result } from '../../models/quiz.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  result: Result;

  constructor(private quizService: QuizService) {
    this.result = this.quizService.calculateResult();
  }
}