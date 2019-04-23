const excludeKeys = [
    'classAttributes',
    'instanceAttributes'
];

const spawn = (Parent, children, classes = {}) => {
    Object.keys(children).filter(key => !excludeKeys.includes(key)).forEach(name => {
        let child = children[name];
        classes[name] = class extends Parent {
            constructor(...args) {
                super(...args.slice(0, Parent.length));
                Object.assign(this, child.instanceAttributes, args[Parent.length]);
            }
        }
        Object.assign(classes[name], child.classAttributes);
        Object.keys(child).filter(child => !excludeKeys.includes(child)) && spawn(classes[name], child, classes);
    });
    return classes;
};

module.exports = spawn;