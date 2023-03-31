export interface QuestionEntity {
    id: string;
    name: string;
    type: 'open' | 'radio' | 'checkbox';
}