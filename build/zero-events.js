!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("ZeroEvents",[],t):"object"==typeof exports?exports.ZeroEvents=t():e.ZeroEvents=t()}(this,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([
/*!***********************!*\
  !*** ./src/events.js ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();var o=function e(t,r){var n=[],o=(r=r.split(".")).shift();if(""===o)for(var a in t.subevents)t.subevents.hasOwnProperty(a)&&(n=n.concat(e(t.subevents[a],r.join("."))));else{var u=o;t.subevents.hasOwnProperty(u)&&(n=n.concat(function e(t){var r=[t.handlers];for(var n in t.subevents)t.subevents.hasOwnProperty(n)&&(r=r.concat(e(t.subevents[n])));return r}(t.subevents[u])))}return n},a=function(e,t){for(var r=t;e;){for(t=r;t;){if(t===e)return!0;t=t.__Ref__}e=e.__Ref__}return!1},u=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.__event_target__=t}return n(e,null,[{key:"VERSION",get:function(){return"1.0.2"}}]),n(e,[{key:"on",value:function(t,r){for(var n=arguments.length,o=Array(n>2?n-2:0),a=2;a<n;a++)o[a-2]=arguments[a];return e.on.apply(e,[this.__event_target__,t,r].concat(o)),this}},{key:"one",value:function(t,r){for(var n=arguments.length,o=Array(n>2?n-2:0),a=2;a<n;a++)o[a-2]=arguments[a];return e.one.apply(e,[this.__event_target__,t,r].concat(o)),this}},{key:"off",value:function(t,r){return e.off(this.__event_target__,t,r),this}},{key:"trigger",value:function(t){for(var r=arguments.length,n=Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];return e.trigger.apply(e,[this.__event_target__,t].concat(n)),this}}],[{key:"on",value:function(t,r,n){for(var o=arguments.length,a=Array(o>3?o-3:0),u=3;u<o;u++)a[u-3]=arguments[u];var f=t.__Events__=t.__Events__||e.DefaultObject,i=r.split(" "),l=!0,v=!1,_=void 0;try{for(var s,c=i[Symbol.iterator]();!(l=(s=c.next()).done);l=!0){for(var y=s.value,p=(y=y.trim()).split("."),b=0;b<p.length-1;){var d=p[b++];if(!d)throw"invalid event name "+y;f.subevents[d]=f.subevents[d]||e.DefaultObject,f=f.subevents[d]}var h=f.subevents[p[b]];h||(h=f.subevents[p[b]]=e.DefaultObject);var g=h.handlers;n.__Ref__=function(){var e=Array.prototype.slice.call(arguments,0);return n.apply(t,e.concat(a))},g.push(n),t.addEventListener&&t.addEventListener(p[0],n.__Ref__,!1)}}catch(e){v=!0,_=e}finally{try{!l&&c.return&&c.return()}finally{if(v)throw _}}}},{key:"one",value:function(t,r,n){for(var o=arguments.length,a=Array(o>3?o-3:0),u=3;u<o;u++)a[u-3]=arguments[u];n.__Ref__=function(){var o=n.apply(t,arguments);return e.off(t,r,n.__Ref__),o},e.on.apply(e,[t,r,n.__Ref__].concat(a))}},{key:"off",value:function(t,r,n){t.__Events__=t.__Events__||e.DefaultObject,r=r||".";var u=[];if(t.removeEventListener){var f=r.split(".");u=""===f[0]?Object.keys(t.__Events__.subevents):[f[0]]}for(var i=o(t.__Events__,r),l=i.length-1;l>=0;l--)for(var v=i[l],_=v.length-1;_>=0;_--){var s=v[_];if(n){if(a(s,n)){v.splice(_,1);var c=!0,y=!1,p=void 0;try{for(var b,d=u[Symbol.iterator]();!(c=(b=d.next()).done);c=!0){var h=b.value;t.removeEventListener(h,s.__Ref__||s,!1)}}catch(e){y=!0,p=e}finally{try{!c&&d.return&&d.return()}finally{if(y)throw p}}}}else{v.splice(_,1);var g=!0,m=!1,j=void 0;try{for(var O,E=u[Symbol.iterator]();!(g=(O=E.next()).done);g=!0){var x=O.value;t.removeEventListener(x,s.__Ref__||s,!1)}}catch(e){m=!0,j=e}finally{try{!g&&E.return&&E.return()}finally{if(m)throw j}}}}}},{key:"trigger",value:function(t,r){t.__Events__=t.__Events__||e.DefaultObject;for(var n=r.split("."),a=o(t.__Events__,r),u=arguments.length,f=Array(u>2?u-2:0),i=2;i<u;i++)f[i-2]=arguments[i];var l=!0,v=!1,_=void 0;try{for(var s,c=a[Symbol.iterator]();!(l=(s=c.next()).done);l=!0){var y=s.value,p=!0,b=!1,d=void 0;try{for(var h,g=y[Symbol.iterator]();!(p=(h=g.next()).done);p=!0){h.value.apply(t,f)}}catch(e){b=!0,d=e}finally{try{!p&&g.return&&g.return()}finally{if(b)throw d}}}}catch(e){v=!0,_=e}finally{try{!l&&c.return&&c.return()}finally{if(v)throw _}}t[n[0]]&&t[n[0]]()}},{key:"DefaultObject",get:function(){return{handlers:[],subevents:{}}}}]),e}();t.default=u}])});