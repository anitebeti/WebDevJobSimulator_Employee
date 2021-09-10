let salariu = document.getElementById('salariu'),
    brut = document.getElementById('brut'),
    net = document.getElementById('net'),
    impozit = document.getElementById('impozit'),
    CASTabel = document.querySelector('#CASTabel'),
    CASSTabel = document.querySelector('#CASSTabel'),
    impozitTabel = document.querySelector('#impozitTabel'),
    salariuBrutTabel = document.querySelector('#salariuBrut'),
    salariuNetTabel = document.querySelector('#salariuNet'),
    salariuNet,
    salariuBrut,
    CAS,
    CASS,
    impozitPeVenit,
    dropdown = document.getElementById('dropdown'),
    butonSalariu = document.getElementById('butonSalariu'),
    salariuNou = document.getElementById('salariuNou'),
    angajati = [],
    alegere = dropdown.value,
    alertaSalariu = document.getElementById('alertaSalariu');
    
axios.get('http://localhost:3000/api/employee') 
        .then(function (response) {
            angajati = response.data.data;
            angajati.forEach(e => {
                var optiune = document.createElement('option');
                optiune.value = e._id;
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
function alertaRosieSalariu() {     
    alertaSalariu.innerHTML = 'Completează câmpurile obligatorii!';
    alertaSalariu.className = 'alert alert-danger text-center mt-3';
    setTimeout(function(){
        alertaSalariu.classList.add("d-none");
    }, 5000);
}
function alertaVerdeSalariu() {
    alertaSalariu.innerHTML = 'Salariu modificat cu succes!';
    alertaSalariu.className = 'alert alert-success text-center mt-3';
    setTimeout(function() {
        alertaSalariu.classList.add("d-none");
    }, 5000);
}
butonSalariu.addEventListener('click', function(event) {
    console.log('merge butonul');  
    if ((salariuNou.value === '') || (salariuNou.value.trim().length === 0)) {
        alertaRosieSalariu();
        return;
    } else {
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
                        alertaVerdeSalariu();
                        salariuBrutTabel.innerHTML = salariuNou.value;
                        CAS = Math.ceil((salariuNou.value/100)*25);
                        CASS = Math.ceil((salariuNou.value/100)*10);
                        impozitPeVenit = Math.ceil((salariuNou.value-CAS-CASS)/100*10);
                        CASTabel.innerHTML = CAS;
                        CASSTabel.innerHTML = CASS;
                        if(e.impozit === false) {
                            impozitTabel.innerHTML = impozitPeVenit;
                            salariuNetTabel.innerHTML = Math.ceil(salariuNou.value-CAS-CASS-impozitPeVenit);
                        } else {
                            impozitTabel.innerHTML = 0;
                            salariuNetTabel.innerHTML = Math.ceil(salariuNou.value-CAS-CASS);
                        }                        
                        dropdown.value = 'Selectează angajatul';
                        salariuNou.value = '';
                    })                            
                    .catch(function(error) {
                        console.log(error);
                    })
            }
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