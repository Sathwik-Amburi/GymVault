const s3Service = require("../aws/s3Service");

const retrievePutSignedURL = (req, res) => {
    const url = s3Service.retrievePutSignedURL(req.params.key, req.body.type)
    res.json({ url })
}

module.exports = {retrievePutSignedURL}
