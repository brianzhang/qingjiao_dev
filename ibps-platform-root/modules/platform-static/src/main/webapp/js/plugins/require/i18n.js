/**
 * @license RequireJS i18n 2.0.6 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/i18n for details
 */
!function(){" "
function n(n,e,t,o,i,a){e[n]&&(t.push(n),(e[n]===!0||1===e[n])&&o.push(i+n+"/"+a))}function e(n,e,t,o,i){var a=o+e+"/"+i
require._fileExists(n.toUrl(a+".js"))&&t.push(a)}function t(n,e,o){var i
for(i in e)!e.hasOwnProperty(i)||n.hasOwnProperty(i)&&!o?"object"==typeof e[i]&&(!n[i]&&e[i]&&(n[i]={}),t(n[i],e[i],o)):n[i]=e[i]}var o=/(^.*(^|\/)nls(\/|$))([^\/]*)\/?([^\/]*)/
define(["module"],function(i){var a=i.config?i.config():{}
return{version:"2.0.6",load:function(i,r,l,d){d=d||{},d.locale&&(a.locale=d.locale)
var c,u,f,s=o.exec(i),v=s[1],w=s[4],h=s[5],g=w.split("-"),m=[],p={},E=""
if(s[5]?(v=s[1],c=v+h):(c=i,h=s[4],w=a.locale,w||(w=a.locale="undefined"==typeof navigator?"root":(navigator.languages&&navigator.languages[0]||navigator.language||navigator.userLanguage||"root").toLowerCase()),g=w.split("-")),d.isBuild){for(m.push(c),e(r,"root",m,v,h),u=0;u<g.length;u++)f=g[u],E+=(E?"-":"")+f,e(r,E,m,v,h)
r(m,function(){l()})}else r([c],function(e){var o,i=[]
for(n("root",e,i,m,v,h),u=0;u<g.length;u++)o=g[u],E+=(E?"-":"")+o,n(E,e,i,m,v,h)
r(m,function(){var n,o,a
for(n=i.length-1;n>-1&&i[n];n--)a=i[n],o=e[a],(o===!0||1===o)&&(o=r(v+a+"/"+h)),t(p,o)
l(p)})})}}})}()
