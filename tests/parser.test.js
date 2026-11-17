import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { Parser } from '../parser.js'

function generateClass (relation) {
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

  test('multiType multiplicity1', () => {
    const resultado = new Parser().parse(generateClass('association Turma [*:*], Professor'))

    assert.deepStrictEqual(resultado[0].relates, new Set(['Turma', 'Professor']))
    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Aluno', fromMult: '*', to: 'Turma', toMult: '*', relationship: 'association' },
      { from: 'Aluno', to: 'Professor', relationship: 'association' }])
  })

  test('multiType multiplicity2', () => {
    const resultado = new Parser().parse(generateClass('association Turma , Professor [*:*]'))

    assert.deepStrictEqual(resultado[0].relates, new Set(['Turma', 'Professor']))
    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Aluno', to: 'Turma', relationship: 'association' },
      { from: 'Aluno', fromMult: '*', to: 'Professor', toMult: '*', relationship: 'association' }])
  })

  test('multiType multiplicity3', () => {
    const resultado = new Parser().parse(generateClass('association Turma [*:*], Professor [*:*]'))

    assert.deepStrictEqual(resultado[0].relates, new Set(['Turma', 'Professor']))
    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Aluno', fromMult: '*', to: 'Turma', toMult: '*', relationship: 'association' },
      { from: 'Aluno', fromMult: '*', to: 'Professor', toMult: '*', relationship: 'association' }])
  })

  test('no space', () => {
    assert.throws(
      () => new Parser().parse(generateClass('association Turma[*:*]')),
      { name: 'ParseError' }
    )
  })

  test('name after multiplicity', () => {
    assert.throws(
      () => new Parser().parse(generateClass('association Turma [n:n] teste')),
      { name: 'ParseError' }
    )
  })

  test('name with <>', () => {
    const resultado = new Parser().parse(generateClass('association Turma <interface> [10:100]'))

    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Aluno', to: 'Turma <interface>', relationship: 'association', fromMult: '10', toMult: '100' }
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

  test('multiType multiplicity1', () => {
    const resultado = new Parser().parse(generateClass('directionalAssociation Turma [*:*], Professor'))

    assert.deepStrictEqual(resultado[0].relates, new Set(['Turma', 'Professor']))
    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Aluno', fromMult: '*', to: 'Turma', toMult: '*', relationship: 'directionalAssociation' },
      { from: 'Aluno', to: 'Professor', relationship: 'directionalAssociation' }])
  })

  test('multiType multiplicity2', () => {
    const resultado = new Parser().parse(generateClass('directionalAssociation Turma , Professor [*:*]'))

    assert.deepStrictEqual(resultado[0].relates, new Set(['Turma', 'Professor']))
    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Aluno', to: 'Turma', relationship: 'directionalAssociation' },
      { from: 'Aluno', fromMult: '*', to: 'Professor', toMult: '*', relationship: 'directionalAssociation' }])
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
      { from: 'Turma', to: 'Aluno', relationship: 'composition', toMult: '10', fromMult: '100' }
    ])
  })

  test('multiplicity <num>:*', () => {
    const resultado = new Parser().parse(generateClass('composes Turma [10:*]'))

    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Turma', to: 'Aluno', relationship: 'composition', toMult: '10', fromMult: '*' }
    ])
  })

  test('multiplicity *:<num>', () => {
    const resultado = new Parser().parse(generateClass('composes Turma [*:10]'))

    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Turma', to: 'Aluno', relationship: 'composition', toMult: '*', fromMult: '10' }
    ])
  })

  test('multiplicity <interval>:<interval>', () => {
    const resultado = new Parser().parse(generateClass('composes Turma [0..3:7..10]'))

    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Turma', to: 'Aluno', relationship: 'composition', toMult: '0..3', fromMult: '7..10' }
    ])
  })

  test('multiplicity <interval>:*', () => {
    const resultado = new Parser().parse(generateClass('composes Turma [0..3:*]'))

    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Turma', to: 'Aluno', relationship: 'composition', toMult: '0..3', fromMult: '*' }
    ])
  })

  test('multiplicity *:<interval>', () => {
    const resultado = new Parser().parse(generateClass('composes Turma [*:0..3]'))

    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Turma', to: 'Aluno', relationship: 'composition', toMult: '*', fromMult: '0..3' }
    ])
  })

  test('multiplicity *:*', () => {
    const resultado = new Parser().parse(generateClass('composes Turma [*:*]'))

    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Turma', to: 'Aluno', relationship: 'composition', toMult: '*', fromMult: '*' }
    ])
  })

  test('multiType multiplicity1', () => {
    const resultado = new Parser().parse(generateClass('composes Turma [*:*], Professor'))

    assert.deepStrictEqual(resultado[0].relates, new Set(['Turma', 'Professor']))
    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Turma', fromMult: '*', to: 'Aluno', toMult: '*', relationship: 'composition' },
      { from: 'Professor', to: 'Aluno', relationship: 'composition' }])
  })

  test('multiType multiplicity2', () => {
    const resultado = new Parser().parse(generateClass('composes Turma , Professor [*:*]'))

    assert.deepStrictEqual(resultado[0].relates, new Set(['Turma', 'Professor']))
    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Turma', to: 'Aluno', relationship: 'composition' },
      { from: 'Professor', fromMult: '*', to: 'Aluno', toMult: '*', relationship: 'composition' }])
  })
})

describe('aggregation', () => {
  test('no ghost class', () => {
    const resultado = new Parser().parse(generateClass('aggregates Turma [1:1]'))

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
      { from: 'Turma', to: 'Aluno', relationship: 'aggregation', toMult: '10', fromMult: '100' }
    ])
  })

  test('multiplicity <num>:*', () => {
    const resultado = new Parser().parse(generateClass('aggregates Turma [10:*]'))

    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Turma', to: 'Aluno', relationship: 'aggregation', toMult: '10', fromMult: '*' }
    ])
  })

  test('multiplicity *:<num>', () => {
    const resultado = new Parser().parse(generateClass('aggregates Turma [*:10]'))

    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Turma', to: 'Aluno', relationship: 'aggregation', toMult: '*', fromMult: '10' }
    ])
  })

  test('multiplicity <interval>:<interval>', () => {
    const resultado = new Parser().parse(generateClass('aggregates Turma [0..3:7..10]'))

    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Turma', to: 'Aluno', relationship: 'aggregation', toMult: '0..3', fromMult: '7..10' }
    ])
  })

  test('multiplicity <interval>:*', () => {
    const resultado = new Parser().parse(generateClass('aggregates Turma [0..3:*]'))

    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Turma', to: 'Aluno', relationship: 'aggregation', toMult: '0..3', fromMult: '*' }
    ])
  })

  test('multiplicity *:<interval>', () => {
    const resultado = new Parser().parse(generateClass('aggregates Turma [*:0..3]'))

    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Turma', to: 'Aluno', relationship: 'aggregation', toMult: '*', fromMult: '0..3' }
    ])
  })

  test('multiplicity *:*', () => {
    const resultado = new Parser().parse(generateClass('aggregates Turma [*:*]'))

    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Turma', to: 'Aluno', relationship: 'aggregation', toMult: '*', fromMult: '*' }
    ])
  })

  test('multiType multiplicity1', () => {
    const resultado = new Parser().parse(generateClass('aggregates Turma [*:*], Professor'))

    assert.deepStrictEqual(resultado[0].relates, new Set(['Turma', 'Professor']))
    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Turma', fromMult: '*', to: 'Aluno', toMult: '*', relationship: 'aggregation' },
      { from: 'Professor', to: 'Aluno', relationship: 'aggregation' }])
  })

  test('multiType multiplicity2', () => {
    const resultado = new Parser().parse(generateClass('aggregates Turma , Professor [*:*]'))

    assert.deepStrictEqual(resultado[0].relates, new Set(['Turma', 'Professor']))
    assert.deepStrictEqual(resultado[0].relations, [
      { from: 'Turma', to: 'Aluno', relationship: 'aggregation' },
      { from: 'Professor', fromMult: '*', to: 'Aluno', toMult: '*', relationship: 'aggregation' }])
  })
})

describe('wrong usage', () => {

  test('invalid args, ex: [n:n]', () => {
    assert.throws(
      () => new Parser().parse(generateClass('association Turma [n:n]')),
      { name: 'ParseError' }
    )
  })

  test('unclosed brackets', () => {
    assert.throws(
      () => new Parser().parse(generateClass('association Turma [1:*')),
      { name: 'ParseError' }
    )
  })

  test('unopened brackets', () => {
    assert.throws(
      () => new Parser().parse(generateClass('association Turma 1:*]')),
      { name: 'ParseError' }
    )
  })

  test('one param', () => {
    assert.throws(
      () => new Parser().parse(generateClass('association Turma [1]')),
      { name: 'ParseError' }
    )
  })

  test('missing one param left', () => {
    assert.throws(
      () => new Parser().parse(generateClass('association Turma [:1]')),
      { name: 'ParseError' }
    )
  })

  test('missing one param right', () => {
    assert.throws(
      () => new Parser().parse(generateClass('association Turma [1:]')),
      { name: 'ParseError' }
    )
  })

  test('more than two param', () => {
    assert.throws(
      () => new Parser().parse(generateClass('association Turma [1:*:2]')),
      { name: 'ParseError' }
    )
  })

  test('one param and two colomns', () => {
    assert.throws(
      () => new Parser().parse(generateClass('association Turma [:*:]')),
      { name: 'ParseError' }
    )
  })

  test('interval starting with * left', () => {
    assert.throws(
      () => new Parser().parse(generateClass('association Turma [*..5:1]')),
      { name: 'ParseError' }
    )
  })

  test('interval starting with * right', () => {
    assert.throws(
      () => new Parser().parse(generateClass('association Turma [5:*..1]')),
      { name: 'ParseError' }
    )
  })

  test('multiplicity in extends', () => {
    assert.throws(
      () => new Parser().parse(generateClass('extends Turma [5:1]')),
      { name: 'ParseError' }
    )
  })

  test('multiplicity in implements', () => {
    assert.throws(
      () => new Parser().parse(generateClass('implements Turma [*:1]')),
      { name: 'ParseError' }
    )
  })

  test('alvo com ponto, ex: java.util.List', { todo: true }, () => {
    // ...
  })

})
