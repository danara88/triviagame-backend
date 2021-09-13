const { Answer, Question } = require('../models');
const moment = require('moment');


const createAnswer = async (req, res = response) => {
    const { question, content } = req.body;

    // Create an instance of answer
    const answer = new Answer({ question, content });

    // Search for the question
    const questionDB = await Question.findById(question);

    // Add new option in the question
    if (questionDB.options.length >= 4) return res.status(400).json({ message: 'Limit of options reached' });
    questionDB.options.push(answer); 
    
    // Save answer and question in respective table data base
    await answer.save();
    await questionDB.save();

    return res.status(201).json({
        answer,
        question: questionDB
    });
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