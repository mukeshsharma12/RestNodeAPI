import eventCategoryModel from '../model/eventCategory.model';

async function getEventCategoryInfo(req, res) {
    var where = '';
    if (req.params.event_id != undefined && req.params.event_id != null && req.params.event_id != "") {
        where += `id=${req.params.event_id} AND `;
    }
    where += `status=1 AND is_deleted=0`;
    const eventCategory = await eventCategoryModel.getEventCategoryInfo(where);
    if (eventCategory.length === 0) {
        res.json({ 'status': 'failed', 'message': 'Event category not find' });
        res.end();
    } else {
        res.json({ 'status': 'success', 'eventCategory': eventCategory });
        res.end();
    }
}


async function addEventCategory(req, res) {
    var event = req.body.event;
    var description = req.body.description;
    var insert_arr = '';
    var where = `ec.event='${event}' AND ec.status='1' AND ec.is_deleted='0'`;
    var exists_event_category = await eventCategoryModel.checkEventCategoryAlreadyExists(where);
    if (exists_event_category > 0) {
        res.json({ 'status': 'failed', 'message': 'Event category is already exist' });
        res.end();
        return;
    }
    insert_arr += `event='${event}',
                  description='${description}'`;
    var eventCategory = await eventCategoryModel.addEventCategory(insert_arr);

    if (eventCategory > 0) {
        res.json({ 'status': 'success', 'message': "Event category added successfuly ", 'data': eventCategory });
    } else {
        res.json({ 'status': 'failed', 'message': 'Could not inserted!' });
    }
    res.end();
}


module.exports = {
    getEventCategoryInfo: getEventCategoryInfo,
    addEventCategory: addEventCategory
}
