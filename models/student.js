'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
        unique: true,
      validate: {
        isEmail: {
          is: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
          msg: "Email Format Incorrect, Please Input Correct Format"
        },
        isUnique: function(value, next){
          // isUnique => custom function bikinan sendiri..
            Student.find({
              where: {
                email: value
              }
            }).then((err)=> {
              if(err)
                return next(`Email already in use !! `);
              next();
            })
        }
      }
    },
    jurusan: DataTypes.STRING
  });

  Student.associate = (models) => {
    Student.belongsToMany(models.Subject, {
      through: 'StudentSubjects'
    });
  }



  return Student;
};
