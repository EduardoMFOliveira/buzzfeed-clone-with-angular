// quiz.model.ts
export interface Quiz {
    id: number;
    title: string;
    description: string;
    questions: Question[];
  }
  
  export interface Question {
    id: number;
    text: string;
    answers: Answer[];
    questionType: 'single' | 'multiple' | 'text';
  }
  
  export interface Answer {
    id: number;
    text: string;
    score: number;
  }
  
  export interface Result {
    title: string;
    description: string;
    image?: string;
  }