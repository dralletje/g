!function t(r,n,e){function o(u,c){if(!n[u]){if(!r[u]){var a="function"==typeof require&&require;if(!c&&a)return a(u,!0);if(i)return i(u,!0);var s=new Error("Cannot find module '"+u+"'");throw s.code="MODULE_NOT_FOUND",s}var f=n[u]={exports:{}};r[u][0].call(f.exports,function(t){var n=r[u][1][t];return o(n?n:t)},f,f.exports,t,r,n,e)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<e.length;u++)o(e[u]);return o}({1:[function(t){var r,n,e,o,i,u,c,a;for(n=t("../../source/universe.coffee"),r=t("../../source/canvas.coffee"),c=new n({speed:1}),c.addPlanet(1e11,[0,0],[0,0]),i=20,o=a=0;i>=0?i>a:a>i;o=i>=0?++a:--a)u=vector(Math.floor(100*Math.random()-50),Math.floor(100*Math.random()-50)).norm().multiply(.1),c.addPlanet(0,[400,0],u);e=new r(document.getElementById("canvas")),e.origin([400,400]),c.loop(e)},{"../../source/canvas.coffee":45,"../../source/universe.coffee":47}],2:[function(t,r){"use strict";r.exports=function(t){var r,n=t.length,e=new Array(n);for(r=0;n>r;r++)e[r]=t[r];return e}},{}],3:[function(t,r){"use strict";r.exports=function(){var t,r,n,e,o=arguments.length,i=[];for(t=0;o>t;t++)if(r=arguments[t],Array.isArray(r))for(n=r.length,e=0;n>e;e++)i.push(r[e]);else i.push(r);return i}},{}],4:[function(t,r){"use strict";var n=t("../function/bindInternal3");r.exports=function(t,r,e){var o,i=t.length,u=void 0!==e?n(r,e):r;for(o=0;i>o;o++)if(!u(t[o],o,t))return!1;return!0}},{"../function/bindInternal3":23}],5:[function(t,r){"use strict";r.exports=function(t,r,n,e){var o,i=t.length;for(void 0===n&&(n=0),void 0===e&&(e=i),o=n;e>o;o++)t[o]=r;return t}},{}],6:[function(t,r){"use strict";var n=t("../function/bindInternal3");r.exports=function(t,r,e){var o,i=t.length,u=[],c=void 0!==e?n(r,e):r;for(o=0;i>o;o++)c(t[o],o,t)&&u.push(t[o]);return u}},{"../function/bindInternal3":23}],7:[function(t,r){"use strict";var n=t("../function/bindInternal3");r.exports=function(t,r,e){var o,i=t.length,u=void 0!==e?n(r,e):r;for(o=0;i>o;o++)u(t[o],o,t)}},{"../function/bindInternal3":23}],8:[function(t,r,n){"use strict";n.clone=t("./clone"),n.concat=t("./concat"),n.every=t("./every"),n.filter=t("./filter"),n.forEach=t("./forEach"),n.indexOf=t("./indexOf"),n.lastIndexOf=t("./lastIndexOf"),n.map=t("./map"),n.pluck=t("./pluck"),n.reduce=t("./reduce"),n.reduceRight=t("./reduceRight"),n.some=t("./some"),n.fill=t("./fill")},{"./clone":2,"./concat":3,"./every":4,"./fill":5,"./filter":6,"./forEach":7,"./indexOf":9,"./lastIndexOf":10,"./map":11,"./pluck":12,"./reduce":13,"./reduceRight":14,"./some":15}],9:[function(t,r){"use strict";r.exports=function(t,r,n){var e=t.length,o=0;for("number"==typeof n&&(o=n,0>o&&(o+=e,0>o&&(o=0)));e>o;o++)if(t[o]===r)return o;return-1}},{}],10:[function(t,r){"use strict";r.exports=function(t,r,n){var e=t.length,o=e-1;for("number"==typeof n&&(o=n,0>o&&(o+=e));o>=0;o--)if(t[o]===r)return o;return-1}},{}],11:[function(t,r){"use strict";var n=t("../function/bindInternal3");r.exports=function(t,r,e){var o,i=t.length,u=new Array(i),c=void 0!==e?n(r,e):r;for(o=0;i>o;o++)u[o]=c(t[o],o,t);return u}},{"../function/bindInternal3":23}],12:[function(t,r){"use strict";r.exports=function(t,r){var n,e,o=t.length,i=[],u=0;for(e=0;o>e;e++)n=t[e],null!=n&&void 0!==n[r]&&(i[u++]=n[r]);return i}},{}],13:[function(t,r){"use strict";var n=t("../function/bindInternal4");r.exports=function(t,r,e,o){var i,u,c=t.length,a=void 0!==o?n(r,o):r;for(void 0===e?(i=1,u=t[0]):(i=0,u=e);c>i;i++)u=a(u,t[i],i,t);return u}},{"../function/bindInternal4":24}],14:[function(t,r){"use strict";var n=t("../function/bindInternal4");r.exports=function(t,r,e,o){var i,u,c=t.length,a=void 0!==o?n(r,o):r;for(void 0===e?(i=c-2,u=t[c-1]):(i=c-1,u=e);i>=0;i--)u=a(u,t[i],i,t);return u}},{"../function/bindInternal4":24}],15:[function(t,r){"use strict";var n=t("../function/bindInternal3");r.exports=function(t,r,e){var o,i=t.length,u=void 0!==e?n(r,e):r;for(o=0;i>o;o++)if(u(t[o],o,t))return!0;return!1}},{"../function/bindInternal3":23}],16:[function(t,r){"use strict";var n=t("./array/clone"),e=t("./object/clone");r.exports=function(t){return t&&"object"==typeof t?Array.isArray(t)?n(t):e(t):t}},{"./array/clone":2,"./object/clone":32}],17:[function(t,r){"use strict";var n=t("./array/filter"),e=t("./object/filter");r.exports=function(t,r,o){return t instanceof Array?n(t,r,o):e(t,r,o)}},{"./array/filter":6,"./object/filter":33}],18:[function(t,r){"use strict";var n=t("./array/forEach"),e=t("./object/forEach");r.exports=function(t,r,o){return t instanceof Array?n(t,r,o):e(t,r,o)}},{"./array/forEach":7,"./object/forEach":34}],19:[function(t,r){"use strict";var n=t("./applyWithContext"),e=t("./applyNoContext");r.exports=function(t,r,o){return void 0!==r?n(t,r,o):e(t,o)}},{"./applyNoContext":20,"./applyWithContext":21}],20:[function(t,r){"use strict";r.exports=function(t,r){switch(r.length){case 0:return t();case 1:return t(r[0]);case 2:return t(r[0],r[1]);case 3:return t(r[0],r[1],r[2]);case 4:return t(r[0],r[1],r[2],r[3]);case 5:return t(r[0],r[1],r[2],r[3],r[4]);case 6:return t(r[0],r[1],r[2],r[3],r[4],r[5]);case 7:return t(r[0],r[1],r[2],r[3],r[4],r[5],r[6]);case 8:return t(r[0],r[1],r[2],r[3],r[4],r[5],r[6],r[7]);default:return t.apply(void 0,r)}}},{}],21:[function(t,r){"use strict";r.exports=function(t,r,n){switch(n.length){case 0:return t.call(r);case 1:return t.call(r,n[0]);case 2:return t.call(r,n[0],n[1]);case 3:return t.call(r,n[0],n[1],n[2]);case 4:return t.call(r,n[0],n[1],n[2],n[3]);case 5:return t.call(r,n[0],n[1],n[2],n[3],n[4]);case 6:return t.call(r,n[0],n[1],n[2],n[3],n[4],n[5]);case 7:return t.call(r,n[0],n[1],n[2],n[3],n[4],n[5],n[6]);case 8:return t.call(r,n[0],n[1],n[2],n[3],n[4],n[5],n[6],n[7]);default:return t.apply(r,n)}}},{}],22:[function(t,r){"use strict";var n=t("./applyWithContext"),e=t("./applyNoContext");r.exports=function(t,r){var o,i=arguments.length-2;if(i>0){o=new Array(i);for(var u=0;i>u;u++)o[u]=arguments[u+2];return void 0!==r?function(){var e,u=arguments.length,c=new Array(i+u);for(e=0;i>e;e++)c[e]=o[e];for(e=0;u>e;e++)c[i+e]=arguments[e];return n(t,r,c)}:function(){var r,n=arguments.length,u=new Array(i+n);for(r=0;i>r;r++)u[r]=o[r];for(r=0;n>r;r++)u[i+r]=arguments[r];return e(t,u)}}return void 0!==r?function(){return n(t,r,arguments)}:function(){return e(t,arguments)}}},{"./applyNoContext":20,"./applyWithContext":21}],23:[function(t,r){"use strict";r.exports=function(t,r){return function(n,e,o){return t.call(r,n,e,o)}}},{}],24:[function(t,r){"use strict";r.exports=function(t,r){return function(n,e,o,i){return t.call(r,n,e,o,i)}}},{}],25:[function(t,r,n){"use strict";n.apply=t("./apply"),n.bind=t("./bind"),n.partial=t("./partial"),n.partialConstructor=t("./partialConstructor"),n["try"]=t("./try")},{"./apply":19,"./bind":22,"./partial":26,"./partialConstructor":27,"./try":28}],26:[function(t,r){"use strict";var n=t("./applyWithContext");r.exports=function(t){var r,e=arguments.length-1;r=new Array(e);for(var o=0;e>o;o++)r[o]=arguments[o+1];return function(){var o,i=arguments.length,u=new Array(e+i);for(o=0;e>o;o++)u[o]=r[o];for(o=0;i>o;o++)u[e+o]=arguments[o];return n(t,this,u)}}},{"./applyWithContext":21}],27:[function(t,r){"use strict";var n=t("./applyWithContext");r.exports=function(t){var r,e=arguments.length-1;r=new Array(e);for(var o=0;e>o;o++)r[o]=arguments[o+1];return function(){var o,i=arguments.length,u=new Array(e+i);for(o=0;e>o;o++)u[o]=r[o];for(o=0;i>o;o++)u[e+o]=arguments[o];var c=Object.create(t.prototype),a=n(t,c,u);return null==a||"object"!=typeof a&&"function"!=typeof a?c:a}}},{"./applyWithContext":21}],28:[function(t,r){"use strict";r.exports=function(t){try{return t()}catch(r){return r instanceof Error?r:new Error(r)}}},{}],29:[function(t,r,n){"use strict";function e(t){return this instanceof e?void(this.value=t||[]):new e(t)}r.exports=n=e,e.array=t("./array"),e["function"]=e.fn=t("./function"),e.object=t("./object"),e.string=t("./string"),e.apply=e["function"].apply,e.bind=e["function"].bind,e.partial=e["function"].partial,e.partialConstructor=e["function"].partialConstructor,e["try"]=e.attempt=e["function"]["try"],e.assign=e.object.assign,e.cloneObject=e.object.clone,e.keys=e.object.keys,e.values=e.object.values,e.clone=t("./clone"),e.map=t("./map"),e.filter=t("./filter"),e.forEach=t("./forEach"),e.reduce=t("./reduce"),e.reduceRight=t("./reduceRight"),e.cloneArray=e.array.clone,e.concat=e.array.concat,e.some=e.array.some,e.every=e.array.every,e.indexOf=e.array.indexOf,e.lastIndexOf=e.array.lastIndexOf,e.pluck=e.array.pluck,e.fill=e.array.fill,e.intern=e.string.intern,e.prototype.concat=function(){var t,r,n,o,i=this.value.length,u=new Array(i);for(t=0;i>t;t++)u[t]=this.value[t];for(i=arguments.length,t=0;i>t;t++)if(r=arguments[t],Array.isArray(r))for(n=r.length,o=0;n>o;o++)u.push(r[o]);else u.push(r);return new e(u)},e.prototype.map=function(t,r){return new e(e.map(this.value,t,r))},e.prototype.filter=function(t,r){return new e(e.filter(this.value,t,r))},e.prototype.reduce=function(t,r,n){return e.reduce(this.value,t,r,n)},e.prototype.reduceRight=function(t,r,n){return e.reduceRight(this.value,t,r,n)},e.prototype.forEach=function(t,r){return e.forEach(this.value,t,r),this},e.prototype.some=function(t,r){return e.some(this.value,t,r)},e.prototype.every=function(t,r){return e.some(this.value,t,r)},e.prototype.indexOf=function(t,r){return e.indexOf(this.value,t,r)},e.prototype.lastIndexOf=function(t,r){return e.lastIndexOf(this.value,t,r)},e.prototype.reverse=function(){return new e(this.value.reverse())},e.prototype.valueOf=function(){return this.value},e.prototype.toJSON=function(){return this.value},Object.defineProperty(e.prototype,"length",{get:function(){return this.value.length}})},{"./array":8,"./clone":16,"./filter":17,"./forEach":18,"./function":25,"./map":30,"./object":35,"./reduce":41,"./reduceRight":42,"./string":43}],30:[function(t,r){"use strict";var n=t("./array/map"),e=t("./object/map");r.exports=function(t,r,o){return t instanceof Array?n(t,r,o):e(t,r,o)}},{"./array/map":11,"./object/map":37}],31:[function(t,r){"use strict";r.exports=function(t){var r,n,e,o,i,u,c=arguments.length;for(n=1;c>n;n++)for(r=arguments[n],o=Object.keys(r),e=o.length,u=0;e>u;u++)i=o[u],t[i]=r[i];return t}},{}],32:[function(t,r){"use strict";r.exports=function(t){var r,n,e=Object.keys(t),o=e.length,i={};for(r=0;o>r;r++)n=e[r],i[n]=t[n];return i}},{}],33:[function(t,r){"use strict";var n=t("../function/bindInternal3");r.exports=function(t,r,e){var o,i,u=Object.keys(t),c=u.length,a={},s=void 0!==e?n(r,e):r;for(o=0;c>o;o++)i=u[o],s(t[i],i,t)&&(a[i]=t[i]);return a}},{"../function/bindInternal3":23}],34:[function(t,r){"use strict";var n=t("../function/bindInternal3");r.exports=function(t,r,e){var o,i,u=Object.keys(t),c=u.length,a=void 0!==e?n(r,e):r;for(i=0;c>i;i++)o=u[i],a(t[o],o,t)}},{"../function/bindInternal3":23}],35:[function(t,r,n){"use strict";n.assign=t("./assign"),n.clone=t("./clone"),n.filter=t("./filter"),n.forEach=t("./forEach"),n.map=t("./map"),n.reduce=t("./reduce"),n.reduceRight=t("./reduceRight"),n.keys=t("./keys"),n.values=t("./values")},{"./assign":31,"./clone":32,"./filter":33,"./forEach":34,"./keys":36,"./map":37,"./reduce":38,"./reduceRight":39,"./values":40}],36:[function(t,r){"use strict";r.exports="function"==typeof Object.keys?Object.keys:function(t){var r=[];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&r.push(n);return r}},{}],37:[function(t,r){"use strict";var n=t("../function/bindInternal3");r.exports=function(t,r,e){var o,i,u=Object.keys(t),c=u.length,a={},s=void 0!==e?n(r,e):r;for(o=0;c>o;o++)i=u[o],a[i]=s(t[i],i,t);return a}},{"../function/bindInternal3":23}],38:[function(t,r){"use strict";var n=t("../function/bindInternal4");r.exports=function(t,r,e,o){var i,u,c,a=Object.keys(t),s=a.length,f=void 0!==o?n(r,o):r;for(void 0===e?(i=1,c=t[a[0]]):(i=0,c=e);s>i;i++)u=a[i],c=f(c,t[u],u,t);return c}},{"../function/bindInternal4":24}],39:[function(t,r){"use strict";var n=t("../function/bindInternal4");r.exports=function(t,r,e,o){var i,u,c,a=Object.keys(t),s=a.length,f=void 0!==o?n(r,o):r;for(void 0===e?(i=s-2,c=t[a[s-1]]):(i=s-1,c=e);i>=0;i--)u=a[i],c=f(c,t[u],u,t);return c}},{"../function/bindInternal4":24}],40:[function(t,r){"use strict";r.exports=function(t){for(var r=Object.keys(t),n=r.length,e=new Array(n),o=0;n>o;o++)e[o]=t[r[o]];return e}},{}],41:[function(t,r){"use strict";var n=t("./array/reduce"),e=t("./object/reduce");r.exports=function(t,r,o,i){return t instanceof Array?n(t,r,o,i):e(t,r,o,i)}},{"./array/reduce":13,"./object/reduce":38}],42:[function(t,r){"use strict";var n=t("./array/reduceRight"),e=t("./object/reduceRight");r.exports=function(t,r,o,i){return t instanceof Array?n(t,r,o,i):e(t,r,o,i)}},{"./array/reduceRight":14,"./object/reduceRight":39}],43:[function(t,r,n){"use strict";n.intern=t("./intern")},{"./intern":44}],44:[function(t,r){"use strict";var n={"- ":!0};delete n["- "],r.exports=function(t){n[t]=!0;var r=Object.keys(n)[0];return delete n[r],r}},{}],45:[function(t,r){var n,e;e=t("./vector-immutable.coffee").Vector,n=function(){function t(t){this.el=t,this.ctx=t.getContext("2d"),this.o=e["null"],this.s=1}return t.prototype.origin=function(t){return this.o=e.fromArray(t),this},t.prototype.scale=function(t){return this.s=t,this},t.prototype.linecolor=function(t){return this.ctx.strokeStyle=t,this},t.prototype.linewidth=function(t){return this.ctx.lineWidth=t,this},t.prototype._convert=function(t){return t=null==t.x||null==t.y?e.fromArray(t):t,this.o.plus(t.multiply(this.s))},t.prototype.circle=function(t,r){var n;return this.ctx.beginPath(),n=this._convert(t),this.ctx.arc(n.x,n.y,r*this.s,0,2*Math.PI),this.ctx.stroke(),this},t.prototype.line=function(t,r){var n,e;return this.ctx.beginPath(),n=this._convert(t),e=n.plus(r.multiply(this.s)),this.ctx.moveTo(n.x,n.y),this.ctx.lineTo(e.x,e.y),this.ctx.stroke(),this},t.prototype.clear=function(t){return null==t&&(t="rgba(255,255,255,1)"),this.ctx.fillStyle=t,this.ctx.fillRect(0,0,this.el.width,this.el.height)},t}(),r.exports=n},{"./vector-immutable.coffee":48}],46:[function(t,r){var n,e,o,i,u;u=t("./vector-immutable.coffee"),e=u.Vector,i=u.vector,o=t("fast.js"),n=function(){function t(t,r,n){if(r instanceof Array&&(r=e.fromArray(r)),n instanceof Array&&(n=e.fromArray(n)),null==r.x)throw new TypeError("Position should be a Vector");if(null==n.x)throw new TypeError("Speed should be a Vector");this.mass=t,this.p=r,this.s=n,this.a=e["null"],this.size=Math.max(10,5*Math.log(t)+10)}return t.prototype.draw=function(t){var r;return t.linewidth("2").linecolor("rgba(0,0,0,1)").circle(this.p,this.size).circle(this.p,2/t.s),t.linewidth("3"),r=50/this.timespeed,t.linecolor("rgba(255,0,0,1)").line(this.p,this.s.multiply(r)),r=1e3/this.timespeed2,t.linecolor("rgba(0,255,0,1)").line(this.p,this.a.multiply(r))},t.prototype.move=function(t){return this.p=this.p.plus(this.s.multiply(t))},t.prototype.accelerate=function(t,r,n){var i;return i=o.map(t,function(t){return function(r){var n,o,i;return r===t||0===r.mass?e["null"]:(n=r.p.minus(t.p),i=n.size2(),0===i?e["null"]:(o=r.mass/(i*Math.sqrt(i)),n.multiply(o)))}}(this)),i=o.reduce(i,function(t,r){return t.plus(r)},e["null"]),this.a=i.multiply(r*n),this.s=this.s.plus(this.a)},t}(),r.exports=n},{"./vector-immutable.coffee":48,"fast.js":29}],47:[function(t,r){var n,e,o,i,u;u=t("./vector-immutable.coffee"),o=u.Vector,i=u.vector,n=t("./planet.coffee"),e=function(){function t(t){null==t&&(t={}),this.opts={speed:t.speed||1,accuracy:t.accuracy||1,scale:t.scale||1},this.opts.speed=this.opts.speed/this.opts.accuracy,this.planets=[],this.t=0}return t.SECOND=1,t.DAY=86400,t.YEAR=31556900,t.KG=1,t.KG24=1e24,t.M=1,t.KM=1e3,t.G=6.67384e-11,t.prototype.addPlanet=function(t,r,e){var i,u,c;if(u=this.opts.scale,c=u*u*u,r instanceof Array&&(r=o.fromArray(r)),e instanceof Array&&(e=o.fromArray(e)),null==r.x)throw new TypeError("Position should be a Vector");if(null==e.x)throw new TypeError("Speed should be a Vector");return i=new n(t*c,r.multiply(u),e.multiply(u),this.opts),this.planets.push(i)},t.prototype.run=function(r){var n,e,o,i,u,c,a,s,f;for(i=this.opts.speed,o=this.planets,n=u=0;r>=0?r>u:u>r;n=r>=0?++u:--u){for(c=0,s=o.length;s>c;c++)e=o[c],e.accelerate(o,i,t.G);for(a=0,f=o.length;f>a;a++)e=o[a],e.move(i)}},t.prototype.draw=function(t){var r,n,e,o,i;for(o=this.planets,i=[],n=0,e=o.length;e>n;n++)r=o[n],i.push(r.draw(t));return i},t.prototype.loop=function(t){var r,n;return n=performance.now(),r=this.opts.accuracy,setInterval(function(e){return function(){var o;return o=performance.now()-n,n=performance.now(),o=Math.min(o,20),t.clear(),e.run(o*r),e.draw(t)}}(this),1)},t}(),r.exports=e},{"./planet.coffee":46,"./vector-immutable.coffee":48}],48:[function(t,r){var n,e;e=function(t,r){return new n(t,r)},n=function(){function t(t,r){this.x=t,this.y=r}return t.fromArray=function(r){return new t(r[0],r[1])},t["null"]=t.fromArray([0,0]),t.prototype.toArray=function(){return[this.x,this.y]},t.prototype.map=function(r){return new t(r(this.x),r(this.y))},t.prototype.zipWith=function(r,n){return null==r.x||null==r.y?new t(n(this.x,r),n(this.y,r)):new t(n(this.x,r.x),n(this.y,r.y))},t.prototype.plus=function(t){return this.zipWith(t,function(t,r){return t+r})},t.prototype.minus=function(t){return this.zipWith(t,function(t,r){return t-r})},t.prototype.multiply=function(t){return this.zipWith(t,function(t,r){return t*r})},t.prototype.divide=function(r){return r instanceof t?this.zipWith(r,function(t,r){return t/r}):this.multiply(1/r)},t.prototype.size2=function(){return this.x*this.x+this.y*this.y},t.prototype.size=function(){return Math.sqrt(this.size2())},t.prototype.norm=function(){return this.divide(this.size())},t}(),r.exports={Vector:n,vector:e}},{}]},{},[1]);