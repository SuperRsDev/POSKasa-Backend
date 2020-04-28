//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const rute = require('../rute'),
  dbSetup = require('../modules/core/server/database/dbSetup')

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
// Ovo je potrebno iako se ne koristi direktno dodaje should na res objekat
const should = chai.should();

chai.use(chaiHttp);
describe('Proizvod', () => {
  before((done) => {
    dbSetup.sinhronizacijaBezInicijalizacije()
      .then(() => done());   
  })

  beforeEach((done) => { //Before each test we empty the database
    dbSetup.sinhronizacijaBezInicijalizacije()
      .then(() => done());        
  });
/*
  * Test the /GET route
  */
  describe('/GET proizvodi', () => {
      it('trebalo bi dobaviti sve proizvode', (done) => {
        chai.request(server)
            .get(rute.osoblje.bazna)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(0);
              done();
            });
      });
  });
});