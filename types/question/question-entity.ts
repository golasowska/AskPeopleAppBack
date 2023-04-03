import {AnswerEntity, NewAnswerEntity} from "../answer";

export interface NewQuestionEntity {
    id?: string;
    name: string;
    type: 'open' | 'radio' | 'checkbox';
    answers: AnswerEntity[] | null;
}

export interface NewQuestionEntityInForm {
    id?: string;
    name: string;
    type: 'open' | 'radio' | 'checkbox';
    answers: NewAnswerEntity[] | null;
}

export interface SimpleQuestionEntity {
    id: string;
    name: string;
}

export interface QuestionEntity extends SimpleQuestionEntity {
    type: 'open' | 'radio' | 'checkbox';
    answers: AnswerEntity[] | null;
}