const { Category } = require('../models');
const moment = require('moment');

const getCategories = async (req, res) => {
    const { from = 0, limit = 10 } = req.query;
    const query = {status: true};

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    return res.status(200).json({
        total,
        categories
    });
}


const getCategory = async (req, res) => {
    const { id } = req.params;
    
    const category = await Category.findById(id);

    return res.status(200).json( category );
}


const createCategory = async (req, res = response) => {
    const { name } = req.body;

    const categoryDB = await Category.findOne({ name });
    if ( categoryDB ) {
        return res.status(400).json({
            msg: `The category ${categoryDB.name} already exists`
        });
    }

    const category = new Category({ name });
    
    await category.save();
    return res.status(201).json(category);

}


const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { _id, status, ...data } = req.body;

    const categoryDB = await Category.findOne({name: data.name});
    if ( categoryDB ) {
        return res.status(400).json({
            msg: `The category ${data.name} already exists.`
        });
    }

    data.updatedAt = moment().unix();
    const category = await Category.findByIdAndUpdate(id, data, {new: true});

    return res.status(200).json( category );
}


const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, {status: false}, {new: true});
    
    return res.status(200).json(category);
}


module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
}