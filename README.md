[![Tests](https://github.com/DevMoitinho/modeligado/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/DevMoitinho/modeligado/actions/workflows/node.js.yml)
# Modeligado

Convert text to UML class diagrams.

This is a fork of [matheusgr/modeligado](https://github.com/matheusgr/modeligado)
([original site](https://matheusgr.github.io/modeligado/edit.html)). On top of the
original tool, this fork adds [multiplicity](#multiplicity) on relationships.

Try it: [Access here](https://DevMoitinho.github.io/modeligado/edit.html)!

## Example

```
Aluno
extends Pessoa
implements Nomeavel <Interface>, Identificavel <Interface>
association Turma [1:*]
---
- turmas: List<Turma>
- nome: str
- nasc: int
---
+ Aluno(nome: str)
+ Aluno(nome: str, nasc: int)
+ setNome(nome: str): void
+ getNome(): str
+ getId(): int
---
```

## Format

There are three parts when modelling a class:

* Class name (and its relationships)
* Attributes
* Methods (including constructors)

Each part is separated by a line of at least 3 dashes (`---`). There is also a
`---` at the end of each class. All three separators are required, even when a
part is empty.

### Relationships

There are six types of relationships among classes:

* `extends`: inheritance ("is a").
* `implements`: the class implements an interface (a contract, without inheriting an implementation).
* `association`: a plain association between two classes.
* `directionalAssociation`: an association that only one side knows about. The arrow points to the known class.
* `aggregates`: a whole-part relationship where the parts can exist on their own.
* `composes`: a whole-part relationship where the parts depend on the whole.

The diamond of `aggregates` and `composes` is drawn on the class that declares the relationship, which is the whole.

A related class is identified by its full name, so it must be written exactly as
it was declared, including a stereotype such as `<Interface>`.

#### Multiplicity

Relationships between objects can show their multiplicity at both ends of the
link. Write it between square brackets after the target class:

```
Aluno
association Turma [1:*]
---
---
---
```

![Diagram with multiplicity labels on the relationships](docs/multiplicity.png)

The value on the left of `:` belongs to the class that declares the relationship
(`Aluno`) and the value on the right belongs to the target (`Turma`). In the
example, one `Aluno` is related to many `Turma`.

It is supported in `association`, `directionalAssociation`, `aggregates` and
`composes`. `extends` and `implements` do not accept multiplicity.

Each side can be:

| Value          | Meaning                       |
|----------------|-------------------------------|
| `1`, `3`       | an exact number               |
| `0..1`, `2..5` | an interval                   |
| `1..*`         | a minimum with no upper limit |
| `*`            | any number (zero or more)     |

Each target of a relationship can have its own multiplicity:

```
association Turma [1:*], Professor [0..1:*]
```

Rules and limitations:

- Multiplicity is optional. Relationships without it work as before.
- There must be a space before `[`, and no spaces inside the brackets.
- `[` and `]` are reserved for multiplicity in relationship targets. Class
  names, attribute types and method types are not affected.
- The lower bound of an interval is not compared with the upper bound, so
  `5..2` is accepted.

### Visibility

There are three types of visibilities that can be used on attributes and methods:

* private `-`
* public `+`
* protected `#`

### Modifier

You can also define class scope attributes and methods by adding a static modifier after the visibility:

* `static`

## Run in your machine

Use any HTTP server to run modeligado in your computer:

- javascript: [serve](https://www.npmjs.com/package/serve)
- python: `python -m http.server 5000`

Then go to http://localhost:5000/edit.html (change the port 5000 if needed).

## Development

Install the dependencies (the optional ones are only needed to generate images
from the command line):

```
yarn install --ignore-optional
```

or, with npm:

```
npm install --omit=optional
```

Run the parser tests (requires Node 18 or newer) and the linter:

```
node --test
npx eslint parser.js gojs.js
```

## License

Released under the MIT license, see [LICENSE](LICENSE). Original project by
[matheusgr](https://github.com/matheusgr).
