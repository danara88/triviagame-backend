const { Answer } = require('../models');
const moment = require('moment');


const createAnswer = async (req, res = response) => {
    const { question, content } = req.body;

    const answer = new Answer({ question, content });
    
    await answer.save();
    return res.status(201).json(answer);
}


const getAnswersByQuestion = async (req, res) => {
    const { questionId } = req.params;
    const { from = 0, limit = 4 } = req.query;

    const query = { status: true, question: questionId }
    
    const [total, answers] = await Promise.all([
        Answer.countDocuments(query),
        Answer.find(query)
                .limit(Number(limit))
                .skip(Number(from))
    ]);

    res.json({
        total,
        answers
    });
}

const updateAnswer = async (req, res) => {
    const { id } = req.params;
    const { _id, status, ...data } = req.body;

    data.updatedAt = moment().unix();
    const answer= await Answer.findByIdAndUpdate(id, data, {new: true});

    return res.status(200).json( answer );
}


const deleteAnswer = async (req, res) => {
    const { id } = req.params;
    const answer = await Answer.findByIdAndUpdate(id, {status: false}, {new: true});
    
    return res.status(200).json(answer);
}


module.exports = {
    createAnswer,
    getAnswersByQuestion,
    updateAnswer,
    deleteAnswer,
}