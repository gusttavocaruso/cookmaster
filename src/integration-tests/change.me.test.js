const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../api/server');
const mongodb = require('mongodb').MongoClient;
const { getConnection } = require('./connectionMock');
const jwt = require('jsonwebtoken');

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

  });

  describe('Testa quando Email informado já está cadastrado', () => {

    before(async () => {
      const userMock = connectionMock
        .db('Cookmaster').collection('users');
  
      await userMock.insertOne({
        name: 'Mano Brown',
        email: 'brown@gmail.com',
        password: '987654321',
      })
  
      response = await chai.request(app)
        .post('/users')
        .send({
          name: 'Carlinhos Brown',
          email: 'brown@gmail.com',
          password: '6546548793',
        });
    })

    it('Deve retornar o status 409', () => {
      expect(response).to.have.status(409);
    })

    it('A requisição deve retornar a mensagem: Email already registered', () => {
      expect(response.body.message).to.be.equals('Email already registered');
    })

  });

  describe('Testa quando usuário é cadastrado sem o campo "name"', () => {

    before(async () => {
      response = await chai.request(app)
        .post('/users')
        .send({
          email: 'joey@gmail.com', 
          password: '1234567899',
        });
    });

    it('Deve retornar o status 400', () => {
      expect(response).to.have.status(400);
    })

    it('A requisição deve retornar a mensagem: Invalid entries. Try again.', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    })

  });

  describe('Testa quando usuário é cadastrado sem o campo "email"', () => {

    before(async () => {
      response = await chai.request(app)
        .post('/users')
        .send({
          name: 'Mano Brown',
          password: '987654321',
        });
    });

    it('Deve retornar o status 400', () => {
      expect(response).to.have.status(400);
    })

    it('A requisição deve retornar a mensagem: Invalid entries. Try again.', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    })

  });

  describe('Testa quando usuário é cadastrado sem o campo "password"', () => {

    before(async () => {
      response = await chai.request(app)
        .post('/users')
        .send({
          name: 'Mano Brown',
          email: 'brown@gmail.com', 
        });
    });

    it('Deve retornar o status 400', () => {
      expect(response).to.have.status(400);
    })

    it('A requisição deve retornar a mensagem: Invalid entries. Try again.', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    })

  });

});

describe('Testa endpoints para login', () => {
  let response;

  describe('Testa quando login é realizado com sucesso', () => {

    before(async () => {
      const userMock = connectionMock
        .db('Cookmaster').collection('users');
  
      await userMock.insertOne({
        name: 'Leandro Karnal',
        email: 'karnal@gmail.com',
        password: '1234567855',
      })

      response = await chai.request(app)
        .post('/login')
        .send({
          email: 'karnal@gmail.com', 
          password: '1234567855',
        });
    });

    it('Deve retornar o status 200', () => {
      expect(response).to.have.status(200);
    })

    it('Deve retornar um objeto com a chave "token"', () => {
      expect(response.body).to.have.property('token');
    })

  });

  describe('Testa quando login é tentado com senha inválida', () => {

    before(async () => {
      const userMock = connectionMock
        .db('Cookmaster').collection('users');
  
      await userMock.insertOne({
        name: 'Leandro Karnal',
        email: 'karnal@gmail.com',
        password: '1234567855',
      })

      response = await chai.request(app)
        .post('/login')
        .send({
          email: 'karnal@gmail.com', 
          password: '123',
        });
    });

    it('Deve retornar o status 401', () => {
      expect(response).to.have.status(401);
    })

    it('A requisição deve retornar a mensagem: Incorrect username or password', () => {
      expect(response.body.message).to.be.equals('Incorrect username or password');
    })

  });

  describe('Testa quando login é tentado com email inválido', () => {

    before(async () => {
      const userMock = connectionMock
        .db('Cookmaster').collection('users');
  
      await userMock.insertOne({
        name: 'Leandro Karnal',
        email: 'karnal@gmail.com',
        password: '1234567855',
      })

      response = await chai.request(app)
        .post('/login')
        .send({
          email: 'karna@gmail.com', 
          password: '1234567855',
        });
    });

    it('Deve retornar o status 401', () => {
      expect(response).to.have.status(401);
    })

    it('A requisição deve retornar a mensagem: Incorrect username or password', () => {
      expect(response.body.message).to.be.equals('Incorrect username or password');
    })

  });

});

/*
describe('Testa endpoints para cadastro de receitas', () => {
  let response;

  describe('Testa quando a receita é cadastrada com sucesso', () => {
    before(async () => {
      response = await chai.request(app)
        .post('/recipes')
        .send({
          name: 'Ovo mexido',
          ingredients: 'Ovo, sal',
          preparation: 'Bate o ovo, frita o ovo.',
        });
    });

    it('Deve retornar o status 201', () => {
      expect(response).to.have.status(201);
    })

    it('Deve retornar um objeto com a chave "recipe"', () => {
      expect(response.body).to.have.property('recipe');
    })

  });

})
*/
