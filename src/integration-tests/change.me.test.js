const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../api/server');
const mongodb = require('mongodb').MongoClient;
const { getConnection } = require('./connectionMock');

chai.use(chaiHttp);
const { expect } = chai;


let connectionMock;
before(async () => {
  connectionMock = await getConnection();
  sinon.stub(mongodb, 'connect').resolves(connectionMock);
});
after(() => { mongodb.connect.restore() });

describe('Testa endpoints para cadastro de usuários', () => {
  let response;

  describe('Testa quando usuário é cadastrado com sucesso', () => {

    before(async () => {
      response = await chai.request(app)
        .post('/users')
        .send({
          name: 'Joey Tribianni',
          email: 'joey@gmail.com', 
          password: '1234567899',
        });
    });

    it('Deve retornar o status 201', () => {
      expect(response).to.have.status(201);
    })

    it('Deve retornar um objeto com a chave "user"', () => {
      expect(response.body).to.have.property('user');
    })

  })


});
