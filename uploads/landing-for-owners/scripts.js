(()=>{"use strict";var e={d:(r,t)=>{for(var o in t)e.o(t,o)&&!e.o(r,o)&&Object.defineProperty(r,o,{enumerable:!0,get:t[o]})},o:(e,r)=>Object.prototype.hasOwnProperty.call(e,r),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},r={};function t(e,r){var t,o,n;if(!(t=e.getBoundingClientRect(),o=window.innerHeight||document.documentElement.clientHeight,n=t.top,t.bottom>=0&&n<=o))return Promise.resolve(!1);if(e.getAttribute("data-lazy-loaded"))return Promise.resolve(!0);var a,s=e.dataset,l=s.lazyMode,i=s.originalImage;e.setAttribute("data-lazy-loading","true"),(a=i,new Promise((function(e,r){var t=document.createElement("img");t.setAttribute("src",a),t.addEventListener("load",(function(r){e(t)})),t.addEventListener("error",(function(e){var t=e.target,o=t.href,n=t.baseURI,s=new Error("Cannot load image with url '".concat(a,"'"));console.error("[LazyImages:loadImage]",{error:s,url:a,href:o,baseURI:n,target:t,event:e});debugger;r(s)}))}))).then((function(t){if(l.startsWith("background")){var o="url('".concat(t.src,"')");e.style.backgroundImage=o}else{if(e.getAttribute("src")===t.src)return!1;e.setAttribute("src",i)}return setTimeout((function(){e.setAttribute("data-lazy-loaded","true"),e.removeAttribute("data-lazy-loading")}),350),r.unobserve(e),!0})).catch((function(){}))}e.r(r),e.d(r,{appFolder:()=>n,appId:()=>a,uploadsFolder:()=>s});var o=new IntersectionObserver((function(e,r){e.forEach((function(e){t(e.target,r)}))}));var n="landing-for-owners",a="for-owners",s="uploads/landing-for-owners",l=r.uploadsFolder;function i(e,r){var t=r?"&#13;":"\n";return String(e).replace(/&/g,"&amp;").replace(/'/g,"&apos;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\r\n/g,t).replace(/[\r\n]/g,t)}var c,d="/".concat(l,"/").concat("accept-form.php"),u="6LdmGmMqAAAAABKSiuLlrVv1YmCuMC7wuIAXE3UZ",m="+7 (000) 000-00-00",g="^"+m.replace(/([+()])/g,"\\$1").replace(/0/g,"\\d")+"$",p=new RegExp(g),f=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;console.log("YYY",g,p);var h,v,b,y,w,S=!1,E={},q=!1;function L(){var e=function(e){var r=document.createElement("template");r.innerHTML=e.trim();var t=r.content.childNodes.length;if(1!==t){var o=new Error("html parameter must represent a single node; got ".concat(t,". ")+'Note that leading or trailing spaces around an element in your HTML, like " <img/> ", get parsed as text nodes neighbouring the element; call .trim() on your input to avoid this.');console.error("[RequestFormModal:htmlToNode]",o);debugger;throw o}return r.content.firstChild}('\n<div\n  id="RequestFormModal"\n  class="RequestFormModal modal modal-backdrop Waiting with-error"\n  tabindex="-1"\n  role="dialog"\n  aria-modal="true"\n  aria-labelledby="RequestFormModalLabel"\n>\n  <div class="modal-dialog" role="document">\n    <div class="modal-content">\n      <div class="modal-header">\n        <h2 class="modal-title" id="RequestFormModalLabel">\n          <span class="ShowForm">Отправить заявку</span>\n          <span class="ShowMessage">Спасибо!</span>\n        </h2>\n        <button type="button" class="close CloseModal" data-dismiss="modal" aria-label="Закрыть">\n          <span aria-hidden="true">×</span>\n        </button>\n      </div>\n      <div class="modal-body">\n        <div class="ShowForm EditForm">\n          <p class="DullText">\n            Отправьте онлайн-заявку на покупку недвижимости.\n          </p>\n          <form class="form FormContent">\n            <small class="error form-error text-danger">Текст ошибки.</small>\n            <div class="form-group with-error" id="name-group">\n              <input name="name" id="name" class="form-control" placeholder="Имя *" type="text" data-required="true" value="Test with error" />\n              <small class="error text-danger">Текст ошибки.</small>\n            </div>\n            <div class="form-group -with-error" id="email-group">\n              <input name="email" id="email" class="form-control" placeholder="E-mail *" type="email" data-required="true" />\n              <small class="error text-danger">Текст ошибки.</small>\n            </div>\n            <div class="form-group" id="phone-group">\n              <input name="phone" id="phone" class="form-control" placeholder="Телефон *" type="phone" data-required="true" />\n              <small class="error text-danger">Текст ошибки.</small>\n            </div>\n            <div class="form-group" id="comment-group">\n              <textarea name="comment" id="comment" class="form-control" placeholder="Комментарий" rows="4"></textarea>\n              <small class="error text-danger">Текст ошибки.</small>\n            </div>\n            <div class="form-group" id="comment-group">\n              <div class="g-recaptcha"></div>\n            </div>\n          </form>\n          <p class="DullText">\n            Нажимая кнопку «Отправить заявку» вы соглашаетесь с политикой\n            конфиденциальности и даёте согласие на обработку персональных\n            данных.\n          </p>\n        </div>\n        <div class="ShowMessage">\n          Ваша заявка принята и будет обработана в ближайшее время, Вы получите уведомление на адрес электронной почты.\n        </div>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-secondary CloseModal" data-dismiss="modal">Закрыть</button>\n        <button type="button" class="btn btn-primary SubmitButton">Отправить</button>\n      </div>\n      <div class="SpinnerSplash">\n        <div class="Spinner"></div>\n      </div>\n    </div>\n  </div>\n</div>\n');document.body.append(e)}function M(e){if(null==e)e=!S;else if(e===S)return;document.body.classList.toggle("WithModal",e),e?(h.classList.toggle("Message",!1),y.setAttribute("inert","true"),document.addEventListener("keydown",A),h.addEventListener("mousedown",k),b.addEventListener("mousedown",T)):(y.removeAttribute("inert"),document.removeEventListener("keydown",A),h.removeEventListener("mousedown",k),b.removeEventListener("mousedown",T)),h.classList.toggle("show",e),S=e}function F(){M(!1)}function R(){h||function(){if(L(),!(h=document.querySelector("#RequestFormModal"))){throw new Error("Not found modal node!")}v=h.querySelector(".form-error"),b=h.querySelector(".modal-content");var e=h.querySelectorAll(".CloseModal");h.querySelector(".SubmitButton").addEventListener("click",O),e.forEach((function(e){e.addEventListener("click",F)})),(w=h.querySelectorAll(".form-control")).forEach((function(e){var r=e.id;e.addEventListener("input",H),E[r]=h.querySelector(".form-group#".concat(r,"-group"))})),function(){if("undefined"==typeof grecaptcha){var e=new Error("Recaptcha code has not been initialized!");console.error("[RequestFormModal:initRecaptcha]",e.message,{error:e});debugger;throw e}var r=h.querySelector(".g-recaptcha");c=grecaptcha.render(r,{sitekey:u,hl:"ru",callback:z,theme:"dark","expired-callback":I,"error-callback":I}),console.log("[RequestFormModal:initRecaptcha]",{gcaptchaSiteKey:u,gcaptchaId:c,grecaptcha,node:r}),grecaptcha.reset(c),h.classList.toggle("CaptchaPassed",!1)}(),r=E.phone.querySelector("input"),$(r).mask("+7 (000) 000-00-00");var r}(),h.classList.toggle("CaptchaPassed",!1),q=!0,j(!1),P(void 0),C(!1),w.forEach((function(e){e.value=""})),Object.values(E).filter(Boolean).forEach((function(e){e.classList.toggle("with-error",!1)})),q=!1,null!=c&&grecaptcha.reset(c),requestAnimationFrame((function(){return M(!0)}))}function A(e){"Escape"===e.key&&F()}function k(){F()}function T(e){e.stopPropagation()}function x(e){if(q)return!0;var r=E[e];if(!r)throw new Error("Not found form group for id '".concat(e,"'"));var t=r.querySelector(".form-control"),o=r.querySelector(".error"),n=t.value,a=t.dataset.required,s=[];if(!n)a&&s.push("Необходимо заполнить поле");else{var l="comment"===e?200:60;n.length>l&&s.push("Введено слишком длинное значение"),"phone"!==e||p.test(n)?"email"!==e||f.test(n)||s.push("Введите корректный e-mail адрес"):s.push("Введите корректный номер телефона (".concat(m,")"))}var c=!!s.length;return o.innerHTML=s.map((function(e){return i(e)})).join("<br>\n"),r.classList.toggle("with-error",c),!c}function C(e){h.classList.toggle("Waiting",e)}function P(e){var r,t=(r=e)?r instanceof Error?r.message:String(r):"",o=!!t;h.classList.toggle("with-error",o),v.innerHTML=i(t)}function j(e){h.classList.toggle("Message",e)}function I(){h.classList.toggle("CaptchaPassed",!1)}function z(e){var r=!!e;console.log("[RequestFormModal:captchaResponse]",{isSuccess:r,response:e}),h.classList.toggle("CaptchaPassed",r)}function O(){var e=!1,r={};w.forEach((function(t){var o=t.id,n=t.value;x(o)||(e=!0),r[o]=n}));var t="POST";console.log("[RequestFormModal:onSubmit] Before fetch",{grecaptcha:"undefined"!=typeof grecaptcha&&grecaptcha,submitMethod:t,submitUrl:d,hasErrors:e,formData:r,uploadsFolder:l,formControls:w}),e||(C(!0),fetch(d,{method:t,headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(r)}).then((function(e){var r=e.headers,t=e.ok,o=e.status;if(!t){var n="Ошибка отправки данных (код ".concat(o,")"),a=new Error(n);throw console.error("[RequestFormModal:onSubmit] fetch result failed",o,{error:a,status:o,res:e}),a}var s=r.get("content-type"),l=s.startsWith("application/json");return console.log("[RequestFormModal:onSubmit] fetch result",{contentType:s,headers:r,res:e}),l?e.json():e.text()})).then((function(e){var r=typeof e;if(console.log("[RequestFormModal:onSubmit] fetch data",r,{data:e}),"object"!==r){var t="Получен некорректный ответ сервера (см. отладочный вывод)",o=Error(t);console.error("[RequestFormModal:onSubmit] Data error:",t,{error:o,data:e,dataType:r});debugger;throw o}if(!e.ok||e.error){t=e.error?"Ошибка сервера: "+e.error:"Неизвестная ошибка сервера (смотри логи сервера)",o=Error(t);console.error("[RequestFormModal:onSubmit] Server error:",t,{error:o,data:e,dataType:r});debugger;throw o}P(void 0),j(!0)})).catch((function(e){console.error("[RequestFormModal:onSubmit] fetch error",{error:e});debugger;P(e)})).finally((function(){C(!1)})))}function B(e){R()}function H(e){x(e.target.id)}console.warn.call(console,"DEBUG: fsproperty-landing-compile v.0.0.11 / 2024.10.16 23:00 +0300"),window.addEventListener("load",(function(){document.querySelectorAll(".LazyImage").forEach((function(e){o.observe(e)})),document.querySelector(".main").classList.add("Root"),y=document.querySelector(".page-wrapper"),document.querySelectorAll(".RequestFormButton").forEach((function(e){e.addEventListener("click",B)})),R()}))})();
//# sourceMappingURL=scripts.js.map