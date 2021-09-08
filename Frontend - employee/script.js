

var vechime = document.getElementById('vechime');
var nume = document.getElementById('nume');
var salariu = document.getElementById('salariu');
var functie = document.getElementById('functie');
var echipa = document.getElementById('echipa');
var tel = document.getElementById('tel');
var email = document.getElementById('email');
var impozit = document.getElementById('impozit');
var buton = document.querySelector('button');
var alerta = document.getElementById('alerta');



//ag Grid

var columnDefs = [
    { headerName: "Nume angajat", field: 'numeAG', filter: 'agTextColumnFilter'},
    { headerName: "Ani vechime", field: 'vechimeAG', filter: 'agNumberColumnFilter'  },
    { headerName: "Salariu", field: 'salariuAG', filter: 'agNumberColumnFilter' },
    { headerName: "Functie ocupata", field: 'functieAG', filter: 'agTextColumnFilter' }, 
    { headerName: "Echipa", field:'echipaAG', filter: 'agTextColumnFilter' },
    { headerName: "Numar de telefon", field:'telAG', filter: 'agTextColumnFilter' },
    { headerName: "E-mail", field:'mailAG', filter: 'agTextColumnFilter' },
    { headerName: "Scutit de impozit",field:'impozitAG', filter: true }
];

var rowData = [];

var gridOptions = {  
    columnDefs: columnDefs,  
    rowData: rowData   
}  

var eGridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(eGridDiv, gridOptions);

axios.get('http://localhost:3000/api/employee')
    .then(function(response) {
        
        var angajati = response.data.data;
        console.log(angajati);
        angajati.forEach(e => {

            if (e.impozit === true) {
                impozit.value = 'Da';
            } else {
                impozit.value = 'Nu';
            }

            rowData.push(
                {numeAG: e.nume,
                vechimeAG: e.vechime,
                salariuAG: e.salariu,
                functieAG: e.functie,
                echipaAG: e.echipa,
                telAG: e.telefon,
                mailAG: e.email,
                impozitAG: impozit.value
            }
            )
            gridOptions.api.setRowData(gridOptions.rowData);
        })
    })
    .catch(function(error) {
        console.log(error);
    })


function alertaRosie() {
    alerta.innerHTML = 'Completează câmpurile obligatorii!';
    alerta.className = 'alert alert-danger text-center';
    setTimeout(function(){  alerta.classList.add("d-none"); }, 5000);
}
function alertaVerde() {
    alerta.innerHTML = 'Angajatul a fost adăugat cu succes!';
    alerta.className = 'alert alert-success text-center';
    setTimeout(function(){  alerta.classList.add("d-none"); }, 5000);
}

async function functieEveniment (event) {

    if ((nume.value === '') || (nume.value.trim().length === 0)) {
        console.error('Numele angajatului nu a fost completat');
        alertaRosie();
        return;
    }
    if ((vechime.value === '') || (vechime.value.trim().length === 0)) {
        console.error('Vechimea angajatului nu a fost completata');
        alertaRosie();
        return;
    }
    if ((salariu.value === '') || (salariu.value.trim().length === 0)) {
        console.error('Salariul angajatului nu a fost completat');
        alertaRosie();
        return;
    }
    if ((functie.value === '') || (functie.value.trim().length === 0)) {
        console.error('Functia angajatului nu a fost completata');
        alertaRosie();
        return;
    }
    if ((echipa.value === '') || (echipa.value.trim().length === 0)) {
        console.error('Echipa in care lucreaza nu a fost completata');
        alertaRosie();
        return;
    }
    if ((tel.value === '') || (tel.value.trim().length === 0)) {
        console.error('Numarul de telefon nu a fost completat');
        alertaRosie();
        return;
    }
    if ((email.value === '') || (email.value.trim().length === 0)) {
        console.error('E-mail-ul nu a fost completat');
        alertaRosie();
        return;
    }
    axios.post('http://localhost:3000/api/employee',
                {nume: nume.value,
                vechime: vechime.value,
                salariu: salariu.value,
                functie: functie.value,
                echipa: echipa.value,
                telefon: tel.value,
                email: email.value,
                impozit: impozit.checked
                })
            .then(function (response) {
                console.log(response.data);
                if (impozit.checked === true) {
                    impozit.value = 'Da';
                    } else {
                    impozit.value = 'Nu'; 
                    }
                    rowData.push(
                        { numeAG: nume.value,
                        vechimeAG: vechime.value,
                        salariuAG: salariu.value,
                        functieAG: functie.value,
                        echipaAG: echipa.value,
                        telAG: tel.value,
                        mailAG: email.value,
                        impozitAG: impozit.value
                        });
                    gridOptions.api.setRowData(gridOptions.rowData); 
                    vechime.value = '';
                    nume.value = '';
                    salariu.value = '';
                    functie.value = '';
                    echipa.value = '';
                    tel.value = '';
                    email.value = '';   
            })
            .catch(function(error) {
                console.log (error.status);
            })

    await function awaitFunction () {
        nume.value = '';
        vechime.value = '';
        salariu.value = '';
        functie.value = '';
        echipa.value = '';
        tel.value = '';
        email.value = '';
        impozit.checked = false;
    }
    alertaVerde();
    
}
buton.addEventListener('click', functieEveniment);







   






