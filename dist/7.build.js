webpackJsonp([7],{113:function(t,e,i){function a(t){i(140)}var r=i(1)(i(125),i(136),a,null,null);t.exports=r.exports},124:function(t,e,i){"use strict";e.a={getViewPortHeight:function(){return Math.max(document.documentElement.clientHeight,window.innerHeight||0)},getScrollTop:function(){return window.pageYOffset||document.documentElement.scrollTop}}},125:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(14),r=i.n(a),o=i(7),n=i(39),p=i(124);e.default={mounted:function(){this.loadData()},data:function(){return{code:"",name:"",image:"",price:0,description:"",thumbnails:[],covers:[],theaterImage:"",loadingData:!1,lastScrollY:p.a.getScrollTop()}},watch:{$route:function(t,e){this.clearData(),this.loadData()}},components:{"slideshow-thumb":{props:["thumb"],data:function(){return{focused:!1}},template:'\n                <div \n                    v-on:click="emitUpdateThumbnailFocus"\n                    v-bind:class="{ \'app-detail-wrapper-cover-thumbnails-list-item-focused\': focused }">\n                    <img v-bind:src="thumb.href">\n                </div>\n            ',methods:{focus:function(){this.focused=!0},unfocus:function(){this.focused=!1},emitUpdateThumbnailFocus:function(){this.$emit("updatethumbnailfocus",this.thumb.id)}}}},methods:{isVideo:function(t){return t.indexOf("webm")>=0},isVideoThumb:function(t){return t.indexOf("movie")>=0},clearData:function(){this.code="",this.name="",this.image="",this.price=0,this.description="",this.thumbnails=[],this.covers=[],this.theaterImage="",this.loadingData=!1,this.lastScrollY=p.a.getScrollTop()},loadData:function(){var t=this;if(!this.loadingData){this.loadingData=!0,this.code=this.$route.params.code;firebase.database().ref("/Products").orderByKey().equalTo(this.code.toString()).on("value",function(e){var i=e.val();if(i){var a=i[t.code];if(t.price=a.price,t.image=a.image,t.description=a.description,a.thumbnails)for(var r=0;r<a.thumbnails.length;++r)t.thumbnails.push({href:a.thumbnails[r],id:r});a.covers&&(t.covers=a.covers,t.theaterImage=t.covers[0],setTimeout(function(){t.$children[0].focused=!0},250))}t.loadingData=!1})}},updateThumbnailFocus:function(t){this.theaterImage=this.covers[t],r.a.each(this.$children,function(e){e.thumb.id===t?e.focus():e.unfocus()})},addToCart:function(){n.a.addItem(this.code),o.a.$emit("update-counter"),o.a.$emit("push-notification",this.name+" has been added to cart.")}}}},130:function(t,e,i){e=t.exports=i(2)(),e.push([t.i,'@keyframes blinking{0%{color:#d3d3d3}to{color:gray}}.animated-loading-text{width:250px;font-size:24px;height:24px;text-align:center;position:fixed;top:calc(50vh - 12px);left:calc(50vw - .5 * 250px);animation-name:blinking;animation-duration:.5s;animation-iteration-count:infinite;animation-direction:alternate;display:none;z-index:99;text-shadow:0 0 16px #fff}.material-button{position:relative;padding:12px;cursor:pointer;border:none;outline:none;border-radius:1px;box-shadow:0 1px 4px rgba(0,0,0,.6);background-color:#009688;color:#fff;transition:background-color .3s;overflow:hidden;font-size:14px;text-align:center}.material-button:hover{background-color:#00897b}.material-button:before{content:"";position:absolute;top:50%;left:50%;display:block;width:0;padding-top:0;border-radius:100%;background-color:rgba(236,240,241,.2);transform:translate(-50%,-50%)}.material-button:active:before{width:120%;padding-top:120%;transition:width .2s ease-out,padding-top .2s ease-out}.material-card{box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)}.app-detail{width:100%;min-height:100vh}.app-detail-title{padding:16px;font-size:32px;text-align:center}.app-detail-wrapper{display:flex;flex-direction:row;justify-content:center}.app-detail-wrapper-cover{padding:16px}.app-detail-wrapper-cover-theater{width:600px;height:338px;display:block;margin-left:auto;margin-right:auto}.app-detail-wrapper-cover-thumbnails-list{margin:16px;overflow-x:auto;display:flex;flex-direction:row;flex-wrap:nowrap;width:600px}.app-detail-wrapper-cover-thumbnails-list-item{flex-grow:0;flex-shrink:0;height:65px;width:116px;margin:8px;cursor:pointer;border:2px solid transparent}.app-detail-wrapper-cover-thumbnails-list-item img{width:100%;height:100%}.app-detail-wrapper-cover-thumbnails-list-item-focused{border:2px solid gray!important}.app-detail-wrapper-cover-thumbnails-list-item-video{position:relative}.app-detail-wrapper-cover-thumbnails-list-item-video:before{font-family:FontAwesome;content:"\\F16A";font-size:32px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:teal}.app-detail-wrapper-description{width:250px;padding:16px;margin-bottom:32px;display:flex;flex-direction:column}.app-detail-wrapper-description-image{width:230px;height:107.5px;box-sizing:border-box;flex-grow:0;flex-shrink:0}.app-detail-wrapper-description-wrapper-right-content{padding:16px;box-sizing:border-box;font-size:14px}.app-detail-wrapper-description-wrapper-right-add-to-cart-button{width:150px;font-size:16px}.app-detail-wrapper-description-wrapper-right-price{padding:8px;display:block;font-weight:700}@media screen and (max-width:950px){.app-detail-wrapper{flex-direction:column;align-items:center}.app-detail-wrapper-cover{order:1}.app-detail-wrapper-description{order:0;width:600px;flex-direction:row}.app-detail-wrapper-description-image{width:345px;height:161.25px}.app-detail-wrapper-description-wrapper-right-price{text-align:center}.app-detail-wrapper-description-wrapper-right-add-to-cart-button{margin-left:auto;margin-right:auto}}',""])},136:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-detail",class:{"material-card":!t.loadingData},style:{"min-height":t.loadingData?"100vh":"fit-content"},attrs:{id:"app-detail"}},[i("div",{staticClass:"animated-loading-text",style:{display:t.loadingData?"block":"none"}},[t._v("\n        Loading\n    ")]),t._v(" "),i("div",{staticClass:"app-detail-title"},[t._v(t._s(t.name))]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.loadingData,expression:"!loadingData"}],staticClass:"app-detail-wrapper"},[i("div",{staticClass:"app-detail-wrapper-cover"},[t.isVideo(t.theaterImage)?i("video",{staticClass:"app-detail-wrapper-cover-theater",attrs:{autoplay:"",controls:""}},[i("source",{attrs:{src:t.theaterImage,type:"video/webm"}})]):i("img",{staticClass:"app-detail-wrapper-cover-theater",attrs:{src:t.theaterImage}}),t._v(" "),i("div",{staticClass:"app-detail-wrapper-cover-thumbnails-list"},t._l(t.thumbnails,function(e){return i("slideshow-thumb",{key:e.id,staticClass:"app-detail-wrapper-cover-thumbnails-list-item",class:{"app-detail-wrapper-cover-thumbnails-list-item-video":t.isVideoThumb(e.href)},attrs:{thumb:e},on:{updatethumbnailfocus:t.updateThumbnailFocus}})}))]),t._v(" "),i("div",{staticClass:"app-detail-wrapper-description"},[i("img",{staticClass:"app-detail-wrapper-description-image",attrs:{src:t.image}}),t._v(" "),i("div",{staticClass:"app-detail-wrapper-description-wrapper-right"},[i("div",{staticClass:"app-detail-wrapper-description-wrapper-right-content"},[t._v("\n                    "+t._s(t.description)+"\n                ")]),t._v(" "),i("div",{staticClass:"app-detail-wrapper-description-wrapper-right-price"},[t._v("\n                    $"+t._s(t.price)+"\n                ")]),t._v(" "),i("div",{staticClass:"app-detail-wrapper-description-wrapper-right-add-to-cart-button \n                        material-button",on:{click:t.addToCart}},[i("span",{staticClass:"fa fa-cart-plus"}),t._v("  Add to cart\n                ")])])])])])},staticRenderFns:[]}},140:function(t,e,i){var a=i(130);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i(3)("4bab3bad",a,!0)}});
//# sourceMappingURL=7.build.js.map