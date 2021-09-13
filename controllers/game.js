const Game = require('../models/game');
const Ranking = require('../models/ranking');
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
    const { _id: user } = req.user;

    const gameDB = await Game.findById(id);
    let startDateTime = gameDB.startDateTime;  

    let endDateTime = new Date();
    let hourFormat = getHourFormatDiff(startDateTime, endDateTime);

    const data = {
        totalScore,
        endDateTime,
        timeGame: hourFormat,
        updatedAt: moment().unix()
    }

    // Update game
    const game = await Game.findByIdAndUpdate(id, data, {new: true});

    // Update ranking
    const rankingDB = await Ranking.findOne({ user });
    let newScore = rankingDB.totalScore + game.totalScore;
    rankingDB.totalScore = newScore;
    await rankingDB.save();

    res.json(game);
}

module.exports = {
    createGame,
    endGame,
}