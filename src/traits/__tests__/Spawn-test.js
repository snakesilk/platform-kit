const expect = require('expect.js');
const sinon = require('sinon');

const {createNode} = require('@snakesilk/testing/xml');
const {Entity, Loader, World} = require('@snakesilk/engine');
const {Parser} = require('@snakesilk/xml-loader');
const {Spawn} = require('@snakesilk/platform-traits');

const factory = require('..')['spawn'];

describe('Spawn factory', function() {
  const MockEntity1 = Symbol('mock entity 1');
  const MockEntity2 = Symbol('mock entity 2');

  let parser, trait;

  beforeEach(() => {
    parser = new Parser.TraitParser(new Loader());
    sinon.stub(Spawn.prototype, 'addItem');
  });

  afterEach(() => {
    Spawn.prototype.addItem.restore();
  });

  it('creates a Spawn trait', () => {
    const node = createNode(`<trait/>`);
    trait = factory(parser, node)();
    expect(trait).to.be.a(Spawn);
  });

  describe('when no properties defined', () => {
    beforeEach(() => {
      const node = createNode(`<trait/>`);
      trait = factory(parser, node)();
    });

    it('creates a valid trait', () => {
      expect(trait).to.be.a(Spawn);
    });
  });

  describe('when parsing using undefined object', () => {
    it('raises an exception', () => {
      expect(() => {
        const node = createNode(`<trait name="spawn">
          <item event="recycle" object="UndefinedObject"/>
        </trait>`);
        factory(parser, node)();
      }).to.throwError(error => {
        expect(error).to.be.a(Error);
        expect(error.message).to.be('No resource "UndefinedObject" of type object');
      });
    });
  });

  describe('when parsing with single item defined', () => {
    beforeEach(() => {
      parser.loader.resourceManager.addObject('Explosion', MockEntity1);
      const node = createNode(`<trait>
          <item event="recycle" object="Explosion"/>
      </trait>`);
      trait = factory(parser, node)();
    });

    it('discovers a single item', () => {
      expect(trait.addItem.callCount).to.be(1);
      expect(trait.addItem.lastCall.args).to.eql([
        'recycle',
        MockEntity1,
        undefined,
      ]);
    });
  });

  describe('when parsing with multiple items', () => {
    beforeEach(() => {
      parser.loader.resourceManager.addObject('Explosion', MockEntity1);
      parser.loader.resourceManager.addObject('Blast', MockEntity2);
      const node = createNode(`<trait name="spawn">
          <item event="recycle" object="Explosion"/>
          <item event="blast" object="Blast">
              <offset x="13.2341" y="11.123" z="-5.412"/>
          </item>
      </trait>`);
      trait = factory(parser, node)();
    });

    it('discovers multiple items', () => {
      expect(trait.addItem.callCount).to.be(2);
    });

    it('parses event names', () => {
      expect(trait.addItem.getCall(0).args[0]).to.equal('recycle');
      expect(trait.addItem.getCall(1).args[0]).to.equal('blast');
    });

    it('resolves correct object', () => {
      expect(trait.addItem.getCall(0).args[1]).to.be(MockEntity1);
      expect(trait.addItem.getCall(1).args[1]).to.be(MockEntity2);
    });

    it('parses offset when given', () => {
      expect(trait.addItem.getCall(1).args[2]).to.eql({
        x: 13.2341,
        y: 11.123,
        z: -5.412,
      });
    });
  });
});
