import * as chai from 'chai';
import * as sinon from 'sinon';

import { Response } from 'superagent';
import { app } from '../app';
import Team from '../database/models/team';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const teamsMock = require('./mocks/teams.json');


describe('Faz uma requisição ao endponit "/teams"', () => {
  describe('retorna uma lista vazia se não times cadastrados', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      sinon.stub(Team, 'findAll').resolves([]);
      chaiHttpResponse = await chai.request(app).get('/teams');
    });
    after(() => {
      (Team.findAll as sinon.SinonStub).restore();
    });
    it('deve retornar um array vazio', () => {
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body).to.be.empty;
    });
  });

  describe('retorna uma lista de times', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      sinon.stub(Team, 'findAll').resolves(teamsMock as Team[]);
      chaiHttpResponse = await chai.request(app).get('/teams');
    });
    after(() => {
      (Team.findAll as sinon.SinonStub).restore();
    });

    it('deve retornar um array de tamanho 3', () => {
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body).to.have.length(3);
    });
    it('Os elementos do array devem ser do tipo "team"', () => {
      expect(chaiHttpResponse.body[0]).to.have.property('id');
      expect(chaiHttpResponse.body[0]).to.have.property('teamName');
    });
  });
});

describe('Faz uma requisição ao endponit "/teams/:id"', () => {
  describe('se não existe time com o id passado na requisição', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      sinon.stub(Team, 'findByPk').resolves(null);
      chaiHttpResponse = await chai.request(app).get('/teams/1');
    });
    after(() => {
      (Team.findByPk as sinon.SinonStub).restore();
    });
    it('deve retornar a resposta com status 404', () => {
      expect(chaiHttpResponse.status).to.be.equals(404);
    });
    it('deve retornar a mensagem de erro "Team no found"', () => {
      const { message } = chaiHttpResponse.body;
      expect(message).to.be.equals('Team not found');
    })
  });

  describe('retorna um time', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      sinon.stub(Team, 'findByPk').resolves(teamsMock[0]);
      chaiHttpResponse = await chai.request(app).get('/teams/1');
    });
    after(() => {
      (Team.findByPk as sinon.SinonStub).restore();
    });

    it('deve retornar uma resposta com status 200', () => {
      expect(chaiHttpResponse.status).to.be.equals(200);
    });
    it('deve retornar um objeto com propriedades de um time', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('id');
      expect(chaiHttpResponse.body).to.have.property('teamName');
    });
  });
});
