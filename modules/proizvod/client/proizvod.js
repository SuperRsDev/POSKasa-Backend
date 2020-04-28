
const milisekundeUSekundi = 1000;
const osobljePonavaljanjePeriodicnoSekunde = 30;
let tokenZaPrekidIntervala = null;
function loadOsoblje() {
    const provjeraInterval = osobljePonavaljanjePeriodicnoSekunde * milisekundeUSekundi;
    tokenZaPrekidIntervala =  setInterval(() => {
        dajZauzecaOsoblja();
    }, provjeraInterval);
    dajZauzecaOsoblja();
}

function unloadOsoblje() {
    clearInterval(tokenZaPrekidIntervala);
}

function dajZauzecaOsoblja( ){
    Pozivi.dajZauzecaOsoblja(new Date().getTime(), (data) => {
        const osobljeHtml = Proizvod.dajListuOsobljeHtml(data);
        const osobljeDiv = document.getElementById('osoblje');
        osobljeDiv.innerHTML = '';
        osobljeHtml.forEach((osobaHtml) => {
            osobljeDiv.appendChild(osobaHtml);
        })
    })
}

let Proizvod = (function()  {
    podaci = null;

    dodajPodatke = (podaci) => {
        this.podaci = podaci;
    }

    return {
        dodajPodatke
    }
}());