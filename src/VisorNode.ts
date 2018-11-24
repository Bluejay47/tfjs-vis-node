/**
 * @license
 * Copyright 2018 THNK.io All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import { SurfaceInfo, Visor } from '@tensorflow/tfjs-vis';
import { VisorComponent } from '@tensorflow/tfjs-vis/dist/components/visor';
import { SurfaceInfoStrict } from '@tensorflow/tfjs-vis/dist/types';
import * as jsdom from 'jsdom';

let visorSingleton: Visor;
const DEFAULT_TAB = 'Visor';
const VISOR_CONTAINER_ID = 'tfjs-visor-container';
const { JSDOM } = jsdom;
const DEFAULT_HTML = '<!DOCTYPE html><html><head></head><body></body></html>';
const dom = new JSDOM(DEFAULT_HTML, {
  pretendToBeVisual: true,
  resources: 'usable',
  includeNodeLocations: true,
  contentType: "text/html",
});
const window = dom.window;
const document = dom.window.document;

global.document = document;
global.window = window;
global.HTMLElement = window.HTMLElement;

global.requestAnimationFrame = function() {
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                 || window[vendors[x]+'CancelRequestAnimationFrame'];
  }
}

/**
 * The primary interface to the visor is the visor() function.
 *
 * This returns a singleton object with the public API of the visor. The
 * singleton object will be replaced if the visor is removed from the DOM for
 * some reason.
 */
export function visor(): Visor {

  if (document.getElementById(VISOR_CONTAINER_ID)
    && visorSingleton != null) {
    return visorSingleton;
  }

  // Create the container
  let visorEl = document.getElementById(VISOR_CONTAINER_ID);

  if (visorEl == null) {
    visorEl = document.createElement('div');
    visorEl.id = VISOR_CONTAINER_ID;
    document.body.appendChild(visorEl);
  }

  let renderRoot: Element;
  function renderVisor(
    domNode: HTMLElement,
    surfaceList: Map<string, SurfaceInfoStrict>): VisorComponent {
    let visorInstance: VisorComponent;
    renderRoot = VisorComponent.render(domNode, renderRoot, {
      ref: (r: VisorComponent) => visorInstance = r,
      surfaceList: Array.from(surfaceList.values()),
    });
    // Side effect of VisorComponent.render() is to assign visorInstance
    return visorInstance!;
  }

  // TODO: consider changing this type. Possibly lift into top level state
  // object
  const surfaceList: Map<string, SurfaceInfoStrict> = new Map();
  const visorComponentInstance: VisorComponent =
    renderVisor(visorEl, surfaceList);

  // Singleton visor instance. Implements public API of the visor.
  visorSingleton = {
    el: visorEl,
    surface: (options: SurfaceInfo) => {
      const { name } = options;
      const tab = options.tab == null ? DEFAULT_TAB : options.tab;

      if (name == null ||
        // tslint:disable-next-line
        !(typeof name === 'string' || name as any instanceof String)) {
        throw new Error(
          // tslint:disable-next-line
          'You must pass a config object with a \'name\' property to create or retrieve a surface');
      }

      const finalOptions: SurfaceInfoStrict = {
        ...options,
        tab,
      };

      const key = `${name}-${tab}`;
      if (!surfaceList.has(key)) {
        surfaceList.set(key, finalOptions);
      }

      visorComponentInstance.toggleFullScreen();
      renderVisor(visorEl as HTMLElement, surfaceList);
      return visorComponentInstance.getSurface(name, tab);
    },
    isFullscreen: () => false,
    isOpen: () => true,
    close: () => false,
    open: () => false,
    toggle: () => false,
    toggleFullScreen: () => false,
    bindKeys: () => false,
    unbindKeys: () => false,
    setActiveTab: (tabName: string) => {
      const tabs = visorComponentInstance.state.tabs;
      if (!tabs.has(tabName)) {
        throw new Error(`Tab '${tabName}' does not exist`);
      }
      visorComponentInstance.setState({ activeTab: tabName });
    }
  };

  return visorSingleton;
}

export function renderHTML() {

  let item:Element|null = document.querySelector("[data-glamor]");

  //  if (item != null) {
  //    return (<HTMLElement>item).dataset.glamor;
  //  } else {
  //    return false;
  //  }
  return dom.serialize();

}