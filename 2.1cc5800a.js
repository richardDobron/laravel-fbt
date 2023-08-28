/*! For license information please see 2.1cc5800a.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{102:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return r}));const n="default";function r(e,t){return`docs-${e}-${t}`}},103:function(e,t,a){var n;!function(){"use strict";var a={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var c=typeof n;if("string"===c||"number"===c)e.push(n);else if(Array.isArray(n)&&n.length){var o=r.apply(null,n);o&&e.push(o)}else if("object"===c)for(var l in n)a.call(n,l)&&n[l]&&e.push(l)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(t,[]))||(e.exports=n)}()},104:function(e,t,a){"use strict";var n=a(0),r=a(114);t.a=function(){const e=Object(n.useContext)(r.a);if(null==e)throw new Error("`useThemeContext` is used outside of `Layout` Component. See https://v2.docusaurus.io/docs/theme-classic#usethemecontext.");return e}},110:function(e,t,a){"use strict";var n=a(0),r=a(111);t.a=function(){const e=Object(n.useContext)(r.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},111:function(e,t,a){"use strict";var n=a(0);const r=Object(n.createContext)(void 0);t.a=r},112:function(e,t,a){"use strict";var n=a(94),r=a(10),c=a(88);t.a=function(){const e=Object(n.useHistory)(),t=Object(n.useLocation)(),{siteConfig:{baseUrl:a}={}}=Object(c.a)();return{searchValue:r.a.canUseDOM&&new URLSearchParams(t.search).get("q")||"",updateSearchPath:a=>{const n=new URLSearchParams(t.search);a?n.set("q",a):n.delete("q"),e.replace({search:n.toString()})},generateSearchPageLink:e=>`${a}search?q=${encodeURIComponent(e)}`}}},113:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a(0),r=a.n(n);function c(){return r.a.createElement("svg",{width:"20",height:"20",className:"DocSearch-Search-Icon",viewBox:"0 0 20 20"},r.a.createElement("path",{d:"M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z",stroke:"currentColor",fill:"none",fillRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round"}))}},114:function(e,t,a){"use strict";var n=a(0);const r=a.n(n).a.createContext(void 0);t.a=r},115:function(e,t,a){"use strict";var n=a(0),r=a(10);const c=()=>({scrollX:r.a.canUseDOM?window.pageXOffset:0,scrollY:r.a.canUseDOM?window.pageYOffset:0});t.a=(e,t=[])=>{const[a,r]=Object(n.useState)(c()),o=()=>{const t=c();r(t),e&&e(t)};return Object(n.useEffect)((()=>(window.addEventListener("scroll",o),()=>window.removeEventListener("scroll",o,{passive:!0}))),t),a}},116:function(e,t,a){"use strict";var n=a(0);t.a=function(e=!0){Object(n.useEffect)((()=>(document.body.style.overflow=e?"hidden":"visible",()=>{document.body.style.overflow="visible"})),[e])}},117:function(e,t,a){"use strict";a.d(t,"b",(function(){return r}));var n=a(0);const r={desktop:"desktop",mobile:"mobile"};t.a=function(){const e="undefined"!=typeof window;function t(){if(e)return window.innerWidth>996?r.desktop:r.mobile}const[a,c]=Object(n.useState)(t);return Object(n.useEffect)((()=>{if(e)return window.addEventListener("resize",a),()=>window.removeEventListener("resize",a);function a(){c(t())}}),[]),a}},118:function(e,t,a){"use strict";var n=a(104),r=a(92),c=a(98),o=a(90);t.a=()=>{const{navbar:{logo:e}}=Object(o.a)(),{isDarkTheme:t}=Object(n.a)(),a=Object(r.a)(e.href||"/");let l={};e.target?l={target:e.target}:Object(c.a)(a)||(l={rel:"noopener noreferrer",target:"_blank"});const s=e.srcDark&&t?e.srcDark:e.src;return{logoLink:a,logoLinkProps:l,logoImageUrl:Object(r.a)(s),logoAlt:e.alt}}},119:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));const n=(e,t)=>{const a=e=>e.endsWith("/")?e:e+"/";return a(e)===a(t)}},136:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},r=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),c=a(0),o=m(c),l=m(a(103)),s=m(a(7)),i=m(a(137)),u=m(a(138)),d=a(139);function m(e){return e&&e.__esModule?e:{default:e}}var h=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.handleClick=a.handleClick.bind(a),a.handleTouchStart=a.handleTouchStart.bind(a),a.handleTouchMove=a.handleTouchMove.bind(a),a.handleTouchEnd=a.handleTouchEnd.bind(a),a.handleFocus=a.handleFocus.bind(a),a.handleBlur=a.handleBlur.bind(a),a.previouslyChecked=!(!e.checked&&!e.defaultChecked),a.state={checked:!(!e.checked&&!e.defaultChecked),hasFocus:!1},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidUpdate",value:function(e){e.checked!==this.props.checked&&this.setState({checked:!!this.props.checked})}},{key:"handleClick",value:function(e){var t=this.input;if(e.target!==t&&!this.moved)return this.previouslyChecked=t.checked,e.preventDefault(),t.focus(),void t.click();var a=this.props.hasOwnProperty("checked")?this.props.checked:t.checked;this.setState({checked:a})}},{key:"handleTouchStart",value:function(e){this.startX=(0,d.pointerCoord)(e).x,this.activated=!0}},{key:"handleTouchMove",value:function(e){if(this.activated&&(this.moved=!0,this.startX)){var t=(0,d.pointerCoord)(e).x;this.state.checked&&t+15<this.startX?(this.setState({checked:!1}),this.startX=t,this.activated=!0):t-15>this.startX&&(this.setState({checked:!0}),this.startX=t,this.activated=t<this.startX+5)}}},{key:"handleTouchEnd",value:function(e){if(this.moved){var t=this.input;if(e.preventDefault(),this.startX){var a=(0,d.pointerCoord)(e).x;!0===this.previouslyChecked&&this.startX+4>a?this.previouslyChecked!==this.state.checked&&(this.setState({checked:!1}),this.previouslyChecked=this.state.checked,t.click()):this.startX-4<a&&this.previouslyChecked!==this.state.checked&&(this.setState({checked:!0}),this.previouslyChecked=this.state.checked,t.click()),this.activated=!1,this.startX=null,this.moved=!1}}}},{key:"handleFocus",value:function(e){var t=this.props.onFocus;t&&t(e),this.setState({hasFocus:!0})}},{key:"handleBlur",value:function(e){var t=this.props.onBlur;t&&t(e),this.setState({hasFocus:!1})}},{key:"getIcon",value:function(e){var a=this.props.icons;return a?void 0===a[e]?t.defaultProps.icons[e]:a[e]:null}},{key:"render",value:function(){var e=this,t=this.props,a=t.className,r=(t.icons,function(e,t){var a={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);return a}(t,["className","icons"])),c=(0,l.default)("react-toggle",{"react-toggle--checked":this.state.checked,"react-toggle--focus":this.state.hasFocus,"react-toggle--disabled":this.props.disabled},a);return o.default.createElement("div",{className:c,onClick:this.handleClick,onTouchStart:this.handleTouchStart,onTouchMove:this.handleTouchMove,onTouchEnd:this.handleTouchEnd},o.default.createElement("div",{className:"react-toggle-track"},o.default.createElement("div",{className:"react-toggle-track-check"},this.getIcon("checked")),o.default.createElement("div",{className:"react-toggle-track-x"},this.getIcon("unchecked"))),o.default.createElement("div",{className:"react-toggle-thumb"}),o.default.createElement("input",n({},r,{ref:function(t){e.input=t},onFocus:this.handleFocus,onBlur:this.handleBlur,className:"react-toggle-screenreader-only",type:"checkbox"})))}}]),t}(c.PureComponent);t.default=h,h.displayName="Toggle",h.defaultProps={icons:{checked:o.default.createElement(i.default,null),unchecked:o.default.createElement(u.default,null)}},h.propTypes={checked:s.default.bool,disabled:s.default.bool,defaultChecked:s.default.bool,onChange:s.default.func,onFocus:s.default.func,onBlur:s.default.func,className:s.default.string,name:s.default.string,value:s.default.string,id:s.default.string,"aria-labelledby":s.default.string,"aria-label":s.default.string,icons:s.default.oneOfType([s.default.bool,s.default.shape({checked:s.default.node,unchecked:s.default.node})])}},137:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,r=a(0),c=(n=r)&&n.__esModule?n:{default:n};t.default=function(){return c.default.createElement("svg",{width:"14",height:"11",viewBox:"0 0 14 11"},c.default.createElement("title",null,"switch-check"),c.default.createElement("path",{d:"M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",fill:"#fff",fillRule:"evenodd"}))}},138:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,r=a(0),c=(n=r)&&n.__esModule?n:{default:n};t.default=function(){return c.default.createElement("svg",{width:"10",height:"10",viewBox:"0 0 10 10"},c.default.createElement("title",null,"switch-x"),c.default.createElement("path",{d:"M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",fill:"#fff",fillRule:"evenodd"}))}},139:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.pointerCoord=function(e){if(e){var t=e.changedTouches;if(t&&t.length>0){var a=t[0];return{x:a.clientX,y:a.clientY}}var n=e.pageX;if(void 0!==n)return{x:n,y:e.pageY}}return{x:0,y:0}}},140:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return i}));var n=a(1),r=a(0),c=a.n(r),o=a(99),l=a(93),s=a(97);function i({label:e,to:t,docsPluginId:a,...r}){var i;const u=Object(l.useActiveVersion)(a),{preferredVersion:d}=Object(s.a)(a),m=Object(l.useLatestVersion)(a),h=null!==(i=null!=u?u:d)&&void 0!==i?i:m,f=null!=e?e:h.label,b=null!=t?t:(e=>e.docs.find((t=>t.id===e.mainDocId)))(h).path;return c.a.createElement(o.a,Object(n.a)({},r,{label:f,to:b}))}},141:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return u}));var n=a(1),r=a(0),c=a.n(r),o=a(99),l=a(93),s=a(97);const i=e=>e.docs.find((t=>t.id===e.mainDocId));function u({mobile:e,docsPluginId:t,dropdownActiveClassDisabled:a,dropdownItemsBefore:r,dropdownItemsAfter:u,...d}){var m,h;const f=Object(l.useActiveDocContext)(t),b=Object(l.useVersions)(t),v=Object(l.useLatestVersion)(t),{preferredVersion:p,savePreferredVersionName:g}=Object(s.a)(t);const E=null!==(m=null!==(h=f.activeVersion)&&void 0!==h?h:p)&&void 0!==m?m:v,k=e?"Versions":E.label,O=e?void 0:i(E).path;return c.a.createElement(o.a,Object(n.a)({},d,{mobile:e,label:k,to:O,items:function(){const e=b.map((e=>{const t=(null==f?void 0:f.alternateDocVersions[e.name])||i(e);return{isNavLink:!0,label:e.label,to:t.path,isActive:()=>e===(null==f?void 0:f.activeVersion),onClick:()=>{g(e.name)}}})),t=[...r,...e,...u];if(!(t.length<=1))return t}(),isActive:a?()=>!1:void 0}))}},142:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return u}));var n=a(1),r=a(0),c=a.n(r),o=a(99),l=a(93),s=a(89),i=a(97);function u({docId:e,activeSidebarClassName:t,label:a,docsPluginId:r,...u}){var d;const{activeVersion:m,activeDoc:h}=Object(l.useActiveDocContext)(r),{preferredVersion:f}=Object(i.a)(r),b=Object(l.useLatestVersion)(r),v=null!==(d=null!=m?m:f)&&void 0!==d?d:b,p=v.docs.find((t=>t.id===e));if(!p)throw new Error(`DocNavbarItem: couldn't find any doc with id=${e} in version ${v.name}.\nAvailable docIds=\n- ${v.docs.join("\n- ")}`);return c.a.createElement(o.a,Object(n.a)({exact:!0},u,{className:Object(s.a)(u.className,{[t]:h&&h.sidebar===p.sidebar}),label:null!=a?a:p.id,to:p.path}))}},96:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(89),o=a(90),l=a(110),s=a(50),i=a.n(s);var u=function(){const{isAnnouncementBarClosed:e,closeAnnouncementBar:t}=Object(l.a)(),{announcementBar:a}=Object(o.a)();if(!a)return null;const{content:n,backgroundColor:s,textColor:u,isCloseable:d}=a;return!n||d&&e?null:r.a.createElement("div",{className:i.a.announcementBar,style:{backgroundColor:s,color:u},role:"banner"},r.a.createElement("div",{className:Object(c.a)(i.a.announcementBarContent,{[i.a.announcementBarCloseable]:d}),dangerouslySetInnerHTML:{__html:n}}),d?r.a.createElement("button",{type:"button",className:i.a.announcementBarClose,onClick:t,"aria-label":"Close"},r.a.createElement("span",{"aria-hidden":"true"},"\xd7")):null)},d=a(1),m=a(91),h=a(88),f=a(22),b=a(94),v=a(92),p=a(95),g=a(112);function E(){return r.a.createElement("svg",{width:"15",height:"15",className:"DocSearch-Control-Key-Icon"},r.a.createElement("path",{d:"M4.505 4.496h2M5.505 5.496v5M8.216 4.496l.055 5.993M10 7.5c.333.333.5.667.5 1v2M12.326 4.5v5.996M8.384 4.496c1.674 0 2.116 0 2.116 1.5s-.442 1.5-2.116 1.5M3.205 9.303c-.09.448-.277 1.21-1.241 1.203C1 10.5.5 9.513.5 8V7c0-1.57.5-2.5 1.464-2.494.964.006 1.134.598 1.24 1.342M12.553 10.5h1.953",strokeWidth:"1.2",stroke:"currentColor",fill:"none",strokeLinecap:"square"}))}var k=a(113);function O(){return(O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function j(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var a=[],n=!0,r=!1,c=void 0;try{for(var o,l=e[Symbol.iterator]();!(n=(o=l.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(s){r=!0,c=s}finally{try{n||null==l.return||l.return()}finally{if(r)throw c}}return a}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return y(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return y(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var w="Ctrl";function C(){return"undefined"==typeof navigator?w:/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)}var _=r.a.forwardRef((function(e,t){var a=j(Object(n.useState)((function(){return C()?"\u2318":w})),2),c=a[0],o=a[1];return Object(n.useEffect)((function(){C()&&o("\u2318")}),[]),r.a.createElement("button",O({type:"button",className:"DocSearch DocSearch-Button","aria-label":"Search"},e,{ref:t}),r.a.createElement(k.a,null),r.a.createElement("span",{className:"DocSearch-Button-Placeholder"},"Search"),r.a.createElement("span",{className:"DocSearch-Button-Key"},c===w?r.a.createElement(E,null):c),r.a.createElement("span",{className:"DocSearch-Button-Key"},"K"))})),N=a(93),S=a(97),L=a(102);function T(){const{language:e,tags:t}=function(){const e=Object(N.useAllDocsData)(),t=Object(N.useActivePluginAndVersion)(),a=Object(S.b)();return{language:"en",tags:[L.a,...Object.keys(e).map((function(n){var r,c;const o=(null==t||null===(r=t.activePlugin)||void 0===r?void 0:r.pluginId)===n?t.activeVersion:void 0,l=a[n],s=e[n].versions.find((e=>e.isLast)),i=null!==(c=null!=o?o:l)&&void 0!==c?c:s;return Object(L.b)(n,i.name)}))]}}();return{facetFilters:["language:"+e,t.map((e=>"docusaurus_tag:"+e))]}}let I=null;function D({hit:e,children:t}){return r.a.createElement(m.a,{to:e.url},t)}function M({state:e,onClose:t}){const{generateSearchPageLink:a}=Object(g.a)();return r.a.createElement(m.a,{to:a(e.query),onClick:t},"See all ",e.context.nbHits," results")}function P({contextualSearch:e,...t}){const{siteMetadata:c}=Object(h.a)(),o=T(),l={...e?o:{},...t.searchParameters},{withBaseUrl:s}=Object(v.b)(),i=Object(b.useHistory)(),u=Object(n.useRef)(null),[m,g]=Object(n.useState)(!1),[E,k]=Object(n.useState)(null),O=Object(n.useCallback)((()=>I?Promise.resolve():Promise.all([a.e(27).then(a.bind(null,166)),Promise.all([a.e(0),a.e(28)]).then(a.bind(null,165)),a.e(0).then(a.t.bind(null,86,7))]).then((([{DocSearchModal:e}])=>{I=e}))),[]),j=Object(n.useCallback)((()=>{O().then((()=>{g(!0)}))}),[O,g]),y=Object(n.useCallback)((()=>{g(!1)}),[g]),w=Object(n.useCallback)((e=>{O().then((()=>{g(!0),k(e.key)}))}),[O,g,k]),C=Object(n.useRef)({navigate({suggestionUrl:e}){i.push(e)}}).current,N=Object(n.useRef)((e=>e.map((e=>{const t=document.createElement("a");return t.href=e.url,{...e,url:s(`${t.pathname}${t.hash}`)}})))).current,S=Object(n.useMemo)((()=>e=>r.a.createElement(M,Object(d.a)({},e,{onClose:y}))),[y]),L=Object(n.useCallback)((e=>(e.addAlgoliaAgent("docusaurus",c.docusaurusVersion),e)),[c.docusaurusVersion]);return function(e){var t=e.isOpen,a=e.onOpen,n=e.onClose,c=e.onInput,o=e.searchButtonRef;r.a.useEffect((function(){function e(e){(27===e.keyCode&&t||"k"===e.key&&(e.metaKey||e.ctrlKey)||!function(e){var t=e.target,a=t.tagName;return t.isContentEditable||"INPUT"===a||"SELECT"===a||"TEXTAREA"===a}(e)&&"/"===e.key&&!t)&&(e.preventDefault(),t?n():document.body.classList.contains("DocSearch--active")||document.body.classList.contains("DocSearch--active")||a()),o&&o.current===document.activeElement&&c&&/[a-zA-Z0-9]/.test(String.fromCharCode(e.keyCode))&&c(e)}return window.addEventListener("keydown",e),function(){window.removeEventListener("keydown",e)}}),[t,a,n,c,o])}({isOpen:m,onOpen:j,onClose:y,onInput:w,searchButtonRef:u}),r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,null,r.a.createElement("link",{rel:"preconnect",href:`https://${t.appId}-dsn.algolia.net`,crossOrigin:"anonymous"})),r.a.createElement(_,{onTouchStart:O,onFocus:O,onMouseOver:O,onClick:j,ref:u}),m&&Object(f.createPortal)(r.a.createElement(I,Object(d.a)({onClose:y,initialScrollY:window.scrollY,initialQuery:E,navigator:C,transformItems:N,hitComponent:D,resultsFooterComponent:S,transformSearchClient:L},t,{searchParameters:l})),document.body))}var B=function(){const{siteConfig:e}=Object(h.a)();return r.a.createElement(P,e.themeConfig.algolia)},x=a(136),A=a.n(x),V=a(51),R=a.n(V);const U=({icon:e,style:t})=>r.a.createElement("span",{className:Object(c.a)(R.a.toggle,R.a.dark),style:t},e),F=({icon:e,style:t})=>r.a.createElement("span",{className:Object(c.a)(R.a.toggle,R.a.light),style:t},e);var X=function(e){const{colorMode:{switchConfig:{darkIcon:t,darkIconStyle:a,lightIcon:n,lightIconStyle:c}}}=Object(o.a)(),{isClient:l}=Object(h.a)();return r.a.createElement(A.a,Object(d.a)({disabled:!l,icons:{checked:r.a.createElement(U,{icon:t,style:a}),unchecked:r.a.createElement(F,{icon:n,style:c})}},e))},$=a(104);var H=function(e){const[t,a]=Object(n.useState)(e);return Object(n.useEffect)((()=>{const e=()=>a(window.location.hash);return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)}),[]),[t,a]},K=a(115);var Y=e=>{const[t,a]=Object(n.useState)(!0),[r,c]=Object(n.useState)(!1),[o,l]=Object(n.useState)(0),[s,i]=Object(n.useState)(0),u=Object(n.useCallback)((e=>{null!==e&&i(e.getBoundingClientRect().height)}),[]),d=Object(b.useLocation)(),[m,h]=H(d.hash);return Object(K.a)((({scrollY:t})=>{if(!e)return;if(0===t&&a(!0),t<s)return;if(r)return c(!1),a(!1),void l(t);const n=document.documentElement.scrollHeight-s,i=window.innerHeight;o&&t>=o?a(!1):t+i<n&&a(!0),l(t)}),[o,s]),Object(n.useEffect)((()=>{e&&(a(!0),h(d.hash))}),[d]),Object(n.useEffect)((()=>{e&&m&&c(!0)}),[m]),{navbarRef:u,isNavbarVisible:t}},q=a(116),G=a(117),W=a(118),z=a(52),J=a.n(z),Q=a(99);const Z={default:()=>Q.a,docsVersion:()=>a(140).default,docsVersionDropdown:()=>a(141).default,doc:()=>a(142).default};function ee({type:e,...t}){const a=((e="default")=>{const t=Z[e];if(!t)throw new Error(`No NavbarItem component found for type=${e}.`);return t()})(e);return r.a.createElement(a,t)}const te="right";var ae=function(){const{isClient:e}=Object(h.a)(),{navbar:{title:t,items:a,hideOnScroll:l,style:s},colorMode:{disableSwitch:i}}=Object(o.a)(),[u,f]=Object(n.useState)(!1),[b,v]=Object(n.useState)(!1),{isDarkTheme:p,setLightTheme:g,setDarkTheme:E}=Object($.a)(),{navbarRef:k,isNavbarVisible:O}=Y(l),{logoLink:j,logoLinkProps:y,logoImageUrl:w,logoAlt:C}=Object(W.a)();Object(q.a)(u);const _=Object(n.useCallback)((()=>{f(!0)}),[f]),N=Object(n.useCallback)((()=>{f(!1)}),[f]),S=Object(n.useCallback)((e=>e.target.checked?E():g()),[g,E]),L=Object(G.a)();Object(n.useEffect)((()=>{L===G.b.desktop&&f(!1)}),[L]);const{leftItems:T,rightItems:I}=function(e){return{leftItems:e.filter((e=>{var t;return"left"===(null!==(t=e.position)&&void 0!==t?t:te)})),rightItems:e.filter((e=>{var t;return"right"===(null!==(t=e.position)&&void 0!==t?t:te)}))}}(a);return r.a.createElement("nav",{ref:k,className:Object(c.a)("navbar","navbar--fixed-top",{"navbar--dark":"dark"===s,"navbar--primary":"primary"===s,"navbar-sidebar--show":u,[J.a.navbarHideable]:l,[J.a.navbarHidden]:!O})},r.a.createElement("div",{className:"navbar__inner"},r.a.createElement("div",{className:"navbar__items"},null!=a&&0!==a.length&&r.a.createElement("div",{"aria-label":"Navigation bar toggle",className:"navbar__toggle",role:"button",tabIndex:0,onClick:_,onKeyDown:_},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 30 30",role:"img",focusable:"false"},r.a.createElement("title",null,"Menu"),r.a.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeMiterlimit:"10",strokeWidth:"2",d:"M4 7h22M4 15h22M4 23h22"}))),r.a.createElement(m.a,Object(d.a)({className:"navbar__brand",to:j},y),null!=w&&r.a.createElement("img",{key:e,className:"navbar__logo",src:w,alt:C}),null!=t&&r.a.createElement("strong",{className:Object(c.a)("navbar__title",{[J.a.hideLogoText]:b})},t)),T.map(((e,t)=>r.a.createElement(ee,Object(d.a)({},e,{key:t}))))),r.a.createElement("div",{className:"navbar__items navbar__items--right"},I.map(((e,t)=>r.a.createElement(ee,Object(d.a)({},e,{key:t})))),!i&&r.a.createElement(X,{className:J.a.displayOnlyInLargeViewport,"aria-label":"Dark mode toggle",checked:p,onChange:S}),r.a.createElement(B,{handleSearchBarToggle:v,isSearchBarExpanded:b}))),r.a.createElement("div",{role:"presentation",className:"navbar-sidebar__backdrop",onClick:N}),r.a.createElement("div",{className:"navbar-sidebar"},r.a.createElement("div",{className:"navbar-sidebar__brand"},r.a.createElement(m.a,Object(d.a)({className:"navbar__brand",onClick:N,to:j},y),null!=w&&r.a.createElement("img",{key:e,className:"navbar__logo",src:w,alt:C}),null!=t&&r.a.createElement("strong",{className:"navbar__title"},t)),!i&&u&&r.a.createElement(X,{"aria-label":"Dark mode toggle in sidebar",checked:p,onChange:S})),r.a.createElement("div",{className:"navbar-sidebar__items"},r.a.createElement("div",{className:"menu"},r.a.createElement("ul",{className:"menu__list"},a.map(((e,t)=>r.a.createElement(ee,Object(d.a)({mobile:!0},e,{onClick:N,key:t})))))))))},ne=a(53),re=a.n(ne);function ce({to:e,href:t,label:a,prependBaseUrlToHref:n,...c}){const o=Object(v.a)(e),l=Object(v.a)(t,{forcePrependBaseUrl:!0});return r.a.createElement(m.a,Object(d.a)({className:"footer__link-item"},t?{target:"_blank",rel:"noopener noreferrer",href:n?l:t}:{to:o},c),a)}const oe=({url:e,alt:t})=>r.a.createElement("img",{className:"footer__logo",alt:t,src:e});var le=function(){const{footer:e}=Object(o.a)(),{copyright:t,links:a=[],logo:n={}}=e||{},l=Object(v.a)(n.src);return e?r.a.createElement("footer",{className:Object(c.a)("footer",{"footer--dark":"dark"===e.style})},r.a.createElement("div",{className:"container"},a&&a.length>0&&r.a.createElement("div",{className:"row footer__links"},a.map(((e,t)=>r.a.createElement("div",{key:t,className:"col footer__col"},null!=e.title?r.a.createElement("h4",{className:"footer__title"},e.title):null,null!=e.items&&Array.isArray(e.items)&&e.items.length>0?r.a.createElement("ul",{className:"footer__items"},e.items.map(((e,t)=>e.html?r.a.createElement("li",{key:t,className:"footer__item",dangerouslySetInnerHTML:{__html:e.html}}):r.a.createElement("li",{key:e.href||e.to,className:"footer__item"},r.a.createElement(ce,e))))):null)))),(n||t)&&r.a.createElement("div",{className:"text--center"},n&&n.src&&r.a.createElement("div",{className:"margin-bottom--sm"},n.href?r.a.createElement("a",{href:n.href,target:"_blank",rel:"noopener noreferrer",className:re.a.footerLogoLink},r.a.createElement(oe,{alt:n.alt,url:l})):r.a.createElement(oe,{alt:n.alt,url:l})),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:t}})))):null},se=a(10);const ie="light",ue="dark",de=e=>e===ue?ue:ie,me=()=>se.a.canUseDOM?de(document.documentElement.getAttribute("data-theme")):ie,he=e=>{try{localStorage.setItem("theme",de(e))}catch(t){console.error(t)}};var fe=()=>{const{colorMode:{disableSwitch:e=!1}}=Object(o.a)(),[t,a]=Object(n.useState)(me),r=Object(n.useCallback)((()=>{a(ie),he(ie)}),[]),c=Object(n.useCallback)((()=>{a(ue),he(ue)}),[]);return Object(n.useEffect)((()=>{document.documentElement.setAttribute("data-theme",de(t))}),[t]),Object(n.useEffect)((()=>{if(!e)try{const e=localStorage.getItem("theme");null!==e&&a(de(e))}catch(t){console.error(t)}}),[a]),Object(n.useEffect)((()=>{e||window.matchMedia("(prefers-color-scheme: dark)").addListener((({matches:e})=>{a(e?ue:ie)}))}),[]),{isDarkTheme:t===ue,setLightTheme:r,setDarkTheme:c}},be=a(114);var ve=function(e){const{isDarkTheme:t,setLightTheme:a,setDarkTheme:n}=fe();return r.a.createElement(be.a.Provider,{value:{isDarkTheme:t,setLightTheme:a,setDarkTheme:n}},e.children)};const pe="docusaurus.tab.";var ge=()=>{const[e,t]=Object(n.useState)({}),a=Object(n.useCallback)(((e,t)=>{try{localStorage.setItem("docusaurus.tab."+e,t)}catch(a){console.error(a)}}),[]);return Object(n.useEffect)((()=>{try{const e={};for(let t=0;t<localStorage.length;t+=1){const a=localStorage.key(t);if(a.startsWith(pe)){e[a.substring(pe.length)]=localStorage.getItem(a)}}t(e)}catch(e){console.error(e)}}),[]),{tabGroupChoices:e,setTabGroupChoices:(e,n)=>{t((t=>({...t,[e]:n}))),a(e,n)}}};const Ee="docusaurus.announcement.dismiss",ke="docusaurus.announcement.id";var Oe=()=>{const{announcementBar:e}=Object(o.a)(),[t,a]=Object(n.useState)(!0),r=Object(n.useCallback)((()=>{localStorage.setItem(Ee,"true"),a(!0)}),[]);return Object(n.useEffect)((()=>{if(!e)return;const{id:t}=e;let n=localStorage.getItem(ke);"annoucement-bar"===n&&(n="announcement-bar");const r=t!==n;localStorage.setItem(ke,t),r&&localStorage.setItem(Ee,"false"),(r||"false"===localStorage.getItem(Ee))&&a(!1)}),[]),{isAnnouncementBarClosed:t,closeAnnouncementBar:r}},je=a(111);var ye=function(e){const{tabGroupChoices:t,setTabGroupChoices:a}=ge(),{isAnnouncementBarClosed:n,closeAnnouncementBar:c}=Oe();return r.a.createElement(je.a.Provider,{value:{tabGroupChoices:t,setTabGroupChoices:a,isAnnouncementBarClosed:n,closeAnnouncementBar:c}},e.children)},we=a(128);function Ce({children:e}){return r.a.createElement(ve,null,r.a.createElement(ye,null,r.a.createElement(we.a,null,e)))}function _e({language:e,version:t,tag:a}){return r.a.createElement(p.a,null,e&&r.a.createElement("meta",{name:"docsearch:language",content:""+e}),t&&r.a.createElement("meta",{name:"docsearch:version",content:t}),a&&r.a.createElement("meta",{name:"docsearch:docusaurus_tag",content:a}))}function Ne(e){const{siteConfig:t}=Object(h.a)(),{favicon:a,title:n,themeConfig:{image:c,metadatas:o},url:l,titleDelimiter:s}=t,{title:i,description:u,image:m,keywords:f,permalink:b,searchMetadatas:g}=e,E=i?`${i} ${s} ${n}`:n,k=m||c,O=Object(v.a)(k,{absolute:!0}),j=Object(v.a)(a);return r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,null,r.a.createElement("html",{lang:"en"}),E&&r.a.createElement("title",null,E),E&&r.a.createElement("meta",{property:"og:title",content:E}),a&&r.a.createElement("link",{rel:"shortcut icon",href:j}),u&&r.a.createElement("meta",{name:"description",content:u}),u&&r.a.createElement("meta",{property:"og:description",content:u}),f&&f.length&&r.a.createElement("meta",{name:"keywords",content:f.join(",")}),k&&r.a.createElement("meta",{property:"og:image",content:O}),k&&r.a.createElement("meta",{property:"twitter:image",content:O}),k&&r.a.createElement("meta",{name:"twitter:image:alt",content:"Image for "+E}),b&&r.a.createElement("meta",{property:"og:url",content:l+b}),b&&r.a.createElement("link",{rel:"canonical",href:l+b}),r.a.createElement("meta",{name:"twitter:card",content:"summary_large_image"})),r.a.createElement(_e,Object(d.a)({tag:L.a,language:"en"},g)),r.a.createElement(p.a,null,o.map(((e,t)=>r.a.createElement("meta",Object(d.a)({key:"metadata_"+t},e))))))}a(54);t.a=function(e){const{children:t,noFooter:a,wrapperClassName:n}=e;return r.a.createElement(Ce,null,r.a.createElement(Ne,e),r.a.createElement(u,null),r.a.createElement(ae,null),r.a.createElement("div",{className:Object(c.a)("main-wrapper",n)},t),!a&&r.a.createElement(le,null))}},99:function(e,t,a){"use strict";var n=a(1),r=a(0),c=a.n(r),o=a(89),l=a(91),s=a(92),i=a(94),u=a(119);function d({activeBasePath:e,activeBaseRegex:t,to:a,href:r,label:o,activeClassName:i="navbar__link--active",prependBaseUrlToHref:u,...d}){const m=Object(s.a)(a),h=Object(s.a)(e),f=Object(s.a)(r,{forcePrependBaseUrl:!0});return c.a.createElement(l.a,Object(n.a)({},r?{target:"_blank",rel:"noopener noreferrer",href:u?f:r}:{isNavLink:!0,activeClassName:i,to:m,...e||t?{isActive:(e,a)=>t?new RegExp(t).test(a.pathname):a.pathname.startsWith(h)}:null},d),o)}function m({items:e,position:t,className:a,...l}){const s=Object(r.useRef)(null),i=Object(r.useRef)(null),[u,m]=Object(r.useState)(!1);Object(r.useEffect)((()=>{const e=e=>{s.current&&!s.current.contains(e.target)&&m(!1)};return document.addEventListener("mousedown",e),document.addEventListener("touchstart",e),()=>{document.removeEventListener("mousedown",e),document.removeEventListener("touchstart",e)}}),[s]);const h=(e,t=!1)=>Object(o.a)({"navbar__item navbar__link":!t,dropdown__link:t},e);return e?c.a.createElement("div",{ref:s,className:Object(o.a)("navbar__item","dropdown","dropdown--hoverable",{"dropdown--left":"left"===t,"dropdown--right":"right"===t,"dropdown--show":u})},c.a.createElement(d,Object(n.a)({className:h(a)},l,{onClick:l.to?void 0:e=>e.preventDefault(),onKeyDown:e=>{"Enter"===e.key&&(e.preventDefault(),m(!u))}}),l.label),c.a.createElement("ul",{ref:i,className:"dropdown__menu"},e.map((({className:t,...a},r)=>c.a.createElement("li",{key:r},c.a.createElement(d,Object(n.a)({onKeyDown:t=>{if(r===e.length-1&&"Tab"===t.key){t.preventDefault(),m(!1);const e=s.current.nextElementSibling;e&&e.focus()}},activeClassName:"dropdown__link--active",className:h(t,!0)},a))))))):c.a.createElement(d,Object(n.a)({className:h(a)},l))}function h({items:e,className:t,position:a,...l}){const{pathname:s}=Object(i.useLocation)(),[m,h]=Object(r.useState)((()=>{var t;return null===(t=!(null==e?void 0:e.some((e=>Object(u.a)(e.to,s)))))||void 0===t||t})),f=(e,t=!1)=>Object(o.a)("menu__link",{"menu__link--sublist":t},e);return e?c.a.createElement("li",{className:Object(o.a)("menu__list-item",{"menu__list-item--collapsed":m})},c.a.createElement(d,Object(n.a)({role:"button",className:f(t,!0)},l,{onClick:()=>{h((e=>!e))}}),l.label),c.a.createElement("ul",{className:"menu__list"},e.map((({className:e,...t},a)=>c.a.createElement("li",{className:"menu__list-item",key:a},c.a.createElement(d,Object(n.a)({activeClassName:"menu__link--active",className:f(e)},t,{onClick:l.onClick}))))))):c.a.createElement("li",{className:"menu__list-item"},c.a.createElement(d,Object(n.a)({className:f(t)},l)))}t.a=function({mobile:e=!1,...t}){const a=e?h:m;return c.a.createElement(a,t)}}}]);