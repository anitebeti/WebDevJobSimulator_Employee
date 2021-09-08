var salariu = document.getElementById('salariu');
var brut = document.getElementById('brut');
var net = document.getElementById('net');
var impozit = document.getElementById('impozit');

var CASTabel = document.querySelector('#CASTabel');
var CASSTabel = document.querySelector('#CASSTabel');
var impozitTabel = document.querySelector('#impozitTabel');
var salariuBrutTabel = document.querySelector('#salariuBrut');
var salariuNetTabel = document.querySelector('#salariuNet');

var salariuNet;
var salariuBrut;
var CAS;
var CASS;
var impozitPeVenit;

var dropdown = document.getElementById('dropdown');

var butonSalariu = document.getElementById('butonSalariu');
var salariuNou = document.getElementById('salariuNou');
var angajati = [];
var alegere = dropdown.value;

axios.get('http://localhost:3000/api/employee') 
        .then(function (response) {
            angajati = response.data.data;
            console.log(angajati);
            angajati.forEach(e => {
                var optiune = document.createElement('option');
                optiune.value = e._id;
                console.log(optiune.value);
                optiune.innerHTML = e.nume;
                dropdown.appendChild(optiune);
            });
        })
        .catch(function(error) {
            console.log(error);
        })


dropdown.addEventListener('change', function() {
    alegere = dropdown.value;
    angajati.forEach(e => {
        if(alegere === e._id) {
            salariuBrutTabel.innerHTML = e.salariu;

            CAS = Math.ceil((e.salariu/100)*25);
            CASS = Math.ceil((e.salariu/100)*10);
            impozitPeVenit = Math.ceil((e.salariu-CAS-CASS)/100*10);

            CASTabel.innerHTML = CAS;
            CASSTabel.innerHTML = CASS;

            if(e.impozit === false) {
                impozitTabel.innerHTML = impozitPeVenit;
                salariuNetTabel.innerHTML = Math.ceil(e.salariu-CAS-CASS-impozitPeVenit);
            } else {
                impozitTabel.innerHTML = 0;
                salariuNetTabel.innerHTML = Math.ceil(e.salariu-CAS-CASS);
            }
        }
    })
})


butonSalariu.addEventListener('click', function(event) {
    console.log('merge butonul');
    /*axios.put(`http://localhost:3000/api/employee/${dropdown.value}`, 
            {nume: "Andreea Vasilescu",
            vechime: 7,
            salariu: 7000,
            functie: "Recruiter",
            echipa: "HR",
            telefon: "0765897543",
            email: "blabla",
            impozit: false}
            )
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    })*/
    
    if ((salariuNou.value === '') || (salariuNou.value.trim().length === 0)) {

        salariuNou.placeholder = 'Camp obligatoriu!';
        salariuNou.style.backgroundColor = '#ff9999';
        return;
    } else {
        /*axios.get(`http://localhost:3000/api/employee/${dropdown.value}`)
            .then(function(response){
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
            })*/
        angajati.forEach(e => {
            if (alegere === e._id) {
                axios.put(`http://localhost:3000/api/employee/${dropdown.value}`, 
                            {nume: e.nume,
                            vechime: e.vechime,
                            salariu: salariuNou.value,
                            functie: e.functie,
                            echipa: e.echipa,
                            telefon: e.telefon,
                            email:e.email,
                            impozit: e.impozit}
                    )
                    .then(function(response) {
                        console.log(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
                    

            }
            

        
           /* axios.put(`http://localhost:3000/api/employee/${dropdown.value}`, 
                    {data: {nume: e.nume,
                            vechime: e.vechime,
                            salariu: salariuNou.value,
                            functie: e.functie,
                            echipa: e.echipa,
                            telefon: e.telefon,
                            email: e.email,
                            impozit: e.impozit}
                    })
                    .then(function(response) {
                        console.log(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                    })*/

            })
    }
})
        

var buton = document.getElementById('buton');
buton.addEventListener('click', function(event){

    if ((salariu.value === '') || (salariu.value.trim().length === 0)) {
        console.error('Numele angajatului nu a fost completat');
        salariu.placeholder = 'Camp obligatoriu!';
        salariu.style.backgroundColor = '#ff9999';
        return;
    }


    if (brut.checked === true) {
        CAS = Math.ceil((salariu.value/100)*25);
        CASS = Math.ceil((salariu.value/100)*10);
        impozitPeVenit = Math.ceil((salariu.value-CAS-CASS)/100*10);

        CASTabel.innerHTML = CAS;
        CASSTabel.innerHTML = CASS;
        salariuBrutTabel.innerHTML = Math.ceil(salariu.value);


        if (impozit.checked === false) {
            impozitTabel.innerHTML = impozitPeVenit;
            salariuNetTabel.innerHTML = Math.ceil(salariu.value-CAS-CASS-impozitPeVenit);

        } else {
            impozitTabel.innerHTML = 0;
            salariuNetTabel.innerHTML = Math.ceil(salariu.value-CAS-CASS);
        }

    }

    if (net.checked === true) {

        if (impozit.checked === false) {
            salariuBrut = Math.ceil(salariu.value/0.585);
            CAS = Math.ceil((salariuBrut/100)*25);
            CASS = Math.ceil((salariuBrut/100)*10);
            impozitPeVenit = Math.ceil((salariuBrut-CAS-CASS)/100*10);
            
            salariuBrutTabel.innerHTML = salariuBrut;
            CASTabel.innerHTML = CAS;
            CASSTabel.innerHTML = CASS;
            impozitTabel.innerHTML = impozitPeVenit;
            salariuNetTabel.innerHTML = Math.ceil(salariu.value);
            
        } else {
            salariuBrut = Math.ceil(salariu.value/0.65);
            CAS = Math.ceil((salariuBrut/100)*25);
            CASS = Math.ceil((salariuBrut/100)*10);
            impozitPeVenit = 0;
            
            salariuBrutTabel.innerHTML = salariuBrut;
            CASTabel.innerHTML = CAS;
            CASSTabel.innerHTML = CASS;
            impozitTabel.innerHTML = impozitPeVenit;
            salariuNetTabel.innerHTML = Math.ceil(salariu.value);
        }
    }


    salariu.value = '';
    impozit.checked = false;
    brut.checked = false;
    net.checked = false;
    salariu.placeholder = '';
    salariu.style.backgroundColor = 'white';
    salariuNou.placeholder = 'Salariu brut';
    salariuNou.style.backgroundColor = 'white';

    
    
})