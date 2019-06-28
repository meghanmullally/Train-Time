// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDJ7N7O3iETaUpds58R9U6aw9thZTz_LQ0",
  authDomain: "traintime-2f3aa.firebaseapp.com",
  databaseURL: "https://traintime-2f3aa.firebaseio.com",
  projectId: "traintime-2f3aa",
  storageBucket: "",
  messagingSenderId: "250601739648",
  appId: "1:250601739648:web:b8ec3a7a1cde8025"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var trainDB = firebase.database();


// button for adding Trains 

$("#add-train-btn").on("click", function (e) {
  e.preventDefault();


  //Grab user input 
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainTime = moment($("#time-input").val().trim(), "HH:MM").format("X");
  var frequency = $("#frequency-input").val().trim();

  // create local "temp" object for holding train data 

  var newTrain = {
    name: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency
  }

  // Upload train data to the DB 
  trainDB.ref().push(newTrain)

  // log everything to console
  console.log(trainName.name);
  console.log(destination.destination);
  console.log(trainTime.trainTime);
  console.log(frequency.frequency);

  //Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
})

// Firebase event for adding trains to the db and a row in the html when a user adds an entry 

trainDB.ref().on("child_added", function (childSnapShot) {

  // store everything into a variable 
  var trainName = childSnapShot.val().name;
  var destination = childSnapShot.val().destination;
  var firstTrain = childSnapShot.val().trainTime;
  var frequency = childSnapShot.val().frequency;


  // Frequency - with minutes 
  // Train Time
  var timeArray = trainTime;
  var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
  var momentMax = moment.max(moment(), trainTime);
  var minutes;
  var arrival;

  // if first train is past the current time then sent arrival to the first train 

  if (momentMax === trainTime) {
    arrival = trainTime.format("HH:MM A");
    minutes = trainTime.diff(moment(), "minutes");
  } else {

    var difference = moment().diff(trainTime, "minutes");
    var remainder = difference % frequency;
    minutes = frequency - remainder;

    // then we have to calculate the arrival time
    // then add the minutes to the current time 
    arrival - moment().add(minutes, "m").format("HH:MM A")

  }
  console.log("minutes:", minutes);
  console.log("arrival:", arrival);


  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(trainTime),
    $("<td>").text(frequency),
  );

  // Append the new row to the table
  $("#train-table> tbody").append(newRow);


});