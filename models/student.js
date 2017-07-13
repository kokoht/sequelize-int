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
        isUnique: function(value, proc){
            Student.find({
              where: {
                email: value
              }
            }).then((err)=> {
              if(err)
                return proc(`Email already in use !! `);
              proc();
            })
        }
      }
    },
    jurusan: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Student;
};
