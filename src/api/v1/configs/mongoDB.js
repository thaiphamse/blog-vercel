const mongoose = require('mongoose');
module.exports = {
    connect: async () => {
        try {
            // await mongoose.connect('mongodb://127.0.0.1:27017/test');
            console.log("Successfully connect to mongo db");
        } catch (error) {
            handleError(error);
        }
    }

}