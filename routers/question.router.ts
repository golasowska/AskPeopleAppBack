import {Router} from "express";
import {QuestionRecord} from "../records/question.record";
import {ValidationError} from "../utils/errors";
import {AnswerChange} from "../types";

export const questionRouter = Router()
    // .get('/search/:name?', async (req, res) => {
    //     const questions = await QuestionRecord.getAll(req.params.name ?? '');
    //     res.json(questions);
    // })
    .get('/', async (req, res) => {
        const questions = await QuestionRecord.getAll();
        res.json(questions);
    })
    .get('/:id', async (req, res) => {
        const question = await QuestionRecord.getOne(req.params.id);
        res.json(question);
    })
    .post('/', async (req, res) => {
        const question = new QuestionRecord(req.body);
        await question.insert();
        res.json(question);
    })
    .patch('/:id', async (req, res) => {
        const {body}: { body: AnswerChange } = req;
        const question = await QuestionRecord.getOne(req.params.id);
        //
        if (question === null) {
            throw new ValidationError('Could not find the question.');
        }
        if (body.answerBody.length < 1) {
            throw new ValidationError('Error occured ! Form was submitted without data !');
        }
        await question.update(body.answerBody);
        const updatedQuestion = await QuestionRecord.getOne(req.params.id);
        res.json(updatedQuestion);
    });
