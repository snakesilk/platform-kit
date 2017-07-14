const {Vector2} = require('three');
const {Spawn} = require('@snakesilk/platform-traits');

function factory(parser, node) {
    const entityNodes = node.getElementsByTagName('entity');
    const items = [];

    for (let entityNode, i = 0; entityNode = entityNodes[i]; ++i) {
        const offsetNode = entityNode.getElementsByTagName('offset')[0];
        let offset;
        if (offsetNode) {
            offset = parser.getVector3(offsetNode) || undefined;
        }
        const event = parser.getAttr(entityNode, 'event') || 'death';
        const entityId = parser.getAttr(entityNode, 'id');
        const constructor = parser.loader.resourceManager.get('entity', entityId);
        items.push([event, constructor, offset]);
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
