const {Parser} = require('@snakesilk/xml-loader');
const Traits = require('@snakesilk/platform-traits');

const {createFactory} = Parser.TraitParser;

module.exports = {
  'attach': createFactory(Traits.Attach),
  'climbable': createFactory(Traits.Climbable),
  'climber': createFactory(Traits.Climber),
  'contact-damage': createFactory(Traits.ContactDamage),
  'death-spawn': createFactory(Traits.DeathSpawn),
  'death-zone': createFactory(Traits.DeathZone),
  'disappearing': createFactory(Traits.Disappearing),
  'environment': createFactory(Traits.Environment),
  'fallaway': createFactory(Traits.Fallaway),
  'fixed-force': require('./FixedForce'),
  'glow': createFactory(Traits.Glow),
  'health': require('./Health'),
  'invincibility': createFactory(Traits.Invincibility),
  'jump': require('./Jump'),
  'lifetime': createFactory(Traits.Lifetime),
  'light': createFactory(Traits.Light),
  'light-control': require('./LightControl'),
  'move': createFactory(Traits.Move),
  'physics': createFactory(Traits.Physics),
  'pickupable': require('./Pickupable'),
  'projectile': require('./Projectile'),
  'rotate': createFactory(Traits.Rotate),
  'solid': require('./Solid'),
  'spawn': require('./Spawn'),
  'translate': require('./Translate'),
};
