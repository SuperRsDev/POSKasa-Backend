
const fs = require('fs'),
express = require('express'),
bodyParser = require('body-parser'),
path = require('path'),
pageSetupData = require('./modules/core/server/clientPageSetup'),
dbSetup = require('./modules/core/server/database/dbSetup'),
rute = require('./rute'),
app = express();

function registerStaticRoute(route, path) {
    app.get(route, function (req, res) {
        res.sendFile(path);
    });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));

console.info("Registrovanje ruta za assete i stranice")
pageSetupData.pageMappings.forEach((page) => {
    const modulePath = `${__dirname}/modules${page.modulePath}/client`;
    fs.readdirSync(modulePath).forEach((moduleFile) => {
        const extension = path.extname(moduleFile);
        const isAsset = page.assetTypes.find(s => `.${s}` === extension) !== undefined;
        if (isAsset) {
            const route = `/${moduleFile}`;
            const assetPath = path.join(modulePath, moduleFile);
            console.info("Registrovan asset: ", moduleFile)
            registerStaticRoute(route, assetPath);
        }
    })

    // Ruta za html fajl
    if (page.id != null) {
        const pageRoute = `/${page.id}`;
        const pagePath = `${__dirname}/modules${page.path}`;
        console.info("Registrovana stranica: ", pageRoute);
        registerStaticRoute(pageRoute, pagePath);
    }
});

app.get(rute.proizvod.bazna, function(req,res){

});

const port = 8080;
app.listen(port, () => {
    dbSetup.sinhronizacija();
    console.log(`Aplikacija pokrenuta na ${port}!`)
});

module.exports = app;