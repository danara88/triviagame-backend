const Game = require('../models/game');
const moment = require('moment');
const { getHourFormatDiff } = require('../helpers');

const createGame = async (req, res) => {
    const { category } = req.body;
    const { _id: user } = req.user;

    const game = new Game({ user, category });
    await game.save();

    res.json(game);
}

const endGame = async (req, res) => {
    const { id } = req.params;
    const { totalScore = 0 } = req.body;

    const gameDB = await Game.findById(id);
    let startDateTime = gameDB.startDateTime;  

    if (gameDB.endDateTime) {
        return res.status(400).json({
            message: 'The game has been already completed'
        });
    }

    let endDateTime = new Date();
    let hourFormat = getHourFormatDiff(startDateTime, endDateTime);

    const data = {
        totalScore,
        endDateTime,
        timeGame: hourFormat,
        updatedAt: moment().unix()
    }

    const game = await Game.findByIdAndUpdate(id, data, {new: true});
    res.json(game);
}

module.exports = {
    createGame,
    endGame,
}