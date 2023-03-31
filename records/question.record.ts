import {QuestionEntity} from "../types";
import {ValidationError} from "../utils/errors";

interface NewQuestionEntity extends Omit<QuestionEntity, 'id'> {
    id?: string;
}

export class QuestionRecord implements QuestionEntity {
    public id: string;
    public name: string;
    public type: "open" | "radio" | "checkbox";

    constructor(obj: NewQuestionEntity) {
        if (!obj.name || obj.name.length > 100) {
            throw new ValidationError('The question cannot be empty or longer than 100 characters!');
        }
        if (obj.type === 'open' || obj.type === 'radio' || obj.type === 'checkbox') {
            throw new ValidationError('Question type must be one of the given options!');
        }
        this.name = obj.name;
        this.type = obj.type;
    }
}