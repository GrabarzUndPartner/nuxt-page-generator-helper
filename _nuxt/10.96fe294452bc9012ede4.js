(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{169:function(e,t,n){var content=n(173);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(12).default)("44c48928",content,!0,{sourceMap:!1})},170:function(e,t,n){var content=n(175);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(12).default)("32e74472",content,!0,{sourceMap:!1})},171:function(e,t,n){var content=n(177);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(12).default)("5664ce0e",content,!0,{sourceMap:!1})},172:function(e,t,n){"use strict";var l=n(169);n.n(l).a},173:function(e,t,n){(t=n(11)(!1)).push([e.i,".atom-headline[data-v-03282540]{font-family:sans-serif;font-style:normal;font-weight:400;line-height:1.5}.atom-headline>*[data-v-03282540]{display:block}.atom-headline.headline--h2 .overline[data-v-03282540],.atom-headline.headline--h2 .subline[data-v-03282540]{font-size:3.2vw;font-weight:400}@media (min-width:576px){.atom-headline.headline--h2 .overline[data-v-03282540],.atom-headline.headline--h2 .subline[data-v-03282540]{font-size:12px}}.atom-headline.headline--h2 .subline[data-v-03282540]{font-weight:500}.atom-headline.headline--h2 .headline[data-v-03282540]{font-size:9.6vw;font-weight:700}@media (min-width:576px){.atom-headline.headline--h2 .headline[data-v-03282540]{font-size:36px}}",""]),e.exports=t},174:function(e,t,n){"use strict";var l=n(170);n.n(l).a},175:function(e,t,n){(t=n(11)(!1)).push([e.i,".atom-rich-text b[data-v-4cccb18a],.atom-rich-text em[data-v-4cccb18a],.atom-rich-text i[data-v-4cccb18a],.atom-rich-text strong[data-v-4cccb18a]{font-style:normal;font-weight:400}.atom-rich-text[data-v-4cccb18a]{font-family:sans-serif;font-size:4.26667vw;font-weight:400}@media (min-width:576px){.atom-rich-text[data-v-4cccb18a]{font-size:16px}}.font_raleway .js--visible .atom-rich-text[data-v-4cccb18a]{font-family:Raleway,sans-serif}",""]),e.exports=t},176:function(e,t,n){"use strict";var l=n(171);n.n(l).a},177:function(e,t,n){(t=n(11)(!1)).push([e.i,"",""]),e.exports=t},179:function(e,t,n){"use strict";(function(e){n(75),n(13),n(8);var l={jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",webp:"image/webp"};t.a={props:{loading:{type:String,required:!1,default:()=>"auto"},sourceClientOnly:{type:Boolean,required:!1,default:()=>!0},placeholder:{type:String,required:!1,default:()=>"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="},sources:{type:[Array,Object],default:()=>[{media:"default",srcset:"img/sample-a-16-9/412x232.jpg"},{media:"xs",srcset:"img/sample-a-16-9/768x432.jpg"},{media:"sm",srcset:"img/sample-a-16-9/992x558.jpg"},{media:"md",srcset:"img/sample-a-16-9/1200x675.jpg"},{media:"lg",srcset:"img/sample-a-16-9/1600x900.jpg"},{media:"xl",srcset:"img/sample-a-16-9/1920x1080.jpg"}]},width:{type:Number,required:!1,default:()=>null},height:{type:Number,required:!1,default:()=>null},title:{type:String,required:!1,default:()=>"image title"},alt:{type:String,required:!1,default:()=>"image description"}},computed:{sorted(){return function(e,pattern){return e.sort((function(a,b){return pattern.indexOf(a.media)===pattern.indexOf(b.media)?0:pattern.indexOf(a.media)>pattern.indexOf(b.media)?1:-1}))}([].concat(this.sources),Object.keys(r)).reverse()},items(){return this.sorted.map(source=>{var e;return(source=Object.assign({},source)).type="",this.sourceClientOnly,source.type=l[(e=source.srcset.replace(/.*\.(\w{3,4}).*$/,"$1"),/\w+$/.exec(e)[0])],source.media=r[source.media],source})}},methods:{onLoad(){"objectFitImages"in e&&e.objectFitImages(this.$el.querySelector("img"))}}};var r={default:"all","default-max":"(max-width: 575px)",xs:"(min-width: 576px)","xs-max":"(max-width: 767px)",sm:"(min-width: 768px)","sm-max":"(max-width: 991px)",md:"(min-width: 992px)","md-max":"(max-width: 1199px)",lg:"(min-width: 1200px)","lg-max":"(max-width: 1599px)",xl:"(min-width: 1600px)","xl-max":"(max-width: 1919px)",xxl:"(min-width: 1920px)"}}).call(this,n(22))},180:function(e,t,n){var content=n(185);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(12).default)("139712ae",content,!0,{sourceMap:!1})},181:function(e,t,n){"use strict";var l={props:{tag:{type:String,required:!1,default:()=>"h1"},overline:{type:String,required:!1,default:()=>"Lorem Overline"},headline:{type:String,required:!1,default:()=>"Lorem Headline"},subline:{type:String,required:!1,default:()=>"Lorem Subline"}},computed:{styleClasses(){return{["headline--".concat(this.tag)]:!0}}}},r=(n(172),n(4)),o=Object(r.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(e.tag,{tag:"component",staticClass:"atom-headline",class:e.styleClasses},[e._t("default",[e.$slots.overline||e.overline?n("span",{staticClass:"overline"},[e._t("overline",[e._v("\n        "+e._s(e.overline)+"\n      ")])],2):e._e(),e._v(" "),e.$slots.headline||e.headline?n("span",{staticClass:"headline"},[e._t("headline",[e._v("\n        "+e._s(e.headline)+"\n      ")])],2):e._e(),e._v(" "),e.$slots.subline||e.subline?n("span",{staticClass:"subline"},[e._t("subline",[e._v("\n        "+e._s(e.subline)+"\n      ")])],2):e._e()])],2)}),[],!1,null,"03282540",null).exports,c={props:{content:{type:String,required:!1,default:"<p>Example Text</p>"}}},m=(n(174),{components:{AtomHeadline:o,AtomRichText:Object(r.a)(c,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"atom-rich-text"},[this.$slots.default?this._e():t("div",{domProps:{innerHTML:this._s(this.content)}}),this._v(" "),this._t("default")],2)}),[],!1,null,"4cccb18a",null).exports},props:{headline:{type:Object,default:()=>({overline:"Article Overline",headline:"Article Headline",subline:"Article Subline"})},content:{type:String,default:()=>"<p>Example Text</p>"}}}),d=(n(176),Object(r.a)(m,(function(){var e=this.$createElement,t=this._self._c||e;return t("article",{staticClass:"molecule-article"},[this.headline?t("header",[t("atom-headline",this._b({attrs:{tag:"h2"}},"atom-headline",this.headline,!1))],1):this._e(),this._v(" "),this._t("default",[t("atom-rich-text",{attrs:{content:this.content}})])],2)}),[],!1,null,null,null));t.a=d.exports},184:function(e,t,n){"use strict";var l=n(180);n.n(l).a},185:function(e,t,n){(t=n(11)(!1)).push([e.i,"picture,picture img{display:block}picture img{width:100%;max-width:100%}",""]),e.exports=t},186:function(e,t,n){"use strict";n.r(t);var l=n(86),r=n(181),o=n(179).a,c=(n(184),n(4)),m=Object(c.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("picture",{staticClass:"atom-responsive-image"},[e._l(e.items,(function(source,t){return n("source",e._b({key:t},"source",source,!1))})),e._v(" "),n("img",{attrs:{src:e.placeholder,alt:e.alt,title:e.title,loading:e.loading,width:e.width,height:e.height},on:{load:e.onLoad}})],2)}),[],!1,null,null,null).exports,d={components:{LayoutTwoColumnContainer:l.a,MoleculeContentArticle:r.a,AtomResponsiveImage:m},props:{options:{type:Object,default:()=>null},article:{type:Object,default:()=>({headline:{overline:"Text Image Overline",headline:"Text Image Headline",subline:"Text Image Subline"},content:"<p>Scelerisque morbi blandit voluptate possimus vitae illum tristique, atque perspiciatis maecenas laudantium! Morbi, venenatis purus amet, rem eius ligula! Penatibus eleifend curabitur temporibus asperiores tempora cum accumsan egestas viverra laborum.</p><p>Arcu primis enim, parturient! Excepturi adipisci! Incidunt quibusdam ex. Non, impedit est. Ullam eiusmod semper pretium necessitatibus nostrum voluptatem ullamcorper, hac condimentum! Vestibulum rhoncus? Impedit culpa, error tempus. Ligula diam.</p>"})},picture:{type:Object,required:!1,default:()=>({sources:[{media:"default",srcset:"img/sample-b-16-9/412x232.jpg 1x, img/sample-b-16-9/retina/824x464.jpg 2x"},{media:"xs",srcset:"img/sample-b-16-9/768x432.jpg 1x, img/sample-b-16-9/retina/1536x864.jpg 2x"},{media:"sm",srcset:"img/sample-b-16-9/992x558.jpg 1x, img/sample-b-16-9/retina/1984x1116.jpg 2x"},{media:"md",srcset:"img/sample-b-16-9/1200x675.jpg 1x, img/sample-b-16-9/retina/2400x1350.jpg 2x"},{media:"lg",srcset:"img/sample-b-16-9/1600x900.jpg 1x, img/sample-b-16-9/retina/3200x1800.jpg 2x"},{media:"xl",srcset:"img/sample-b-16-9/1920x1080.jpg 1x, img/sample-b-16-9/retina/3840x2160.jpg 2x"}]})}}},h=Object(c.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("layout-two-column-container",{staticClass:"organism-text-image",attrs:{options:e.options},scopedSlots:e._u([{key:"left",fn:function(){return[n("atom-responsive-image",e._b({},"atom-responsive-image",e.picture,!1))]},proxy:!0},{key:"right",fn:function(){return[n("molecule-content-article",e._b({},"molecule-content-article",e.article,!1))]},proxy:!0}])})}),[],!1,null,null,null);t.default=h.exports}}]);