class AdsController {
    async createAd(req, res) {
        console.log(req.body)
    }

    async getAd(req, res) {
        console.log("ads")
    }
}

module.exports = new AdsController()