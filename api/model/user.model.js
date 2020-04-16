import Sequelize from 'sequelize';
import sequelize from '../../config/database';

const getUserInfo = async (where) => {
  var user = Promise.resolve(await sequelize.query(`SELECT * FROM users WHERE ${where} `, { type: Sequelize.QueryTypes.SELECT }));
  return user;
};

async function registerUser(insert_qry, roles, callback) {
  var insert_user = Promise.resolve(await sequelize.query(`INSERT INTO users SET
  ${insert_qry} `, { type: Sequelize.QueryTypes.INSERT }));
  if (insert_user._rejectionHandler0.length === 0)
    callback(insert_user._rejectionHandler0);
  else {
    var i = 1;
    var id = insert_user._rejectionHandler0[0];
    roles.forEach(async function (element) {
      var userrole = `role_id=${element},user_id=${id}`
      var user_role = Promise.resolve(await sequelize.query(`INSERT INTO user_role SET
      ${userrole} `, { type: Sequelize.QueryTypes.INSERT }));
      if (roles.length == i)
        callback(id);

      i++
    });

  }

}

const userUpdateDetails = async (update_arr, where) => {
  var updateUser = Promise.resolve(await sequelize.query(`UPDATE users SET
  ${update_arr} WHERE ${where} `, { type: Sequelize.QueryTypes.UPDATE }));
  return updateUser;
};

async function checkUserAlreadyExists(where) {
  var userData = Promise.resolve(await sequelize.query(`SELECT count(u.id) as user_counts 
  FROM users u 
  WHERE ${where} `, { type: Sequelize.QueryTypes.SELECT }));
  if (userData._rejectionHandler0[0].user_counts > 0)
    return userData._rejectionHandler0[0].user_counts;
  else
    return 0;
}

const getTimezone = async () => {
  var timezone = Promise.resolve(await sequelize.query(`SELECT * FROM timezone`, { type: Sequelize.QueryTypes.SELECT }));
  return timezone;
};




module.exports = {
  getUserInfo: getUserInfo,
  registerUser: registerUser,
  checkUserAlreadyExists: checkUserAlreadyExists,
  userUpdateDetails: userUpdateDetails,
  getTimezone: getTimezone
}