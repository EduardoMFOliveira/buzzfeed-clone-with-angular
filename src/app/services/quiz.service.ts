import { Injectable } from '@angular/core';
import { Quiz, Question, Answer, Result } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private currentQuiz!: Quiz;
  private userAnswers: Map<number, number[]> = new Map();
  public currentQuestionIndex = 0;

  getQuiz(id: number): Quiz {
    this.currentQuiz = {
      id: 1,
      title: 'Qual desenvolvedor fullstack você é?',
      description: 'Descubra seu perfil',
      questions: [
        {
          id: 1,
          text: 'Qual é sua stack preferida?',
          questionType: 'single',
          answers: [
            { id: 1, text: 'Angular + Spring', score: 5 },
            { id: 2, text: 'React + Node.js', score: 3 },
            { id: 3, text: 'Vue + Django', score: 4 }
          ]
        },
        {
          id: 2,
          text: 'Selecione suas habilidades:',
          questionType: 'multiple',
          answers: [
            { id: 4, text: 'TypeScript', score: 5 },
            { id: 5, text: 'Java', score: 4 },
            { id: 6, text: 'Python', score: 3 }
          ]
        }
      ]
    };
    return this.currentQuiz;
  }

  saveAnswer(questionId: number, answerIds: number[]): void {
    this.userAnswers.set(questionId, answerIds);
  }

  calculateResult(): Result {
    let totalScore = 0;
    this.userAnswers.forEach((answers) => {
      answers.forEach(answerId => {
        const answer = this.currentQuiz.questions
          .flatMap(q => q.answers)
          .find(a => a.id === answerId);
        totalScore += answer?.score || 0;
      });
    });
    return this.getResultBasedOnScore(totalScore);
  }

  // Novos métodos adicionados
  getCurrentQuestionIndex(): number {
    return this.currentQuestionIndex;
  }

  getTotalQuestions(): number {
    return this.currentQuiz?.questions.length || 0;
  }

  hasNextQuestion(): boolean {
    return this.currentQuestionIndex < this.getTotalQuestions() - 1;
  }

  goToNextQuestion(): void {
    this.currentQuestionIndex++;
  }

  private getResultBasedOnScore(score: number): Result {
    if (score > 15) {
      return {
        title: 'Fullstack Master',
        description: 'Você domina todas as camadas!',
        image: 'https://example.com/fullstack.png'
      };
    }
    return {
      title: 'Frontend Specialist',
      description: 'Seu forte é a interface do usuário!',
      image: 'https://example.com/frontend.png'
    };
  }
}