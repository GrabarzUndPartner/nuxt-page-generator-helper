(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{254:function(e,t,n){var content=n(258);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(27).default)("10f9858e",content,!0,{sourceMap:!1})},255:function(e,t,n){var content=n(260);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(27).default)("cd69dc50",content,!0,{sourceMap:!1})},256:function(e,t,n){var content=n(262);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(27).default)("4fbd231f",content,!0,{sourceMap:!1})},257:function(e,t,n){"use strict";var r=n(254);n.n(r).a},258:function(e,t,n){(t=n(26)(!1)).push([e.i,".atom-headline[data-v-03282540]{font-family:sans-serif;font-style:normal;font-weight:400;line-height:1.5}.atom-headline>*[data-v-03282540]{display:block}.atom-headline.headline--h2 .overline[data-v-03282540],.atom-headline.headline--h2 .subline[data-v-03282540]{font-size:3.2vw;font-weight:400}@media (min-width:576px){.atom-headline.headline--h2 .overline[data-v-03282540],.atom-headline.headline--h2 .subline[data-v-03282540]{font-size:12px}}.atom-headline.headline--h2 .subline[data-v-03282540]{font-weight:500}.atom-headline.headline--h2 .headline[data-v-03282540]{font-size:9.6vw;font-weight:700}@media (min-width:576px){.atom-headline.headline--h2 .headline[data-v-03282540]{font-size:36px}}",""]),e.exports=t},259:function(e,t,n){"use strict";var r=n(255);n.n(r).a},260:function(e,t,n){(t=n(26)(!1)).push([e.i,".atom-rich-text b[data-v-4cccb18a],.atom-rich-text em[data-v-4cccb18a],.atom-rich-text i[data-v-4cccb18a],.atom-rich-text strong[data-v-4cccb18a]{font-style:normal;font-weight:400}.atom-rich-text[data-v-4cccb18a]{font-family:sans-serif;font-size:4.26667vw;font-weight:400}@media (min-width:576px){.atom-rich-text[data-v-4cccb18a]{font-size:16px}}.font_raleway .js--visible .atom-rich-text[data-v-4cccb18a]{font-family:Raleway,sans-serif}",""]),e.exports=t},261:function(e,t,n){"use strict";var r=n(256);n.n(r).a},262:function(e,t,n){(t=n(26)(!1)).push([e.i,"",""]),e.exports=t},264:function(e,t,n){"use strict";(function(e){n(43),n(176),n(28),n(269),n(53),n(18),n(38);var r={jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",webp:"image/webp"};t.a={props:{loading:{type:String,required:!1,default:function(){return"auto"}},sourceClientOnly:{type:Boolean,required:!1,default:function(){return!0}},placeholder:{type:String,required:!1,default:function(){return"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="}},sources:{type:[Array,Object],default:function(){return[{media:"default",srcset:"img/sample-a-16-9/412x232.jpg"},{media:"xs",srcset:"img/sample-a-16-9/768x432.jpg"},{media:"sm",srcset:"img/sample-a-16-9/992x558.jpg"},{media:"md",srcset:"img/sample-a-16-9/1200x675.jpg"},{media:"lg",srcset:"img/sample-a-16-9/1600x900.jpg"},{media:"xl",srcset:"img/sample-a-16-9/1920x1080.jpg"}]}},width:{type:Number,required:!1,default:function(){return null}},height:{type:Number,required:!1,default:function(){return null}},title:{type:String,required:!1,default:function(){return"image title"}},alt:{type:String,required:!1,default:function(){return"image description"}}},computed:{sorted:function(){return function(e,pattern){return e.sort((function(a,b){return pattern.indexOf(a.media)===pattern.indexOf(b.media)?0:pattern.indexOf(a.media)>pattern.indexOf(b.media)?1:-1}))}([].concat(this.sources),Object.keys(l)).reverse()},items:function(){var e=this;return this.sorted.map((function(source){var t;return(source=Object.assign({},source)).type="",e.sourceClientOnly,source.type=r[(t=source.srcset.replace(/.*\.(\w{3,4}).*$/,"$1"),/\w+$/.exec(t)[0])],source.media=l[source.media],source}))}},methods:{onLoad:function(){"objectFitImages"in e&&e.objectFitImages(this.$el.querySelector("img"))}}};var l={default:"all","default-max":"(max-width: 575px)",xs:"(min-width: 576px)","xs-max":"(max-width: 767px)",sm:"(min-width: 768px)","sm-max":"(max-width: 991px)",md:"(min-width: 992px)","md-max":"(max-width: 1199px)",lg:"(min-width: 1200px)","lg-max":"(max-width: 1599px)",xl:"(min-width: 1600px)","xl-max":"(max-width: 1919px)",xxl:"(min-width: 1920px)"}}).call(this,n(36))},265:function(e,t,n){var content=n(273);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(27).default)("3510dbfa",content,!0,{sourceMap:!1})},266:function(e,t,n){"use strict";var r=n(15),l={props:{tag:{type:String,required:!1,default:function(){return"h1"}},overline:{type:String,required:!1,default:function(){return"Lorem Overline"}},headline:{type:String,required:!1,default:function(){return"Lorem Headline"}},subline:{type:String,required:!1,default:function(){return"Lorem Subline"}}},computed:{styleClasses:function(){return Object(r.a)({},"headline--".concat(this.tag),!0)}}},o=(n(257),n(8)),c=Object(o.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(e.tag,{tag:"component",staticClass:"atom-headline",class:e.styleClasses},[e._t("default",[e.$slots.overline||e.overline?n("span",{staticClass:"overline"},[e._t("overline",[e._v("\n        "+e._s(e.overline)+"\n      ")])],2):e._e(),e._v(" "),e.$slots.headline||e.headline?n("span",{staticClass:"headline"},[e._t("headline",[e._v("\n        "+e._s(e.headline)+"\n      ")])],2):e._e(),e._v(" "),e.$slots.subline||e.subline?n("span",{staticClass:"subline"},[e._t("subline",[e._v("\n        "+e._s(e.subline)+"\n      ")])],2):e._e()])],2)}),[],!1,null,"03282540",null).exports,m={props:{content:{type:String,required:!1,default:"<p>Example Text</p>"}}},d=(n(259),{components:{AtomHeadline:c,AtomRichText:Object(o.a)(m,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"atom-rich-text"},[this.$slots.default?this._e():t("div",{domProps:{innerHTML:this._s(this.content)}}),this._v(" "),this._t("default")],2)}),[],!1,null,"4cccb18a",null).exports},props:{headline:{type:Object,default:function(){return{overline:"Article Overline",headline:"Article Headline",subline:"Article Subline"}}},content:{type:String,default:function(){return"<p>Example Text</p>"}}}}),f=(n(261),Object(o.a)(d,(function(){var e=this.$createElement,t=this._self._c||e;return t("article",{staticClass:"molecule-article"},[this.headline?t("header",[t("atom-headline",this._b({attrs:{tag:"h2"}},"atom-headline",this.headline,!1))],1):this._e(),this._v(" "),this._t("default",[t("atom-rich-text",{attrs:{content:this.content}})])],2)}),[],!1,null,null,null));t.a=f.exports},269:function(e,t,n){"use strict";var r=n(9),l=n(5),o=n(74),c=n(17),m=n(13),d=n(37),f=n(132),h=n(72),x=n(6),v=n(75),y=n(73).f,A=n(42).f,_=n(14).f,w=n(270).trim,j=l.Number,I=j.prototype,O="Number"==d(v(I)),N=function(e){var t,n,r,l,o,c,m,code,d=h(e,!1);if("string"==typeof d&&d.length>2)if(43===(t=(d=w(d)).charCodeAt(0))||45===t){if(88===(n=d.charCodeAt(2))||120===n)return NaN}else if(48===t){switch(d.charCodeAt(1)){case 66:case 98:r=2,l=49;break;case 79:case 111:r=8,l=55;break;default:return+d}for(c=(o=d.slice(2)).length,m=0;m<c;m++)if((code=o.charCodeAt(m))<48||code>l)return NaN;return parseInt(o,r)}return+d};if(o("Number",!j(" 0o1")||!j("0b1")||j("+0x1"))){for(var E,S=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof S&&(O?x((function(){I.valueOf.call(n)})):"Number"!=d(n))?f(new j(N(t)),n,S):N(t)},C=r?y(j):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),T=0;C.length>T;T++)m(j,E=C[T])&&!m(S,E)&&_(S,E,A(j,E));S.prototype=I,I.constructor=S,c(l,"Number",S)}},270:function(e,t,n){var r=n(22),l="["+n(271)+"]",o=RegExp("^"+l+l+"*"),c=RegExp(l+l+"*$"),m=function(e){return function(t){var n=String(r(t));return 1&e&&(n=n.replace(o,"")),2&e&&(n=n.replace(c,"")),n}};e.exports={start:m(1),end:m(2),trim:m(3)}},271:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},272:function(e,t,n){"use strict";var r=n(265);n.n(r).a},273:function(e,t,n){(t=n(26)(!1)).push([e.i,"picture,picture img{display:block}picture img{width:100%;max-width:100%}",""]),e.exports=t},274:function(e,t,n){"use strict";n.r(t);var r=n(169),l=n(266),o=n(264).a,c=(n(272),n(8)),m=Object(c.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("picture",{staticClass:"atom-responsive-image"},[e._l(e.items,(function(source,t){return n("source",e._b({key:t},"source",source,!1))})),e._v(" "),n("img",{attrs:{src:e.placeholder,alt:e.alt,title:e.title,loading:e.loading,width:e.width,height:e.height},on:{load:e.onLoad}})],2)}),[],!1,null,null,null).exports,d={components:{LayoutTwoColumnContainer:r.a,MoleculeContentArticle:l.a,AtomResponsiveImage:m},props:{options:{type:Object,default:function(){return null}},article:{type:Object,default:function(){return{headline:{overline:"Text Image Overline",headline:"Text Image Headline",subline:"Text Image Subline"},content:"<p>Scelerisque morbi blandit voluptate possimus vitae illum tristique, atque perspiciatis maecenas laudantium! Morbi, venenatis purus amet, rem eius ligula! Penatibus eleifend curabitur temporibus asperiores tempora cum accumsan egestas viverra laborum.</p><p>Arcu primis enim, parturient! Excepturi adipisci! Incidunt quibusdam ex. Non, impedit est. Ullam eiusmod semper pretium necessitatibus nostrum voluptatem ullamcorper, hac condimentum! Vestibulum rhoncus? Impedit culpa, error tempus. Ligula diam.</p>"}}},picture:{type:Object,required:!1,default:function(){return{sources:[{media:"default",srcset:"img/sample-b-16-9/412x232.jpg 1x, img/sample-b-16-9/retina/824x464.jpg 2x"},{media:"xs",srcset:"img/sample-b-16-9/768x432.jpg 1x, img/sample-b-16-9/retina/1536x864.jpg 2x"},{media:"sm",srcset:"img/sample-b-16-9/992x558.jpg 1x, img/sample-b-16-9/retina/1984x1116.jpg 2x"},{media:"md",srcset:"img/sample-b-16-9/1200x675.jpg 1x, img/sample-b-16-9/retina/2400x1350.jpg 2x"},{media:"lg",srcset:"img/sample-b-16-9/1600x900.jpg 1x, img/sample-b-16-9/retina/3200x1800.jpg 2x"},{media:"xl",srcset:"img/sample-b-16-9/1920x1080.jpg 1x, img/sample-b-16-9/retina/3840x2160.jpg 2x"}]}}}}},f=Object(c.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("layout-two-column-container",{staticClass:"organism-text-image",attrs:{options:e.options},scopedSlots:e._u([{key:"left",fn:function(){return[n("atom-responsive-image",e._b({},"atom-responsive-image",e.picture,!1))]},proxy:!0},{key:"right",fn:function(){return[n("molecule-content-article",e._b({},"molecule-content-article",e.article,!1))]},proxy:!0}])})}),[],!1,null,null,null);t.default=f.exports}}]);