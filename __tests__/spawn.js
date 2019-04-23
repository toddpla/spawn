const spawn = require('../lib/spawn');

class Parent {};
const children = {
    ChildOne: {
        instanceAttributes: {
            test() { return this.message }
        },
        classAttributes: {
            test() { return `Class Attribute` }
        },
        GrandChildOne: {
            GreatGrandChildOne: {}
        }
    }
}

const { ChildOne, GrandChildOne, GreatGrandChildOne } = spawn(Parent, children);

describe('spawn', () => {

    it('should spawn from Parent', () => {
        expect(ChildOne.prototype).toBeInstanceOf(Parent);
        expect(GrandChildOne.prototype).toBeInstanceOf(Parent);
        expect(GrandChildOne.prototype).toBeInstanceOf(ChildOne);
        expect(GreatGrandChildOne.prototype).toBeInstanceOf(Parent);
        expect(GreatGrandChildOne.prototype).toBeInstanceOf(ChildOne);
        expect(GreatGrandChildOne.prototype).toBeInstanceOf(GrandChildOne);
    })
    it('childOne access to instance attributes', () => {
        const childOne = new ChildOne( {message: 'test message'} );
        expect(childOne.test()).toEqual('test message');
        console.log(ChildOne.test())
    })
})