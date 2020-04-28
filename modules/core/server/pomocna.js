// Cisti sve null ili undefined vrijednosti iz objekta
exports.ocistiObjekat = function (data) {
    Object.keys(data).forEach((key) => (data[key] == null) && delete data[key]);
}

exports.daLiJeValidanDatum = function (datum) {
    if (Object.prototype.toString.call(datum) === "[object Date]") {
        // it is a date
        if (isNaN(datum.getTime())) {
            // date is not valid
            return false;
        } else {
            // date is valid
            return true;
        }
    } else {
        return false;
        // not a date
    }
}