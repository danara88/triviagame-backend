const { ObjectId } = require('mongoose').Types;
const moment = require('moment');
const Question = require('../models/question');

const getQuestions = async (req, res) => {
    const { from = 0, limit = 10 } = req.query;
    const query = {status: true};

    const [total, questions] = await Promise.all([
        Question.countDocuments(query),
        Question.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    return res.status(200).json({
        total,
        questions
    });
}


const getQuestionsByCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { from = 0, limit = 10 } = req.query;
    const query = {status: true, category: categoryId};

    const [total, questions] = await Promise.all([
        Question.countDocuments(query),
        Question.find(query)
            .populate('options')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    return res.status(200).json({
        total,
        questions
    });
}


const getQuestion = async (req, res) => {
    const { id } = req.params;
    
    const question = await Question.findById(id)
                        .populate('category', 'name');

    return res.status(200).json( question );
}


const createQuestion = async (req, res) => {
    const { category, sentence, score = 10 } = req.body;

    let dataToSave = {
        category,
        sentence,
        score
    }

    const question = new Question( dataToSave );
    
    await question.save();
    res.status(201).json(question);

}


const assignCorrectAnswer = async (req, res) => {
    const { questionId } = req.params;
    const { answer } = req.body;
    
    const questionDB = await Question.findById(questionId);

    if (!questionDB.status) return res.status(400).json({ message: 'The question is not available' });
    if (!questionDB.options.includes(answer)) return res.status(400).json({ message: 'We can not assign this answer to the question' });
    
    const question = await Question.findByIdAndUpdate(questionId, { correctAnswer: answer }, {new: true});

    res.json(question);
}


const updateQuestion = async (req, res) => {
    const { id } = req.params;
    const { _id, status, ...data } = req.body;

    data.updatedAt = moment().unix();
    const question = await question.findByIdAndUpdate(id, data, {new: true});

    return res.status(200).json( question );
}


const deleteQuestion = async (req, res) => {
    const { id } = req.params;
    const question = await Question.findByIdAndUpdate(id, {status: false}, {new: true});
    
    return res.status(200).json(question);
}


module.exports = {
    createQuestion,
    getQuestions,
    getQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestionsByCategory,
    assignCorrectAnswer
}