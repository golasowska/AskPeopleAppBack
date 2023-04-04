export interface NewAnswerEntity  {
    id?: string;
    text: string;
    votes?: number;
}

export interface AnswerEntity  {
    id: string;
    text: string;
    votes: number;
}

export interface AnswerOpenEntity  {
    id: string;
    text: string;
}

export interface AnswerChange {
    answerBody: string[];
}