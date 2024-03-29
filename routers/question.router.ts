import {Router} from "express";
import {QuestionRecord} from "../records/question.record";
import {ValidationError} from "../utils/errors";
import {AnswerChange, NewQuestionEntity} from "../types";

export const questionRouter = Router()
    .get('/', async (req, res) => {
        const questions = await QuestionRecord.getAll();
        res.json(questions);
    })
    .get('/:id', async (req, res) => {
        const question = await QuestionRecord.getOne(req.params.id);
        if (question === null) {
            res.json(question);
        } else {
            const answers = question.answers && typeof question.answers === 'string' ? JSON.parse(question.answers): null;
            res.json({...question, answers});
        }
    })
    .post('/', async (req, res) => {
        const question = new QuestionRecord(req.body as NewQuestionEntity);
        await question.insert();
        res.json(question);
    })
    .patch('/:id', async (req, res) => {
        const {body}: { body: AnswerChange } = req;
        const question = await QuestionRecord.getOne(req.params.id);
        if (question === null) {
            throw new ValidationError('Could not find the question.');
        }
        if (body.answerBody.length < 1) {
            throw new ValidationError('Error occured ! Form was submitted without data !');
        }
        await question.update(body.answerBody);
        const updatedQuestion = await QuestionRecord.getOne(req.params.id);
        const answers = updatedQuestion.answers && typeof updatedQuestion.answers === 'string' ? JSON.parse(updatedQuestion.answers): null;
        res.json({...updatedQuestion, answers});
    });
