import * as chai from 'chai';
import * as sinnon from 'sinon';

import { Response } from 'superagent';
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('Faz uma requisição ao endponit "/teams"', () => {
 describe('retorna uma lista vazia se não times cadastrados', () => {
  let chaiHttpResponse: Response;
  before(async()=>{});
  after(()=>{});
  it('deve retornar um array vazio', ()=> {
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.be.empty;
  })
 });
 
 describe('retorna uma lista de times', () => {
  let chaiHttpResponse: Response;
  before(async()=>{});
  after(()=>{});

  it('deve retornar um array de tamanho 3', () => {

  })
  it('Os elementos do array devem ser do tipo "team"', () => {

  })
 })
})
