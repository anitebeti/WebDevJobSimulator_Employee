let router = require ('express').Router();

var employeeController = require ('./employeeController');

router.get('/', function(req, res) {
    res.json({
        status: 'Merge Api',
        message: 'Salut'
    });
});

router.route('/employee')
    .post(employeeController.add)
    .get(employeeController.index);
router.route('/employee/:employee_id')
    .get(employeeController.view)
    .put(employeeController.update)
    .delete(employeeController.delete);
    

module.exports = router;