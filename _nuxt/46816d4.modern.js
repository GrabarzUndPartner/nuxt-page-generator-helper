(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{220:function(e,t,n){var content=n(224);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(22).default)("44c48928",content,!0,{sourceMap:!1})},221:function(e,t,n){var content=n(226);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(22).default)("32e74472",content,!0,{sourceMap:!1})},222:function(e,t,n){var content=n(228);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(22).default)("5664ce0e",content,!0,{sourceMap:!1})},223:function(e,t,n){"use strict";n(220)},224:function(e,t,n){var l=n(21)(!1);l.push([e.i,".atom-headline[data-v-03282540]{font-family:sans-serif;font-style:normal;font-weight:400;line-height:1.5}.atom-headline>*[data-v-03282540]{display:block}.atom-headline.headline--h2 .overline[data-v-03282540],.atom-headline.headline--h2 .subline[data-v-03282540]{font-size:3.2vw;font-weight:400}@media (min-width:576px){.atom-headline.headline--h2 .overline[data-v-03282540],.atom-headline.headline--h2 .subline[data-v-03282540]{font-size:12px}}.atom-headline.headline--h2 .subline[data-v-03282540]{font-weight:500}.atom-headline.headline--h2 .headline[data-v-03282540]{font-size:9.6vw;font-weight:700}@media (min-width:576px){.atom-headline.headline--h2 .headline[data-v-03282540]{font-size:36px}}",""]),e.exports=l},225:function(e,t,n){"use strict";n(221)},226:function(e,t,n){var l=n(21)(!1);l.push([e.i,'.atom-rich-text b[data-v-4cccb18a],.atom-rich-text em[data-v-4cccb18a],.atom-rich-text i[data-v-4cccb18a],.atom-rich-text strong[data-v-4cccb18a]{font-style:normal;font-weight:400}.atom-rich-text[data-v-4cccb18a]{font-family:sans-serif;font-size:4.26667vw;font-weight:400}@media (min-width:576px){.atom-rich-text[data-v-4cccb18a]{font-size:16px}}.font_raleway .js--visible .atom-rich-text[data-v-4cccb18a]{font-family:"Raleway",sans-serif}',""]),e.exports=l},227:function(e,t,n){"use strict";n(222)},228:function(e,t,n){var l=n(21)(!1);l.push([e.i,"",""]),e.exports=l},230:function(e,t,n){"use strict";var l={props:{tag:{type:String,required:!1,default:()=>"h1"},overline:{type:String,required:!1,default:()=>"Lorem Overline"},headline:{type:String,required:!1,default:()=>"Lorem Headline"},subline:{type:String,required:!1,default:()=>"Lorem Subline"}},computed:{styleClasses(){return{["headline--".concat(this.tag)]:!0}}}},o=(n(223),n(6)),c=Object(o.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(e.tag,{tag:"component",staticClass:"atom-headline",class:e.styleClasses},[e._t("default",[e.$slots.overline||e.overline?n("span",{staticClass:"overline"},[e._t("overline",[e._v("\n        "+e._s(e.overline)+"\n      ")])],2):e._e(),e._v(" "),e.$slots.headline||e.headline?n("span",{staticClass:"headline"},[e._t("headline",[e._v("\n        "+e._s(e.headline)+"\n      ")])],2):e._e(),e._v(" "),e.$slots.subline||e.subline?n("span",{staticClass:"subline"},[e._t("subline",[e._v("\n        "+e._s(e.subline)+"\n      ")])],2):e._e()])],2)}),[],!1,null,"03282540",null).exports,r={props:{content:{type:String,required:!1,default:"<p>Example Text</p>"}}},d=(n(225),{components:{AtomHeadline:c,AtomRichText:Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"atom-rich-text"},[e.$slots.default?e._e():n("div",{domProps:{innerHTML:e._s(e.content)}}),e._v(" "),e._t("default")],2)}),[],!1,null,"4cccb18a",null).exports},props:{headline:{type:Object,default:()=>({overline:"Article Overline",headline:"Article Headline",subline:"Article Subline"})},content:{type:String,default:()=>"<p>Example Text</p>"}}}),h=(n(227),Object(o.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("article",{staticClass:"molecule-article"},[e.headline?n("header",[n("atom-headline",e._b({attrs:{tag:"h2"}},"atom-headline",e.headline,!1))],1):e._e(),e._v(" "),e._t("default",[n("atom-rich-text",{attrs:{content:e.content}})])],2)}),[],!1,null,null,null));t.a=h.exports},231:function(e,t,n){var content=n(234);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(22).default)("3be3511a",content,!0,{sourceMap:!1})},233:function(e,t,n){"use strict";n(231)},234:function(e,t,n){var l=n(21)(!1);l.push([e.i,"",""]),e.exports=l},239:function(e,t,n){"use strict";n.r(t);var l=n(117),o=n(230),c={components:{LayoutDefaultContainer:l.a,MoleculeContentArticle:o.a},props:{options:{type:Object,default:()=>null},article:{type:Object,default:()=>({headline:{overline:"Text Overline",headline:"Text Headline",subline:"Text Subline"},content:"<p>Example Text</p>"})}}},r=(n(233),n(6)),component=Object(r.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("layout-default-container",e._b({staticClass:"organism-text"},"layout-default-container",e.options,!1),[n("molecule-content-article",e._b({},"molecule-content-article",e.article,!1))],1)}),[],!1,null,null,null);t.default=component.exports}}]);