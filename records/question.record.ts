import {NewQuestionEntity, QuestionEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type QuestionRecordResults = [QuestionEntity[], FieldPacket[]];

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

        this.id = obj.id;
        this.name = obj.name;
        this.type = obj.type;
    }

    static async getOne(id: string): Promise<QuestionRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `questions` WHERE `id` = :id", {
            id,
        }) as QuestionRecordResults;
        return results.length === 0 ? null : new QuestionRecord(results[0]);
    }
}