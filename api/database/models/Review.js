'use strict'

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('review', {
    feedback: DataTypes.STRING,
  })

  Review.associate = function (models) {
    Review.belongsTo(models.employee, {
      foreignKey: 'reviewer_id',
      as: 'reviewer',
    })
    Review.belongsTo(models.employee, {
      foreignKey: 'reviewee_id',
      as: 'reviewee',
    })
  }
  return Review
}
