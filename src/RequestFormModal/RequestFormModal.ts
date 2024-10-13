import { uploadsFolder } from '../variables';

import './RequestFormModal.styles.scss';

let isVisible = false;
let modalNode: HTMLElement;

let innerEl: HTMLElement;
let outerEl: HTMLElement;
let pageWrapperNode: HTMLElement;

function getModalWrapperTemplate() {
  // Create modal dom nodes...
  const modalWrapperTemplate = `
<div
  id="RequestFormModal"
  class="RequestFormModal modal modal-backdrop"
  -tabindex="-1"
  role="dialog"
  aria-modal="true"
  aria-labelledby="RequestFormModalLabel"
  -style="display: block; opacity: 1"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title" id="RequestFormModalLabel">
          <span class="ShowForm">Отправить заявку</span>
          <span class="ShowMessage">Спасибо!</span>
        </h2>
        <button type="button" class="close CloseModal" data-dismiss="modal" aria-label="Закрыть">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="ShowFormo DemoForm">
          --- Форма заявки ---
        </div>
        <div class="ShowMessage">
          Ваша заявка принята и будет обработана в ближайшее время, Вы получите уведомление на адрес электронной почты.
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary CloseModal" data-dismiss="modal">Закрыть</button>
        <button type="button" class="btn btn-primary SubmitButton">Отправить</button>
      </div>
    </div>
  </div>
</div>
`;
  return modalWrapperTemplate;
}

function htmlToNode(html: string) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  const nNodes = template.content.childNodes.length;
  if (nNodes !== 1) {
    const error = new Error(
      `html parameter must represent a single node; got ${nNodes}. ` +
        'Note that leading or trailing spaces around an element in your ' +
        'HTML, like " <img/> ", get parsed as text nodes neighbouring ' +
        'the element; call .trim() on your input to avoid this.',
    );
    // eslint-disable-next-line no-console
    console.error('[RequestFormModal:htmlToNode]', error);
    debugger; // eslint-disable-line no-debugger
    throw error;
  }
  return template.content.firstChild;
}

function createModalWrapper() {
  const modalWrapperTemplate = getModalWrapperTemplate();
  const wrapperNode = htmlToNode(modalWrapperTemplate);
  document.body.append(wrapperNode);
}

function toggleModal(show?: boolean) {
  if (show == undefined) {
    show = !isVisible;
  } else if (show === isVisible) {
    return;
  }
  document.body.classList.toggle('WithModal', show);
  if (show) {
    modalNode.classList.toggle('Message', false);
    pageWrapperNode.setAttribute('inert', 'true');
    document.addEventListener('keydown', onKeyPress);
    outerEl.addEventListener('mousedown', onOuterClick);
    innerEl.addEventListener('mousedown', onInnerClick);
  } else {
    pageWrapperNode.removeAttribute('inert');
    document.removeEventListener('keydown', onKeyPress);
    outerEl.removeEventListener('mousedown', onOuterClick);
    innerEl.removeEventListener('mousedown', onInnerClick);
  }
  modalNode.classList.toggle('show', show);
  isVisible = show;
}

function closeModal() {
  toggleModal(false);
}

function onKeyPress(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

// Close modal on outer (not inner, see `onInnerClick` below) element click...
function onOuterClick(_event: MouseEvent) {
  closeModal();
}
// Prevent outer element click handle
function onInnerClick(event: MouseEvent) {
  event.stopPropagation();
}

function submitForm() {
  modalNode.classList.toggle('Message', true);
}

function clickControlButton(_event: PointerEvent) {
  toggleModal();
}

export function initRequestFormModal() {
  pageWrapperNode = document.querySelector('.page-wrapper');
  const controlButtons = document.querySelectorAll('.RequestFormButton');
  /* console.log('[RequestFormModal]', {
   *   modalNode,
   *   uploadsFolder,
   *   controlButtons,
   *   jq: $,
   * });
   */
  controlButtons.forEach((node) => {
    node.addEventListener('click', clickControlButton);
  });
  createModalWrapper();
  modalNode = document.querySelector('#RequestFormModal');
  outerEl = modalNode;
  innerEl = modalNode.querySelector('.modal-content');
  const closeButtons = modalNode.querySelectorAll('.CloseModal');
  const submitButton = modalNode.querySelector('.SubmitButton');
  submitButton.addEventListener('click', submitForm);
  closeButtons.forEach((node) => {
    node.addEventListener('click', closeModal);
  });
}
