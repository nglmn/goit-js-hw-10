import{i as T}from"./assets/iziToastCustom-d3224d0c.js";/* empty css                      */import{f as h,i as y}from"./assets/vendor-651d7991.js";let p=document.querySelector("span[data-days]"),S=document.querySelector("span[data-hours]"),b=document.querySelector("span[data-minutes]"),q=document.querySelector("span[data-seconds]");const u=document.querySelector("button[data-start]");d(!0);let c=null;const l=1e3,v={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){c=e[0];const r=new Date;c.getTime()<r.getTime()?y.error(T):(d(!1),u.addEventListener("click",()=>{d(!0);let t=c.getTime()-r.getTime();setInterval(()=>{const{days:n,hours:o,minutes:a,seconds:i}=C(t);p.textContent=s(n),S.textContent=s(o),b.textContent=s(a),q.textContent=s(i),t>l?t-=l:clearInterval()},1e3)}))}};function C(e){const r=l,t=r*60,n=t*60,o=n*24,a=Math.floor(e/o),i=Math.floor(e%o/n),m=Math.floor(e%o%n/t),f=Math.floor(e%o%n%t/r);return{days:a,hours:i,minutes:m,seconds:f}}function s(e){return e>=10?e:`0${e}`}function d(e){return e?u.setAttribute("disabled",""):u.removeAttribute("disabled")}h("#datetime-picker",v);
//# sourceMappingURL=commonHelpers.js.map