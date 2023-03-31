import {Router} from "express";
import {QuestionRecord} from "../records/question.record";

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
    });