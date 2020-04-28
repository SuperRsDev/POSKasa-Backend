
// Pozivi modul 
let Pozivi = (function () {
    const api = {
        rezervacije: '/rezervacije'
    }
    const contentJson = {
        key: 'Content-Type',
        value: 'application/json;charset=UTF-8'
    }

    function ucitajRezervacije(callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(this.responseText));
            }
        };
        xhttp.open("GET", api.rezervacije, true);
        xhttp.send();
    }

    return {
        ucitajRezervacije
    }
}());

