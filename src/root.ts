/** @module Scripts root module
 *  @since 2024.10.10, 15:26
 *  @changed 2024.10.10, 15:26
 */

import './app-info.scss';
import './variables/variables-expose.scss';

import './misc-styles';

import { initRootNode } from './RootNode';

// Print app info...
const appVersion = process.env.APP_VERSION;
const isDebug = process.env.DEBUG;
const isDev = process.env.DEV;
// eslint-disable-next-line no-console
const consoleMethod = isDebug || isDev ? console.warn : console.log;
consoleMethod.call(console, appVersion);

function initPage() {
  // console.log('[root:initPage]');
  // Start subcomponents...
  initRootNode();
}

window.addEventListener('load', initPage);
