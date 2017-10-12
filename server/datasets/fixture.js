var mongoose = require('mongoose');
module.exports = mongoose.model('Fixture', {
    date: Date,
    status: String,
    homeTeamName: String,
    awayTeamName: String,
    matchday: Number, 
    competitions: String,
    result: {
        goalsHomeTeam: Number,
        goalsAwayTeam: Number,
        halfTime: {
            goalsHomeTeam: Number,
            goalsAwayTeam: Number
        }
    }
}); 