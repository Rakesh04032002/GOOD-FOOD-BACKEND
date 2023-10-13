const mongoose = require('mongoose');

require("dotenv").config();
const DATABASEURL=process.env.DATABASE_URL;
const Connection = async () => {
  try {
    await mongoose.connect(DATABASEURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Database connection successfully');

    const fetchedData = await mongoose.connection.db.collection('Fooditems').find({}).toArray();
    const catData = await mongoose.connection.db.collection('FoodCategory').find({}).toArray();

    global.Fooditems = fetchedData;
    global.FoodCategory = catData;
  } catch (error) {
    console.log('Database is not connected', error);
  }
};

module.exports = Connection;
