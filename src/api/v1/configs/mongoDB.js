const mongoose = require('mongoose');
module.exports = {
    connect: async () => {
        try {
            await mongoose.connect('mongodb+srv://thaipham12:Xtera123@cluster0.znj9b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
            console.log("Successfully connect to mongo db");
        } catch (error) {
            console.log(error);
        }
    }

}