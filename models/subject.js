'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  })
  Subject.associate = (models) => {
    Subject.hasMany(models.Teacher)
    Subject.belongsToMany(models.Student, {
      through: 'StudentSubjects'
    });
// associate nya 1x saja.. isinya boleh 2..
  }

  return Subject;
}
