'use strict'

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('employee', {
    name: DataTypes.STRING,
    position: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN,
  })

  Employee.associate = function (models) {
    Employee.hasMany(models.review, {
      foreignKey: 'reviewer_id',
      as: 'reviewsMade',
    })
    Employee.hasMany(models.review, {
      foreignKey: 'reviewee_id',
      as: 'reviewsReceived',
    })
  }
  return Employee
}
