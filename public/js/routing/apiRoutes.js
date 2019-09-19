const data = require('../../../app/data/friends.js')


module.exports = (app)=>{
   
   
app.get('/api/friends', (req, res) => {
    console.log(data)
    return res.json(data);


})
app.get("/api/friends/:user", function (req, res) {
    var displayFriend = req.params.user.toLowerCase();


    console.log(data)
    for (var i = 0; i < data.length; i++) {
        if (displayFriend === data[i].firstName) {
            return res.json(data[i]);
        }
    }
    return res.json(false);
})

app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    if (data) {
      data.push(req.body);
      res.json(true);
    }
    else {
      alert("Please enter name")
    }
  });
}