webpackJsonp([9],{115:function(t,i,o){function e(t){o(142)}var s=o(1)(o(127),o(138),e,null,null);t.exports=s.exports},127:function(t,i,o){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=o(39),s=o(7);i.default={props:["item"],data:function(){return{focused:!1}},methods:{emitFocusEvent:function(){this.$emit("updatechildfocus",this.item.code)},focus:function(){this.focused=!0},unfocus:function(){this.focused=!1},addToCart:function(){e.a.addItem(this.item.code),s.a.$emit("update-counter"),s.a.$emit("push-notification",this.item.name+" has been added to cart.")}}}},132:function(t,i,o){i=t.exports=o(2)(),i.push([t.i,".product-list-item{width:250px;height:117px;margin:32px;background:#fff;position:relative;transition-duration:.2s}.product-list-item-cover{width:100%;height:100%}.product-list-item-popup{width:100%;display:none;background:#fff;padding:16px;box-sizing:border-box}.product-list-item-popup a:hover,.product-list-item-popup a:link,.product-list-item-popup a:visited{text-decoration:none;color:gray}.product-list-item-popup-title{font-size:20px;width:100%;box-sizing:border-box;background:#fff}.product-list-item-popup-price{font-size:14px;font-weight:700;padding:8px}.product-list-item-popup-add-to-cart-button{width:100%;box-sizing:border-box;text-align:center}.product-list-item-popup-description{font-size:14px;width:100%;padding:10px;color:gray;background:#fff;box-sizing:border-box}.product-list-item-large{width:460px;height:fit-content;margin-left:calc(50% - 230px);margin-right:calc(50% - 230px)}",""])},138:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,o=t._self._c||i;return o("div",{key:t.item.code,staticClass:"product-list-item material-card",class:{"product-list-item-large ":t.focused},on:{click:t.emitFocusEvent}},[o("img",{staticClass:"product-list-item-cover",attrs:{src:t.item.image}}),t._v(" "),o("div",{staticClass:"product-list-item-popup",style:{display:t.focused?"block":"none"}},[o("router-link",{attrs:{to:{name:"app",params:{code:t.item.code}}}},[o("div",{staticClass:"product-list-item-popup-title"},[t._v("\n                "+t._s(t.item.name)+"  \n                "),o("small",[o("small",[o("span",{staticClass:"fa fa-info-circle"},[t._v("  Tap to view details")])])])])]),t._v(" "),o("p",{staticClass:"product-list-item-popup-description"},[t._v("\n            "+t._s(t.item.description)+"\n        ")]),t._v(" "),o("div",{staticClass:"product-list-item-popup-price"},[t._v("\n            $"+t._s(t.item.price)+"\n        ")]),t._v(" "),o("div",{staticClass:"product-list-item-popup-add-to-cart-button material-button",on:{click:function(i){t.addToCart(t.item)}}},[o("span",{staticClass:"fa fa-cart-plus"}),t._v("  Add to cart\n        ")])],1)])},staticRenderFns:[]}},142:function(t,i,o){var e=o(132);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);o(3)("15402677",e,!0)}});
//# sourceMappingURL=9.build.js.map