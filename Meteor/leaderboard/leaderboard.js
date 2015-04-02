// do not use var
// use var only if it should not be in global scope
PlayerList = new Mongo.Collection("Players");

/*
PlayerList.insert({
    name : "David",
    score: 0
});
  
PlayerList.insert({
    name : "Bob",
    score: 0
});

PlayerList.insert({
    name : "Marylin",
    score: 0
});

PlayerList.insert({
    name : "Tim",
    score: 0
});

PlayerList.insert({
    name : "Warren",
    score: 0
});

PlayerList.insert({
    name : "Johan",
    score: 0
});
*/
if (Meteor.isClient) {
  // helpers for templates
  Template.leaderboard.helpers({
    'player': function(){
       return PlayerList.find({}, {sort: {score: -1, name: 1}}); 
    },
    
    'selectedClass' : function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if (selectedPlayer === playerId) {
        return "selected";
      }
    }
  });
  
  Template.leaderboard.events({
    
    'click .player' : function(){
        var playerId = this._id;
        Session.set('selectedPlayer', playerId);
        var selectedPlayer = Session.get('selectedPlayer');
    },
    
    'click .increment' : function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayerList.update(selectedPlayer, {$inc: {score: 5}});
    },
    
    'click .decrement' : function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayerList.update(selectedPlayer, {$inc: {score: -5}});
    }
  });
}



