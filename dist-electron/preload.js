"use strict";const i=require("electron");i.contextBridge.exposeInMainWorld("ipcRenderer",c(i.ipcRenderer));function c(e){const n=Object.getPrototypeOf(e);for(const[t,o]of Object.entries(n))Object.prototype.hasOwnProperty.call(e,t)||(typeof o=="function"?e[t]=function(...a){return o.call(e,...a)}:e[t]=o);return e}function s(e=["complete","interactive"]){return new Promise(n=>{e.includes(document.readyState)?n(!0):document.addEventListener("readystatechange",()=>{e.includes(document.readyState)&&n(!0)})})}const d={append(e,n){Array.from(e.children).find(t=>t===n)||e.appendChild(n)},remove(e,n){Array.from(e.children).find(t=>t===n)&&e.removeChild(n)}};function p(){const e="loaders-css__square-spin",n=`
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  z-index: 9;
}
    `,t=document.createElement("style"),o=document.createElement("div");return t.id="app-loading-style",t.innerHTML=n,o.className="app-loading-wrap",o.innerHTML=`<div class="${e}"><div></div></div>`,{appendLoading(){d.append(document.head,t),d.append(document.body,o)},removeLoading(){d.remove(document.head,t),d.remove(document.body,o)}}}const{appendLoading:l,removeLoading:r}=p();s().then(l);window.onmessage=e=>{e.data.payload==="removeLoading"&&r()};setTimeout(r,4999);
