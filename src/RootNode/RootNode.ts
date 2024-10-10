// import { blockRootNode } from '../variables';

import './RootNode.styles.scss';

export function initRootNode() {
  const mainNode = document.querySelector('.main');
  const mainContainerNode = mainNode.querySelector('.container');
  const mainRowNode = mainNode.querySelector('.row');
  const mainContentNode = mainNode.querySelector('.row > .content');
  const pathNode = mainContentNode.querySelector('.path');
  const sidebarNode = mainNode.querySelector('.row > .sidebar');
  /* console.log('[RootNode:initRootNode]', {
   *   mainNode,
   *   mainContainerNode,
   *   mainRowNode,
   *   mainContentNode,
   *   pathNode,
   *   sidebarNode,
   * });
   */
  // Remove unused nodes...
  if (sidebarNode) {
    sidebarNode.remove();
  }
  if (pathNode) {
    pathNode.remove();
  }
  // Parent nodes...
  mainNode.classList.add('HeroMain');
  mainContainerNode.classList.add('HeroContainer');
  mainRowNode.classList.add('HeroRow');
  // Content node...
  mainContentNode.classList.remove('col-sm-8');
  mainContentNode.classList.remove('col-md-9');
  mainContentNode.classList.add('col-12'); // ???
  mainContentNode.classList.add('HeroContent');
}
