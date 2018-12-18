/**
 * @license r.js 2.3.5 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/r.js/LICENSE
 */
var requirejs,require,define,xpcUtil
!function(console,args,readFileFunc){function showHelp(){console.log("See https://github.com/requirejs/r.js for usage.")}function loadLib(){!function(){var e=/(\/|^)env\/|\{env\}/,t="unknown"
"undefined"!=typeof process&&process.versions&&process.versions.node?t="node":"undefined"!=typeof Packages?t="rhino":"undefined"!=typeof navigator&&"undefined"!=typeof document||"undefined"!=typeof importScripts&&"undefined"!=typeof self?t="browser":"undefined"!=typeof Components&&Components.classes&&Components.interfaces&&(t="xpconnect"),define("env",{get:function(){return t},load:function(n,i,r,o){o.env&&(t=o.env),n=n.replace(e,function(e,n){return-1===e.indexOf("{")?n+t+"/":t}),i([n],function(e){r(e)})}})}(),define("lang",function(){" "
function e(e,t){return i.call(e,t)}var t,n,i=Object.prototype.hasOwnProperty
return n=function(){return!1},"undefined"!=typeof java&&java.lang&&java.lang.Object&&"undefined"!=typeof importPackage&&(n=function(e){return e instanceof java.lang.Object}),t={backSlashRegExp:/\\/g,ostring:Object.prototype.toString,isArray:Array.isArray||function(e){return"[object Array]"===t.ostring.call(e)},isFunction:function(e){return"[object Function]"===t.ostring.call(e)},isRegExp:function(e){return e&&e instanceof RegExp},hasProp:e,falseProp:function(t,n){return!e(t,n)||!t[n]},getOwn:function(t,n){return e(t,n)&&t[n]},_mixin:function(e,t,n){var i
for(i in t)!t.hasOwnProperty(i)||!n&&e.hasOwnProperty(i)||(e[i]=t[i])
return e},mixin:function(e){var n,i,r,o=Array.prototype.slice.call(arguments)
for(e||(e={}),o.length>2&&"boolean"==typeof arguments[o.length-1]&&(n=o.pop()),i=1,r=o.length;r>i;i++)t._mixin(e,o[i],n)
return e},deepMix:function(e,n){return t.eachProp(n,function(n,i){"object"!=typeof n||!n||t.isArray(n)||t.isFunction(n)||n instanceof RegExp?e[i]=n:(e[i]||(e[i]={}),t.deepMix(e[i],n))}),e},deeplikeCopy:function(i,r){var o,a
return t.isArray(i)?(a=[],i.forEach(function(e){a.push(t.deeplikeCopy(e,r))}),a):(o=typeof i,null===i||void 0===i||"boolean"===o||"string"===o||"number"===o||t.isFunction(i)||t.isRegExp(i)||n(i)?i:(a={},t.eachProp(i,function(n,i){r&&e(r,i)||(a[i]=t.deeplikeCopy(n,r))}),a))},delegate:function(){function e(){}return function(n,i){e.prototype=n
var r=new e
return e.prototype=null,i&&t.mixin(r,i),r}}(),each:function(e,t){if(e){var n
for(n=0;n<e.length&&!t(e[n],n,e);n+=1);}},eachProp:function(t,n){var i
for(i in t)if(e(t,i)&&n(t[i],i))break},bind:function(e,t){return function(){return t.apply(e,arguments)}},jsEscape:function(e){return e.replace(/(["'\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r")}}})
var prim
if(function(){" "
function e(e,t){return o.call(e,t)}function t(e,t){if(e){var n
for(n=0;n<e.length;n+=1)e[n]&&t(e[n],n,e)}}function n(t){if(e(t,"e")||e(t,"v")){if(!prim.hideResolutionConflict)throw Error("Prim promise already resolved: "+JSON.stringify(t))
return!1}return!0}function i(e,n){prim.nextTick(function(){t(e,function(e){e(n)})})}var r=Object.prototype,o=r.hasOwnProperty
prim=function a(){var t,r=[],o=[]
return t={callback:function(n,i){i&&t.errback(i),e(t,"v")?a.nextTick(function(){n(t.v)}):r.push(n)},errback:function(n){e(t,"e")?a.nextTick(function(){n(t.e)}):o.push(n)},finished:function(){return e(t,"e")||e(t,"v")},rejected:function(){return e(t,"e")},resolve:function(e){return n(t)&&(t.v=e,i(r,e)),t},reject:function(e){return n(t)&&(t.e=e,i(o,e)),t},start:function(e){return t.resolve(),t.promise.then(e)},promise:{then:function(e,n){var i=a()
return t.callback(function(t){try{e&&"function"==typeof e&&(t=e(t)),t&&t.then?t.then(i.resolve,i.reject):i.resolve(t)}catch(n){i.reject(n)}},function(e){var t
try{n&&"function"==typeof n?(t=n(e),t&&t.then?t.then(i.resolve,i.reject):i.resolve(t)):i.reject(e)}catch(r){i.reject(r)}}),i.promise},fail:function(e){return t.promise.then(null,e)},end:function(){t.errback(function(e){throw e})}}}},prim.serial=function(e){var n=prim().resolve().promise
return t(e,function(e){n=n.then(function(){return e()})}),n},prim.nextTick="function"==typeof setImmediate?setImmediate:"undefined"!=typeof process&&process.nextTick?process.nextTick:"undefined"!=typeof setTimeout?function(e){setTimeout(e,0)}:function(e){e()},"function"==typeof define&&define.amd?define("prim",function(){return prim}):"undefined"!=typeof module&&module.exports&&(module.exports=prim)}(),"browser"===env&&define("browser/assert",function(){return{}}),"node"===env&&define("node/assert",["assert"],function(e){return e}),"rhino"===env&&define("rhino/assert",function(){return{}}),"xpconnect"===env&&define("xpconnect/assert",function(){return{}}),"browser"===env&&define("browser/args",function(){return[]}),"node"===env&&define("node/args",function(){var e=process.argv.slice(2)
return e[0]&&0===e[0].indexOf("-")&&(e=e.slice(1)),e}),"rhino"===env){var jsLibRhinoArgs=void 0!==rhinoArgs&&rhinoArgs||[].concat(Array.prototype.slice.call(arguments,0))
define("rhino/args",function(){var e=jsLibRhinoArgs
return e[0]&&0===e[0].indexOf("-")&&(e=e.slice(1)),e})}if("xpconnect"===env){var jsLibXpConnectArgs=void 0!==xpconnectArgs&&xpconnectArgs||[].concat(Array.prototype.slice.call(arguments,0))
define("xpconnect/args",function(){var e=jsLibXpConnectArgs
return e[0]&&0===e[0].indexOf("-")&&(e=e.slice(1)),e})}"browser"===env&&define("browser/load",["./file"],function(file){function load(fileName){eval(file.readFile(fileName))}return load}),"node"===env&&define("node/load",["fs"],function(e){function t(t){var n=e.readFileSync(t,"utf8")
process.compile(n,t)}return t}),"rhino"===env&&define("rhino/load",function(){return load}),"xpconnect"===env&&define("xpconnect/load",function(){return load}),"browser"===env&&define("browser/file",["prim"],function(e){function t(e){return e.replace(/\\/g,"/")}function n(e){var t,n=new XMLHttpRequest
return n.open("HEAD",e,!1),n.send(),t=n.status,200===t||304===t}var i,r=/^\.(\/|$)/
return i={backSlashRegExp:/\\/g,exclusionRegExp:/^\./,getLineSeparator:function(){return"/"},exists:function(e){return n(e)},parent:function(e){var t=e.split("/")
return t.pop(),t.join("/")},absPath:function(e){var n
return r.test(e)&&(n=t(location.href),-1!==n.indexOf("/")&&(n=n.split("/"),n.splice(0,3),n.pop(),n="/"+n.join("/")),e=n+e.substring(1)),e},normalize:function(e){return e},isFile:function(e){return!0},isDirectory:function(e){return!1},getFilteredFileList:function(e,t,n){console.log("file.getFilteredFileList is no-op in browser")},copyDir:function(e,t,n,i){console.log("file.copyDir is no-op in browser")},copyFile:function(e,t,n){console.log("file.copyFile is no-op in browser")},renameFile:function(e,t){console.log("file.renameFile is no-op in browser")},readFile:function(e,t){var n=new XMLHttpRequest
return n.open("GET",e,!1),n.send(),n.responseText},readFileAsync:function(t,n){var i=new XMLHttpRequest,r=e()
return i.open("GET",t,!0),i.send(),i.onreadystatechange=function(){4===i.readyState&&(i.status>400?r.reject(Error("Status: "+i.status+": "+i.statusText)):r.resolve(i.responseText))},r.promise},saveUtf8File:function(e,t){i.saveFile(e,t,"utf8")},saveFile:function(e,t,n){requirejs.browser.saveFile(e,t,n)},deleteFile:function(e){console.log("file.deleteFile is no-op in browser")},deleteEmptyDirs:function(e){console.log("file.deleteEmptyDirs is no-op in browser")}}}),"node"===env&&define("node/file",["fs","path","prim"],function(e,t,n){function i(e){return e.replace(/\\/g,"/")}function r(t){u&&"/"===t.charAt(t.length-1)&&":"!==t.charAt(t.length-2)&&(t=t.substring(0,t.length-1))
try{return e.statSync(t),!0}catch(n){return!1}}function o(t){r(t)||u&&c.test(t)||e.mkdirSync(t,511)}function a(e){var t=e.split("/"),n="",i=!0
t.forEach(function(e){n+=e+"/",i=!1,e&&o(n)})}var s,u="win32"===process.platform,c=/^[a-zA-Z]\:\/$/
return s={backSlashRegExp:/\\/g,exclusionRegExp:/^\./,getLineSeparator:function(){return"/"},exists:function(e){return r(e)},parent:function(e){var t=e.split("/")
return t.pop(),t.join("/")},absPath:function(n){return i(t.normalize(i(e.realpathSync(n))))},normalize:function(e){return i(t.normalize(e))},isFile:function(t){return e.statSync(t).isFile()},isDirectory:function(t){return e.statSync(t).isDirectory()},getFilteredFileList:function(n,r,o){var a,u,c,l,p,f,h,d,m,g,v=[]
if(a=n,u=r.include||r,c=r.exclude||null,s.exists(a))for(l=e.readdirSync(a),p=0;p<l.length;p++)g=l[p],h=t.join(a,g),f=e.statSync(h),f.isFile()?(o&&-1===h.indexOf("/")&&(h=i(h)),d=!0,u&&(d=h.match(u)),d&&c&&(d=!h.match(c)),!d||s.exclusionRegExp&&s.exclusionRegExp.test(g)||v.push(h)):!f.isDirectory()||s.exclusionRegExp&&s.exclusionRegExp.test(g)||(m=this.getFilteredFileList(h,r,o),m.forEach(function(e){v.push(e)}))
return v},copyDir:function(e,n,r,o){r=r||/\w/,e=i(t.normalize(e)),n=i(t.normalize(n))
var a,u,c,l=s.getFilteredFileList(e,r,!0),p=[]
for(a=0;a<l.length;a++)u=l[a],c=u.replace(e,n),s.copyFile(u,c,o)&&p.push(c)
return p.length?p:null},copyFile:function(n,i,r){var o
return r&&s.exists(i)&&e.statSync(i).mtime.getTime()>=e.statSync(n).mtime.getTime()?!1:(o=t.dirname(i),s.exists(o)||a(o),e.writeFileSync(i,e.readFileSync(n,"binary"),"binary"),!0)},renameFile:function(t,n){return e.renameSync(t,n)},readFile:function(t,n){"utf-8"===n&&(n="utf8"),n||(n="utf8")
var i=e.readFileSync(t,n)
return 0===i.indexOf("\ufeff")&&(i=i.substring(1,i.length)),i},readFileAsync:function(e,t){var i=n()
try{i.resolve(s.readFile(e,t))}catch(r){i.reject(r)}return i.promise},saveUtf8File:function(e,t){s.saveFile(e,t,"utf8")},saveFile:function(n,i,r){var o
"utf-8"===r&&(r="utf8"),r||(r="utf8"),o=t.dirname(n),s.exists(o)||a(o),e.writeFileSync(n,i,r)},deleteFile:function(n){var i,r,o
if(s.exists(n))if(o=e.lstatSync(n),o.isDirectory()){for(i=e.readdirSync(n),r=0;r<i.length;r++)this.deleteFile(t.join(n,i[r]))
e.rmdirSync(n)}else e.unlinkSync(n)},deleteEmptyDirs:function(n){var i,r,o,a,u
if(s.exists(n)){for(i=e.readdirSync(n),r=0;r<i.length;r++)o=i[r],a=t.join(n,o),u=e.lstatSync(a),u.isDirectory()&&s.deleteEmptyDirs(a)
0===e.readdirSync(n).length&&s.deleteFile(n)}}}}),"rhino"===env&&define("rhino/file",["prim"],function(e){var t={backSlashRegExp:/\\/g,exclusionRegExp:/^\./,getLineSeparator:function(){return t.lineSeparator},lineSeparator:java.lang.System.getProperty("line.separator"),exists:function(e){return new java.io.File(e).exists()},parent:function(e){return t.absPath(new java.io.File(e).getParentFile())},normalize:function(e){return t.absPath(e)},isFile:function(e){return new java.io.File(e).isFile()},isDirectory:function(e){return new java.io.File(e).isDirectory()},absPath:function(e){return"string"==typeof e&&(e=new java.io.File(e)),(e.getCanonicalPath()+"").replace(t.backSlashRegExp,"/")},getFilteredFileList:function(e,n,i,r){var o,a,s,u,c,l,p,f,h,d=[]
if(o=e,r||(o=new java.io.File(e)),a=n.include||n,s=n.exclude||null,o.exists())for(u=o.listFiles(),c=0;c<u.length;c++)l=u[c],l.isFile()?(p=l.getPath(),i&&(p+="",-1===p.indexOf("/")&&(p=p.replace(/\\/g,"/"))),f=!0,a&&(f=p.match(a)),f&&s&&(f=!p.match(s)),!f||t.exclusionRegExp&&t.exclusionRegExp.test(l.getName())||d.push(p)):!l.isDirectory()||t.exclusionRegExp&&t.exclusionRegExp.test(l.getName())||(h=this.getFilteredFileList(l,n,i,!0),h.forEach(function(e){d.push(e)}))
return d},copyDir:function(e,n,i,r){i=i||/\w/
var o,a,s,u=t.getFilteredFileList(e,i,!0),c=[]
for(o=0;o<u.length;o++)a=u[o],s=a.replace(e,n),t.copyFile(a,s,r)&&c.push(s)
return c.length?c:null},copyFile:function(e,t,n){var i,r,o,a,s=new java.io.File(t)
if(n&&(i=new java.io.File(e),s.exists()&&s.lastModified()>=i.lastModified()))return!1
if(r=s.getParentFile(),!r.exists()&&!r.mkdirs())throw"Could not create directory: "+r.getCanonicalPath()
return o=new java.io.FileInputStream(e).getChannel(),a=new java.io.FileOutputStream(t).getChannel(),a.transferFrom(o,0,o.size()),o.close(),a.close(),!0},renameFile:function(e,t){return new java.io.File(e).renameTo(new java.io.File(t))},readFile:function(e,n){n=n||"utf-8"
var i,r,o=new java.io.File(e),a=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(o),n))
try{for(i=new java.lang.StringBuffer,r=a.readLine(),r&&r.length()&&65279===r.charAt(0)&&(r=r.substring(1));null!==r;)i.append(r),i.append(t.lineSeparator),r=a.readLine()
return""+i}finally{a.close()}},readFileAsync:function(n,i){var r=e()
try{r.resolve(t.readFile(n,i))}catch(o){r.reject(o)}return r.promise},saveUtf8File:function(e,n){t.saveFile(e,n,"utf-8")},saveFile:function(e,t,n){var i,r,o,a=new java.io.File(e)
if(r=a.getAbsoluteFile().getParentFile(),!r.exists()&&!r.mkdirs())throw"Could not create directory: "+r.getAbsolutePath()
i=n?new java.io.OutputStreamWriter(new java.io.FileOutputStream(a),n):new java.io.OutputStreamWriter(new java.io.FileOutputStream(a)),o=new java.io.BufferedWriter(i)
try{"undefined"!=typeof importPackage?o.write(t):o.write(new java.lang.String(t))}finally{o.close()}},deleteFile:function(e){var t,n,i=new java.io.File(e)
if(i.exists()){if(i.isDirectory())for(t=i.listFiles(),n=0;n<t.length;n++)this.deleteFile(t[n])
i["delete"]()}},deleteEmptyDirs:function(e,n){var i,r,o,a=e
if(n||(a=new java.io.File(e)),a.exists()){for(i=a.listFiles(),r=0;r<i.length;r++)o=i[r],o.isDirectory()&&t.deleteEmptyDirs(o,!0)
0===a.listFiles().length&&t.deleteFile(a.getPath()+"")}}}
return t}),"xpconnect"===env&&define("xpconnect/file",["prim"],function(e){function t(e){e.exists()||e.create(1,511)}var n,i=Components.classes,r=Components.interfaces,o=xpcUtil.xpfile
return n={backSlashRegExp:/\\/g,exclusionRegExp:/^\./,getLineSeparator:function(){return n.lineSeparator},lineSeparator:"@mozilla.org/windows-registry-key;1"in i?"\r\n":"\n",exists:function(e){return o(e).exists()},parent:function(e){return o(e).parent},normalize:function(e){return n.absPath(e)},isFile:function(e){return o(e).isFile()},isDirectory:function(e){return o(e).isDirectory()},absPath:function(e){return"string"==typeof e&&(e=o(e)),e.path},getFilteredFileList:function(e,t,i,a){var s,u,c,l,p,f,h,d,m=[]
if(s=e,a||(s=o(e)),u=t.include||t,c=t.exclude||null,s.exists())for(l=s.directoryEntries;l.hasMoreElements();)p=l.getNext().QueryInterface(r.nsILocalFile),p.isFile()?(f=p.path,i&&-1===f.indexOf("/")&&(f=f.replace(/\\/g,"/")),h=!0,u&&(h=f.match(u)),h&&c&&(h=!f.match(c)),!h||n.exclusionRegExp&&n.exclusionRegExp.test(p.leafName)||m.push(f)):!p.isDirectory()||n.exclusionRegExp&&n.exclusionRegExp.test(p.leafName)||(d=this.getFilteredFileList(p,t,i,!0),d.forEach(function(e){m.push(e)}))
return m},copyDir:function(e,t,i,r){i=i||/\w/
var o,a,s,u=n.getFilteredFileList(e,i,!0),c=[]
for(o=0;o<u.length;o+=1)a=u[o],s=a.replace(e,t),n.copyFile(a,s,r)&&c.push(s)
return c.length?c:null},copyFile:function(e,t,n){var i=o(t),r=o(e)
return n&&i.exists()&&i.lastModifiedTime>=r.lastModifiedTime?!1:(r.copyTo(i.parent,i.leafName),!0)},renameFile:function(e,t){var n=o(t)
return o(e).moveTo(n.parent,n.leafName)},readFile:xpcUtil.readFile,readFileAsync:function(t,i){var r=e()
try{r.resolve(n.readFile(t,i))}catch(o){r.reject(o)}return r.promise},saveUtf8File:function(e,t){n.saveFile(e,t,"utf-8")},saveFile:function(e,n,a){var s,u,c=o(e)
t(c.parent)
try{s=i["@mozilla.org/network/file-output-stream;1"].createInstance(r.nsIFileOutputStream),s.init(c,42,511,0),u=i["@mozilla.org/intl/converter-output-stream;1"].createInstance(r.nsIConverterOutputStream),u.init(s,a,0,0),u.writeString(n)}catch(l){throw Error((c&&c.path||"")+": "+l)}finally{u&&u.close(),s&&s.close()}},deleteFile:function(e){var t=o(e)
t.exists()&&t.remove(!0)},deleteEmptyDirs:function(e,t){var i,a,s=e
if(t||(s=o(e)),s.exists()){for(i=s.directoryEntries;i.hasMoreElements();)a=i.getNext().QueryInterface(r.nsILocalFile),a.isDirectory()&&n.deleteEmptyDirs(a,!0)
i=s.directoryEntries,i.hasMoreElements()||n.deleteFile(s.path)}}}}),"browser"===env&&define("browser/quit",function(){" "
return function(e){}}),"node"===env&&define("node/quit",function(){" "
return function(e){var t=0,n=function(){0===t?process.exit(e):t-=1}
process.stdout.bufferSize&&(t+=1,process.stdout.once("drain",n)),process.stderr.bufferSize&&(t+=1,process.stderr.once("drain",n)),n()}}),"rhino"===env&&define("rhino/quit",function(){" "
return function(e){return quit(e)}}),"xpconnect"===env&&define("xpconnect/quit",function(){" "
return function(e){return quit(e)}}),"browser"===env&&define("browser/print",function(){function e(e){console.log(e)}return e}),"node"===env&&define("node/print",function(){function e(e){console.log(e)}return e}),"rhino"===env&&define("rhino/print",function(){return print}),"xpconnect"===env&&define("xpconnect/print",function(){return print}),define("logger",["env!env/print"],function(e){var t={TRACE:0,INFO:1,WARN:2,ERROR:3,SILENT:4,level:0,logPrefix:"",logLevel:function(e){this.level=e},trace:function(e){this.level<=this.TRACE&&this._print(e)},info:function(e){this.level<=this.INFO&&this._print(e)},warn:function(e){this.level<=this.WARN&&this._print(e)},error:function(e){this.level<=this.ERROR&&this._print(e)},_print:function(e){this._sysPrint((this.logPrefix?this.logPrefix+" ":"")+e)},_sysPrint:function(t){e(t)}}
return t}),function(e,t){"function"==typeof define&&define.amd?define("esprima",[],t):"object"==typeof exports?exports.esprima=t():e.esprima=t()}(this,function(){return function(e){function t(i){if(n[i])return n[i].exports
var r=n[i]={exports:{},id:i,loaded:!1}
return e[i].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={}
return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){" "
function i(e,t,n){var i=null,r=function(e,t){n&&n(e,t),i&&i.visit(e,t)},o="function"==typeof n?r:null,a=!1
if(t){a="boolean"==typeof t.comment&&t.comment
var l="boolean"==typeof t.attachComment&&t.attachComment;(a||l)&&(i=new s.CommentHandler,i.attach=l,t.comment=!0,o=r)}var p=!1
t&&"string"==typeof t.sourceType&&(p="module"===t.sourceType)
var f
f=t&&"boolean"==typeof t.jsx&&t.jsx?new u.JSXParser(e,t,o):new c.Parser(e,t,o)
var h=p?f.parseModule():f.parseScript(),d=h
return a&&i&&(d.comments=i.comments),f.config.tokens&&(d.tokens=f.tokens),f.config.tolerant&&(d.errors=f.errorHandler.errors),d}function r(e,t,n){var r=t||{}
return r.sourceType="module",i(e,r,n)}function o(e,t,n){var r=t||{}
return r.sourceType="script",i(e,r,n)}function a(e,t,n){var i,r=new l.Tokenizer(e,t)
i=[]
try{for(;;){var o=r.getNextToken()
if(!o)break
n&&(o=n(o)),i.push(o)}}catch(a){r.errorHandler.tolerate(a)}return r.errorHandler.tolerant&&(i.errors=r.errors()),i}Object.defineProperty(t,"__esModule",{value:!0})
var s=n(1),u=n(3),c=n(8),l=n(15)
t.parse=i,t.parseModule=r,t.parseScript=o,t.tokenize=a
var p=n(2)
t.Syntax=p.Syntax,t.version="4.0.0"},function(e,t,n){" "
Object.defineProperty(t,"__esModule",{value:!0})
var i=n(2),r=function(){function e(){this.attach=!1,this.comments=[],this.stack=[],this.leading=[],this.trailing=[]}return e.prototype.insertInnerComments=function(e,t){if(e.type===i.Syntax.BlockStatement&&0===e.body.length){for(var n=[],r=this.leading.length-1;r>=0;--r){var o=this.leading[r]
t.end.offset>=o.start&&(n.unshift(o.comment),this.leading.splice(r,1),this.trailing.splice(r,1))}n.length&&(e.innerComments=n)}},e.prototype.findTrailingComments=function(e){var t=[]
if(this.trailing.length>0){for(var n=this.trailing.length-1;n>=0;--n){var i=this.trailing[n]
i.start>=e.end.offset&&t.unshift(i.comment)}return this.trailing.length=0,t}var r=this.stack[this.stack.length-1]
if(r&&r.node.trailingComments){var o=r.node.trailingComments[0]
o&&o.range[0]>=e.end.offset&&(t=r.node.trailingComments,delete r.node.trailingComments)}return t},e.prototype.findLeadingComments=function(e){for(var t,n=[];this.stack.length>0;){var i=this.stack[this.stack.length-1]
if(!(i&&i.start>=e.start.offset))break
t=i.node,this.stack.pop()}if(t){for(var r=t.leadingComments?t.leadingComments.length:0,o=r-1;o>=0;--o){var a=t.leadingComments[o]
a.range[1]<=e.start.offset&&(n.unshift(a),t.leadingComments.splice(o,1))}return t.leadingComments&&0===t.leadingComments.length&&delete t.leadingComments,n}for(var o=this.leading.length-1;o>=0;--o){var i=this.leading[o]
i.start<=e.start.offset&&(n.unshift(i.comment),this.leading.splice(o,1))}return n},e.prototype.visitNode=function(e,t){if(!(e.type===i.Syntax.Program&&e.body.length>0)){this.insertInnerComments(e,t)
var n=this.findTrailingComments(t),r=this.findLeadingComments(t)
r.length>0&&(e.leadingComments=r),n.length>0&&(e.trailingComments=n),this.stack.push({node:e,start:t.start.offset})}},e.prototype.visitComment=function(e,t){var n="L"===e.type[0]?"Line":"Block",i={type:n,value:e.value}
if(e.range&&(i.range=e.range),e.loc&&(i.loc=e.loc),this.comments.push(i),this.attach){var r={comment:{type:n,value:e.value,range:[t.start.offset,t.end.offset]},start:t.start.offset}
e.loc&&(r.comment.loc=e.loc),e.type=n,this.leading.push(r),this.trailing.push(r)}},e.prototype.visit=function(e,t){"LineComment"===e.type?this.visitComment(e,t):"BlockComment"===e.type?this.visitComment(e,t):this.attach&&this.visitNode(e,t)},e}()
t.CommentHandler=r},function(e,t){" "
Object.defineProperty(t,"__esModule",{value:!0}),t.Syntax={AssignmentExpression:"AssignmentExpression",AssignmentPattern:"AssignmentPattern",ArrayExpression:"ArrayExpression",ArrayPattern:"ArrayPattern",ArrowFunctionExpression:"ArrowFunctionExpression",AwaitExpression:"AwaitExpression",BlockStatement:"BlockStatement",BinaryExpression:"BinaryExpression",BreakStatement:"BreakStatement",CallExpression:"CallExpression",CatchClause:"CatchClause",ClassBody:"ClassBody",ClassDeclaration:"ClassDeclaration",ClassExpression:"ClassExpression",ConditionalExpression:"ConditionalExpression",ContinueStatement:"ContinueStatement",DoWhileStatement:"DoWhileStatement",DebuggerStatement:"DebuggerStatement",EmptyStatement:"EmptyStatement",ExportAllDeclaration:"ExportAllDeclaration",ExportDefaultDeclaration:"ExportDefaultDeclaration",ExportNamedDeclaration:"ExportNamedDeclaration",ExportSpecifier:"ExportSpecifier",ExpressionStatement:"ExpressionStatement",ForStatement:"ForStatement",ForOfStatement:"ForOfStatement",ForInStatement:"ForInStatement",FunctionDeclaration:"FunctionDeclaration",FunctionExpression:"FunctionExpression",Identifier:"Identifier",IfStatement:"IfStatement",ImportDeclaration:"ImportDeclaration",ImportDefaultSpecifier:"ImportDefaultSpecifier",ImportNamespaceSpecifier:"ImportNamespaceSpecifier",ImportSpecifier:"ImportSpecifier",Literal:"Literal",LabeledStatement:"LabeledStatement",LogicalExpression:"LogicalExpression",MemberExpression:"MemberExpression",MetaProperty:"MetaProperty",MethodDefinition:"MethodDefinition",NewExpression:"NewExpression",ObjectExpression:"ObjectExpression",ObjectPattern:"ObjectPattern",Program:"Program",Property:"Property",RestElement:"RestElement",ReturnStatement:"ReturnStatement",SequenceExpression:"SequenceExpression",SpreadElement:"SpreadElement",Super:"Super",SwitchCase:"SwitchCase",SwitchStatement:"SwitchStatement",TaggedTemplateExpression:"TaggedTemplateExpression",TemplateElement:"TemplateElement",TemplateLiteral:"TemplateLiteral",ThisExpression:"ThisExpression",ThrowStatement:"ThrowStatement",TryStatement:"TryStatement",UnaryExpression:"UnaryExpression",UpdateExpression:"UpdateExpression",VariableDeclaration:"VariableDeclaration",VariableDeclarator:"VariableDeclarator",WhileStatement:"WhileStatement",WithStatement:"WithStatement",YieldExpression:"YieldExpression"}},function(e,t,n){" "
function i(e){var t
switch(e.type){case s.JSXSyntax.JSXIdentifier:var n=e
t=n.name
break
case s.JSXSyntax.JSXNamespacedName:var r=e
t=i(r.namespace)+":"+i(r.name)
break
case s.JSXSyntax.JSXMemberExpression:var o=e
t=i(o.object)+"."+i(o.property)}return t}var r=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}
return function(t,n){function i(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}()
Object.defineProperty(t,"__esModule",{value:!0})
var o=n(4),a=n(5),s=n(6),u=n(7),c=n(8),l=n(13),p=n(14)
l.TokenName[100]="JSXIdentifier",l.TokenName[101]="JSXText"
var f=function(e){function t(t,n,i){return e.call(this,t,n,i)||this}return r(t,e),t.prototype.parsePrimaryExpression=function(){return this.match("<")?this.parseJSXRoot():e.prototype.parsePrimaryExpression.call(this)},t.prototype.startJSX=function(){this.scanner.index=this.startMarker.index,this.scanner.lineNumber=this.startMarker.line,this.scanner.lineStart=this.startMarker.index-this.startMarker.column},t.prototype.finishJSX=function(){this.nextToken()},t.prototype.reenterJSX=function(){this.startJSX(),this.expectJSX("}"),this.config.tokens&&this.tokens.pop()},t.prototype.createJSXNode=function(){return this.collectComments(),{index:this.scanner.index,line:this.scanner.lineNumber,column:this.scanner.index-this.scanner.lineStart}},t.prototype.createJSXChildNode=function(){return{index:this.scanner.index,line:this.scanner.lineNumber,column:this.scanner.index-this.scanner.lineStart}},t.prototype.scanXHTMLEntity=function(e){for(var t="&",n=!0,i=!1,r=!1,a=!1;!this.scanner.eof()&&n&&!i;){var s=this.scanner.source[this.scanner.index]
if(s===e)break
if(i=";"===s,t+=s,++this.scanner.index,!i)switch(t.length){case 2:r="#"===s
break
case 3:r&&(a="x"===s,n=a||o.Character.isDecimalDigit(s.charCodeAt(0)),r=r&&!a)
break
default:n=n&&!(r&&!o.Character.isDecimalDigit(s.charCodeAt(0))),n=n&&!(a&&!o.Character.isHexDigit(s.charCodeAt(0)))}}if(n&&i&&t.length>2){var u=t.substr(1,t.length-2)
r&&u.length>1?t=String.fromCharCode(parseInt(u.substr(1),10)):a&&u.length>2?t=String.fromCharCode(parseInt("0"+u.substr(1),16)):r||a||!p.XHTMLEntities[u]||(t=p.XHTMLEntities[u])}return t},t.prototype.lexJSX=function(){var e=this.scanner.source.charCodeAt(this.scanner.index)
if(60===e||62===e||47===e||58===e||61===e||123===e||125===e){var t=this.scanner.source[this.scanner.index++]
return{type:7,value:t,lineNumber:this.scanner.lineNumber,lineStart:this.scanner.lineStart,start:this.scanner.index-1,end:this.scanner.index}}if(34===e||39===e){for(var n=this.scanner.index,i=this.scanner.source[this.scanner.index++],r="";!this.scanner.eof();){var a=this.scanner.source[this.scanner.index++]
if(a===i)break
r+="&"===a?this.scanXHTMLEntity(i):a}return{type:8,value:r,lineNumber:this.scanner.lineNumber,lineStart:this.scanner.lineStart,start:n,end:this.scanner.index}}if(46===e){var s=this.scanner.source.charCodeAt(this.scanner.index+1),u=this.scanner.source.charCodeAt(this.scanner.index+2),t=46===s&&46===u?"...":".",n=this.scanner.index
return this.scanner.index+=t.length,{type:7,value:t,lineNumber:this.scanner.lineNumber,lineStart:this.scanner.lineStart,start:n,end:this.scanner.index}}if(96===e)return{type:10,value:"",lineNumber:this.scanner.lineNumber,lineStart:this.scanner.lineStart,start:this.scanner.index,end:this.scanner.index}
if(o.Character.isIdentifierStart(e)&&92!==e){var n=this.scanner.index
for(++this.scanner.index;!this.scanner.eof();){var a=this.scanner.source.charCodeAt(this.scanner.index)
if(o.Character.isIdentifierPart(a)&&92!==a)++this.scanner.index
else{if(45!==a)break;++this.scanner.index}}var c=this.scanner.source.slice(n,this.scanner.index)
return{type:100,value:c,lineNumber:this.scanner.lineNumber,lineStart:this.scanner.lineStart,start:n,end:this.scanner.index}}return this.scanner.lex()},t.prototype.nextJSXToken=function(){this.collectComments(),this.startMarker.index=this.scanner.index,this.startMarker.line=this.scanner.lineNumber,this.startMarker.column=this.scanner.index-this.scanner.lineStart
var e=this.lexJSX()
return this.lastMarker.index=this.scanner.index,this.lastMarker.line=this.scanner.lineNumber,this.lastMarker.column=this.scanner.index-this.scanner.lineStart,this.config.tokens&&this.tokens.push(this.convertToken(e)),e},t.prototype.nextJSXText=function(){this.startMarker.index=this.scanner.index,this.startMarker.line=this.scanner.lineNumber,this.startMarker.column=this.scanner.index-this.scanner.lineStart
for(var e=this.scanner.index,t="";!this.scanner.eof();){var n=this.scanner.source[this.scanner.index]
if("{"===n||"<"===n)break;++this.scanner.index,t+=n,o.Character.isLineTerminator(n.charCodeAt(0))&&(++this.scanner.lineNumber,"\r"===n&&"\n"===this.scanner.source[this.scanner.index]&&++this.scanner.index,this.scanner.lineStart=this.scanner.index)}this.lastMarker.index=this.scanner.index,this.lastMarker.line=this.scanner.lineNumber,this.lastMarker.column=this.scanner.index-this.scanner.lineStart
var i={type:101,value:t,lineNumber:this.scanner.lineNumber,lineStart:this.scanner.lineStart,start:e,end:this.scanner.index}
return t.length>0&&this.config.tokens&&this.tokens.push(this.convertToken(i)),i},t.prototype.peekJSXToken=function(){var e=this.scanner.saveState()
this.scanner.scanComments()
var t=this.lexJSX()
return this.scanner.restoreState(e),t},t.prototype.expectJSX=function(e){var t=this.nextJSXToken();(7!==t.type||t.value!==e)&&this.throwUnexpectedToken(t)},t.prototype.matchJSX=function(e){var t=this.peekJSXToken()
return 7===t.type&&t.value===e},t.prototype.parseJSXIdentifier=function(){var e=this.createJSXNode(),t=this.nextJSXToken()
return 100!==t.type&&this.throwUnexpectedToken(t),this.finalize(e,new a.JSXIdentifier(t.value))},t.prototype.parseJSXElementName=function(){var e=this.createJSXNode(),t=this.parseJSXIdentifier()
if(this.matchJSX(":")){var n=t
this.expectJSX(":")
var i=this.parseJSXIdentifier()
t=this.finalize(e,new a.JSXNamespacedName(n,i))}else if(this.matchJSX("."))for(;this.matchJSX(".");){var r=t
this.expectJSX(".")
var o=this.parseJSXIdentifier()
t=this.finalize(e,new a.JSXMemberExpression(r,o))}return t},t.prototype.parseJSXAttributeName=function(){var e,t=this.createJSXNode(),n=this.parseJSXIdentifier()
if(this.matchJSX(":")){var i=n
this.expectJSX(":")
var r=this.parseJSXIdentifier()
e=this.finalize(t,new a.JSXNamespacedName(i,r))}else e=n
return e},t.prototype.parseJSXStringLiteralAttribute=function(){var e=this.createJSXNode(),t=this.nextJSXToken()
8!==t.type&&this.throwUnexpectedToken(t)
var n=this.getTokenRaw(t)
return this.finalize(e,new u.Literal(t.value,n))},t.prototype.parseJSXExpressionAttribute=function(){var e=this.createJSXNode()
this.expectJSX("{"),this.finishJSX(),this.match("}")&&this.tolerateError("JSX attributes must only be assigned a non-empty expression")
var t=this.parseAssignmentExpression()
return this.reenterJSX(),this.finalize(e,new a.JSXExpressionContainer(t))},t.prototype.parseJSXAttributeValue=function(){return this.matchJSX("{")?this.parseJSXExpressionAttribute():this.matchJSX("<")?this.parseJSXElement():this.parseJSXStringLiteralAttribute()},t.prototype.parseJSXNameValueAttribute=function(){var e=this.createJSXNode(),t=this.parseJSXAttributeName(),n=null
return this.matchJSX("=")&&(this.expectJSX("="),n=this.parseJSXAttributeValue()),this.finalize(e,new a.JSXAttribute(t,n))},t.prototype.parseJSXSpreadAttribute=function(){var e=this.createJSXNode()
this.expectJSX("{"),this.expectJSX("..."),this.finishJSX()
var t=this.parseAssignmentExpression()
return this.reenterJSX(),this.finalize(e,new a.JSXSpreadAttribute(t))},t.prototype.parseJSXAttributes=function(){for(var e=[];!this.matchJSX("/")&&!this.matchJSX(">");){var t=this.matchJSX("{")?this.parseJSXSpreadAttribute():this.parseJSXNameValueAttribute()
e.push(t)}return e},t.prototype.parseJSXOpeningElement=function(){var e=this.createJSXNode()
this.expectJSX("<")
var t=this.parseJSXElementName(),n=this.parseJSXAttributes(),i=this.matchJSX("/")
return i&&this.expectJSX("/"),this.expectJSX(">"),this.finalize(e,new a.JSXOpeningElement(t,i,n))},t.prototype.parseJSXBoundaryElement=function(){var e=this.createJSXNode()
if(this.expectJSX("<"),this.matchJSX("/")){this.expectJSX("/")
var t=this.parseJSXElementName()
return this.expectJSX(">"),this.finalize(e,new a.JSXClosingElement(t))}var n=this.parseJSXElementName(),i=this.parseJSXAttributes(),r=this.matchJSX("/")
return r&&this.expectJSX("/"),this.expectJSX(">"),this.finalize(e,new a.JSXOpeningElement(n,r,i))},t.prototype.parseJSXEmptyExpression=function(){var e=this.createJSXChildNode()
return this.collectComments(),this.lastMarker.index=this.scanner.index,this.lastMarker.line=this.scanner.lineNumber,this.lastMarker.column=this.scanner.index-this.scanner.lineStart,this.finalize(e,new a.JSXEmptyExpression)},t.prototype.parseJSXExpressionContainer=function(){var e=this.createJSXNode()
this.expectJSX("{")
var t
return this.matchJSX("}")?(t=this.parseJSXEmptyExpression(),this.expectJSX("}")):(this.finishJSX(),t=this.parseAssignmentExpression(),this.reenterJSX()),this.finalize(e,new a.JSXExpressionContainer(t))},t.prototype.parseJSXChildren=function(){for(var e=[];!this.scanner.eof();){var t=this.createJSXChildNode(),n=this.nextJSXText()
if(n.start<n.end){var i=this.getTokenRaw(n),r=this.finalize(t,new a.JSXText(n.value,i))
e.push(r)}if("{"!==this.scanner.source[this.scanner.index])break
var o=this.parseJSXExpressionContainer()
e.push(o)}return e},t.prototype.parseComplexJSXElement=function(e){for(var t=[];!this.scanner.eof();){e.children=e.children.concat(this.parseJSXChildren())
var n=this.createJSXChildNode(),r=this.parseJSXBoundaryElement()
if(r.type===s.JSXSyntax.JSXOpeningElement){var o=r
if(o.selfClosing){var u=this.finalize(n,new a.JSXElement(o,[],null))
e.children.push(u)}else t.push(e),e={node:n,opening:o,closing:null,children:[]}}if(r.type===s.JSXSyntax.JSXClosingElement){e.closing=r
var c=i(e.opening.name),l=i(e.closing.name)
if(c!==l&&this.tolerateError("Expected corresponding JSX closing tag for %0",c),!(t.length>0))break
var u=this.finalize(e.node,new a.JSXElement(e.opening,e.children,e.closing))
e=t[t.length-1],e.children.push(u),t.pop()}}return e},t.prototype.parseJSXElement=function(){var e=this.createJSXNode(),t=this.parseJSXOpeningElement(),n=[],i=null
if(!t.selfClosing){var r=this.parseComplexJSXElement({node:e,opening:t,closing:i,children:n})
n=r.children,i=r.closing}return this.finalize(e,new a.JSXElement(t,n,i))},t.prototype.parseJSXRoot=function(){this.config.tokens&&this.tokens.pop(),this.startJSX()
var e=this.parseJSXElement()
return this.finishJSX(),e},t.prototype.isStartOfExpression=function(){return e.prototype.isStartOfExpression.call(this)||this.match("<")},t}(c.Parser)
t.JSXParser=f},function(e,t){" "
Object.defineProperty(t,"__esModule",{value:!0})
var n={NonAsciiIdentifierStart:/[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,NonAsciiIdentifierPart:/[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/}
t.Character={fromCodePoint:function(e){return 65536>e?String.fromCharCode(e):String.fromCharCode(55296+(e-65536>>10))+String.fromCharCode(56320+(e-65536&1023))},isWhiteSpace:function(e){return 32===e||9===e||11===e||12===e||160===e||e>=5760&&[5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279].indexOf(e)>=0},isLineTerminator:function(e){return 10===e||13===e||8232===e||8233===e},isIdentifierStart:function(e){return 36===e||95===e||e>=65&&90>=e||e>=97&&122>=e||92===e||e>=128&&n.NonAsciiIdentifierStart.test(t.Character.fromCodePoint(e))},isIdentifierPart:function(e){return 36===e||95===e||e>=65&&90>=e||e>=97&&122>=e||e>=48&&57>=e||92===e||e>=128&&n.NonAsciiIdentifierPart.test(t.Character.fromCodePoint(e))},isDecimalDigit:function(e){return e>=48&&57>=e},isHexDigit:function(e){return e>=48&&57>=e||e>=65&&70>=e||e>=97&&102>=e},isOctalDigit:function(e){return e>=48&&55>=e}}},function(e,t,n){" "
Object.defineProperty(t,"__esModule",{value:!0})
var i=n(6),r=function(){function e(e){this.type=i.JSXSyntax.JSXClosingElement,this.name=e}return e}()
t.JSXClosingElement=r
var o=function(){function e(e,t,n){this.type=i.JSXSyntax.JSXElement,this.openingElement=e,this.children=t,this.closingElement=n}return e}()
t.JSXElement=o
var a=function(){function e(){this.type=i.JSXSyntax.JSXEmptyExpression}return e}()
t.JSXEmptyExpression=a
var s=function(){function e(e){this.type=i.JSXSyntax.JSXExpressionContainer,this.expression=e}return e}()
t.JSXExpressionContainer=s
var u=function(){function e(e){this.type=i.JSXSyntax.JSXIdentifier,this.name=e}return e}()
t.JSXIdentifier=u
var c=function(){function e(e,t){this.type=i.JSXSyntax.JSXMemberExpression,this.object=e,this.property=t}return e}()
t.JSXMemberExpression=c
var l=function(){function e(e,t){this.type=i.JSXSyntax.JSXAttribute,this.name=e,this.value=t}return e}()
t.JSXAttribute=l
var p=function(){function e(e,t){this.type=i.JSXSyntax.JSXNamespacedName,this.namespace=e,this.name=t}return e}()
t.JSXNamespacedName=p
var f=function(){function e(e,t,n){this.type=i.JSXSyntax.JSXOpeningElement,this.name=e,this.selfClosing=t,this.attributes=n}return e}()
t.JSXOpeningElement=f
var h=function(){function e(e){this.type=i.JSXSyntax.JSXSpreadAttribute,this.argument=e}return e}()
t.JSXSpreadAttribute=h
var d=function(){function e(e,t){this.type=i.JSXSyntax.JSXText,this.value=e,this.raw=t}return e}()
t.JSXText=d},function(e,t){" "
Object.defineProperty(t,"__esModule",{value:!0}),t.JSXSyntax={JSXAttribute:"JSXAttribute",JSXClosingElement:"JSXClosingElement",JSXElement:"JSXElement",JSXEmptyExpression:"JSXEmptyExpression",JSXExpressionContainer:"JSXExpressionContainer",JSXIdentifier:"JSXIdentifier",JSXMemberExpression:"JSXMemberExpression",JSXNamespacedName:"JSXNamespacedName",JSXOpeningElement:"JSXOpeningElement",JSXSpreadAttribute:"JSXSpreadAttribute",JSXText:"JSXText"}},function(e,t,n){" "
Object.defineProperty(t,"__esModule",{value:!0})
var i=n(2),r=function(){function e(e){this.type=i.Syntax.ArrayExpression,this.elements=e}return e}()
t.ArrayExpression=r
var o=function(){function e(e){this.type=i.Syntax.ArrayPattern,this.elements=e}return e}()
t.ArrayPattern=o
var a=function(){function e(e,t,n){this.type=i.Syntax.ArrowFunctionExpression,this.id=null,this.params=e,this.body=t,this.generator=!1,this.expression=n,this.async=!1}return e}()
t.ArrowFunctionExpression=a
var s=function(){function e(e,t,n){this.type=i.Syntax.AssignmentExpression,this.operator=e,this.left=t,this.right=n}return e}()
t.AssignmentExpression=s
var u=function(){function e(e,t){this.type=i.Syntax.AssignmentPattern,this.left=e,this.right=t}return e}()
t.AssignmentPattern=u
var c=function(){function e(e,t,n){this.type=i.Syntax.ArrowFunctionExpression,this.id=null,this.params=e,this.body=t,this.generator=!1,this.expression=n,this.async=!0}return e}()
t.AsyncArrowFunctionExpression=c
var l=function(){function e(e,t,n){this.type=i.Syntax.FunctionDeclaration,this.id=e,this.params=t,this.body=n,this.generator=!1,this.expression=!1,this.async=!0}return e}()
t.AsyncFunctionDeclaration=l
var p=function(){function e(e,t,n){this.type=i.Syntax.FunctionExpression,this.id=e,this.params=t,this.body=n,this.generator=!1,this.expression=!1,this.async=!0}return e}()
t.AsyncFunctionExpression=p
var f=function(){function e(e){this.type=i.Syntax.AwaitExpression,this.argument=e}return e}()
t.AwaitExpression=f
var h=function(){function e(e,t,n){var r="||"===e||"&&"===e
this.type=r?i.Syntax.LogicalExpression:i.Syntax.BinaryExpression,this.operator=e,this.left=t,this.right=n}return e}()
t.BinaryExpression=h
var d=function(){function e(e){this.type=i.Syntax.BlockStatement,this.body=e}return e}()
t.BlockStatement=d
var m=function(){function e(e){this.type=i.Syntax.BreakStatement,this.label=e}return e}()
t.BreakStatement=m
var g=function(){function e(e,t){this.type=i.Syntax.CallExpression,this.callee=e,this.arguments=t}return e}()
t.CallExpression=g
var v=function(){function e(e,t){this.type=i.Syntax.CatchClause,this.param=e,this.body=t}return e}()
t.CatchClause=v
var x=function(){function e(e){this.type=i.Syntax.ClassBody,this.body=e}return e}()
t.ClassBody=x
var y=function(){function e(e,t,n){this.type=i.Syntax.ClassDeclaration,this.id=e,this.superClass=t,this.body=n}return e}()
t.ClassDeclaration=y
var D=function(){function e(e,t,n){this.type=i.Syntax.ClassExpression,this.id=e,this.superClass=t,this.body=n}return e}()
t.ClassExpression=D
var b=function(){function e(e,t){this.type=i.Syntax.MemberExpression,this.computed=!0,this.object=e,this.property=t}return e}()
t.ComputedMemberExpression=b
var E=function(){function e(e,t,n){this.type=i.Syntax.ConditionalExpression,this.test=e,this.consequent=t,this.alternate=n}return e}()
t.ConditionalExpression=E
var C=function(){function e(e){this.type=i.Syntax.ContinueStatement,this.label=e}return e}()
t.ContinueStatement=C
var A=function(){function e(){this.type=i.Syntax.DebuggerStatement}return e}()
t.DebuggerStatement=A
var w=function(){function e(e,t){this.type=i.Syntax.ExpressionStatement,this.expression=e,this.directive=t}return e}()
t.Directive=w
var _=function(){function e(e,t){this.type=i.Syntax.DoWhileStatement,this.body=e,this.test=t}return e}()
t.DoWhileStatement=_
var F=function(){function e(){this.type=i.Syntax.EmptyStatement}return e}()
t.EmptyStatement=F
var S=function(){function e(e){this.type=i.Syntax.ExportAllDeclaration,this.source=e}return e}()
t.ExportAllDeclaration=S
var k=function(){function e(e){this.type=i.Syntax.ExportDefaultDeclaration,this.declaration=e}return e}()
t.ExportDefaultDeclaration=k
var B=function(){function e(e,t,n){this.type=i.Syntax.ExportNamedDeclaration,this.declaration=e,this.specifiers=t,this.source=n}return e}()
t.ExportNamedDeclaration=B
var T=function(){function e(e,t){this.type=i.Syntax.ExportSpecifier,this.exported=t,this.local=e}return e}()
t.ExportSpecifier=T
var M=function(){function e(e){this.type=i.Syntax.ExpressionStatement,this.expression=e}return e}()
t.ExpressionStatement=M
var P=function(){function e(e,t,n){this.type=i.Syntax.ForInStatement,this.left=e,this.right=t,this.body=n,this.each=!1}return e}()
t.ForInStatement=P
var N=function(){function e(e,t,n){this.type=i.Syntax.ForOfStatement,this.left=e,this.right=t,this.body=n}return e}()
t.ForOfStatement=N
var O=function(){function e(e,t,n,r){this.type=i.Syntax.ForStatement,this.init=e,this.test=t,this.update=n,this.body=r}return e}()
t.ForStatement=O
var I=function(){function e(e,t,n,r){this.type=i.Syntax.FunctionDeclaration,this.id=e,this.params=t,this.body=n,this.generator=r,this.expression=!1,this.async=!1}return e}()
t.FunctionDeclaration=I
var R=function(){function e(e,t,n,r){this.type=i.Syntax.FunctionExpression,this.id=e,this.params=t,this.body=n,this.generator=r,this.expression=!1,this.async=!1}return e}()
t.FunctionExpression=R
var j=function(){function e(e){this.type=i.Syntax.Identifier,this.name=e}return e}()
t.Identifier=j
var q=function(){function e(e,t,n){this.type=i.Syntax.IfStatement,this.test=e,this.consequent=t,this.alternate=n}return e}()
t.IfStatement=q
var L=function(){function e(e,t){this.type=i.Syntax.ImportDeclaration,this.specifiers=e,this.source=t}return e}()
t.ImportDeclaration=L
var z=function(){function e(e){this.type=i.Syntax.ImportDefaultSpecifier,this.local=e}return e}()
t.ImportDefaultSpecifier=z
var U=function(){function e(e){this.type=i.Syntax.ImportNamespaceSpecifier,this.local=e}return e}()
t.ImportNamespaceSpecifier=U
var J=function(){function e(e,t){this.type=i.Syntax.ImportSpecifier,this.local=e,this.imported=t}return e}()
t.ImportSpecifier=J
var X=function(){function e(e,t){this.type=i.Syntax.LabeledStatement,this.label=e,this.body=t}return e}()
t.LabeledStatement=X
var $=function(){function e(e,t){this.type=i.Syntax.Literal,this.value=e,this.raw=t}return e}()
t.Literal=$
var H=function(){function e(e,t){this.type=i.Syntax.MetaProperty,this.meta=e,this.property=t}return e}()
t.MetaProperty=H
var W=function(){function e(e,t,n,r,o){this.type=i.Syntax.MethodDefinition,this.key=e,this.computed=t,this.value=n,this.kind=r,this["static"]=o}return e}()
t.MethodDefinition=W
var G=function(){function e(e){this.type=i.Syntax.Program,this.body=e,this.sourceType="module"}return e}()
t.Module=G
var K=function(){function e(e,t){this.type=i.Syntax.NewExpression,this.callee=e,this.arguments=t}return e}()
t.NewExpression=K
var V=function(){function e(e){this.type=i.Syntax.ObjectExpression,this.properties=e}return e}()
t.ObjectExpression=V
var Y=function(){function e(e){this.type=i.Syntax.ObjectPattern,this.properties=e}return e}()
t.ObjectPattern=Y
var Q=function(){function e(e,t,n,r,o,a){this.type=i.Syntax.Property,this.key=t,this.computed=n,this.value=r,this.kind=e,this.method=o,this.shorthand=a}return e}()
t.Property=Q
var Z=function(){function e(e,t,n,r){this.type=i.Syntax.Literal,this.value=e,this.raw=t,this.regex={pattern:n,flags:r}}return e}()
t.RegexLiteral=Z
var ee=function(){function e(e){this.type=i.Syntax.RestElement,this.argument=e}return e}()
t.RestElement=ee
var te=function(){function e(e){this.type=i.Syntax.ReturnStatement,this.argument=e}return e}()
t.ReturnStatement=te
var ne=function(){function e(e){this.type=i.Syntax.Program,this.body=e,this.sourceType="script"}return e}()
t.Script=ne
var ie=function(){function e(e){this.type=i.Syntax.SequenceExpression,this.expressions=e}return e}()
t.SequenceExpression=ie
var re=function(){function e(e){this.type=i.Syntax.SpreadElement,this.argument=e}return e}()
t.SpreadElement=re
var oe=function(){function e(e,t){this.type=i.Syntax.MemberExpression,this.computed=!1,this.object=e,this.property=t}return e}()
t.StaticMemberExpression=oe
var ae=function(){function e(){this.type=i.Syntax.Super}return e}()
t.Super=ae
var se=function(){function e(e,t){this.type=i.Syntax.SwitchCase,this.test=e,this.consequent=t}return e}()
t.SwitchCase=se
var ue=function(){function e(e,t){this.type=i.Syntax.SwitchStatement,this.discriminant=e,this.cases=t}return e}()
t.SwitchStatement=ue
var ce=function(){function e(e,t){this.type=i.Syntax.TaggedTemplateExpression,this.tag=e,this.quasi=t}return e}()
t.TaggedTemplateExpression=ce
var le=function(){function e(e,t){this.type=i.Syntax.TemplateElement,this.value=e,this.tail=t}return e}()
t.TemplateElement=le
var pe=function(){function e(e,t){this.type=i.Syntax.TemplateLiteral,this.quasis=e,this.expressions=t}return e}()
t.TemplateLiteral=pe
var fe=function(){function e(){this.type=i.Syntax.ThisExpression}return e}()
t.ThisExpression=fe
var he=function(){function e(e){this.type=i.Syntax.ThrowStatement,this.argument=e}return e}()
t.ThrowStatement=he
var de=function(){function e(e,t,n){this.type=i.Syntax.TryStatement,this.block=e,this.handler=t,this.finalizer=n}return e}()
t.TryStatement=de
var me=function(){function e(e,t){this.type=i.Syntax.UnaryExpression,this.operator=e,this.argument=t,this.prefix=!0}return e}()
t.UnaryExpression=me
var ge=function(){function e(e,t,n){this.type=i.Syntax.UpdateExpression,this.operator=e,this.argument=t,this.prefix=n}return e}()
t.UpdateExpression=ge
var ve=function(){function e(e,t){this.type=i.Syntax.VariableDeclaration,this.declarations=e,this.kind=t}return e}()
t.VariableDeclaration=ve
var xe=function(){function e(e,t){this.type=i.Syntax.VariableDeclarator,this.id=e,this.init=t}return e}()
t.VariableDeclarator=xe
var ye=function(){function e(e,t){this.type=i.Syntax.WhileStatement,this.test=e,this.body=t}return e}()
t.WhileStatement=ye
var De=function(){function e(e,t){this.type=i.Syntax.WithStatement,this.object=e,this.body=t}return e}()
t.WithStatement=De
var be=function(){function e(e,t){this.type=i.Syntax.YieldExpression,this.argument=e,this.delegate=t}return e}()
t.YieldExpression=be},function(e,t,n){" "
Object.defineProperty(t,"__esModule",{value:!0})
var i=n(9),r=n(10),o=n(11),a=n(7),s=n(12),u=n(2),c=n(13),l="ArrowParameterPlaceHolder",p=function(){function e(e,t,n){void 0===t&&(t={}),this.config={range:"boolean"==typeof t.range&&t.range,loc:"boolean"==typeof t.loc&&t.loc,source:null,tokens:"boolean"==typeof t.tokens&&t.tokens,comment:"boolean"==typeof t.comment&&t.comment,tolerant:"boolean"==typeof t.tolerant&&t.tolerant},this.config.loc&&t.source&&null!==t.source&&(this.config.source=t.source+""),this.delegate=n,this.errorHandler=new r.ErrorHandler,this.errorHandler.tolerant=this.config.tolerant,this.scanner=new s.Scanner(e,this.errorHandler),this.scanner.trackComment=this.config.comment,this.operatorPrecedence={")":0,";":0,",":0,"=":0,"]":0,"||":1,"&&":2,"|":3,"^":4,"&":5,"==":6,"!=":6,"===":6,"!==":6,"<":7,">":7,"<=":7,">=":7,"<<":8,">>":8,">>>":8,"+":9,"-":9,"*":11,"/":11,"%":11},this.lookahead={type:2,value:"",lineNumber:this.scanner.lineNumber,lineStart:0,start:0,end:0},this.hasLineTerminator=!1,this.context={isModule:!1,await:!1,allowIn:!0,allowStrictDirective:!0,allowYield:!0,firstCoverInitializedNameError:null,isAssignmentTarget:!1,isBindingElement:!1,inFunctionBody:!1,inIteration:!1,inSwitch:!1,labelSet:{},strict:!1},this.tokens=[],this.startMarker={index:0,line:this.scanner.lineNumber,column:0},this.lastMarker={index:0,line:this.scanner.lineNumber,column:0},this.nextToken(),this.lastMarker={index:this.scanner.index,line:this.scanner.lineNumber,column:this.scanner.index-this.scanner.lineStart}}return e.prototype.throwError=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n]
var r=Array.prototype.slice.call(arguments,1),o=e.replace(/%(\d)/g,function(e,t){return i.assert(t<r.length,"Message reference must be in range"),r[t]}),a=this.lastMarker.index,s=this.lastMarker.line,u=this.lastMarker.column+1
throw this.errorHandler.createError(a,s,u,o)},e.prototype.tolerateError=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n]
var r=Array.prototype.slice.call(arguments,1),o=e.replace(/%(\d)/g,function(e,t){return i.assert(t<r.length,"Message reference must be in range"),r[t]}),a=this.lastMarker.index,s=this.scanner.lineNumber,u=this.lastMarker.column+1
this.errorHandler.tolerateError(a,s,u,o)},e.prototype.unexpectedTokenError=function(e,t){var n,i=t||o.Messages.UnexpectedToken
if(e?(t||(i=2===e.type?o.Messages.UnexpectedEOS:3===e.type?o.Messages.UnexpectedIdentifier:6===e.type?o.Messages.UnexpectedNumber:8===e.type?o.Messages.UnexpectedString:10===e.type?o.Messages.UnexpectedTemplate:o.Messages.UnexpectedToken,4===e.type&&(this.scanner.isFutureReservedWord(e.value)?i=o.Messages.UnexpectedReserved:this.context.strict&&this.scanner.isStrictModeReservedWord(e.value)&&(i=o.Messages.StrictReservedWord))),n=e.value):n="ILLEGAL",i=i.replace("%0",n),e&&"number"==typeof e.lineNumber){var r=e.start,a=e.lineNumber,s=this.lastMarker.index-this.lastMarker.column,u=e.start-s+1
return this.errorHandler.createError(r,a,u,i)}var r=this.lastMarker.index,a=this.lastMarker.line,u=this.lastMarker.column+1
return this.errorHandler.createError(r,a,u,i)},e.prototype.throwUnexpectedToken=function(e,t){throw this.unexpectedTokenError(e,t)},e.prototype.tolerateUnexpectedToken=function(e,t){this.errorHandler.tolerate(this.unexpectedTokenError(e,t))},e.prototype.collectComments=function(){if(this.config.comment){var e=this.scanner.scanComments()
if(e.length>0&&this.delegate)for(var t=0;t<e.length;++t){var n=e[t],i=void 0
i={type:n.multiLine?"BlockComment":"LineComment",value:this.scanner.source.slice(n.slice[0],n.slice[1])},this.config.range&&(i.range=n.range),this.config.loc&&(i.loc=n.loc)
var r={start:{line:n.loc.start.line,column:n.loc.start.column,offset:n.range[0]},end:{line:n.loc.end.line,column:n.loc.end.column,offset:n.range[1]}}
this.delegate(i,r)}}else this.scanner.scanComments()},e.prototype.getTokenRaw=function(e){return this.scanner.source.slice(e.start,e.end)},e.prototype.convertToken=function(e){var t={type:c.TokenName[e.type],value:this.getTokenRaw(e)}
if(this.config.range&&(t.range=[e.start,e.end]),this.config.loc&&(t.loc={start:{line:this.startMarker.line,column:this.startMarker.column},end:{line:this.scanner.lineNumber,column:this.scanner.index-this.scanner.lineStart}}),9===e.type){var n=e.pattern,i=e.flags
t.regex={pattern:n,flags:i}}return t},e.prototype.nextToken=function(){var e=this.lookahead
this.lastMarker.index=this.scanner.index,this.lastMarker.line=this.scanner.lineNumber,this.lastMarker.column=this.scanner.index-this.scanner.lineStart,this.collectComments(),this.scanner.index!==this.startMarker.index&&(this.startMarker.index=this.scanner.index,this.startMarker.line=this.scanner.lineNumber,this.startMarker.column=this.scanner.index-this.scanner.lineStart)
var t=this.scanner.lex()
return this.hasLineTerminator=e.lineNumber!==t.lineNumber,t&&this.context.strict&&3===t.type&&this.scanner.isStrictModeReservedWord(t.value)&&(t.type=4),this.lookahead=t,this.config.tokens&&2!==t.type&&this.tokens.push(this.convertToken(t)),e},e.prototype.nextRegexToken=function(){this.collectComments()
var e=this.scanner.scanRegExp()
return this.config.tokens&&(this.tokens.pop(),this.tokens.push(this.convertToken(e))),this.lookahead=e,this.nextToken(),e},e.prototype.createNode=function(){return{index:this.startMarker.index,line:this.startMarker.line,column:this.startMarker.column}},e.prototype.startNode=function(e){return{index:e.start,line:e.lineNumber,column:e.start-e.lineStart}},e.prototype.finalize=function(e,t){if(this.config.range&&(t.range=[e.index,this.lastMarker.index]),this.config.loc&&(t.loc={start:{line:e.line,column:e.column},end:{line:this.lastMarker.line,column:this.lastMarker.column}},this.config.source&&(t.loc.source=this.config.source)),this.delegate){var n={start:{line:e.line,column:e.column,offset:e.index},end:{line:this.lastMarker.line,column:this.lastMarker.column,offset:this.lastMarker.index}}
this.delegate(t,n)}return t},e.prototype.expect=function(e){var t=this.nextToken();(7!==t.type||t.value!==e)&&this.throwUnexpectedToken(t)},e.prototype.expectCommaSeparator=function(){if(this.config.tolerant){var e=this.lookahead
7===e.type&&","===e.value?this.nextToken():7===e.type&&";"===e.value?(this.nextToken(),this.tolerateUnexpectedToken(e)):this.tolerateUnexpectedToken(e,o.Messages.UnexpectedToken)}else this.expect(",")},e.prototype.expectKeyword=function(e){var t=this.nextToken();(4!==t.type||t.value!==e)&&this.throwUnexpectedToken(t)},e.prototype.match=function(e){return 7===this.lookahead.type&&this.lookahead.value===e},e.prototype.matchKeyword=function(e){return 4===this.lookahead.type&&this.lookahead.value===e},e.prototype.matchContextualKeyword=function(e){return 3===this.lookahead.type&&this.lookahead.value===e},e.prototype.matchAssign=function(){if(7!==this.lookahead.type)return!1
var e=this.lookahead.value
return"="===e||"*="===e||"**="===e||"/="===e||"%="===e||"+="===e||"-="===e||"<<="===e||">>="===e||">>>="===e||"&="===e||"^="===e||"|="===e},e.prototype.isolateCoverGrammar=function(e){var t=this.context.isBindingElement,n=this.context.isAssignmentTarget,i=this.context.firstCoverInitializedNameError
this.context.isBindingElement=!0,this.context.isAssignmentTarget=!0,this.context.firstCoverInitializedNameError=null
var r=e.call(this)
return null!==this.context.firstCoverInitializedNameError&&this.throwUnexpectedToken(this.context.firstCoverInitializedNameError),this.context.isBindingElement=t,this.context.isAssignmentTarget=n,this.context.firstCoverInitializedNameError=i,r},e.prototype.inheritCoverGrammar=function(e){var t=this.context.isBindingElement,n=this.context.isAssignmentTarget,i=this.context.firstCoverInitializedNameError
this.context.isBindingElement=!0,this.context.isAssignmentTarget=!0,this.context.firstCoverInitializedNameError=null
var r=e.call(this)
return this.context.isBindingElement=this.context.isBindingElement&&t,this.context.isAssignmentTarget=this.context.isAssignmentTarget&&n,this.context.firstCoverInitializedNameError=i||this.context.firstCoverInitializedNameError,r},e.prototype.consumeSemicolon=function(){this.match(";")?this.nextToken():this.hasLineTerminator||(2===this.lookahead.type||this.match("}")||this.throwUnexpectedToken(this.lookahead),this.lastMarker.index=this.startMarker.index,this.lastMarker.line=this.startMarker.line,this.lastMarker.column=this.startMarker.column)},e.prototype.parsePrimaryExpression=function(){var e,t,n,i=this.createNode()
switch(this.lookahead.type){case 3:(this.context.isModule||this.context.await)&&"await"===this.lookahead.value&&this.tolerateUnexpectedToken(this.lookahead),e=this.matchAsyncFunction()?this.parseFunctionExpression():this.finalize(i,new a.Identifier(this.nextToken().value))
break
case 6:case 8:this.context.strict&&this.lookahead.octal&&this.tolerateUnexpectedToken(this.lookahead,o.Messages.StrictOctalLiteral),this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1,t=this.nextToken(),n=this.getTokenRaw(t),e=this.finalize(i,new a.Literal(t.value,n))
break
case 1:this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1,t=this.nextToken(),n=this.getTokenRaw(t),e=this.finalize(i,new a.Literal("true"===t.value,n))
break
case 5:this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1,t=this.nextToken(),n=this.getTokenRaw(t),e=this.finalize(i,new a.Literal(null,n))
break
case 10:e=this.parseTemplateLiteral()
break
case 7:switch(this.lookahead.value){case"(":this.context.isBindingElement=!1,e=this.inheritCoverGrammar(this.parseGroupExpression)
break
case"[":e=this.inheritCoverGrammar(this.parseArrayInitializer)
break
case"{":e=this.inheritCoverGrammar(this.parseObjectInitializer)
break
case"/":case"/=":this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1,this.scanner.index=this.startMarker.index,t=this.nextRegexToken(),n=this.getTokenRaw(t),e=this.finalize(i,new a.RegexLiteral(t.regex,n,t.pattern,t.flags))
break
default:e=this.throwUnexpectedToken(this.nextToken())}break
case 4:!this.context.strict&&this.context.allowYield&&this.matchKeyword("yield")?e=this.parseIdentifierName():!this.context.strict&&this.matchKeyword("let")?e=this.finalize(i,new a.Identifier(this.nextToken().value)):(this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1,this.matchKeyword("function")?e=this.parseFunctionExpression():this.matchKeyword("this")?(this.nextToken(),e=this.finalize(i,new a.ThisExpression)):e=this.matchKeyword("class")?this.parseClassExpression():this.throwUnexpectedToken(this.nextToken()))
break
default:e=this.throwUnexpectedToken(this.nextToken())}return e},e.prototype.parseSpreadElement=function(){var e=this.createNode()
this.expect("...")
var t=this.inheritCoverGrammar(this.parseAssignmentExpression)
return this.finalize(e,new a.SpreadElement(t))},e.prototype.parseArrayInitializer=function(){var e=this.createNode(),t=[]
for(this.expect("[");!this.match("]");)if(this.match(","))this.nextToken(),t.push(null)
else if(this.match("...")){var n=this.parseSpreadElement()
this.match("]")||(this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1,this.expect(",")),t.push(n)}else t.push(this.inheritCoverGrammar(this.parseAssignmentExpression)),this.match("]")||this.expect(",")
return this.expect("]"),this.finalize(e,new a.ArrayExpression(t))},e.prototype.parsePropertyMethod=function(e){this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1
var t=this.context.strict,n=this.context.allowStrictDirective
this.context.allowStrictDirective=e.simple
var i=this.isolateCoverGrammar(this.parseFunctionSourceElements)
return this.context.strict&&e.firstRestricted&&this.tolerateUnexpectedToken(e.firstRestricted,e.message),this.context.strict&&e.stricted&&this.tolerateUnexpectedToken(e.stricted,e.message),this.context.strict=t,this.context.allowStrictDirective=n,i},e.prototype.parsePropertyMethodFunction=function(){var e=!1,t=this.createNode(),n=this.context.allowYield
this.context.allowYield=!1
var i=this.parseFormalParameters(),r=this.parsePropertyMethod(i)
return this.context.allowYield=n,this.finalize(t,new a.FunctionExpression(null,i.params,r,e))},e.prototype.parsePropertyMethodAsyncFunction=function(){var e=this.createNode(),t=this.context.allowYield,n=this.context.await
this.context.allowYield=!1,this.context.await=!0
var i=this.parseFormalParameters(),r=this.parsePropertyMethod(i)
return this.context.allowYield=t,this.context.await=n,this.finalize(e,new a.AsyncFunctionExpression(null,i.params,r))},e.prototype.parseObjectPropertyKey=function(){var e,t=this.createNode(),n=this.nextToken()
switch(n.type){case 8:case 6:this.context.strict&&n.octal&&this.tolerateUnexpectedToken(n,o.Messages.StrictOctalLiteral)
var i=this.getTokenRaw(n)
e=this.finalize(t,new a.Literal(n.value,i))
break
case 3:case 1:case 5:case 4:e=this.finalize(t,new a.Identifier(n.value))
break
case 7:"["===n.value?(e=this.isolateCoverGrammar(this.parseAssignmentExpression),this.expect("]")):e=this.throwUnexpectedToken(n)
break
default:e=this.throwUnexpectedToken(n)}return e},e.prototype.isPropertyKey=function(e,t){return e.type===u.Syntax.Identifier&&e.name===t||e.type===u.Syntax.Literal&&e.value===t},e.prototype.parseObjectProperty=function(e){var t,n=this.createNode(),i=this.lookahead,r=null,s=null,u=!1,c=!1,l=!1,p=!1
if(3===i.type){var f=i.value
this.nextToken(),u=this.match("["),p=!(this.hasLineTerminator||"async"!==f||this.match(":")||this.match("(")||this.match("*")),r=p?this.parseObjectPropertyKey():this.finalize(n,new a.Identifier(f))}else this.match("*")?this.nextToken():(u=this.match("["),r=this.parseObjectPropertyKey())
var h=this.qualifiedPropertyName(this.lookahead)
if(3===i.type&&!p&&"get"===i.value&&h)t="get",u=this.match("["),r=this.parseObjectPropertyKey(),this.context.allowYield=!1,s=this.parseGetterMethod()
else if(3===i.type&&!p&&"set"===i.value&&h)t="set",u=this.match("["),r=this.parseObjectPropertyKey(),s=this.parseSetterMethod()
else if(7===i.type&&"*"===i.value&&h)t="init",u=this.match("["),r=this.parseObjectPropertyKey(),s=this.parseGeneratorMethod(),c=!0
else if(r||this.throwUnexpectedToken(this.lookahead),t="init",this.match(":")&&!p)!u&&this.isPropertyKey(r,"__proto__")&&(e.value&&this.tolerateError(o.Messages.DuplicateProtoProperty),e.value=!0),this.nextToken(),s=this.inheritCoverGrammar(this.parseAssignmentExpression)
else if(this.match("("))s=p?this.parsePropertyMethodAsyncFunction():this.parsePropertyMethodFunction(),c=!0
else if(3===i.type){var f=this.finalize(n,new a.Identifier(i.value))
if(this.match("=")){this.context.firstCoverInitializedNameError=this.lookahead,this.nextToken(),l=!0
var d=this.isolateCoverGrammar(this.parseAssignmentExpression)
s=this.finalize(n,new a.AssignmentPattern(f,d))}else l=!0,s=f}else this.throwUnexpectedToken(this.nextToken())
return this.finalize(n,new a.Property(t,r,u,s,c,l))},e.prototype.parseObjectInitializer=function(){var e=this.createNode()
this.expect("{")
for(var t=[],n={value:!1};!this.match("}");)t.push(this.parseObjectProperty(n)),this.match("}")||this.expectCommaSeparator()
return this.expect("}"),this.finalize(e,new a.ObjectExpression(t))},e.prototype.parseTemplateHead=function(){i.assert(this.lookahead.head,"Template literal must start with a template head")
var e=this.createNode(),t=this.nextToken(),n=t.value,r=t.cooked
return this.finalize(e,new a.TemplateElement({raw:n,cooked:r},t.tail))},e.prototype.parseTemplateElement=function(){10!==this.lookahead.type&&this.throwUnexpectedToken()
var e=this.createNode(),t=this.nextToken(),n=t.value,i=t.cooked
return this.finalize(e,new a.TemplateElement({raw:n,cooked:i},t.tail))},e.prototype.parseTemplateLiteral=function(){var e=this.createNode(),t=[],n=[],i=this.parseTemplateHead()
for(n.push(i);!i.tail;)t.push(this.parseExpression()),i=this.parseTemplateElement(),n.push(i)
return this.finalize(e,new a.TemplateLiteral(n,t))},e.prototype.reinterpretExpressionAsPattern=function(e){switch(e.type){case u.Syntax.Identifier:case u.Syntax.MemberExpression:case u.Syntax.RestElement:case u.Syntax.AssignmentPattern:break
case u.Syntax.SpreadElement:e.type=u.Syntax.RestElement,this.reinterpretExpressionAsPattern(e.argument)
break
case u.Syntax.ArrayExpression:e.type=u.Syntax.ArrayPattern
for(var t=0;t<e.elements.length;t++)null!==e.elements[t]&&this.reinterpretExpressionAsPattern(e.elements[t])
break
case u.Syntax.ObjectExpression:e.type=u.Syntax.ObjectPattern
for(var t=0;t<e.properties.length;t++)this.reinterpretExpressionAsPattern(e.properties[t].value)
break
case u.Syntax.AssignmentExpression:e.type=u.Syntax.AssignmentPattern,delete e.operator,this.reinterpretExpressionAsPattern(e.left)}},e.prototype.parseGroupExpression=function(){var e
if(this.expect("("),this.match(")"))this.nextToken(),this.match("=>")||this.expect("=>"),e={type:l,params:[],async:!1}
else{var t=this.lookahead,n=[]
if(this.match("..."))e=this.parseRestElement(n),this.expect(")"),this.match("=>")||this.expect("=>"),e={type:l,params:[e],async:!1}
else{var i=!1
if(this.context.isBindingElement=!0,e=this.inheritCoverGrammar(this.parseAssignmentExpression),this.match(",")){var r=[]
for(this.context.isAssignmentTarget=!1,r.push(e);2!==this.lookahead.type&&this.match(",");){if(this.nextToken(),this.match(")")){this.nextToken()
for(var o=0;o<r.length;o++)this.reinterpretExpressionAsPattern(r[o])
i=!0,e={type:l,params:r,async:!1}}else if(this.match("...")){this.context.isBindingElement||this.throwUnexpectedToken(this.lookahead),r.push(this.parseRestElement(n)),this.expect(")"),this.match("=>")||this.expect("=>"),this.context.isBindingElement=!1
for(var o=0;o<r.length;o++)this.reinterpretExpressionAsPattern(r[o])
i=!0,e={type:l,params:r,async:!1}}else r.push(this.inheritCoverGrammar(this.parseAssignmentExpression))
if(i)break}i||(e=this.finalize(this.startNode(t),new a.SequenceExpression(r)))}if(!i){if(this.expect(")"),this.match("=>")&&(e.type===u.Syntax.Identifier&&"yield"===e.name&&(i=!0,e={type:l,params:[e],async:!1}),!i)){if(this.context.isBindingElement||this.throwUnexpectedToken(this.lookahead),e.type===u.Syntax.SequenceExpression)for(var o=0;o<e.expressions.length;o++)this.reinterpretExpressionAsPattern(e.expressions[o])
else this.reinterpretExpressionAsPattern(e)
var s=e.type===u.Syntax.SequenceExpression?e.expressions:[e]
e={type:l,params:s,async:!1}}this.context.isBindingElement=!1}}}return e},e.prototype.parseArguments=function(){this.expect("(")
var e=[]
if(!this.match(")"))for(;;){var t=this.match("...")?this.parseSpreadElement():this.isolateCoverGrammar(this.parseAssignmentExpression)
if(e.push(t),this.match(")"))break
if(this.expectCommaSeparator(),this.match(")"))break}return this.expect(")"),e},e.prototype.isIdentifierName=function(e){return 3===e.type||4===e.type||1===e.type||5===e.type},e.prototype.parseIdentifierName=function(){var e=this.createNode(),t=this.nextToken()
return this.isIdentifierName(t)||this.throwUnexpectedToken(t),this.finalize(e,new a.Identifier(t.value))},e.prototype.parseNewExpression=function(){var e=this.createNode(),t=this.parseIdentifierName()
i.assert("new"===t.name,"New expression must start with `new`")
var n
if(this.match("."))if(this.nextToken(),3===this.lookahead.type&&this.context.inFunctionBody&&"target"===this.lookahead.value){var r=this.parseIdentifierName()
n=new a.MetaProperty(t,r)}else this.throwUnexpectedToken(this.lookahead)
else{var o=this.isolateCoverGrammar(this.parseLeftHandSideExpression),s=this.match("(")?this.parseArguments():[]
n=new a.NewExpression(o,s),this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1}return this.finalize(e,n)},e.prototype.parseAsyncArgument=function(){var e=this.parseAssignmentExpression()
return this.context.firstCoverInitializedNameError=null,e},e.prototype.parseAsyncArguments=function(){this.expect("(")
var e=[]
if(!this.match(")"))for(;;){var t=this.match("...")?this.parseSpreadElement():this.isolateCoverGrammar(this.parseAsyncArgument)
if(e.push(t),this.match(")"))break
if(this.expectCommaSeparator(),this.match(")"))break}return this.expect(")"),e},e.prototype.parseLeftHandSideExpressionAllowCall=function(){var e=this.lookahead,t=this.matchContextualKeyword("async"),n=this.context.allowIn
this.context.allowIn=!0
var i
for(this.matchKeyword("super")&&this.context.inFunctionBody?(i=this.createNode(),this.nextToken(),i=this.finalize(i,new a.Super),this.match("(")||this.match(".")||this.match("[")||this.throwUnexpectedToken(this.lookahead)):i=this.inheritCoverGrammar(this.matchKeyword("new")?this.parseNewExpression:this.parsePrimaryExpression);;)if(this.match(".")){this.context.isBindingElement=!1,this.context.isAssignmentTarget=!0,this.expect(".")
var r=this.parseIdentifierName()
i=this.finalize(this.startNode(e),new a.StaticMemberExpression(i,r))}else if(this.match("(")){var o=t&&e.lineNumber===this.lookahead.lineNumber
this.context.isBindingElement=!1,this.context.isAssignmentTarget=!1
var s=o?this.parseAsyncArguments():this.parseArguments()
if(i=this.finalize(this.startNode(e),new a.CallExpression(i,s)),o&&this.match("=>")){for(var u=0;u<s.length;++u)this.reinterpretExpressionAsPattern(s[u])
i={type:l,params:s,async:!0}}}else if(this.match("[")){this.context.isBindingElement=!1,this.context.isAssignmentTarget=!0,this.expect("[")
var r=this.isolateCoverGrammar(this.parseExpression)
this.expect("]"),i=this.finalize(this.startNode(e),new a.ComputedMemberExpression(i,r))}else{if(10!==this.lookahead.type||!this.lookahead.head)break
var c=this.parseTemplateLiteral()
i=this.finalize(this.startNode(e),new a.TaggedTemplateExpression(i,c))}return this.context.allowIn=n,i},e.prototype.parseSuper=function(){var e=this.createNode()
return this.expectKeyword("super"),this.match("[")||this.match(".")||this.throwUnexpectedToken(this.lookahead),this.finalize(e,new a.Super)},e.prototype.parseLeftHandSideExpression=function(){i.assert(this.context.allowIn,"callee of new expression always allow in keyword.")
for(var e=this.startNode(this.lookahead),t=this.matchKeyword("super")&&this.context.inFunctionBody?this.parseSuper():this.inheritCoverGrammar(this.matchKeyword("new")?this.parseNewExpression:this.parsePrimaryExpression);;)if(this.match("[")){this.context.isBindingElement=!1,this.context.isAssignmentTarget=!0,this.expect("[")
var n=this.isolateCoverGrammar(this.parseExpression)
this.expect("]"),t=this.finalize(e,new a.ComputedMemberExpression(t,n))}else if(this.match(".")){this.context.isBindingElement=!1,this.context.isAssignmentTarget=!0,this.expect(".")
var n=this.parseIdentifierName()
t=this.finalize(e,new a.StaticMemberExpression(t,n))}else{if(10!==this.lookahead.type||!this.lookahead.head)break
var r=this.parseTemplateLiteral()
t=this.finalize(e,new a.TaggedTemplateExpression(t,r))}return t},e.prototype.parseUpdateExpression=function(){var e,t=this.lookahead
if(this.match("++")||this.match("--")){var n=this.startNode(t),i=this.nextToken()
e=this.inheritCoverGrammar(this.parseUnaryExpression),this.context.strict&&e.type===u.Syntax.Identifier&&this.scanner.isRestrictedWord(e.name)&&this.tolerateError(o.Messages.StrictLHSPrefix),this.context.isAssignmentTarget||this.tolerateError(o.Messages.InvalidLHSInAssignment)
var r=!0
e=this.finalize(n,new a.UpdateExpression(i.value,e,r)),this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1}else if(e=this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall),!this.hasLineTerminator&&7===this.lookahead.type&&(this.match("++")||this.match("--"))){this.context.strict&&e.type===u.Syntax.Identifier&&this.scanner.isRestrictedWord(e.name)&&this.tolerateError(o.Messages.StrictLHSPostfix),this.context.isAssignmentTarget||this.tolerateError(o.Messages.InvalidLHSInAssignment),this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1
var s=this.nextToken().value,r=!1
e=this.finalize(this.startNode(t),new a.UpdateExpression(s,e,r))}return e},e.prototype.parseAwaitExpression=function(){var e=this.createNode()
this.nextToken()
var t=this.parseUnaryExpression()
return this.finalize(e,new a.AwaitExpression(t))},e.prototype.parseUnaryExpression=function(){var e
if(this.match("+")||this.match("-")||this.match("~")||this.match("!")||this.matchKeyword("delete")||this.matchKeyword("void")||this.matchKeyword("typeof")){var t=this.startNode(this.lookahead),n=this.nextToken()
e=this.inheritCoverGrammar(this.parseUnaryExpression),e=this.finalize(t,new a.UnaryExpression(n.value,e)),this.context.strict&&"delete"===e.operator&&e.argument.type===u.Syntax.Identifier&&this.tolerateError(o.Messages.StrictDelete),this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1}else e=this.context.await&&this.matchContextualKeyword("await")?this.parseAwaitExpression():this.parseUpdateExpression()
return e},e.prototype.parseExponentiationExpression=function(){var e=this.lookahead,t=this.inheritCoverGrammar(this.parseUnaryExpression)
if(t.type!==u.Syntax.UnaryExpression&&this.match("**")){this.nextToken(),this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1
var n=t,i=this.isolateCoverGrammar(this.parseExponentiationExpression)
t=this.finalize(this.startNode(e),new a.BinaryExpression("**",n,i))}return t},e.prototype.binaryPrecedence=function(e){var t,n=e.value
return t=7===e.type?this.operatorPrecedence[n]||0:4===e.type&&("instanceof"===n||this.context.allowIn&&"in"===n)?7:0},e.prototype.parseBinaryExpression=function(){var e=this.lookahead,t=this.inheritCoverGrammar(this.parseExponentiationExpression),n=this.lookahead,i=this.binaryPrecedence(n)
if(i>0){this.nextToken(),this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1
for(var r=[e,this.lookahead],o=t,s=this.isolateCoverGrammar(this.parseExponentiationExpression),u=[o,n.value,s],c=[i];;){if(i=this.binaryPrecedence(this.lookahead),0>=i)break
for(;u.length>2&&i<=c[c.length-1];){s=u.pop()
var l=u.pop()
c.pop(),o=u.pop(),r.pop()
var p=this.startNode(r[r.length-1])
u.push(this.finalize(p,new a.BinaryExpression(l,o,s)))}u.push(this.nextToken().value),c.push(i),r.push(this.lookahead),u.push(this.isolateCoverGrammar(this.parseExponentiationExpression))}var f=u.length-1
for(t=u[f],r.pop();f>1;){var p=this.startNode(r.pop()),l=u[f-1]
t=this.finalize(p,new a.BinaryExpression(l,u[f-2],t)),f-=2}}return t},e.prototype.parseConditionalExpression=function(){var e=this.lookahead,t=this.inheritCoverGrammar(this.parseBinaryExpression)
if(this.match("?")){this.nextToken()
var n=this.context.allowIn
this.context.allowIn=!0
var i=this.isolateCoverGrammar(this.parseAssignmentExpression)
this.context.allowIn=n,this.expect(":")
var r=this.isolateCoverGrammar(this.parseAssignmentExpression)
t=this.finalize(this.startNode(e),new a.ConditionalExpression(t,i,r)),this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1}return t},e.prototype.checkPatternParam=function(e,t){switch(t.type){case u.Syntax.Identifier:this.validateParam(e,t,t.name)
break
case u.Syntax.RestElement:this.checkPatternParam(e,t.argument)
break
case u.Syntax.AssignmentPattern:this.checkPatternParam(e,t.left)
break
case u.Syntax.ArrayPattern:for(var n=0;n<t.elements.length;n++)null!==t.elements[n]&&this.checkPatternParam(e,t.elements[n])
break
case u.Syntax.ObjectPattern:for(var n=0;n<t.properties.length;n++)this.checkPatternParam(e,t.properties[n].value)}e.simple=e.simple&&t instanceof a.Identifier},e.prototype.reinterpretAsCoverFormalsList=function(e){var t,n=[e],i=!1
switch(e.type){case u.Syntax.Identifier:break
case l:n=e.params,i=e.async
break
default:return null}t={simple:!0,paramSet:{}}
for(var r=0;r<n.length;++r){var a=n[r]
a.type===u.Syntax.AssignmentPattern?a.right.type===u.Syntax.YieldExpression&&(a.right.argument&&this.throwUnexpectedToken(this.lookahead),a.right.type=u.Syntax.Identifier,a.right.name="yield",delete a.right.argument,delete a.right.delegate):i&&a.type===u.Syntax.Identifier&&"await"===a.name&&this.throwUnexpectedToken(this.lookahead),this.checkPatternParam(t,a),n[r]=a}if(this.context.strict||!this.context.allowYield)for(var r=0;r<n.length;++r){var a=n[r]
a.type===u.Syntax.YieldExpression&&this.throwUnexpectedToken(this.lookahead)}if(t.message===o.Messages.StrictParamDupe){var s=this.context.strict?t.stricted:t.firstRestricted
this.throwUnexpectedToken(s,t.message)}return{simple:t.simple,params:n,stricted:t.stricted,firstRestricted:t.firstRestricted,message:t.message}},e.prototype.parseAssignmentExpression=function(){var e
if(!this.context.allowYield&&this.matchKeyword("yield"))e=this.parseYieldExpression()
else{var t=this.lookahead,n=t
if(e=this.parseConditionalExpression(),3===n.type&&n.lineNumber===this.lookahead.lineNumber&&"async"===n.value&&(3===this.lookahead.type||this.matchKeyword("yield"))){var i=this.parsePrimaryExpression()
this.reinterpretExpressionAsPattern(i),e={type:l,params:[i],async:!0}}if(e.type===l||this.match("=>")){this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1
var r=e.async,s=this.reinterpretAsCoverFormalsList(e)
if(s){this.hasLineTerminator&&this.tolerateUnexpectedToken(this.lookahead),this.context.firstCoverInitializedNameError=null
var c=this.context.strict,p=this.context.allowStrictDirective
this.context.allowStrictDirective=s.simple
var f=this.context.allowYield,h=this.context.await
this.context.allowYield=!0,this.context.await=r
var d=this.startNode(t)
this.expect("=>")
var m=void 0
if(this.match("{")){var g=this.context.allowIn
this.context.allowIn=!0,m=this.parseFunctionSourceElements(),this.context.allowIn=g}else m=this.isolateCoverGrammar(this.parseAssignmentExpression)
var v=m.type!==u.Syntax.BlockStatement
this.context.strict&&s.firstRestricted&&this.throwUnexpectedToken(s.firstRestricted,s.message),this.context.strict&&s.stricted&&this.tolerateUnexpectedToken(s.stricted,s.message),e=r?this.finalize(d,new a.AsyncArrowFunctionExpression(s.params,m,v)):this.finalize(d,new a.ArrowFunctionExpression(s.params,m,v)),this.context.strict=c,this.context.allowStrictDirective=p,this.context.allowYield=f,this.context.await=h}}else if(this.matchAssign()){if(this.context.isAssignmentTarget||this.tolerateError(o.Messages.InvalidLHSInAssignment),this.context.strict&&e.type===u.Syntax.Identifier){var x=e
this.scanner.isRestrictedWord(x.name)&&this.tolerateUnexpectedToken(n,o.Messages.StrictLHSAssignment),this.scanner.isStrictModeReservedWord(x.name)&&this.tolerateUnexpectedToken(n,o.Messages.StrictReservedWord)}this.match("=")?this.reinterpretExpressionAsPattern(e):(this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1),n=this.nextToken()
var y=n.value,D=this.isolateCoverGrammar(this.parseAssignmentExpression)
e=this.finalize(this.startNode(t),new a.AssignmentExpression(y,e,D)),this.context.firstCoverInitializedNameError=null}}return e},e.prototype.parseExpression=function(){var e=this.lookahead,t=this.isolateCoverGrammar(this.parseAssignmentExpression)
if(this.match(",")){var n=[]
for(n.push(t);2!==this.lookahead.type&&this.match(",");)this.nextToken(),n.push(this.isolateCoverGrammar(this.parseAssignmentExpression))
t=this.finalize(this.startNode(e),new a.SequenceExpression(n))}return t},e.prototype.parseStatementListItem=function(){var e
if(this.context.isAssignmentTarget=!0,this.context.isBindingElement=!0,4===this.lookahead.type)switch(this.lookahead.value){case"export":this.context.isModule||this.tolerateUnexpectedToken(this.lookahead,o.Messages.IllegalExportDeclaration),e=this.parseExportDeclaration()
break
case"import":this.context.isModule||this.tolerateUnexpectedToken(this.lookahead,o.Messages.IllegalImportDeclaration),e=this.parseImportDeclaration()
break
case"const":e=this.parseLexicalDeclaration({inFor:!1})
break
case"function":e=this.parseFunctionDeclaration()
break
case"class":e=this.parseClassDeclaration()
break
case"let":e=this.isLexicalDeclaration()?this.parseLexicalDeclaration({inFor:!1}):this.parseStatement()
break
default:e=this.parseStatement()}else e=this.parseStatement()
return e},e.prototype.parseBlock=function(){var e=this.createNode()
this.expect("{")
for(var t=[];;){if(this.match("}"))break
t.push(this.parseStatementListItem())}return this.expect("}"),this.finalize(e,new a.BlockStatement(t))},e.prototype.parseLexicalBinding=function(e,t){var n=this.createNode(),i=[],r=this.parsePattern(i,e)
this.context.strict&&r.type===u.Syntax.Identifier&&this.scanner.isRestrictedWord(r.name)&&this.tolerateError(o.Messages.StrictVarName)
var s=null
return"const"===e?this.matchKeyword("in")||this.matchContextualKeyword("of")||(this.match("=")?(this.nextToken(),s=this.isolateCoverGrammar(this.parseAssignmentExpression)):this.throwError(o.Messages.DeclarationMissingInitializer,"const")):(!t.inFor&&r.type!==u.Syntax.Identifier||this.match("="))&&(this.expect("="),s=this.isolateCoverGrammar(this.parseAssignmentExpression)),this.finalize(n,new a.VariableDeclarator(r,s))},e.prototype.parseBindingList=function(e,t){for(var n=[this.parseLexicalBinding(e,t)];this.match(",");)this.nextToken(),n.push(this.parseLexicalBinding(e,t))
return n},e.prototype.isLexicalDeclaration=function(){var e=this.scanner.saveState()
this.scanner.scanComments()
var t=this.scanner.lex()
return this.scanner.restoreState(e),3===t.type||7===t.type&&"["===t.value||7===t.type&&"{"===t.value||4===t.type&&"let"===t.value||4===t.type&&"yield"===t.value},e.prototype.parseLexicalDeclaration=function(e){var t=this.createNode(),n=this.nextToken().value
i.assert("let"===n||"const"===n,"Lexical declaration must be either let or const")
var r=this.parseBindingList(n,e)
return this.consumeSemicolon(),this.finalize(t,new a.VariableDeclaration(r,n))},e.prototype.parseBindingRestElement=function(e,t){var n=this.createNode()
this.expect("...")
var i=this.parsePattern(e,t)
return this.finalize(n,new a.RestElement(i))},e.prototype.parseArrayPattern=function(e,t){var n=this.createNode()
this.expect("[")
for(var i=[];!this.match("]");)if(this.match(","))this.nextToken(),i.push(null)
else{if(this.match("...")){i.push(this.parseBindingRestElement(e,t))
break}i.push(this.parsePatternWithDefault(e,t)),this.match("]")||this.expect(",")}return this.expect("]"),this.finalize(n,new a.ArrayPattern(i))},e.prototype.parsePropertyPattern=function(e,t){var n,i,r=this.createNode(),o=!1,s=!1,u=!1
if(3===this.lookahead.type){var c=this.lookahead
n=this.parseVariableIdentifier()
var l=this.finalize(r,new a.Identifier(c.value))
if(this.match("=")){e.push(c),s=!0,this.nextToken()
var p=this.parseAssignmentExpression()
i=this.finalize(this.startNode(c),new a.AssignmentPattern(l,p))}else this.match(":")?(this.expect(":"),i=this.parsePatternWithDefault(e,t)):(e.push(c),s=!0,i=l)}else o=this.match("["),n=this.parseObjectPropertyKey(),this.expect(":"),i=this.parsePatternWithDefault(e,t)
return this.finalize(r,new a.Property("init",n,o,i,u,s))},e.prototype.parseObjectPattern=function(e,t){var n=this.createNode(),i=[]
for(this.expect("{");!this.match("}");)i.push(this.parsePropertyPattern(e,t)),this.match("}")||this.expect(",")
return this.expect("}"),this.finalize(n,new a.ObjectPattern(i))},e.prototype.parsePattern=function(e,t){var n
return this.match("[")?n=this.parseArrayPattern(e,t):this.match("{")?n=this.parseObjectPattern(e,t):(!this.matchKeyword("let")||"const"!==t&&"let"!==t||this.tolerateUnexpectedToken(this.lookahead,o.Messages.LetInLexicalBinding),e.push(this.lookahead),n=this.parseVariableIdentifier(t)),n},e.prototype.parsePatternWithDefault=function(e,t){var n=this.lookahead,i=this.parsePattern(e,t)
if(this.match("=")){this.nextToken()
var r=this.context.allowYield
this.context.allowYield=!0
var o=this.isolateCoverGrammar(this.parseAssignmentExpression)
this.context.allowYield=r,i=this.finalize(this.startNode(n),new a.AssignmentPattern(i,o))}return i},e.prototype.parseVariableIdentifier=function(e){var t=this.createNode(),n=this.nextToken()
return 4===n.type&&"yield"===n.value?this.context.strict?this.tolerateUnexpectedToken(n,o.Messages.StrictReservedWord):this.context.allowYield||this.throwUnexpectedToken(n):3!==n.type?this.context.strict&&4===n.type&&this.scanner.isStrictModeReservedWord(n.value)?this.tolerateUnexpectedToken(n,o.Messages.StrictReservedWord):(this.context.strict||"let"!==n.value||"var"!==e)&&this.throwUnexpectedToken(n):(this.context.isModule||this.context.await)&&3===n.type&&"await"===n.value&&this.tolerateUnexpectedToken(n),this.finalize(t,new a.Identifier(n.value))},e.prototype.parseVariableDeclaration=function(e){var t=this.createNode(),n=[],i=this.parsePattern(n,"var")
this.context.strict&&i.type===u.Syntax.Identifier&&this.scanner.isRestrictedWord(i.name)&&this.tolerateError(o.Messages.StrictVarName)
var r=null
return this.match("=")?(this.nextToken(),r=this.isolateCoverGrammar(this.parseAssignmentExpression)):i.type===u.Syntax.Identifier||e.inFor||this.expect("="),this.finalize(t,new a.VariableDeclarator(i,r))},e.prototype.parseVariableDeclarationList=function(e){var t={inFor:e.inFor},n=[]
for(n.push(this.parseVariableDeclaration(t));this.match(",");)this.nextToken(),n.push(this.parseVariableDeclaration(t))
return n},e.prototype.parseVariableStatement=function(){var e=this.createNode()
this.expectKeyword("var")
var t=this.parseVariableDeclarationList({inFor:!1})
return this.consumeSemicolon(),this.finalize(e,new a.VariableDeclaration(t,"var"))},e.prototype.parseEmptyStatement=function(){var e=this.createNode()
return this.expect(";"),this.finalize(e,new a.EmptyStatement)},e.prototype.parseExpressionStatement=function(){var e=this.createNode(),t=this.parseExpression()
return this.consumeSemicolon(),this.finalize(e,new a.ExpressionStatement(t))},e.prototype.parseIfClause=function(){return this.context.strict&&this.matchKeyword("function")&&this.tolerateError(o.Messages.StrictFunction),this.parseStatement()},e.prototype.parseIfStatement=function(){var e,t=this.createNode(),n=null
this.expectKeyword("if"),this.expect("(")
var i=this.parseExpression()
return!this.match(")")&&this.config.tolerant?(this.tolerateUnexpectedToken(this.nextToken()),e=this.finalize(this.createNode(),new a.EmptyStatement)):(this.expect(")"),e=this.parseIfClause(),this.matchKeyword("else")&&(this.nextToken(),n=this.parseIfClause())),this.finalize(t,new a.IfStatement(i,e,n))},e.prototype.parseDoWhileStatement=function(){var e=this.createNode()
this.expectKeyword("do")
var t=this.context.inIteration
this.context.inIteration=!0
var n=this.parseStatement()
this.context.inIteration=t,this.expectKeyword("while"),this.expect("(")
var i=this.parseExpression()
return!this.match(")")&&this.config.tolerant?this.tolerateUnexpectedToken(this.nextToken()):(this.expect(")"),this.match(";")&&this.nextToken()),this.finalize(e,new a.DoWhileStatement(n,i))},e.prototype.parseWhileStatement=function(){var e,t=this.createNode()
this.expectKeyword("while"),this.expect("(")
var n=this.parseExpression()
if(!this.match(")")&&this.config.tolerant)this.tolerateUnexpectedToken(this.nextToken()),e=this.finalize(this.createNode(),new a.EmptyStatement)
else{this.expect(")")
var i=this.context.inIteration
this.context.inIteration=!0,e=this.parseStatement(),this.context.inIteration=i}return this.finalize(t,new a.WhileStatement(n,e))},e.prototype.parseForStatement=function(){var e,t,n=null,i=null,r=null,s=!0,c=this.createNode()
if(this.expectKeyword("for"),this.expect("("),this.match(";"))this.nextToken()
else if(this.matchKeyword("var")){n=this.createNode(),this.nextToken()
var l=this.context.allowIn
this.context.allowIn=!1
var p=this.parseVariableDeclarationList({inFor:!0})
if(this.context.allowIn=l,1===p.length&&this.matchKeyword("in")){var f=p[0]
f.init&&(f.id.type===u.Syntax.ArrayPattern||f.id.type===u.Syntax.ObjectPattern||this.context.strict)&&this.tolerateError(o.Messages.ForInOfLoopInitializer,"for-in"),n=this.finalize(n,new a.VariableDeclaration(p,"var")),this.nextToken(),e=n,t=this.parseExpression(),n=null}else 1===p.length&&null===p[0].init&&this.matchContextualKeyword("of")?(n=this.finalize(n,new a.VariableDeclaration(p,"var")),this.nextToken(),e=n,t=this.parseAssignmentExpression(),n=null,s=!1):(n=this.finalize(n,new a.VariableDeclaration(p,"var")),this.expect(";"))}else if(this.matchKeyword("const")||this.matchKeyword("let")){n=this.createNode()
var h=this.nextToken().value
if(this.context.strict||"in"!==this.lookahead.value){var l=this.context.allowIn
this.context.allowIn=!1
var p=this.parseBindingList(h,{inFor:!0})
this.context.allowIn=l,1===p.length&&null===p[0].init&&this.matchKeyword("in")?(n=this.finalize(n,new a.VariableDeclaration(p,h)),this.nextToken(),e=n,t=this.parseExpression(),n=null):1===p.length&&null===p[0].init&&this.matchContextualKeyword("of")?(n=this.finalize(n,new a.VariableDeclaration(p,h)),this.nextToken(),e=n,t=this.parseAssignmentExpression(),n=null,s=!1):(this.consumeSemicolon(),n=this.finalize(n,new a.VariableDeclaration(p,h)))}else n=this.finalize(n,new a.Identifier(h)),this.nextToken(),e=n,t=this.parseExpression(),n=null}else{var d=this.lookahead,l=this.context.allowIn
if(this.context.allowIn=!1,n=this.inheritCoverGrammar(this.parseAssignmentExpression),this.context.allowIn=l,this.matchKeyword("in"))this.context.isAssignmentTarget&&n.type!==u.Syntax.AssignmentExpression||this.tolerateError(o.Messages.InvalidLHSInForIn),this.nextToken(),this.reinterpretExpressionAsPattern(n),e=n,t=this.parseExpression(),n=null
else if(this.matchContextualKeyword("of"))this.context.isAssignmentTarget&&n.type!==u.Syntax.AssignmentExpression||this.tolerateError(o.Messages.InvalidLHSInForLoop),this.nextToken(),this.reinterpretExpressionAsPattern(n),e=n,t=this.parseAssignmentExpression(),n=null,s=!1
else{if(this.match(",")){for(var m=[n];this.match(",");)this.nextToken(),m.push(this.isolateCoverGrammar(this.parseAssignmentExpression))
n=this.finalize(this.startNode(d),new a.SequenceExpression(m))}this.expect(";")}}void 0===e&&(this.match(";")||(i=this.parseExpression()),this.expect(";"),this.match(")")||(r=this.parseExpression()))
var g
if(!this.match(")")&&this.config.tolerant)this.tolerateUnexpectedToken(this.nextToken()),g=this.finalize(this.createNode(),new a.EmptyStatement)
else{this.expect(")")
var v=this.context.inIteration
this.context.inIteration=!0,g=this.isolateCoverGrammar(this.parseStatement),this.context.inIteration=v}return void 0===e?this.finalize(c,new a.ForStatement(n,i,r,g)):s?this.finalize(c,new a.ForInStatement(e,t,g)):this.finalize(c,new a.ForOfStatement(e,t,g))},e.prototype.parseContinueStatement=function(){var e=this.createNode()
this.expectKeyword("continue")
var t=null
if(3===this.lookahead.type&&!this.hasLineTerminator){var n=this.parseVariableIdentifier()
t=n
var i="$"+n.name
Object.prototype.hasOwnProperty.call(this.context.labelSet,i)||this.throwError(o.Messages.UnknownLabel,n.name)}return this.consumeSemicolon(),null!==t||this.context.inIteration||this.throwError(o.Messages.IllegalContinue),this.finalize(e,new a.ContinueStatement(t))},e.prototype.parseBreakStatement=function(){var e=this.createNode()
this.expectKeyword("break")
var t=null
if(3===this.lookahead.type&&!this.hasLineTerminator){var n=this.parseVariableIdentifier(),i="$"+n.name
Object.prototype.hasOwnProperty.call(this.context.labelSet,i)||this.throwError(o.Messages.UnknownLabel,n.name),t=n}return this.consumeSemicolon(),null!==t||this.context.inIteration||this.context.inSwitch||this.throwError(o.Messages.IllegalBreak),this.finalize(e,new a.BreakStatement(t))},e.prototype.parseReturnStatement=function(){this.context.inFunctionBody||this.tolerateError(o.Messages.IllegalReturn)
var e=this.createNode()
this.expectKeyword("return")
var t=!this.match(";")&&!this.match("}")&&!this.hasLineTerminator&&2!==this.lookahead.type,n=t?this.parseExpression():null
return this.consumeSemicolon(),this.finalize(e,new a.ReturnStatement(n))},e.prototype.parseWithStatement=function(){this.context.strict&&this.tolerateError(o.Messages.StrictModeWith)
var e,t=this.createNode()
this.expectKeyword("with"),this.expect("(")
var n=this.parseExpression()
return!this.match(")")&&this.config.tolerant?(this.tolerateUnexpectedToken(this.nextToken()),e=this.finalize(this.createNode(),new a.EmptyStatement)):(this.expect(")"),e=this.parseStatement()),this.finalize(t,new a.WithStatement(n,e))},e.prototype.parseSwitchCase=function(){var e,t=this.createNode()
this.matchKeyword("default")?(this.nextToken(),e=null):(this.expectKeyword("case"),e=this.parseExpression()),this.expect(":")
for(var n=[];;){if(this.match("}")||this.matchKeyword("default")||this.matchKeyword("case"))break
n.push(this.parseStatementListItem())}return this.finalize(t,new a.SwitchCase(e,n))},e.prototype.parseSwitchStatement=function(){var e=this.createNode()
this.expectKeyword("switch"),this.expect("(")
var t=this.parseExpression()
this.expect(")")
var n=this.context.inSwitch
this.context.inSwitch=!0
var i=[],r=!1
for(this.expect("{");;){if(this.match("}"))break
var s=this.parseSwitchCase()
null===s.test&&(r&&this.throwError(o.Messages.MultipleDefaultsInSwitch),r=!0),i.push(s)}return this.expect("}"),this.context.inSwitch=n,this.finalize(e,new a.SwitchStatement(t,i))},e.prototype.parseLabelledStatement=function(){var e,t=this.createNode(),n=this.parseExpression()
if(n.type===u.Syntax.Identifier&&this.match(":")){this.nextToken()
var i=n,r="$"+i.name
Object.prototype.hasOwnProperty.call(this.context.labelSet,r)&&this.throwError(o.Messages.Redeclaration,"Label",i.name),this.context.labelSet[r]=!0
var s=void 0
if(this.matchKeyword("class"))this.tolerateUnexpectedToken(this.lookahead),s=this.parseClassDeclaration()
else if(this.matchKeyword("function")){var c=this.lookahead,l=this.parseFunctionDeclaration()
this.context.strict?this.tolerateUnexpectedToken(c,o.Messages.StrictFunction):l.generator&&this.tolerateUnexpectedToken(c,o.Messages.GeneratorInLegacyContext),s=l}else s=this.parseStatement()
delete this.context.labelSet[r],e=new a.LabeledStatement(i,s)}else this.consumeSemicolon(),e=new a.ExpressionStatement(n)
return this.finalize(t,e)},e.prototype.parseThrowStatement=function(){var e=this.createNode()
this.expectKeyword("throw"),this.hasLineTerminator&&this.throwError(o.Messages.NewlineAfterThrow)
var t=this.parseExpression()
return this.consumeSemicolon(),this.finalize(e,new a.ThrowStatement(t))},e.prototype.parseCatchClause=function(){var e=this.createNode()
this.expectKeyword("catch"),this.expect("("),this.match(")")&&this.throwUnexpectedToken(this.lookahead)
for(var t=[],n=this.parsePattern(t),i={},r=0;r<t.length;r++){var s="$"+t[r].value
Object.prototype.hasOwnProperty.call(i,s)&&this.tolerateError(o.Messages.DuplicateBinding,t[r].value),i[s]=!0}this.context.strict&&n.type===u.Syntax.Identifier&&this.scanner.isRestrictedWord(n.name)&&this.tolerateError(o.Messages.StrictCatchVariable),this.expect(")")
var c=this.parseBlock()
return this.finalize(e,new a.CatchClause(n,c))},e.prototype.parseFinallyClause=function(){return this.expectKeyword("finally"),this.parseBlock()},e.prototype.parseTryStatement=function(){var e=this.createNode()
this.expectKeyword("try")
var t=this.parseBlock(),n=this.matchKeyword("catch")?this.parseCatchClause():null,i=this.matchKeyword("finally")?this.parseFinallyClause():null
return n||i||this.throwError(o.Messages.NoCatchOrFinally),this.finalize(e,new a.TryStatement(t,n,i))},e.prototype.parseDebuggerStatement=function(){var e=this.createNode()
return this.expectKeyword("debugger"),this.consumeSemicolon(),this.finalize(e,new a.DebuggerStatement)},e.prototype.parseStatement=function(){var e
switch(this.lookahead.type){case 1:case 5:case 6:case 8:case 10:case 9:e=this.parseExpressionStatement()
break
case 7:var t=this.lookahead.value
e="{"===t?this.parseBlock():"("===t?this.parseExpressionStatement():";"===t?this.parseEmptyStatement():this.parseExpressionStatement()
break
case 3:e=this.matchAsyncFunction()?this.parseFunctionDeclaration():this.parseLabelledStatement()
break
case 4:switch(this.lookahead.value){case"break":e=this.parseBreakStatement()
break
case"continue":e=this.parseContinueStatement()
break
case"debugger":e=this.parseDebuggerStatement()
break
case"do":e=this.parseDoWhileStatement()
break
case"for":e=this.parseForStatement()
break
case"function":e=this.parseFunctionDeclaration()
break
case"if":e=this.parseIfStatement()
break
case"return":e=this.parseReturnStatement()
break
case"switch":e=this.parseSwitchStatement()
break
case"throw":e=this.parseThrowStatement()
break
case"try":e=this.parseTryStatement()
break
case"var":e=this.parseVariableStatement()
break
case"while":e=this.parseWhileStatement()
break
case"with":e=this.parseWithStatement()
break
default:e=this.parseExpressionStatement()}break
default:e=this.throwUnexpectedToken(this.lookahead)}return e},e.prototype.parseFunctionSourceElements=function(){var e=this.createNode()
this.expect("{")
var t=this.parseDirectivePrologues(),n=this.context.labelSet,i=this.context.inIteration,r=this.context.inSwitch,o=this.context.inFunctionBody
for(this.context.labelSet={},this.context.inIteration=!1,this.context.inSwitch=!1,this.context.inFunctionBody=!0;2!==this.lookahead.type&&!this.match("}");)t.push(this.parseStatementListItem())
return this.expect("}"),this.context.labelSet=n,this.context.inIteration=i,this.context.inSwitch=r,this.context.inFunctionBody=o,this.finalize(e,new a.BlockStatement(t))},e.prototype.validateParam=function(e,t,n){var i="$"+n
this.context.strict?(this.scanner.isRestrictedWord(n)&&(e.stricted=t,e.message=o.Messages.StrictParamName),Object.prototype.hasOwnProperty.call(e.paramSet,i)&&(e.stricted=t,e.message=o.Messages.StrictParamDupe)):e.firstRestricted||(this.scanner.isRestrictedWord(n)?(e.firstRestricted=t,e.message=o.Messages.StrictParamName):this.scanner.isStrictModeReservedWord(n)?(e.firstRestricted=t,e.message=o.Messages.StrictReservedWord):Object.prototype.hasOwnProperty.call(e.paramSet,i)&&(e.stricted=t,e.message=o.Messages.StrictParamDupe)),"function"==typeof Object.defineProperty?Object.defineProperty(e.paramSet,i,{value:!0,enumerable:!0,writable:!0,configurable:!0}):e.paramSet[i]=!0},e.prototype.parseRestElement=function(e){var t=this.createNode()
this.expect("...")
var n=this.parsePattern(e)
return this.match("=")&&this.throwError(o.Messages.DefaultRestParameter),this.match(")")||this.throwError(o.Messages.ParameterAfterRestParameter),this.finalize(t,new a.RestElement(n))},e.prototype.parseFormalParameter=function(e){for(var t=[],n=this.match("...")?this.parseRestElement(t):this.parsePatternWithDefault(t),i=0;i<t.length;i++)this.validateParam(e,t[i],t[i].value)
e.simple=e.simple&&n instanceof a.Identifier,e.params.push(n)},e.prototype.parseFormalParameters=function(e){var t
if(t={simple:!0,params:[],firstRestricted:e},this.expect("("),!this.match(")"))for(t.paramSet={};2!==this.lookahead.type&&(this.parseFormalParameter(t),!this.match(")"))&&(this.expect(","),!this.match(")")););return this.expect(")"),{simple:t.simple,params:t.params,stricted:t.stricted,firstRestricted:t.firstRestricted,message:t.message}},e.prototype.matchAsyncFunction=function(){var e=this.matchContextualKeyword("async")
if(e){var t=this.scanner.saveState()
this.scanner.scanComments()
var n=this.scanner.lex()
this.scanner.restoreState(t),e=t.lineNumber===n.lineNumber&&4===n.type&&"function"===n.value}return e},e.prototype.parseFunctionDeclaration=function(e){var t=this.createNode(),n=this.matchContextualKeyword("async")
n&&this.nextToken(),this.expectKeyword("function")
var i=n?!1:this.match("*")
i&&this.nextToken()
var r,s=null,u=null
if(!e||!this.match("(")){var c=this.lookahead
s=this.parseVariableIdentifier(),this.context.strict?this.scanner.isRestrictedWord(c.value)&&this.tolerateUnexpectedToken(c,o.Messages.StrictFunctionName):this.scanner.isRestrictedWord(c.value)?(u=c,r=o.Messages.StrictFunctionName):this.scanner.isStrictModeReservedWord(c.value)&&(u=c,r=o.Messages.StrictReservedWord)}var l=this.context.await,p=this.context.allowYield
this.context.await=n,this.context.allowYield=!i
var f=this.parseFormalParameters(u),h=f.params,d=f.stricted
u=f.firstRestricted,f.message&&(r=f.message)
var m=this.context.strict,g=this.context.allowStrictDirective
this.context.allowStrictDirective=f.simple
var v=this.parseFunctionSourceElements()
return this.context.strict&&u&&this.throwUnexpectedToken(u,r),this.context.strict&&d&&this.tolerateUnexpectedToken(d,r),this.context.strict=m,this.context.allowStrictDirective=g,this.context.await=l,this.context.allowYield=p,n?this.finalize(t,new a.AsyncFunctionDeclaration(s,h,v)):this.finalize(t,new a.FunctionDeclaration(s,h,v,i))},e.prototype.parseFunctionExpression=function(){var e=this.createNode(),t=this.matchContextualKeyword("async")
t&&this.nextToken(),this.expectKeyword("function")
var n=t?!1:this.match("*")
n&&this.nextToken()
var i,r,s=null,u=this.context.await,c=this.context.allowYield
if(this.context.await=t,this.context.allowYield=!n,!this.match("(")){var l=this.lookahead
s=this.context.strict||n||!this.matchKeyword("yield")?this.parseVariableIdentifier():this.parseIdentifierName(),this.context.strict?this.scanner.isRestrictedWord(l.value)&&this.tolerateUnexpectedToken(l,o.Messages.StrictFunctionName):this.scanner.isRestrictedWord(l.value)?(r=l,i=o.Messages.StrictFunctionName):this.scanner.isStrictModeReservedWord(l.value)&&(r=l,i=o.Messages.StrictReservedWord)}var p=this.parseFormalParameters(r),f=p.params,h=p.stricted
r=p.firstRestricted,p.message&&(i=p.message)
var d=this.context.strict,m=this.context.allowStrictDirective
this.context.allowStrictDirective=p.simple
var g=this.parseFunctionSourceElements()
return this.context.strict&&r&&this.throwUnexpectedToken(r,i),this.context.strict&&h&&this.tolerateUnexpectedToken(h,i),this.context.strict=d,this.context.allowStrictDirective=m,this.context.await=u,this.context.allowYield=c,t?this.finalize(e,new a.AsyncFunctionExpression(s,f,g)):this.finalize(e,new a.FunctionExpression(s,f,g,n))},e.prototype.parseDirective=function(){var e=this.lookahead,t=this.createNode(),n=this.parseExpression(),i=n.type===u.Syntax.Literal?this.getTokenRaw(e).slice(1,-1):null
return this.consumeSemicolon(),this.finalize(t,i?new a.Directive(n,i):new a.ExpressionStatement(n))},e.prototype.parseDirectivePrologues=function(){for(var e=null,t=[];;){var n=this.lookahead
if(8!==n.type)break
var i=this.parseDirective()
t.push(i)
var r=i.directive
if("string"!=typeof r)break
" "===r?(this.context.strict=!0,e&&this.tolerateUnexpectedToken(e,o.Messages.StrictOctalLiteral),this.context.allowStrictDirective||this.tolerateUnexpectedToken(n,o.Messages.IllegalLanguageModeDirective)):!e&&n.octal&&(e=n)}return t},e.prototype.qualifiedPropertyName=function(e){switch(e.type){case 3:case 8:case 1:case 5:case 6:case 4:return!0
case 7:return"["===e.value}return!1},e.prototype.parseGetterMethod=function(){var e=this.createNode(),t=!1,n=this.context.allowYield
this.context.allowYield=!1
var i=this.parseFormalParameters()
i.params.length>0&&this.tolerateError(o.Messages.BadGetterArity)
var r=this.parsePropertyMethod(i)
return this.context.allowYield=n,this.finalize(e,new a.FunctionExpression(null,i.params,r,t))},e.prototype.parseSetterMethod=function(){var e=this.createNode(),t=!1,n=this.context.allowYield
this.context.allowYield=!1
var i=this.parseFormalParameters()
1!==i.params.length?this.tolerateError(o.Messages.BadSetterArity):i.params[0]instanceof a.RestElement&&this.tolerateError(o.Messages.BadSetterRestParameter)
var r=this.parsePropertyMethod(i)
return this.context.allowYield=n,this.finalize(e,new a.FunctionExpression(null,i.params,r,t))},e.prototype.parseGeneratorMethod=function(){var e=this.createNode(),t=!0,n=this.context.allowYield
this.context.allowYield=!0
var i=this.parseFormalParameters()
this.context.allowYield=!1
var r=this.parsePropertyMethod(i)
return this.context.allowYield=n,this.finalize(e,new a.FunctionExpression(null,i.params,r,t))},e.prototype.isStartOfExpression=function(){var e=!0,t=this.lookahead.value
switch(this.lookahead.type){case 7:e="["===t||"("===t||"{"===t||"+"===t||"-"===t||"!"===t||"~"===t||"++"===t||"--"===t||"/"===t||"/="===t
break
case 4:e="class"===t||"delete"===t||"function"===t||"let"===t||"new"===t||"super"===t||"this"===t||"typeof"===t||"void"===t||"yield"===t}return e},e.prototype.parseYieldExpression=function(){var e=this.createNode()
this.expectKeyword("yield")
var t=null,n=!1
if(!this.hasLineTerminator){var i=this.context.allowYield
this.context.allowYield=!1,n=this.match("*"),n?(this.nextToken(),t=this.parseAssignmentExpression()):this.isStartOfExpression()&&(t=this.parseAssignmentExpression()),this.context.allowYield=i}return this.finalize(e,new a.YieldExpression(t,n))},e.prototype.parseClassElement=function(e){var t=this.lookahead,n=this.createNode(),i="",r=null,s=null,u=!1,c=!1,l=!1,p=!1
if(this.match("*"))this.nextToken()
else{u=this.match("["),r=this.parseObjectPropertyKey()
var f=r
if("static"===f.name&&(this.qualifiedPropertyName(this.lookahead)||this.match("*"))&&(t=this.lookahead,l=!0,u=this.match("["),this.match("*")?this.nextToken():r=this.parseObjectPropertyKey()),3===t.type&&!this.hasLineTerminator&&"async"===t.value){var h=this.lookahead.value
":"!==h&&"("!==h&&"*"!==h&&(p=!0,t=this.lookahead,r=this.parseObjectPropertyKey(),3===t.type&&("get"===t.value||"set"===t.value?this.tolerateUnexpectedToken(t):"constructor"===t.value&&this.tolerateUnexpectedToken(t,o.Messages.ConstructorIsAsync)))}}var d=this.qualifiedPropertyName(this.lookahead)
return 3===t.type?"get"===t.value&&d?(i="get",u=this.match("["),r=this.parseObjectPropertyKey(),this.context.allowYield=!1,s=this.parseGetterMethod()):"set"===t.value&&d&&(i="set",u=this.match("["),r=this.parseObjectPropertyKey(),s=this.parseSetterMethod()):7===t.type&&"*"===t.value&&d&&(i="init",u=this.match("["),r=this.parseObjectPropertyKey(),s=this.parseGeneratorMethod(),c=!0),!i&&r&&this.match("(")&&(i="init",s=p?this.parsePropertyMethodAsyncFunction():this.parsePropertyMethodFunction(),c=!0),i||this.throwUnexpectedToken(this.lookahead),"init"===i&&(i="method"),u||(l&&this.isPropertyKey(r,"prototype")&&this.throwUnexpectedToken(t,o.Messages.StaticPrototype),!l&&this.isPropertyKey(r,"constructor")&&(("method"!==i||!c||s&&s.generator)&&this.throwUnexpectedToken(t,o.Messages.ConstructorSpecialMethod),e.value?this.throwUnexpectedToken(t,o.Messages.DuplicateConstructor):e.value=!0,i="constructor")),this.finalize(n,new a.MethodDefinition(r,u,s,i,l))},e.prototype.parseClassElementList=function(){var e=[],t={value:!1}
for(this.expect("{");!this.match("}");)this.match(";")?this.nextToken():e.push(this.parseClassElement(t))
return this.expect("}"),e},e.prototype.parseClassBody=function(){var e=this.createNode(),t=this.parseClassElementList()
return this.finalize(e,new a.ClassBody(t))},e.prototype.parseClassDeclaration=function(e){var t=this.createNode(),n=this.context.strict
this.context.strict=!0,this.expectKeyword("class")
var i=e&&3!==this.lookahead.type?null:this.parseVariableIdentifier(),r=null
this.matchKeyword("extends")&&(this.nextToken(),r=this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall))
var o=this.parseClassBody()
return this.context.strict=n,this.finalize(t,new a.ClassDeclaration(i,r,o))},e.prototype.parseClassExpression=function(){var e=this.createNode(),t=this.context.strict
this.context.strict=!0,this.expectKeyword("class")
var n=3===this.lookahead.type?this.parseVariableIdentifier():null,i=null
this.matchKeyword("extends")&&(this.nextToken(),i=this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall))
var r=this.parseClassBody()
return this.context.strict=t,this.finalize(e,new a.ClassExpression(n,i,r))},e.prototype.parseModule=function(){this.context.strict=!0,this.context.isModule=!0
for(var e=this.createNode(),t=this.parseDirectivePrologues();2!==this.lookahead.type;)t.push(this.parseStatementListItem())
return this.finalize(e,new a.Module(t))},e.prototype.parseScript=function(){for(var e=this.createNode(),t=this.parseDirectivePrologues();2!==this.lookahead.type;)t.push(this.parseStatementListItem())
return this.finalize(e,new a.Script(t))},e.prototype.parseModuleSpecifier=function(){var e=this.createNode()
8!==this.lookahead.type&&this.throwError(o.Messages.InvalidModuleSpecifier)
var t=this.nextToken(),n=this.getTokenRaw(t)
return this.finalize(e,new a.Literal(t.value,n))},e.prototype.parseImportSpecifier=function(){var e,t,n=this.createNode()
return 3===this.lookahead.type?(e=this.parseVariableIdentifier(),t=e,this.matchContextualKeyword("as")&&(this.nextToken(),t=this.parseVariableIdentifier())):(e=this.parseIdentifierName(),t=e,this.matchContextualKeyword("as")?(this.nextToken(),t=this.parseVariableIdentifier()):this.throwUnexpectedToken(this.nextToken())),this.finalize(n,new a.ImportSpecifier(t,e))},e.prototype.parseNamedImports=function(){this.expect("{")
for(var e=[];!this.match("}");)e.push(this.parseImportSpecifier()),this.match("}")||this.expect(",")
return this.expect("}"),e},e.prototype.parseImportDefaultSpecifier=function(){var e=this.createNode(),t=this.parseIdentifierName()
return this.finalize(e,new a.ImportDefaultSpecifier(t))},e.prototype.parseImportNamespaceSpecifier=function(){var e=this.createNode()
this.expect("*"),this.matchContextualKeyword("as")||this.throwError(o.Messages.NoAsAfterImportNamespace),this.nextToken()
var t=this.parseIdentifierName()
return this.finalize(e,new a.ImportNamespaceSpecifier(t))},e.prototype.parseImportDeclaration=function(){this.context.inFunctionBody&&this.throwError(o.Messages.IllegalImportDeclaration)
var e=this.createNode()
this.expectKeyword("import")
var t,n=[]
if(8===this.lookahead.type)t=this.parseModuleSpecifier()
else{if(this.match("{")?n=n.concat(this.parseNamedImports()):this.match("*")?n.push(this.parseImportNamespaceSpecifier()):this.isIdentifierName(this.lookahead)&&!this.matchKeyword("default")?(n.push(this.parseImportDefaultSpecifier()),this.match(",")&&(this.nextToken(),this.match("*")?n.push(this.parseImportNamespaceSpecifier()):this.match("{")?n=n.concat(this.parseNamedImports()):this.throwUnexpectedToken(this.lookahead))):this.throwUnexpectedToken(this.nextToken()),!this.matchContextualKeyword("from")){var i=this.lookahead.value?o.Messages.UnexpectedToken:o.Messages.MissingFromClause
this.throwError(i,this.lookahead.value)}this.nextToken(),t=this.parseModuleSpecifier()}return this.consumeSemicolon(),this.finalize(e,new a.ImportDeclaration(n,t))},e.prototype.parseExportSpecifier=function(){var e=this.createNode(),t=this.parseIdentifierName(),n=t
return this.matchContextualKeyword("as")&&(this.nextToken(),n=this.parseIdentifierName()),this.finalize(e,new a.ExportSpecifier(t,n))},e.prototype.parseExportDeclaration=function(){this.context.inFunctionBody&&this.throwError(o.Messages.IllegalExportDeclaration)
var e=this.createNode()
this.expectKeyword("export")
var t
if(this.matchKeyword("default"))if(this.nextToken(),this.matchKeyword("function")){var n=this.parseFunctionDeclaration(!0)
t=this.finalize(e,new a.ExportDefaultDeclaration(n))}else if(this.matchKeyword("class")){var n=this.parseClassDeclaration(!0)
t=this.finalize(e,new a.ExportDefaultDeclaration(n))}else if(this.matchContextualKeyword("async")){var n=this.matchAsyncFunction()?this.parseFunctionDeclaration(!0):this.parseAssignmentExpression()
t=this.finalize(e,new a.ExportDefaultDeclaration(n))}else{this.matchContextualKeyword("from")&&this.throwError(o.Messages.UnexpectedToken,this.lookahead.value)
var n=this.match("{")?this.parseObjectInitializer():this.match("[")?this.parseArrayInitializer():this.parseAssignmentExpression()
this.consumeSemicolon(),t=this.finalize(e,new a.ExportDefaultDeclaration(n))}else if(this.match("*")){if(this.nextToken(),!this.matchContextualKeyword("from")){var i=this.lookahead.value?o.Messages.UnexpectedToken:o.Messages.MissingFromClause
this.throwError(i,this.lookahead.value)}this.nextToken()
var r=this.parseModuleSpecifier()
this.consumeSemicolon(),t=this.finalize(e,new a.ExportAllDeclaration(r))}else if(4===this.lookahead.type){var n=void 0
switch(this.lookahead.value){case"let":case"const":n=this.parseLexicalDeclaration({inFor:!1})
break
case"var":case"class":case"function":n=this.parseStatementListItem()
break
default:this.throwUnexpectedToken(this.lookahead)}t=this.finalize(e,new a.ExportNamedDeclaration(n,[],null))}else if(this.matchAsyncFunction()){var n=this.parseFunctionDeclaration()
t=this.finalize(e,new a.ExportNamedDeclaration(n,[],null))}else{var s=[],u=null,c=!1
for(this.expect("{");!this.match("}");)c=c||this.matchKeyword("default"),s.push(this.parseExportSpecifier()),this.match("}")||this.expect(",")
if(this.expect("}"),this.matchContextualKeyword("from"))this.nextToken(),u=this.parseModuleSpecifier(),this.consumeSemicolon()
else if(c){var i=this.lookahead.value?o.Messages.UnexpectedToken:o.Messages.MissingFromClause
this.throwError(i,this.lookahead.value)}else this.consumeSemicolon()
t=this.finalize(e,new a.ExportNamedDeclaration(null,s,u))}return t},e}()
t.Parser=p},function(e,t){" "
function n(e,t){if(!e)throw Error("ASSERT: "+t)}Object.defineProperty(t,"__esModule",{value:!0}),t.assert=n},function(e,t){" "
Object.defineProperty(t,"__esModule",{value:!0})
var n=function(){function e(){this.errors=[],this.tolerant=!1}return e.prototype.recordError=function(e){this.errors.push(e)},e.prototype.tolerate=function(e){if(!this.tolerant)throw e
this.recordError(e)},e.prototype.constructError=function(e,t){var n=Error(e)
try{throw n}catch(i){Object.create&&Object.defineProperty&&(n=Object.create(i),Object.defineProperty(n,"column",{value:t}))}return n},e.prototype.createError=function(e,t,n,i){var r="Line "+t+": "+i,o=this.constructError(r,n)
return o.index=e,o.lineNumber=t,o.description=i,o},e.prototype.throwError=function(e,t,n,i){throw this.createError(e,t,n,i)},e.prototype.tolerateError=function(e,t,n,i){var r=this.createError(e,t,n,i)
if(!this.tolerant)throw r
this.recordError(r)},e}()
t.ErrorHandler=n},function(e,t){" "
Object.defineProperty(t,"__esModule",{value:!0}),t.Messages={BadGetterArity:"Getter must not have any formal parameters",BadSetterArity:"Setter must have exactly one formal parameter",BadSetterRestParameter:"Setter function argument must not be a rest parameter",ConstructorIsAsync:"Class constructor may not be an async method",ConstructorSpecialMethod:"Class constructor may not be an accessor",DeclarationMissingInitializer:"Missing initializer in %0 declaration",DefaultRestParameter:"Unexpected token =",DuplicateBinding:"Duplicate binding %0",DuplicateConstructor:"A class may only have one constructor",DuplicateProtoProperty:"Duplicate __proto__ fields are not allowed in object literals",ForInOfLoopInitializer:"%0 loop variable declaration may not have an initializer",GeneratorInLegacyContext:"Generator declarations are not allowed in legacy contexts",IllegalBreak:"Illegal break statement",IllegalContinue:"Illegal continue statement",IllegalExportDeclaration:"Unexpected token",IllegalImportDeclaration:"Unexpected token",IllegalLanguageModeDirective:"Illegal ' ' directive in function with non-simple parameter list",IllegalReturn:"Illegal return statement",InvalidEscapedReservedWord:"Keyword must not contain escaped characters",InvalidHexEscapeSequence:"Invalid hexadecimal escape sequence",InvalidLHSInAssignment:"Invalid left-hand side in assignment",InvalidLHSInForIn:"Invalid left-hand side in for-in",InvalidLHSInForLoop:"Invalid left-hand side in for-loop",InvalidModuleSpecifier:"Unexpected token",InvalidRegExp:"Invalid regular expression",LetInLexicalBinding:"let is disallowed as a lexically bound name",MissingFromClause:"Unexpected token",MultipleDefaultsInSwitch:"More than one default clause in switch statement",NewlineAfterThrow:"Illegal newline after throw",NoAsAfterImportNamespace:"Unexpected token",NoCatchOrFinally:"Missing catch or finally after try",ParameterAfterRestParameter:"Rest parameter must be last formal parameter",Redeclaration:"%0 '%1' has already been declared",StaticPrototype:"Classes may not have static property named prototype",StrictCatchVariable:"Catch variable may not be eval or arguments in strict mode",StrictDelete:"Delete of an unqualified identifier in strict mode.",StrictFunction:"In strict mode code, functions can only be declared at top level or inside a block",StrictFunctionName:"Function name may not be eval or arguments in strict mode",StrictLHSAssignment:"Assignment to eval or arguments is not allowed in strict mode",StrictLHSPostfix:"Postfix increment/decrement may not have eval or arguments operand in strict mode",StrictLHSPrefix:"Prefix increment/decrement may not have eval or arguments operand in strict mode",StrictModeWith:"Strict mode code may not include a with statement",StrictOctalLiteral:"Octal literals are not allowed in strict mode.",StrictParamDupe:"Strict mode function may not have duplicate parameter names",StrictParamName:"Parameter name eval or arguments is not allowed in strict mode",StrictReservedWord:"Use of future reserved word in strict mode",StrictVarName:"Variable name may not be eval or arguments in strict mode",TemplateOctalLiteral:"Octal literals are not allowed in template strings.",UnexpectedEOS:"Unexpected end of input",UnexpectedIdentifier:"Unexpected identifier",UnexpectedNumber:"Unexpected number",UnexpectedReserved:"Unexpected reserved word",UnexpectedString:"Unexpected string",UnexpectedTemplate:"Unexpected quasi %0",UnexpectedToken:"Unexpected token %0",UnexpectedTokenIllegal:"Unexpected token ILLEGAL",UnknownLabel:"Undefined label '%0'",UnterminatedRegExp:"Invalid regular expression: missing /"}},function(e,t,n){" "
function i(e){return"0123456789abcdef".indexOf(e.toLowerCase())}function r(e){return"01234567".indexOf(e)}Object.defineProperty(t,"__esModule",{value:!0})
var o=n(9),a=n(4),s=n(11),u=function(){function e(e,t){this.source=e,this.errorHandler=t,this.trackComment=!1,this.length=e.length,this.index=0,this.lineNumber=e.length>0?1:0,this.lineStart=0,this.curlyStack=[]}return e.prototype.saveState=function(){return{index:this.index,lineNumber:this.lineNumber,lineStart:this.lineStart}},e.prototype.restoreState=function(e){this.index=e.index,this.lineNumber=e.lineNumber,this.lineStart=e.lineStart},e.prototype.eof=function(){return this.index>=this.length},e.prototype.throwUnexpectedToken=function(e){return void 0===e&&(e=s.Messages.UnexpectedTokenIllegal),this.errorHandler.throwError(this.index,this.lineNumber,this.index-this.lineStart+1,e)},e.prototype.tolerateUnexpectedToken=function(e){void 0===e&&(e=s.Messages.UnexpectedTokenIllegal),this.errorHandler.tolerateError(this.index,this.lineNumber,this.index-this.lineStart+1,e)},e.prototype.skipSingleLineComment=function(e){var t,n,i=[]
for(this.trackComment&&(i=[],t=this.index-e,n={start:{line:this.lineNumber,column:this.index-this.lineStart-e},end:{}});!this.eof();){var r=this.source.charCodeAt(this.index)
if(++this.index,a.Character.isLineTerminator(r)){if(this.trackComment){n.end={line:this.lineNumber,column:this.index-this.lineStart-1}
var o={multiLine:!1,slice:[t+e,this.index-1],range:[t,this.index-1],loc:n}
i.push(o)}return 13===r&&10===this.source.charCodeAt(this.index)&&++this.index,++this.lineNumber,this.lineStart=this.index,i}}if(this.trackComment){n.end={line:this.lineNumber,column:this.index-this.lineStart}
var o={multiLine:!1,slice:[t+e,this.index],range:[t,this.index],loc:n}
i.push(o)}return i},e.prototype.skipMultiLineComment=function(){var e,t,n=[]
for(this.trackComment&&(n=[],e=this.index-2,t={start:{line:this.lineNumber,column:this.index-this.lineStart-2},end:{}});!this.eof();){var i=this.source.charCodeAt(this.index)
if(a.Character.isLineTerminator(i))13===i&&10===this.source.charCodeAt(this.index+1)&&++this.index,++this.lineNumber,++this.index,this.lineStart=this.index
else if(42===i){if(47===this.source.charCodeAt(this.index+1)){if(this.index+=2,this.trackComment){t.end={line:this.lineNumber,column:this.index-this.lineStart}
var r={multiLine:!0,slice:[e+2,this.index-2],range:[e,this.index],loc:t}
n.push(r)}return n}++this.index}else++this.index}if(this.trackComment){t.end={line:this.lineNumber,column:this.index-this.lineStart}
var r={multiLine:!0,slice:[e+2,this.index],range:[e,this.index],loc:t}
n.push(r)}return this.tolerateUnexpectedToken(),n},e.prototype.scanComments=function(){var e
this.trackComment&&(e=[])
for(var t=0===this.index;!this.eof();){var n=this.source.charCodeAt(this.index)
if(a.Character.isWhiteSpace(n))++this.index
else if(a.Character.isLineTerminator(n))++this.index,13===n&&10===this.source.charCodeAt(this.index)&&++this.index,++this.lineNumber,this.lineStart=this.index,t=!0
else if(47===n)if(n=this.source.charCodeAt(this.index+1),47===n){this.index+=2
var i=this.skipSingleLineComment(2)
this.trackComment&&(e=e.concat(i)),t=!0}else{if(42!==n)break
this.index+=2
var i=this.skipMultiLineComment()
this.trackComment&&(e=e.concat(i))}else if(t&&45===n){if(45!==this.source.charCodeAt(this.index+1)||62!==this.source.charCodeAt(this.index+2))break
this.index+=3
var i=this.skipSingleLineComment(3)
this.trackComment&&(e=e.concat(i))}else{if(60!==n)break
if("!--"!==this.source.slice(this.index+1,this.index+4))break
this.index+=4
var i=this.skipSingleLineComment(4)
this.trackComment&&(e=e.concat(i))}}return e},e.prototype.isFutureReservedWord=function(e){switch(e){case"enum":case"export":case"import":case"super":return!0
default:return!1}},e.prototype.isStrictModeReservedWord=function(e){switch(e){case"implements":case"interface":case"package":case"private":case"protected":case"public":case"static":case"yield":case"let":return!0
default:return!1}},e.prototype.isRestrictedWord=function(e){return"eval"===e||"arguments"===e},e.prototype.isKeyword=function(e){switch(e.length){case 2:return"if"===e||"in"===e||"do"===e
case 3:return"var"===e||"for"===e||"new"===e||"try"===e||"let"===e
case 4:return"this"===e||"else"===e||"case"===e||"void"===e||"with"===e||"enum"===e
case 5:return"while"===e||"break"===e||"catch"===e||"throw"===e||"const"===e||"yield"===e||"class"===e||"super"===e
case 6:return"return"===e||"typeof"===e||"delete"===e||"switch"===e||"export"===e||"import"===e
case 7:return"default"===e||"finally"===e||"extends"===e
case 8:return"function"===e||"continue"===e||"debugger"===e
case 10:return"instanceof"===e
default:return!1}},e.prototype.codePointAt=function(e){var t=this.source.charCodeAt(e)
if(t>=55296&&56319>=t){var n=this.source.charCodeAt(e+1)
if(n>=56320&&57343>=n){var i=t
t=1024*(i-55296)+n-56320+65536}}return t},e.prototype.scanHexEscape=function(e){for(var t="u"===e?4:2,n=0,r=0;t>r;++r){if(this.eof()||!a.Character.isHexDigit(this.source.charCodeAt(this.index)))return null
n=16*n+i(this.source[this.index++])}return String.fromCharCode(n)},e.prototype.scanUnicodeCodePointEscape=function(){var e=this.source[this.index],t=0
for("}"===e&&this.throwUnexpectedToken();!this.eof()&&(e=this.source[this.index++],a.Character.isHexDigit(e.charCodeAt(0)));)t=16*t+i(e)
return(t>1114111||"}"!==e)&&this.throwUnexpectedToken(),a.Character.fromCodePoint(t)},e.prototype.getIdentifier=function(){for(var e=this.index++;!this.eof();){var t=this.source.charCodeAt(this.index)
if(92===t)return this.index=e,this.getComplexIdentifier()
if(t>=55296&&57343>t)return this.index=e,this.getComplexIdentifier()
if(!a.Character.isIdentifierPart(t))break;++this.index}return this.source.slice(e,this.index)},e.prototype.getComplexIdentifier=function(){var e=this.codePointAt(this.index),t=a.Character.fromCodePoint(e)
this.index+=t.length
var n
for(92===e&&(117!==this.source.charCodeAt(this.index)&&this.throwUnexpectedToken(),++this.index,"{"===this.source[this.index]?(++this.index,n=this.scanUnicodeCodePointEscape()):(n=this.scanHexEscape("u"),null!==n&&"\\"!==n&&a.Character.isIdentifierStart(n.charCodeAt(0))||this.throwUnexpectedToken()),t=n);!this.eof()&&(e=this.codePointAt(this.index),a.Character.isIdentifierPart(e));)n=a.Character.fromCodePoint(e),t+=n,this.index+=n.length,92===e&&(t=t.substr(0,t.length-1),117!==this.source.charCodeAt(this.index)&&this.throwUnexpectedToken(),++this.index,"{"===this.source[this.index]?(++this.index,n=this.scanUnicodeCodePointEscape()):(n=this.scanHexEscape("u"),null!==n&&"\\"!==n&&a.Character.isIdentifierPart(n.charCodeAt(0))||this.throwUnexpectedToken()),t+=n)
return t},e.prototype.octalToDecimal=function(e){var t="0"!==e,n=r(e)
return!this.eof()&&a.Character.isOctalDigit(this.source.charCodeAt(this.index))&&(t=!0,n=8*n+r(this.source[this.index++]),"0123".indexOf(e)>=0&&!this.eof()&&a.Character.isOctalDigit(this.source.charCodeAt(this.index))&&(n=8*n+r(this.source[this.index++]))),{code:n,octal:t}},e.prototype.scanIdentifier=function(){var e,t=this.index,n=92===this.source.charCodeAt(t)?this.getComplexIdentifier():this.getIdentifier()
if(e=1===n.length?3:this.isKeyword(n)?4:"null"===n?5:"true"===n||"false"===n?1:3,3!==e&&t+n.length!==this.index){var i=this.index
this.index=t,this.tolerateUnexpectedToken(s.Messages.InvalidEscapedReservedWord),this.index=i}return{type:e,value:n,lineNumber:this.lineNumber,lineStart:this.lineStart,start:t,end:this.index}},e.prototype.scanPunctuator=function(){var e=this.index,t=this.source[this.index]
switch(t){case"(":case"{":"{"===t&&this.curlyStack.push("{"),++this.index
break
case".":++this.index,"."===this.source[this.index]&&"."===this.source[this.index+1]&&(this.index+=2,t="...")
break
case"}":++this.index,this.curlyStack.pop()
break
case")":case";":case",":case"[":case"]":case":":case"?":case"~":++this.index
break
default:t=this.source.substr(this.index,4),">>>="===t?this.index+=4:(t=t.substr(0,3),"==="===t||"!=="===t||">>>"===t||"<<="===t||">>="===t||"**="===t?this.index+=3:(t=t.substr(0,2),"&&"===t||"||"===t||"=="===t||"!="===t||"+="===t||"-="===t||"*="===t||"/="===t||"++"===t||"--"===t||"<<"===t||">>"===t||"&="===t||"|="===t||"^="===t||"%="===t||"<="===t||">="===t||"=>"===t||"**"===t?this.index+=2:(t=this.source[this.index],"<>=!+-*%&|^/".indexOf(t)>=0&&++this.index)))}return this.index===e&&this.throwUnexpectedToken(),{type:7,value:t,lineNumber:this.lineNumber,lineStart:this.lineStart,start:e,end:this.index}},e.prototype.scanHexLiteral=function(e){for(var t="";!this.eof()&&a.Character.isHexDigit(this.source.charCodeAt(this.index));)t+=this.source[this.index++]
return 0===t.length&&this.throwUnexpectedToken(),a.Character.isIdentifierStart(this.source.charCodeAt(this.index))&&this.throwUnexpectedToken(),{type:6,value:parseInt("0x"+t,16),lineNumber:this.lineNumber,lineStart:this.lineStart,start:e,end:this.index}},e.prototype.scanBinaryLiteral=function(e){for(var t,n="";!this.eof()&&(t=this.source[this.index],"0"===t||"1"===t);)n+=this.source[this.index++]
return 0===n.length&&this.throwUnexpectedToken(),this.eof()||(t=this.source.charCodeAt(this.index),(a.Character.isIdentifierStart(t)||a.Character.isDecimalDigit(t))&&this.throwUnexpectedToken()),{type:6,value:parseInt(n,2),lineNumber:this.lineNumber,lineStart:this.lineStart,start:e,end:this.index}},e.prototype.scanOctalLiteral=function(e,t){var n="",i=!1
for(a.Character.isOctalDigit(e.charCodeAt(0))?(i=!0,n="0"+this.source[this.index++]):++this.index;!this.eof()&&a.Character.isOctalDigit(this.source.charCodeAt(this.index));)n+=this.source[this.index++]
return i||0!==n.length||this.throwUnexpectedToken(),(a.Character.isIdentifierStart(this.source.charCodeAt(this.index))||a.Character.isDecimalDigit(this.source.charCodeAt(this.index)))&&this.throwUnexpectedToken(),{type:6,value:parseInt(n,8),octal:i,lineNumber:this.lineNumber,lineStart:this.lineStart,start:t,end:this.index}},e.prototype.isImplicitOctalLiteral=function(){for(var e=this.index+1;e<this.length;++e){var t=this.source[e]
if("8"===t||"9"===t)return!1
if(!a.Character.isOctalDigit(t.charCodeAt(0)))return!0}return!0},e.prototype.scanNumericLiteral=function(){var e=this.index,t=this.source[e]
o.assert(a.Character.isDecimalDigit(t.charCodeAt(0))||"."===t,"Numeric literal must start with a decimal digit or a decimal point")
var n=""
if("."!==t){if(n=this.source[this.index++],t=this.source[this.index],"0"===n){if("x"===t||"X"===t)return++this.index,this.scanHexLiteral(e)
if("b"===t||"B"===t)return++this.index,this.scanBinaryLiteral(e)
if("o"===t||"O"===t)return this.scanOctalLiteral(t,e)
if(t&&a.Character.isOctalDigit(t.charCodeAt(0))&&this.isImplicitOctalLiteral())return this.scanOctalLiteral(t,e)}for(;a.Character.isDecimalDigit(this.source.charCodeAt(this.index));)n+=this.source[this.index++]
t=this.source[this.index]}if("."===t){for(n+=this.source[this.index++];a.Character.isDecimalDigit(this.source.charCodeAt(this.index));)n+=this.source[this.index++]
t=this.source[this.index]}if("e"===t||"E"===t)if(n+=this.source[this.index++],t=this.source[this.index],("+"===t||"-"===t)&&(n+=this.source[this.index++]),a.Character.isDecimalDigit(this.source.charCodeAt(this.index)))for(;a.Character.isDecimalDigit(this.source.charCodeAt(this.index));)n+=this.source[this.index++]
else this.throwUnexpectedToken()
return a.Character.isIdentifierStart(this.source.charCodeAt(this.index))&&this.throwUnexpectedToken(),{type:6,value:parseFloat(n),lineNumber:this.lineNumber,lineStart:this.lineStart,start:e,end:this.index}},e.prototype.scanStringLiteral=function(){var e=this.index,t=this.source[e]
o.assert("'"===t||'"'===t,"String literal must starts with a quote"),++this.index
for(var n=!1,i="";!this.eof();){var r=this.source[this.index++]
if(r===t){t=""
break}if("\\"===r)if(r=this.source[this.index++],r&&a.Character.isLineTerminator(r.charCodeAt(0)))++this.lineNumber,"\r"===r&&"\n"===this.source[this.index]&&++this.index,this.lineStart=this.index
else switch(r){case"u":if("{"===this.source[this.index])++this.index,i+=this.scanUnicodeCodePointEscape()
else{var u=this.scanHexEscape(r)
null===u&&this.throwUnexpectedToken(),i+=u}break
case"x":var c=this.scanHexEscape(r)
null===c&&this.throwUnexpectedToken(s.Messages.InvalidHexEscapeSequence),i+=c
break
case"n":i+="\n"
break
case"r":i+="\r"
break
case"t":i+="	"
break
case"b":i+="\b"
break
case"f":i+="\f"
break
case"v":i+="\x0B"
break
case"8":case"9":i+=r,this.tolerateUnexpectedToken()
break
default:if(r&&a.Character.isOctalDigit(r.charCodeAt(0))){var l=this.octalToDecimal(r)
n=l.octal||n,i+=String.fromCharCode(l.code)}else i+=r}else{if(a.Character.isLineTerminator(r.charCodeAt(0)))break
i+=r}}return""!==t&&(this.index=e,this.throwUnexpectedToken()),{type:8,value:i,octal:n,lineNumber:this.lineNumber,lineStart:this.lineStart,start:e,end:this.index}},e.prototype.scanTemplate=function(){var e="",t=!1,n=this.index,i="`"===this.source[n],r=!1,o=2
for(++this.index;!this.eof();){var u=this.source[this.index++]
if("`"===u){o=1,r=!0,t=!0
break}if("$"===u){if("{"===this.source[this.index]){this.curlyStack.push("${"),++this.index,t=!0
break}e+=u}else if("\\"===u)if(u=this.source[this.index++],a.Character.isLineTerminator(u.charCodeAt(0)))++this.lineNumber,"\r"===u&&"\n"===this.source[this.index]&&++this.index,this.lineStart=this.index
else switch(u){case"n":e+="\n"
break
case"r":e+="\r"
break
case"t":e+="	"
break
case"u":if("{"===this.source[this.index])++this.index,e+=this.scanUnicodeCodePointEscape()
else{var c=this.index,l=this.scanHexEscape(u)
null!==l?e+=l:(this.index=c,e+=u)}break
case"x":var p=this.scanHexEscape(u)
null===p&&this.throwUnexpectedToken(s.Messages.InvalidHexEscapeSequence),e+=p
break
case"b":e+="\b"
break
case"f":e+="\f"
break
case"v":e+="\x0B"
break
default:"0"===u?(a.Character.isDecimalDigit(this.source.charCodeAt(this.index))&&this.throwUnexpectedToken(s.Messages.TemplateOctalLiteral),e+="\x00"):a.Character.isOctalDigit(u.charCodeAt(0))?this.throwUnexpectedToken(s.Messages.TemplateOctalLiteral):e+=u}else a.Character.isLineTerminator(u.charCodeAt(0))?(++this.lineNumber,"\r"===u&&"\n"===this.source[this.index]&&++this.index,this.lineStart=this.index,e+="\n"):e+=u}return t||this.throwUnexpectedToken(),i||this.curlyStack.pop(),{type:10,value:this.source.slice(n+1,this.index-o),cooked:e,head:i,tail:r,lineNumber:this.lineNumber,lineStart:this.lineStart,start:n,end:this.index}},e.prototype.testRegExp=function(e,t){var n="￿",i=e,r=this
t.indexOf("u")>=0&&(i=i.replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g,function(e,t,i){var o=parseInt(t||i,16)
return o>1114111&&r.throwUnexpectedToken(s.Messages.InvalidRegExp),65535>=o?String.fromCharCode(o):n}).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,n))
try{RegExp(i)}catch(o){this.throwUnexpectedToken(s.Messages.InvalidRegExp)}try{return RegExp(e,t)}catch(a){return null}},e.prototype.scanRegExpBody=function(){var e=this.source[this.index]
o.assert("/"===e,"Regular expression literal must start with a slash")
for(var t=this.source[this.index++],n=!1,i=!1;!this.eof();)if(e=this.source[this.index++],t+=e,"\\"===e)e=this.source[this.index++],a.Character.isLineTerminator(e.charCodeAt(0))&&this.throwUnexpectedToken(s.Messages.UnterminatedRegExp),t+=e
else if(a.Character.isLineTerminator(e.charCodeAt(0)))this.throwUnexpectedToken(s.Messages.UnterminatedRegExp)
else if(n)"]"===e&&(n=!1)
else{if("/"===e){i=!0
break}"["===e&&(n=!0)}return i||this.throwUnexpectedToken(s.Messages.UnterminatedRegExp),t.substr(1,t.length-2)},e.prototype.scanRegExpFlags=function(){for(var e="",t="";!this.eof();){var n=this.source[this.index]
if(!a.Character.isIdentifierPart(n.charCodeAt(0)))break
if(++this.index,"\\"!==n||this.eof())t+=n,e+=n
else if(n=this.source[this.index],"u"===n){++this.index
var i=this.index,r=this.scanHexEscape("u")
if(null!==r)for(t+=r,e+="\\u";i<this.index;++i)e+=this.source[i]
else this.index=i,t+="u",e+="\\u"
this.tolerateUnexpectedToken()}else e+="\\",this.tolerateUnexpectedToken()}return t},e.prototype.scanRegExp=function(){var e=this.index,t=this.scanRegExpBody(),n=this.scanRegExpFlags(),i=this.testRegExp(t,n)
return{type:9,value:"",pattern:t,flags:n,regex:i,lineNumber:this.lineNumber,lineStart:this.lineStart,start:e,end:this.index}},e.prototype.lex=function(){if(this.eof())return{type:2,value:"",lineNumber:this.lineNumber,lineStart:this.lineStart,start:this.index,end:this.index}
var e=this.source.charCodeAt(this.index)
return a.Character.isIdentifierStart(e)?this.scanIdentifier():40===e||41===e||59===e?this.scanPunctuator():39===e||34===e?this.scanStringLiteral():46===e?a.Character.isDecimalDigit(this.source.charCodeAt(this.index+1))?this.scanNumericLiteral():this.scanPunctuator():a.Character.isDecimalDigit(e)?this.scanNumericLiteral():96===e||125===e&&"${"===this.curlyStack[this.curlyStack.length-1]?this.scanTemplate():e>=55296&&57343>e&&a.Character.isIdentifierStart(this.codePointAt(this.index))?this.scanIdentifier():this.scanPunctuator()},e}()
t.Scanner=u},function(e,t){" "
Object.defineProperty(t,"__esModule",{value:!0}),t.TokenName={},t.TokenName[1]="Boolean",t.TokenName[2]="<end>",t.TokenName[3]="Identifier",t.TokenName[4]="Keyword",t.TokenName[5]="Null",t.TokenName[6]="Numeric",t.TokenName[7]="Punctuator",t.TokenName[8]="String",t.TokenName[9]="RegularExpression",t.TokenName[10]="Template"},function(e,t){" "
Object.defineProperty(t,"__esModule",{value:!0}),t.XHTMLEntities={quot:'"',amp:"&",apos:"'",gt:">",nbsp:" ",iexcl:"¡",cent:"¢",pound:"£",curren:"¤",yen:"¥",brvbar:"¦",sect:"§",uml:"¨",copy:"©",ordf:"ª",laquo:"«",not:"¬",shy:"­",reg:"®",macr:"¯",deg:"°",plusmn:"±",sup2:"²",sup3:"³",acute:"´",micro:"µ",para:"¶",middot:"·",cedil:"¸",sup1:"¹",ordm:"º",raquo:"»",frac14:"¼",frac12:"½",frac34:"¾",iquest:"¿",Agrave:"À",Aacute:"Á",Acirc:"Â",Atilde:"Ã",Auml:"Ä",Aring:"Å",AElig:"Æ",Ccedil:"Ç",Egrave:"È",Eacute:"É",Ecirc:"Ê",Euml:"Ë",Igrave:"Ì",Iacute:"Í",Icirc:"Î",Iuml:"Ï",ETH:"Ð",Ntilde:"Ñ",Ograve:"Ò",Oacute:"Ó",Ocirc:"Ô",Otilde:"Õ",Ouml:"Ö",times:"×",Oslash:"Ø",Ugrave:"Ù",Uacute:"Ú",Ucirc:"Û",Uuml:"Ü",Yacute:"Ý",THORN:"Þ",szlig:"ß",agrave:"à",aacute:"á",acirc:"â",atilde:"ã",auml:"ä",aring:"å",aelig:"æ",ccedil:"ç",egrave:"è",eacute:"é",ecirc:"ê",euml:"ë",igrave:"ì",iacute:"í",icirc:"î",iuml:"ï",eth:"ð",ntilde:"ñ",ograve:"ò",oacute:"ó",ocirc:"ô",otilde:"õ",ouml:"ö",divide:"÷",oslash:"ø",ugrave:"ù",uacute:"ú",ucirc:"û",uuml:"ü",yacute:"ý",thorn:"þ",yuml:"ÿ",OElig:"Œ",oelig:"œ",Scaron:"Š",scaron:"š",Yuml:"Ÿ",fnof:"ƒ",circ:"ˆ",tilde:"˜",Alpha:"Α",Beta:"Β",Gamma:"Γ",Delta:"Δ",Epsilon:"Ε",Zeta:"Ζ",Eta:"Η",Theta:"Θ",Iota:"Ι",Kappa:"Κ",Lambda:"Λ",Mu:"Μ",Nu:"Ν",Xi:"Ξ",Omicron:"Ο",Pi:"Π",Rho:"Ρ",Sigma:"Σ",Tau:"Τ",Upsilon:"Υ",Phi:"Φ",Chi:"Χ",Psi:"Ψ",Omega:"Ω",alpha:"α",beta:"β",gamma:"γ",delta:"δ",epsilon:"ε",zeta:"ζ",eta:"η",theta:"θ",iota:"ι",kappa:"κ",lambda:"λ",mu:"μ",nu:"ν",xi:"ξ",omicron:"ο",pi:"π",rho:"ρ",sigmaf:"ς",sigma:"σ",tau:"τ",upsilon:"υ",phi:"φ",chi:"χ",psi:"ψ",omega:"ω",thetasym:"ϑ",upsih:"ϒ",piv:"ϖ",ensp:" ",emsp:" ",thinsp:" ",zwnj:"‌",zwj:"‍",lrm:"‎",rlm:"‏",ndash:"–",mdash:"—",lsquo:"‘",rsquo:"’",sbquo:"‚",ldquo:"“",rdquo:"”",bdquo:"„",dagger:"†",Dagger:"‡",bull:"•",hellip:"…",permil:"‰",prime:"′",Prime:"″",lsaquo:"‹",rsaquo:"›",oline:"‾",frasl:"⁄",euro:"€",image:"ℑ",weierp:"℘",real:"ℜ",trade:"™",alefsym:"ℵ",larr:"←",uarr:"↑",rarr:"→",darr:"↓",harr:"↔",crarr:"↵",lArr:"⇐",uArr:"⇑",rArr:"⇒",dArr:"⇓",hArr:"⇔",forall:"∀",part:"∂",exist:"∃",empty:"∅",nabla:"∇",isin:"∈",notin:"∉",ni:"∋",prod:"∏",sum:"∑",minus:"−",lowast:"∗",radic:"√",prop:"∝",infin:"∞",ang:"∠",and:"∧",or:"∨",cap:"∩",cup:"∪","int":"∫",there4:"∴",sim:"∼",cong:"≅",asymp:"≈",ne:"≠",equiv:"≡",le:"≤",ge:"≥",sub:"⊂",sup:"⊃",nsub:"⊄",sube:"⊆",supe:"⊇",oplus:"⊕",otimes:"⊗",perp:"⊥",sdot:"⋅",lceil:"⌈",rceil:"⌉",lfloor:"⌊",rfloor:"⌋",loz:"◊",spades:"♠",clubs:"♣",hearts:"♥",diams:"♦",lang:"⟨",rang:"⟩"}},function(e,t,n){" "
Object.defineProperty(t,"__esModule",{value:!0})
var i=n(10),r=n(12),o=n(13),a=function(){function e(){this.values=[],this.curly=this.paren=-1}return e.prototype.beforeFunctionExpression=function(e){return["(","{","[","in","typeof","instanceof","new","return","case","delete","throw","void","=","+=","-=","*=","**=","/=","%=","<<=",">>=",">>>=","&=","|=","^=",",","+","-","*","**","/","%","++","--","<<",">>",">>>","&","|","^","!","~","&&","||","?",":","===","==",">=","<=","<",">","!=","!=="].indexOf(e)>=0},e.prototype.isRegexStart=function(){var e=this.values[this.values.length-1],t=null!==e
switch(e){case"this":case"]":t=!1
break
case")":var n=this.values[this.paren-1]
t="if"===n||"while"===n||"for"===n||"with"===n
break
case"}":if(t=!1,"function"===this.values[this.curly-3]){var i=this.values[this.curly-4]
t=i?!this.beforeFunctionExpression(i):!1}else if("function"===this.values[this.curly-4]){var i=this.values[this.curly-5]
t=i?!this.beforeFunctionExpression(i):!0}}return t},e.prototype.push=function(e){7===e.type||4===e.type?("{"===e.value?this.curly=this.values.length:"("===e.value&&(this.paren=this.values.length),this.values.push(e.value)):this.values.push(null)},e}(),s=function(){function e(e,t){this.errorHandler=new i.ErrorHandler,this.errorHandler.tolerant=t?"boolean"==typeof t.tolerant&&t.tolerant:!1,this.scanner=new r.Scanner(e,this.errorHandler),this.scanner.trackComment=t?"boolean"==typeof t.comment&&t.comment:!1,this.trackRange=t?"boolean"==typeof t.range&&t.range:!1,this.trackLoc=t?"boolean"==typeof t.loc&&t.loc:!1,this.buffer=[],this.reader=new a}return e.prototype.errors=function(){return this.errorHandler.errors},e.prototype.getNextToken=function(){if(0===this.buffer.length){var e=this.scanner.scanComments()
if(this.scanner.trackComment)for(var t=0;t<e.length;++t){var n=e[t],i=this.scanner.source.slice(n.slice[0],n.slice[1]),r={type:n.multiLine?"BlockComment":"LineComment",value:i}
this.trackRange&&(r.range=n.range),this.trackLoc&&(r.loc=n.loc),this.buffer.push(r)}if(!this.scanner.eof()){var a=void 0
this.trackLoc&&(a={start:{line:this.scanner.lineNumber,column:this.scanner.index-this.scanner.lineStart},end:{}})
var s="/"===this.scanner.source[this.scanner.index]&&this.reader.isRegexStart(),u=s?this.scanner.scanRegExp():this.scanner.lex()
this.reader.push(u)
var c={type:o.TokenName[u.type],value:this.scanner.source.slice(u.start,u.end)}
if(this.trackRange&&(c.range=[u.start,u.end]),this.trackLoc&&(a.end={line:this.scanner.lineNumber,column:this.scanner.index-this.scanner.lineStart},c.loc=a),9===u.type){var l=u.pattern,p=u.flags
c.regex={pattern:l,flags:p}}this.buffer.push(c)}}return this.buffer.shift()},e}()
t.Tokenizer=s}])}),define("esprimaAdapter",["./esprima","env"],function(e,t){return"xpconnect"===t.get()&&"undefined"!=typeof Reflect?Reflect:e}),function(e,t){var n,i
"object"==typeof n&&"object"==typeof i?i.exports=t():"function"==typeof define&&define.amd?define("source-map",[],t):"object"==typeof n?n.sourceMap=t():e.sourceMap=t()}(this,function(){return function(e){function t(i){if(n[i])return n[i].exports
var r=n[i]={exports:{},id:i,loaded:!1}
return e[i].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={}
return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){t.SourceMapGenerator=n(1).SourceMapGenerator,t.SourceMapConsumer=n(7).SourceMapConsumer,t.SourceNode=n(10).SourceNode},function(e,t,n){function i(e){e||(e={}),this._file=o.getArg(e,"file",null),this._sourceRoot=o.getArg(e,"sourceRoot",null),this._skipValidation=o.getArg(e,"skipValidation",!1),this._sources=new a,this._names=new a,this._mappings=new s,this._sourcesContents=null}var r=n(2),o=n(4),a=n(5).ArraySet,s=n(6).MappingList
i.prototype._version=3,i.fromSourceMap=function(e){var t=e.sourceRoot,n=new i({file:e.file,sourceRoot:t})
return e.eachMapping(function(e){var i={generated:{line:e.generatedLine,column:e.generatedColumn}}
null!=e.source&&(i.source=e.source,null!=t&&(i.source=o.relative(t,i.source)),i.original={line:e.originalLine,column:e.originalColumn},null!=e.name&&(i.name=e.name)),n.addMapping(i)}),e.sources.forEach(function(t){var i=e.sourceContentFor(t)
null!=i&&n.setSourceContent(t,i)}),n},i.prototype.addMapping=function(e){var t=o.getArg(e,"generated"),n=o.getArg(e,"original",null),i=o.getArg(e,"source",null),r=o.getArg(e,"name",null)
this._skipValidation||this._validateMapping(t,n,i,r),null!=i&&(i+="",this._sources.has(i)||this._sources.add(i)),null!=r&&(r+="",this._names.has(r)||this._names.add(r)),this._mappings.add({generatedLine:t.line,generatedColumn:t.column,originalLine:null!=n&&n.line,originalColumn:null!=n&&n.column,source:i,name:r})},i.prototype.setSourceContent=function(e,t){var n=e
null!=this._sourceRoot&&(n=o.relative(this._sourceRoot,n)),null!=t?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[o.toSetString(n)]=t):this._sourcesContents&&(delete this._sourcesContents[o.toSetString(n)],0===Object.keys(this._sourcesContents).length&&(this._sourcesContents=null))},i.prototype.applySourceMap=function(e,t,n){var i=t
if(null==t){if(null==e.file)throw Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\'s "file" property. Both were omitted.')
i=e.file}var r=this._sourceRoot
null!=r&&(i=o.relative(r,i))
var s=new a,u=new a
this._mappings.unsortedForEach(function(t){if(t.source===i&&null!=t.originalLine){var a=e.originalPositionFor({line:t.originalLine,column:t.originalColumn})
null!=a.source&&(t.source=a.source,null!=n&&(t.source=o.join(n,t.source)),null!=r&&(t.source=o.relative(r,t.source)),t.originalLine=a.line,t.originalColumn=a.column,null!=a.name&&(t.name=a.name))}var c=t.source
null==c||s.has(c)||s.add(c)
var l=t.name
null==l||u.has(l)||u.add(l)},this),this._sources=s,this._names=u,e.sources.forEach(function(t){var i=e.sourceContentFor(t)
null!=i&&(null!=n&&(t=o.join(n,t)),null!=r&&(t=o.relative(r,t)),this.setSourceContent(t,i))},this)},i.prototype._validateMapping=function(e,t,n,i){if((!(e&&"line"in e&&"column"in e&&e.line>0&&e.column>=0)||t||n||i)&&!(e&&"line"in e&&"column"in e&&t&&"line"in t&&"column"in t&&e.line>0&&e.column>=0&&t.line>0&&t.column>=0&&n))throw Error("Invalid mapping: "+JSON.stringify({generated:e,source:n,original:t,name:i}))},i.prototype._serializeMappings=function(){for(var e,t,n,i,a=0,s=1,u=0,c=0,l=0,p=0,f="",h=this._mappings.toArray(),d=0,m=h.length;m>d;d++){if(t=h[d],e="",t.generatedLine!==s)for(a=0;t.generatedLine!==s;)e+=";",s++
else if(d>0){if(!o.compareByGeneratedPositionsInflated(t,h[d-1]))continue
e+=","}e+=r.encode(t.generatedColumn-a),a=t.generatedColumn,null!=t.source&&(i=this._sources.indexOf(t.source),e+=r.encode(i-p),p=i,e+=r.encode(t.originalLine-1-c),c=t.originalLine-1,e+=r.encode(t.originalColumn-u),u=t.originalColumn,null!=t.name&&(n=this._names.indexOf(t.name),e+=r.encode(n-l),l=n)),f+=e}return f},i.prototype._generateSourcesContent=function(e,t){return e.map(function(e){if(!this._sourcesContents)return null
null!=t&&(e=o.relative(t,e))
var n=o.toSetString(e)
return Object.prototype.hasOwnProperty.call(this._sourcesContents,n)?this._sourcesContents[n]:null},this)},i.prototype.toJSON=function(){var e={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()}
return null!=this._file&&(e.file=this._file),null!=this._sourceRoot&&(e.sourceRoot=this._sourceRoot),this._sourcesContents&&(e.sourcesContent=this._generateSourcesContent(e.sources,e.sourceRoot)),e},i.prototype.toString=function(){return JSON.stringify(this.toJSON())},t.SourceMapGenerator=i},function(e,t,n){function i(e){return 0>e?(-e<<1)+1:(e<<1)+0}function r(e){var t=1===(1&e),n=e>>1
return t?-n:n}var o=n(3),a=5,s=1<<a,u=s-1,c=s
t.encode=function(e){var t,n="",r=i(e)
do t=r&u,r>>>=a,r>0&&(t|=c),n+=o.encode(t)
while(r>0)
return n},t.decode=function(e,t,n){var i,s,l=e.length,p=0,f=0
do{if(t>=l)throw Error("Expected more digits in base 64 VLQ value.")
if(s=o.decode(e.charCodeAt(t++)),-1===s)throw Error("Invalid base64 digit: "+e.charAt(t-1))
i=!!(s&c),s&=u,p+=s<<f,f+=a}while(i)
n.value=r(p),n.rest=t}},function(e,t){var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("")
t.encode=function(e){if(e>=0&&e<n.length)return n[e]
throw new TypeError("Must be between 0 and 63: "+e)},t.decode=function(e){var t=65,n=90,i=97,r=122,o=48,a=57,s=43,u=47,c=26,l=52
return e>=t&&n>=e?e-t:e>=i&&r>=e?e-i+c:e>=o&&a>=e?e-o+l:e==s?62:e==u?63:-1}},function(e,t){function n(e,t,n){if(t in e)return e[t]
if(3===arguments.length)return n
throw Error('"'+t+'" is a required argument.')}function i(e){var t=e.match(g)
return t?{scheme:t[1],auth:t[2],host:t[3],port:t[4],path:t[5]}:null}function r(e){var t=""
return e.scheme&&(t+=e.scheme+":"),t+="//",e.auth&&(t+=e.auth+"@"),e.host&&(t+=e.host),e.port&&(t+=":"+e.port),e.path&&(t+=e.path),t}function o(e){var n=e,o=i(e)
if(o){if(!o.path)return e
n=o.path}for(var a,s=t.isAbsolute(n),u=n.split(/\/+/),c=0,l=u.length-1;l>=0;l--)a=u[l],"."===a?u.splice(l,1):".."===a?c++:c>0&&(""===a?(u.splice(l+1,c),c=0):(u.splice(l,2),c--))
return n=u.join("/"),""===n&&(n=s?"/":"."),o?(o.path=n,r(o)):n}function a(e,t){""===e&&(e="."),""===t&&(t=".")
var n=i(t),a=i(e)
if(a&&(e=a.path||"/"),n&&!n.scheme)return a&&(n.scheme=a.scheme),r(n)
if(n||t.match(v))return t
if(a&&!a.host&&!a.path)return a.host=t,r(a)
var s="/"===t.charAt(0)?t:o(e.replace(/\/+$/,"")+"/"+t)
return a?(a.path=s,r(a)):s}function s(e,t){""===e&&(e="."),e=e.replace(/\/$/,"")
for(var n=0;0!==t.indexOf(e+"/");){var i=e.lastIndexOf("/")
if(0>i)return t
if(e=e.slice(0,i),e.match(/^([^\/]+:\/)?\/*$/))return t;++n}return Array(n+1).join("../")+t.substr(e.length+1)}function u(e){return e}function c(e){return p(e)?"$"+e:e}function l(e){return p(e)?e.slice(1):e}function p(e){if(!e)return!1
var t=e.length
if(9>t)return!1
if(95!==e.charCodeAt(t-1)||95!==e.charCodeAt(t-2)||111!==e.charCodeAt(t-3)||116!==e.charCodeAt(t-4)||111!==e.charCodeAt(t-5)||114!==e.charCodeAt(t-6)||112!==e.charCodeAt(t-7)||95!==e.charCodeAt(t-8)||95!==e.charCodeAt(t-9))return!1
for(var n=t-10;n>=0;n--)if(36!==e.charCodeAt(n))return!1
return!0}function f(e,t,n){var i=e.source-t.source
return 0!==i?i:(i=e.originalLine-t.originalLine,0!==i?i:(i=e.originalColumn-t.originalColumn,0!==i||n?i:(i=e.generatedColumn-t.generatedColumn,0!==i?i:(i=e.generatedLine-t.generatedLine,0!==i?i:e.name-t.name))))}function h(e,t,n){var i=e.generatedLine-t.generatedLine
return 0!==i?i:(i=e.generatedColumn-t.generatedColumn,0!==i||n?i:(i=e.source-t.source,0!==i?i:(i=e.originalLine-t.originalLine,0!==i?i:(i=e.originalColumn-t.originalColumn,0!==i?i:e.name-t.name))))}function d(e,t){return e===t?0:e>t?1:-1}function m(e,t){var n=e.generatedLine-t.generatedLine
return 0!==n?n:(n=e.generatedColumn-t.generatedColumn,0!==n?n:(n=d(e.source,t.source),0!==n?n:(n=e.originalLine-t.originalLine,0!==n?n:(n=e.originalColumn-t.originalColumn,0!==n?n:d(e.name,t.name)))))}t.getArg=n
var g=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/,v=/^data:.+\,.+$/
t.urlParse=i,t.urlGenerate=r,t.normalize=o,t.join=a,t.isAbsolute=function(e){return"/"===e.charAt(0)||!!e.match(g)},t.relative=s
var x=function(){var e=Object.create(null)
return!("__proto__"in e)}()
t.toSetString=x?u:c,t.fromSetString=x?u:l,t.compareByOriginalPositions=f,t.compareByGeneratedPositionsDeflated=h,t.compareByGeneratedPositionsInflated=m},function(e,t,n){function i(){this._array=[],this._set=Object.create(null)}var r=n(4),o=Object.prototype.hasOwnProperty
i.fromArray=function(e,t){for(var n=new i,r=0,o=e.length;o>r;r++)n.add(e[r],t)
return n},i.prototype.size=function(){return Object.getOwnPropertyNames(this._set).length},i.prototype.add=function(e,t){var n=r.toSetString(e),i=o.call(this._set,n),a=this._array.length;(!i||t)&&this._array.push(e),i||(this._set[n]=a)},i.prototype.has=function(e){var t=r.toSetString(e)
return o.call(this._set,t)},i.prototype.indexOf=function(e){var t=r.toSetString(e)
if(o.call(this._set,t))return this._set[t]
throw Error('"'+e+'" is not in the set.')},i.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e]
throw Error("No element indexed by "+e)},i.prototype.toArray=function(){return this._array.slice()},t.ArraySet=i},function(e,t,n){function i(e,t){var n=e.generatedLine,i=t.generatedLine,r=e.generatedColumn,a=t.generatedColumn
return i>n||i==n&&a>=r||o.compareByGeneratedPositionsInflated(e,t)<=0}function r(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}var o=n(4)
r.prototype.unsortedForEach=function(e,t){this._array.forEach(e,t)},r.prototype.add=function(e){i(this._last,e)?(this._last=e,this._array.push(e)):(this._sorted=!1,this._array.push(e))},r.prototype.toArray=function(){return this._sorted||(this._array.sort(o.compareByGeneratedPositionsInflated),this._sorted=!0),this._array},t.MappingList=r},function(e,t,n){function i(e){var t=e
return"string"==typeof e&&(t=JSON.parse(e.replace(/^\)\]\}'/,""))),null!=t.sections?new a(t):new r(t)}function r(e){var t=e
"string"==typeof e&&(t=JSON.parse(e.replace(/^\)\]\}'/,"")))
var n=s.getArg(t,"version"),i=s.getArg(t,"sources"),r=s.getArg(t,"names",[]),o=s.getArg(t,"sourceRoot",null),a=s.getArg(t,"sourcesContent",null),u=s.getArg(t,"mappings"),l=s.getArg(t,"file",null)
if(n!=this._version)throw Error("Unsupported version: "+n)
i=i.map(String).map(s.normalize).map(function(e){return o&&s.isAbsolute(o)&&s.isAbsolute(e)?s.relative(o,e):e}),this._names=c.fromArray(r.map(String),!0),this._sources=c.fromArray(i,!0),this.sourceRoot=o,this.sourcesContent=a,this._mappings=u,this.file=l}function o(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}function a(e){var t=e
"string"==typeof e&&(t=JSON.parse(e.replace(/^\)\]\}'/,"")))
var n=s.getArg(t,"version"),r=s.getArg(t,"sections")
if(n!=this._version)throw Error("Unsupported version: "+n)
this._sources=new c,this._names=new c
var o={line:-1,column:0}
this._sections=r.map(function(e){if(e.url)throw Error("Support for url field in sections not implemented.")
var t=s.getArg(e,"offset"),n=s.getArg(t,"line"),r=s.getArg(t,"column")
if(n<o.line||n===o.line&&r<o.column)throw Error("Section offsets must be ordered and non-overlapping.")
return o=t,{generatedOffset:{generatedLine:n+1,generatedColumn:r+1},consumer:new i(s.getArg(e,"map"))}})}var s=n(4),u=n(8),c=n(5).ArraySet,l=n(2),p=n(9).quickSort
i.fromSourceMap=function(e){return r.fromSourceMap(e)},i.prototype._version=3,i.prototype.__generatedMappings=null,Object.defineProperty(i.prototype,"_generatedMappings",{get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}}),i.prototype.__originalMappings=null,Object.defineProperty(i.prototype,"_originalMappings",{get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}}),i.prototype._charIsMappingSeparator=function(e,t){var n=e.charAt(t)
return";"===n||","===n},i.prototype._parseMappings=function(e,t){throw Error("Subclasses must implement _parseMappings")},i.GENERATED_ORDER=1,i.ORIGINAL_ORDER=2,i.GREATEST_LOWER_BOUND=1,i.LEAST_UPPER_BOUND=2,i.prototype.eachMapping=function(e,t,n){var r,o=t||null,a=n||i.GENERATED_ORDER
switch(a){case i.GENERATED_ORDER:r=this._generatedMappings
break
case i.ORIGINAL_ORDER:r=this._originalMappings
break
default:throw Error("Unknown order of iteration.")}var u=this.sourceRoot
r.map(function(e){var t=null===e.source?null:this._sources.at(e.source)
return null!=t&&null!=u&&(t=s.join(u,t)),{source:t,generatedLine:e.generatedLine,generatedColumn:e.generatedColumn,originalLine:e.originalLine,originalColumn:e.originalColumn,name:null===e.name?null:this._names.at(e.name)}},this).forEach(e,o)},i.prototype.allGeneratedPositionsFor=function(e){var t=s.getArg(e,"line"),n={source:s.getArg(e,"source"),originalLine:t,originalColumn:s.getArg(e,"column",0)}
if(null!=this.sourceRoot&&(n.source=s.relative(this.sourceRoot,n.source)),!this._sources.has(n.source))return[]
n.source=this._sources.indexOf(n.source)
var i=[],r=this._findMapping(n,this._originalMappings,"originalLine","originalColumn",s.compareByOriginalPositions,u.LEAST_UPPER_BOUND)
if(r>=0){var o=this._originalMappings[r]
if(void 0===e.column)for(var a=o.originalLine;o&&o.originalLine===a;)i.push({line:s.getArg(o,"generatedLine",null),column:s.getArg(o,"generatedColumn",null),lastColumn:s.getArg(o,"lastGeneratedColumn",null)}),o=this._originalMappings[++r]
else for(var c=o.originalColumn;o&&o.originalLine===t&&o.originalColumn==c;)i.push({line:s.getArg(o,"generatedLine",null),column:s.getArg(o,"generatedColumn",null),lastColumn:s.getArg(o,"lastGeneratedColumn",null)}),o=this._originalMappings[++r]}return i},t.SourceMapConsumer=i,r.prototype=Object.create(i.prototype),r.prototype.consumer=i,r.fromSourceMap=function(e){var t=Object.create(r.prototype),n=t._names=c.fromArray(e._names.toArray(),!0),i=t._sources=c.fromArray(e._sources.toArray(),!0)
t.sourceRoot=e._sourceRoot,t.sourcesContent=e._generateSourcesContent(t._sources.toArray(),t.sourceRoot),t.file=e._file
for(var a=e._mappings.toArray().slice(),u=t.__generatedMappings=[],l=t.__originalMappings=[],f=0,h=a.length;h>f;f++){var d=a[f],m=new o
m.generatedLine=d.generatedLine,m.generatedColumn=d.generatedColumn,d.source&&(m.source=i.indexOf(d.source),m.originalLine=d.originalLine,m.originalColumn=d.originalColumn,d.name&&(m.name=n.indexOf(d.name)),l.push(m)),u.push(m)}return p(t.__originalMappings,s.compareByOriginalPositions),t},r.prototype._version=3,Object.defineProperty(r.prototype,"sources",{get:function(){return this._sources.toArray().map(function(e){return null!=this.sourceRoot?s.join(this.sourceRoot,e):e},this)}}),r.prototype._parseMappings=function(e,t){for(var n,i,r,a,u,c=1,f=0,h=0,d=0,m=0,g=0,v=e.length,x=0,y={},D={},b=[],E=[];v>x;)if(";"===e.charAt(x))c++,x++,f=0
else if(","===e.charAt(x))x++
else{for(n=new o,n.generatedLine=c,a=x;v>a&&!this._charIsMappingSeparator(e,a);a++);if(i=e.slice(x,a),r=y[i])x+=i.length
else{for(r=[];a>x;)l.decode(e,x,D),u=D.value,x=D.rest,r.push(u)
if(2===r.length)throw Error("Found a source, but no line and column")
if(3===r.length)throw Error("Found a source and line, but no column")
y[i]=r}n.generatedColumn=f+r[0],f=n.generatedColumn,r.length>1&&(n.source=m+r[1],m+=r[1],n.originalLine=h+r[2],h=n.originalLine,n.originalLine+=1,n.originalColumn=d+r[3],d=n.originalColumn,r.length>4&&(n.name=g+r[4],g+=r[4])),E.push(n),"number"==typeof n.originalLine&&b.push(n)}p(E,s.compareByGeneratedPositionsDeflated),this.__generatedMappings=E,p(b,s.compareByOriginalPositions),this.__originalMappings=b},r.prototype._findMapping=function(e,t,n,i,r,o){if(e[n]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[n])
if(e[i]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[i])
return u.search(e,t,r,o)},r.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var t=this._generatedMappings[e]
if(e+1<this._generatedMappings.length){var n=this._generatedMappings[e+1]
if(t.generatedLine===n.generatedLine){t.lastGeneratedColumn=n.generatedColumn-1
continue}}t.lastGeneratedColumn=1/0}},r.prototype.originalPositionFor=function(e){var t={generatedLine:s.getArg(e,"line"),generatedColumn:s.getArg(e,"column")},n=this._findMapping(t,this._generatedMappings,"generatedLine","generatedColumn",s.compareByGeneratedPositionsDeflated,s.getArg(e,"bias",i.GREATEST_LOWER_BOUND))
if(n>=0){var r=this._generatedMappings[n]
if(r.generatedLine===t.generatedLine){var o=s.getArg(r,"source",null)
null!==o&&(o=this._sources.at(o),null!=this.sourceRoot&&(o=s.join(this.sourceRoot,o)))
var a=s.getArg(r,"name",null)
return null!==a&&(a=this._names.at(a)),{source:o,line:s.getArg(r,"originalLine",null),column:s.getArg(r,"originalColumn",null),name:a}}}return{source:null,line:null,column:null,name:null}},r.prototype.hasContentsOfAllSources=function(){return this.sourcesContent?this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(e){return null==e}):!1},r.prototype.sourceContentFor=function(e,t){if(!this.sourcesContent)return null
if(null!=this.sourceRoot&&(e=s.relative(this.sourceRoot,e)),this._sources.has(e))return this.sourcesContent[this._sources.indexOf(e)]
var n
if(null!=this.sourceRoot&&(n=s.urlParse(this.sourceRoot))){var i=e.replace(/^file:\/\//,"")
if("file"==n.scheme&&this._sources.has(i))return this.sourcesContent[this._sources.indexOf(i)]
if((!n.path||"/"==n.path)&&this._sources.has("/"+e))return this.sourcesContent[this._sources.indexOf("/"+e)]}if(t)return null
throw Error('"'+e+'" is not in the SourceMap.')},r.prototype.generatedPositionFor=function(e){var t=s.getArg(e,"source")
if(null!=this.sourceRoot&&(t=s.relative(this.sourceRoot,t)),!this._sources.has(t))return{line:null,column:null,lastColumn:null}
t=this._sources.indexOf(t)
var n={source:t,originalLine:s.getArg(e,"line"),originalColumn:s.getArg(e,"column")},r=this._findMapping(n,this._originalMappings,"originalLine","originalColumn",s.compareByOriginalPositions,s.getArg(e,"bias",i.GREATEST_LOWER_BOUND))
if(r>=0){var o=this._originalMappings[r]
if(o.source===n.source)return{line:s.getArg(o,"generatedLine",null),column:s.getArg(o,"generatedColumn",null),lastColumn:s.getArg(o,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}},t.BasicSourceMapConsumer=r,a.prototype=Object.create(i.prototype),a.prototype.constructor=i,a.prototype._version=3,Object.defineProperty(a.prototype,"sources",{get:function(){for(var e=[],t=0;t<this._sections.length;t++)for(var n=0;n<this._sections[t].consumer.sources.length;n++)e.push(this._sections[t].consumer.sources[n])
return e}}),a.prototype.originalPositionFor=function(e){var t={generatedLine:s.getArg(e,"line"),generatedColumn:s.getArg(e,"column")},n=u.search(t,this._sections,function(e,t){var n=e.generatedLine-t.generatedOffset.generatedLine
return n?n:e.generatedColumn-t.generatedOffset.generatedColumn}),i=this._sections[n]
return i?i.consumer.originalPositionFor({line:t.generatedLine-(i.generatedOffset.generatedLine-1),column:t.generatedColumn-(i.generatedOffset.generatedLine===t.generatedLine?i.generatedOffset.generatedColumn-1:0),bias:e.bias}):{source:null,line:null,column:null,name:null}},a.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(e){return e.consumer.hasContentsOfAllSources()})},a.prototype.sourceContentFor=function(e,t){for(var n=0;n<this._sections.length;n++){var i=this._sections[n],r=i.consumer.sourceContentFor(e,!0)
if(r)return r}if(t)return null
throw Error('"'+e+'" is not in the SourceMap.')},a.prototype.generatedPositionFor=function(e){for(var t=0;t<this._sections.length;t++){var n=this._sections[t]
if(-1!==n.consumer.sources.indexOf(s.getArg(e,"source"))){var i=n.consumer.generatedPositionFor(e)
if(i){var r={line:i.line+(n.generatedOffset.generatedLine-1),column:i.column+(n.generatedOffset.generatedLine===i.line?n.generatedOffset.generatedColumn-1:0)}
return r}}}return{line:null,column:null}},a.prototype._parseMappings=function(e,t){this.__generatedMappings=[],this.__originalMappings=[]
for(var n=0;n<this._sections.length;n++)for(var i=this._sections[n],r=i.consumer._generatedMappings,o=0;o<r.length;o++){var a=r[o],u=i.consumer._sources.at(a.source)
null!==i.consumer.sourceRoot&&(u=s.join(i.consumer.sourceRoot,u)),this._sources.add(u),u=this._sources.indexOf(u)
var c=i.consumer._names.at(a.name)
this._names.add(c),c=this._names.indexOf(c)
var l={source:u,generatedLine:a.generatedLine+(i.generatedOffset.generatedLine-1),generatedColumn:a.generatedColumn+(i.generatedOffset.generatedLine===a.generatedLine?i.generatedOffset.generatedColumn-1:0),originalLine:a.originalLine,originalColumn:a.originalColumn,name:c}
this.__generatedMappings.push(l),"number"==typeof l.originalLine&&this.__originalMappings.push(l)}p(this.__generatedMappings,s.compareByGeneratedPositionsDeflated),p(this.__originalMappings,s.compareByOriginalPositions)},t.IndexedSourceMapConsumer=a},function(e,t){function n(e,i,r,o,a,s){var u=Math.floor((i-e)/2)+e,c=a(r,o[u],!0)
return 0===c?u:c>0?i-u>1?n(u,i,r,o,a,s):s==t.LEAST_UPPER_BOUND?i<o.length?i:-1:u:u-e>1?n(e,u,r,o,a,s):s==t.LEAST_UPPER_BOUND?u:0>e?-1:e}t.GREATEST_LOWER_BOUND=1,t.LEAST_UPPER_BOUND=2,t.search=function(e,i,r,o){if(0===i.length)return-1
var a=n(-1,i.length,e,i,r,o||t.GREATEST_LOWER_BOUND)
if(0>a)return-1
for(;a-1>=0&&0===r(i[a],i[a-1],!0);)--a
return a}},function(e,t){function n(e,t,n){var i=e[t]
e[t]=e[n],e[n]=i}function i(e,t){return Math.round(e+Math.random()*(t-e))}function r(e,t,o,a){if(a>o){var s=i(o,a),u=o-1
n(e,s,a)
for(var c=e[a],l=o;a>l;l++)t(e[l],c)<=0&&(u+=1,n(e,u,l))
n(e,u+1,l)
var p=u+1
r(e,t,o,p-1),r(e,t,p+1,a)}}t.quickSort=function(e,t){r(e,t,0,e.length-1)}},function(e,t,n){function i(e,t,n,i,r){this.children=[],this.sourceContents={},this.line=null==e?null:e,this.column=null==t?null:t,this.source=null==n?null:n,this.name=null==r?null:r,this[u]=!0,null!=i&&this.add(i)}var r=n(1).SourceMapGenerator,o=n(4),a=/(\r?\n)/,s=10,u="$$$isSourceNode$$$"
i.fromStringWithSourceMap=function(e,t,n){function r(e,t){if(null===e||void 0===e.source)s.add(t)
else{var r=n?o.join(n,e.source):e.source
s.add(new i(e.originalLine,e.originalColumn,r,t,e.name))}}var s=new i,u=e.split(a),c=function(){var e=u.shift(),t=u.shift()||""
return e+t},l=1,p=0,f=null
return t.eachMapping(function(e){if(null!==f){if(!(l<e.generatedLine)){var t=u[0],n=t.substr(0,e.generatedColumn-p)
return u[0]=t.substr(e.generatedColumn-p),p=e.generatedColumn,r(f,n),void(f=e)}r(f,c()),l++,p=0}for(;l<e.generatedLine;)s.add(c()),l++
if(p<e.generatedColumn){var t=u[0]
s.add(t.substr(0,e.generatedColumn)),u[0]=t.substr(e.generatedColumn),p=e.generatedColumn}f=e},this),u.length>0&&(f&&r(f,c()),s.add(u.join(""))),t.sources.forEach(function(e){var i=t.sourceContentFor(e)
null!=i&&(null!=n&&(e=o.join(n,e)),s.setSourceContent(e,i))}),s},i.prototype.add=function(e){if(Array.isArray(e))e.forEach(function(e){this.add(e)},this)
else{if(!e[u]&&"string"!=typeof e)throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e)
e&&this.children.push(e)}return this},i.prototype.prepend=function(e){if(Array.isArray(e))for(var t=e.length-1;t>=0;t--)this.prepend(e[t])
else{if(!e[u]&&"string"!=typeof e)throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e)
this.children.unshift(e)}return this},i.prototype.walk=function(e){for(var t,n=0,i=this.children.length;i>n;n++)t=this.children[n],t[u]?t.walk(e):""!==t&&e(t,{source:this.source,line:this.line,column:this.column,name:this.name})},i.prototype.join=function(e){var t,n,i=this.children.length
if(i>0){for(t=[],n=0;i-1>n;n++)t.push(this.children[n]),t.push(e)
t.push(this.children[n]),this.children=t}return this},i.prototype.replaceRight=function(e,t){var n=this.children[this.children.length-1]
return n[u]?n.replaceRight(e,t):"string"==typeof n?this.children[this.children.length-1]=n.replace(e,t):this.children.push("".replace(e,t)),this},i.prototype.setSourceContent=function(e,t){this.sourceContents[o.toSetString(e)]=t},i.prototype.walkSourceContents=function(e){for(var t=0,n=this.children.length;n>t;t++)this.children[t][u]&&this.children[t].walkSourceContents(e)
for(var i=Object.keys(this.sourceContents),t=0,n=i.length;n>t;t++)e(o.fromSetString(i[t]),this.sourceContents[i[t]])},i.prototype.toString=function(){var e=""
return this.walk(function(t){e+=t}),e},i.prototype.toStringWithSourceMap=function(e){var t={code:"",line:1,column:0},n=new r(e),i=!1,o=null,a=null,u=null,c=null
return this.walk(function(e,r){t.code+=e,null!==r.source&&null!==r.line&&null!==r.column?((o!==r.source||a!==r.line||u!==r.column||c!==r.name)&&n.addMapping({source:r.source,original:{line:r.line,column:r.column},generated:{line:t.line,column:t.column},name:r.name}),o=r.source,a=r.line,u=r.column,c=r.name,i=!0):i&&(n.addMapping({generated:{line:t.line,column:t.column}}),o=null,i=!1)
for(var l=0,p=e.length;p>l;l++)e.charCodeAt(l)===s?(t.line++,t.column=0,l+1===p?(o=null,i=!1):i&&n.addMapping({source:r.source,original:{line:r.line,column:r.column},generated:{line:t.line,column:t.column},name:r.name})):t.column++}),this.walkSourceContents(function(e,t){n.setSourceContent(e,t)}),{code:t.code,map:n}},t.SourceNode=i}])}),define("uglifyjs",["exports","source-map","logger","env!env/file"],function(e,t,n,i){" "
function r(e){for(var t=Object.create(null),n=0;n<e.length;++n)t[e[n]]=!0
return t}function o(e){return e.split("")}function a(e,t){return t.indexOf(e)>=0}function s(e,t){for(var n=0,i=t.length;i>n;++n)if(e(t[n]))return t[n]}function u(e,t){if(0>=t)return""
if(1==t)return e
var n=u(e,t>>1)
return n+=n,1&t&&(n+=e),n}function c(e){Object.defineProperty(e.prototype,"stack",{get:function(){var e=Error(this.message)
e.name=this.name
try{throw e}catch(t){return t.stack}}})}function l(e,t){this.message=e,this.defs=t}function p(e,t,n){e===!0&&(e={})
var i=e||{}
if(n)for(var r in i)w(i,r)&&!w(t,r)&&l.croak("`"+r+"` is not a supported option",t)
for(var r in t)w(t,r)&&(i[r]=e&&w(e,r)?e[r]:t[r])
return i}function f(e,t){var n=0
for(var i in t)w(t,i)&&(e[i]=t[i],n++)
return n}function h(){}function d(){return!1}function m(){return!0}function g(){return this}function v(){return null}function x(e,t){e.indexOf(t)<0&&e.push(t)}function y(e,t){return e.replace(/\{(.+?)\}/g,function(e,n){return t&&t[n]})}function D(e,t){for(var n=e.length;--n>=0;)e[n]===t&&e.splice(n,1)}function b(e,t){function n(e,n){for(var i=[],r=0,o=0,a=0;r<e.length&&o<n.length;)t(e[r],n[o])<=0?i[a++]=e[r++]:i[a++]=n[o++]
return r<e.length&&i.push.apply(i,e.slice(r)),o<n.length&&i.push.apply(i,n.slice(o)),i}function i(e){if(e.length<=1)return e
var t=Math.floor(e.length/2),r=e.slice(0,t),o=e.slice(t)
return r=i(r),o=i(o),n(r,o)}return e.length<2?e.slice():i(e)}function E(e){function t(e){return JSON.stringify(e).replace(/[\u2028\u2029]/g,function(e){switch(e){case"\u2028":return"\\u2028"
case"\u2029":return"\\u2029"}return e})}function n(e){if(1==e.length)return i+="return str === "+t(e[0])+";"
i+="switch(str){"
for(var n=0;n<e.length;++n)i+="case "+t(e[n])+":"
i+="return true}return false;"}e instanceof Array||(e=e.split(" "))
var i="",r=[]
e:for(var o=0;o<e.length;++o){for(var a=0;a<r.length;++a)if(r[a][0].length==e[o].length){r[a].push(e[o])
continue e}r.push([e[o]])}if(r.length>3){r.sort(function(e,t){return t.length-e.length}),i+="switch(str.length){"
for(var o=0;o<r.length;++o){var s=r[o]
i+="case "+s[0].length+":",n(s)}i+="}"}else n(e)
return Function("str",i)}function C(e,t){for(var n=e.length;--n>=0;)if(!t(e[n]))return!1
return!0}function A(){this._values=Object.create(null),this._size=0}function w(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function _(e){for(var t,n=e.parent(-1),i=0;t=e.parent(i);i++){if(t instanceof oe&&t.body===n)return!0
if(!(t instanceof Ge&&t.car===n||t instanceof He&&t.expression===n&&!(t instanceof We)||t instanceof Ve&&t.expression===n||t instanceof Ye&&t.expression===n||t instanceof nt&&t.condition===n||t instanceof tt&&t.left===n||t instanceof et&&t.expression===n))return!1
n=t}}function F(t,n,i,r){arguments.length<4&&(r=re),n=n?n.split(/\s+/):[]
var o=n
r&&r.PROPS&&(n=n.concat(r.PROPS))
for(var a="return function AST_"+t+"(props){ if (props) { ",s=n.length;--s>=0;)a+="this."+n[s]+" = props."+n[s]+";"
var u=r&&new r;(u&&u.initialize||i&&i.initialize)&&(a+="this.initialize();"),a+="}}"
var c=Function(a)()
if(u&&(c.prototype=u,c.BASE=r),r&&r.SUBCLASSES.push(c),c.prototype.CTOR=c,c.PROPS=n||null,c.SELF_PROPS=o,c.SUBCLASSES=[],t&&(c.prototype.TYPE=c.TYPE=t),i)for(s in i)w(i,s)&&(/^\$/.test(s)?c[s.substr(1)]=i[s]:c.prototype[s]=i[s])
return c.DEFMETHOD=function(e,t){this.prototype[e]=t},void 0!==e&&(e["AST_"+t]=c),c}function S(e,t){var n=e.body
if(n instanceof oe)n._walk(t)
else for(var i=0,r=n.length;r>i;i++)n[i]._walk(t)}function k(e){this.visit=e,this.stack=[],this.directives=Object.create(null)}function B(e){return e>=97&&122>=e||e>=65&&90>=e||e>=170&&Gt.letter.test(String.fromCharCode(e))}function T(e){return e>=48&&57>=e}function M(e){return T(e)||B(e)}function P(e){return Gt.digit.test(String.fromCharCode(e))}function N(e){return Gt.non_spacing_mark.test(e)||Gt.space_combining_mark.test(e)}function O(e){return Gt.connector_punctuation.test(e)}function I(e){return!jt(e)&&/^[a-z_$][a-z0-9_$]*$/i.test(e)}function R(e){return 36==e||95==e||B(e)}function j(e){var t=e.charCodeAt(0)
return R(t)||T(t)||8204==t||8205==t||N(e)||O(e)||P(t)}function q(e){return/^[a-z_$][a-z0-9_$]*$/i.test(e)}function L(e){if(zt.test(e))return parseInt(e.substr(2),16)
if(Ut.test(e))return parseInt(e.substr(1),8)
var t=parseFloat(e)
return t==e?t:void 0}function z(e,t,n,i,r){this.message=e,this.filename=t,this.line=n,this.col=i,this.pos=r}function U(e,t,n,i,r){throw new z(e,t,n,i,r)}function J(e,t,n){return e.type==t&&(null==n||e.value==n)}function X(e,t,n,i){function r(){return F.text.charAt(F.pos)}function o(e,t){var n=F.text.charAt(F.pos++)
if(e&&!n)throw Kt
return $t(n)?(F.newline_before=F.newline_before||!t,++F.line,F.col=0,t||"\r"!=n||"\n"!=r()||(++F.pos,n="\n")):++F.col,n}function a(e){for(;e-- >0;)o()}function s(e){return F.text.substr(F.pos,e.length)==e}function u(){for(var e=F.text,t=F.pos,n=F.text.length;n>t;++t){var i=e[t]
if($t(i))return t}return-1}function c(e,t){var n=F.text.indexOf(e,F.pos)
if(t&&-1==n)throw Kt
return n}function l(){F.tokline=F.line,F.tokcol=F.col,F.tokpos=F.pos}function p(n,i,r){F.regex_allowed="operator"==n&&!Yt(i)||"keyword"==n&&qt(i)||"punc"==n&&Ht(i),"punc"==n&&"."==i?S=!0:r||(S=!1)
var o={type:n,value:i,line:F.tokline,col:F.tokcol,pos:F.tokpos,endline:F.line,endcol:F.col,endpos:F.pos,nlb:F.newline_before,file:t}
if(/^(?:num|string|regexp)$/i.test(n)&&(o.raw=e.substring(o.pos,o.endpos)),!r){o.comments_before=F.comments_before,F.comments_before=[]
for(var a=0,s=o.comments_before.length;s>a;a++)o.nlb=o.nlb||o.comments_before[a].nlb}return F.newline_before=!1,new ie(o)}function f(){for(;Xt(r());)o()}function h(e){for(var t,n="",i=0;(t=r())&&e(t,i++);)n+=o()
return n}function d(e){U(e,t,F.tokline,F.tokcol,F.tokpos)}function m(e){var t=!1,n=!1,i=!1,r="."==e,o=h(function(o,a){var s=o.charCodeAt(0)
switch(s){case 120:case 88:return i?!1:i=!0
case 101:case 69:return i?!0:t?!1:t=n=!0
case 45:return n||0==a&&!e
case 43:return n
case n=!1,46:return r||i||t?!1:r=!0}return M(s)})
e&&(o=e+o),Ut.test(o)&&_.has_directive(" ")&&d("Legacy octal literals are not allowed in strict mode")
var a=L(o)
return isNaN(a)?void d("Invalid syntax: "+o):p("num",a)}function g(e){var t=o(!0,e)
switch(t.charCodeAt(0)){case 110:return"\n"
case 114:return"\r"
case 116:return"	"
case 98:return"\b"
case 118:return"\x0B"
case 102:return"\f"
case 120:return String.fromCharCode(x(2))
case 117:return String.fromCharCode(x(4))
case 10:return""
case 13:if("\n"==r())return o(!0,e),""}return t>="0"&&"7">=t?v(t):t}function v(e){var t=r()
return t>="0"&&"7">=t&&(e+=o(!0),e[0]<="3"&&(t=r())>="0"&&"7">=t&&(e+=o(!0))),"0"===e?"\x00":(e.length>0&&_.has_directive(" ")&&d("Legacy octal escape sequences are not allowed in strict mode"),String.fromCharCode(parseInt(e,8)))}function x(e){for(var t=0;e>0;--e){var n=parseInt(o(!0),16)
isNaN(n)&&d("Invalid hex-character pattern in string"),t=t<<4|n}return t}function y(e){var t,n=F.regex_allowed,i=u()
return-1==i?(t=F.text.substr(F.pos),F.pos=F.text.length):(t=F.text.substring(F.pos,i),F.pos=i),F.col=F.tokcol+(F.pos-F.tokpos),F.comments_before.push(p(e,t,!0)),F.regex_allowed=n,_}function D(){for(var e,t,n=!1,i="",a=!1;null!=(e=r());)if(n)"u"!=e&&d("Expecting UnicodeEscapeSequence -- uXXXX"),e=g(),j(e)||d("Unicode char: "+e.charCodeAt(0)+" is not valid in identifier"),i+=e,n=!1
else if("\\"==e)a=n=!0,o()
else{if(!j(e))break
i+=o()}return It(i)&&a&&(t=i.charCodeAt(0).toString(16).toUpperCase(),i="\\u"+"0000".substr(t.length)+t+i.slice(1)),i}function b(e){function t(e){if(!r())return e
var n=e+r()
return Jt(n)?(o(),t(n)):e}return p("operator",t(e||o()))}function E(){switch(o(),r()){case"/":return o(),y("comment1")
case"*":return o(),B()}return F.regex_allowed?P(""):b("/")}function C(){return o(),T(r().charCodeAt(0))?m("."):p("punc",".")}function A(){var e=D()
return S?p("name",e):Rt(e)?p("atom",e):It(e)?Jt(e)?p("operator",e):p("keyword",e):p("name",e)}function w(e,t){return function(n){try{return t(n)}catch(i){if(i!==Kt)throw i
d(e)}}}function _(e){if(null!=e)return P(e)
for(i&&0==F.pos&&s("#!")&&(l(),a(2),y("comment5"));;){if(f(),l(),n){if(s("<!--")){a(4),y("comment3")
continue}if(s("-->")&&F.newline_before){a(3),y("comment4")
continue}}var t=r()
if(!t)return p("eof")
var u=t.charCodeAt(0)
switch(u){case 34:case 39:return k(t)
case 46:return C()
case 47:var c=E()
if(c===_)continue
return c}if(T(u))return m()
if(Wt(t))return p("punc",o())
if(Lt(t))return b()
if(92==u||R(u))return A()
break}d("Unexpected character '"+t+"'")}var F={text:e,filename:t,pos:0,tokpos:0,line:1,tokline:0,col:0,tokcol:0,newline_before:!1,regex_allowed:!1,comments_before:[],directives:{},directive_stack:[]},S=!1,k=w("Unterminated string constant",function(e){for(var t=o(),n="";;){var i=o(!0,!0)
if("\\"==i)i=g(!0)
else if($t(i))d("Unterminated string constant")
else if(i==t)break
n+=i}var r=p("string",n)
return r.quote=e,r}),B=w("Unterminated multiline comment",function(){var e=F.regex_allowed,t=c("*/",!0),n=F.text.substring(F.pos,t).replace(/\r\n|\r|\u2028|\u2029/g,"\n")
return a(n.length+2),F.comments_before.push(p("comment2",n,!0)),F.regex_allowed=e,_}),P=w("Unterminated regular expression",function(e){for(var t,n=!1,i=!1;t=o(!0);)if($t(t))d("Unexpected line terminator")
else if(n)e+="\\"+t,n=!1
else if("["==t)i=!0,e+=t
else if("]"==t&&i)i=!1,e+=t
else{if("/"==t&&!i)break
"\\"==t?n=!0:e+=t}var r=D()
try{return p("regexp",RegExp(e,r))}catch(a){d(a.message)}})
return _.context=function(e){return e&&(F=e),F},_.add_directive=function(e){F.directive_stack[F.directive_stack.length-1].push(e),void 0===F.directives[e]?F.directives[e]=1:F.directives[e]++},_.push_directives_stack=function(){F.directive_stack.push([])},_.pop_directives_stack=function(){for(var e=F.directive_stack[F.directive_stack.length-1],t=0;t<e.length;t++)F.directives[e[t]]--
F.directive_stack.pop()},_.has_directive=function(e){return void 0!==F.directives[e]&&F.directives[e]>0},_}function $(e,t){function n(e,t){return J(L.token,e,t)}function i(){return L.peeked||(L.peeked=L.input())}function r(){return L.prev=L.token,L.peeked?(L.token=L.peeked,L.peeked=null):L.token=L.input(),L.in_directives=L.in_directives&&("string"==L.token.type||n("punc",";")),L.token}function o(){return L.prev}function a(e,t,n,i){var r=L.input.context()
U(e,r.filename,null!=t?t:r.tokline,null!=n?n:r.tokcol,null!=i?i:r.tokpos)}function u(e,t){a(t,e.line,e.col)}function c(e){null==e&&(e=L.token),u(e,"Unexpected token: "+e.type+" ("+e.value+")")}function l(e,t){return n(e,t)?r():void u(L.token,"Unexpected token "+L.token.type+" «"+L.token.value+"», expected "+e+" «"+t+"»")}function f(e){return l("punc",e)}function h(){return!t.strict&&(L.token.nlb||n("eof")||n("punc","}"))}function d(e){n("punc",";")?r():e||h()||c()}function m(){f("(")
var e=re(!0)
return f(")"),e}function g(e){return function(){var t=L.token,n=e(),i=o()
return n.start=t,n.end=i,n}}function v(){(n("operator","/")||n("operator","/="))&&(L.peeked=null,L.token=L.input(L.token.value.substr(1)))}function x(){var e=N(yt)
s(function(t){return t.name==e.name},L.labels)&&a("Label "+e.name+" defined twice"),f(":"),L.labels.push(e)
var t=z()
return L.labels.pop(),t instanceof de||e.references.forEach(function(t){t instanceof Pe&&(t=t.label.start,a("Continue label `"+e.name+"` refers to non-IterationStatement.",t.line,t.col,t.pos))}),new he({body:t,label:e})}function y(e){return new ue({body:(e=re(!0),d(),e)})}function D(e){var t,n=null
h()||(n=N(bt,!0)),null!=n?(t=s(function(e){return e.name==n.name},L.labels),t||a("Undefined label "+n.name),n.thedef=t):0==L.in_loop&&a(e.TYPE+" not inside a loop or switch"),d()
var i=new e({label:n})
return t&&t.references.push(i),i}function b(){f("(")
var e=null
return!n("punc",";")&&(e=n("keyword","var")?(r(),H(!0)):re(!0,!0),n("operator","in"))?(e instanceof Je&&e.definitions.length>1&&a("Only one variable declaration allowed in for..in loop"),r(),C(e)):E(e)}function E(e){f(";")
var t=n("punc",";")?null:re(!0)
f(";")
var i=n("punc",")")?null:re(!0)
return f(")"),new xe({init:e,condition:t,step:i,body:j(z)})}function C(e){var t=e instanceof Je?e.definitions[0].name:null,n=re(!0)
return f(")"),new ye({init:e,name:t,object:n,body:j(z)})}function A(){var e=m(),t=z(),i=null
return n("keyword","else")&&(r(),i=z()),new Ne({condition:e,body:t,alternative:i})}function w(){f("{")
for(var e=[];!n("punc","}");)n("eof")&&c(),e.push(z())
return r(),e}function _(){f("{")
for(var e,t=[],i=null,a=null;!n("punc","}");)n("eof")&&c(),n("keyword","case")?(a&&(a.end=o()),i=[],a=new je({start:(e=L.token,r(),e),expression:re(!0),body:i}),t.push(a),f(":")):n("keyword","default")?(a&&(a.end=o()),i=[],a=new Re({start:(e=L.token,r(),f(":"),e),body:i}),t.push(a)):(i||c(),i.push(z()))
return a&&(a.end=o()),r(),t}function F(){var e=w(),t=null,i=null
if(n("keyword","catch")){var s=L.token
r(),f("(")
var u=N(xt)
f(")"),t=new Le({start:s,argname:u,body:w(),end:o()})}if(n("keyword","finally")){var s=L.token
r(),i=new ze({start:s,body:w(),end:o()})}return t||i||a("Missing catch/finally blocks"),new qe({body:e,bcatch:t,bfinally:i})}function S(e,t){for(var i=[];i.push(new $e({start:L.token,name:N(t?dt:ht),value:n("operator","=")?(r(),re(!1,e)):null,end:o()})),n("punc",",");)r()
return i}function k(){var e,t=L.token
switch(t.type){case"name":case"keyword":e=P(Dt)
break
case"num":e=new wt({start:t,end:t,value:t.value})
break
case"string":e=new At({start:t,end:t,value:t.value,quote:t.quote})
break
case"regexp":e=new _t({start:t,end:t,value:t.value})
break
case"atom":switch(t.value){case"false":e=new Nt({start:t,end:t})
break
case"true":e=new Ot({start:t,end:t})
break
case"null":e=new St({start:t,end:t})}break
case"operator":q(t.value)||a("Invalid getter/setter name: "+t.value,t.line,t.col,t.pos),e=P(Dt)}return r(),e}function B(e,t,i){for(var o=!0,a=[];!n("punc",e)&&(o?o=!1:f(","),!t||!n("punc",e));)n("punc",",")&&i?a.push(new Tt({start:L.token,end:L.token})):a.push(re(!1))
return r(),a}function T(){var e=L.token
switch(e.type){case"operator":It(e.value)||c()
case"num":case"string":case"name":case"keyword":case"atom":return r(),e.value
default:c()}}function M(){var e=L.token
return"name"!=e.type&&c(),r(),e.value}function P(e){var t=L.token.value
return new("this"==t?Et:e)({name:t+"",start:L.token,end:L.token})}function N(e,t){if(!n("name"))return t||a("Name expected"),null
var i=P(e)
return r(),i}function O(e,t,n){var i=t.value
return"++"!=i&&"--"!=i||R(n)||a("Invalid use of "+i+" operator",t.line,t.col,t.pos),new e({operator:i,expression:n})}function I(e){return te(ee(!0),0,e)}function R(e){return t.cli?!0:e instanceof Ke||e instanceof Dt}function j(e){++L.in_loop
var t=e()
return--L.in_loop,t}t=p(t,{bare_returns:!1,cli:!1,expression:!1,filename:null,html5_comments:!0,shebang:!0,strict:!1,toplevel:null})
var L={input:"string"==typeof e?X(e,t.filename,t.html5_comments,t.shebang):e,token:null,prev:null,peeked:null,in_function:0,in_directives:!0,in_loop:0,labels:[]}
L.token=r()
var z=g(function(){switch(v(),L.token.type){case"string":if(L.in_directives){var e=i();-1==L.token.raw.indexOf("\\")&&(e.nlb||J(e,"eof")||J(e,"punc",";")||J(e,"punc","}"))?L.input.add_directive(L.token.value):L.in_directives=!1}var s=L.in_directives,u=y()
return s?new se(u.body):u
case"num":case"regexp":case"operator":case"atom":return y()
case"name":return J(i(),"punc",":")?x():y()
case"punc":switch(L.token.value){case"{":return new le({start:L.token,body:w(),end:o()})
case"[":case"(":return y()
case";":return L.in_directives=!1,r(),new pe
default:c()}case"keyword":switch(L.token.value){case"break":return r(),D(Me)
case"continue":return r(),D(Pe)
case"debugger":return r(),d(),new ae
case"do":r()
var p=j(z)
l("keyword","while")
var f=m()
return d(!0),new ge({body:p,condition:f})
case"while":return r(),new ve({condition:m(),body:j(z)})
case"for":return r(),b()
case"function":return r(),$(_e)
case"if":return r(),A()
case"return":0!=L.in_function||t.bare_returns||a("'return' outside of function"),r()
var g=null
return n("punc",";")?r():h()||(g=re(!0),d()),new ke({value:g})
case"switch":return r(),new Oe({expression:m(),body:j(_)})
case"throw":r(),L.token.nlb&&a("Illegal newline after 'throw'")
var g=re(!0)
return d(),new Be({value:g})
case"try":return r(),F()
case"var":r()
var E=H()
return d(),E
case"const":r()
var E=W()
return d(),E
case"with":return L.input.has_directive(" ")&&a("Strict mode may not include a with statement"),r(),new De({expression:m(),body:z()})}}c()}),$=function(e){var t=e===_e,i=n("name")?N(t?gt:vt):null
return t&&!i&&c(),f("("),new e({name:i,argnames:function(e,t){for(;!n("punc",")");)e?e=!1:f(","),t.push(N(mt))
return r(),t}(!0,[]),body:function(e,t){++L.in_function,L.in_directives=!0,L.input.push_directives_stack(),L.in_loop=0,L.labels=[]
var n=w()
return L.input.pop_directives_stack(),--L.in_function,L.in_loop=e,L.labels=t,n}(L.in_loop,L.labels)})},H=function(e){return new Je({start:o(),definitions:S(e,!1),end:o()})},W=function(){return new Xe({start:o(),definitions:S(!1,!0),end:o()})},G=function(e){var t=L.token
l("operator","new")
var i,a=K(!1)
return n("punc","(")?(r(),i=B(")")):i=[],Z(new We({start:t,expression:a,args:i,end:o()}),e)},K=function(e){if(n("operator","new"))return G(e)
var t=L.token
if(n("punc")){switch(t.value){case"(":r()
var i=re(!0)
return i.start=t,i.end=L.token,f(")"),Z(i,e)
case"[":return Z(V(),e)
case"{":return Z(Q(),e)}c()}if(n("keyword","function")){r()
var a=$(we)
return a.start=t,a.end=o(),Z(a,e)}return en[L.token.type]?Z(k(),e):void c()},V=g(function(){return f("["),new rt({elements:B("]",!t.strict,!0)})}),Y=g(function(){return $(Ae)}),Q=g(function(){f("{")
for(var e=!0,i=[];!n("punc","}")&&(e?e=!1:f(","),t.strict||!n("punc","}"));){var a=L.token,s=a.type,u=T()
if("name"==s&&!n("punc",":")){var c=new pt({start:L.token,name:T(),end:o()})
if("get"==u){i.push(new ct({start:a,key:c,value:Y(),end:o()}))
continue}if("set"==u){i.push(new ut({start:a,key:c,value:Y(),end:o()}))
continue}}f(":"),i.push(new st({start:a,quote:a.quote,key:u,value:re(!1),end:o()}))}return r(),new ot({properties:i})}),Z=function(e,t){var i=e.start
if(n("punc","."))return r(),Z(new Ve({start:i,expression:e,property:M(),end:o()}),t)
if(n("punc","[")){r()
var a=re(!0)
return f("]"),Z(new Ye({start:i,expression:e,property:a,end:o()}),t)}return t&&n("punc","(")?(r(),Z(new He({start:i,expression:e,args:B(")"),end:o()}),!0)):e},ee=function(e){var t=L.token
if(n("operator")&&Vt(t.value)){r(),v()
var i=O(Ze,t,ee(e))
return i.start=t,i.end=o(),i}for(var a=K(e);n("operator")&&Yt(L.token.value)&&!L.token.nlb;)a=O(et,L.token,a),a.start=t,a.end=L.token,r()
return a},te=function(e,t,i){var o=n("operator")?L.token.value:null
"in"==o&&i&&(o=null)
var a=null!=o?Zt[o]:null
if(null!=a&&a>t){r()
var s=te(ee(!0),a,i)
return te(new tt({start:e.start,left:e,operator:o,right:s,end:s.end}),t,i)}return e},ne=function(e){var t=L.token,i=I(e)
if(n("operator","?")){r()
var a=re(!1)
return f(":"),new nt({start:t,condition:i,consequent:a,alternative:re(!1,e),end:o()})}return i},ie=function(e){var t=L.token,i=ne(e),s=L.token.value
if(n("operator")&&Qt(s)){if(R(i))return r(),new it({start:t,left:i,operator:s,right:ie(e),end:o()})
a("Invalid assignment")}return i},re=function(e,t){var o=L.token,a=ie(t)
return e&&n("punc",",")?(r(),new Ge({start:o,car:a,cdr:re(!0,t),end:i()})):a}
return t.expression?re(!0):function(){var e=L.token,i=[]
for(L.input.push_directives_stack();!n("eof");)i.push(z())
L.input.pop_directives_stack()
var r=o(),a=t.toplevel
return a?(a.body=a.body.concat(i),a.end=r):a=new Ee({start:e,body:i,end:r}),a}()}function H(e,t){k.call(this),this.before=e,this.after=t}function W(e,t,n){this.name=n.name,this.orig=[n],this.scope=e,this.references=[],this.global=!1,this.mangled_name=null,this.undeclared=!1,this.index=t,this.id=W.next_id++}function G(e){return"comment2"==e.type&&/@preserve|@license|@cc_on/i.test(e.value)}function K(e){function t(e,t){return e.replace(/[\u0000-\u001f\u007f-\uffff]/g,function(e){var n=e.charCodeAt(0).toString(16)
if(n.length<=2&&!t){for(;n.length<2;)n="0"+n
return"\\x"+n}for(;n.length<4;)n="0"+n
return"\\u"+n})}function n(n,i){function r(){return"'"+n.replace(/\x27/g,"\\'")+"'"}function o(){return'"'+n.replace(/\x22/g,'\\"')+'"'}var a=0,s=0
switch(n=n.replace(/[\\\b\f\n\r\v\t\x22\x27\u2028\u2029\0\ufeff]/g,function(t,i){switch(t){case'"':return++a,'"'
case"'":return++s,"'"
case"\\":return"\\\\"
case"\n":return"\\n"
case"\r":return"\\r"
case"	":return"\\t"
case"\b":return"\\b"
case"\f":return"\\f"
case"\x0B":return e.screw_ie8?"\\v":"\\x0B"
case"\u2028":return"\\u2028"
case"\u2029":return"\\u2029"
case"\ufeff":return"\\ufeff"
case"\x00":return/[0-7]/.test(n.charAt(i+1))?"\\x00":"\\0"}return t}),e.ascii_only&&(n=t(n)),e.quote_style){case 1:return r()
case 2:return o()
case 3:return"'"==i?r():o()
default:return a>s?r():o()}}function i(t,i){var r=n(t,i)
return e.inline_script&&(r=r.replace(/<\x2fscript([>\/\t\n\f\r ])/gi,"<\\/script$1"),r=r.replace(/\x3c!--/g,"\\x3c!--"),r=r.replace(/--\x3e/g,"--\\x3e")),r}function r(n){return n=""+n,e.ascii_only&&(n=t(n,!0)),n}function o(t){return u(" ",e.indent_start+A-t*e.indent_level)}function a(t){t+=""
var n=t.charAt(0),i=M.charAt(M.length-1)
if(B&&(B=!1,(":"==i&&"}"==n||(!n||";}".indexOf(n)<0)&&";"!=i)&&(e.semicolons||N(n)?(S+=";",w++,F++):(P(),S+="\n",F++,_++,w=0,/^\s+$/.test(t)&&(B=!0)),e.beautify||(k=!1))),!e.beautify&&e.preserve_line&&U[U.length-1])for(var r=U[U.length-1].start.line;r>_;)P(),S+="\n",F++,_++,w=0,k=!1
k&&((j(i)&&(j(n)||"\\"==n)||"/"==n&&n==i||("+"==n||"-"==n)&&n==M)&&(S+=" ",w++,F++),k=!1),S+=t,F+=t.length
var o=t.split(/\r?\n/),a=o.length-1
_+=a,w+=o[0].length,a>0&&(P(),w=o[a].length),M=t}function s(){B=!1,a(";")}function c(){return A+e.indent_level}function l(e){var t
return a("{"),q(),R(c(),function(){t=e()}),I(),a("}"),t}function f(e){a("(")
var t=e()
return a(")"),t}function g(e){a("[")
var t=e()
return a("]"),t}function v(){a(","),O()}function x(){a(":"),e.space_colon&&O()}function y(){return T&&P(),S}e=p(e,{ascii_only:!1,beautify:!1,bracketize:!1,comments:!1,indent_level:4,indent_start:0,inline_script:!0,keep_quoted_props:!1,max_line_len:!1,preamble:null,preserve_line:!1,quote_keys:!1,quote_style:0,screw_ie8:!0,semicolons:!0,shebang:!0,source_map:null,space_colon:!0,unescape_regexps:!1,width:80,wrap_iife:!1},!0)
var D=d
if(e.comments){var b=e.comments
if("string"==typeof e.comments&&/^\/.*\/[a-zA-Z]*$/.test(e.comments)){var C=e.comments.lastIndexOf("/")
b=RegExp(e.comments.substr(1,C-1),e.comments.substr(C+1))}D=b instanceof RegExp?function(e){return"comment5"!=e.type&&b.test(e.value)}:"function"==typeof b?function(e){return"comment5"!=e.type&&b(this,e)}:"some"===b?G:m}var A=0,w=0,_=1,F=0,S="",k=!1,B=!1,T=0,M="",P=e.max_line_len?function(){if(w>e.max_line_len){if(T){var t=S.slice(0,T),n=S.slice(T)
S=t+"\n"+n,_++,F++,w=n.length}w>e.max_line_len&&re.warn("Output exceeds {max_line_len} characters",e)}T=0}:h,N=E("( [ + * / - , ."),O=e.beautify?function(){a(" ")}:function(){k=!0},I=e.beautify?function(t){e.beautify&&a(o(t?.5:0))}:h,R=e.beautify?function(e,t){e===!0&&(e=c())
var n=A
A=e
var i=t()
return A=n,i}:function(e,t){return t()},q=e.beautify?function(){a("\n")}:e.max_line_len?function(){P(),T=S.length}:h,L=e.beautify?function(){a(";")}:function(){B=!0},z=e.source_map?function(t,n){try{t&&e.source_map.add(t.file||"?",_,w,t.line,t.col,n||"name"!=t.type?n:t.value)}catch(i){re.warn("Couldn't figure out mapping for {file}:{line},{col} → {cline},{ccol} [{name}]",{file:t.file,line:t.line,col:t.col,cline:_,ccol:w,name:n||""})}}:h,U=[]
return{get:y,toString:y,indent:I,indentation:function(){return A},current_width:function(){return w-A},should_break:function(){return e.width&&this.current_width()>=e.width},newline:q,print:a,space:O,comma:v,colon:x,last:function(){return M},semicolon:L,force_semicolon:s,to_ascii:t,print_name:function(e){a(r(e))},print_string:function(e,t,n){var r=i(e,t)
n===!0&&-1===r.indexOf("\\")&&(nn.test(S)||s(),s()),a(r)},encode_string:i,next_indent:c,with_indent:R,with_block:l,with_parens:f,with_square:g,add_mapping:z,option:function(t){return e[t]},comment_filter:D,line:function(){return _},col:function(){return w},pos:function(){return F},push_node:function(e){U.push(e)},pop_node:function(){return U.pop()},parent:function(e){return U[U.length-2-(e||0)]}}}function V(e,t){if(!(this instanceof V))return new V(e,t)
H.call(this,this.before,this.after),this.options=p(e,{angular:!1,booleans:!t,cascade:!t,collapse_vars:!t,comparisons:!t,conditionals:!t,dead_code:!t,drop_console:!1,drop_debugger:!t,evaluate:!t,expression:!1,global_defs:{},hoist_funs:!t,hoist_vars:!1,if_return:!t,join_vars:!t,keep_fargs:!0,keep_fnames:!1,keep_infinity:!1,loops:!t,negate_iife:!t,passes:1,properties:!t,pure_getters:!t&&"strict",pure_funcs:null,reduce_vars:!t,screw_ie8:!0,sequences:!t,side_effects:!t,switches:!t,top_retain:null,toplevel:!(!e||!e.top_retain),unsafe:!1,unsafe_comps:!1,unsafe_math:!1,unsafe_proto:!1,unsafe_regexp:!1,unused:!t,warnings:!0},!0)
var n=this.options.pure_funcs
"function"==typeof n?this.pure_funcs=n:this.pure_funcs=n?function(e){return n.indexOf(e.expression.print_to_string())<0}:m
var i=this.options.top_retain
i instanceof RegExp?this.top_retain=function(e){return i.test(e.name)}:"function"==typeof i?this.top_retain=i:i&&("string"==typeof i&&(i=i.split(/,/)),this.top_retain=function(e){return i.indexOf(e.name)>=0})
var r=this.options.sequences
this.sequences_limit=1==r?200:0|r,this.warnings_produced={}}function Y(e){function n(t,n,o,a,s,u){if(r){var c=r.originalPositionFor({line:a,column:s})
if(null===c.source)return
t=c.source,a=c.line,s=c.column,u=c.name||u}i.addMapping({generated:{line:n+e.dest_line_diff,column:o},original:{line:a+e.orig_line_diff,column:s},source:t,name:u})}e=p(e,{file:null,root:null,orig:null,orig_line_diff:0,dest_line_diff:0})
var i=new t.SourceMapGenerator({file:e.file,sourceRoot:e.root}),r=e.orig&&new t.SourceMapConsumer(e.orig)
return r&&Array.isArray(e.orig.sources)&&r._sources.toArray().forEach(function(e){var t=r.sourceContentFor(e,!0)
t&&i.setSourceContent(e,t)}),{add:n,get:function(){return i},toString:function(){return JSON.stringify(i.toJSON())}}}function Q(){function e(e){x(t,e)}var t=["null","true","false","Infinity","-Infinity","undefined"]
return[Object,Array,Function,Number,String,Boolean,Error,Math,Date,RegExp].forEach(function(t){Object.getOwnPropertyNames(t).map(e),t.prototype&&Object.getOwnPropertyNames(t.prototype).map(e)}),t}function Z(e,t){function n(e){return g.indexOf(e)>=0?!1:u.indexOf(e)>=0?!1:t.only_cache?c.props.has(e):/^-?[0-9]+(\.[0-9]+)?(e[+-][0-9]+)?$/.test(e)?!1:!0}function i(e){return h&&e in v?!1:f&&!f.test(e)?!1:u.indexOf(e)>=0?!1:c.props.has(e)||m.indexOf(e)>=0}function r(e,t){return t?void(v[e]=!0):(n(e)&&x(m,e),void(i(e)||x(g,e)))}function o(e){if(!i(e))return e
var t=c.props.get(e)
if(!t){if(d){var r="_$"+e+"$"+l+"_"
!n(r)||h&&r in v||(t=r)}if(!t)do t=tn(++c.cname)
while(!n(t)||h&&t in v)
c.props.set(e,t)}return t}function a(e,t){var n={}
try{!function o(e){e.walk(new k(function(e){if(e instanceof Ge)return o(e.cdr),!0
if(e instanceof At)return r(e.value,t),!0
if(e instanceof nt)return o(e.consequent),o(e.alternative),!0
throw n}))}(e)}catch(i){if(i!==n)throw i}}function s(e){return e.transform(new H(function(e){return e instanceof Ge?e.cdr=s(e.cdr):e instanceof At?e.value=o(e.value):e instanceof nt&&(e.consequent=s(e.consequent),e.alternative=s(e.alternative)),e}))}t=p(t,{cache:null,debug:!1,ignore_quoted:!1,only_cache:!1,regex:null,reserved:null})
var u=t.reserved
null==u&&(u=Q())
var c=t.cache
null==c&&(c={cname:-1,props:new A})
var l,f=t.regex,h=t.ignore_quoted,d=t.debug!==!1
d&&(l=t.debug===!0?"":t.debug)
var m=[],g=[],v={}
return e.walk(new k(function(e){e instanceof st?r(e.key,h&&e.quote):e instanceof at?r(e.key.name):e instanceof Ve?r(e.property):e instanceof Ye&&a(e.property,h)})),e.transform(new H(function(e){e instanceof st?h&&e.quote||(e.key=o(e.key)):e instanceof at?e.key.name=o(e.key.name):e instanceof Ve?e.property=o(e.property):e instanceof Ye&&(h||(e.property=s(e.property)))}))}function ee(t){var n=/\n\/\/# sourceMappingURL=data:application\/json(;.*?)?;base64,(.*)/.exec(t)
return n?JSON.parse(new Buffer(n[2],"base64")):(e.AST_Node.warn("inline source map not found"),null)}function te(t,n){n||(n={vars:[],props:[]})
var r=i.readFile(t,"utf8")
return r=JSON.parse(r),r.vars&&r.vars.forEach(function(t){e.push_uniq(n.vars,t)}),r.props&&r.props.forEach(function(t){e.push_uniq(n.props,t)}),n}l.prototype=Object.create(Error.prototype),l.prototype.constructor=l,l.prototype.name="DefaultsError",c(l),l.croak=function(e,t){throw new l(e,t)}
var ne=function(){function e(e,o,a){function s(){var s=o(e[u],u),p=s instanceof i
return p&&(s=s.v),s instanceof t?(s=s.v,s instanceof n?l.push.apply(l,a?s.v.slice().reverse():s.v):l.push(s)):s!==r&&(s instanceof n?c.push.apply(c,a?s.v.slice().reverse():s.v):c.push(s)),p}var u,c=[],l=[]
if(e instanceof Array)if(a){for(u=e.length;--u>=0&&!s(););c.reverse(),l.reverse()}else for(u=0;u<e.length&&!s();++u);else for(u in e)if(w(e,u)&&s())break
return l.concat(c)}function t(e){this.v=e}function n(e){this.v=e}function i(e){this.v=e}e.at_top=function(e){return new t(e)},e.splice=function(e){return new n(e)},e.last=function(e){return new i(e)}
var r=e.skip={}
return e}()
A.prototype={set:function(e,t){return this.has(e)||++this._size,this._values["$"+e]=t,this},add:function(e,t){return this.has(e)?this.get(e).push(t):this.set(e,[t]),this},get:function(e){return this._values["$"+e]},del:function(e){return this.has(e)&&(--this._size,delete this._values["$"+e]),this},has:function(e){return"$"+e in this._values},each:function(e){for(var t in this._values)e(this._values[t],t.substr(1))},size:function(){return this._size},map:function(e){var t=[]
for(var n in this._values)t.push(e(this._values[n],n.substr(1)))
return t},toObject:function(){return this._values}},A.fromObject=function(e){var t=new A
return t._size=f(t._values,e),t}
var ie=F("Token","type value line col pos endline endcol endpos nlb comments_before file raw",{},null),re=F("Node","start end",{_clone:function(e){if(e){var t=this.clone()
return t.transform(new H(function(e){return e!==t?e.clone(!0):void 0}))}return new this.CTOR(this)},clone:function(e){return this._clone(e)},$documentation:"Base class of all AST nodes",$propdoc:{start:"[AST_Token] The first token of this node",end:"[AST_Token] The last token of this node"},_walk:function(e){return e._visit(this)},walk:function(e){return this._walk(e)}},null)
re.warn_function=null,re.warn=function(e,t){re.warn_function&&re.warn_function(y(e,t))}
var oe=F("Statement",null,{$documentation:"Base class of all statements"}),ae=F("Debugger",null,{$documentation:"Represents a debugger statement"},oe),se=F("Directive","value scope quote",{$documentation:'Represents a directive, like " ";',$propdoc:{value:"[string] The value of this directive as a plain string (it's not an AST_String!)",scope:"[AST_Scope/S] The scope that this directive affects",quote:"[string] the original quote character"}},oe),ue=F("SimpleStatement","body",{$documentation:"A statement consisting of an expression, i.e. a = 1 + 2",$propdoc:{body:"[AST_Node] an expression node (should not be instanceof AST_Statement)"},_walk:function(e){return e._visit(this,function(){this.body._walk(e)})}},oe),ce=F("Block","body",{$documentation:"A body of statements (usually bracketed)",$propdoc:{body:"[AST_Statement*] an array of statements"},_walk:function(e){return e._visit(this,function(){S(this,e)})}},oe),le=F("BlockStatement",null,{$documentation:"A block statement"},ce),pe=F("EmptyStatement",null,{$documentation:"The empty statement (empty block or simply a semicolon)",_walk:function(e){return e._visit(this)}},oe),fe=F("StatementWithBody","body",{$documentation:"Base class for all statements that contain one nested body: `For`, `ForIn`, `Do`, `While`, `With`",$propdoc:{body:"[AST_Statement] the body; this should always be present, even if it's an AST_EmptyStatement"},_walk:function(e){return e._visit(this,function(){this.body._walk(e)})}},oe),he=F("LabeledStatement","label",{$documentation:"Statement with a label",$propdoc:{label:"[AST_Label] a label definition"},_walk:function(e){return e._visit(this,function(){this.label._walk(e),this.body._walk(e)})},clone:function(e){var t=this._clone(e)
if(e){var n=t.label,i=this.label
t.walk(new k(function(e){e instanceof Te&&e.label&&e.label.thedef===i&&(e.label.thedef=n,n.references.push(e))}))}return t}},fe),de=F("IterationStatement",null,{$documentation:"Internal class.  All loops inherit from it."},fe),me=F("DWLoop","condition",{$documentation:"Base class for do/while statements",$propdoc:{condition:"[AST_Node] the loop condition.  Should not be instanceof AST_Statement"}},de),ge=F("Do",null,{$documentation:"A `do` statement",_walk:function(e){return e._visit(this,function(){this.body._walk(e),this.condition._walk(e)})}},me),ve=F("While",null,{$documentation:"A `while` statement",_walk:function(e){return e._visit(this,function(){this.condition._walk(e),this.body._walk(e)})}},me),xe=F("For","init condition step",{$documentation:"A `for` statement",$propdoc:{init:"[AST_Node?] the `for` initialization code, or null if empty",condition:"[AST_Node?] the `for` termination clause, or null if empty",step:"[AST_Node?] the `for` update clause, or null if empty"},_walk:function(e){return e._visit(this,function(){this.init&&this.init._walk(e),this.condition&&this.condition._walk(e),this.step&&this.step._walk(e),this.body._walk(e)})}},de),ye=F("ForIn","init name object",{$documentation:"A `for ... in` statement",$propdoc:{init:"[AST_Node] the `for/in` initialization code",name:"[AST_SymbolRef?] the loop variable, only if `init` is AST_Var",object:"[AST_Node] the object that we're looping through"},_walk:function(e){return e._visit(this,function(){this.init._walk(e),this.object._walk(e),this.body._walk(e)})}},de),De=F("With","expression",{$documentation:"A `with` statement",$propdoc:{expression:"[AST_Node] the `with` expression"},_walk:function(e){return e._visit(this,function(){this.expression._walk(e),this.body._walk(e)})}},fe),be=F("Scope","directives variables functions uses_with uses_eval parent_scope enclosed cname",{$documentation:"Base class for all statements introducing a lexical scope",$propdoc:{directives:"[string*/S] an array of directives declared in this scope",variables:"[Object/S] a map of name -> SymbolDef for all variables/functions defined in this scope",functions:"[Object/S] like `variables`, but only lists function declarations",uses_with:"[boolean/S] tells whether this scope uses the `with` statement",uses_eval:"[boolean/S] tells whether this scope contains a direct call to the global `eval`",parent_scope:"[AST_Scope?/S] link to the parent scope",enclosed:"[SymbolDef*/S] a list of all symbol definitions that are accessed from this scope or any subscopes",cname:"[integer/S] current index for mangling variables (used internally by the mangler)"}},ce),Ee=F("Toplevel","globals",{$documentation:"The toplevel scope",$propdoc:{globals:"[Object/S] a map of name -> SymbolDef for all undeclared names"},wrap_enclose:function(e){var t=this,n=[],i=[]
e.forEach(function(e){var t=e.lastIndexOf(":")
n.push(e.substr(0,t)),i.push(e.substr(t+1))})
var r="(function("+i.join(",")+"){ '$ORIG'; })("+n.join(",")+")"
return r=$(r),r=r.transform(new H(function(e){return e instanceof se&&"$ORIG"==e.value?ne.splice(t.body):void 0}))},wrap_commonjs:function(e,t){var n=this,i=[]
t&&(n.figure_out_scope(),n.walk(new k(function(e){e instanceof ft&&e.definition().global&&(s(function(t){return t.name==e.name},i)||i.push(e))})))
var r="(function(exports, global){ '$ORIG'; '$EXPORTS'; global['"+e+"'] = exports; }({}, (function(){return this}())))"
return r=$(r),r=r.transform(new H(function(e){if(e instanceof se)switch(e.value){case"$ORIG":return ne.splice(n.body)
case"$EXPORTS":var t=[]
return i.forEach(function(e){t.push(new ue({body:new it({left:new Ye({expression:new Dt({name:"exports"}),property:new At({value:e.name})}),operator:"=",right:new Dt(e)})}))}),ne.splice(t)}}))}},be),Ce=F("Lambda","name argnames uses_arguments",{$documentation:"Base class for functions",$propdoc:{name:"[AST_SymbolDeclaration?] the name of this function",argnames:"[AST_SymbolFunarg*] array of function arguments",uses_arguments:"[boolean/S] tells whether this function accesses the arguments array"},_walk:function(e){return e._visit(this,function(){this.name&&this.name._walk(e)
for(var t=this.argnames,n=0,i=t.length;i>n;n++)t[n]._walk(e)
S(this,e)})}},be),Ae=F("Accessor",null,{$documentation:"A setter/getter function.  The `name` property is always null."},Ce),we=F("Function",null,{$documentation:"A function expression"},Ce),_e=F("Defun",null,{$documentation:"A function definition"},Ce),Fe=F("Jump",null,{$documentation:"Base class for “jumps” (for now that's `return`, `throw`, `break` and `continue`)"},oe),Se=F("Exit","value",{$documentation:"Base class for “exits” (`return` and `throw`)",$propdoc:{value:"[AST_Node?] the value returned or thrown by this statement; could be null for AST_Return"},_walk:function(e){return e._visit(this,this.value&&function(){this.value._walk(e)})}},Fe),ke=F("Return",null,{$documentation:"A `return` statement"},Se),Be=F("Throw",null,{$documentation:"A `throw` statement"},Se),Te=F("LoopControl","label",{$documentation:"Base class for loop control statements (`break` and `continue`)",$propdoc:{label:"[AST_LabelRef?] the label, or null if none"},_walk:function(e){return e._visit(this,this.label&&function(){this.label._walk(e)})}},Fe),Me=F("Break",null,{$documentation:"A `break` statement"},Te),Pe=F("Continue",null,{$documentation:"A `continue` statement"},Te),Ne=F("If","condition alternative",{$documentation:"A `if` statement",$propdoc:{condition:"[AST_Node] the `if` condition",alternative:"[AST_Statement?] the `else` part, or null if not present"},_walk:function(e){return e._visit(this,function(){this.condition._walk(e),this.body._walk(e),this.alternative&&this.alternative._walk(e)})}},fe),Oe=F("Switch","expression",{$documentation:"A `switch` statement",$propdoc:{expression:"[AST_Node] the `switch` “discriminant”"},_walk:function(e){return e._visit(this,function(){this.expression._walk(e),S(this,e)})}},ce),Ie=F("SwitchBranch",null,{$documentation:"Base class for `switch` branches"},ce),Re=F("Default",null,{$documentation:"A `default` switch branch"},Ie),je=F("Case","expression",{$documentation:"A `case` switch branch",$propdoc:{expression:"[AST_Node] the `case` expression"},_walk:function(e){return e._visit(this,function(){this.expression._walk(e),S(this,e)})}},Ie),qe=F("Try","bcatch bfinally",{$documentation:"A `try` statement",$propdoc:{bcatch:"[AST_Catch?] the catch block, or null if not present",bfinally:"[AST_Finally?] the finally block, or null if not present"},_walk:function(e){return e._visit(this,function(){S(this,e),this.bcatch&&this.bcatch._walk(e),this.bfinally&&this.bfinally._walk(e)})}},ce),Le=F("Catch","argname",{$documentation:"A `catch` node; only makes sense as part of a `try` statement",$propdoc:{argname:"[AST_SymbolCatch] symbol for the exception"},_walk:function(e){return e._visit(this,function(){this.argname._walk(e),S(this,e)})}},ce),ze=F("Finally",null,{$documentation:"A `finally` node; only makes sense as part of a `try` statement"},ce),Ue=F("Definitions","definitions",{$documentation:"Base class for `var` or `const` nodes (variable declarations/initializations)",$propdoc:{definitions:"[AST_VarDef*] array of variable definitions"},_walk:function(e){return e._visit(this,function(){for(var t=this.definitions,n=0,i=t.length;i>n;n++)t[n]._walk(e)})}},oe),Je=F("Var",null,{$documentation:"A `var` statement"},Ue),Xe=F("Const",null,{$documentation:"A `const` statement"},Ue),$e=F("VarDef","name value",{$documentation:"A variable declaration; only appears in a AST_Definitions node",$propdoc:{name:"[AST_SymbolVar|AST_SymbolConst] name of the variable",value:"[AST_Node?] initializer, or null of there's no initializer"},_walk:function(e){return e._visit(this,function(){this.name._walk(e),this.value&&this.value._walk(e)})}}),He=F("Call","expression args",{$documentation:"A function call expression",$propdoc:{expression:"[AST_Node] expression to invoke as function",args:"[AST_Node*] array of arguments"},_walk:function(e){return e._visit(this,function(){this.expression._walk(e)
for(var t=this.args,n=0,i=t.length;i>n;n++)t[n]._walk(e)})}}),We=F("New",null,{$documentation:"An object instantiation.  Derives from a function call since it has exactly the same properties"},He),Ge=F("Seq","car cdr",{$documentation:"A sequence expression (two comma-separated expressions)",$propdoc:{car:"[AST_Node] first element in sequence",cdr:"[AST_Node] second element in sequence"},$cons:function(e,t){var n=new Ge(e)
return n.car=e,n.cdr=t,n},$from_array:function(e){if(0==e.length)return null
if(1==e.length)return e[0].clone()
for(var t=null,n=e.length;--n>=0;)t=Ge.cons(e[n],t)
for(var i=t;i;){if(i.cdr&&!i.cdr.cdr){i.cdr=i.cdr.car
break}i=i.cdr}return t},to_array:function(){for(var e=this,t=[];e;){if(t.push(e.car),e.cdr&&!(e.cdr instanceof Ge)){t.push(e.cdr)
break}e=e.cdr}return t},add:function(e){for(var t=this;t;){if(!(t.cdr instanceof Ge)){var n=Ge.cons(t.cdr,e)
return t.cdr=n}t=t.cdr}},len:function(){return this.cdr instanceof Ge?this.cdr.len()+1:2},_walk:function(e){return e._visit(this,function(){this.car._walk(e),this.cdr&&this.cdr._walk(e)})}}),Ke=F("PropAccess","expression property",{$documentation:'Base class for property access expressions, i.e. `a.foo` or `a["foo"]`',$propdoc:{expression:"[AST_Node] the “container” expression",property:"[AST_Node|string] the property to access.  For AST_Dot this is always a plain string, while for AST_Sub it's an arbitrary AST_Node"}}),Ve=F("Dot",null,{$documentation:"A dotted property access expression",_walk:function(e){return e._visit(this,function(){this.expression._walk(e)})}},Ke),Ye=F("Sub",null,{$documentation:'Index-style property access, i.e. `a["foo"]`',_walk:function(e){return e._visit(this,function(){this.expression._walk(e),this.property._walk(e)})}},Ke),Qe=F("Unary","operator expression",{$documentation:"Base class for unary expressions",$propdoc:{operator:"[string] the operator",expression:"[AST_Node] expression that this unary operator applies to"},_walk:function(e){return e._visit(this,function(){this.expression._walk(e)})}}),Ze=F("UnaryPrefix",null,{$documentation:"Unary prefix expression, i.e. `typeof i` or `++i`"},Qe),et=F("UnaryPostfix",null,{$documentation:"Unary postfix expression, i.e. `i++`"},Qe),tt=F("Binary","left operator right",{$documentation:"Binary expression, i.e. `a + b`",$propdoc:{left:"[AST_Node] left-hand side expression",operator:"[string] the operator",right:"[AST_Node] right-hand side expression"},_walk:function(e){return e._visit(this,function(){this.left._walk(e),this.right._walk(e)})}}),nt=F("Conditional","condition consequent alternative",{$documentation:"Conditional expression using the ternary operator, i.e. `a ? b : c`",$propdoc:{condition:"[AST_Node]",consequent:"[AST_Node]",alternative:"[AST_Node]"},_walk:function(e){return e._visit(this,function(){this.condition._walk(e),this.consequent._walk(e),this.alternative._walk(e)})}}),it=F("Assign",null,{$documentation:"An assignment expression — `a = b + 5`"},tt),rt=F("Array","elements",{$documentation:"An array literal",$propdoc:{elements:"[AST_Node*] array of elements"},_walk:function(e){return e._visit(this,function(){for(var t=this.elements,n=0,i=t.length;i>n;n++)t[n]._walk(e)})}}),ot=F("Object","properties",{$documentation:"An object literal",$propdoc:{properties:"[AST_ObjectProperty*] array of properties"},_walk:function(e){return e._visit(this,function(){for(var t=this.properties,n=0,i=t.length;i>n;n++)t[n]._walk(e)})}}),at=F("ObjectProperty","key value",{$documentation:"Base class for literal object properties",$propdoc:{key:"[string] the property name converted to a string for ObjectKeyVal.  For setters and getters this is an AST_SymbolAccessor.",value:"[AST_Node] property value.  For setters and getters this is an AST_Accessor."},_walk:function(e){return e._visit(this,function(){this.value._walk(e)})}}),st=F("ObjectKeyVal","quote",{$documentation:"A key: value object property",$propdoc:{quote:"[string] the original quote character"}},at),ut=F("ObjectSetter",null,{$documentation:"An object setter property"},at),ct=F("ObjectGetter",null,{$documentation:"An object getter property"},at),lt=F("Symbol","scope name thedef",{$propdoc:{name:"[string] name of this symbol",scope:"[AST_Scope/S] the current scope (not necessarily the definition scope)",thedef:"[SymbolDef/S] the definition of this symbol"},$documentation:"Base class for all symbols"}),pt=F("SymbolAccessor",null,{$documentation:"The name of a property accessor (setter/getter function)"},lt),ft=F("SymbolDeclaration","init",{$documentation:"A declaration symbol (symbol in var/const, function name or argument, symbol in catch)"},lt),ht=F("SymbolVar",null,{$documentation:"Symbol defining a variable"},ft),dt=F("SymbolConst",null,{$documentation:"A constant declaration"},ft),mt=F("SymbolFunarg",null,{$documentation:"Symbol naming a function argument"},ht),gt=F("SymbolDefun",null,{$documentation:"Symbol defining a function"},ft),vt=F("SymbolLambda",null,{$documentation:"Symbol naming a function expression"},ft),xt=F("SymbolCatch",null,{$documentation:"Symbol naming the exception in catch"},ft),yt=F("Label","references",{$documentation:"Symbol naming a label (declaration)",$propdoc:{references:"[AST_LoopControl*] a list of nodes referring to this label"},initialize:function(){this.references=[],this.thedef=this}},lt),Dt=F("SymbolRef",null,{$documentation:"Reference to some symbol (not definition/declaration)"},lt),bt=F("LabelRef",null,{$documentation:"Reference to a label symbol"},lt),Et=F("This",null,{$documentation:"The `this` symbol"},lt),Ct=F("Constant",null,{$documentation:"Base class for all constants",getValue:function(){return this.value}}),At=F("String","value quote",{$documentation:"A string literal",$propdoc:{value:"[string] the contents of this string",quote:"[string] the original quote character"}},Ct),wt=F("Number","value literal",{$documentation:"A number literal",$propdoc:{value:"[number] the numeric value",literal:"[string] numeric value as string (optional)"}},Ct),_t=F("RegExp","value",{$documentation:"A regexp literal",$propdoc:{value:"[RegExp] the actual regexp"}},Ct),Ft=F("Atom",null,{$documentation:"Base class for atoms"},Ct),St=F("Null",null,{$documentation:"The `null` atom",value:null},Ft),kt=F("NaN",null,{$documentation:"The impossible value",value:NaN},Ft),Bt=F("Undefined",null,{$documentation:"The `undefined` value",value:void 0},Ft),Tt=F("Hole",null,{$documentation:"A hole in an array",value:void 0},Ft),Mt=F("Infinity",null,{$documentation:"The `Infinity` value",value:1/0},Ft),Pt=F("Boolean",null,{$documentation:"Base class for booleans"},Ft),Nt=F("False",null,{$documentation:"The `false` atom",value:!1},Pt),Ot=F("True",null,{$documentation:"The `true` atom",value:!0},Pt)
k.prototype={_visit:function(e,t){this.push(e)
var n=this.visit(e,t?function(){t.call(e)}:h)
return!n&&t&&t.call(e),this.pop(e),n},parent:function(e){return this.stack[this.stack.length-2-(e||0)]},push:function(e){e instanceof Ce?this.directives=Object.create(this.directives):e instanceof se&&!this.directives[e.value]&&(this.directives[e.value]=e),this.stack.push(e)},pop:function(e){this.stack.pop(),e instanceof Ce&&(this.directives=Object.getPrototypeOf(this.directives))},self:function(){return this.stack[this.stack.length-1]},find_parent:function(e){for(var t=this.stack,n=t.length;--n>=0;){var i=t[n]
if(i instanceof e)return i}},has_directive:function(e){var t=this.directives[e]
if(t)return t
var n=this.stack[this.stack.length-1]
if(n instanceof be)for(var i=0;i<n.body.length;++i){var r=n.body[i]
if(!(r instanceof se))break
if(r.value==e)return r}},in_boolean_context:function(){for(var e=this.stack,t=e.length,n=e[--t];t>0;){var i=e[--t]
if(i instanceof Ne&&i.condition===n||i instanceof nt&&i.condition===n||i instanceof me&&i.condition===n||i instanceof xe&&i.condition===n||i instanceof Ze&&"!"==i.operator&&i.expression===n)return!0
if(!(i instanceof tt)||"&&"!=i.operator&&"||"!=i.operator)return!1
n=i}},loopcontrol_target:function(e){var t=this.stack
if(e.label)for(var n=t.length;--n>=0;){var i=t[n]
if(i instanceof he&&i.label.name==e.label.name)return i.body}else for(var n=t.length;--n>=0;){var i=t[n]
if(i instanceof de||e instanceof Me&&i instanceof Oe)return i}}}
var It="break case catch const continue debugger default delete do else finally for function if in instanceof new return switch throw try typeof var void while with",Rt="false null true",jt="abstract boolean byte char class double enum export extends final float goto implements import int interface let long native package private protected public short static super synchronized this throws transient volatile yield "+Rt+" "+It,qt="return new delete throw else case"
It=E(It),jt=E(jt),qt=E(qt),Rt=E(Rt)
var Lt=E(o("+-*&%=<>!?|~^")),zt=/^0x[0-9a-f]+$/i,Ut=/^0[0-7]+$/,Jt=E(["in","instanceof","typeof","new","void","delete","++","--","+","-","!","~","&","|","^","*","/","%",">>","<<",">>>","<",">","<=",">=","==","===","!=","!==","?","=","+=","-=","/=","*=","%=",">>=","<<=",">>>=","|=","^=","&=","&&","||"]),Xt=E(o("  \n\r	\f\x0B​           \u2028\u2029  　\ufeff")),$t=E(o("\n\r\u2028\u2029")),Ht=E(o("[{(,;:")),Wt=E(o("[]{}(),;:")),Gt=(E(o("gmsiy")),{letter:RegExp("[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0-\\u08B2\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0980\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA69D\\uA6A0-\\uA6EF\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA7AD\\uA7B0\\uA7B1\\uA7F7-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uA9E0-\\uA9E4\\uA9E6-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB5F\\uAB64\\uAB65\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"),digit:RegExp("[\\u0030-\\u0039\\u0660-\\u0669\\u06F0-\\u06F9\\u07C0-\\u07C9\\u0966-\\u096F\\u09E6-\\u09EF\\u0A66-\\u0A6F\\u0AE6-\\u0AEF\\u0B66-\\u0B6F\\u0BE6-\\u0BEF\\u0C66-\\u0C6F\\u0CE6-\\u0CEF\\u0D66-\\u0D6F\\u0DE6-\\u0DEF\\u0E50-\\u0E59\\u0ED0-\\u0ED9\\u0F20-\\u0F29\\u1040-\\u1049\\u1090-\\u1099\\u17E0-\\u17E9\\u1810-\\u1819\\u1946-\\u194F\\u19D0-\\u19D9\\u1A80-\\u1A89\\u1A90-\\u1A99\\u1B50-\\u1B59\\u1BB0-\\u1BB9\\u1C40-\\u1C49\\u1C50-\\u1C59\\uA620-\\uA629\\uA8D0-\\uA8D9\\uA900-\\uA909\\uA9D0-\\uA9D9\\uA9F0-\\uA9F9\\uAA50-\\uAA59\\uABF0-\\uABF9\\uFF10-\\uFF19]"),non_spacing_mark:RegExp("[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065E\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0900-\\u0902\\u093C\\u0941-\\u0948\\u094D\\u0951-\\u0955\\u0962\\u0963\\u0981\\u09BC\\u09C1-\\u09C4\\u09CD\\u09E2\\u09E3\\u0A01\\u0A02\\u0A3C\\u0A41\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81\\u0A82\\u0ABC\\u0AC1-\\u0AC5\\u0AC7\\u0AC8\\u0ACD\\u0AE2\\u0AE3\\u0B01\\u0B3C\\u0B3F\\u0B41-\\u0B44\\u0B4D\\u0B56\\u0B62\\u0B63\\u0B82\\u0BC0\\u0BCD\\u0C3E-\\u0C40\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0CBC\\u0CBF\\u0CC6\\u0CCC\\u0CCD\\u0CE2\\u0CE3\\u0D41-\\u0D44\\u0D4D\\u0D62\\u0D63\\u0DCA\\u0DD2-\\u0DD4\\u0DD6\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F71-\\u0F7E\\u0F80-\\u0F84\\u0F86\\u0F87\\u0F90-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102D-\\u1030\\u1032-\\u1037\\u1039\\u103A\\u103D\\u103E\\u1058\\u1059\\u105E-\\u1060\\u1071-\\u1074\\u1082\\u1085\\u1086\\u108D\\u109D\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B7-\\u17BD\\u17C6\\u17C9-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u1922\\u1927\\u1928\\u1932\\u1939-\\u193B\\u1A17\\u1A18\\u1A56\\u1A58-\\u1A5E\\u1A60\\u1A62\\u1A65-\\u1A6C\\u1A73-\\u1A7C\\u1A7F\\u1B00-\\u1B03\\u1B34\\u1B36-\\u1B3A\\u1B3C\\u1B42\\u1B6B-\\u1B73\\u1B80\\u1B81\\u1BA2-\\u1BA5\\u1BA8\\u1BA9\\u1C2C-\\u1C33\\u1C36\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE0\\u1CE2-\\u1CE8\\u1CED\\u1DC0-\\u1DE6\\u1DFD-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F\\uA67C\\uA67D\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA825\\uA826\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA951\\uA980-\\uA982\\uA9B3\\uA9B6-\\uA9B9\\uA9BC\\uAA29-\\uAA2E\\uAA31\\uAA32\\uAA35\\uAA36\\uAA43\\uAA4C\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uABE5\\uABE8\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE26]"),space_combining_mark:RegExp("[\\u0903\\u093E-\\u0940\\u0949-\\u094C\\u094E\\u0982\\u0983\\u09BE-\\u09C0\\u09C7\\u09C8\\u09CB\\u09CC\\u09D7\\u0A03\\u0A3E-\\u0A40\\u0A83\\u0ABE-\\u0AC0\\u0AC9\\u0ACB\\u0ACC\\u0B02\\u0B03\\u0B3E\\u0B40\\u0B47\\u0B48\\u0B4B\\u0B4C\\u0B57\\u0BBE\\u0BBF\\u0BC1\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCC\\u0BD7\\u0C01-\\u0C03\\u0C41-\\u0C44\\u0C82\\u0C83\\u0CBE\\u0CC0-\\u0CC4\\u0CC7\\u0CC8\\u0CCA\\u0CCB\\u0CD5\\u0CD6\\u0D02\\u0D03\\u0D3E-\\u0D40\\u0D46-\\u0D48\\u0D4A-\\u0D4C\\u0D57\\u0D82\\u0D83\\u0DCF-\\u0DD1\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0F3E\\u0F3F\\u0F7F\\u102B\\u102C\\u1031\\u1038\\u103B\\u103C\\u1056\\u1057\\u1062-\\u1064\\u1067-\\u106D\\u1083\\u1084\\u1087-\\u108C\\u108F\\u109A-\\u109C\\u17B6\\u17BE-\\u17C5\\u17C7\\u17C8\\u1923-\\u1926\\u1929-\\u192B\\u1930\\u1931\\u1933-\\u1938\\u19B0-\\u19C0\\u19C8\\u19C9\\u1A19-\\u1A1B\\u1A55\\u1A57\\u1A61\\u1A63\\u1A64\\u1A6D-\\u1A72\\u1B04\\u1B35\\u1B3B\\u1B3D-\\u1B41\\u1B43\\u1B44\\u1B82\\u1BA1\\u1BA6\\u1BA7\\u1BAA\\u1C24-\\u1C2B\\u1C34\\u1C35\\u1CE1\\u1CF2\\uA823\\uA824\\uA827\\uA880\\uA881\\uA8B4-\\uA8C3\\uA952\\uA953\\uA983\\uA9B4\\uA9B5\\uA9BA\\uA9BB\\uA9BD-\\uA9C0\\uAA2F\\uAA30\\uAA33\\uAA34\\uAA4D\\uAA7B\\uABE3\\uABE4\\uABE6\\uABE7\\uABE9\\uABEA\\uABEC]"),connector_punctuation:RegExp("[\\u005F\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F]")})
z.prototype=Object.create(Error.prototype),z.prototype.constructor=z,z.prototype.name="SyntaxError",c(z)
var Kt={},Vt=E(["typeof","void","delete","--","++","!","~","-","+"]),Yt=E(["--","++"]),Qt=E(["=","+=","-=","/=","*=","%=",">>=","<<=",">>>=","|=","^=","&="]),Zt=function(e,t){for(var n=0;n<e.length;++n)for(var i=e[n],r=0;r<i.length;++r)t[i[r]]=n+1
return t}([["||"],["&&"],["|"],["^"],["&"],["==","===","!=","!=="],["<",">","<=",">=","in","instanceof"],[">>","<<",">>>"],["+","-"],["*","/","%"]],{}),en=(r(["for","do","while","switch"]),r(["atom","num","string","regexp","name"]))
H.prototype=new k,function(e){function t(t,n){t.DEFMETHOD("transform",function(t,i){var r,o
return t.push(this),t.before&&(r=t.before(this,n,i)),r===e&&(t.after?(t.stack[t.stack.length-1]=r=this,n(r,t),o=t.after(r,i),o!==e&&(r=o)):(r=this,n(r,t))),t.pop(this),r})}function n(e,t){return ne(e,function(e){return e.transform(t,!0)})}t(re,h),t(he,function(e,t){e.label=e.label.transform(t),e.body=e.body.transform(t)}),t(ue,function(e,t){e.body=e.body.transform(t)}),t(ce,function(e,t){e.body=n(e.body,t)}),t(me,function(e,t){e.condition=e.condition.transform(t),e.body=e.body.transform(t)}),t(xe,function(e,t){e.init&&(e.init=e.init.transform(t)),e.condition&&(e.condition=e.condition.transform(t)),e.step&&(e.step=e.step.transform(t)),e.body=e.body.transform(t)}),t(ye,function(e,t){e.init=e.init.transform(t),e.object=e.object.transform(t),e.body=e.body.transform(t)}),t(De,function(e,t){e.expression=e.expression.transform(t),e.body=e.body.transform(t)}),t(Se,function(e,t){e.value&&(e.value=e.value.transform(t))}),t(Te,function(e,t){e.label&&(e.label=e.label.transform(t))}),t(Ne,function(e,t){e.condition=e.condition.transform(t),e.body=e.body.transform(t),e.alternative&&(e.alternative=e.alternative.transform(t))}),t(Oe,function(e,t){e.expression=e.expression.transform(t),e.body=n(e.body,t)}),t(je,function(e,t){e.expression=e.expression.transform(t),e.body=n(e.body,t)}),t(qe,function(e,t){e.body=n(e.body,t),e.bcatch&&(e.bcatch=e.bcatch.transform(t)),e.bfinally&&(e.bfinally=e.bfinally.transform(t))}),t(Le,function(e,t){e.argname=e.argname.transform(t),e.body=n(e.body,t)}),t(Ue,function(e,t){e.definitions=n(e.definitions,t)}),t($e,function(e,t){e.name=e.name.transform(t),e.value&&(e.value=e.value.transform(t))}),t(Ce,function(e,t){e.name&&(e.name=e.name.transform(t)),e.argnames=n(e.argnames,t),e.body=n(e.body,t)}),t(He,function(e,t){e.expression=e.expression.transform(t),e.args=n(e.args,t)}),t(Ge,function(e,t){e.car=e.car.transform(t),e.cdr=e.cdr.transform(t)}),t(Ve,function(e,t){e.expression=e.expression.transform(t)}),t(Ye,function(e,t){e.expression=e.expression.transform(t),e.property=e.property.transform(t)}),t(Qe,function(e,t){e.expression=e.expression.transform(t)}),t(tt,function(e,t){e.left=e.left.transform(t),e.right=e.right.transform(t)}),t(nt,function(e,t){e.condition=e.condition.transform(t),e.consequent=e.consequent.transform(t),e.alternative=e.alternative.transform(t)}),t(rt,function(e,t){e.elements=n(e.elements,t)}),t(ot,function(e,t){e.properties=n(e.properties,t)}),t(at,function(e,t){e.value=e.value.transform(t)})}(),W.next_id=1,W.prototype={unmangleable:function(e){return e||(e={}),this.global&&!e.toplevel||this.undeclared||!e.eval&&(this.scope.uses_eval||this.scope.uses_with)||e.keep_fnames&&(this.orig[0]instanceof vt||this.orig[0]instanceof gt)},mangle:function(e){var t=e.cache&&e.cache.props
if(this.global&&t&&t.has(this.name))this.mangled_name=t.get(this.name)
else if(!this.mangled_name&&!this.unmangleable(e)){var n=this.scope,i=this.orig[0]
!e.screw_ie8&&i instanceof vt&&(n=n.parent_scope)
var r
this.defun&&(r=this.defun.variables.get(this.name))?this.mangled_name=r.mangled_name||r.name:this.mangled_name=n.next_mangled(e,this),this.global&&t&&t.set(this.name,this.mangled_name)}}},Ee.DEFMETHOD("figure_out_scope",function(e){e=p(e,{cache:null,screw_ie8:!0})
var t=this,n=t.parent_scope=null,i=new A,r=null,o=new k(function(t,o){if(t instanceof Le){var a=n
return n=new be(t),n.init_scope_vars(a),o(),n=a,!0}if(t instanceof be){t.init_scope_vars(n)
var a=n,s=r,u=i
return r=n=t,i=new A,o(),n=a,r=s,i=u,!0}if(t instanceof he){var c=t.label
if(i.has(c.name))throw Error(y("Label {name} defined twice",c))
return i.set(c.name,c),o(),i.del(c.name),!0}if(t instanceof De)for(var l=n;l;l=l.parent_scope)l.uses_with=!0
else if(t instanceof lt&&(t.scope=n),t instanceof yt&&(t.thedef=t,t.references=[]),t instanceof vt)r.def_function(t)
else if(t instanceof gt)(t.scope=r.parent_scope).def_function(t)
else if(t instanceof ht||t instanceof dt){if(r.def_variable(t),r!==n){t.mark_enclosed(e)
var p=n.find_variable(t)
t.thedef!==p&&(t.thedef=p,t.reference(e))}}else if(t instanceof xt)n.def_variable(t).defun=r
else if(t instanceof bt){var f=i.get(t.name)
if(!f)throw Error(y("Undefined label {name} [{line},{col}]",{name:t.name,line:t.start.line,col:t.start.col}))
t.thedef=f}})
t.walk(o)
var a=null,o=(t.globals=new A,new k(function(n,i){if(n instanceof Ce){var r=a
return a=n,i(),a=r,!0}if(n instanceof Te&&n.label)return n.label.thedef.references.push(n),!0
if(n instanceof Dt){var s=n.name
if("eval"==s&&o.parent()instanceof He)for(var u=n.scope;u&&!u.uses_eval;u=u.parent_scope)u.uses_eval=!0
var c=n.scope.find_variable(s)
return n.scope instanceof Ce&&"arguments"==s&&(n.scope.uses_arguments=!0),c||(c=t.def_global(n)),n.thedef=c,n.reference(e),!0}}))
t.walk(o),e.screw_ie8||t.walk(new k(function(n,i){if(n instanceof xt){var r=n.name,o=n.thedef.references,a=n.thedef.defun,s=a.find_variable(r)||t.globals.get(r)||a.def_variable(n)
return o.forEach(function(t){t.thedef=s,t.reference(e)}),n.thedef=s,!0}})),e.cache&&(this.cname=e.cache.cname)}),Ee.DEFMETHOD("def_global",function(e){var t=this.globals,n=e.name
if(t.has(n))return t.get(n)
var i=new W(this,t.size(),e)
return i.undeclared=!0,i.global=!0,t.set(n,i),i}),be.DEFMETHOD("init_scope_vars",function(e){this.variables=new A,this.functions=new A,this.uses_with=!1,this.uses_eval=!1,this.parent_scope=e,this.enclosed=[],this.cname=-1}),Ce.DEFMETHOD("init_scope_vars",function(){be.prototype.init_scope_vars.apply(this,arguments),this.uses_arguments=!1,this.def_variable(new ht({name:"arguments",start:this.start,end:this.end}))}),lt.DEFMETHOD("mark_enclosed",function(e){for(var t=this.definition(),n=this.scope;n&&(x(n.enclosed,t),e.keep_fnames&&n.functions.each(function(e){x(t.scope.enclosed,e)}),n!==t.scope);)n=n.parent_scope}),lt.DEFMETHOD("reference",function(e){this.definition().references.push(this),this.mark_enclosed(e)}),be.DEFMETHOD("find_variable",function(e){return e instanceof lt&&(e=e.name),this.variables.get(e)||this.parent_scope&&this.parent_scope.find_variable(e)}),be.DEFMETHOD("def_function",function(e){this.functions.set(e.name,this.def_variable(e))}),be.DEFMETHOD("def_variable",function(e){var t
return this.variables.has(e.name)?(t=this.variables.get(e.name),t.orig.push(e)):(t=new W(this,this.variables.size(),e),this.variables.set(e.name,t),t.global=!this.parent_scope),e.thedef=t}),be.DEFMETHOD("next_mangled",function(e){var t=this.enclosed
e:for(;;){var n=tn(++this.cname)
if(I(n)&&!(e.except.indexOf(n)>=0)){for(var i=t.length;--i>=0;){var r=t[i],o=r.mangled_name||r.unmangleable(e)&&r.name
if(n==o)continue e}return n}}}),we.DEFMETHOD("next_mangled",function(e,t){for(var n=t.orig[0]instanceof mt&&this.name&&this.name.definition(),i=n?n.mangled_name||n.name:null;;){var r=Ce.prototype.next_mangled.call(this,e,t)
if(!i||i!=r)return r}}),lt.DEFMETHOD("unmangleable",function(e){return this.definition().unmangleable(e)}),yt.DEFMETHOD("unmangleable",function(){return!1}),lt.DEFMETHOD("unreferenced",function(){return 0==this.definition().references.length&&!(this.scope.uses_eval||this.scope.uses_with)}),lt.DEFMETHOD("undeclared",function(){return this.definition().undeclared}),bt.DEFMETHOD("undeclared",function(){return!1}),yt.DEFMETHOD("undeclared",function(){return!1}),lt.DEFMETHOD("definition",function(){return this.thedef}),lt.DEFMETHOD("global",function(){return this.definition().global}),Ee.DEFMETHOD("_default_mangler_options",function(e){return p(e,{eval:!1,except:[],keep_fnames:!1,screw_ie8:!0,sort:!1,toplevel:!1})}),Ee.DEFMETHOD("mangle_names",function(e){e=this._default_mangler_options(e),e.except.push("arguments")
var t=-1,n=[]
e.cache&&this.globals.each(function(t){e.except.indexOf(t.name)<0&&n.push(t)})
var i=new k(function(r,o){if(r instanceof he){var a=t
return o(),t=a,!0}if(r instanceof be){var s=(i.parent(),[])
return r.variables.each(function(t){e.except.indexOf(t.name)<0&&s.push(t)}),void n.push.apply(n,s)}if(r instanceof yt){var u
do u=tn(++t)
while(!I(u))
return r.mangled_name=u,!0}return e.screw_ie8&&r instanceof xt?void n.push(r.definition()):void 0})
this.walk(i),n.forEach(function(t){t.mangle(e)}),e.cache&&(e.cache.cname=this.cname)}),Ee.DEFMETHOD("compute_char_frequency",function(e){e=this._default_mangler_options(e)
var t=new k(function(t){t instanceof Ct?tn.consider(t.print_to_string()):t instanceof ke?tn.consider("return"):t instanceof Be?tn.consider("throw"):t instanceof Pe?tn.consider("continue"):t instanceof Me?tn.consider("break"):t instanceof ae?tn.consider("debugger"):t instanceof se?tn.consider(t.value):t instanceof ve?tn.consider("while"):t instanceof ge?tn.consider("do while"):t instanceof Ne?(tn.consider("if"),t.alternative&&tn.consider("else")):t instanceof Je?tn.consider("var"):t instanceof Xe?tn.consider("const"):t instanceof Ce?tn.consider("function"):t instanceof xe?tn.consider("for"):t instanceof ye?tn.consider("for in"):t instanceof Oe?tn.consider("switch"):t instanceof je?tn.consider("case"):t instanceof Re?tn.consider("default"):t instanceof De?tn.consider("with"):t instanceof ut?tn.consider("set"+t.key):t instanceof ct?tn.consider("get"+t.key):t instanceof st?tn.consider(t.key):t instanceof We?tn.consider("new"):t instanceof Et?tn.consider("this"):t instanceof qe?tn.consider("try"):t instanceof Le?tn.consider("catch"):t instanceof ze?tn.consider("finally"):t instanceof lt&&t.unmangleable(e)?tn.consider(t.name):t instanceof Qe||t instanceof tt?tn.consider(t.operator):t instanceof Ve&&tn.consider(t.property)})
this.walk(t),tn.sort()})
var tn=function(){function e(){i=Object.create(null),n=r.split("").map(function(e){return e.charCodeAt(0)}),n.forEach(function(e){i[e]=0})}function t(e){var t="",i=54
e++
do e--,t+=String.fromCharCode(n[e%i]),e=Math.floor(e/i),i=64
while(e>0)
return t}var n,i,r="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_0123456789"
return t.consider=function(e){for(var t=e.length;--t>=0;){var n=e.charCodeAt(t)
n in i&&++i[n]}},t.sort=function(){n=b(n,function(e,t){return T(e)&&!T(t)?1:T(t)&&!T(e)?-1:i[t]-i[e]})},t.reset=e,e(),t.get=function(){return n},t.freq=function(){return i},t}()
Ee.DEFMETHOD("scope_warnings",function(e){e=p(e,{assign_to_global:!0,eval:!0,func_arguments:!0,nested_defuns:!0,undeclared:!1,unreferenced:!0})
var t=new k(function(n){if(e.undeclared&&n instanceof Dt&&n.undeclared()&&re.warn("Undeclared symbol: {name} [{file}:{line},{col}]",{name:n.name,file:n.start.file,line:n.start.line,col:n.start.col}),e.assign_to_global){var i=null
n instanceof it&&n.left instanceof Dt?i=n.left:n instanceof ye&&n.init instanceof Dt&&(i=n.init),i&&(i.undeclared()||i.global()&&i.scope!==i.definition().scope)&&re.warn("{msg}: {name} [{file}:{line},{col}]",{msg:i.undeclared()?"Accidental global?":"Assignment to global",name:i.name,file:i.start.file,line:i.start.line,col:i.start.col})}e.eval&&n instanceof Dt&&n.undeclared()&&"eval"==n.name&&re.warn("Eval is used [{file}:{line},{col}]",n.start),e.unreferenced&&(n instanceof ft||n instanceof yt)&&!(n instanceof xt)&&n.unreferenced()&&re.warn("{type} {name} is declared but not referenced [{file}:{line},{col}]",{type:n instanceof yt?"Label":"Symbol",name:n.name,file:n.start.file,line:n.start.line,col:n.start.col}),e.func_arguments&&n instanceof Ce&&n.uses_arguments&&re.warn("arguments used in function {name} [{file}:{line},{col}]",{name:n.name?n.name.name:"anonymous",file:n.start.file,line:n.start.line,col:n.start.col}),e.nested_defuns&&n instanceof _e&&!(t.parent()instanceof be)&&re.warn('Function {name} declared in nested statement "{type}" [{file}:{line},{col}]',{name:n.name.name,type:t.parent().TYPE,file:n.start.file,line:n.start.line,col:n.start.col})})
this.walk(t)})
var nn=/^$|[;{][\s\n]*$/
!function(){function e(e,t){e.DEFMETHOD("_codegen",t)}function t(e,n){Array.isArray(e)?e.forEach(function(e){t(e,n)}):e.DEFMETHOD("needs_parens",n)}function n(e,t,n,i){var r=e.length-1
v=i,e.forEach(function(e,i){v!==!0||e instanceof se||e instanceof pe||e instanceof ue&&e.body instanceof At||(v=!1),e instanceof pe||(n.indent(),e.print(n),i==r&&t||(n.newline(),t&&n.newline())),v===!0&&e instanceof ue&&e.body instanceof At&&(v=!1)}),v=!1}function i(e,t,i){e.length>0?t.with_block(function(){n(e,!1,t,i)}):t.print("{}")}function r(e,t){var n=e.body
if(t.option("bracketize")||!t.option("screw_ie8")&&n instanceof ge)return f(n,t)
if(!n)return t.force_semicolon()
for(;;)if(n instanceof Ne){if(!n.alternative)return void f(e.body,t)
n=n.alternative}else{if(!(n instanceof fe))break
n=n.body}u(e.body,t)}function o(e,t,n){if(n)try{e.walk(new k(function(e){if(e instanceof tt&&"in"==e.operator)throw t})),e.print(t)}catch(i){if(i!==t)throw i
e.print(t,!0)}else e.print(t)}function a(e,t,n){n.option("quote_keys")?n.print_string(e+""):("number"==typeof e||!n.option("beautify")&&+e+""==e)&&parseFloat(e)>=0?n.print(p(e)):(jt(e)?n.option("screw_ie8"):q(e))?t&&n.option("keep_quoted_props")?n.print_string(e,t):n.print_name(e):n.print_string(e,t)}function s(e){return[92,47,46,43,42,63,40,41,91,93,123,125,36,94,58,124,33,10,13,0,65279,8232,8233].indexOf(e)<0}function u(e,t){t.option("bracketize")?f(e,t):!e||e instanceof pe?t.force_semicolon():e.print(t)}function c(e,t){return e.args.length>0?!0:t.option("beautify")}function l(e){for(var t=e[0],n=t.length,i=1;i<e.length;++i)e[i].length<n&&(t=e[i],n=t.length)
return t}function p(e){var t,n=e.toString(10),i=[n.replace(/^0\./,".").replace("e+","e")]
return Math.floor(e)===e?(e>=0?i.push("0x"+e.toString(16).toLowerCase(),"0"+e.toString(8)):i.push("-0x"+(-e).toString(16).toLowerCase(),"-0"+(-e).toString(8)),(t=/^(.*?)(0+)$/.exec(e))&&i.push(t[1]+"e"+t[2].length)):(t=/^0?\.(0+)(.*)$/.exec(e))&&i.push(t[2]+"e-"+(t[1].length+t[2].length),n.substr(n.indexOf("."))),l(i)}function f(e,t){!e||e instanceof pe?t.print("{}"):e instanceof le?e.print(t):t.with_block(function(){t.indent(),e.print(t),t.newline()})}function d(e,t){e.DEFMETHOD("add_source_map",function(e){t(this,e)})}function m(e,t){t.add_mapping(e.start)}var g=!1,v=!1
re.DEFMETHOD("print",function(e,t){function n(){i.add_comments(e),i.add_source_map(e),r(i,e)}var i=this,r=i._codegen,o=g
i instanceof se&&"use asm"==i.value&&e.parent()instanceof be&&(g=!0),e.push_node(i),t||i.needs_parens(e)?e.with_parens(n):n(),e.pop_node(),i instanceof be&&(g=o)}),re.DEFMETHOD("print_to_string",function(e){var t=K(e)
return e||(t._readonly=!0),this.print(t),t.get()}),re.DEFMETHOD("add_comments",function(e){if(!e._readonly){var t=this,n=t.start
if(n&&!n._comments_dumped){n._comments_dumped=!0
var i=n.comments_before||[]
if(t instanceof Se&&t.value&&t.value.walk(new k(function(e){return e.start&&e.start.comments_before&&(i=i.concat(e.start.comments_before),e.start.comments_before=[]),e instanceof we||e instanceof rt||e instanceof ot?!0:void 0})),0==e.pos()){i.length>0&&e.option("shebang")&&"comment5"==i[0].type&&(e.print("#!"+i.shift().value+"\n"),e.indent())
var r=e.option("preamble")
r&&e.print(r.replace(/\r\n?|[\n\u2028\u2029]|\s*$/g,"\n"))}i=i.filter(e.comment_filter,t),!e.option("beautify")&&i.length>0&&/comment[134]/.test(i[0].type)&&0!==e.col()&&i[0].nlb&&e.print("\n"),i.forEach(function(t){/comment[134]/.test(t.type)?(e.print("//"+t.value+"\n"),e.indent()):"comment2"==t.type&&(e.print("/*"+t.value+"*/"),n.nlb?(e.print("\n"),e.indent()):e.space())})}}}),t(re,function(){return!1}),t(we,function(e){if(_(e))return!0
if(e.option("wrap_iife")){var t=e.parent()
return t instanceof He&&t.expression===this}return!1}),t(ot,function(e){return _(e)}),t(Qe,function(e){var t=e.parent()
return t instanceof Ke&&t.expression===this||t instanceof He&&t.expression===this}),t(Ge,function(e){var t=e.parent()
return t instanceof He||t instanceof Qe||t instanceof tt||t instanceof $e||t instanceof Ke||t instanceof rt||t instanceof at||t instanceof nt}),t(tt,function(e){var t=e.parent()
if(t instanceof He&&t.expression===this)return!0
if(t instanceof Qe)return!0
if(t instanceof Ke&&t.expression===this)return!0
if(t instanceof tt){var n=t.operator,i=Zt[n],r=this.operator,o=Zt[r]
if(i>o||i==o&&this===t.right)return!0}}),t(Ke,function(e){var t=e.parent()
if(t instanceof We&&t.expression===this)try{this.walk(new k(function(e){if(e instanceof He)throw t}))}catch(n){if(n!==t)throw n
return!0}}),t(He,function(e){var t,n=e.parent()
return n instanceof We&&n.expression===this?!0:this.expression instanceof we&&n instanceof Ke&&n.expression===this&&(t=e.parent(1))instanceof it&&t.left===n}),t(We,function(e){var t=e.parent()
return!c(this,e)&&(t instanceof Ke||t instanceof He&&t.expression===this)?!0:void 0}),t(wt,function(e){var t=e.parent()
if(t instanceof Ke&&t.expression===this){var n=this.getValue()
if(0>n||/^0/.test(p(n)))return!0}}),t([it,nt],function(e){var t=e.parent()
return t instanceof Qe?!0:t instanceof tt&&!(t instanceof it)?!0:t instanceof He&&t.expression===this?!0:t instanceof nt&&t.condition===this?!0:t instanceof Ke&&t.expression===this?!0:void 0}),e(se,function(e,t){t.print_string(e.value,e.quote),t.semicolon()}),e(ae,function(e,t){t.print("debugger"),t.semicolon()}),fe.DEFMETHOD("_do_print_body",function(e){u(this.body,e)}),e(oe,function(e,t){e.body.print(t),t.semicolon()}),e(Ee,function(e,t){n(e.body,!0,t,!0),t.print("")}),e(he,function(e,t){e.label.print(t),t.colon(),e.body.print(t)}),e(ue,function(e,t){e.body.print(t),t.semicolon()}),e(le,function(e,t){i(e.body,t)}),e(pe,function(e,t){t.semicolon()}),e(ge,function(e,t){t.print("do"),t.space(),f(e.body,t),t.space(),t.print("while"),t.space(),t.with_parens(function(){e.condition.print(t)}),t.semicolon()}),e(ve,function(e,t){t.print("while"),t.space(),t.with_parens(function(){e.condition.print(t)}),t.space(),e._do_print_body(t)}),e(xe,function(e,t){t.print("for"),t.space(),t.with_parens(function(){e.init?(e.init instanceof Ue?e.init.print(t):o(e.init,t,!0),t.print(";"),t.space()):t.print(";"),e.condition?(e.condition.print(t),t.print(";"),t.space()):t.print(";"),e.step&&e.step.print(t)}),t.space(),e._do_print_body(t)}),e(ye,function(e,t){t.print("for"),t.space(),t.with_parens(function(){e.init.print(t),t.space(),t.print("in"),t.space(),e.object.print(t)}),t.space(),e._do_print_body(t)}),e(De,function(e,t){t.print("with"),t.space(),t.with_parens(function(){e.expression.print(t)}),t.space(),e._do_print_body(t)}),Ce.DEFMETHOD("_do_print",function(e,t){var n=this
t||e.print("function"),n.name&&(e.space(),n.name.print(e)),e.with_parens(function(){n.argnames.forEach(function(t,n){n&&e.comma(),t.print(e)})}),e.space(),i(n.body,e,!0)}),e(Ce,function(e,t){e._do_print(t)}),Se.DEFMETHOD("_do_print",function(e,t){e.print(t),this.value&&(e.space(),this.value.print(e)),e.semicolon()}),e(ke,function(e,t){e._do_print(t,"return")}),e(Be,function(e,t){e._do_print(t,"throw")}),Te.DEFMETHOD("_do_print",function(e,t){e.print(t),this.label&&(e.space(),this.label.print(e)),e.semicolon()}),e(Me,function(e,t){e._do_print(t,"break")}),e(Pe,function(e,t){e._do_print(t,"continue")}),e(Ne,function(e,t){t.print("if"),t.space(),t.with_parens(function(){e.condition.print(t)}),t.space(),e.alternative?(r(e,t),t.space(),t.print("else"),t.space(),e.alternative instanceof Ne?e.alternative.print(t):u(e.alternative,t)):e._do_print_body(t)}),e(Oe,function(e,t){t.print("switch"),t.space(),t.with_parens(function(){e.expression.print(t)}),t.space()
var n=e.body.length-1
0>n?t.print("{}"):t.with_block(function(){e.body.forEach(function(e,i){t.indent(!0),e.print(t),n>i&&e.body.length>0&&t.newline()})})}),Ie.DEFMETHOD("_do_print_body",function(e){e.newline(),this.body.forEach(function(t){e.indent(),t.print(e),e.newline()})}),e(Re,function(e,t){t.print("default:"),e._do_print_body(t)}),e(je,function(e,t){t.print("case"),t.space(),e.expression.print(t),t.print(":"),e._do_print_body(t)}),e(qe,function(e,t){t.print("try"),t.space(),i(e.body,t),e.bcatch&&(t.space(),e.bcatch.print(t)),e.bfinally&&(t.space(),e.bfinally.print(t))}),e(Le,function(e,t){t.print("catch"),t.space(),t.with_parens(function(){e.argname.print(t)}),t.space(),i(e.body,t)}),e(ze,function(e,t){t.print("finally"),t.space(),i(e.body,t)}),Ue.DEFMETHOD("_do_print",function(e,t){e.print(t),e.space(),this.definitions.forEach(function(t,n){n&&e.comma(),t.print(e)})
var n=e.parent(),i=n instanceof xe||n instanceof ye,r=i&&n.init===this
r||e.semicolon()}),e(Je,function(e,t){e._do_print(t,"var")}),e(Xe,function(e,t){e._do_print(t,"const")}),e($e,function(e,t){if(e.name.print(t),e.value){t.space(),t.print("="),t.space()
var n=t.parent(1),i=n instanceof xe||n instanceof ye
o(e.value,t,i)}}),e(He,function(e,t){e.expression.print(t),e instanceof We&&!c(e,t)||t.with_parens(function(){e.args.forEach(function(e,n){n&&t.comma(),e.print(t)})})}),e(We,function(e,t){t.print("new"),t.space(),He.prototype._codegen(e,t)}),Ge.DEFMETHOD("_do_print",function(e){this.car.print(e),this.cdr&&(e.comma(),e.should_break()&&(e.newline(),e.indent()),this.cdr.print(e))}),e(Ge,function(e,t){e._do_print(t)}),e(Ve,function(e,t){var n=e.expression
n.print(t),n instanceof wt&&n.getValue()>=0&&(/[xa-f.)]/i.test(t.last())||t.print(".")),t.print("."),t.add_mapping(e.end),t.print_name(e.property)}),e(Ye,function(e,t){e.expression.print(t),t.print("["),e.property.print(t),t.print("]")}),e(Ze,function(e,t){var n=e.operator
t.print(n),(/^[a-z]/i.test(n)||/[+-]$/.test(n)&&e.expression instanceof Ze&&/^[+-]/.test(e.expression.operator))&&t.space(),e.expression.print(t)}),e(et,function(e,t){e.expression.print(t),t.print(e.operator)}),e(tt,function(e,t){var n=e.operator
e.left.print(t),">"==n[0]&&e.left instanceof et&&"--"==e.left.operator?t.print(" "):t.space(),t.print(n),("<"==n||"<<"==n)&&e.right instanceof Ze&&"!"==e.right.operator&&e.right.expression instanceof Ze&&"--"==e.right.expression.operator?t.print(" "):t.space(),e.right.print(t)}),e(nt,function(e,t){e.condition.print(t),t.space(),t.print("?"),t.space(),e.consequent.print(t),t.space(),t.colon(),e.alternative.print(t)}),e(rt,function(e,t){t.with_square(function(){var n=e.elements,i=n.length
i>0&&t.space(),n.forEach(function(e,n){n&&t.comma(),e.print(t),n===i-1&&e instanceof Tt&&t.comma()}),i>0&&t.space()})}),e(ot,function(e,t){e.properties.length>0?t.with_block(function(){e.properties.forEach(function(e,n){n&&(t.print(","),t.newline()),t.indent(),e.print(t)}),t.newline()}):t.print("{}")}),e(st,function(e,t){a(e.key,e.quote,t),t.colon(),e.value.print(t)}),at.DEFMETHOD("_print_getter_setter",function(e,t){t.print(e),t.space(),a(this.key.name,this.quote,t),this.value._do_print(t,!0)}),e(ut,function(e,t){e._print_getter_setter("set",t)}),e(ct,function(e,t){e._print_getter_setter("get",t)}),e(lt,function(e,t){var n=e.definition()
t.print_name(n?n.mangled_name||n.name:e.name)}),e(Tt,h),e(Et,function(e,t){t.print("this")}),e(Ct,function(e,t){t.print(e.getValue())}),e(At,function(e,t){t.print_string(e.getValue(),e.quote,v)}),e(wt,function(e,t){g&&e.start&&null!=e.start.raw?t.print(e.start.raw):t.print(p(e.getValue()))}),e(_t,function(e,t){var n=""+e.getValue()
t.option("ascii_only")?n=t.to_ascii(n):t.option("unescape_regexps")&&(n=n.split("\\\\").map(function(e){return e.replace(/\\u[0-9a-fA-F]{4}|\\x[0-9a-fA-F]{2}/g,function(e){var t=parseInt(e.substr(2),16)
return s(t)?String.fromCharCode(t):e})}).join("\\\\")),t.print(n)
var i=t.parent()
i instanceof tt&&/^in/.test(i.operator)&&i.left===e&&t.print(" ")}),d(re,h),d(se,m),d(ae,m),d(lt,m),d(Fe,m),d(fe,m),d(he,h),d(Ce,m),d(Oe,m),d(Ie,m),d(le,m),d(Ee,h),d(We,m),d(qe,m),d(Le,m),d(ze,m),d(Ue,m),d(Ct,m),d(ut,function(e,t){t.add_mapping(e.start,e.key.name)}),d(ct,function(e,t){t.add_mapping(e.start,e.key.name)}),d(at,function(e,t){t.add_mapping(e.start,e.key)})}(),V.prototype=new H,f(V.prototype,{option:function(e){return this.options[e]},compress:function(e){this.option("expression")&&(e=e.process_expression(!0))
for(var t=+this.options.passes||1,n=0;t>n&&3>n;++n)(n>0||this.option("reduce_vars"))&&e.reset_opt_flags(this,!0),e=e.transform(this)
return this.option("expression")&&(e=e.process_expression(!1)),e},info:function(){"verbose"==this.options.warnings&&re.warn.apply(re,arguments)},warn:function(e,t){if(this.options.warnings){var n=y(e,t)
n in this.warnings_produced||(this.warnings_produced[n]=!0,re.warn.apply(re,arguments))}},clear_warnings:function(){this.warnings_produced={}},before:function(e,t,n){if(e._squeezed)return e
var i=!1
e instanceof be&&(e=e.hoist_declarations(this),i=!0),t(e,this),t(e,this)
var r=e.optimize(this)
return i&&r instanceof be&&(r.drop_unused(this),t(r,this)),r===e&&(r._squeezed=!0),r}}),function(){function e(e,t){e.DEFMETHOD("optimize",function(e){var n=this
if(n._optimized)return n
if(e.has_directive("use asm"))return n
var i=t(n,e)
return i._optimized=!0,i})}function t(e){if(!(e instanceof Dt))return!1
for(var t=e.definition().orig,n=t.length;--n>=0;)if(t[n]instanceof dt)return!0}function n(e,t){for(var n,i=0;(n=e.parent(i++))&&!(n instanceof be);)if(n instanceof Le){n=n.argname.definition().scope
break}return n.find_variable(t)}function i(e,t,n){return n||(n={}),t&&(n.start||(n.start=t.start),n.end||(n.end=t.end)),new e(n)}function r(e,t){switch(typeof e){case"string":return i(At,t,{value:e})
case"number":return isNaN(e)?i(kt,t):isFinite(e)?0>1/e?i(Ze,t,{operator:"-",expression:i(wt,t,{value:-e})}):i(wt,t,{value:e}):0>e?i(Ze,t,{operator:"-",expression:i(Mt,t)}):i(Mt,t)
case"boolean":return i(e?Ot:Nt,t)
case"undefined":return i(Bt,t)
default:if(null===e)return i(St,t,{value:null})
if(e instanceof RegExp)return i(_t,t,{value:e})
throw Error(y("Can't handle constant of type: {type}",{type:typeof e}))}}function o(e,t,n){return e instanceof Ze&&"delete"==e.operator||e instanceof He&&e.expression===t&&(n instanceof Ke||n instanceof Dt&&"eval"==n.name)?i(Ge,t,{car:i(wt,t,{value:0}),cdr:n}):n}function u(e){if(null===e)return[]
if(e instanceof le)return e.body
if(e instanceof pe)return[]
if(e instanceof oe)return[e]
throw Error("Can't convert thing to statement array")}function c(e){return null===e?!0:e instanceof pe?!0:e instanceof le?0==e.body.length:!1}function l(e){return e instanceof Oe?e:(e instanceof xe||e instanceof ye||e instanceof me)&&e.body instanceof le?e.body:e}function p(e){return e instanceof He&&!(e instanceof We)?e.expression instanceof we||p(e.expression):!1}function f(e,t){function n(e,t){function r(e,t){return e instanceof Dt&&T(e,t)}function a(n,a,c){if(r(n,a))return n
var l=o(a,n,b.value)
return b.value=null,d.splice(D,1),0===d.length&&(e[f]=i(pe,s),u=!0),p.reset_opt_flags(t),t.info("Collapsing "+(c?"constant":"variable")+" "+E+" [{file}:{line},{col}]",n.start),m=!0,l}for(var s=t.self(),u=!1,c=t.option("toplevel"),l=e.length;--l>=0;){var p=e[l]
if(!(p instanceof Ue)){if([p,p.body,p.alternative,p.bcatch,p.bfinally].forEach(function(e){e&&e.body&&n(e.body,t)}),0>=l)break
var f=l-1,h=e[f]
if(h instanceof Ue){var d=h.definitions
if(null!=d)for(var g={},v=!1,x=!1,y={},D=d.length;--D>=0;){var b=d[D]
if(null==b.value)break
var E=b.name.name
if(!E||!E.length)break
if(E in g)break
g[E]=!0
var C=s.find_variable&&s.find_variable(E)
if(C&&C.references&&1===C.references.length&&"arguments"!=E&&(c||!C.global)){var A=C.references[0]
if(A.scope.uses_eval||A.scope.uses_with)break
if(b.value.is_constant()){var w=new H(function(e){var t=w.parent()
return t instanceof de&&(t.condition===e||t.init===e)?e:e===A?a(e,t,!0):void 0})
p.transform(w)}else if(!(v|=x)){var _=b.value.has_side_effects(t)
if(A.scope===s){var F=new k(function(e){e instanceof Dt&&r(e,F.parent())&&(y[e.name]=x=!0)})
b.value.walk(F)
var S=!1,B=new H(function(e){function t(e,t){if(1===e.orig.length&&e.orig[0]instanceof gt)return!0
if(e.scope!==t)return!1
for(var n=e.references,i=0,r=n.length;r>i;i++)if(n[i].scope!==t)return!1
return!0}if(S)return e
var n=B.parent()
return e instanceof Ce||e instanceof qe||e instanceof De||e instanceof je||e instanceof de||n instanceof Ne&&e!==n.condition||n instanceof nt&&e!==n.condition||e instanceof Dt&&_&&!t(e.definition(),s)||n instanceof tt&&("&&"==n.operator||"||"==n.operator)&&e===n.right||n instanceof Oe&&e!==n.expression?(v=S=!0,e):void 0},function(e){return S?e:e===A?(S=!0,a(e,B.parent(),!1)):(v|=e.has_side_effects(t))?(S=!0,e):x&&e instanceof Dt&&e.name in y?(v=!0,S=!0,e):void 0})
p.transform(B)}else v|=_}}else v=!0}}}}if(u)for(var M=e.length;--M>=0;)e.length>1&&e[M]instanceof pe&&e.splice(M,1)
return e}function r(e){function n(e){return/@ngInject/.test(e.value)}function r(e){return e.argnames.map(function(e){return i(At,e,{value:e.name})})}function o(e,t){return i(rt,e,{elements:t})}function a(e,t){return i(ue,e,{body:i(it,e,{operator:"=",left:i(Ve,t,{expression:i(Dt,t,t),property:"$inject"}),right:o(e,r(e))})})}function s(e){e&&e.args&&(e.args.forEach(function(e,t,i){var a=e.start.comments_before
e instanceof Ce&&a.length&&n(a[0])&&(i[t]=o(e,r(e).concat(e)))}),e.expression&&e.expression.expression&&s(e.expression.expression))}return e.reduce(function(e,i){if(e.push(i),i.body&&i.body.args)s(i.body)
else{var r=i.start,o=r.comments_before
if(o&&o.length>0){var u=o.pop()
n(u)&&(i instanceof _e?e.push(a(i,i.name)):i instanceof Ue?i.definitions.forEach(function(t){t.value&&t.value instanceof Ce&&e.push(a(t.value,t.name))}):t.warn("Unknown statement marked with @ngInject [{file}:{line},{col}]",r))}}return e},[])}function a(e){var t=[]
return e.reduce(function(e,n){return n instanceof le?(m=!0,e.push.apply(e,a(n.body))):n instanceof pe?m=!0:n instanceof se?t.indexOf(n.value)<0?(e.push(n),t.push(n.value)):m=!0:e.push(n),e},[])}function s(e,t){function n(e){for(var t=0,n=e.length;--n>=0;){var i=e[n]
if(i instanceof Ne&&i.body instanceof ke&&++t>1)return!0}return!1}var r=t.self(),o=n(e),a=r instanceof Ce,s=[]
e:for(var c=e.length;--c>=0;){var p=e[c]
switch(!0){case a&&p instanceof ke&&!p.value&&0==s.length:m=!0
continue e
case p instanceof Ne:if(p.body instanceof ke){if((a&&0==s.length||s[0]instanceof ke&&!s[0].value)&&!p.body.value&&!p.alternative){m=!0
var f=i(ue,p.condition,{body:p.condition})
s.unshift(f)
continue e}if(s[0]instanceof ke&&p.body.value&&s[0].value&&!p.alternative){m=!0,p=p.clone(),p.alternative=s[0],s[0]=p.transform(t)
continue e}if(o&&(0==s.length||s[0]instanceof ke)&&p.body.value&&!p.alternative&&a){m=!0,p=p.clone(),p.alternative=s[0]||i(ke,p,{value:null}),s[0]=p.transform(t)
continue e}if(!p.body.value&&a){m=!0,p=p.clone(),p.condition=p.condition.negate(t)
var h=u(p.alternative).concat(s),d=x(h)
p.body=i(le,p,{body:h}),p.alternative=null,s=d.concat([p.transform(t)])
continue e}if(t.option("sequences")&&c>0&&e[c-1]instanceof Ne&&e[c-1].body instanceof ke&&1==s.length&&a&&s[0]instanceof ue&&!p.alternative){m=!0,s.push(i(ke,s[0],{value:null}).transform(t)),s.unshift(p)
continue e}}var g=O(p.body),v=g instanceof Te?t.loopcontrol_target(g):null
if(g&&(g instanceof ke&&!g.value&&a||g instanceof Pe&&r===l(v)||g instanceof Me&&v instanceof le&&r===v)){g.label&&D(g.label.thedef.references,g),m=!0
var h=u(p.body).slice(0,-1)
p=p.clone(),p.condition=p.condition.negate(t),p.body=i(le,p,{body:u(p.alternative).concat(s)}),p.alternative=i(le,p,{body:h}),s=[p.transform(t)]
continue e}var g=O(p.alternative),v=g instanceof Te?t.loopcontrol_target(g):null
if(g&&(g instanceof ke&&!g.value&&a||g instanceof Pe&&r===l(v)||g instanceof Me&&v instanceof le&&r===v)){g.label&&D(g.label.thedef.references,g),m=!0,p=p.clone(),p.body=i(le,p.body,{body:u(p.body).concat(s)}),p.alternative=i(le,p.alternative,{body:u(p.alternative).slice(0,-1)}),s=[p.transform(t)]
continue e}s.unshift(p)
break
default:s.unshift(p)}}return s}function c(e,t){var n=!1,i=e.length,r=t.self()
return e=e.reduce(function(e,i){if(n)F(t,i,e)
else{if(i instanceof Te){var o=t.loopcontrol_target(i)
i instanceof Me&&!(o instanceof de)&&l(o)===r||i instanceof Pe&&l(o)===r?i.label&&D(i.label.thedef.references,i):e.push(i)}else e.push(i)
O(i)&&(n=!0)}return e},[]),m=e.length!=i,e}function p(e,t){function n(){r=Ge.from_array(r),r&&o.push(i(ue,r,{body:r})),r=[]}if(e.length<2)return e
var r=[],o=[]
return e.forEach(function(e){if(e instanceof ue){f(r)>=t.sequences_limit&&n()
var i=e.body
r.length>0&&(i=i.drop_side_effect_free(t)),i&&r.push(i)}else n(),o.push(e)}),n(),o=h(o,t),m=o.length!=e.length,o}function f(e){for(var t=0,n=0;n<e.length;++n){var i=e[n]
i instanceof Ge?t+=i.len():t++}return t}function h(e,t){function n(e){r.pop()
var n=o.body
return n instanceof Ge?n.add(e):n=Ge.cons(n,e),n.transform(t)}var r=[],o=null
return e.forEach(function(e){if(o)if(e instanceof xe){var a={}
try{o.body.walk(new k(function(e){if(e instanceof tt&&"in"==e.operator)throw a})),!e.init||e.init instanceof Ue?e.init||(e.init=o.body.drop_side_effect_free(t),r.pop()):e.init=n(e.init)}catch(s){if(s!==a)throw s}}else e instanceof Ne?e.condition=n(e.condition):e instanceof De?e.expression=n(e.expression):e instanceof Se&&e.value?e.value=n(e.value):e instanceof Se?e.value=n(i(Bt,e).transform(t)):e instanceof Oe&&(e.expression=n(e.expression))
r.push(e),o=e instanceof ue?e:null}),r}function d(e,t){var n=null
return e.reduce(function(e,t){return t instanceof Ue&&n&&n.TYPE==t.TYPE?(n.definitions=n.definitions.concat(t.definitions),m=!0):t instanceof xe&&n instanceof Je&&(!t.init||t.init.TYPE==n.TYPE)?(m=!0,e.pop(),t.init?t.init.definitions=n.definitions.concat(t.init.definitions):t.init=n,e.push(t),n=t):(n=t,e.push(t)),e},[])}var m,g=10
do m=!1,t.option("angular")&&(e=r(e)),e=a(e),t.option("dead_code")&&(e=c(e,t)),t.option("if_return")&&(e=s(e,t)),t.sequences_limit>0&&(e=p(e,t)),t.option("join_vars")&&(e=d(e,t)),t.option("collapse_vars")&&(e=n(e,t))
while(m&&g-- >0)
return e}function x(e){for(var t=[],n=e.length-1;n>=0;--n){var i=e[n]
i instanceof _e&&(e.splice(n,1),t.unshift(i))}return t}function F(e,t,n){t instanceof _e||e.warn("Dropping unreachable code [{file}:{line},{col}]",t.start),t.walk(new k(function(t){return t instanceof Ue?(e.warn("Declarations in unreachable code! [{file}:{line},{col}]",t.start),t.remove_initializers(),n.push(t),!0):t instanceof _e?(n.push(t),!0):t instanceof be?!0:void 0}))}function B(e,t){return e.is_undefined||e instanceof Bt||e instanceof Ze&&"void"==e.operator&&!e.expression.has_side_effects(t)}function T(e,t){return t instanceof Qe&&L(t.operator)?t.expression:t instanceof it&&t.left===e?e:void 0}function M(e,t){return e.print_to_string().length>t.print_to_string().length?t:e}function P(e,t){return M(i(ue,e,{body:e}),i(ue,t,{body:t})).body}function N(e,t,n){return(_(e)?P:M)(t,n)}function O(e){return e&&e.aborts()}function I(e,t){function n(n){n=u(n),e.body instanceof le?(e.body=e.body.clone(),e.body.body=n.concat(e.body.body.slice(1)),e.body=e.body.transform(t)):e.body=i(le,e.body,{body:n}).transform(t),I(e,t)}var r=e.body instanceof le?e.body.body[0]:e.body
r instanceof Ne&&(r.body instanceof Me&&t.loopcontrol_target(r.body)===t.self()?(e.condition?e.condition=i(tt,e.condition,{left:e.condition,operator:"&&",right:r.condition.negate(t)}):e.condition=r.condition.negate(t),n(r.alternative)):r.alternative instanceof Me&&t.loopcontrol_target(r.alternative)===t.self()&&(e.condition?e.condition=i(tt,e.condition,{left:e.condition,operator:"&&",right:r.condition}):e.condition=r.condition,n(r.body)))}function R(e,t){return e instanceof Dt||e.TYPE===t.TYPE}function j(e,t){return t.option("booleans")&&t.in_boolean_context()?N(t,e,i(Ge,e,{car:e,cdr:i(Ot,e)}).optimize(t)):e}e(re,function(e,t){return e}),re.DEFMETHOD("equivalent_to",function(e){return this.TYPE==e.TYPE&&this.print_to_string()==e.print_to_string()}),re.DEFMETHOD("process_expression",function(e,t){var n=this,r=new H(function(o){if(e&&o instanceof ue)return i(ke,o,{value:o.body})
if(!e&&o instanceof ke){if(t){var a=o.value&&o.value.drop_side_effect_free(t,!0)
return a?i(ue,o,{body:a}):i(pe,o)}return i(ue,o,{body:o.value||i(Ze,o,{operator:"void",expression:i(wt,o,{value:0})})})}if(o instanceof Ce&&o!==n)return o
if(o instanceof ce){var s=o.body.length-1
s>=0&&(o.body[s]=o.body[s].transform(r))}return o instanceof Ne&&(o.body=o.body.transform(r),o.alternative&&(o.alternative=o.alternative.transform(r))),o instanceof De&&(o.body=o.body.transform(r)),o})
return n.transform(r)}),re.DEFMETHOD("reset_opt_flags",function(e,t){function n(e,t){p[e.id]=t}function r(e){if(p[e.id]){if(null==e.fixed){var t=e.orig[0]
if(t instanceof mt||"arguments"==t.name)return!1
e.fixed=i(Bt,t)}return!0}}function o(){p=Object.create(p)}function a(){p=Object.getPrototypeOf(p)}function s(e){e.escaped=!1,e.scope.uses_eval?e.fixed=!1:l||!e.global||e.orig[0]instanceof dt?e.fixed=void 0:e.fixed=!1,e.references=[],e.should_replace=void 0}function u(e,t,n){var i=h.parent(t)
return T(e,i)||!n&&i instanceof He&&i.expression===e?!0:i instanceof Ke&&i.expression===e?!n&&u(i,t+1):void 0}var c=t&&e.option("reduce_vars"),l=e.option("toplevel"),p=Object.create(null),f=new k(function(e){if(e instanceof lt){var t=e.definition()
e instanceof Dt&&t.references.push(e),t.fixed=!1}}),h=new k(function(e,t){if(e._squeezed=!1,e._optimized=!1,c){if(e instanceof Ee&&e.globals.each(s),e instanceof be&&e.variables.each(s),e instanceof Dt){var d=e.definition()
if(d.references.push(e),void 0===d.fixed||!r(d)||u(e,0,e.fixed_value()instanceof Ce))d.fixed=!1
else{var m=h.parent();(m instanceof it&&"="==m.operator&&e===m.right||m instanceof He&&e!==m.expression||m instanceof ke&&e===m.value&&e.scope!==d.scope||m instanceof $e&&e===m.value)&&(d.escaped=!0)}}if(e instanceof xt&&(e.definition().fixed=!1),e instanceof $e){var d=e.name.definition()
if(null==d.fixed)return e.value?(d.fixed=function(){return e.value},n(d,!1),t()):d.fixed=null,n(d,!0),!0
e.value&&(d.fixed=!1)}if(e instanceof _e){var d=e.name.definition()
!l&&d.global||r(d)?d.fixed=!1:(d.fixed=e,n(d,!0))
var g=p
return p=Object.create(null),t(),p=g,!0}if(e instanceof we){o()
var v
return!e.name&&(v=h.parent())instanceof He&&v.expression===e&&e.argnames.forEach(function(t,r){var o=t.definition()
e.uses_arguments||void 0!==o.fixed?o.fixed=!1:(o.fixed=function(){return v.args[r]||i(Bt,v)},n(o,!0))}),t(),a(),!0}if(e instanceof Ae){var g=p
return p=Object.create(null),t(),p=g,!0}if(e instanceof tt&&("&&"==e.operator||"||"==e.operator))return e.left.walk(h),o(),e.right.walk(h),a(),!0
if(e instanceof nt)return e.condition.walk(h),o(),e.consequent.walk(h),a(),o(),e.alternative.walk(h),a(),!0
if(e instanceof Ne||e instanceof me)return e.condition.walk(h),o(),e.body.walk(h),a(),e.alternative&&(o(),e.alternative.walk(h),a()),!0
if(e instanceof he)return o(),e.body.walk(h),a(),!0
if(e instanceof xe)return e.init&&e.init.walk(h),o(),e.condition&&e.condition.walk(h),e.body.walk(h),e.step&&e.step.walk(h),a(),!0
if(e instanceof ye)return e.init.walk(f),e.object.walk(h),o(),e.body.walk(h),a(),!0
if(e instanceof qe)return o(),S(e,h),a(),e.bcatch&&(o(),e.bcatch.walk(h),a()),e.bfinally&&e.bfinally.walk(h),!0
if(e instanceof Ie)return o(),t(),a(),!0}})
this.walk(h)}),Dt.DEFMETHOD("fixed_value",function(){var e=this.definition().fixed
return!e||e instanceof re?e:e()}),function(e){function t(e){return/strict/.test(e)}re.DEFMETHOD("may_throw_on_access",function(e){var t=e.option("pure_getters")
return!t||this._throw_on_access(t)}),e(re,t),e(St,m),e(Bt,m),e(Ct,d),e(rt,d),e(ot,function(e){if(!t(e))return!1
for(var n=this.properties.length;--n>=0;)if(this.properties[n].value instanceof Ae)return!0
return!1}),e(we,d),e(et,d),e(Ze,function(){return"void"==this.operator}),e(tt,function(e){switch(this.operator){case"&&":return this.left._throw_on_access(e)
case"||":return this.left._throw_on_access(e)&&this.right._throw_on_access(e)
default:return!1}}),e(it,function(e){return"="==this.operator&&this.right._throw_on_access(e)}),e(nt,function(e){return this.consequent._throw_on_access(e)||this.alternative._throw_on_access(e)}),e(Ge,function(e){return this.cdr._throw_on_access(e)}),e(Dt,function(e){if(this.is_undefined)return!0
if(!t(e))return!1
var n=this.fixed_value()
return!n||n._throw_on_access(e)})}(function(e,t){e.DEFMETHOD("_throw_on_access",t)}),function(e){var t=["!","delete"],n=["in","instanceof","==","!=","===","!==","<","<=",">=",">"]
e(re,d),e(Ze,function(){return a(this.operator,t)}),e(tt,function(){return a(this.operator,n)||("&&"==this.operator||"||"==this.operator)&&this.left.is_boolean()&&this.right.is_boolean()}),e(nt,function(){return this.consequent.is_boolean()&&this.alternative.is_boolean()}),e(it,function(){return"="==this.operator&&this.right.is_boolean()}),e(Ge,function(){return this.cdr.is_boolean()}),e(Ot,m),e(Nt,m)}(function(e,t){e.DEFMETHOD("is_boolean",t)}),function(e){e(re,d),e(wt,m)
var t=E("+ - ~ ++ --")
e(Qe,function(){return t(this.operator)})
var n=E("- * / % & | ^ << >> >>>")
e(tt,function(e){return n(this.operator)||"+"==this.operator&&this.left.is_number(e)&&this.right.is_number(e)}),e(it,function(e){return n(this.operator.slice(0,-1))||"="==this.operator&&this.right.is_number(e)}),e(Ge,function(e){return this.cdr.is_number(e)}),e(nt,function(e){return this.consequent.is_number(e)&&this.alternative.is_number(e)})}(function(e,t){e.DEFMETHOD("is_number",t)}),function(e){e(re,d),e(At,m),e(Ze,function(){return"typeof"==this.operator}),e(tt,function(e){return"+"==this.operator&&(this.left.is_string(e)||this.right.is_string(e))}),e(it,function(e){return("="==this.operator||"+="==this.operator)&&this.right.is_string(e)}),e(Ge,function(e){return this.cdr.is_string(e)}),e(nt,function(e){return this.consequent.is_string(e)&&this.alternative.is_string(e)})}(function(e,t){e.DEFMETHOD("is_string",t)})
var L=E("delete ++ --")
!function(e){function t(e,n){if(e instanceof re)return i(e.CTOR,n,e)
if(Array.isArray(e))return i(rt,n,{elements:e.map(function(e){return t(e,n)})})
if(e&&"object"==typeof e){var o=[]
for(var a in e)o.push(i(st,n,{key:a,value:t(e[a],n)}))
return i(ot,n,{properties:o})}return r(e,n)}re.DEFMETHOD("resolve_defines",function(e){if(e.option("global_defs")){var t=this._find_defs(e,"")
if(t){var n,i=this,r=0
do n=i,i=e.parent(r++)
while(i instanceof Ke&&i.expression===n)
if(!T(n,i))return t
e.warn("global_defs "+this.print_to_string()+" redefined [{file}:{line},{col}]",this.start)}}}),e(re,h),e(Ve,function(e,t){return this.expression._find_defs(e,"."+this.property+t)}),e(Dt,function(e,n){if(this.global()){var i,r=e.option("global_defs")
if(r&&w(r,i=this.name+n)){var o=t(r[i],this),a=e.find_parent(Ee)
return o.walk(new k(function(e){e instanceof Dt&&(e.scope=a,e.thedef=a.def_global(e))})),o}}})}(function(e,t){e.DEFMETHOD("_find_defs",t)}),function(e){function t(e,t){if(!t)throw Error("Compressor must be passed")
return e._eval(t)}re.DEFMETHOD("evaluate",function(t){if(!t.option("evaluate"))return this
try{var n=this._eval(t)
return!n||n instanceof RegExp||"object"!=typeof n?n:this}catch(i){if(i!==e)throw i
return this}})
var n=E("! ~ - + void")
re.DEFMETHOD("is_constant",function(){return this instanceof Ct?!(this instanceof _t):this instanceof Ze&&this.expression instanceof Ct&&n(this.operator)}),re.DEFMETHOD("constant_value",function(e){if(this instanceof Ct&&!(this instanceof _t))return this.value
if(this instanceof Ze&&this.expression instanceof Ct)switch(this.operator){case"!":return!this.expression.value
case"~":return~this.expression.value
case"-":return-this.expression.value
case"+":return+this.expression.value
default:throw Error(y("Cannot evaluate unary expression {value}",{value:this.print_to_string()}))}var t=this.evaluate(e)
if(t!==this)return t
throw Error(y("Cannot evaluate constant [{file}:{line},{col}]",this.start))}),e(oe,function(){throw Error(y("Cannot evaluate a statement [{file}:{line},{col}]",this.start))}),e(Ce,function(){throw e}),e(re,function(){throw e}),e(Ct,function(){return this.getValue()}),e(rt,function(n){if(n.option("unsafe"))return this.elements.map(function(e){return t(e,n)})
throw e}),e(ot,function(n){if(n.option("unsafe")){for(var i={},r=0,o=this.properties.length;o>r;r++){var a=this.properties[r],s=a.key
if(s instanceof lt?s=s.name:s instanceof re&&(s=t(s,n)),"function"==typeof Object.prototype[s])throw e
i[s]=t(a.value,n)}return i}throw e}),e(Ze,function(n){var i=this.expression
switch(this.operator){case"!":return!t(i,n)
case"typeof":if(i instanceof we)return"function"
if(i=t(i,n),i instanceof RegExp)throw e
return typeof i
case"void":return void t(i,n)
case"~":return~t(i,n)
case"-":return-t(i,n)
case"+":return+t(i,n)}throw e}),e(tt,function(n){var i,r=this.left,o=this.right
switch(this.operator){case"&&":i=t(r,n)&&t(o,n)
break
case"||":i=t(r,n)||t(o,n)
break
case"|":i=t(r,n)|t(o,n)
break
case"&":i=t(r,n)&t(o,n)
break
case"^":i=t(r,n)^t(o,n)
break
case"+":i=t(r,n)+t(o,n)
break
case"*":i=t(r,n)*t(o,n)
break
case"/":i=t(r,n)/t(o,n)
break
case"%":i=t(r,n)%t(o,n)
break
case"-":i=t(r,n)-t(o,n)
break
case"<<":i=t(r,n)<<t(o,n)
break
case">>":i=t(r,n)>>t(o,n)
break
case">>>":i=t(r,n)>>>t(o,n)
break
case"==":i=t(r,n)==t(o,n)
break
case"===":i=t(r,n)===t(o,n)
break
case"!=":i=t(r,n)!=t(o,n)
break
case"!==":i=t(r,n)!==t(o,n)
break
case"<":i=t(r,n)<t(o,n)
break
case"<=":i=t(r,n)<=t(o,n)
break
case">":i=t(r,n)>t(o,n)
break
case">=":i=t(r,n)>=t(o,n)
break
default:throw e}if(isNaN(i)&&n.find_parent(De))throw e
return i}),e(nt,function(e){return t(this.condition,e)?t(this.consequent,e):t(this.alternative,e)}),e(Dt,function(n){if(!n.option("reduce_vars")||this._evaluating)throw e
this._evaluating=!0
try{var i=this.fixed_value()
if(!i)throw e
var r=t(i,n)
if(w(i,"_eval")||(i._eval=function(){return r}),r&&"object"==typeof r&&this.definition().escaped)throw e
return r}finally{this._evaluating=!1}}),e(Ke,function(n){if(n.option("unsafe")){var i=this.property
i instanceof re&&(i=t(i,n))
var r=t(this.expression,n)
if(r&&w(r,i))return r[i]}throw e})}(function(e,t){e.DEFMETHOD("_eval",t)}),function(e){function t(e){return i(Ze,e,{operator:"!",expression:e})}function n(e,n,r){var o=t(e)
if(r){var a=i(ue,n,{body:n})
return M(o,a)===a?n:o}return M(o,n)}e(re,function(){return t(this)}),e(oe,function(){throw Error("Cannot negate a statement")}),e(we,function(){return t(this)}),e(Ze,function(){return"!"==this.operator?this.expression:t(this)}),e(Ge,function(e){var t=this.clone()
return t.cdr=t.cdr.negate(e),t}),e(nt,function(e,t){var i=this.clone()
return i.consequent=i.consequent.negate(e),i.alternative=i.alternative.negate(e),n(this,i,t)}),e(tt,function(e,i){var r=this.clone(),o=this.operator
if(e.option("unsafe_comps"))switch(o){case"<=":return r.operator=">",r
case"<":return r.operator=">=",r
case">=":return r.operator="<",r
case">":return r.operator="<=",r}switch(o){case"==":return r.operator="!=",r
case"!=":return r.operator="==",r
case"===":return r.operator="!==",r
case"!==":return r.operator="===",r
case"&&":return r.operator="||",r.left=r.left.negate(e,i),r.right=r.right.negate(e),n(this,r,i)
case"||":return r.operator="&&",r.left=r.left.negate(e,i),r.right=r.right.negate(e),n(this,r,i)}return t(this)})}(function(e,t){e.DEFMETHOD("negate",function(e,n){return t.call(this,e,n)})}),He.DEFMETHOD("has_pure_annotation",function(e){if(!e.option("side_effects"))return!1
if(void 0!==this.pure)return this.pure
var t,n,i=!1
return this.start&&(t=this.start.comments_before)&&t.length&&/[@#]__PURE__/.test((n=t[t.length-1]).value)&&(i=n),this.pure=i}),function(e){function t(e,t){for(var n=e.length;--n>=0;)if(e[n].has_side_effects(t))return!0
return!1}e(re,m),e(pe,d),e(Ct,d),e(Et,d),e(He,function(e){if(!this.has_pure_annotation(e)&&e.pure_funcs(this))return!0
for(var t=this.args.length;--t>=0;)if(this.args[t].has_side_effects(e))return!0
return!1}),e(ce,function(e){return t(this.body,e)}),e(Oe,function(e){return this.expression.has_side_effects(e)||t(this.body,e)}),e(je,function(e){return this.expression.has_side_effects(e)||t(this.body,e)}),e(qe,function(e){return t(this.body,e)||this.bcatch&&this.bcatch.has_side_effects(e)||this.bfinally&&this.bfinally.has_side_effects(e)}),e(Ne,function(e){return this.condition.has_side_effects(e)||this.body&&this.body.has_side_effects(e)||this.alternative&&this.alternative.has_side_effects(e)}),e(he,function(e){return this.body.has_side_effects(e)}),e(ue,function(e){return this.body.has_side_effects(e)}),e(_e,m),e(we,d),e(tt,function(e){return this.left.has_side_effects(e)||this.right.has_side_effects(e)}),e(it,m),e(nt,function(e){return this.condition.has_side_effects(e)||this.consequent.has_side_effects(e)||this.alternative.has_side_effects(e)}),e(Qe,function(e){return L(this.operator)||this.expression.has_side_effects(e)}),e(Dt,function(e){return this.undeclared()}),e(ot,function(e){return t(this.properties,e)}),e(at,function(e){return this.value.has_side_effects(e)}),e(rt,function(e){return t(this.elements,e)}),e(Ve,function(e){return this.expression.may_throw_on_access(e)||this.expression.has_side_effects(e)}),e(Ye,function(e){return this.expression.may_throw_on_access(e)||this.expression.has_side_effects(e)||this.property.has_side_effects(e)}),e(Ge,function(e){return this.car.has_side_effects(e)||this.cdr.has_side_effects(e)})}(function(e,t){e.DEFMETHOD("has_side_effects",t)}),function(e){function t(){var e=this.body.length
return e>0&&O(this.body[e-1])}e(oe,v),e(Fe,g),e(le,t),e(Ie,t),e(Ne,function(){return this.alternative&&O(this.body)&&O(this.alternative)&&this})}(function(e,t){e.DEFMETHOD("aborts",t)}),e(se,function(e,t){return t.has_directive(e.value)!==e?i(pe,e):e}),e(ae,function(e,t){return t.option("drop_debugger")?i(pe,e):e}),e(he,function(e,t){return e.body instanceof Me&&t.loopcontrol_target(e.body)===e.body?i(pe,e):0==e.label.references.length?e.body:e}),e(ce,function(e,t){return e.body=f(e.body,t),e}),e(le,function(e,t){switch(e.body=f(e.body,t),e.body.length){case 1:return e.body[0]
case 0:return i(pe,e)}return e}),be.DEFMETHOD("drop_unused",function(e){var n=this
if(e.has_directive("use asm"))return n
var r=e.option("toplevel")
if(e.option("unused")&&(!(n instanceof Ee)||r)&&!n.uses_eval&&!n.uses_with){var a=!/keep_assign/.test(e.option("unused")),s=/funcs/.test(r),u=/vars/.test(r)
n instanceof Ee&&1!=r||(s=u=!0)
var l=[],p=Object.create(null)
n instanceof Ee&&e.top_retain&&n.variables.each(function(t){!e.top_retain(t)||t.id in p||(p[t.id]=!0,l.push(t))})
var f=new A,h=this,d=new k(function(i,r){if(i!==n){if(i instanceof _e){if(!s&&h===n){var o=i.name.definition()
o.id in p||(p[o.id]=!0,l.push(o))}return f.add(i.name.name,i),!0}if(i instanceof Ue&&h===n)return i.definitions.forEach(function(t){if(!u){var n=t.name.definition()
n.id in p||(p[n.id]=!0,l.push(n))}t.value&&(f.add(t.name.name,t.value),t.value.has_side_effects(e)&&t.value.walk(d))}),!0
if(a&&i instanceof it&&"="==i.operator&&i.left instanceof Dt&&!t(i.left)&&h===n)return i.right.walk(d),!0
if(i instanceof Dt){var o=i.definition()
return o.id in p||(p[o.id]=!0,l.push(o)),!0}if(i instanceof be){var c=h
return h=i,r(),h=c,!0}}})
n.walk(d)
for(var m=0;m<l.length;++m)l[m].orig.forEach(function(e){var t=f.get(e.name)
t&&t.forEach(function(e){var t=new k(function(e){if(e instanceof Dt){var t=e.definition()
t.id in p||(p[t.id]=!0,l.push(t))}})
e.walk(t)})})
var g=new H(function(t,r,l){if(t instanceof we&&t.name&&!e.option("keep_fnames")){var f=t.name.definition();(!(f.id in p)||f.orig.length>1)&&(t.name=null)}if(t instanceof Ce&&!(t instanceof Ae))for(var h=!e.option("keep_fargs"),d=t.argnames,m=d.length;--m>=0;){var v=d[m]
v.definition().id in p?h=!1:(v.__unused=!0,h&&(d.pop(),e[v.unreferenced()?"warn":"info"]("Dropping unused function argument {name} [{file}:{line},{col}]",{name:v.name,file:v.start.file,line:v.start.line,col:v.start.col})))}if(s&&t instanceof _e&&t!==n)return t.name.definition().id in p?t:(e[t.name.unreferenced()?"warn":"info"]("Dropping unused function {name} [{file}:{line},{col}]",{name:t.name.name,file:t.name.start.file,line:t.name.start.line,col:t.name.start.col}),i(pe,t))
if(u&&t instanceof Ue&&!(g.parent()instanceof ye&&g.parent().init===t)){var f=t.definitions.filter(function(t){t.value&&(t.value=t.value.transform(g))
var n=t.name.definition()
if(n.id in p)return!0
if(n.orig[0]instanceof xt)return t.value=t.value&&t.value.drop_side_effect_free(e),!0
var i={name:t.name.name,file:t.name.start.file,line:t.name.start.line,col:t.name.start.col}
return t.value&&(t._unused_side_effects=t.value.drop_side_effect_free(e))?(e.warn("Side effects in initialization of unused variable {name} [{file}:{line},{col}]",i),!0):(e[t.name.unreferenced()?"warn":"info"]("Dropping unused variable {name} [{file}:{line},{col}]",i),!1)})
f=b(f,function(e,t){return!e.value&&t.value?-1:!t.value&&e.value?1:0})
for(var x=[],m=0;m<f.length;){var y=f[m]
y._unused_side_effects?(x.push(y._unused_side_effects),f.splice(m,1)):(x.length>0&&(x.push(y.value),y.value=Ge.from_array(x),x=[]),++m)}return x=x.length>0?i(le,t,{body:[i(ue,t,{body:Ge.from_array(x)})]}):null,0!=f.length||x?0==f.length?l?ne.splice(x.body):x:(t.definitions=f,x?(x.body.unshift(t),l?ne.splice(x.body):x):t):i(pe,t)}if(u&&a&&t instanceof it&&"="==t.operator&&t.left instanceof Dt){var f=t.left.definition()
if(!(f.id in p)&&n.variables.get(f.name)===f)return o(g.parent(),t,t.right.transform(g))}if(t instanceof xe){if(r(t,this),t.init instanceof le){var D=t.init
return t.init=D.body.pop(),D.body.push(t),l?ne.splice(D.body):D}return c(t.init)&&(t.init=null),t}if(t instanceof he&&t.body instanceof xe){if(r(t,this),t.body instanceof le){var D=t.body
return t.body=D.body.pop(),D.body.push(t),l?ne.splice(D.body):D}return t}return t instanceof be&&t!==n?t:void 0})
n.transform(g)}}),be.DEFMETHOD("hoist_declarations",function(e){var t=this
if(e.has_directive("use asm"))return t
var n=e.option("hoist_funs"),r=e.option("hoist_vars")
if(n||r){var o=[],a=[],u=new A,c=0,l=0
t.walk(new k(function(e){return e instanceof be&&e!==t?!0:e instanceof Je?(++l,!0):void 0})),r=r&&l>1
var p=new H(function(s){if(s!==t){if(s instanceof se)return o.push(s),i(pe,s)
if(s instanceof _e&&n)return a.push(s),i(pe,s)
if(s instanceof Je&&r){s.definitions.forEach(function(e){u.set(e.name.name,e),++c})
var l=s.to_assignments(e),f=p.parent()
if(f instanceof ye&&f.init===s){if(null==l){var h=s.definitions[0].name
return i(Dt,h,h)}return l}return f instanceof xe&&f.init===s?l:l?i(ue,s,{body:l}):i(pe,s)}if(s instanceof be)return s}})
if(t=t.transform(p),c>0){var f=[]
if(u.each(function(e,n){t instanceof Ce&&s(function(t){return t.name==e.name.name},t.argnames)?u.del(n):(e=e.clone(),e.value=null,f.push(e),u.set(n,e))}),f.length>0){for(var h=0;h<t.body.length;){if(t.body[h]instanceof ue){var d,m,g=t.body[h].body
if(g instanceof it&&"="==g.operator&&(d=g.left)instanceof lt&&u.has(d.name)){var v=u.get(d.name)
if(v.value)break
v.value=g.right,D(f,v),f.push(v),t.body.splice(h,1)
continue}if(g instanceof Ge&&(m=g.car)instanceof it&&"="==m.operator&&(d=m.left)instanceof lt&&u.has(d.name)){var v=u.get(d.name)
if(v.value)break
v.value=m.right,D(f,v),f.push(v),t.body[h].body=g.cdr
continue}}if(t.body[h]instanceof pe)t.body.splice(h,1)
else{if(!(t.body[h]instanceof le))break
var x=[h,1].concat(t.body[h].body)
t.body.splice.apply(t.body,x)}}f=i(Je,t,{definitions:f}),a.push(f)}}t.body=o.concat(a,t.body)}return t}),function(e){function t(e,t,n){for(var i=[],r=!1,o=0,a=e.length;a>o;o++){var s=e[o].drop_side_effect_free(t,n)
r|=s!==e[o],s&&(i.push(s),n=!1)}return r?i.length?i:null:e}e(re,g),e(Ct,v),e(Et,v),e(He,function(e,n){if(!this.has_pure_annotation(e)&&e.pure_funcs(this)){if(this.expression instanceof we&&(!this.expression.name||!this.expression.name.definition().references.length)){var i=this.clone()
return i.expression=i.expression.process_expression(!1,e),i}return this}this.pure&&(e.warn("Dropping __PURE__ call [{file}:{line},{col}]",this.start),this.pure.value=this.pure.value.replace(/[@#]__PURE__/g," "))
var r=t(this.args,e,n)
return r&&Ge.from_array(r)}),e(Ae,v),e(we,v),e(tt,function(e,t){var n=this.right.drop_side_effect_free(e)
if(!n)return this.left.drop_side_effect_free(e,t)
switch(this.operator){case"&&":case"||":if(n===this.right)return this
var r=this.clone()
return r.right=n,r
default:var o=this.left.drop_side_effect_free(e,t)
return o?i(Ge,this,{car:o,cdr:n}):this.right.drop_side_effect_free(e,t)}}),e(it,g),e(nt,function(e){var t=this.consequent.drop_side_effect_free(e),n=this.alternative.drop_side_effect_free(e)
if(t===this.consequent&&n===this.alternative)return this
if(!t)return n?i(tt,this,{operator:"||",left:this.condition,right:n}):this.condition.drop_side_effect_free(e)
if(!n)return i(tt,this,{operator:"&&",left:this.condition,right:t})
var r=this.clone()
return r.consequent=t,r.alternative=n,r}),e(Qe,function(e,t){if(L(this.operator))return this
if("typeof"==this.operator&&this.expression instanceof Dt)return null
var n=this.expression.drop_side_effect_free(e,t)
return t&&this instanceof Ze&&p(n)?n===this.expression&&1===this.operator.length?this:i(Ze,this,{operator:1===this.operator.length?this.operator:"!",expression:n}):n}),e(Dt,function(){return this.undeclared()?this:null}),e(ot,function(e,n){var i=t(this.properties,e,n)
return i&&Ge.from_array(i)}),e(at,function(e,t){return this.value.drop_side_effect_free(e,t)}),e(rt,function(e,n){var i=t(this.elements,e,n)
return i&&Ge.from_array(i)}),e(Ve,function(e,t){return this.expression.may_throw_on_access(e)?this:this.expression.drop_side_effect_free(e,t)}),e(Ye,function(e,t){if(this.expression.may_throw_on_access(e))return this
var n=this.expression.drop_side_effect_free(e,t)
if(!n)return this.property.drop_side_effect_free(e,t)
var r=this.property.drop_side_effect_free(e)
return r?i(Ge,this,{car:n,cdr:r}):n}),e(Ge,function(e){var t=this.cdr.drop_side_effect_free(e)
return t===this.cdr?this:t?i(Ge,this,{car:this.car,cdr:t}):this.car})}(function(e,t){e.DEFMETHOD("drop_side_effect_free",t)}),e(ue,function(e,t){if(t.option("side_effects")){var n=e.body,r=n.drop_side_effect_free(t,!0)
if(!r)return t.warn("Dropping side-effect-free statement [{file}:{line},{col}]",e.start),i(pe,e)
if(r!==n)return i(ue,e,{body:r})}return e}),e(me,function(e,t){if(!t.option("loops"))return e
var n=e.condition.evaluate(t)
if(n!==e.condition){if(n)return i(xe,e,{body:e.body})
if(t.option("dead_code")&&e instanceof ve){var r=[]
return F(t,e.body,r),i(le,e,{body:r}).optimize(t)}if(e instanceof ge){var o=!1,a=new k(function(t){return t instanceof be||o?!0:t instanceof Te&&a.loopcontrol_target(t)===e?o=!0:void 0}),s=t.parent()
if((s instanceof he?s:e).walk(a),!o)return e.body}}return e instanceof ve?i(xe,e,e).optimize(t):e}),e(xe,function(e,t){if(!t.option("loops"))return e
if(e.condition){var n=e.condition.evaluate(t)
if(t.option("dead_code")&&!n){var o=[]
return e.init instanceof oe?o.push(e.init):e.init&&o.push(i(ue,e.init,{body:e.init})),F(t,e.body,o),i(le,e,{body:o}).optimize(t)}n!==e.condition&&(n=r(n,e.condition).transform(t),e.condition=M(n,e.condition))}return I(e,t),e}),e(Ne,function(e,t){if(c(e.alternative)&&(e.alternative=null),!t.option("conditionals"))return e
var n=e.condition.evaluate(t)
if(n!==e.condition){if(n){if(t.warn("Condition always true [{file}:{line},{col}]",e.condition.start),t.option("dead_code")){var o=[]
return e.alternative&&F(t,e.alternative,o),o.push(e.body),i(le,e,{body:o}).optimize(t)}}else if(t.warn("Condition always false [{file}:{line},{col}]",e.condition.start),t.option("dead_code")){var o=[]
return F(t,e.body,o),e.alternative&&o.push(e.alternative),i(le,e,{body:o}).optimize(t)}n=r(n,e.condition).transform(t),e.condition=M(n,e.condition)}var a=e.condition.negate(t),s=e.condition.print_to_string().length,u=a.print_to_string().length,l=s>u
if(e.alternative&&l){l=!1,e.condition=a
var p=e.body
e.body=e.alternative||i(pe,e),e.alternative=p}if(c(e.body)&&c(e.alternative))return i(ue,e.condition,{body:e.condition.clone()}).optimize(t)
if(e.body instanceof ue&&e.alternative instanceof ue)return i(ue,e,{body:i(nt,e,{condition:e.condition,consequent:e.body.body,alternative:e.alternative.body})}).optimize(t)
if(c(e.alternative)&&e.body instanceof ue)return s===u&&!l&&e.condition instanceof tt&&"||"==e.condition.operator&&(l=!0),l?i(ue,e,{body:i(tt,e,{operator:"||",left:a,right:e.body.body})}).optimize(t):i(ue,e,{body:i(tt,e,{operator:"&&",left:e.condition,right:e.body.body})}).optimize(t)
if(e.body instanceof pe&&e.alternative instanceof ue)return i(ue,e,{body:i(tt,e,{operator:"||",left:e.condition,right:e.alternative.body})}).optimize(t)
if(e.body instanceof Se&&e.alternative instanceof Se&&e.body.TYPE==e.alternative.TYPE)return i(e.body.CTOR,e,{value:i(nt,e,{condition:e.condition,consequent:e.body.value||i(Bt,e.body),alternative:e.alternative.value||i(Bt,e.alternative)}).transform(t)}).optimize(t)
if(e.body instanceof Ne&&!e.body.alternative&&!e.alternative&&(e=i(Ne,e,{condition:i(tt,e.condition,{operator:"&&",left:e.condition,right:e.body.condition}),body:e.body.body,alternative:null})),O(e.body)&&e.alternative){var f=e.alternative
return e.alternative=null,i(le,e,{body:[e,f]}).optimize(t)}if(O(e.alternative)){var h=e.body
return e.body=e.alternative,e.condition=l?a:e.condition.negate(t),e.alternative=null,i(le,e,{body:[e,h]}).optimize(t)}return e}),e(Oe,function(e,t){function n(e,n){n&&!O(n)?n.body=n.body.concat(e.body):F(t,e,l)}if(!t.option("switches"))return e
var o,a=e.expression.evaluate(t)
if(a!==e.expression){var s=r(a,e.expression).transform(t)
e.expression=M(s,e.expression)}if(!t.option("dead_code"))return e
for(var u,c,l=[],p=[],f=0,h=e.body.length;h>f&&!c;f++){if(o=e.body[f],o instanceof Re)u?n(o,p[p.length-1]):u=o
else if(a!==e.expression){var d=o.expression.evaluate(t)
if(d===a){if(c=o,u){var m=p.indexOf(u)
p.splice(m,1),n(u,p[m-1]),u=null}}else if(d!==o.expression){n(o,p[p.length-1])
continue}}if(O(o)){var g=p[p.length-1]
O(g)&&g.body.length==o.body.length&&i(le,g,g).equivalent_to(i(le,o,o))&&(g.body=[])}p.push(o)}for(;h>f;)n(e.body[f++],p[p.length-1])
for(p.length>0&&(p[0].body=l.concat(p[0].body)),e.body=p;o=p[p.length-1];){var v=o.body[o.body.length-1]
if(v instanceof Me&&t.loopcontrol_target(v)===e&&o.body.pop(),o.body.length||o instanceof je&&(u||o.expression.has_side_effects(t)))break
p.pop()===u&&(u=null)}if(0==p.length)return i(le,e,{body:l.concat(i(ue,e.expression,{body:e.expression}))}).optimize(t)
if(1==p.length&&(p[0]===c||p[0]===u)){var x=!1,y=new k(function(t){return x||t instanceof Ce||t instanceof ue?!0:void(t instanceof Me&&y.loopcontrol_target(t)===e&&(x=!0))})
if(e.walk(y),!x)return p=p[0].body.slice(),p.unshift(i(ue,e.expression,{body:e.expression})),i(le,e,{body:p}).optimize(t)}return e}),e(qe,function(e,t){if(e.body=f(e.body,t),e.bcatch&&e.bfinally&&C(e.bfinally.body,c)&&(e.bfinally=null),C(e.body,c)){var n=[]
return e.bcatch&&F(t,e.bcatch,n),e.bfinally&&(n=n.concat(e.bfinally.body)),i(le,e,{body:n}).optimize(t)}return e}),Ue.DEFMETHOD("remove_initializers",function(){this.definitions.forEach(function(e){e.value=null})}),Ue.DEFMETHOD("to_assignments",function(e){var t=e.option("reduce_vars"),n=this.definitions.reduce(function(e,n){if(n.value){var r=i(Dt,n.name,n.name)
e.push(i(it,n,{operator:"=",left:r,right:n.value})),t&&(r.definition().fixed=!1)}return e},[])
return 0==n.length?null:Ge.from_array(n)}),e(Ue,function(e,t){return 0==e.definitions.length?i(pe,e):e}),e(He,function(e,t){var n=e.expression
if(t.option("reduce_vars")&&n instanceof Dt){var o=n.definition(),a=n.fixed_value()
a instanceof _e&&(o.fixed=a=i(we,a,a).clone(!0)),a instanceof we&&(n=a,!t.option("unused")||1!=o.references.length||o.scope.uses_arguments&&o.orig[0]instanceof mt||o.scope.uses_eval||t.find_parent(be)!==o.scope||(e.expression=n))}if(t.option("unused")&&n instanceof we&&!n.uses_arguments&&!n.uses_eval){for(var s=0,u=0,l=0,f=e.args.length;f>l;l++){var h=l>=n.argnames.length
if(h||n.argnames[l].__unused){var d=e.args[l].drop_side_effect_free(t)
if(d)e.args[s++]=d
else if(!h){e.args[s++]=i(wt,e.args[l],{value:0})
continue}}else e.args[s++]=e.args[l]
u=s}e.args.length=u}if(t.option("unsafe"))if(n instanceof Dt&&n.undeclared())switch(n.name){case"Array":if(1!=e.args.length)return i(rt,e,{elements:e.args}).optimize(t)
break
case"Object":if(0==e.args.length)return i(ot,e,{properties:[]})
break
case"String":if(0==e.args.length)return i(At,e,{value:""})
if(e.args.length<=1)return i(tt,e,{left:e.args[0],operator:"+",right:i(At,e,{value:""})}).optimize(t)
break
case"Number":if(0==e.args.length)return i(wt,e,{value:0})
if(1==e.args.length)return i(Ze,e,{expression:e.args[0],operator:"+"}).optimize(t)
case"Boolean":if(0==e.args.length)return i(Nt,e)
if(1==e.args.length)return i(Ze,e,{expression:i(Ze,e,{expression:e.args[0],operator:"!"}),operator:"!"}).optimize(t)
break
case"Function":if(0==e.args.length)return i(we,e,{argnames:[],body:[]})
if(C(e.args,function(e){return e instanceof At}))try{var m="(function("+e.args.slice(0,-1).map(function(e){return e.value}).join(",")+"){"+e.args[e.args.length-1].value+"})()",g=$(m)
g.figure_out_scope({screw_ie8:t.option("screw_ie8")})
var v=new V(t.options)
g=g.transform(v),g.figure_out_scope({screw_ie8:t.option("screw_ie8")}),g.mangle_names()
var x
try{g.walk(new k(function(e){if(e instanceof Ce)throw x=e,g}))}catch(y){if(y!==g)throw y}if(!x)return e
var D=x.argnames.map(function(t,n){return i(At,e.args[n],{value:t.print_to_string()})}),m=K()
return le.prototype._codegen.call(x,x,m),m=(""+m).replace(/^\{|\}$/g,""),D.push(i(At,e.args[e.args.length-1],{value:m})),e.args=D,e}catch(y){if(!(y instanceof z))throw console.log(y),y
t.warn("Error parsing code passed to new Function [{file}:{line},{col}]",e.args[e.args.length-1].start),t.warn(""+y)}}else{if(n instanceof Ve&&"toString"==n.property&&0==e.args.length)return i(tt,e,{left:i(At,e,{value:""}),operator:"+",right:n.expression}).optimize(t)
if(n instanceof Ve&&n.expression instanceof rt&&"join"==n.property){var b
if(!(e.args.length>0&&(b=e.args[0].evaluate(t),b===e.args[0]))){var E=[],A=[]
if(n.expression.elements.forEach(function(n){var r=n.evaluate(t)
r!==n?A.push(r):(A.length>0&&(E.push(i(At,e,{value:A.join(b)})),A.length=0),E.push(n))}),A.length>0&&E.push(i(At,e,{value:A.join(b)})),0==E.length)return i(At,e,{value:""})
if(1==E.length)return E[0].is_string(t)?E[0]:i(tt,E[0],{operator:"+",left:i(At,e,{value:""}),right:E[0]})
if(""==b){var w
return w=E[0].is_string(t)||E[1].is_string(t)?E.shift():i(At,e,{value:""}),E.reduce(function(e,t){return i(tt,t,{operator:"+",left:e,right:t})},w).optimize(t)}var d=e.clone()
return d.expression=d.expression.clone(),d.expression.expression=d.expression.expression.clone(),d.expression.expression.elements=E,N(t,e,d)}}else if(n instanceof Ve&&n.expression.is_string(t)&&"charAt"==n.property){var _=e.args[0],F=_?_.evaluate(t):0
if(F!==_)return i(Ye,n,{expression:n.expression,property:r(0|F,_||n)}).optimize(t)}}if(n instanceof we){if(n.body[0]instanceof ke){var S=n.body[0].value
if(!S||S.is_constant()){var D=e.args.concat(S||i(Bt,e))
return Ge.from_array(D).transform(t)}}if(t.option("side_effects")&&C(n.body,c)){var D=e.args.concat(i(Bt,e))
return Ge.from_array(D).transform(t)}}if(t.option("drop_console")&&n instanceof Ke){for(var B=n.expression;B.expression;)B=B.expression
if(B instanceof Dt&&"console"==B.name&&B.undeclared())return i(Bt,e).optimize(t)}return t.option("negate_iife")&&t.parent()instanceof ue&&p(e)?e.negate(t,!0):e}),e(We,function(e,t){if(t.option("unsafe")){var n=e.expression
if(n instanceof Dt&&n.undeclared())switch(n.name){case"Object":case"RegExp":case"Function":case"Error":case"Array":return i(He,e,e).transform(t)}}return e}),e(Ge,function(e,n){if(!n.option("side_effects"))return e
if(e.car=e.car.drop_side_effect_free(n,_(n)),!e.car)return o(n.parent(),e,e.cdr)
if(n.option("cascade")){var r
if(e.car instanceof it&&!e.car.left.has_side_effects(n)?r=e.car.left:e.car instanceof Qe&&("++"==e.car.operator||"--"==e.car.operator)&&(r=e.car.expression),r&&!(r instanceof Dt&&(r.definition().orig[0]instanceof vt||t(r))))for(var a,s,u=e.cdr;;){if(u.equivalent_to(r)){var c=e.car instanceof et?i(Ze,e.car,{operator:e.car.operator,expression:r}):e.car
return a?(a[s]=c,e.cdr):c}if(u instanceof tt&&!(u instanceof it))if(u.left.is_constant()){if("||"==u.operator||"&&"==u.operator)break
s="right"}else s="left"
else{if(!(u instanceof He||u instanceof Qe&&!L(u.operator)))break
s="expression"}a=u,u=u[s]}}return B(e.cdr,n)?i(Ze,e,{operator:"void",expression:e.car}):e}),Qe.DEFMETHOD("lift_sequences",function(e){if(e.option("sequences")&&this.expression instanceof Ge){var t=this.expression,n=t.to_array(),i=this.clone()
return i.expression=n.pop(),n.push(i),t=Ge.from_array(n).transform(e)}return this}),e(et,function(e,t){return e.lift_sequences(t)}),e(Ze,function(e,t){var n=e.expression
if("delete"==e.operator&&!(n instanceof Dt||n instanceof Ke||n instanceof kt||n instanceof Mt||n instanceof Bt))return n instanceof Ge?(n=n.to_array(),n.push(i(Ot,e)),Ge.from_array(n).optimize(t)):i(Ge,e,{car:n,cdr:i(Ot,e)}).optimize(t)
var o=e.lift_sequences(t)
if(o!==e)return o
if(t.option("side_effects")&&"void"==e.operator)return n=n.drop_side_effect_free(t),n?(e.expression=n,e):i(Bt,e).optimize(t)
if(t.option("booleans")&&t.in_boolean_context())switch(e.operator){case"!":if(n instanceof Ze&&"!"==n.operator)return n.expression
n instanceof tt&&(e=N(t,e,n.negate(t,_(t))))
break
case"typeof":return t.warn("Boolean expression always true [{file}:{line},{col}]",e.start),(n instanceof Dt?i(Ot,e):i(Ge,e,{car:n,cdr:i(Ot,e)})).optimize(t)}if("-"==e.operator&&n instanceof Mt&&(n=n.transform(t)),n instanceof tt&&("+"==e.operator||"-"==e.operator)&&("*"==n.operator||"/"==n.operator||"%"==n.operator))return i(tt,e,{operator:n.operator,left:i(Ze,n.left,{operator:e.operator,expression:n.left}),right:n.right})
if("-"!=e.operator||!(n instanceof wt||n instanceof Mt)){var a=e.evaluate(t)
if(a!==e)return a=r(a,e).optimize(t),N(t,a,e)}return e}),tt.DEFMETHOD("lift_sequences",function(e){if(e.option("sequences")){if(this.left instanceof Ge){var t=this.left,n=t.to_array(),i=this.clone()
return i.left=n.pop(),n.push(i),Ge.from_array(n).optimize(e)}if(this.right instanceof Ge&&!this.left.has_side_effects(e)){for(var r,o="="==this.operator&&this.left instanceof Dt,a=this.right.clone(),t=a;(o||!t.car.has_side_effects(e))&&(r=t,t.cdr instanceof Ge);)t=t.cdr=t.cdr.clone()
if(r){var i=this.clone()
return i.right=r.cdr,r.cdr=i,a.optimize(e)}}}return this})
var U=E("== === != !== * & | ^")
e(tt,function(e,t){function n(){return e.left.is_constant()||e.right.is_constant()||!e.left.has_side_effects(t)&&!e.right.has_side_effects(t)}function a(t){if(n()){t&&(e.operator=t)
var i=e.left
e.left=e.right,e.right=i}}if(U(e.operator)&&e.right.is_constant()&&!e.left.is_constant()&&(e.left instanceof tt&&Zt[e.left.operator]>=Zt[e.operator]||a()),e=e.lift_sequences(t),t.option("comparisons"))switch(e.operator){case"===":case"!==":(e.left.is_string(t)&&e.right.is_string(t)||e.left.is_number(t)&&e.right.is_number(t)||e.left.is_boolean()&&e.right.is_boolean())&&(e.operator=e.operator.substr(0,2))
case"==":case"!=":if(e.left instanceof At&&"undefined"==e.left.value&&e.right instanceof Ze&&"typeof"==e.right.operator){var s=e.right.expression;(s instanceof Dt?s.undeclared():s instanceof Ke&&!t.option("screw_ie8"))||(e.right=s,e.left=i(Bt,e.left).optimize(t),2==e.operator.length&&(e.operator+="="))}}if(t.option("booleans")&&"+"==e.operator&&t.in_boolean_context()){var u=e.left.evaluate(t),c=e.right.evaluate(t)
if(u&&"string"==typeof u)return t.warn("+ in boolean context always true [{file}:{line},{col}]",e.start),i(Ge,e,{car:e.right,cdr:i(Ot,e)}).optimize(t)
if(c&&"string"==typeof c)return t.warn("+ in boolean context always true [{file}:{line},{col}]",e.start),i(Ge,e,{car:e.left,cdr:i(Ot,e)}).optimize(t)}if(t.option("comparisons")&&e.is_boolean()){if(!(t.parent()instanceof tt)||t.parent()instanceof it){var l=i(Ze,e,{operator:"!",expression:e.negate(t,_(t))})
e=N(t,e,l)}if(t.option("unsafe_comps"))switch(e.operator){case"<":a(">")
break
case"<=":a(">=")}}if("+"==e.operator){if(e.right instanceof At&&""==e.right.getValue()&&e.left.is_string(t))return e.left
if(e.left instanceof At&&""==e.left.getValue()&&e.right.is_string(t))return e.right
if(e.left instanceof tt&&"+"==e.left.operator&&e.left.left instanceof At&&""==e.left.left.getValue()&&e.right.is_string(t))return e.left=e.left.right,e.transform(t)}if(t.option("evaluate")){switch(e.operator){case"&&":var u=e.left.evaluate(t)
if(!u)return t.warn("Condition left of && always false [{file}:{line},{col}]",e.start),o(t.parent(),e,e.left).optimize(t)
if(u!==e.left)return t.warn("Condition left of && always true [{file}:{line},{col}]",e.start),o(t.parent(),e,e.right).optimize(t)
if(t.option("booleans")&&t.in_boolean_context()){var c=e.right.evaluate(t)
if(!c)return t.warn("Boolean && always false [{file}:{line},{col}]",e.start),i(Ge,e,{car:e.left,cdr:i(Nt,e)}).optimize(t)
if(c!==e.right)return t.warn("Dropping side-effect-free && in boolean context [{file}:{line},{col}]",e.start),e.left.optimize(t)}break
case"||":var u=e.left.evaluate(t)
if(!u)return t.warn("Condition left of || always false [{file}:{line},{col}]",e.start),o(t.parent(),e,e.right).optimize(t)
if(u!==e.left)return t.warn("Condition left of || always true [{file}:{line},{col}]",e.start),o(t.parent(),e,e.left).optimize(t)
if(t.option("booleans")&&t.in_boolean_context()){var c=e.right.evaluate(t)
if(!c)return t.warn("Dropping side-effect-free || in boolean context [{file}:{line},{col}]",e.start),e.left.optimize(t)
if(c!==e.right)return t.warn("Boolean || always true [{file}:{line},{col}]",e.start),i(Ge,e,{car:e.left,cdr:i(Ot,e)}).optimize(t)}}var p=!0
switch(e.operator){case"+":if(e.left instanceof Ct&&e.right instanceof tt&&"+"==e.right.operator&&e.right.left instanceof Ct&&e.right.is_string(t)&&(e=i(tt,e,{operator:"+",left:i(At,e.left,{value:""+e.left.getValue()+e.right.left.getValue(),start:e.left.start,end:e.right.left.end}),right:e.right.right})),e.right instanceof Ct&&e.left instanceof tt&&"+"==e.left.operator&&e.left.right instanceof Ct&&e.left.is_string(t)&&(e=i(tt,e,{operator:"+",left:e.left.left,right:i(At,e.right,{value:""+e.left.right.getValue()+e.right.getValue(),start:e.left.right.start,end:e.right.end})})),e.left instanceof tt&&"+"==e.left.operator&&e.left.is_string(t)&&e.left.right instanceof Ct&&e.right instanceof tt&&"+"==e.right.operator&&e.right.left instanceof Ct&&e.right.is_string(t)&&(e=i(tt,e,{operator:"+",left:i(tt,e.left,{operator:"+",left:e.left.left,right:i(At,e.left.right,{value:""+e.left.right.getValue()+e.right.left.getValue(),start:e.left.right.start,end:e.right.left.end})}),right:e.right.right})),e.right instanceof Ze&&"-"==e.right.operator&&e.left.is_number(t)){e=i(tt,e,{operator:"-",left:e.left,right:e.right.expression})
break}if(e.left instanceof Ze&&"-"==e.left.operator&&n()&&e.right.is_number(t)){e=i(tt,e,{operator:"-",left:e.right,right:e.left.expression})
break}case"*":p=t.option("unsafe_math")
case"&":case"|":case"^":if(e.left.is_number(t)&&e.right.is_number(t)&&n()&&!(e.left instanceof tt&&e.left.operator!=e.operator&&Zt[e.left.operator]>=Zt[e.operator])){var f=i(tt,e,{operator:e.operator,left:e.right,right:e.left})
e=e.right instanceof Ct&&!(e.left instanceof Ct)?N(t,f,e):N(t,e,f)}p&&e.is_number(t)&&(e.right instanceof tt&&e.right.operator==e.operator&&(e=i(tt,e,{operator:e.operator,left:i(tt,e.left,{operator:e.operator,left:e.left,right:e.right.left,start:e.left.start,end:e.right.left.end}),right:e.right.right})),e.right instanceof Ct&&e.left instanceof tt&&e.left.operator==e.operator&&(e.left.left instanceof Ct?e=i(tt,e,{operator:e.operator,left:i(tt,e.left,{operator:e.operator,left:e.left.left,right:e.right,start:e.left.left.start,end:e.right.end}),right:e.left.right}):e.left.right instanceof Ct&&(e=i(tt,e,{operator:e.operator,left:i(tt,e.left,{operator:e.operator,left:e.left.right,right:e.right,start:e.left.right.start,end:e.right.end}),right:e.left.left}))),e.left instanceof tt&&e.left.operator==e.operator&&e.left.right instanceof Ct&&e.right instanceof tt&&e.right.operator==e.operator&&e.right.left instanceof Ct&&(e=i(tt,e,{operator:e.operator,left:i(tt,e.left,{operator:e.operator,left:i(tt,e.left.left,{operator:e.operator,left:e.left.right,right:e.right.left,start:e.left.right.start,end:e.right.left.end}),right:e.left.left}),right:e.right.right})))}}if(e.right instanceof tt&&e.right.operator==e.operator&&("&&"==e.operator||"||"==e.operator||"+"==e.operator&&(e.right.left.is_string(t)||e.left.is_string(t)&&e.right.right.is_string(t))))return e.left=i(tt,e.left,{operator:e.operator,left:e.left,right:e.right.left}),e.right=e.right.right,e.transform(t)
var h=e.evaluate(t)
return h!==e?(h=r(h,e).optimize(t),N(t,h,e)):e}),e(Dt,function(e,t){function n(e){var t
return e.walk(new k(function(e){return e instanceof Dt&&(t=!0),t?!0:void 0})),t}var o=e.resolve_defines(t)
if(o)return o.optimize(t)
if(t.option("screw_ie8")&&e.undeclared()&&(!e.scope.uses_with||!t.find_parent(De)))switch(e.name){case"undefined":return i(Bt,e).optimize(t)
case"NaN":return i(kt,e).optimize(t)
case"Infinity":return i(Mt,e).optimize(t)}if(t.option("evaluate")&&t.option("reduce_vars")&&T(e,t.parent())!==e){var a=e.definition(),s=e.fixed_value()
if(s){if(void 0===a.should_replace){var u=s.evaluate(t)
if(u===s||!t.option("unsafe_regexp")&&u instanceof RegExp)a.should_replace=!1
else{u=r(u,s)
var c,l=u.optimize(t).print_to_string().length
n(s)?c=function(){var e=u.optimize(t)
return e===u?e.clone(!0):e}:(l=Math.min(l,s.print_to_string().length),c=function(){var e=M(u.optimize(t),s)
return e===u||e===s?e.clone(!0):e})
var p=a.name.length,f=0
!t.option("unused")||a.global&&!t.option("toplevel")||(f=(p+2+l)/a.references.length),a.should_replace=p+f>=l?c:!1}}if(a.should_replace)return a.should_replace()}}return e}),e(Bt,function(e,t){if(t.option("unsafe")){var r=n(t,"undefined")
if(r){var o=i(Dt,e,{name:"undefined",scope:r.scope,thedef:r})
return o.is_undefined=!0,o}}var a=T(t.self(),t.parent())
return a&&R(a,e)?e:i(Ze,e,{operator:"void",expression:i(wt,e,{value:0})})}),e(Mt,function(e,t){var r=T(t.self(),t.parent())
return r&&R(r,e)?e:!t.option("keep_infinity")||r&&!R(r,e)||n(t,"Infinity")?i(tt,e,{operator:"/",left:i(wt,e,{value:1}),right:i(wt,e,{value:0})}):e}),e(kt,function(e,t){var r=T(t.self(),t.parent())
return r&&!R(r,e)||n(t,"NaN")?i(tt,e,{operator:"/",left:i(wt,e,{value:0}),right:i(wt,e,{value:0})}):e})
var J=["+","-","/","*","%",">>","<<",">>>","|","^","&"],X=["*","|","^","&"]
e(it,function(e,t){return e=e.lift_sequences(t),"="==e.operator&&e.left instanceof Dt&&e.right instanceof tt&&(e.right.left instanceof Dt&&e.right.left.name==e.left.name&&a(e.right.operator,J)?(e.operator=e.right.operator+"=",e.right=e.right.right):e.right.right instanceof Dt&&e.right.right.name==e.left.name&&a(e.right.operator,X)&&!e.right.left.has_side_effects(t)&&(e.operator=e.right.operator+"=",e.right=e.right.left)),e}),e(nt,function(e,t){function n(e){return e.is_boolean()?e:i(Ze,e,{operator:"!",expression:e.negate(t)})}function r(e){return e instanceof Ot||e instanceof Ze&&"!"==e.operator&&e.expression instanceof Ct&&!e.expression.value}function a(e){return e instanceof Nt||e instanceof Ze&&"!"==e.operator&&e.expression instanceof Ct&&!!e.expression.value}if(!t.option("conditionals"))return e
if(e.condition instanceof Ge){var s=e.condition.car
return e.condition=e.condition.cdr,Ge.cons(s,e)}var u=e.condition.evaluate(t)
if(u!==e.condition)return u?(t.warn("Condition always true [{file}:{line},{col}]",e.start),o(t.parent(),e,e.consequent)):(t.warn("Condition always false [{file}:{line},{col}]",e.start),o(t.parent(),e,e.alternative))
var c=u.negate(t,_(t))
N(t,u,c)===c&&(e=i(nt,e,{condition:c,consequent:e.alternative,alternative:e.consequent}))
var l=e.condition,p=e.consequent,f=e.alternative
return l instanceof Dt&&p instanceof Dt&&l.definition()===p.definition()?i(tt,e,{operator:"||",left:l,right:f}):p instanceof it&&f instanceof it&&p.operator==f.operator&&p.left.equivalent_to(f.left)&&(!e.condition.has_side_effects(t)||"="==p.operator&&!p.left.has_side_effects(t))?i(it,e,{operator:p.operator,left:p.left,right:i(nt,e,{condition:e.condition,consequent:p.right,alternative:f.right})}):p instanceof He&&f.TYPE===p.TYPE&&1==p.args.length&&1==f.args.length&&p.expression.equivalent_to(f.expression)&&!p.expression.has_side_effects(t)?(p.args[0]=i(nt,e,{condition:e.condition,consequent:p.args[0],alternative:f.args[0]}),p):p instanceof nt&&p.alternative.equivalent_to(f)?i(nt,e,{condition:i(tt,e,{left:e.condition,operator:"&&",right:p.condition}),consequent:p.consequent,alternative:f}):p.equivalent_to(f)?i(Ge,e,{car:e.condition,cdr:p}).optimize(t):r(e.consequent)?a(e.alternative)?n(e.condition):i(tt,e,{operator:"||",left:n(e.condition),right:e.alternative}):a(e.consequent)?r(e.alternative)?n(e.condition.negate(t)):i(tt,e,{operator:"&&",left:n(e.condition.negate(t)),right:e.alternative}):r(e.alternative)?i(tt,e,{operator:"||",left:n(e.condition.negate(t)),right:e.consequent}):a(e.alternative)?i(tt,e,{operator:"&&",left:n(e.condition),right:e.consequent}):e}),e(Pt,function(e,t){if(t.option("booleans")){var n=t.parent()
return n instanceof tt&&("=="==n.operator||"!="==n.operator)?(t.warn("Non-strict equality against boolean: {operator} {value} [{file}:{line},{col}]",{operator:n.operator,value:e.value,file:n.start.file,line:n.start.line,col:n.start.col}),i(wt,e,{value:+e.value})):i(Ze,e,{operator:"!",expression:i(wt,e,{value:1-e.value})})}return e}),e(Ye,function(e,t){var n=e.property
if(n instanceof At&&t.option("properties")){if(n=n.getValue(),jt(n)?t.option("screw_ie8"):q(n))return i(Ve,e,{expression:e.expression,property:n}).optimize(t)
var o=parseFloat(n)
isNaN(o)||""+o!=n||(e.property=i(wt,e.property,{value:o}))}var a=e.evaluate(t)
return a!==e?(a=r(a,e).optimize(t),N(t,a,e)):e}),e(Ve,function(e,t){var n=e.resolve_defines(t)
if(n)return n.optimize(t)
var o=e.property
if(jt(o)&&!t.option("screw_ie8"))return i(Ye,e,{expression:e.expression,property:i(At,e,{value:o})}).optimize(t)
if(t.option("unsafe_proto")&&e.expression instanceof Ve&&"prototype"==e.expression.property){var a=e.expression.expression
if(a instanceof Dt&&a.undeclared())switch(a.name){case"Array":e.expression=i(rt,e.expression,{elements:[]})
break
case"Object":e.expression=i(ot,e.expression,{properties:[]})
break
case"String":e.expression=i(At,e.expression,{value:""})}}var s=e.evaluate(t)
return s!==e?(s=r(s,e).optimize(t),N(t,s,e)):e}),e(rt,j),e(ot,j),e(_t,j),e(ke,function(e,t){return e.value&&B(e.value,t)&&(e.value=null),e}),e($e,function(e,t){var n=t.option("global_defs")
return n&&w(n,e.name.name)&&t.warn("global_defs "+e.name.name+" redefined [{file}:{line},{col}]",e.start),e})}(),function(){function t(e){return"Literal"==e.type?null!=e.raw?e.raw:e.value+"":void 0}function n(e){var n=e.loc,i=n&&n.start,r=e.range
return new ie({file:n&&n.source,line:i&&i.line,col:i&&i.column,pos:r?r[0]:e.start,endline:i&&i.line,endcol:i&&i.column,endpos:r?r[0]:e.start,raw:t(e)})}function i(e){var n=e.loc,i=n&&n.end,r=e.range
return new ie({file:n&&n.source,line:i&&i.line,col:i&&i.column,pos:r?r[1]:e.end,endline:i&&i.line,endcol:i&&i.column,endpos:r?r[1]:e.end,raw:t(e)})}function r(t,r,a){var p="function From_Moz_"+t+"(M){\n"
p+="return new U2."+r.name+"({\nstart: my_start_token(M),\nend: my_end_token(M)"
var h="function To_Moz_"+t+"(M){\n"
h+="return {\ntype: "+JSON.stringify(t),a&&a.split(/\s*,\s*/).forEach(function(e){var t=/([a-z0-9$_]+)(=|@|>|%)([a-z0-9$_]+)/i.exec(e)
if(!t)throw Error("Can't understand property map: "+e)
var n=t[1],i=t[2],r=t[3]
switch(p+=",\n"+r+": ",h+=",\n"+n+": ",i){case"@":p+="M."+n+".map(from_moz)",h+="M."+r+".map(to_moz)"
break
case">":p+="from_moz(M."+n+")",h+="to_moz(M."+r+")"
break
case"=":p+="M."+n,h+="M."+r
break
case"%":p+="from_moz(M."+n+").body",h+="to_moz_block(M)"
break
default:throw Error("Can't understand operator in propmap: "+e)}}),p+="\n})\n}",h+="\n}\n}",p=Function("U2","my_start_token","my_end_token","from_moz","return("+p+")")(e,n,i,o),h=Function("to_moz","to_moz_block","to_moz_scope","return("+h+")")(u,c,l),f[t]=p,s(r,h)}function o(e){h.push(e)
var t=null!=e?f[e.type](e):null
return h.pop(),t}function a(e,t,n){var i=e.start,r=e.end
return null!=i.pos&&null!=r.endpos&&(t.range=[i.pos,r.endpos]),i.line&&(t.loc={start:{line:i.line,column:i.col},end:r.endline?{line:r.endline,column:r.endcol}:null},i.file&&(t.loc.source=i.file)),t}function s(e,t){e.DEFMETHOD("to_mozilla_ast",function(){return a(this,t(this))})}function u(e){return null!=e?e.to_mozilla_ast():null}function c(e){return{type:"BlockStatement",body:e.body.map(u)}}function l(e,t){var n=t.body.map(u)
return t.body[0]instanceof ue&&t.body[0].body instanceof At&&n.unshift(u(new pe(t.body[0]))),{type:e,body:n}}var p=function(e){for(var t=!0,n=0;n<e.length;n++)t&&e[n]instanceof oe&&e[n].body instanceof At?e[n]=new se({start:e[n].start,end:e[n].end,value:e[n].body.value}):!t||e[n]instanceof oe&&e[n].body instanceof At||(t=!1)
return e},f={Program:function(e){return new Ee({start:n(e),end:i(e),body:p(e.body.map(o))})},FunctionDeclaration:function(e){return new _e({start:n(e),end:i(e),name:o(e.id),argnames:e.params.map(o),body:p(o(e.body).body)})},FunctionExpression:function(e){return new we({start:n(e),end:i(e),name:o(e.id),argnames:e.params.map(o),body:p(o(e.body).body)})},ExpressionStatement:function(e){return new ue({start:n(e),end:i(e),body:o(e.expression)})},TryStatement:function(e){var t=e.handlers||[e.handler]
if(t.length>1||e.guardedHandlers&&e.guardedHandlers.length)throw Error("Multiple catch clauses are not supported.")
return new qe({start:n(e),end:i(e),body:o(e.block).body,bcatch:o(t[0]),bfinally:e.finalizer?new ze(o(e.finalizer)):null})},Property:function(e){var t=e.key,r={start:n(t),end:i(e.value),key:"Identifier"==t.type?t.name:t.value,value:o(e.value)}
return"init"==e.kind?new st(r):(r.key=new pt({name:r.key}),r.value=new Ae(r.value),"get"==e.kind?new ct(r):"set"==e.kind?new ut(r):void 0)},ArrayExpression:function(e){return new rt({start:n(e),end:i(e),elements:e.elements.map(function(e){return null===e?new Tt:o(e)})})},ObjectExpression:function(e){return new ot({start:n(e),end:i(e),properties:e.properties.map(function(e){return e.type="Property",o(e)})})},SequenceExpression:function(e){return Ge.from_array(e.expressions.map(o))},MemberExpression:function(e){return new(e.computed?Ye:Ve)({start:n(e),end:i(e),property:e.computed?o(e.property):e.property.name,expression:o(e.object)})},SwitchCase:function(e){return new(e.test?je:Re)({start:n(e),end:i(e),expression:o(e.test),body:e.consequent.map(o)})},VariableDeclaration:function(e){return new("const"===e.kind?Xe:Je)({start:n(e),end:i(e),definitions:e.declarations.map(o)})},Literal:function(e){var t=e.value,r={start:n(e),end:i(e)}
if(null===t)return new St(r)
switch(typeof t){case"string":return r.value=t,new At(r)
case"number":return r.value=t,new wt(r)
case"boolean":return new(t?Ot:Nt)(r)
default:var o=e.regex
return o&&o.pattern?r.value=""+RegExp(o.pattern,o.flags):r.value=e.regex&&e.raw?e.raw:t,new _t(r)}},Identifier:function(e){var t=h[h.length-2]
return new("LabeledStatement"==t.type?yt:"VariableDeclarator"==t.type&&t.id===e?"const"==t.kind?dt:ht:"FunctionExpression"==t.type?t.id===e?vt:mt:"FunctionDeclaration"==t.type?t.id===e?gt:mt:"CatchClause"==t.type?xt:"BreakStatement"==t.type||"ContinueStatement"==t.type?bt:Dt)({start:n(e),end:i(e),name:e.name})}}
f.UpdateExpression=f.UnaryExpression=function(e){var t="prefix"in e?e.prefix:"UnaryExpression"==e.type?!0:!1
return new(t?Ze:et)({start:n(e),end:i(e),operator:e.operator,expression:o(e.argument)})},r("EmptyStatement",pe),r("BlockStatement",le,"body@body"),r("IfStatement",Ne,"test>condition, consequent>body, alternate>alternative"),r("LabeledStatement",he,"label>label, body>body"),r("BreakStatement",Me,"label>label"),r("ContinueStatement",Pe,"label>label"),r("WithStatement",De,"object>expression, body>body"),r("SwitchStatement",Oe,"discriminant>expression, cases@body"),r("ReturnStatement",ke,"argument>value"),r("ThrowStatement",Be,"argument>value"),r("WhileStatement",ve,"test>condition, body>body"),r("DoWhileStatement",ge,"test>condition, body>body"),r("ForStatement",xe,"init>init, test>condition, update>step, body>body"),r("ForInStatement",ye,"left>init, right>object, body>body"),r("DebuggerStatement",ae),r("VariableDeclarator",$e,"id>name, init>value"),r("CatchClause",Le,"param>argname, body%body"),r("ThisExpression",Et),r("BinaryExpression",tt,"operator=operator, left>left, right>right"),r("LogicalExpression",tt,"operator=operator, left>left, right>right"),r("AssignmentExpression",it,"operator=operator, left>left, right>right"),r("ConditionalExpression",nt,"test>condition, consequent>consequent, alternate>alternative"),r("NewExpression",We,"callee>expression, arguments@args"),r("CallExpression",He,"callee>expression, arguments@args"),s(Ee,function(e){return l("Program",e)}),s(_e,function(e){return{type:"FunctionDeclaration",id:u(e.name),params:e.argnames.map(u),body:l("BlockStatement",e)}}),s(we,function(e){return{type:"FunctionExpression",id:u(e.name),params:e.argnames.map(u),body:l("BlockStatement",e)}}),s(se,function(e){return{type:"ExpressionStatement",expression:{type:"Literal",value:e.value}}}),s(ue,function(e){return{type:"ExpressionStatement",expression:u(e.body)}}),s(Ie,function(e){return{type:"SwitchCase",test:u(e.expression),consequent:e.body.map(u)}}),s(qe,function(e){return{type:"TryStatement",block:c(e),handler:u(e.bcatch),guardedHandlers:[],finalizer:u(e.bfinally)}}),s(Le,function(e){return{type:"CatchClause",param:u(e.argname),guard:null,body:c(e)}}),s(Ue,function(e){return{type:"VariableDeclaration",kind:e instanceof Xe?"const":"var",declarations:e.definitions.map(u)}}),s(Ge,function(e){return{type:"SequenceExpression",expressions:e.to_array().map(u)}}),s(Ke,function(e){var t=e instanceof Ye
return{type:"MemberExpression",object:u(e.expression),computed:t,property:t?u(e.property):{type:"Identifier",name:e.property}}}),s(Qe,function(e){return{type:"++"==e.operator||"--"==e.operator?"UpdateExpression":"UnaryExpression",operator:e.operator,prefix:e instanceof Ze,argument:u(e.expression)}}),s(tt,function(e){return{type:"&&"==e.operator||"||"==e.operator?"LogicalExpression":"BinaryExpression",left:u(e.left),operator:e.operator,right:u(e.right)}}),s(rt,function(e){return{type:"ArrayExpression",elements:e.elements.map(u)}}),s(ot,function(e){return{type:"ObjectExpression",properties:e.properties.map(u)}}),s(at,function(e){var t,n={type:"Literal",value:e.key instanceof pt?e.key.name:e.key}
return e instanceof st?t="init":e instanceof ct?t="get":e instanceof ut&&(t="set"),{type:"Property",kind:t,key:n,value:u(e.value)}}),s(lt,function(e){var t=e.definition()
return{type:"Identifier",name:t?t.mangled_name||t.name:e.name}}),s(_t,function(e){var t=e.value
return{type:"Literal",value:t,raw:""+t,regex:{pattern:t.source,flags:(""+t).match(/[gimuy]*$/)[0]}}}),s(Ct,function(e){var t=e.value
return"number"==typeof t&&(0>t||0===t&&0>1/t)?{type:"UnaryExpression",operator:"-",prefix:!0,argument:{type:"Literal",value:-t,raw:e.start.raw}}:{type:"Literal",value:t,raw:e.start.raw}}),s(Ft,function(e){return{type:"Identifier",name:e.value+""}}),Pt.DEFMETHOD("to_mozilla_ast",Ct.prototype.to_mozilla_ast),St.DEFMETHOD("to_mozilla_ast",Ct.prototype.to_mozilla_ast),Tt.DEFMETHOD("to_mozilla_ast",function(){return null}),ce.DEFMETHOD("to_mozilla_ast",le.prototype.to_mozilla_ast),Ce.DEFMETHOD("to_mozilla_ast",we.prototype.to_mozilla_ast)
var h=null
re.from_mozilla_ast=function(e){var t=h
h=[]
var n=o(e)
return h=t,n}}(),e.Compressor=V,e.DefaultsError=l,e.Dictionary=A,e.JS_Parse_Error=z,e.MAP=ne,e.OutputStream=K,e.SourceMap=Y,e.TreeTransformer=H,e.TreeWalker=k,e.base54=tn,e.defaults=p,e.mangle_properties=Z,e.merge=f,e.parse=$,e.push_uniq=x,e.string_template=y,e.tokenizer=X,e.is_identifier=I,e.SymbolDef=W,re.warn_function=function(e){n.error("uglifyjs WARN: "+e)},[process.stdout,process.stderr].forEach(function(e){e._handle&&e._handle.setBlocking&&e._handle.setBlocking(!0)}),e.AST_Node.warn_function=function(e){console.error("WARN: %s",e)},e.minify=function(t,n,r){n=e.defaults(n,{compress:{},fromString:!1,inSourceMap:null,mangle:{},mangleProperties:!1,nameCache:null,outFileName:null,output:null,outSourceMap:null,parse:{},sourceMapInline:!1,sourceMapUrl:null,sourceRoot:null,spidermonkey:!1,warnings:!1}),e.base54.reset()
var o=n.inSourceMap
"string"==typeof o&&"inline"!=o&&(o=JSON.parse(i.readFile(o,"utf8")))
var a=null,s={}
if(n.spidermonkey){if("inline"==o)throw Error("inline source map only works with built-in parser")
a=e.AST_Node.from_mozilla_ast(t)}else{var u=function(t,r){var u=n.fromString?t:i.readFile(t,"utf8")
"inline"==o&&(o=ee(u)),s[r]=u,a=e.parse(u,{filename:r,toplevel:a,bare_returns:n.parse?n.parse.bare_returns:void 0})}
if(!n.fromString&&(t=e.simple_glob(t),"inline"==o&&t.length>1))throw Error("inline source map only works with singular input");[].concat(t).forEach(function(e,t){if("string"==typeof e)u(e,n.fromString?t:e)
else for(var i in e)u(e[i],i)})}if(n.wrap&&(a=a.wrap_commonjs(n.wrap,n.exportAll)),n.compress){var c={warnings:n.warnings}
e.merge(c,n.compress),a.figure_out_scope(n.mangle)
var l=e.Compressor(c)
a=l.compress(a)}(n.mangleProperties||n.nameCache)&&(n.mangleProperties.cache=e.readNameCache(n.nameCache,"props"),a=e.mangle_properties(a,n.mangleProperties),e.writeNameCache(n.nameCache,"props",n.mangleProperties.cache)),n.mangle&&(a.figure_out_scope(n.mangle),a.compute_char_frequency(n.mangle),a.mangle_names(n.mangle))
var p={max_line_len:32e3}
if((n.outSourceMap||n.sourceMapInline)&&(p.source_map=e.SourceMap({file:n.outFileName||("string"==typeof n.outSourceMap?n.outSourceMap.replace(/\.map$/i,""):null),orig:o,root:n.sourceRoot}),n.sourceMapIncludeSources))for(var f in s)s.hasOwnProperty(f)&&p.source_map.get().setSourceContent(f,s[f])
n.output&&e.merge(p,n.output)
var h=e.OutputStream(p)
a.print(h)
var d=p.source_map
d&&(d+="")
var m="\n//# sourceMappingURL="
return n.sourceMapInline?h+=m+"data:application/json;charset=utf-8;base64,"+new Buffer(d).toString("base64"):n.outSourceMap&&"string"==typeof n.outSourceMap&&n.sourceMapUrl!==!1&&(h+=m+("string"==typeof n.sourceMapUrl?n.sourceMapUrl:n.outSourceMap)),{code:h+"",map:d}},e.describe_ast=function(){function t(e){n.print("AST_"+e.TYPE)
var i=e.SELF_PROPS.filter(function(e){return!/^\$/.test(e)})
i.length>0&&(n.space(),n.with_parens(function(){i.forEach(function(e,t){t&&n.space(),n.print(e)})})),e.documentation&&(n.space(),n.print_string(e.documentation)),e.SUBCLASSES.length>0&&(n.space(),n.with_block(function(){e.SUBCLASSES.forEach(function(e,i){n.indent(),t(e),n.newline()})}))}var n=e.OutputStream({beautify:!0})
return t(e.AST_Node),n+""},e.readReservedFile=te,e.readDefaultReservedFile=function(e){return te(require.resolve("./domprops.json"),e)},e.readNameCache=function(t,n){var r=null
if(t)try{var r=i.readFile(t,"utf8")
if(r=JSON.parse(r)[n],!r)throw"init"
r.props=e.Dictionary.fromObject(r.props)}catch(o){r={cname:-1,props:new e.Dictionary}}return r},e.writeNameCache=function(e,t,n){if(e){var r
try{r=i.readFile(e,"utf8"),r=JSON.parse(r)}catch(o){r={}}r[t]={cname:n.cname,props:n.props.toObject()},i.writeFile(e,JSON.stringify(r,null,2),"utf8")}},e.simple_glob=function rn(e){if(Array.isArray(e))return[].concat.apply([],e.map(rn))
if(e.match(/\*|\?/)){var t=path.dirname(e)
try{var n=fs.readdirSync(t)}catch(i){}if(n){var r="^"+path.basename(e).replace(/[.+^$[\]\\(){}]/g,"\\$&").replace(/\*/g,"[^/\\\\]*").replace(/\?/g,"[^/\\\\]")+"$",o="win32"===process.platform?"i":"",a=RegExp(r,o),s=n.filter(function(e){return a.test(e)}).map(function(e){return path.join(t,e)})
if(s.length)return s}}return[e]}}),define("parse",["./esprimaAdapter","lang"],function(esprima,lang){" "
function arrayToString(e){var t="["
return e&&e.forEach(function(e,n){t+=(n>0?",":"")+'"'+lang.jsEscape(e)+'"'}),t+="]"}function traverse(e,t){var n
if(e){if(t.call(null,e)===!1)return!1
for(var i=0,r=Object.keys(e);i<r.length;i++)if(n=e[r[i]],"object"==typeof n&&null!==n&&traverse(n,t)===!1)return!1}}function traverseBroad(e,t){var n
if(e){if(t.call(null,e)===!1)return!1
for(var i=0,r=Object.keys(e);i<r.length;i++)n=e[key],"object"==typeof n&&null!==n&&traverseBroad(n,t)}}function getValidDeps(e){if(e&&"ArrayExpression"===e.type&&e.elements){var t=[]
return e.elements.some(function(e){"Literal"===e.type&&t.push(e.value)}),t.length?t:void 0}}function isFnExpression(e){return e&&("FunctionExpression"===e.type||"ArrowFunctionExpression"===e.type)}function parse(e,t,n,i){i=i||{}
var r,o,a,s=[],u="",c=[],l=!0,p=esprima.parse(n)
if(parse.recurse(p,function(t,n,r,o,a,u,p){return o||(o=[]),"define"!==t||r&&r!==e||(l=!1),r?c.push({name:r,deps:o}):s=s.concat(o),"define"===t&&u&&hasProp(p,u)?u:!!i.findNestedDependencies},i),i.insertNeedsDefine&&l&&(u+='require.needsDefine("'+e+'");'),s.length||c.length){for(r=0;r<c.length;r++)o=c[r],u&&(u+="\n"),o.name===e&&(o.deps=o.deps.concat(s),s=[]),a=arrayToString(o.deps),u+='define("'+o.name+'",'+a+");"
s.length&&(u&&(u+="\n"),a=arrayToString(s),u+='define("'+e+'",'+a+");")}return u||null}var argPropName="arguments",emptyScope={},mixin=lang.mixin,hasProp=lang.hasProp
return parse.traverse=traverse,parse.traverseBroad=traverseBroad,parse.isFnExpression=isFnExpression,parse.recurse=function(e,t,n,i){var r,o,a,s,u,c,l,p=n&&n.has
if(i=i||emptyScope,e)if(p&&"IfStatement"===e.type&&e.test.type&&"Literal"===e.test.type)e.test.value?this.recurse(e.consequent,t,n,i):this.recurse(e.alternate,t,n,i)
else{if(a=this.parseNode(e,t,i),a===!1)return
if("string"==typeof a)return a
if("ExpressionStatement"===e.type&&e.expression&&"CallExpression"===e.expression.type&&e.expression.callee&&isFnExpression(e.expression.callee)&&(l=e.expression.callee),"UnaryExpression"===e.type&&e.argument&&"CallExpression"===e.argument.type&&e.argument.callee&&isFnExpression(e.argument.callee)&&(l=e.argument.callee),l&&l.params&&l.params.length)for(u=l.params,i=mixin({},i,!0),s=0;s<u.length;s++)c=u[s],"Identifier"===c.type&&(i[c.name]=!0)
for(s=0,r=Object.keys(e);s<r.length&&(o=e[r[s]],"object"!=typeof o||null===o||(a=this.recurse(o,t,n,i),"string"!=typeof a||!hasProp(i,a)));s++);if("string"==typeof a){if(hasProp(i,a))return a
return}}},parse.definesRequire=function(e,t){var n=!1,i=!1
return traverse(esprima.parse(t),function(e){return"Program"===e.type&&e.body&&e.body.length&&(n=e.body.some(function(e){if("VariableDeclaration"===e.type){var t=e.declarations
if(t){var n=t.some(function(e){return"VariableDeclarator"===e.type&&e.id&&"Identifier"===e.id.type&&"define"===e.id.name})
if(n)return!0}}return"FunctionDeclaration"===e.type&&e.id&&"Identifier"===e.id.type&&"define"===e.id.name?!0:void 0})),n&&parse.hasDefineAmd(e)?(i=!0,!1):void 0}),n&&i},parse.getAnonDeps=function(e,t){var n="string"==typeof t?esprima.parse(t):t,i=this.findAnonDefineFactory(n)
return parse.getAnonDepsFromNode(i)},parse.getAnonDepsFromNode=function(e){var t,n=[]
return e&&(this.findRequireDepNames(e,n),t=e.params&&e.params.length,t&&(n=(t>1?["require","exports","module"]:["require"]).concat(n))),n},parse.isDefineNodeWithArgs=function(e){return e&&"CallExpression"===e.type&&e.callee&&"Identifier"===e.callee.type&&"define"===e.callee.name&&e[argPropName]},parse.findAnonDefineFactory=function(e){var t
return traverse(e,function(e){var n,i
if(parse.isDefineNodeWithArgs(e)){if(n=e[argPropName][0],isFnExpression(n))return t=n,!1
if(i=e[argPropName][1],"Literal"===n.type&&isFnExpression(i))return t=i,!1}}),t},parse.findConfig=function(fileContents){var jsConfig,foundConfig,stringData,foundRange,quote,quoteMatch,quoteRegExp=/(:\s|\[\s*)(['"])/,astRoot=esprima.parse(fileContents,{loc:!0})
return traverse(astRoot,function(e){var t,n=parse.hasRequire(e)
if(!n||"require"!==n&&"requirejs"!==n&&"requireConfig"!==n&&"requirejsConfig"!==n){if(t=parse.getRequireObjectLiteral(e))return stringData=parse.nodeToString(fileContents,t),jsConfig=stringData.value,foundRange=stringData.range,!1}else if(t=e[argPropName]&&e[argPropName][0],t&&"ObjectExpression"===t.type)return stringData=parse.nodeToString(fileContents,t),jsConfig=stringData.value,foundRange=stringData.range,!1}),jsConfig&&(quoteMatch=quoteRegExp.exec(jsConfig),quote=quoteMatch&&quoteMatch[2]||'"',foundConfig=eval("("+jsConfig+")")),{config:foundConfig,range:foundRange,quote:quote}},parse.getRequireObjectLiteral=function(e){return e.id&&"Identifier"===e.id.type&&("require"===e.id.name||"requirejs"===e.id.name)&&e.init&&"ObjectExpression"===e.init.type?e.init:void 0},parse.renameNamespace=function(e,t){var n,i=[],r=esprima.parse(e,{loc:!0})
return parse.recurse(r,function(e,t,n,r,o){return i.push(o.loc),"define"!==e},{}),i.length&&(n=e.split("\n"),i.reverse(),i.forEach(function(e){var i=e.start.column,r=e.start.line-1,o=n[r]
n[r]=o.substring(0,i)+t+"."+o.substring(i,o.length)}),e=n.join("\n")),e},parse.findDependencies=function(e,t,n){var i=[],r=esprima.parse(t)
return parse.recurse(r,function(e,t,n,r){r&&(i=i.concat(r))},n),i},parse.findCjsDependencies=function(e,t){var n=[]
return traverse(esprima.parse(t),function(e){var t
e&&"CallExpression"===e.type&&e.callee&&"Identifier"===e.callee.type&&"require"===e.callee.name&&e[argPropName]&&1===e[argPropName].length&&(t=e[argPropName][0],"Literal"===t.type&&n.push(t.value))}),n},parse.hasDefDefine=function(e){return"FunctionDeclaration"===e.type&&e.id&&"Identifier"===e.id.type&&"define"===e.id.name},parse.hasDefineAmd=function(e){return e&&"AssignmentExpression"===e.type&&e.left&&"MemberExpression"===e.left.type&&e.left.object&&"define"===e.left.object.name&&e.left.property&&"amd"===e.left.property.name},parse.refsDefineAmd=function(e){return e&&"MemberExpression"===e.type&&e.object&&"define"===e.object.name&&"Identifier"===e.object.type&&e.property&&"amd"===e.property.name&&"Identifier"===e.property.type},parse.hasRequire=function(e){var t,n=e&&e.callee
return e&&"CallExpression"===e.type&&n&&("Identifier"!==n.type||"require"!==n.name&&"requirejs"!==n.name?"MemberExpression"===n.type&&n.object&&"Identifier"===n.object.type&&("require"===n.object.name||"requirejs"===n.object.name)&&n.property&&"config"===n.property.name&&(t=n.object.name+"Config"):t=n.name),t},parse.hasDefine=function(e){return e&&"CallExpression"===e.type&&e.callee&&"Identifier"===e.callee.type&&"define"===e.callee.name},parse.getNamedDefine=function(e){var t
return traverse(esprima.parse(e),function(e){return e&&"CallExpression"===e.type&&e.callee&&"Identifier"===e.callee.type&&"define"===e.callee.name&&e[argPropName]&&e[argPropName][0]&&"Literal"===e[argPropName][0].type?(t=e[argPropName][0].value,!1):void 0}),t},parse.getAllNamedDefines=function(e,t){var n=[]
return parse.recurse(esprima.parse(e),function(e,i,r,o,a,s,u){return"define"===e&&r&&(t.hasOwnProperty(r)||n.push(r)),"define"===e&&s&&hasProp(u,s)?s:!0},{}),n},parse.usesAmdOrRequireJs=function(e,t){var n
return traverse(esprima.parse(t),function(e){var t,i,r
parse.hasDefDefine(e)?t="declaresDefine":parse.hasDefineAmd(e)?t="defineAmd":(i=parse.hasRequire(e),i?(r=e[argPropName]&&e[argPropName][0],!r||"ObjectExpression"!==r.type&&"ArrayExpression"!==r.type||(t=i)):parse.hasDefine(e)&&(t="define")),t&&(n||(n={}),n[t]=!0)}),n},parse.usesCommonJs=function(e,t){var n=null,i=!1
return traverse(esprima.parse(t),function(e){var t,r=e.expression||e.init
"Identifier"!==e.type||"__dirname"!==e.name&&"__filename"!==e.name?"VariableDeclarator"===e.type&&e.id&&"Identifier"===e.id.type&&"exports"===e.id.name?t="varExports":r&&"AssignmentExpression"===r.type&&r.left&&"MemberExpression"===r.left.type&&r.left.object?"module"===r.left.object.name&&r.left.property&&"exports"===r.left.property.name?t="moduleExports":"exports"===r.left.object.name&&r.left.property?t="exports":"MemberExpression"===r.left.object.type&&"module"===r.left.object.object.name&&"exports"===r.left.object.property.name&&"Identifier"===r.left.object.property.type&&(t="moduleExports"):e&&"CallExpression"===e.type&&e.callee&&"Identifier"===e.callee.type&&"require"===e.callee.name&&e[argPropName]&&1===e[argPropName].length&&"Literal"===e[argPropName][0].type&&(t="require"):t=e.name.substring(2),t&&("varExports"===t?i=!0:"exports"===t&&i||(n||(n={}),n[t]=!0))}),n},parse.findRequireDepNames=function(e,t){traverse(e,function(e){var n
e&&"CallExpression"===e.type&&e.callee&&"Identifier"===e.callee.type&&"require"===e.callee.name&&e[argPropName]&&1===e[argPropName].length&&(n=e[argPropName][0],"Literal"===n.type&&t.push(n.value))})},parse.parseNode=function(e,t,n){var i,r,o,a,s,u,c,l,p=e&&e[argPropName],f=parse.hasRequire(e),h=!1
if("require"===f||"requirejs"===f){if(a=e[argPropName]&&e[argPropName][0],a&&"ArrayExpression"!==a.type&&"ObjectExpression"===a.type&&(a=e[argPropName][1]),r=getValidDeps(a),!r)return
return t("require",null,null,r,e)}if(parse.hasDefine(e)&&p&&p.length){if(i=p[0],r=p[1],s=p[2],"ArrayExpression"===i.type?(s=r,r=i,i=null):isFnExpression(i)?(s=i,i=r=null):"Identifier"===i.type&&1===p.length&&hasProp(n,i.name)?(h=!0,s=i,i=null):"Literal"!==i.type&&(i=r=s=null),i&&"Literal"===i.type&&r&&(isFnExpression(r)?(s=r,r=null):"ObjectExpression"===r.type?r=s=null:"Identifier"===r.type&&(2===p.length?r=s=null:3===p.length&&isFnExpression(s)&&(r=null))),r&&"ArrayExpression"===r.type)r=getValidDeps(r)
else if(isFnExpression(s))o=parse.getAnonDepsFromNode(s),o.length&&(r=o)
else if(r||s&&!h)return
return i&&"Literal"===i.type&&(i=i.value),t("define",null,i,r,e,s&&"Identifier"===s.type?s.name:void 0,n)}return"CallExpression"===e.type&&e.callee&&isFnExpression(e.callee)&&e.callee.body&&e.callee.body.body&&1===e.callee.body.body.length&&"IfStatement"===e.callee.body.body[0].type&&(l=e.callee.body.body[0],l.consequent&&l.consequent.body&&(u=l.consequent.body[0],"ExpressionStatement"===u.type&&u.expression&&parse.hasDefine(u.expression)&&u.expression.arguments&&1===u.expression.arguments.length&&"Identifier"===u.expression.arguments[0].type&&(traverse(l.test,function(e){return parse.refsDefineAmd(e)?(c=!0,!1):void 0}),c)))?t("define",null,null,null,u.expression,u.expression.arguments[0].name,n):void 0},parse.nodeToString=function(e,t){var n,i=t.loc,r=e.split("\n"),o=i.start.line>1?r.slice(0,i.start.line-1).join("\n")+"\n":"",a=o+r[i.start.line-1].substring(0,i.start.column)
return n=i.start.line===i.end.line?r[i.start.line-1].substring(i.start.column,i.end.column):r[i.start.line-1].substring(i.start.column)+"\n"+r.slice(i.start.line,i.end.line-1).join("\n")+"\n"+r[i.end.line-1].substring(0,i.end.column),{value:n,range:[a.length,a.length+n.length]}},parse.getLicenseComments=function(e,t){var n,i,r,o,a,s,u=esprima.parse(t,{comment:!0,range:!0}),c="",l={},p=-1===t.indexOf("\r")?"\n":"\r\n"
if(u.comments)for(a=0;a<u.comments.length;a++){if(n=u.comments[a],"Line"===n.type)if(o="//"+n.value+p,i=n,a+1>=u.comments.length)o+=p
else{for(s=a+1;s<u.comments.length&&(r=u.comments[s],"Line"===r.type&&r.range[0]===i.range[1]+1);s++)o+="//"+r.value+p,i=r
o+=p,a=s-1}else o="/*"+n.value+"*/"+p+p
l[o]||-1===o.indexOf("license")&&("Block"!==n.type||0!==o.indexOf("/*!"))&&-1===o.indexOf("opyright")&&-1===o.indexOf("(c)")||(c+=o,l[o]=!0)}return c},parse}),define("transform",["./esprimaAdapter","./parse","logger","lang"],function(e,t,n,i){" "
function r(e,t,n){var i=c[n]
return e.replace(i,"$&"+t)}var o,a=/^([ \t]+)/,s=/\{[\r\n]+([ \t]+)/,u=/^[_A-Za-z]([A-Za-z\d_]*)$/,c={"\n":/\n/g,"\r\n":/\r\n/g}
return o={toTransport:function(r,o,a,s,u,c){c=c||{}
var l,p,f,h,d=0,m=!1,g=[],v=function(e){return c.useSourceUrl&&(e='eval("'+i.jsEscape(e)+"\\n//# sourceURL="+(0===a.indexOf("/")?"":"/")+a+'");\n'),e}
try{l=e.parse(s,{loc:!0})}catch(x){return n.trace("toTransport skipping "+a+": "+x),s}return t.traverse(l,function(e){var i,o,s,u,c,l,p,f,v,x,y=!1
if("VariableDeclarator"===e.type&&e.id&&"define"===e.id.name&&"Identifier"===e.id.type&&(f=e.init,!(f&&f.callee&&"CallExpression"===f.callee.type&&f.callee.callee&&"Identifier"===f.callee.callee.type&&"require"===f.callee.callee.name&&f.callee.arguments&&1===f.callee.arguments.length&&"Literal"===f.callee.arguments[0].type&&f.callee.arguments[0].value&&-1!==f.callee.arguments[0].value.indexOf("amdefine"))))return!1
if(y=r&&"CallExpression"===e.type&&e.callee&&e.callee.object&&"Identifier"===e.callee.object.type&&e.callee.object.name===r&&"Identifier"===e.callee.property.type&&"define"===e.callee.property.name,y||t.isDefineNodeWithArgs(e)){if(i=e.arguments,!i||!i.length)return
if(o=i[0],s=o.loc,1===i.length)"Identifier"===o.type?(c=!0,l="empty"):t.isFnExpression(o)?(u=o,c=!0,l="scan"):"ObjectExpression"===o.type?(c=!0,l="skip"):"Literal"===o.type&&"number"==typeof o.value?(c=!0,l="skip"):"UnaryExpression"===o.type&&"-"===o.operator&&o.argument&&"Literal"===o.argument.type&&"number"==typeof o.argument.value?(c=!0,l="skip"):"MemberExpression"===o.type&&o.object&&o.property&&"Identifier"===o.property.type&&(c=!0,l="empty")
else if("ArrayExpression"===o.type)c=!0,l="skip"
else{if("Literal"!==o.type||"string"!=typeof o.value)return
c=!1,2===i.length&&t.isFnExpression(i[1])?(u=i[1],l="scan"):l="skip"}if(x={foundId:p,needsId:c,depAction:l,namespaceExists:y,node:e,defineLoc:e.loc,firstArgLoc:s,factoryNode:u,sourceUrlData:v},x.needsId){if(h)return n.trace(a+" has more than one anonymous define. May be a built file from another build system like, Ender. Skipping normalization."),g=[],!1
h=x,g.push(x)}else"scan"===l&&(d+=1,d>1?m||(g=h?[h]:[],m=!0):g.push(x))}}),g.length?(g.reverse(),p=s.split("\n"),f=function(e,t){var n=e.start.column,i=e.start.line-1,r=p[i]
p[i]=r.substring(0,n)+t+r.substring(n,r.length)},g.forEach(function(e){var n,i="",a=""
e.needsId&&o&&(i+="'"+o+"',"),"scan"===e.depAction&&(n=t.getAnonDepsFromNode(e.factoryNode),a=n.length?"["+n.map(function(e){return"'"+e+"'"})+"]":"[]",a+=",",e.factoryNode?f(e.factoryNode.loc,a):i+=a),i&&f(e.firstArgLoc,i),r&&!e.namespaceExists&&f(e.defineLoc,r+"."),u&&u(e)}),s=p.join("\n"),v(s)):v(s)},modifyConfig:function(e,n){var i=t.findConfig(e),r=i.config
return r&&(r=n(r))?o.serializeConfig(r,e,i.range[0],i.range[1],{quote:i.quote}):e},serializeConfig:function(e,t,n,i,u){var c,l,p,f,h="",d=t.substring(0,n),m=t.substring(n,i),g=-1===m.indexOf("\r")?"\n":"\r\n",v=d.lastIndexOf("\n")
return-1===v&&(v=0),l=a.exec(d.substring(v+1,n)),l&&l[1]&&(h=l[1]),l=s.exec(m),l&&l[1]&&(c=l[1]),c=!c||c.length<h?"  ":c.substring(h.length),f=RegExp("("+g+")"+c,"g"),p=o.objectToString(e,{indent:c,lineReturn:g,outDentRegExp:f,quote:u&&u.quote}),p=r(p,h,g),d+p+t.substring(i)},objectToString:function(e,t,n){var r,a,s,c=!0,l="",p=t.lineReturn,f=t.indent,h=t.outDentRegExp,d=t.quote||'"'
return n=n||"",s=n+f,null===e?l="null":void 0===e?l="undefined":"number"==typeof e||"boolean"==typeof e?l=e:"string"==typeof e?l=d+i.jsEscape(e)+d:i.isArray(e)?(i.each(e,function(e,n){l+=(0!==n?","+p:"")+s+o.objectToString(e,t,s)}),r="[",a="]"):i.isFunction(e)||i.isRegExp(e)?l=(""+e).replace(h,"$1"):(i.eachProp(e,function(e,n){l+=(c?"":","+p)+s+(u.test(n)?n:d+i.jsEscape(n)+d)+": "+o.objectToString(e,t,s),c=!1}),r="{",a="}"),r&&(l=r+p+l+p+n+a),l}}}),define("pragma",["parse","logger"],function(parse,logger){" "
function Temp(){}function create(e,t){Temp.prototype=e
var n,i=new Temp
if(Temp.prototype=null,t)for(n in t)t.hasOwnProperty(n)&&!i.hasOwnProperty(n)&&(i[n]=t[n])
return i}var pragma={conditionalRegExp:/(exclude|include)Start\s*\(\s*["'](\w+)["']\s*,(.*)\)/,useStrictRegExp:/(^|[^{]\r?\n)['"] ['"];/g,hasRegExp:/has\s*\(\s*['"]([^'"]+)['"]\s*\)/g,configRegExp:/(^|[^\.])(requirejs|require)(\.config)\s*\(/g,nsWrapRegExp:/\/\*requirejs namespace: true \*\//,apiDefRegExp:/var requirejs,\s*require,\s*define;/,defineCheckRegExp:/typeof(\s+|\s*\(\s*)define(\s*\))?\s*===?\s*["']function["']\s*&&\s*define\s*\.\s*amd/g,defineStringCheckRegExp:/typeof\s+define\s*===?\s*["']function["']\s*&&\s*define\s*\[\s*["']amd["']\s*\]/g,defineTypeFirstCheckRegExp:/\s*["']function["']\s*==(=?)\s*typeof\s+define\s*&&\s*define\s*\.\s*amd/g,defineJQueryRegExp:/typeof\s+define\s*===?\s*["']function["']\s*&&\s*define\s*\.\s*amd\s*&&\s*define\s*\.\s*amd\s*\.\s*jQuery/g,defineHasRegExp:/typeof\s+define\s*==(=)?\s*['"]function['"]\s*&&\s*typeof\s+define\.amd\s*==(=)?\s*['"]object['"]\s*&&\s*define\.amd/g,defineTernaryRegExp:/typeof\s+define\s*===?\s*['"]function["']\s*&&\s*define\s*\.\s*amd\s*\?\s*define/,defineExistsRegExp:/\s+typeof\s+define\s*!==?\s*['"]undefined["']\s*/,defineExistsAndAmdRegExp:/typeof\s+define\s*!==?\s*['"]undefined["']\s*&&\s*define\s*\.\s*amd\s*/,amdefineRegExp:/if\s*\(\s*typeof define\s*\!==\s*['"]function['"]\s*\)\s*\{\s*[^\{\}]+amdefine[^\{\}]+\}/g,removeStrict:function(e,t){return t.useStrict?e:e.replace(pragma.useStrictRegExp,"$1")},namespace:function(e,t,n){return t&&(e=e.replace(pragma.configRegExp,"$1"+t+".$2$3("),e=parse.renameNamespace(e,t),e=e.replace(pragma.defineTernaryRegExp,"typeof "+t+".define === 'function' && "+t+".define.amd ? "+t+".define"),e=e.replace(pragma.defineJQueryRegExp,"typeof "+t+".define === 'function' && "+t+".define.amd && "+t+".define.amd.jQuery"),e=e.replace(pragma.defineHasRegExp,"typeof "+t+".define === 'function' && typeof "+t+".define.amd === 'object' && "+t+".define.amd"),e=e.replace(pragma.defineExistsAndAmdRegExp,"typeof "+t+".define !== 'undefined' && "+t+".define.amd"),e=e.replace(pragma.defineCheckRegExp,"typeof "+t+".define === 'function' && "+t+".define.amd"),e=e.replace(pragma.defineStringCheckRegExp,"typeof "+t+".define === 'function' && "+t+".define['amd']"),e=e.replace(pragma.defineTypeFirstCheckRegExp,"'function' === typeof "+t+".define && "+t+".define.amd"),e=e.replace(pragma.defineExistsRegExp,"typeof "+t+".define !== 'undefined'"),pragma.apiDefRegExp.test(e)&&-1===e.indexOf("if (!"+t+" || !"+t+".requirejs)")&&(e="var "+t+";(function () { if (!"+t+" || !"+t+".requirejs) {\nif (!"+t+") { "+t+" = {}; } else { require = "+t+"; }\n"+e+"\n"+t+".requirejs = requirejs;"+t+".require = require;"+t+".define = define;\n}\n}());"),pragma.nsWrapRegExp.test(e)&&(e=e.replace(pragma.nsWrapRegExp,""),e="(function () {\nvar require = "+t+".require,requirejs = "+t+".requirejs,define = "+t+".define;\n"+e+"\n}());")),e},process:function(fileName,fileContents,config,onLifecycleName,pluginCollector){var foundIndex=-1,startIndex=0,lineEndIndex,conditionLine,matches,type,marker,condition,isTrue,endRegExp,endMatches,endMarkerIndex,shouldInclude,startLength,lifecycleHas,deps,i,dep,moduleName,collectorMod,lifecyclePragmas,pragmas=config.pragmas,hasConfig=config.has,kwArgs=pragmas
if(onLifecycleName&&(lifecyclePragmas=config["pragmas"+onLifecycleName],lifecycleHas=config["has"+onLifecycleName],lifecyclePragmas&&(pragmas=create(pragmas||{},lifecyclePragmas)),lifecycleHas&&(hasConfig=create(hasConfig||{},lifecycleHas))),hasConfig&&(fileContents=fileContents.replace(pragma.hasRegExp,function(e,t){return hasConfig.hasOwnProperty(t)?!!hasConfig[t]:e})),!config.skipPragmas)for(;-1!==(foundIndex=fileContents.indexOf("//>>",startIndex));)if(lineEndIndex=fileContents.indexOf("\n",foundIndex),-1===lineEndIndex&&(lineEndIndex=fileContents.length-1),startIndex=lineEndIndex+1,conditionLine=fileContents.substring(foundIndex,lineEndIndex+1),matches=conditionLine.match(pragma.conditionalRegExp)){type=matches[1],marker=matches[2],condition=matches[3],isTrue=!1
try{isTrue=!!eval("("+condition+")")}catch(e){throw"Error in file: "+fileName+". Conditional comment: "+conditionLine+" failed with this error: "+e}if(endRegExp=RegExp("\\/\\/\\>\\>\\s*"+type+"End\\(\\s*['\"]"+marker+"['\"]\\s*\\)","g"),endMatches=endRegExp.exec(fileContents.substring(startIndex,fileContents.length)),!endMatches)throw"Error in file: "+fileName+". Cannot find end marker for conditional comment: "+conditionLine
endMarkerIndex=startIndex+endRegExp.lastIndex-endMatches[0].length,lineEndIndex=fileContents.indexOf("\n",endMarkerIndex),-1===lineEndIndex&&(lineEndIndex=fileContents.length-1),shouldInclude="exclude"===type&&!isTrue||"include"===type&&isTrue,startLength=startIndex-foundIndex,fileContents=fileContents.substring(0,foundIndex)+(shouldInclude?fileContents.substring(startIndex,endMarkerIndex):"")+fileContents.substring(lineEndIndex+1,fileContents.length),startIndex=foundIndex}if(config.optimizeAllPluginResources&&pluginCollector)try{if(deps=parse.findDependencies(fileName,fileContents),deps.length)for(i=0;i<deps.length;i++)dep=deps[i],-1!==dep.indexOf("!")&&(moduleName=dep.split("!")[0],collectorMod=pluginCollector[moduleName],collectorMod||(collectorMod=pluginCollector[moduleName]=[]),collectorMod.push(dep))}catch(eDep){logger.error("Parse error looking for plugin resources in "+fileName+", skipping.")}return config.keepAmdefine||(fileContents=fileContents.replace(pragma.amdefineRegExp,"")),"OnSave"===onLifecycleName&&config.namespace&&(fileContents=pragma.namespace(fileContents,config.namespace,onLifecycleName)),pragma.removeStrict(fileContents,config)}}
return pragma}),"browser"===env&&define("browser/optimize",{}),"node"===env&&define("node/optimize",{}),"rhino"===env&&define("rhino/optimize",["logger","env!env/file"],function(e,t){function n(e,t){return r.invoke(null,[e,t])}function i(e,t){var n,i,r=new java.io.File(e)
if(i=r.getAbsoluteFile().getParentFile(),!i.exists()&&!i.mkdirs())throw"Could not create directory: "+i.getAbsolutePath()
return n=t?new java.io.OutputStreamWriter(new java.io.FileOutputStream(r),t):new java.io.OutputStreamWriter(new java.io.FileOutputStream(r)),new java.io.BufferedWriter(n)}Array.prototype.reduce||(Array.prototype.reduce=function(e){var t,n=0,i=this.length
if(arguments.length>=2)t=arguments[1]
else if(i){for(;!(n in this);)n++
t=this[n++]}for(;i>n;n++)n in this&&(t=e.call(void 0,t,this[n],n,this))
return t})
var r,o,a=/"file":"[^"]+"/
try{r=java.lang.Class.forName("com.google.javascript.jscomp.JSSourceFile").getMethod("fromCode",[java.lang.String,java.lang.String])}catch(s){try{r=java.lang.Class.forName("com.google.javascript.jscomp.SourceFile").getMethod("fromCode",[java.lang.String,java.lang.String])}catch(s){try{var u=Java.type("java.lang.String")["class"]
r=Java.type("com.google.javascript.jscomp.SourceFile")["class"].getMethod("fromCode",[u,u])}catch(s){}}}return o={closure:function(r,o,s,u,c){c=c||{}
var l,p,f,h,d,m,g,v,x,y,D,b,E,C,A=Packages.com.google.javascript.jscomp,w=(Packages.com.google.common.flags,n(r+"",o+"")),_=new java.util.ArrayList,F=new java.util.ArrayList,S=Packages.com.google.javascript.jscomp.Compiler,k=Packages.com.google.javascript.jscomp.CommandLineRunner
e.trace("Minifying file: "+r),h=new java.io.File(r).getName(),y=new A.CompilerOptions
for(D in c.CompilerOptions)c.CompilerOptions[D]&&(y[D]=c.CompilerOptions[D])
if(y.prettyPrint=u||y.prettyPrint,b=A.CompilationLevel[c.CompilationLevel||"SIMPLE_OPTIMIZATIONS"],b.setOptionsForCompilationLevel(y),c.generateSourceMaps&&(p=new java.util.ArrayList,p.add(new com.google.javascript.jscomp.SourceMap.LocationMapping(r,h+".src.js")),y.setSourceMapLocationMappings(p),y.setSourceMapOutputPath(r+".map")),F.addAll(k.getDefaultExterns()),c.externExportsPath&&(C=c.externExportsPath,F.add(A.SourceFile.fromFile(C))),S.setLoggingLevel(Packages.java.util.logging.Level[c.loggingLevel||"WARNING"]),E=new S,_.add(w),l=E.compile(F,_,y),l.success)return f=E.toSource()+"",c.generateSourceMaps&&l.sourceMap&&s?(m=new java.io.File(s).getName(),v=s+".src.js",g=s+".map",t.exists(g)?(x=g.replace(/\.map$/,".src.js.map"),t.saveFile(x,t.readFile(g)),t.saveFile(v,o.replace(/\/\# sourceMappingURL=(.+).map/,"/# sourceMappingURL=$1.src.js.map"))):t.saveUtf8File(v,o),d=i(g,"utf-8"),l.sourceMap.appendTo(d,s),d.close(),t.saveFile(g,t.readFile(g).replace(a,'"file":"'+h+'"')),o=f+"\n//# sourceMappingURL="+m+".map"):o=f,o
throw Error("Cannot closure compile file: "+r+". Skipping it.")}}}),"xpconnect"===env&&define("xpconnect/optimize",{}),define("optimize",["lang","logger","env!env/optimize","env!env/file","parse","pragma","uglifyjs","source-map"],function(e,t,n,i,r,o,a,s){" "
function u(e){return e=e.replace(/\s+$/,""),("'"===e.charAt(0)||'"'===e.charAt(0))&&(e=e.substring(1,e.length-1)),e}function c(n,i,r,o){return r.replace(d,function(r,a){var s,c,l,p,f=u(a)
for(f=f.replace(e.backSlashRegExp,"/"),s=f.charAt(0),c=m.test(f),"/"===s||"#"===s||c?c||t.trace(n+"\n  URL not a relative URL, skipping: "+a):a=o+i+f,l=a.split("/"),p=l.length-1;p>0;p--)"."===l[p]?l.splice(p,1):".."===l[p]&&0!==p&&".."!==l[p-1]&&(l.splice(p-1,2),p-=1)
return"url("+l.join("/")+")"})}function l(n,r,o,a,s,p){n=n.replace(e.backSlashRegExp,"/")
var d=n.lastIndexOf("/"),m=-1!==d?n.substring(0,d+1):"",g=[],v=[]
return r=r.replace(h,""),o&&","!==o.charAt(o.length-1)&&(o+=","),r=r.replace(f,function(r,p,f,h,d){if(d&&"all"!==d.replace(/^\s\s*/,"").replace(/\s\s*$/,""))return v.push(n),r
if(f=u(f),o&&-1!==o.indexOf(f+","))return r
f=f.replace(e.backSlashRegExp,"/")
try{var x,y,D,b="/"===f.charAt(0)?f:m+f,E=i.readFile(b)
return s[b]?"":(s[b]=!0,D=l(b,E,o,a,s),E=D.fileContents,D.importList.length&&g.push.apply(g,D.importList),D.skippedList.length&&v.push.apply(v,D.skippedList),x=f.lastIndexOf("/"),y=-1!==x?f.substring(0,x+1):"",y=y.replace(/^\.\//,""),E=c(f,y,E,a),g.push(b),E)}catch(C){return t.warn(n+"\n  Cannot inline css import, skipping: "+f),r}}),a&&p&&(r=c(n,"",r,a)),{importList:g,skippedList:v,fileContents:r}}var p,f=/\@import\s+(url\()?\s*([^);]+)\s*(\))?([\w, ]*)(;)?/gi,h=/\/\*[^\*]*@import[^\*]*\*\//g,d=/\url\(\s*([^\)]+)\s*\)?/g,m=/^\w+:/,g=(s.SourceMapGenerator,s.SourceMapConsumer,"If the source uses ES2015 or later syntax, please pass \"optimize: 'none'\" to r.js and use an ES2015+ compatible minifier after running r.js. The included UglifyJS only understands ES5 or earlier syntax.")
return p={jsFile:function(e,t,n,r,o){t||(t=i.readFile(e)),t=p.js(e,t,n,r,o),i.saveUtf8File(n,t)},js:function(e,i,a,s,u){var c,l,f=(s.optimize+"").split("."),h=f[0],d="keepLines"===f[1],m=""
if(s=s||{},i=o.process(e,i,s,"OnSave",u),h&&"none"!==h){if(c=n[h]||p.optimizers[h],!c)throw Error('optimizer with name of "'+h+'" not found for this environment')
l=s[h]||{},s.generateSourceMaps&&(l.generateSourceMaps=!!s.generateSourceMaps,l._buildSourceMap=s._buildSourceMap)
try{if(s.preserveLicenseComments)try{m=r.getLicenseComments(e,i)}catch(g){throw Error("Cannot parse file: "+e+" for comments. Skipping it. Error is:\n"+g)}s.generateSourceMaps&&m&&(l.preamble=m,m=""),i=m+c(e,i,a,d,l),l._buildSourceMap&&l._buildSourceMap!==s._buildSourceMap&&(s._buildSourceMap=l._buildSourceMap)}catch(g){if(s.throwWhen&&s.throwWhen.optimize)throw g
t.error(g)}}else s._buildSourceMap&&(s._buildSourceMap=null)
return i},cssFile:function(e,n,r){var o,a,s,u,c=i.readFile(e),p=l(e,c,r.cssImportIgnore,r.cssPrefix,{},!0),f=p.skippedList.length?c:p.fileContents
p.skippedList.length&&t.warn("Cannot inline @imports for "+e+",\nthe following files had media queries in them:\n"+p.skippedList.join("\n"))
try{if(-1===r.optimizeCss.indexOf(".keepComments"))for(o=0;-1!==(o=f.indexOf("/*",o));){if(a=f.indexOf("*/",o+2),-1===a)throw"Improper comment in CSS file: "+e
u=f.substring(o,a),!r.preserveLicenseComments||-1===u.indexOf("license")&&-1===u.indexOf("opyright")&&-1===u.indexOf("(c)")?(f=f.substring(0,o)+f.substring(a+2,f.length),o=0):o=a}-1===r.optimizeCss.indexOf(".keepLines")?(f=f.replace(/[\r\n]/g," "),f=f.replace(/\s+/g," "),f=f.replace(/\{\s/g,"{"),f=f.replace(/\s\}/g,"}")):(f=f.replace(/(\r\n)+/g,"\r\n"),f=f.replace(/(\n)+/g,"\n")),-1===r.optimizeCss.indexOf(".keepWhitespace")&&(f=f.replace(/^[ \t]+/gm,""),f=f.replace(/[ \t]+$/gm,""),f=f.replace(/(;|:|\{|}|,)[ \t]+/g,"$1"),f=f.replace(/[ \t]+(\{)/g,"$1"),f=f.replace(/([ \t])+/g,"$1"),f=f.replace(/^[ \t]*[\r\n]/gm,""))}catch(h){f=c,t.error("Could not optimized CSS file: "+e+", error: "+h)}return i.saveUtf8File(n,f),s="\n"+n.replace(r.dir,"")+"\n----------------\n",p.importList.push(e),s+=p.importList.map(function(e){return e.replace(r.dir,"")}).join("\n"),{importList:p.importList,buildText:s+"\n"}},css:function(e,n){var r,o,a,s,u="",c=[],l=n.dir&&n.removeCombined
if(-1!==n.optimizeCss.indexOf("standard")){if(s=i.getFilteredFileList(e,/\.css$/,!0))for(r=0;r<s.length;r++)o=s[r],t.trace("Optimizing ("+n.optimizeCss+") CSS file: "+o),a=p.cssFile(o,o,n),u+=a.buildText,l&&(a.importList.pop(),c=c.concat(a.importList))
l&&c.forEach(function(e){i.exists(e)&&i.deleteFile(e)})}return u},optimizers:{uglify:function(n,r,o,s,u){var c,l,p,f={},h=o+".map",d=n&&n.split("/").pop()
u=u||{},e.mixin(f,u,!0),f.fromString=!0,u.preamble&&(f.output={preamble:u.preamble}),u.generateSourceMaps&&(o||u._buildSourceMap)&&(f.outSourceMap=d+".map",u._buildSourceMap?(l=JSON.parse(u._buildSourceMap),f.inSourceMap=l):i.exists(h)&&(f.inSourceMap=h,l=JSON.parse(i.readFile(h)))),t.trace("Uglify file: "+n)
try{c=a.minify(r,f,d+".src.js"),f.outSourceMap&&c.map?(p=c.map,l||u._buildSourceMap||i.saveFile(o+".src.js",r),r=c.code,u._buildSourceMap?u._buildSourceMap=p:i.saveFile(o+".map",p)):r=c.code}catch(m){var v=""+m,x=/SyntaxError/.test(v)
throw Error("Cannot uglify file: "+n+". Skipping it. Error is:\n"+v+(x?"\n\n"+g:""))}return r}}}}),define("requirePatch",["env!env/file","pragma","parse","lang","logger","commonJs","prim"],function(file,pragma,parse,lang,logger,commonJs,prim){var allowRun=!0,hasProp=lang.hasProp,falseProp=lang.falseProp,getOwn=lang.getOwn,useStrictRegExp=/['"] ['"];/g,absoluteUrlRegExp=/^[\/\\]|^\w:/
return prim.hideResolutionConflict=!0,function(){function normalizeUrlWithBase(e,t,n){return require.jsExtRegExp.test(t)&&!absoluteUrlRegExp.test(n)&&(n=(e.config.dir||e.config.dirBaseUrl)+n),n}if(allowRun){allowRun=!1
var layer,pluginBuilderRegExp=/(["']?)pluginBuilder(["']?)\s*[=\:]\s*["']([^'"\s]+)["']/,oldNewContext=require.s.newContext,oldDef,exports,module
require._cacheReset=function(){require._cachedRawText={},require._cachedFileContents={},require._cachedDefinesRequireUrls={}},require._cacheReset(),require._isSupportedBuildUrl=function(e){return-1===e.indexOf("://")&&-1===e.indexOf("?")&&0!==e.indexOf("empty:")&&0!==e.indexOf("//")?!0:(layer.ignoredUrls[e]||(-1===e.indexOf("empty:")&&logger.info("Cannot optimize network URL, skipping: "+e),layer.ignoredUrls[e]=!0),!1)},require.s.newContext=function(name){var context=oldNewContext(name),oldEnable=context.enable,moduleProto=context.Module.prototype,oldInit=moduleProto.init,oldCallPlugin=moduleProto.callPlugin
return"_"===name&&(context.nextTick=function(e){e()},context.needFullExec={},context.fullExec={},context.plugins={},context.buildShimExports={},context.makeShimExports=function(e){var t
return t=context.config.wrapShim?function(){var t="return "
return e.exports&&-1===e.exports.indexOf(".")&&(t+="root."+e.exports+" = "),e.init&&(t+="("+(""+e.init).replace(useStrictRegExp,"")+".apply(this, arguments))"),e.init&&e.exports&&(t+=" || "),e.exports&&(t+=e.exports),t+=";"}:function(){return"(function (global) {\n    return function () {\n        var ret, fn;\n"+(e.init?"       fn = "+(""+e.init).replace(useStrictRegExp,"")+";\n        ret = fn.apply(global, arguments);\n":"")+(e.exports?"        return ret || global."+e.exports+";\n":"        return ret;\n")+"    };\n}(this))"}},context.enable=function(e,t){var n=e.id,i=t&&t.map.id,r=context.needFullExec,o=context.fullExec,a=getOwn(context.registry,n)
return a&&!a.defined?i&&getOwn(r,i)&&(r[n]=e):(getOwn(r,n)&&falseProp(o,n)||i&&getOwn(r,i)&&falseProp(o,n))&&context.require.undef(n),oldEnable.apply(context,arguments)},context.load=function(moduleName,url){var contents,pluginBuilderMatch,builderName,shim,shimExports
0===url.indexOf("empty:")&&delete context.urlFetched[url],require._isSupportedBuildUrl(url)?(url=normalizeUrlWithBase(context,moduleName,url),layer.buildPathMap[moduleName]=url,layer.buildFileToModule[url]=moduleName,hasProp(context.plugins,moduleName)&&(context.needFullExec[moduleName]=!0),prim().start(function(){return hasProp(require._cachedFileContents,url)&&(falseProp(context.needFullExec,moduleName)||getOwn(context.fullExec,moduleName))?(contents=require._cachedFileContents[url],void(!layer.existingRequireUrl&&require._cachedDefinesRequireUrls[url]&&(layer.existingRequireUrl=url))):require._cacheReadAsync(url).then(function(e){contents=e,!context.config.cjsTranslate||context.config.shim&&lang.hasProp(context.config.shim,moduleName)||(contents=commonJs.convert(url,contents)),context.config.onBuildRead&&(contents=context.config.onBuildRead(moduleName,url,contents)),contents=pragma.process(url,contents,context.config,"OnExecute")
try{!layer.existingRequireUrl&&parse.definesRequire(url,contents)&&(layer.existingRequireUrl=url,require._cachedDefinesRequireUrls[url]=!0)}catch(t){throw Error("Parse error using esprima for file: "+url+"\n"+t)}}).then(function(){return hasProp(context.plugins,moduleName)&&(pluginBuilderMatch=pluginBuilderRegExp.exec(contents))?(builderName=context.makeModuleMap(pluginBuilderMatch[3],context.makeModuleMap(moduleName),null,!0).id,require._cacheReadAsync(context.nameToUrl(builderName))):contents}).then(function(e){contents=e
try{falseProp(context.needFullExec,moduleName)&&(contents=parse(moduleName,url,contents,{insertNeedsDefine:!0,has:context.config.has,findNestedDependencies:context.config.findNestedDependencies}))}catch(t){throw Error("Parse error using esprima for file: "+url+"\n"+t)}require._cachedFileContents[url]=contents})}).then(function(){contents&&eval(contents)
try{getOwn(context.needFullExec,moduleName)&&(shim=getOwn(context.config.shim,moduleName),shim&&shim.exports&&(shimExports=eval(shim.exports),void 0!==shimExports&&(context.buildShimExports[moduleName]=shimExports))),context.completeLoad(moduleName)}catch(e){throw e.moduleTree||(e.moduleTree=[]),e.moduleTree.push(moduleName),e}}).then(null,function(e){throw e.fileName||(e.fileName=url),e}).end()):context.completeLoad(moduleName)},context.execCb=function(e,t,n,i){var r=getOwn(layer.context.buildShimExports,e)
return r?r:t.__requireJsBuild||getOwn(layer.context.needFullExec,e)?t.apply(i,n):void 0},moduleProto.init=function(e){return context.needFullExec[this.map.id]&&lang.each(e,lang.bind(this,function(e){"string"==typeof e&&(e=context.makeModuleMap(e,this.map.isDefine?this.map:this.map.parentMap,!1,!0)),context.fullExec[e.id]||context.require.undef(e.id)})),oldInit.apply(this,arguments)},moduleProto.callPlugin=function(){var e=this.map,t=context.makeModuleMap(e.prefix),n=t.id,i=getOwn(context.registry,n)
return context.plugins[n]=!0,context.needFullExec[n]=e,!falseProp(context.fullExec,n)||i&&!i.defined||context.require.undef(t.id),oldCallPlugin.apply(this,arguments)}),context},delete require.s.contexts._,require._buildReset=function(){var e=require.s.contexts._
return delete require.s.contexts._,require({}),layer=require._layer={buildPathMap:{},buildFileToModule:{},buildFilePaths:[],pathAdded:{},modulesWithNames:{},needsDefine:{},existingRequireUrl:"",ignoredUrls:{},context:require.s.contexts._},e},require._buildReset(),oldDef=define,define=function(e){return"string"==typeof e&&falseProp(layer.needsDefine,e)&&(layer.modulesWithNames[e]=!0),oldDef.apply(require,arguments)},define.amd=oldDef.amd,require._readFile=file.readFile,require._fileExists=function(e){return file.exists(e)},require.onResourceLoad=function(e,t){var n,i=t.id
e.plugins&&lang.hasProp(e.plugins,i)&&lang.eachProp(e.needFullExec,function(t,n){if(t!==!0&&t.prefix===i&&t.unnormalized){var r=e.makeModuleMap(t.originalName,t.parentMap)
e.needFullExec[r.id]=r}}),e.needFullExec&&getOwn(e.needFullExec,i)&&(e.fullExec[i]=t),t.prefix?falseProp(layer.pathAdded,i)&&(layer.buildFilePaths.push(i),layer.buildPathMap[i]=i,layer.buildFileToModule[i]=i,layer.modulesWithNames[i]=!0,layer.pathAdded[i]=!0):t.url&&require._isSupportedBuildUrl(t.url)&&(n=normalizeUrlWithBase(e,i,t.url),!layer.pathAdded[n]&&getOwn(layer.buildPathMap,i)&&(layer.buildFilePaths.push(n),layer.pathAdded[n]=!0))},require.needsDefine=function(e){layer.needsDefine[e]=!0}}}}),define("commonJs",["env!env/file","parse"],function(e,t){" "
var n={useLog:!0,convertDir:function(t,i){var r,o,a,s,u,c=/\.js$/
if(r=e.getFilteredFileList(t,/\w/,!0),t=t.replace(/\\/g,"/"),i=i.replace(/\\/g,"/"),"/"===t.charAt(t.length-1)&&(t=t.substring(0,t.length-1)),"/"===i.charAt(i.length-1)&&(i=i.substring(0,i.length-1)),r&&r.length)for(o=0;o<r.length;o++)a=r[o],s=a.replace(t,i),c.test(a)?(u=e.readFile(a),u=n.convert(a,u),e.saveUtf8File(s,u)):e.copyFile(a,s,!0)
else n.useLog&&("convert"===t?console.log("\n\n"+n.convert(i,e.readFile(i))):console.log("No files to convert in directory: "+t))},convert:function(e,n){try{var i="",r=t.usesCommonJs(e,n)
if(t.usesAmdOrRequireJs(e,n)||!r)return n;(r.dirname||r.filename)&&(i='var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1); '),n="define(function (require, exports, module) {"+i+n+"\n});\n"}catch(o){return console.log("commonJs.convert: COULD NOT CONVERT: "+e+", so skipping it. Error was: "+o),n}return n}}
return n}),define("build",function(require){" "
function copyConfig(e){return lang.deeplikeCopy(e,deepCopyProps)}function makeBuildBaseConfig(){return{appDir:"",pragmas:{},paths:{},optimize:"uglify",optimizeCss:"standard.keepLines.keepWhitespace",inlineText:!0,isBuild:!0,optimizeAllPluginResources:!1,findNestedDependencies:!1,preserveLicenseComments:!0,writeBuildTxt:!0,waitSeconds:30,dirExclusionRegExp:file.dirExclusionRegExp,_buildPathToModuleIndex:{}}}function addSemiColon(e,t){return t.skipSemiColonInsertion||endsWithSemiColonRegExp.test(e)?e:e+";"}function endsWithSlash(e){return"/"!==e.charAt(e.length-1)&&(e+="/"),e}function endsWithNewLine(e){return"\n"!==e.charAt(e.length-1)&&(e+="\n"),e}function makeWriteFile(e,t){function n(e,t){logger.trace("Saving plugin-optimized file: "+e),file.saveUtf8File(e,t)}return n.asModule=function(i,r,o){n(r,build.toTransport(e,i,r,o,t))},n}function appendToFileContents(e,t,n,i,r,o){var a,s,u,c,l,p,f,h
if(o){for(a=i.out?i.baseUrl:r&&r._buildPath?r._buildPath:"",f=n.split("!"),1===f.length?s=build.makeRelativeFilePath(a,n):(c=f.shift(),u=f.join("!"),s=resourceIsModuleIdRegExp.test(u)?build.makeRelativeFilePath(a,require.toUrl(u))+"!"+c:n),l=e.split("\n").length-1,p=t.split("\n").length,h=1;p>=h;h+=1)o.addMapping({generated:{line:l+h,column:0},original:{line:h,column:0},source:s})
o.setSourceContent(s,t)}return e+=t}function stringDotToObj(e,t,n){var i=t.split(".")
i.forEach(function(t,r){r===i.length-1?e[t]=n:(falseProp(e,t)&&(e[t]={}),e=e[t])})}function mixConfig(e,t,n){var i,r,o,a
for(i in t)hasProp(t,i)&&(r=t[i],o=lang.isArray(r),"object"!=typeof r||!r||o||lang.isFunction(r)||lang.isRegExp(r)?o?n||(a=e[i],lang.isArray(a)?e[i]=a.concat(r):e[i]=r):e[i]=r:"map"===i?(e.map||(e.map={}),lang.deepMix(e.map,t.map)):e[i]=lang.mixin({},e[i],r,!0))
lang.hasProp(e,"logLevel")&&logger.logLevel(e.logLevel)}function flattenWrapFile(e,t,n){var i=e.wrap,r=t+"File",o="__"+t+"Map"
if("string"!=typeof i[t]&&i[r])i[t]="","string"==typeof i[r]&&(i[r]=[i[r]]),i[o]=[],i[r].forEach(function(e){var r=build.makeAbsPath(e,n),a=endsWithNewLine(file.readFile(r))
i[o].push(function(e,t,n){return appendToFileContents(e,a,r,t,null,n)}),i[t]+=a})
else if(null===i[t]||void 0===i[t])i[t]=""
else{if("string"!=typeof i[t])throw Error("wrap."+t+" or wrap."+r+" malformed")
i[t]=endsWithNewLine(i[t]),i[o]=[function(e,r,o){var a=build.makeAbsPath("config-wrap-"+t+"-default.js",n)
return appendToFileContents(e,i[t],a,r,null,o)}]}}function normalizeWrapConfig(e,t){try{e.wrap&&(e.wrap===!0?e.wrap={start:"(function () {\n",end:"}());",__startMap:[function(e,n,i){return appendToFileContents(e,"(function () {\n",build.makeAbsPath("config-wrap-start-default.js",t),n,null,i)}],__endMap:[function(e,n,i){return appendToFileContents(e,"}());",build.makeAbsPath("config-wrap-end-default.js",t),n,null,i)}]}:(flattenWrapFile(e,"start",t),flattenWrapFile(e,"end",t)))}catch(n){throw Error("Malformed wrap config: "+n)}}var build,lang=require("lang"),prim=require("prim"),logger=require("logger"),file=require("env!env/file"),parse=require("parse"),optimize=require("optimize"),pragma=require("pragma"),transform=require("transform"),requirePatch=require("requirePatch"),env=require("env"),commonJs=require("commonJs"),SourceMapGenerator=require("source-map").SourceMapGenerator,hasProp=lang.hasProp,getOwn=lang.getOwn,falseProp=lang.falseProp,endsWithSemiColonRegExp=/;\s*$/,endsWithSlashRegExp=/[\/\\]$/,resourceIsModuleIdRegExp=/^[\w\/\\\.]+$/,deepCopyProps={layer:!0}
return prim.nextTick=function(e){e()},require=requirejs,require._cacheReadAsync=function(e,t){var n
return lang.hasProp(require._cachedRawText,e)?(n=prim(),n.resolve(require._cachedRawText[e]),n.promise):file.readFileAsync(e,t).then(function(t){return require._cachedRawText[e]=t,t})},build=function(e){var t,n,i,r,o,a,s,u,c,l=/( {4}at[^\n]+)\n/,p="  "
return prim().start(function(){if(!e||lang.isArray(e)){if(!e||e.length<1)return void logger.error("build.js buildProfile.js\nwhere buildProfile.js is the name of the build file (see example.build.js for hints on how to make a build file).");-1===e[0].indexOf("=")&&(t=e[0],e.splice(0,1)),n=build.convertArrayToObject(e),n.buildFile=t}else n=e
return build._run(n)}).then(null,function(t){var n
if(i=""+t,a=t.moduleTree,o=l.exec(i),o&&(i+=i.substring(0,o.index+o[0].length+1)),a&&a.length>0){for(i+="\nIn module tree:\n",s=a.length-1;s>-1;s--)if(c=a[s]){for(u=a.length-s;u>-1;u--)i+=p
i+=c+"\n"}logger.error(i)}throw r=t.stack,"string"==typeof e&&-1!==e.indexOf("stacktrace=true")?i+="\n"+r:!o&&r&&(o=l.exec(r),o&&(i+="\n"+o[0]||"")),n=Error(i),n.originalError=t,n})},build._run=function(e){var t,n,i,r,o,a,s,u,c,l,p,f,h,d,m,g,v,x,y={},D="",b={}
return prim().start(function(){var n
if(requirePatch(),s=build.createConfig(e),r=s.paths,s.dir&&!s.keepBuildDir&&file.exists(s.dir)&&file.deleteFile(s.dir),!s.out&&!s.cssIn)if(file.copyDir(s.appDir||s.baseUrl,s.dir,/\w/,!0),t={},s.appDir)for(n in r)hasProp(r,n)&&(t[n]=r[n].replace(s.appDir,s.dir))
else for(n in r)hasProp(r,n)&&(0===r[n].indexOf(s.baseUrl)?t[n]=r[n].replace(s.baseUrl,s.dirBaseUrl):(t[n]="empty:"===r[n]?"empty:":n,c=r[n],0!==c.indexOf("/")&&-1===c.indexOf(":")&&(c=s.baseUrl+c),p=s.dirBaseUrl+t[n],"empty:"!==c&&(file.exists(c)&&file.isDirectory(c)?file.copyDir(c,p,/\w/,!0):(c+=".js",p+=".js",file.copyFile(c,p)))))
require({baseUrl:s.baseUrl,paths:r,packagePaths:s.packagePaths,packages:s.packages}),l=require.s.contexts._,u=s.modules,u&&u.forEach(function(e){if(e.name&&(e._sourcePath=l.nameToUrl(e.name),!(file.exists(e._sourcePath)||e.create||-1!==e.name.indexOf("!")||s.rawText&&lang.hasProp(s.rawText,e.name))))throw Error("ERROR: module path does not exist: "+e._sourcePath+" for module named: "+e.name+". Path is relative to: "+file.absPath("."))}),s.out?(require(s),s.cssIn||(s.modules[0]._buildPath="function"==typeof s.out?"FUNCTION":s.out)):s.cssIn||(a={baseUrl:s.dirBaseUrl,paths:t},lang.mixin(a,s),require(a),u&&u.forEach(function(e){if(e.name){if(e._buildPath=l.nameToUrl(e.name,null),e._buildPath===e._sourcePath&&!s.allowSourceOverwrites)throw Error("Module ID '"+e.name+"' has a source path that is same as output path: "+e._sourcePath+". Stopping, config is malformed.")
e.create||s.rawText&&lang.hasProp(s.rawText,e.name)||file.copyFile(e._sourcePath,e._buildPath)}})),s.optimizeCss&&"none"!==s.optimizeCss&&s.dir&&(D+=optimize.css(s.dir,s))}).then(function(){a=copyConfig(require.s.contexts._.config)}).then(function(){var e=[]
return u?(e=u.map(function(e,t){return function(){return s._buildPathToModuleIndex[file.normalize(e._buildPath)]=t,build.traceDependencies(e,s,a).then(function(t){e.layer=t})}}),prim.serial(e)):void 0}).then(function(){var e
return u?(e=u.map(function(e){return function(){return e.exclude?(e.excludeLayers=[],prim.serial(e.exclude.map(function(t,n){return function(){var i=build.findBuildModule(t,u)
return i?void(e.excludeLayers[n]=i):build.traceDependencies({name:t},s,a).then(function(t){e.excludeLayers[n]={layer:t}})}}))):void 0}}),prim.serial(e)):void 0}).then(function(){return u?prim.serial(u.map(function(e){return function(){return e.exclude&&e.exclude.forEach(function(t,n){var i=e.excludeLayers[n].layer,r=i.buildFileToModule
i.buildFilePaths.forEach(function(t){build.removeModulePath(r[t],t,e.layer)})}),e.excludeShallow&&e.excludeShallow.forEach(function(t){var n=getOwn(e.layer.buildPathMap,t)
n&&build.removeModulePath(t,n,e.layer)}),build.flattenModule(e,e.layer,s).then(function(t){var n,i
"FUNCTION"===e._buildPath?(e._buildText=t.text,e._buildSourceMap=t.sourceMap):(n=t.text,t.sourceMap&&(i=e._buildPath.split("/"),i=i.pop(),n+="\n//# sourceMappingURL="+i+".map",file.saveUtf8File(e._buildPath+".map",t.sourceMap)),file.saveUtf8File(e._buildPath+"-temp",n)),D+=t.buildText})}})):void 0}).then(function(){var e,t,r={},a=s.bundlesConfigOutFile
if(u&&(u.forEach(function(e){var t,n=e._buildPath
if("FUNCTION"!==n){if(file.exists(n)&&file.deleteFile(n),file.renameFile(n+"-temp",n),a){t=r[e.name]=[]
var i=file.readFile(n),o={}
o[e.name]=!0
var c=parse.getAllNamedDefines(i,o)
t.push.apply(t,c)}s.removeCombined&&!s.out&&e.layer.buildFilePaths.forEach(function(e){var t=u.some(function(t){return t._buildPath===e}),n=build.makeRelativeFilePath(s.dir,e)
file.exists(e)&&!t&&0!==n.indexOf("..")&&file.deleteFile(e)})}s.onModuleBundleComplete&&s.onModuleBundleComplete(e.onCompleteData)}),a)){var c=file.readFile(a)
c=transform.modifyConfig(c,function(e){return e.bundles||(e.bundles={}),lang.eachProp(r,function(t,n){e.bundles[n]=t}),e}),file.saveUtf8File(a,c)}if(s.removeCombined&&!s.out&&s.dir&&file.deleteEmptyDirs(s.dir),s.out&&!s.cssIn)n=s.modules[0]._buildPath,"FUNCTION"===n?(t=s.modules[0]._buildSourceMap,s._buildSourceMap=t,s.modules[0]._buildText=optimize.js((s.modules[0].name||s.modules[0].include[0]||n)+".build.js",s.modules[0]._buildText,null,s),s._buildSourceMap&&s._buildSourceMap!==t&&(s.modules[0]._buildSourceMap=s._buildSourceMap,s._buildSourceMap=null)):optimize.jsFile(n,null,n,s)
else if(!s.cssIn){i=file.getFilteredFileList(s.dir,/\.js$/,!0),i.forEach(function(t){var n,i,r
e=t.replace(s.dir,""),e=e.substring(0,e.length-3),r=getOwn(s._buildPathToModuleIndex,t),r=0===r||r>0?r:-1,(r>-1||!s.skipDirOptimize||"all"===s.normalizeDirDefines||s.cjsTranslate)&&(x=file.readFile(t),!s.cjsTranslate||s.shim&&lang.hasProp(s.shim,e)||(x=commonJs.convert(t,x)),-1===r&&(s.onBuildRead&&(x=s.onBuildRead(e,t,x)),"all"===s.normalizeDirDefines&&(x=build.toTransport(s.namespace,null,t,x)),s.onBuildWrite&&(x=s.onBuildWrite(e,t,x))),i=r>-1?s.modules[r].override:null,n=i?build.createOverrideConfig(s,i):s,(r>-1||!s.skipDirOptimize)&&optimize.jsFile(t,x,t,n,b))}),d=require.s.contexts._
for(e in b)if(hasProp(b,e))for(h=d.makeModuleMap(e),m=b[e],o=0;o<m.length;o++){if(g=m[o],f=d.makeModuleMap(g,h),falseProp(d.plugins,f.prefix)){if(d.plugins[f.prefix]=!0,!file.exists(require.toUrl(f.prefix+".js")))continue
d.require([f.prefix]),f=d.makeModuleMap(g,h)}falseProp(y,f.id)&&(v=getOwn(d.defined,f.prefix),v&&v.writeFile&&v.writeFile(f.prefix,f.name,require,makeWriteFile(s.namespace),d.config),y[f.id]=!0)}s.writeBuildTxt&&file.saveUtf8File(s.dir+"build.txt",D)}return s.cssIn&&(D+=optimize.cssFile(s.cssIn,s.out,s).buildText),"function"==typeof s.out&&s.out(s.modules[0]._buildText,s.modules[0]._buildSourceMap),D?(logger.info(D),D):""})},build.objProps={paths:!0,wrap:!0,pragmas:!0,pragmasOnSave:!0,has:!0,hasOnSave:!0,uglify:!0,uglify2:!0,closure:!0,map:!0,throwWhen:!0},build.hasDotPropMatch=function(e){var t,n=e.indexOf(".")
return-1!==n?(t=e.substring(0,n),hasProp(build.objProps,t)):!1},build.convertArrayToObject=function(e){var t,n,i,r,o={},a={include:!0,exclude:!0,excludeShallow:!0,insertRequire:!0,stubModules:!0,deps:!0,mainConfigFile:!0,"wrap.startFile":!0,"wrap.endFile":!0}
for(t=0;t<e.length;t++){if(n=e[t].indexOf("="),-1===n)throw"Malformed name/value pair: ["+e[t]+"]. Format should be name=value"
r=e[t].substring(n+1,e[t].length),"true"===r?r=!0:"false"===r&&(r=!1),i=e[t].substring(0,n),getOwn(a,i)&&(r=r.split(",")),build.hasDotPropMatch(i)?stringDotToObj(o,i,r):o[i]=r}return o},build.makeAbsPath=function(e,t){return t?(0!==e.indexOf("/")&&-1===e.indexOf(":")&&(e=t+("/"===t.charAt(t.length-1)?"":"/")+e,e=file.normalize(e)),e.replace(lang.backSlashRegExp,"/")):e},build.makeAbsObject=function(e,t,n){var i,r
if(t)for(i=0;i<e.length;i++)r=e[i],hasProp(t,r)&&"string"==typeof t[r]&&(t[r]=build.makeAbsPath(t[r],n))},build.makeAbsConfig=function(e,t){var n,i,r
for(n=["appDir","dir","baseUrl"],r=0;r<n.length;r++)i=n[r],getOwn(e,i)&&("baseUrl"===i?(e.originalBaseUrl=e.baseUrl,e.appDir?e.baseUrl=build.makeAbsPath(e.originalBaseUrl,e.appDir):e.baseUrl=build.makeAbsPath(e[i],t)):e[i]=build.makeAbsPath(e[i],t),e[i]=endsWithSlash(e[i]))
build.makeAbsObject("stdout"===e.out?["cssIn"]:["out","cssIn"],e,t),build.makeAbsObject(["startFile","endFile"],e.wrap,t),build.makeAbsObject(["externExportsPath"],e.closure,t)},build.makeRelativeFilePath=function(e,t){var n,i,r,o,a,s,u=e.split("/"),c=endsWithSlashRegExp.test(t),l=[]
for(t=file.normalize(t),c&&!endsWithSlashRegExp.test(t)&&(t+="/"),a=t.split("/"),s=a.pop(),u.pop(),o=u.length,n=0;o>n&&u[n]===a[n];n+=1);for(r=a.slice(n),i=o-n,n=0;n>-1&&i>n;n+=1)l.push("..")
return l.join("/")+(l.length?"/":"")+r.join("/")+(r.length?"/":"")+s},build.nestedMix={paths:!0,has:!0,hasOnSave:!0,pragmas:!0,pragmasOnSave:!0},build.createConfig=function(cfg){var buildFileContents,buildFileConfig,mainConfig,mainConfigFile,mainConfigPath,buildFile,absFilePath,config={},buildBaseConfig=makeBuildBaseConfig()
if(absFilePath=file.absPath("."),build.makeAbsConfig(cfg,absFilePath),build.makeAbsConfig(buildBaseConfig,absFilePath),lang.mixin(config,buildBaseConfig),lang.mixin(config,cfg,!0),lang.hasProp(config,"logLevel")&&logger.logLevel(config.logLevel),config.buildFile){if(buildFile=file.absPath(config.buildFile),!file.exists(buildFile))throw Error("ERROR: build file does not exist: "+buildFile)
absFilePath=config.baseUrl=file.absPath(file.parent(buildFile)),buildFileContents=file.readFile(buildFile)
try{buildFileContents=buildFileContents.replace(/\/\/\#[^\n\r]+[\n\r]*$/,"").trim().replace(/;$/,""),buildFileConfig=eval("("+buildFileContents+")"),build.makeAbsConfig(buildFileConfig,absFilePath),mixConfig(config,buildFileConfig)}catch(e){throw Error("Build file "+buildFile+" is malformed: "+e)}}if(mainConfigFile=config.mainConfigFile||buildFileConfig&&buildFileConfig.mainConfigFile,mainConfigFile&&("string"==typeof mainConfigFile&&(mainConfigFile=[mainConfigFile]),mainConfigFile.forEach(function(e){if(e=build.makeAbsPath(e,absFilePath),!file.exists(e))throw Error(e+" does not exist.")
try{mainConfig=parse.findConfig(file.readFile(e)).config}catch(t){throw Error("The config in mainConfigFile "+e+" cannot be used because it cannot be evaluated correctly while running in the optimizer. Try only using a config that is also valid JSON, or do not use mainConfigFile and instead copy the config values needed into a build file or command line arguments given to the optimizer.\nSource error from parsing: "+e+": "+t)}mainConfig&&(mainConfigPath=e.substring(0,e.lastIndexOf("/")),config.appDir&&!mainConfig.appDir&&(mainConfig.appDir=config.appDir),mainConfig.baseUrl||(mainConfig.baseUrl=mainConfigPath),build.makeAbsConfig(mainConfig,mainConfigPath),mixConfig(config,mainConfig))})),buildFileConfig&&mixConfig(config,buildFileConfig,!0),mixConfig(config,cfg,!0),lang.eachProp(config.paths,function(e,t){if(lang.isArray(e))throw Error("paths fallback not supported in optimizer. Please provide a build config path override for "+t)
config.paths[t]=build.makeAbsPath(e,config.baseUrl)}),hasProp(config,"baseUrl")){if(config.appDir){if(!config.originalBaseUrl)throw Error("Please set a baseUrl in the build config")
config.dirBaseUrl=build.makeAbsPath(config.originalBaseUrl,config.dir)}else config.dirBaseUrl=config.dir||config.baseUrl
config.dirBaseUrl=endsWithSlash(config.dirBaseUrl)}if(config.bundlesConfigOutFile){if(!config.dir)throw Error('bundlesConfigOutFile can only be used with optimizations that use "dir".')
config.bundlesConfigOutFile=build.makeAbsPath(config.bundlesConfigOutFile,config.dir)}if(config.out&&"stdout"===config.out&&(config.out=function(e){var t=env.get()
if("rhino"===t){var n=new java.io.PrintStream(java.lang.System.out,!0,"UTF-8")
n.println(e)}else"node"===t?process.stdout.write(e,"utf8"):console.log(e)}),config.main)throw Error('"main" passed as an option, but the supported option is called "name".')
if(config.out&&!config.name&&!config.modules&&!config.include&&!config.cssIn)throw Error('Missing either a "name", "include" or "modules" option')
if(config.cssIn){if(config.dir||config.appDir)throw Error('cssIn is only for the output of single file CSS optimizations and is not compatible with "dir" or "appDir" configuration.')
if(!config.out)throw Error('"out" option missing.')}if(config.cssIn||config.baseUrl||(config.baseUrl="./"),!config.out&&!config.dir)throw Error('Missing either an "out" or "dir" config value. If using "appDir" for a full project optimization, use "dir". If you want to optimize to one file, use "out".')
if(config.appDir&&config.out)throw Error('"appDir" is not compatible with "out". Use "dir" instead. appDir is used to copy whole projects, where "out" with "baseUrl" is used to just optimize to one file.')
if(config.out&&config.dir)throw Error('The "out" and "dir" options are incompatible. Use "out" if you are targeting a single file for optimization, and "dir" if you want the appDir or baseUrl directories optimized.')
if(config.dir&&!config.allowSourceOverwrites&&(config.dir===config.baseUrl||config.dir===config.appDir||config.baseUrl&&0!==build.makeRelativeFilePath(config.dir,config.baseUrl).indexOf("..")||config.appDir&&0!==build.makeRelativeFilePath(config.dir,config.appDir).indexOf("..")))throw Error('"dir" is set to a parent or same directory as "appDir" or "baseUrl". This can result in the deletion of source code. Stopping. If you want to allow possible overwriting of source code, set "allowSourceOverwrites" to true in the build config, but do so at your own risk. In that case, you may want to also set "keepBuildDir" to true.')
if(config.insertRequire&&!lang.isArray(config.insertRequire))throw Error("insertRequire should be a list of module IDs to insert in to a require([]) call.")
if("uglify2"===config.optimize&&(config.optimize="uglify"),config.uglify2&&(config.uglify=config.uglify2,delete config.uglify2),config.generateSourceMaps){if(config.preserveLicenseComments&&"none"!==config.optimize&&"uglify"!==config.optimize)throw Error("Cannot use preserveLicenseComments and generateSourceMaps together, unless optimize is set to 'uglify'. Either explicitly set preserveLicenseComments to false (default is true) or turn off generateSourceMaps. If you want source maps with license comments, see: http://requirejs.org/docs/errors.html#sourcemapcomments")
if("none"!==config.optimize&&"closure"!==config.optimize&&"uglify"!==config.optimize)throw Error('optimize: "'+config.optimize+'" does not support generateSourceMaps.')}if(!config.name&&!config.include||config.modules){if(config.modules&&config.out)throw Error('If the "modules" option is used, then there should be a "dir" option set and "out" should not be used since "out" is only for single file optimization output.')
if(config.modules&&config.name)throw Error('"name" and "modules" options are incompatible. Either use "name" if doing a single file optimization, or "modules" if you want to target more than one file for optimization.')}else config.modules=[{name:config.name,out:config.out,create:config.create,include:config.include,exclude:config.exclude,excludeShallow:config.excludeShallow,insertRequire:config.insertRequire,stubModules:config.stubModules}],delete config.stubModules
if(config.out&&!config.cssIn&&(cfg.optimizeCss||(config.optimizeCss="none")),config.cssPrefix?config.cssPrefix=endsWithSlash(config.cssPrefix):config.cssPrefix="",config.modules&&config.modules.length&&config.modules.forEach(function(e){if(lang.isArray(e)||"string"==typeof e||!e)throw Error("modules config item is malformed: it should be an object with a 'name' property.")
config.stubModules&&(e.stubModules=config.stubModules.concat(e.stubModules||[])),e.stubModules&&(e.stubModules._byName={},e.stubModules.forEach(function(t){e.stubModules._byName[t]=!0})),"string"==typeof e.include&&(e.include=[e.include]),e.override&&normalizeWrapConfig(e.override,absFilePath)}),normalizeWrapConfig(config,absFilePath),config.context)throw Error('The build argument "context" is not supported in a build. It should only be used in web pages.')
return hasProp(config,"normalizeDirDefines")||("none"===config.optimize||config.skipDirOptimize?config.normalizeDirDefines="skip":config.normalizeDirDefines="all"),hasProp(config,"fileExclusionRegExp")?"string"==typeof config.fileExclusionRegExp?file.exclusionRegExp=RegExp(config.fileExclusionRegExp):file.exclusionRegExp=config.fileExclusionRegExp:hasProp(config,"dirExclusionRegExp")&&(file.exclusionRegExp=config.dirExclusionRegExp),config.deps&&(config._depsInclude=config.deps),delete config.deps,delete config.jQuery,delete config.enforceDefine,delete config.urlArgs,config},build.findBuildModule=function(e,t){var n,i
for(n=0;n<t.length;n++)if(i=t[n],i.name===e)return i
return null},build.removeModulePath=function(e,t,n){var i=n.buildFilePaths.indexOf(t);-1!==i&&n.buildFilePaths.splice(i,1)},build.traceDependencies=function(e,t,n){function i(e){var t=!1
if(l[env.get()])try{build.checkForErrors(s,a)}catch(n){t=!0,p.reject(n)}t||p.resolve(e)}var r,o,a,s,u,c,l={rhino:!0,node:!0,xpconnect:!0},p=prim()
return u=require._buildReset(),a=require._layer,s=a.context,n&&require(copyConfig(n)),logger.trace("\nTracing dependencies for: "+(e.name||("function"==typeof e.out?"FUNCTION":e.out))),r=t._depsInclude||[],r=r.concat(e.name&&!e.create?[e.name]:[]),e.include&&(r=r.concat(e.include)),e.override&&(o=n?build.createOverrideConfig(n,e.override):copyConfig(e.override),require(o)),c=require.s.contexts._.config.rawText,c&&lang.eachProp(c,function(e,t){var n=require.toUrl(t)+".js"
require._cachedRawText[n]=e}),p.reject.__requireJsBuild=!0,i.__requireJsBuild=!0,require(r,i,p.reject),l[env.get()]&&build.checkForErrors(s,a),p.promise.then(function(){return e.override&&n&&require(copyConfig(n)),build.checkForErrors(s,a),a})},build.checkForErrors=function(e,t){function n(e,t,n){t&&(n||f.push(e),h[t]?(m=!0,d[t]||(d[t]=[],d[t].push(h[t])),d[t].push(e)):n||(h[t]=e))}var i,r,o,a,s,u,c="",l={},p=[],f=[],h={},d={},m=!1,g=!1,v=e.defined,x=e.registry
for(i in x)hasProp(x,i)&&0!==i.indexOf("_@r")&&(g=!0,o=getOwn(x,i),a=i.split("!"),s=a[0],-1===i.indexOf("_unnormalized")&&o&&o.enabled&&n(i,o.map.url),!hasProp(t.modulesWithNames,i)&&a.length>1&&(falseProp(l,s)&&p.push(s),u=l[s],u||(u=l[s]=[]),u.push(i+(o.error?": "+o.error:""))))
if(g)for(i in v)hasProp(v,i)&&-1===i.indexOf("!")&&n(i,require.toUrl(i)+".js",!0)
if(f.length||p.length){if(p.length&&(c+="Loader plugin"+(1===p.length?"":"s")+" did not call the load callback in the build:\n"+p.map(function(e){var t=l[e]
return e+":\n  "+t.join("\n  ")}).join("\n")+"\n"),c+="Module loading did not complete for: "+f.join(", "),m){c+="\nThe following modules share the same URL. This could be a misconfiguration if that URL only has one anonymous module in it:"
for(r in d)hasProp(d,r)&&(c+="\n"+r+": "+d[r].join(", "))}throw Error(c)}},build.createOverrideConfig=function(e,t){var n=copyConfig(e),i=copyConfig(t)
return lang.eachProp(i,function(i,r){hasProp(build.objProps,r)?(n[r]={},lang.mixin(n[r],e[r],!0),lang.mixin(n[r],t[r],!0)):n[r]=t[r]}),n},build.flattenModule=function(e,t,n){var i,r,o,a=""
return prim().start(function(){var s,u,c,l,p,f,h,d,m,g,v,x,y=t.context,D=[],b={},E={}
return e.override&&(n=build.createOverrideConfig(n,e.override)),g=n.namespace||"",v=g?g+".":"",x=e.stubModules&&e.stubModules._byName||{},e.onCompleteData={name:e.name,path:n.dir?e._buildPath.replace(n.dir,""):e._buildPath,included:[]},a+="\n"+e.onCompleteData.path+"\n----------------\n",t.existingRequireUrl&&(s=t.buildFilePaths.indexOf(t.existingRequireUrl),-1!==s&&(t.buildFilePaths.splice(s,1),t.buildFilePaths.unshift(t.existingRequireUrl))),n.generateSourceMaps&&(o=n.dir||n.baseUrl,c="FUNCTION"===e._buildPath?(e.name||e.include[0]||"FUNCTION")+".build.js":n.out?e._buildPath.split("/").pop():e._buildPath.replace(o,""),r=new SourceMapGenerator({file:c})),lang.eachProp(t.context.config.pkgs,function(e,t){E[e]=t}),i="",n.wrap&&n.wrap.__startMap&&n.wrap.__startMap.forEach(function(e){i=e(i,n,r)}),prim.serial(t.buildFilePaths.map(function(o){return function(){var s=""
return l=t.buildFileToModule[o],f=getOwn(E,l),prim().start(function(){return h=y.makeModuleMap(l),d=h.prefix&&getOwn(y.defined,h.prefix),d?(d.onLayerEnd&&falseProp(b,h.prefix)&&(D.push(d),b[h.prefix]=!0),void(d.write&&(m=function(e){s+="\n"+addSemiColon(e,n),n.onBuildWrite&&(s=n.onBuildWrite(l,o,s))},m.asModule=function(e,i){s+="\n"+addSemiColon(build.toTransport(g,e,o,i,t,{useSourceUrl:t.context.config.useSourceUrl}),n),n.onBuildWrite&&(s=n.onBuildWrite(e,o,s))},d.write(h.prefix,h.name,m)))):prim().start(function(){return hasProp(x,l)?hasProp(t.context.plugins,l)?'define({load: function(id){throw new Error("Dynamic load not allowed: " + id);}});':"define({});":require._cacheReadAsync(o)}).then(function(e){var i
u=e,!n.cjsTranslate||n.shim&&lang.hasProp(n.shim,l)||(u=commonJs.convert(o,u)),n.onBuildRead&&(u=n.onBuildRead(l,o,u)),f&&(i=f===parse.getNamedDefine(u)),g&&(u=pragma.namespace(u,g)),u=build.toTransport(g,l,o,u,t,{useSourceUrl:n.useSourceUrl}),f&&!i&&(u=addSemiColon(u,n)+"\n",u+=v+"define('"+f+"', ['"+l+"'], function (main) { return main; });\n"),n.onBuildWrite&&(u=n.onBuildWrite(l,o,u)),s+=addSemiColon(u,n)})}).then(function(){var u,c=o.replace(n.dir,"")
e.onCompleteData.included.push(c),a+=c+"\n",l&&falseProp(t.modulesWithNames,l)&&!n.skipModuleInsertion&&(p=n.shim&&(getOwn(n.shim,l)||f&&getOwn(n.shim,f)),p?(u=lang.isArray(p)?p:p.deps,n.wrapShim?s="(function(root) {\n"+v+'define("'+l+'", '+(u&&u.length?build.makeJsArrayString(u)+", ":"[], ")+"function() {\n  return (function() {\n"+s+"\n"+(p.exportsFn?p.exportsFn():"")+"\n  }).apply(root, arguments);\n});\n}(this));\n":s+="\n"+v+'define("'+l+'", '+(u&&u.length?build.makeJsArrayString(u)+", ":"")+(p.exportsFn?p.exportsFn():"function(){}")+");\n"):s+="\n"+v+'define("'+l+'", function(){});\n'),s+="\n",i=appendToFileContents(i,s,o,n,e,r)})}})).then(function(){D.length&&D.forEach(function(t,o){var a
"string"==typeof e.out?a=e.out:"string"==typeof e._buildPath&&(a=e._buildPath),t.onLayerEnd(function(t){i=appendToFileContents(i,"\n"+addSemiColon(t,n),"onLayerEnd"+o+".js",n,e,r)},{name:e.name,path:a})}),e.create&&(i=appendToFileContents(i,"\n"+v+'define("'+e.name+'", function(){});\n',"module-create.js",n,e,r)),e.insertRequire&&(i=appendToFileContents(i,"\n"+v+'require(["'+e.insertRequire.join('", "')+'"]);\n',"module-insertRequire.js",n,e,r))})}).then(function(){return n.wrap&&n.wrap.__endMap&&n.wrap.__endMap.forEach(function(e){i=e(i,n,r)}),{text:i,buildText:a,sourceMap:r?JSON.stringify(r.toJSON(),null,"  "):void 0}})},build.makeJsArrayString=function(e){return'["'+e.map(function(e){return lang.jsEscape(e)}).join('","')+'"]'},build.toTransport=function(e,t,n,i,r,o){function a(e){r&&(e.needsId||e.foundId===t)&&(r.modulesWithNames[t]=!0)}var s=r&&r.context.config.baseUrl
return s&&(n=n.replace(s,"")),transform.toTransport(e,t,n,i,a,o)},build})}function setBaseUrl(e){dir=e.replace(/\\/g,"/"),-1!==dir.indexOf("/")&&(dir=dir.split("/"),dir.pop(),dir=dir.join("/"),exec("require({baseUrl: '"+dir.replace(/[\\"']/g,"\\$&")+"'});"))}function createRjsApi(){requirejs.optimize=function(e,t,n){loadedOptimizedLib||(loadLib(),loadedOptimizedLib=!0)
var i=function(i,r,o){function a(e){if(requirejs._buildReset&&(requirejs._buildReset(),requirejs._cacheReset()),e instanceof Error)throw e
return e}e.logLevel=e.hasOwnProperty("logLevel")?e.logLevel:r.SILENT,requirejs._buildReset&&(requirejs._buildReset(),requirejs._cacheReset()),n=n||function(e){console.log(e),o(1)},i(e).then(a,a).then(t,n)}
requirejs({context:"build"},["build","logger","env!env/quit"],i)},requirejs.tools={useLib:function(e,t){t||(t=e,e="uselib"),useLibLoaded[e]||(loadLib(),useLibLoaded[e]=!0)
var n=requirejs({context:e})
n(["build"],function(){t(n)})}},requirejs.define=define}var fileName,env,fs,vm,path,exec,rhinoContext,dir,nodeRequire,nodeDefine,exists,reqMain,loadedOptimizedLib,existsForNode,Cc,Ci,version="2.3.5",jsSuffixRegExp=/\.js$/,commandOption="",useLibLoaded={},rhinoArgs=args,xpconnectArgs=args,readFile=void 0!==readFileFunc?readFileFunc:null
return"undefined"!=typeof process&&process.versions&&process.versions.node?(env="node",fs=require("fs"),vm=require("vm"),path=require("path"),existsForNode=fs.existsSync||path.existsSync,nodeRequire=require,nodeDefine=define,reqMain=require.main,require=void 0,define=void 0,readFile=function(e){return fs.readFileSync(e,"utf8")},exec=function(e,t){return vm.runInThisContext(this.requirejsVars.require.makeNodeWrapper(e),t?fs.realpathSync(t):"")},exists=function(e){return existsForNode(e)},fileName=process.argv[2],fileName&&0===fileName.indexOf("-")&&(commandOption=fileName.substring(1),fileName=process.argv[3])):"undefined"!=typeof Packages?(env="rhino",fileName=args[0],fileName&&0===fileName.indexOf("-")&&(commandOption=fileName.substring(1),fileName=args[1]),"undefined"!=typeof importPackage?(rhinoContext=Packages.org.mozilla.javascript.ContextFactory.getGlobal().enterContext(),exec=function(e,t){return rhinoContext.evaluateString(this,e,t,0,null)}):(exec=function(e,t){load({script:e,name:t})},readFile=readFully),exists=function(e){return new java.io.File(e).exists()},void 0===console&&(console={log:function(){print.apply(void 0,arguments)}})):"undefined"!=typeof navigator&&"undefined"!=typeof document||"undefined"!=typeof importScripts&&"undefined"!=typeof self?(env="browser",readFile=function(e){return fs.readFileSync(e,"utf8")},exec=function(string){return eval(string)},exists=function(){return console.log("x.js exists not applicable in browser env"),!1}):"undefined"!=typeof Components&&Components.classes&&Components.interfaces&&(env="xpconnect",Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),Cc=Components.classes,Ci=Components.interfaces,fileName=args[0],fileName&&0===fileName.indexOf("-")&&(commandOption=fileName.substring(1),fileName=args[1]),xpcUtil={isWindows:"@mozilla.org/windows-registry-key;1"in Cc,cwd:function(){return FileUtils.getFile("CurWorkD",[]).path},normalize:function(e){var t,n,i,r=e.charAt(0)
for("/"!==r&&"\\"!==r&&-1===e.indexOf(":")&&(e=xpcUtil.cwd()+"/"+e),i=e.replace(/\\/g,"/").split("/"),t=0;t<i.length;t+=1)n=i[t],"."===n?(i.splice(t,1),t-=1):".."===n&&(i.splice(t-1,2),t-=2)
return i.join("/")},xpfile:function(e){var t
try{return t=xpcUtil.normalize(e),xpcUtil.isWindows&&(t=t.replace(/\//g,"\\")),new FileUtils.File(t)}catch(n){throw Error((t||e)+" failed: "+n)}},readFile:function(e,t){t=t||"utf-8"
var n,i,r={},o=xpcUtil.xpfile(e)
try{return n=Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream),n.init(o,1,0,!1),i=Cc["@mozilla.org/intl/converter-input-stream;1"].createInstance(Ci.nsIConverterInputStream),i.init(n,t,n.available(),Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),i.readString(n.available(),r),r.value}catch(a){throw Error((o&&o.path||"")+": "+a)}finally{i&&i.close(),n&&n.close()}}},readFile=xpcUtil.readFile,exec=function(string){return eval(string)},exists=function(e){return xpcUtil.xpfile(e).exists()},void 0===console&&(console={log:function(){print.apply(void 0,arguments)}})),function(global,setTimeout){function commentReplace(e,t){return t||""}function isFunction(e){return"[object Function]"===ostring.call(e)}function isArray(e){return"[object Array]"===ostring.call(e)}function each(e,t){if(e){var n
for(n=0;n<e.length&&(!e[n]||!t(e[n],n,e));n+=1);}}function eachReverse(e,t){if(e){var n
for(n=e.length-1;n>-1&&(!e[n]||!t(e[n],n,e));n-=1);}}function hasProp(e,t){return hasOwn.call(e,t)}function getOwn(e,t){return hasProp(e,t)&&e[t]}function eachProp(e,t){var n
for(n in e)if(hasProp(e,n)&&t(e[n],n))break}function mixin(e,t,n,i){return t&&eachProp(t,function(t,r){(n||!hasProp(e,r))&&(!i||"object"!=typeof t||!t||isArray(t)||isFunction(t)||t instanceof RegExp?e[r]=t:(e[r]||(e[r]={}),mixin(e[r],t,n,i)))}),e}function bind(e,t){return function(){return t.apply(e,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(e){throw e}function getGlobal(e){if(!e)return e
var t=global
return each(e.split("."),function(e){t=t[e]}),t}function makeError(e,t,n,i){var r=Error(t+"\nhttp://requirejs.org/docs/errors.html#"+e)
return r.requireType=e,r.requireModules=i,n&&(r.originalError=n),r}function newContext(e){function t(e){var t,n
for(t=0;t<e.length;t++)if(n=e[t],"."===n)e.splice(t,1),t-=1
else if(".."===n){if(0===t||1===t&&".."===e[2]||".."===e[t-1])continue
t>0&&(e.splice(t-1,2),t-=2)}}function n(e,n,i){var r,o,a,s,u,c,l,p,f,h,d,m,g=n&&n.split("/"),v=C.map,x=v&&v["*"]
if(e&&(e=e.split("/"),l=e.length-1,C.nodeIdCompat&&jsSuffixRegExp.test(e[l])&&(e[l]=e[l].replace(jsSuffixRegExp,"")),"."===e[0].charAt(0)&&g&&(m=g.slice(0,g.length-1),e=m.concat(e)),t(e),e=e.join("/")),i&&v&&(g||x)){a=e.split("/")
e:for(s=a.length;s>0;s-=1){if(c=a.slice(0,s).join("/"),g)for(u=g.length;u>0;u-=1)if(o=getOwn(v,g.slice(0,u).join("/")),o&&(o=getOwn(o,c))){p=o,f=s
break e}!h&&x&&getOwn(x,c)&&(h=getOwn(x,c),d=s)}!p&&h&&(p=h,f=d),p&&(a.splice(0,f,p),e=a.join("/"))}return r=getOwn(C.pkgs,e),r?r:e}function i(e){isBrowser&&each(scripts(),function(t){return t.getAttribute("data-requiremodule")===e&&t.getAttribute("data-requirecontext")===D.contextName?(t.parentNode.removeChild(t),!0):void 0})}function r(e){var t=getOwn(C.paths,e)
return t&&isArray(t)&&t.length>1?(t.shift(),D.require.undef(e),D.makeRequire(null,{skipMap:!0})([e]),!0):void 0}function o(e){var t,n=e?e.indexOf("!"):-1
return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function a(e,t,i,r){var a,s,u,c,l=null,p=t?t.name:null,f=e,h=!0,d=""
return e||(h=!1,e="_@r"+(T+=1)),c=o(e),l=c[0],e=c[1],l&&(l=n(l,p,r),s=getOwn(S,l)),e&&(l?d=i?e:s&&s.normalize?s.normalize(e,function(e){return n(e,p,r)}):-1===e.indexOf("!")?n(e,p,r):e:(d=n(e,p,r),c=o(d),l=c[0],d=c[1],i=!0,a=D.nameToUrl(d))),u=!l||s||i?"":"_unnormalized"+(M+=1),{prefix:l,name:d,parentMap:t,unnormalized:!!u,url:a,originalName:f,isDefine:h,id:(l?l+"!"+d:d)+u}}function s(e){var t=e.id,n=getOwn(A,t)
return n||(n=A[t]=new D.Module(e)),n}function u(e,t,n){var i=e.id,r=getOwn(A,i)
!hasProp(S,i)||r&&!r.defineEmitComplete?(r=s(e),r.error&&"error"===t?n(r.error):r.on(t,n)):"defined"===t&&n(S[i])}function c(e,t){var n=e.requireModules,i=!1
t?t(e):(each(n,function(t){var n=getOwn(A,t)
n&&(n.error=e,n.events.error&&(i=!0,n.emit("error",e)))}),i||req.onError(e))}function l(){globalDefQueue.length&&(each(globalDefQueue,function(e){var t=e[0]
"string"==typeof t&&(D.defQueueMap[t]=!0),F.push(e)}),globalDefQueue=[])}function p(e){delete A[e],delete w[e]}function f(e,t,n){var i=e.map.id
e.error?e.emit("error",e.error):(t[i]=!0,each(e.depMaps,function(i,r){var o=i.id,a=getOwn(A,o)
!a||e.depMatched[r]||n[o]||(getOwn(t,o)?(e.defineDep(r,S[o]),e.check()):f(a,t,n))}),n[i]=!0)}function h(){var e,t,n=1e3*C.waitSeconds,o=n&&D.startTime+n<(new Date).getTime(),a=[],s=[],u=!1,l=!0
if(!x){if(x=!0,eachProp(w,function(e){var n=e.map,c=n.id
if(e.enabled&&(n.isDefine||s.push(e),!e.error))if(!e.inited&&o)r(c)?(t=!0,u=!0):(a.push(c),i(c))
else if(!e.inited&&e.fetched&&n.isDefine&&(u=!0,!n.prefix))return l=!1}),o&&a.length)return e=makeError("timeout","Load timeout for modules: "+a,null,a),e.contextName=D.contextName,c(e)
l&&each(s,function(e){f(e,{},{})}),o&&!t||!u||!isBrowser&&!isWebWorker||E||(E=setTimeout(function(){E=0,h()},50)),x=!1}}function d(e){hasProp(S,e[0])||s(a(e[0],null,!0)).init(e[1],e[2])}function m(e,t,n,i){e.detachEvent&&!isOpera?i&&e.detachEvent(i,t):e.removeEventListener(n,t,!1)}function g(e){var t=e.currentTarget||e.srcElement
return m(t,D.onScriptLoad,"load","onreadystatechange"),m(t,D.onScriptError,"error"),{node:t,id:t&&t.getAttribute("data-requiremodule")}}function v(){var e
for(l();F.length;){if(e=F.shift(),null===e[0])return c(makeError("mismatch","Mismatched anonymous define() module: "+e[e.length-1]))
d(e)}D.defQueueMap={}}var x,y,D,b,E,C={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},A={},w={},_={},F=[],S={},k={},B={},T=1,M=1
return b={require:function(e){return e.require?e.require:e.require=D.makeRequire(e.map)},exports:function(e){return e.usingExports=!0,e.map.isDefine?e.exports?S[e.map.id]=e.exports:e.exports=S[e.map.id]={}:void 0},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){return getOwn(C.config,e.map.id)||{}},exports:e.exports||(e.exports={})}}},y=function(e){this.events=getOwn(_,e.id)||{},this.map=e,this.shim=getOwn(C.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},y.prototype={init:function(e,t,n,i){i=i||{},this.inited||(this.factory=t,n?this.on("error",n):this.events.error&&(n=bind(this,function(e){this.emit("error",e)})),this.depMaps=e&&e.slice(0),this.errback=n,this.inited=!0,this.ignore=i.ignore,i.enabled||this.enabled?this.enable():this.check())},defineDep:function(e,t){this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=t)},fetch:function(){if(!this.fetched){this.fetched=!0,D.startTime=(new Date).getTime()
var e=this.map
return this.shim?void D.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return e.prefix?this.callPlugin():this.load()})):e.prefix?this.callPlugin():this.load()}},load:function(){var e=this.map.url
k[e]||(k[e]=!0,D.load(this.map.id,e))},check:function(){if(this.enabled&&!this.enabling){var e,t,n=this.map.id,i=this.depExports,r=this.exports,o=this.factory
if(this.inited){if(this.error)this.emit("error",this.error)
else if(!this.defining){if(this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(o)){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{r=D.execCb(n,o,i,r)}catch(a){e=a}else r=D.execCb(n,o,i,r)
if(this.map.isDefine&&void 0===r&&(t=this.module,t?r=t.exports:this.usingExports&&(r=this.exports)),e)return e.requireMap=this.map,e.requireModules=this.map.isDefine?[this.map.id]:null,e.requireType=this.map.isDefine?"define":"require",c(this.error=e)}else r=o
if(this.exports=r,this.map.isDefine&&!this.ignore&&(S[n]=r,req.onResourceLoad)){var s=[]
each(this.depMaps,function(e){s.push(e.normalizedMap||e)}),req.onResourceLoad(D,this.map,s)}p(n),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else hasProp(D.defQueueMap,n)||this.fetch()}},callPlugin:function(){var e=this.map,t=e.id,i=a(e.prefix)
this.depMaps.push(i),u(i,"defined",bind(this,function(i){var r,o,l,f=getOwn(B,this.map.id),h=this.map.name,d=this.map.parentMap?this.map.parentMap.name:null,m=D.makeRequire(e.parentMap,{enableBuildCallback:!0})
return this.map.unnormalized?(i.normalize&&(h=i.normalize(h,function(e){return n(e,d,!0)})||""),o=a(e.prefix+"!"+h,this.map.parentMap,!0),u(o,"defined",bind(this,function(e){this.map.normalizedMap=o,this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),l=getOwn(A,o.id),void(l&&(this.depMaps.push(o),this.events.error&&l.on("error",bind(this,function(e){this.emit("error",e)})),l.enable()))):f?(this.map.url=D.nameToUrl(f),void this.load()):(r=bind(this,function(e){this.init([],function(){return e},null,{enabled:!0})}),r.error=bind(this,function(e){this.inited=!0,this.error=e,e.requireModules=[t],eachProp(A,function(e){0===e.map.id.indexOf(t+"_unnormalized")&&p(e.map.id)}),c(e)}),r.fromText=bind(this,function(n,i){var o=e.name,u=a(o),l=useInteractive
i&&(n=i),l&&(useInteractive=!1),s(u),hasProp(C.config,t)&&(C.config[o]=C.config[t])
try{req.exec(n)}catch(p){return c(makeError("fromtexteval","fromText eval for "+t+" failed: "+p,p,[t]))}l&&(useInteractive=!0),this.depMaps.push(u),D.completeLoad(o),m([o],r)}),void i.load(e.name,m,r,C))})),D.enable(i,this),this.pluginMaps[i.id]=i},enable:function(){w[this.map.id]=this,this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(e,t){var n,i,r
if("string"==typeof e){if(e=a(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[t]=e,r=getOwn(b,e.id))return void(this.depExports[t]=r(this))
this.depCount+=1,u(e,"defined",bind(this,function(e){this.undefed||(this.defineDep(t,e),this.check())})),this.errback?u(e,"error",bind(this,this.errback)):this.events.error&&u(e,"error",bind(this,function(e){this.emit("error",e)}))}n=e.id,i=A[n],hasProp(b,n)||!i||i.enabled||D.enable(e,this)})),eachProp(this.pluginMaps,bind(this,function(e){var t=getOwn(A,e.id)
t&&!t.enabled&&D.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,t){var n=this.events[e]
n||(n=this.events[e]=[]),n.push(t)},emit:function(e,t){each(this.events[e],function(e){e(t)}),"error"===e&&delete this.events[e]}},D={config:C,contextName:e,registry:A,defined:S,urlFetched:k,defQueue:F,defQueueMap:{},Module:y,makeModuleMap:a,nextTick:req.nextTick,onError:c,configure:function(e){if(e.baseUrl&&"/"!==e.baseUrl.charAt(e.baseUrl.length-1)&&(e.baseUrl+="/"),"string"==typeof e.urlArgs){var t=e.urlArgs
e.urlArgs=function(e,n){return(-1===n.indexOf("?")?"?":"&")+t}}var n=C.shim,i={paths:!0,bundles:!0,config:!0,map:!0}
eachProp(e,function(e,t){i[t]?(C[t]||(C[t]={}),mixin(C[t],e,!0,!0)):C[t]=e}),e.bundles&&eachProp(e.bundles,function(e,t){each(e,function(e){e!==t&&(B[e]=t)})}),e.shim&&(eachProp(e.shim,function(e,t){isArray(e)&&(e={deps:e}),!e.exports&&!e.init||e.exportsFn||(e.exportsFn=D.makeShimExports(e)),n[t]=e}),C.shim=n),e.packages&&each(e.packages,function(e){var t,n
e="string"==typeof e?{name:e}:e,n=e.name,t=e.location,t&&(C.paths[n]=e.location),C.pkgs[n]=e.name+"/"+(e.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}),eachProp(A,function(e,t){e.inited||e.map.unnormalized||(e.map=a(t,null,!0))}),(e.deps||e.callback)&&D.require(e.deps||[],e.callback)},makeShimExports:function(e){function t(){var t
return e.init&&(t=e.init.apply(global,arguments)),t||e.exports&&getGlobal(e.exports)}return t},makeRequire:function(t,r){function o(n,i,u){var l,p,f
return r.enableBuildCallback&&i&&isFunction(i)&&(i.__requireJsBuild=!0),"string"==typeof n?isFunction(i)?c(makeError("requireargs","Invalid require call"),u):t&&hasProp(b,n)?b[n](A[t.id]):req.get?req.get(D,n,t,o):(p=a(n,t,!1,!0),l=p.id,hasProp(S,l)?S[l]:c(makeError("notloaded",'Module name "'+l+'" has not been loaded yet for context: '+e+(t?"":". Use require([])")))):(v(),D.nextTick(function(){v(),f=s(a(null,t)),f.skipMap=r.skipMap,f.init(n,i,u,{enabled:!0}),h()}),o)}return r=r||{},mixin(o,{isBrowser:isBrowser,toUrl:function(e){var i,r=e.lastIndexOf("."),o=e.split("/")[0],a="."===o||".."===o
return-1!==r&&(!a||r>1)&&(i=e.substring(r,e.length),e=e.substring(0,r)),D.nameToUrl(n(e,t&&t.id,!0),i,!0)},defined:function(e){return hasProp(S,a(e,t,!1,!0).id)},specified:function(e){return e=a(e,t,!1,!0).id,hasProp(S,e)||hasProp(A,e)}}),t||(o.undef=function(e){l()
var n=a(e,t,!0),r=getOwn(A,e)
r.undefed=!0,i(e),delete S[e],delete k[n.url],delete _[e],eachReverse(F,function(t,n){t[0]===e&&F.splice(n,1)}),delete D.defQueueMap[e],r&&(r.events.defined&&(_[e]=r.events),p(e))}),o},enable:function(e){var t=getOwn(A,e.id)
t&&s(e).enable()},completeLoad:function(e){var t,n,i,o=getOwn(C.shim,e)||{},a=o.exports
for(l();F.length;){if(n=F.shift(),null===n[0]){if(n[0]=e,t)break
t=!0}else n[0]===e&&(t=!0)
d(n)}if(D.defQueueMap={},i=getOwn(A,e),!t&&!hasProp(S,e)&&i&&!i.inited){if(!(!C.enforceDefine||a&&getGlobal(a)))return r(e)?void 0:c(makeError("nodefine","No define call for "+e,null,[e]))
d([e,o.deps||[],o.exportsFn])}h()},nameToUrl:function(e,t,n){var i,r,o,a,s,u,c,l=getOwn(C.pkgs,e)
if(l&&(e=l),c=getOwn(B,e))return D.nameToUrl(c,t,n)
if(req.jsExtRegExp.test(e))s=e+(t||"")
else{for(i=C.paths,r=e.split("/"),o=r.length;o>0;o-=1)if(a=r.slice(0,o).join("/"),u=getOwn(i,a)){isArray(u)&&(u=u[0]),r.splice(0,o,u)
break}s=r.join("/"),s+=t||(/^data\:|^blob\:|\?/.test(s)||n?"":".js"),s=("/"===s.charAt(0)||s.match(/^[\w\+\.\-]+:/)?"":C.baseUrl)+s}return C.urlArgs&&!/^blob\:/.test(s)?s+C.urlArgs(e,s):s},load:function(e,t){req.load(D,e,t)},execCb:function(e,t,n,i){return t.apply(i,n)},onScriptLoad:function(e){if("load"===e.type||readyRegExp.test((e.currentTarget||e.srcElement).readyState)){interactiveScript=null
var t=g(e)
D.completeLoad(t.id)}},onScriptError:function(e){var t=g(e)
if(!r(t.id)){var n=[]
return eachProp(A,function(e,i){0!==i.indexOf("_@r")&&each(e.depMaps,function(e){return e.id===t.id?(n.push(i),!0):void 0})}),c(makeError("scripterror",'Script error for "'+t.id+(n.length?'", needed by: '+n.join(", "):'"'),e,[t.id]))}}},D.require=D.makeRequire(),D}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(e){return"interactive"===e.readyState?interactiveScript=e:void 0}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.3.5",commentRegExp=/\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,isBrowser=!("undefined"==typeof window||"undefined"==typeof navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&""+opera=="[object Opera]",contexts={},cfg={},globalDefQueue=[],useInteractive=!1
if(void 0===define){if(void 0!==requirejs){if(isFunction(requirejs))return
cfg=requirejs,requirejs=void 0}void 0===require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(e,t,n,i){var r,o,a=defContextName
return isArray(e)||"string"==typeof e||(o=e,isArray(t)?(e=t,t=n,n=i):e=[]),o&&o.context&&(a=o.context),r=getOwn(contexts,a),r||(r=contexts[a]=req.s.newContext(a)),o&&r.configure(o),r.require(e,t,n)},req.config=function(e){return req(e)},req.nextTick=void 0!==setTimeout?function(e){setTimeout(e,4)}:function(e){e()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(e){req[e]=function(){var t=contexts[defContextName]
return t.require[e].apply(t,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=defaultOnError,req.createNode=function(e,t,n){var i=e.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script")
return i.type=e.scriptType||"text/javascript",i.charset="utf-8",i.async=!0,i},req.load=function(e,t,n){var i,r=e&&e.config||{}
if(isBrowser)return i=req.createNode(r,t,n),i.setAttribute("data-requirecontext",e.contextName),i.setAttribute("data-requiremodule",t),!i.attachEvent||i.attachEvent.toString&&(""+i.attachEvent).indexOf("[native code")<0||isOpera?(i.addEventListener("load",e.onScriptLoad,!1),i.addEventListener("error",e.onScriptError,!1)):(useInteractive=!0,i.attachEvent("onreadystatechange",e.onScriptLoad)),i.src=n,r.onNodeCreated&&r.onNodeCreated(i,r,t,n),currentlyAddingScript=i,baseElement?head.insertBefore(i,baseElement):head.appendChild(i),currentlyAddingScript=null,i
if(isWebWorker)try{setTimeout(function(){},0),importScripts(n),e.completeLoad(t)}catch(o){e.onError(makeError("importscripts","importScripts failed for "+t+" at "+n,o,[t]))}},isBrowser&&!cfg.skipDataMain&&eachReverse(scripts(),function(e){return head||(head=e.parentNode),dataMain=e.getAttribute("data-main"),dataMain?(mainScript=dataMain,cfg.baseUrl||-1!==mainScript.indexOf("!")||(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0):void 0}),define=function(e,t,n){var i,r
"string"!=typeof e&&(n=t,t=e,e=null),isArray(t)||(n=t,t=null),!t&&isFunction(n)&&(t=[],n.length&&((""+n).replace(commentRegExp,commentReplace).replace(cjsRequireRegExp,function(e,n){t.push(n)}),t=(1===n.length?["require"]:["require","exports","module"]).concat(t))),useInteractive&&(i=currentlyAddingScript||getInteractiveScript(),i&&(e||(e=i.getAttribute("data-requiremodule")),r=contexts[i.getAttribute("data-requirecontext")])),r?(r.defQueue.push([e,t,n]),r.defQueueMap[e]=!0):globalDefQueue.push([e,t,n])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}}(this,"undefined"==typeof setTimeout?void 0:setTimeout),this.requirejsVars={require:require,requirejs:require,define:define},"browser"===env?!function(){function exec(){eval(arguments[0])}require.load=function(e,t,n){var i=new XMLHttpRequest
i.open("GET",n,!0),i.send(),i.onreadystatechange=function(){4===i.readyState&&(exec(i.responseText),e.completeLoad(t))}}}():"rhino"===env?!function(){" "
require.load=function(e,t,n){load(n),e.completeLoad(t)}}():"node"===env?(this.requirejsVars.nodeRequire=nodeRequire,require.nodeRequire=nodeRequire,function(){function hasProp(e,t){return hasOwn.call(e,t)}function syncTick(e){e()}function makeError(e,t){var n=Error(e)
return n.requireModules=[t],n}var nodeReq=requirejsVars.nodeRequire,req=requirejsVars.require,def=requirejsVars.define,fs=nodeReq("fs"),path=nodeReq("path"),vm=nodeReq("vm"),exists=fs.existsSync||path.existsSync,hasOwn=Object.prototype.hasOwnProperty
req.get=function(e,t,n,i){("require"===t||"exports"===t||"module"===t)&&e.onError(makeError("Explicit require of "+t+" is not allowed.",t))
var r,o,a=e.makeModuleMap(t,n,!1,!0)
if(t=a.id,hasProp(e.defined,t))r=e.defined[t]
else if(void 0===r){o=e.nextTick,e.nextTick=syncTick
try{a.prefix?(i([a.originalName]),a=e.makeModuleMap(a.originalName,n,!1,!0),t=a.id):(req.load(e,t,a.url),e.enable(a,n)),e.require([t]),r=e.defined[t]}finally{e.nextTick=o}}return r},req.nextTick=function(e){process.nextTick(e)},req.makeNodeWrapper=function(e){return"(function (require, requirejs, define) { "+e+"\n}(requirejsVars.require, requirejsVars.requirejs, requirejsVars.define));"},req.load=function(e,t,n){var i,r,o=e.config
if(!o.shim[t]||o.suppress&&o.suppress.nodeShim||console.warn("Shim config not supported in Node, may or may not work. Detected for module: "+t),exists(n)){i=fs.readFileSync(n,"utf8"),i=req.makeNodeWrapper(i)
try{vm.runInThisContext(i,fs.realpathSync(n))}catch(a){return r=Error("Evaluating "+n+' as module "'+t+'" failed with error: '+a),r.originalError=a,r.moduleName=t,r.requireModules=[t],r.fileName=n,e.onError(r)}}else def(t,function(){var i,o=hasProp(e.registry,t)&&e.registry[t].map,a=o&&o.parentMap,s=o&&o.originalName
"."===s.charAt(0)&&a&&(i=a.url.split("/"),i.pop(),s=i.join("/")+"/"+s)
try{return(e.config.nodeRequire||req.nodeRequire)(s)}catch(u){throw r=Error('Tried loading "'+t+'" at '+n+" then tried node's require(\""+s+'") and it failed with error: '+u),r.originalError=u,r.moduleName=s,r.requireModules=[t],r}})
e.completeLoad(t)},req.exec=function(text){return text=req.makeNodeWrapper(text),eval(text)}}()):"xpconnect"===env&&!function(){" "
require.load=function(e,t,n){load(n),e.completeLoad(t)}}(),"o"===commandOption||fileName&&jsSuffixRegExp.test(fileName)||(fileName="main.js"),"node"===env&&reqMain!==module?(setBaseUrl(path.resolve(reqMain?reqMain.filename:".")),createRjsApi(),void(module.exports=requirejs)):"browser"===env?(setBaseUrl(location.href),void createRjsApi()):"rhino"!==env&&"xpconnect"!==env||"undefined"==typeof requirejsAsLib||!requirejsAsLib?void("o"===commandOption?(loadLib(),require({baseUrl:require.s.contexts._.config.baseUrl,context:"build",catchError:{define:!0}},["env!env/args","env!env/quit","logger","build"],function(e,t,n,i){i(e).then(function(){},function(e){n.error(e),t(1)})})):"v"===commandOption?console.log("r.js: "+version+", RequireJS: "+this.requirejsVars.require.version+", UglifyJS: 2.8.29"):"convert"===commandOption?(loadLib(),this.requirejsVars.require(["env!env/args","commonJs","env!env/print"],function(e,t,n){var i,r
return i=e[0],r=e[1],i&&r?void t.convertDir(e[0],e[1]):void n("Usage: path/to/commonjs/modules output/dir")})):("lib"===commandOption&&loadLib(),setBaseUrl(fileName),exists(fileName)?exec(readFile(fileName),fileName):showHelp())):(setBaseUrl(fileName),void createRjsApi())}("undefined"!=typeof console?console:void 0,"undefined"!=typeof Packages||"undefined"==typeof window&&"undefined"!=typeof Components&&Components.interfaces?Array.prototype.slice.call(arguments,0):[],"undefined"!=typeof readFile?readFile:void 0)
