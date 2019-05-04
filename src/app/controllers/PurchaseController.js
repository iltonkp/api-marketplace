const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const jobs = require('../jobs')
const Queue = require('../services/Queue')

class PurchaseController {
  async index (req, res) {
    const purchases = await Purchase.find().populate(['ad', 'client'])
    return res.json(purchases)
  }

  async store (req, res) {
    const { ad, content } = req.body
    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    const purchase = await Purchase.create({ ...req.body, client: req.userId })

    if (purchase) {
      Queue.create(jobs.PurchaseMail.key, {
        ad: purchaseAd,
        user,
        content
      }).save()
    }

    return res.send()
  }
}

module.exports = new PurchaseController()
