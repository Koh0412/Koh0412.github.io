!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);const n={tasks:document.getElementById("tasks"),setting:document.getElementById("setting"),taskAdd:document.getElementById("task-add"),form:document.getElementById("form"),taskCount:document.getElementById("task-count"),low:document.getElementById("priority-low"),medium:document.getElementById("priority-medium"),high:document.getElementById("priority-high")},o={ripple:document.querySelector(".ripple-element")},s={noTask:'<div class="alert alert-info">現在タスクはありません</div>',priority:{low:"<span>優先度: 低</span>",medium:"<span>優先度: 中</span>",high:"<span>優先度: 高</span>"}};class i{constructor(){}convertInput(t){return t}cardColorClassName(t){switch(t){case 1:return"priority-low";case 2:return"priority-medium";case 3:return"priority-high";default:return""}}ripple(t){const e=document.querySelector(".ripple-effect"),r=t.offsetX,n=t.offsetY,o=r-t.target.clientWidth/2,s=n-t.target.clientHeight/2;e.setAttribute("style",`top: ${s}px; left: ${o}px;`),e.classList.contains("is-show-green")||(e.classList.add("is-show-green"),window.setTimeout(()=>{e.classList.remove("is-show-green")},750))}}var a;!function(t){t.clear="タスクを削除しますか？",t.allClear="タスクを全て削除しますか？"}(a||(a={}));class l{constructor(){}clear(){window.confirm(a.allClear)&&(localStorage.clear(),this.count(),n.tasks.innerHTML=s.noTask)}count(){n.taskCount.innerText=`${localStorage.length}`}remove(t){const e=t.target,r=e.parentElement;if(e.classList.contains("delete")){r.parentElement.remove();const t=r.textContent.trim();localStorage.removeItem(t),0===localStorage.length&&(n.tasks.innerHTML=s.noTask)}this.count()}save(t,e){e&&localStorage.setItem(t,e)}}class c{constructor(){this.storage=new l,this.components=new i,this.priorityArray=[]}app(){n.form.addEventListener("submit",t=>{t.preventDefault();const e=this.registeredValue().trim();this.createTaskList(e)}),n.setting.addEventListener("click",()=>{this.storage.clear()}),window.onload=()=>{this.getItemListIn(n.tasks),0===localStorage.length&&(n.tasks.innerHTML=s.noTask)},n.tasks.addEventListener("click",t=>{this.storage.remove(t)}),o.ripple.addEventListener("mousedown",t=>{this.components.ripple(t)})}clearInForm(t){n.tasks.innerHTML+=this.taskTemplate(t),this.components.convertInput(n.taskAdd).value=""}createTaskList(t){if(t.length){0===localStorage.length&&(n.tasks.innerHTML="");const e=this.taskTemplate(t);this.storage.save(t,e),this.clearInForm(t),this.storage.count()}}getItemListIn(t){for(let e in localStorage){const r=localStorage.getItem(e);r&&(t.innerHTML+=localStorage.getItem(e),console.log(r))}this.storage.count()}priority(){const t=this.components.convertInput(n.low),e=this.components.convertInput(n.medium),r=this.components.convertInput(n.high);return t.checked?Number(t.value):e.checked?Number(e.value):r.checked?Number(r.value):0}getPriorityStr(t){switch(t){case 1:return s.priority.low;case 2:return s.priority.medium;case 3:return s.priority.high;default:return""}}registeredValue(){return this.components.convertInput(n.taskAdd).value}taskTemplate(t){const e=this.getPriorityStr(this.priority());return`\n    <li class="${this.components.cardColorClassName(this.priority())}">\n      <div class="task-title">\n        ${t}\n        <i class="far fa-trash-alt delete"></i>\n      </div>\n      <div class="task-property">\n        ${e}\n      </div>\n    </li>`}}(new c).app()}]);