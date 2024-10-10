// import { blockRootNode } from '../variables';

// import './RootNode.styles.scss';

export function initRootNode() {
  const sidebarNode = document.querySelector('.sidebar');
  const mainNode = document.querySelector('.main');
  const mainContainerNode = mainNode.querySelector('.container');
  const mainRowNode = mainNode.querySelector('.row');
  const mainContentNode = mainNode.querySelector('.row > .content');
  const pathNode = mainContentNode.querySelector('.path');
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
  // mainContainerNode.classList.remove('container');
  mainRowNode.classList.add('HeroRow');
  // mainRowNode.classList.remove('row');
  // Content node...
  mainContentNode.classList.remove('col-sm-8');
  mainContentNode.classList.remove('col-md-9');
  // mainContentNode.classList.add('col-12'); // ???
  mainContentNode.classList.add('HeroVisualBlock');
  // mainContentNode.classList.remove('content');
}
