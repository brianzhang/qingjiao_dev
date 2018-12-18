// CodeMirror  5.8.1, copyright (c) by Marijn Haverbeke and others 
// Distributed under an MIT license: http://codemirror.net/LICENSE

// This is CodeMirror (http://codemirror.net), a code editor
// implemented in JavaScript on top of the browser's DOM.
//
// You can find some technical background for some of the code below
// at http://marijnhaverbeke.nl/blog/#cm-internals .
//zxh 增加了关键字和自定义属性
!function(e){if("object"==typeof exports&&"object"==typeof module)module.exports=e()
else{if("function"==typeof define&&define.amd)return define([],e)
this.CodeMirror=e()}}(function(){" "
function e(r,n){if(!(this instanceof e))return new e(r,n)
this.options=n=n?Ii(n):{},Ii(Qo,n,!1),d(n),e.keywords=n.keywords||[]
var i=n.value
"string"==typeof i&&(i=new Cl(i,n.mode,null,n.lineSeparator)),this.doc=i
var o=new e.inputStyles[n.inputStyle](this),l=this.display=new t(r,i,o)
l.wrapper.CodeMirror=this,u(this),s(this),n.lineWrapping&&(this.display.wrapper.className+=" CodeMirror-wrap"),n.autofocus&&!No&&l.input.focus(),m(this),this.state={keyMaps:[],overlays:[],modeGen:0,overwrite:!1,delayingBlurEvent:!1,focused:!1,suppressEdits:!1,pasteIncoming:!1,cutIncoming:!1,selectingText:!1,draggingText:!1,highlight:new Ai,keySeq:null,specialChars:null}
var a=this
yo&&11>bo&&setTimeout(function(){a.display.input.reset(!0)},20),Gt(this),_i(),bt(this),this.curOp.forceUpdate=!0,$n(this,i),n.autofocus&&!No||a.hasFocus()?setTimeout(zi(gr,this),20):vr(this)
for(var c in Jo)Jo.hasOwnProperty(c)&&Jo[c](this,n[c],el)
C(this),n.finishInit&&n.finishInit(this)
for(var h=0;h<il.length;++h)il[h](this)
xt(this),wo&&n.lineWrapping&&"optimizelegibility"==getComputedStyle(l.lineDiv).textRendering&&(l.lineDiv.style.textRendering="auto")}function t(e,t,r){var n=this
this.input=r,n.scrollbarFiller=Gi("div",null,"CodeMirror-scrollbar-filler"),n.scrollbarFiller.setAttribute("cm-not-content","true"),n.gutterFiller=Gi("div",null,"CodeMirror-gutter-filler"),n.gutterFiller.setAttribute("cm-not-content","true"),n.lineDiv=Gi("div",null,"CodeMirror-code"),n.selectionDiv=Gi("div",null,null,"position: relative; z-index: 1"),n.cursorDiv=Gi("div",null,"CodeMirror-cursors"),n.measure=Gi("div",null,"CodeMirror-measure"),n.lineMeasure=Gi("div",null,"CodeMirror-measure"),n.lineSpace=Gi("div",[n.measure,n.lineMeasure,n.selectionDiv,n.cursorDiv,n.lineDiv],null,"position: relative; outline: none"),n.mover=Gi("div",[Gi("div",[n.lineSpace],"CodeMirror-lines")],null,"position: relative"),n.sizer=Gi("div",[n.mover],"CodeMirror-sizer"),n.sizerWidth=null,n.heightForcer=Gi("div",null,null,"position: absolute; height: "+Hl+"px; width: 1px;"),n.gutters=Gi("div",null,"CodeMirror-gutters"),n.lineGutter=null,n.scroller=Gi("div",[n.sizer,n.heightForcer,n.gutters],"CodeMirror-scroll"),n.scroller.setAttribute("tabIndex","-1"),n.wrapper=Gi("div",[n.scrollbarFiller,n.gutterFiller,n.scroller],"CodeMirror"),yo&&8>bo&&(n.gutters.style.zIndex=-1,n.scroller.style.paddingRight=0),wo||go&&No||(n.scroller.draggable=!0),e&&(e.appendChild?e.appendChild(n.wrapper):e(n.wrapper)),n.viewFrom=n.viewTo=t.first,n.reportedViewFrom=n.reportedViewTo=t.first,n.view=[],n.renderedView=null,n.externalMeasured=null,n.viewOffset=0,n.lastWrapHeight=n.lastWrapWidth=0,n.updateLineNumbers=null,n.nativeBarWidth=n.barHeight=n.barWidth=0,n.scrollbarsClipped=!1,n.lineNumWidth=n.lineNumInnerWidth=n.lineNumChars=null,n.alignWidgets=!1,n.cachedCharWidth=n.cachedTextHeight=n.cachedPaddingH=null,n.maxLine=null,n.maxLineLength=0,n.maxLineChanged=!1,n.wheelDX=n.wheelDY=n.wheelStartX=n.wheelStartY=null,n.shift=!1,n.selForContextMenu=null,n.activeTouch=null,r.init(n)}function r(t){t.doc.mode=e.getMode(t.options,t.doc.modeOption),n(t)}function n(e){e.doc.iter(function(e){e.stateAfter&&(e.stateAfter=null),e.styles&&(e.styles=null)}),e.doc.frontier=e.doc.first,Fe(e,100),e.state.modeGen++,e.curOp&&Et(e)}function i(e){e.options.lineWrapping?(ql(e.display.wrapper,"CodeMirror-wrap"),e.display.sizer.style.minWidth="",e.display.sizerWidth=null):($l(e.display.wrapper,"CodeMirror-wrap"),f(e)),l(e),Et(e),lt(e),setTimeout(function(){y(e)},100)}function o(e){var t=mt(e.display),r=e.options.lineWrapping,n=r&&Math.max(5,e.display.scroller.clientWidth/yt(e.display)-3)
return function(i){if(xn(e.doc,i))return 0
var o=0
if(i.widgets)for(var l=0;l<i.widgets.length;l++)i.widgets[l].height&&(o+=i.widgets[l].height)
return r?o+(Math.ceil(i.text.length/n)||1)*t:o+t}}function l(e){var t=e.doc,r=o(e)
t.iter(function(e){var t=r(e)
t!=e.height&&Jn(e,t)})}function s(e){e.display.wrapper.className=e.display.wrapper.className.replace(/\s*cm-s-\S+/g,"")+e.options.theme.replace(/(^|\s)\s*/g," cm-s-"),lt(e)}function a(e){u(e),Et(e),setTimeout(function(){x(e)},20)}function u(e){var t=e.display.gutters,r=e.options.gutters
Ui(t)
for(var n=0;n<r.length;++n){var i=r[n],o=t.appendChild(Gi("div",null,"CodeMirror-gutter "+i))
"CodeMirror-linenumbers"==i&&(e.display.lineGutter=o,o.style.width=(e.display.lineNumWidth||1)+"px")}t.style.display=n?"":"none",c(e)}function c(e){var t=e.display.gutters.offsetWidth
e.display.sizer.style.marginLeft=t+"px"}function h(e){if(0==e.height)return 0
for(var t,r=e.text.length,n=e;t=pn(n);){var i=t.find(0,!0)
n=i.from.line,r+=i.from.ch-i.to.ch}for(n=e;t=gn(n);){var i=t.find(0,!0)
r-=n.text.length-i.from.ch,n=i.to.line,r+=n.text.length-i.to.ch}return r}function f(e){var t=e.display,r=e.doc
t.maxLine=qn(r,r.first),t.maxLineLength=h(t.maxLine),t.maxLineChanged=!0,r.iter(function(e){var r=h(e)
r>t.maxLineLength&&(t.maxLineLength=r,t.maxLine=e)})}function d(e){var t=Di(e.gutters,"CodeMirror-linenumbers");-1==t&&e.lineNumbers?e.gutters=e.gutters.concat(["CodeMirror-linenumbers"]):t>-1&&!e.lineNumbers&&(e.gutters=e.gutters.slice(0),e.gutters.splice(t,1))}function p(e){var t=e.display,r=t.gutters.offsetWidth,n=Math.round(e.doc.height+Ve(e.display))
return{clientHeight:t.scroller.clientHeight,viewHeight:t.wrapper.clientHeight,scrollWidth:t.scroller.scrollWidth,clientWidth:t.scroller.clientWidth,viewWidth:t.wrapper.clientWidth,barLeft:e.options.fixedGutter?r:0,docHeight:n,scrollHeight:n+je(e)+t.barHeight,nativeBarWidth:t.nativeBarWidth,gutterWidth:r}}function g(e,t,r){this.cm=r
var n=this.vert=Gi("div",[Gi("div",null,null,"min-width: 1px")],"CodeMirror-vscrollbar"),i=this.horiz=Gi("div",[Gi("div",null,null,"height: 100%; min-height: 1px")],"CodeMirror-hscrollbar")
e(n),e(i),Nl(n,"scroll",function(){n.clientHeight&&t(n.scrollTop,"vertical")}),Nl(i,"scroll",function(){i.clientWidth&&t(i.scrollLeft,"horizontal")}),this.checkedZeroWidth=!1,yo&&8>bo&&(this.horiz.style.minHeight=this.vert.style.minWidth="18px")}function v(){}function m(t){t.display.scrollbars&&(t.display.scrollbars.clear(),t.display.scrollbars.addClass&&$l(t.display.wrapper,t.display.scrollbars.addClass)),t.display.scrollbars=new e.scrollbarModel[t.options.scrollbarStyle](function(e){t.display.wrapper.insertBefore(e,t.display.scrollbarFiller),Nl(e,"mousedown",function(){t.state.focused&&setTimeout(function(){t.display.input.focus()},0)}),e.setAttribute("cm-not-content","true")},function(e,r){"horizontal"==r?nr(t,e):rr(t,e)},t),t.display.scrollbars.addClass&&ql(t.display.wrapper,t.display.scrollbars.addClass)}function y(e,t){t||(t=p(e))
var r=e.display.barWidth,n=e.display.barHeight
b(e,t)
for(var i=0;4>i&&r!=e.display.barWidth||n!=e.display.barHeight;i++)r!=e.display.barWidth&&e.options.lineWrapping&&O(e),b(e,p(e)),r=e.display.barWidth,n=e.display.barHeight}function b(e,t){var r=e.display,n=r.scrollbars.update(t)
r.sizer.style.paddingRight=(r.barWidth=n.right)+"px",r.sizer.style.paddingBottom=(r.barHeight=n.bottom)+"px",n.right&&n.bottom?(r.scrollbarFiller.style.display="block",r.scrollbarFiller.style.height=n.bottom+"px",r.scrollbarFiller.style.width=n.right+"px"):r.scrollbarFiller.style.display="",n.bottom&&e.options.coverGutterNextToScrollbar&&e.options.fixedGutter?(r.gutterFiller.style.display="block",r.gutterFiller.style.height=n.bottom+"px",r.gutterFiller.style.width=t.gutterWidth+"px"):r.gutterFiller.style.display=""}function w(e,t,r){var n=r&&null!=r.top?Math.max(0,r.top):e.scroller.scrollTop
n=Math.floor(n-Ue(e))
var i=r&&null!=r.bottom?r.bottom:n+e.wrapper.clientHeight,o=ti(t,n),l=ti(t,i)
if(r&&r.ensure){var s=r.ensure.from.line,a=r.ensure.to.line
o>s?(o=s,l=ti(t,ri(qn(t,s))+e.wrapper.clientHeight)):Math.min(a,t.lastLine())>=l&&(o=ti(t,ri(qn(t,a))-e.wrapper.clientHeight),l=a)}return{from:o,to:Math.max(l,o+1)}}function x(e){var t=e.display,r=t.view
if(t.alignWidgets||t.gutters.firstChild&&e.options.fixedGutter){for(var n=L(t)-t.scroller.scrollLeft+e.doc.scrollLeft,i=t.gutters.offsetWidth,o=n+"px",l=0;l<r.length;l++)if(!r[l].hidden){e.options.fixedGutter&&r[l].gutter&&(r[l].gutter.style.left=o)
var s=r[l].alignable
if(s)for(var a=0;a<s.length;a++)s[a].style.left=o}e.options.fixedGutter&&(t.gutters.style.left=n+i+"px")}}function C(e){if(!e.options.lineNumbers)return!1
var t=e.doc,r=S(e.options,t.first+t.size-1),n=e.display
if(r.length!=n.lineNumChars){var i=n.measure.appendChild(Gi("div",[Gi("div",r)],"CodeMirror-linenumber CodeMirror-gutter-elt")),o=i.firstChild.offsetWidth,l=i.offsetWidth-o
return n.lineGutter.style.width="",n.lineNumInnerWidth=Math.max(o,n.lineGutter.offsetWidth-l)+1,n.lineNumWidth=n.lineNumInnerWidth+l,n.lineNumChars=n.lineNumInnerWidth?r.length:-1,n.lineGutter.style.width=n.lineNumWidth+"px",c(e),!0}return!1}function S(e,t){return e.lineNumberFormatter(t+e.firstLineNumber)+""}function L(e){return e.scroller.getBoundingClientRect().left-e.sizer.getBoundingClientRect().left}function T(e,t,r){var n=e.display
this.viewport=t,this.visible=w(n,e.doc,t),this.editorIsHidden=!n.wrapper.offsetWidth,this.wrapperHeight=n.wrapper.clientHeight,this.wrapperWidth=n.wrapper.clientWidth,this.oldDisplayWidth=Xe(e),this.force=r,this.dims=H(e),this.events=[]}function k(e){var t=e.display
!t.scrollbarsClipped&&t.scroller.offsetWidth&&(t.nativeBarWidth=t.scroller.offsetWidth-t.scroller.clientWidth,t.heightForcer.style.height=je(e)+"px",t.sizer.style.marginBottom=-t.nativeBarWidth+"px",t.sizer.style.borderRightWidth=je(e)+"px",t.scrollbarsClipped=!0)}function M(e,t){var r=e.display,n=e.doc
if(t.editorIsHidden)return It(e),!1
if(!t.force&&t.visible.from>=r.viewFrom&&t.visible.to<=r.viewTo&&(null==r.updateLineNumbers||r.updateLineNumbers>=r.viewTo)&&r.renderedView==r.view&&0==Bt(e))return!1
C(e)&&(It(e),t.dims=H(e))
var i=n.first+n.size,o=Math.max(t.visible.from-e.options.viewportMargin,n.first),l=Math.min(i,t.visible.to+e.options.viewportMargin)
r.viewFrom<o&&o-r.viewFrom<20&&(o=Math.max(n.first,r.viewFrom)),r.viewTo>l&&r.viewTo-l<20&&(l=Math.min(i,r.viewTo)),Po&&(o=bn(e.doc,o),l=wn(e.doc,l))
var s=o!=r.viewFrom||l!=r.viewTo||r.lastWrapHeight!=t.wrapperHeight||r.lastWrapWidth!=t.wrapperWidth
Rt(e,o,l),r.viewOffset=ri(qn(e.doc,r.viewFrom)),e.display.mover.style.top=r.viewOffset+"px"
var a=Bt(e)
if(!s&&0==a&&!t.force&&r.renderedView==r.view&&(null==r.updateLineNumbers||r.updateLineNumbers>=r.viewTo))return!1
var u=Ki()
return a>4&&(r.lineDiv.style.display="none"),E(e,r.updateLineNumbers,t.dims),a>4&&(r.lineDiv.style.display=""),r.renderedView=r.view,u&&Ki()!=u&&u.offsetHeight&&u.focus(),Ui(r.cursorDiv),Ui(r.selectionDiv),r.gutters.style.height=r.sizer.style.minHeight=0,s&&(r.lastWrapHeight=t.wrapperHeight,r.lastWrapWidth=t.wrapperWidth,Fe(e,400)),r.updateLineNumbers=null,!0}function N(e,t){for(var r=t.viewport,n=!0;(n&&e.options.lineWrapping&&t.oldDisplayWidth!=Xe(e)||(r&&null!=r.top&&(r={top:Math.min(e.doc.height+Ve(e.display)-Ye(e),r.top)}),t.visible=w(e.display,e.doc,r),!(t.visible.from>=e.display.viewFrom&&t.visible.to<=e.display.viewTo)))&&M(e,t);n=!1){O(e)
var i=p(e)
He(e),W(e,i),y(e,i)}t.signal(e,"update",e),(e.display.viewFrom!=e.display.reportedViewFrom||e.display.viewTo!=e.display.reportedViewTo)&&(t.signal(e,"viewportChange",e,e.display.viewFrom,e.display.viewTo),e.display.reportedViewFrom=e.display.viewFrom,e.display.reportedViewTo=e.display.viewTo)}function A(e,t){var r=new T(e,t)
if(M(e,r)){O(e),N(e,r)
var n=p(e)
He(e),W(e,n),y(e,n),r.finish()}}function W(e,t){e.display.sizer.style.minHeight=t.docHeight+"px"
var r=t.docHeight+e.display.barHeight
e.display.heightForcer.style.top=r+"px",e.display.gutters.style.height=Math.max(r+je(e),t.clientHeight)+"px"}function O(e){for(var t=e.display,r=t.lineDiv.offsetTop,n=0;n<t.view.length;n++){var i,o=t.view[n]
if(!o.hidden){if(yo&&8>bo){var l=o.node.offsetTop+o.node.offsetHeight
i=l-r,r=l}else{var s=o.node.getBoundingClientRect()
i=s.bottom-s.top}var a=o.line.height-i
if(2>i&&(i=mt(t)),(a>.001||-.001>a)&&(Jn(o.line,i),D(o.line),o.rest))for(var u=0;u<o.rest.length;u++)D(o.rest[u])}}}function D(e){if(e.widgets)for(var t=0;t<e.widgets.length;++t)e.widgets[t].height=e.widgets[t].node.offsetHeight}function H(e){for(var t=e.display,r={},n={},i=t.gutters.clientLeft,o=t.gutters.firstChild,l=0;o;o=o.nextSibling,++l)r[e.options.gutters[l]]=o.offsetLeft+o.clientLeft+i,n[e.options.gutters[l]]=o.clientWidth
return{fixedPos:L(t),gutterTotalWidth:t.gutters.offsetWidth,gutterLeft:r,gutterWidth:n,wrapperWidth:t.wrapper.clientWidth}}function E(e,t,r){function n(t){var r=t.nextSibling
return wo&&Ao&&e.display.currentWheelTarget==t?t.style.display="none":t.parentNode.removeChild(t),r}for(var i=e.display,o=e.options.lineNumbers,l=i.lineDiv,s=l.firstChild,a=i.view,u=i.viewFrom,c=0;c<a.length;c++){var h=a[c]
if(h.hidden);else if(h.node&&h.node.parentNode==l){for(;s!=h.node;)s=n(s)
var f=o&&null!=t&&u>=t&&h.lineNumber
h.changes&&(Di(h.changes,"gutter")>-1&&(f=!1),P(e,h,u,r)),f&&(Ui(h.lineNumber),h.lineNumber.appendChild(document.createTextNode(S(e.options,u)))),s=h.node.nextSibling}else{var d=V(e,h,u,r)
l.insertBefore(d,s)}u+=h.size}for(;s;)s=n(s)}function P(e,t,r,n){for(var i=0;i<t.changes.length;i++){var o=t.changes[i]
"text"==o?R(e,t):"gutter"==o?G(e,t,r,n):"class"==o?B(t):"widget"==o&&U(e,t,n)}t.changes=null}function I(e){return e.node==e.text&&(e.node=Gi("div",null,null,"position: relative"),e.text.parentNode&&e.text.parentNode.replaceChild(e.node,e.text),e.node.appendChild(e.text),yo&&8>bo&&(e.node.style.zIndex=2)),e.node}function z(e){var t=e.bgClass?e.bgClass+" "+(e.line.bgClass||""):e.line.bgClass
if(t&&(t+=" CodeMirror-linebackground"),e.background)t?e.background.className=t:(e.background.parentNode.removeChild(e.background),e.background=null)
else if(t){var r=I(e)
e.background=r.insertBefore(Gi("div",null,t),r.firstChild)}}function F(e,t){var r=e.display.externalMeasured
return r&&r.line==t.line?(e.display.externalMeasured=null,t.measure=r.measure,r.built):zn(e,t)}function R(e,t){var r=t.text.className,n=F(e,t)
t.text==t.node&&(t.node=n.pre),t.text.parentNode.replaceChild(n.pre,t.text),t.text=n.pre,n.bgClass!=t.bgClass||n.textClass!=t.textClass?(t.bgClass=n.bgClass,t.textClass=n.textClass,B(t)):r&&(t.text.className=r)}function B(e){z(e),e.line.wrapClass?I(e).className=e.line.wrapClass:e.node!=e.text&&(e.node.className="")
var t=e.textClass?e.textClass+" "+(e.line.textClass||""):e.line.textClass
e.text.className=t||""}function G(e,t,r,n){if(t.gutter&&(t.node.removeChild(t.gutter),t.gutter=null),t.gutterBackground&&(t.node.removeChild(t.gutterBackground),t.gutterBackground=null),t.line.gutterClass){var i=I(t)
t.gutterBackground=Gi("div",null,"CodeMirror-gutter-background "+t.line.gutterClass,"left: "+(e.options.fixedGutter?n.fixedPos:-n.gutterTotalWidth)+"px; width: "+n.gutterTotalWidth+"px"),i.insertBefore(t.gutterBackground,t.text)}var o=t.line.gutterMarkers
if(e.options.lineNumbers||o){var i=I(t),l=t.gutter=Gi("div",null,"CodeMirror-gutter-wrapper","left: "+(e.options.fixedGutter?n.fixedPos:-n.gutterTotalWidth)+"px")
if(e.display.input.setUneditable(l),i.insertBefore(l,t.text),t.line.gutterClass&&(l.className+=" "+t.line.gutterClass),!e.options.lineNumbers||o&&o["CodeMirror-linenumbers"]||(t.lineNumber=l.appendChild(Gi("div",S(e.options,r),"CodeMirror-linenumber CodeMirror-gutter-elt","left: "+n.gutterLeft["CodeMirror-linenumbers"]+"px; width: "+e.display.lineNumInnerWidth+"px"))),o)for(var s=0;s<e.options.gutters.length;++s){var a=e.options.gutters[s],u=o.hasOwnProperty(a)&&o[a]
u&&l.appendChild(Gi("div",[u],"CodeMirror-gutter-elt","left: "+n.gutterLeft[a]+"px; width: "+n.gutterWidth[a]+"px"))}}}function U(e,t,r){t.alignable&&(t.alignable=null)
for(var n,i=t.node.firstChild;i;i=n){var n=i.nextSibling
"CodeMirror-linewidget"==i.className&&t.node.removeChild(i)}K(e,t,r)}function V(e,t,r,n){var i=F(e,t)
return t.text=t.node=i.pre,i.bgClass&&(t.bgClass=i.bgClass),i.textClass&&(t.textClass=i.textClass),B(t),G(e,t,r,n),K(e,t,n),t.node}function K(e,t,r){if(j(e,t.line,t,r,!0),t.rest)for(var n=0;n<t.rest.length;n++)j(e,t.rest[n],t,r,!1)}function j(e,t,r,n,i){if(t.widgets)for(var o=I(r),l=0,s=t.widgets;l<s.length;++l){var a=s[l],u=Gi("div",[a.node],"CodeMirror-linewidget")
a.handleMouseEvents||u.setAttribute("cm-ignore-events","true"),X(a,u,r,n),e.display.input.setUneditable(u),i&&a.above?o.insertBefore(u,r.gutter||r.text):o.appendChild(u),Si(a,"redraw")}}function X(e,t,r,n){if(e.noHScroll){(r.alignable||(r.alignable=[])).push(t)
var i=n.wrapperWidth
t.style.left=n.fixedPos+"px",e.coverGutter||(i-=n.gutterTotalWidth,t.style.paddingLeft=n.gutterTotalWidth+"px"),t.style.width=i+"px"}e.coverGutter&&(t.style.zIndex=5,t.style.position="relative",e.noHScroll||(t.style.marginLeft=-n.gutterTotalWidth+"px"))}function Y(e){return Io(e.line,e.ch)}function _(e,t){return zo(e,t)<0?t:e}function $(e,t){return zo(e,t)<0?e:t}function q(e){e.state.focused||(e.display.input.focus(),gr(e))}function Z(e){return e.options.readOnly||e.doc.cantEdit}function Q(e,t,r,n,i){var o=e.doc
e.display.shift=!1,n||(n=o.sel)
var l=e.state.pasteIncoming||"paste"==i,s=o.splitLines(t),a=null
if(l&&n.ranges.length>1)if(Fo&&Fo.join("\n")==t){if(n.ranges.length%Fo.length==0){a=[]
for(var u=0;u<Fo.length;u++)a.push(o.splitLines(Fo[u]))}}else s.length==n.ranges.length&&(a=Hi(s,function(e){return[e]}))
for(var u=n.ranges.length-1;u>=0;u--){var c=n.ranges[u],h=c.from(),f=c.to()
c.empty()&&(r&&r>0?h=Io(h.line,h.ch-r):e.state.overwrite&&!l&&(f=Io(f.line,Math.min(qn(o,f.line).text.length,f.ch+Oi(s).length))))
var d=e.curOp.updateInput,p={from:h,to:f,text:a?a[u%a.length]:s,origin:i||(l?"paste":e.state.cutIncoming?"cut":"+input")}
Lr(e.doc,p),Si(e,"inputRead",e,p)}t&&!l&&ee(e,t),Ir(e),e.curOp.updateInput=d,e.curOp.typing=!0,e.state.pasteIncoming=e.state.cutIncoming=!1}function J(e,t){var r=e.clipboardData&&e.clipboardData.getData("text/plain")
return r?(e.preventDefault(),Z(t)||t.options.disableInput||Nt(t,function(){Q(t,r,0,null,"paste")}),!0):void 0}function ee(e,t){if(e.options.electricChars&&e.options.smartIndent)for(var r=e.doc.sel,n=r.ranges.length-1;n>=0;n--){var i=r.ranges[n]
if(!(i.head.ch>100||n&&r.ranges[n-1].head.line==i.head.line)){var o=e.getModeAt(i.head),l=!1
if(o.electricChars){for(var s=0;s<o.electricChars.length;s++)if(t.indexOf(o.electricChars.charAt(s))>-1){l=Fr(e,i.head.line,"smart")
break}}else o.electricInput&&o.electricInput.test(qn(e.doc,i.head.line).text.slice(0,i.head.ch))&&(l=Fr(e,i.head.line,"smart"))
l&&Si(e,"electricInput",e,i.head.line)}}}function te(e){for(var t=[],r=[],n=0;n<e.doc.sel.ranges.length;n++){var i=e.doc.sel.ranges[n].head.line,o={anchor:Io(i,0),head:Io(i+1,0)}
r.push(o),t.push(e.getRange(o.anchor,o.head))}return{text:t,ranges:r}}function re(e){e.setAttribute("autocorrect","off"),e.setAttribute("autocapitalize","off"),e.setAttribute("spellcheck","false")}function ne(e){this.cm=e,this.prevInput="",this.pollingFast=!1,this.polling=new Ai,this.inaccurateSelection=!1,this.hasSelection=!1,this.composing=null}function ie(){var e=Gi("textarea",null,null,"position: absolute; padding: 0; width: 1px; height: 1em; outline: none"),t=Gi("div",[e],null,"overflow: hidden; position: relative; width: 3px; height: 0px;")
return wo?e.style.width="1000px":e.setAttribute("wrap","off"),Mo&&(e.style.border="1px solid black"),re(e),t}function oe(e){this.cm=e,this.lastAnchorNode=this.lastAnchorOffset=this.lastFocusNode=this.lastFocusOffset=null,this.polling=new Ai,this.gracePeriod=!1}function le(e,t){var r=Qe(e,t.line)
if(!r||r.hidden)return null
var n=qn(e.doc,t.line),i=$e(r,n,t.line),o=ni(n),l="left"
if(o){var s=ao(o,t.ch)
l=s%2?"right":"left"}var a=tt(i.map,t.ch,l)
return a.offset="right"==a.collapse?a.end:a.start,a}function se(e,t){return t&&(e.bad=!0),e}function ae(e,t,r){var n
if(t==e.display.lineDiv){if(n=e.display.lineDiv.childNodes[r],!n)return se(e.clipPos(Io(e.display.viewTo-1)),!0)
t=null,r=0}else for(n=t;;n=n.parentNode){if(!n||n==e.display.lineDiv)return null
if(n.parentNode&&n.parentNode==e.display.lineDiv)break}for(var i=0;i<e.display.view.length;i++){var o=e.display.view[i]
if(o.node==n)return ue(o,t,r)}}function ue(e,t,r){function n(t,r,n){for(var i=-1;i<(c?c.length:0);i++)for(var o=0>i?u.map:c[i],l=0;l<o.length;l+=3){var s=o[l+2]
if(s==t||s==r){var a=ei(0>i?e.line:e.rest[i]),h=o[l]+n
return(0>n||s!=t)&&(h=o[l+(n?1:0)]),Io(a,h)}}}var i=e.text.firstChild,o=!1
if(!t||!Xl(i,t))return se(Io(ei(e.line),0),!0)
if(t==i&&(o=!0,t=i.childNodes[r],r=0,!t)){var l=e.rest?Oi(e.rest):e.line
return se(Io(ei(l),l.text.length),o)}var s=3==t.nodeType?t:null,a=t
for(s||1!=t.childNodes.length||3!=t.firstChild.nodeType||(s=t.firstChild,r&&(r=s.nodeValue.length));a.parentNode!=i;)a=a.parentNode
var u=e.measure,c=u.maps,h=n(s,a,r)
if(h)return se(h,o)
for(var f=a.nextSibling,d=s?s.nodeValue.length-r:0;f;f=f.nextSibling){if(h=n(f,f.firstChild,0))return se(Io(h.line,h.ch-d),o)
d+=f.textContent.length}for(var p=a.previousSibling,d=r;p;p=p.previousSibling){if(h=n(p,p.firstChild,-1))return se(Io(h.line,h.ch+d),o)
d+=f.textContent.length}}function ce(e,t,r,n,i){function o(e){return function(t){return t.id==e}}function l(t){if(1==t.nodeType){var r=t.getAttribute("cm-text")
if(null!=r)return""==r&&(r=t.textContent.replace(/\u200b/g,"")),void(s+=r)
var c,h=t.getAttribute("cm-marker")
if(h){var f=e.findMarks(Io(n,0),Io(i+1,0),o(+h))
return void(f.length&&(c=f[0].find())&&(s+=Zn(e.doc,c.from,c.to).join(u)))}if("false"==t.getAttribute("contenteditable"))return
for(var d=0;d<t.childNodes.length;d++)l(t.childNodes[d]);/^(pre|div|p)$/i.test(t.nodeName)&&(a=!0)}else if(3==t.nodeType){var p=t.nodeValue
if(!p)return
a&&(s+=u,a=!1),s+=p}}for(var s="",a=!1,u=e.doc.lineSeparator();l(t),t!=r;)t=t.nextSibling
return s}function he(e,t){this.ranges=e,this.primIndex=t}function fe(e,t){this.anchor=e,this.head=t}function de(e,t){var r=e[t]
e.sort(function(e,t){return zo(e.from(),t.from())}),t=Di(e,r)
for(var n=1;n<e.length;n++){var i=e[n],o=e[n-1]
if(zo(o.to(),i.from())>=0){var l=$(o.from(),i.from()),s=_(o.to(),i.to()),a=o.empty()?i.from()==i.head:o.from()==o.head
t>=n&&--t,e.splice(--n,2,new fe(a?s:l,a?l:s))}}return new he(e,t)}function pe(e,t){return new he([new fe(e,t||e)],0)}function ge(e,t){return Math.max(e.first,Math.min(t,e.first+e.size-1))}function ve(e,t){if(t.line<e.first)return Io(e.first,0)
var r=e.first+e.size-1
return t.line>r?Io(r,qn(e,r).text.length):me(t,qn(e,t.line).text.length)}function me(e,t){var r=e.ch
return null==r||r>t?Io(e.line,t):0>r?Io(e.line,0):e}function ye(e,t){return t>=e.first&&t<e.first+e.size}function be(e,t){for(var r=[],n=0;n<t.length;n++)r[n]=ve(e,t[n])
return r}function we(e,t,r,n){if(e.cm&&e.cm.display.shift||e.extend){var i=t.anchor
if(n){var o=zo(r,i)<0
o!=zo(n,i)<0?(i=r,r=n):o!=zo(r,n)<0&&(r=n)}return new fe(i,r)}return new fe(n||r,r)}function xe(e,t,r,n){Me(e,new he([we(e,e.sel.primary(),t,r)],0),n)}function Ce(e,t,r){for(var n=[],i=0;i<e.sel.ranges.length;i++)n[i]=we(e,e.sel.ranges[i],t[i],null)
var o=de(n,e.sel.primIndex)
Me(e,o,r)}function Se(e,t,r,n){var i=e.sel.ranges.slice(0)
i[t]=r,Me(e,de(i,e.sel.primIndex),n)}function Le(e,t,r,n){Me(e,pe(t,r),n)}function Te(e,t){var r={ranges:t.ranges,update:function(t){this.ranges=[]
for(var r=0;r<t.length;r++)this.ranges[r]=new fe(ve(e,t[r].anchor),ve(e,t[r].head))}}
return Ol(e,"beforeSelectionChange",e,r),e.cm&&Ol(e.cm,"beforeSelectionChange",e.cm,r),r.ranges!=t.ranges?de(r.ranges,r.ranges.length-1):t}function ke(e,t,r){var n=e.history.done,i=Oi(n)
i&&i.ranges?(n[n.length-1]=t,Ne(e,t,r)):Me(e,t,r)}function Me(e,t,r){Ne(e,t,r),ci(e,e.sel,e.cm?e.cm.curOp.id:NaN,r)}function Ne(e,t,r){(Mi(e,"beforeSelectionChange")||e.cm&&Mi(e.cm,"beforeSelectionChange"))&&(t=Te(e,t))
var n=r&&r.bias||(zo(t.primary().head,e.sel.primary().head)<0?-1:1)
Ae(e,Oe(e,t,n,!0)),r&&r.scroll===!1||!e.cm||Ir(e.cm)}function Ae(e,t){t.equals(e.sel)||(e.sel=t,e.cm&&(e.cm.curOp.updateInput=e.cm.curOp.selectionChanged=!0,ki(e.cm)),Si(e,"cursorActivity",e))}function We(e){Ae(e,Oe(e,e.sel,null,!1),Pl)}function Oe(e,t,r,n){for(var i,o=0;o<t.ranges.length;o++){var l=t.ranges[o],s=De(e,l.anchor,r,n),a=De(e,l.head,r,n);(i||s!=l.anchor||a!=l.head)&&(i||(i=t.ranges.slice(0,o)),i[o]=new fe(s,a))}return i?de(i,t.primIndex):t}function De(e,t,r,n){var i=!1,o=t,l=r||1
e.cantEdit=!1
e:for(;;){var s=qn(e,o.line)
if(s.markedSpans)for(var a=0;a<s.markedSpans.length;++a){var u=s.markedSpans[a],c=u.marker
if((null==u.from||(c.inclusiveLeft?u.from<=o.ch:u.from<o.ch))&&(null==u.to||(c.inclusiveRight?u.to>=o.ch:u.to>o.ch))){if(n&&(Ol(c,"beforeCursorEnter"),c.explicitlyCleared)){if(s.markedSpans){--a
continue}break}if(!c.atomic)continue
var h=c.find(0>l?-1:1)
if(0==zo(h,o)&&(h.ch+=l,h.ch<0?h=h.line>e.first?ve(e,Io(h.line-1)):null:h.ch>s.text.length&&(h=h.line<e.first+e.size-1?Io(h.line+1,0):null),!h)){if(i)return n?(e.cantEdit=!0,Io(e.first,0)):De(e,t,r,!0)
i=!0,h=t,l=-l}o=h
continue e}}return o}}function He(e){e.display.input.showSelection(e.display.input.prepareSelection())}function Ee(e,t){for(var r=e.doc,n={},i=n.cursors=document.createDocumentFragment(),o=n.selection=document.createDocumentFragment(),l=0;l<r.sel.ranges.length;l++)if(t!==!1||l!=r.sel.primIndex){var s=r.sel.ranges[l],a=s.empty();(a||e.options.showCursorWhenSelecting)&&Pe(e,s.head,i),a||Ie(e,s,o)}return n}function Pe(e,t,r){var n=ft(e,t,"div",null,null,!e.options.singleCursorHeightPerLine),i=r.appendChild(Gi("div"," ","CodeMirror-cursor"))
if(i.style.left=n.left+"px",i.style.top=n.top+"px",i.style.height=Math.max(0,n.bottom-n.top)*e.options.cursorHeight+"px",n.other){var o=r.appendChild(Gi("div"," ","CodeMirror-cursor CodeMirror-secondarycursor"))
o.style.display="",o.style.left=n.other.left+"px",o.style.top=n.other.top+"px",o.style.height=.85*(n.other.bottom-n.other.top)+"px"}}function Ie(e,t,r){function n(e,t,r,n){0>t&&(t=0),t=Math.round(t),n=Math.round(n),s.appendChild(Gi("div",null,"CodeMirror-selected","position: absolute; left: "+e+"px; top: "+t+"px; width: "+(null==r?c-e:r)+"px; height: "+(n-t)+"px"))}function i(t,r,i){function o(r,n){return ht(e,Io(t,r),"div",h,n)}var s,a,h=qn(l,t),f=h.text.length
return Ji(ni(h),r||0,null==i?f:i,function(e,t,l){var h,d,p,g=o(e,"left")
if(e==t)h=g,d=p=g.left
else{if(h=o(t-1,"right"),"rtl"==l){var v=g
g=h,h=v}d=g.left,p=h.right}null==r&&0==e&&(d=u),h.top-g.top>3&&(n(d,g.top,null,g.bottom),d=u,g.bottom<h.top&&n(d,g.bottom,null,h.top)),null==i&&t==f&&(p=c),(!s||g.top<s.top||g.top==s.top&&g.left<s.left)&&(s=g),(!a||h.bottom>a.bottom||h.bottom==a.bottom&&h.right>a.right)&&(a=h),u+1>d&&(d=u),n(d,h.top,p-d,h.bottom)}),{start:s,end:a}}var o=e.display,l=e.doc,s=document.createDocumentFragment(),a=Ke(e.display),u=a.left,c=Math.max(o.sizerWidth,Xe(e)-o.sizer.offsetLeft)-a.right,h=t.from(),f=t.to()
if(h.line==f.line)i(h.line,h.ch,f.ch)
else{var d=qn(l,h.line),p=qn(l,f.line),g=mn(d)==mn(p),v=i(h.line,h.ch,g?d.text.length+1:null).end,m=i(f.line,g?0:null,f.ch).start
g&&(v.top<m.top-2?(n(v.right,v.top,null,v.bottom),n(u,m.top,m.left,m.bottom)):n(v.right,v.top,m.left-v.right,v.bottom)),v.bottom<m.top&&n(u,v.bottom,null,m.top)}r.appendChild(s)}function ze(e){if(e.state.focused){var t=e.display
clearInterval(t.blinker)
var r=!0
t.cursorDiv.style.visibility="",e.options.cursorBlinkRate>0?t.blinker=setInterval(function(){t.cursorDiv.style.visibility=(r=!r)?"":"hidden"},e.options.cursorBlinkRate):e.options.cursorBlinkRate<0&&(t.cursorDiv.style.visibility="hidden")}}function Fe(e,t){e.doc.mode.startState&&e.doc.frontier<e.display.viewTo&&e.state.highlight.set(t,zi(Re,e))}function Re(e){var t=e.doc
if(t.frontier<t.first&&(t.frontier=t.first),!(t.frontier>=e.display.viewTo)){var r=+new Date+e.options.workTime,n=ll(t.mode,Ge(e,t.frontier)),i=[]
t.iter(t.frontier,Math.min(t.first+t.size,e.display.viewTo+500),function(o){if(t.frontier>=e.display.viewFrom){var l=o.styles,s=o.text.length>e.options.maxHighlightLength,a=Hn(e,o,s?ll(t.mode,n):n,!0)
o.styles=a.styles
var u=o.styleClasses,c=a.classes
c?o.styleClasses=c:u&&(o.styleClasses=null)
for(var h=!l||l.length!=o.styles.length||u!=c&&(!u||!c||u.bgClass!=c.bgClass||u.textClass!=c.textClass),f=0;!h&&f<l.length;++f)h=l[f]!=o.styles[f]
h&&i.push(t.frontier),o.stateAfter=s?n:ll(t.mode,n)}else o.text.length<=e.options.maxHighlightLength&&Pn(e,o.text,n),o.stateAfter=t.frontier%5==0?ll(t.mode,n):null
return++t.frontier,+new Date>r?(Fe(e,e.options.workDelay),!0):void 0}),i.length&&Nt(e,function(){for(var t=0;t<i.length;t++)Pt(e,i[t],"text")})}}function Be(e,t,r){for(var n,i,o=e.doc,l=r?-1:t-(e.doc.mode.innerMode?1e3:100),s=t;s>l;--s){if(s<=o.first)return o.first
var a=qn(o,s-1)
if(a.stateAfter&&(!r||s<=o.frontier))return s
var u=Fl(a.text,null,e.options.tabSize);(null==i||n>u)&&(i=s-1,n=u)}return i}function Ge(e,t,r){var n=e.doc,i=e.display
if(!n.mode.startState)return!0
var o=Be(e,t,r),l=o>n.first&&qn(n,o-1).stateAfter
return l=l?ll(n.mode,l):sl(n.mode),n.iter(o,t,function(r){Pn(e,r.text,l)
var s=o==t-1||o%5==0||o>=i.viewFrom&&o<i.viewTo
r.stateAfter=s?ll(n.mode,l):null,++o}),r&&(n.frontier=o),l}function Ue(e){return e.lineSpace.offsetTop}function Ve(e){return e.mover.offsetHeight-e.lineSpace.offsetHeight}function Ke(e){if(e.cachedPaddingH)return e.cachedPaddingH
var t=Vi(e.measure,Gi("pre","x")),r=window.getComputedStyle?window.getComputedStyle(t):t.currentStyle,n={left:parseInt(r.paddingLeft),right:parseInt(r.paddingRight)}
return isNaN(n.left)||isNaN(n.right)||(e.cachedPaddingH=n),n}function je(e){return Hl-e.display.nativeBarWidth}function Xe(e){return e.display.scroller.clientWidth-je(e)-e.display.barWidth}function Ye(e){return e.display.scroller.clientHeight-je(e)-e.display.barHeight}function _e(e,t,r){var n=e.options.lineWrapping,i=n&&Xe(e)
if(!t.measure.heights||n&&t.measure.width!=i){var o=t.measure.heights=[]
if(n){t.measure.width=i
for(var l=t.text.firstChild.getClientRects(),s=0;s<l.length-1;s++){var a=l[s],u=l[s+1]
Math.abs(a.bottom-u.bottom)>2&&o.push((a.bottom+u.top)/2-r.top)}}o.push(r.bottom-r.top)}}function $e(e,t,r){if(e.line==t)return{map:e.measure.map,cache:e.measure.cache}
for(var n=0;n<e.rest.length;n++)if(e.rest[n]==t)return{map:e.measure.maps[n],cache:e.measure.caches[n]}
for(var n=0;n<e.rest.length;n++)if(ei(e.rest[n])>r)return{map:e.measure.maps[n],cache:e.measure.caches[n],before:!0}}function qe(e,t){t=mn(t)
var r=ei(t),n=e.display.externalMeasured=new Dt(e.doc,t,r)
n.lineN=r
var i=n.built=zn(e,n)
return n.text=i.pre,Vi(e.display.lineMeasure,i.pre),n}function Ze(e,t,r,n){return et(e,Je(e,t),r,n)}function Qe(e,t){if(t>=e.display.viewFrom&&t<e.display.viewTo)return e.display.view[zt(e,t)]
var r=e.display.externalMeasured
return r&&t>=r.lineN&&t<r.lineN+r.size?r:void 0}function Je(e,t){var r=ei(t),n=Qe(e,r)
n&&!n.text?n=null:n&&n.changes&&(P(e,n,r,H(e)),e.curOp.forceUpdate=!0),n||(n=qe(e,t))
var i=$e(n,t,r)
return{line:t,view:n,rect:null,map:i.map,cache:i.cache,before:i.before,hasHeights:!1}}function et(e,t,r,n,i){t.before&&(r=-1)
var o,l=r+(n||"")
return t.cache.hasOwnProperty(l)?o=t.cache[l]:(t.rect||(t.rect=t.view.text.getBoundingClientRect()),t.hasHeights||(_e(e,t.view,t.rect),t.hasHeights=!0),o=rt(e,t,r,n),o.bogus||(t.cache[l]=o)),{left:o.left,right:o.right,top:i?o.rtop:o.top,bottom:i?o.rbottom:o.bottom}}function tt(e,t,r){for(var n,i,o,l,s=0;s<e.length;s+=3){var a=e[s],u=e[s+1]
if(a>t?(i=0,o=1,l="left"):u>t?(i=t-a,o=i+1):(s==e.length-3||t==u&&e[s+3]>t)&&(o=u-a,i=o-1,t>=u&&(l="right")),null!=i){if(n=e[s+2],a==u&&r==(n.insertLeft?"left":"right")&&(l=r),"left"==r&&0==i)for(;s&&e[s-2]==e[s-3]&&e[s-1].insertLeft;)n=e[(s-=3)+2],l="left"
if("right"==r&&i==u-a)for(;s<e.length-3&&e[s+3]==e[s+4]&&!e[s+5].insertLeft;)n=e[(s+=3)+2],l="right"
break}}return{node:n,start:i,end:o,collapse:l,coverStart:a,coverEnd:u}}function rt(e,t,r,n){var i,o=tt(t.map,r,n),l=o.node,s=o.start,a=o.end,u=o.collapse
if(3==l.nodeType){for(var c=0;4>c;c++){for(;s&&Bi(t.line.text.charAt(o.coverStart+s));)--s
for(;o.coverStart+a<o.coverEnd&&Bi(t.line.text.charAt(o.coverStart+a));)++a
if(yo&&9>bo&&0==s&&a==o.coverEnd-o.coverStart)i=l.parentNode.getBoundingClientRect()
else if(yo&&e.options.lineWrapping){var h=Ul(l,s,a).getClientRects()
i=h.length?h["right"==n?h.length-1:0]:Uo}else i=Ul(l,s,a).getBoundingClientRect()||Uo
if(i.left||i.right||0==s)break
a=s,s-=1,u="right"}yo&&11>bo&&(i=nt(e.display.measure,i))}else{s>0&&(u=n="right")
var h
i=e.options.lineWrapping&&(h=l.getClientRects()).length>1?h["right"==n?h.length-1:0]:l.getBoundingClientRect()}if(yo&&9>bo&&!s&&(!i||!i.left&&!i.right)){var f=l.parentNode.getClientRects()[0]
i=f?{left:f.left,right:f.left+yt(e.display),top:f.top,bottom:f.bottom}:Uo}for(var d=i.top-t.rect.top,p=i.bottom-t.rect.top,g=(d+p)/2,v=t.view.measure.heights,c=0;c<v.length-1&&!(g<v[c]);c++);var m=c?v[c-1]:0,y=v[c],b={left:("right"==u?i.right:i.left)-t.rect.left,right:("left"==u?i.left:i.right)-t.rect.left,top:m,bottom:y}
return i.left||i.right||(b.bogus=!0),e.options.singleCursorHeightPerLine||(b.rtop=d,b.rbottom=p),b}function nt(e,t){if(!window.screen||null==screen.logicalXDPI||screen.logicalXDPI==screen.deviceXDPI||!Qi(e))return t
var r=screen.logicalXDPI/screen.deviceXDPI,n=screen.logicalYDPI/screen.deviceYDPI
return{left:t.left*r,right:t.right*r,top:t.top*n,bottom:t.bottom*n}}function it(e){if(e.measure&&(e.measure.cache={},e.measure.heights=null,e.rest))for(var t=0;t<e.rest.length;t++)e.measure.caches[t]={}}function ot(e){e.display.externalMeasure=null,Ui(e.display.lineMeasure)
for(var t=0;t<e.display.view.length;t++)it(e.display.view[t])}function lt(e){ot(e),e.display.cachedCharWidth=e.display.cachedTextHeight=e.display.cachedPaddingH=null,e.options.lineWrapping||(e.display.maxLineChanged=!0),e.display.lineNumChars=null}function st(){return window.pageXOffset||(document.documentElement||document.body).scrollLeft}function at(){return window.pageYOffset||(document.documentElement||document.body).scrollTop}function ut(e,t,r,n){if(t.widgets)for(var i=0;i<t.widgets.length;++i)if(t.widgets[i].above){var o=Ln(t.widgets[i])
r.top+=o,r.bottom+=o}if("line"==n)return r
n||(n="local")
var l=ri(t)
if("local"==n?l+=Ue(e.display):l-=e.display.viewOffset,"page"==n||"window"==n){var s=e.display.lineSpace.getBoundingClientRect()
l+=s.top+("window"==n?0:at())
var a=s.left+("window"==n?0:st())
r.left+=a,r.right+=a}return r.top+=l,r.bottom+=l,r}function ct(e,t,r){if("div"==r)return t
var n=t.left,i=t.top
if("page"==r)n-=st(),i-=at()
else if("local"==r||!r){var o=e.display.sizer.getBoundingClientRect()
n+=o.left,i+=o.top}var l=e.display.lineSpace.getBoundingClientRect()
return{left:n-l.left,top:i-l.top}}function ht(e,t,r,n,i){return n||(n=qn(e.doc,t.line)),ut(e,n,Ze(e,n,t.ch,i),r)}function ft(e,t,r,n,i,o){function l(t,l){var s=et(e,i,t,l?"right":"left",o)
return l?s.left=s.right:s.right=s.left,ut(e,n,s,r)}function s(e,t){var r=a[t],n=r.level%2
return e==eo(r)&&t&&r.level<a[t-1].level?(r=a[--t],e=to(r)-(r.level%2?0:1),n=!0):e==to(r)&&t<a.length-1&&r.level<a[t+1].level&&(r=a[++t],e=eo(r)-r.level%2,n=!1),n&&e==r.to&&e>r.from?l(e-1):l(e,n)}n=n||qn(e.doc,t.line),i||(i=Je(e,n))
var a=ni(n),u=t.ch
if(!a)return l(u)
var c=ao(a,u),h=s(u,c)
return null!=is&&(h.other=s(u,is)),h}function dt(e,t){var r=0,t=ve(e.doc,t)
e.options.lineWrapping||(r=yt(e.display)*t.ch)
var n=qn(e.doc,t.line),i=ri(n)+Ue(e.display)
return{left:r,right:r,top:i,bottom:i+n.height}}function pt(e,t,r,n){var i=Io(e,t)
return i.xRel=n,r&&(i.outside=!0),i}function gt(e,t,r){var n=e.doc
if(r+=e.display.viewOffset,0>r)return pt(n.first,0,!0,-1)
var i=ti(n,r),o=n.first+n.size-1
if(i>o)return pt(n.first+n.size-1,qn(n,o).text.length,!0,1)
0>t&&(t=0)
for(var l=qn(n,i);;){var s=vt(e,l,i,t,r),a=gn(l),u=a&&a.find(0,!0)
if(!a||!(s.ch>u.from.ch||s.ch==u.from.ch&&s.xRel>0))return s
i=ei(l=u.to.line)}}function vt(e,t,r,n,i){function o(n){var i=ft(e,Io(r,n),"line",t,u)
return s=!0,l>i.bottom?i.left-a:l<i.top?i.left+a:(s=!1,i.left)}var l=i-ri(t),s=!1,a=2*e.display.wrapper.clientWidth,u=Je(e,t),c=ni(t),h=t.text.length,f=ro(t),d=no(t),p=o(f),g=s,v=o(d),m=s
if(n>v)return pt(r,d,m,1)
for(;;){if(c?d==f||d==co(t,f,1):1>=d-f){for(var y=p>n||v-n>=n-p?f:d,b=n-(y==f?p:v);Bi(t.text.charAt(y));)++y
var w=pt(r,y,y==f?g:m,-1>b?-1:b>1?1:0)
return w}var x=Math.ceil(h/2),C=f+x
if(c){C=f
for(var S=0;x>S;++S)C=co(t,C,1)}var L=o(C)
L>n?(d=C,v=L,(m=s)&&(v+=1e3),h=x):(f=C,p=L,g=s,h-=x)}}function mt(e){if(null!=e.cachedTextHeight)return e.cachedTextHeight
if(null==Ro){Ro=Gi("pre")
for(var t=0;49>t;++t)Ro.appendChild(document.createTextNode("x")),Ro.appendChild(Gi("br"))
Ro.appendChild(document.createTextNode("x"))}Vi(e.measure,Ro)
var r=Ro.offsetHeight/50
return r>3&&(e.cachedTextHeight=r),Ui(e.measure),r||1}function yt(e){if(null!=e.cachedCharWidth)return e.cachedCharWidth
var t=Gi("span","xxxxxxxxxx"),r=Gi("pre",[t])
Vi(e.measure,r)
var n=t.getBoundingClientRect(),i=(n.right-n.left)/10
return i>2&&(e.cachedCharWidth=i),i||10}function bt(e){e.curOp={cm:e,viewChanged:!1,startHeight:e.doc.height,forceUpdate:!1,updateInput:null,typing:!1,changeObjs:null,cursorActivityHandlers:null,cursorActivityCalled:0,selectionChanged:!1,updateMaxLine:!1,scrollLeft:null,scrollTop:null,scrollToPos:null,focus:!1,id:++Ko},Vo?Vo.ops.push(e.curOp):e.curOp.ownsGroup=Vo={ops:[e.curOp],delayedCallbacks:[]}}function wt(e){var t=e.delayedCallbacks,r=0
do{for(;r<t.length;r++)t[r].call(null)
for(var n=0;n<e.ops.length;n++){var i=e.ops[n]
if(i.cursorActivityHandlers)for(;i.cursorActivityCalled<i.cursorActivityHandlers.length;)i.cursorActivityHandlers[i.cursorActivityCalled++].call(null,i.cm)}}while(r<t.length)}function xt(e){var t=e.curOp,r=t.ownsGroup
if(r)try{wt(r)}finally{Vo=null
for(var n=0;n<r.ops.length;n++)r.ops[n].cm.curOp=null
Ct(r)}}function Ct(e){for(var t=e.ops,r=0;r<t.length;r++)St(t[r])
for(var r=0;r<t.length;r++)Lt(t[r])
for(var r=0;r<t.length;r++)Tt(t[r])
for(var r=0;r<t.length;r++)kt(t[r])
for(var r=0;r<t.length;r++)Mt(t[r])}function St(e){var t=e.cm,r=t.display
k(t),e.updateMaxLine&&f(t),e.mustUpdate=e.viewChanged||e.forceUpdate||null!=e.scrollTop||e.scrollToPos&&(e.scrollToPos.from.line<r.viewFrom||e.scrollToPos.to.line>=r.viewTo)||r.maxLineChanged&&t.options.lineWrapping,e.update=e.mustUpdate&&new T(t,e.mustUpdate&&{top:e.scrollTop,ensure:e.scrollToPos},e.forceUpdate)}function Lt(e){e.updatedDisplay=e.mustUpdate&&M(e.cm,e.update)}function Tt(e){var t=e.cm,r=t.display
e.updatedDisplay&&O(t),e.barMeasure=p(t),r.maxLineChanged&&!t.options.lineWrapping&&(e.adjustWidthTo=Ze(t,r.maxLine,r.maxLine.text.length).left+3,t.display.sizerWidth=e.adjustWidthTo,e.barMeasure.scrollWidth=Math.max(r.scroller.clientWidth,r.sizer.offsetLeft+e.adjustWidthTo+je(t)+t.display.barWidth),e.maxScrollLeft=Math.max(0,r.sizer.offsetLeft+e.adjustWidthTo-Xe(t))),(e.updatedDisplay||e.selectionChanged)&&(e.preparedSelection=r.input.prepareSelection())}function kt(e){var t=e.cm
null!=e.adjustWidthTo&&(t.display.sizer.style.minWidth=e.adjustWidthTo+"px",e.maxScrollLeft<t.doc.scrollLeft&&nr(t,Math.min(t.display.scroller.scrollLeft,e.maxScrollLeft),!0),t.display.maxLineChanged=!1),e.preparedSelection&&t.display.input.showSelection(e.preparedSelection),e.updatedDisplay&&W(t,e.barMeasure),(e.updatedDisplay||e.startHeight!=t.doc.height)&&y(t,e.barMeasure),e.selectionChanged&&ze(t),t.state.focused&&e.updateInput&&t.display.input.reset(e.typing),!e.focus||e.focus!=Ki()||document.hasFocus&&!document.hasFocus()||q(e.cm)}function Mt(e){var t=e.cm,r=t.display,n=t.doc
if(e.updatedDisplay&&N(t,e.update),null==r.wheelStartX||null==e.scrollTop&&null==e.scrollLeft&&!e.scrollToPos||(r.wheelStartX=r.wheelStartY=null),null==e.scrollTop||r.scroller.scrollTop==e.scrollTop&&!e.forceScroll||(n.scrollTop=Math.max(0,Math.min(r.scroller.scrollHeight-r.scroller.clientHeight,e.scrollTop)),r.scrollbars.setScrollTop(n.scrollTop),r.scroller.scrollTop=n.scrollTop),null==e.scrollLeft||r.scroller.scrollLeft==e.scrollLeft&&!e.forceScroll||(n.scrollLeft=Math.max(0,Math.min(r.scroller.scrollWidth-Xe(t),e.scrollLeft)),r.scrollbars.setScrollLeft(n.scrollLeft),r.scroller.scrollLeft=n.scrollLeft,x(t)),e.scrollToPos){var i=Dr(t,ve(n,e.scrollToPos.from),ve(n,e.scrollToPos.to),e.scrollToPos.margin)
e.scrollToPos.isCursor&&t.state.focused&&Or(t,i)}var o=e.maybeHiddenMarkers,l=e.maybeUnhiddenMarkers
if(o)for(var s=0;s<o.length;++s)o[s].lines.length||Ol(o[s],"hide")
if(l)for(var s=0;s<l.length;++s)l[s].lines.length&&Ol(l[s],"unhide")
r.wrapper.offsetHeight&&(n.scrollTop=t.display.scroller.scrollTop),e.changeObjs&&Ol(t,"changes",t,e.changeObjs),e.update&&e.update.finish()}function Nt(e,t){if(e.curOp)return t()
bt(e)
try{return t()}finally{xt(e)}}function At(e,t){return function(){if(e.curOp)return t.apply(e,arguments)
bt(e)
try{return t.apply(e,arguments)}finally{xt(e)}}}function Wt(e){return function(){if(this.curOp)return e.apply(this,arguments)
bt(this)
try{return e.apply(this,arguments)}finally{xt(this)}}}function Ot(e){return function(){var t=this.cm
if(!t||t.curOp)return e.apply(this,arguments)
bt(t)
try{return e.apply(this,arguments)}finally{xt(t)}}}function Dt(e,t,r){this.line=t,this.rest=yn(t),this.size=this.rest?ei(Oi(this.rest))-r+1:1,this.node=this.text=null,this.hidden=xn(e,t)}function Ht(e,t,r){for(var n,i=[],o=t;r>o;o=n){var l=new Dt(e.doc,qn(e.doc,o),o)
n=o+l.size,i.push(l)}return i}function Et(e,t,r,n){null==t&&(t=e.doc.first),null==r&&(r=e.doc.first+e.doc.size),n||(n=0)
var i=e.display
if(n&&r<i.viewTo&&(null==i.updateLineNumbers||i.updateLineNumbers>t)&&(i.updateLineNumbers=t),e.curOp.viewChanged=!0,t>=i.viewTo)Po&&bn(e.doc,t)<i.viewTo&&It(e)
else if(r<=i.viewFrom)Po&&wn(e.doc,r+n)>i.viewFrom?It(e):(i.viewFrom+=n,i.viewTo+=n)
else if(t<=i.viewFrom&&r>=i.viewTo)It(e)
else if(t<=i.viewFrom){var o=Ft(e,r,r+n,1)
o?(i.view=i.view.slice(o.index),i.viewFrom=o.lineN,i.viewTo+=n):It(e)}else if(r>=i.viewTo){var o=Ft(e,t,t,-1)
o?(i.view=i.view.slice(0,o.index),i.viewTo=o.lineN):It(e)}else{var l=Ft(e,t,t,-1),s=Ft(e,r,r+n,1)
l&&s?(i.view=i.view.slice(0,l.index).concat(Ht(e,l.lineN,s.lineN)).concat(i.view.slice(s.index)),i.viewTo+=n):It(e)}var a=i.externalMeasured
a&&(r<a.lineN?a.lineN+=n:t<a.lineN+a.size&&(i.externalMeasured=null))}function Pt(e,t,r){e.curOp.viewChanged=!0
var n=e.display,i=e.display.externalMeasured
if(i&&t>=i.lineN&&t<i.lineN+i.size&&(n.externalMeasured=null),!(t<n.viewFrom||t>=n.viewTo)){var o=n.view[zt(e,t)]
if(null!=o.node){var l=o.changes||(o.changes=[]);-1==Di(l,r)&&l.push(r)}}}function It(e){e.display.viewFrom=e.display.viewTo=e.doc.first,e.display.view=[],e.display.viewOffset=0}function zt(e,t){if(t>=e.display.viewTo)return null
if(t-=e.display.viewFrom,0>t)return null
for(var r=e.display.view,n=0;n<r.length;n++)if(t-=r[n].size,0>t)return n}function Ft(e,t,r,n){var i,o=zt(e,t),l=e.display.view
if(!Po||r==e.doc.first+e.doc.size)return{index:o,lineN:r}
for(var s=0,a=e.display.viewFrom;o>s;s++)a+=l[s].size
if(a!=t){if(n>0){if(o==l.length-1)return null
i=a+l[o].size-t,o++}else i=a-t
t+=i,r+=i}for(;bn(e.doc,r)!=r;){if(o==(0>n?0:l.length-1))return null
r+=n*l[o-(0>n?1:0)].size,o+=n}return{index:o,lineN:r}}function Rt(e,t,r){var n=e.display,i=n.view
0==i.length||t>=n.viewTo||r<=n.viewFrom?(n.view=Ht(e,t,r),n.viewFrom=t):(n.viewFrom>t?n.view=Ht(e,t,n.viewFrom).concat(n.view):n.viewFrom<t&&(n.view=n.view.slice(zt(e,t))),n.viewFrom=t,n.viewTo<r?n.view=n.view.concat(Ht(e,n.viewTo,r)):n.viewTo>r&&(n.view=n.view.slice(0,zt(e,r)))),n.viewTo=r}function Bt(e){for(var t=e.display.view,r=0,n=0;n<t.length;n++){var i=t[n]
i.hidden||i.node&&!i.changes||++r}return r}function Gt(e){function t(){i.activeTouch&&(o=setTimeout(function(){i.activeTouch=null},1e3),l=i.activeTouch,l.end=+new Date)}function r(e){if(1!=e.touches.length)return!1
var t=e.touches[0]
return t.radiusX<=1&&t.radiusY<=1}function n(e,t){if(null==t.left)return!0
var r=t.left-e.left,n=t.top-e.top
return r*r+n*n>400}var i=e.display
Nl(i.scroller,"mousedown",At(e,Xt)),yo&&11>bo?Nl(i.scroller,"dblclick",At(e,function(t){if(!Ti(e,t)){var r=jt(e,t)
if(r&&!Zt(e,t)&&!Kt(e.display,t)){Tl(t)
var n=e.findWordAt(r)
xe(e.doc,n.anchor,n.head)}}})):Nl(i.scroller,"dblclick",function(t){Ti(e,t)||Tl(t)}),Ho||Nl(i.scroller,"contextmenu",function(t){mr(e,t)})
var o,l={end:0}
Nl(i.scroller,"touchstart",function(e){if(!r(e)){clearTimeout(o)
var t=+new Date
i.activeTouch={start:t,moved:!1,prev:t-l.end<=300?l:null},1==e.touches.length&&(i.activeTouch.left=e.touches[0].pageX,i.activeTouch.top=e.touches[0].pageY)}}),Nl(i.scroller,"touchmove",function(){i.activeTouch&&(i.activeTouch.moved=!0)}),Nl(i.scroller,"touchend",function(r){var o=i.activeTouch
if(o&&!Kt(i,r)&&null!=o.left&&!o.moved&&new Date-o.start<300){var l,s=e.coordsChar(i.activeTouch,"page")
l=!o.prev||n(o,o.prev)?new fe(s,s):!o.prev.prev||n(o,o.prev.prev)?e.findWordAt(s):new fe(Io(s.line,0),ve(e.doc,Io(s.line+1,0))),e.setSelection(l.anchor,l.head),e.focus(),Tl(r)}t()}),Nl(i.scroller,"touchcancel",t),Nl(i.scroller,"scroll",function(){i.scroller.clientHeight&&(rr(e,i.scroller.scrollTop),nr(e,i.scroller.scrollLeft,!0),Ol(e,"scroll",e))}),Nl(i.scroller,"mousewheel",function(t){ir(e,t)}),Nl(i.scroller,"DOMMouseScroll",function(t){ir(e,t)}),Nl(i.wrapper,"scroll",function(){i.wrapper.scrollTop=i.wrapper.scrollLeft=0}),i.dragFunctions={enter:function(t){Ti(e,t)||Ml(t)},over:function(t){Ti(e,t)||(er(e,t),Ml(t))},start:function(t){Jt(e,t)},drop:At(e,Qt),leave:function(){tr(e)}}
var s=i.input.getField()
Nl(s,"keyup",function(t){fr.call(e,t)}),Nl(s,"keydown",At(e,cr)),Nl(s,"keypress",At(e,dr)),Nl(s,"focus",zi(gr,e)),Nl(s,"blur",zi(vr,e))}function Ut(t,r,n){var i=n&&n!=e.Init
if(!r!=!i){var o=t.display.dragFunctions,l=r?Nl:Wl
l(t.display.scroller,"dragstart",o.start),l(t.display.scroller,"dragenter",o.enter),l(t.display.scroller,"dragover",o.over),l(t.display.scroller,"dragleave",o.leave),l(t.display.scroller,"drop",o.drop)}}function Vt(e){var t=e.display;(t.lastWrapHeight!=t.wrapper.clientHeight||t.lastWrapWidth!=t.wrapper.clientWidth)&&(t.cachedCharWidth=t.cachedTextHeight=t.cachedPaddingH=null,t.scrollbarsClipped=!1,e.setSize())}function Kt(e,t){for(var r=wi(t);r!=e.wrapper;r=r.parentNode)if(!r||1==r.nodeType&&"true"==r.getAttribute("cm-ignore-events")||r.parentNode==e.sizer&&r!=e.mover)return!0}function jt(e,t,r,n){var i=e.display
if(!r&&"true"==wi(t).getAttribute("cm-not-content"))return null
var o,l,s=i.lineSpace.getBoundingClientRect()
try{o=t.clientX-s.left,l=t.clientY-s.top}catch(t){return null}var a,u=gt(e,o,l)
if(n&&1==u.xRel&&(a=qn(e.doc,u.line).text).length==u.ch){var c=Fl(a,a.length,e.options.tabSize)-a.length
u=Io(u.line,Math.max(0,Math.round((o-Ke(e.display).left)/yt(e.display))-c))}return u}function Xt(e){var t=this,r=t.display
if(!(r.activeTouch&&r.input.supportsTouch()||Ti(t,e))){if(r.shift=e.shiftKey,Kt(r,e))return void(wo||(r.scroller.draggable=!1,setTimeout(function(){r.scroller.draggable=!0},100)))
if(!Zt(t,e)){var n=jt(t,e)
switch(window.focus(),xi(e)){case 1:t.state.selectingText?t.state.selectingText(e):n?Yt(t,e,n):wi(e)==r.scroller&&Tl(e)
break
case 2:wo&&(t.state.lastMiddleDown=+new Date),n&&xe(t.doc,n),setTimeout(function(){r.input.focus()},20),Tl(e)
break
case 3:Ho?mr(t,e):pr(t)}}}}function Yt(e,t,r){yo?setTimeout(zi(q,e),0):e.curOp.focus=Ki()
var n,i=+new Date
Go&&Go.time>i-400&&0==zo(Go.pos,r)?n="triple":Bo&&Bo.time>i-400&&0==zo(Bo.pos,r)?(n="double",Go={time:i,pos:r}):(n="single",Bo={time:i,pos:r})
var o,l=e.doc.sel,s=Ao?t.metaKey:t.ctrlKey
e.options.dragDrop&&Ql&&!Z(e)&&"single"==n&&(o=l.contains(r))>-1&&(zo((o=l.ranges[o]).from(),r)<0||r.xRel>0)&&(zo(o.to(),r)>0||r.xRel<0)?_t(e,t,r,s):$t(e,t,r,n,s)}function _t(e,t,r,n){var i=e.display,o=+new Date,l=At(e,function(s){wo&&(i.scroller.draggable=!1),e.state.draggingText=!1,Wl(document,"mouseup",l),Wl(i.scroller,"drop",l),Math.abs(t.clientX-s.clientX)+Math.abs(t.clientY-s.clientY)<10&&(Tl(s),!n&&+new Date-200<o&&xe(e.doc,r),wo||yo&&9==bo?setTimeout(function(){document.body.focus(),i.input.focus()},20):i.input.focus())})
wo&&(i.scroller.draggable=!0),e.state.draggingText=l,i.scroller.dragDrop&&i.scroller.dragDrop(),Nl(document,"mouseup",l),Nl(i.scroller,"drop",l)}function $t(e,t,r,n,i){function o(t){if(0!=zo(v,t))if(v=t,"rect"==n){for(var i=[],o=e.options.tabSize,l=Fl(qn(u,r.line).text,r.ch,o),s=Fl(qn(u,t.line).text,t.ch,o),a=Math.min(l,s),d=Math.max(l,s),p=Math.min(r.line,t.line),g=Math.min(e.lastLine(),Math.max(r.line,t.line));g>=p;p++){var m=qn(u,p).text,y=Rl(m,a,o)
a==d?i.push(new fe(Io(p,y),Io(p,y))):m.length>y&&i.push(new fe(Io(p,y),Io(p,Rl(m,d,o))))}i.length||i.push(new fe(r,r)),Me(u,de(f.ranges.slice(0,h).concat(i),h),{origin:"*mouse",scroll:!1}),e.scrollIntoView(t)}else{var b=c,w=b.anchor,x=t
if("single"!=n){if("double"==n)var C=e.findWordAt(t)
else var C=new fe(Io(t.line,0),ve(u,Io(t.line+1,0)))
zo(C.anchor,w)>0?(x=C.head,w=$(b.from(),C.anchor)):(x=C.anchor,w=_(b.to(),C.head))}var i=f.ranges.slice(0)
i[h]=new fe(ve(u,w),x),Me(u,de(i,h),Il)}}function l(t){var r=++y,i=jt(e,t,!0,"rect"==n)
if(i)if(0!=zo(i,v)){e.curOp.focus=Ki(),o(i)
var s=w(a,u);(i.line>=s.to||i.line<s.from)&&setTimeout(At(e,function(){y==r&&l(t)}),150)}else{var c=t.clientY<m.top?-20:t.clientY>m.bottom?20:0
c&&setTimeout(At(e,function(){y==r&&(a.scroller.scrollTop+=c,l(t))}),50)}}function s(t){e.state.selectingText=!1,y=1/0,Tl(t),a.input.focus(),Wl(document,"mousemove",b),Wl(document,"mouseup",x),u.history.lastSelOrigin=null}var a=e.display,u=e.doc
Tl(t)
var c,h,f=u.sel,d=f.ranges
if(i&&!t.shiftKey?(h=u.sel.contains(r),c=h>-1?d[h]:new fe(r,r)):(c=u.sel.primary(),h=u.sel.primIndex),t.altKey)n="rect",i||(c=new fe(r,r)),r=jt(e,t,!0,!0),h=-1
else if("double"==n){var p=e.findWordAt(r)
c=e.display.shift||u.extend?we(u,c,p.anchor,p.head):p}else if("triple"==n){var g=new fe(Io(r.line,0),ve(u,Io(r.line+1,0)))
c=e.display.shift||u.extend?we(u,c,g.anchor,g.head):g}else c=we(u,c,r)
i?-1==h?(h=d.length,Me(u,de(d.concat([c]),h),{scroll:!1,origin:"*mouse"})):d.length>1&&d[h].empty()&&"single"==n&&!t.shiftKey?(Me(u,de(d.slice(0,h).concat(d.slice(h+1)),0),{scroll:!1,origin:"*mouse"}),f=u.sel):Se(u,h,c,Il):(h=0,Me(u,new he([c],0),Il),f=u.sel)
var v=r,m=a.wrapper.getBoundingClientRect(),y=0,b=At(e,function(e){xi(e)?l(e):s(e)}),x=At(e,s)
e.state.selectingText=x,Nl(document,"mousemove",b),Nl(document,"mouseup",x)}function qt(e,t,r,n){try{var i=t.clientX,o=t.clientY}catch(t){return!1}if(i>=Math.floor(e.display.gutters.getBoundingClientRect().right))return!1
n&&Tl(t)
var l=e.display,s=l.lineDiv.getBoundingClientRect()
if(o>s.bottom||!Mi(e,r))return bi(t)
o-=s.top-l.viewOffset
for(var a=0;a<e.options.gutters.length;++a){var u=l.gutters.childNodes[a]
if(u&&u.getBoundingClientRect().right>=i){var c=ti(e.doc,o),h=e.options.gutters[a]
return Ol(e,r,e,c,h,t),bi(t)}}}function Zt(e,t){return qt(e,t,"gutterClick",!0)}function Qt(e){var t=this
if(tr(t),!Ti(t,e)&&!Kt(t.display,e)){Tl(e),yo&&(jo=+new Date)
var r=jt(t,e,!0),n=e.dataTransfer.files
if(r&&!Z(t))if(n&&n.length&&window.FileReader&&window.File)for(var i=n.length,o=Array(i),l=0,s=function(e,n){if(!t.options.allowDropFileTypes||-1!=Di(t.options.allowDropFileTypes,e.type)){var s=new FileReader
s.onload=At(t,function(){var e=s.result
if(/[\x00-\x08\x0e-\x1f]{2}/.test(e)&&(e=""),o[n]=e,++l==i){r=ve(t.doc,r)
var a={from:r,to:r,text:t.doc.splitLines(o.join(t.doc.lineSeparator())),origin:"paste"}
Lr(t.doc,a),ke(t.doc,pe(r,Zo(a)))}}),s.readAsText(e)}},a=0;i>a;++a)s(n[a],a)
else{if(t.state.draggingText&&t.doc.sel.contains(r)>-1)return t.state.draggingText(e),void setTimeout(function(){t.display.input.focus()},20)
try{var o=e.dataTransfer.getData("Text")
if(o){if(t.state.draggingText&&!(Ao?e.altKey:e.ctrlKey))var u=t.listSelections()
if(Ne(t.doc,pe(r,r)),u)for(var a=0;a<u.length;++a)Wr(t.doc,"",u[a].anchor,u[a].head,"drag")
t.replaceSelection(o,"around","paste"),t.display.input.focus()}}catch(e){}}}}function Jt(e,t){if(yo&&(!e.state.draggingText||+new Date-jo<100))return void Ml(t)
if(!Ti(e,t)&&!Kt(e.display,t)&&(t.dataTransfer.setData("Text",e.getSelection()),t.dataTransfer.setDragImage&&!Lo)){var r=Gi("img",null,null,"position: fixed; left: 0; top: 0;")
r.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",So&&(r.width=r.height=1,e.display.wrapper.appendChild(r),r._top=r.offsetTop),t.dataTransfer.setDragImage(r,0,0),So&&r.parentNode.removeChild(r)}}function er(e,t){var r=jt(e,t)
if(r){var n=document.createDocumentFragment()
Pe(e,r,n),e.display.dragCursor||(e.display.dragCursor=Gi("div",null,"CodeMirror-cursors CodeMirror-dragcursors"),e.display.lineSpace.insertBefore(e.display.dragCursor,e.display.cursorDiv)),Vi(e.display.dragCursor,n)}}function tr(e){e.display.dragCursor&&(e.display.lineSpace.removeChild(e.display.dragCursor),e.display.dragCursor=null)}function rr(e,t){Math.abs(e.doc.scrollTop-t)<2||(e.doc.scrollTop=t,go||A(e,{top:t}),e.display.scroller.scrollTop!=t&&(e.display.scroller.scrollTop=t),e.display.scrollbars.setScrollTop(t),go&&A(e),Fe(e,100))}function nr(e,t,r){(r?t==e.doc.scrollLeft:Math.abs(e.doc.scrollLeft-t)<2)||(t=Math.min(t,e.display.scroller.scrollWidth-e.display.scroller.clientWidth),e.doc.scrollLeft=t,x(e),e.display.scroller.scrollLeft!=t&&(e.display.scroller.scrollLeft=t),e.display.scrollbars.setScrollLeft(t))}function ir(e,t){var r=_o(t),n=r.x,i=r.y,o=e.display,l=o.scroller,s=l.scrollWidth>l.clientWidth,a=l.scrollHeight>l.clientHeight
if(n&&s||i&&a){if(i&&Ao&&wo)e:for(var u=t.target,c=o.view;u!=l;u=u.parentNode)for(var h=0;h<c.length;h++)if(c[h].node==u){e.display.currentWheelTarget=u
break e}if(n&&!go&&!So&&null!=Yo)return i&&a&&rr(e,Math.max(0,Math.min(l.scrollTop+i*Yo,l.scrollHeight-l.clientHeight))),nr(e,Math.max(0,Math.min(l.scrollLeft+n*Yo,l.scrollWidth-l.clientWidth))),(!i||i&&a)&&Tl(t),void(o.wheelStartX=null)
if(i&&null!=Yo){var f=i*Yo,d=e.doc.scrollTop,p=d+o.wrapper.clientHeight
0>f?d=Math.max(0,d+f-50):p=Math.min(e.doc.height,p+f+50),A(e,{top:d,bottom:p})}20>Xo&&(null==o.wheelStartX?(o.wheelStartX=l.scrollLeft,o.wheelStartY=l.scrollTop,o.wheelDX=n,o.wheelDY=i,setTimeout(function(){if(null!=o.wheelStartX){var e=l.scrollLeft-o.wheelStartX,t=l.scrollTop-o.wheelStartY,r=t&&o.wheelDY&&t/o.wheelDY||e&&o.wheelDX&&e/o.wheelDX
o.wheelStartX=o.wheelStartY=null,r&&(Yo=(Yo*Xo+r)/(Xo+1),++Xo)}},200)):(o.wheelDX+=n,o.wheelDY+=i))}}function or(e,t,r){if("string"==typeof t&&(t=al[t],!t))return!1
e.display.input.ensurePolled()
var n=e.display.shift,i=!1
try{Z(e)&&(e.state.suppressEdits=!0),r&&(e.display.shift=!1),i=t(e)!=El}finally{e.display.shift=n,e.state.suppressEdits=!1}return i}function lr(e,t,r){for(var n=0;n<e.state.keyMaps.length;n++){var i=cl(t,e.state.keyMaps[n],r,e)
if(i)return i}return e.options.extraKeys&&cl(t,e.options.extraKeys,r,e)||cl(t,e.options.keyMap,r,e)}function sr(e,t,r,n){var i=e.state.keySeq
if(i){if(hl(t))return"handled"
$o.set(50,function(){e.state.keySeq==i&&(e.state.keySeq=null,e.display.input.reset())}),t=i+" "+t}var o=lr(e,t,n)
return"multi"==o&&(e.state.keySeq=t),"handled"==o&&Si(e,"keyHandled",e,t,r),("handled"==o||"multi"==o)&&(Tl(r),ze(e)),i&&!o&&/\'$/.test(t)?(Tl(r),!0):!!o}function ar(e,t){var r=fl(t,!0)
return r?t.shiftKey&&!e.state.keySeq?sr(e,"Shift-"+r,t,function(t){return or(e,t,!0)})||sr(e,r,t,function(t){return("string"==typeof t?/^go[A-Z]/.test(t):t.motion)?or(e,t):void 0}):sr(e,r,t,function(t){return or(e,t)}):!1}function ur(e,t,r){return sr(e,"'"+r+"'",t,function(t){return or(e,t,!0)})}function cr(e){var t=this
if(t.curOp.focus=Ki(),!Ti(t,e)){yo&&11>bo&&27==e.keyCode&&(e.returnValue=!1)
var r=e.keyCode
t.display.shift=16==r||e.shiftKey
var n=ar(t,e)
So&&(qo=n?r:null,!n&&88==r&&!ts&&(Ao?e.metaKey:e.ctrlKey)&&t.replaceSelection("",null,"cut")),18!=r||/\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className)||hr(t)}}function hr(e){function t(e){18!=e.keyCode&&e.altKey||($l(r,"CodeMirror-crosshair"),Wl(document,"keyup",t),Wl(document,"mouseover",t))}var r=e.display.lineDiv
ql(r,"CodeMirror-crosshair"),Nl(document,"keyup",t),Nl(document,"mouseover",t)}function fr(e){16==e.keyCode&&(this.doc.sel.shift=!1),Ti(this,e)}function dr(e){var t=this
if(!(Kt(t.display,e)||Ti(t,e)||e.ctrlKey&&!e.altKey||Ao&&e.metaKey)){var r=e.keyCode,n=e.charCode
if(So&&r==qo)return qo=null,void Tl(e)
if(!So||e.which&&!(e.which<10)||!ar(t,e)){var i=String.fromCharCode(null==n?r:n)
ur(t,e,i)||t.display.input.onKeyPress(e)}}}function pr(e){e.state.delayingBlurEvent=!0,setTimeout(function(){e.state.delayingBlurEvent&&(e.state.delayingBlurEvent=!1,vr(e))},100)}function gr(e){e.state.delayingBlurEvent&&(e.state.delayingBlurEvent=!1),"nocursor"!=e.options.readOnly&&(e.state.focused||(Ol(e,"focus",e),e.state.focused=!0,ql(e.display.wrapper,"CodeMirror-focused"),e.curOp||e.display.selForContextMenu==e.doc.sel||(e.display.input.reset(),wo&&setTimeout(function(){e.display.input.reset(!0)},20)),e.display.input.receivedFocus()),ze(e))}function vr(e){e.state.delayingBlurEvent||(e.state.focused&&(Ol(e,"blur",e),e.state.focused=!1,$l(e.display.wrapper,"CodeMirror-focused")),clearInterval(e.display.blinker),setTimeout(function(){e.state.focused||(e.display.shift=!1)},150))}function mr(e,t){Kt(e.display,t)||yr(e,t)||Ti(e,t,"contextmenu")||e.display.input.onContextMenu(t)}function yr(e,t){return Mi(e,"gutterContextMenu")?qt(e,t,"gutterContextMenu",!1):!1}function br(e,t){if(zo(e,t.from)<0)return e
if(zo(e,t.to)<=0)return Zo(t)
var r=e.line+t.text.length-(t.to.line-t.from.line)-1,n=e.ch
return e.line==t.to.line&&(n+=Zo(t).ch-t.to.ch),Io(r,n)}function wr(e,t){for(var r=[],n=0;n<e.sel.ranges.length;n++){var i=e.sel.ranges[n]
r.push(new fe(br(i.anchor,t),br(i.head,t)))}return de(r,e.sel.primIndex)}function xr(e,t,r){return e.line==t.line?Io(r.line,e.ch-t.ch+r.ch):Io(r.line+(e.line-t.line),e.ch)}function Cr(e,t,r){for(var n=[],i=Io(e.first,0),o=i,l=0;l<t.length;l++){var s=t[l],a=xr(s.from,i,o),u=xr(Zo(s),i,o)
if(i=s.to,o=u,"around"==r){var c=e.sel.ranges[l],h=zo(c.head,c.anchor)<0
n[l]=new fe(h?u:a,h?a:u)}else n[l]=new fe(a,a)}return new he(n,e.sel.primIndex)}function Sr(e,t,r){var n={canceled:!1,from:t.from,to:t.to,text:t.text,origin:t.origin,cancel:function(){this.canceled=!0}}
return r&&(n.update=function(t,r,n,i){t&&(this.from=ve(e,t)),r&&(this.to=ve(e,r)),n&&(this.text=n),void 0!==i&&(this.origin=i)}),Ol(e,"beforeChange",e,n),e.cm&&Ol(e.cm,"beforeChange",e.cm,n),n.canceled?null:{from:n.from,to:n.to,text:n.text,origin:n.origin}}function Lr(e,t,r){if(e.cm){if(!e.cm.curOp)return At(e.cm,Lr)(e,t,r)
if(e.cm.state.suppressEdits)return}if(!(Mi(e,"beforeChange")||e.cm&&Mi(e.cm,"beforeChange"))||(t=Sr(e,t,!0))){var n=Eo&&!r&&sn(e,t.from,t.to)
if(n)for(var i=n.length-1;i>=0;--i)Tr(e,{from:n[i].from,to:n[i].to,text:i?[""]:t.text})
else Tr(e,t)}}function Tr(e,t){if(1!=t.text.length||""!=t.text[0]||0!=zo(t.from,t.to)){var r=wr(e,t)
ai(e,t,r,e.cm?e.cm.curOp.id:NaN),Nr(e,t,r,nn(e,t))
var n=[]
_n(e,function(e,r){r||-1!=Di(n,e.history)||(yi(e.history,t),n.push(e.history)),Nr(e,t,null,nn(e,t))})}}function kr(e,t,r){if(!e.cm||!e.cm.state.suppressEdits){for(var n,i=e.history,o=e.sel,l="undo"==t?i.done:i.undone,s="undo"==t?i.undone:i.done,a=0;a<l.length&&(n=l[a],r?!n.ranges||n.equals(e.sel):n.ranges);a++);if(a!=l.length){for(i.lastOrigin=i.lastSelOrigin=null;n=l.pop(),n.ranges;){if(hi(n,s),r&&!n.equals(e.sel))return void Me(e,n,{clearRedo:!1})
o=n}var u=[]
hi(o,s),s.push({changes:u,generation:i.generation}),i.generation=n.generation||++i.maxGeneration
for(var c=Mi(e,"beforeChange")||e.cm&&Mi(e.cm,"beforeChange"),a=n.changes.length-1;a>=0;--a){var h=n.changes[a]
if(h.origin=t,c&&!Sr(e,h,!1))return void(l.length=0)
u.push(oi(e,h))
var f=a?wr(e,h):Oi(l)
Nr(e,h,f,ln(e,h)),!a&&e.cm&&e.cm.scrollIntoView({from:h.from,to:Zo(h)})
var d=[]
_n(e,function(e,t){t||-1!=Di(d,e.history)||(yi(e.history,h),d.push(e.history)),Nr(e,h,null,ln(e,h))})}}}}function Mr(e,t){if(0!=t&&(e.first+=t,e.sel=new he(Hi(e.sel.ranges,function(e){return new fe(Io(e.anchor.line+t,e.anchor.ch),Io(e.head.line+t,e.head.ch))}),e.sel.primIndex),e.cm)){Et(e.cm,e.first,e.first-t,t)
for(var r=e.cm.display,n=r.viewFrom;n<r.viewTo;n++)Pt(e.cm,n,"gutter")}}function Nr(e,t,r,n){if(e.cm&&!e.cm.curOp)return At(e.cm,Nr)(e,t,r,n)
if(t.to.line<e.first)return void Mr(e,t.text.length-1-(t.to.line-t.from.line))
if(!(t.from.line>e.lastLine())){if(t.from.line<e.first){var i=t.text.length-1-(e.first-t.from.line)
Mr(e,i),t={from:Io(e.first,0),to:Io(t.to.line+i,t.to.ch),text:[Oi(t.text)],origin:t.origin}}var o=e.lastLine()
t.to.line>o&&(t={from:t.from,to:Io(o,qn(e,o).text.length),text:[t.text[0]],origin:t.origin}),t.removed=Zn(e,t.from,t.to),r||(r=wr(e,t)),e.cm?Ar(e.cm,t,n):jn(e,t,n),Ne(e,r,Pl)}}function Ar(e,t,r){var n=e.doc,i=e.display,l=t.from,s=t.to,a=!1,u=l.line
e.options.lineWrapping||(u=ei(mn(qn(n,l.line))),n.iter(u,s.line+1,function(e){return e==i.maxLine?(a=!0,!0):void 0})),n.sel.contains(t.from,t.to)>-1&&ki(e),jn(n,t,r,o(e)),e.options.lineWrapping||(n.iter(u,l.line+t.text.length,function(e){var t=h(e)
t>i.maxLineLength&&(i.maxLine=e,i.maxLineLength=t,i.maxLineChanged=!0,a=!1)}),a&&(e.curOp.updateMaxLine=!0)),n.frontier=Math.min(n.frontier,l.line),Fe(e,400)
var c=t.text.length-(s.line-l.line)-1
t.full?Et(e):l.line!=s.line||1!=t.text.length||Kn(e.doc,t)?Et(e,l.line,s.line+1,c):Pt(e,l.line,"text")
var f=Mi(e,"changes"),d=Mi(e,"change")
if(d||f){var p={from:l,to:s,text:t.text,removed:t.removed,origin:t.origin}
d&&Si(e,"change",e,p),f&&(e.curOp.changeObjs||(e.curOp.changeObjs=[])).push(p)}e.display.selForContextMenu=null}function Wr(e,t,r,n,i){if(n||(n=r),zo(n,r)<0){var o=n
n=r,r=o}"string"==typeof t&&(t=e.splitLines(t)),Lr(e,{from:r,to:n,text:t,origin:i})}function Or(e,t){if(!Ti(e,"scrollCursorIntoView")){var r=e.display,n=r.sizer.getBoundingClientRect(),i=null
if(t.top+n.top<0?i=!0:t.bottom+n.top>(window.innerHeight||document.documentElement.clientHeight)&&(i=!1),null!=i&&!ko){var o=Gi("div","​",null,"position: absolute; top: "+(t.top-r.viewOffset-Ue(e.display))+"px; height: "+(t.bottom-t.top+je(e)+r.barHeight)+"px; left: "+t.left+"px; width: 2px;")
e.display.lineSpace.appendChild(o),o.scrollIntoView(i),e.display.lineSpace.removeChild(o)}}}function Dr(e,t,r,n){null==n&&(n=0)
for(var i=0;5>i;i++){var o=!1,l=ft(e,t),s=r&&r!=t?ft(e,r):l,a=Er(e,Math.min(l.left,s.left),Math.min(l.top,s.top)-n,Math.max(l.left,s.left),Math.max(l.bottom,s.bottom)+n),u=e.doc.scrollTop,c=e.doc.scrollLeft
if(null!=a.scrollTop&&(rr(e,a.scrollTop),Math.abs(e.doc.scrollTop-u)>1&&(o=!0)),null!=a.scrollLeft&&(nr(e,a.scrollLeft),Math.abs(e.doc.scrollLeft-c)>1&&(o=!0)),!o)break}return l}function Hr(e,t,r,n,i){var o=Er(e,t,r,n,i)
null!=o.scrollTop&&rr(e,o.scrollTop),null!=o.scrollLeft&&nr(e,o.scrollLeft)}function Er(e,t,r,n,i){var o=e.display,l=mt(e.display)
0>r&&(r=0)
var s=e.curOp&&null!=e.curOp.scrollTop?e.curOp.scrollTop:o.scroller.scrollTop,a=Ye(e),u={}
i-r>a&&(i=r+a)
var c=e.doc.height+Ve(o),h=l>r,f=i>c-l
if(s>r)u.scrollTop=h?0:r
else if(i>s+a){var d=Math.min(r,(f?c:i)-a)
d!=s&&(u.scrollTop=d)}var p=e.curOp&&null!=e.curOp.scrollLeft?e.curOp.scrollLeft:o.scroller.scrollLeft,g=Xe(e)-(e.options.fixedGutter?o.gutters.offsetWidth:0),v=n-t>g
return v&&(n=t+g),10>t?u.scrollLeft=0:p>t?u.scrollLeft=Math.max(0,t-(v?0:10)):n>g+p-3&&(u.scrollLeft=n+(v?0:10)-g),u}function Pr(e,t,r){(null!=t||null!=r)&&zr(e),null!=t&&(e.curOp.scrollLeft=(null==e.curOp.scrollLeft?e.doc.scrollLeft:e.curOp.scrollLeft)+t),null!=r&&(e.curOp.scrollTop=(null==e.curOp.scrollTop?e.doc.scrollTop:e.curOp.scrollTop)+r)}function Ir(e){zr(e)
var t=e.getCursor(),r=t,n=t
e.options.lineWrapping||(r=t.ch?Io(t.line,t.ch-1):t,n=Io(t.line,t.ch+1)),e.curOp.scrollToPos={from:r,to:n,margin:e.options.cursorScrollMargin,isCursor:!0}}function zr(e){var t=e.curOp.scrollToPos
if(t){e.curOp.scrollToPos=null
var r=dt(e,t.from),n=dt(e,t.to),i=Er(e,Math.min(r.left,n.left),Math.min(r.top,n.top)-t.margin,Math.max(r.right,n.right),Math.max(r.bottom,n.bottom)+t.margin)
e.scrollTo(i.scrollLeft,i.scrollTop)}}function Fr(e,t,r,n){var i,o=e.doc
null==r&&(r="add"),"smart"==r&&(o.mode.indent?i=Ge(e,t):r="prev")
var l=e.options.tabSize,s=qn(o,t),a=Fl(s.text,null,l)
s.stateAfter&&(s.stateAfter=null)
var u,c=s.text.match(/^\s*/)[0]
if(n||/\S/.test(s.text)){if("smart"==r&&(u=o.mode.indent(i,s.text.slice(c.length),s.text),u==El||u>150)){if(!n)return
r="prev"}}else u=0,r="not"
"prev"==r?u=t>o.first?Fl(qn(o,t-1).text,null,l):0:"add"==r?u=a+e.options.indentUnit:"subtract"==r?u=a-e.options.indentUnit:"number"==typeof r&&(u=a+r),u=Math.max(0,u)
var h="",f=0
if(e.options.indentWithTabs)for(var d=Math.floor(u/l);d;--d)f+=l,h+="	"
if(u>f&&(h+=Wi(u-f)),h!=c)return Wr(o,h,Io(t,0),Io(t,c.length),"+input"),s.stateAfter=null,!0
for(var d=0;d<o.sel.ranges.length;d++){var p=o.sel.ranges[d]
if(p.head.line==t&&p.head.ch<c.length){var f=Io(t,c.length)
Se(o,d,new fe(f,f))
break}}}function Rr(e,t,r,n){var i=t,o=t
return"number"==typeof t?o=qn(e,ge(e,t)):i=ei(t),null==i?null:(n(o,i)&&e.cm&&Pt(e.cm,i,r),o)}function Br(e,t){for(var r=e.doc.sel.ranges,n=[],i=0;i<r.length;i++){for(var o=t(r[i]);n.length&&zo(o.from,Oi(n).to)<=0;){var l=n.pop()
if(zo(l.from,o.from)<0){o.from=l.from
break}}n.push(o)}Nt(e,function(){for(var t=n.length-1;t>=0;t--)Wr(e.doc,"",n[t].from,n[t].to,"+delete")
Ir(e)})}function Gr(e,t,r,n,i){function o(){var t=s+r
return t<e.first||t>=e.first+e.size?h=!1:(s=t,c=qn(e,t))}function l(e){var t=(i?co:ho)(c,a,r,!0)
if(null==t){if(e||!o())return h=!1
a=i?(0>r?no:ro)(c):0>r?c.text.length:0}else a=t
return!0}var s=t.line,a=t.ch,u=r,c=qn(e,s),h=!0
if("char"==n)l()
else if("column"==n)l(!0)
else if("word"==n||"group"==n)for(var f=null,d="group"==n,p=e.cm&&e.cm.getHelper(t,"wordChars"),g=!0;!(0>r)||l(!g);g=!1){var v=c.text.charAt(a)||"\n",m=Fi(v,p)?"w":d&&"\n"==v?"n":!d||/\s/.test(v)?null:"p"
if(!d||g||m||(m="s"),f&&f!=m){0>r&&(r=1,l())
break}if(m&&(f=m),r>0&&!l(!g))break}var y=De(e,Io(s,a),u,!0)
return h||(y.hitSide=!0),y}function Ur(e,t,r,n){var i,o=e.doc,l=t.left
if("page"==n){var s=Math.min(e.display.wrapper.clientHeight,window.innerHeight||document.documentElement.clientHeight)
i=t.top+r*(s-(0>r?1.5:.5)*mt(e.display))}else"line"==n&&(i=r>0?t.bottom+3:t.top-3)
for(;;){var a=gt(e,l,i)
if(!a.outside)break
if(0>r?0>=i:i>=o.height){a.hitSide=!0
break}i+=5*r}return a}function Vr(t,r,n,i){e.defaults[t]=r,n&&(Jo[t]=i?function(e,t,r){r!=el&&n(e,t,r)}:n)}function Kr(e){for(var t,r,n,i,o=e.split(/-(?!$)/),e=o[o.length-1],l=0;l<o.length-1;l++){var s=o[l]
if(/^(cmd|meta|m)$/i.test(s))i=!0
else if(/^a(lt)?$/i.test(s))t=!0
else if(/^(c|ctrl|control)$/i.test(s))r=!0
else{if(!/^s(hift)$/i.test(s))throw Error("Unrecognized modifier name: "+s)
n=!0}}return t&&(e="Alt-"+e),r&&(e="Ctrl-"+e),i&&(e="Cmd-"+e),n&&(e="Shift-"+e),e}function jr(e){return"string"==typeof e?ul[e]:e}function Xr(e,t,r,n,i){if(n&&n.shared)return Yr(e,t,r,n,i)
if(e.cm&&!e.cm.curOp)return At(e.cm,Xr)(e,t,r,n,i)
var o=new gl(e,i),l=zo(t,r)
if(n&&Ii(n,o,!1),l>0||0==l&&o.clearWhenEmpty!==!1)return o
if(o.replacedWith&&(o.collapsed=!0,o.widgetNode=Gi("span",[o.replacedWith],"CodeMirror-widget"),n.handleMouseEvents||o.widgetNode.setAttribute("cm-ignore-events","true"),n.insertLeft&&(o.widgetNode.insertLeft=!0)),o.collapsed){if(vn(e,t.line,t,r,o)||t.line!=r.line&&vn(e,r.line,t,r,o))throw Error("Inserting collapsed marker partially overlapping an existing one")
Po=!0}o.addToHistory&&ai(e,{from:t,to:r,origin:"markText"},e.sel,NaN)
var s,a=t.line,u=e.cm
if(e.iter(a,r.line+1,function(e){u&&o.collapsed&&!u.options.lineWrapping&&mn(e)==u.display.maxLine&&(s=!0),o.collapsed&&a!=t.line&&Jn(e,0),en(e,new Zr(o,a==t.line?t.ch:null,a==r.line?r.ch:null)),++a}),o.collapsed&&e.iter(t.line,r.line+1,function(t){xn(e,t)&&Jn(t,0)}),o.clearOnEnter&&Nl(o,"beforeCursorEnter",function(){o.clear()}),o.readOnly&&(Eo=!0,(e.history.done.length||e.history.undone.length)&&e.clearHistory()),o.collapsed&&(o.id=++pl,o.atomic=!0),u){if(s&&(u.curOp.updateMaxLine=!0),o.collapsed)Et(u,t.line,r.line+1)
else if(o.className||o.title||o.startStyle||o.endStyle||o.css)for(var c=t.line;c<=r.line;c++)Pt(u,c,"text")
o.atomic&&We(u.doc),Si(u,"markerAdded",u,o)}return o}function Yr(e,t,r,n,i){n=Ii(n),n.shared=!1
var o=[Xr(e,t,r,n,i)],l=o[0],s=n.widgetNode
return _n(e,function(e){s&&(n.widgetNode=s.cloneNode(!0)),o.push(Xr(e,ve(e,t),ve(e,r),n,i))
for(var a=0;a<e.linked.length;++a)if(e.linked[a].isParent)return
l=Oi(o)}),new vl(o,l)}function _r(e){return e.findMarks(Io(e.first,0),e.clipPos(Io(e.lastLine())),function(e){return e.parent})}function $r(e,t){for(var r=0;r<t.length;r++){var n=t[r],i=n.find(),o=e.clipPos(i.from),l=e.clipPos(i.to)
if(zo(o,l)){var s=Xr(e,o,l,n.primary,n.primary.type)
n.markers.push(s),s.parent=n}}}function qr(e){for(var t=0;t<e.length;t++){var r=e[t],n=[r.primary.doc]
_n(r.primary.doc,function(e){n.push(e)})
for(var i=0;i<r.markers.length;i++){var o=r.markers[i];-1==Di(n,o.doc)&&(o.parent=null,r.markers.splice(i--,1))}}}function Zr(e,t,r){this.marker=e,this.from=t,this.to=r}function Qr(e,t){if(e)for(var r=0;r<e.length;++r){var n=e[r]
if(n.marker==t)return n}}function Jr(e,t){for(var r,n=0;n<e.length;++n)e[n]!=t&&(r||(r=[])).push(e[n])
return r}function en(e,t){e.markedSpans=e.markedSpans?e.markedSpans.concat([t]):[t],t.marker.attachLine(e)}function tn(e,t,r){if(e)for(var n,i=0;i<e.length;++i){var o=e[i],l=o.marker,s=null==o.from||(l.inclusiveLeft?o.from<=t:o.from<t)
if(s||o.from==t&&"bookmark"==l.type&&(!r||!o.marker.insertLeft)){var a=null==o.to||(l.inclusiveRight?o.to>=t:o.to>t);(n||(n=[])).push(new Zr(l,o.from,a?null:o.to))}}return n}function rn(e,t,r){if(e)for(var n,i=0;i<e.length;++i){var o=e[i],l=o.marker,s=null==o.to||(l.inclusiveRight?o.to>=t:o.to>t)
if(s||o.from==t&&"bookmark"==l.type&&(!r||o.marker.insertLeft)){var a=null==o.from||(l.inclusiveLeft?o.from<=t:o.from<t);(n||(n=[])).push(new Zr(l,a?null:o.from-t,null==o.to?null:o.to-t))}}return n}function nn(e,t){if(t.full)return null
var r=ye(e,t.from.line)&&qn(e,t.from.line).markedSpans,n=ye(e,t.to.line)&&qn(e,t.to.line).markedSpans
if(!r&&!n)return null
var i=t.from.ch,o=t.to.ch,l=0==zo(t.from,t.to),s=tn(r,i,l),a=rn(n,o,l),u=1==t.text.length,c=Oi(t.text).length+(u?i:0)
if(s)for(var h=0;h<s.length;++h){var f=s[h]
if(null==f.to){var d=Qr(a,f.marker)
d?u&&(f.to=null==d.to?null:d.to+c):f.to=i}}if(a)for(var h=0;h<a.length;++h){var f=a[h]
if(null!=f.to&&(f.to+=c),null==f.from){var d=Qr(s,f.marker)
d||(f.from=c,u&&(s||(s=[])).push(f))}else f.from+=c,u&&(s||(s=[])).push(f)}s&&(s=on(s)),a&&a!=s&&(a=on(a))
var p=[s]
if(!u){var g,v=t.text.length-2
if(v>0&&s)for(var h=0;h<s.length;++h)null==s[h].to&&(g||(g=[])).push(new Zr(s[h].marker,null,null))
for(var h=0;v>h;++h)p.push(g)
p.push(a)}return p}function on(e){for(var t=0;t<e.length;++t){var r=e[t]
null!=r.from&&r.from==r.to&&r.marker.clearWhenEmpty!==!1&&e.splice(t--,1)}return e.length?e:null}function ln(e,t){var r=pi(e,t),n=nn(e,t)
if(!r)return n
if(!n)return r
for(var i=0;i<r.length;++i){var o=r[i],l=n[i]
if(o&&l)e:for(var s=0;s<l.length;++s){for(var a=l[s],u=0;u<o.length;++u)if(o[u].marker==a.marker)continue e
o.push(a)}else l&&(r[i]=l)}return r}function sn(e,t,r){var n=null
if(e.iter(t.line,r.line+1,function(e){if(e.markedSpans)for(var t=0;t<e.markedSpans.length;++t){var r=e.markedSpans[t].marker
!r.readOnly||n&&-1!=Di(n,r)||(n||(n=[])).push(r)}}),!n)return null
for(var i=[{from:t,to:r}],o=0;o<n.length;++o)for(var l=n[o],s=l.find(0),a=0;a<i.length;++a){var u=i[a]
if(!(zo(u.to,s.from)<0||zo(u.from,s.to)>0)){var c=[a,1],h=zo(u.from,s.from),f=zo(u.to,s.to);(0>h||!l.inclusiveLeft&&!h)&&c.push({from:u.from,to:s.from}),(f>0||!l.inclusiveRight&&!f)&&c.push({from:s.to,to:u.to}),i.splice.apply(i,c),a+=c.length-1}}return i}function an(e){var t=e.markedSpans
if(t){for(var r=0;r<t.length;++r)t[r].marker.detachLine(e)
e.markedSpans=null}}function un(e,t){if(t){for(var r=0;r<t.length;++r)t[r].marker.attachLine(e)
e.markedSpans=t}}function cn(e){return e.inclusiveLeft?-1:0}function hn(e){return e.inclusiveRight?1:0}function fn(e,t){var r=e.lines.length-t.lines.length
if(0!=r)return r
var n=e.find(),i=t.find(),o=zo(n.from,i.from)||cn(e)-cn(t)
if(o)return-o
var l=zo(n.to,i.to)||hn(e)-hn(t)
return l?l:t.id-e.id}function dn(e,t){var r,n=Po&&e.markedSpans
if(n)for(var i,o=0;o<n.length;++o)i=n[o],i.marker.collapsed&&null==(t?i.from:i.to)&&(!r||fn(r,i.marker)<0)&&(r=i.marker)
return r}function pn(e){return dn(e,!0)}function gn(e){return dn(e,!1)}function vn(e,t,r,n,i){var o=qn(e,t),l=Po&&o.markedSpans
if(l)for(var s=0;s<l.length;++s){var a=l[s]
if(a.marker.collapsed){var u=a.marker.find(0),c=zo(u.from,r)||cn(a.marker)-cn(i),h=zo(u.to,n)||hn(a.marker)-hn(i)
if(!(c>=0&&0>=h||0>=c&&h>=0)&&(0>=c&&(zo(u.to,r)>0||a.marker.inclusiveRight&&i.inclusiveLeft)||c>=0&&(zo(u.from,n)<0||a.marker.inclusiveLeft&&i.inclusiveRight)))return!0}}}function mn(e){for(var t;t=pn(e);)e=t.find(-1,!0).line
return e}function yn(e){for(var t,r;t=gn(e);)e=t.find(1,!0).line,(r||(r=[])).push(e)
return r}function bn(e,t){var r=qn(e,t),n=mn(r)
return r==n?t:ei(n)}function wn(e,t){if(t>e.lastLine())return t
var r,n=qn(e,t)
if(!xn(e,n))return t
for(;r=gn(n);)n=r.find(1,!0).line
return ei(n)+1}function xn(e,t){var r=Po&&t.markedSpans
if(r)for(var n,i=0;i<r.length;++i)if(n=r[i],n.marker.collapsed){if(null==n.from)return!0
if(!n.marker.widgetNode&&0==n.from&&n.marker.inclusiveLeft&&Cn(e,t,n))return!0}}function Cn(e,t,r){if(null==r.to){var n=r.marker.find(1,!0)
return Cn(e,n.line,Qr(n.line.markedSpans,r.marker))}if(r.marker.inclusiveRight&&r.to==t.text.length)return!0
for(var i,o=0;o<t.markedSpans.length;++o)if(i=t.markedSpans[o],i.marker.collapsed&&!i.marker.widgetNode&&i.from==r.to&&(null==i.to||i.to!=r.from)&&(i.marker.inclusiveLeft||r.marker.inclusiveRight)&&Cn(e,t,i))return!0}function Sn(e,t,r){ri(t)<(e.curOp&&e.curOp.scrollTop||e.doc.scrollTop)&&Pr(e,null,r)}function Ln(e){if(null!=e.height)return e.height
var t=e.doc.cm
if(!t)return 0
if(!Xl(document.body,e.node)){var r="position: relative;"
e.coverGutter&&(r+="margin-left: -"+t.display.gutters.offsetWidth+"px;"),e.noHScroll&&(r+="width: "+t.display.wrapper.clientWidth+"px;"),Vi(t.display.measure,Gi("div",[e.node],null,r))}return e.height=e.node.offsetHeight}function Tn(e,t,r,n){var i=new ml(e,r,n),o=e.cm
return o&&i.noHScroll&&(o.display.alignWidgets=!0),Rr(e,t,"widget",function(t){var r=t.widgets||(t.widgets=[])
if(null==i.insertAt?r.push(i):r.splice(Math.min(r.length-1,Math.max(0,i.insertAt)),0,i),i.line=t,o&&!xn(e,t)){var n=ri(t)<e.scrollTop
Jn(t,t.height+Ln(i)),n&&Pr(o,null,i.height),o.curOp.forceUpdate=!0}return!0}),i}function kn(e,t,r,n){e.text=t,e.stateAfter&&(e.stateAfter=null),e.styles&&(e.styles=null),null!=e.order&&(e.order=null),an(e),un(e,r)
var i=n?n(e):1
i!=e.height&&Jn(e,i)}function Mn(e){e.parent=null,an(e)}function Nn(e,t){if(e)for(;;){var r=e.match(/(?:^|\s+)line-(background-)?(\S+)/)
if(!r)break
e=e.slice(0,r.index)+e.slice(r.index+r[0].length)
var n=r[1]?"bgClass":"textClass"
null==t[n]?t[n]=r[2]:RegExp("(?:^|s)"+r[2]+"(?:$|s)").test(t[n])||(t[n]+=" "+r[2])}return e}function An(t,r){if(t.blankLine)return t.blankLine(r)
if(t.innerMode){var n=e.innerMode(t,r)
return n.mode.blankLine?n.mode.blankLine(n.state):void 0}}function Wn(t,r,n,i){for(var o=0;10>o;o++){i&&(i[0]=e.innerMode(t,n).mode)
var l=t.token(r,n)
if(r.pos>r.start)return l}throw Error("Mode "+t.name+" failed to advance stream.")}function On(e,t,r,n){function i(e){return{start:h.start,end:h.pos,string:h.current(),type:o||null,state:e?ll(l.mode,c):c}}var o,l=e.doc,s=l.mode
t=ve(l,t)
var a,u=qn(l,t.line),c=Ge(e,t.line,r),h=new dl(u.text,e.options.tabSize)
for(n&&(a=[]);(n||h.pos<t.ch)&&!h.eol();)h.start=h.pos,o=Wn(s,h,c),n&&a.push(i(!0))
return n?a:i()}function Dn(e,t,r,n,i,o,l){var s=r.flattenSpans
null==s&&(s=e.options.flattenSpans)
var a,u=0,c=null,h=new dl(t,e.options.tabSize),f=e.options.addModeClass&&[null]
for(""==t&&Nn(An(r,n),o);!h.eol();){if(h.pos>e.options.maxHighlightLength?(s=!1,l&&Pn(e,t,n,h.pos),h.pos=t.length,a=null):a=Nn(Wn(r,h,n,f),o),f){var d=f[0].name
d&&(a="m-"+(a?d+" "+a:d))}if(!s||c!=a){for(;u<h.start;)u=Math.min(h.start,u+5e4),i(u,c)
c=a}h.start=h.pos}for(;u<h.pos;){var p=Math.min(h.pos,u+5e4)
i(p,c),u=p}}function Hn(e,t,r,n){var i=[e.state.modeGen],o={}
Dn(e,t.text,e.doc.mode,r,function(e,t){i.push(e,t)},o,n)
for(var l=0;l<e.state.overlays.length;++l){var s=e.state.overlays[l],a=1,u=0
Dn(e,t.text,s.mode,!0,function(e,t){for(var r=a;e>u;){var n=i[a]
n>e&&i.splice(a,1,e,i[a+1],n),a+=2,u=Math.min(e,n)}if(t)if(s.opaque)i.splice(r,a-r,e,"cm-overlay "+t),a=r+2
else for(;a>r;r+=2){var o=i[r+1]
i[r+1]=(o?o+" ":"")+"cm-overlay "+t}},o)}return{styles:i,classes:o.bgClass||o.textClass?o:null}}function En(e,t,r){if(!t.styles||t.styles[0]!=e.state.modeGen){var n=Ge(e,ei(t)),i=Hn(e,t,t.text.length>e.options.maxHighlightLength?ll(e.doc.mode,n):n)
t.stateAfter=n,t.styles=i.styles,i.classes?t.styleClasses=i.classes:t.styleClasses&&(t.styleClasses=null),r===e.doc.frontier&&e.doc.frontier++}return t.styles}function Pn(e,t,r,n){var i=e.doc.mode,o=new dl(t,e.options.tabSize)
for(o.start=o.pos=n||0,""==t&&An(i,r);!o.eol();)Wn(i,o,r),o.start=o.pos}function In(e,t){if(!e||/^\s*$/.test(e))return null
var r=t.addModeClass?wl:bl
return r[e]||(r[e]=e.replace(/\S+/g,"cm-$&"))}function zn(e,t){var r=Gi("span",null,"CodeMirror-line-content",wo?"padding-right: .1px":null),n={pre:Gi("pre",[r],"CodeMirror-line"),content:r,col:0,pos:0,cm:e,splitSpaces:(yo||wo)&&e.getOption("lineWrapping")}
t.measure={}
for(var i=0;i<=(t.rest?t.rest.length:0);i++){var o,l=i?t.rest[i-1]:t.line
n.pos=0,n.addToken=Rn,Zi(e.display.measure)&&(o=ni(l))&&(n.addToken=Gn(n.addToken,o)),n.map=[]
var s=t!=e.display.externalMeasured&&ei(l)
Vn(l,n,En(e,l,s)),l.styleClasses&&(l.styleClasses.bgClass&&(n.bgClass=Xi(l.styleClasses.bgClass,n.bgClass||"")),l.styleClasses.textClass&&(n.textClass=Xi(l.styleClasses.textClass,n.textClass||""))),0==n.map.length&&n.map.push(0,0,n.content.appendChild(qi(e.display.measure))),0==i?(t.measure.map=n.map,t.measure.cache={}):((t.measure.maps||(t.measure.maps=[])).push(n.map),(t.measure.caches||(t.measure.caches=[])).push({}))}return wo&&/\bcm-tab\b/.test(n.content.lastChild.className)&&(n.content.className="cm-tab-wrap-hack"),Ol(e,"renderLine",e,t.line,n.pre),n.pre.className&&(n.textClass=Xi(n.pre.className,n.textClass||"")),n}function Fn(e){var t=Gi("span","•","cm-invalidchar")
return t.title="\\u"+e.charCodeAt(0).toString(16),t.setAttribute("aria-label",t.title),t}function Rn(e,t,r,n,i,o,l,s){if(t){var a=e.splitSpaces?t.replace(/ {3,}/g,Bn):t,u=e.cm.state.specialChars,c=!1
if(u.test(t))for(var h=document.createDocumentFragment(),f=0;;){u.lastIndex=f
var d=u.exec(t),p=d?d.index-f:t.length-f
if(p){var g=document.createTextNode(a.slice(f,f+p))
yo&&9>bo?h.appendChild(Gi("span",[g])):h.appendChild(g),e.map.push(e.pos,e.pos+p,g),e.col+=p,e.pos+=p}if(!d)break
if(f+=p+1,"	"==d[0]){var v=e.cm.options.tabSize,m=v-e.col%v,g=h.appendChild(Gi("span",Wi(m),"cm-tab"))
g.setAttribute("role","presentation"),g.setAttribute("cm-text","	"),e.col+=m}else if("\r"==d[0]||"\n"==d[0]){var g=h.appendChild(Gi("span","\r"==d[0]?"␍":"␤","cm-invalidchar"))
g.setAttribute("cm-text",d[0]),e.col+=1}else{var g=e.cm.options.specialCharPlaceholder(d[0])
g.setAttribute("cm-text",d[0]),yo&&9>bo?h.appendChild(Gi("span",[g])):h.appendChild(g),e.col+=1}e.map.push(e.pos,e.pos+1,g),e.pos++}else{e.col+=t.length
var h=document.createTextNode(a)
e.map.push(e.pos,e.pos+t.length,h),yo&&9>bo&&(c=!0),e.pos+=t.length}if(r||n||i||c||l||s){var y=r||""
n&&(y+=n),i&&(y+=i)
var b=Gi("span",[h],y,l,s)
return o&&(b.title=o),e.content.appendChild(b)}e.content.appendChild(h)}}function Bn(e){for(var t=" ",r=0;r<e.length-2;++r)t+=r%2?" ":" "
return t+=" "}function Gn(e,t){return function(r,n,i,o,l,s,a){i=i?i+" cm-force-border":"cm-force-border"
for(var u=r.pos,c=u+n.length;;){for(var h=0;h<t.length;h++){var f=t[h]
if(f.to>u&&f.from<=u)break}if(f.to>=c)return e(r,n,i,o,l,s,a)
e(r,n.slice(0,f.to-u),i,o,null,s,a),o=null,n=n.slice(f.to-u),u=f.to}}}function Un(e,t,r,n){var i=!n&&r.widgetNode
i&&e.map.push(e.pos,e.pos+t,i),!n&&e.cm.display.input.needsContentAttribute&&(i||(i=e.content.appendChild(document.createElement("span"))),i.setAttribute("cm-marker",r.id)),i&&(e.cm.display.input.setUneditable(i),e.content.appendChild(i)),e.pos+=t}function Vn(e,t,r){var n=e.markedSpans,i=e.text,o=0
if(n)for(var l,s,a,u,c,h,f,d,p=i.length,g=0,v=1,m="",y=0;;){if(y==g){u=c=h=f=s="",d=null,y=1/0
for(var b=[],w=0;w<n.length;++w){var x=n[w],C=x.marker
"bookmark"==C.type&&x.from==g&&C.widgetNode?b.push(C):x.from<=g&&(null==x.to||x.to>g||C.collapsed&&x.to==g&&x.from==g)?(null!=x.to&&x.to!=g&&y>x.to&&(y=x.to,c=""),C.className&&(u+=" "+C.className),C.attr&&(a=C.attr),C.css&&(s=C.css),C.startStyle&&x.from==g&&(h+=" "+C.startStyle),C.endStyle&&x.to==y&&(c+=" "+C.endStyle),C.title&&!f&&(f=C.title),C.collapsed&&(!d||fn(d.marker,C)<0)&&(d=x)):x.from>g&&y>x.from&&(y=x.from)}if(d&&(d.from||0)==g){if(Un(t,(null==d.to?p+1:d.to)-g,d.marker,null==d.from),null==d.to)return
d.to==g&&(d=!1)}if(!d&&b.length)for(var w=0;w<b.length;++w)Un(t,0,b[w])}if(g>=p)break
for(var S=Math.min(p,y);;){if(m){var L=g+m.length
if(!d){var T=L>S?m.slice(0,S-g):m
t.addToken(t,T,l?l+u:u,h,g+T.length==y?c:"",f,s,a)}if(L>=S){m=m.slice(S-g),g=S
break}g=L,h=""}m=i.slice(o,o=r[v++]),l=In(r[v++],t.cm.options)}}else for(var v=1;v<r.length;v+=2)t.addToken(t,i.slice(o,o=r[v]),In(r[v+1],t.cm.options))}function Kn(e,t){return 0==t.from.ch&&0==t.to.ch&&""==Oi(t.text)&&(!e.cm||e.cm.options.wholeLineUpdateBefore)}function jn(e,t,r,n){function i(e){return r?r[e]:null}function o(e,r,i){kn(e,r,i,n),Si(e,"change",e,t)}function l(e,t){for(var r=e,o=[];t>r;++r)o.push(new yl(u[r],i(r),n))
return o}var s=t.from,a=t.to,u=t.text,c=qn(e,s.line),h=qn(e,a.line),f=Oi(u),d=i(u.length-1),p=a.line-s.line
if(t.full)e.insert(0,l(0,u.length)),e.remove(u.length,e.size-u.length)
else if(Kn(e,t)){var g=l(0,u.length-1)
o(h,h.text,d),p&&e.remove(s.line,p),g.length&&e.insert(s.line,g)}else if(c==h)if(1==u.length)o(c,c.text.slice(0,s.ch)+f+c.text.slice(a.ch),d)
else{var g=l(1,u.length-1)
g.push(new yl(f+c.text.slice(a.ch),d,n)),o(c,c.text.slice(0,s.ch)+u[0],i(0)),e.insert(s.line+1,g)}else if(1==u.length)o(c,c.text.slice(0,s.ch)+u[0]+h.text.slice(a.ch),i(0)),e.remove(s.line+1,p)
else{o(c,c.text.slice(0,s.ch)+u[0],i(0)),o(h,f+h.text.slice(a.ch),d)
var g=l(1,u.length-1)
p>1&&e.remove(s.line+1,p-1),e.insert(s.line+1,g)}Si(e,"change",e,t)}function Xn(e){this.lines=e,this.parent=null
for(var t=0,r=0;t<e.length;++t)e[t].parent=this,r+=e[t].height
this.height=r}function Yn(e){this.children=e
for(var t=0,r=0,n=0;n<e.length;++n){var i=e[n]
t+=i.chunkSize(),r+=i.height,i.parent=this}this.size=t,this.height=r,this.parent=null}function _n(e,t,r){function n(e,i,o){if(e.linked)for(var l=0;l<e.linked.length;++l){var s=e.linked[l]
if(s.doc!=i){var a=o&&s.sharedHist;(!r||a)&&(t(s.doc,a),n(s.doc,e,a))}}}n(e,null,!0)}function $n(e,t){if(t.cm)throw Error("This document is already in use.")
e.doc=t,t.cm=e,l(e),r(e),e.options.lineWrapping||f(e),e.options.mode=t.modeOption,Et(e)}function qn(e,t){if(t-=e.first,0>t||t>=e.size)throw Error("There is no line "+(t+e.first)+" in the document.")
for(var r=e;!r.lines;)for(var n=0;;++n){var i=r.children[n],o=i.chunkSize()
if(o>t){r=i
break}t-=o}return r.lines[t]}function Zn(e,t,r){var n=[],i=t.line
return e.iter(t.line,r.line+1,function(e){var o=e.text
i==r.line&&(o=o.slice(0,r.ch)),i==t.line&&(o=o.slice(t.ch)),n.push(o),++i}),n}function Qn(e,t,r){var n=[]
return e.iter(t,r,function(e){n.push(e.text)}),n}function Jn(e,t){var r=t-e.height
if(r)for(var n=e;n;n=n.parent)n.height+=r}function ei(e){if(null==e.parent)return null
for(var t=e.parent,r=Di(t.lines,e),n=t.parent;n;t=n,n=n.parent)for(var i=0;n.children[i]!=t;++i)r+=n.children[i].chunkSize()
return r+t.first}function ti(e,t){var r=e.first
e:do{for(var n=0;n<e.children.length;++n){var i=e.children[n],o=i.height
if(o>t){e=i
continue e}t-=o,r+=i.chunkSize()}return r}while(!e.lines)
for(var n=0;n<e.lines.length;++n){var l=e.lines[n],s=l.height
if(s>t)break
t-=s}return r+n}function ri(e){e=mn(e)
for(var t=0,r=e.parent,n=0;n<r.lines.length;++n){var i=r.lines[n]
if(i==e)break
t+=i.height}for(var o=r.parent;o;r=o,o=r.parent)for(var n=0;n<o.children.length;++n){var l=o.children[n]
if(l==r)break
t+=l.height}return t}function ni(e){var t=e.order
return null==t&&(t=e.order=os(e.text)),t}function ii(e){this.done=[],this.undone=[],this.undoDepth=1/0,this.lastModTime=this.lastSelTime=0,this.lastOp=this.lastSelOp=null,this.lastOrigin=this.lastSelOrigin=null,this.generation=this.maxGeneration=e||1}function oi(e,t){var r={from:Y(t.from),to:Zo(t),text:Zn(e,t.from,t.to)}
return fi(e,r,t.from.line,t.to.line+1),_n(e,function(e){fi(e,r,t.from.line,t.to.line+1)},!0),r}function li(e){for(;e.length;){var t=Oi(e)
if(!t.ranges)break
e.pop()}}function si(e,t){return t?(li(e.done),Oi(e.done)):e.done.length&&!Oi(e.done).ranges?Oi(e.done):e.done.length>1&&!e.done[e.done.length-2].ranges?(e.done.pop(),Oi(e.done)):void 0}function ai(e,t,r,n){var i=e.history
i.undone.length=0
var o,l=+new Date
if((i.lastOp==n||i.lastOrigin==t.origin&&t.origin&&("+"==t.origin.charAt(0)&&e.cm&&i.lastModTime>l-e.cm.options.historyEventDelay||"*"==t.origin.charAt(0)))&&(o=si(i,i.lastOp==n))){var s=Oi(o.changes)
0==zo(t.from,t.to)&&0==zo(t.from,s.to)?s.to=Zo(t):o.changes.push(oi(e,t))}else{var a=Oi(i.done)
for(a&&a.ranges||hi(e.sel,i.done),o={changes:[oi(e,t)],generation:i.generation},i.done.push(o);i.done.length>i.undoDepth;)i.done.shift(),i.done[0].ranges||i.done.shift()}i.done.push(r),i.generation=++i.maxGeneration,i.lastModTime=i.lastSelTime=l,i.lastOp=i.lastSelOp=n,i.lastOrigin=i.lastSelOrigin=t.origin,s||Ol(e,"historyAdded")}function ui(e,t,r,n){var i=t.charAt(0)
return"*"==i||"+"==i&&r.ranges.length==n.ranges.length&&r.somethingSelected()==n.somethingSelected()&&new Date-e.history.lastSelTime<=(e.cm?e.cm.options.historyEventDelay:500)}function ci(e,t,r,n){var i=e.history,o=n&&n.origin
r==i.lastSelOp||o&&i.lastSelOrigin==o&&(i.lastModTime==i.lastSelTime&&i.lastOrigin==o||ui(e,o,Oi(i.done),t))?i.done[i.done.length-1]=t:hi(t,i.done),i.lastSelTime=+new Date,i.lastSelOrigin=o,i.lastSelOp=r,n&&n.clearRedo!==!1&&li(i.undone)}function hi(e,t){var r=Oi(t)
r&&r.ranges&&r.equals(e)||t.push(e)}function fi(e,t,r,n){var i=t["spans_"+e.id],o=0
e.iter(Math.max(e.first,r),Math.min(e.first+e.size,n),function(r){r.markedSpans&&((i||(i=t["spans_"+e.id]={}))[o]=r.markedSpans),++o})}function di(e){if(!e)return null
for(var t,r=0;r<e.length;++r)e[r].marker.explicitlyCleared?t||(t=e.slice(0,r)):t&&t.push(e[r])
return t?t.length?t:null:e}function pi(e,t){var r=t["spans_"+e.id]
if(!r)return null
for(var n=0,i=[];n<t.text.length;++n)i.push(di(r[n]))
return i}function gi(e,t,r){for(var n=0,i=[];n<e.length;++n){var o=e[n]
if(o.ranges)i.push(r?he.prototype.deepCopy.call(o):o)
else{var l=o.changes,s=[]
i.push({changes:s})
for(var a=0;a<l.length;++a){var u,c=l[a]
if(s.push({from:c.from,to:c.to,text:c.text}),t)for(var h in c)(u=h.match(/^spans_(\d+)$/))&&Di(t,+u[1])>-1&&(Oi(s)[h]=c[h],delete c[h])}}}return i}function vi(e,t,r,n){r<e.line?e.line+=n:t<e.line&&(e.line=t,e.ch=0)}function mi(e,t,r,n){for(var i=0;i<e.length;++i){var o=e[i],l=!0
if(o.ranges){o.copied||(o=e[i]=o.deepCopy(),o.copied=!0)
for(var s=0;s<o.ranges.length;s++)vi(o.ranges[s].anchor,t,r,n),vi(o.ranges[s].head,t,r,n)}else{for(var s=0;s<o.changes.length;++s){var a=o.changes[s]
if(r<a.from.line)a.from=Io(a.from.line+n,a.from.ch),a.to=Io(a.to.line+n,a.to.ch)
else if(t<=a.to.line){l=!1
break}}l||(e.splice(0,i+1),i=0)}}}function yi(e,t){var r=t.from.line,n=t.to.line,i=t.text.length-(n-r)-1
mi(e.done,r,n,i),mi(e.undone,r,n,i)}function bi(e){return null!=e.defaultPrevented?e.defaultPrevented:0==e.returnValue}function wi(e){return e.target||e.srcElement}function xi(e){var t=e.which
return null==t&&(1&e.button?t=1:2&e.button?t=3:4&e.button&&(t=2)),Ao&&e.ctrlKey&&1==t&&(t=3),t}function Ci(e,t,r){var n=e._handlers&&e._handlers[t]
return r?n&&n.length>0?n.slice():Al:n||Al}function Si(e,t){function r(e){return function(){e.apply(null,o)}}var n=Ci(e,t,!1)
if(n.length){var i,o=Array.prototype.slice.call(arguments,2)
Vo?i=Vo.delayedCallbacks:Dl?i=Dl:(i=Dl=[],setTimeout(Li,0))
for(var l=0;l<n.length;++l)i.push(r(n[l]))}}function Li(){var e=Dl
Dl=null
for(var t=0;t<e.length;++t)e[t]()}function Ti(e,t,r){return"string"==typeof t&&(t={type:t,preventDefault:function(){this.defaultPrevented=!0}}),Ol(e,r||t.type,e,t),bi(t)||t.codemirrorIgnore}function ki(e){var t=e._handlers&&e._handlers.cursorActivity
if(t)for(var r=e.curOp.cursorActivityHandlers||(e.curOp.cursorActivityHandlers=[]),n=0;n<t.length;++n)-1==Di(r,t[n])&&r.push(t[n])}function Mi(e,t){return Ci(e,t).length>0}function Ni(e){e.prototype.on=function(e,t){Nl(this,e,t)},e.prototype.off=function(e,t){Wl(this,e,t)}}function Ai(){this.id=null}function Wi(e){for(;Bl.length<=e;)Bl.push(Oi(Bl)+" ")
return Bl[e]}function Oi(e){return e[e.length-1]}function Di(e,t){for(var r=0;r<e.length;++r)if(e[r]==t)return r
return-1}function Hi(e,t){for(var r=[],n=0;n<e.length;n++)r[n]=t(e[n],n)
return r}function Ei(){}function Pi(e,t){var r
return Object.create?r=Object.create(e):(Ei.prototype=e,r=new Ei),t&&Ii(t,r),r}function Ii(e,t,r){t||(t={})
for(var n in e)!e.hasOwnProperty(n)||r===!1&&t.hasOwnProperty(n)||(t[n]=e[n])
return t}function zi(e){var t=Array.prototype.slice.call(arguments,1)
return function(){return e.apply(null,t)}}function Fi(e,t){return t?t.source.indexOf("\\w")>-1&&Kl(e)?!0:t.test(e):Kl(e)}function Ri(e){for(var t in e)if(e.hasOwnProperty(t)&&e[t])return!1
return!0}function Bi(e){return e.charCodeAt(0)>=768&&jl.test(e)}function Gi(e,t,r,n,i){var o=document.createElement(e)
if(r&&(o.className=r),n&&(o.style.cssText=n),i)for(var l in i)o.setAttribute(l,i[l])
if("string"==typeof t)o.appendChild(document.createTextNode(t))
else if(t)for(var s=0;s<t.length;++s)o.appendChild(t[s])
return o}function Ui(e){for(var t=e.childNodes.length;t>0;--t)e.removeChild(e.firstChild)
return e}function Vi(e,t){return Ui(e).appendChild(t)}function Ki(){for(var e=document.activeElement;e&&e.root&&e.root.activeElement;)e=e.root.activeElement
return e}function ji(e){return RegExp("(^|\\s)"+e+"(?:$|\\s)\\s*")}function Xi(e,t){for(var r=e.split(" "),n=0;n<r.length;n++)r[n]&&!ji(r[n]).test(t)&&(t+=" "+r[n])
return t}function Yi(e){if(document.body.getElementsByClassName)for(var t=document.body.getElementsByClassName("CodeMirror"),r=0;r<t.length;r++){var n=t[r].CodeMirror
n&&e(n)}}function _i(){Zl||($i(),Zl=!0)}function $i(){var e
Nl(window,"resize",function(){null==e&&(e=setTimeout(function(){e=null,Yi(Vt)},100))}),Nl(window,"blur",function(){Yi(vr)})}function qi(e){if(null==Yl){var t=Gi("span","​")
Vi(e,Gi("span",[t,document.createTextNode("x")])),0!=e.firstChild.offsetHeight&&(Yl=t.offsetWidth<=1&&t.offsetHeight>2&&!(yo&&8>bo))}var r=Yl?Gi("span","​"):Gi("span"," ",null,"display: inline-block; width: 1px; margin-right: -1px")
return r.setAttribute("cm-text",""),r}function Zi(e){if(null!=_l)return _l
var t=Vi(e,document.createTextNode("AخA")),r=Ul(t,0,1).getBoundingClientRect()
if(!r||r.left==r.right)return!1
var n=Ul(t,1,2).getBoundingClientRect()
return _l=n.right-r.right<3}function Qi(e){if(null!=rs)return rs
var t=Vi(e,Gi("span","x")),r=t.getBoundingClientRect(),n=Ul(t,0,1).getBoundingClientRect()
return rs=Math.abs(r.left-n.left)>1}function Ji(e,t,r,n){if(!e)return n(t,r,"ltr")
for(var i=!1,o=0;o<e.length;++o){var l=e[o];(l.from<r&&l.to>t||t==r&&l.to==t)&&(n(Math.max(l.from,t),Math.min(l.to,r),1==l.level?"rtl":"ltr"),i=!0)}i||n(t,r,"ltr")}function eo(e){return e.level%2?e.to:e.from}function to(e){return e.level%2?e.from:e.to}function ro(e){var t=ni(e)
return t?eo(t[0]):0}function no(e){var t=ni(e)
return t?to(Oi(t)):e.text.length}function io(e,t){var r=qn(e.doc,t),n=mn(r)
n!=r&&(t=ei(n))
var i=ni(n),o=i?i[0].level%2?no(n):ro(n):0
return Io(t,o)}function oo(e,t){for(var r,n=qn(e.doc,t);r=gn(n);)n=r.find(1,!0).line,t=null
var i=ni(n),o=i?i[0].level%2?ro(n):no(n):n.text.length
return Io(null==t?ei(n):t,o)}function lo(e,t){var r=io(e,t.line),n=qn(e.doc,r.line),i=ni(n)
if(!i||0==i[0].level){var o=Math.max(0,n.text.search(/\S/)),l=t.line==r.line&&t.ch<=o&&t.ch
return Io(r.line,l?0:o)}return r}function so(e,t,r){var n=e[0].level
return t==n?!0:r==n?!1:r>t}function ao(e,t){is=null
for(var r,n=0;n<e.length;++n){var i=e[n]
if(i.from<t&&i.to>t)return n
if(i.from==t||i.to==t){if(null!=r)return so(e,i.level,e[r].level)?(i.from!=i.to&&(is=r),n):(i.from!=i.to&&(is=n),r)
r=n}}return r}function uo(e,t,r,n){if(!n)return t+r
do t+=r
while(t>0&&Bi(e.text.charAt(t)))
return t}function co(e,t,r,n){var i=ni(e)
if(!i)return ho(e,t,r,n)
for(var o=ao(i,t),l=i[o],s=uo(e,t,l.level%2?-r:r,n);;){if(s>l.from&&s<l.to)return s
if(s==l.from||s==l.to)return ao(i,s)==o?s:(l=i[o+=r],r>0==l.level%2?l.to:l.from)
if(l=i[o+=r],!l)return null
s=r>0==l.level%2?uo(e,l.to,-1,n):uo(e,l.from,1,n)}}function ho(e,t,r,n){var i=t+r
if(n)for(;i>0&&Bi(e.text.charAt(i));)i+=r
return 0>i||i>e.text.length?null:i}var fo=navigator.userAgent,po=navigator.platform,go=/gecko\/\d/i.test(fo),vo=/MSIE \d/.test(fo),mo=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(fo),yo=vo||mo,bo=yo&&(vo?document.documentMode||6:mo[1]),wo=/WebKit\//.test(fo),xo=wo&&/Qt\/\d+\.\d+/.test(fo),Co=/Chrome\//.test(fo),So=/Opera\//.test(fo),Lo=/Apple Computer/.test(navigator.vendor),To=/Mac OS X 1\d\D([8-9]|\d\d)\D/.test(fo),ko=/PhantomJS/.test(fo),Mo=/AppleWebKit/.test(fo)&&/Mobile\/\w+/.test(fo),No=Mo||/Android|wibps|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(fo),Ao=Mo||/Mac/.test(po),Wo=/win/i.test(po),Oo=So&&fo.match(/Version\/(\d*\.\d*)/)
Oo&&(Oo=+Oo[1]),Oo&&Oo>=15&&(So=!1,wo=!0)
var Do=Ao&&(xo||So&&(null==Oo||12.11>Oo)),Ho=go||yo&&bo>=9,Eo=!1,Po=!1
g.prototype=Ii({update:function(e){var t=e.scrollWidth>e.clientWidth+1,r=e.scrollHeight>e.clientHeight+1,n=e.nativeBarWidth
if(r){this.vert.style.display="block",this.vert.style.bottom=t?n+"px":"0"
var i=e.viewHeight-(t?n:0)
this.vert.firstChild.style.height=Math.max(0,e.scrollHeight-e.clientHeight+i)+"px"}else this.vert.style.display="",this.vert.firstChild.style.height="0"
if(t){this.horiz.style.display="block",this.horiz.style.right=r?n+"px":"0",this.horiz.style.left=e.barLeft+"px"
var o=e.viewWidth-e.barLeft-(r?n:0)
this.horiz.firstChild.style.width=e.scrollWidth-e.clientWidth+o+"px"}else this.horiz.style.display="",this.horiz.firstChild.style.width="0"
return!this.checkedZeroWidth&&e.clientHeight>0&&(0==n&&this.zeroWidthHack(),this.checkedZeroWidth=!0),{right:r?n:0,bottom:t?n:0}},setScrollLeft:function(e){this.horiz.scrollLeft!=e&&(this.horiz.scrollLeft=e),this.disableHoriz&&this.enableZeroWidthBar(this.horiz,this.disableHoriz)},setScrollTop:function(e){this.vert.scrollTop!=e&&(this.vert.scrollTop=e),this.disableVert&&this.enableZeroWidthBar(this.vert,this.disableVert)},zeroWidthHack:function(){var e=Ao&&!To?"12px":"18px"
this.horiz.style.height=this.vert.style.width=e,this.horiz.style.pointerEvents=this.vert.style.pointerEvents="none",this.disableHoriz=new Ai,this.disableVert=new Ai},enableZeroWidthBar:function(e,t){function r(){var n=e.getBoundingClientRect(),i=document.elementFromPoint(n.left+1,n.bottom-1)
i!=e?e.style.pointerEvents="none":t.set(1e3,r)}e.style.pointerEvents="auto",t.set(1e3,r)},clear:function(){var e=this.horiz.parentNode
e.removeChild(this.horiz),e.removeChild(this.vert)}},g.prototype),v.prototype=Ii({update:function(){return{bottom:0,right:0}},setScrollLeft:function(){},setScrollTop:function(){},clear:function(){}},v.prototype),e.scrollbarModel={"native":g,"null":v},T.prototype.signal=function(e,t){Mi(e,t)&&this.events.push(arguments)},T.prototype.finish=function(){for(var e=0;e<this.events.length;e++)Ol.apply(null,this.events[e])}
var Io=e.Pos=function(e,t){return this instanceof Io?(this.line=e,void(this.ch=t)):new Io(e,t)},zo=e.cmpPos=function(e,t){return e.line-t.line||e.ch-t.ch},Fo=null
ne.prototype=Ii({init:function(e){function t(e){if(n.somethingSelected())Fo=n.getSelections(),r.inaccurateSelection&&(r.prevInput="",r.inaccurateSelection=!1,o.value=Fo.join("\n"),Gl(o))
else{if(!n.options.lineWiseCopyCut)return
var t=te(n)
Fo=t.text,"cut"==e.type?n.setSelections(t.ranges,null,Pl):(r.prevInput="",o.value=t.text.join("\n"),Gl(o))}"cut"==e.type&&(n.state.cutIncoming=!0)}var r=this,n=this.cm,i=this.wrapper=ie(),o=this.textarea=i.firstChild
e.wrapper.insertBefore(i,e.wrapper.firstChild),Mo&&(o.style.width="0px"),Nl(o,"input",function(){yo&&bo>=9&&r.hasSelection&&(r.hasSelection=null),r.poll()}),Nl(o,"paste",function(e){return J(e,n)?!0:(n.state.pasteIncoming=!0,void r.fastPoll())}),Nl(o,"cut",t),Nl(o,"copy",t),Nl(e.scroller,"paste",function(t){Kt(e,t)||(n.state.pasteIncoming=!0,r.focus())}),Nl(e.lineSpace,"selectstart",function(t){Kt(e,t)||Tl(t)}),Nl(o,"compositionstart",function(){var e=n.getCursor("from")
r.composing&&r.composing.range.clear(),r.composing={start:e,range:n.markText(e,n.getCursor("to"),{className:"CodeMirror-composing"})}}),Nl(o,"compositionend",function(){r.composing&&(r.poll(),r.composing.range.clear(),r.composing=null)})},prepareSelection:function(){var e=this.cm,t=e.display,r=e.doc,n=Ee(e)
if(e.options.moveInputWithCursor){var i=ft(e,r.sel.primary().head,"div"),o=t.wrapper.getBoundingClientRect(),l=t.lineDiv.getBoundingClientRect()
n.teTop=Math.max(0,Math.min(t.wrapper.clientHeight-10,i.top+l.top-o.top)),n.teLeft=Math.max(0,Math.min(t.wrapper.clientWidth-10,i.left+l.left-o.left))}return n},showSelection:function(e){var t=this.cm,r=t.display
Vi(r.cursorDiv,e.cursors),Vi(r.selectionDiv,e.selection),null!=e.teTop&&(this.wrapper.style.top=e.teTop+"px",this.wrapper.style.left=e.teLeft+"px")},reset:function(e){if(!this.contextMenuPending){var t,r,n=this.cm,i=n.doc
if(n.somethingSelected()){this.prevInput=""
var o=i.sel.primary()
t=ts&&(o.to().line-o.from().line>100||(r=n.getSelection()).length>1e3)
var l=t?"-":r||n.getSelection()
this.textarea.value=l,n.state.focused&&Gl(this.textarea),yo&&bo>=9&&(this.hasSelection=l)}else e||(this.prevInput=this.textarea.value="",yo&&bo>=9&&(this.hasSelection=null))
this.inaccurateSelection=t}},getField:function(){return this.textarea},supportsTouch:function(){return!1},focus:function(){if("nocursor"!=this.cm.options.readOnly&&(!No||Ki()!=this.textarea))try{this.textarea.focus()}catch(e){}},blur:function(){this.textarea.blur()},resetPosition:function(){this.wrapper.style.top=this.wrapper.style.left=0},receivedFocus:function(){this.slowPoll()},slowPoll:function(){var e=this
e.pollingFast||e.polling.set(this.cm.options.pollInterval,function(){e.poll(),e.cm.state.focused&&e.slowPoll()})},fastPoll:function(){function e(){var n=r.poll()
n||t?(r.pollingFast=!1,r.slowPoll()):(t=!0,r.polling.set(60,e))}var t=!1,r=this
r.pollingFast=!0,r.polling.set(20,e)},poll:function(){var e=this.cm,t=this.textarea,r=this.prevInput
if(this.contextMenuPending||!e.state.focused||es(t)&&!r&&!this.composing||Z(e)||e.options.disableInput||e.state.keySeq)return!1
var n=t.value
if(n==r&&!e.somethingSelected())return!1
if(yo&&bo>=9&&this.hasSelection===n||Ao&&/[\uf700-\uf7ff]/.test(n))return e.display.input.reset(),!1
if(e.doc.sel==e.display.selForContextMenu){var i=n.charCodeAt(0)
if(8203!=i||r||(r="​"),8666==i)return this.reset(),this.cm.execCommand("undo")}for(var o=0,l=Math.min(r.length,n.length);l>o&&r.charCodeAt(o)==n.charCodeAt(o);)++o
var s=this
return Nt(e,function(){Q(e,n.slice(o),r.length-o,null,s.composing?"*compose":null),n.length>1e3||n.indexOf("\n")>-1?t.value=s.prevInput="":s.prevInput=n,s.composing&&(s.composing.range.clear(),s.composing.range=e.markText(s.composing.start,e.getCursor("to"),{className:"CodeMirror-composing"}))}),!0},ensurePolled:function(){this.pollingFast&&this.poll()&&(this.pollingFast=!1)},onKeyPress:function(){yo&&bo>=9&&(this.hasSelection=null),this.fastPoll()},onContextMenu:function(e){function t(){if(null!=l.selectionStart){var e=i.somethingSelected(),t="​"+(e?l.value:"")
l.value="⇚",l.value=t,n.prevInput=e?"":"​",l.selectionStart=1,l.selectionEnd=t.length,o.selForContextMenu=i.doc.sel}}function r(){if(n.contextMenuPending=!1,n.wrapper.style.position="relative",l.style.cssText=c,yo&&9>bo&&o.scrollbars.setScrollTop(o.scroller.scrollTop=a),null!=l.selectionStart){(!yo||yo&&9>bo)&&t()
var e=0,r=function(){o.selForContextMenu==i.doc.sel&&0==l.selectionStart&&l.selectionEnd>0&&"​"==n.prevInput?At(i,al.selectAll)(i):e++<10?o.detectingSelectAll=setTimeout(r,500):o.input.reset()}
o.detectingSelectAll=setTimeout(r,200)}}var n=this,i=n.cm,o=i.display,l=n.textarea,s=jt(i,e),a=o.scroller.scrollTop
if(s&&!So){var u=i.options.resetSelectionOnContextMenu
u&&-1==i.doc.sel.contains(s)&&At(i,Me)(i.doc,pe(s),Pl)
var c=l.style.cssText
if(n.wrapper.style.position="absolute",l.style.cssText="position: fixed; width: 30px; height: 30px; top: "+(e.clientY-5)+"px; left: "+(e.clientX-5)+"px; z-index: 1000; background: "+(yo?"rgba(255, 255, 255, .05)":"transparent")+"; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);",wo)var h=window.scrollY
if(o.input.focus(),wo&&window.scrollTo(null,h),o.input.reset(),i.somethingSelected()||(l.value=n.prevInput=" "),n.contextMenuPending=!0,o.selForContextMenu=i.doc.sel,clearTimeout(o.detectingSelectAll),yo&&bo>=9&&t(),Ho){Ml(e)
var f=function(){Wl(window,"mouseup",f),setTimeout(r,20)}
Nl(window,"mouseup",f)}else setTimeout(r,50)}},readOnlyChanged:function(e){e||this.reset()},setUneditable:Ei,needsContentAttribute:!1},ne.prototype),oe.prototype=Ii({init:function(e){function t(e){if(n.somethingSelected())Fo=n.getSelections(),"cut"==e.type&&n.replaceSelection("",null,"cut")
else{if(!n.options.lineWiseCopyCut)return
var t=te(n)
Fo=t.text,"cut"==e.type&&n.operation(function(){n.setSelections(t.ranges,0,Pl),n.replaceSelection("",null,"cut")})}if(e.clipboardData&&!Mo)e.preventDefault(),e.clipboardData.clearData(),e.clipboardData.setData("text/plain",Fo.join("\n"))
else{var r=ie(),i=r.firstChild
n.display.lineSpace.insertBefore(r,n.display.lineSpace.firstChild),i.value=Fo.join("\n")
var o=document.activeElement
Gl(i),setTimeout(function(){n.display.lineSpace.removeChild(r),o.focus()},50)}}var r=this,n=r.cm,i=r.div=e.lineDiv
re(i),Nl(i,"paste",function(e){J(e,n)}),Nl(i,"compositionstart",function(e){var t=e.data
if(r.composing={sel:n.doc.sel,data:t,startData:t},t){var i=n.doc.sel.primary(),o=n.getLine(i.head.line),l=o.indexOf(t,Math.max(0,i.head.ch-t.length))
l>-1&&l<=i.head.ch&&(r.composing.sel=pe(Io(i.head.line,l),Io(i.head.line,l+t.length)))}}),Nl(i,"compositionupdate",function(e){r.composing.data=e.data}),Nl(i,"compositionend",function(e){var t=r.composing
t&&(e.data==t.startData||/\u200b/.test(e.data)||(t.data=e.data),setTimeout(function(){t.handled||r.applyComposition(t),r.composing==t&&(r.composing=null)},50))}),Nl(i,"touchstart",function(){r.forceCompositionEnd()}),Nl(i,"input",function(){r.composing||(Z(n)||!r.pollContent())&&Nt(r.cm,function(){Et(n)})}),Nl(i,"copy",t),Nl(i,"cut",t)},prepareSelection:function(){var e=Ee(this.cm,!1)
return e.focus=this.cm.state.focused,e},showSelection:function(e){e&&this.cm.display.view.length&&(e.focus&&this.showPrimarySelection(),this.showMultipleSelections(e))},showPrimarySelection:function(){var e=window.getSelection(),t=this.cm.doc.sel.primary(),r=ae(this.cm,e.anchorNode,e.anchorOffset),n=ae(this.cm,e.focusNode,e.focusOffset)
if(!r||r.bad||!n||n.bad||0!=zo($(r,n),t.from())||0!=zo(_(r,n),t.to())){var i=le(this.cm,t.from()),o=le(this.cm,t.to())
if(i||o){var l=this.cm.display.view,s=e.rangeCount&&e.getRangeAt(0)
if(i){if(!o){var a=l[l.length-1].measure,u=a.maps?a.maps[a.maps.length-1]:a.map
o={node:u[u.length-1],offset:u[u.length-2]-u[u.length-3]}}}else i={node:l[0].measure.map[2],offset:0}
try{var c=Ul(i.node,i.offset,o.offset,o.node)}catch(h){}c&&(e.removeAllRanges(),e.addRange(c),s&&null==e.anchorNode?e.addRange(s):go&&this.startGracePeriod()),this.rememberSelection()}}},startGracePeriod:function(){var e=this
clearTimeout(this.gracePeriod),this.gracePeriod=setTimeout(function(){e.gracePeriod=!1,e.selectionChanged()&&e.cm.operation(function(){e.cm.curOp.selectionChanged=!0})},20)},showMultipleSelections:function(e){Vi(this.cm.display.cursorDiv,e.cursors),Vi(this.cm.display.selectionDiv,e.selection)},rememberSelection:function(){var e=window.getSelection()
this.lastAnchorNode=e.anchorNode,this.lastAnchorOffset=e.anchorOffset,this.lastFocusNode=e.focusNode,this.lastFocusOffset=e.focusOffset},selectionInEditor:function(){var e=window.getSelection()
if(!e.rangeCount)return!1
var t=e.getRangeAt(0).commonAncestorContainer
return Xl(this.div,t)},focus:function(){"nocursor"!=this.cm.options.readOnly&&this.div.focus()},blur:function(){this.div.blur()},getField:function(){return this.div},supportsTouch:function(){return!0},receivedFocus:function(){function e(){t.cm.state.focused&&(t.pollSelection(),t.polling.set(t.cm.options.pollInterval,e))}var t=this
this.selectionInEditor()?this.pollSelection():Nt(this.cm,function(){t.cm.curOp.selectionChanged=!0}),this.polling.set(this.cm.options.pollInterval,e)},selectionChanged:function(){var e=window.getSelection()
return e.anchorNode!=this.lastAnchorNode||e.anchorOffset!=this.lastAnchorOffset||e.focusNode!=this.lastFocusNode||e.focusOffset!=this.lastFocusOffset},pollSelection:function(){if(!this.composing&&!this.gracePeriod&&this.selectionChanged()){var e=window.getSelection(),t=this.cm
this.rememberSelection()
var r=ae(t,e.anchorNode,e.anchorOffset),n=ae(t,e.focusNode,e.focusOffset)
r&&n&&Nt(t,function(){Me(t.doc,pe(r,n),Pl),(r.bad||n.bad)&&(t.curOp.selectionChanged=!0)})}},pollContent:function(){var e=this.cm,t=e.display,r=e.doc.sel.primary(),n=r.from(),i=r.to()
if(n.line<t.viewFrom||i.line>t.viewTo-1)return!1
var o
if(n.line==t.viewFrom||0==(o=zt(e,n.line)))var l=ei(t.view[0].line),s=t.view[0].node
else var l=ei(t.view[o].line),s=t.view[o-1].node.nextSibling
var a=zt(e,i.line)
if(a==t.view.length-1)var u=t.viewTo-1,c=t.lineDiv.lastChild
else var u=ei(t.view[a+1].line)-1,c=t.view[a+1].node.previousSibling
for(var h=e.doc.splitLines(ce(e,s,c,l,u)),f=Zn(e.doc,Io(l,0),Io(u,qn(e.doc,u).text.length));h.length>1&&f.length>1;)if(Oi(h)==Oi(f))h.pop(),f.pop(),u--
else{if(h[0]!=f[0])break
h.shift(),f.shift(),l++}for(var d=0,p=0,g=h[0],v=f[0],m=Math.min(g.length,v.length);m>d&&g.charCodeAt(d)==v.charCodeAt(d);)++d
for(var y=Oi(h),b=Oi(f),w=Math.min(y.length-(1==h.length?d:0),b.length-(1==f.length?d:0));w>p&&y.charCodeAt(y.length-p-1)==b.charCodeAt(b.length-p-1);)++p
h[h.length-1]=y.slice(0,y.length-p),h[0]=h[0].slice(d)
var x=Io(l,d),C=Io(u,f.length?Oi(f).length-p:0)
return h.length>1||h[0]||zo(x,C)?(Wr(e.doc,h,x,C,"+input"),!0):void 0},ensurePolled:function(){this.forceCompositionEnd()},reset:function(){this.forceCompositionEnd()},forceCompositionEnd:function(){this.composing&&!this.composing.handled&&(this.applyComposition(this.composing),this.composing.handled=!0,this.div.blur(),this.div.focus())},applyComposition:function(e){Z(this.cm)?At(this.cm,Et)(this.cm):e.data&&e.data!=e.startData&&At(this.cm,Q)(this.cm,e.data,0,e.sel)},setUneditable:function(e){e.contentEditable="false"},onKeyPress:function(e){e.preventDefault(),Z(this.cm)||At(this.cm,Q)(this.cm,String.fromCharCode(null==e.charCode?e.keyCode:e.charCode),0)},readOnlyChanged:function(e){this.div.contentEditable=("nocursor"!=e)+""},onContextMenu:Ei,resetPosition:Ei,needsContentAttribute:!0},oe.prototype),e.inputStyles={textarea:ne,contenteditable:oe},he.prototype={primary:function(){return this.ranges[this.primIndex]},equals:function(e){if(e==this)return!0
if(e.primIndex!=this.primIndex||e.ranges.length!=this.ranges.length)return!1
for(var t=0;t<this.ranges.length;t++){var r=this.ranges[t],n=e.ranges[t]
if(0!=zo(r.anchor,n.anchor)||0!=zo(r.head,n.head))return!1}return!0},deepCopy:function(){for(var e=[],t=0;t<this.ranges.length;t++)e[t]=new fe(Y(this.ranges[t].anchor),Y(this.ranges[t].head))
return new he(e,this.primIndex)},somethingSelected:function(){for(var e=0;e<this.ranges.length;e++)if(!this.ranges[e].empty())return!0
return!1},contains:function(e,t){t||(t=e)
for(var r=0;r<this.ranges.length;r++){var n=this.ranges[r]
if(zo(t,n.from())>=0&&zo(e,n.to())<=0)return r}return-1}},fe.prototype={from:function(){return $(this.anchor,this.head)},to:function(){return _(this.anchor,this.head)},empty:function(){return this.head.line==this.anchor.line&&this.head.ch==this.anchor.ch}}
var Ro,Bo,Go,Uo={left:0,right:0,top:0,bottom:0},Vo=null,Ko=0,jo=0,Xo=0,Yo=null
yo?Yo=-.53:go?Yo=15:Co?Yo=-.7:Lo&&(Yo=-1/3)
var _o=function(e){var t=e.wheelDeltaX,r=e.wheelDeltaY
return null==t&&e.detail&&e.axis==e.HORIZONTAL_AXIS&&(t=e.detail),null==r&&e.detail&&e.axis==e.VERTICAL_AXIS?r=e.detail:null==r&&(r=e.wheelDelta),{x:t,y:r}}
e.wheelEventPixels=function(e){var t=_o(e)
return t.x*=Yo,t.y*=Yo,t}
var $o=new Ai,qo=null,Zo=e.changeEnd=function(e){return e.text?Io(e.from.line+e.text.length-1,Oi(e.text).length+(1==e.text.length?e.from.ch:0)):e.to}
e.prototype={constructor:e,focus:function(){window.focus(),this.display.input.focus()},setOption:function(e,t){var r=this.options,n=r[e];(r[e]!=t||"mode"==e)&&(r[e]=t,Jo.hasOwnProperty(e)&&At(this,Jo[e])(this,t,n))},getOption:function(e){return this.options[e]},getDoc:function(){return this.doc},addKeyMap:function(e,t){this.state.keyMaps[t?"push":"unshift"](jr(e))},removeKeyMap:function(e){for(var t=this.state.keyMaps,r=0;r<t.length;++r)if(t[r]==e||t[r].name==e)return t.splice(r,1),!0},addOverlay:Wt(function(t,r){var n=t.token?t:e.getMode(this.options,t)
if(n.startState)throw Error("Overlays may not be stateful.")
this.state.overlays.push({mode:n,modeSpec:t,opaque:r&&r.opaque}),this.state.modeGen++,Et(this)}),removeOverlay:Wt(function(e){for(var t=this.state.overlays,r=0;r<t.length;++r){var n=t[r].modeSpec
if(n==e||"string"==typeof e&&n.name==e)return t.splice(r,1),this.state.modeGen++,void Et(this)}}),indentLine:Wt(function(e,t,r){"string"!=typeof t&&"number"!=typeof t&&(t=null==t?this.options.smartIndent?"smart":"prev":t?"add":"subtract"),ye(this.doc,e)&&Fr(this,e,t,r)}),indentSelection:Wt(function(e){for(var t=this.doc.sel.ranges,r=-1,n=0;n<t.length;n++){var i=t[n]
if(i.empty())i.head.line>r&&(Fr(this,i.head.line,e,!0),r=i.head.line,n==this.doc.sel.primIndex&&Ir(this))
else{var o=i.from(),l=i.to(),s=Math.max(r,o.line)
r=Math.min(this.lastLine(),l.line-(l.ch?0:1))+1
for(var a=s;r>a;++a)Fr(this,a,e)
var u=this.doc.sel.ranges
0==o.ch&&t.length==u.length&&u[n].from().ch>0&&Se(this.doc,n,new fe(o,u[n].to()),Pl)}}}),getTokenAt:function(e,t){return On(this,e,t)},getLineTokens:function(e,t){return On(this,Io(e),t,!0)},getTokenTypeAt:function(e){e=ve(this.doc,e)
var t,r=En(this,qn(this.doc,e.line)),n=0,i=(r.length-1)/2,o=e.ch
if(0==o)t=r[2]
else for(;;){var l=n+i>>1
if((l?r[2*l-1]:0)>=o)i=l
else{if(!(r[2*l+1]<o)){t=r[2*l+2]
break}n=l+1}}var s=t?t.indexOf("cm-overlay "):-1
return 0>s?t:0==s?null:t.slice(0,s-1)},getModeAt:function(t){var r=this.doc.mode
return r.innerMode?e.innerMode(r,this.getTokenAt(t).state).mode:r},getHelper:function(e,t){return this.getHelpers(e,t)[0]},getHelpers:function(e,t){var r=[]
if(!ol.hasOwnProperty(t))return r
var n=ol[t],i=this.getModeAt(e)
if("string"==typeof i[t])n[i[t]]&&r.push(n[i[t]])
else if(i[t])for(var o=0;o<i[t].length;o++){var l=n[i[t][o]]
l&&r.push(l)}else i.helperType&&n[i.helperType]?r.push(n[i.helperType]):n[i.name]&&r.push(n[i.name])
for(var o=0;o<n._global.length;o++){var s=n._global[o]
s.pred(i,this)&&-1==Di(r,s.val)&&r.push(s.val)}return r},getStateAfter:function(e,t){var r=this.doc
return e=ge(r,null==e?r.first+r.size-1:e),Ge(this,e+1,t)},cursorCoords:function(e,t){var r,n=this.doc.sel.primary()
return r=null==e?n.head:"object"==typeof e?ve(this.doc,e):e?n.from():n.to(),ft(this,r,t||"page")},charCoords:function(e,t){return ht(this,ve(this.doc,e),t||"page")},coordsChar:function(e,t){return e=ct(this,e,t||"page"),gt(this,e.left,e.top)},lineAtHeight:function(e,t){return e=ct(this,{top:e,left:0},t||"page").top,ti(this.doc,e+this.display.viewOffset)},heightAtLine:function(e,t){var r,n=!1
if("number"==typeof e){var i=this.doc.first+this.doc.size-1
e<this.doc.first?e=this.doc.first:e>i&&(e=i,n=!0),r=qn(this.doc,e)}else r=e
return ut(this,r,{top:0,left:0},t||"page").top+(n?this.doc.height-ri(r):0)},defaultTextHeight:function(){return mt(this.display)},defaultCharWidth:function(){return yt(this.display)},setGutterMarker:Wt(function(e,t,r){return Rr(this.doc,e,"gutter",function(e){var n=e.gutterMarkers||(e.gutterMarkers={})
return n[t]=r,!r&&Ri(n)&&(e.gutterMarkers=null),!0})}),clearGutter:Wt(function(e){var t=this,r=t.doc,n=r.first
r.iter(function(r){r.gutterMarkers&&r.gutterMarkers[e]&&(r.gutterMarkers[e]=null,Pt(t,n,"gutter"),Ri(r.gutterMarkers)&&(r.gutterMarkers=null)),++n})}),lineInfo:function(e){if("number"==typeof e){if(!ye(this.doc,e))return null
var t=e
if(e=qn(this.doc,e),!e)return null}else{var t=ei(e)
if(null==t)return null}return{line:t,handle:e,text:e.text,gutterMarkers:e.gutterMarkers,textClass:e.textClass,bgClass:e.bgClass,wrapClass:e.wrapClass,widgets:e.widgets}},getViewport:function(){return{from:this.display.viewFrom,to:this.display.viewTo}},addWidget:function(e,t,r,n,i){var o=this.display
e=ft(this,ve(this.doc,e))
var l=e.bottom,s=e.left
if(t.style.position="absolute",t.setAttribute("cm-ignore-events","true"),this.display.input.setUneditable(t),o.sizer.appendChild(t),"over"==n)l=e.top
else if("above"==n||"near"==n){var a=Math.max(o.wrapper.clientHeight,this.doc.height),u=Math.max(o.sizer.clientWidth,o.lineSpace.clientWidth);("above"==n||e.bottom+t.offsetHeight>a)&&e.top>t.offsetHeight?l=e.top-t.offsetHeight:e.bottom+t.offsetHeight<=a&&(l=e.bottom),s+t.offsetWidth>u&&(s=u-t.offsetWidth)}t.style.top=l+"px",t.style.left=t.style.right="","right"==i?(s=o.sizer.clientWidth-t.offsetWidth,t.style.right="0px"):("left"==i?s=0:"middle"==i&&(s=(o.sizer.clientWidth-t.offsetWidth)/2),t.style.left=s+"px"),r&&Hr(this,s,l,s+t.offsetWidth,l+t.offsetHeight)},triggerOnKeyDown:Wt(cr),triggerOnKeyPress:Wt(dr),triggerOnKeyUp:fr,execCommand:function(e){return al.hasOwnProperty(e)?al[e].call(null,this):void 0},triggerElectric:Wt(function(e){ee(this,e)}),findPosH:function(e,t,r,n){var i=1
0>t&&(i=-1,t=-t)
for(var o=0,l=ve(this.doc,e);t>o&&(l=Gr(this.doc,l,i,r,n),!l.hitSide);++o);return l},moveH:Wt(function(e,t){var r=this
r.extendSelectionsBy(function(n){return r.display.shift||r.doc.extend||n.empty()?Gr(r.doc,n.head,e,t,r.options.rtlMoveVisually):0>e?n.from():n.to()},zl)}),deleteH:Wt(function(e,t){var r=this.doc.sel,n=this.doc
r.somethingSelected()?n.replaceSelection("",null,"+delete"):Br(this,function(r){var i=Gr(n,r.head,e,t,!1)
return 0>e?{from:i,to:r.head}:{from:r.head,to:i}})}),findPosV:function(e,t,r,n){var i=1,o=n
0>t&&(i=-1,t=-t)
for(var l=0,s=ve(this.doc,e);t>l;++l){var a=ft(this,s,"div")
if(null==o?o=a.left:a.left=o,s=Ur(this,a,i,r),s.hitSide)break}return s},moveV:Wt(function(e,t){var r=this,n=this.doc,i=[],o=!r.display.shift&&!n.extend&&n.sel.somethingSelected()
if(n.extendSelectionsBy(function(l){if(o)return 0>e?l.from():l.to()
var s=ft(r,l.head,"div")
null!=l.goalColumn&&(s.left=l.goalColumn),i.push(s.left)
var a=Ur(r,s,e,t)
return"page"==t&&l==n.sel.primary()&&Pr(r,null,ht(r,a,"div").top-s.top),a},zl),i.length)for(var l=0;l<n.sel.ranges.length;l++)n.sel.ranges[l].goalColumn=i[l]}),findWordAt:function(e){var t=this.doc,r=qn(t,e.line).text,n=e.ch,i=e.ch
if(r){var o=this.getHelper(e,"wordChars");(e.xRel<0||i==r.length)&&n?--n:++i
for(var l=r.charAt(n),s=Fi(l,o)?function(e){return Fi(e,o)}:/\s/.test(l)?function(e){return/\s/.test(e)}:function(e){return!/\s/.test(e)&&!Fi(e)};n>0&&s(r.charAt(n-1));)--n
for(;i<r.length&&s(r.charAt(i));)++i}return new fe(Io(e.line,n),Io(e.line,i))},toggleOverwrite:function(e){(null==e||e!=this.state.overwrite)&&((this.state.overwrite=!this.state.overwrite)?ql(this.display.cursorDiv,"CodeMirror-overwrite"):$l(this.display.cursorDiv,"CodeMirror-overwrite"),Ol(this,"overwriteToggle",this,this.state.overwrite))},hasFocus:function(){return this.display.input.getField()==Ki()},scrollTo:Wt(function(e,t){(null!=e||null!=t)&&zr(this),null!=e&&(this.curOp.scrollLeft=e),null!=t&&(this.curOp.scrollTop=t)}),getScrollInfo:function(){var e=this.display.scroller
return{left:e.scrollLeft,top:e.scrollTop,height:e.scrollHeight-je(this)-this.display.barHeight,width:e.scrollWidth-je(this)-this.display.barWidth,clientHeight:Ye(this),clientWidth:Xe(this)}},scrollIntoView:Wt(function(e,t){if(null==e?(e={from:this.doc.sel.primary().head,to:null},null==t&&(t=this.options.cursorScrollMargin)):"number"==typeof e?e={from:Io(e,0),to:null}:null==e.from&&(e={from:e,to:null}),e.to||(e.to=e.from),e.margin=t||0,null!=e.from.line)zr(this),this.curOp.scrollToPos=e
else{var r=Er(this,Math.min(e.from.left,e.to.left),Math.min(e.from.top,e.to.top)-e.margin,Math.max(e.from.right,e.to.right),Math.max(e.from.bottom,e.to.bottom)+e.margin)
this.scrollTo(r.scrollLeft,r.scrollTop)}}),setSize:Wt(function(e,t){function r(e){return"number"==typeof e||/^\d+$/.test(e+"")?e+"px":e}var n=this
null!=e&&(n.display.wrapper.style.width=r(e)),null!=t&&(n.display.wrapper.style.height=r(t)),n.options.lineWrapping&&ot(this)
var i=n.display.viewFrom
n.doc.iter(i,n.display.viewTo,function(e){if(e.widgets)for(var t=0;t<e.widgets.length;t++)if(e.widgets[t].noHScroll){Pt(n,i,"widget")
break}++i}),n.curOp.forceUpdate=!0,Ol(n,"refresh",this)}),operation:function(e){return Nt(this,e)},refresh:Wt(function(){var e=this.display.cachedTextHeight
Et(this),this.curOp.forceUpdate=!0,lt(this),this.scrollTo(this.doc.scrollLeft,this.doc.scrollTop),c(this),(null==e||Math.abs(e-mt(this.display))>.5)&&l(this),Ol(this,"refresh",this)}),swapDoc:Wt(function(e){var t=this.doc
return t.cm=null,$n(this,e),lt(this),this.display.input.reset(),this.scrollTo(e.scrollLeft,e.scrollTop),this.curOp.forceScroll=!0,Si(this,"swapDoc",this,t),t}),getInputField:function(){return this.display.input.getField()},getWrapperElement:function(){return this.display.wrapper},getScrollerElement:function(){return this.display.scroller},getGutterElement:function(){return this.display.gutters}},Ni(e)
var Qo=e.defaults={},Jo=e.optionHandlers={},el=e.Init={toString:function(){return"CodeMirror.Init"}}
Vr("value","",function(e,t){e.setValue(t)},!0),Vr("mode",null,function(e,t){e.doc.modeOption=t,r(e)},!0),Vr("indentUnit",2,r,!0),Vr("indentWithTabs",!1),Vr("smartIndent",!0),Vr("tabSize",4,function(e){n(e),lt(e),Et(e)},!0),Vr("lineSeparator",null,function(e,t){if(e.doc.lineSep=t,t){var r=[],n=e.doc.first
e.doc.iter(function(e){for(var i=0;;){var o=e.text.indexOf(t,i)
if(-1==o)break
i=o+t.length,r.push(Io(n,o))}n++})
for(var i=r.length-1;i>=0;i--)Wr(e.doc,t,r[i],Io(r[i].line,r[i].ch+t.length))}}),Vr("specialChars",/[\t\u0000-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g,function(t,r,n){t.state.specialChars=RegExp(r.source+(r.test("	")?"":"|	"),"g"),n!=e.Init&&t.refresh()}),Vr("specialCharPlaceholder",Fn,function(e){e.refresh()},!0),Vr("electricChars",!0),Vr("inputStyle",No?"contenteditable":"textarea",function(){throw Error("inputStyle can not (yet) be changed in a running editor")},!0),Vr("rtlMoveVisually",!Wo),Vr("wholeLineUpdateBefore",!0),Vr("theme","default",function(e){s(e),a(e)},!0),Vr("keyMap","default",function(t,r,n){var i=jr(r),o=n!=e.Init&&jr(n)
o&&o.detach&&o.detach(t,i),i.attach&&i.attach(t,o||null)}),Vr("extraKeys",null),Vr("lineWrapping",!1,i,!0),Vr("gutters",[],function(e){d(e.options),a(e)},!0),Vr("fixedGutter",!0,function(e,t){e.display.gutters.style.left=t?L(e.display)+"px":"0",e.refresh()},!0),Vr("coverGutterNextToScrollbar",!1,function(e){y(e)},!0),Vr("scrollbarStyle","native",function(e){m(e),y(e),e.display.scrollbars.setScrollTop(e.doc.scrollTop),e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)},!0),Vr("lineNumbers",!1,function(e){d(e.options),a(e)},!0),Vr("firstLineNumber",1,a,!0),Vr("lineNumberFormatter",function(e){return e},a,!0),Vr("showCursorWhenSelecting",!1,He,!0),Vr("resetSelectionOnContextMenu",!0),Vr("lineWiseCopyCut",!0),Vr("readOnly",!1,function(e,t){"nocursor"==t?(vr(e),e.display.input.blur(),e.display.disabled=!0):e.display.disabled=!1,e.display.input.readOnlyChanged(t)}),Vr("disableInput",!1,function(e,t){t||e.display.input.reset()},!0),Vr("dragDrop",!0,Ut),Vr("allowDropFileTypes",null),Vr("cursorBlinkRate",530),Vr("cursorScrollMargin",0),Vr("cursorHeight",1,He,!0),Vr("singleCursorHeightPerLine",!0,He,!0),Vr("workTime",100),Vr("workDelay",100),Vr("flattenSpans",!0,n,!0),Vr("addModeClass",!1,n,!0),Vr("pollInterval",100),Vr("undoDepth",200,function(e,t){e.doc.history.undoDepth=t}),Vr("historyEventDelay",1250),Vr("viewportMargin",10,function(e){e.refresh()},!0),Vr("maxHighlightLength",1e4,n,!0),Vr("moveInputWithCursor",!0,function(e,t){t||e.display.input.resetPosition()}),Vr("tabindex",null,function(e,t){e.display.input.getField().tabIndex=t||""}),Vr("autofocus",null)
var tl=e.modes={},rl=e.mimeModes={}
e.defineMode=function(t,r){e.defaults.mode||"null"==t||(e.defaults.mode=t),arguments.length>2&&(r.dependencies=Array.prototype.slice.call(arguments,2)),tl[t]=r},e.defineMIME=function(e,t){rl[e]=t},e.resolveMode=function(t){if("string"==typeof t&&rl.hasOwnProperty(t))t=rl[t]
else if(t&&"string"==typeof t.name&&rl.hasOwnProperty(t.name)){var r=rl[t.name]
"string"==typeof r&&(r={name:r}),t=Pi(r,t),t.name=r.name}else if("string"==typeof t&&/^[\w\-]+\/[\w\-]+\+xml$/.test(t))return e.resolveMode("application/xml")
return"string"==typeof t?{name:t}:t||{name:"null"}},e.getMode=function(t,r){var r=e.resolveMode(r),n=tl[r.name]
if(!n)return e.getMode(t,"text/plain")
var i=n(t,r)
if(nl.hasOwnProperty(r.name)){var o=nl[r.name]
for(var l in o)o.hasOwnProperty(l)&&(i.hasOwnProperty(l)&&(i["_"+l]=i[l]),i[l]=o[l])}if(i.name=r.name,r.helperType&&(i.helperType=r.helperType),r.modeProps)for(var l in r.modeProps)i[l]=r.modeProps[l]
return i},e.defineMode("null",function(){return{token:function(e){e.skipToEnd()}}}),e.defineMIME("text/plain","null")
var nl=e.modeExtensions={}
e.extendMode=function(e,t){var r=nl.hasOwnProperty(e)?nl[e]:nl[e]={}
Ii(t,r)},e.defineExtension=function(t,r){e.prototype[t]=r},e.defineDocExtension=function(e,t){Cl.prototype[e]=t},e.defineOption=Vr
var il=[]
e.defineInitHook=function(e){il.push(e)}
var ol=e.helpers={}
e.registerHelper=function(t,r,n){ol.hasOwnProperty(t)||(ol[t]=e[t]={_global:[]}),ol[t][r]=n},e.registerGlobalHelper=function(t,r,n,i){e.registerHelper(t,r,i),ol[t]._global.push({pred:n,val:i})}
var ll=e.copyState=function(e,t){if(t===!0)return t
if(e.copyState)return e.copyState(t)
var r={}
for(var n in t){var i=t[n]
i instanceof Array&&(i=i.concat([])),r[n]=i}return r},sl=e.startState=function(e,t,r){return e.startState?e.startState(t,r):!0}
e.innerMode=function(e,t){for(;e.innerMode;){var r=e.innerMode(t)
if(!r||r.mode==e)break
t=r.state,e=r.mode}return r||{mode:e,state:t}}
var al=e.commands={selectAll:function(e){e.setSelection(Io(e.firstLine(),0),Io(e.lastLine()),Pl)},singleSelection:function(e){e.setSelection(e.getCursor("anchor"),e.getCursor("head"),Pl)},killLine:function(e){Br(e,function(t){if(t.empty()){var r=qn(e.doc,t.head.line).text.length
return t.head.ch==r&&t.head.line<e.lastLine()?{from:t.head,to:Io(t.head.line+1,0)}:{from:t.head,to:Io(t.head.line,r)}}return{from:t.from(),to:t.to()}})},deleteLine:function(e){Br(e,function(t){return{from:Io(t.from().line,0),to:ve(e.doc,Io(t.to().line+1,0))}})},delLineLeft:function(e){Br(e,function(e){return{from:Io(e.from().line,0),to:e.from()}})},delWrappedLineLeft:function(e){Br(e,function(t){var r=e.charCoords(t.head,"div").top+5,n=e.coordsChar({left:0,top:r},"div")
return{from:n,to:t.from()}})},delWrappedLineRight:function(e){Br(e,function(t){var r=e.charCoords(t.head,"div").top+5,n=e.coordsChar({left:e.display.lineDiv.offsetWidth+100,top:r},"div")
return{from:t.from(),to:n}})},undo:function(e){e.undo()},redo:function(e){e.redo()},undoSelection:function(e){e.undoSelection()},redoSelection:function(e){e.redoSelection()},goDocStart:function(e){e.extendSelection(Io(e.firstLine(),0))},goDocEnd:function(e){e.extendSelection(Io(e.lastLine()))},goLineStart:function(e){e.extendSelectionsBy(function(t){return io(e,t.head.line)},{origin:"+move",bias:1})},goLineStartSmart:function(e){e.extendSelectionsBy(function(t){return lo(e,t.head)},{origin:"+move",bias:1})},goLineEnd:function(e){e.extendSelectionsBy(function(t){return oo(e,t.head.line)},{origin:"+move",bias:-1})},goLineRight:function(e){e.extendSelectionsBy(function(t){var r=e.charCoords(t.head,"div").top+5
return e.coordsChar({left:e.display.lineDiv.offsetWidth+100,top:r},"div")},zl)},goLineLeft:function(e){e.extendSelectionsBy(function(t){var r=e.charCoords(t.head,"div").top+5
return e.coordsChar({left:0,top:r},"div")},zl)},goLineLeftSmart:function(e){e.extendSelectionsBy(function(t){var r=e.charCoords(t.head,"div").top+5,n=e.coordsChar({left:0,top:r},"div")
return n.ch<e.getLine(n.line).search(/\S/)?lo(e,t.head):n},zl)},goLineUp:function(e){e.moveV(-1,"line")},goLineDown:function(e){e.moveV(1,"line")},goPageUp:function(e){e.moveV(-1,"page")},goPageDown:function(e){e.moveV(1,"page")},goCharLeft:function(e){e.moveH(-1,"char")},goCharRight:function(e){e.moveH(1,"char")},goColumnLeft:function(e){e.moveH(-1,"column")},goColumnRight:function(e){e.moveH(1,"column")},goWordLeft:function(e){e.moveH(-1,"word")},goGroupRight:function(e){e.moveH(1,"group")},goGroupLeft:function(e){e.moveH(-1,"group")},goWordRight:function(e){e.moveH(1,"word")},delCharBefore:function(e){e.deleteH(-1,"char")},delCharAfter:function(e){e.deleteH(1,"char")},delWordBefore:function(e){e.deleteH(-1,"word")},delWordAfter:function(e){e.deleteH(1,"word")},delGroupBefore:function(e){e.deleteH(-1,"group")},delGroupAfter:function(e){e.deleteH(1,"group")},indentAuto:function(e){e.indentSelection("smart")},indentMore:function(e){e.indentSelection("add")},indentLess:function(e){e.indentSelection("subtract")},insertTab:function(e){e.replaceSelection("	")},insertSoftTab:function(e){for(var t=[],r=e.listSelections(),n=e.options.tabSize,i=0;i<r.length;i++){var o=r[i].from(),l=Fl(e.getLine(o.line),o.ch,n)
t.push(Array(n-l%n+1).join(" "))}e.replaceSelections(t)},defaultTab:function(e){e.somethingSelected()?e.indentSelection("add"):e.execCommand("insertTab")},transposeChars:function(e){Nt(e,function(){for(var t=e.listSelections(),r=[],n=0;n<t.length;n++){var i=t[n].head,o=qn(e.doc,i.line).text
if(o)if(i.ch==o.length&&(i=new Io(i.line,i.ch-1)),i.ch>0)i=new Io(i.line,i.ch+1),e.replaceRange(o.charAt(i.ch-1)+o.charAt(i.ch-2),Io(i.line,i.ch-2),i,"+transpose")
else if(i.line>e.doc.first){var l=qn(e.doc,i.line-1).text
l&&e.replaceRange(o.charAt(0)+e.doc.lineSeparator()+l.charAt(l.length-1),Io(i.line-1,l.length-1),Io(i.line,1),"+transpose")}r.push(new fe(i,i))}e.setSelections(r)})},newlineAndIndent:function(e){Nt(e,function(){for(var t=e.listSelections().length,r=0;t>r;r++){var n=e.listSelections()[r]
e.replaceRange(e.doc.lineSeparator(),n.anchor,n.head,"+input"),e.indentLine(n.from().line+1,null,!0)}Ir(e)})},toggleOverwrite:function(e){e.toggleOverwrite()}},ul=e.keyMap={}
ul.basic={Left:"goCharLeft",Right:"goCharRight",Up:"goLineUp",Down:"goLineDown",End:"goLineEnd",Home:"goLineStartSmart",PageUp:"goPageUp",PageDown:"goPageDown",Delete:"delCharAfter",Backspace:"delCharBefore","Shift-Backspace":"delCharBefore",Tab:"defaultTab","Shift-Tab":"indentAuto",Enter:"newlineAndIndent",Insert:"toggleOverwrite",Esc:"singleSelection"},ul.pcDefault={"Ctrl-A":"selectAll","Ctrl-D":"deleteLine","Ctrl-Z":"undo","Shift-Ctrl-Z":"redo","Ctrl-Y":"redo","Ctrl-Home":"goDocStart","Ctrl-End":"goDocEnd","Ctrl-Up":"goLineUp","Ctrl-Down":"goLineDown","Ctrl-Left":"goGroupLeft","Ctrl-Right":"goGroupRight","Alt-Left":"goLineStart","Alt-Right":"goLineEnd","Ctrl-Backspace":"delGroupBefore","Ctrl-Delete":"delGroupAfter","Ctrl-S":"save","Ctrl-F":"find","Ctrl-G":"findNext","Shift-Ctrl-G":"findPrev","Shift-Ctrl-F":"replace","Shift-Ctrl-R":"replaceAll","Ctrl-[":"indentLess","Ctrl-]":"indentMore","Ctrl-U":"undoSelection","Shift-Ctrl-U":"redoSelection","Alt-U":"redoSelection",fallthrough:"basic"},ul.emacsy={"Ctrl-F":"goCharRight","Ctrl-B":"goCharLeft","Ctrl-P":"goLineUp","Ctrl-N":"goLineDown","Alt-F":"goWordRight","Alt-B":"goWordLeft","Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd","Ctrl-V":"goPageDown","Shift-Ctrl-V":"goPageUp","Ctrl-D":"delCharAfter","Ctrl-H":"delCharBefore","Alt-D":"delWordAfter","Alt-Backspace":"delWordBefore","Ctrl-K":"killLine","Ctrl-T":"transposeChars"},ul.macDefault={"Cmd-A":"selectAll","Cmd-D":"deleteLine","Cmd-Z":"undo","Shift-Cmd-Z":"redo","Cmd-Y":"redo","Cmd-Home":"goDocStart","Cmd-Up":"goDocStart","Cmd-End":"goDocEnd","Cmd-Down":"goDocEnd","Alt-Left":"goGroupLeft","Alt-Right":"goGroupRight","Cmd-Left":"goLineLeft","Cmd-Right":"goLineRight","Alt-Backspace":"delGroupBefore","Ctrl-Alt-Backspace":"delGroupAfter","Alt-Delete":"delGroupAfter","Cmd-S":"save","Cmd-F":"find","Cmd-G":"findNext","Shift-Cmd-G":"findPrev","Cmd-Alt-F":"replace","Shift-Cmd-Alt-F":"replaceAll","Cmd-[":"indentLess","Cmd-]":"indentMore","Cmd-Backspace":"delWrappedLineLeft","Cmd-Delete":"delWrappedLineRight","Cmd-U":"undoSelection","Shift-Cmd-U":"redoSelection","Ctrl-Up":"goDocStart","Ctrl-Down":"goDocEnd",fallthrough:["basic","emacsy"]},ul["default"]=Ao?ul.macDefault:ul.pcDefault,e.normalizeKeyMap=function(e){var t={}
for(var r in e)if(e.hasOwnProperty(r)){var n=e[r]
if(/^(name|fallthrough|(de|at)tach)$/.test(r))continue
if("..."==n){delete e[r]
continue}for(var i=Hi(r.split(" "),Kr),o=0;o<i.length;o++){var l,s
o==i.length-1?(s=i.join(" "),l=n):(s=i.slice(0,o+1).join(" "),l="...")
var a=t[s]
if(a){if(a!=l)throw Error("Inconsistent bindings for "+s)}else t[s]=l}delete e[r]}for(var u in t)e[u]=t[u]
return e}
var cl=e.lookupKey=function(e,t,r,n){t=jr(t)
var i=t.call?t.call(e,n):t[e]
if(i===!1)return"nothing"
if("..."===i)return"multi"
if(null!=i&&r(i))return"handled"
if(t.fallthrough){if("[object Array]"!=Object.prototype.toString.call(t.fallthrough))return cl(e,t.fallthrough,r,n)
for(var o=0;o<t.fallthrough.length;o++){var l=cl(e,t.fallthrough[o],r,n)
if(l)return l}}},hl=e.isModifierKey=function(e){var t="string"==typeof e?e:ns[e.keyCode]
return"Ctrl"==t||"Alt"==t||"Shift"==t||"Mod"==t},fl=e.keyName=function(e,t){if(So&&34==e.keyCode&&e["char"])return!1
var r=ns[e.keyCode],n=r
return null==n||e.altGraphKey?!1:(e.altKey&&"Alt"!=r&&(n="Alt-"+n),(Do?e.metaKey:e.ctrlKey)&&"Ctrl"!=r&&(n="Ctrl-"+n),(Do?e.ctrlKey:e.metaKey)&&"Cmd"!=r&&(n="Cmd-"+n),!t&&e.shiftKey&&"Shift"!=r&&(n="Shift-"+n),n)}
e.fromTextArea=function(t,r){function n(){t.value=u.getValue()}if(r=r?Ii(r):{},r.value=t.value,!r.tabindex&&t.tabIndex&&(r.tabindex=t.tabIndex),!r.placeholder&&t.placeholder&&(r.placeholder=t.placeholder),null==r.autofocus){var i=Ki()
r.autofocus=i==t||null!=t.getAttribute("autofocus")&&i==document.body}if(t.form&&(Nl(t.form,"submit",n),!r.leaveSubmitMethodAlone)){var o=t.form,l=o.submit
try{var s=o.submit=function(){n(),o.submit=l,o.submit(),o.submit=s}}catch(a){}}r.finishInit=function(e){e.save=n,e.getTextArea=function(){return t},e.toTextArea=function(){e.toTextArea=isNaN,n(),t.parentNode.removeChild(e.getWrapperElement()),t.style.display="",t.form&&(Wl(t.form,"submit",n),"function"==typeof t.form.submit&&(t.form.submit=l))}},t.style.display="none"
var u=e(function(e){t.parentNode.insertBefore(e,t.nextSibling)},r)
return u}
var dl=e.StringStream=function(e,t){this.pos=this.start=0,this.string=e,this.tabSize=t||8,this.lastColumnPos=this.lastColumnValue=0,this.lineStart=0}
dl.prototype={eol:function(){return this.pos>=this.string.length},sol:function(){return this.pos==this.lineStart},peek:function(){return this.string.charAt(this.pos)||void 0},next:function(){return this.pos<this.string.length?this.string.charAt(this.pos++):void 0},eat:function(e){var t=this.string.charAt(this.pos)
if("string"==typeof e)var r=t==e
else var r=t&&(e.test?e.test(t):e(t))
return r?(++this.pos,t):void 0},eatWhile:function(e){for(var t=this.pos;this.eat(e););return this.pos>t},eatSpace:function(){for(var e=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos
return this.pos>e},skipToEnd:function(){this.pos=this.string.length},skipTo:function(e){var t=this.string.indexOf(e,this.pos)
return t>-1?(this.pos=t,!0):void 0},backUp:function(e){this.pos-=e},column:function(){return this.lastColumnPos<this.start&&(this.lastColumnValue=Fl(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue-(this.lineStart?Fl(this.string,this.lineStart,this.tabSize):0)},indentation:function(){return Fl(this.string,null,this.tabSize)-(this.lineStart?Fl(this.string,this.lineStart,this.tabSize):0)},match:function(e,t,r){if("string"!=typeof e){var n=this.string.slice(this.pos).match(e)
return n&&n.index>0?null:(n&&t!==!1&&(this.pos+=n[0].length),n)}var i=function(e){return r?e.toLowerCase():e},o=this.string.substr(this.pos,e.length)
return i(o)==i(e)?(t!==!1&&(this.pos+=e.length),!0):void 0},current:function(){return this.string.slice(this.start,this.pos)},hideFirstChars:function(e,t){this.lineStart+=e
try{return t()}finally{this.lineStart-=e}}}
var pl=0,gl=e.TextMarker=function(e,t){this.lines=[],this.type=t,this.doc=e,this.id=++pl}
Ni(gl),gl.prototype.clear=function(){if(!this.explicitlyCleared){var e=this.doc.cm,t=e&&!e.curOp
if(t&&bt(e),Mi(this,"clear")){var r=this.find()
r&&Si(this,"clear",r.from,r.to)}for(var n=null,i=null,o=0;o<this.lines.length;++o){var l=this.lines[o],s=Qr(l.markedSpans,this)
e&&!this.collapsed?Pt(e,ei(l),"text"):e&&(null!=s.to&&(i=ei(l)),null!=s.from&&(n=ei(l))),l.markedSpans=Jr(l.markedSpans,s),null==s.from&&this.collapsed&&!xn(this.doc,l)&&e&&Jn(l,mt(e.display))}if(e&&this.collapsed&&!e.options.lineWrapping)for(var o=0;o<this.lines.length;++o){var a=mn(this.lines[o]),u=h(a)
u>e.display.maxLineLength&&(e.display.maxLine=a,e.display.maxLineLength=u,e.display.maxLineChanged=!0)}null!=n&&e&&this.collapsed&&Et(e,n,i+1),this.lines.length=0,this.explicitlyCleared=!0,this.atomic&&this.doc.cantEdit&&(this.doc.cantEdit=!1,e&&We(e.doc)),e&&Si(e,"markerCleared",e,this),t&&xt(e),this.parent&&this.parent.clear()}},gl.prototype.find=function(e,t){null==e&&"bookmark"==this.type&&(e=1)
for(var r,n,i=0;i<this.lines.length;++i){var o=this.lines[i],l=Qr(o.markedSpans,this)
if(null!=l.from&&(r=Io(t?o:ei(o),l.from),-1==e))return r
if(null!=l.to&&(n=Io(t?o:ei(o),l.to),1==e))return n}return r&&{from:r,to:n}},gl.prototype.changed=function(){var e=this.find(-1,!0),t=this,r=this.doc.cm
e&&r&&Nt(r,function(){var n=e.line,i=ei(e.line),o=Qe(r,i)
if(o&&(it(o),r.curOp.selectionChanged=r.curOp.forceUpdate=!0),r.curOp.updateMaxLine=!0,!xn(t.doc,n)&&null!=t.height){var l=t.height
t.height=null
var s=Ln(t)-l
s&&Jn(n,n.height+s)}})},gl.prototype.attachLine=function(e){if(!this.lines.length&&this.doc.cm){var t=this.doc.cm.curOp
t.maybeHiddenMarkers&&-1!=Di(t.maybeHiddenMarkers,this)||(t.maybeUnhiddenMarkers||(t.maybeUnhiddenMarkers=[])).push(this)}this.lines.push(e)},gl.prototype.detachLine=function(e){if(this.lines.splice(Di(this.lines,e),1),!this.lines.length&&this.doc.cm){var t=this.doc.cm.curOp;(t.maybeHiddenMarkers||(t.maybeHiddenMarkers=[])).push(this)}}
var pl=0,vl=e.SharedTextMarker=function(e,t){this.markers=e,this.primary=t
for(var r=0;r<e.length;++r)e[r].parent=this}
Ni(vl),vl.prototype.clear=function(){if(!this.explicitlyCleared){this.explicitlyCleared=!0
for(var e=0;e<this.markers.length;++e)this.markers[e].clear()
Si(this,"clear")}},vl.prototype.find=function(e,t){return this.primary.find(e,t)}
var ml=e.LineWidget=function(e,t,r){if(r)for(var n in r)r.hasOwnProperty(n)&&(this[n]=r[n])
this.doc=e,this.node=t}
Ni(ml),ml.prototype.clear=function(){var e=this.doc.cm,t=this.line.widgets,r=this.line,n=ei(r)
if(null!=n&&t){for(var i=0;i<t.length;++i)t[i]==this&&t.splice(i--,1)
t.length||(r.widgets=null)
var o=Ln(this)
Jn(r,Math.max(0,r.height-o)),e&&Nt(e,function(){Sn(e,r,-o),Pt(e,n,"widget")})}},ml.prototype.changed=function(){var e=this.height,t=this.doc.cm,r=this.line
this.height=null
var n=Ln(this)-e
n&&(Jn(r,r.height+n),t&&Nt(t,function(){t.curOp.forceUpdate=!0,Sn(t,r,n)}))}
var yl=e.Line=function(e,t,r){this.text=e,un(this,t),this.height=r?r(this):1}
Ni(yl),yl.prototype.lineNo=function(){return ei(this)}
var bl={},wl={}
Xn.prototype={chunkSize:function(){return this.lines.length},removeInner:function(e,t){for(var r=e,n=e+t;n>r;++r){var i=this.lines[r]
this.height-=i.height,Mn(i),Si(i,"delete")}this.lines.splice(e,t)},collapse:function(e){e.push.apply(e,this.lines)},insertInner:function(e,t,r){this.height+=r,this.lines=this.lines.slice(0,e).concat(t).concat(this.lines.slice(e))
for(var n=0;n<t.length;++n)t[n].parent=this},iterN:function(e,t,r){for(var n=e+t;n>e;++e)if(r(this.lines[e]))return!0}},Yn.prototype={chunkSize:function(){return this.size},removeInner:function(e,t){this.size-=t
for(var r=0;r<this.children.length;++r){var n=this.children[r],i=n.chunkSize()
if(i>e){var o=Math.min(t,i-e),l=n.height
if(n.removeInner(e,o),this.height-=l-n.height,i==o&&(this.children.splice(r--,1),n.parent=null),0==(t-=o))break
e=0}else e-=i}if(this.size-t<25&&(this.children.length>1||!(this.children[0]instanceof Xn))){var s=[]
this.collapse(s),this.children=[new Xn(s)],this.children[0].parent=this}},collapse:function(e){for(var t=0;t<this.children.length;++t)this.children[t].collapse(e)},insertInner:function(e,t,r){this.size+=t.length,this.height+=r
for(var n=0;n<this.children.length;++n){var i=this.children[n],o=i.chunkSize()
if(o>=e){if(i.insertInner(e,t,r),i.lines&&i.lines.length>50){for(;i.lines.length>50;){var l=i.lines.splice(i.lines.length-25,25),s=new Xn(l)
i.height-=s.height,this.children.splice(n+1,0,s),s.parent=this}this.maybeSpill()}break}e-=o}},maybeSpill:function(){if(!(this.children.length<=10)){var e=this
do{var t=e.children.splice(e.children.length-5,5),r=new Yn(t)
if(e.parent){e.size-=r.size,e.height-=r.height
var n=Di(e.parent.children,e)
e.parent.children.splice(n+1,0,r)}else{var i=new Yn(e.children)
i.parent=e,e.children=[i,r],e=i}r.parent=e.parent}while(e.children.length>10)
e.parent.maybeSpill()}},iterN:function(e,t,r){for(var n=0;n<this.children.length;++n){var i=this.children[n],o=i.chunkSize()
if(o>e){var l=Math.min(t,o-e)
if(i.iterN(e,l,r))return!0
if(0==(t-=l))break
e=0}else e-=o}}}
var xl=0,Cl=e.Doc=function(e,t,r,n){if(!(this instanceof Cl))return new Cl(e,t,r,n)
null==r&&(r=0),Yn.call(this,[new Xn([new yl("",null)])]),this.first=r,this.scrollTop=this.scrollLeft=0,this.cantEdit=!1,this.cleanGeneration=1,this.frontier=r
var i=Io(r,0)
this.sel=pe(i),this.history=new ii(null),this.id=++xl,this.modeOption=t,this.lineSep=n,"string"==typeof e&&(e=this.splitLines(e)),jn(this,{from:i,to:i,text:e}),Me(this,pe(i),Pl)}
Cl.prototype=Pi(Yn.prototype,{constructor:Cl,iter:function(e,t,r){r?this.iterN(e-this.first,t-e,r):this.iterN(this.first,this.first+this.size,e)},insert:function(e,t){for(var r=0,n=0;n<t.length;++n)r+=t[n].height
this.insertInner(e-this.first,t,r)},remove:function(e,t){this.removeInner(e-this.first,t)},getValue:function(e){var t=Qn(this,this.first,this.first+this.size)
return e===!1?t:t.join(e||this.lineSeparator())},setValue:Ot(function(e){var t=Io(this.first,0),r=this.first+this.size-1
Lr(this,{from:t,to:Io(r,qn(this,r).text.length),text:this.splitLines(e),origin:"setValue",full:!0},!0),Me(this,pe(t))}),replaceRange:function(e,t,r,n){t=ve(this,t),r=r?ve(this,r):t,Wr(this,e,t,r,n)},getRange:function(e,t,r){var n=Zn(this,ve(this,e),ve(this,t))
return r===!1?n:n.join(r||this.lineSeparator())},getLine:function(e){var t=this.getLineHandle(e)
return t&&t.text},getLineHandle:function(e){return ye(this,e)?qn(this,e):void 0},getLineNumber:function(e){return ei(e)},getLineHandleVisualStart:function(e){return"number"==typeof e&&(e=qn(this,e)),mn(e)},lineCount:function(){return this.size},firstLine:function(){return this.first},lastLine:function(){return this.first+this.size-1},clipPos:function(e){return ve(this,e)},getCursor:function(e){var t,r=this.sel.primary()
return t=null==e||"head"==e?r.head:"anchor"==e?r.anchor:"end"==e||"to"==e||e===!1?r.to():r.from()},listSelections:function(){return this.sel.ranges},somethingSelected:function(){return this.sel.somethingSelected()},setCursor:Ot(function(e,t,r){Le(this,ve(this,"number"==typeof e?Io(e,t||0):e),null,r)}),setSelection:Ot(function(e,t,r){Le(this,ve(this,e),ve(this,t||e),r)}),extendSelection:Ot(function(e,t,r){xe(this,ve(this,e),t&&ve(this,t),r)}),extendSelections:Ot(function(e,t){Ce(this,be(this,e,t))}),extendSelectionsBy:Ot(function(e,t){Ce(this,Hi(this.sel.ranges,e),t)}),setSelections:Ot(function(e,t,r){if(e.length){for(var n=0,i=[];n<e.length;n++)i[n]=new fe(ve(this,e[n].anchor),ve(this,e[n].head))
null==t&&(t=Math.min(e.length-1,this.sel.primIndex)),Me(this,de(i,t),r)}}),addSelection:Ot(function(e,t,r){var n=this.sel.ranges.slice(0)
n.push(new fe(ve(this,e),ve(this,t||e))),Me(this,de(n,n.length-1),r)}),getSelection:function(e){for(var t,r=this.sel.ranges,n=0;n<r.length;n++){var i=Zn(this,r[n].from(),r[n].to())
t=t?t.concat(i):i}return e===!1?t:t.join(e||this.lineSeparator())},getSelections:function(e){for(var t=[],r=this.sel.ranges,n=0;n<r.length;n++){var i=Zn(this,r[n].from(),r[n].to())
e!==!1&&(i=i.join(e||this.lineSeparator())),t[n]=i}return t},replaceSelection:function(e,t,r){for(var n=[],i=0;i<this.sel.ranges.length;i++)n[i]=e
this.replaceSelections(n,t,r||"+input")},replaceSelections:Ot(function(e,t,r){for(var n=[],i=this.sel,o=0;o<i.ranges.length;o++){var l=i.ranges[o]
n[o]={from:l.from(),to:l.to(),text:this.splitLines(e[o]),origin:r}}for(var s=t&&"end"!=t&&Cr(this,n,t),o=n.length-1;o>=0;o--)Lr(this,n[o])
s?ke(this,s):this.cm&&Ir(this.cm)}),undo:Ot(function(){kr(this,"undo")}),redo:Ot(function(){kr(this,"redo")}),undoSelection:Ot(function(){kr(this,"undo",!0)}),redoSelection:Ot(function(){kr(this,"redo",!0)}),setExtending:function(e){this.extend=e},getExtending:function(){return this.extend},historySize:function(){for(var e=this.history,t=0,r=0,n=0;n<e.done.length;n++)e.done[n].ranges||++t
for(var n=0;n<e.undone.length;n++)e.undone[n].ranges||++r
return{undo:t,redo:r}},clearHistory:function(){this.history=new ii(this.history.maxGeneration)},markClean:function(){this.cleanGeneration=this.changeGeneration(!0)},changeGeneration:function(e){return e&&(this.history.lastOp=this.history.lastSelOp=this.history.lastOrigin=null),this.history.generation},isClean:function(e){return this.history.generation==(e||this.cleanGeneration)},getHistory:function(){return{done:gi(this.history.done),undone:gi(this.history.undone)}},setHistory:function(e){var t=this.history=new ii(this.history.maxGeneration)
t.done=gi(e.done.slice(0),null,!0),t.undone=gi(e.undone.slice(0),null,!0)},addLineClass:Ot(function(e,t,r){return Rr(this,e,"gutter"==t?"gutter":"class",function(e){var n="text"==t?"textClass":"background"==t?"bgClass":"gutter"==t?"gutterClass":"wrapClass"
if(e[n]){if(ji(r).test(e[n]))return!1
e[n]+=" "+r}else e[n]=r
return!0})}),removeLineClass:Ot(function(e,t,r){return Rr(this,e,"gutter"==t?"gutter":"class",function(e){var n="text"==t?"textClass":"background"==t?"bgClass":"gutter"==t?"gutterClass":"wrapClass",i=e[n]
if(!i)return!1
if(null==r)e[n]=null
else{var o=i.match(ji(r))
if(!o)return!1
var l=o.index+o[0].length
e[n]=i.slice(0,o.index)+(o.index&&l!=i.length?" ":"")+i.slice(l)||null}return!0})}),addLineWidget:Ot(function(e,t,r){return Tn(this,e,t,r)}),removeLineWidget:function(e){e.clear()},markText:function(e,t,r){return Xr(this,ve(this,e),ve(this,t),r,r&&r.type||"range")},setBookmark:function(e,t){var r={replacedWith:t&&(null==t.nodeType?t.widget:t),insertLeft:t&&t.insertLeft,clearWhenEmpty:!1,shared:t&&t.shared,handleMouseEvents:t&&t.handleMouseEvents}
return e=ve(this,e),Xr(this,e,e,r,"bookmark")},findMarksAt:function(e){e=ve(this,e)
var t=[],r=qn(this,e.line).markedSpans
if(r)for(var n=0;n<r.length;++n){var i=r[n];(null==i.from||i.from<=e.ch)&&(null==i.to||i.to>=e.ch)&&t.push(i.marker.parent||i.marker)}return t},findMarks:function(e,t,r){e=ve(this,e),t=ve(this,t)
var n=[],i=e.line
return this.iter(e.line,t.line+1,function(o){var l=o.markedSpans
if(l)for(var s=0;s<l.length;s++){var a=l[s]
i==e.line&&e.ch>a.to||null==a.from&&i!=e.line||i==t.line&&a.from>t.ch||r&&!r(a.marker)||n.push(a.marker.parent||a.marker)}++i}),n},getAllMarks:function(){var e=[]
return this.iter(function(t){var r=t.markedSpans
if(r)for(var n=0;n<r.length;++n)null!=r[n].from&&e.push(r[n].marker)}),e},posFromIndex:function(e){var t,r=this.first
return this.iter(function(n){var i=n.text.length+1
return i>e?(t=e,!0):(e-=i,void++r)}),ve(this,Io(r,t))},indexFromPos:function(e){e=ve(this,e)
var t=e.ch
return e.line<this.first||e.ch<0?0:(this.iter(this.first,e.line,function(e){t+=e.text.length+1}),t)},copy:function(e){var t=new Cl(Qn(this,this.first,this.first+this.size),this.modeOption,this.first,this.lineSep)
return t.scrollTop=this.scrollTop,t.scrollLeft=this.scrollLeft,t.sel=this.sel,t.extend=!1,e&&(t.history.undoDepth=this.history.undoDepth,t.setHistory(this.getHistory())),t},linkedDoc:function(e){e||(e={})
var t=this.first,r=this.first+this.size
null!=e.from&&e.from>t&&(t=e.from),null!=e.to&&e.to<r&&(r=e.to)
var n=new Cl(Qn(this,t,r),e.mode||this.modeOption,t,this.lineSep)
return e.sharedHist&&(n.history=this.history),(this.linked||(this.linked=[])).push({doc:n,sharedHist:e.sharedHist}),n.linked=[{doc:this,isParent:!0,sharedHist:e.sharedHist}],$r(n,_r(this)),n},unlinkDoc:function(t){if(t instanceof e&&(t=t.doc),this.linked)for(var r=0;r<this.linked.length;++r){var n=this.linked[r]
if(n.doc==t){this.linked.splice(r,1),t.unlinkDoc(this),qr(_r(this))
break}}if(t.history==this.history){var i=[t.id]
_n(t,function(e){i.push(e.id)},!0),t.history=new ii(null),t.history.done=gi(this.history.done,i),t.history.undone=gi(this.history.undone,i)}},iterLinkedDocs:function(e){_n(this,e)},getMode:function(){return this.mode},getEditor:function(){return this.cm},splitLines:function(e){return this.lineSep?e.split(this.lineSep):Jl(e)},lineSeparator:function(){return this.lineSep||"\n"}}),Cl.prototype.eachLine=Cl.prototype.iter
var Sl="iter insert remove copy getEditor constructor".split(" ")
for(var Ll in Cl.prototype)Cl.prototype.hasOwnProperty(Ll)&&Di(Sl,Ll)<0&&(e.prototype[Ll]=function(e){return function(){return e.apply(this.doc,arguments)}}(Cl.prototype[Ll]))
Ni(Cl)
var Tl=e.e_preventDefault=function(e){e.preventDefault?e.preventDefault():e.returnValue=!1},kl=e.e_stopPropagation=function(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},Ml=e.e_stop=function(e){Tl(e),kl(e)},Nl=e.on=function(e,t,r){if(e.addEventListener)e.addEventListener(t,r,!1)
else if(e.attachEvent)e.attachEvent("on"+t,r)
else{var n=e._handlers||(e._handlers={}),i=n[t]||(n[t]=[])
i.push(r)}},Al=[],Wl=e.off=function(e,t,r){if(e.removeEventListener)e.removeEventListener(t,r,!1)
else if(e.detachEvent)e.detachEvent("on"+t,r)
else for(var n=Ci(e,t,!1),i=0;i<n.length;++i)if(n[i]==r){n.splice(i,1)
break}},Ol=e.signal=function(e,t){var r=Ci(e,t,!0)
if(r.length)for(var n=Array.prototype.slice.call(arguments,2),i=0;i<r.length;++i)r[i].apply(null,n)},Dl=null,Hl=30,El=e.Pass={toString:function(){return"CodeMirror.Pass"}},Pl={scroll:!1},Il={origin:"*mouse"},zl={origin:"+move"}
Ai.prototype.set=function(e,t){clearTimeout(this.id),this.id=setTimeout(t,e)}
var Fl=e.countColumn=function(e,t,r,n,i){null==t&&(t=e.search(/[^\s\u00a0]/),-1==t&&(t=e.length))
for(var o=n||0,l=i||0;;){var s=e.indexOf("	",o)
if(0>s||s>=t)return l+(t-o)
l+=s-o,l+=r-l%r,o=s+1}},Rl=e.findColumn=function(e,t,r){for(var n=0,i=0;;){var o=e.indexOf("	",n);-1==o&&(o=e.length)
var l=o-n
if(o==e.length||i+l>=t)return n+Math.min(l,t-i)
if(i+=o-n,i+=r-i%r,n=o+1,i>=t)return n}},Bl=[""],Gl=function(e){e.select()}
Mo?Gl=function(e){e.selectionStart=0,e.selectionEnd=e.value.length}:yo&&(Gl=function(e){try{e.select()}catch(t){}})
var Ul,Vl=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,Kl=e.isWordChar=function(e){return/\w/.test(e)||e>""&&(e.toUpperCase()!=e.toLowerCase()||Vl.test(e))},jl=/[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/
Ul=document.createRange?function(e,t,r,n){var i=document.createRange()
return i.setEnd(n||e,r),i.setStart(e,t),i}:function(e,t,r){var n=document.body.createTextRange()
try{n.moveToElementText(e.parentNode)}catch(i){return n}return n.collapse(!0),n.moveEnd("character",r),n.moveStart("character",t),n}
var Xl=e.contains=function(e,t){if(3==t.nodeType&&(t=t.parentNode),e.contains)return e.contains(t)
do if(11==t.nodeType&&(t=t.host),t==e)return!0
while(t=t.parentNode)}
yo&&11>bo&&(Ki=function(){try{return document.activeElement}catch(e){return document.body}})
var Yl,_l,$l=e.rmClass=function(e,t){var r=e.className,n=ji(t).exec(r)
if(n){var i=r.slice(n.index+n[0].length)
e.className=r.slice(0,n.index)+(i?n[1]+i:"")}},ql=e.addClass=function(e,t){var r=e.className
ji(t).test(r)||(e.className+=(r?" ":"")+t)},Zl=!1,Ql=function(){if(yo&&9>bo)return!1
var e=Gi("div")
return"draggable"in e||"dragDrop"in e}(),Jl=e.splitLines=3!="\n\nb".split(/\n/).length?function(e){for(var t=0,r=[],n=e.length;n>=t;){var i=e.indexOf("\n",t);-1==i&&(i=e.length)
var o=e.slice(t,"\r"==e.charAt(i-1)?i-1:i),l=o.indexOf("\r");-1!=l?(r.push(o.slice(0,l)),t+=l+1):(r.push(o),t=i+1)}return r}:function(e){return e.split(/\r\n?|\n/)},es=window.getSelection?function(e){try{return e.selectionStart!=e.selectionEnd}catch(t){return!1}}:function(e){try{var t=e.ownerDocument.selection.createRange()}catch(r){}return t&&t.parentElement()==e?0!=t.compareEndPoints("StartToEnd",t):!1},ts=function(){var e=Gi("div")
return"oncopy"in e?!0:(e.setAttribute("oncopy","return;"),"function"==typeof e.oncopy)}(),rs=null,ns=e.keyNames={3:"Enter",8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause",20:"CapsLock",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"PrintScrn",45:"Insert",46:"Delete",59:";",61:"=",91:"Mod",92:"Mod",93:"Mod",106:"*",107:"=",109:"-",110:".",111:"/",127:"Delete",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",63232:"Up",63233:"Down",63234:"Left",63235:"Right",63272:"Delete",63273:"Home",63275:"End",63276:"PageUp",63277:"PageDown",63302:"Insert"}
!function(){for(var e=0;10>e;e++)ns[e+48]=ns[e+96]=e+""
for(var e=65;90>=e;e++)ns[e]=String.fromCharCode(e)
for(var e=1;12>=e;e++)ns[e+111]=ns[e+63235]="F"+e}()
var is,os=function(){function e(e){return 247>=e?r.charAt(e):e>=1424&&1524>=e?"R":e>=1536&&1773>=e?n.charAt(e-1536):e>=1774&&2220>=e?"r":e>=8192&&8203>=e?"w":8204==e?"b":"L"}function t(e,t,r){this.level=e,this.from=t,this.to=r}var r="bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",n="rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm",i=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,o=/[stwN]/,l=/[LRr]/,s=/[Lb1n]/,a=/[1n]/,u="L"
return function(r){if(!i.test(r))return!1
for(var n,c=r.length,h=[],f=0;c>f;++f)h.push(n=e(r.charCodeAt(f)))
for(var f=0,d=u;c>f;++f){var n=h[f]
"m"==n?h[f]=d:d=n}for(var f=0,p=u;c>f;++f){var n=h[f]
"1"==n&&"r"==p?h[f]="n":l.test(n)&&(p=n,"r"==n&&(h[f]="R"))}for(var f=1,d=h[0];c-1>f;++f){var n=h[f]
"+"==n&&"1"==d&&"1"==h[f+1]?h[f]="1":","!=n||d!=h[f+1]||"1"!=d&&"n"!=d||(h[f]=d),d=n}for(var f=0;c>f;++f){var n=h[f]
if(","==n)h[f]="N"
else if("%"==n){for(var g=f+1;c>g&&"%"==h[g];++g);for(var v=f&&"!"==h[f-1]||c>g&&"1"==h[g]?"1":"N",m=f;g>m;++m)h[m]=v
f=g-1}}for(var f=0,p=u;c>f;++f){var n=h[f]
"L"==p&&"1"==n?h[f]="L":l.test(n)&&(p=n)}for(var f=0;c>f;++f)if(o.test(h[f])){for(var g=f+1;c>g&&o.test(h[g]);++g);for(var y="L"==(f?h[f-1]:u),b="L"==(c>g?h[g]:u),v=y||b?"L":"R",m=f;g>m;++m)h[m]=v
f=g-1}for(var w,x=[],f=0;c>f;)if(s.test(h[f])){var C=f
for(++f;c>f&&s.test(h[f]);++f);x.push(new t(0,C,f))}else{var S=f,L=x.length
for(++f;c>f&&"L"!=h[f];++f);for(var m=S;f>m;)if(a.test(h[m])){m>S&&x.splice(L,0,new t(1,S,m))
var T=m
for(++m;f>m&&a.test(h[m]);++m);x.splice(L,0,new t(2,T,m)),S=m}else++m
f>S&&x.splice(L,0,new t(1,S,f))}return 1==x[0].level&&(w=r.match(/^\s+/))&&(x[0].from=w[0].length,x.unshift(new t(0,0,w[0].length))),1==Oi(x).level&&(w=r.match(/\s+$/))&&(Oi(x).to-=w[0].length,x.push(new t(0,c-w[0].length,c))),2==x[0].level&&x.unshift(new t(1,x[0].to,x[0].to)),x[0].level!=Oi(x).level&&x.push(new t(x[0].level,c,c)),x}}()
return e.version="5.8.1",e})
