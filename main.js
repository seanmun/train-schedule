

// My Firebase
var config = {
  apiKey: "AIzaSyAgxHfawTBvJUxcGXOEw2RpNVsxcqkp1A8",
  authDomain: "moneyneversleeps-b2982.firebaseapp.com",
  databaseURL: "https://moneyneversleeps-b2982.firebaseio.com",
  projectId: "moneyneversleeps-b2982",
  storageBucket: "moneyneversleeps-b2982.appspot.com",
  messagingSenderId: "996762236644"
};
// Initialize 
firebase.initializeApp(config);

// Create shorthand var
var database = firebase.database();

// on click button
$("#add-train").on("click", function(event) {
  event.preventDefault();

  // Place user entered data into variable
  var trainName = $("#train-name-input").val().trim();
  var trainDes = $("#destination-input").val().trim();
  var trainFirst = moment($("#first-input").val().trim(), "HH:mm").format("HH:mm");
  var trainFreq = $("#freq-input").val().trim();
  var currentTime = moment();

  // capture current time for math later on
	console.log("Current: " +  moment(currentTime).format("HH:mm"));
  // map js var to firebase fields
  var newTrain = {
    name: trainName,
    destination: trainDes,
    first: trainFirst,
    frequency: trainFreq
  };

  // firebasee push
  database.ref().push(newTrain);

  // //check logs
  // console.log(newTrain.name);
  // console.log(newTrain.destination);
  // console.log(newTrain.first);
  // console.log(newTrain.frequency);

  // Clears data
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#freq-input").val("");

});

// Push data from firebase to web page IDs
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  var trainName = childSnapshot.val().name;
  var trainDes = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().first;
  var trainFreq = childSnapshot.val().frequency;

    // convert time to something readable
    var trainFirstPretty = moment(trainFirst, "HH:mm");
    console.log("first train: " + trainFirstPretty);
    
    //calculate difference between times
		var diff =  moment().diff(moment(trainFirstPretty),"minutes");
    console.log("Difference " + diff);
    
    //ti
		var trainRemain = diff % trainFreq;
    console.log("trainRemain: " + trainRemain);
    
    //calculate minutes until next train
		var minAway = trainFreq - trainRemain;
    console.log("Min Away " + minAway);
    
    //next arrival time
		var nextArrival = moment().add(minAway, "minutes").format('hh:mm A');
    console.log("Next: " + nextArrival);

  // Push data to new table row on webpage
  var newEntry = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDes),
    $("<td>").text(trainFreq),
    $("<td>").text(nextArrival),
    $("<td>").text(minAway)
  );
  // Append row
  $("#train-table > tbody").append(newEntry);
});
