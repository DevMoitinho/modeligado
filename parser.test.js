import { describe,test } from 'node:test'
import assert from 'node:assert/strict'
import { Parser } from './parser.js'

function generateClass(relation) {
  return [
        'Aluno',
        relation,
        '---',
        '---',
        '---'
      ].join('\n')
}

// TESTE ASSOCIATION
describe('association', () => {
    test('no ghost class', () => {      
      const resultado = new Parser().parse(generateClass('association Turma [1:1]'))

      assert.deepStrictEqual(resultado[0].relates, new Set(['Turma']))
    })
    test('no multiplicity', () => {
      
      const resultado = new Parser().parse(generateClass('association Turma'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Aluno', to: 'Turma', relationship: 'association' }
      ])
    })

    test('multiplicity <num>:<num>', () => {

      const resultado = new Parser().parse(generateClass('association Turma [10:100]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Aluno', to: 'Turma', relationship: 'association', fromMult: '10', toMult: '100' }
      ])
    })

    test('multiplicity <num>:*', () => {
      const resultado = new Parser().parse(generateClass('association Turma [10:*]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Aluno', to: 'Turma', relationship: 'association', fromMult: '10', toMult: '*' }
      ])
    })

    test('multiplicity *:<num>', () => {
      const resultado = new Parser().parse(generateClass('association Turma [*:10]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Aluno', to: 'Turma', relationship: 'association', fromMult: '*', toMult: '10' }
      ])
    })

    test('multiplicity <interval>:<interval>', () => {
      const resultado = new Parser().parse(generateClass('association Turma [0..3:7..10]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Aluno', to: 'Turma', relationship: 'association', fromMult: '0..3', toMult: '7..10' }
      ])
    })

    test('multiplicity <interval>:*', () => {
      const resultado = new Parser().parse(generateClass('association Turma [0..3:*]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Aluno', to: 'Turma', relationship: 'association', fromMult: '0..3', toMult: '*' }
      ])
    })

    test('multiplicity *:<interval>', () => {
      const resultado = new Parser().parse(generateClass('association Turma [*:0..3]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Aluno', to: 'Turma', relationship: 'association', fromMult: '*', toMult: '0..3' }
      ])
    })

    test('multiplicity *:*', () => {
      const resultado = new Parser().parse(generateClass('association Turma [*:*]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Aluno', to: 'Turma', relationship: 'association', fromMult: '*', toMult: '*' }
      ])
    })
})

describe('directionalAssociation', () => {
    test('no ghost class', () => {      
      const resultado = new Parser().parse(generateClass('directionalAssociation Turma [1:1]'))

      assert.deepStrictEqual(resultado[0].relates, new Set(['Turma']))
    })
    test('no multiplicity', () => {
      
      const resultado = new Parser().parse(generateClass('directionalAssociation Turma'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Aluno', to: 'Turma', relationship: 'directionalAssociation' }
      ])
    })

    test('multiplicity <num>:<num>', () => {

      const resultado = new Parser().parse(generateClass('directionalAssociation Turma [10:100]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Aluno', to: 'Turma', relationship: 'directionalAssociation', fromMult: '10', toMult: '100' }
      ])
    })

    test('multiplicity <num>:*', () => {
      const resultado = new Parser().parse(generateClass('directionalAssociation Turma [10:*]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Aluno', to: 'Turma', relationship: 'directionalAssociation', fromMult: '10', toMult: '*' }
      ])
    })

    test('multiplicity *:<num>', () => {
      const resultado = new Parser().parse(generateClass('directionalAssociation Turma [*:10]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Aluno', to: 'Turma', relationship: 'directionalAssociation', fromMult: '*', toMult: '10' }
      ])
    })

    test('multiplicity <interval>:<interval>', () => {
      const resultado = new Parser().parse(generateClass('directionalAssociation Turma [0..3:7..10]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Aluno', to: 'Turma', relationship: 'directionalAssociation', fromMult: '0..3', toMult: '7..10' }
      ])
    })

    test('multiplicity <interval>:*', () => {
      const resultado = new Parser().parse(generateClass('directionalAssociation Turma [0..3:*]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Aluno', to: 'Turma', relationship: 'directionalAssociation', fromMult: '0..3', toMult: '*' }
      ])
    })

    test('multiplicity *:<interval>', () => {
      const resultado = new Parser().parse(generateClass('directionalAssociation Turma [*:0..3]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Aluno', to: 'Turma', relationship: 'directionalAssociation', fromMult: '*', toMult: '0..3' }
      ])
    })

    test('multiplicity *:*', () => {
      const resultado = new Parser().parse(generateClass('directionalAssociation Turma [*:*]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Aluno', to: 'Turma', relationship: 'directionalAssociation', fromMult: '*', toMult: '*' }
      ])
    })
})

describe('composition', () => {
    test('no ghost class', () => {      
      const resultado = new Parser().parse(generateClass('composes Turma [1:1]'))

      assert.deepStrictEqual(resultado[0].relates, new Set(['Turma']))
    })

    test('no multiplicity', () => {
      
      const resultado = new Parser().parse(generateClass('composes Turma'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Turma', to: 'Aluno', relationship: 'composition' }
      ])
    })

    test('multiplicity <num>:<num>', () => {

      const resultado = new Parser().parse(generateClass('composes Turma [10:100]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Turma', to: 'Aluno', relationship: 'composition', fromMult: '10', toMult: '100' }
      ])
    })

    test('multiplicity <num>:*', () => {
      const resultado = new Parser().parse(generateClass('composes Turma [10:*]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Turma', to: 'Aluno', relationship: 'composition', fromMult: '10', toMult: '*' }
      ])
    })

    test('multiplicity *:<num>', () => {
      const resultado = new Parser().parse(generateClass('composes Turma [*:10]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Turma', to: 'Aluno', relationship: 'composition', fromMult: '*', toMult: '10' }
      ])
    })

    test('multiplicity <interval>:<interval>', () => {
      const resultado = new Parser().parse(generateClass('composes Turma [0..3:7..10]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Turma', to: 'Aluno', relationship: 'composition', fromMult: '0..3', toMult: '7..10' }
      ])
    })

    test('multiplicity <interval>:*', () => {
      const resultado = new Parser().parse(generateClass('composes Turma [0..3:*]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Turma', to: 'Aluno', relationship: 'composition', fromMult: '0..3', toMult: '*' }
      ])
    })

    test('multiplicity *:<interval>', () => {
      const resultado = new Parser().parse(generateClass('composes Turma [*:0..3]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Turma', to: 'Aluno', relationship: 'composition', fromMult: '*', toMult: '0..3' }
      ])
    })

    test('multiplicity *:*', () => {
      const resultado = new Parser().parse(generateClass('composes Turma [*:*]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Turma', to: 'Aluno', relationship: 'composition', fromMult: '*', toMult: '*' }
      ])
    })
})

describe('aggregation', () => {
    test('no ghost class', () => {      
      const resultado = new Parser().parse(generateClass('composes Turma [1:1]'))

      assert.deepStrictEqual(resultado[0].relates, new Set(['Turma']))
    })

    test('no multiplicity', () => {
      
      const resultado = new Parser().parse(generateClass('aggregates Turma'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Turma', to: 'Aluno', relationship: 'aggregation' }
      ])
    })

    test('multiplicity <num>:<num>', () => {

      const resultado = new Parser().parse(generateClass('aggregates Turma [10:100]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Turma', to: 'Aluno', relationship: 'aggregation', fromMult: '10', toMult: '100' }
      ])
    })

    test('multiplicity <num>:*', () => {
      const resultado = new Parser().parse(generateClass('aggregates Turma [10:*]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Turma', to: 'Aluno', relationship: 'aggregation', fromMult: '10', toMult: '*' }
      ])
    })

    test('multiplicity *:<num>', () => {
      const resultado = new Parser().parse(generateClass('aggregates Turma [*:10]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Turma', to: 'Aluno', relationship: 'aggregation', fromMult: '*', toMult: '10' }
      ])
    })

    test('multiplicity <interval>:<interval>', () => {
      const resultado = new Parser().parse(generateClass('aggregates Turma [0..3:7..10]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Turma', to: 'Aluno', relationship: 'aggregation', fromMult: '0..3', toMult: '7..10' }
      ])
    })

    test('multiplicity <interval>:*', () => {
      const resultado = new Parser().parse(generateClass('aggregates Turma [0..3:*]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Turma', to: 'Aluno', relationship: 'aggregation', fromMult: '0..3', toMult: '*' }
      ])
    })

    test('multiplicity *:<interval>', () => {
      const resultado = new Parser().parse(generateClass('aggregates Turma [*:0..3]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Turma', to: 'Aluno', relationship: 'aggregation', fromMult: '*', toMult: '0..3' }
      ])
    })

    test('multiplicity *:*', () => {
      const resultado = new Parser().parse(generateClass('aggreagates Turma [*:*]'))

      assert.deepStrictEqual(resultado[0].relations, [
        { from: 'Turma', to: 'Aluno', relationship: 'aggreagation', fromMult: '*', toMult: '*' }
      ])
    })
})

