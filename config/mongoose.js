const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://NayanAgarwal:9643859794na@cluster0.dptyy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/BeetleNut",{useUnifiedTopology: true}); ///<<<<<--------- to resolve deprecation warning being displayed on the terminal

//mongodb://localhost/BeetleNut
//mongodb+srv://NayanAgarwal:<password>@cluster0.dptyy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//9643859794na
// NayanAgarwal
const db = mongoose.connection;

db.on("error",console.error.bind(console,"Error in connecting to MongoDB"));

db.once('open',function(){
    console.log("Successfully connected to the MongoDB Database!!!");
});

module.exports = db;            /// <<<<<<<<<<<------ Don't forget exporting this, otherwise it may cause an error in storing Mongo store session cookies