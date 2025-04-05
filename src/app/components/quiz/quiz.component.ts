import { Component, inject, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Router, RouterLink } from '@angular/router';
import { Question } from '../../models/quiz.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  public quizService = inject(QuizService);
  private router = inject(Router);

  currentQuestion!: Question;
  selectedAnswers: number[] = [];
  progress = 0;

  ngOnInit(): void {
    this.loadQuestion();
    this.calculateProgress();
  }

  private loadQuestion(): void {
    const quiz = this.quizService.getQuiz(1);
    this.currentQuestion = quiz.questions[this.quizService.getCurrentQuestionIndex()];
  }

  toggleAnswer(answerId: number): void {
    const index = this.selectedAnswers.indexOf(answerId);
    
    if (this.currentQuestion.questionType === 'single') {
      this.selectedAnswers = [answerId];
    } else {
      if (index > -1) {
        this.selectedAnswers.splice(index, 1);
      } else {
        this.selectedAnswers.push(answerId);
      }
    }
  }

  nextQuestion(): void {
    this.quizService.saveAnswer(
      this.currentQuestion.id, 
      this.selectedAnswers
    );

    if (this.quizService.hasNextQuestion()) {
      this.quizService.goToNextQuestion();
      this.loadQuestion();
      this.selectedAnswers = [];
      this.calculateProgress();
    } else {
      this.router.navigate(['/result']);
    }
  }

  private calculateProgress(): void {
    const total = this.quizService.getTotalQuestions();
    this.progress = ((this.quizService.getCurrentQuestionIndex() + 1) / total) * 100;
  }
}