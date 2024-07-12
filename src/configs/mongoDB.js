const mongoose = require("mongoose");

module.exports = {
  connect: async () => {
    try {
      const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.znj9b.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
      await mongoose.connect(uri);
      console.log("Successfully connect to mongo db");
    } catch (error) {
      console.log(error);
    }
  },
};
