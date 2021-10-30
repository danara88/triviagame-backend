const Ranking = require('../models/ranking');

const getTopRankings = async (req, res) => {
    const { topNumber = 5 } = req.query;

    const [total, rankings] = await Promise.all([
        Number(topNumber),
        Ranking.find().sort('-totalScore')
                      .populate('user', 'fullName')
                      .limit(Number(topNumber))
    ]);

    res.json({
        total,
        rankings
    });
}


module.exports = {
    getTopRankings
}