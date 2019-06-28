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

var database = firebase.database();


// button for adding Trains 

$("#add-train-btn").on("click", function(e) {
  e.preventDefault();
  

//Grab user input 
var trainName = $("#train-name-input").val().trim();
var destination = $("#destination.input").val().trim();
var 

})