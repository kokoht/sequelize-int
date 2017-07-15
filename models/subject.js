'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  })
  Subject.associate = (models) => {
    Subject.hasMany(models.Teacher)
    // models => bisa diganti apa aja
  }

  Subject.associate = (models) => {
    Subject.belongsToMany(models.Student, {
      through: 'StudentSubjects'
    });
  }

  return Subject;
}
