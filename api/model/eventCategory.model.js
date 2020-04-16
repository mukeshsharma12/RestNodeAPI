import Sequelize from 'sequelize';
import sequelize from '../../config/database';

const getEventCategoryInfo = async (where) => {
  var eventCategory = Promise.resolve(await sequelize.query(`SELECT * FROM event_category WHERE ${where} `, { type: Sequelize.QueryTypes.SELECT }));
  return eventCategory;
};

async function addEventCategory(insert_qry) {
  var insert_event_category = Promise.resolve(await sequelize.query(`INSERT INTO event_category SET
  ${insert_qry} `, { type: Sequelize.QueryTypes.INSERT }));
  if (insert_event_category._rejectionHandler0.length === 0)
    return insert_event_category._rejectionHandler0;
  else {
        return insert_event_category._rejectionHandler0[0];
    }
}


async function checkEventCategoryAlreadyExists(where) {
  var event_category = Promise.resolve(await sequelize.query(`SELECT count(ec.id) as event_category_counts 
  FROM event_category ec 
  WHERE ${where} `, { type: Sequelize.QueryTypes.SELECT }));
  if (event_category._rejectionHandler0[0].event_category_counts > 0)
    return event_category._rejectionHandler0[0].event_category_counts;
  else
    return 0;
}



module.exports = {
  getEventCategoryInfo: getEventCategoryInfo,
  addEventCategory: addEventCategory,
  checkEventCategoryAlreadyExists: checkEventCategoryAlreadyExists
}