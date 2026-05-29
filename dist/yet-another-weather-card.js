/**
 * Yet Another Weather Card
 * ───────────────────
 * A beautiful Home Assistant Lovelace card with animated SVG weather icons,
 * toggleable hourly/daily forecast, and support for custom temperature,
 * humidity, and pressure sensor entities.
 *
 * Version: 1.5.0
 * Author:  Balazs Skorka
 *
 * Installation (manual, easiest):
 *   1. Copy this file to /config/www/yet-another-weather-card.js
 *   2. Settings → Dashboards → Resources → Add Resource
 *        URL : /local/yet-another-weather-card.js
 *        Type: JavaScript Module
 *   3. Hard refresh your browser (Ctrl/Cmd + Shift + R).
 *   4. Add a card to your dashboard:
 *        type: custom:yet-another-weather-card
 *        entity: weather.your_weather_entity
 *
 * Installation (HACS):
 *   HACS → Frontend → ⋮ → Custom repositories → add your GitHub repo URL
 *   as a "Lovelace" category, then install from the list.
 */

// (Lit 3 is inlined below as a self-contained bundle — see large block below.)

// ─────────────────────────────────────────────────────────
// Lit 3 (bundled inline, ~17 KB)
// ─────────────────────────────────────────────────────────
// We inline Lit instead of importing from a CDN. This was a deliberate
// fix for Fully Kiosk Browser and other restricted WebViews that block
// or fail cross-origin module imports. The file is now fully
// self-contained — fetched once from your HA host, no external deps.
var R=globalThis,L=R.ShadowRoot&&(R.ShadyCSS===void 0||R.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,D=Symbol(),X=new WeakMap,w=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==D)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(L&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=X.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&X.set(e,t))}return t}toString(){return this.cssText}},Y=o=>new w(typeof o=="string"?o:o+"",void 0,D),tt=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((s,i,n)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[n+1],o[0]);return new w(e,o,D)},et=(o,t)=>{if(L)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=R.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,o.appendChild(s)}},j=L?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return Y(e)})(o):o;var{is:Et,defineProperty:bt,getOwnPropertyDescriptor:Ct,getOwnPropertyNames:wt,getOwnPropertySymbols:xt,getPrototypeOf:Pt}=Object,f=globalThis,st=f.trustedTypes,Ut=st?st.emptyScript:"",z=f.reactiveElementPolyfillSupport,x=(o,t)=>o,B={toAttribute(o,t){switch(t){case Boolean:o=o?Ut:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},ht=(o,t)=>!Et(o,t),it={attribute:!0,type:String,converter:B,reflect:!1,useDefault:!1,hasChanged:ht},ot,rt;(ot=Symbol.metadata)!=null||(Symbol.metadata=Symbol("metadata")),(rt=f.litPropertyMetadata)!=null||(f.litPropertyMetadata=new WeakMap);var $=class extends HTMLElement{static addInitializer(t){var e;this._$Ei(),((e=this.l)!=null?e:this.l=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=it){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&bt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){var r;let{get:i,set:n}=(r=Ct(this.prototype,t))!=null?r:{get(){return this[e]},set(a){this[e]=a}};return{get:i,set(a){let h=i==null?void 0:i.call(this);n==null||n.call(this,a),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){var e;return(e=this.elementProperties.get(t))!=null?e:it}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;let t=Pt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){let e=this.properties,s=[...wt(e),...xt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(j(i))}else t!==void 0&&e.push(j(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$EO)!=null?e:this._$EO=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)==null||s.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){var e;let t=(e=this.shadowRoot)!=null?e:this.attachShadow(this.constructor.shadowRootOptions);return et(t,this.constructor.elementStyles),t}connectedCallback(){var t,e;(t=this.renderRoot)!=null||(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostConnected)==null?void 0:i.call(s)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var n;let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let r=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:B).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){var n,r,a;let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let h=s.getPropertyOptions(i),l=typeof h.converter=="function"?{fromAttribute:h.converter}:((n=h.converter)==null?void 0:n.fromAttribute)!==void 0?h.converter:B;this._$Em=i;let c=l.fromAttribute(e,h.type);this[i]=(a=c!=null?c:(r=this._$Ej)==null?void 0:r.get(i))!=null?a:c,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){var r,a;if(t!==void 0){let h=this.constructor;if(i===!1&&(n=this[t]),s!=null||(s=h.getPropertyOptions(t)),!(((r=s.hasChanged)!=null?r:ht)(n,e)||s.useDefault&&s.reflect&&n===((a=this._$Ej)==null?void 0:a.get(t))&&!this.hasAttribute(h._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},r){var a,h,l;s&&!((a=this._$Ej)!=null?a:this._$Ej=new Map).has(t)&&(this._$Ej.set(t,(h=r!=null?r:e)!=null?h:this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&((l=this._$Eq)!=null?l:this._$Eq=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s,i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if((s=this.renderRoot)!=null||(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[r,a]of n){let{wrapped:h}=a,l=this[r];h!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,a,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(n=>{var r;return(r=n.hostUpdate)==null?void 0:r.call(n)}),this.update(e)):this._$EM()}catch(n){throw t=!1,this._$EM(),n}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}},nt;$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[x("elementProperties")]=new Map,$[x("finalized")]=new Map,z==null||z({ReactiveElement:$}),((nt=f.reactiveElementVersions)!=null?nt:f.reactiveElementVersions=[]).push("2.1.2");var U=globalThis,at=o=>o,k=U.trustedTypes,lt=k?k.createPolicy("lit-html",{createHTML:o=>o}):void 0,ft="$lit$",m=`lit$${Math.random().toFixed(9).slice(2)}$`,mt="?"+m,Ot=`<${mt}>`,y=document,O=()=>y.createComment(""),H=o=>o===null||typeof o!="object"&&typeof o!="function",Z=Array.isArray,Ht=o=>Z(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",I=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ct=/-->/g,dt=/>/g,A=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pt=/'/g,ut=/"/g,At=/^(?:script|style|textarea|title)$/i,G=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),Mt=G(1),Nt=G(2),jt=G(3),v=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),$t=new WeakMap,g=y.createTreeWalker(y,129);function gt(o,t){if(!Z(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return lt!==void 0?lt.createHTML(t):t}var Tt=(o,t)=>{let e=o.length-1,s=[],i,n=t===2?"<svg>":t===3?"<math>":"",r=P;for(let a=0;a<e;a++){let h=o[a],l,c,d=-1,u=0;for(;u<h.length&&(r.lastIndex=u,c=r.exec(h),c!==null);)u=r.lastIndex,r===P?c[1]==="!--"?r=ct:c[1]!==void 0?r=dt:c[2]!==void 0?(At.test(c[2])&&(i=RegExp("</"+c[2],"g")),r=A):c[3]!==void 0&&(r=A):r===A?c[0]===">"?(r=i!=null?i:P,d=-1):c[1]===void 0?d=-2:(d=r.lastIndex-c[2].length,l=c[1],r=c[3]===void 0?A:c[3]==='"'?ut:pt):r===ut||r===pt?r=A:r===ct||r===dt?r=P:(r=A,i=void 0);let _=r===A&&o[a+1].startsWith("/>")?" ":"";n+=r===P?h+Ot:d>=0?(s.push(l),h.slice(0,d)+ft+h.slice(d)+m+_):h+m+(d===-2?a:_)}return[gt(o,n+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},M=class o{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,r=0,a=t.length-1,h=this.parts,[l,c]=Tt(t,e);if(this.el=o.createElement(l,s),g.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=g.nextNode())!==null&&h.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let d of i.getAttributeNames())if(d.endsWith(ft)){let u=c[r++],_=i.getAttribute(d).split(m),T=/([.?@])?(.*)/.exec(u);h.push({type:1,index:n,name:T[2],strings:_,ctor:T[1]==="."?q:T[1]==="?"?K:T[1]==="@"?F:C}),i.removeAttribute(d)}else d.startsWith(m)&&(h.push({type:6,index:n}),i.removeAttribute(d));if(At.test(i.tagName)){let d=i.textContent.split(m),u=d.length-1;if(u>0){i.textContent=k?k.emptyScript:"";for(let _=0;_<u;_++)i.append(d[_],O()),g.nextNode(),h.push({type:2,index:++n});i.append(d[u],O())}}}else if(i.nodeType===8)if(i.data===mt)h.push({type:2,index:n});else{let d=-1;for(;(d=i.data.indexOf(m,d+1))!==-1;)h.push({type:7,index:n}),d+=m.length-1}n++}}static createElement(t,e){let s=y.createElement("template");return s.innerHTML=t,s}};function b(o,t,e=o,s){var r,a,h;if(t===v)return t;let i=s!==void 0?(r=e._$Co)==null?void 0:r[s]:e._$Cl,n=H(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((a=i==null?void 0:i._$AO)==null||a.call(i,!1),n===void 0?i=void 0:(i=new n(o),i._$AT(o,e,s)),s!==void 0?((h=e._$Co)!=null?h:e._$Co=[])[s]=i:e._$Cl=i),i!==void 0&&(t=b(o,i._$AS(o,t.values),i,s)),t}var W=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var l;let{el:{content:e},parts:s}=this._$AD,i=((l=t==null?void 0:t.creationScope)!=null?l:y).importNode(e,!0);g.currentNode=i;let n=g.nextNode(),r=0,a=0,h=s[0];for(;h!==void 0;){if(r===h.index){let c;h.type===2?c=new N(n,n.nextSibling,this,t):h.type===1?c=new h.ctor(n,h.name,h.strings,this,t):h.type===6&&(c=new J(n,this,t)),this._$AV.push(c),h=s[++a]}r!==(h==null?void 0:h.index)&&(n=g.nextNode(),r++)}return g.currentNode=y,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},N=class o{get _$AU(){var t,e;return(e=(t=this._$AM)==null?void 0:t._$AU)!=null?e:this._$Cv}constructor(t,e,s,i){var n;this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(n=i==null?void 0:i.isConnected)!=null?n:!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=b(this,t,e),H(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==v&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ht(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(y.createTextNode(t)),this._$AH=t}$(t){var n;let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=M.createElement(gt(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(e);else{let r=new W(i,this),a=r.u(this.options);r.p(e),this.T(a),this._$AH=r}}_$AC(t){let e=$t.get(t.strings);return e===void 0&&$t.set(t.strings,e=new M(t)),e}k(t){Z(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let n of t)i===e.length?e.push(s=new o(this.O(O()),this.O(O()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t!==this._$AB;){let i=at(t).nextSibling;at(t).remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(t,e=this,s,i){let n=this.strings,r=!1;if(n===void 0)t=b(this,t,e,0),r=!H(t)||t!==this._$AH&&t!==v,r&&(this._$AH=t);else{let a=t,h,l;for(t=n[0],h=0;h<n.length-1;h++)l=b(this,a[s+h],e,h),l===v&&(l=this._$AH[h]),r||(r=!H(l)||l!==this._$AH[h]),l===p?t=p:t!==p&&(t+=(l!=null?l:"")+n[h+1]),this._$AH[h]=l}r&&!i&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t!=null?t:"")}},q=class extends C{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},K=class extends C{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},F=class extends C{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){var r;if((t=(r=b(this,t,e,0))!=null?r:p)===v)return;let s=this._$AH,i=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==p&&(s===p||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)==null?void 0:e.host)!=null?s:this.element,t):this._$AH.handleEvent(t)}},J=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){b(this,t)}};var V=U.litHtmlPolyfillSupport,_t;V==null||V(M,N),((_t=U.litHtmlVersions)!=null?_t:U.litHtmlVersions=[]).push("3.3.3");var yt=(o,t,e)=>{var n,r;let s=(n=e==null?void 0:e.renderBefore)!=null?n:t,i=s._$litPart$;if(i===void 0){let a=(r=e==null?void 0:e.renderBefore)!=null?r:null;s._$litPart$=i=new N(t.insertBefore(O(),a),a,void 0,e!=null?e:{})}return i._$AI(o),i};var S=globalThis,E=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,s;let t=super.createRenderRoot();return(s=(e=this.renderOptions).renderBefore)!=null||(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=yt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return v}},vt;E._$litElement$=!0,E.finalized=!0,(vt=S.litElementHydrateSupport)==null||vt.call(S,{LitElement:E});var Q=S.litElementPolyfillSupport;Q==null||Q({LitElement:E});var St;((St=S.litElementVersions)!=null?St:S.litElementVersions=[]).push("4.2.2");var LitElement=E,css=tt,html=Mt,nothing=p,svg=Nt;;
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/

// ─────────────────────────────────────────────────────────
// Card implementation
// ─────────────────────────────────────────────────────────

class YetAnotherWeatherCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
      _forecastHourly: { type: Array },
      _forecastDaily: { type: Array },
      _mode: { type: String },
      _omCurrent: { type: Object },
      _omHourly: { type: Array },
      _omDaily: { type: Array },
    };
  }

  constructor() {
    super();
    this._forecastHourly = [];
    this._forecastDaily = [];
    this._mode = "hourly";
    this._unsubHourly = null;
    this._unsubDaily = null;
    this._subscribed = false;
    this._omCurrent = null;
    this._omHourly = [];
    this._omDaily = [];
    this._omLastLat = null;
    this._omLastLon = null;
    this._omLastFetch = 0;
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    const hasLocation =
      config.location_entity ||
      (config.latitude != null && config.longitude != null);
    if (!config.entity && !hasLocation) {
      throw new Error(
        "You need to define a weather entity or a location (location_entity, or latitude + longitude)"
      );
    }
    if (config.entity && !config.entity.startsWith("weather.")) {
      throw new Error("entity must be a weather.* entity");
    }
    this._config = {
      default_mode: "hourly",
      show_current: true,
      show_forecast: true,
      show_stats: true,
      forecast_items: 7,
      forecast_style: "strip",
      disable_animations: false,
      ...config,
    };
    this._mode = this._config.default_mode;
  }

  set hass(value) {
    this._hass = value;
    if (!this._subscribed && value) {
      this._subscribed = true;
      if (this._config?.entity) this._subscribeForecasts();
    }
    if (value && this._config && this._locationMode()) {
      const loc = this._resolveLocation();
      if (loc) {
        const coordsChanged =
          loc.lat !== this._omLastLat || loc.lon !== this._omLastLon;
        const stale = Date.now() - this._omLastFetch > 600_000;
        if (coordsChanged || stale) {
          this._fetchOpenMeteoWeather(loc.lat, loc.lon);
        }
      }
    }
    this.requestUpdate();
  }

  get hass() {
    return this._hass;
  }

  updated() {
    if (this._config?.disable_animations) {
      this.setAttribute("disable-animations", "");
    } else {
      this.removeAttribute("disable-animations");
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribeForecasts();
    this._subscribed = false;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this._hass && !this._subscribed) {
      this._subscribed = true;
      if (this._config?.entity) this._subscribeForecasts();
    }
    if (this._hass && this._config && this._locationMode()) {
      const loc = this._resolveLocation();
      if (loc) this._fetchOpenMeteoWeather(loc.lat, loc.lon);
    }
  }

  // ── Forecast subscriptions (modern HA WebSocket API) ─────
  async _subscribeForecasts() {
    if (!this._hass || !this._config || !this._config.entity) return;
    this._unsubscribeForecasts();

    const tryType = async (type) => {
      try {
        return await this._hass.connection.subscribeMessage(
          (msg) => {
            if (type === "hourly") this._forecastHourly = msg.forecast || [];
            else this._forecastDaily = msg.forecast || [];
            this.requestUpdate();
          },
          {
            type: "weather/subscribe_forecast",
            forecast_type: type,
            entity_id: this._config.entity,
          }
        );
      } catch (e) {
        // This forecast_type is not supported by the integration
        return null;
      }
    };

    this._unsubHourly = await tryType("hourly");
    this._unsubDaily = await tryType("daily");
  }

  _unsubscribeForecasts() {
    if (this._unsubHourly) {
      try { this._unsubHourly(); } catch (e) {}
      this._unsubHourly = null;
    }
    if (this._unsubDaily) {
      try { this._unsubDaily(); } catch (e) {}
      this._unsubDaily = null;
    }
  }

  // ── Location-based mode helpers ──────────────────────────

  _locationMode() {
    return !!(
      this._config?.location_entity ||
      (this._config?.latitude != null && this._config?.longitude != null)
    );
  }

  _resolveLocation() {
    if (!this._hass || !this._config) return null;
    const le = this._config.location_entity;
    if (le) {
      const s = this._hass.states[le];
      if (s?.attributes.latitude != null && s?.attributes.longitude != null) {
        return { lat: s.attributes.latitude, lon: s.attributes.longitude };
      }
    }
    if (this._config.latitude != null && this._config.longitude != null) {
      const lat = parseFloat(this._config.latitude);
      const lon = parseFloat(this._config.longitude);
      if (!isNaN(lat) && !isNaN(lon)) return { lat, lon };
    }
    return null;
  }

  _wmoToCondition(code) {
    const map = {
      0: "sunny", 1: "sunny", 2: "partlycloudy", 3: "cloudy",
      45: "fog", 48: "fog",
      51: "rainy", 53: "rainy", 55: "pouring",
      56: "snowy-rainy", 57: "snowy-rainy",
      61: "rainy", 63: "rainy", 65: "pouring",
      66: "snowy-rainy", 67: "snowy-rainy",
      71: "snowy", 73: "snowy", 75: "snowy", 77: "snowy",
      80: "rainy", 81: "rainy", 82: "pouring",
      85: "snowy", 86: "snowy",
      95: "lightning-rainy",
      96: "lightning-rainy", 99: "lightning-rainy",
    };
    return map[code] ?? "cloudy";
  }

  async _fetchOpenMeteoWeather(lat, lon) {
    const useFahrenheit =
      this._hass?.config?.unit_system?.temperature === "°F";
    const tempUnit = useFahrenheit ? "fahrenheit" : "celsius";
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,surface_pressure` +
      `&hourly=temperature_2m,weather_code,precipitation_probability` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
      `&wind_speed_unit=kmh&temperature_unit=${tempUnit}&timezone=auto&forecast_days=7&forecast_hours=24`;
    try {
      const resp = await fetch(url);
      if (!resp.ok) return;
      const data = await resp.json();
      const c = data.current;
      this._omCurrent = {
        condition: this._wmoToCondition(c.weather_code),
        temperature: c.temperature_2m,
        humidity: c.relative_humidity_2m,
        wind_speed: c.wind_speed_10m,
        pressure: c.surface_pressure,
        temperature_unit: useFahrenheit ? "°F" : "°C",
        wind_speed_unit: "km/h",
        pressure_unit: "hPa",
      };
      const h = data.hourly;
      this._omHourly = h.time.map((dt, i) => ({
        datetime: dt,
        condition: this._wmoToCondition(h.weather_code[i]),
        temperature: h.temperature_2m[i],
        precipitation_probability: h.precipitation_probability[i],
      }));
      const d = data.daily;
      this._omDaily = d.time.map((dt, i) => ({
        datetime: dt,
        condition: this._wmoToCondition(d.weather_code[i]),
        temperature: d.temperature_2m_max[i],
        templow: d.temperature_2m_min[i],
        precipitation_probability: d.precipitation_probability_max[i],
      }));
      this._omLastLat = lat;
      this._omLastLon = lon;
      this._omLastFetch = Date.now();
      this.requestUpdate();
    } catch (e) {
      // Network error — keep displaying previous data
    }
  }

  // ── Value resolver: custom sensor wins, weather attr is fallback
  _resolveValue(customEntity, weatherAttr, defaultUnit) {
    const weather = this._hass.states[this._config.entity];
    if (customEntity && this._hass.states[customEntity]) {
      const s = this._hass.states[customEntity];
      const num = parseFloat(s.state);
      return {
        value: isNaN(num) ? s.state : num,
        unit: s.attributes.unit_of_measurement || defaultUnit || "",
      };
    }
    if (weather && weather.attributes[weatherAttr] != null) {
      return {
        value: weather.attributes[weatherAttr],
        unit:
          weather.attributes[`${weatherAttr}_unit`] ||
          defaultUnit ||
          "",
      };
    }
    return null;
  }

  _fmt(v, decimals = 1) {
    if (v == null || v === "") return "—";
    if (typeof v !== "number") return v;
    return decimals === 0 ? Math.round(v).toString() : v.toFixed(decimals);
  }

  _isDay(dt) {
    if (!dt) {
      const sun = this._hass.states["sun.sun"];
      return !sun || sun.state === "above_horizon";
    }
    const h = new Date(dt).getHours();
    return h >= 6 && h < 20;
  }

  _formatTime(dt) {
    return new Date(dt).toLocaleTimeString(
      this._lang() || this._hass.locale?.language || "en",
      { hour: "2-digit", minute: "2-digit", hour12: false }
    );
  }

  _formatDay(dt) {
    const d = new Date(dt);
    const today = new Date();
    if (d.toDateString() === today.toDateString()) return this._t("today");
    return d.toLocaleDateString(
      this._lang() || this._hass.locale?.language || "en",
      { weekday: "short" }
    );
  }

  // ── Translations ─────────────────────────────────────────
  //
  // Strings used by the card, translated for en/de/hu. The keys for weather
  // conditions match Home Assistant's canonical condition strings:
  // https://www.home-assistant.io/integrations/weather/#condition-mapping
  //
  // _lang() resolves the active language: explicit config option wins, then
  // the user's HA UI locale, then English as the ultimate fallback.
  static get translations() {
    return {
      en: {
        // Conditions
        "clear-night": "Clear night",
        cloudy: "Cloudy",
        exceptional: "Exceptional",
        fog: "Fog",
        hail: "Hail",
        lightning: "Lightning",
        "lightning-rainy": "Lightning, rainy",
        partlycloudy: "Partly cloudy",
        pouring: "Pouring",
        rainy: "Rainy",
        snowy: "Snowy",
        "snowy-rainy": "Snowy, rainy",
        sunny: "Sunny",
        windy: "Windy",
        "windy-variant": "Windy",
        // UI labels
        hourly: "Hourly",
        daily: "Daily",
        now: "Now",
        today: "Today",
        humidity: "Humidity",
        pressure: "Pressure",
        wind: "Wind",
        not_found: "Weather entity not found",
      },
      de: {
        "clear-night": "Klare Nacht",
        cloudy: "Bewölkt",
        exceptional: "Außergewöhnlich",
        fog: "Nebel",
        hail: "Hagel",
        lightning: "Gewitter",
        "lightning-rainy": "Gewitter, Regen",
        partlycloudy: "Teilweise bewölkt",
        pouring: "Starkregen",
        rainy: "Regnerisch",
        snowy: "Schneefall",
        "snowy-rainy": "Schneeregen",
        sunny: "Sonnig",
        windy: "Windig",
        "windy-variant": "Windig",
        hourly: "Stündlich",
        daily: "Täglich",
        now: "Jetzt",
        today: "Heute",
        humidity: "Luftfeuchte",
        pressure: "Luftdruck",
        wind: "Wind",
        not_found: "Wetter-Entität nicht gefunden",
      },
      hu: {
        "clear-night": "Tiszta éjszaka",
        cloudy: "Felhős",
        exceptional: "Rendkívüli",
        fog: "Köd",
        hail: "Jégeső",
        lightning: "Villámlás",
        "lightning-rainy": "Villámlás, eső",
        partlycloudy: "Részben felhős",
        pouring: "Zuhogó eső",
        rainy: "Esős",
        snowy: "Havazás",
        "snowy-rainy": "Havas eső",
        sunny: "Napos",
        windy: "Szeles",
        "windy-variant": "Szeles",
        hourly: "Óránként",
        daily: "Naponta",
        now: "Most",
        today: "Ma",
        humidity: "Páratartalom",
        pressure: "Légnyomás",
        wind: "Szél",
        not_found: "Időjárás entitás nem található",
      },
    };
  }

  _lang() {
    const supported = ["en", "de", "hu"];
    // Explicit config option wins
    if (this._config?.language && supported.includes(this._config.language)) {
      return this._config.language;
    }
    // Then HA's UI language. hass.locale.language is like "en", "de-CH", "hu".
    const ha = this._hass?.locale?.language || this._hass?.language || "";
    const base = ha.toLowerCase().split("-")[0];
    if (supported.includes(base)) return base;
    return "en";
  }

  _t(key) {
    const lang = this._lang();
    const t = YetAnotherWeatherCard.translations;
    return t[lang]?.[key] || t.en[key] || key;
  }

  _prettyCondition(c) {
    if (!c) return "";
    const translated = this._t(c);
    // If the key isn't in any translation table, _t returns the key itself —
    // fall back to a sentence-cased version of the raw condition.
    if (translated === c) {
      return c.replace(/[-_]/g, " ").replace(/^./, (ch) => ch.toUpperCase());
    }
    return translated;
  }

  // ── Animated icon factory ────────────────────────────────
  //
  // CRITICAL: Everything between <svg>...</svg> must be tagged with svg`...`
  // (not html`...`). When lit-html sees <circle>, <rect>, <g>, etc. via the
  // html tag, it parses them in HTML namespace where they have zero meaning
  // and render as empty inline elements. svg`...` parses them in the SVG
  // namespace so they actually render as shapes.
  _icon(condition, size = 88, isDay = true) {
    const c = (condition || "").toLowerCase();

    const sun = (cx = 50, cy = 38, r = 13, ray = 8) => svg`
      <g transform="translate(${cx} ${cy})">
        <g class="sun-rays" fill="#EF9F27">
          <rect x="-1.5" y="${-r - ray - 4}" width="3" height="${ray}" rx="1.5"/>
          <rect x="-1.5" y="${r + 4}" width="3" height="${ray}" rx="1.5"/>
          <rect x="${-r - ray - 4}" y="-1.5" width="${ray}" height="3" rx="1.5"/>
          <rect x="${r + 4}" y="-1.5" width="${ray}" height="3" rx="1.5"/>
          <g transform="rotate(45)">
            <rect x="-1.5" y="${-r - ray - 4}" width="3" height="${ray}" rx="1.5"/>
            <rect x="-1.5" y="${r + 4}" width="3" height="${ray}" rx="1.5"/>
            <rect x="${-r - ray - 4}" y="-1.5" width="${ray}" height="3" rx="1.5"/>
            <rect x="${r + 4}" y="-1.5" width="${ray}" height="3" rx="1.5"/>
          </g>
        </g>
        <circle r="${r}" fill="#EF9F27"/>
      </g>`;

    const moon = (cx = 50, cy = 40, r = 16) => svg`
      <g transform="translate(${cx} ${cy})">
        <circle r="${r}" fill="#D3D1C7"/>
        <circle cx="${r * 0.4}" cy="${-r * 0.2}" r="${r}"
                fill="var(--card-background-color, var(--ha-card-background, #1c1c1e))"/>
      </g>`;

    const cloud = (cx, cy, scale = 1, color = "#888780", cls = "cloud") => svg`
      <g class="${cls}" transform="translate(${cx} ${cy}) scale(${scale})">
        <ellipse cx="20" cy="8" rx="22" ry="11" fill="${color}"/>
        <circle cx="10" cy="4" r="9" fill="${color}"/>
        <circle cx="28" cy="2" r="11" fill="${color}"/>
      </g>`;

    const drops = (x, y, n = 3, color = "#378ADD") =>
      Array.from({ length: n }).map(
        (_, i) => svg`
          <line class="raindrop" style="animation-delay:${i * 0.3}s"
                x1="${x + i * 7}" y1="${y}" x2="${x + i * 7}" y2="${y + 5}"
                stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>`
      );

    const flakes = (x, y, n = 3) =>
      Array.from({ length: n }).map(
        (_, i) => svg`
          <circle class="snowflake" style="animation-delay:${i * 0.4}s"
                  cx="${x + i * 7}" cy="${y}" r="1.6" fill="#85B7EB"/>`
      );

    let body;
    if (c === "sunny" || c === "clear") body = sun();
    else if (c === "clear-night") body = moon();
    else if (c === "partlycloudy" || c === "partly-cloudy")
      body = svg`${isDay ? sun(38, 30, 11, 6) : moon(38, 32, 13)}
                 ${cloud(36, 50, 0.9)}`;
    else if (c === "cloudy")
      body = svg`${cloud(20, 38, 1.1, "#B4B2A9", "cloud")}
                 ${cloud(35, 56, 0.9, "#888780", "cloud2")}`;
    else if (c === "fog")
      body = svg`
        <g class="fog">
          <rect x="18" y="38" width="64" height="3" rx="1.5" fill="#B4B2A9"/>
          <rect x="22" y="50" width="56" height="3" rx="1.5" fill="#888780"/>
          <rect x="14" y="62" width="64" height="3" rx="1.5" fill="#B4B2A9"/>
          <rect x="20" y="74" width="60" height="3" rx="1.5" fill="#888780"/>
        </g>`;
    else if (c === "rainy" || c === "pouring")
      body = svg`${cloud(20, 28, 1.2, "#5F5E5A")}
                 ${drops(28, 62, c === "pouring" ? 5 : 3)}`;
    else if (c === "snowy" || c === "snowy-rainy")
      body = svg`${cloud(20, 28, 1.2, "#B4B2A9")}
                 ${c === "snowy-rainy" ? drops(28, 62, 2) : ""}
                 ${flakes(c === "snowy-rainy" ? 50 : 28, 64, 3)}`;
    else if (c === "lightning" || c === "lightning-rainy")
      body = svg`${cloud(20, 28, 1.2, "#5F5E5A")}
                 <path class="bolt" d="M48 56 L42 72 L50 72 L46 86 L60 66 L52 66 L56 56 Z"
                       fill="#EF9F27"/>
                 ${c === "lightning-rainy" ? drops(28, 78, 3) : ""}`;
    else if (c === "windy" || c === "windy-variant")
      body = svg`
        <g class="wind">
          <path d="M20 35 Q40 30 60 35 Q70 37 65 42 Q60 45 55 42"
                fill="none" stroke="#888780" stroke-width="3" stroke-linecap="round"/>
          <path d="M15 55 Q45 50 75 55 Q85 57 80 62 Q75 65 70 62"
                fill="none" stroke="#B4B2A9" stroke-width="3" stroke-linecap="round"/>
          <path d="M20 75 Q40 70 60 75" fill="none" stroke="#888780"
                stroke-width="3" stroke-linecap="round"/>
        </g>`;
    else if (c === "hail")
      body = svg`${cloud(20, 28, 1.2, "#5F5E5A")}
                 <circle class="hailstone" cx="32" cy="66" r="2.5" fill="#85B7EB"/>
                 <circle class="hailstone" style="animation-delay:.3s" cx="42" cy="66" r="2.5" fill="#85B7EB"/>
                 <circle class="hailstone" style="animation-delay:.6s" cx="52" cy="66" r="2.5" fill="#85B7EB"/>`;
    else if (c === "exceptional")
      body = svg`${cloud(20, 28, 1.2, "#993C1D")}
                 <text x="50" y="80" text-anchor="middle" font-size="22"
                       font-weight="700" fill="#993C1D">!</text>`;
    else body = cloud(28, 40, 1.1, "#B4B2A9");

    // The outer <svg> tag itself is in HTML context (it's a child of a div),
    // so it's wrapped with html`...`. Its inner content (`body`) is already
    // an svg template result, which lit-html composes correctly.
    return html`
      <svg width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true">
        ${body}
      </svg>`;
  }

  // ── Forecast graph ───────────────────────────────────────
  //
  // Filled-area chart between the high and low temperature series.
  // When low is unavailable for any item, falls back to a single line on
  // high only (no area band). Time/day labels sit along the bottom; the
  // high value labels float above each data point, lows sit below.
  //
  // Width is fluid (viewBox-based, preserveAspectRatio="none" on the area
  // path so the curve stretches; the labels and points are in absolute SVG
  // coords for crisp rendering).
  _renderGraph(items) {
    if (!items || items.length < 2) return "";

    // viewBox dimensions. Because the SVG renders at width:100% of the card
    // (~430-460px typical) but the viewBox is what defines the internal
    // coordinate space, picking a viewBox width close to the actual rendered
    // width keeps font-size units displaying at roughly true pixel size.
    // With W=400, fonts will display at ~95-115% of their nominal size.
    const W = 400;
    const H = 150;          // total height including label space
    const padX = 16;        // left/right padding
    const padTop = 32;      // headroom for hi labels
    const padBot = 48;      // space for time labels + lo labels
    const plotW = W - 2 * padX;
    const plotH = H - padTop - padBot;

    const n = items.length;
    const highs = items.map((f) => f.temperature);
    const lows = items.map((f) =>
      f.templow != null ? f.templow : null
    );
    const hasLows = lows.some((v) => v != null);

    // Y-axis range: pad by 2° on each side so labels don't clip
    const allVals = highs.concat(hasLows ? lows.filter((v) => v != null) : []);
    let yMin = Math.min(...allVals) - 2;
    let yMax = Math.max(...allVals) + 2;
    if (yMax - yMin < 4) {
      // Avoid a flat line when all values are nearly equal
      const mid = (yMax + yMin) / 2;
      yMin = mid - 2;
      yMax = mid + 2;
    }

    const xOf = (i) =>
      n === 1 ? padX + plotW / 2 : padX + (i / (n - 1)) * plotW;
    const yOf = (v) =>
      padTop + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

    // Catmull-Rom → cubic Bezier for a smooth curve through the points.
    const smoothPath = (points) => {
      if (points.length < 2) return "";
      let d = `M ${points[0][0]} ${points[0][1]}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i - 1] || points[i];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] || p2;
        const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
        const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
        const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
        const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`;
      }
      return d;
    };

    const hiPts = highs.map((v, i) => [xOf(i), yOf(v)]);
    const hiPath = smoothPath(hiPts);

    // Build area path: when lows are partially missing, treat null as
    // equal to the matching high to keep the band continuous but degenerate
    // at that point — visually this just pinches the band.
    let areaPath = "";
    if (hasLows) {
      const loPts = lows.map((v, i) =>
        v != null ? [xOf(i), yOf(v)] : [xOf(i), yOf(highs[i])]
      );
      // Stitch: high curve forward, then connect down to last lo point,
      // then reverse-walk the lo points back with the same smoothing.
      areaPath =
        hiPath +
        ` L ${loPts[loPts.length - 1][0]} ${loPts[loPts.length - 1][1]}`;
      const loRev = [...loPts].reverse();
      for (let i = 0; i < loRev.length - 1; i++) {
        const p0 = loRev[i - 1] || loRev[i];
        const p1 = loRev[i];
        const p2 = loRev[i + 1];
        const p3 = loRev[i + 2] || p2;
        const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
        const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
        const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
        const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
        areaPath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`;
      }
      areaPath += " Z";
    }

    const accent = "#EF9F27"; // amber — warm, matches sun icon
    const accentLow = "#378ADD"; // blue — cooler tone for low
    const labelEvery = n > 12 ? 2 : 1; // skip labels on dense hourly forecasts

    return html`
      <div class="graph-wrap">
        <svg
          class="graph"
          viewBox="0 0 ${W} ${H}"
          aria-hidden="true">
          ${hasLows
            ? svg`<path d="${areaPath}" fill="${accent}" fill-opacity="0.15" stroke="none"/>`
            : ""}
          <path d="${hiPath}"
                fill="none"
                stroke="${accent}"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"/>
          ${hasLows
            ? svg`
              <path d="${smoothPath(
                lows.map((v, i) =>
                  v != null ? [xOf(i), yOf(v)] : [xOf(i), yOf(highs[i])]
                )
              )}"
                fill="none"
                stroke="${accentLow}"
                stroke-width="1.5"
                stroke-dasharray="3 3"
                stroke-linecap="round"
                stroke-linejoin="round"/>`
            : ""}
          ${hiPts.map(
            (p, i) => svg`
              <circle cx="${p[0]}" cy="${p[1]}" r="3.5"
                      fill="var(--card-background-color, var(--ha-card-background, #fff))"
                      stroke="${accent}" stroke-width="2"/>`
          )}
          ${highs.map((v, i) =>
            i % labelEvery === 0
              ? svg`<text x="${xOf(i)}" y="${yOf(v) - 10}"
                          text-anchor="middle"
                          font-size="16" font-weight="500"
                          fill="var(--primary-text-color)">${this._fmt(v, 0)}°</text>`
              : ""
          )}
          ${hasLows
            ? lows.map((v, i) =>
                v != null && i % labelEvery === 0
                  ? svg`<text x="${xOf(i)}" y="${yOf(v) + 18}"
                              text-anchor="middle"
                              font-size="14"
                              fill="var(--secondary-text-color)">${this._fmt(v, 0)}°</text>`
                  : ""
              )
            : ""}
          ${items.map((f, i) =>
            i % labelEvery === 0
              ? svg`<text x="${xOf(i)}" y="${H - 8}"
                          text-anchor="middle"
                          font-size="13"
                          fill="var(--secondary-text-color)">${
                            this._mode === "hourly"
                              ? i === 0 ? this._t("now") : this._formatTime(f.datetime)
                              : this._formatDay(f.datetime)
                          }</text>`
              : ""
          )}
        </svg>
      </div>
    `;
  }

  // ── Render ───────────────────────────────────────────────
  render() {
    if (!this._hass || !this._config) return html``;

    // ── Normalise data per mode so the template below works for both ──
    let condition, friendly, tempData, humidityData, pressureData, windSpeed, windUnit, fcHourly, fcDaily;

    if (this._locationMode()) {
      // Location-based mode: data comes from Open-Meteo
      const loc = this._resolveLocation();
      if (!loc) {
        return html`<ha-card>
          <div class="error">
            Location entity not found or has no coordinates
          </div>
        </ha-card>`;
      }
      if (!this._omCurrent) {
        return html`<ha-card>
          <div class="loading">Loading weather data…</div>
        </ha-card>`;
      }
      const om = this._omCurrent;
      condition = om.condition;
      friendly =
        this._config.name ||
        (this._config.location_entity
          ? this._hass.states[this._config.location_entity]?.attributes
              .friendly_name
          : null) ||
        "Weather";
      // Custom sensors can still override Open-Meteo values
      tempData =
        this._resolveValue(this._config.temperature_entity, null, "°C") ||
        { value: om.temperature, unit: om.temperature_unit };
      humidityData =
        this._resolveValue(this._config.humidity_entity, null, "%") ||
        { value: om.humidity, unit: "%" };
      pressureData =
        this._resolveValue(this._config.pressure_entity, null, "hPa") ||
        { value: om.pressure, unit: om.pressure_unit };
      windSpeed = om.wind_speed;
      windUnit = om.wind_speed_unit;
      fcHourly = this._omHourly;
      fcDaily = this._omDaily;
    } else {
      // Entity-based mode (existing behaviour)
      const w = this._hass.states[this._config.entity];
      if (!w) {
        return html`<ha-card>
          <div class="error">Weather entity '${this._config.entity}' not found</div>
        </ha-card>`;
      }
      condition = w.state;
      friendly =
        this._config.name || w.attributes.friendly_name || this._config.entity;
      tempData = this._resolveValue(
        this._config.temperature_entity,
        "temperature",
        "°C"
      );
      humidityData = this._resolveValue(
        this._config.humidity_entity,
        "humidity",
        "%"
      );
      pressureData = this._resolveValue(
        this._config.pressure_entity,
        "pressure",
        "hPa"
      );
      windSpeed = w.attributes.wind_speed;
      windUnit = w.attributes.wind_speed_unit || "km/h";
      fcHourly = this._forecastHourly;
      fcDaily = this._forecastDaily;
    }

    const tempUnit =
      tempData?.unit ||
      (this._config.entity
        ? this._hass.states[this._config.entity]?.attributes.temperature_unit
        : null) ||
      "°C";
    const fc = this._mode === "hourly" ? fcHourly : fcDaily;
    const fcItems = (fc || []).slice(0, this._config.forecast_items);
    const hasHourly = fcHourly && fcHourly.length > 0;
    const hasDaily = fcDaily && fcDaily.length > 0;

    return html`
      <ha-card>
        <div class="card">
          ${this._config.show_current
            ? html`
                <div class="top">
                  <div class="left">
                    <div class="loc">${friendly}</div>
                    <div class="temp">
                      ${this._fmt(tempData?.value, 1)}<span class="unit">${tempUnit}</span>
                    </div>
                    <div class="cond">${this._prettyCondition(condition)}</div>
                  </div>
                  <div class="icon-wrap">${this._icon(condition, 132, this._isDay())}</div>
                </div>`
            : ""}

          ${this._config.show_stats && (humidityData || pressureData || windSpeed != null)
            ? html`
                <div class="stats">
                  ${humidityData
                    ? html`<div class="stat">
                        <div class="stat-label">${this._t("humidity")}</div>
                        <div class="stat-val">${this._fmt(humidityData.value, 0)}${humidityData.unit || "%"}</div>
                      </div>`
                    : ""}
                  ${pressureData
                    ? html`<div class="stat">
                        <div class="stat-label">${this._t("pressure")}</div>
                        <div class="stat-val">${this._fmt(pressureData.value, 0)} ${pressureData.unit || "hPa"}</div>
                      </div>`
                    : ""}
                  ${windSpeed != null
                    ? html`<div class="stat">
                        <div class="stat-label">${this._t("wind")}</div>
                        <div class="stat-val">${this._fmt(windSpeed, 0)} ${windUnit}</div>
                      </div>`
                    : ""}
                </div>`
            : ""}

          ${this._config.show_forecast && (hasHourly || hasDaily)
            ? html`
                ${hasHourly && hasDaily
                  ? html`
                      <div class="toggle">
                        <div class="tab ${this._mode === "hourly" ? "active" : ""}"
                             @click=${() => { this._mode = "hourly"; this.requestUpdate(); }}>
                          ${this._t("hourly")}
                        </div>
                        <div class="tab ${this._mode === "daily" ? "active" : ""}"
                             @click=${() => { this._mode = "daily"; this.requestUpdate(); }}>
                          ${this._t("daily")}
                        </div>
                      </div>`
                  : ""}
                ${this._config.forecast_style === "graph" ||
                this._config.forecast_style === "both"
                  ? this._renderGraph(fcItems)
                  : ""}
                ${this._config.forecast_style === "strip" ||
                this._config.forecast_style === "both" ||
                !this._config.forecast_style
                  ? html`
                      <div class="forecast">
                        ${fcItems.map((f, i) => html`
                          <div class="fc-item">
                            <div class="fc-label">
                              ${this._mode === "hourly"
                                ? i === 0 ? this._t("now") : this._formatTime(f.datetime)
                                : this._formatDay(f.datetime)}
                            </div>
                            <div class="fc-icon">${this._icon(f.condition, 54, this._isDay(f.datetime))}</div>
                            <div class="fc-hi">${this._fmt(f.temperature, 0)}°</div>
                            ${this._mode === "daily" && f.templow != null
                              ? html`<div class="fc-lo">${this._fmt(f.templow, 0)}°</div>`
                              : ""}
                            ${f.precipitation_probability != null && f.precipitation_probability > 0
                              ? html`<div class="fc-pop">${this._fmt(f.precipitation_probability, 0)}%</div>`
                              : ""}
                          </div>`)}
                      </div>`
                  : ""}`
            : ""}
        </div>
      </ha-card>`;
  }

  static get styles() {
    return css`
      :host { display: block; }
      ha-card { overflow: hidden; }
      .card { padding: 20px 22px; }
      .error { padding: 20px; color: var(--error-color, #db4437); }
      .loading { padding: 20px; color: var(--secondary-text-color); }

      .top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 16px;
        gap: 12px;
      }
      .loc { font-size: 13px; color: var(--secondary-text-color); margin-bottom: 4px; }
      .temp {
        font-size: 54px;
        font-weight: 500;
        letter-spacing: -2px;
        line-height: 1;
        color: var(--primary-text-color);
      }
      .temp .unit {
        font-size: 22px;
        color: var(--secondary-text-color);
        font-weight: 400;
        vertical-align: super;
        margin-left: 2px;
      }
      .cond {
        font-size: 14px;
        color: var(--primary-text-color);
        font-weight: 500;
        margin-top: 8px;
      }
      .icon-wrap { flex-shrink: 0; }

      .stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
        gap: 8px;
        padding: 12px 0;
        margin-bottom: 14px;
        border-top: 1px solid var(--divider-color);
        border-bottom: 1px solid var(--divider-color);
      }
      .stat { text-align: center; }
      .stat-label {
        font-size: 10px;
        color: var(--secondary-text-color);
        margin-bottom: 2px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .stat-val { font-size: 15px; font-weight: 500; color: var(--primary-text-color); }

      .toggle {
        display: flex;
        background: var(--secondary-background-color);
        border-radius: 8px;
        padding: 3px;
        margin-bottom: 12px;
        gap: 2px;
      }
      .tab {
        flex: 1;
        text-align: center;
        font-size: 12px;
        padding: 6px;
        border-radius: 6px;
        cursor: pointer;
        color: var(--secondary-text-color);
        transition: background 0.2s, color 0.2s;
        user-select: none;
      }
      .tab.active {
        background: var(--card-background-color, var(--ha-card-background));
        color: var(--primary-text-color);
        font-weight: 500;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
      }

      .graph-wrap {
        margin: 4px 0 12px;
        width: 100%;
      }
      .graph {
        display: block;
        width: 100%;
        height: auto;
        overflow: visible;
      }

      .forecast {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
        gap: 4px;
      }
      .fc-item {
        text-align: center;
        padding: 8px 2px;
        border-radius: 8px;
        transition: background 0.15s;
      }
      .fc-item:hover { background: var(--secondary-background-color); }
      .fc-label { font-size: 11px; color: var(--secondary-text-color); margin-bottom: 4px; }
      .fc-icon { display: flex; justify-content: center; margin-bottom: 2px; }
      .fc-hi { font-size: 13px; font-weight: 500; color: var(--primary-text-color); }
      .fc-lo { font-size: 11px; color: var(--secondary-text-color); }
      .fc-pop { font-size: 10px; color: var(--info-color, #378add); margin-top: 2px; }

      /* ── Animations ── */
      @keyframes spin     { from { transform: rotate(0); } to { transform: rotate(360deg); } }
      @keyframes drift    { 0%,100% { transform: translateX(0); } 50% { transform: translateX(3px); } }
      @keyframes drift2   { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-3px); } }
      @keyframes drop     { 0% { transform: translateY(-3px); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateY(10px); opacity: 0; } }
      @keyframes fall     { 0% { transform: translateY(-3px) rotate(0); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateY(14px) rotate(180deg); opacity: 0; } }
      @keyframes flicker  { 0%,60%,100% { opacity: 1; } 65%,75% { opacity: 0.2; } }
      @keyframes sway     { 0%,100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
      @keyframes fogShift { 0%,100% { transform: translateX(0); } 50% { transform: translateX(2px); } }
      @keyframes hailFall { 0% { transform: translateY(-2px); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateY(10px); opacity: 0; } }

      .sun-rays  { transform-origin: center; animation: spin 20s linear infinite; }
      .cloud     { animation: drift 4s ease-in-out infinite; transform-origin: center; }
      .cloud2    { animation: drift2 5s ease-in-out infinite; transform-origin: center; }
      .raindrop  { animation: drop 1.2s ease-in infinite; }
      .snowflake { animation: fall 2.5s ease-in infinite; transform-origin: center; }
      .bolt      { animation: flicker 2s ease-in-out infinite; }
      .wind      { animation: sway 3s ease-in-out infinite; transform-origin: center; }
      .fog       { animation: fogShift 4s ease-in-out infinite; }
      .hailstone { animation: hailFall 1s ease-in infinite; }

      @media (prefers-reduced-motion: reduce) {
        .sun-rays, .cloud, .cloud2, .raindrop, .snowflake,
        .bolt, .wind, .fog, .hailstone { animation: none; }
      }
      :host([disable-animations]) .sun-rays,
      :host([disable-animations]) .cloud,
      :host([disable-animations]) .cloud2,
      :host([disable-animations]) .raindrop,
      :host([disable-animations]) .snowflake,
      :host([disable-animations]) .bolt,
      :host([disable-animations]) .wind,
      :host([disable-animations]) .fog,
      :host([disable-animations]) .hailstone { animation: none; }
    `;
  }

  static getConfigElement() {
    return document.createElement("yet-another-weather-card-editor");
  }

  static getStubConfig(hass) {
    const weatherEntity = hass
      ? Object.keys(hass.states).find((id) => id.startsWith("weather."))
      : null;
    return {
      entity: weatherEntity || "weather.home",
      default_mode: "hourly",
      show_current: true,
      show_forecast: true,
      show_stats: true,
      forecast_items: 7,
      forecast_style: "strip",
    };
  }

  getCardSize() {
    return 5;
  }
}

// ─────────────────────────────────────────────────────────
//  Visual Editor
// ─────────────────────────────────────────────────────────
class YetAnotherWeatherCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
    };
  }

  setConfig(config) {
    this._config = config;
  }

  // Schema drives the form. ha-form renders the correct widget per selector:
  //   - entity selector with domain filters
  //   - boolean → toggle
  //   - number → slider/input
  //   - select → dropdown
  _schema() {
    return [
      {
        name: "entity",
        selector: { entity: { domain: "weather" } },
      },
      {
        name: "location_entity",
        selector: {
          entity: { domain: ["device_tracker", "person"] },
        },
      },
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "latitude",
            selector: { number: { min: -90, max: 90, step: 0.0001, mode: "box" } },
          },
          {
            name: "longitude",
            selector: { number: { min: -180, max: 180, step: 0.0001, mode: "box" } },
          },
        ],
      },
      {
        name: "name",
        selector: { text: {} },
      },
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "default_mode",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "hourly", label: "Hourly" },
                  { value: "daily", label: "Daily" },
                ],
              },
            },
          },
          {
            name: "forecast_items",
            selector: {
              number: { min: 1, max: 24, step: 1, mode: "box" },
            },
          },
          {
            name: "language",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "", label: "Auto (Home Assistant)" },
                  { value: "en", label: "English" },
                  { value: "de", label: "Deutsch" },
                  { value: "hu", label: "Magyar" },
                ],
              },
            },
          },
          {
            name: "forecast_style",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "strip", label: "Strip" },
                  { value: "graph", label: "Graph" },
                  { value: "both", label: "Both" },
                ],
              },
            },
          },
        ],
      },
      {
        name: "temperature_entity",
        selector: {
          entity: { domain: ["sensor", "input_number", "number"] },
        },
      },
      {
        name: "humidity_entity",
        selector: {
          entity: { domain: ["sensor", "input_number", "number"] },
        },
      },
      {
        name: "pressure_entity",
        selector: {
          entity: { domain: ["sensor", "input_number", "number"] },
        },
      },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "show_current", selector: { boolean: {} } },
          { name: "show_stats", selector: { boolean: {} } },
          { name: "show_forecast", selector: { boolean: {} } },
          { name: "disable_animations", selector: { boolean: {} } },
        ],
      },
    ];
  }

  // Pretty labels & helper text for ha-form. Falls back to the field name if omitted.
  _computeLabel = (schema) => {
    const labels = {
      entity: "Weather entity",
      location_entity: "Location entity (device tracker / person)",
      latitude: "Latitude",
      longitude: "Longitude",
      name: "Display name",
      default_mode: "Default forecast view",
      forecast_items: "Forecast items",
      language: "Language",
      forecast_style: "Forecast display",
      temperature_entity: "Temperature sensor (optional)",
      humidity_entity: "Humidity sensor (optional)",
      pressure_entity: "Pressure sensor (optional)",
      show_current: "Show current",
      show_stats: "Show stats",
      show_forecast: "Show forecast",
      disable_animations: "Disable animations",
    };
    return labels[schema.name] ?? schema.name;
  };

  _computeHelper = (schema) => {
    const helpers = {
      entity: "Required unless location entities are configured. Weather data source for entity mode.",
      location_entity: "Uses this entity's latitude/longitude to fetch weather from Open-Meteo. Replaces the weather entity as data source.",
      latitude: "Fixed latitude coordinate (used together with longitude)",
      longitude: "Fixed longitude coordinate (used together with latitude)",
      disable_animations: "Show icons without motion (respects prefers-reduced-motion too)",
      temperature_entity: "Overrides the weather entity's temperature",
      humidity_entity: "Overrides the weather entity's humidity",
      pressure_entity: "Overrides the weather entity's pressure",
      forecast_items: "Number of forecast cells (1–24)",
      language: "Leave Auto to follow your Home Assistant language",
      forecast_style: "Strip = cells with icons, Graph = filled area chart, Both = chart above cells",
    };
    return helpers[schema.name];
  };

  _valueChanged(ev) {
    if (!this._config) return;
    const newConfig = { ...ev.detail.value };

    // Strip empty-string optional fields so YAML stays clean
    for (const key of [
      "name",
      "temperature_entity",
      "humidity_entity",
      "pressure_entity",
      "language",
      "location_entity",
      "latitude",
      "longitude",
    ]) {
      if (newConfig[key] === "" || newConfig[key] == null) {
        delete newConfig[key];
      }
    }

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    if (!this.hass || !this._config) return html``;

    // Provide sensible defaults to ha-form so toggles show correct state
    const data = {
      default_mode: "hourly",
      forecast_items: 7,
      forecast_style: "strip",
      show_current: true,
      show_stats: true,
      show_forecast: true,
      disable_animations: false,
      ...this._config,
    };

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${this._schema()}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      ha-form {
        display: block;
      }
    `;
  }
}

customElements.define(
  "yet-another-weather-card-editor",
  YetAnotherWeatherCardEditor
);

customElements.define("yet-another-weather-card", YetAnotherWeatherCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "yet-another-weather-card",
  name: "Yet Another Weather Card",
  description: "Beautiful weather card with animated icons, forecast toggle, and custom sensor support",
  preview: true,
});

console.info(
  "%c YET-ANOTHER-WEATHER-CARD %c v1.6.0 ",
  "color: white; background: #185FA5; font-weight: 700; padding: 2px 6px; border-radius: 3px 0 0 3px;",
  "color: #185FA5; background: white; font-weight: 700; padding: 2px 6px; border: 1px solid #185FA5; border-radius: 0 3px 3px 0;"
);
