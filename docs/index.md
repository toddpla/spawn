# Welcome to spawn

## Installation

```
npm i class-spawn
```

## Usage

```js
const spawn = require('class-spawn');

class Parent { };

const children = {
    Child1: {
        GrandChild1: {
            GreatGrandChild1: {},
            GreatGrandChild2: {}
        },
        GrandChild2: {}
    },
    Child2: {}
}

const { Child1, GrandChild1, GreatGrandChild1} = spawn(Parent, children);

GreatGrandChild1.prototype instanceof GrandChild1; // true
GreatGrandChild1.prototype instanceof Child1; // true
GreatGrandChild1.prototype instanceof Parent; // true
```
### Parent
Must be a `class` that can be extended.

### Children
Must be an `object`  
Parameters:  
- ChildName - `object`  
- classAttributes - `object`  
- instanceAttributes - `object`
#### Example
```js
const spawn = require('class-spawn');

class Parent {
    constructor(arg) {
        this.arg = arg
    }
};

const children = {
    Child1: {
        classAttributes: {
            description: 'Some high level description'
        },
        instanceAttributes: {
            foo(bar) {
                console.log('Child1: ' + bar)
            }
        }
        GrandChild1: {
            GreatGrandChild1: {},
            GreatGrandChild2: {
                instanceAttributes: {
                    foo(bar) {
                        console.log('GreatGrandChild2: ' + bar);
                        super.foo(bar);
                    }
                }
            }
        },
        GrandChild2: {}
    },
    Child2: {}
}

const { GreatGrandChild1} = spawn(Parent, children);

const greatGrandChild2 = new GreatGrandChild2();
greatGrandChild2.foo('baz');
> GreatGrandChild2: baz
> Child1: baz

```
