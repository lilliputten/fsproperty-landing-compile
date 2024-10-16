import { uploadsFolder } from '../variables';
import { GenericError, getErrorText, quoteHtmlAttr } from '../core/helpers/strings';
import { htmlToNode } from '../core/helpers/html';

/* Data sending to `POST /uploads/landing-for-owners/dummy-submit-hook.php` as application/json with following fields:
 *
 * - name
 * - email
 * - phone
 * - comment
 *
 * Expecting a json response with two optional fields:
 *
 * - ok, boolean: The true value if the operation was successful.
 * - error, string: A brief text explaining the error (if any; it will be shown to the user). If successful, do not send anything (either NULL or an empty string).
 *
 */

import { getModalWrapperTemplate } from './RequestFormModalContent';

import './RequestFormModal.styles.scss';

interface BaseRepsonse {
  ok?: boolean;
  error?: string;
}

const isDev = process.env.DEV;
const isDebug = process.env.DEBUG;

// const submitFile = 'dummy-submit-hook.php';
const submitFile = 'accept-form.php';
const submitUrl = `/${uploadsFolder}/${submitFile}`;

const gcaptchaSiteKey = '6LdmGmMqAAAAABKSiuLlrVv1YmCuMC7wuIAXE3UZ'; // DEBUG: From wordwizzz
// const gcaptchaSiteKey = '6LeiKGMqAAAAAEDkHP0n4mhtAWxuKHpzYbQR4k3e';

let gcaptchaId: number;

/** DEBUG: Proceed submit even if errors have been found */
const debugDoSubmitWithErrors = false && isDebug;

let isVisible = false;
let modalNode: HTMLElement;
let formErrorNode: HTMLElement;

let innerNode: HTMLElement;
let pageWrapperNode: HTMLElement;

let formControls: NodeListOf<HTMLInputElement>;
const formControlGroups: Record<string, HTMLElement> = {};

let dontCheckErrors = false;

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
    modalNode.addEventListener('mousedown', onOuterClick);
    innerNode.addEventListener('mousedown', onInnerClick);
  } else {
    pageWrapperNode.removeAttribute('inert');
    document.removeEventListener('keydown', onKeyPress);
    modalNode.removeEventListener('mousedown', onOuterClick);
    innerNode.removeEventListener('mousedown', onInnerClick);
  }
  modalNode.classList.toggle('show', show);
  isVisible = show;
}

function closeModal() {
  toggleModal(false);
}

function showModal() {
  if (!modalNode) {
    initModal();
  }
  resetForm();
  if (gcaptchaId != null) {
    grecaptcha.reset(gcaptchaId);
  }
  requestAnimationFrame(() => toggleModal(true));
}

function onKeyPress(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

// Close modal on outer (not inner, see `onInnerClick` below) element click...
function onOuterClick() {
  closeModal();
}

// Prevent outer element click handle
function onInnerClick(event: MouseEvent) {
  event.stopPropagation();
}

/** Returns error status */
function checkInputValue(id: string) {
  if (dontCheckErrors) {
    return true;
  }
  const group = formControlGroups[id]; // modalNode.querySelector('.form-group#' + id + '-group') as HTMLDivElement;
  if (!group) {
    throw new Error(`Not found form group for id '${id}'`);
  }
  const input = group.querySelector('.form-control') as HTMLInputElement;
  const error = group.querySelector('.error');
  const { value, dataset } = input;
  const { required } = dataset;
  const errors: string[] = [];
  if (required && !value) {
    errors.push('Необходимо заполнить поле');
  }
  const hasErrors = !!errors.length;
  error.innerHTML = errors.map((str) => quoteHtmlAttr(str)).join('<br>\n');
  group.classList.toggle('with-error', hasErrors);
  /* console.log('[RequestFormModal:checkField]', {
   *   hasErrors,
   *   errors,
   *   value,
   *   dataset,
   *   required,
   * });
   */
  return !hasErrors;
}

function setLoading(status: boolean) {
  modalNode.classList.toggle('Waiting', status);
}

function setSubmitError(error?: GenericError) {
  // const formErrorNode = modalNode.querySelector('.form-error');
  const errorText = getErrorText(error);
  const hasError = !!errorText;
  modalNode.classList.toggle('with-error', hasError);
  formErrorNode.innerHTML = quoteHtmlAttr(errorText);
}

function setSent(isSent: boolean) {
  modalNode.classList.toggle('Message', isSent);
}

function resetForm() {
  modalNode.classList.toggle('CaptchaPassed', false);
  dontCheckErrors = true;
  setSent(false);
  setSubmitError(undefined);
  setLoading(false);
  formControls.forEach((input) => {
    input.value = ''; // Or default value?
  });
  Object.values(formControlGroups)
    .filter(Boolean)
    .forEach((node) => {
      node.classList.toggle('with-error', false);
    });
  dontCheckErrors = false;
}

/* NOTE: This method isn't used
 * function onRecaptchaLoad() {
 *   console.log('[RequestFormModal:onRecaptchaLoad]', {
 *     grecaptcha: typeof grecaptcha !== 'undefined' && grecaptcha,
 *   });
 * }
 */

function initRecaptcha() {
  /* NOTE: grecaptcha methods:
   * execute : ƒ ()
   * getPageId : ƒ ()
   * getResponse : ƒ ()
   * ready : ƒ (X)
   * render : ƒ ()
   * reset : ƒ ()
   */
  const hasRecaptcha = typeof grecaptcha !== 'undefined';
  if (!hasRecaptcha) {
    const error = new Error('Recaptcha code has not been initialized!');
    // eslint-disable-next-line no-console
    console.error('[RequestFormModal:initRecaptcha]', error.message, {
      error,
    });
    debugger; // eslint-disable-line no-debugger
    throw error;
  }
  const node = modalNode.querySelector('.g-recaptcha') as HTMLElement;
  gcaptchaId = grecaptcha.render(node, {
    sitekey: gcaptchaSiteKey,
    hl: 'ru',
    callback: captchaResponse,
    theme: 'dark',
    'expired-callback': captchaReset,
    'error-callback': captchaReset,
  });
  console.log('[RequestFormModal:initRecaptcha]', {
    gcaptchaSiteKey,
    gcaptchaId,
    grecaptcha,
    node,
  });
  grecaptcha.reset(gcaptchaId);
  modalNode.classList.toggle('CaptchaPassed', false);
}

/** Reset captcha result */
function captchaReset() {
  modalNode.classList.toggle('CaptchaPassed', false);
}

/** Confirm captcha */
function captchaResponse(response: string) {
  const isSuccess = !!response;
  console.log('[RequestFormModal:captchaResponse]', {
    isSuccess,
    response,
  });
  modalNode.classList.toggle('CaptchaPassed', isSuccess);
}

function onSubmit() {
  let hasErrors = false;
  const formData: Record<string, string | boolean> = {};
  if (isDebug && isDev) {
    formData.debug = true;
  }
  formControls.forEach((input) => {
    const { id, value } = input;
    if (!debugDoSubmitWithErrors && !checkInputValue(id)) {
      hasErrors = true;
    }
    formData[id] = value;
  });
  const submitMethod = 'POST';
  console.log('[RequestFormModal:onSubmit] Before fetch', {
    // 'process.env.DEV': process.env.DEV,
    // 'process.env.DEBUG': process.env.DEBUG,
    // debugDoSubmitWithErrors,
    grecaptcha: typeof grecaptcha !== 'undefined' && grecaptcha,
    submitMethod,
    submitUrl,
    hasErrors,
    formData,
    uploadsFolder,
    formControls,
  });
  if (hasErrors) {
    return;
  }
  // Send form...
  setLoading(true);
  fetch(submitUrl, {
    method: submitMethod,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((res) => {
      const { headers, ok, status } = res;
      if (!ok) {
        const msg = `Ошибка отправки данных (код ${status})`;
        const error = new Error(msg);
        // eslint-disable-next-line no-console
        console.error('[RequestFormModal:onSubmit] fetch result failed', status, {
          error,
          status,
          res,
        });
        throw error;
      }
      const contentType = headers.get('content-type');
      const isJson = contentType.startsWith('application/json');
      console.log('[RequestFormModal:onSubmit] fetch result', {
        contentType,
        headers,
        res,
      });
      return isJson ? res.json() : res.text();
    })
    .then((data: BaseRepsonse) => {
      const dataType = typeof data;
      console.log('[RequestFormModal:onSubmit] fetch data', dataType, {
        data,
      });
      if (dataType !== 'object') {
        // throw new Error(`Получен некорректный тип ответа сервера: ${dataType}`);
        const errorText = 'Получен некорректный ответ сервера (см. отладочный вывод)';
        const error = Error(errorText);
        // eslint-disable-next-line no-console
        console.error('[RequestFormModal:onSubmit] Data error:', errorText, {
          error,
          data,
          dataType,
        });
        debugger; // eslint-disable-line no-debugger
        throw error;
      }
      if (!data.ok || data.error) {
        const errorText = data.error
          ? 'Ошибка сервера: ' + data.error
          : 'Неизвестная ошибка сервера (смотри логи сервера)';
        const error = Error(errorText);
        // eslint-disable-next-line no-console
        console.error('[RequestFormModal:onSubmit] Server error:', errorText, {
          error,
          data,
          dataType,
        });
        debugger; // eslint-disable-line no-debugger
        throw error;
      }
      setSubmitError(undefined);
      setSent(true);
      // resetForm();
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('[RequestFormModal:onSubmit] fetch error', {
        error,
      });
      debugger; // eslint-disable-line no-debugger
      setSubmitError(error);
    })
    .finally(() => {
      setLoading(false);
    });
}

function clickControlButton(_event: PointerEvent) {
  showModal();
}

function onInputChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const { id } = target;
  /* console.log('[RequestFormModal:onInputChange]', {
   *   id,
   *   // value,
   *   target,
   *   event,
   * });
   */
  checkInputValue(id);
}

function initModal() {
  createModalWrapper();
  modalNode = document.querySelector('#RequestFormModal');
  if (!modalNode) {
    const error = new Error('Not found modal node!');
    throw error;
  }
  formErrorNode = modalNode.querySelector('.form-error');
  innerNode = modalNode.querySelector('.modal-content');
  const closeButtons = modalNode.querySelectorAll('.CloseModal');
  const submitButton = modalNode.querySelector('.SubmitButton');
  submitButton.addEventListener('click', onSubmit);
  closeButtons.forEach((node) => {
    node.addEventListener('click', closeModal);
  });
  formControls = modalNode.querySelectorAll('.form-control');
  formControls.forEach((node) => {
    const { id } = node;
    node.addEventListener('change', onInputChange);
    formControlGroups[id] = modalNode.querySelector(`.form-group#${id}-group`);
  });
  initRecaptcha();
}

export function initRequestFormModal() {
  // console.log('[RequestFormModal:initRequestFormModal]');
  pageWrapperNode = document.querySelector('.page-wrapper');
  const controlButtons = document.querySelectorAll('.RequestFormButton');
  controlButtons.forEach((node) => {
    node.addEventListener('click', clickControlButton);
  });
  /* // DEBUG: Show the modal immediately (for test purposes)
   * showModal();
   */
}

// // @ts-ignore: DEBUG
// window.onRecaptchaLoad = onRecaptchaLoad;
