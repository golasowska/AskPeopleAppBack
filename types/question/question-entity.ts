export interface NewQuestionEntity extends Omit<QuestionEntity, 'id'> {
    id?: string;
}

export interface QuestionEntity {
    id: string;
    name: string;
    type: 'open' | 'radio' | 'checkbox';
}