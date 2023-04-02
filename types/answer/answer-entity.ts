export interface AnswerEntity  {
    id: string;
    text: string;
    votes: number;
}

export interface AnswerEntityInForm {
    id: number;
    text: string;
    added: boolean;
}