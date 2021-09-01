const Question = require('../models/question');
const moment = require('moment');

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

    const question = new Question({ category, sentence, score });
    
    await question.save();
    return res.status(201).json(question);

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
}