export interface AnswerEntity {
    id: string;
    text: string;
    votes?: number;
}

export interface AnswerChange {
    answerBody: string[];
}