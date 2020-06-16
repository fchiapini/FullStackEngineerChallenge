import db from '../../database/models'

export async function truncateDatabase() {
  await db.employee.destroy({
    where: {},
    truncate: true,
  })
  await db.review.destroy({
    where: {},
    truncate: true,
  })
}
