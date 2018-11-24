import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import * as tfvisNode from './index';

const data = [
  { index: 0, value: 50 },
  { index: 1, value: 100 },
  { index: 2, value: 150 },
];

// Get a surface
const surface = tfvisNode.visor().surface({ name: 'Barchart', tab: 'Charts' });

// Render a barchart on that surface
tfvisNode.render.barchart(data, surface, {});
console.log(tfvisNode.renderHTML());
