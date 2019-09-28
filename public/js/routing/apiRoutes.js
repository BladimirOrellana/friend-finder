const people = require('../../../app/data/friends.js')


module.exports = (app)=>{
   
   
app.get('/api/friends', (req, res) => {
    console.log(people)
    return res.json(people);


})
app.get("/api/friends/:user", function (req, res) {
    var displayFriend = req.params.user.toLowerCase();


    console.log(people)
    for (var i = 0; i < people.length; i++) {
        if (displayFriend === people[i].firstName) {
            return res.json(people[i]);
        }
    }
    return res.json(false);
})

app.post("/api/survey", function(req, res) {

  var newF = req.body;
  var found = false;
  var tempDiff = 41;
  var bestMatch = {
    name: "",
    photo: "",
    scores: []
  };

  for (let i = 0; i < people.length; i++) {
    if (newF.firstName === people[i].name) {
      found = true;
      people[i].photo = newF.imageLink;
      people[i].scores = newF.score;
    } else {
      var totalDifference = 0;
      for (let j = 0; j < people[i].scores.length; j++) {
        totalDifference += Math.abs(people[i].scores[j] - newF.score[j]);
      }
      if (totalDifference < tempDiff) {
        tempDiff = totalDifference;
        bestMatch = people[i];
      }
    }
  }

  if (!found) {
    people.push(newF);
  }

  res.json(bestMatch);

});
}