import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

const users = require('./mocks/users.json');
const token = require('./mocks/token.json');

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Consulta o endpoint "/login"', () => {
  describe('O login é realizado com sucesso', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      sinon.stub(User, 'findOne').resolves(users[0] as User);

      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: users[0].email,
        password: 'secret_admin',
      });
    });
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('deve retornar as infos do usuário e o token', async () => {
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('user');
      expect(chaiHttpResponse.body).to.have.property('token');
    });

    it('deve retornar os valores de usuário do banco de dados', () => {
      const { user } = chaiHttpResponse.body;
      const { id, email, role, username } = user;
      expect(id).to.be.equals(users[0].id);
      expect(email).to.be.equals(users[0].email);
      expect(role).to.be.equals(users[0].role);
      expect(username).to.be.equals(users[0].username);
    });
    it('deve responder com status status "OK - 200"', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
  });
  describe('O login não deve funcionar com email inválido', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      sinon.stub(User, 'findOne').resolves(null);

      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'admin@email.com',
        password: users[0].password,
      });
    });
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });
    it('Deve retornar um objeto com a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message');
    });
    it('o objeto retornado deve conter a mensagem: "Incorrect email or password"', () => {
      const { message } = chaiHttpResponse.body;
      expect(message).to.be.equals('Incorrect email or password');
    });
    it('deve responder com status "unauthorized - 401"', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });
  });
  describe('O login não deve funcionar com a senha inválida', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      sinon.stub(User, 'findOne').resolves(null);

      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: users[0].email,
        password: '123456789',
      });
    });
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });
    it('Deve retornar um objeto com a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message');
    });
    it('o objeto retornado deve conter a mensagem: "Incorrect email or password"', () => {
      const { message } = chaiHttpResponse.body;
      expect(message).to.be.equals('Incorrect email or password');
    });
    it('deve responder com status "unauthorized - 401"', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });
  });
  describe('O login não deve funcionar se o email não for fornecido', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        password: '123456789',
      });
    });
    it('Deve retornar um objeto com a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message');
    });
    it('o objeto retornado deve conter a mensagem: "All fields must be filled"', () => {
      const { message } = chaiHttpResponse.body;
      expect(message).to.be.equals('All fields must be filled');
    });
    it('deve responder com status "bad request - 400"', () => {
      expect(chaiHttpResponse).to.have.status(400);
    });
  });
  describe('O login não deve funcionar se a senha não for fornecida', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: users[0].email,
      });
    });
    it('Deve retornar um objeto com a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message');
    });
    it('o objeto retornado deve conter a mensagem: "All fields must be filled"', () => {
      const { message } = chaiHttpResponse.body;
      expect(message).to.be.equals('All fields must be filled');
    });
    it('deve responder com status "bad request - 400"', () => {
      expect(chaiHttpResponse).to.have.status(400);
    });
  });
});

describe('Acessa o endpoint de validação de login: "/login/validate"', () => {
  describe('Se não o token não é informado', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate')
    });
    it('Deve retornar um objeto com a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message');
    });
    it('o objeto retornado deve conter a mensagem: "Token not found"', () => {
      const { message } = chaiHttpResponse.body;
      expect(message).to.be.equals('Token not found');
    });
    it('deve responder com status "unauthorized - 401"', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });
  });
  describe('Se o token informado for inválido', () => {
    let chaiHttpResponse: Response;
    before(async() => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set({authorization: 'false token'} )
    })
    it('Deve retornar um objeto com a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message');
    });
    it('o objeto retornado deve conter a mensagem: "Invalid token"', () => {
      const { message } = chaiHttpResponse.body;
      expect(message).to.be.equals('Invalid token');
    });
    it('deve responder com status "Unauthorized - 401"', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });
  });
  describe('Se o token for válido', () => {
    let chaiHttpResponse: Response;
    before(async() => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set({authorization: token.token} )
    })
    it('deve retornar uma string contendo a "role" do usuário', () => {
      expect(chaiHttpResponse.body).to.be.equals('user');
    });
    it('deve retornar uma resposta com o status "Ok - 200"', () => {
      expect(chaiHttpResponse).to.have.status(200)
    });
  })
});
