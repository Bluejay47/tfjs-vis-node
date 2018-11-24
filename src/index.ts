import {renderBarchart} from '@tensorflow/tfjs-vis/dist/render/barchart';
import {renderConfusionMatrix} from '@tensorflow/tfjs-vis/dist/render/confusion_matrix';
import {renderHistogram} from '@tensorflow/tfjs-vis/dist/render/histogram';
import {renderLinechart} from '@tensorflow/tfjs-vis/dist/render/linechart';
import {renderScatterplot} from '@tensorflow/tfjs-vis/dist/render/scatterplot';
import {renderTable} from '@tensorflow/tfjs-vis/dist/render/table';
import {fitCallbacks, history} from '@tensorflow/tfjs-vis/dist/show/history';
import {layer, modelSummary} from '@tensorflow/tfjs-vis/dist/show/model';
import {showConfusionMatrix, showPerClassAccuracy} from '@tensorflow/tfjs-vis/dist/show/quality';
import {valuesDistribution} from '@tensorflow/tfjs-vis/dist/show/tensor';
import {accuracy, confusionMatrix, perClassAccuracy} from '@tensorflow/tfjs-vis/dist/util/math';

const render = {
  barchart: renderBarchart,
  table: renderTable,
  histogram: renderHistogram,
  linechart: renderLinechart,
  scatterplot: renderScatterplot,
  confusionMatrix: renderConfusionMatrix,
};

const metrics = {
  accuracy,
  perClassAccuracy,
  confusionMatrix,
};

const show = {
  history,
  fitCallbacks,
  perClassAccuracy: showPerClassAccuracy,
  confusionMatrix: showConfusionMatrix,
  valuesDistribution,
  layer,
  modelSummary,
};

export {visor} from './VisorNode';
export {renderHTML} from './VisorNode';
export {renderCSS} from './VisorNode';
export {render};
export {metrics};
export {show};

export {Visor, Surface, SurfaceInfo, StyleOptions, Drawable,} from '@tensorflow/tfjs-vis/dist/types';