// import * as chai from 'chai';
// import * as sinon from 'sinon';

// import { Response } from 'superagent';
// import { app } from '../app';
// import Team from '../database/models/team';
// import chaiHttp = require('chai-http');

// chai.use(chaiHttp);

// const { expect } = chai;

// const teamsMock = require('./mocks/teams.json');


// describe('Faz uma requisição ao endponit "/teams"', () => {
//   describe('retorna uma lista vazia se não times cadastrados', () => {
//     let chaiHttpResponse: Response;
//     before(async () => {
//       sinon.stub(Team, 'findAll').resolves([]);
//       chaiHttpResponse = await chai.request(app).get('/teams');
//     });
//     after(() => {
//       (Team.findAll as sinon.SinonStub).restore();
//     });
//     it('deve retornar um array vazio', () => {
//       expect(chaiHttpResponse.body).to.be.an('array');
//       expect(chaiHttpResponse.body).to.be.empty;
//     });
//   });

//   describe('retorna uma lista de times', () => {
//     let chaiHttpResponse: Response;
//     before(async () => {
//       sinon.stub(Team, 'findAll').resolves(teamsMock as Team[]);
//       chaiHttpResponse = await chai.request(app).get('/teams');
//     });
//     after(() => {});

//     it('deve retornar um array de tamanho 3', () => {
//       expect(chaiHttpResponse.body).to.be.an('array');
//       expect(chaiHttpResponse.body).to.have.length(3);
//     });
//     it('Os elementos do array devem ser do tipo "team"', () => {
//       expect(chaiHttpResponse.body[0]).to.have.property('id');
//       expect(chaiHttpResponse.body[0]).to.have.property('teamName');
//     });
//   });
// });
