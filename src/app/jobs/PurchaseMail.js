const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'purchaseMail'
  }

  async handle (job, done) {
    const { ad, content, user } = job.data

    await Mail.sendMail({
      from: '"Ilton Karly" <iltonk.si@gmail.com>',
      to: ad.author.email,
      subject: `Solicitação de Compra - ${ad.title}`,
      template: 'purchase',
      context: { user, content, ad }
    })

    return done()
  }
}

module.exports = new PurchaseMail()
