import TextLoader from './TextLoader';
import '../styles/index.scss';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

const lines = [
  '<b>Wir kommen schnell auf hard topics.</b>',
  'Ja das ist unser Leben... leider.',
  '<b>Was ist unser Leben?</b>',
  'Dass wir auf hard topics kommen',
  '<b>Ich find, das geht noch. Ich geh gleich Nazis gucken.</b>',
  '<b>Da rede ich lieber mit euch.</b>',
];

new TextLoader( lines );