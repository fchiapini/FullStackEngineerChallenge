const db = require('../../database/models')

module.exports = {
  async truncateDatabase() {
    await db.employee.destroy({
      where: {},
      truncate: true,
    })
    await db.review.destroy({
      where: {},
      truncate: true,
    })
  },
}
