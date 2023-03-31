export interface NewQuestionEntity extends Omit<QuestionEntity, 'id'> {
    id?: string;
}

export interface SimpleQuestionEntity {
    id: string;
    name: string;
}

export interface QuestionEntity extends SimpleQuestionEntity{
    type: 'open' | 'radio' | 'checkbox';
}