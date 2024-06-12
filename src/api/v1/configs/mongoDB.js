const mongoose = require('mongoose');
require('dotenv').config()
module.exports = {
    connect: async () => {
        try {
            console.log(process.env.DB_USERNAME);
            const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.znj9b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
            await mongoose.connect(uri);
            console.log("Successfully connect to mongo db");
        } catch (error) {
            console.log(error);
        }
    }

}