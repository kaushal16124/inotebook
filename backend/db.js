const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/inotebook";
require('dotenv').config()
const mongoURI = "mongodb+srv://testing:Mongo%401234@cluster0.kbkyaa8.mongodb.net/inotebook?retryWrites=true&w=majority&appName=Cluster0";

async function connectToMongo() {
    await mongoose.connect(process.env.mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
  }

  module.exports = connectToMongo;