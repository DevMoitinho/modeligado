# Modeligado

This is a fork from the project on [modeligado](https://matheusgr.github.io/modeligado/edit.html)
This project has the porpouse beeing a tool that allows you to build 

Convert text to UML. [Access here](https://matheusgr.github.io/modeligado/edit.html)!

## Example

```
Aluno
extends Pessoa
implements Nomeavel <Interface>, Identificavel <Interface>
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

Each part is separeted with at least 3 dashes (`---`). There is also 3 dashes at the end of a class.

### Relationships 

There are five types of relationships among classes:

* extends
* implements
* association
* directionalAssociation
* composes
* aggregates

## Multiplicity

Relationships between objects can show their multiplicity at both ends
of the link. Write it between square brackets after the target class:

```
Aluno
association Turma [1:*]
---
---
---
```

The value on the left of `:` belongs to the class that declares the
relationship (`Aluno`) and the value on the right belongs to the target
(`Turma`). In the example, one `Aluno` is related to many `Turma`.

Supported in `association`, `directionalAssociation`, `aggregates` and
`composes`. `extends` and `implements` do not accept multiplicity.

Each side can be:

| Value        | Meaning                       |
|--------------|-------------------------------|
| `1`, `3`     | an exact number               |
| `0..1`, `2..5` | an interval                 |
| `1..*`       | a minimum with no upper limit |
| `*`          | any number (zero or more)     |

Each target of a relationship can have its own multiplicity:

```
association Turma [1:*], Professor [0..1:*]
```

Rules and limitations:

- Multiplicity is optional. Relationships without it work as before.
- There must be a space before `[`, and no spaces inside the brackets.
- `[` and `]` are reserved for multiplicity in relationship targets.
  Class names, attribute types and method types are not affected.
- The lower bound of an interval is not compared with the upper bound,
  so `5..2` is accepted.

### Visibility
There are three types of visibilities that can be used on attributes and methods.

* private ```-```
* public ```+```
* protected ```#```

### Modifier
You can also define class scope attributes and methods by adding a static modifier after visibility:

* static

## Run in your machine

Use any HTTP server to run modeligado in your computer:

- javascript: [serve](https://www.npmjs.com/package/serve)
- python: `python -m http.server 5000`

Then go to http://localhost:5000/edit.html (change the port 5000 if needed)
