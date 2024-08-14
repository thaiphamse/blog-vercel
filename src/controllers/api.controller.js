const baseResponse = require("../configs/base.response")

const uploadImage = async (req, res) => {
    console.log("req.file");
    res.json(req.file);
}

module.exports = {
    uploadImage
}
