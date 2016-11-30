/*Тут у нас сжатый скрипт для работы ползунка цены, а ниже нормальный, читабельный скрипт фильтров*/
(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){t.ui=t.ui||{},t.ui.version="1.12.1";var e=0,i=Array.prototype.slice;t.cleanData=function(e){return function(i){var s,n,o;for(o=0;null!=(n=i[o]);o++)try{s=t._data(n,"events"),s&&s.remove&&t(n).triggerHandler("remove")}catch(a){}e(i)}}(t.cleanData),t.widget=function(e,i,s){var n,o,a,r={},l=e.split(".")[0];e=e.split(".")[1];var h=l+"-"+e;return s||(s=i,i=t.Widget),t.isArray(s)&&(s=t.extend.apply(null,[{}].concat(s))),t.expr[":"][h.toLowerCase()]=function(e){return!!t.data(e,h)},t[l]=t[l]||{},n=t[l][e],o=t[l][e]=function(t,e){return this._createWidget?(arguments.length&&this._createWidget(t,e),void 0):new o(t,e)},t.extend(o,n,{version:s.version,_proto:t.extend({},s),_childConstructors:[]}),a=new i,a.options=t.widget.extend({},a.options),t.each(s,function(e,s){return t.isFunction(s)?(r[e]=function(){function t(){return i.prototype[e].apply(this,arguments)}function n(t){return i.prototype[e].apply(this,t)}return function(){var e,i=this._super,o=this._superApply;return this._super=t,this._superApply=n,e=s.apply(this,arguments),this._super=i,this._superApply=o,e}}(),void 0):(r[e]=s,void 0)}),o.prototype=t.widget.extend(a,{widgetEventPrefix:n?a.widgetEventPrefix||e:e},r,{constructor:o,namespace:l,widgetName:e,widgetFullName:h}),n?(t.each(n._childConstructors,function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete n._childConstructors):i._childConstructors.push(o),t.widget.bridge(e,o),o},t.widget.extend=function(e){for(var s,n,o=i.call(arguments,1),a=0,r=o.length;r>a;a++)for(s in o[a])n=o[a][s],o[a].hasOwnProperty(s)&&void 0!==n&&(e[s]=t.isPlainObject(n)?t.isPlainObject(e[s])?t.widget.extend({},e[s],n):t.widget.extend({},n):n);return e},t.widget.bridge=function(e,s){var n=s.prototype.widgetFullName||e;t.fn[e]=function(o){var a="string"==typeof o,r=i.call(arguments,1),l=this;return a?this.length||"instance"!==o?this.each(function(){var i,s=t.data(this,n);return"instance"===o?(l=s,!1):s?t.isFunction(s[o])&&"_"!==o.charAt(0)?(i=s[o].apply(s,r),i!==s&&void 0!==i?(l=i&&i.jquery?l.pushStack(i.get()):i,!1):void 0):t.error("no such method '"+o+"' for "+e+" widget instance"):t.error("cannot call methods on "+e+" prior to initialization; "+"attempted to call method '"+o+"'")}):l=void 0:(r.length&&(o=t.widget.extend.apply(null,[o].concat(r))),this.each(function(){var e=t.data(this,n);e?(e.option(o||{}),e._init&&e._init()):t.data(this,n,new s(o,this))})),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(i,s){s=t(s||this.defaultElement||this)[0],this.element=t(s),this.uuid=e++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),this.classesElementLookup={},s!==this&&(t.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===s&&this.destroy()}}),this.document=t(s.style?s.ownerDocument:s.document||s),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),i),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){var e=this;this._destroy(),t.each(this.classesElementLookup,function(t,i){e._removeClass(i,t)}),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:t.noop,widget:function(){return this.element},option:function(e,i){var s,n,o,a=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(a={},s=e.split("."),e=s.shift(),s.length){for(n=a[e]=t.widget.extend({},this.options[e]),o=0;s.length-1>o;o++)n[s[o]]=n[s[o]]||{},n=n[s[o]];if(e=s.pop(),1===arguments.length)return void 0===n[e]?null:n[e];n[e]=i}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];a[e]=i}return this._setOptions(a),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return"classes"===t&&this._setOptionClasses(e),this.options[t]=e,"disabled"===t&&this._setOptionDisabled(e),this},_setOptionClasses:function(e){var i,s,n;for(i in e)n=this.classesElementLookup[i],e[i]!==this.options.classes[i]&&n&&n.length&&(s=t(n.get()),this._removeClass(n,i),s.addClass(this._classes({element:s,keys:i,classes:e,add:!0})))},_setOptionDisabled:function(t){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!t),t&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(e){function i(i,o){var a,r;for(r=0;i.length>r;r++)a=n.classesElementLookup[i[r]]||t(),a=e.add?t(t.unique(a.get().concat(e.element.get()))):t(a.not(e.element).get()),n.classesElementLookup[i[r]]=a,s.push(i[r]),o&&e.classes[i[r]]&&s.push(e.classes[i[r]])}var s=[],n=this;return e=t.extend({element:this.element,classes:this.options.classes||{}},e),this._on(e.element,{remove:"_untrackClassesElement"}),e.keys&&i(e.keys.match(/\S+/g)||[],!0),e.extra&&i(e.extra.match(/\S+/g)||[]),s.join(" ")},_untrackClassesElement:function(e){var i=this;t.each(i.classesElementLookup,function(s,n){-1!==t.inArray(e.target,n)&&(i.classesElementLookup[s]=t(n.not(e.target).get()))})},_removeClass:function(t,e,i){return this._toggleClass(t,e,i,!1)},_addClass:function(t,e,i){return this._toggleClass(t,e,i,!0)},_toggleClass:function(t,e,i,s){s="boolean"==typeof s?s:i;var n="string"==typeof t||null===t,o={extra:n?e:i,keys:n?t:e,element:n?this.element:t,add:s};return o.element.toggleClass(this._classes(o),s),this},_on:function(e,i,s){var n,o=this;"boolean"!=typeof e&&(s=i,i=e,e=!1),s?(i=n=t(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),t.each(s,function(s,a){function r(){return e||o.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof a?o[a]:a).apply(o,arguments):void 0}"string"!=typeof a&&(r.guid=a.guid=a.guid||r.guid||t.guid++);var l=s.match(/^([\w:-]*)\s*(.*)$/),h=l[1]+o.eventNamespace,c=l[2];c?n.on(h,c,r):i.on(h,r)})},_off:function(e,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.off(i).off(i),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){this._addClass(t(e.currentTarget),null,"ui-state-hover")},mouseleave:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){this._addClass(t(e.currentTarget),null,"ui-state-focus")},focusout:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-focus")}})},_trigger:function(e,i,s){var n,o,a=this.options[e];if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!(t.isFunction(a)&&a.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){"string"==typeof n&&(n={effect:n});var a,r=n?n===!0||"number"==typeof n?i:n.effect||i:e;n=n||{},"number"==typeof n&&(n={duration:n}),a=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),a&&t.effects&&t.effects.effect[r]?s[e](n):r!==e&&s[r]?s[r](n.duration,n.easing,o):s.queue(function(i){t(this)[e](),o&&o.call(s[0]),i()})}}),t.widget,t.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38},t.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());var s=!1;t(document).on("mouseup",function(){s=!1}),t.widget("ui.mouse",{version:"1.12.1",options:{cancel:"input, textarea, button, select, option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.on("mousedown."+this.widgetName,function(t){return e._mouseDown(t)}).on("click."+this.widgetName,function(i){return!0===t.data(i.target,e.widgetName+".preventClickEvent")?(t.removeData(i.target,e.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.off("."+this.widgetName),this._mouseMoveDelegate&&this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(e){if(!s){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(e),this._mouseDownEvent=e;var i=this,n=1===e.which,o="string"==typeof this.options.cancel&&e.target.nodeName?t(e.target).closest(this.options.cancel).length:!1;return n&&!o&&this._mouseCapture(e)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(e)!==!1,!this._mouseStarted)?(e.preventDefault(),!0):(!0===t.data(e.target,this.widgetName+".preventClickEvent")&&t.removeData(e.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(t){return i._mouseMove(t)},this._mouseUpDelegate=function(t){return i._mouseUp(t)},this.document.on("mousemove."+this.widgetName,this._mouseMoveDelegate).on("mouseup."+this.widgetName,this._mouseUpDelegate),e.preventDefault(),s=!0,!0)):!0}},_mouseMove:function(e){if(this._mouseMoved){if(t.ui.ie&&(!document.documentMode||9>document.documentMode)&&!e.button)return this._mouseUp(e);if(!e.which)if(e.originalEvent.altKey||e.originalEvent.ctrlKey||e.originalEvent.metaKey||e.originalEvent.shiftKey)this.ignoreMissingWhich=!0;else if(!this.ignoreMissingWhich)return this._mouseUp(e)}return(e.which||e.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==!1,this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(e){this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,e.target===this._mouseDownEvent.target&&t.data(e.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(e)),this._mouseDelayTimer&&(clearTimeout(this._mouseDelayTimer),delete this._mouseDelayTimer),this.ignoreMissingWhich=!1,s=!1,e.preventDefault()},_mouseDistanceMet:function(t){return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),t.widget("ui.slider",t.ui.mouse,{version:"1.12.1",widgetEventPrefix:"slide",options:{animate:!1,classes:{"ui-slider":"ui-corner-all","ui-slider-handle":"ui-corner-all","ui-slider-range":"ui-corner-all ui-widget-header"},distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this._addClass("ui-slider ui-slider-"+this.orientation,"ui-widget ui-widget-content"),this._refresh(),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var e,i,s=this.options,n=this.element.find(".ui-slider-handle"),o="<span tabindex='0'></span>",a=[];for(i=s.values&&s.values.length||1,n.length>i&&(n.slice(i).remove(),n=n.slice(0,i)),e=n.length;i>e;e++)a.push(o);this.handles=n.add(t(a.join("")).appendTo(this.element)),this._addClass(this.handles,"ui-slider-handle","ui-state-default"),this.handle=this.handles.eq(0),this.handles.each(function(e){t(this).data("ui-slider-handle-index",e).attr("tabIndex",0)})},_createRange:function(){var e=this.options;e.range?(e.range===!0&&(e.values?e.values.length&&2!==e.values.length?e.values=[e.values[0],e.values[0]]:t.isArray(e.values)&&(e.values=e.values.slice(0)):e.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?(this._removeClass(this.range,"ui-slider-range-min ui-slider-range-max"),this.range.css({left:"",bottom:""})):(this.range=t("<div>").appendTo(this.element),this._addClass(this.range,"ui-slider-range")),("min"===e.range||"max"===e.range)&&this._addClass(this.range,"ui-slider-range-"+e.range)):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this._mouseDestroy()},_mouseCapture:function(e){var i,s,n,o,a,r,l,h,c=this,u=this.options;return u.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:e.pageX,y:e.pageY},s=this._normValueFromMouse(i),n=this._valueMax()-this._valueMin()+1,this.handles.each(function(e){var i=Math.abs(s-c.values(e));(n>i||n===i&&(e===c._lastChangedValue||c.values(e)===u.min))&&(n=i,o=t(this),a=e)}),r=this._start(e,a),r===!1?!1:(this._mouseSliding=!0,this._handleIndex=a,this._addClass(o,null,"ui-state-active"),o.trigger("focus"),l=o.offset(),h=!t(e.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=h?{left:0,top:0}:{left:e.pageX-l.left-o.width()/2,top:e.pageY-l.top-o.height()/2-(parseInt(o.css("borderTopWidth"),10)||0)-(parseInt(o.css("borderBottomWidth"),10)||0)+(parseInt(o.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(e,a,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(t){var e={x:t.pageX,y:t.pageY},i=this._normValueFromMouse(e);return this._slide(t,this._handleIndex,i),!1},_mouseStop:function(t){return this._removeClass(this.handles,null,"ui-state-active"),this._mouseSliding=!1,this._stop(t,this._handleIndex),this._change(t,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(t){var e,i,s,n,o;return"horizontal"===this.orientation?(e=this.elementSize.width,i=t.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(e=this.elementSize.height,i=t.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/e,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),n=this._valueMax()-this._valueMin(),o=this._valueMin()+s*n,this._trimAlignValue(o)},_uiHash:function(t,e,i){var s={handle:this.handles[t],handleIndex:t,value:void 0!==e?e:this.value()};return this._hasMultipleValues()&&(s.value=void 0!==e?e:this.values(t),s.values=i||this.values()),s},_hasMultipleValues:function(){return this.options.values&&this.options.values.length},_start:function(t,e){return this._trigger("start",t,this._uiHash(e))},_slide:function(t,e,i){var s,n,o=this.value(),a=this.values();this._hasMultipleValues()&&(n=this.values(e?0:1),o=this.values(e),2===this.options.values.length&&this.options.range===!0&&(i=0===e?Math.min(n,i):Math.max(n,i)),a[e]=i),i!==o&&(s=this._trigger("slide",t,this._uiHash(e,i,a)),s!==!1&&(this._hasMultipleValues()?this.values(e,i):this.value(i)))},_stop:function(t,e){this._trigger("stop",t,this._uiHash(e))},_change:function(t,e){this._keySliding||this._mouseSliding||(this._lastChangedValue=e,this._trigger("change",t,this._uiHash(e)))},value:function(t){return arguments.length?(this.options.value=this._trimAlignValue(t),this._refreshValue(),this._change(null,0),void 0):this._value()},values:function(e,i){var s,n,o;if(arguments.length>1)return this.options.values[e]=this._trimAlignValue(i),this._refreshValue(),this._change(null,e),void 0;if(!arguments.length)return this._values();if(!t.isArray(arguments[0]))return this._hasMultipleValues()?this._values(e):this.value();for(s=this.options.values,n=arguments[0],o=0;s.length>o;o+=1)s[o]=this._trimAlignValue(n[o]),this._change(null,o);this._refreshValue()},_setOption:function(e,i){var s,n=0;switch("range"===e&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),t.isArray(this.options.values)&&(n=this.options.values.length),this._super(e,i),e){case"orientation":this._detectOrientation(),this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-"+this.orientation),this._refreshValue(),this.options.range&&this._refreshRange(i),this.handles.css("horizontal"===i?"bottom":"left","");break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=n-1;s>=0;s--)this._change(null,s);this._animateOff=!1;break;case"step":case"min":case"max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_setOptionDisabled:function(t){this._super(t),this._toggleClass(null,"ui-state-disabled",!!t)},_value:function(){var t=this.options.value;return t=this._trimAlignValue(t)},_values:function(t){var e,i,s;if(arguments.length)return e=this.options.values[t],e=this._trimAlignValue(e);if(this._hasMultipleValues()){for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(t){if(this._valueMin()>=t)return this._valueMin();if(t>=this._valueMax())return this._valueMax();var e=this.options.step>0?this.options.step:1,i=(t-this._valueMin())%e,s=t-i;return 2*Math.abs(i)>=e&&(s+=i>0?e:-e),parseFloat(s.toFixed(5))},_calculateNewMax:function(){var t=this.options.max,e=this._valueMin(),i=this.options.step,s=Math.round((t-e)/i)*i;t=s+e,t>this.options.max&&(t-=i),this.max=parseFloat(t.toFixed(this._precision()))},_precision:function(){var t=this._precisionOf(this.options.step);return null!==this.options.min&&(t=Math.max(t,this._precisionOf(this.options.min))),t},_precisionOf:function(t){var e=""+t,i=e.indexOf(".");return-1===i?0:e.length-i-1},_valueMin:function(){return this.options.min},_valueMax:function(){return this.max},_refreshRange:function(t){"vertical"===t&&this.range.css({width:"",left:""}),"horizontal"===t&&this.range.css({height:"",bottom:""})},_refreshValue:function(){var e,i,s,n,o,a=this.options.range,r=this.options,l=this,h=this._animateOff?!1:r.animate,c={};this._hasMultipleValues()?this.handles.each(function(s){i=100*((l.values(s)-l._valueMin())/(l._valueMax()-l._valueMin())),c["horizontal"===l.orientation?"left":"bottom"]=i+"%",t(this).stop(1,1)[h?"animate":"css"](c,r.animate),l.options.range===!0&&("horizontal"===l.orientation?(0===s&&l.range.stop(1,1)[h?"animate":"css"]({left:i+"%"},r.animate),1===s&&l.range[h?"animate":"css"]({width:i-e+"%"},{queue:!1,duration:r.animate})):(0===s&&l.range.stop(1,1)[h?"animate":"css"]({bottom:i+"%"},r.animate),1===s&&l.range[h?"animate":"css"]({height:i-e+"%"},{queue:!1,duration:r.animate}))),e=i}):(s=this.value(),n=this._valueMin(),o=this._valueMax(),i=o!==n?100*((s-n)/(o-n)):0,c["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[h?"animate":"css"](c,r.animate),"min"===a&&"horizontal"===this.orientation&&this.range.stop(1,1)[h?"animate":"css"]({width:i+"%"},r.animate),"max"===a&&"horizontal"===this.orientation&&this.range.stop(1,1)[h?"animate":"css"]({width:100-i+"%"},r.animate),"min"===a&&"vertical"===this.orientation&&this.range.stop(1,1)[h?"animate":"css"]({height:i+"%"},r.animate),"max"===a&&"vertical"===this.orientation&&this.range.stop(1,1)[h?"animate":"css"]({height:100-i+"%"},r.animate))},_handleEvents:{keydown:function(e){var i,s,n,o,a=t(e.target).data("ui-slider-handle-index");switch(e.keyCode){case t.ui.keyCode.HOME:case t.ui.keyCode.END:case t.ui.keyCode.PAGE_UP:case t.ui.keyCode.PAGE_DOWN:case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(e.preventDefault(),!this._keySliding&&(this._keySliding=!0,this._addClass(t(e.target),null,"ui-state-active"),i=this._start(e,a),i===!1))return}switch(o=this.options.step,s=n=this._hasMultipleValues()?this.values(a):this.value(),e.keyCode){case t.ui.keyCode.HOME:n=this._valueMin();break;case t.ui.keyCode.END:n=this._valueMax();break;case t.ui.keyCode.PAGE_UP:n=this._trimAlignValue(s+(this._valueMax()-this._valueMin())/this.numPages);break;case t.ui.keyCode.PAGE_DOWN:n=this._trimAlignValue(s-(this._valueMax()-this._valueMin())/this.numPages);break;case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:if(s===this._valueMax())return;n=this._trimAlignValue(s+o);break;case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(s===this._valueMin())return;n=this._trimAlignValue(s-o)}this._slide(e,a,n)},keyup:function(e){var i=t(e.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(e,i),this._change(e,i),this._removeClass(t(e.target),null,"ui-state-active"))}}})});
/*
##################
####js-filters####
##################
*/
/*если у поля есть клаcc js_numeric - запрет на ввод в него других символов*/
$(document).on('keypress', '.js_numeric', function (e) {e = e || event;if (e.keyCode == 37) {}if (e.keyCode == 39 || e.keyCode == 8) {}if (e.ctrlKey || e.altKey || e.metaKey) return;var chr = getChar(e);if (chr == null) return; if (chr < '0' || chr > '9') {return false;}});


/*js-класс для обработки фильтров*/
var csf = {	
		
	his_url : location.href,	
	main : false,	
	last_url : '',	
	
	/* история смены url без изменения location.href */
	my_history : function(url,title,data,back){
		url   = ( url == undefined ) ? location.href : url.replace("//filter","/filter").replace("//page","/page");
		data  = ( data == undefined ) ? false : data;
		back  = ( back == undefined ) ? false : true;
		title = ( title == undefined ) ? location.title : title;
				
		var historyURL={
			url  : url,
			data : data
		}
		if(back || csf.his_url==url) history.replaceState(historyURL, title, url);
		else 
		{
			history.pushState(historyURL, title, url);
		}
		csf.his_url = url;
		return csf.his_url;
	},

	uget  : '',
	
	/* если на странице есть элемент #search-filter-box и у него есть data-start-url, то запрос будет посылаться туда. По умолчанию - посылается по location.href 
	 это нужно для того, чтобы... если фильтры расположены не на странице каталога, а, например, на главной - запрос должен идти к контроллеру каталога, то есть, в data-start-url указывается ссылка на страницу каталога. А если нужно фильтровать товары из какой-то категории - то ссылка на нее 
	*/
	start_url  : function(){
		var surl = $('#search-filter-box').attr('data-start-url');
		obr  = (surl)?surl:location.href;
		obr0 = obr.split("?");	csf.uget = obr0[1];
		obr1 = obr0[0].split("/filter/");
		obr2 = obr1[0].split("/page");
		return obr2[0];
	},
	check_filters  : {},
	
	sbor_action_filters  : function($elem){
		var k = $elem.attr('data-filter-s');
		var g = $elem.attr('data-filter-g');
		var v = $elem.val();
					
		csf.sborka_filters(k,v,g);
	},
	check_checked_box  : function(cl){
		if(cl)
		$('.'+cl).addClass('js-selected-filter');
	},
	uncheck_checked_box  : function(cl){
		cl = (cl)?cl:"js-filter-box";
		$('.'+cl).removeClass('js-selected-filter');
	},
	sborka_filters  : function(k,v,g){
		if(k && v!=''){
			if(!csf.check_filters[k]){
				csf.check_filters[k] = [];
			}
			csf.check_filters[k].push(v);
			//
			if(k == 'min' || k == 'max'){
				var slide_obj = $("#js-slider_price");
				var vv = (k == 'min')?slide_obj.attr("data-min"):slide_obj.attr("data-max");
				if(vv==v)return false;
			}
			csf.check_checked_box(g);
		}
	},

	group_separator: '=',
	groups_separator: ';',
	filter_separator: ',',
	create_url  : function(){
		var new_url = '';
		if(csf.check_filters){
			for ( i in csf.check_filters ){ 
				var jj = csf.check_filters[i].length;
				new_url += i + csf.group_separator;
				for (var j = 0; j < jj; j++){
					if(j > 0) {
						new_url += csf.filter_separator;
					}
					new_url += encodeURIComponent(csf.check_filters[i][j]);
					if(j == jj-1) {
						new_url += csf.groups_separator;
					}
				}
			}
			if(new_url != '') {
				return '/filter/'+new_url;				
			}
			
		}
	},
	route : 'product',
	razborka_filters  : function(f,v){
		if(f=='max' || f=='min'){
								
		}else{
			$(".js-filters input[value='"+v+"']").each(function(){
					if($(this).attr('data-filter-s')==f){
						if($(this).prop('type') == 'checkbox'){
							$(this).prop("checked", true).parent().addClass('checked');	
							if($(this).prev().is(".color-box")){
								$(this).prev().addClass('checked');	
							}
					}
				}	
			});
		}
	},
	checked_input: function(){
			
		var encode_url = location.href.split('/filter/');
		if(encode_url[1]){
			if(encode_url[1].substring(encode_url[1].length - 1) == '/'){
				encode_url[1] = encode_url[1].substring(0, encode_url[1].length - 1)
			}
			groups = decodeURIComponent(encode_url[1]).split(csf.groups_separator);
			for(i in groups){
				group = groups[i].split(csf.group_separator);
				if(group[0] && group[1]){
					k = group[0];
					filters = group[1].split(csf.filter_separator);
					for(x in filters){
						v = filters[x];
						csf.razborka_filters(k,v);
					}
				}
			}
		}
		csf.add_rez_filter();
	},
	MorePrStart  : false,
	MorePr  : function(act){
		if(csf.MorePrStart) return false;
		csf.MorePrStart = true;
		afa.a("csf.MorePrStart = false;");
		csf.uncheck_checked_box();
		csf.check_filters = new Array();
		$(".js-filters input[type='checkbox']:checked").each(function(){
			csf.sbor_action_filters($(this));
		});
		$(".js-filters input[type='text']").each(function(){
			csf.sbor_action_filters($(this));
		});
		$(".js-filters input[type='hidden']").each(function(){
			csf.sbor_action_filters($(this));
		});
		
		csf.last_url = csf.create_url();
		if($(".js-selected-filter").length>0)csf.hasFilter(true);else csf.hasFilter(false);
		csf.add_rez_filter();
		
		if(act == undefined) csf.search_start.show();
		
	},
	
	
	add_rez_filter : function(){
				
				var $box = $(".js-select_resoult");
				if($box.length == 0){
					$("#js-search-filter-box").append('<div class="js-select_resoult"></div>');
					$box = $(".js-select_resoult");
				}
				$box.html('');
				var pname = '';
				var pid = '';
				$(".js-selected-filter input[type=checkbox]:checked").each(function(){
						pname = '';
						if($(this).parent().hasClass('checkbox')){
							pname = $(this).parent().text();							
						}else
						if($(this).prev().is(".color-box")){
							pname = $(this).prev().attr('title');
						}
						pid = $(this).attr("id");
						if(pid) csf.delfilter($box,pname,pid);
						
				});
									
				var slider_price = $(".js-selected-filter #js-slider_price");
				if(slider_price.length > 0){
					pid = 'price';
					pname = 'от '+$("#js-minCost").val()+' до '+$("#js-maxCost").val()+' <span class="rouble">р</span>';
					csf.delfilter($box,pname,pid);
				} 

	},
	
	
	delfilter  : function(box,pname,pid){	
		box.append("<span class='js-delfilter'>"+pname+"<span class='js-button-filter-del'  data-filter-id='"+pid+"'><span class='icon icon-x_2px'></span> </span></span>");
	},
	
	
	search_start  : {
		clear: false,
		change_url: true,
		reload: 0,
		limit : 18,
		page  : 1,
		last  : 0,
		show  : function(){	
					csf.search_start.page=1;
					csf.search_start.search();
				},
		more  : function(){
					csf.change_url = false;
					csf.search_start.page++;
					csf.search_start.search();
				},
		search: function(){
			
				var $botton_more = $(".filter-search-more."+csf.route);
				
				
				
				if(csf.last_url == ''){
					csf.MorePr(false);
				}
				
				var ready_url = ''; 
				if(csf.start_url()  != undefined) ready_url = csf.start_url(); 
				
				if(csf.search_start.clear == false){
					
					if(csf.last_url  != undefined) ready_url += csf.last_url;
					
					if(csf.search_start.page > 1){
						ready_url+='/page='+csf.search_start.page;
						$botton_more.addClass('loading');
					}else{
						$botton_more.hide();
						$('.'+csf.route+'-box').html('').addClass('loading');
					}
					
					if(csf.uget != '' && csf.uget != undefined ){
						ready_url+='?'+csf.uget;
					}
				}else csf.search_start.clear = false;
				
				if(csf.change_url)ready_url = csf.my_history(ready_url);
				csf.change_url = true;
				//если указать особый класс кнопке, то она не пошлет ajax-запрос, а переадресует 
				if( $(".js-start-filter.startfilter").length > 0 ){
					//сюда можно любое условие, главное, придумать, когда отправлять запрос, а когда перенаправлять пользователя
					location.href=ready_url;
				}
				var v = $('#csf-limit').val();if(v>0)csf.search_start.limit = v;
				var data = {alax_by_filter:1,limit:csf.search_start.limit};
				if(csf.main)data.main = 1;
				
				$.get(
					ready_url,
					data,
					function(ar){
							
							if(ar.total) {
								/*
								total_ = (ar.total<20)? ar.total : ar.total%10;
								if(total_ == 1){na = "модель";}
								else
								if(total_ > 1 && total_ < 5 ){na = "модели";}
								else{na = "моделей";}
								*/
								$('.'+csf.route+'-total').html('Найдено: '+ar.total);
								$('.'+csf.route+'-total-num').html(ar.total);
							}else{
								if(ar.count==0){ ar.text = "Извините, ничего не найдено";}
							}
							
							$botton_more.removeClass('loading');
							
							//console.log(ar.count,csf.search_start.limit);
							if(ar.count==csf.search_start.limit) {
								$botton_more.show();
							}
							
							csf.search_start.last = location.href;
							
							if( csf.search_start.page == 1 ) $('.'+csf.route+'-box').html(ar.text).removeClass('loading');
							else {
								$('.'+csf.route+'-box').append(ar.text);
							} 
							
							$('#'+csf.route+'-pages').html(ar.pagination);
							
							//скроем показать еще если есть пагинация
							if(ar.total < csf.search_start.limit*csf.search_start.page) $botton_more.hide();							
					},
					'json');
		},
	},
	
	
	
	label_checked  : function(lebel,start){
			var id = lebel.attr('data-for');
			var ch = document.getElementById(id);
			if(start) {
				if(ch.checked){
					lebel.addClass('checked');
				}else {
					lebel.removeClass('checked');
				}
			}
			else{

			if( lebel.hasClass('checked') ) {
					lebel.removeClass('checked');
					ch.checked = false;
				}	
				else  {
					lebel.addClass('checked');
					ch.checked = true;
				}	
				csf.MorePr();
			}
		},
	hasFilter  : function(act){
			var act = (act)?true:false;
			if(act){
				$('.js-clearfilter').show();
				$('body').addClass('js-has-filters');
			}else{
				$('.js-clearfilter').hide();
				$('body').removeClass('js-has-filters');
			}
		},
		sbros_price:function(){
			var slider_price = $("#js-slider_price");
			$("input#js-minCost").val(slider_price.attr('data-min')).trigger('change');
			$("input#js-maxCost").val(slider_price.attr('data-max')).trigger('change');
		}
	
};
	var filter_module = {page:1,route:'',filter_id:0};
	var show_close_clearfilter = function(){
		if($(".js-filters input[type='checkbox']").is(":checked")){
			//csf.hasFilter(1);
		}else{
			//csf.hasFilter();
		}
	};
$(window).ready(function(){
	
	$(".url.filter-search, .filter-mod-more").click(function(event){
		
		
		if($(this).hasClass('act')) return false;
		var filter_id = $(this).attr('data-filter-id');
		var route = $(this).attr('data-filter-route');
		
		if(!$(this).hasClass('filter-mod-more')){
			
			$(this).parent().find(".url.filter-search").removeClass('act');
			$(this).addClass('act');
			
		}
		
		if(route){
				switch(route){
					case 'latest': url = '/index.php?route=module/latest/index';break;
					case 'bestseller': url = '/index.php?route=module/bestseller/index';break;
				}
				
				/*несколько роутов на одной странице работать не будут, нужно дописать условия*/
				if(filter_module.filter_id == filter_id) filter_module.page++;
				else filter_module.page = 1;					
				var page = filter_module.page;
				filter_module.filter_id = filter_id;
				
				var data = {alax_by_filter:1,page: page};
				
				var $buttom = $(".filter-mod-more."+route);
				var $box = $("."+route+"-box");
				
				if(page == 1)$box.html('').addClass('preload');
				else $buttom.addClass('preload');
						
				if(filter_id){
					data.filter_id = filter_id;
				}
				$.get(
					url,
					data,
					function(ar){
						
						$buttom.attr('data-filter-id',ar.filter_id).removeClass('preload').hide();
						
						
						if(ar.count == 0) ar.text='<!--div class="col-xs-12 text-center">Извините, больше ничего не найдено</div-->';
						else if(ar.count == ar.limit)	$buttom.show();
						
						if(page == 1)$box.removeClass('preload').html(ar.text);
						else $box.append(ar.text);
						
						if(typeof 'fixDivSet')fixDivSet();		
						
							
					},
					'json');
		}
		
	});
	
	
	
	
	
	$(".filter-search-more").click(function(event){
		csf.search_start.more();
	});
	
	
	
	$(".js-clearfilter").click(function(event){
		
		$(".js-filters input[type='checkbox']:checked").each(function(){
			f = $(this).attr('data-filter-s');
			if(f){
				$(this).prop("checked", false).trigger('change');
			}
		});
		csf.sbros_price();
		csf.search_start.clear = true;
		csf.MorePr();
	});
	
	$(document).on("click",".js-button-filter-del",function(event){
		var cl = $(this).attr("data-filter-del");
		if(cl){
			var slider_price = $("."+cl+" #js-slider_price");
			if(slider_price.length > 0) csf.sbros_price();
			$(".js-filters ."+cl+" input[type='checkbox']:checked").each(function(){
				f = $(this).attr('data-filter-s');
				if(f){
					$(this).prop("checked", false).trigger('change');
				}
			});
		}else{
			var fid = $(this).attr("data-filter-id");
			if(fid){
				if(fid == 'price')csf.sbros_price();
				else $("#"+fid).prop("checked", false).trigger('change');
			}
			$(this).parent().remove();
		}
		csf.search_start.clear = true;
		csf.MorePr();
	});
	
	
	
	var go_sfg = function(){
		//Проверка, есть ли кропка "Пприменить" на странице
		//Если нет, то посылаем запрос на сервер		
		//Можно сделать, чтобы на мобильной запросы не посылались, пока не кликнешь по Применить.
		if( ($(".js-start-filter").length == 0 && $(window).width() > 768) || ($(".js-start-filter-mob").length == 0 && $(window).width() < 769) )csf.MorePr();
	};
	
	$(document).on("change",".js-filters input[type='checkbox']",function(event){go_sfg();});
	
	
	
	$("#js-slider_price").mouseup(function(){

		if(	$("input#js-minCost").val() != $(this).attr('last_min') || $("input#js-maxCost").val() != $(this).attr('last_max') )	{
			
				go_sfg();
				$(this).attr('last_min',$("input#js-minCost").val()).attr('last_max',$("input#js-maxCost").val());
		}	
	});	

	
	
	var otl = {
		init:false,
		go:function(){
			if(otl.init)clearTimeout(otl.init);
			otl.init = setTimeout(
				function(){
					go_sfg();
				},500
			);
		}
	};
	$("input#js-minCost,input#js-maxCost").change(function(){
		if($(this).attr('last-value') != $(this).val()) 
			otl.go();
	});
	$("input#js-minCost,input#js-maxCost").keyup(function(){
		if($(this).attr('last-value') != $(this).val()) 
			otl.go();
	});
	
	
	
	$(".js-start-filter,.js-start-filter-mob").click(function(){
		csf.change_url = true;
		csf.MorePr();
		var dd = $(this).attr("data-id-dd");
		if(dd)setTimeout(function(){ $('.dropdown.'+dd+' .dropdown-toggle').dropdown('toggle'); },10);
	});
	
	
		
	
	if($(".js-filters input[type='checkbox']").is(":checked")){	
		csf.MorePr(false);
	}else{
		csf.checked_input();	
	}
	
	
	
	
	
	
	
	
	$("input.js-df-flag").change(function(){
		csf.MorePr();
	});
	
	
	
	$(document).on("click",".delfilter",function(){
		var $filter = $("#"+$(this).attr('data-filterid'));
		$filter.trigger('click');
		if($filter.prev().hasClass("color-box")){
			$filter.prev().removeClass('checked');	
		}
		csf.MorePr();
	});
	
	
	
	
	$(".js-filters .dropdown .dropdown-menu").addClass("pull-right");
	var dropdown_right = [];
	$(".js-filters .dropdown").each(function(i,l){
		var l = $(this).offset().left;
		if(dropdown_right.length > 0){
			if(dropdown_right[dropdown_right.length-1] < l)
				$(".js-filters .dropdown").eq(i-1).find(".dropdown-menu").removeClass("pull-right");
		}
		dropdown_right[dropdown_right.length]=l;
		console.log(l);
	});
	
	
	/* для фильтров типа цвет */
	
	$("label.color-box").click(function(){
		csf.label_checked($(this),false);
	});
	$("label.color-box").each(function(i,l){
		csf.label_checked($(this),true);
	});
	
	
	/*
	#########################
	###для фильтров в popup##
	#########################
	*/
	$(".js-filters .radio input[type=checkbox]").change(function(){
		//show_close_clearfilter();
	});
	
	$(".opbut").click(function(){
		$parent = $(this).parent();
		if($(this).hasClass('cancel')){
			$parent.find(".radio input[type=checkbox]").attr('checked',false).parent().removeClass('checked');
			csf.add_rez_filter();
			csf.MorePr();
		}
		
		$('body').removeClass("mob_fixed");
		$parent.parent().removeClass("open");
		
	});
	
	
	$("#filter_pop_box .filter-list.show_selected  div.name-filter,#cats_pop_box .cat_link.full > a").click(function(event){
		//if( $(window).width() > 750 ) return true;
		event.preventDefault();
		var $parent = $(this).parent();
		var $next = $(this).next();
		if($next.hasClass("op")){
			$('body').addClass("mob_fixed");
			var height = window.innerHeight ? window.innerHeight : $(window).height();
			$next.css({'top':$(window).scrollTop()+'px','height':height+'px !important'});
		}
		if(!$parent.hasClass('open')){
			$parent.addClass('open');
		}else{
			$parent.removeClass('open');
		}
		
	});
	
	$("#cats_pop").click(function(){
		show_close_clearfilter($("#cats_pop_box"));
	});
	$("#filter_pop").click(function(){
		show_close_clearfilter($("#filter_pop_box"));
	});
	
					
	var max_price_ = $("#js-slider_price").attr("data-max")*1;
	var min_price_ = $("#js-slider_price").attr("data-min")*1;
	if(min_price_<0){min_price_=0;}

	var h = 1;

	var max_price = max_price_ + h;
	var min_price = min_price_ - h;
	if(min_price<0){min_price=0;}


	var hashar = location.hash.replace("#","").split('_');

	if(hashar[0]=='product'){							
			for(var x = 2 ; x < hashar.length ; x = x + 2 ){	
				y = x - 1;						
				f = hashar[y];
				v = hashar[x];
				
				if(f=='max') {
					max_price_ = v;
				}
				else if(f=='min'){
					min_price_ = v;
				}
			}
	}

	/* слайдер цен */

	$("#js-slider_price").slider({
		min: min_price,
		max: max_price,
		values: [min_price_,max_price_],
		range: true,
		stop: function(event, ui) {
			$("input#js-minCost").val(ui.values[ 0 ]);
			$("input#js-maxCost").val(ui.values[ 1 ]);
			
		},
		slide: function(event, ui){
			$("input#js-minCost").val(ui.values[ 0 ]);
			$("input#js-maxCost").val(ui.values[ 1 ]);
		}
	});
		
	$("input#js-minCost").val(min_price_);
	$("input#js-maxCost").val(max_price_);

	$("input#js-minCost").change(function(){

		var value1=$("input#js-minCost").val();
		var value2=$("input#js-maxCost").val();

		if(parseInt(value1) > parseInt(value2)){
			value1 = value2;
			$("input#js-minCost").val(value1);
		}
		
		if (value1 < min_price) { value1 = min_price; $("input#js-minCost").val(value1)}
		
		$("#js-slider_price").slider("values",0,value1);	
	});

		
	$("input#js-maxCost").change(function(){
			
		var value1=$("input#js-minCost").val();
		var value2=$("input#js-maxCost").val();
		
		if (value2 > max_price) { value2 = max_price; $("input#js-maxCost").val(value2)}

		if(parseInt(value1) > parseInt(value2)){
			value2 = value1;
			$("input#js-maxCost").val(value2);
		}
		$("#js-slider_price").slider("values",1,value2);
	});

	var interval;
	var interval_go = function(id){
		$("input#"+id).trigger('change');
	};
	$("input#js-minCost,input#js-maxCost").keypress(function(){
		var id = $(this).attr('id');
		if(interval) clearTimeout(interval);
		interval = setTimeout(function(){
			interval_go(id);
		},500);
			
	});


	// фильтрация ввода в поля
	$('input.numeric').keypress(function(event){
		var key, keyChar;
		if(!event) var event = window.event;
		
		if (event.keyCode) key = event.keyCode;
		else if(event.which) key = event.which;
	
		if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
		keyChar=String.fromCharCode(key);
		
		if(!/\d/.test(keyChar))	return false;
	
	});


			
});