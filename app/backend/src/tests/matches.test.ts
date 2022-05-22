import * as chai from 'chai';
import * as sinon from 'sinon';

import { Response } from 'superagent';
import { app } from '../app';
import Match from '../database/models/match';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const matchesMock = require('./mocks/matches.json');

const finishedMock = matchesMock.slice(0, 2);
const inProgressMock = matchesMock.slice(2, 4);

describe('Faz uma requisição ao endponit "/matches"', () => {
  describe('retorna uma lista vazia se não há partidas cadastradas', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      sinon.stub(Match, 'findAll').resolves([]);
      chaiHttpResponse = await chai.request(app).get('/matches');
    });
    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });
    it('deve retornar um array vazio', () => {
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body).to.be.empty;
    });
  });

  describe('retorna uma lista de times', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      sinon.stub(Match, 'findAll').resolves(matchesMock as Match[]);
      chaiHttpResponse = await chai.request(app).get('/matches');
    });
    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('deve retornar um array de tamanho 4', () => {
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body).to.have.length(4);
    });
    it('Os elementos do array devem ser do tipo "match"', () => {
      expect(chaiHttpResponse.body[0]).to.have.property('id');
      expect(chaiHttpResponse.body[0]).to.have.property('homeTeam');
      expect(chaiHttpResponse.body[0]).to.have.property('homeTeamGoals');
      expect(chaiHttpResponse.body[0]).to.have.property('awayTeam');
      expect(chaiHttpResponse.body[0]).to.have.property('awayTeamGoals');
      expect(chaiHttpResponse.body[0]).to.have.property('inProgress');
      expect(chaiHttpResponse.body[0]).to.have.property('teamHome');
      expect(chaiHttpResponse.body[0]).to.have.property('teamAway');
    });
  });
});

describe('Faz requisição no endpoint "matches/inProgress=?", filtrando partidas pelo status', () => {
  describe('busca por partidas em andamento', () => {
    describe('se não existem partidas em andamento', () => {
      let chaiHttpResponse: Response;
      before(async () => {
        sinon.stub(Match, 'findAll').resolves([]);
        chaiHttpResponse = await chai
          .request(app)
          .get('/matches?inProgress=true');
      });
      after(() => {
        (Match.findAll as sinon.SinonStub).restore();
      });
      it('deve retornar um array vazio', () => {
        expect(chaiHttpResponse.body).to.be.an('array');
        expect(chaiHttpResponse.body).to.be.empty;
      });
    });
    describe('retorna uma lista de partidas em andamento', () => {
      let chaiHttpResponse: Response;
      before(async () => {
        sinon.stub(Match, 'findAll').resolves(inProgressMock as Match[]);
        chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
      });
      after(() => {
        (Match.findAll as sinon.SinonStub).restore();
      });
  
      it('deve retornar um array de tamanho 2', () => {
        expect(chaiHttpResponse.body).to.be.an('array');
        expect(chaiHttpResponse.body).to.have.length(2);
      });
      it('Os elementos do array devem ter a propridade "inProgress" com valor "true"', () => {
        chaiHttpResponse.body.forEach((match: Match) => {
          expect(match.inProgress).to.be.true;
        })
      });
    });
  });
  describe('busca por partidas finalizadas', () => {
    describe('se não existem partidas finalizadas', () => {
      let chaiHttpResponse: Response;
      before(async () => {
        sinon.stub(Match, 'findAll').resolves([]);
        chaiHttpResponse = await chai
          .request(app)
          .get('/matches?inProgress=false');
      });
      after(() => {
        (Match.findAll as sinon.SinonStub).restore();
      });
      it('deve retornar um array vazio', () => {
        expect(chaiHttpResponse.body).to.be.an('array');
        expect(chaiHttpResponse.body).to.be.empty;
      });
    });
    describe('retorna uma lista de partidas finalizadas', () => {
      let chaiHttpResponse: Response;
      before(async () => {
        sinon.stub(Match, 'findAll').resolves(finishedMock as Match[]);
        chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');
      });
      after(() => {
        (Match.findAll as sinon.SinonStub).restore();
      });
  
      it('deve retornar um array de tamanho 2', () => {
        expect(chaiHttpResponse.body).to.be.an('array');
        expect(chaiHttpResponse.body).to.have.length(2);
      });
      it('Os elementos do array devem ter a propriedade inProgress com valor "false"', () => {
        chaiHttpResponse.body.forEach((match:Match) => {
          expect(match.inProgress).to.be.false;
        })
      });
    });
  });
});
