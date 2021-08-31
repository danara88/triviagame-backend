const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Database connected !');

    } catch(error) {
        console.log(error);
        throw new Error('Something went wrong on the database connection');
    }
}

module.exports = {
    connectDB
}