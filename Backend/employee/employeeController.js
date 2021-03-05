const { BodyDropPivotTarget } = require('ag-grid-community');

Employee = require('./employeeModel');

exports.add = function(req, res) {
    console.log(req.body);
    var employee = new Employee();
    employee.nume = req.body.nume? req.body.nume: employee.nume;
    employee.vechime = req.body.vechime;
    employee.salariu = req.body.salariu;
    employee.functie = req.body.functie;
    employee.echipa = req.body.echipa;
    employee.telefon = req.body.telefon;
    employee.email = req.body.email;
    employee.impozit = req.body.impozit;


    employee.save(function (err) {
        if (err)
            res.json(err);
        res.json( {
            message:'Angajat nou adaugat:',
            data: employee
        });
    });
};

exports.index = function(req, res) {
    Employee.get(function (err, employee) {
        if (err)
            res.json(err);
        res.json( {
            status:"succes",
            message:"Lista anagajatilor introdusi:",
            data: employee
        });
    });
}; 

exports.view = function(req, res) {
    Employee.findById(req.params.employee_id, function (err, employee) {
        if (err)
            res.send(err);
        res.json({
            message:'Angajatul selectat:',
            data: employee
        });
    });
};

exports.update = function(req, res) {
    Employee.findById(req.params.employee_id, function (err, employee){
        if (err)
            res.send(err);
        employee.nume = req.body.nume ? req.body.nume: employee.nume;
        employee.vechime = req.body.vechime;
        employee.salariu = req.body.salariu;
        employee.functie = req.body.functie;
        employee.echipa = req.body.echipa;
        employee.telefon = req.body.telefon;
        employee.email = req.body.email;
        employee.impozit = req.body.impozit;

        employee.save(function(err){
            if (err)
                res.json(err);
            res.json({
                message:"Angajatul a fost actualizat cu succes",
                data: employee
            });
        });

    });
}; 

exports.delete = function(req, res) {
    Employee.deleteOne({ _id:req.params.employee_id}, function(err, contact) {
        if (err)
            res.send(err);
        res.json ({
            message:'Angajatul a fost sters',

        });
    });
};