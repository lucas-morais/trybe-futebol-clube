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

describe('Faz uma requisição GET ao endponit "/matches"', () => {
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
        chaiHttpResponse = await chai
          .request(app)
          .get('/matches?inProgress=true');
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
        });
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
        chaiHttpResponse = await chai
          .request(app)
          .get('/matches?inProgress=false');
      });
      after(() => {
        (Match.findAll as sinon.SinonStub).restore();
      });

      it('deve retornar um array de tamanho 2', () => {
        expect(chaiHttpResponse.body).to.be.an('array');
        expect(chaiHttpResponse.body).to.have.length(2);
      });
      it('Os elementos do array devem ter a propriedade inProgress com valor "false"', () => {
        chaiHttpResponse.body.forEach((match: Match) => {
          expect(match.inProgress).to.be.false;
        });
      });
    });
  });
});

describe('Cria uma nova partida, fazendo uma requisção POST no endpoint "matches"', () => {
  describe('Se o token de autorização não for informado', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      chaiHttpResponse = await chai.request(app).post('/matches');
    });
    it('reotrna uma resposta com o status "401 - Unauthorized"', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });
    it('retorna a mensagem "Token not found"', () => {
      const { message } = chaiHttpResponse.body;
      expect(message).to.be.equals('Token not found')
    });
  });
  describe('Se o token for inválido', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set({authorization: 'false token'});
    });
    it('reotrna uma resposta com o status "401 - Unauthorized"', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });
    it('retorna a mensagem "Invalid token"', () => {
      const { message } = chaiHttpResponse.body;
      expect(message).to.be.equals('Invalid token');
    });
  })
  describe('Se os campos da requisição não são preenchido corretamente', () => {
    it('retorna uma resposta com status "400 - Bad Request', () => {});
    it('retorna a mensagem "All fields must be filled correctly"', () => {});
  });
  describe('Se os times forem repetidos na requisção', () => {
    it('retorna uma resposta com o status "409 - Bad Request"', () => {});
    it('retorna a mensagem "It is not possible to create a match with two equal teams"', () => {});
  });
  describe('Se um dos times não existe', () => {
    it('retorna uma resposta com o status "404 - Not Found"', () => {});
    it('retorna a mensagem "There is no team with such id!"', () => {});
  });
  describe('Se a requisição tenta criar uma partida finalizada', () => {
    it('retorna uma resposta com status "409 - Bad Request"', () => {});
    it('retorna a mensagem "Match must be in progress"', () => {});
  });
  describe('Se a partida é criada com sucesso', () => {
    it('retorna uma resposta com status "201 - Created"', () => {});
    it('retorna um objeto com propriedades de uma partida', () => {});
    it('o status da partida deve ser "inProgres: true"', () => {});
  });
});

describe('Faz uma requisção para o endpoint "/matches/:id/finish", finalizando uma partida', () => {
  describe('Se a partida não existe', () => {
    it('retorna uma reposta com status "404 - Not Found"', () => {});
    it('retorna a mensagem "Match not found"', () => {

    });
  });
  describe('Se a parida já foi finalizada', () => {
    it('retorna uma resposta com status "409 - Conflict"', () => {});
    it('retorna a mensagem "Match is already finished"', () => {});
  });
  describe('Se a partida é encerrada com sucesso', () => {
    it('retorna uma resposta com status "200 - Ok"', () => {});
    it('retorna a mensagem "Finished"', () => {});
  });
});
