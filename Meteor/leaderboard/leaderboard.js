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

// Code that only runs on the client 
if(Meteor.isClient){

  // "Catch" the selection of data from the Meteor.publish function
  Meteor.subscribe('thePlayers');

  // Helper functions 
  Template.leaderboard.helpers({
    'player': function(){

      // Get the ID of the current user
      var currentUserId = Meteor.userId();

      // Retrieve data that belongs to the current user
      return PlayerList.find({createdBy: currentUserId},
                              {sort: {score: -1, name: 1}});

    },
    
    'showSelectedPlayer': function(){

      // Get the ID of the player that's been clicked
      var selectedPlayer = Session.get('selectedPlayer');

      // Retrieve a single document from the collection
      return PlayerList.findOne(selectedPlayer)

    },
    'selectedClass': function(){

        // Get the ID of the player being iterated through
        var playerId = this._id;

        // Get the ID of the player that's been clicked
        var selectedPlayer = Session.get('selectedPlayer');

         // Do these IDs match?
        if(playerId == selectedPlayer){

            // Return a CSS class
            return "selected"

        }

    }
  });

  // Events 
  Template.leaderboard.events({
      'click .player': function(){

          // Retrieve the unique ID of the player that's been clicked
          var playerId = this._id;

          // Create a session to store the unique ID of the clicked player
          Session.set('selectedPlayer', playerId);

      },
      'click .increment': function(){

        // Get the ID of the player that's been clicked
        var selectedPlayer = Session.get('selectedPlayer');

        // Update a document and increment the score field by 5
        PlayerList.update(selectedPlayer, {$inc: {score: 5} });

      },
      'click .decrement': function(){

        // Get the ID of the player that's been clicked
        var selectedPlayer = Session.get('selectedPlayer');

        // Update a document and decrement the score field by 5
        PlayerList.update(selectedPlayer, {$inc: {score: -5} });

      },
      'click .remove': function(){

        // Get the ID of the player that's been clicked
        var selectedPlayer = Session.get('selectedPlayer');

        // Remove a document from the collection
        PlayerList.remove(selectedPlayer);

      }
  });

  Template.addPlayerForm.events({
    'submit form': function(event){

        // Prevent the browser from applying default behaviour to the form
        event.preventDefault();

        // Get the value from the "playerName" text field
        playerNameVar = event.target.playerName.value;

        // Get the ID of the current user
        var currentUserId = Meteor.userId();

        // Insert the new player into the collection
        PlayerList.insert({
          name: playerNameVar,
          score: 0,
          createdBy: currentUserId
        });

    }
  });

}

// Code that only runs on the server 
if(Meteor.isServer){

  // Transmit a selection of data into the ether
  Meteor.publish('thePlayers', function(){

    // Get the ID of the current user
    var currentUserId = this.userId;

    // Return players "owned" by the current user
    return PlayerList.find({createdBy: currentUserId})

  });

}