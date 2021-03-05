var mongoose = require ('mongoose');

var employeeSchema = mongoose.Schema( {
    nume: {
        type: String,
        required: true
    },
    vechime: {
        type: Number,
        required: true
    },
    salariu: {
        type: Number,
        required: true
    },
    functie: {
        type: String,
        required: true
    },
    echipa: {
        type: String,
        required: true
    },
    telefon: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    impozit: {
        type: Boolean,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

var Employee = module.exports = mongoose.model('employee', employeeSchema);
module.exports.get = function (callback, limit) {
    Employee.find(callback).limit(limit);
} 

