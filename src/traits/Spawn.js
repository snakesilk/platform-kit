const {Vector2} = require('three');
const {Spawn} = require('@snakesilk/platform-traits');

function factory(parser, node) {
    const itemNodes = node.getElementsByTagName('item');
    const items = [];

    for (let itemNode, i = 0; itemNode = itemNodes[i]; ++i) {
        const offsetNode = itemNode.getElementsByTagName('offset')[0];
        let offset;
        if (offsetNode) {
            offset = parser.getVector3(offsetNode) || undefined;
        }
        const event = parser.getAttr(itemNode, 'event') || 'death';
        const object = parser.getAttr(itemNode, 'object');
        const constr = parser.loader.resourceManager.get('object', object);
        items.push([event, constr, offset]);
    }

    return function createSpawn() {
        const trait = new Spawn();
        items.forEach(function(arg) {
            trait.addItem(arg[0], arg[1], arg[2]);
        });
        return trait;
    };
}

module.exports = factory;
