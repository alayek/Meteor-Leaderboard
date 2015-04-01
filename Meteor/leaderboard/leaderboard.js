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
  console.log("Hello client");
  Template.leaderboard.helpers({
    'player': function(){
       return PlayerList.find(); 
    }
  });
}



