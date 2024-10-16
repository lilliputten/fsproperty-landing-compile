(()=>{"use strict";var e={d:(r,t)=>{for(var o in t)e.o(t,o)&&!e.o(r,o)&&Object.defineProperty(r,o,{enumerable:!0,get:t[o]})},o:(e,r)=>Object.prototype.hasOwnProperty.call(e,r),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},r={};function t(e,r){var t,o,n;if(!(t=e.getBoundingClientRect(),o=window.innerHeight||document.documentElement.clientHeight,n=t.top,t.bottom>=0&&n<=o))return Promise.resolve(!1);if(e.getAttribute("data-lazy-loaded"))return Promise.resolve(!0);var a,l=e.dataset,s=l.lazyMode,i=l.originalImage;e.setAttribute("data-lazy-loading","true"),(a=i,new Promise((function(e,r){var t=document.createElement("img");t.setAttribute("src",a),t.addEventListener("load",(function(r){e(t)})),t.addEventListener("error",(function(e){var t=e.target,o=t.href,n=t.baseURI,l=new Error("Cannot load image with url '".concat(a,"'"));console.error("[LazyImages:loadImage]",{error:l,url:a,href:o,baseURI:n,target:t,event:e});debugger;r(l)}))}))).then((function(t){if(s.startsWith("background")){var o="url('".concat(t.src,"')");e.style.backgroundImage=o}else{if(e.getAttribute("src")===t.src)return!1;e.setAttribute("src",i)}return setTimeout((function(){e.setAttribute("data-lazy-loaded","true"),e.removeAttribute("data-lazy-loading")}),350),r.unobserve(e),!0})).catch((function(){}))}e.r(r),e.d(r,{appFolder:()=>n,appId:()=>a,uploadsFolder:()=>l});var o=new IntersectionObserver((function(e,r){e.forEach((function(e){t(e.target,r)}))}));var n="landing-for-owners",a="for-owners",l="uploads/landing-for-owners",s=r.uploadsFolder;function i(e,r){var t=r?"&#13;":"\n";return String(e).replace(/&/g,"&amp;").replace(/'/g,"&apos;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\r\n/g,t).replace(/[\r\n]/g,t)}var c,d,u,m,g,p,f="6LdmGmMqAAAAABKSiuLlrVv1YmCuMC7wuIAXE3UZ",h=!1,v={},b=!1;function y(){var e=function(e){var r=document.createElement("template");r.innerHTML=e.trim();var t=r.content.childNodes.length;if(1!==t){var o=new Error("html parameter must represent a single node; got ".concat(t,". ")+'Note that leading or trailing spaces around an element in your HTML, like " <img/> ", get parsed as text nodes neighbouring the element; call .trim() on your input to avoid this.');console.error("[RequestFormModal:htmlToNode]",o);debugger;throw o}return r.content.firstChild}('\n<div\n  id="RequestFormModal"\n  class="RequestFormModal modal modal-backdrop Waiting with-error"\n  tabindex="-1"\n  role="dialog"\n  aria-modal="true"\n  aria-labelledby="RequestFormModalLabel"\n>\n  <div class="modal-dialog" role="document">\n    <div class="modal-content">\n      <div class="modal-header">\n        <h2 class="modal-title" id="RequestFormModalLabel">\n          <span class="ShowForm">Отправить заявку</span>\n          <span class="ShowMessage">Спасибо!</span>\n        </h2>\n        <button type="button" class="close CloseModal" data-dismiss="modal" aria-label="Закрыть">\n          <span aria-hidden="true">×</span>\n        </button>\n      </div>\n      <div class="modal-body">\n        <div class="ShowForm EditForm">\n          <p class="DullText">\n            Отправьте онлайн-заявку на покупку недвижимости.\n          </p>\n          <form class="form FormContent">\n            <small class="error form-error text-danger">Текст ошибки.</small>\n            <div class="form-group with-error" id="name-group">\n              <input name="name" id="name" class="form-control" placeholder="Имя *" type="text" data-required="true" value="Test with error" />\n              <small class="error text-danger">Текст ошибки.</small>\n            </div>\n            <div class="form-group -with-error" id="email-group">\n              <input name="email" id="email" class="form-control" placeholder="E-mail *" type="email" data-required="true" />\n              <small class="error text-danger">Текст ошибки.</small>\n            </div>\n            <div class="form-group" id="phone-group">\n              <input name="phone" id="phone" class="form-control" placeholder="Телефон *" type="phone" data-required="true" />\n              <small class="error text-danger">Текст ошибки.</small>\n            </div>\n            <div class="form-group" id="comment-group">\n              <textarea name="comment" id="comment" class="form-control" placeholder="Комментарий" rows="4"></textarea>\n              <small class="error text-danger">Текст ошибки.</small>\n            </div>\n            <div class="form-group" id="comment-group">\n              <div class="g-recaptcha"></div>\n            </div>\n          </form>\n          <p class="DullText">\n            Нажимая кнопку «Отправить заявку» вы соглашаетесь с политикой\n            конфиденциальности и даёте согласие на обработку персональных\n            данных.\n          </p>\n        </div>\n        <div class="ShowMessage">\n          Ваша заявка принята и будет обработана в ближайшее время, Вы получите уведомление на адрес электронной почты.\n        </div>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-secondary CloseModal" data-dismiss="modal">Закрыть</button>\n        <button type="button" class="btn btn-primary SubmitButton">Отправить</button>\n      </div>\n      <div class="SpinnerSplash">\n        <div class="Spinner"></div>\n      </div>\n    </div>\n  </div>\n</div>\n');document.body.append(e)}function w(e){if(null==e)e=!h;else if(e===h)return;document.body.classList.toggle("WithModal",e),e?(d.classList.toggle("Message",!1),g.setAttribute("inert","true"),document.addEventListener("keydown",E),d.addEventListener("mousedown",M),m.addEventListener("mousedown",L)):(g.removeAttribute("inert"),document.removeEventListener("keydown",E),d.removeEventListener("mousedown",M),m.removeEventListener("mousedown",L)),d.classList.toggle("show",e),h=e}function q(){w(!1)}function S(){d||function(){if(y(),!(d=document.querySelector("#RequestFormModal"))){throw new Error("Not found modal node!")}u=d.querySelector(".form-error"),m=d.querySelector(".modal-content");var e=d.querySelectorAll(".CloseModal");d.querySelector(".SubmitButton").addEventListener("click",x),e.forEach((function(e){e.addEventListener("click",q)})),(p=d.querySelectorAll(".form-control")).forEach((function(e){var r=e.id;e.addEventListener("change",j),v[r]=d.querySelector(".form-group#".concat(r,"-group"))})),function(){if("undefined"==typeof grecaptcha){var e=new Error("Recaptcha code has not been initialized!");console.error("[RequestFormModal:initRecaptcha]",e.message,{error:e});debugger;throw e}var r=d.querySelector(".g-recaptcha");c=grecaptcha.render(r,{sitekey:f,hl:"ru",callback:T,theme:"dark"}),console.log("[RequestFormModal:initRecaptcha]",{gcaptchaId:c,grecaptcha,node:r}),grecaptcha.reset(c)}()}(),d.classList.toggle("CaptchaPassed",!1),b=!0,k(!1),A(void 0),F(!1),p.forEach((function(e){e.value=""})),Object.values(v).filter(Boolean).forEach((function(e){e.classList.toggle("with-error",!1)})),b=!1,null!=c&&grecaptcha.reset(c),requestAnimationFrame((function(){return w(!0)}))}function E(e){"Escape"===e.key&&q()}function M(){q()}function L(e){e.stopPropagation()}function R(e){if(b)return!0;var r=v[e];if(!r)throw new Error("Not found form group for id '".concat(e,"'"));var t=r.querySelector(".form-control"),o=r.querySelector(".error"),n=t.value,a=[];t.dataset.required&&!n&&a.push("Необходимо заполнить поле");var l=!!a.length;return o.innerHTML=a.map((function(e){return i(e)})).join("<br>\n"),r.classList.toggle("with-error",l),!l}function F(e){d.classList.toggle("Waiting",e)}function A(e){var r,t=(r=e)?r instanceof Error?r.message:String(r):"",o=!!t;d.classList.toggle("with-error",o),u.innerHTML=i(t)}function k(e){d.classList.toggle("Message",e)}function T(e){console.log("[RequestFormModal:captchaResponse]",{response:e}),d.classList.toggle("CaptchaPassed",!0)}function x(){var e=!1,r={};p.forEach((function(e){var t=e.id,o=e.value;r[t]=o}));var t="/".concat(s,"/dummy-submit-hook.php"),o="POST";console.log("[RequestFormModal:onSubmit] Before fetch",{grecaptcha:"undefined"!=typeof grecaptcha&&grecaptcha,submitMethod:o,submitUrl:t,hasErrors:e,formData:r,uploadsFolder:s,formControls:p}),e||(F(!0),fetch(t,{method:o,headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(r)}).then((function(e){var r=e.headers,t=e.ok,o=e.status;if(!t){var n="Ошибка отправки данных (код ".concat(o,")"),a=new Error(n);throw console.error("[RequestFormModal:onSubmit] fetch result failed",o,{error:a,status:o,res:e}),a}var l=r.get("content-type"),s=l.startsWith("application/json");return console.log("[RequestFormModal:onSubmit] fetch result",{contentType:l,headers:r,res:e}),s?e.json():e.text()})).then((function(e){var r=typeof e;if(console.log("[RequestFormModal:onSubmit] fetch data",r,{data:e}),"object"!==r){var t="Получен некорректный ответ сервера (см. отладочный вывод)",o=Error(t);console.error("[RequestFormModal:onSubmit] Data error:",t,{error:o,data:e,dataType:r});debugger;throw o}if(!e.ok||e.error){t=e.error?"Ошибка сервера: "+e.error:"Неизвестная ошибка сервера (смотри логи сервера)",o=Error(t);console.error("[RequestFormModal:onSubmit] Server error:",t,{error:o,data:e,dataType:r});debugger;throw o}A(void 0),k(!0)})).catch((function(e){console.error("[RequestFormModal:onSubmit] fetch error",{error:e});debugger;A(e)})).finally((function(){F(!1)})))}function C(e){S()}function j(e){R(e.target.id)}window.onRecaptchaLoad=function(){console.log("[RequestFormModal:onRecaptchaLoad]",{grecaptcha:"undefined"!=typeof grecaptcha&&grecaptcha})};console.warn.call(console,"DEBUG: fsproperty-landing-compile v.0.0.9 / 2024.10.16 16:47 +0300"),window.addEventListener("load",(function(){document.querySelectorAll(".LazyImage").forEach((function(e){o.observe(e)})),document.querySelector(".main").classList.add("Root"),console.log("[RequestFormModal:initRequestFormModal]",{grecaptcha:"undefined"!=typeof grecaptcha&&grecaptcha}),g=document.querySelector(".page-wrapper"),document.querySelectorAll(".RequestFormButton").forEach((function(e){e.addEventListener("click",C)})),S()}))})();
//# sourceMappingURL=scripts.js.map