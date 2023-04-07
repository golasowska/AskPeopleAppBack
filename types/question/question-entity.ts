import {AnswerEntity} from "../answer";

export interface NewQuestionEntity {
    id?: string;
    name: string;
    type: 'open' | 'radio' | 'checkbox';
    answers: AnswerEntity[] | null;
}

export interface SimpleQuestionEntity {
    id: string;
    name: string;
    type: 'open' | 'radio' | 'checkbox';
}

export interface QuestionEntity extends SimpleQuestionEntity {
    answers: AnswerEntity[] | null;
}