'use strict'

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('employee', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    position: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
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
