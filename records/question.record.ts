import {AnswerEntity, NewQuestionEntity, QuestionEntity, SimpleQuestionEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

type QuestionRecordResults = [QuestionEntity[], FieldPacket[]];

export class QuestionRecord implements QuestionEntity {
    public id: string;
    public name: string;
    public type: "open" | "radio" | "checkbox";
    public answers: AnswerEntity[] | null;

    constructor(obj: NewQuestionEntity) {
        if (!obj.name || obj.name.length > 100) {
            throw new ValidationError('The question cannot be empty or longer than 100 characters!');
        }
        if (!(obj.type === 'open' || obj.type === 'radio' || obj.type === 'checkbox')) {
            throw new ValidationError('Question type must be one of the given options!');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.type = obj.type;
        this.answers = obj.answers;
    }

    static async getOne(id: string): Promise<QuestionRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `questions` WHERE `id` = :id", {
            id,
        }) as QuestionRecordResults;
        return results.length === 0 ? null : new QuestionRecord(results[0]);
    }

    // static async findAll(name: string): Promise<SimpleQuestionEntity[]> {
    //     const [results] = await pool.execute("SELECT * FROM `questions` WHERE `name` LIKE :search", {
    //         search: `%${name}%`,
    //     }) as QuestionRecordResults;
    //
    //     return results.map(result => {
    //         const {id, name} = result;
    //         return {id, name};
    //     });
    // }

    static async getAll(): Promise<SimpleQuestionEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `questions`") as QuestionRecordResults;
        return results.map(result => {
            const {id, name, type} = result;
            return {id, name, type};
        });
    }

    async insert(): Promise<void> {
        const ans = this.answers ? this.answers.map(a => ({id: uuid(), text: a.text, votes: 0})) : null;
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted!');
        }
        await pool.execute("INSERT INTO `questions`(`id`, `name`, `type`, `answers`) VALUES(:id, :name, :type, :answers )", {
            id: this.id,
            name: this.name,
            type: this.type,
            answers: ans,
        });
    }

    async update(answerBody: string[]): Promise<void> {
        let ans: AnswerEntity[] | null;
        if(this.type === "open") {
            if(this.answers === null) {
                ans = [{"id": uuid(), "text": answerBody[0]}];
            } else {
                ans = [...this.answers, {"id": uuid(), "text": answerBody[0]}];
            }
        } else {
            ans = this.answers.map(a =>  ( answerBody.indexOf(a.id) > -1 ? {...a, votes: a.votes + 1} : a) )
        }
        await pool.execute("UPDATE `questions` SET `answers` = :answers WHERE `id` = :id", {
            id: this.id,
            answers: ans,
        });
    }
}