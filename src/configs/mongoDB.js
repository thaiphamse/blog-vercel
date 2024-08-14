const mongoose = require("mongoose");
const path = require("path")
const fs = require("fs")
const topicModel = require("../models/topic.model")
module.exports = {
  connect: async () => {
    try {
      const uri =
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.znj9b.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
      await mongoose.connect(uri);
      console.log("Successfully connect to mongo db");
      // Khởi tạo topic Data
      // const topics = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'topic.data.json'), 'utf8'))
      // await topics.forEach(async topic => {
      //   await new topicModel(element).save()
      // });
    } catch (error) {
      console.log(error);
    }
  },
};
