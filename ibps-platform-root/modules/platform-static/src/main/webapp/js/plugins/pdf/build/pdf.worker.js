/* Copyright 2012 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!function(e,t){" "
"function"==typeof define&&define.amd?define("pdfjs-dist/build/pdf.worker",["exports"],t):t("undefined"!=typeof exports?exports:e.pdfjsDistBuildPdfWorker={})}(this,function(e){" "
var t=("undefined"!=typeof document&&document.currentScript?document.currentScript.src:null,{});(function(){!function(e,t){t(e.pdfjsCoreArithmeticDecoder={})}(this,function(e){var t=function(){function e(e,t,i){this.data=e,this.bp=t,this.dataEnd=i,this.chigh=e[t],this.clow=0,this.byteIn(),this.chigh=this.chigh<<7&65535|this.clow>>9&127,this.clow=this.clow<<7&65535,this.ct-=7,this.a=32768}var t=[{qe:22017,nmps:1,nlps:1,switchFlag:1},{qe:13313,nmps:2,nlps:6,switchFlag:0},{qe:6145,nmps:3,nlps:9,switchFlag:0},{qe:2753,nmps:4,nlps:12,switchFlag:0},{qe:1313,nmps:5,nlps:29,switchFlag:0},{qe:545,nmps:38,nlps:33,switchFlag:0},{qe:22017,nmps:7,nlps:6,switchFlag:1},{qe:21505,nmps:8,nlps:14,switchFlag:0},{qe:18433,nmps:9,nlps:14,switchFlag:0},{qe:14337,nmps:10,nlps:14,switchFlag:0},{qe:12289,nmps:11,nlps:17,switchFlag:0},{qe:9217,nmps:12,nlps:18,switchFlag:0},{qe:7169,nmps:13,nlps:20,switchFlag:0},{qe:5633,nmps:29,nlps:21,switchFlag:0},{qe:22017,nmps:15,nlps:14,switchFlag:1},{qe:21505,nmps:16,nlps:14,switchFlag:0},{qe:20737,nmps:17,nlps:15,switchFlag:0},{qe:18433,nmps:18,nlps:16,switchFlag:0},{qe:14337,nmps:19,nlps:17,switchFlag:0},{qe:13313,nmps:20,nlps:18,switchFlag:0},{qe:12289,nmps:21,nlps:19,switchFlag:0},{qe:10241,nmps:22,nlps:19,switchFlag:0},{qe:9217,nmps:23,nlps:20,switchFlag:0},{qe:8705,nmps:24,nlps:21,switchFlag:0},{qe:7169,nmps:25,nlps:22,switchFlag:0},{qe:6145,nmps:26,nlps:23,switchFlag:0},{qe:5633,nmps:27,nlps:24,switchFlag:0},{qe:5121,nmps:28,nlps:25,switchFlag:0},{qe:4609,nmps:29,nlps:26,switchFlag:0},{qe:4353,nmps:30,nlps:27,switchFlag:0},{qe:2753,nmps:31,nlps:28,switchFlag:0},{qe:2497,nmps:32,nlps:29,switchFlag:0},{qe:2209,nmps:33,nlps:30,switchFlag:0},{qe:1313,nmps:34,nlps:31,switchFlag:0},{qe:1089,nmps:35,nlps:32,switchFlag:0},{qe:673,nmps:36,nlps:33,switchFlag:0},{qe:545,nmps:37,nlps:34,switchFlag:0},{qe:321,nmps:38,nlps:35,switchFlag:0},{qe:273,nmps:39,nlps:36,switchFlag:0},{qe:133,nmps:40,nlps:37,switchFlag:0},{qe:73,nmps:41,nlps:38,switchFlag:0},{qe:37,nmps:42,nlps:39,switchFlag:0},{qe:21,nmps:43,nlps:40,switchFlag:0},{qe:9,nmps:44,nlps:41,switchFlag:0},{qe:5,nmps:45,nlps:42,switchFlag:0},{qe:1,nmps:45,nlps:43,switchFlag:0},{qe:22017,nmps:46,nlps:46,switchFlag:0}]
return e.prototype={byteIn:function(){var e=this.data,t=this.bp
if(255===e[t]){var i=e[t+1]
i>143?(this.clow+=65280,this.ct=8):(t++,this.clow+=e[t]<<9,this.ct=7,this.bp=t)}else t++,this.clow+=t<this.dataEnd?e[t]<<8:65280,this.ct=8,this.bp=t
this.clow>65535&&(this.chigh+=this.clow>>16,this.clow&=65535)},readBit:function(e,i){var a,r=e[i]>>1,n=1&e[i],s=t[r],o=s.qe,c=this.a-o
if(this.chigh<o)o>c?(c=o,a=n,r=s.nmps):(c=o,a=1^n,1===s.switchFlag&&(n=a),r=s.nlps)
else{if(this.chigh-=o,0!==(32768&c))return this.a=c,n
o>c?(a=1^n,1===s.switchFlag&&(n=a),r=s.nlps):(a=n,r=s.nmps)}do 0===this.ct&&this.byteIn(),c<<=1,this.chigh=this.chigh<<1&65535|this.clow>>15&1,this.clow=this.clow<<1&65535,this.ct--
while(0===(32768&c))
return this.a=c,e[i]=r<<1|n,a}},e}()
e.ArithmeticDecoder=t}),function(e,t){t(e.pdfjsCoreCharsets={})}(this,function(e){var t=[".notdef","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","endash","dagger","daggerdbl","periodcentered","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","questiondown","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","ring","cedilla","hungarumlaut","ogonek","caron","emdash","AE","ordfeminine","Lslash","Oslash","OE","ordmasculine","ae","dotlessi","lslash","oslash","oe","germandbls","onesuperior","logicalnot","mu","trademark","Eth","onehalf","plusminus","Thorn","onequarter","divide","brokenbar","degree","thorn","threequarters","twosuperior","registered","minus","eth","multiply","threesuperior","copyright","Aacute","Acircumflex","Adieresis","Agrave","Aring","Atilde","Ccedilla","Eacute","Ecircumflex","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Ntilde","Oacute","Ocircumflex","Odieresis","Ograve","Otilde","Scaron","Uacute","Ucircumflex","Udieresis","Ugrave","Yacute","Ydieresis","Zcaron","aacute","acircumflex","adieresis","agrave","aring","atilde","ccedilla","eacute","ecircumflex","edieresis","egrave","iacute","icircumflex","idieresis","igrave","ntilde","oacute","ocircumflex","odieresis","ograve","otilde","scaron","uacute","ucircumflex","udieresis","ugrave","yacute","ydieresis","zcaron"],i=[".notdef","space","exclamsmall","Hungarumlautsmall","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","questionsmall","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","fi","fl","ffi","ffl","parenleftinferior","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","exclamdownsmall","centoldstyle","Lslashsmall","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","Dotaccentsmall","Macronsmall","figuredash","hypheninferior","Ogoneksmall","Ringsmall","Cedillasmall","onequarter","onehalf","threequarters","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall"],a=[".notdef","space","dollaroldstyle","dollarsuperior","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","fi","fl","ffi","ffl","parenleftinferior","parenrightinferior","hyphensuperior","colonmonetary","onefitted","rupiah","centoldstyle","figuredash","hypheninferior","onequarter","onehalf","threequarters","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior"]
e.ISOAdobeCharset=t,e.ExpertCharset=i,e.ExpertSubsetCharset=a}),function(e,t){t(e.pdfjsCoreEncodings={})}(this,function(e){function t(e){switch(e){case"WinAnsiEncoding":return s
case"StandardEncoding":return n
case"MacRomanEncoding":return r
case"SymbolSetEncoding":return o
case"ZapfDingbatsEncoding":return c
case"ExpertEncoding":return i
case"MacExpertEncoding":return a
default:return null}}var i=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclamsmall","Hungarumlautsmall","","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","questionsmall","","asuperior","bsuperior","centsuperior","dsuperior","esuperior","","","isuperior","","","lsuperior","msuperior","nsuperior","osuperior","","","rsuperior","ssuperior","tsuperior","","ff","fi","fl","ffi","ffl","parenleftinferior","","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdownsmall","centoldstyle","Lslashsmall","","","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","","Dotaccentsmall","","","Macronsmall","","","figuredash","hypheninferior","","","Ogoneksmall","Ringsmall","Cedillasmall","","","","onequarter","onehalf","threequarters","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","","","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall"],a=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclamsmall","Hungarumlautsmall","centoldstyle","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","","threequartersemdash","","questionsmall","","","","","Ethsmall","","","onequarter","onehalf","threequarters","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","","","","","","","ff","fi","fl","ffi","ffl","parenleftinferior","","parenrightinferior","Circumflexsmall","hypheninferior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","","","asuperior","centsuperior","","","","","Aacutesmall","Agravesmall","Acircumflexsmall","Adieresissmall","Atildesmall","Aringsmall","Ccedillasmall","Eacutesmall","Egravesmall","Ecircumflexsmall","Edieresissmall","Iacutesmall","Igravesmall","Icircumflexsmall","Idieresissmall","Ntildesmall","Oacutesmall","Ogravesmall","Ocircumflexsmall","Odieresissmall","Otildesmall","Uacutesmall","Ugravesmall","Ucircumflexsmall","Udieresissmall","","eightsuperior","fourinferior","threeinferior","sixinferior","eightinferior","seveninferior","Scaronsmall","","centinferior","twoinferior","","Dieresissmall","","Caronsmall","osuperior","fiveinferior","","commainferior","periodinferior","Yacutesmall","","dollarinferior","","Thornsmall","","nineinferior","zeroinferior","Zcaronsmall","AEsmall","Oslashsmall","questiondownsmall","oneinferior","Lslashsmall","","","","","","","Cedillasmall","","","","","","OEsmall","figuredash","hyphensuperior","","","","","exclamdownsmall","","Ydieresissmall","","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","ninesuperior","zerosuperior","","esuperior","rsuperior","tsuperior","","","isuperior","ssuperior","dsuperior","","","","","","lsuperior","Ogoneksmall","Brevesmall","Macronsmall","bsuperior","nsuperior","msuperior","commasuperior","periodsuperior","Dotaccentsmall","Ringsmall"],r=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","","Adieresis","Aring","Ccedilla","Eacute","Ntilde","Odieresis","Udieresis","aacute","agrave","acircumflex","adieresis","atilde","aring","ccedilla","eacute","egrave","ecircumflex","edieresis","iacute","igrave","icircumflex","idieresis","ntilde","oacute","ograve","ocircumflex","odieresis","otilde","uacute","ugrave","ucircumflex","udieresis","dagger","degree","cent","sterling","section","bullet","paragraph","germandbls","registered","copyright","trademark","acute","dieresis","notequal","AE","Oslash","infinity","plusminus","lessequal","greaterequal","yen","mu","partialdiff","summation","product","pi","integral","ordfeminine","ordmasculine","Omega","ae","oslash","questiondown","exclamdown","logicalnot","radical","florin","approxequal","Delta","guillemotleft","guillemotright","ellipsis","space","Agrave","Atilde","Otilde","OE","oe","endash","emdash","quotedblleft","quotedblright","quoteleft","quoteright","divide","lozenge","ydieresis","Ydieresis","fraction","currency","guilsinglleft","guilsinglright","fi","fl","daggerdbl","periodcentered","quotesinglbase","quotedblbase","perthousand","Acircumflex","Ecircumflex","Aacute","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Oacute","Ocircumflex","apple","Ograve","Uacute","Ucircumflex","Ugrave","dotlessi","circumflex","tilde","macron","breve","dotaccent","ring","cedilla","hungarumlaut","ogonek","caron"],n=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","","endash","dagger","daggerdbl","periodcentered","","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","","questiondown","","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","","ring","cedilla","","hungarumlaut","ogonek","caron","emdash","","","","","","","","","","","","","","","","","AE","","ordfeminine","","","","","Lslash","Oslash","OE","ordmasculine","","","","","","ae","","","","dotlessi","","","lslash","oslash","oe","germandbls"],s=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","bullet","Euro","bullet","quotesinglbase","florin","quotedblbase","ellipsis","dagger","daggerdbl","circumflex","perthousand","Scaron","guilsinglleft","OE","bullet","Zcaron","bullet","bullet","quoteleft","quoteright","quotedblleft","quotedblright","bullet","endash","emdash","tilde","trademark","scaron","guilsinglright","oe","bullet","zcaron","Ydieresis","space","exclamdown","cent","sterling","currency","yen","brokenbar","section","dieresis","copyright","ordfeminine","guillemotleft","logicalnot","hyphen","registered","macron","degree","plusminus","twosuperior","threesuperior","acute","mu","paragraph","periodcentered","cedilla","onesuperior","ordmasculine","guillemotright","onequarter","onehalf","threequarters","questiondown","Agrave","Aacute","Acircumflex","Atilde","Adieresis","Aring","AE","Ccedilla","Egrave","Eacute","Ecircumflex","Edieresis","Igrave","Iacute","Icircumflex","Idieresis","Eth","Ntilde","Ograve","Oacute","Ocircumflex","Otilde","Odieresis","multiply","Oslash","Ugrave","Uacute","Ucircumflex","Udieresis","Yacute","Thorn","germandbls","agrave","aacute","acircumflex","atilde","adieresis","aring","ae","ccedilla","egrave","eacute","ecircumflex","edieresis","igrave","iacute","icircumflex","idieresis","eth","ntilde","ograve","oacute","ocircumflex","otilde","odieresis","divide","oslash","ugrave","uacute","ucircumflex","udieresis","yacute","thorn","ydieresis"],o=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","universal","numbersign","existential","percent","ampersand","suchthat","parenleft","parenright","asteriskmath","plus","comma","minus","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","congruent","Alpha","Beta","Chi","Delta","Epsilon","Phi","Gamma","Eta","Iota","theta1","Kappa","Lambda","Mu","Nu","Omicron","Pi","Theta","Rho","Sigma","Tau","Upsilon","sigma1","Omega","Xi","Psi","Zeta","bracketleft","therefore","bracketright","perpendicular","underscore","radicalex","alpha","beta","chi","delta","epsilon","phi","gamma","eta","iota","phi1","kappa","lambda","mu","nu","omicron","pi","theta","rho","sigma","tau","upsilon","omega1","omega","xi","psi","zeta","braceleft","bar","braceright","similar","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","Euro","Upsilon1","minute","lessequal","fraction","infinity","florin","club","diamond","heart","spade","arrowboth","arrowleft","arrowup","arrowright","arrowdown","degree","plusminus","second","greaterequal","multiply","proportional","partialdiff","bullet","divide","notequal","equivalence","approxequal","ellipsis","arrowvertex","arrowhorizex","carriagereturn","aleph","Ifraktur","Rfraktur","weierstrass","circlemultiply","circleplus","emptyset","intersection","union","propersuperset","reflexsuperset","notsubset","propersubset","reflexsubset","element","notelement","angle","gradient","registerserif","copyrightserif","trademarkserif","product","radical","dotmath","logicalnot","logicaland","logicalor","arrowdblboth","arrowdblleft","arrowdblup","arrowdblright","arrowdbldown","lozenge","angleleft","registersans","copyrightsans","trademarksans","summation","parenlefttp","parenleftex","parenleftbt","bracketlefttp","bracketleftex","bracketleftbt","bracelefttp","braceleftmid","braceleftbt","braceex","","angleright","integral","integraltp","integralex","integralbt","parenrighttp","parenrightex","parenrightbt","bracketrighttp","bracketrightex","bracketrightbt","bracerighttp","bracerightmid","bracerightbt"],c=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","a1","a2","a202","a3","a4","a5","a119","a118","a117","a11","a12","a13","a14","a15","a16","a105","a17","a18","a19","a20","a21","a22","a23","a24","a25","a26","a27","a28","a6","a7","a8","a9","a10","a29","a30","a31","a32","a33","a34","a35","a36","a37","a38","a39","a40","a41","a42","a43","a44","a45","a46","a47","a48","a49","a50","a51","a52","a53","a54","a55","a56","a57","a58","a59","a60","a61","a62","a63","a64","a65","a66","a67","a68","a69","a70","a71","a72","a73","a74","a203","a75","a204","a76","a77","a78","a79","a81","a82","a83","a84","a97","a98","a99","a100","","a89","a90","a93","a94","a91","a92","a205","a85","a206","a86","a87","a88","a95","a96","","","","","","","","","","","","","","","","","","","","a101","a102","a103","a104","a106","a107","a108","a112","a111","a110","a109","a120","a121","a122","a123","a124","a125","a126","a127","a128","a129","a130","a131","a132","a133","a134","a135","a136","a137","a138","a139","a140","a141","a142","a143","a144","a145","a146","a147","a148","a149","a150","a151","a152","a153","a154","a155","a156","a157","a158","a159","a160","a161","a163","a164","a196","a165","a192","a166","a167","a168","a169","a170","a171","a172","a173","a162","a174","a175","a176","a177","a178","a179","a193","a180","a199","a181","a200","a182","","a201","a183","a184","a197","a185","a194","a198","a186","a195","a187","a188","a189","a190","a191"]
e.WinAnsiEncoding=s,e.StandardEncoding=n,e.MacRomanEncoding=r,e.SymbolSetEncoding=o,e.ZapfDingbatsEncoding=c,e.ExpertEncoding=i,e.getEncoding=t}),function(e,t){t(e.pdfjsSharedUtil={})}(this,function(e){function t(e){Q=e}function i(){return Q}function a(e){Q>=J.infos&&console.log("Info: "+e)}function r(e){Q>=J.warnings&&console.log("Warning: "+e)}function n(e){console.log("Deprecated API usage: "+e)}function s(e){throw Q>=J.errors&&(console.log("Error: "+e),console.log(o())),Error(e)}function o(){try{throw Error()}catch(e){return e.stack?e.stack.split("\n").slice(2).join("\n"):""}}function c(e,t){e||s(t)}function l(e,t){try{var i=new URL(e)
if(!i.origin||"null"===i.origin)return!1}catch(a){return!1}var r=new URL(t,i)
return i.origin===r.origin}function h(e){if(!e)return!1
switch(e.protocol){case"http:":case"https:":case"ftp:":case"mailto:":case"tel:":return!0
default:return!1}}function u(e,t){if(!e)return null
try{var i=t?new URL(e,t):new URL(e)
if(h(i))return i}catch(a){}return null}function d(e,t,i){return Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!1}),i}function f(e){var t
return function(){return e&&(t=Object.create(null),e(t),e=null),t}}function g(e){return"string"!=typeof e?(r("The argument for removeNullCharacters must be a string."),e):e.replace(le,"")}function p(e){c(null!==e&&"object"==typeof e&&void 0!==e.length,"Invalid argument for bytesToString")
var t=e.length,i=8192
if(i>t)return String.fromCharCode.apply(null,e)
for(var a=[],r=0;t>r;r+=i){var n=Math.min(r+i,t),s=e.subarray(r,n)
a.push(String.fromCharCode.apply(null,s))}return a.join("")}function m(e){c("string"==typeof e,"Invalid argument for stringToBytes")
for(var t=e.length,i=new Uint8Array(t),a=0;t>a;++a)i[a]=255&e.charCodeAt(a)
return i}function v(e){return void 0!==e.length?e.length:(c(void 0!==e.byteLength),e.byteLength)}function b(e){if(1===e.length&&e[0]instanceof Uint8Array)return e[0]
var t,i,a,r=0,n=e.length
for(t=0;n>t;t++)i=e[t],a=v(i),r+=a
var s=0,o=new Uint8Array(r)
for(t=0;n>t;t++)i=e[t],i instanceof Uint8Array||(i="string"==typeof i?m(i):new Uint8Array(i)),a=i.byteLength,o.set(i,s),s+=a
return o}function y(e){return String.fromCharCode(e>>24&255,e>>16&255,e>>8&255,255&e)}function w(e){for(var t=1,i=0;e>t;)t<<=1,i++
return i}function k(e,t){return e[t]<<24>>24}function C(e,t){return e[t]<<8|e[t+1]}function x(e,t){return(e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3])>>>0}function S(){var e=new Uint8Array(2)
e[0]=1
var t=new Uint16Array(e.buffer)
return 1===t[0]}function A(){try{return Function(""),!0}catch(e){return!1}}function I(e){var t,i=e.length,a=[]
if("þ"===e[0]&&"ÿ"===e[1])for(t=2;i>t;t+=2)a.push(String.fromCharCode(e.charCodeAt(t)<<8|e.charCodeAt(t+1)))
else for(t=0;i>t;++t){var r=ge[e.charCodeAt(t)]
a.push(r?String.fromCharCode(r):e.charAt(t))}return a.join("")}function P(e){return decodeURIComponent(escape(e))}function B(e){return unescape(encodeURIComponent(e))}function T(e){for(var t in e)return!1
return!0}function L(e){return"boolean"==typeof e}function E(e){return"number"==typeof e&&(0|e)===e}function R(e){return"number"==typeof e}function O(e){return"string"==typeof e}function M(e){return e instanceof Array}function D(e){return"object"==typeof e&&null!==e&&void 0!==e.byteLength}function F(e){return 32===e||9===e||13===e||10===e}function N(){var e={}
return e.promise=new Promise(function(t,i){e.resolve=t,e.reject=i}),e}function j(e,t,i){this.sourceName=e,this.targetName=t,this.comObj=i,this.callbackIndex=1,this.postMessageTransfers=!0
var a=this.callbacksCapabilities=Object.create(null),r=this.actionHandler=Object.create(null)
this._onComObjOnMessage=function(e){var t=e.data
if(t.targetName===this.sourceName)if(t.isReply){var n=t.callbackId
if(t.callbackId in a){var o=a[n]
delete a[n],"error"in t?o.reject(t.error):o.resolve(t.data)}else s("Cannot resolve callback "+n)}else if(t.action in r){var c=r[t.action]
if(t.callbackId){var l=this.sourceName,h=t.sourceName
Promise.resolve().then(function(){return c[0].call(c[1],t.data)}).then(function(e){i.postMessage({sourceName:l,targetName:h,isReply:!0,callbackId:t.callbackId,data:e})},function(e){e instanceof Error&&(e+=""),i.postMessage({sourceName:l,targetName:h,isReply:!0,callbackId:t.callbackId,error:e})})}else c[0].call(c[1],t.data)}else s("Unknown action from worker: "+t.action)}.bind(this),i.addEventListener("message",this._onComObjOnMessage)}function U(e,t,i){var a=new Image
a.onload=function(){i.resolve(e,a)},a.onerror=function(){i.resolve(e,null),r("Error during JPEG image loading")},a.src=t}var _="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,q=[.001,0,0,.001,0,0],H={FILL:0,STROKE:1,FILL_STROKE:2,INVISIBLE:3,FILL_ADD_TO_PATH:4,STROKE_ADD_TO_PATH:5,FILL_STROKE_ADD_TO_PATH:6,ADD_TO_PATH:7,FILL_STROKE_MASK:3,ADD_TO_PATH_FLAG:4},z={GRAYSCALE_1BPP:1,RGB_24BPP:2,RGBA_32BPP:3},V={TEXT:1,LINK:2,FREETEXT:3,LINE:4,SQUARE:5,CIRCLE:6,POLYGON:7,POLYLINE:8,HIGHLIGHT:9,UNDERLINE:10,SQUIGGLY:11,STRIKEOUT:12,STAMP:13,CARET:14,INK:15,POPUP:16,FILEATTACHMENT:17,SOUND:18,MOVIE:19,WIDGET:20,SCREEN:21,PRINTERMARK:22,TRAPNET:23,WATERMARK:24,THREED:25,REDACT:26},G={INVISIBLE:1,HIDDEN:2,PRINT:4,NOZOOM:8,NOROTATE:16,NOVIEW:32,READONLY:64,LOCKED:128,TOGGLENOVIEW:256,LOCKEDCONTENTS:512},W={READONLY:1,REQUIRED:2,NOEXPORT:4,MULTILINE:4096,PASSWORD:8192,NOTOGGLETOOFF:16384,RADIO:32768,PUSHBUTTON:65536,COMBO:131072,EDIT:262144,SORT:524288,FILESELECT:1048576,MULTISELECT:2097152,DONOTSPELLCHECK:4194304,DONOTSCROLL:8388608,COMB:16777216,RICHTEXT:33554432,RADIOSINUNISON:33554432,COMMITONSELCHANGE:67108864},X={SOLID:1,DASHED:2,BEVELED:3,INSET:4,UNDERLINE:5},K={UNKNOWN:0,FLATE:1,LZW:2,DCT:3,JPX:4,JBIG:5,A85:6,AHX:7,CCF:8,RL:9},Y={UNKNOWN:0,TYPE1:1,TYPE1C:2,CIDFONTTYPE0:3,CIDFONTTYPE0C:4,TRUETYPE:5,CIDFONTTYPE2:6,TYPE3:7,OPENTYPE:8,TYPE0:9,MMTYPE1:10},J={errors:0,warnings:1,infos:5},Z={dependency:1,setLineWidth:2,setLineCap:3,setLineJoin:4,setMiterLimit:5,setDash:6,setRenderingIntent:7,setFlatness:8,setGState:9,save:10,restore:11,transform:12,moveTo:13,lineTo:14,curveTo:15,curveTo2:16,curveTo3:17,closePath:18,rectangle:19,stroke:20,closeStroke:21,fill:22,eoFill:23,fillStroke:24,eoFillStroke:25,closeFillStroke:26,closeEOFillStroke:27,endPath:28,clip:29,eoClip:30,beginText:31,endText:32,setCharSpacing:33,setWordSpacing:34,setHScale:35,setLeading:36,setFont:37,setTextRenderingMode:38,setTextRise:39,moveText:40,setLeadingMoveText:41,setTextMatrix:42,nextLine:43,showText:44,showSpacedText:45,nextLineShowText:46,nextLineSetSpacingShowText:47,setCharWidth:48,setCharWidthAndBounds:49,setStrokeColorSpace:50,setFillColorSpace:51,setStrokeColor:52,setStrokeColorN:53,setFillColor:54,setFillColorN:55,setStrokeGray:56,setFillGray:57,setStrokeRGBColor:58,setFillRGBColor:59,setStrokeCMYKColor:60,setFillCMYKColor:61,shadingFill:62,beginInlineImage:63,beginImageData:64,endInlineImage:65,paintXObject:66,markPoint:67,markPointProps:68,beginMarkedContent:69,beginMarkedContentProps:70,endMarkedContent:71,beginCompat:72,endCompat:73,paintFormXObjectBegin:74,paintFormXObjectEnd:75,beginGroup:76,endGroup:77,beginAnnotations:78,endAnnotations:79,beginAnnotation:80,endAnnotation:81,paintJpegXObject:82,paintImageMaskXObject:83,paintImageMaskXObjectGroup:84,paintImageXObject:85,paintInlineImageXObject:86,paintInlineImageXObjectGroup:87,paintImageXObjectRepeat:88,paintImageMaskXObjectRepeat:89,paintSolidColorImageMask:90,constructPath:91},Q=J.warnings,$={unknown:"unknown",forms:"forms",javaScript:"javaScript",smask:"smask",shadingPattern:"shadingPattern",font:"font"},ee={NEED_PASSWORD:1,INCORRECT_PASSWORD:2},te=function(){function e(e,t){this.name="PasswordException",this.message=e,this.code=t}return e.prototype=Error(),e.constructor=e,e}(),ie=function(){function e(e,t){this.name="UnknownErrorException",this.message=e,this.details=t}return e.prototype=Error(),e.constructor=e,e}(),ae=function(){function e(e){this.name="InvalidPDFException",this.message=e}return e.prototype=Error(),e.constructor=e,e}(),re=function(){function e(e){this.name="MissingPDFException",this.message=e}return e.prototype=Error(),e.constructor=e,e}(),ne=function(){function e(e,t){this.name="UnexpectedResponseException",this.message=e,this.status=t}return e.prototype=Error(),e.constructor=e,e}(),se=function(){function e(e){this.message=e}return e.prototype=Error(),e.prototype.name="NotImplementedException",e.constructor=e,e}(),oe=function(){function e(e,t){this.begin=e,this.end=t,this.message="Missing data ["+e+", "+t+")"}return e.prototype=Error(),e.prototype.name="MissingDataException",e.constructor=e,e}(),ce=function(){function e(e){this.message=e}return e.prototype=Error(),e.prototype.name="XRefParseException",e.constructor=e,e}(),le=/\x00/g,he=function(){function e(e,t){this.buffer=e,this.byteLength=e.length,this.length=void 0===t?this.byteLength>>2:t,i(this.length)}function t(e){return{get:function(){var t=this.buffer,i=e<<2
return(t[i]|t[i+1]<<8|t[i+2]<<16|t[i+3]<<24)>>>0},set:function(t){var i=this.buffer,a=e<<2
i[a]=255&t,i[a+1]=t>>8&255,i[a+2]=t>>16&255,i[a+3]=t>>>24&255}}}function i(i){for(;i>a;)Object.defineProperty(e.prototype,a,t(a)),a++}e.prototype=Object.create(null)
var a=0
return e}()
e.Uint32ArrayView=he
var ue=[1,0,0,1,0,0],de=function(){function e(){}var t=["rgb(",0,",",0,",",0,")"]
e.makeCssRgb=function(e,i,a){return t[1]=e,t[3]=i,t[5]=a,t.join("")},e.transform=function(e,t){return[e[0]*t[0]+e[2]*t[1],e[1]*t[0]+e[3]*t[1],e[0]*t[2]+e[2]*t[3],e[1]*t[2]+e[3]*t[3],e[0]*t[4]+e[2]*t[5]+e[4],e[1]*t[4]+e[3]*t[5]+e[5]]},e.applyTransform=function(e,t){var i=e[0]*t[0]+e[1]*t[2]+t[4],a=e[0]*t[1]+e[1]*t[3]+t[5]
return[i,a]},e.applyInverseTransform=function(e,t){var i=t[0]*t[3]-t[1]*t[2],a=(e[0]*t[3]-e[1]*t[2]+t[2]*t[5]-t[4]*t[3])/i,r=(-e[0]*t[1]+e[1]*t[0]+t[4]*t[1]-t[5]*t[0])/i
return[a,r]},e.getAxialAlignedBoundingBox=function(t,i){var a=e.applyTransform(t,i),r=e.applyTransform(t.slice(2,4),i),n=e.applyTransform([t[0],t[3]],i),s=e.applyTransform([t[2],t[1]],i)
return[Math.min(a[0],r[0],n[0],s[0]),Math.min(a[1],r[1],n[1],s[1]),Math.max(a[0],r[0],n[0],s[0]),Math.max(a[1],r[1],n[1],s[1])]},e.inverseTransform=function(e){var t=e[0]*e[3]-e[1]*e[2]
return[e[3]/t,-e[1]/t,-e[2]/t,e[0]/t,(e[2]*e[5]-e[4]*e[3])/t,(e[4]*e[1]-e[5]*e[0])/t]},e.apply3dTransform=function(e,t){return[e[0]*t[0]+e[1]*t[1]+e[2]*t[2],e[3]*t[0]+e[4]*t[1]+e[5]*t[2],e[6]*t[0]+e[7]*t[1]+e[8]*t[2]]},e.singularValueDecompose2dScale=function(e){var t=[e[0],e[2],e[1],e[3]],i=e[0]*t[0]+e[1]*t[2],a=e[0]*t[1]+e[1]*t[3],r=e[2]*t[0]+e[3]*t[2],n=e[2]*t[1]+e[3]*t[3],s=(i+n)/2,o=Math.sqrt((i+n)*(i+n)-4*(i*n-r*a))/2,c=s+o||1,l=s-o||1
return[Math.sqrt(c),Math.sqrt(l)]},e.normalizeRect=function(e){var t=e.slice(0)
return e[0]>e[2]&&(t[0]=e[2],t[2]=e[0]),e[1]>e[3]&&(t[1]=e[3],t[3]=e[1]),t},e.intersect=function(t,i){function a(e,t){return e-t}var r=[t[0],t[2],i[0],i[2]].sort(a),n=[t[1],t[3],i[1],i[3]].sort(a),s=[]
return t=e.normalizeRect(t),i=e.normalizeRect(i),r[0]===t[0]&&r[1]===i[0]||r[0]===i[0]&&r[1]===t[0]?(s[0]=r[1],s[2]=r[2],n[0]===t[1]&&n[1]===i[1]||n[0]===i[1]&&n[1]===t[1]?(s[1]=n[1],s[3]=n[2],s):!1):!1},e.sign=function(e){return 0>e?-1:1}
var i=["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM","","X","XX","XXX","XL","L","LX","LXX","LXXX","XC","","I","II","III","IV","V","VI","VII","VIII","IX"]
return e.toRoman=function(e,t){c(E(e)&&e>0,"The number should be a positive integer.")
for(var a,r=[];e>=1e3;)e-=1e3,r.push("M")
a=e/100|0,e%=100,r.push(i[a]),a=e/10|0,e%=10,r.push(i[10+a]),r.push(i[20+e])
var n=r.join("")
return t?n.toLowerCase():n},e.appendToArray=function(e,t){Array.prototype.push.apply(e,t)},e.prependToArray=function(e,t){Array.prototype.unshift.apply(e,t)},e.extendObj=function(e,t){for(var i in t)e[i]=t[i]},e.getInheritableProperty=function(e,t,i){for(;e&&!e.has(t);)e=e.get("Parent")
return e?i?e.getArray(t):e.get(t):null},e.inherit=function(e,t,i){e.prototype=Object.create(t.prototype),e.prototype.constructor=e
for(var a in i)e.prototype[a]=i[a]},e.loadScript=function(e,t){var i=document.createElement("script"),a=!1
i.setAttribute("src",e),t&&(i.onload=function(){a||t(),a=!0}),document.getElementsByTagName("head")[0].appendChild(i)},e}(),fe=function(){function e(e,t,i,a,r,n){this.viewBox=e,this.scale=t,this.rotation=i,this.offsetX=a,this.offsetY=r
var s,o,c,l,h=(e[2]+e[0])/2,u=(e[3]+e[1])/2
switch(i%=360,i=0>i?i+360:i){case 180:s=-1,o=0,c=0,l=1
break
case 90:s=0,o=1,c=1,l=0
break
case 270:s=0,o=-1,c=-1,l=0
break
default:s=1,o=0,c=0,l=-1}n&&(c=-c,l=-l)
var d,f,g,p
0===s?(d=Math.abs(u-e[1])*t+a,f=Math.abs(h-e[0])*t+r,g=Math.abs(e[3]-e[1])*t,p=Math.abs(e[2]-e[0])*t):(d=Math.abs(h-e[0])*t+a,f=Math.abs(u-e[1])*t+r,g=Math.abs(e[2]-e[0])*t,p=Math.abs(e[3]-e[1])*t),this.transform=[s*t,o*t,c*t,l*t,d-s*t*h-c*t*u,f-o*t*h-l*t*u],this.width=g,this.height=p,this.fontScale=t}return e.prototype={clone:function(t){t=t||{}
var i="scale"in t?t.scale:this.scale,a="rotation"in t?t.rotation:this.rotation
return new e(this.viewBox.slice(),i,a,this.offsetX,this.offsetY,t.dontFlip)},convertToViewportPoint:function(e,t){return de.applyTransform([e,t],this.transform)},convertToViewportRectangle:function(e){var t=de.applyTransform([e[0],e[1]],this.transform),i=de.applyTransform([e[2],e[3]],this.transform)
return[t[0],t[1],i[0],i[1]]},convertToPdfPoint:function(e,t){return de.applyInverseTransform([e,t],this.transform)}},e}(),ge=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,728,711,710,729,733,731,730,732,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8226,8224,8225,8230,8212,8211,402,8260,8249,8250,8722,8240,8222,8220,8221,8216,8217,8218,8482,64257,64258,321,338,352,376,381,305,322,339,353,382,0,8364]
!function(){if(_.Promise)return"function"!=typeof _.Promise.all&&(_.Promise.all=function(e){var t,i,a=0,r=[],n=new _.Promise(function(e,a){t=e,i=a})
return e.forEach(function(e,n){a++,e.then(function(e){r[n]=e,a--,0===a&&t(r)},i)}),0===a&&t(r),n}),"function"!=typeof _.Promise.resolve&&(_.Promise.resolve=function(e){return new _.Promise(function(t){t(e)})}),"function"!=typeof _.Promise.reject&&(_.Promise.reject=function(e){return new _.Promise(function(t,i){i(e)})}),void("function"!=typeof _.Promise.prototype["catch"]&&(_.Promise.prototype["catch"]=function(e){return _.Promise.prototype.then(void 0,e)}))
var e=0,t=1,i=2,a=500,n={handlers:[],running:!1,unhandledRejections:[],pendingRejectionCheck:!1,scheduleHandlers:function(t){t._status!==e&&(this.handlers=this.handlers.concat(t._handlers),t._handlers=[],this.running||(this.running=!0,setTimeout(this.runHandlers.bind(this),0)))},runHandlers:function(){for(var e=1,a=Date.now()+e;this.handlers.length>0;){var r=this.handlers.shift(),n=r.thisPromise._status,s=r.thisPromise._value
try{n===t?"function"==typeof r.onResolve&&(s=r.onResolve(s)):"function"==typeof r.onReject&&(s=r.onReject(s),n=t,r.thisPromise._unhandledRejection&&this.removeUnhandeledRejection(r.thisPromise))}catch(o){n=i,s=o}if(r.nextPromise._updateStatus(n,s),Date.now()>=a)break}return this.handlers.length>0?void setTimeout(this.runHandlers.bind(this),0):void(this.running=!1)},addUnhandledRejection:function(e){this.unhandledRejections.push({promise:e,time:Date.now()}),this.scheduleRejectionCheck()},removeUnhandeledRejection:function(e){e._unhandledRejection=!1
for(var t=0;t<this.unhandledRejections.length;t++)this.unhandledRejections[t].promise===e&&(this.unhandledRejections.splice(t),t--)},scheduleRejectionCheck:function(){this.pendingRejectionCheck||(this.pendingRejectionCheck=!0,setTimeout(function(){this.pendingRejectionCheck=!1
for(var e=Date.now(),t=0;t<this.unhandledRejections.length;t++)if(e-this.unhandledRejections[t].time>a){var i=this.unhandledRejections[t].promise._value,n="Unhandled rejection: "+i
i.stack&&(n+="\n"+i.stack),r(n),this.unhandledRejections.splice(t),t--}this.unhandledRejections.length&&this.scheduleRejectionCheck()}.bind(this),a))}},s=function(t){this._status=e,this._handlers=[]
try{t.call(this,this._resolve.bind(this),this._reject.bind(this))}catch(i){this._reject(i)}}
s.all=function(e){function t(e){n._status!==i&&(c=[],r(e))}var a,r,n=new s(function(e,t){a=e,r=t}),o=e.length,c=[]
if(0===o)return a(c),n
for(var l=0,h=e.length;h>l;++l){var u=e[l],d=function(e){return function(t){n._status!==i&&(c[e]=t,o--,0===o&&a(c))}}(l)
s.isPromise(u)?u.then(d,t):d(u)}return n},s.isPromise=function(e){return e&&"function"==typeof e.then},s.resolve=function(e){return new s(function(t){t(e)})},s.reject=function(e){return new s(function(t,i){i(e)})},s.prototype={_status:null,_value:null,_handlers:null,_unhandledRejection:null,_updateStatus:function(e,a){if(this._status!==t&&this._status!==i){if(e===t&&s.isPromise(a))return void a.then(this._updateStatus.bind(this,t),this._updateStatus.bind(this,i))
this._status=e,this._value=a,e===i&&0===this._handlers.length&&(this._unhandledRejection=!0,n.addUnhandledRejection(this)),n.scheduleHandlers(this)}},_resolve:function(e){this._updateStatus(t,e)},_reject:function(e){this._updateStatus(i,e)},then:function(e,t){var i=new s(function(e,t){this.resolve=e,this.reject=t})
return this._handlers.push({thisPromise:this,onResolve:e,onReject:t,nextPromise:i}),n.scheduleHandlers(this),i},"catch":function(e){return this.then(void 0,e)}},_.Promise=s}(),function(){function e(){this.id="$weakmap"+t++}if(!_.WeakMap){var t=0
e.prototype={has:function(e){return!!Object.getOwnPropertyDescriptor(e,this.id)},get:function(e,t){return this.has(e)?e[this.id]:t},set:function(e,t){Object.defineProperty(e,this.id,{value:t,enumerable:!1,configurable:!0})},"delete":function(e){delete e[this.id]}},_.WeakMap=e}}()
var pe=function(){function e(e,t,i){for(;e.length<i;)e+=t
return e}function t(){this.started=Object.create(null),this.times=[],this.enabled=!0}return t.prototype={time:function(e){this.enabled&&(e in this.started&&r("Timer is already running for "+e),this.started[e]=Date.now())},timeEnd:function(e){this.enabled&&(e in this.started||r("Timer has not been started for "+e),this.times.push({name:e,start:this.started[e],end:Date.now()}),delete this.started[e])},toString:function(){var t,i,a=this.times,r="",n=0
for(t=0,i=a.length;i>t;++t){var s=a[t].name
s.length>n&&(n=s.length)}for(t=0,i=a.length;i>t;++t){var o=a[t],c=o.end-o.start
r+=e(o.name," ",n)+" "+c+"ms\n"}return r}},t}(),me=function(e,t){return"undefined"!=typeof Blob?new Blob([e],{type:t}):void r('The "Blob" constructor is not supported.')},ve=function(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
return function(t,i,a){if(!a&&"undefined"!=typeof URL&&URL.createObjectURL){var r=me(t,i)
return URL.createObjectURL(r)}for(var n="data:"+i+";base64,",s=0,o=t.length;o>s;s+=3){var c=255&t[s],l=255&t[s+1],h=255&t[s+2],u=c>>2,d=(3&c)<<4|l>>4,f=o>s+1?(15&l)<<2|h>>6:64,g=o>s+2?63&h:64
n+=e[u]+e[d]+e[f]+e[g]}return n}}()
j.prototype={on:function(e,t,i){var a=this.actionHandler
a[e]&&s('There is already an actionName called "'+e+'"'),a[e]=[t,i]},send:function(e,t,i){var a={sourceName:this.sourceName,targetName:this.targetName,action:e,data:t}
this.postMessage(a,i)},sendWithPromise:function(e,t,i){var a=this.callbackIndex++,r={sourceName:this.sourceName,targetName:this.targetName,action:e,data:t,callbackId:a},n=N()
this.callbacksCapabilities[a]=n
try{this.postMessage(r,i)}catch(s){n.reject(s)}return n.promise},postMessage:function(e,t){t&&this.postMessageTransfers?this.comObj.postMessage(e,t):this.comObj.postMessage(e)},destroy:function(){this.comObj.removeEventListener("message",this._onComObjOnMessage)}},function(e){function t(e){return void 0!==d[e]}function i(){o.call(this),this._isInvalid=!0}function a(e){return""===e&&i.call(this),e.toLowerCase()}function r(e){var t=e.charCodeAt(0)
return t>32&&127>t&&-1===[34,35,60,62,63,96].indexOf(t)?e:encodeURIComponent(e)}function n(e){var t=e.charCodeAt(0)
return t>32&&127>t&&-1===[34,35,60,62,96].indexOf(t)?e:encodeURIComponent(e)}function s(e,s,o){function c(e){y.push(e)}var l=s||"scheme start",h=0,u="",v=!1,b=!1,y=[]
e:for(;(e[h-1]!==g||0===h)&&!this._isInvalid;){var w=e[h]
switch(l){case"scheme start":if(!w||!p.test(w)){if(s){c("Invalid scheme.")
break e}u="",l="no scheme"
continue}u+=w.toLowerCase(),l="scheme"
break
case"scheme":if(w&&m.test(w))u+=w.toLowerCase()
else{if(":"!==w){if(s){if(g===w)break e
c("Code point not allowed in scheme: "+w)
break e}u="",h=0,l="no scheme"
continue}if(this._scheme=u,u="",s)break e
t(this._scheme)&&(this._isRelative=!0),l="file"===this._scheme?"relative":this._isRelative&&o&&o._scheme===this._scheme?"relative or authority":this._isRelative?"authority first slash":"scheme data"}break
case"scheme data":"?"===w?(this._query="?",l="query"):"#"===w?(this._fragment="#",l="fragment"):g!==w&&"	"!==w&&"\n"!==w&&"\r"!==w&&(this._schemeData+=r(w))
break
case"no scheme":if(o&&t(o._scheme)){l="relative"
continue}c("Missing scheme."),i.call(this)
break
case"relative or authority":if("/"!==w||"/"!==e[h+1]){c("Expected /, got: "+w),l="relative"
continue}l="authority ignore slashes"
break
case"relative":if(this._isRelative=!0,"file"!==this._scheme&&(this._scheme=o._scheme),g===w){this._host=o._host,this._port=o._port,this._path=o._path.slice(),this._query=o._query,this._username=o._username,this._password=o._password
break e}if("/"===w||"\\"===w)"\\"===w&&c("\\ is an invalid code point."),l="relative slash"
else if("?"===w)this._host=o._host,this._port=o._port,this._path=o._path.slice(),this._query="?",this._username=o._username,this._password=o._password,l="query"
else{if("#"!==w){var k=e[h+1],C=e[h+2];("file"!==this._scheme||!p.test(w)||":"!==k&&"|"!==k||g!==C&&"/"!==C&&"\\"!==C&&"?"!==C&&"#"!==C)&&(this._host=o._host,this._port=o._port,this._username=o._username,this._password=o._password,this._path=o._path.slice(),this._path.pop()),l="relative path"
continue}this._host=o._host,this._port=o._port,this._path=o._path.slice(),this._query=o._query,this._fragment="#",this._username=o._username,this._password=o._password,l="fragment"}break
case"relative slash":if("/"!==w&&"\\"!==w){"file"!==this._scheme&&(this._host=o._host,this._port=o._port,this._username=o._username,this._password=o._password),l="relative path"
continue}"\\"===w&&c("\\ is an invalid code point."),l="file"===this._scheme?"file host":"authority ignore slashes"
break
case"authority first slash":if("/"!==w){c("Expected '/', got: "+w),l="authority ignore slashes"
continue}l="authority second slash"
break
case"authority second slash":if(l="authority ignore slashes","/"!==w){c("Expected '/', got: "+w)
continue}break
case"authority ignore slashes":if("/"!==w&&"\\"!==w){l="authority"
continue}c("Expected authority, got: "+w)
break
case"authority":if("@"===w){v&&(c("@ already seen."),u+="%40"),v=!0
for(var x=0;x<u.length;x++){var S=u[x]
if("	"!==S&&"\n"!==S&&"\r"!==S)if(":"!==S||null!==this._password){var A=r(S)
null!==this._password?this._password+=A:this._username+=A}else this._password=""
else c("Invalid whitespace in authority.")}u=""}else{if(w===g||"/"===w||"\\"===w||"?"===w||"#"===w){h-=u.length,u="",l="host"
continue}u+=w}break
case"file host":if(w===g||"/"===w||"\\"===w||"?"===w||"#"===w){2!==u.length||!p.test(u[0])||":"!==u[1]&&"|"!==u[1]?0===u.length?l="relative path start":(this._host=a.call(this,u),u="",l="relative path start"):l="relative path"
continue}"	"===w||"\n"===w||"\r"===w?c("Invalid whitespace in file host."):u+=w
break
case"host":case"hostname":if(":"!==w||b){if(w===g||"/"===w||"\\"===w||"?"===w||"#"===w){if(this._host=a.call(this,u),u="",l="relative path start",s)break e
continue}"	"!==w&&"\n"!==w&&"\r"!==w?("["===w?b=!0:"]"===w&&(b=!1),u+=w):c("Invalid code point in host/hostname: "+w)}else if(this._host=a.call(this,u),u="",l="port","hostname"===s)break e
break
case"port":if(/[0-9]/.test(w))u+=w
else{if(w===g||"/"===w||"\\"===w||"?"===w||"#"===w||s){if(""!==u){var I=parseInt(u,10)
I!==d[this._scheme]&&(this._port=I+""),u=""}if(s)break e
l="relative path start"
continue}"	"===w||"\n"===w||"\r"===w?c("Invalid code point in port: "+w):i.call(this)}break
case"relative path start":if("\\"===w&&c("'\\' not allowed in path."),l="relative path","/"!==w&&"\\"!==w)continue
break
case"relative path":if(w!==g&&"/"!==w&&"\\"!==w&&(s||"?"!==w&&"#"!==w))"	"!==w&&"\n"!==w&&"\r"!==w&&(u+=r(w))
else{"\\"===w&&c("\\ not allowed in relative path.")
var P;(P=f[u.toLowerCase()])&&(u=P),".."===u?(this._path.pop(),"/"!==w&&"\\"!==w&&this._path.push("")):"."===u&&"/"!==w&&"\\"!==w?this._path.push(""):"."!==u&&("file"===this._scheme&&0===this._path.length&&2===u.length&&p.test(u[0])&&"|"===u[1]&&(u=u[0]+":"),this._path.push(u)),u="","?"===w?(this._query="?",l="query"):"#"===w&&(this._fragment="#",l="fragment")}break
case"query":s||"#"!==w?g!==w&&"	"!==w&&"\n"!==w&&"\r"!==w&&(this._query+=n(w)):(this._fragment="#",l="fragment")
break
case"fragment":g!==w&&"	"!==w&&"\n"!==w&&"\r"!==w&&(this._fragment+=w)}h++}}function o(){this._scheme="",this._schemeData="",this._username="",this._password=null,this._host="",this._port="",this._path=[],this._query="",this._fragment="",this._isInvalid=!1,this._isRelative=!1}function c(e,t){void 0===t||t instanceof c||(t=new c(t+"")),this._url=e,o.call(this)
var i=e.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g,"")
s.call(this,i,null,t)}var l=!1
try{if("function"==typeof URL&&"object"==typeof URL.prototype&&"origin"in URL.prototype){var h=new URL("b","http://a")
h.pathname="c%20d",l="http://a/c%20d"===h.href}}catch(u){}if(!l){var d=Object.create(null)
d.ftp=21,d.file=0,d.gopher=70,d.http=80,d.https=443,d.ws=80,d.wss=443
var f=Object.create(null)
f["%2e"]=".",f[".%2e"]="..",f["%2e."]="..",f["%2e%2e"]=".."
var g,p=/[a-zA-Z]/,m=/[a-zA-Z0-9\+\-\.]/
c.prototype={toString:function(){return this.href},get href(){if(this._isInvalid)return this._url
var e=""
return(""!==this._username||null!==this._password)&&(e=this._username+(null!==this._password?":"+this._password:"")+"@"),this.protocol+(this._isRelative?"//"+e+this.host:"")+this.pathname+this._query+this._fragment},set href(e){o.call(this),s.call(this,e)},get protocol(){return this._scheme+":"},set protocol(e){this._isInvalid||s.call(this,e+":","scheme start")},get host(){return this._isInvalid?"":this._port?this._host+":"+this._port:this._host},set host(e){!this._isInvalid&&this._isRelative&&s.call(this,e,"host")},get hostname(){return this._host},set hostname(e){!this._isInvalid&&this._isRelative&&s.call(this,e,"hostname")},get port(){return this._port},set port(e){!this._isInvalid&&this._isRelative&&s.call(this,e,"port")},get pathname(){return this._isInvalid?"":this._isRelative?"/"+this._path.join("/"):this._schemeData},set pathname(e){!this._isInvalid&&this._isRelative&&(this._path=[],s.call(this,e,"relative path start"))},get search(){return this._isInvalid||!this._query||"?"===this._query?"":this._query},set search(e){!this._isInvalid&&this._isRelative&&(this._query="?","?"===e[0]&&(e=e.slice(1)),s.call(this,e,"query"))},get hash(){return this._isInvalid||!this._fragment||"#"===this._fragment?"":this._fragment},set hash(e){this._isInvalid||(this._fragment="#","#"===e[0]&&(e=e.slice(1)),s.call(this,e,"fragment"))},get origin(){var e
if(this._isInvalid||!this._scheme)return""
switch(this._scheme){case"data":case"file":case"javascript":case"mailto":return"null"}return e=this.host,e?this._scheme+"://"+e:""}}
var v=e.URL
v&&(c.createObjectURL=function(e){return v.createObjectURL.apply(v,arguments)},c.revokeObjectURL=function(e){v.revokeObjectURL(e)}),e.URL=c}}(_),e.FONT_IDENTITY_MATRIX=q,e.IDENTITY_MATRIX=ue,e.OPS=Z,e.VERBOSITY_LEVELS=J,e.UNSUPPORTED_FEATURES=$,e.AnnotationBorderStyleType=X,e.AnnotationFieldFlag=W,e.AnnotationFlag=G,e.AnnotationType=V,e.FontType=Y,e.ImageKind=z,e.InvalidPDFException=ae,e.MessageHandler=j,e.MissingDataException=oe,e.MissingPDFException=re,e.NotImplementedException=se,e.PageViewport=fe,e.PasswordException=te,e.PasswordResponses=ee,e.StatTimer=pe,e.StreamType=K,e.TextRenderingMode=H,e.UnexpectedResponseException=ne,e.UnknownErrorException=ie,e.Util=de,e.XRefParseException=ce,e.arrayByteLength=v,e.arraysToBytes=b,e.assert=c,e.bytesToString=p,e.createBlob=me,e.createPromiseCapability=N,e.createObjectURL=ve,e.deprecated=n,e.error=s,e.getLookupTableFactory=f,e.getVerbosityLevel=i,e.globalScope=_,e.info=a,e.isArray=M,e.isArrayBuffer=D,e.isBool=L,e.isEmptyObj=T,e.isInt=E,e.isNum=R,e.isString=O,e.isSpace=F,e.isSameOrigin=l,e.createValidAbsoluteUrl=u,e.isLittleEndian=S,e.isEvalSupported=A,e.loadJpegStream=U,e.log2=w,e.readInt8=k,e.readUint16=C,e.readUint32=x,e.removeNullCharacters=g,e.setVerbosityLevel=t,e.shadow=d,e.string32=y,e.stringToBytes=m,e.stringToPDFString=I,e.stringToUTF8String=P,e.utf8StringToString=B,e.warn=r}),function(e,t){t(e.pdfjsCoreBidi={},e.pdfjsSharedUtil)}(this,function(e,t){function i(e){return 0!==(1&e)}function a(e){return 0===(1&e)}function r(e,t,i){for(var a=t,r=e.length;r>a;++a)if(e[a]!==i)return a
return a}function n(e,t,i,a){for(var r=t;i>r;++r)e[r]=a}function s(e,t,i){for(var a=t,r=i-1;r>a;++a,--r){var n=e[a]
e[a]=e[r],e[r]=n}}function o(e,t,i){return{str:e,dir:i?"ttb":t?"ltr":"rtl"}}function c(e,t,c){var g=!0,p=e.length
if(0===p||c)return o(e,g,c)
d.length=p,f.length=p
var m,v,b=0
for(m=0;p>m;++m){d[m]=e.charAt(m)
var y=e.charCodeAt(m),w="L"
255>=y?w=h[y]:y>=1424&&1524>=y?w="R":y>=1536&&1791>=y?(w=u[255&y],w||l("Bidi: invalid Unicode character "+y.toString(16))):y>=1792&&2220>=y&&(w="AL"),("R"===w||"AL"===w||"AN"===w)&&b++,f[m]=w}if(0===b)return g=!0,o(e,g);-1===t&&(.3>b/p?(g=!0,t=0):(g=!1,t=1))
var k=[]
for(m=0;p>m;++m)k[m]=t
var C=i(t)?"R":"L",x=C,S=x,A=x
for(m=0;p>m;++m)"NSM"===f[m]?f[m]=A:A=f[m]
A=x
var I
for(m=0;p>m;++m)I=f[m],"EN"===I?f[m]="AL"===A?"AN":"EN":("R"===I||"L"===I||"AL"===I)&&(A=I)
for(m=0;p>m;++m)I=f[m],"AL"===I&&(f[m]="R")
for(m=1;p-1>m;++m)"ES"===f[m]&&"EN"===f[m-1]&&"EN"===f[m+1]&&(f[m]="EN"),"CS"!==f[m]||"EN"!==f[m-1]&&"AN"!==f[m-1]||f[m+1]!==f[m-1]||(f[m]=f[m-1])
for(m=0;p>m;++m)if("EN"===f[m]){var P
for(P=m-1;P>=0&&"ET"===f[P];--P)f[P]="EN"
for(P=m+1;p>P&&"ET"===f[P];++P)f[P]="EN"}for(m=0;p>m;++m)I=f[m],("WS"===I||"ES"===I||"ET"===I||"CS"===I)&&(f[m]="ON")
for(A=x,m=0;p>m;++m)I=f[m],"EN"===I?f[m]="L"===A?"L":"EN":("R"===I||"L"===I)&&(A=I)
for(m=0;p>m;++m)if("ON"===f[m]){var B=r(f,m+1,"ON"),T=x
m>0&&(T=f[m-1])
var L=S
p>B+1&&(L=f[B+1]),"L"!==T&&(T="R"),"L"!==L&&(L="R"),T===L&&n(f,m,B,T),m=B-1}for(m=0;p>m;++m)"ON"===f[m]&&(f[m]=C)
for(m=0;p>m;++m)I=f[m],a(k[m])?"R"===I?k[m]+=1:("AN"===I||"EN"===I)&&(k[m]+=2):("L"===I||"AN"===I||"EN"===I)&&(k[m]+=1)
var E,R=-1,O=99
for(m=0,v=k.length;v>m;++m)E=k[m],E>R&&(R=E),O>E&&i(E)&&(O=E)
for(E=R;E>=O;--E){var M=-1
for(m=0,v=k.length;v>m;++m)k[m]<E?M>=0&&(s(d,M,m),M=-1):0>M&&(M=m)
M>=0&&s(d,M,k.length)}for(m=0,v=d.length;v>m;++m){var D=d[m];("<"===D||">"===D)&&(d[m]="")}return o(d.join(""),g)}var l=t.warn,h=["BN","BN","BN","BN","BN","BN","BN","BN","BN","S","B","S","WS","B","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","B","B","B","S","WS","ON","ON","ET","ET","ET","ON","ON","ON","ON","ON","ES","CS","ES","CS","CS","EN","EN","EN","EN","EN","EN","EN","EN","EN","EN","CS","ON","ON","ON","ON","ON","ON","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","ON","ON","ON","ON","ON","ON","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","ON","ON","ON","ON","BN","BN","BN","BN","BN","BN","B","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","CS","ON","ET","ET","ET","ET","ON","ON","ON","ON","L","ON","ON","BN","ON","ON","ET","ET","EN","EN","ON","L","ON","ON","ON","EN","L","ON","ON","ON","ON","ON","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","ON","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","ON","L","L","L","L","L","L","L","L"],u=["AN","AN","AN","AN","AN","AN","ON","ON","AL","ET","ET","AL","CS","AL","ON","ON","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","AL","AL","","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","AN","AN","AN","AN","AN","AN","AN","AN","AN","AN","ET","AN","AN","AL","AL","AL","NSM","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","AN","ON","NSM","NSM","NSM","NSM","NSM","NSM","AL","AL","NSM","NSM","ON","NSM","NSM","NSM","NSM","AL","AL","EN","EN","EN","EN","EN","EN","EN","EN","EN","EN","AL","AL","AL","AL","AL","AL"],d=[],f=[]
e.bidi=c}),function(e,t){t(e.pdfjsCoreCFFParser={},e.pdfjsSharedUtil,e.pdfjsCoreCharsets,e.pdfjsCoreEncodings)}(this,function(e,t,i,a){var r=t.error,n=t.info,s=t.bytesToString,o=t.warn,c=t.isArray,l=t.Util,h=t.stringToBytes,u=t.assert,d=i.ISOAdobeCharset,f=i.ExpertCharset,g=i.ExpertSubsetCharset,p=a.StandardEncoding,m=a.ExpertEncoding,v=10,b=[".notdef","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","endash","dagger","daggerdbl","periodcentered","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","questiondown","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","ring","cedilla","hungarumlaut","ogonek","caron","emdash","AE","ordfeminine","Lslash","Oslash","OE","ordmasculine","ae","dotlessi","lslash","oslash","oe","germandbls","onesuperior","logicalnot","mu","trademark","Eth","onehalf","plusminus","Thorn","onequarter","divide","brokenbar","degree","thorn","threequarters","twosuperior","registered","minus","eth","multiply","threesuperior","copyright","Aacute","Acircumflex","Adieresis","Agrave","Aring","Atilde","Ccedilla","Eacute","Ecircumflex","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Ntilde","Oacute","Ocircumflex","Odieresis","Ograve","Otilde","Scaron","Uacute","Ucircumflex","Udieresis","Ugrave","Yacute","Ydieresis","Zcaron","aacute","acircumflex","adieresis","agrave","aring","atilde","ccedilla","eacute","ecircumflex","edieresis","egrave","iacute","icircumflex","idieresis","igrave","ntilde","oacute","ocircumflex","odieresis","ograve","otilde","scaron","uacute","ucircumflex","udieresis","ugrave","yacute","ydieresis","zcaron","exclamsmall","Hungarumlautsmall","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","commasuperior","threequartersemdash","periodsuperior","questionsmall","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","ffi","ffl","parenleftinferior","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","exclamdownsmall","centoldstyle","Lslashsmall","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","Dotaccentsmall","Macronsmall","figuredash","hypheninferior","Ogoneksmall","Ringsmall","Cedillasmall","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall","001.000","001.001","001.002","001.003","Black","Bold","Book","Light","Medium","Regular","Roman","Semibold"],y=function(){function e(e,t,i){this.bytes=e.getBytes(),this.properties=t,this.seacAnalysisEnabled=!!i}var t=[null,{id:"hstem",min:2,stackClearing:!0,stem:!0},null,{id:"vstem",min:2,stackClearing:!0,stem:!0},{id:"vmoveto",min:1,stackClearing:!0},{id:"rlineto",min:2,resetStack:!0},{id:"hlineto",min:1,resetStack:!0},{id:"vlineto",min:1,resetStack:!0},{id:"rrcurveto",min:6,resetStack:!0},null,{id:"callsubr",min:1,undefStack:!0},{id:"return",min:0,undefStack:!0},null,null,{id:"endchar",min:0,stackClearing:!0},null,null,null,{id:"hstemhm",min:2,stackClearing:!0,stem:!0},{id:"hintmask",min:0,stackClearing:!0},{id:"cntrmask",min:0,stackClearing:!0},{id:"rmoveto",min:2,stackClearing:!0},{id:"hmoveto",min:1,stackClearing:!0},{id:"vstemhm",min:2,stackClearing:!0,stem:!0},{id:"rcurveline",min:8,resetStack:!0},{id:"rlinecurve",min:8,resetStack:!0},{id:"vvcurveto",min:4,resetStack:!0},{id:"hhcurveto",min:4,resetStack:!0},null,{id:"callgsubr",min:1,undefStack:!0},{id:"vhcurveto",min:4,resetStack:!0},{id:"hvcurveto",min:4,resetStack:!0}],i=[null,null,null,{id:"and",min:2,stackDelta:-1},{id:"or",min:2,stackDelta:-1},{id:"not",min:1,stackDelta:0},null,null,null,{id:"abs",min:1,stackDelta:0},{id:"add",min:2,stackDelta:-1,stackFn:function(e,t){e[t-2]=e[t-2]+e[t-1]}},{id:"sub",min:2,stackDelta:-1,stackFn:function(e,t){e[t-2]=e[t-2]-e[t-1]}},{id:"div",min:2,stackDelta:-1,stackFn:function(e,t){e[t-2]=e[t-2]/e[t-1]}},null,{id:"neg",min:1,stackDelta:0,stackFn:function(e,t){e[t-1]=-e[t-1]}},{id:"eq",min:2,stackDelta:-1},null,null,{id:"drop",min:1,stackDelta:-1},null,{id:"put",min:2,stackDelta:-2},{id:"get",min:1,stackDelta:0},{id:"ifelse",min:4,stackDelta:-3},{id:"random",min:0,stackDelta:1},{id:"mul",min:2,stackDelta:-1,stackFn:function(e,t){e[t-2]=e[t-2]*e[t-1]}},null,{id:"sqrt",min:1,stackDelta:0},{id:"dup",min:1,stackDelta:1},{id:"exch",min:2,stackDelta:0},{id:"index",min:2,stackDelta:0},{id:"roll",min:3,stackDelta:-2},null,null,null,{id:"hflex",min:7,resetStack:!0},{id:"flex",min:13,resetStack:!0},{id:"hflex1",min:9,resetStack:!0},{id:"flex1",min:11,resetStack:!0}]
return e.prototype={parse:function(){var e=this.properties,t=new w
this.cff=t
var i=this.parseHeader(),a=this.parseIndex(i.endPos),r=this.parseIndex(a.endPos),n=this.parseIndex(r.endPos),s=this.parseIndex(n.endPos),o=this.parseDict(r.obj.get(0)),c=this.createDict(A,o,t.strings)
t.header=i.obj,t.names=this.parseNameIndex(a.obj),t.strings=this.parseStringIndex(n.obj),t.topDict=c,t.globalSubrIndex=s.obj,this.parsePrivateDict(t.topDict),t.isCIDFont=c.hasName("ROS")
var l=c.getByName("CharStrings"),h=this.parseIndex(l).obj,u=c.getByName("FontMatrix")
u&&(e.fontMatrix=u)
var d=c.getByName("FontBBox")
d&&(e.ascent=d[3],e.descent=d[1],e.ascentScaled=!0)
var f,g
if(t.isCIDFont){for(var p=this.parseIndex(c.getByName("FDArray")).obj,m=0,v=p.count;v>m;++m){var b=p.get(m),y=this.createDict(A,this.parseDict(b),t.strings)
this.parsePrivateDict(y),t.fdArray.push(y)}g=null,f=this.parseCharsets(c.getByName("charset"),h.count,t.strings,!0),t.fdSelect=this.parseFDSelect(c.getByName("FDSelect"),h.count)}else f=this.parseCharsets(c.getByName("charset"),h.count,t.strings,!1),g=this.parseEncoding(c.getByName("Encoding"),e,t.strings,f.charset)
t.charset=f,t.encoding=g
var k=this.parseCharStrings(h,c.privateDict.subrsIndex,s.obj,t.fdSelect,t.fdArray)
return t.charStrings=k.charStrings,t.seacs=k.seacs,t.widths=k.widths,t},parseHeader:function(){for(var e=this.bytes,t=e.length,i=0;t>i&&1!==e[i];)++i
i>=t?r("Invalid CFF header"):0!==i&&(n("cff data is shifted"),e=e.subarray(i),this.bytes=e)
var a=e[0],s=e[1],o=e[2],c=e[3],l=new k(a,s,o,c)
return{obj:l,endPos:o}},parseDict:function(e){function t(){var t=e[a++]
return 30===t?i():28===t?(t=e[a++],t=(t<<24|e[a++]<<16)>>16):29===t?(t=e[a++],t=t<<8|e[a++],t=t<<8|e[a++],t=t<<8|e[a++]):t>=32&&246>=t?t-139:t>=247&&250>=t?256*(t-247)+e[a++]+108:t>=251&&254>=t?-(256*(t-251))-e[a++]-108:(o('CFFParser_parseDict: "'+t+'" is a reserved command.'),NaN)}function i(){for(var t="",i=15,r=["0","1","2","3","4","5","6","7","8","9",".","E","E-",null,"-"],n=e.length;n>a;){var s=e[a++],o=s>>4,c=15&s
if(o===i)break
if(t+=r[o],c===i)break
t+=r[c]}return parseFloat(t)}var a=0,r=[],n=[]
a=0
for(var s=e.length;s>a;){var c=e[a]
21>=c?(12===c&&(c=c<<8|e[++a]),n.push([c,r]),r=[],++a):r.push(t())}return n},parseIndex:function(e){var t,i,a=new x,r=this.bytes,n=r[e++]<<8|r[e++],s=[],o=e
if(0!==n){var c=r[e++],l=e+(n+1)*c-1
for(t=0,i=n+1;i>t;++t){for(var h=0,u=0;c>u;++u)h<<=8,h+=r[e++]
s.push(l+h)}o=s[n]}for(t=0,i=s.length-1;i>t;++t){var d=s[t],f=s[t+1]
a.add(r.subarray(d,f))}return{obj:a,endPos:o}},parseNameIndex:function(e){for(var t=[],i=0,a=e.count;a>i;++i){for(var r=e.get(i),n=Math.min(r.length,127),o=[],c=0;n>c;++c){var l=r[c];(0!==c||0!==l)&&(33>l||l>126||91===l||93===l||40===l||41===l||123===l||125===l||60===l||62===l||47===l||37===l||35===l)?o[c]=95:o[c]=l}t.push(s(o))}return t},parseStringIndex:function(e){for(var t=new C,i=0,a=e.count;a>i;++i){var r=e.get(i)
t.add(s(r))}return t},createDict:function(e,t,i){for(var a=new e(i),r=0,n=t.length;n>r;++r){var s=t[r],o=s[0],c=s[1]
a.setByKey(o,c)}return a},parseCharString:function(e,a,r,n){if(e.callDepth>v)return!1
for(var s=e.stackSize,c=e.stack,l=a.length,h=0;l>h;){var u=a[h++],d=null
if(12===u){var f=a[h++]
0===f?(a[h-2]=139,a[h-1]=22,s=0):d=i[f]}else if(28===u)c[s]=(a[h]<<24|a[h+1]<<16)>>16,h+=2,s++
else if(14===u){if(s>=4&&(s-=4,this.seacAnalysisEnabled))return e.seac=c.slice(s,s+4),!1
d=t[u]}else if(u>=32&&246>=u)c[s]=u-139,s++
else if(u>=247&&254>=u)c[s]=251>u?(u-247<<8)+a[h]+108:-(u-251<<8)-a[h]-108,h++,s++
else if(255===u)c[s]=(a[h]<<24|a[h+1]<<16|a[h+2]<<8|a[h+3])/65536,h+=4,s++
else if(19===u||20===u)e.hints+=s>>1,h+=e.hints+7>>3,s%=2,d=t[u]
else{if(10===u||29===u){var g
if(g=10===u?r:n,!g)return d=t[u],o("Missing subrsIndex for "+d.id),!1
var p=32768
g.count<1240?p=107:g.count<33900&&(p=1131)
var m=c[--s]+p
if(0>m||m>=g.count)return d=t[u],o("Out of bounds subrIndex for "+d.id),!1
e.stackSize=s,e.callDepth++
var b=this.parseCharString(e,g.get(m),r,n)
if(!b)return!1
e.callDepth--,s=e.stackSize
continue}if(11===u)return e.stackSize=s,!0
d=t[u]}if(d){if(d.stem&&(e.hints+=s>>1),"min"in d&&!e.undefStack&&s<d.min)return o("Not enough parameters for "+d.id+"; actual: "+s+", expected: "+d.min),!1
e.firstStackClearing&&d.stackClearing&&(e.firstStackClearing=!1,s-=d.min,s>=2&&d.stem?s%=2:s>1&&o("Found too many parameters for stack-clearing command"),s>0&&c[s-1]>=0&&(e.width=c[s-1])),"stackDelta"in d?("stackFn"in d&&d.stackFn(c,s),s+=d.stackDelta):d.stackClearing?s=0:d.resetStack?(s=0,e.undefStack=!1):d.undefStack&&(s=0,e.undefStack=!0,e.firstStackClearing=!1)}}return e.stackSize=s,!0},parseCharStrings:function(e,t,i,a,r){for(var n=[],s=[],c=e.count,l=0;c>l;l++){var h=e.get(l),u={callDepth:0,stackSize:0,stack:[],undefStack:!0,hints:0,firstStackClearing:!0,seac:null,width:null},d=!0,f=null
if(a&&r.length){var g=a.getFDIndex(l);-1===g&&(o("Glyph index is not in fd select."),d=!1),g>=r.length&&(o("Invalid fd index for glyph index."),d=!1),d&&(f=r[g].privateDict.subrsIndex)}else t&&(f=t)
d&&(d=this.parseCharString(u,h,f,i)),null!==u.width&&(s[l]=u.width),null!==u.seac&&(n[l]=u.seac),d||e.set(l,new Uint8Array([14]))}return{charStrings:e,seacs:n,widths:s}},emptyPrivateDictionary:function(e){var t=this.createDict(I,[],e.strings)
e.setByKey(18,[0,0]),e.privateDict=t},parsePrivateDict:function(e){if(!e.hasName("Private"))return void this.emptyPrivateDictionary(e)
var t=e.getByName("Private")
if(!c(t)||2!==t.length)return void e.removeByName("Private")
var i=t[0],a=t[1]
if(0===i||a>=this.bytes.length)return void this.emptyPrivateDictionary(e)
var r=a+i,n=this.bytes.subarray(a,r),s=this.parseDict(n),o=this.createDict(I,s,e.strings)
if(e.privateDict=o,o.getByName("Subrs")){var l=o.getByName("Subrs"),h=a+l
if(0===l||h>=this.bytes.length)return void this.emptyPrivateDictionary(e)
var u=this.parseIndex(h)
o.subrsIndex=u.obj}},parseCharsets:function(e,t,i,a){if(0===e)return new B(!0,P.ISO_ADOBE,d)
if(1===e)return new B(!0,P.EXPERT,f)
if(2===e)return new B(!0,P.EXPERT_SUBSET,g)
var n,s,o,c=this.bytes,l=e,h=c[e++],u=[".notdef"]
switch(t-=1,h){case 0:for(o=0;t>o;o++)n=c[e++]<<8|c[e++],u.push(a?n:i.get(n))
break
case 1:for(;u.length<=t;)for(n=c[e++]<<8|c[e++],s=c[e++],o=0;s>=o;o++)u.push(a?n++:i.get(n++))
break
case 2:for(;u.length<=t;)for(n=c[e++]<<8|c[e++],s=c[e++]<<8|c[e++],o=0;s>=o;o++)u.push(a?n++:i.get(n++))
break
default:r("Unknown charset format")}var p=e,m=c.subarray(l,p)
return new B(!1,h,u,m)},parseEncoding:function(e,t,i,a){function n(){var t=h[e++]
for(o=0;t>o;o++){var r=h[e++],n=(h[e++]<<8)+(255&h[e++])
l[r]=a.indexOf(i.get(n))}}var s,o,c,l=Object.create(null),h=this.bytes,u=!1,d=!1,f=null
if(0===e||1===e){u=!0,s=e
var g=e?m:p
for(o=0,c=a.length;c>o;o++){var v=g.indexOf(a[o]);-1!==v&&(l[v]=o)}}else{var b=e
switch(s=h[e++],127&s){case 0:var y=h[e++]
for(o=1;y>=o;o++)l[h[e++]]=o
break
case 1:var w=h[e++],k=1
for(o=0;w>o;o++)for(var C=h[e++],x=h[e++],S=C;C+x>=S;S++)l[S]=k++
break
default:r("Unknown encoding format: "+s+" in CFF")}var A=e
128&s&&(h[b]&=127,n(),d=!0),f=h.subarray(b,A)}return s=127&s,new T(u,s,l,f)},parseFDSelect:function(e,t){var i,a,n=e,s=this.bytes,c=s[e++],l=[],h=!1
switch(c){case 0:for(a=0;t>a;++a){var d=s[e++]
l.push(d)}i=s.subarray(n,e)
break
case 3:var f=s[e++]<<8|s[e++]
for(a=0;f>a;++a){var g=s[e++]<<8|s[e++]
0===a&&0!==g&&(o("parseFDSelect: The first range must have a first GID of 0 -- trying to recover."),h=!0,g=0)
for(var p=s[e++],m=s[e]<<8|s[e+1],v=g;m>v;++v)l.push(p)}e+=2,i=s.subarray(n,e),h&&(i[3]=i[4]=0)
break
default:r('parseFDSelect: Unknown format "'+c+'".')}return u(l.length===t,"parseFDSelect: Invalid font data."),new L(l,i)}},e}(),w=function(){function e(){this.header=null,this.names=[],this.topDict=null,this.strings=new C,this.globalSubrIndex=null,this.encoding=null,this.charset=null,this.charStrings=null,this.fdArray=[],this.fdSelect=null,this.isCIDFont=!1}return e}(),k=function(){function e(e,t,i,a){this.major=e,this.minor=t,this.hdrSize=i,this.offSize=a}return e}(),C=function(){function e(){this.strings=[]}return e.prototype={get:function(e){return e>=0&&390>=e?b[e]:e-391<=this.strings.length?this.strings[e-391]:b[0]},add:function(e){this.strings.push(e)},get count(){return this.strings.length}},e}(),x=function(){function e(){this.objects=[],this.length=0}return e.prototype={add:function(e){this.length+=e.length,this.objects.push(e)},set:function(e,t){this.length+=t.length-this.objects[e].length,this.objects[e]=t},get:function(e){return this.objects[e]},get count(){return this.objects.length}},e}(),S=function(){function e(e,t){this.keyToNameMap=e.keyToNameMap,this.nameToKeyMap=e.nameToKeyMap,this.defaults=e.defaults,this.types=e.types,this.opcodes=e.opcodes,this.order=e.order,this.strings=t,this.values=Object.create(null)}return e.prototype={setByKey:function(e,t){if(!(e in this.keyToNameMap))return!1
var i=t.length
if(0===i)return!0
for(var a=0;i>a;a++)if(isNaN(t[a]))return o('Invalid CFFDict value: "'+t+'" for key "'+e+'".'),!0
var r=this.types[e]
return("num"===r||"sid"===r||"offset"===r)&&(t=t[0]),this.values[e]=t,!0},setByName:function(e,t){e in this.nameToKeyMap||r('Invalid dictionary name "'+e+'"'),this.values[this.nameToKeyMap[e]]=t},hasName:function(e){return this.nameToKeyMap[e]in this.values},getByName:function(e){e in this.nameToKeyMap||r('Invalid dictionary name "'+e+'"')
var t=this.nameToKeyMap[e]
return t in this.values?this.values[t]:this.defaults[t]},removeByName:function(e){delete this.values[this.nameToKeyMap[e]]}},e.createTables=function(e){for(var t={keyToNameMap:{},nameToKeyMap:{},defaults:{},types:{},opcodes:{},order:[]},i=0,a=e.length;a>i;++i){var r=e[i],n=c(r[0])?(r[0][0]<<8)+r[0][1]:r[0]
t.keyToNameMap[n]=r[1],t.nameToKeyMap[r[1]]=n,t.types[n]=r[2],t.defaults[n]=r[3],t.opcodes[n]=c(r[0])?r[0]:[r[0]],t.order.push(n)}return t},e}(),A=function(){function e(e){null===i&&(i=S.createTables(t)),S.call(this,i,e),this.privateDict=null}var t=[[[12,30],"ROS",["sid","sid","num"],null],[[12,20],"SyntheticBase","num",null],[0,"version","sid",null],[1,"Notice","sid",null],[[12,0],"Copyright","sid",null],[2,"FullName","sid",null],[3,"FamilyName","sid",null],[4,"Weight","sid",null],[[12,1],"isFixedPitch","num",0],[[12,2],"ItalicAngle","num",0],[[12,3],"UnderlinePosition","num",-100],[[12,4],"UnderlineThickness","num",50],[[12,5],"PaintType","num",0],[[12,6],"CharstringType","num",2],[[12,7],"FontMatrix",["num","num","num","num","num","num"],[.001,0,0,.001,0,0]],[13,"UniqueID","num",null],[5,"FontBBox",["num","num","num","num"],[0,0,0,0]],[[12,8],"StrokeWidth","num",0],[14,"XUID","array",null],[15,"charset","offset",0],[16,"Encoding","offset",0],[17,"CharStrings","offset",0],[18,"Private",["offset","offset"],null],[[12,21],"PostScript","sid",null],[[12,22],"BaseFontName","sid",null],[[12,23],"BaseFontBlend","delta",null],[[12,31],"CIDFontVersion","num",0],[[12,32],"CIDFontRevision","num",0],[[12,33],"CIDFontType","num",0],[[12,34],"CIDCount","num",8720],[[12,35],"UIDBase","num",null],[[12,37],"FDSelect","offset",null],[[12,36],"FDArray","offset",null],[[12,38],"FontName","sid",null]],i=null
return e.prototype=Object.create(S.prototype),e}(),I=function(){function e(e){null===i&&(i=S.createTables(t)),S.call(this,i,e),this.subrsIndex=null}var t=[[6,"BlueValues","delta",null],[7,"OtherBlues","delta",null],[8,"FamilyBlues","delta",null],[9,"FamilyOtherBlues","delta",null],[[12,9],"BlueScale","num",.039625],[[12,10],"BlueShift","num",7],[[12,11],"BlueFuzz","num",1],[10,"StdHW","num",null],[11,"StdVW","num",null],[[12,12],"StemSnapH","delta",null],[[12,13],"StemSnapV","delta",null],[[12,14],"ForceBold","num",0],[[12,17],"LanguageGroup","num",0],[[12,18],"ExpansionFactor","num",.06],[[12,19],"initialRandomSeed","num",0],[20,"defaultWidthX","num",0],[21,"nominalWidthX","num",0],[19,"Subrs","offset",null]],i=null
return e.prototype=Object.create(S.prototype),e}(),P={ISO_ADOBE:0,EXPERT:1,EXPERT_SUBSET:2},B=function(){function e(e,t,i,a){this.predefined=e,this.format=t,this.charset=i,this.raw=a}return e}(),T=function(){function e(e,t,i,a){this.predefined=e,this.format=t,this.encoding=i,this.raw=a}return e}(),L=function(){function e(e,t){this.fdSelect=e,this.raw=t}return e.prototype={getFDIndex:function(e){return 0>e||e>=this.fdSelect.length?-1:this.fdSelect[e]}},e}(),E=function(){function e(){this.offsets=Object.create(null)}return e.prototype={isTracking:function(e){return e in this.offsets},track:function(e,t){e in this.offsets&&r("Already tracking location of "+e),this.offsets[e]=t},offset:function(e){for(var t in this.offsets)this.offsets[t]+=e},setEntryLocation:function(e,t,i){e in this.offsets||r("Not tracking location of "+e)
for(var a=i.data,n=this.offsets[e],s=5,o=0,c=t.length;c>o;++o){var l=o*s+n,h=l+1,u=l+2,d=l+3,f=l+4;(29!==a[l]||0!==a[h]||0!==a[u]||0!==a[d]||0!==a[f])&&r("writing to an offset that is not empty")
var g=t[o]
a[l]=29,a[h]=g>>24&255,a[u]=g>>16&255,a[d]=g>>8&255,a[f]=255&g}}},e}(),R=function(){function e(e){this.cff=e}return e.prototype={compile:function(){var e=this.cff,t={data:[],length:0,add:function(e){this.data=this.data.concat(e),this.length=this.data.length}},i=this.compileHeader(e.header)
t.add(i)
var a=this.compileNameIndex(e.names)
if(t.add(a),e.isCIDFont&&e.topDict.hasName("FontMatrix")){var r=e.topDict.getByName("FontMatrix")
e.topDict.removeByName("FontMatrix")
for(var n=0,s=e.fdArray.length;s>n;n++){var o=e.fdArray[n],c=r.slice(0)
o.hasName("FontMatrix")&&(c=l.transform(c,o.getByName("FontMatrix"))),o.setByName("FontMatrix",c)}}var h=this.compileTopDicts([e.topDict],t.length,e.isCIDFont)
t.add(h.output)
var u=h.trackers[0],d=this.compileStringIndex(e.strings.strings)
t.add(d)
var f=this.compileIndex(e.globalSubrIndex)
if(t.add(f),e.encoding&&e.topDict.hasName("Encoding"))if(e.encoding.predefined)u.setEntryLocation("Encoding",[e.encoding.format],t)
else{var g=this.compileEncoding(e.encoding)
u.setEntryLocation("Encoding",[t.length],t),t.add(g)}if(e.charset&&e.topDict.hasName("charset"))if(e.charset.predefined)u.setEntryLocation("charset",[e.charset.format],t)
else{var p=this.compileCharset(e.charset)
u.setEntryLocation("charset",[t.length],t),t.add(p)}var m=this.compileCharStrings(e.charStrings)
if(u.setEntryLocation("CharStrings",[t.length],t),t.add(m),e.isCIDFont){u.setEntryLocation("FDSelect",[t.length],t)
var v=this.compileFDSelect(e.fdSelect.raw)
t.add(v),h=this.compileTopDicts(e.fdArray,t.length,!0),u.setEntryLocation("FDArray",[t.length],t),t.add(h.output)
var b=h.trackers
this.compilePrivateDicts(e.fdArray,b,t)}return this.compilePrivateDicts([e.topDict],[u],t),t.add([0]),t.data},encodeNumber:function(e){return parseFloat(e)!==parseInt(e,10)||isNaN(e)?this.encodeFloat(e):this.encodeInteger(e)},encodeFloat:function(e){var t=""+e,i=/\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(t)
if(i){var a=parseFloat("1e"+((i[2]?+i[2]:0)+i[1].length))
t=""+Math.round(e*a)/a}var r,n,s=""
for(r=0,n=t.length;n>r;++r){var o=t[r]
s+="e"===o?"-"===t[++r]?"c":"b":"."===o?"a":"-"===o?"e":o}s+=1&s.length?"f":"ff"
var c=[30]
for(r=0,n=s.length;n>r;r+=2)c.push(parseInt(s.substr(r,2),16))
return c},encodeInteger:function(e){var t
return e>=-107&&107>=e?t=[e+139]:e>=108&&1131>=e?(e-=108,t=[(e>>8)+247,255&e]):e>=-1131&&-108>=e?(e=-e-108,t=[(e>>8)+251,255&e]):t=e>=-32768&&32767>=e?[28,e>>8&255,255&e]:[29,e>>24&255,e>>16&255,e>>8&255,255&e],t},compileHeader:function(e){return[e.major,e.minor,e.hdrSize,e.offSize]},compileNameIndex:function(e){for(var t=new x,i=0,a=e.length;a>i;++i)t.add(h(e[i]))
return this.compileIndex(t)},compileTopDicts:function(e,t,i){for(var a=[],r=new x,n=0,s=e.length;s>n;++n){var o=e[n]
i&&(o.removeByName("CIDFontVersion"),o.removeByName("CIDFontRevision"),o.removeByName("CIDFontType"),o.removeByName("CIDCount"),o.removeByName("UIDBase"))
var c=new E,l=this.compileDict(o,c)
a.push(c),r.add(l),c.offset(t)}return r=this.compileIndex(r,a),{trackers:a,output:r}},compilePrivateDicts:function(e,t,i){for(var a=0,r=e.length;r>a;++a){var n=e[a]
u(n.privateDict&&n.hasName("Private"),"There must be an private dictionary.")
var s=n.privateDict,o=new E,c=this.compileDict(s,o),l=i.length
if(o.offset(l),c.length||(l=0),t[a].setEntryLocation("Private",[c.length,l],i),i.add(c),s.subrsIndex&&s.hasName("Subrs")){var h=this.compileIndex(s.subrsIndex)
o.setEntryLocation("Subrs",[c.length],i),i.add(h)}}},compileDict:function(e,t){for(var i=[],a=e.order,n=0;n<a.length;++n){var s=a[n]
if(s in e.values){var o=e.values[s],l=e.types[s]
if(c(l)||(l=[l]),c(o)||(o=[o]),0!==o.length){for(var h=0,u=l.length;u>h;++h){var d=l[h],f=o[h]
switch(d){case"num":case"sid":i=i.concat(this.encodeNumber(f))
break
case"offset":var g=e.keyToNameMap[s]
t.isTracking(g)||t.track(g,i.length),i=i.concat([29,0,0,0,0])
break
case"array":case"delta":i=i.concat(this.encodeNumber(f))
for(var p=1,m=o.length;m>p;++p)i=i.concat(this.encodeNumber(o[p]))
break
default:r("Unknown data type of "+d)}}i=i.concat(e.opcodes[s])}}}return i},compileStringIndex:function(e){for(var t=new x,i=0,a=e.length;a>i;++i)t.add(h(e[i]))
return this.compileIndex(t)},compileGlobalSubrIndex:function(){var e=this.cff.globalSubrIndex
this.out.writeByteArray(this.compileIndex(e))},compileCharStrings:function(e){return this.compileIndex(e)},compileCharset:function(e){return this.compileTypedArray(e.raw)},compileEncoding:function(e){return this.compileTypedArray(e.raw)},compileFDSelect:function(e){return this.compileTypedArray(e)},compileTypedArray:function(e){for(var t=[],i=0,a=e.length;a>i;++i)t[i]=e[i]
return t},compileIndex:function(e,t){t=t||[]
var i=e.objects,a=i.length
if(0===a)return[0,0,0]
var r,n=[a>>8&255,255&a],s=1
for(r=0;a>r;++r)s+=i[r].length
var o
o=256>s?1:65536>s?2:16777216>s?3:4,n.push(o)
var c=1
for(r=0;a+1>r;r++)1===o?n.push(255&c):2===o?n.push(c>>8&255,255&c):3===o?n.push(c>>16&255,c>>8&255,255&c):n.push(c>>>24&255,c>>16&255,c>>8&255,255&c),i[r]&&(c+=i[r].length)
for(r=0;a>r;r++){t[r]&&t[r].offset(n.length)
for(var l=0,h=i[r].length;h>l;l++)n.push(i[r][l])}return n}},e}()
e.CFFStandardStrings=b,e.CFFParser=y,e.CFF=w,e.CFFHeader=k,e.CFFStrings=C,e.CFFIndex=x,e.CFFCharset=B,e.CFFTopDict=A,e.CFFPrivateDict=I,e.CFFCompiler=R}),function(e,t){t(e.pdfjsCoreChunkedStream={},e.pdfjsSharedUtil)}(this,function(e,t){var i=t.MissingDataException,a=t.arrayByteLength,r=t.arraysToBytes,n=t.assert,s=t.createPromiseCapability,o=t.isInt,c=t.isEmptyObj,l=function(){function e(e,t,i){this.bytes=new Uint8Array(e),this.start=0,this.pos=0,this.end=e,this.chunkSize=t,this.loadedChunks=[],this.numChunksLoaded=0,this.numChunks=Math.ceil(e/t),this.manager=i,this.progressiveDataLength=0,this.lastSuccessfulEnsureByteChunk=-1}return e.prototype={getMissingChunks:function(){for(var e=[],t=0,i=this.numChunks;i>t;++t)this.loadedChunks[t]||e.push(t)
return e},getBaseStreams:function(){return[this]},allChunksLoaded:function(){return this.numChunksLoaded===this.numChunks},onReceiveData:function(e,t){var i=e+t.byteLength
n(e%this.chunkSize===0,"Bad begin offset: "+e)
var a=this.bytes.length
n(i%this.chunkSize===0||i===a,"Bad end offset: "+i),this.bytes.set(new Uint8Array(t),e)
var r,s=this.chunkSize,o=Math.floor(e/s),c=Math.floor((i-1)/s)+1
for(r=o;c>r;++r)this.loadedChunks[r]||(this.loadedChunks[r]=!0,++this.numChunksLoaded)},onReceiveProgressiveData:function(e){var t=this.progressiveDataLength,i=Math.floor(t/this.chunkSize)
this.bytes.set(new Uint8Array(e),t),t+=e.byteLength,this.progressiveDataLength=t
var a,r=t>=this.end?this.numChunks:Math.floor(t/this.chunkSize)
for(a=i;r>a;++a)this.loadedChunks[a]||(this.loadedChunks[a]=!0,++this.numChunksLoaded)},ensureByte:function(e){var t=Math.floor(e/this.chunkSize)
if(t!==this.lastSuccessfulEnsureByteChunk){if(!this.loadedChunks[t])throw new i(e,e+1)
this.lastSuccessfulEnsureByteChunk=t}},ensureRange:function(e,t){if(!(e>=t||t<=this.progressiveDataLength))for(var a=this.chunkSize,r=Math.floor(e/a),n=Math.floor((t-1)/a)+1,s=r;n>s;++s)if(!this.loadedChunks[s])throw new i(e,t)},nextEmptyChunk:function(e){for(var t,i=this.numChunks,a=0;i>a;++a)if(t=(e+a)%i,!this.loadedChunks[t])return t
return null},hasChunk:function(e){return!!this.loadedChunks[e]},get length(){return this.end-this.start},get isEmpty(){return 0===this.length},getByte:function(){var e=this.pos
return e>=this.end?-1:(this.ensureByte(e),this.bytes[this.pos++])},getUint16:function(){var e=this.getByte(),t=this.getByte()
return-1===e||-1===t?-1:(e<<8)+t},getInt32:function(){var e=this.getByte(),t=this.getByte(),i=this.getByte(),a=this.getByte()
return(e<<24)+(t<<16)+(i<<8)+a},getBytes:function(e){var t=this.bytes,i=this.pos,a=this.end
if(!e)return this.ensureRange(i,a),t.subarray(i,a)
var r=i+e
return r>a&&(r=a),this.ensureRange(i,r),this.pos=r,t.subarray(i,r)},peekByte:function(){var e=this.getByte()
return this.pos--,e},peekBytes:function(e){var t=this.getBytes(e)
return this.pos-=t.length,t},getByteRange:function(e,t){return this.ensureRange(e,t),this.bytes.subarray(e,t)},skip:function(e){e||(e=1),this.pos+=e},reset:function(){this.pos=this.start},moveStart:function(){this.start=this.pos},makeSubStream:function(e,t,i){function a(){}this.ensureRange(e,e+t),a.prototype=Object.create(this),a.prototype.getMissingChunks=function(){for(var e=this.chunkSize,t=Math.floor(this.start/e),i=Math.floor((this.end-1)/e)+1,a=[],r=t;i>r;++r)this.loadedChunks[r]||a.push(r)
return a}
var r=new a
return r.pos=r.start=e,r.end=e+t||this.end,r.dict=i,r},isStream:!0},e}(),h=function(){function e(e,t){var i=t.rangeChunkSize,a=t.length
this.stream=new l(a,i,this),this.length=a,this.chunkSize=i,this.pdfNetworkStream=e,this.url=t.url,this.disableAutoFetch=t.disableAutoFetch,this.msgHandler=t.msgHandler,this.currRequestId=0,this.chunksNeededByRequest=Object.create(null),this.requestsByChunk=Object.create(null),this.promisesByRequest=Object.create(null),this.progressiveDataLength=0,this.aborted=!1,this._loadedStreamCapability=s()}return e.prototype={onLoadedStream:function(){return this._loadedStreamCapability.promise},sendRequest:function(e,t){var i=this.pdfNetworkStream.getRangeReader(e,t)
i.isStreamingSupported||(i.onProgress=this.onProgress.bind(this))
var n=[],s=0,o=this,c=new Promise(function(e,t){var c=function(l){try{if(!l.done){var h=l.value
return n.push(h),s+=a(h),i.isStreamingSupported&&o.onProgress({loaded:s}),void i.read().then(c,t)}var u=r(n)
n=null,e(u)}catch(d){t(d)}}
i.read().then(c,t)})
c.then(function(t){this.aborted||this.onReceiveData({chunk:t,begin:e})}.bind(this))},requestAllChunks:function(){var e=this.stream.getMissingChunks()
return this._requestChunks(e),this._loadedStreamCapability.promise},_requestChunks:function(e){var t,i,a=this.currRequestId++,r=Object.create(null)
for(this.chunksNeededByRequest[a]=r,t=0,i=e.length;i>t;t++)this.stream.hasChunk(e[t])||(r[e[t]]=!0)
if(c(r))return Promise.resolve()
var n=s()
this.promisesByRequest[a]=n
var o=[]
for(var l in r)l=0|l,l in this.requestsByChunk||(this.requestsByChunk[l]=[],o.push(l)),this.requestsByChunk[l].push(a)
if(!o.length)return n.promise
var h=this.groupChunks(o)
for(t=0;t<h.length;++t){var u=h[t],d=u.beginChunk*this.chunkSize,f=Math.min(u.endChunk*this.chunkSize,this.length)
this.sendRequest(d,f)}return n.promise},getStream:function(){return this.stream},requestRange:function(e,t){t=Math.min(t,this.length)
for(var i=this.getBeginChunk(e),a=this.getEndChunk(t),r=[],n=i;a>n;++n)r.push(n)
return this._requestChunks(r)},requestRanges:function(e){e=e||[]
for(var t=[],i=0;i<e.length;i++)for(var a=this.getBeginChunk(e[i].begin),r=this.getEndChunk(e[i].end),n=a;r>n;++n)t.indexOf(n)<0&&t.push(n)
return t.sort(function(e,t){return e-t}),this._requestChunks(t)},groupChunks:function(e){for(var t=[],i=-1,a=-1,r=0;r<e.length;++r){var n=e[r]
0>i&&(i=n),a>=0&&a+1!==n&&(t.push({beginChunk:i,endChunk:a+1}),i=n),r+1===e.length&&t.push({beginChunk:i,endChunk:n+1}),a=n}return t},onProgress:function(e){var t=this.stream.numChunksLoaded*this.chunkSize+e.loaded
this.msgHandler.send("DocProgress",{loaded:t,total:this.length})},onReceiveData:function(e){var t=e.chunk,i=void 0===e.begin,a=i?this.progressiveDataLength:e.begin,r=a+t.byteLength,n=Math.floor(a/this.chunkSize),s=r<this.length?Math.floor(r/this.chunkSize):Math.ceil(r/this.chunkSize)
i?(this.stream.onReceiveProgressiveData(t),this.progressiveDataLength=r):this.stream.onReceiveData(a,t),this.stream.allChunksLoaded()&&this._loadedStreamCapability.resolve(this.stream)
var l,h,u=[]
for(t=n;s>t;++t){var d=this.requestsByChunk[t]||[]
for(delete this.requestsByChunk[t],l=0;l<d.length;++l){h=d[l]
var f=this.chunksNeededByRequest[h]
t in f&&delete f[t],c(f)&&u.push(h)}}if(!this.disableAutoFetch&&c(this.requestsByChunk)){var g
if(1===this.stream.numChunksLoaded){var p=this.stream.numChunks-1
this.stream.hasChunk(p)||(g=p)}else g=this.stream.nextEmptyChunk(s)
o(g)&&this._requestChunks([g])}for(l=0;l<u.length;++l){h=u[l]
var m=this.promisesByRequest[h]
delete this.promisesByRequest[h],m.resolve()}this.msgHandler.send("DocProgress",{loaded:this.stream.numChunksLoaded*this.chunkSize,total:this.length})},onError:function(e){this._loadedStreamCapability.reject(e)},getBeginChunk:function(e){var t=Math.floor(e/this.chunkSize)
return t},getEndChunk:function(e){var t=Math.floor((e-1)/this.chunkSize)+1
return t},abort:function(){this.aborted=!0,this.pdfNetworkStream&&this.pdfNetworkStream.cancelAllRequests("abort")
for(var e in this.promisesByRequest){var t=this.promisesByRequest[e]
t.reject(Error("Request was aborted"))}}},e}()
e.ChunkedStream=l,e.ChunkedStreamManager=h}),function(e,t){t(e.pdfjsCoreGlyphList={},e.pdfjsSharedUtil)}(this,function(e,t){var i=t.getLookupTableFactory,a=i(function(e){e.A=65,e.AE=198,e.AEacute=508,e.AEmacron=482,e.AEsmall=63462,e.Aacute=193,e.Aacutesmall=63457,e.Abreve=258,e.Abreveacute=7854,e.Abrevecyrillic=1232,e.Abrevedotbelow=7862,e.Abrevegrave=7856,e.Abrevehookabove=7858,e.Abrevetilde=7860,e.Acaron=461,e.Acircle=9398,e.Acircumflex=194,e.Acircumflexacute=7844,e.Acircumflexdotbelow=7852,e.Acircumflexgrave=7846,e.Acircumflexhookabove=7848,e.Acircumflexsmall=63458,e.Acircumflextilde=7850,e.Acute=63177,e.Acutesmall=63412,e.Acyrillic=1040,e.Adblgrave=512,e.Adieresis=196,e.Adieresiscyrillic=1234,e.Adieresismacron=478,e.Adieresissmall=63460,e.Adotbelow=7840,e.Adotmacron=480,e.Agrave=192,e.Agravesmall=63456,e.Ahookabove=7842,e.Aiecyrillic=1236,e.Ainvertedbreve=514,e.Alpha=913,e.Alphatonos=902,e.Amacron=256,e.Amonospace=65313,e.Aogonek=260,e.Aring=197,e.Aringacute=506,e.Aringbelow=7680,e.Aringsmall=63461,e.Asmall=63329,e.Atilde=195,e.Atildesmall=63459,e.Aybarmenian=1329,e.B=66,e.Bcircle=9399,e.Bdotaccent=7682,e.Bdotbelow=7684,e.Becyrillic=1041,e.Benarmenian=1330,e.Beta=914,e.Bhook=385,e.Blinebelow=7686,e.Bmonospace=65314,e.Brevesmall=63220,e.Bsmall=63330,e.Btopbar=386,e.C=67,e.Caarmenian=1342,e.Cacute=262,e.Caron=63178,e.Caronsmall=63221,e.Ccaron=268,e.Ccedilla=199,e.Ccedillaacute=7688,e.Ccedillasmall=63463,e.Ccircle=9400,e.Ccircumflex=264,e.Cdot=266,e.Cdotaccent=266,e.Cedillasmall=63416,e.Chaarmenian=1353,e.Cheabkhasiancyrillic=1212,e.Checyrillic=1063,e.Chedescenderabkhasiancyrillic=1214,e.Chedescendercyrillic=1206,e.Chedieresiscyrillic=1268,e.Cheharmenian=1347,e.Chekhakassiancyrillic=1227,e.Cheverticalstrokecyrillic=1208,e.Chi=935,e.Chook=391,e.Circumflexsmall=63222,e.Cmonospace=65315,e.Coarmenian=1361,e.Csmall=63331,e.D=68,e.DZ=497,e.DZcaron=452,e.Daarmenian=1332,e.Dafrican=393,e.Dcaron=270,e.Dcedilla=7696,e.Dcircle=9401,e.Dcircumflexbelow=7698,e.Dcroat=272,e.Ddotaccent=7690,e.Ddotbelow=7692,e.Decyrillic=1044,e.Deicoptic=1006,e.Delta=8710,e.Deltagreek=916,e.Dhook=394,e.Dieresis=63179,e.DieresisAcute=63180,e.DieresisGrave=63181,e.Dieresissmall=63400,e.Digammagreek=988,e.Djecyrillic=1026,e.Dlinebelow=7694,e.Dmonospace=65316,e.Dotaccentsmall=63223,e.Dslash=272,e.Dsmall=63332,e.Dtopbar=395,e.Dz=498,e.Dzcaron=453,e.Dzeabkhasiancyrillic=1248,e.Dzecyrillic=1029,e.Dzhecyrillic=1039,e.E=69,e.Eacute=201,e.Eacutesmall=63465,e.Ebreve=276,e.Ecaron=282,e.Ecedillabreve=7708,e.Echarmenian=1333,e.Ecircle=9402,e.Ecircumflex=202,e.Ecircumflexacute=7870,e.Ecircumflexbelow=7704,e.Ecircumflexdotbelow=7878,e.Ecircumflexgrave=7872,e.Ecircumflexhookabove=7874,e.Ecircumflexsmall=63466,e.Ecircumflextilde=7876,e.Ecyrillic=1028,e.Edblgrave=516,e.Edieresis=203,e.Edieresissmall=63467,e.Edot=278,e.Edotaccent=278,e.Edotbelow=7864,e.Efcyrillic=1060,e.Egrave=200,e.Egravesmall=63464,e.Eharmenian=1335,e.Ehookabove=7866,e.Eightroman=8551,e.Einvertedbreve=518,e.Eiotifiedcyrillic=1124,e.Elcyrillic=1051,e.Elevenroman=8554,e.Emacron=274,e.Emacronacute=7702,e.Emacrongrave=7700,e.Emcyrillic=1052,e.Emonospace=65317,e.Encyrillic=1053,e.Endescendercyrillic=1186,e.Eng=330,e.Enghecyrillic=1188,e.Enhookcyrillic=1223,e.Eogonek=280,e.Eopen=400,e.Epsilon=917,e.Epsilontonos=904,e.Ercyrillic=1056,e.Ereversed=398,e.Ereversedcyrillic=1069,e.Escyrillic=1057,e.Esdescendercyrillic=1194,e.Esh=425,e.Esmall=63333,e.Eta=919,e.Etarmenian=1336,e.Etatonos=905,e.Eth=208,e.Ethsmall=63472,e.Etilde=7868,e.Etildebelow=7706,e.Euro=8364,e.Ezh=439,e.Ezhcaron=494,e.Ezhreversed=440,e.F=70,e.Fcircle=9403,e.Fdotaccent=7710,e.Feharmenian=1366,e.Feicoptic=996,e.Fhook=401,e.Fitacyrillic=1138,e.Fiveroman=8548,e.Fmonospace=65318,e.Fourroman=8547,e.Fsmall=63334,e.G=71,e.GBsquare=13191,e.Gacute=500,e.Gamma=915,e.Gammaafrican=404,e.Gangiacoptic=1002,e.Gbreve=286,e.Gcaron=486,e.Gcedilla=290,e.Gcircle=9404,e.Gcircumflex=284,e.Gcommaaccent=290,e.Gdot=288,e.Gdotaccent=288,e.Gecyrillic=1043,e.Ghadarmenian=1346,e.Ghemiddlehookcyrillic=1172,e.Ghestrokecyrillic=1170,e.Gheupturncyrillic=1168,e.Ghook=403,e.Gimarmenian=1331,e.Gjecyrillic=1027,e.Gmacron=7712,e.Gmonospace=65319,e.Grave=63182,e.Gravesmall=63328,e.Gsmall=63335,e.Gsmallhook=667,e.Gstroke=484,e.H=72,e.H18533=9679,e.H18543=9642,e.H18551=9643,e.H22073=9633,e.HPsquare=13259,e.Haabkhasiancyrillic=1192,e.Hadescendercyrillic=1202,e.Hardsigncyrillic=1066,e.Hbar=294,e.Hbrevebelow=7722,e.Hcedilla=7720,e.Hcircle=9405,e.Hcircumflex=292,e.Hdieresis=7718,e.Hdotaccent=7714,e.Hdotbelow=7716,e.Hmonospace=65320,e.Hoarmenian=1344,e.Horicoptic=1e3,e.Hsmall=63336,e.Hungarumlaut=63183,e.Hungarumlautsmall=63224,e.Hzsquare=13200,e.I=73,e.IAcyrillic=1071,e.IJ=306,e.IUcyrillic=1070,e.Iacute=205,e.Iacutesmall=63469,e.Ibreve=300,e.Icaron=463,e.Icircle=9406,e.Icircumflex=206,e.Icircumflexsmall=63470,e.Icyrillic=1030,e.Idblgrave=520,e.Idieresis=207,e.Idieresisacute=7726,e.Idieresiscyrillic=1252,e.Idieresissmall=63471,e.Idot=304,e.Idotaccent=304,e.Idotbelow=7882,e.Iebrevecyrillic=1238,e.Iecyrillic=1045,e.Ifraktur=8465,e.Igrave=204,e.Igravesmall=63468,e.Ihookabove=7880,e.Iicyrillic=1048,e.Iinvertedbreve=522,e.Iishortcyrillic=1049,e.Imacron=298,e.Imacroncyrillic=1250,e.Imonospace=65321,e.Iniarmenian=1339,e.Iocyrillic=1025,e.Iogonek=302,e.Iota=921,e.Iotaafrican=406,e.Iotadieresis=938,e.Iotatonos=906,e.Ismall=63337,e.Istroke=407,e.Itilde=296,e.Itildebelow=7724,e.Izhitsacyrillic=1140,e.Izhitsadblgravecyrillic=1142,e.J=74,e.Jaarmenian=1345,e.Jcircle=9407,e.Jcircumflex=308,e.Jecyrillic=1032,e.Jheharmenian=1355,e.Jmonospace=65322,e.Jsmall=63338,e.K=75,e.KBsquare=13189,e.KKsquare=13261,e.Kabashkircyrillic=1184,e.Kacute=7728,e.Kacyrillic=1050,e.Kadescendercyrillic=1178,e.Kahookcyrillic=1219,e.Kappa=922,e.Kastrokecyrillic=1182,e.Kaverticalstrokecyrillic=1180,e.Kcaron=488,e.Kcedilla=310,e.Kcircle=9408,e.Kcommaaccent=310,e.Kdotbelow=7730,e.Keharmenian=1364,e.Kenarmenian=1343,e.Khacyrillic=1061,e.Kheicoptic=998,e.Khook=408,e.Kjecyrillic=1036,e.Klinebelow=7732,e.Kmonospace=65323,e.Koppacyrillic=1152,e.Koppagreek=990,e.Ksicyrillic=1134,e.Ksmall=63339,e.L=76,e.LJ=455,e.LL=63167,e.Lacute=313,e.Lambda=923,e.Lcaron=317,e.Lcedilla=315,e.Lcircle=9409,e.Lcircumflexbelow=7740,e.Lcommaaccent=315,e.Ldot=319,e.Ldotaccent=319,e.Ldotbelow=7734,e.Ldotbelowmacron=7736,e.Liwnarmenian=1340,e.Lj=456,e.Ljecyrillic=1033,e.Llinebelow=7738,e.Lmonospace=65324,e.Lslash=321,e.Lslashsmall=63225,e.Lsmall=63340,e.M=77,e.MBsquare=13190,e.Macron=63184,e.Macronsmall=63407,e.Macute=7742,e.Mcircle=9410,e.Mdotaccent=7744,e.Mdotbelow=7746,e.Menarmenian=1348,e.Mmonospace=65325,e.Msmall=63341,e.Mturned=412,e.Mu=924,e.N=78,e.NJ=458,e.Nacute=323,e.Ncaron=327,e.Ncedilla=325,e.Ncircle=9411,e.Ncircumflexbelow=7754,e.Ncommaaccent=325,e.Ndotaccent=7748,e.Ndotbelow=7750,e.Nhookleft=413,e.Nineroman=8552,e.Nj=459,e.Njecyrillic=1034,e.Nlinebelow=7752,e.Nmonospace=65326,e.Nowarmenian=1350,e.Nsmall=63342,e.Ntilde=209,e.Ntildesmall=63473,e.Nu=925,e.O=79,e.OE=338,e.OEsmall=63226,e.Oacute=211,e.Oacutesmall=63475,e.Obarredcyrillic=1256,e.Obarreddieresiscyrillic=1258,e.Obreve=334,e.Ocaron=465,e.Ocenteredtilde=415,e.Ocircle=9412,e.Ocircumflex=212,e.Ocircumflexacute=7888,e.Ocircumflexdotbelow=7896,e.Ocircumflexgrave=7890,e.Ocircumflexhookabove=7892,e.Ocircumflexsmall=63476,e.Ocircumflextilde=7894,e.Ocyrillic=1054,e.Odblacute=336,e.Odblgrave=524,e.Odieresis=214,e.Odieresiscyrillic=1254,e.Odieresissmall=63478,e.Odotbelow=7884,e.Ogoneksmall=63227,e.Ograve=210,e.Ogravesmall=63474,e.Oharmenian=1365,e.Ohm=8486,e.Ohookabove=7886,e.Ohorn=416,e.Ohornacute=7898,e.Ohorndotbelow=7906,e.Ohorngrave=7900,e.Ohornhookabove=7902,e.Ohorntilde=7904,e.Ohungarumlaut=336,e.Oi=418,e.Oinvertedbreve=526,e.Omacron=332,e.Omacronacute=7762,e.Omacrongrave=7760,e.Omega=8486,e.Omegacyrillic=1120,e.Omegagreek=937,e.Omegaroundcyrillic=1146,e.Omegatitlocyrillic=1148,e.Omegatonos=911,e.Omicron=927,e.Omicrontonos=908,e.Omonospace=65327,e.Oneroman=8544,e.Oogonek=490,e.Oogonekmacron=492,e.Oopen=390,e.Oslash=216,e.Oslashacute=510,e.Oslashsmall=63480,e.Osmall=63343,e.Ostrokeacute=510,e.Otcyrillic=1150,e.Otilde=213,e.Otildeacute=7756,e.Otildedieresis=7758,e.Otildesmall=63477,e.P=80,e.Pacute=7764,e.Pcircle=9413,e.Pdotaccent=7766,e.Pecyrillic=1055,e.Peharmenian=1354,e.Pemiddlehookcyrillic=1190,e.Phi=934,e.Phook=420,e.Pi=928,e.Piwrarmenian=1363,e.Pmonospace=65328,e.Psi=936,e.Psicyrillic=1136,e.Psmall=63344,e.Q=81,e.Qcircle=9414,e.Qmonospace=65329,e.Qsmall=63345,e.R=82,e.Raarmenian=1356,e.Racute=340,e.Rcaron=344,e.Rcedilla=342,e.Rcircle=9415,e.Rcommaaccent=342,e.Rdblgrave=528,e.Rdotaccent=7768,e.Rdotbelow=7770,e.Rdotbelowmacron=7772,e.Reharmenian=1360,e.Rfraktur=8476,e.Rho=929,e.Ringsmall=63228,e.Rinvertedbreve=530,e.Rlinebelow=7774,e.Rmonospace=65330,e.Rsmall=63346,e.Rsmallinverted=641,e.Rsmallinvertedsuperior=694,e.S=83,e.SF010000=9484,e.SF020000=9492,e.SF030000=9488,e.SF040000=9496,e.SF050000=9532,e.SF060000=9516,e.SF070000=9524,e.SF080000=9500,e.SF090000=9508,e.SF100000=9472,e.SF110000=9474,e.SF190000=9569,e.SF200000=9570,e.SF210000=9558,e.SF220000=9557,e.SF230000=9571,e.SF240000=9553,e.SF250000=9559,e.SF260000=9565,e.SF270000=9564,e.SF280000=9563,e.SF360000=9566,e.SF370000=9567,e.SF380000=9562,e.SF390000=9556,e.SF400000=9577,e.SF410000=9574,e.SF420000=9568,e.SF430000=9552,e.SF440000=9580,e.SF450000=9575,e.SF460000=9576,e.SF470000=9572,e.SF480000=9573,e.SF490000=9561,e.SF500000=9560,e.SF510000=9554,e.SF520000=9555,e.SF530000=9579,e.SF540000=9578,e.Sacute=346,e.Sacutedotaccent=7780,e.Sampigreek=992,e.Scaron=352,e.Scarondotaccent=7782,e.Scaronsmall=63229,e.Scedilla=350,e.Schwa=399,e.Schwacyrillic=1240,e.Schwadieresiscyrillic=1242,e.Scircle=9416,e.Scircumflex=348,e.Scommaaccent=536,e.Sdotaccent=7776,e.Sdotbelow=7778,e.Sdotbelowdotaccent=7784,e.Seharmenian=1357,e.Sevenroman=8550,e.Shaarmenian=1351,e.Shacyrillic=1064,e.Shchacyrillic=1065,e.Sheicoptic=994,e.Shhacyrillic=1210,e.Shimacoptic=1004,e.Sigma=931,e.Sixroman=8549,e.Smonospace=65331,e.Softsigncyrillic=1068,e.Ssmall=63347,e.Stigmagreek=986,e.T=84,e.Tau=932,e.Tbar=358,e.Tcaron=356,e.Tcedilla=354,e.Tcircle=9417,e.Tcircumflexbelow=7792,e.Tcommaaccent=354,e.Tdotaccent=7786,e.Tdotbelow=7788,e.Tecyrillic=1058,e.Tedescendercyrillic=1196,e.Tenroman=8553,e.Tetsecyrillic=1204,e.Theta=920,e.Thook=428,e.Thorn=222,e.Thornsmall=63486,e.Threeroman=8546,e.Tildesmall=63230,e.Tiwnarmenian=1359,e.Tlinebelow=7790,e.Tmonospace=65332,e.Toarmenian=1337,e.Tonefive=444,e.Tonesix=388,e.Tonetwo=423,e.Tretroflexhook=430,e.Tsecyrillic=1062,e.Tshecyrillic=1035,e.Tsmall=63348,e.Twelveroman=8555,e.Tworoman=8545,e.U=85,e.Uacute=218,e.Uacutesmall=63482,e.Ubreve=364,e.Ucaron=467,e.Ucircle=9418,e.Ucircumflex=219,e.Ucircumflexbelow=7798,e.Ucircumflexsmall=63483,e.Ucyrillic=1059,e.Udblacute=368,e.Udblgrave=532,e.Udieresis=220,e.Udieresisacute=471,e.Udieresisbelow=7794,e.Udieresiscaron=473,e.Udieresiscyrillic=1264,e.Udieresisgrave=475,e.Udieresismacron=469,e.Udieresissmall=63484,e.Udotbelow=7908,e.Ugrave=217,e.Ugravesmall=63481,e.Uhookabove=7910,e.Uhorn=431,e.Uhornacute=7912,e.Uhorndotbelow=7920,e.Uhorngrave=7914,e.Uhornhookabove=7916,e.Uhorntilde=7918,e.Uhungarumlaut=368,e.Uhungarumlautcyrillic=1266,e.Uinvertedbreve=534,e.Ukcyrillic=1144,e.Umacron=362,e.Umacroncyrillic=1262,e.Umacrondieresis=7802,e.Umonospace=65333,e.Uogonek=370,e.Upsilon=933,e.Upsilon1=978,e.Upsilonacutehooksymbolgreek=979,e.Upsilonafrican=433,e.Upsilondieresis=939,e.Upsilondieresishooksymbolgreek=980,e.Upsilonhooksymbol=978,e.Upsilontonos=910,e.Uring=366,e.Ushortcyrillic=1038,e.Usmall=63349,e.Ustraightcyrillic=1198,e.Ustraightstrokecyrillic=1200,e.Utilde=360,e.Utildeacute=7800,e.Utildebelow=7796,e.V=86,e.Vcircle=9419,e.Vdotbelow=7806,e.Vecyrillic=1042,e.Vewarmenian=1358,e.Vhook=434,e.Vmonospace=65334,e.Voarmenian=1352,e.Vsmall=63350,e.Vtilde=7804,e.W=87,e.Wacute=7810,e.Wcircle=9420,e.Wcircumflex=372,e.Wdieresis=7812,e.Wdotaccent=7814,e.Wdotbelow=7816,e.Wgrave=7808,e.Wmonospace=65335,e.Wsmall=63351,e.X=88,e.Xcircle=9421,e.Xdieresis=7820,e.Xdotaccent=7818,e.Xeharmenian=1341,e.Xi=926,e.Xmonospace=65336,e.Xsmall=63352,e.Y=89,e.Yacute=221,e.Yacutesmall=63485,e.Yatcyrillic=1122,e.Ycircle=9422,e.Ycircumflex=374,e.Ydieresis=376,e.Ydieresissmall=63487,e.Ydotaccent=7822,e.Ydotbelow=7924,e.Yericyrillic=1067,e.Yerudieresiscyrillic=1272,e.Ygrave=7922,e.Yhook=435,e.Yhookabove=7926,e.Yiarmenian=1349,e.Yicyrillic=1031,e.Yiwnarmenian=1362,e.Ymonospace=65337,e.Ysmall=63353,e.Ytilde=7928,e.Yusbigcyrillic=1130,e.Yusbigiotifiedcyrillic=1132,e.Yuslittlecyrillic=1126,e.Yuslittleiotifiedcyrillic=1128,e.Z=90,e.Zaarmenian=1334,e.Zacute=377,e.Zcaron=381,e.Zcaronsmall=63231,e.Zcircle=9423,e.Zcircumflex=7824,e.Zdot=379,e.Zdotaccent=379,e.Zdotbelow=7826,e.Zecyrillic=1047,e.Zedescendercyrillic=1176,e.Zedieresiscyrillic=1246,e.Zeta=918,e.Zhearmenian=1338,e.Zhebrevecyrillic=1217,e.Zhecyrillic=1046,e.Zhedescendercyrillic=1174,e.Zhedieresiscyrillic=1244,e.Zlinebelow=7828,e.Zmonospace=65338,e.Zsmall=63354,e.Zstroke=437,e.a=97,e.aabengali=2438,e.aacute=225,e.aadeva=2310,e.aagujarati=2694,e.aagurmukhi=2566,e.aamatragurmukhi=2622,e.aarusquare=13059,e.aavowelsignbengali=2494,e.aavowelsigndeva=2366,e.aavowelsigngujarati=2750,e.abbreviationmarkarmenian=1375,e.abbreviationsigndeva=2416,e.abengali=2437,e.abopomofo=12570,e.abreve=259,e.abreveacute=7855,e.abrevecyrillic=1233,e.abrevedotbelow=7863,e.abrevegrave=7857,e.abrevehookabove=7859,e.abrevetilde=7861,e.acaron=462,e.acircle=9424,e.acircumflex=226,e.acircumflexacute=7845,e.acircumflexdotbelow=7853,e.acircumflexgrave=7847,e.acircumflexhookabove=7849,e.acircumflextilde=7851,e.acute=180,e.acutebelowcmb=791,e.acutecmb=769,e.acutecomb=769,e.acutedeva=2388,e.acutelowmod=719,e.acutetonecmb=833,e.acyrillic=1072,e.adblgrave=513,e.addakgurmukhi=2673,e.adeva=2309,e.adieresis=228,e.adieresiscyrillic=1235,e.adieresismacron=479,e.adotbelow=7841,e.adotmacron=481,e.ae=230,e.aeacute=509,e.aekorean=12624,e.aemacron=483,e.afii00208=8213,e.afii08941=8356,e.afii10017=1040,e.afii10018=1041,e.afii10019=1042,e.afii10020=1043,e.afii10021=1044,e.afii10022=1045,e.afii10023=1025,e.afii10024=1046,e.afii10025=1047,e.afii10026=1048,e.afii10027=1049,e.afii10028=1050,e.afii10029=1051,e.afii10030=1052,e.afii10031=1053,e.afii10032=1054,e.afii10033=1055,e.afii10034=1056,e.afii10035=1057,e.afii10036=1058,e.afii10037=1059,e.afii10038=1060,e.afii10039=1061,e.afii10040=1062,e.afii10041=1063,e.afii10042=1064,e.afii10043=1065,e.afii10044=1066,e.afii10045=1067,e.afii10046=1068,e.afii10047=1069,e.afii10048=1070,e.afii10049=1071,e.afii10050=1168,e.afii10051=1026,e.afii10052=1027,e.afii10053=1028,e.afii10054=1029,e.afii10055=1030,e.afii10056=1031,e.afii10057=1032,e.afii10058=1033,e.afii10059=1034,e.afii10060=1035,e.afii10061=1036,e.afii10062=1038,e.afii10063=63172,e.afii10064=63173,e.afii10065=1072,e.afii10066=1073,e.afii10067=1074,e.afii10068=1075,e.afii10069=1076,e.afii10070=1077,e.afii10071=1105,e.afii10072=1078,e.afii10073=1079,e.afii10074=1080,e.afii10075=1081,e.afii10076=1082,e.afii10077=1083,e.afii10078=1084,e.afii10079=1085,e.afii10080=1086,e.afii10081=1087,e.afii10082=1088,e.afii10083=1089,e.afii10084=1090,e.afii10085=1091,e.afii10086=1092,e.afii10087=1093,e.afii10088=1094,e.afii10089=1095,e.afii10090=1096,e.afii10091=1097,e.afii10092=1098,e.afii10093=1099,e.afii10094=1100,e.afii10095=1101,e.afii10096=1102,e.afii10097=1103,e.afii10098=1169,e.afii10099=1106,e.afii10100=1107,e.afii10101=1108,e.afii10102=1109,e.afii10103=1110,e.afii10104=1111,e.afii10105=1112,e.afii10106=1113,e.afii10107=1114,e.afii10108=1115,e.afii10109=1116,e.afii10110=1118,e.afii10145=1039,e.afii10146=1122,e.afii10147=1138,e.afii10148=1140,e.afii10192=63174,e.afii10193=1119,e.afii10194=1123,e.afii10195=1139,e.afii10196=1141,e.afii10831=63175,e.afii10832=63176,e.afii10846=1241,e.afii299=8206,e.afii300=8207,e.afii301=8205,e.afii57381=1642,e.afii57388=1548,e.afii57392=1632,e.afii57393=1633,e.afii57394=1634,e.afii57395=1635,e.afii57396=1636,e.afii57397=1637,e.afii57398=1638,e.afii57399=1639,e.afii57400=1640,e.afii57401=1641,e.afii57403=1563,e.afii57407=1567,e.afii57409=1569,e.afii57410=1570,e.afii57411=1571,e.afii57412=1572,e.afii57413=1573,e.afii57414=1574,e.afii57415=1575,e.afii57416=1576,e.afii57417=1577,e.afii57418=1578,e.afii57419=1579,e.afii57420=1580,e.afii57421=1581,e.afii57422=1582,e.afii57423=1583,e.afii57424=1584,e.afii57425=1585,e.afii57426=1586,e.afii57427=1587,e.afii57428=1588,e.afii57429=1589,e.afii57430=1590,e.afii57431=1591,e.afii57432=1592,e.afii57433=1593,e.afii57434=1594,e.afii57440=1600,e.afii57441=1601,e.afii57442=1602,e.afii57443=1603,e.afii57444=1604,e.afii57445=1605,e.afii57446=1606,e.afii57448=1608,e.afii57449=1609,e.afii57450=1610,e.afii57451=1611,e.afii57452=1612,e.afii57453=1613,e.afii57454=1614,e.afii57455=1615,e.afii57456=1616,e.afii57457=1617,e.afii57458=1618,e.afii57470=1607,e.afii57505=1700,e.afii57506=1662,e.afii57507=1670,e.afii57508=1688,e.afii57509=1711,e.afii57511=1657,e.afii57512=1672,e.afii57513=1681,e.afii57514=1722,e.afii57519=1746,e.afii57534=1749,e.afii57636=8362,e.afii57645=1470,e.afii57658=1475,e.afii57664=1488,e.afii57665=1489,e.afii57666=1490,e.afii57667=1491,e.afii57668=1492,e.afii57669=1493,e.afii57670=1494,e.afii57671=1495,e.afii57672=1496,e.afii57673=1497,e.afii57674=1498,e.afii57675=1499,e.afii57676=1500,e.afii57677=1501,e.afii57678=1502,e.afii57679=1503,e.afii57680=1504,e.afii57681=1505,e.afii57682=1506,e.afii57683=1507,e.afii57684=1508,e.afii57685=1509,e.afii57686=1510,e.afii57687=1511,e.afii57688=1512,e.afii57689=1513,e.afii57690=1514,e.afii57694=64298,e.afii57695=64299,e.afii57700=64331,e.afii57705=64287,e.afii57716=1520,e.afii57717=1521,e.afii57718=1522,e.afii57723=64309,e.afii57793=1460,e.afii57794=1461,e.afii57795=1462,e.afii57796=1467,e.afii57797=1464,e.afii57798=1463,e.afii57799=1456,e.afii57800=1458,e.afii57801=1457,e.afii57802=1459,e.afii57803=1474,e.afii57804=1473,e.afii57806=1465,e.afii57807=1468,e.afii57839=1469,e.afii57841=1471,e.afii57842=1472,e.afii57929=700,e.afii61248=8453,e.afii61289=8467,e.afii61352=8470,e.afii61573=8236,e.afii61574=8237,e.afii61575=8238,e.afii61664=8204,e.afii63167=1645,e.afii64937=701,e.agrave=224,e.agujarati=2693,e.agurmukhi=2565,e.ahiragana=12354,e.ahookabove=7843,e.aibengali=2448,e.aibopomofo=12574,e.aideva=2320,e.aiecyrillic=1237,e.aigujarati=2704,e.aigurmukhi=2576,e.aimatragurmukhi=2632,e.ainarabic=1593,e.ainfinalarabic=65226,e.aininitialarabic=65227,e.ainmedialarabic=65228,e.ainvertedbreve=515,e.aivowelsignbengali=2504,e.aivowelsigndeva=2376,e.aivowelsigngujarati=2760,e.akatakana=12450,e.akatakanahalfwidth=65393,e.akorean=12623,e.alef=1488,e.alefarabic=1575,e.alefdageshhebrew=64304,e.aleffinalarabic=65166,e.alefhamzaabovearabic=1571,e.alefhamzaabovefinalarabic=65156,e.alefhamzabelowarabic=1573,e.alefhamzabelowfinalarabic=65160,e.alefhebrew=1488,e.aleflamedhebrew=64335,e.alefmaddaabovearabic=1570,e.alefmaddaabovefinalarabic=65154,e.alefmaksuraarabic=1609,e.alefmaksurafinalarabic=65264,e.alefmaksurainitialarabic=65267,e.alefmaksuramedialarabic=65268,e.alefpatahhebrew=64302,e.alefqamatshebrew=64303,e.aleph=8501,e.allequal=8780,e.alpha=945,e.alphatonos=940,e.amacron=257,e.amonospace=65345,e.ampersand=38,e.ampersandmonospace=65286,e.ampersandsmall=63270,e.amsquare=13250,e.anbopomofo=12578,e.angbopomofo=12580,e.angbracketleft=12296,e.angbracketright=12297,e.angkhankhuthai=3674,e.angle=8736,e.anglebracketleft=12296,e.anglebracketleftvertical=65087,e.anglebracketright=12297,e.anglebracketrightvertical=65088,e.angleleft=9001,e.angleright=9002,e.angstrom=8491,e.anoteleia=903,e.anudattadeva=2386,e.anusvarabengali=2434,e.anusvaradeva=2306,e.anusvaragujarati=2690,e.aogonek=261,e.apaatosquare=13056,e.aparen=9372,e.apostrophearmenian=1370,e.apostrophemod=700,e.apple=63743,e.approaches=8784,e.approxequal=8776,e.approxequalorimage=8786,e.approximatelyequal=8773,e.araeaekorean=12686,e.araeakorean=12685,e.arc=8978,e.arighthalfring=7834,e.aring=229,e.aringacute=507,e.aringbelow=7681,e.arrowboth=8596,e.arrowdashdown=8675,e.arrowdashleft=8672,e.arrowdashright=8674,e.arrowdashup=8673,e.arrowdblboth=8660,e.arrowdbldown=8659,e.arrowdblleft=8656,e.arrowdblright=8658,e.arrowdblup=8657,e.arrowdown=8595,e.arrowdownleft=8601,e.arrowdownright=8600,e.arrowdownwhite=8681,e.arrowheaddownmod=709,e.arrowheadleftmod=706,e.arrowheadrightmod=707,e.arrowheadupmod=708,e.arrowhorizex=63719,e.arrowleft=8592,e.arrowleftdbl=8656,e.arrowleftdblstroke=8653,e.arrowleftoverright=8646,e.arrowleftwhite=8678,e.arrowright=8594,e.arrowrightdblstroke=8655,e.arrowrightheavy=10142,e.arrowrightoverleft=8644,e.arrowrightwhite=8680,e.arrowtableft=8676,e.arrowtabright=8677,e.arrowup=8593,e.arrowupdn=8597,e.arrowupdnbse=8616,e.arrowupdownbase=8616,e.arrowupleft=8598,e.arrowupleftofdown=8645,e.arrowupright=8599,e.arrowupwhite=8679,e.arrowvertex=63718,e.asciicircum=94,e.asciicircummonospace=65342,e.asciitilde=126,e.asciitildemonospace=65374,e.ascript=593,e.ascriptturned=594,e.asmallhiragana=12353,e.asmallkatakana=12449,e.asmallkatakanahalfwidth=65383,e.asterisk=42,e.asteriskaltonearabic=1645,e.asteriskarabic=1645,e.asteriskmath=8727,e.asteriskmonospace=65290,e.asterisksmall=65121,e.asterism=8258,e.asuperior=63209,e.asymptoticallyequal=8771,e.at=64,e.atilde=227,e.atmonospace=65312,e.atsmall=65131,e.aturned=592,e.aubengali=2452,e.aubopomofo=12576,e.audeva=2324,e.augujarati=2708,e.augurmukhi=2580,e.aulengthmarkbengali=2519,e.aumatragurmukhi=2636,e.auvowelsignbengali=2508,e.auvowelsigndeva=2380,e.auvowelsigngujarati=2764,e.avagrahadeva=2365,e.aybarmenian=1377,e.ayin=1506,e.ayinaltonehebrew=64288,e.ayinhebrew=1506,e.b=98,e.babengali=2476,e.backslash=92,e.backslashmonospace=65340,e.badeva=2348,e.bagujarati=2732,e.bagurmukhi=2604,e.bahiragana=12400,e.bahtthai=3647,e.bakatakana=12496,e.bar=124,e.barmonospace=65372,e.bbopomofo=12549,e.bcircle=9425,e.bdotaccent=7683,e.bdotbelow=7685,e.beamedsixteenthnotes=9836,e.because=8757,e.becyrillic=1073,e.beharabic=1576,e.behfinalarabic=65168,e.behinitialarabic=65169,e.behiragana=12409,e.behmedialarabic=65170,e.behmeeminitialarabic=64671,e.behmeemisolatedarabic=64520,e.behnoonfinalarabic=64621,e.bekatakana=12505,e.benarmenian=1378,e.bet=1489,e.beta=946,e.betasymbolgreek=976,e.betdagesh=64305,e.betdageshhebrew=64305,e.bethebrew=1489,e.betrafehebrew=64332,e.bhabengali=2477,e.bhadeva=2349,e.bhagujarati=2733,e.bhagurmukhi=2605,e.bhook=595,e.bihiragana=12403,e.bikatakana=12499,e.bilabialclick=664,e.bindigurmukhi=2562,e.birusquare=13105,e.blackcircle=9679,e.blackdiamond=9670,e.blackdownpointingtriangle=9660,e.blackleftpointingpointer=9668,e.blackleftpointingtriangle=9664,e.blacklenticularbracketleft=12304,e.blacklenticularbracketleftvertical=65083,e.blacklenticularbracketright=12305,e.blacklenticularbracketrightvertical=65084,e.blacklowerlefttriangle=9699,e.blacklowerrighttriangle=9698,e.blackrectangle=9644,e.blackrightpointingpointer=9658,e.blackrightpointingtriangle=9654,e.blacksmallsquare=9642,e.blacksmilingface=9787,e.blacksquare=9632,e.blackstar=9733,e.blackupperlefttriangle=9700,e.blackupperrighttriangle=9701,e.blackuppointingsmalltriangle=9652,e.blackuppointingtriangle=9650,e.blank=9251,e.blinebelow=7687,e.block=9608,e.bmonospace=65346,e.bobaimaithai=3610,e.bohiragana=12412,e.bokatakana=12508,e.bparen=9373,e.bqsquare=13251,e.braceex=63732,e.braceleft=123,e.braceleftbt=63731,e.braceleftmid=63730,e.braceleftmonospace=65371,e.braceleftsmall=65115,e.bracelefttp=63729,e.braceleftvertical=65079,e.braceright=125,e.bracerightbt=63742,e.bracerightmid=63741,e.bracerightmonospace=65373,e.bracerightsmall=65116,e.bracerighttp=63740,e.bracerightvertical=65080,e.bracketleft=91,e.bracketleftbt=63728,e.bracketleftex=63727,e.bracketleftmonospace=65339,e.bracketlefttp=63726,e.bracketright=93,e.bracketrightbt=63739,e.bracketrightex=63738,e.bracketrightmonospace=65341,e.bracketrighttp=63737,e.breve=728,e.brevebelowcmb=814,e.brevecmb=774,e.breveinvertedbelowcmb=815,e.breveinvertedcmb=785,e.breveinverteddoublecmb=865,e.bridgebelowcmb=810,e.bridgeinvertedbelowcmb=826,e.brokenbar=166,e.bstroke=384,e.bsuperior=63210,e.btopbar=387,e.buhiragana=12406,e.bukatakana=12502,e.bullet=8226,e.bulletinverse=9688,e.bulletoperator=8729,e.bullseye=9678,e.c=99,e.caarmenian=1390,e.cabengali=2458,e.cacute=263,e.cadeva=2330,e.cagujarati=2714,e.cagurmukhi=2586,e.calsquare=13192,e.candrabindubengali=2433,e.candrabinducmb=784,e.candrabindudeva=2305,e.candrabindugujarati=2689,e.capslock=8682,e.careof=8453,e.caron=711,e.caronbelowcmb=812,e.caroncmb=780,e.carriagereturn=8629,e.cbopomofo=12568,e.ccaron=269,e.ccedilla=231,e.ccedillaacute=7689,e.ccircle=9426,e.ccircumflex=265,e.ccurl=597,e.cdot=267,e.cdotaccent=267,e.cdsquare=13253,e.cedilla=184,e.cedillacmb=807,e.cent=162,e.centigrade=8451,e.centinferior=63199,e.centmonospace=65504,e.centoldstyle=63394,e.centsuperior=63200,e.chaarmenian=1401,e.chabengali=2459,e.chadeva=2331,e.chagujarati=2715,e.chagurmukhi=2587,e.chbopomofo=12564,e.cheabkhasiancyrillic=1213,e.checkmark=10003,e.checyrillic=1095,e.chedescenderabkhasiancyrillic=1215,e.chedescendercyrillic=1207,e.chedieresiscyrillic=1269,e.cheharmenian=1395,e.chekhakassiancyrillic=1228,e.cheverticalstrokecyrillic=1209,e.chi=967,e.chieuchacirclekorean=12919,e.chieuchaparenkorean=12823,e.chieuchcirclekorean=12905,e.chieuchkorean=12618,e.chieuchparenkorean=12809,e.chochangthai=3594,e.chochanthai=3592,e.chochingthai=3593,e.chochoethai=3596,e.chook=392,e.cieucacirclekorean=12918,e.cieucaparenkorean=12822,e.cieuccirclekorean=12904,e.cieuckorean=12616,e.cieucparenkorean=12808,e.cieucuparenkorean=12828,e.circle=9675,e.circlecopyrt=169,e.circlemultiply=8855,e.circleot=8857,e.circleplus=8853,e.circlepostalmark=12342,e.circlewithlefthalfblack=9680,e.circlewithrighthalfblack=9681,e.circumflex=710,e.circumflexbelowcmb=813,e.circumflexcmb=770,e.clear=8999,e.clickalveolar=450,e.clickdental=448,e.clicklateral=449,e.clickretroflex=451,e.club=9827,e.clubsuitblack=9827,e.clubsuitwhite=9831,e.cmcubedsquare=13220,e.cmonospace=65347,e.cmsquaredsquare=13216,e.coarmenian=1409,e.colon=58,e.colonmonetary=8353,e.colonmonospace=65306,e.colonsign=8353,e.colonsmall=65109,e.colontriangularhalfmod=721,e.colontriangularmod=720,e.comma=44,e.commaabovecmb=787,e.commaaboverightcmb=789,e.commaaccent=63171,e.commaarabic=1548,e.commaarmenian=1373,e.commainferior=63201,e.commamonospace=65292,e.commareversedabovecmb=788,e.commareversedmod=701,e.commasmall=65104,e.commasuperior=63202,e.commaturnedabovecmb=786,e.commaturnedmod=699,e.compass=9788,e.congruent=8773,e.contourintegral=8750,e.control=8963,e.controlACK=6,e.controlBEL=7,e.controlBS=8,e.controlCAN=24,e.controlCR=13,e.controlDC1=17,e.controlDC2=18,e.controlDC3=19,e.controlDC4=20,e.controlDEL=127,e.controlDLE=16,e.controlEM=25,e.controlENQ=5,e.controlEOT=4,e.controlESC=27,e.controlETB=23,e.controlETX=3,e.controlFF=12,e.controlFS=28,e.controlGS=29,e.controlHT=9,e.controlLF=10,e.controlNAK=21,e.controlNULL=0,e.controlRS=30,e.controlSI=15,e.controlSO=14,e.controlSOT=2,e.controlSTX=1,e.controlSUB=26,e.controlSYN=22,e.controlUS=31,e.controlVT=11,e.copyright=169,e.copyrightsans=63721,e.copyrightserif=63193,e.cornerbracketleft=12300,e.cornerbracketlefthalfwidth=65378,e.cornerbracketleftvertical=65089,e.cornerbracketright=12301,e.cornerbracketrighthalfwidth=65379,e.cornerbracketrightvertical=65090,e.corporationsquare=13183,e.cosquare=13255,e.coverkgsquare=13254,e.cparen=9374,e.cruzeiro=8354,e.cstretched=663,e.curlyand=8911,e.curlyor=8910,e.currency=164,e.cyrBreve=63185,e.cyrFlex=63186,e.cyrbreve=63188,e.cyrflex=63189,e.d=100,e.daarmenian=1380,e.dabengali=2470,e.dadarabic=1590,e.dadeva=2342,e.dadfinalarabic=65214,e.dadinitialarabic=65215,e.dadmedialarabic=65216,e.dagesh=1468,e.dageshhebrew=1468,e.dagger=8224,e.daggerdbl=8225,e.dagujarati=2726,e.dagurmukhi=2598,e.dahiragana=12384,e.dakatakana=12480,e.dalarabic=1583,e.dalet=1491,e.daletdagesh=64307,e.daletdageshhebrew=64307,e.dalethebrew=1491,e.dalfinalarabic=65194,e.dammaarabic=1615,e.dammalowarabic=1615,e.dammatanaltonearabic=1612,e.dammatanarabic=1612,e.danda=2404,e.dargahebrew=1447,e.dargalefthebrew=1447,e.dasiapneumatacyrilliccmb=1157,e.dblGrave=63187,e.dblanglebracketleft=12298,e.dblanglebracketleftvertical=65085,e.dblanglebracketright=12299,e.dblanglebracketrightvertical=65086,e.dblarchinvertedbelowcmb=811,e.dblarrowleft=8660,e.dblarrowright=8658,e.dbldanda=2405,e.dblgrave=63190,e.dblgravecmb=783,e.dblintegral=8748,e.dbllowline=8215,e.dbllowlinecmb=819,e.dbloverlinecmb=831,e.dblprimemod=698,e.dblverticalbar=8214,e.dblverticallineabovecmb=782,e.dbopomofo=12553,e.dbsquare=13256,e.dcaron=271,e.dcedilla=7697,e.dcircle=9427,e.dcircumflexbelow=7699,e.dcroat=273,e.ddabengali=2465,e.ddadeva=2337,e.ddagujarati=2721,e.ddagurmukhi=2593,e.ddalarabic=1672,e.ddalfinalarabic=64393,e.dddhadeva=2396,e.ddhabengali=2466,e.ddhadeva=2338,e.ddhagujarati=2722,e.ddhagurmukhi=2594,e.ddotaccent=7691,e.ddotbelow=7693,e.decimalseparatorarabic=1643,e.decimalseparatorpersian=1643,e.decyrillic=1076,e.degree=176,e.dehihebrew=1453,e.dehiragana=12391,e.deicoptic=1007,e.dekatakana=12487,e.deleteleft=9003,e.deleteright=8998,e.delta=948,e.deltaturned=397,e.denominatorminusonenumeratorbengali=2552,e.dezh=676,e.dhabengali=2471,e.dhadeva=2343,e.dhagujarati=2727,e.dhagurmukhi=2599,e.dhook=599,e.dialytikatonos=901,e.dialytikatonoscmb=836,e.diamond=9830,e.diamondsuitwhite=9826,e.dieresis=168,e.dieresisacute=63191,e.dieresisbelowcmb=804,e.dieresiscmb=776,e.dieresisgrave=63192,e.dieresistonos=901,e.dihiragana=12386,e.dikatakana=12482,e.dittomark=12291,e.divide=247,e.divides=8739,e.divisionslash=8725,e.djecyrillic=1106,e.dkshade=9619,e.dlinebelow=7695,e.dlsquare=13207,e.dmacron=273,e.dmonospace=65348,e.dnblock=9604,e.dochadathai=3598,e.dodekthai=3604,e.dohiragana=12393,e.dokatakana=12489,e.dollar=36,e.dollarinferior=63203,e.dollarmonospace=65284,e.dollaroldstyle=63268,e.dollarsmall=65129,e.dollarsuperior=63204,e.dong=8363,e.dorusquare=13094,e.dotaccent=729,e.dotaccentcmb=775,e.dotbelowcmb=803,e.dotbelowcomb=803,e.dotkatakana=12539,e.dotlessi=305,e.dotlessj=63166,e.dotlessjstrokehook=644,e.dotmath=8901,e.dottedcircle=9676,e.doubleyodpatah=64287,e.doubleyodpatahhebrew=64287,e.downtackbelowcmb=798,e.downtackmod=725,e.dparen=9375,e.dsuperior=63211,e.dtail=598,e.dtopbar=396,e.duhiragana=12389,e.dukatakana=12485,e.dz=499,e.dzaltone=675,e.dzcaron=454,e.dzcurl=677,e.dzeabkhasiancyrillic=1249,e.dzecyrillic=1109,e.dzhecyrillic=1119,e.e=101,e.eacute=233,e.earth=9793,e.ebengali=2447,e.ebopomofo=12572,e.ebreve=277,e.ecandradeva=2317,e.ecandragujarati=2701,e.ecandravowelsigndeva=2373,e.ecandravowelsigngujarati=2757,e.ecaron=283,e.ecedillabreve=7709,e.echarmenian=1381,e.echyiwnarmenian=1415,e.ecircle=9428,e.ecircumflex=234,e.ecircumflexacute=7871,e.ecircumflexbelow=7705,e.ecircumflexdotbelow=7879,e.ecircumflexgrave=7873,e.ecircumflexhookabove=7875,e.ecircumflextilde=7877,e.ecyrillic=1108,e.edblgrave=517,e.edeva=2319,e.edieresis=235,e.edot=279,e.edotaccent=279,e.edotbelow=7865,e.eegurmukhi=2575,e.eematragurmukhi=2631,e.efcyrillic=1092,e.egrave=232,e.egujarati=2703,e.eharmenian=1383,e.ehbopomofo=12573,e.ehiragana=12360,e.ehookabove=7867,e.eibopomofo=12575,e.eight=56,e.eightarabic=1640,e.eightbengali=2542,e.eightcircle=9319,e.eightcircleinversesansserif=10129,e.eightdeva=2414,e.eighteencircle=9329,e.eighteenparen=9349,e.eighteenperiod=9369,e.eightgujarati=2798,e.eightgurmukhi=2670,e.eighthackarabic=1640,e.eighthangzhou=12328,e.eighthnotebeamed=9835,e.eightideographicparen=12839,e.eightinferior=8328,e.eightmonospace=65304,e.eightoldstyle=63288,e.eightparen=9339,e.eightperiod=9359,e.eightpersian=1784,e.eightroman=8567,e.eightsuperior=8312,e.eightthai=3672,e.einvertedbreve=519,e.eiotifiedcyrillic=1125,e.ekatakana=12456,e.ekatakanahalfwidth=65396,e.ekonkargurmukhi=2676,e.ekorean=12628,e.elcyrillic=1083,e.element=8712,e.elevencircle=9322,e.elevenparen=9342,e.elevenperiod=9362,e.elevenroman=8570,e.ellipsis=8230,e.ellipsisvertical=8942,e.emacron=275,e.emacronacute=7703,e.emacrongrave=7701,e.emcyrillic=1084,e.emdash=8212,e.emdashvertical=65073,e.emonospace=65349,e.emphasismarkarmenian=1371,e.emptyset=8709,e.enbopomofo=12579,e.encyrillic=1085,
e.endash=8211,e.endashvertical=65074,e.endescendercyrillic=1187,e.eng=331,e.engbopomofo=12581,e.enghecyrillic=1189,e.enhookcyrillic=1224,e.enspace=8194,e.eogonek=281,e.eokorean=12627,e.eopen=603,e.eopenclosed=666,e.eopenreversed=604,e.eopenreversedclosed=606,e.eopenreversedhook=605,e.eparen=9376,e.epsilon=949,e.epsilontonos=941,e.equal=61,e.equalmonospace=65309,e.equalsmall=65126,e.equalsuperior=8316,e.equivalence=8801,e.erbopomofo=12582,e.ercyrillic=1088,e.ereversed=600,e.ereversedcyrillic=1101,e.escyrillic=1089,e.esdescendercyrillic=1195,e.esh=643,e.eshcurl=646,e.eshortdeva=2318,e.eshortvowelsigndeva=2374,e.eshreversedloop=426,e.eshsquatreversed=645,e.esmallhiragana=12359,e.esmallkatakana=12455,e.esmallkatakanahalfwidth=65386,e.estimated=8494,e.esuperior=63212,e.eta=951,e.etarmenian=1384,e.etatonos=942,e.eth=240,e.etilde=7869,e.etildebelow=7707,e.etnahtafoukhhebrew=1425,e.etnahtafoukhlefthebrew=1425,e.etnahtahebrew=1425,e.etnahtalefthebrew=1425,e.eturned=477,e.eukorean=12641,e.euro=8364,e.evowelsignbengali=2503,e.evowelsigndeva=2375,e.evowelsigngujarati=2759,e.exclam=33,e.exclamarmenian=1372,e.exclamdbl=8252,e.exclamdown=161,e.exclamdownsmall=63393,e.exclammonospace=65281,e.exclamsmall=63265,e.existential=8707,e.ezh=658,e.ezhcaron=495,e.ezhcurl=659,e.ezhreversed=441,e.ezhtail=442,e.f=102,e.fadeva=2398,e.fagurmukhi=2654,e.fahrenheit=8457,e.fathaarabic=1614,e.fathalowarabic=1614,e.fathatanarabic=1611,e.fbopomofo=12552,e.fcircle=9429,e.fdotaccent=7711,e.feharabic=1601,e.feharmenian=1414,e.fehfinalarabic=65234,e.fehinitialarabic=65235,e.fehmedialarabic=65236,e.feicoptic=997,e.female=9792,e.ff=64256,e.ffi=64259,e.ffl=64260,e.fi=64257,e.fifteencircle=9326,e.fifteenparen=9346,e.fifteenperiod=9366,e.figuredash=8210,e.filledbox=9632,e.filledrect=9644,e.finalkaf=1498,e.finalkafdagesh=64314,e.finalkafdageshhebrew=64314,e.finalkafhebrew=1498,e.finalmem=1501,e.finalmemhebrew=1501,e.finalnun=1503,e.finalnunhebrew=1503,e.finalpe=1507,e.finalpehebrew=1507,e.finaltsadi=1509,e.finaltsadihebrew=1509,e.firsttonechinese=713,e.fisheye=9673,e.fitacyrillic=1139,e.five=53,e.fivearabic=1637,e.fivebengali=2539,e.fivecircle=9316,e.fivecircleinversesansserif=10126,e.fivedeva=2411,e.fiveeighths=8541,e.fivegujarati=2795,e.fivegurmukhi=2667,e.fivehackarabic=1637,e.fivehangzhou=12325,e.fiveideographicparen=12836,e.fiveinferior=8325,e.fivemonospace=65301,e.fiveoldstyle=63285,e.fiveparen=9336,e.fiveperiod=9356,e.fivepersian=1781,e.fiveroman=8564,e.fivesuperior=8309,e.fivethai=3669,e.fl=64258,e.florin=402,e.fmonospace=65350,e.fmsquare=13209,e.fofanthai=3615,e.fofathai=3613,e.fongmanthai=3663,e.forall=8704,e.four=52,e.fourarabic=1636,e.fourbengali=2538,e.fourcircle=9315,e.fourcircleinversesansserif=10125,e.fourdeva=2410,e.fourgujarati=2794,e.fourgurmukhi=2666,e.fourhackarabic=1636,e.fourhangzhou=12324,e.fourideographicparen=12835,e.fourinferior=8324,e.fourmonospace=65300,e.fournumeratorbengali=2551,e.fouroldstyle=63284,e.fourparen=9335,e.fourperiod=9355,e.fourpersian=1780,e.fourroman=8563,e.foursuperior=8308,e.fourteencircle=9325,e.fourteenparen=9345,e.fourteenperiod=9365,e.fourthai=3668,e.fourthtonechinese=715,e.fparen=9377,e.fraction=8260,e.franc=8355,e.g=103,e.gabengali=2455,e.gacute=501,e.gadeva=2327,e.gafarabic=1711,e.gaffinalarabic=64403,e.gafinitialarabic=64404,e.gafmedialarabic=64405,e.gagujarati=2711,e.gagurmukhi=2583,e.gahiragana=12364,e.gakatakana=12460,e.gamma=947,e.gammalatinsmall=611,e.gammasuperior=736,e.gangiacoptic=1003,e.gbopomofo=12557,e.gbreve=287,e.gcaron=487,e.gcedilla=291,e.gcircle=9430,e.gcircumflex=285,e.gcommaaccent=291,e.gdot=289,e.gdotaccent=289,e.gecyrillic=1075,e.gehiragana=12370,e.gekatakana=12466,e.geometricallyequal=8785,e.gereshaccenthebrew=1436,e.gereshhebrew=1523,e.gereshmuqdamhebrew=1437,e.germandbls=223,e.gershayimaccenthebrew=1438,e.gershayimhebrew=1524,e.getamark=12307,e.ghabengali=2456,e.ghadarmenian=1394,e.ghadeva=2328,e.ghagujarati=2712,e.ghagurmukhi=2584,e.ghainarabic=1594,e.ghainfinalarabic=65230,e.ghaininitialarabic=65231,e.ghainmedialarabic=65232,e.ghemiddlehookcyrillic=1173,e.ghestrokecyrillic=1171,e.gheupturncyrillic=1169,e.ghhadeva=2394,e.ghhagurmukhi=2650,e.ghook=608,e.ghzsquare=13203,e.gihiragana=12366,e.gikatakana=12462,e.gimarmenian=1379,e.gimel=1490,e.gimeldagesh=64306,e.gimeldageshhebrew=64306,e.gimelhebrew=1490,e.gjecyrillic=1107,e.glottalinvertedstroke=446,e.glottalstop=660,e.glottalstopinverted=662,e.glottalstopmod=704,e.glottalstopreversed=661,e.glottalstopreversedmod=705,e.glottalstopreversedsuperior=740,e.glottalstopstroke=673,e.glottalstopstrokereversed=674,e.gmacron=7713,e.gmonospace=65351,e.gohiragana=12372,e.gokatakana=12468,e.gparen=9378,e.gpasquare=13228,e.gradient=8711,e.grave=96,e.gravebelowcmb=790,e.gravecmb=768,e.gravecomb=768,e.gravedeva=2387,e.gravelowmod=718,e.gravemonospace=65344,e.gravetonecmb=832,e.greater=62,e.greaterequal=8805,e.greaterequalorless=8923,e.greatermonospace=65310,e.greaterorequivalent=8819,e.greaterorless=8823,e.greateroverequal=8807,e.greatersmall=65125,e.gscript=609,e.gstroke=485,e.guhiragana=12368,e.guillemotleft=171,e.guillemotright=187,e.guilsinglleft=8249,e.guilsinglright=8250,e.gukatakana=12464,e.guramusquare=13080,e.gysquare=13257,e.h=104,e.haabkhasiancyrillic=1193,e.haaltonearabic=1729,e.habengali=2489,e.hadescendercyrillic=1203,e.hadeva=2361,e.hagujarati=2745,e.hagurmukhi=2617,e.haharabic=1581,e.hahfinalarabic=65186,e.hahinitialarabic=65187,e.hahiragana=12399,e.hahmedialarabic=65188,e.haitusquare=13098,e.hakatakana=12495,e.hakatakanahalfwidth=65418,e.halantgurmukhi=2637,e.hamzaarabic=1569,e.hamzalowarabic=1569,e.hangulfiller=12644,e.hardsigncyrillic=1098,e.harpoonleftbarbup=8636,e.harpoonrightbarbup=8640,e.hasquare=13258,e.hatafpatah=1458,e.hatafpatah16=1458,e.hatafpatah23=1458,e.hatafpatah2f=1458,e.hatafpatahhebrew=1458,e.hatafpatahnarrowhebrew=1458,e.hatafpatahquarterhebrew=1458,e.hatafpatahwidehebrew=1458,e.hatafqamats=1459,e.hatafqamats1b=1459,e.hatafqamats28=1459,e.hatafqamats34=1459,e.hatafqamatshebrew=1459,e.hatafqamatsnarrowhebrew=1459,e.hatafqamatsquarterhebrew=1459,e.hatafqamatswidehebrew=1459,e.hatafsegol=1457,e.hatafsegol17=1457,e.hatafsegol24=1457,e.hatafsegol30=1457,e.hatafsegolhebrew=1457,e.hatafsegolnarrowhebrew=1457,e.hatafsegolquarterhebrew=1457,e.hatafsegolwidehebrew=1457,e.hbar=295,e.hbopomofo=12559,e.hbrevebelow=7723,e.hcedilla=7721,e.hcircle=9431,e.hcircumflex=293,e.hdieresis=7719,e.hdotaccent=7715,e.hdotbelow=7717,e.he=1492,e.heart=9829,e.heartsuitblack=9829,e.heartsuitwhite=9825,e.hedagesh=64308,e.hedageshhebrew=64308,e.hehaltonearabic=1729,e.heharabic=1607,e.hehebrew=1492,e.hehfinalaltonearabic=64423,e.hehfinalalttwoarabic=65258,e.hehfinalarabic=65258,e.hehhamzaabovefinalarabic=64421,e.hehhamzaaboveisolatedarabic=64420,e.hehinitialaltonearabic=64424,e.hehinitialarabic=65259,e.hehiragana=12408,e.hehmedialaltonearabic=64425,e.hehmedialarabic=65260,e.heiseierasquare=13179,e.hekatakana=12504,e.hekatakanahalfwidth=65421,e.hekutaarusquare=13110,e.henghook=615,e.herutusquare=13113,e.het=1495,e.hethebrew=1495,e.hhook=614,e.hhooksuperior=689,e.hieuhacirclekorean=12923,e.hieuhaparenkorean=12827,e.hieuhcirclekorean=12909,e.hieuhkorean=12622,e.hieuhparenkorean=12813,e.hihiragana=12402,e.hikatakana=12498,e.hikatakanahalfwidth=65419,e.hiriq=1460,e.hiriq14=1460,e.hiriq21=1460,e.hiriq2d=1460,e.hiriqhebrew=1460,e.hiriqnarrowhebrew=1460,e.hiriqquarterhebrew=1460,e.hiriqwidehebrew=1460,e.hlinebelow=7830,e.hmonospace=65352,e.hoarmenian=1392,e.hohipthai=3627,e.hohiragana=12411,e.hokatakana=12507,e.hokatakanahalfwidth=65422,e.holam=1465,e.holam19=1465,e.holam26=1465,e.holam32=1465,e.holamhebrew=1465,e.holamnarrowhebrew=1465,e.holamquarterhebrew=1465,e.holamwidehebrew=1465,e.honokhukthai=3630,e.hookabovecomb=777,e.hookcmb=777,e.hookpalatalizedbelowcmb=801,e.hookretroflexbelowcmb=802,e.hoonsquare=13122,e.horicoptic=1001,e.horizontalbar=8213,e.horncmb=795,e.hotsprings=9832,e.house=8962,e.hparen=9379,e.hsuperior=688,e.hturned=613,e.huhiragana=12405,e.huiitosquare=13107,e.hukatakana=12501,e.hukatakanahalfwidth=65420,e.hungarumlaut=733,e.hungarumlautcmb=779,e.hv=405,e.hyphen=45,e.hypheninferior=63205,e.hyphenmonospace=65293,e.hyphensmall=65123,e.hyphensuperior=63206,e.hyphentwo=8208,e.i=105,e.iacute=237,e.iacyrillic=1103,e.ibengali=2439,e.ibopomofo=12583,e.ibreve=301,e.icaron=464,e.icircle=9432,e.icircumflex=238,e.icyrillic=1110,e.idblgrave=521,e.ideographearthcircle=12943,e.ideographfirecircle=12939,e.ideographicallianceparen=12863,e.ideographiccallparen=12858,e.ideographiccentrecircle=12965,e.ideographicclose=12294,e.ideographiccomma=12289,e.ideographiccommaleft=65380,e.ideographiccongratulationparen=12855,e.ideographiccorrectcircle=12963,e.ideographicearthparen=12847,e.ideographicenterpriseparen=12861,e.ideographicexcellentcircle=12957,e.ideographicfestivalparen=12864,e.ideographicfinancialcircle=12950,e.ideographicfinancialparen=12854,e.ideographicfireparen=12843,e.ideographichaveparen=12850,e.ideographichighcircle=12964,e.ideographiciterationmark=12293,e.ideographiclaborcircle=12952,e.ideographiclaborparen=12856,e.ideographicleftcircle=12967,e.ideographiclowcircle=12966,e.ideographicmedicinecircle=12969,e.ideographicmetalparen=12846,e.ideographicmoonparen=12842,e.ideographicnameparen=12852,e.ideographicperiod=12290,e.ideographicprintcircle=12958,e.ideographicreachparen=12867,e.ideographicrepresentparen=12857,e.ideographicresourceparen=12862,e.ideographicrightcircle=12968,e.ideographicsecretcircle=12953,e.ideographicselfparen=12866,e.ideographicsocietyparen=12851,e.ideographicspace=12288,e.ideographicspecialparen=12853,e.ideographicstockparen=12849,e.ideographicstudyparen=12859,e.ideographicsunparen=12848,e.ideographicsuperviseparen=12860,e.ideographicwaterparen=12844,e.ideographicwoodparen=12845,e.ideographiczero=12295,e.ideographmetalcircle=12942,e.ideographmooncircle=12938,e.ideographnamecircle=12948,e.ideographsuncircle=12944,e.ideographwatercircle=12940,e.ideographwoodcircle=12941,e.ideva=2311,e.idieresis=239,e.idieresisacute=7727,e.idieresiscyrillic=1253,e.idotbelow=7883,e.iebrevecyrillic=1239,e.iecyrillic=1077,e.ieungacirclekorean=12917,e.ieungaparenkorean=12821,e.ieungcirclekorean=12903,e.ieungkorean=12615,e.ieungparenkorean=12807,e.igrave=236,e.igujarati=2695,e.igurmukhi=2567,e.ihiragana=12356,e.ihookabove=7881,e.iibengali=2440,e.iicyrillic=1080,e.iideva=2312,e.iigujarati=2696,e.iigurmukhi=2568,e.iimatragurmukhi=2624,e.iinvertedbreve=523,e.iishortcyrillic=1081,e.iivowelsignbengali=2496,e.iivowelsigndeva=2368,e.iivowelsigngujarati=2752,e.ij=307,e.ikatakana=12452,e.ikatakanahalfwidth=65394,e.ikorean=12643,e.ilde=732,e.iluyhebrew=1452,e.imacron=299,e.imacroncyrillic=1251,e.imageorapproximatelyequal=8787,e.imatragurmukhi=2623,e.imonospace=65353,e.increment=8710,e.infinity=8734,e.iniarmenian=1387,e.integral=8747,e.integralbottom=8993,e.integralbt=8993,e.integralex=63733,e.integraltop=8992,e.integraltp=8992,e.intersection=8745,e.intisquare=13061,e.invbullet=9688,e.invcircle=9689,e.invsmileface=9787,e.iocyrillic=1105,e.iogonek=303,e.iota=953,e.iotadieresis=970,e.iotadieresistonos=912,e.iotalatin=617,e.iotatonos=943,e.iparen=9380,e.irigurmukhi=2674,e.ismallhiragana=12355,e.ismallkatakana=12451,e.ismallkatakanahalfwidth=65384,e.issharbengali=2554,e.istroke=616,e.isuperior=63213,e.iterationhiragana=12445,e.iterationkatakana=12541,e.itilde=297,e.itildebelow=7725,e.iubopomofo=12585,e.iucyrillic=1102,e.ivowelsignbengali=2495,e.ivowelsigndeva=2367,e.ivowelsigngujarati=2751,e.izhitsacyrillic=1141,e.izhitsadblgravecyrillic=1143,e.j=106,e.jaarmenian=1393,e.jabengali=2460,e.jadeva=2332,e.jagujarati=2716,e.jagurmukhi=2588,e.jbopomofo=12560,e.jcaron=496,e.jcircle=9433,e.jcircumflex=309,e.jcrossedtail=669,e.jdotlessstroke=607,e.jecyrillic=1112,e.jeemarabic=1580,e.jeemfinalarabic=65182,e.jeeminitialarabic=65183,e.jeemmedialarabic=65184,e.jeharabic=1688,e.jehfinalarabic=64395,e.jhabengali=2461,e.jhadeva=2333,e.jhagujarati=2717,e.jhagurmukhi=2589,e.jheharmenian=1403,e.jis=12292,e.jmonospace=65354,e.jparen=9381,e.jsuperior=690,e.k=107,e.kabashkircyrillic=1185,e.kabengali=2453,e.kacute=7729,e.kacyrillic=1082,e.kadescendercyrillic=1179,e.kadeva=2325,e.kaf=1499,e.kafarabic=1603,e.kafdagesh=64315,e.kafdageshhebrew=64315,e.kaffinalarabic=65242,e.kafhebrew=1499,e.kafinitialarabic=65243,e.kafmedialarabic=65244,e.kafrafehebrew=64333,e.kagujarati=2709,e.kagurmukhi=2581,e.kahiragana=12363,e.kahookcyrillic=1220,e.kakatakana=12459,e.kakatakanahalfwidth=65398,e.kappa=954,e.kappasymbolgreek=1008,e.kapyeounmieumkorean=12657,e.kapyeounphieuphkorean=12676,e.kapyeounpieupkorean=12664,e.kapyeounssangpieupkorean=12665,e.karoriisquare=13069,e.kashidaautoarabic=1600,e.kashidaautonosidebearingarabic=1600,e.kasmallkatakana=12533,e.kasquare=13188,e.kasraarabic=1616,e.kasratanarabic=1613,e.kastrokecyrillic=1183,e.katahiraprolongmarkhalfwidth=65392,e.kaverticalstrokecyrillic=1181,e.kbopomofo=12558,e.kcalsquare=13193,e.kcaron=489,e.kcedilla=311,e.kcircle=9434,e.kcommaaccent=311,e.kdotbelow=7731,e.keharmenian=1412,e.kehiragana=12369,e.kekatakana=12465,e.kekatakanahalfwidth=65401,e.kenarmenian=1391,e.kesmallkatakana=12534,e.kgreenlandic=312,e.khabengali=2454,e.khacyrillic=1093,e.khadeva=2326,e.khagujarati=2710,e.khagurmukhi=2582,e.khaharabic=1582,e.khahfinalarabic=65190,e.khahinitialarabic=65191,e.khahmedialarabic=65192,e.kheicoptic=999,e.khhadeva=2393,e.khhagurmukhi=2649,e.khieukhacirclekorean=12920,e.khieukhaparenkorean=12824,e.khieukhcirclekorean=12906,e.khieukhkorean=12619,e.khieukhparenkorean=12810,e.khokhaithai=3586,e.khokhonthai=3589,e.khokhuatthai=3587,e.khokhwaithai=3588,e.khomutthai=3675,e.khook=409,e.khorakhangthai=3590,e.khzsquare=13201,e.kihiragana=12365,e.kikatakana=12461,e.kikatakanahalfwidth=65399,e.kiroguramusquare=13077,e.kiromeetorusquare=13078,e.kirosquare=13076,e.kiyeokacirclekorean=12910,e.kiyeokaparenkorean=12814,e.kiyeokcirclekorean=12896,e.kiyeokkorean=12593,e.kiyeokparenkorean=12800,e.kiyeoksioskorean=12595,e.kjecyrillic=1116,e.klinebelow=7733,e.klsquare=13208,e.kmcubedsquare=13222,e.kmonospace=65355,e.kmsquaredsquare=13218,e.kohiragana=12371,e.kohmsquare=13248,e.kokaithai=3585,e.kokatakana=12467,e.kokatakanahalfwidth=65402,e.kooposquare=13086,e.koppacyrillic=1153,e.koreanstandardsymbol=12927,e.koroniscmb=835,e.kparen=9382,e.kpasquare=13226,e.ksicyrillic=1135,e.ktsquare=13263,e.kturned=670,e.kuhiragana=12367,e.kukatakana=12463,e.kukatakanahalfwidth=65400,e.kvsquare=13240,e.kwsquare=13246,e.l=108,e.labengali=2482,e.lacute=314,e.ladeva=2354,e.lagujarati=2738,e.lagurmukhi=2610,e.lakkhangyaothai=3653,e.lamaleffinalarabic=65276,e.lamalefhamzaabovefinalarabic=65272,e.lamalefhamzaaboveisolatedarabic=65271,e.lamalefhamzabelowfinalarabic=65274,e.lamalefhamzabelowisolatedarabic=65273,e.lamalefisolatedarabic=65275,e.lamalefmaddaabovefinalarabic=65270,e.lamalefmaddaaboveisolatedarabic=65269,e.lamarabic=1604,e.lambda=955,e.lambdastroke=411,e.lamed=1500,e.lameddagesh=64316,e.lameddageshhebrew=64316,e.lamedhebrew=1500,e.lamfinalarabic=65246,e.lamhahinitialarabic=64714,e.laminitialarabic=65247,e.lamjeeminitialarabic=64713,e.lamkhahinitialarabic=64715,e.lamlamhehisolatedarabic=65010,e.lammedialarabic=65248,e.lammeemhahinitialarabic=64904,e.lammeeminitialarabic=64716,e.largecircle=9711,e.lbar=410,e.lbelt=620,e.lbopomofo=12556,e.lcaron=318,e.lcedilla=316,e.lcircle=9435,e.lcircumflexbelow=7741,e.lcommaaccent=316,e.ldot=320,e.ldotaccent=320,e.ldotbelow=7735,e.ldotbelowmacron=7737,e.leftangleabovecmb=794,e.lefttackbelowcmb=792,e.less=60,e.lessequal=8804,e.lessequalorgreater=8922,e.lessmonospace=65308,e.lessorequivalent=8818,e.lessorgreater=8822,e.lessoverequal=8806,e.lesssmall=65124,e.lezh=622,e.lfblock=9612,e.lhookretroflex=621,e.lira=8356,e.liwnarmenian=1388,e.lj=457,e.ljecyrillic=1113,e.ll=63168,e.lladeva=2355,e.llagujarati=2739,e.llinebelow=7739,e.llladeva=2356,e.llvocalicbengali=2529,e.llvocalicdeva=2401,e.llvocalicvowelsignbengali=2531,e.llvocalicvowelsigndeva=2403,e.lmiddletilde=619,e.lmonospace=65356,e.lmsquare=13264,e.lochulathai=3628,e.logicaland=8743,e.logicalnot=172,e.logicalnotreversed=8976,e.logicalor=8744,e.lolingthai=3621,e.longs=383,e.lowlinecenterline=65102,e.lowlinecmb=818,e.lowlinedashed=65101,e.lozenge=9674,e.lparen=9383,e.lslash=322,e.lsquare=8467,e.lsuperior=63214,e.ltshade=9617,e.luthai=3622,e.lvocalicbengali=2444,e.lvocalicdeva=2316,e.lvocalicvowelsignbengali=2530,e.lvocalicvowelsigndeva=2402,e.lxsquare=13267,e.m=109,e.mabengali=2478,e.macron=175,e.macronbelowcmb=817,e.macroncmb=772,e.macronlowmod=717,e.macronmonospace=65507,e.macute=7743,e.madeva=2350,e.magujarati=2734,e.magurmukhi=2606,e.mahapakhhebrew=1444,e.mahapakhlefthebrew=1444,e.mahiragana=12414,e.maichattawalowleftthai=63637,e.maichattawalowrightthai=63636,e.maichattawathai=3659,e.maichattawaupperleftthai=63635,e.maieklowleftthai=63628,e.maieklowrightthai=63627,e.maiekthai=3656,e.maiekupperleftthai=63626,e.maihanakatleftthai=63620,e.maihanakatthai=3633,e.maitaikhuleftthai=63625,e.maitaikhuthai=3655,e.maitholowleftthai=63631,e.maitholowrightthai=63630,e.maithothai=3657,e.maithoupperleftthai=63629,e.maitrilowleftthai=63634,e.maitrilowrightthai=63633,e.maitrithai=3658,e.maitriupperleftthai=63632,e.maiyamokthai=3654,e.makatakana=12510,e.makatakanahalfwidth=65423,e.male=9794,e.mansyonsquare=13127,e.maqafhebrew=1470,e.mars=9794,e.masoracirclehebrew=1455,e.masquare=13187,e.mbopomofo=12551,e.mbsquare=13268,e.mcircle=9436,e.mcubedsquare=13221,e.mdotaccent=7745,e.mdotbelow=7747,e.meemarabic=1605,e.meemfinalarabic=65250,e.meeminitialarabic=65251,e.meemmedialarabic=65252,e.meemmeeminitialarabic=64721,e.meemmeemisolatedarabic=64584,e.meetorusquare=13133,e.mehiragana=12417,e.meizierasquare=13182,e.mekatakana=12513,e.mekatakanahalfwidth=65426,e.mem=1502,e.memdagesh=64318,e.memdageshhebrew=64318,e.memhebrew=1502,e.menarmenian=1396,e.merkhahebrew=1445,e.merkhakefulahebrew=1446,e.merkhakefulalefthebrew=1446,e.merkhalefthebrew=1445,e.mhook=625,e.mhzsquare=13202,e.middledotkatakanahalfwidth=65381,e.middot=183,e.mieumacirclekorean=12914,e.mieumaparenkorean=12818,e.mieumcirclekorean=12900,e.mieumkorean=12609,e.mieumpansioskorean=12656,e.mieumparenkorean=12804,e.mieumpieupkorean=12654,e.mieumsioskorean=12655,e.mihiragana=12415,e.mikatakana=12511,e.mikatakanahalfwidth=65424,e.minus=8722,e.minusbelowcmb=800,e.minuscircle=8854,e.minusmod=727,e.minusplus=8723,e.minute=8242,e.miribaarusquare=13130,e.mirisquare=13129,e.mlonglegturned=624,e.mlsquare=13206,e.mmcubedsquare=13219,e.mmonospace=65357,e.mmsquaredsquare=13215,e.mohiragana=12418,e.mohmsquare=13249,e.mokatakana=12514,e.mokatakanahalfwidth=65427,e.molsquare=13270,e.momathai=3617,e.moverssquare=13223,e.moverssquaredsquare=13224,e.mparen=9384,e.mpasquare=13227,e.mssquare=13235,e.msuperior=63215,e.mturned=623,e.mu=181,e.mu1=181,e.muasquare=13186,e.muchgreater=8811,e.muchless=8810,e.mufsquare=13196,e.mugreek=956,e.mugsquare=13197,e.muhiragana=12416,e.mukatakana=12512,e.mukatakanahalfwidth=65425,e.mulsquare=13205,e.multiply=215,e.mumsquare=13211,e.munahhebrew=1443,e.munahlefthebrew=1443,e.musicalnote=9834,e.musicalnotedbl=9835,e.musicflatsign=9837,e.musicsharpsign=9839,e.mussquare=13234,e.muvsquare=13238,e.muwsquare=13244,e.mvmegasquare=13241,e.mvsquare=13239,e.mwmegasquare=13247,e.mwsquare=13245,e.n=110,e.nabengali=2472,e.nabla=8711,e.nacute=324,e.nadeva=2344,e.nagujarati=2728,e.nagurmukhi=2600,e.nahiragana=12394,e.nakatakana=12490,e.nakatakanahalfwidth=65413,e.napostrophe=329,e.nasquare=13185,e.nbopomofo=12555,e.nbspace=160,e.ncaron=328,e.ncedilla=326,e.ncircle=9437,e.ncircumflexbelow=7755,e.ncommaaccent=326,e.ndotaccent=7749,e.ndotbelow=7751,e.nehiragana=12397,e.nekatakana=12493,e.nekatakanahalfwidth=65416,e.newsheqelsign=8362,e.nfsquare=13195,e.ngabengali=2457,e.ngadeva=2329,e.ngagujarati=2713,e.ngagurmukhi=2585,e.ngonguthai=3591,e.nhiragana=12435,e.nhookleft=626,e.nhookretroflex=627,e.nieunacirclekorean=12911,e.nieunaparenkorean=12815,e.nieuncieuckorean=12597,e.nieuncirclekorean=12897,e.nieunhieuhkorean=12598,e.nieunkorean=12596,e.nieunpansioskorean=12648,e.nieunparenkorean=12801,e.nieunsioskorean=12647,e.nieuntikeutkorean=12646,e.nihiragana=12395,e.nikatakana=12491,e.nikatakanahalfwidth=65414,e.nikhahitleftthai=63641,e.nikhahitthai=3661,e.nine=57,e.ninearabic=1641,e.ninebengali=2543,e.ninecircle=9320,e.ninecircleinversesansserif=10130,e.ninedeva=2415,e.ninegujarati=2799,e.ninegurmukhi=2671,e.ninehackarabic=1641,e.ninehangzhou=12329,e.nineideographicparen=12840,e.nineinferior=8329,e.ninemonospace=65305,e.nineoldstyle=63289,e.nineparen=9340,e.nineperiod=9360,e.ninepersian=1785,e.nineroman=8568,e.ninesuperior=8313,e.nineteencircle=9330,e.nineteenparen=9350,e.nineteenperiod=9370,e.ninethai=3673,e.nj=460,e.njecyrillic=1114,e.nkatakana=12531,e.nkatakanahalfwidth=65437,e.nlegrightlong=414,e.nlinebelow=7753,e.nmonospace=65358,e.nmsquare=13210,e.nnabengali=2467,e.nnadeva=2339,e.nnagujarati=2723,e.nnagurmukhi=2595,e.nnnadeva=2345,e.nohiragana=12398,e.nokatakana=12494,e.nokatakanahalfwidth=65417,e.nonbreakingspace=160,e.nonenthai=3603,e.nonuthai=3609,e.noonarabic=1606,e.noonfinalarabic=65254,e.noonghunnaarabic=1722,e.noonghunnafinalarabic=64415,e.nooninitialarabic=65255,e.noonjeeminitialarabic=64722,e.noonjeemisolatedarabic=64587,e.noonmedialarabic=65256,e.noonmeeminitialarabic=64725,e.noonmeemisolatedarabic=64590,e.noonnoonfinalarabic=64653,e.notcontains=8716,e.notelement=8713,e.notelementof=8713,e.notequal=8800,e.notgreater=8815,e.notgreaternorequal=8817,e.notgreaternorless=8825,e.notidentical=8802,e.notless=8814,e.notlessnorequal=8816,e.notparallel=8742,e.notprecedes=8832,e.notsubset=8836,e.notsucceeds=8833,e.notsuperset=8837,e.nowarmenian=1398,e.nparen=9385,e.nssquare=13233,e.nsuperior=8319,e.ntilde=241,e.nu=957,e.nuhiragana=12396,e.nukatakana=12492,e.nukatakanahalfwidth=65415,e.nuktabengali=2492,e.nuktadeva=2364,e.nuktagujarati=2748,e.nuktagurmukhi=2620,e.numbersign=35,e.numbersignmonospace=65283,e.numbersignsmall=65119,e.numeralsigngreek=884,e.numeralsignlowergreek=885,e.numero=8470,e.nun=1504,e.nundagesh=64320,e.nundageshhebrew=64320,e.nunhebrew=1504,e.nvsquare=13237,e.nwsquare=13243,e.nyabengali=2462,e.nyadeva=2334,e.nyagujarati=2718,e.nyagurmukhi=2590,e.o=111,e.oacute=243,e.oangthai=3629,e.obarred=629,e.obarredcyrillic=1257,e.obarreddieresiscyrillic=1259,e.obengali=2451,e.obopomofo=12571,e.obreve=335,e.ocandradeva=2321,e.ocandragujarati=2705,e.ocandravowelsigndeva=2377,e.ocandravowelsigngujarati=2761,e.ocaron=466,e.ocircle=9438,e.ocircumflex=244,e.ocircumflexacute=7889,e.ocircumflexdotbelow=7897,e.ocircumflexgrave=7891,e.ocircumflexhookabove=7893,e.ocircumflextilde=7895,e.ocyrillic=1086,e.odblacute=337,e.odblgrave=525,e.odeva=2323,e.odieresis=246,e.odieresiscyrillic=1255,e.odotbelow=7885,e.oe=339,e.oekorean=12634,e.ogonek=731,e.ogonekcmb=808,e.ograve=242,e.ogujarati=2707,e.oharmenian=1413,e.ohiragana=12362,e.ohookabove=7887,e.ohorn=417,e.ohornacute=7899,e.ohorndotbelow=7907,e.ohorngrave=7901,e.ohornhookabove=7903,e.ohorntilde=7905,e.ohungarumlaut=337,e.oi=419,e.oinvertedbreve=527,e.okatakana=12458,e.okatakanahalfwidth=65397,e.okorean=12631,e.olehebrew=1451,e.omacron=333,e.omacronacute=7763,e.omacrongrave=7761,e.omdeva=2384,e.omega=969,e.omega1=982,e.omegacyrillic=1121,e.omegalatinclosed=631,e.omegaroundcyrillic=1147,e.omegatitlocyrillic=1149,e.omegatonos=974,e.omgujarati=2768,e.omicron=959,e.omicrontonos=972,e.omonospace=65359,e.one=49,e.onearabic=1633,e.onebengali=2535,e.onecircle=9312,e.onecircleinversesansserif=10122,e.onedeva=2407,e.onedotenleader=8228,e.oneeighth=8539,e.onefitted=63196,e.onegujarati=2791,e.onegurmukhi=2663,e.onehackarabic=1633,e.onehalf=189,e.onehangzhou=12321,e.oneideographicparen=12832,e.oneinferior=8321,e.onemonospace=65297,e.onenumeratorbengali=2548,e.oneoldstyle=63281,e.oneparen=9332,e.oneperiod=9352,e.onepersian=1777,e.onequarter=188,e.oneroman=8560,e.onesuperior=185,e.onethai=3665,e.onethird=8531,e.oogonek=491,e.oogonekmacron=493,e.oogurmukhi=2579,e.oomatragurmukhi=2635,e.oopen=596,e.oparen=9386,e.openbullet=9702,e.option=8997,e.ordfeminine=170,e.ordmasculine=186,e.orthogonal=8735,e.oshortdeva=2322,e.oshortvowelsigndeva=2378,e.oslash=248,e.oslashacute=511,e.osmallhiragana=12361,e.osmallkatakana=12457,e.osmallkatakanahalfwidth=65387,e.ostrokeacute=511,e.osuperior=63216,e.otcyrillic=1151,e.otilde=245,e.otildeacute=7757,e.otildedieresis=7759,e.oubopomofo=12577,e.overline=8254,e.overlinecenterline=65098,e.overlinecmb=773,e.overlinedashed=65097,e.overlinedblwavy=65100,e.overlinewavy=65099,e.overscore=175,e.ovowelsignbengali=2507,e.ovowelsigndeva=2379,e.ovowelsigngujarati=2763,e.p=112,e.paampssquare=13184,e.paasentosquare=13099,e.pabengali=2474,e.pacute=7765,e.padeva=2346,e.pagedown=8671,e.pageup=8670,e.pagujarati=2730,e.pagurmukhi=2602,e.pahiragana=12401,e.paiyannoithai=3631,e.pakatakana=12497,e.palatalizationcyrilliccmb=1156,e.palochkacyrillic=1216,e.pansioskorean=12671,e.paragraph=182,e.parallel=8741,e.parenleft=40,e.parenleftaltonearabic=64830,e.parenleftbt=63725,e.parenleftex=63724,e.parenleftinferior=8333,e.parenleftmonospace=65288,e.parenleftsmall=65113,e.parenleftsuperior=8317,e.parenlefttp=63723,e.parenleftvertical=65077,e.parenright=41,e.parenrightaltonearabic=64831,e.parenrightbt=63736,e.parenrightex=63735,e.parenrightinferior=8334,e.parenrightmonospace=65289,e.parenrightsmall=65114,e.parenrightsuperior=8318,e.parenrighttp=63734,e.parenrightvertical=65078,e.partialdiff=8706,e.paseqhebrew=1472,e.pashtahebrew=1433,e.pasquare=13225,e.patah=1463,e.patah11=1463,e.patah1d=1463,e.patah2a=1463,e.patahhebrew=1463,e.patahnarrowhebrew=1463,e.patahquarterhebrew=1463,e.patahwidehebrew=1463,e.pazerhebrew=1441,e.pbopomofo=12550,e.pcircle=9439,e.pdotaccent=7767,e.pe=1508,e.pecyrillic=1087,e.pedagesh=64324,e.pedageshhebrew=64324,e.peezisquare=13115,e.pefinaldageshhebrew=64323,e.peharabic=1662,e.peharmenian=1402,e.pehebrew=1508,e.pehfinalarabic=64343,e.pehinitialarabic=64344,e.pehiragana=12410,e.pehmedialarabic=64345,e.pekatakana=12506,e.pemiddlehookcyrillic=1191,e.perafehebrew=64334,e.percent=37,e.percentarabic=1642,e.percentmonospace=65285,e.percentsmall=65130,e.period=46,e.periodarmenian=1417,e.periodcentered=183,e.periodhalfwidth=65377,e.periodinferior=63207,e.periodmonospace=65294,e.periodsmall=65106,e.periodsuperior=63208,e.perispomenigreekcmb=834,e.perpendicular=8869,e.perthousand=8240,e.peseta=8359,e.pfsquare=13194,e.phabengali=2475,e.phadeva=2347,e.phagujarati=2731,e.phagurmukhi=2603,e.phi=966,e.phi1=981,e.phieuphacirclekorean=12922,e.phieuphaparenkorean=12826,e.phieuphcirclekorean=12908,e.phieuphkorean=12621,e.phieuphparenkorean=12812,e.philatin=632,e.phinthuthai=3642,e.phisymbolgreek=981,e.phook=421,e.phophanthai=3614,e.phophungthai=3612,e.phosamphaothai=3616,e.pi=960,e.pieupacirclekorean=12915,e.pieupaparenkorean=12819,e.pieupcieuckorean=12662,e.pieupcirclekorean=12901,e.pieupkiyeokkorean=12658,e.pieupkorean=12610,e.pieupparenkorean=12805,e.pieupsioskiyeokkorean=12660,e.pieupsioskorean=12612,e.pieupsiostikeutkorean=12661,e.pieupthieuthkorean=12663,e.pieuptikeutkorean=12659,e.pihiragana=12404,e.pikatakana=12500,e.pisymbolgreek=982,e.piwrarmenian=1411,e.plus=43,e.plusbelowcmb=799,e.pluscircle=8853,e.plusminus=177,e.plusmod=726,e.plusmonospace=65291,e.plussmall=65122,e.plussuperior=8314,e.pmonospace=65360,e.pmsquare=13272,e.pohiragana=12413,e.pointingindexdownwhite=9759,e.pointingindexleftwhite=9756,e.pointingindexrightwhite=9758,e.pointingindexupwhite=9757,e.pokatakana=12509,e.poplathai=3611,e.postalmark=12306,e.postalmarkface=12320,e.pparen=9387,e.precedes=8826,e.prescription=8478,e.primemod=697,e.primereversed=8245,e.product=8719,e.projective=8965,e.prolongedkana=12540,e.propellor=8984,e.propersubset=8834,e.propersuperset=8835,e.proportion=8759,e.proportional=8733,e.psi=968,e.psicyrillic=1137,e.psilipneumatacyrilliccmb=1158,e.pssquare=13232,e.puhiragana=12407,e.pukatakana=12503,e.pvsquare=13236,e.pwsquare=13242,e.q=113,e.qadeva=2392,e.qadmahebrew=1448,e.qafarabic=1602,e.qaffinalarabic=65238,e.qafinitialarabic=65239,e.qafmedialarabic=65240,e.qamats=1464,e.qamats10=1464,e.qamats1a=1464,e.qamats1c=1464,e.qamats27=1464,e.qamats29=1464,e.qamats33=1464,e.qamatsde=1464,e.qamatshebrew=1464,e.qamatsnarrowhebrew=1464,e.qamatsqatanhebrew=1464,e.qamatsqatannarrowhebrew=1464,e.qamatsqatanquarterhebrew=1464,e.qamatsqatanwidehebrew=1464,e.qamatsquarterhebrew=1464,e.qamatswidehebrew=1464,e.qarneyparahebrew=1439,e.qbopomofo=12561,e.qcircle=9440,e.qhook=672,e.qmonospace=65361,e.qof=1511,e.qofdagesh=64327,e.qofdageshhebrew=64327,e.qofhebrew=1511,e.qparen=9388,e.quarternote=9833,e.qubuts=1467,e.qubuts18=1467,e.qubuts25=1467,e.qubuts31=1467,e.qubutshebrew=1467,e.qubutsnarrowhebrew=1467,e.qubutsquarterhebrew=1467,e.qubutswidehebrew=1467,e.question=63,e.questionarabic=1567,e.questionarmenian=1374,e.questiondown=191,e.questiondownsmall=63423,e.questiongreek=894,e.questionmonospace=65311,e.questionsmall=63295,e.quotedbl=34,e.quotedblbase=8222,e.quotedblleft=8220,e.quotedblmonospace=65282,e.quotedblprime=12318,e.quotedblprimereversed=12317,e.quotedblright=8221,e.quoteleft=8216,e.quoteleftreversed=8219,e.quotereversed=8219,e.quoteright=8217,e.quoterightn=329,e.quotesinglbase=8218,e.quotesingle=39,e.quotesinglemonospace=65287,e.r=114,e.raarmenian=1404,e.rabengali=2480,e.racute=341,e.radeva=2352,e.radical=8730,e.radicalex=63717,e.radoverssquare=13230,e.radoverssquaredsquare=13231,e.radsquare=13229,e.rafe=1471,e.rafehebrew=1471,e.ragujarati=2736,e.ragurmukhi=2608,e.rahiragana=12425,e.rakatakana=12521,e.rakatakanahalfwidth=65431,e.ralowerdiagonalbengali=2545,e.ramiddlediagonalbengali=2544,e.ramshorn=612,e.ratio=8758,e.rbopomofo=12566,e.rcaron=345,e.rcedilla=343,e.rcircle=9441,e.rcommaaccent=343,e.rdblgrave=529,e.rdotaccent=7769,e.rdotbelow=7771,e.rdotbelowmacron=7773,e.referencemark=8251,e.reflexsubset=8838,e.reflexsuperset=8839,e.registered=174,e.registersans=63720,e.registerserif=63194,e.reharabic=1585,e.reharmenian=1408,e.rehfinalarabic=65198,e.rehiragana=12428,e.rekatakana=12524,e.rekatakanahalfwidth=65434,e.resh=1512,e.reshdageshhebrew=64328,e.reshhebrew=1512,e.reversedtilde=8765,e.reviahebrew=1431,e.reviamugrashhebrew=1431,e.revlogicalnot=8976,e.rfishhook=638,e.rfishhookreversed=639,e.rhabengali=2525,e.rhadeva=2397,e.rho=961,e.rhook=637,e.rhookturned=635,e.rhookturnedsuperior=693,e.rhosymbolgreek=1009,e.rhotichookmod=734,e.rieulacirclekorean=12913,e.rieulaparenkorean=12817,e.rieulcirclekorean=12899,e.rieulhieuhkorean=12608,e.rieulkiyeokkorean=12602,e.rieulkiyeoksioskorean=12649,e.rieulkorean=12601,e.rieulmieumkorean=12603,e.rieulpansioskorean=12652,e.rieulparenkorean=12803,e.rieulphieuphkorean=12607,e.rieulpieupkorean=12604,e.rieulpieupsioskorean=12651,e.rieulsioskorean=12605,e.rieulthieuthkorean=12606,e.rieultikeutkorean=12650,e.rieulyeorinhieuhkorean=12653,e.rightangle=8735,e.righttackbelowcmb=793,e.righttriangle=8895,e.rihiragana=12426,e.rikatakana=12522,e.rikatakanahalfwidth=65432,e.ring=730,e.ringbelowcmb=805,e.ringcmb=778,e.ringhalfleft=703,e.ringhalfleftarmenian=1369,e.ringhalfleftbelowcmb=796,e.ringhalfleftcentered=723,e.ringhalfright=702,e.ringhalfrightbelowcmb=825,e.ringhalfrightcentered=722,e.rinvertedbreve=531,e.rittorusquare=13137,e.rlinebelow=7775,e.rlongleg=636,e.rlonglegturned=634,e.rmonospace=65362,e.rohiragana=12429,e.rokatakana=12525,e.rokatakanahalfwidth=65435,e.roruathai=3619,e.rparen=9389,e.rrabengali=2524,e.rradeva=2353,e.rragurmukhi=2652,e.rreharabic=1681,e.rrehfinalarabic=64397,e.rrvocalicbengali=2528,e.rrvocalicdeva=2400,e.rrvocalicgujarati=2784,e.rrvocalicvowelsignbengali=2500,e.rrvocalicvowelsigndeva=2372,e.rrvocalicvowelsigngujarati=2756,e.rsuperior=63217,e.rtblock=9616,e.rturned=633,e.rturnedsuperior=692,e.ruhiragana=12427,e.rukatakana=12523,e.rukatakanahalfwidth=65433,e.rupeemarkbengali=2546,e.rupeesignbengali=2547,e.rupiah=63197,e.ruthai=3620,e.rvocalicbengali=2443,e.rvocalicdeva=2315,e.rvocalicgujarati=2699,e.rvocalicvowelsignbengali=2499,e.rvocalicvowelsigndeva=2371,e.rvocalicvowelsigngujarati=2755,e.s=115,e.sabengali=2488,e.sacute=347,e.sacutedotaccent=7781,e.sadarabic=1589,e.sadeva=2360,e.sadfinalarabic=65210,
e.sadinitialarabic=65211,e.sadmedialarabic=65212,e.sagujarati=2744,e.sagurmukhi=2616,e.sahiragana=12373,e.sakatakana=12469,e.sakatakanahalfwidth=65403,e.sallallahoualayhewasallamarabic=65018,e.samekh=1505,e.samekhdagesh=64321,e.samekhdageshhebrew=64321,e.samekhhebrew=1505,e.saraaathai=3634,e.saraaethai=3649,e.saraaimaimalaithai=3652,e.saraaimaimuanthai=3651,e.saraamthai=3635,e.saraathai=3632,e.saraethai=3648,e.saraiileftthai=63622,e.saraiithai=3637,e.saraileftthai=63621,e.saraithai=3636,e.saraothai=3650,e.saraueeleftthai=63624,e.saraueethai=3639,e.saraueleftthai=63623,e.sarauethai=3638,e.sarauthai=3640,e.sarauuthai=3641,e.sbopomofo=12569,e.scaron=353,e.scarondotaccent=7783,e.scedilla=351,e.schwa=601,e.schwacyrillic=1241,e.schwadieresiscyrillic=1243,e.schwahook=602,e.scircle=9442,e.scircumflex=349,e.scommaaccent=537,e.sdotaccent=7777,e.sdotbelow=7779,e.sdotbelowdotaccent=7785,e.seagullbelowcmb=828,e.second=8243,e.secondtonechinese=714,e.section=167,e.seenarabic=1587,e.seenfinalarabic=65202,e.seeninitialarabic=65203,e.seenmedialarabic=65204,e.segol=1462,e.segol13=1462,e.segol1f=1462,e.segol2c=1462,e.segolhebrew=1462,e.segolnarrowhebrew=1462,e.segolquarterhebrew=1462,e.segoltahebrew=1426,e.segolwidehebrew=1462,e.seharmenian=1405,e.sehiragana=12379,e.sekatakana=12475,e.sekatakanahalfwidth=65406,e.semicolon=59,e.semicolonarabic=1563,e.semicolonmonospace=65307,e.semicolonsmall=65108,e.semivoicedmarkkana=12444,e.semivoicedmarkkanahalfwidth=65439,e.sentisquare=13090,e.sentosquare=13091,e.seven=55,e.sevenarabic=1639,e.sevenbengali=2541,e.sevencircle=9318,e.sevencircleinversesansserif=10128,e.sevendeva=2413,e.seveneighths=8542,e.sevengujarati=2797,e.sevengurmukhi=2669,e.sevenhackarabic=1639,e.sevenhangzhou=12327,e.sevenideographicparen=12838,e.seveninferior=8327,e.sevenmonospace=65303,e.sevenoldstyle=63287,e.sevenparen=9338,e.sevenperiod=9358,e.sevenpersian=1783,e.sevenroman=8566,e.sevensuperior=8311,e.seventeencircle=9328,e.seventeenparen=9348,e.seventeenperiod=9368,e.seventhai=3671,e.sfthyphen=173,e.shaarmenian=1399,e.shabengali=2486,e.shacyrillic=1096,e.shaddaarabic=1617,e.shaddadammaarabic=64609,e.shaddadammatanarabic=64606,e.shaddafathaarabic=64608,e.shaddakasraarabic=64610,e.shaddakasratanarabic=64607,e.shade=9618,e.shadedark=9619,e.shadelight=9617,e.shademedium=9618,e.shadeva=2358,e.shagujarati=2742,e.shagurmukhi=2614,e.shalshelethebrew=1427,e.shbopomofo=12565,e.shchacyrillic=1097,e.sheenarabic=1588,e.sheenfinalarabic=65206,e.sheeninitialarabic=65207,e.sheenmedialarabic=65208,e.sheicoptic=995,e.sheqel=8362,e.sheqelhebrew=8362,e.sheva=1456,e.sheva115=1456,e.sheva15=1456,e.sheva22=1456,e.sheva2e=1456,e.shevahebrew=1456,e.shevanarrowhebrew=1456,e.shevaquarterhebrew=1456,e.shevawidehebrew=1456,e.shhacyrillic=1211,e.shimacoptic=1005,e.shin=1513,e.shindagesh=64329,e.shindageshhebrew=64329,e.shindageshshindot=64300,e.shindageshshindothebrew=64300,e.shindageshsindot=64301,e.shindageshsindothebrew=64301,e.shindothebrew=1473,e.shinhebrew=1513,e.shinshindot=64298,e.shinshindothebrew=64298,e.shinsindot=64299,e.shinsindothebrew=64299,e.shook=642,e.sigma=963,e.sigma1=962,e.sigmafinal=962,e.sigmalunatesymbolgreek=1010,e.sihiragana=12375,e.sikatakana=12471,e.sikatakanahalfwidth=65404,e.siluqhebrew=1469,e.siluqlefthebrew=1469,e.similar=8764,e.sindothebrew=1474,e.siosacirclekorean=12916,e.siosaparenkorean=12820,e.sioscieuckorean=12670,e.sioscirclekorean=12902,e.sioskiyeokkorean=12666,e.sioskorean=12613,e.siosnieunkorean=12667,e.siosparenkorean=12806,e.siospieupkorean=12669,e.siostikeutkorean=12668,e.six=54,e.sixarabic=1638,e.sixbengali=2540,e.sixcircle=9317,e.sixcircleinversesansserif=10127,e.sixdeva=2412,e.sixgujarati=2796,e.sixgurmukhi=2668,e.sixhackarabic=1638,e.sixhangzhou=12326,e.sixideographicparen=12837,e.sixinferior=8326,e.sixmonospace=65302,e.sixoldstyle=63286,e.sixparen=9337,e.sixperiod=9357,e.sixpersian=1782,e.sixroman=8565,e.sixsuperior=8310,e.sixteencircle=9327,e.sixteencurrencydenominatorbengali=2553,e.sixteenparen=9347,e.sixteenperiod=9367,e.sixthai=3670,e.slash=47,e.slashmonospace=65295,e.slong=383,e.slongdotaccent=7835,e.smileface=9786,e.smonospace=65363,e.sofpasuqhebrew=1475,e.softhyphen=173,e.softsigncyrillic=1100,e.sohiragana=12381,e.sokatakana=12477,e.sokatakanahalfwidth=65407,e.soliduslongoverlaycmb=824,e.solidusshortoverlaycmb=823,e.sorusithai=3625,e.sosalathai=3624,e.sosothai=3595,e.sosuathai=3626,e.space=32,e.spacehackarabic=32,e.spade=9824,e.spadesuitblack=9824,e.spadesuitwhite=9828,e.sparen=9390,e.squarebelowcmb=827,e.squarecc=13252,e.squarecm=13213,e.squarediagonalcrosshatchfill=9641,e.squarehorizontalfill=9636,e.squarekg=13199,e.squarekm=13214,e.squarekmcapital=13262,e.squareln=13265,e.squarelog=13266,e.squaremg=13198,e.squaremil=13269,e.squaremm=13212,e.squaremsquared=13217,e.squareorthogonalcrosshatchfill=9638,e.squareupperlefttolowerrightfill=9639,e.squareupperrighttolowerleftfill=9640,e.squareverticalfill=9637,e.squarewhitewithsmallblack=9635,e.srsquare=13275,e.ssabengali=2487,e.ssadeva=2359,e.ssagujarati=2743,e.ssangcieuckorean=12617,e.ssanghieuhkorean=12677,e.ssangieungkorean=12672,e.ssangkiyeokkorean=12594,e.ssangnieunkorean=12645,e.ssangpieupkorean=12611,e.ssangsioskorean=12614,e.ssangtikeutkorean=12600,e.ssuperior=63218,e.sterling=163,e.sterlingmonospace=65505,e.strokelongoverlaycmb=822,e.strokeshortoverlaycmb=821,e.subset=8834,e.subsetnotequal=8842,e.subsetorequal=8838,e.succeeds=8827,e.suchthat=8715,e.suhiragana=12377,e.sukatakana=12473,e.sukatakanahalfwidth=65405,e.sukunarabic=1618,e.summation=8721,e.sun=9788,e.superset=8835,e.supersetnotequal=8843,e.supersetorequal=8839,e.svsquare=13276,e.syouwaerasquare=13180,e.t=116,e.tabengali=2468,e.tackdown=8868,e.tackleft=8867,e.tadeva=2340,e.tagujarati=2724,e.tagurmukhi=2596,e.taharabic=1591,e.tahfinalarabic=65218,e.tahinitialarabic=65219,e.tahiragana=12383,e.tahmedialarabic=65220,e.taisyouerasquare=13181,e.takatakana=12479,e.takatakanahalfwidth=65408,e.tatweelarabic=1600,e.tau=964,e.tav=1514,e.tavdages=64330,e.tavdagesh=64330,e.tavdageshhebrew=64330,e.tavhebrew=1514,e.tbar=359,e.tbopomofo=12554,e.tcaron=357,e.tccurl=680,e.tcedilla=355,e.tcheharabic=1670,e.tchehfinalarabic=64379,e.tchehinitialarabic=64380,e.tchehmedialarabic=64381,e.tcircle=9443,e.tcircumflexbelow=7793,e.tcommaaccent=355,e.tdieresis=7831,e.tdotaccent=7787,e.tdotbelow=7789,e.tecyrillic=1090,e.tedescendercyrillic=1197,e.teharabic=1578,e.tehfinalarabic=65174,e.tehhahinitialarabic=64674,e.tehhahisolatedarabic=64524,e.tehinitialarabic=65175,e.tehiragana=12390,e.tehjeeminitialarabic=64673,e.tehjeemisolatedarabic=64523,e.tehmarbutaarabic=1577,e.tehmarbutafinalarabic=65172,e.tehmedialarabic=65176,e.tehmeeminitialarabic=64676,e.tehmeemisolatedarabic=64526,e.tehnoonfinalarabic=64627,e.tekatakana=12486,e.tekatakanahalfwidth=65411,e.telephone=8481,e.telephoneblack=9742,e.telishagedolahebrew=1440,e.telishaqetanahebrew=1449,e.tencircle=9321,e.tenideographicparen=12841,e.tenparen=9341,e.tenperiod=9361,e.tenroman=8569,e.tesh=679,e.tet=1496,e.tetdagesh=64312,e.tetdageshhebrew=64312,e.tethebrew=1496,e.tetsecyrillic=1205,e.tevirhebrew=1435,e.tevirlefthebrew=1435,e.thabengali=2469,e.thadeva=2341,e.thagujarati=2725,e.thagurmukhi=2597,e.thalarabic=1584,e.thalfinalarabic=65196,e.thanthakhatlowleftthai=63640,e.thanthakhatlowrightthai=63639,e.thanthakhatthai=3660,e.thanthakhatupperleftthai=63638,e.theharabic=1579,e.thehfinalarabic=65178,e.thehinitialarabic=65179,e.thehmedialarabic=65180,e.thereexists=8707,e.therefore=8756,e.theta=952,e.theta1=977,e.thetasymbolgreek=977,e.thieuthacirclekorean=12921,e.thieuthaparenkorean=12825,e.thieuthcirclekorean=12907,e.thieuthkorean=12620,e.thieuthparenkorean=12811,e.thirteencircle=9324,e.thirteenparen=9344,e.thirteenperiod=9364,e.thonangmonthothai=3601,e.thook=429,e.thophuthaothai=3602,e.thorn=254,e.thothahanthai=3607,e.thothanthai=3600,e.thothongthai=3608,e.thothungthai=3606,e.thousandcyrillic=1154,e.thousandsseparatorarabic=1644,e.thousandsseparatorpersian=1644,e.three=51,e.threearabic=1635,e.threebengali=2537,e.threecircle=9314,e.threecircleinversesansserif=10124,e.threedeva=2409,e.threeeighths=8540,e.threegujarati=2793,e.threegurmukhi=2665,e.threehackarabic=1635,e.threehangzhou=12323,e.threeideographicparen=12834,e.threeinferior=8323,e.threemonospace=65299,e.threenumeratorbengali=2550,e.threeoldstyle=63283,e.threeparen=9334,e.threeperiod=9354,e.threepersian=1779,e.threequarters=190,e.threequartersemdash=63198,e.threeroman=8562,e.threesuperior=179,e.threethai=3667,e.thzsquare=13204,e.tihiragana=12385,e.tikatakana=12481,e.tikatakanahalfwidth=65409,e.tikeutacirclekorean=12912,e.tikeutaparenkorean=12816,e.tikeutcirclekorean=12898,e.tikeutkorean=12599,e.tikeutparenkorean=12802,e.tilde=732,e.tildebelowcmb=816,e.tildecmb=771,e.tildecomb=771,e.tildedoublecmb=864,e.tildeoperator=8764,e.tildeoverlaycmb=820,e.tildeverticalcmb=830,e.timescircle=8855,e.tipehahebrew=1430,e.tipehalefthebrew=1430,e.tippigurmukhi=2672,e.titlocyrilliccmb=1155,e.tiwnarmenian=1407,e.tlinebelow=7791,e.tmonospace=65364,e.toarmenian=1385,e.tohiragana=12392,e.tokatakana=12488,e.tokatakanahalfwidth=65412,e.tonebarextrahighmod=741,e.tonebarextralowmod=745,e.tonebarhighmod=742,e.tonebarlowmod=744,e.tonebarmidmod=743,e.tonefive=445,e.tonesix=389,e.tonetwo=424,e.tonos=900,e.tonsquare=13095,e.topatakthai=3599,e.tortoiseshellbracketleft=12308,e.tortoiseshellbracketleftsmall=65117,e.tortoiseshellbracketleftvertical=65081,e.tortoiseshellbracketright=12309,e.tortoiseshellbracketrightsmall=65118,e.tortoiseshellbracketrightvertical=65082,e.totaothai=3605,e.tpalatalhook=427,e.tparen=9391,e.trademark=8482,e.trademarksans=63722,e.trademarkserif=63195,e.tretroflexhook=648,e.triagdn=9660,e.triaglf=9668,e.triagrt=9658,e.triagup=9650,e.ts=678,e.tsadi=1510,e.tsadidagesh=64326,e.tsadidageshhebrew=64326,e.tsadihebrew=1510,e.tsecyrillic=1094,e.tsere=1461,e.tsere12=1461,e.tsere1e=1461,e.tsere2b=1461,e.tserehebrew=1461,e.tserenarrowhebrew=1461,e.tserequarterhebrew=1461,e.tserewidehebrew=1461,e.tshecyrillic=1115,e.tsuperior=63219,e.ttabengali=2463,e.ttadeva=2335,e.ttagujarati=2719,e.ttagurmukhi=2591,e.tteharabic=1657,e.ttehfinalarabic=64359,e.ttehinitialarabic=64360,e.ttehmedialarabic=64361,e.tthabengali=2464,e.tthadeva=2336,e.tthagujarati=2720,e.tthagurmukhi=2592,e.tturned=647,e.tuhiragana=12388,e.tukatakana=12484,e.tukatakanahalfwidth=65410,e.tusmallhiragana=12387,e.tusmallkatakana=12483,e.tusmallkatakanahalfwidth=65391,e.twelvecircle=9323,e.twelveparen=9343,e.twelveperiod=9363,e.twelveroman=8571,e.twentycircle=9331,e.twentyhangzhou=21316,e.twentyparen=9351,e.twentyperiod=9371,e.two=50,e.twoarabic=1634,e.twobengali=2536,e.twocircle=9313,e.twocircleinversesansserif=10123,e.twodeva=2408,e.twodotenleader=8229,e.twodotleader=8229,e.twodotleadervertical=65072,e.twogujarati=2792,e.twogurmukhi=2664,e.twohackarabic=1634,e.twohangzhou=12322,e.twoideographicparen=12833,e.twoinferior=8322,e.twomonospace=65298,e.twonumeratorbengali=2549,e.twooldstyle=63282,e.twoparen=9333,e.twoperiod=9353,e.twopersian=1778,e.tworoman=8561,e.twostroke=443,e.twosuperior=178,e.twothai=3666,e.twothirds=8532,e.u=117,e.uacute=250,e.ubar=649,e.ubengali=2441,e.ubopomofo=12584,e.ubreve=365,e.ucaron=468,e.ucircle=9444,e.ucircumflex=251,e.ucircumflexbelow=7799,e.ucyrillic=1091,e.udattadeva=2385,e.udblacute=369,e.udblgrave=533,e.udeva=2313,e.udieresis=252,e.udieresisacute=472,e.udieresisbelow=7795,e.udieresiscaron=474,e.udieresiscyrillic=1265,e.udieresisgrave=476,e.udieresismacron=470,e.udotbelow=7909,e.ugrave=249,e.ugujarati=2697,e.ugurmukhi=2569,e.uhiragana=12358,e.uhookabove=7911,e.uhorn=432,e.uhornacute=7913,e.uhorndotbelow=7921,e.uhorngrave=7915,e.uhornhookabove=7917,e.uhorntilde=7919,e.uhungarumlaut=369,e.uhungarumlautcyrillic=1267,e.uinvertedbreve=535,e.ukatakana=12454,e.ukatakanahalfwidth=65395,e.ukcyrillic=1145,e.ukorean=12636,e.umacron=363,e.umacroncyrillic=1263,e.umacrondieresis=7803,e.umatragurmukhi=2625,e.umonospace=65365,e.underscore=95,e.underscoredbl=8215,e.underscoremonospace=65343,e.underscorevertical=65075,e.underscorewavy=65103,e.union=8746,e.universal=8704,e.uogonek=371,e.uparen=9392,e.upblock=9600,e.upperdothebrew=1476,e.upsilon=965,e.upsilondieresis=971,e.upsilondieresistonos=944,e.upsilonlatin=650,e.upsilontonos=973,e.uptackbelowcmb=797,e.uptackmod=724,e.uragurmukhi=2675,e.uring=367,e.ushortcyrillic=1118,e.usmallhiragana=12357,e.usmallkatakana=12453,e.usmallkatakanahalfwidth=65385,e.ustraightcyrillic=1199,e.ustraightstrokecyrillic=1201,e.utilde=361,e.utildeacute=7801,e.utildebelow=7797,e.uubengali=2442,e.uudeva=2314,e.uugujarati=2698,e.uugurmukhi=2570,e.uumatragurmukhi=2626,e.uuvowelsignbengali=2498,e.uuvowelsigndeva=2370,e.uuvowelsigngujarati=2754,e.uvowelsignbengali=2497,e.uvowelsigndeva=2369,e.uvowelsigngujarati=2753,e.v=118,e.vadeva=2357,e.vagujarati=2741,e.vagurmukhi=2613,e.vakatakana=12535,e.vav=1493,e.vavdagesh=64309,e.vavdagesh65=64309,e.vavdageshhebrew=64309,e.vavhebrew=1493,e.vavholam=64331,e.vavholamhebrew=64331,e.vavvavhebrew=1520,e.vavyodhebrew=1521,e.vcircle=9445,e.vdotbelow=7807,e.vecyrillic=1074,e.veharabic=1700,e.vehfinalarabic=64363,e.vehinitialarabic=64364,e.vehmedialarabic=64365,e.vekatakana=12537,e.venus=9792,e.verticalbar=124,e.verticallineabovecmb=781,e.verticallinebelowcmb=809,e.verticallinelowmod=716,e.verticallinemod=712,e.vewarmenian=1406,e.vhook=651,e.vikatakana=12536,e.viramabengali=2509,e.viramadeva=2381,e.viramagujarati=2765,e.visargabengali=2435,e.visargadeva=2307,e.visargagujarati=2691,e.vmonospace=65366,e.voarmenian=1400,e.voicediterationhiragana=12446,e.voicediterationkatakana=12542,e.voicedmarkkana=12443,e.voicedmarkkanahalfwidth=65438,e.vokatakana=12538,e.vparen=9393,e.vtilde=7805,e.vturned=652,e.vuhiragana=12436,e.vukatakana=12532,e.w=119,e.wacute=7811,e.waekorean=12633,e.wahiragana=12431,e.wakatakana=12527,e.wakatakanahalfwidth=65436,e.wakorean=12632,e.wasmallhiragana=12430,e.wasmallkatakana=12526,e.wattosquare=13143,e.wavedash=12316,e.wavyunderscorevertical=65076,e.wawarabic=1608,e.wawfinalarabic=65262,e.wawhamzaabovearabic=1572,e.wawhamzaabovefinalarabic=65158,e.wbsquare=13277,e.wcircle=9446,e.wcircumflex=373,e.wdieresis=7813,e.wdotaccent=7815,e.wdotbelow=7817,e.wehiragana=12433,e.weierstrass=8472,e.wekatakana=12529,e.wekorean=12638,e.weokorean=12637,e.wgrave=7809,e.whitebullet=9702,e.whitecircle=9675,e.whitecircleinverse=9689,e.whitecornerbracketleft=12302,e.whitecornerbracketleftvertical=65091,e.whitecornerbracketright=12303,e.whitecornerbracketrightvertical=65092,e.whitediamond=9671,e.whitediamondcontainingblacksmalldiamond=9672,e.whitedownpointingsmalltriangle=9663,e.whitedownpointingtriangle=9661,e.whiteleftpointingsmalltriangle=9667,e.whiteleftpointingtriangle=9665,e.whitelenticularbracketleft=12310,e.whitelenticularbracketright=12311,e.whiterightpointingsmalltriangle=9657,e.whiterightpointingtriangle=9655,e.whitesmallsquare=9643,e.whitesmilingface=9786,e.whitesquare=9633,e.whitestar=9734,e.whitetelephone=9743,e.whitetortoiseshellbracketleft=12312,e.whitetortoiseshellbracketright=12313,e.whiteuppointingsmalltriangle=9653,e.whiteuppointingtriangle=9651,e.wihiragana=12432,e.wikatakana=12528,e.wikorean=12639,e.wmonospace=65367,e.wohiragana=12434,e.wokatakana=12530,e.wokatakanahalfwidth=65382,e.won=8361,e.wonmonospace=65510,e.wowaenthai=3623,e.wparen=9394,e.wring=7832,e.wsuperior=695,e.wturned=653,e.wynn=447,e.x=120,e.xabovecmb=829,e.xbopomofo=12562,e.xcircle=9447,e.xdieresis=7821,e.xdotaccent=7819,e.xeharmenian=1389,e.xi=958,e.xmonospace=65368,e.xparen=9395,e.xsuperior=739,e.y=121,e.yaadosquare=13134,e.yabengali=2479,e.yacute=253,e.yadeva=2351,e.yaekorean=12626,e.yagujarati=2735,e.yagurmukhi=2607,e.yahiragana=12420,e.yakatakana=12516,e.yakatakanahalfwidth=65428,e.yakorean=12625,e.yamakkanthai=3662,e.yasmallhiragana=12419,e.yasmallkatakana=12515,e.yasmallkatakanahalfwidth=65388,e.yatcyrillic=1123,e.ycircle=9448,e.ycircumflex=375,e.ydieresis=255,e.ydotaccent=7823,e.ydotbelow=7925,e.yeharabic=1610,e.yehbarreearabic=1746,e.yehbarreefinalarabic=64431,e.yehfinalarabic=65266,e.yehhamzaabovearabic=1574,e.yehhamzaabovefinalarabic=65162,e.yehhamzaaboveinitialarabic=65163,e.yehhamzaabovemedialarabic=65164,e.yehinitialarabic=65267,e.yehmedialarabic=65268,e.yehmeeminitialarabic=64733,e.yehmeemisolatedarabic=64600,e.yehnoonfinalarabic=64660,e.yehthreedotsbelowarabic=1745,e.yekorean=12630,e.yen=165,e.yenmonospace=65509,e.yeokorean=12629,e.yeorinhieuhkorean=12678,e.yerahbenyomohebrew=1450,e.yerahbenyomolefthebrew=1450,e.yericyrillic=1099,e.yerudieresiscyrillic=1273,e.yesieungkorean=12673,e.yesieungpansioskorean=12675,e.yesieungsioskorean=12674,e.yetivhebrew=1434,e.ygrave=7923,e.yhook=436,e.yhookabove=7927,e.yiarmenian=1397,e.yicyrillic=1111,e.yikorean=12642,e.yinyang=9775,e.yiwnarmenian=1410,e.ymonospace=65369,e.yod=1497,e.yoddagesh=64313,e.yoddageshhebrew=64313,e.yodhebrew=1497,e.yodyodhebrew=1522,e.yodyodpatahhebrew=64287,e.yohiragana=12424,e.yoikorean=12681,e.yokatakana=12520,e.yokatakanahalfwidth=65430,e.yokorean=12635,e.yosmallhiragana=12423,e.yosmallkatakana=12519,e.yosmallkatakanahalfwidth=65390,e.yotgreek=1011,e.yoyaekorean=12680,e.yoyakorean=12679,e.yoyakthai=3618,e.yoyingthai=3597,e.yparen=9396,e.ypogegrammeni=890,e.ypogegrammenigreekcmb=837,e.yr=422,e.yring=7833,e.ysuperior=696,e.ytilde=7929,e.yturned=654,e.yuhiragana=12422,e.yuikorean=12684,e.yukatakana=12518,e.yukatakanahalfwidth=65429,e.yukorean=12640,e.yusbigcyrillic=1131,e.yusbigiotifiedcyrillic=1133,e.yuslittlecyrillic=1127,e.yuslittleiotifiedcyrillic=1129,e.yusmallhiragana=12421,e.yusmallkatakana=12517,e.yusmallkatakanahalfwidth=65389,e.yuyekorean=12683,e.yuyeokorean=12682,e.yyabengali=2527,e.yyadeva=2399,e.z=122,e.zaarmenian=1382,e.zacute=378,e.zadeva=2395,e.zagurmukhi=2651,e.zaharabic=1592,e.zahfinalarabic=65222,e.zahinitialarabic=65223,e.zahiragana=12374,e.zahmedialarabic=65224,e.zainarabic=1586,e.zainfinalarabic=65200,e.zakatakana=12470,e.zaqefgadolhebrew=1429,e.zaqefqatanhebrew=1428,e.zarqahebrew=1432,e.zayin=1494,e.zayindagesh=64310,e.zayindageshhebrew=64310,e.zayinhebrew=1494,e.zbopomofo=12567,e.zcaron=382,e.zcircle=9449,e.zcircumflex=7825,e.zcurl=657,e.zdot=380,e.zdotaccent=380,e.zdotbelow=7827,e.zecyrillic=1079,e.zedescendercyrillic=1177,e.zedieresiscyrillic=1247,e.zehiragana=12380,e.zekatakana=12476,e.zero=48,e.zeroarabic=1632,e.zerobengali=2534,e.zerodeva=2406,e.zerogujarati=2790,e.zerogurmukhi=2662,e.zerohackarabic=1632,e.zeroinferior=8320,e.zeromonospace=65296,e.zerooldstyle=63280,e.zeropersian=1776,e.zerosuperior=8304,e.zerothai=3664,e.zerowidthjoiner=65279,e.zerowidthnonjoiner=8204,e.zerowidthspace=8203,e.zeta=950,e.zhbopomofo=12563,e.zhearmenian=1386,e.zhebrevecyrillic=1218,e.zhecyrillic=1078,e.zhedescendercyrillic=1175,e.zhedieresiscyrillic=1245,e.zihiragana=12376,e.zikatakana=12472,e.zinorhebrew=1454,e.zlinebelow=7829,e.zmonospace=65370,e.zohiragana=12382,e.zokatakana=12478,e.zparen=9397,e.zretroflexhook=656,e.zstroke=438,e.zuhiragana=12378,e.zukatakana=12474,e[".notdef"]=0,e.angbracketleftbig=9001,e.angbracketleftBig=9001,e.angbracketleftbigg=9001,e.angbracketleftBigg=9001,e.angbracketrightBig=9002,e.angbracketrightbig=9002,e.angbracketrightBigg=9002,e.angbracketrightbigg=9002,e.arrowhookleft=8618,e.arrowhookright=8617,e.arrowlefttophalf=8636,e.arrowleftbothalf=8637,e.arrownortheast=8599,e.arrownorthwest=8598,e.arrowrighttophalf=8640,e.arrowrightbothalf=8641,e.arrowsoutheast=8600,e.arrowsouthwest=8601,e.backslashbig=8726,e.backslashBig=8726,e.backslashBigg=8726,e.backslashbigg=8726,e.bardbl=8214,e.bracehtipdownleft=65079,e.bracehtipdownright=65079,e.bracehtipupleft=65080,e.bracehtipupright=65080,e.braceleftBig=123,e.braceleftbig=123,e.braceleftbigg=123,e.braceleftBigg=123,e.bracerightBig=125,e.bracerightbig=125,e.bracerightbigg=125,e.bracerightBigg=125,e.bracketleftbig=91,e.bracketleftBig=91,e.bracketleftbigg=91,e.bracketleftBigg=91,e.bracketrightBig=93,e.bracketrightbig=93,e.bracketrightbigg=93,e.bracketrightBigg=93,e.ceilingleftbig=8968,e.ceilingleftBig=8968,e.ceilingleftBigg=8968,e.ceilingleftbigg=8968,e.ceilingrightbig=8969,e.ceilingrightBig=8969,e.ceilingrightbigg=8969,e.ceilingrightBigg=8969,e.circledotdisplay=8857,e.circledottext=8857,e.circlemultiplydisplay=8855,e.circlemultiplytext=8855,e.circleplusdisplay=8853,e.circleplustext=8853,e.contintegraldisplay=8750,e.contintegraltext=8750,e.coproductdisplay=8720,e.coproducttext=8720,e.floorleftBig=8970,e.floorleftbig=8970,e.floorleftbigg=8970,e.floorleftBigg=8970,e.floorrightbig=8971,e.floorrightBig=8971,e.floorrightBigg=8971,e.floorrightbigg=8971,e.hatwide=770,e.hatwider=770,e.hatwidest=770,e.intercal=7488,e.integraldisplay=8747,e.integraltext=8747,e.intersectiondisplay=8898,e.intersectiontext=8898,e.logicalanddisplay=8743,e.logicalandtext=8743,e.logicalordisplay=8744,e.logicalortext=8744,e.parenleftBig=40,e.parenleftbig=40,e.parenleftBigg=40,e.parenleftbigg=40,e.parenrightBig=41,e.parenrightbig=41,e.parenrightBigg=41,e.parenrightbigg=41,e.prime=8242,e.productdisplay=8719,e.producttext=8719,e.radicalbig=8730,e.radicalBig=8730,e.radicalBigg=8730,e.radicalbigg=8730,e.radicalbt=8730,e.radicaltp=8730,e.radicalvertex=8730,e.slashbig=47,e.slashBig=47,e.slashBigg=47,e.slashbigg=47,e.summationdisplay=8721,e.summationtext=8721,e.tildewide=732,e.tildewider=732,e.tildewidest=732,e.uniondisplay=8899,e.unionmultidisplay=8846,e.unionmultitext=8846,e.unionsqdisplay=8852,e.unionsqtext=8852,e.uniontext=8899,e.vextenddouble=8741,e.vextendsingle=8739}),r=i(function(e){e.space=32,e.a1=9985,e.a2=9986,e.a202=9987,e.a3=9988,e.a4=9742,e.a5=9990,e.a119=9991,e.a118=9992,e.a117=9993,e.a11=9755,e.a12=9758,e.a13=9996,e.a14=9997,e.a15=9998,e.a16=9999,e.a105=1e4,e.a17=10001,e.a18=10002,e.a19=10003,e.a20=10004,e.a21=10005,e.a22=10006,e.a23=10007,e.a24=10008,e.a25=10009,e.a26=10010,e.a27=10011,e.a28=10012,e.a6=10013,e.a7=10014,e.a8=10015,e.a9=10016,e.a10=10017,e.a29=10018,e.a30=10019,e.a31=10020,e.a32=10021,e.a33=10022,e.a34=10023,e.a35=9733,e.a36=10025,e.a37=10026,e.a38=10027,e.a39=10028,e.a40=10029,e.a41=10030,e.a42=10031,e.a43=10032,e.a44=10033,e.a45=10034,e.a46=10035,e.a47=10036,e.a48=10037,e.a49=10038,e.a50=10039,e.a51=10040,e.a52=10041,e.a53=10042,e.a54=10043,e.a55=10044,e.a56=10045,e.a57=10046,e.a58=10047,e.a59=10048,e.a60=10049,e.a61=10050,e.a62=10051,e.a63=10052,e.a64=10053,e.a65=10054,e.a66=10055,e.a67=10056,e.a68=10057,e.a69=10058,e.a70=10059,e.a71=9679,e.a72=10061,e.a73=9632,e.a74=10063,e.a203=10064,e.a75=10065,e.a204=10066,e.a76=9650,e.a77=9660,e.a78=9670,e.a79=10070,e.a81=9687,e.a82=10072,e.a83=10073,e.a84=10074,e.a97=10075,e.a98=10076,e.a99=10077,e.a100=10078,e.a101=10081,e.a102=10082,e.a103=10083,e.a104=10084,e.a106=10085,e.a107=10086,e.a108=10087,e.a112=9827,e.a111=9830,e.a110=9829,e.a109=9824,e.a120=9312,e.a121=9313,e.a122=9314,e.a123=9315,e.a124=9316,e.a125=9317,e.a126=9318,e.a127=9319,e.a128=9320,e.a129=9321,e.a130=10102,e.a131=10103,e.a132=10104,e.a133=10105,e.a134=10106,e.a135=10107,e.a136=10108,e.a137=10109,e.a138=10110,e.a139=10111,e.a140=10112,e.a141=10113,e.a142=10114,e.a143=10115,e.a144=10116,e.a145=10117,e.a146=10118,e.a147=10119,e.a148=10120,e.a149=10121,e.a150=10122,e.a151=10123,e.a152=10124,e.a153=10125,e.a154=10126,e.a155=10127,e.a156=10128,e.a157=10129,e.a158=10130,e.a159=10131,e.a160=10132,e.a161=8594,e.a163=8596,e.a164=8597,e.a196=10136,e.a165=10137,e.a192=10138,e.a166=10139,e.a167=10140,e.a168=10141,e.a169=10142,e.a170=10143,e.a171=10144,e.a172=10145,e.a173=10146,e.a162=10147,e.a174=10148,e.a175=10149,e.a176=10150,e.a177=10151,e.a178=10152,e.a179=10153,e.a193=10154,e.a180=10155,e.a199=10156,e.a181=10157,e.a200=10158,e.a182=10159,e.a201=10161,e.a183=10162,e.a184=10163,e.a197=10164,e.a185=10165,e.a194=10166,e.a198=10167,e.a186=10168,e.a195=10169,e.a187=10170,e.a188=10171,e.a189=10172,e.a190=10173,e.a191=10174,e.a89=10088,e.a90=10089,e.a93=10090,e.a94=10091,e.a91=10092,e.a92=10093,e.a205=10094,e.a85=10095,e.a206=10096,e.a86=10097,e.a87=10098,e.a88=10099,e.a95=10100,e.a96=10101,e[".notdef"]=0})
e.getGlyphsUnicode=a,e.getDingbatsGlyphsUnicode=r}),function(e,t){t(e.pdfjsCoreJbig2={},e.pdfjsSharedUtil,e.pdfjsCoreArithmeticDecoder)}(this,function(e,t,i){var a=t.error,r=t.log2,n=t.readInt8,s=t.readUint16,o=t.readUint32,c=t.shadow,l=i.ArithmeticDecoder,h=function(){function e(){}function t(e,t,i){this.data=e,this.start=t,this.end=i}function i(e,t,i){function a(e){for(var t=0,a=0;e>a;a++){var s=i.readBit(r,n)
n=256>n?n<<1|s:511&(n<<1|s)|256,t=t<<1|s}return t>>>0}var r=e.getContexts(t),n=1,s=a(1),o=a(1)?a(1)?a(1)?a(1)?a(1)?a(32)+4436:a(12)+340:a(8)+84:a(6)+20:a(4)+4:a(2)
return 0===s?o:o>0?-o:null}function h(e,t,i){for(var a=e.getContexts("IAID"),r=1,n=0;i>n;n++){var s=t.readBit(a,r)
r=r<<1|s}return 31>i?r&(1<<i)-1:2147483647&r}function u(e,t,i){var a,r,n,s,o,c,l,h=i.decoder,u=i.contextCache.getContexts("GB"),d=[],f=31735
for(r=0;t>r;r++)for(o=d[r]=new Uint8Array(e),c=1>r?o:d[r-1],l=2>r?o:d[r-2],a=l[0]<<13|l[1]<<12|l[2]<<11|c[0]<<7|c[1]<<6|c[2]<<5|c[3]<<4,n=0;e>n;n++)o[n]=s=h.readBit(u,a),a=(a&f)<<1|(e>n+3?l[n+3]<<11:0)|(e>n+4?c[n+4]<<4:0)|s
return d}function d(e,t,i,r,n,s,o,c){if(e&&a("JBIG2 error: MMR encoding is not supported"),0===r&&!s&&!n&&4===o.length&&3===o[0].x&&-1===o[0].y&&-3===o[1].x&&-1===o[1].y&&2===o[2].x&&-2===o[2].y&&-2===o[3].x&&-2===o[3].y)return u(t,i,c)
var l=!!s,h=A[r].concat(o)
h.sort(function(e,t){return e.y-t.y||e.x-t.x})
var d,f,g=h.length,p=new Int8Array(g),m=new Int8Array(g),v=[],b=0,y=0,w=0,k=0
for(f=0;g>f;f++)p[f]=h[f].x,m[f]=h[f].y,y=Math.min(y,h[f].x),w=Math.max(w,h[f].x),k=Math.min(k,h[f].y),g-1>f&&h[f].y===h[f+1].y&&h[f].x===h[f+1].x-1?b|=1<<g-1-f:v.push(f)
var C=v.length,x=new Int8Array(C),S=new Int8Array(C),I=new Uint16Array(C)
for(d=0;C>d;d++)f=v[d],x[d]=h[f].x,S[d]=h[f].y,I[d]=1<<g-1-f
for(var B,T,L,E,R,O=-y,M=-k,D=t-w,F=P[r],N=new Uint8Array(t),j=[],U=c.decoder,_=c.contextCache.getContexts("GB"),q=0,H=0,z=0;i>z;z++){if(n){var V=U.readBit(_,F)
if(q^=V){j.push(N)
continue}}for(N=new Uint8Array(N),j.push(N),B=0;t>B;B++)if(l&&s[z][B])N[B]=0
else{if(B>=O&&D>B&&z>=M)for(H=H<<1&b,f=0;C>f;f++)T=z+S[f],L=B+x[f],E=j[T][L],E&&(E=I[f],H|=E)
else for(H=0,R=g-1,f=0;g>f;f++,R--)L=B+p[f],L>=0&&t>L&&(T=z+m[f],T>=0&&(E=j[T][L],E&&(H|=E<<R)))
var G=U.readBit(_,H)
N[B]=G}}return j}function f(e,t,i,r,n,s,o,c,l){var h=I[i].coding
0===i&&(h=h.concat([c[0]]))
var u,d=h.length,f=new Int32Array(d),g=new Int32Array(d)
for(u=0;d>u;u++)f[u]=h[u].x,g[u]=h[u].y
var p=I[i].reference
0===i&&(p=p.concat([c[1]]))
var m=p.length,v=new Int32Array(m),b=new Int32Array(m)
for(u=0;m>u;u++)v[u]=p[u].x,b[u]=p[u].y
for(var y=r[0].length,w=r.length,k=B[i],C=[],x=l.decoder,S=l.contextCache.getContexts("GR"),A=0,P=0;t>P;P++){if(o){var T=x.readBit(S,k)
A^=T,A&&a("JBIG2 error: prediction is not supported")}var L=new Uint8Array(e)
C.push(L)
for(var E=0;e>E;E++){var R,O,M=0
for(u=0;d>u;u++)R=P+g[u],O=E+f[u],0>R||0>O||O>=e?M<<=1:M=M<<1|C[R][O]
for(u=0;m>u;u++)R=P+b[u]+s,O=E+v[u]+n,0>R||R>=w||0>O||O>=y?M<<=1:M=M<<1|r[R][O]
var D=x.readBit(S,M)
L[E]=D}}return C}function g(e,t,n,s,o,c,l,u,g,m,v){e&&a("JBIG2 error: huffman is not supported")
for(var b=[],y=0,w=r(n.length+s),k=v.decoder,C=v.contextCache;b.length<s;){var x=i(C,"IADH",k)
y+=x
for(var S=0,A=0;;){var I=i(C,"IADW",k)
if(null===I)break
S+=I,A+=S
var P
if(t){var B=i(C,"IAAI",k)
if(B>1)P=p(e,t,S,y,0,B,1,n.concat(b),w,0,0,1,0,c,g,m,v)
else{var T=h(C,k,w),L=i(C,"IARDX",k),E=i(C,"IARDY",k),R=T<n.length?n[T]:b[T-n.length]
P=f(S,y,g,R,L,E,!1,m,v)}}else P=d(!1,S,y,l,!1,null,u,v)
b.push(P)}}for(var O=[],M=[],D=!1,F=n.length+s;M.length<F;){for(var N=i(C,"IAEX",k);N--;)M.push(D)
D=!D}for(var j=0,U=n.length;U>j;j++)M[j]&&O.push(n[j])
for(var _=0;s>_;j++,_++)M[j]&&O.push(b[_])
return O}function p(e,t,r,n,s,o,c,l,u,d,g,p,m,v,b,y,w){e&&a("JBIG2 error: huffman is not supported")
var k,C,x=[]
for(k=0;n>k;k++){if(C=new Uint8Array(r),s)for(var S=0;r>S;S++)C[S]=s
x.push(C)}var A=w.decoder,I=w.contextCache,P=-i(I,"IADT",A),B=0
for(k=0;o>k;){var T=i(I,"IADT",A)
P+=T
var L=i(I,"IAFS",A)
B+=L
for(var E=B;;){var R=1===c?0:i(I,"IAIT",A),O=c*P+R,M=h(I,A,u),D=t&&i(I,"IARI",A),F=l[M],N=F[0].length,j=F.length
if(D){var U=i(I,"IARDW",A),_=i(I,"IARDH",A),q=i(I,"IARDX",A),H=i(I,"IARDY",A)
N+=U,j+=_,F=f(N,j,b,F,(U>>1)+q,(_>>1)+H,!1,y,w)}var z,V,G,W=O-(1&p?0:j),X=E-(2&p?N:0)
if(d){for(z=0;j>z;z++)if(C=x[X+z]){G=F[z]
var K=Math.min(r-W,N)
switch(m){case 0:for(V=0;K>V;V++)C[W+V]|=G[V]
break
case 2:for(V=0;K>V;V++)C[W+V]^=G[V]
break
default:a("JBIG2 error: operator "+m+" is not supported")}}E+=j-1}else{for(V=0;j>V;V++)if(C=x[W+V])switch(G=F[V],m){case 0:for(z=0;N>z;z++)C[X+z]|=G[z]
break
case 2:for(z=0;N>z;z++)C[X+z]^=G[z]
break
default:a("JBIG2 error: operator "+m+" is not supported")}E+=N-1}k++
var Y=i(I,"IADS",A)
if(null===Y)break
E+=Y+g}}return x}function m(e,t){var i={}
i.number=o(e,t)
var r=e[t+4],n=63&r
S[n]||a("JBIG2 error: invalid segment type: "+n),i.type=n,i.typeName=S[n],i.deferredNonRetain=!!(128&r)
var c=!!(64&r),l=e[t+5],h=l>>5&7,u=[31&l],d=t+6
if(7===l){h=536870911&o(e,d-1),d+=3
var f=h+7>>3
for(u[0]=e[d++];--f>0;)u.push(e[d++])}else(5===l||6===l)&&a("JBIG2 error: invalid referred-to flags")
i.retainBits=u
var g,p,m=i.number<=256?1:i.number<=65536?2:4,v=[]
for(g=0;h>g;g++){var y=1===m?e[d]:2===m?s(e,d):o(e,d)
v.push(y),d+=m}if(i.referredTo=v,c?(i.pageAssociation=o(e,d),d+=4):i.pageAssociation=e[d++],i.length=o(e,d),d+=4,4294967295===i.length)if(38===n){var w=b(e,d),k=e[d+T],C=!!(1&k),x=6,A=new Uint8Array(x)
for(C||(A[0]=255,A[1]=172),A[2]=w.height>>>24&255,A[3]=w.height>>16&255,A[4]=w.height>>8&255,A[5]=255&w.height,g=d,p=e.length;p>g;g++){for(var I=0;x>I&&A[I]===e[g+I];)I++
if(I===x){i.length=g+x
break}}4294967295===i.length&&a("JBIG2 error: segment end was not found")}else a("JBIG2 error: invalid unknown segment length")
return i.headerEnd=d,i}function v(e,t,i,a){for(var r=[],n=i;a>n;){var s=m(t,n)
n=s.headerEnd
var o={header:s,data:t}
if(e.randomAccess||(o.start=n,n+=s.length,o.end=n),r.push(o),51===s.type)break}if(e.randomAccess)for(var c=0,l=r.length;l>c;c++)r[c].start=n,n+=r[c].header.length,r[c].end=n
return r}function b(e,t){return{width:o(e,t),height:o(e,t+4),x:o(e,t+8),y:o(e,t+12),combinationOperator:7&e[t+16]}}function y(e,t){var i,r,c,l,h=e.header,u=e.data,d=e.start,f=e.end
switch(h.type){case 0:var g={},p=s(u,d)
if(g.huffman=!!(1&p),g.refinement=!!(2&p),g.huffmanDHSelector=p>>2&3,g.huffmanDWSelector=p>>4&3,g.bitmapSizeSelector=p>>6&1,g.aggregationInstancesSelector=p>>7&1,g.bitmapCodingContextUsed=!!(256&p),g.bitmapCodingContextRetained=!!(512&p),g.template=p>>10&3,g.refinementTemplate=p>>12&1,d+=2,!g.huffman){for(l=0===g.template?4:1,r=[],c=0;l>c;c++)r.push({x:n(u,d),y:n(u,d+1)}),d+=2
g.at=r}if(g.refinement&&!g.refinementTemplate){for(r=[],c=0;2>c;c++)r.push({x:n(u,d),y:n(u,d+1)}),d+=2
g.refinementAt=r}g.numberOfExportedSymbols=o(u,d),d+=4,g.numberOfNewSymbols=o(u,d),d+=4,i=[g,h.number,h.referredTo,u,d,f]
break
case 6:case 7:var m={}
m.info=b(u,d),d+=T
var v=s(u,d)
if(d+=2,m.huffman=!!(1&v),m.refinement=!!(2&v),m.stripSize=1<<(v>>2&3),m.referenceCorner=v>>4&3,m.transposed=!!(64&v),m.combinationOperator=v>>7&3,m.defaultPixelValue=v>>9&1,m.dsOffset=v<<17>>27,m.refinementTemplate=v>>15&1,m.huffman){var y=s(u,d)
d+=2,m.huffmanFS=3&y,m.huffmanDS=y>>2&3,m.huffmanDT=y>>4&3,m.huffmanRefinementDW=y>>6&3,m.huffmanRefinementDH=y>>8&3,m.huffmanRefinementDX=y>>10&3,m.huffmanRefinementDY=y>>12&3,m.huffmanRefinementSizeSelector=!!(14&y)}if(m.refinement&&!m.refinementTemplate){for(r=[],c=0;2>c;c++)r.push({x:n(u,d),y:n(u,d+1)}),d+=2
m.refinementAt=r}m.numberOfSymbolInstances=o(u,d),d+=4,m.huffman&&a("JBIG2 error: huffman is not supported"),i=[m,h.referredTo,u,d,f]
break
case 38:case 39:var w={}
w.info=b(u,d),d+=T
var k=u[d++]
if(w.mmr=!!(1&k),w.template=k>>1&3,w.prediction=!!(8&k),!w.mmr){for(l=0===w.template?4:1,r=[],c=0;l>c;c++)r.push({x:n(u,d),y:n(u,d+1)}),d+=2
w.at=r}i=[w,u,d,f]
break
case 48:var C={width:o(u,d),height:o(u,d+4),resolutionX:o(u,d+8),resolutionY:o(u,d+12)}
4294967295===C.height&&delete C.height
var x=u[d+16]
s(u,d+17)
C.lossless=!!(1&x),C.refinement=!!(2&x),C.defaultPixelValue=x>>2&1,C.combinationOperator=x>>3&3,C.requiresBuffer=!!(32&x),C.combinationOperatorOverride=!!(64&x),i=[C]
break
case 49:break
case 50:break
case 51:break
case 62:break
default:a("JBIG2 error: segment type "+h.typeName+"("+h.type+") is not implemented")}var S="on"+h.typeName
S in t&&t[S].apply(t,i)}function w(e,t){for(var i=0,a=e.length;a>i;i++)y(e[i],t)}function k(e){for(var t=new C,i=0,a=e.length;a>i;i++){var r=e[i],n=v({},r.data,r.start,r.end)
w(n,t)}return t.buffer}function C(){}function x(){}e.prototype={getContexts:function(e){return e in this?this[e]:this[e]=new Int8Array(65536)}},t.prototype={get decoder(){var e=new l(this.data,this.start,this.end)
return c(this,"decoder",e)},get contextCache(){var t=new e
return c(this,"contextCache",t)}}
var S=["SymbolDictionary",null,null,null,"IntermediateTextRegion",null,"ImmediateTextRegion","ImmediateLosslessTextRegion",null,null,null,null,null,null,null,null,"patternDictionary",null,null,null,"IntermediateHalftoneRegion",null,"ImmediateHalftoneRegion","ImmediateLosslessHalftoneRegion",null,null,null,null,null,null,null,null,null,null,null,null,"IntermediateGenericRegion",null,"ImmediateGenericRegion","ImmediateLosslessGenericRegion","IntermediateGenericRefinementRegion",null,"ImmediateGenericRefinementRegion","ImmediateLosslessGenericRefinementRegion",null,null,null,null,"PageInformation","EndOfPage","EndOfStripe","EndOfFile","Profiles","Tables",null,null,null,null,null,null,null,null,"Extension"],A=[[{x:-1,y:-2},{x:0,y:-2},{x:1,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:2,y:-1},{x:-4,y:0},{x:-3,y:0},{x:-2,y:0},{x:-1,y:0}],[{x:-1,y:-2},{x:0,y:-2},{x:1,y:-2},{x:2,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:2,y:-1},{x:-3,y:0},{x:-2,y:0},{x:-1,y:0}],[{x:-1,y:-2},{x:0,y:-2},{x:1,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:-2,y:0},{x:-1,y:0}],[{x:-3,y:-1},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:-4,y:0},{x:-3,y:0},{x:-2,y:0},{x:-1,y:0}]],I=[{coding:[{x:0,y:-1},{x:1,y:-1},{x:-1,y:0}],reference:[{x:0,y:-1},{x:1,y:-1},{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:-1,y:1},{x:0,y:1},{x:1,y:1}]},{coding:[{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:-1,y:0}],reference:[{x:0,y:-1},{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1}]}],P=[39717,1941,229,405],B=[32,8],T=17
return C.prototype={onPageInformation:function(e){this.currentPageInfo=e
var t=e.width+7>>3,i=new Uint8Array(t*e.height)
if(e.defaultPixelValue)for(var a=0,r=i.length;r>a;a++)i[a]=255
this.buffer=i},drawBitmap:function(e,t){var i,r,n,s,o=this.currentPageInfo,c=e.width,l=e.height,h=o.width+7>>3,u=o.combinationOperatorOverride?e.combinationOperator:o.combinationOperator,d=this.buffer,f=128>>(7&e.x),g=e.y*h+(e.x>>3)
switch(u){case 0:for(i=0;l>i;i++){for(n=f,s=g,r=0;c>r;r++)t[i][r]&&(d[s]|=n),n>>=1,n||(n=128,s++)
g+=h}break
case 2:for(i=0;l>i;i++){for(n=f,s=g,r=0;c>r;r++)t[i][r]&&(d[s]^=n),n>>=1,n||(n=128,s++)
g+=h}break
default:a("JBIG2 error: operator "+u+" is not supported")}},onImmediateGenericRegion:function(e,i,a,r){var n=e.info,s=new t(i,a,r),o=d(e.mmr,n.width,n.height,e.template,e.prediction,null,e.at,s)
this.drawBitmap(n,o)},onImmediateLosslessGenericRegion:function(){this.onImmediateGenericRegion.apply(this,arguments)},onSymbolDictionary:function(e,i,r,n,s,o){var c
e.huffman&&a("JBIG2 error: huffman is not supported")
var l=this.symbols
l||(this.symbols=l={})
for(var h=[],u=0,d=r.length;d>u;u++)h=h.concat(l[r[u]])
var f=new t(n,s,o)
l[i]=g(e.huffman,e.refinement,h,e.numberOfNewSymbols,e.numberOfExportedSymbols,c,e.template,e.at,e.refinementTemplate,e.refinementAt,f)},onImmediateTextRegion:function(e,i,a,n,s){for(var o,c=e.info,l=this.symbols,h=[],u=0,d=i.length;d>u;u++)h=h.concat(l[i[u]])
var f=r(h.length),g=new t(a,n,s),m=p(e.huffman,e.refinement,c.width,c.height,e.defaultPixelValue,e.numberOfSymbolInstances,e.stripSize,h,f,e.transposed,e.dsOffset,e.referenceCorner,e.combinationOperator,o,e.refinementTemplate,e.refinementAt,g)
this.drawBitmap(c,m)},onImmediateLosslessTextRegion:function(){this.onImmediateTextRegion.apply(this,arguments)}},x.prototype={parseChunks:function(e){return k(e)}},x}()
e.Jbig2Image=h}),function(e,t){t(e.pdfjsCoreJpg={},e.pdfjsSharedUtil)}(this,function(e,t){var i=t.error,a=function(){function e(){this.decodeTransform=null,this.colorTransform=-1}function t(e,t){for(var i,a,r=0,n=[],s=16;s>0&&!e[s-1];)s--
n.push({children:[],index:0})
var o,c=n[0]
for(i=0;s>i;i++){for(a=0;a<e[i];a++){for(c=n.pop(),c.children[c.index]=t[r];c.index>0;)c=n.pop()
for(c.index++,n.push(c);n.length<=i;)n.push(o={children:[],index:0}),c.children[c.index]=o.children,c=o
r++}s>i+1&&(n.push(o={children:[],index:0}),c.children[c.index]=o.children,c=o)}return n[0].children}function a(e,t,i){return 64*((e.blocksPerLine+1)*t+i)}function r(e,t,r,n,s,o,l,h,u){function d(){if(M>0)return M--,O>>M&1
if(O=e[t++],255===O){var a=e[t++]
a&&i("JPEG error: unexpected marker "+(O<<8|a).toString(16))}return M=7,O>>>7}function f(e){for(var t=e;;){if(t=t[d()],"number"==typeof t)return t
"object"!=typeof t&&i("JPEG error: invalid huffman sequence")}}function g(e){for(var t=0;e>0;)t=t<<1|d(),e--
return t}function p(e){if(1===e)return 1===d()?1:-1
var t=g(e)
return t>=1<<e-1?t:t+(-1<<e)+1}function m(e,t){var i=f(e.huffmanTableDC),a=0===i?0:p(i)
e.blockData[t]=e.pred+=a
for(var r=1;64>r;){var n=f(e.huffmanTableAC),s=15&n,o=n>>4
if(0!==s){r+=o
var l=c[r]
e.blockData[t+l]=p(s),r++}else{if(15>o)break
r+=16}}}function v(e,t){var i=f(e.huffmanTableDC),a=0===i?0:p(i)<<u
e.blockData[t]=e.pred+=a}function b(e,t){e.blockData[t]|=d()<<u}function y(e,t){if(D>0)return void D--
for(var i=o,a=l;a>=i;){var r=f(e.huffmanTableAC),n=15&r,s=r>>4
if(0!==n){i+=s
var h=c[i]
e.blockData[t+h]=p(n)*(1<<u),i++}else{if(15>s){D=g(s)+(1<<s)-1
break}i+=16}}}function w(e,t){for(var a,r,n=o,s=l,h=0;s>=n;){var m=c[n]
switch(F){case 0:r=f(e.huffmanTableAC),a=15&r,h=r>>4,0===a?15>h?(D=g(h)+(1<<h),F=4):(h=16,F=1):(1!==a&&i("JPEG error: invalid ACn encoding"),x=p(a),F=h?2:3)
continue
case 1:case 2:e.blockData[t+m]?e.blockData[t+m]+=d()<<u:(h--,0===h&&(F=2===F?3:0))
break
case 3:e.blockData[t+m]?e.blockData[t+m]+=d()<<u:(e.blockData[t+m]=x<<u,F=0)
break
case 4:e.blockData[t+m]&&(e.blockData[t+m]+=d()<<u)}n++}4===F&&(D--,0===D&&(F=0))}function k(e,t,i,r,n){var s=i/L|0,o=i%L,c=s*e.v+r,l=o*e.h+n,h=a(e,c,l)
t(e,h)}function C(e,t,i){var r=i/e.blocksPerLine|0,n=i%e.blocksPerLine,s=a(e,r,n)
t(e,s)}var x,S,A,I,P,B,T,L=r.mcusPerLine,E=r.progressive,R=t,O=0,M=0,D=0,F=0,N=n.length
T=E?0===o?0===h?v:b:0===h?y:w:m
var j,U,_=0
U=1===N?n[0].blocksPerLine*n[0].blocksPerColumn:L*r.mcusPerColumn,s||(s=U)
for(var q,H;U>_;){for(A=0;N>A;A++)n[A].pred=0
if(D=0,1===N)for(S=n[0],B=0;s>B;B++)C(S,T,_),_++
else for(B=0;s>B;B++){for(A=0;N>A;A++)for(S=n[A],q=S.h,H=S.v,I=0;H>I;I++)for(P=0;q>P;P++)k(S,T,_,I,P)
_++}for(M=0,j=e[t]<<8|e[t+1];0===e[t]&&t<e.length-1;)t++,j=e[t]<<8|e[t+1]
if(65280>=j&&i("JPEG error: marker was not found"),!(j>=65488&&65495>=j))break
t+=2}return t-R}function n(e,t,a){var r,n,s,o,c,v,b,y,w,k,C,x,S,A,I,P,B,T=e.quantizationTable,L=e.blockData
T||i("JPEG error: missing required Quantization Table.")
for(var E=0;64>E;E+=8)w=L[t+E],k=L[t+E+1],C=L[t+E+2],x=L[t+E+3],S=L[t+E+4],A=L[t+E+5],I=L[t+E+6],P=L[t+E+7],w*=T[E],0!==(k|C|x|S|A|I|P)?(k*=T[E+1],C*=T[E+2],x*=T[E+3],S*=T[E+4],A*=T[E+5],I*=T[E+6],P*=T[E+7],r=p*w+128>>8,n=p*S+128>>8,s=C,o=I,c=m*(k-P)+128>>8,y=m*(k+P)+128>>8,v=x<<4,b=A<<4,r=r+n+1>>1,n=r-n,B=s*g+o*f+128>>8,s=s*f-o*g+128>>8,o=B,c=c+b+1>>1,b=c-b,y=y+v+1>>1,v=y-v,r=r+o+1>>1,o=r-o,n=n+s+1>>1,s=n-s,B=c*d+y*u+2048>>12,c=c*u-y*d+2048>>12,y=B,B=v*h+b*l+2048>>12,v=v*l-b*h+2048>>12,b=B,a[E]=r+y,a[E+7]=r-y,a[E+1]=n+b,a[E+6]=n-b,a[E+2]=s+v,a[E+5]=s-v,a[E+3]=o+c,a[E+4]=o-c):(B=p*w+512>>10,a[E]=B,a[E+1]=B,a[E+2]=B,a[E+3]=B,a[E+4]=B,a[E+5]=B,a[E+6]=B,a[E+7]=B)
for(var R=0;8>R;++R)w=a[R],k=a[R+8],C=a[R+16],x=a[R+24],S=a[R+32],A=a[R+40],I=a[R+48],P=a[R+56],0!==(k|C|x|S|A|I|P)?(r=p*w+2048>>12,n=p*S+2048>>12,s=C,o=I,c=m*(k-P)+2048>>12,y=m*(k+P)+2048>>12,v=x,b=A,r=(r+n+1>>1)+4112,n=r-n,B=s*g+o*f+2048>>12,s=s*f-o*g+2048>>12,o=B,c=c+b+1>>1,b=c-b,y=y+v+1>>1,v=y-v,r=r+o+1>>1,o=r-o,n=n+s+1>>1,s=n-s,B=c*d+y*u+2048>>12,c=c*u-y*d+2048>>12,y=B,B=v*h+b*l+2048>>12,v=v*l-b*h+2048>>12,b=B,w=r+y,P=r-y,k=n+b,I=n-b,C=s+v,A=s-v,x=o+c,S=o-c,w=16>w?0:w>=4080?255:w>>4,k=16>k?0:k>=4080?255:k>>4,C=16>C?0:C>=4080?255:C>>4,x=16>x?0:x>=4080?255:x>>4,S=16>S?0:S>=4080?255:S>>4,A=16>A?0:A>=4080?255:A>>4,I=16>I?0:I>=4080?255:I>>4,P=16>P?0:P>=4080?255:P>>4,L[t+R]=w,L[t+R+8]=k,L[t+R+16]=C,L[t+R+24]=x,L[t+R+32]=S,L[t+R+40]=A,L[t+R+48]=I,L[t+R+56]=P):(B=p*w+8192>>14,B=-2040>B?0:B>=2024?255:B+2056>>4,L[t+R]=B,L[t+R+8]=B,L[t+R+16]=B,L[t+R+24]=B,L[t+R+32]=B,L[t+R+40]=B,L[t+R+48]=B,L[t+R+56]=B)}function s(e,t){for(var i=t.blocksPerLine,r=t.blocksPerColumn,s=new Int16Array(64),o=0;r>o;o++)for(var c=0;i>c;c++){var l=a(t,o,c)
n(t,l,s)}return t.blockData}function o(e){return 0>=e?0:e>=255?255:e}var c=new Uint8Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]),l=4017,h=799,u=3406,d=2276,f=1567,g=3784,p=5793,m=2896
return e.prototype={parse:function(e){function a(){var t=e[u]<<8|e[u+1]
return u+=2,t}function n(){var t=a(),i=e.subarray(u,u+t-2)
return u+=i.length,i}function o(e){for(var t=Math.ceil(e.samplesPerLine/8/e.maxH),i=Math.ceil(e.scanLines/8/e.maxV),a=0;a<e.components.length;a++){U=e.components[a]
var r=Math.ceil(Math.ceil(e.samplesPerLine/8)*U.h/e.maxH),n=Math.ceil(Math.ceil(e.scanLines/8)*U.v/e.maxV),s=t*U.h,o=i*U.v,c=64*o*(s+1)
U.blockData=new Int16Array(c),U.blocksPerLine=r,U.blocksPerColumn=n}e.mcusPerLine=t,e.mcusPerColumn=i}var l,h,u=0,d=null,f=null,g=[],p=[],m=[],v=a()
for(65496!==v&&i("JPEG error: SOI not found"),v=a();65497!==v;){var b,y,w
switch(v){case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:var k=n()
65504===v&&74===k[0]&&70===k[1]&&73===k[2]&&70===k[3]&&0===k[4]&&(d={version:{major:k[5],minor:k[6]},densityUnits:k[7],xDensity:k[8]<<8|k[9],yDensity:k[10]<<8|k[11],thumbWidth:k[12],thumbHeight:k[13],thumbData:k.subarray(14,14+3*k[12]*k[13])}),65518===v&&65===k[0]&&100===k[1]&&111===k[2]&&98===k[3]&&101===k[4]&&(f={version:k[5]<<8|k[6],flags0:k[7]<<8|k[8],flags1:k[9]<<8|k[10],transformCode:k[11]})
break
case 65499:for(var C,x=a(),S=x+u-2;S>u;){var A=e[u++],I=new Uint16Array(64)
if(A>>4===0)for(y=0;64>y;y++)C=c[y],I[C]=e[u++]
else if(A>>4===1)for(y=0;64>y;y++)C=c[y],I[C]=a()
else i("JPEG error: DQT - invalid table spec")
g[15&A]=I}break
case 65472:case 65473:case 65474:l&&i("JPEG error: Only single frame JPEGs supported"),a(),l={},l.extended=65473===v,l.progressive=65474===v,l.precision=e[u++],l.scanLines=a(),l.samplesPerLine=a(),l.components=[],l.componentIds={}
var P,B=e[u++],T=0,L=0
for(b=0;B>b;b++){P=e[u]
var E=e[u+1]>>4,R=15&e[u+1]
E>T&&(T=E),R>L&&(L=R)
var O=e[u+2]
w=l.components.push({h:E,v:R,quantizationId:O,quantizationTable:null}),l.componentIds[P]=w-1,u+=3}l.maxH=T,l.maxV=L,o(l)
break
case 65476:var M=a()
for(b=2;M>b;){var D=e[u++],F=new Uint8Array(16),N=0
for(y=0;16>y;y++,u++)N+=F[y]=e[u]
var j=new Uint8Array(N)
for(y=0;N>y;y++,u++)j[y]=e[u]
b+=17+N,(D>>4===0?m:p)[15&D]=t(F,j)}break
case 65501:a(),h=a()
break
case 65498:var U,_=(a(),e[u++]),q=[]
for(b=0;_>b;b++){var H=l.componentIds[e[u++]]
U=l.components[H]
var z=e[u++]
U.huffmanTableDC=m[z>>4],U.huffmanTableAC=p[15&z],q.push(U)}var V=e[u++],G=e[u++],W=e[u++],X=r(e,u,l,q,h,V,G,W>>4,15&W)
u+=X
break
case 65535:255!==e[u]&&u--
break
default:if(255===e[u-3]&&e[u-2]>=192&&e[u-2]<=254){u-=3
break}i("JPEG error: unknown marker "+v.toString(16))}v=a()}for(this.width=l.samplesPerLine,this.height=l.scanLines,this.jfif=d,this.adobe=f,this.components=[],b=0;b<l.components.length;b++){U=l.components[b]
var K=g[U.quantizationId]
K&&(U.quantizationTable=K),this.components.push({output:s(l,U),scaleX:U.h/l.maxH,scaleY:U.v/l.maxV,blocksPerLine:U.blocksPerLine,blocksPerColumn:U.blocksPerColumn})}this.numComponents=this.components.length},_getLinearizedBlockData:function(e,t){var i,a,r,n,s,o,c,l,h,u,d,f=this.width/e,g=this.height/t,p=0,m=this.components.length,v=e*t*m,b=new Uint8Array(v),y=new Uint32Array(e),w=4294967288
for(c=0;m>c;c++){for(i=this.components[c],a=i.scaleX*f,r=i.scaleY*g,p=c,d=i.output,n=i.blocksPerLine+1<<3,s=0;e>s;s++)l=0|s*a,y[s]=(l&w)<<3|7&l
for(o=0;t>o;o++)for(l=0|o*r,u=n*(l&w)|(7&l)<<3,s=0;e>s;s++)b[p]=d[u+y[s]],p+=m}var k=this.decodeTransform
if(k)for(c=0;v>c;)for(l=0,h=0;m>l;l++,c++,h+=2)b[c]=(b[c]*k[h]>>8)+k[h+1]
return b},_isColorConversionNeeded:function(){return this.adobe&&this.adobe.transformCode?!0:3===this.numComponents?this.adobe||0!==this.colorTransform?!0:!1:this.adobe||1!==this.colorTransform?!1:!0},_convertYccToRgb:function(e){for(var t,i,a,r=0,n=e.length;n>r;r+=3)t=e[r],i=e[r+1],a=e[r+2],e[r]=o(t-179.456+1.402*a),e[r+1]=o(t+135.459-.344*i-.714*a),e[r+2]=o(t-226.816+1.772*i)
return e},_convertYcckToRgb:function(e){for(var t,i,a,r,n=0,s=0,c=e.length;c>s;s+=4){t=e[s],i=e[s+1],a=e[s+2],r=e[s+3]
var l=-122.67195406894+i*(-660635669420364e-19*i+.000437130475926232*a-54080610064599e-18*t+.00048449797120281*r-.154362151871126)+a*(-.000957964378445773*a+.000817076911346625*t-.00477271405408747*r+1.53380253221734)+t*(.000961250184130688*t-.00266257332283933*r+.48357088451265)+r*(-.000336197177618394*r+.484791561490776),h=107.268039397724+i*(219927104525741e-19*i-.000640992018297945*a+.000659397001245577*t+.000426105652938837*r-.176491792462875)+a*(-.000778269941513683*a+.00130872261408275*t+.000770482631801132*r-.151051492775562)+t*(.00126935368114843*t-.00265090189010898*r+.25802910206845)+r*(-.000318913117588328*r-.213742400323665),u=-20.810012546947+i*(-.000570115196973677*i-263409051004589e-19*a+.0020741088115012*t-.00288260236853442*r+.814272968359295)+a*(-153496057440975e-19*a-.000132689043961446*t+.000560833691242812*r-.195152027534049)+t*(.00174418132927582*t-.00255243321439347*r+.116935020465145)+r*(-.000343531996510555*r+.24165260232407)
e[n++]=o(l),e[n++]=o(h),e[n++]=o(u)}return e},_convertYcckToCmyk:function(e){for(var t,i,a,r=0,n=e.length;n>r;r+=4)t=e[r],i=e[r+1],a=e[r+2],e[r]=o(434.456-t-1.402*a),e[r+1]=o(119.541-t+.344*i+.714*a),e[r+2]=o(481.816-t-1.772*i)
return e},_convertCmykToRgb:function(e){for(var t,i,a,r,n=0,s=-16581375,o=1/255/255,c=0,l=e.length;l>c;c+=4){t=e[c],i=e[c+1],a=e[c+2],r=e[c+3]
var h=t*(-4.387332384609988*t+54.48615194189176*i+18.82290502165302*a+212.25662451639585*r-72734.4411664936)+i*(1.7149763477362134*i-5.6096736904047315*a-17.873870861415444*r-1401.7366389350734)+a*(-2.5217340131683033*a-21.248923337353073*r+4465.541406466231)-r*(21.86122147463605*r+48317.86113160301),u=t*(8.841041422036149*t+60.118027045597366*i+6.871425592049007*a+31.159100130055922*r-20220.756542821975)+i*(-15.310361306967817*i+17.575251261109482*a+131.35250912493976*r-48691.05921601825)+a*(4.444339102852739*a+9.8632861493405*r-6341.191035517494)-r*(20.737325471181034*r+47890.15695978492),d=t*(.8842522430003296*t+8.078677503112928*i+30.89978309703729*a-.23883238689178934*r-3616.812083916688)+i*(10.49593273432072*i+63.02378494754052*a+50.606957656360734*r-28620.90484698408)+a*(.03296041114873217*a+115.60384449646641*r-49363.43385999684)-r*(22.33816807309886*r+45932.16563550634)
e[n++]=h>=0?255:s>=h?0:255+h*o|0,e[n++]=u>=0?255:s>=u?0:255+u*o|0,e[n++]=d>=0?255:s>=d?0:255+d*o|0}return e},getData:function(e,t,a){this.numComponents>4&&i("JPEG error: Unsupported color mode")
var r=this._getLinearizedBlockData(e,t)
if(1===this.numComponents&&a){for(var n=r.length,s=new Uint8Array(3*n),o=0,c=0;n>c;c++){var l=r[c]
s[o++]=l,s[o++]=l,s[o++]=l}return s}if(3===this.numComponents&&this._isColorConversionNeeded())return this._convertYccToRgb(r)
if(4===this.numComponents){if(this._isColorConversionNeeded())return a?this._convertYcckToRgb(r):this._convertYcckToCmyk(r)
if(a)return this._convertCmykToRgb(r)}return r}},e}()
e.JpegImage=a}),function(e,t){t(e.pdfjsCoreJpx={},e.pdfjsSharedUtil,e.pdfjsCoreArithmeticDecoder)}(this,function(e,t,i){var a=t.info,r=t.warn,n=t.error,s=t.log2,o=t.readUint16,c=t.readUint32,l=i.ArithmeticDecoder,h=function(){function e(){this.failOnCorruptedImage=!1}function t(e,t){e.x0=Math.ceil(t.XOsiz/e.XRsiz),e.x1=Math.ceil(t.Xsiz/e.XRsiz),e.y0=Math.ceil(t.YOsiz/e.YRsiz),e.y1=Math.ceil(t.Ysiz/e.YRsiz),e.width=e.x1-e.x0,e.height=e.y1-e.y0}function i(e,t){for(var i,a=e.SIZ,r=[],n=Math.ceil((a.Xsiz-a.XTOsiz)/a.XTsiz),s=Math.ceil((a.Ysiz-a.YTOsiz)/a.YTsiz),o=0;s>o;o++)for(var c=0;n>c;c++)i={},i.tx0=Math.max(a.XTOsiz+c*a.XTsiz,a.XOsiz),i.ty0=Math.max(a.YTOsiz+o*a.YTsiz,a.YOsiz),i.tx1=Math.min(a.XTOsiz+(c+1)*a.XTsiz,a.Xsiz),i.ty1=Math.min(a.YTOsiz+(o+1)*a.YTsiz,a.Ysiz),i.width=i.tx1-i.tx0,i.height=i.ty1-i.ty0,i.components=[],r.push(i)
e.tiles=r
for(var l=a.Csiz,h=0,u=l;u>h;h++)for(var d=t[h],f=0,g=r.length;g>f;f++){var p={}
i=r[f],p.tcx0=Math.ceil(i.tx0/d.XRsiz),p.tcy0=Math.ceil(i.ty0/d.YRsiz),p.tcx1=Math.ceil(i.tx1/d.XRsiz),p.tcy1=Math.ceil(i.ty1/d.YRsiz),p.width=p.tcx1-p.tcx0,p.height=p.tcy1-p.tcy0,i.components[h]=p}}function h(e,t,i){var a=t.codingStyleParameters,r={}
return a.entropyCoderWithCustomPrecincts?(r.PPx=a.precinctsSizes[i].PPx,r.PPy=a.precinctsSizes[i].PPy):(r.PPx=15,r.PPy=15),r.xcb_=i>0?Math.min(a.xcb,r.PPx-1):Math.min(a.xcb,r.PPx),r.ycb_=i>0?Math.min(a.ycb,r.PPy-1):Math.min(a.ycb,r.PPy),r}function u(e,t,i){var a=1<<i.PPx,r=1<<i.PPy,n=0===t.resLevel,s=1<<i.PPx+(n?0:-1),o=1<<i.PPy+(n?0:-1),c=t.trx1>t.trx0?Math.ceil(t.trx1/a)-Math.floor(t.trx0/a):0,l=t.try1>t.try0?Math.ceil(t.try1/r)-Math.floor(t.try0/r):0,h=c*l
t.precinctParameters={precinctWidth:a,precinctHeight:r,numprecinctswide:c,numprecinctshigh:l,numprecincts:h,precinctWidthInSubband:s,precinctHeightInSubband:o}}function d(e,t,i){var a,r,n,s,o=i.xcb_,c=i.ycb_,l=1<<o,h=1<<c,u=t.tbx0>>o,d=t.tby0>>c,f=t.tbx1+l-1>>o,g=t.tby1+h-1>>c,p=t.resolution.precinctParameters,m=[],v=[]
for(r=d;g>r;r++)for(a=u;f>a;a++){n={cbx:a,cby:r,tbx0:l*a,tby0:h*r,tbx1:l*(a+1),tby1:h*(r+1)},n.tbx0_=Math.max(t.tbx0,n.tbx0),n.tby0_=Math.max(t.tby0,n.tby0),n.tbx1_=Math.min(t.tbx1,n.tbx1),n.tby1_=Math.min(t.tby1,n.tby1)
var b=Math.floor((n.tbx0_-t.tbx0)/p.precinctWidthInSubband),y=Math.floor((n.tby0_-t.tby0)/p.precinctHeightInSubband)
if(s=b+y*p.numprecinctswide,n.precinctNumber=s,n.subbandType=t.type,n.Lblock=3,!(n.tbx1_<=n.tbx0_||n.tby1_<=n.tby0_)){m.push(n)
var w=v[s]
void 0!==w?(a<w.cbxMin?w.cbxMin=a:a>w.cbxMax&&(w.cbxMax=a),r<w.cbyMin?w.cbxMin=r:r>w.cbyMax&&(w.cbyMax=r)):v[s]=w={cbxMin:a,cbyMin:r,cbxMax:a,cbyMax:r},n.precinct=w}}t.codeblockParameters={codeblockWidth:o,codeblockHeight:c,numcodeblockwide:f-u+1,numcodeblockhigh:g-d+1},t.codeblocks=m,t.precincts=v}function f(e,t,i){for(var a=[],r=e.subbands,n=0,s=r.length;s>n;n++)for(var o=r[n],c=o.codeblocks,l=0,h=c.length;h>l;l++){var u=c[l]
u.precinctNumber===t&&a.push(u)}return{layerNumber:i,codeblocks:a}}function g(e){for(var t=e.SIZ,i=e.currentTile.index,a=e.tiles[i],r=a.codingStyleDefaultParameters.layersCount,s=t.Csiz,o=0,c=0;s>c;c++)o=Math.max(o,a.components[c].codingStyleParameters.decompositionLevelsCount)
var l=0,h=0,u=0,d=0
this.nextPacket=function(){for(;r>l;l++){for(;o>=h;h++){for(;s>u;u++){var e=a.components[u]
if(!(h>e.codingStyleParameters.decompositionLevelsCount)){for(var t=e.resolutions[h],i=t.precinctParameters.numprecincts;i>d;){var c=f(t,d,l)
return d++,c}d=0}}u=0}h=0}n("JPX Error: Out of packets")}}function p(e){for(var t=e.SIZ,i=e.currentTile.index,a=e.tiles[i],r=a.codingStyleDefaultParameters.layersCount,s=t.Csiz,o=0,c=0;s>c;c++)o=Math.max(o,a.components[c].codingStyleParameters.decompositionLevelsCount)
var l=0,h=0,u=0,d=0
this.nextPacket=function(){for(;o>=l;l++){for(;r>h;h++){for(;s>u;u++){var e=a.components[u]
if(!(l>e.codingStyleParameters.decompositionLevelsCount)){for(var t=e.resolutions[l],i=t.precinctParameters.numprecincts;i>d;){var c=f(t,d,h)
return d++,c}d=0}}u=0}h=0}n("JPX Error: Out of packets")}}function m(e){var t,i,a,r,s=e.SIZ,o=e.currentTile.index,c=e.tiles[o],l=c.codingStyleDefaultParameters.layersCount,h=s.Csiz,u=0
for(a=0;h>a;a++){var d=c.components[a]
u=Math.max(u,d.codingStyleParameters.decompositionLevelsCount)}var g=new Int32Array(u+1)
for(i=0;u>=i;++i){var p=0
for(a=0;h>a;++a){var m=c.components[a].resolutions
i<m.length&&(p=Math.max(p,m[i].precinctParameters.numprecincts))}g[i]=p}t=0,i=0,a=0,r=0,this.nextPacket=function(){for(;u>=i;i++){for(;r<g[i];r++){for(;h>a;a++){var e=c.components[a]
if(!(i>e.codingStyleParameters.decompositionLevelsCount)){var s=e.resolutions[i],o=s.precinctParameters.numprecincts
if(!(r>=o)){for(;l>t;){var d=f(s,r,t)
return t++,d}t=0}}}a=0}r=0}n("JPX Error: Out of packets")}}function v(e){var t=e.SIZ,i=e.currentTile.index,a=e.tiles[i],r=a.codingStyleDefaultParameters.layersCount,s=t.Csiz,o=w(a),c=o,l=0,h=0,u=0,d=0,g=0
this.nextPacket=function(){for(;g<c.maxNumHigh;g++){for(;d<c.maxNumWide;d++){for(;s>u;u++){for(var e=a.components[u],t=e.codingStyleParameters.decompositionLevelsCount;t>=h;h++){var i=e.resolutions[h],p=o.components[u].resolutions[h],m=y(d,g,p,c,i)
if(null!==m){for(;r>l;){var v=f(i,m,l)
return l++,v}l=0}}h=0}u=0}d=0}n("JPX Error: Out of packets")}}function b(e){var t=e.SIZ,i=e.currentTile.index,a=e.tiles[i],r=a.codingStyleDefaultParameters.layersCount,s=t.Csiz,o=w(a),c=0,l=0,h=0,u=0,d=0
this.nextPacket=function(){for(;s>h;++h){for(var e=a.components[h],t=o.components[h],i=e.codingStyleParameters.decompositionLevelsCount;d<t.maxNumHigh;d++){for(;u<t.maxNumWide;u++){for(;i>=l;l++){var g=e.resolutions[l],p=t.resolutions[l],m=y(u,d,p,t,g)
if(null!==m){for(;r>c;){var v=f(g,m,c)
return c++,v}c=0}}l=0}u=0}d=0}n("JPX Error: Out of packets")}}function y(e,t,i,a,r){var n=e*a.minWidth,s=t*a.minHeight
if(n%i.width!==0||s%i.height!==0)return null
var o=s/i.width*r.precinctParameters.numprecinctswide
return n/i.height+o}function w(e){for(var t=e.components.length,i=Number.MAX_VALUE,a=Number.MAX_VALUE,r=0,n=0,s=Array(t),o=0;t>o;o++){for(var c=e.components[o],l=c.codingStyleParameters.decompositionLevelsCount,h=Array(l+1),u=Number.MAX_VALUE,d=Number.MAX_VALUE,f=0,g=0,p=1,m=l;m>=0;--m){var v=c.resolutions[m],b=p*v.precinctParameters.precinctWidth,y=p*v.precinctParameters.precinctHeight
u=Math.min(u,b),d=Math.min(d,y),f=Math.max(f,v.precinctParameters.numprecinctswide),g=Math.max(g,v.precinctParameters.numprecinctshigh),h[m]={width:b,height:y},p<<=1}i=Math.min(i,u),a=Math.min(a,d),r=Math.max(r,f),n=Math.max(n,g),s[o]={resolutions:h,minWidth:u,minHeight:d,maxNumWide:f,maxNumHigh:g}}return{components:s,minWidth:i,minHeight:a,maxNumWide:r,maxNumHigh:n}}function k(e){for(var t=e.SIZ,i=e.currentTile.index,a=e.tiles[i],r=t.Csiz,s=0;r>s;s++){for(var o=a.components[s],c=o.codingStyleParameters.decompositionLevelsCount,l=[],f=[],y=0;c>=y;y++){var w=h(e,o,y),k={},C=1<<c-y
k.trx0=Math.ceil(o.tcx0/C),k.try0=Math.ceil(o.tcy0/C),k.trx1=Math.ceil(o.tcx1/C),k.try1=Math.ceil(o.tcy1/C),k.resLevel=y,u(e,k,w),l.push(k)
var x
if(0===y)x={},x.type="LL",x.tbx0=Math.ceil(o.tcx0/C),x.tby0=Math.ceil(o.tcy0/C),x.tbx1=Math.ceil(o.tcx1/C),x.tby1=Math.ceil(o.tcy1/C),x.resolution=k,d(e,x,w),f.push(x),k.subbands=[x]
else{var S=1<<c-y+1,A=[]
x={},x.type="HL",x.tbx0=Math.ceil(o.tcx0/S-.5),x.tby0=Math.ceil(o.tcy0/S),x.tbx1=Math.ceil(o.tcx1/S-.5),x.tby1=Math.ceil(o.tcy1/S),x.resolution=k,d(e,x,w),f.push(x),A.push(x),x={},x.type="LH",x.tbx0=Math.ceil(o.tcx0/S),x.tby0=Math.ceil(o.tcy0/S-.5),x.tbx1=Math.ceil(o.tcx1/S),x.tby1=Math.ceil(o.tcy1/S-.5),x.resolution=k,d(e,x,w),f.push(x),A.push(x),x={},x.type="HH",x.tbx0=Math.ceil(o.tcx0/S-.5),x.tby0=Math.ceil(o.tcy0/S-.5),x.tbx1=Math.ceil(o.tcx1/S-.5),x.tby1=Math.ceil(o.tcy1/S-.5),x.resolution=k,d(e,x,w),f.push(x),A.push(x),k.subbands=A}}o.resolutions=l,o.subbands=f}var I=a.codingStyleDefaultParameters.progressionOrder
switch(I){case 0:a.packetsIterator=new g(e)
break
case 1:a.packetsIterator=new p(e)
break
case 2:a.packetsIterator=new m(e)
break
case 3:a.packetsIterator=new v(e)
break
case 4:a.packetsIterator=new b(e)
break
default:n("JPX Error: Unsupported progression order "+I)}}function C(e,t,i,a){function r(e){for(;e>d;){var a=t[i+u]
u++,f?(h=h<<7|a,d+=7,f=!1):(h=h<<8|a,d+=8),255===a&&(f=!0)}return d-=e,h>>>d&(1<<e)-1}function n(e){return 255===t[i+u-1]&&t[i+u]===e?(o(1),!0):255===t[i+u]&&t[i+u+1]===e?(o(2),!0):!1}function o(e){u+=e}function c(){d=0,f&&(u++,f=!1)}function l(){if(0===r(1))return 1
if(0===r(1))return 2
var e=r(2)
return 3>e?e+3:(e=r(5),31>e?e+6:(e=r(7),e+37))}for(var h,u=0,d=0,f=!1,g=e.currentTile.index,p=e.tiles[g],m=e.COD.sopMarkerUsed,v=e.COD.ephMarkerUsed,b=p.packetsIterator;a>u;){c(),m&&n(145)&&o(4)
var y=b.nextPacket()
if(r(1)){for(var w,k=y.layerNumber,C=[],x=0,S=y.codeblocks.length;S>x;x++){w=y.codeblocks[x]
var A,I=w.precinct,P=w.cbx-I.cbxMin,L=w.cby-I.cbyMin,E=!1,R=!1
if(void 0!==w.included)E=!!r(1)
else{I=w.precinct
var O,M
if(void 0!==I.inclusionTree)O=I.inclusionTree
else{var D=I.cbxMax-I.cbxMin+1,F=I.cbyMax-I.cbyMin+1
O=new T(D,F,k),M=new B(D,F),I.inclusionTree=O,I.zeroBitPlanesTree=M}if(O.reset(P,L,k))for(;;){if(!r(1)){O.incrementValue(k)
break}if(A=!O.nextLevel()){w.included=!0,E=R=!0
break}}}if(E){if(R){for(M=I.zeroBitPlanesTree,M.reset(P,L);;)if(r(1)){if(A=!M.nextLevel())break}else M.incrementValue()
w.zeroBitPlanes=M.value}for(var N=l();r(1);)w.Lblock++
var j=s(N),U=(1<<j>N?j-1:j)+w.Lblock,_=r(U)
C.push({codeblock:w,codingpasses:N,dataLength:_})}}for(c(),v&&n(146);C.length>0;){var q=C.shift()
w=q.codeblock,void 0===w.data&&(w.data=[]),w.data.push({data:t,start:i+u,end:i+u+q.dataLength,codingpasses:q.codingpasses}),u+=q.dataLength}}}return u}function x(e,t,i,a,r,n,s,o){for(var c=a.tbx0,h=a.tby0,u=a.tbx1-a.tbx0,d=a.codeblocks,f="H"===a.type.charAt(0)?1:0,g="H"===a.type.charAt(1)?t:0,p=0,m=d.length;m>p;++p){var v=d[p],b=v.tbx1_-v.tbx0_,y=v.tby1_-v.tby0_
if(0!==b&&0!==y&&void 0!==v.data){var w,k
w=new L(b,y,v.subbandType,v.zeroBitPlanes,n),k=2
var C,x,S,A=v.data,I=0,P=0
for(C=0,x=A.length;x>C;C++)S=A[C],I+=S.end-S.start,P+=S.codingpasses
var B=new Uint8Array(I),T=0
for(C=0,x=A.length;x>C;C++){S=A[C]
var E=S.data.subarray(S.start,S.end)
B.set(E,T),T+=E.length}var R=new l(B,0,I)
for(w.setDecoder(R),C=0;P>C;C++){switch(k){case 0:w.runSignificancePropagationPass()
break
case 1:w.runMagnitudeRefinementPass()
break
case 2:w.runCleanupPass(),o&&w.checkSegmentationSymbol()}k=(k+1)%3}var O,M,D,F=v.tbx0_-c+(v.tby0_-h)*u,N=w.coefficentsSign,j=w.coefficentsMagnitude,U=w.bitsDecoded,_=s?0:.5
T=0
var q="LL"!==a.type
for(C=0;y>C;C++){var H=F/u|0,z=2*H*(t-u)+f+g
for(O=0;b>O;O++){if(M=j[T],0!==M){M=(M+_)*r,0!==N[T]&&(M=-M),D=U[T]
var V=q?z+(F<<1):F
s&&D>=n?e[V]=M:e[V]=M*(1<<n-D)}F++,T++}F+=u-b}}}}function S(e,t,i){for(var a=t.components[i],r=a.codingStyleParameters,n=a.quantizationParameters,s=r.decompositionLevelsCount,o=n.SPqcds,c=n.scalarExpounded,l=n.guardBits,h=r.segmentationSymbolUsed,u=e.components[i].precision,d=r.reversibleTransformation,f=d?new O:new R,g=[],p=0,m=0;s>=m;m++){for(var v=a.resolutions[m],b=v.trx1-v.trx0,y=v.try1-v.try0,w=new Float32Array(b*y),k=0,C=v.subbands.length;C>k;k++){var S,A
c?(S=o[p].mu,A=o[p].epsilon,p++):(S=o[0].mu,A=o[0].epsilon+(m>0?1-m:0))
var I=v.subbands[k],B=P[I.type],T=d?1:Math.pow(2,u+B-A)*(1+S/2048),L=l+A-1
x(w,b,y,I,T,L,d,h)}g.push({width:b,height:y,items:w})}var E=f.calculate(g,a.tcx0,a.tcy0)
return{left:a.tcx0,top:a.tcy0,width:E.width,height:E.height,items:E.items}}function A(e){for(var t=e.SIZ,i=e.components,a=t.Csiz,r=[],n=0,s=e.tiles.length;s>n;n++){var o,c=e.tiles[n],l=[]
for(o=0;a>o;o++)l[o]=S(e,c,o)
var h,u,d,f,g,p,m,v,b,y,w,k,C,x,A,I=l[0],P=new Uint8Array(I.items.length*a),B={left:I.left,top:I.top,width:I.width,height:I.height,items:P},T=0
if(c.codingStyleDefaultParameters.multipleComponentTransform){var L=4===a,E=l[0].items,R=l[1].items,O=l[2].items,M=L?l[3].items:null
h=i[0].precision-8,u=(128<<h)+.5,d=255*(1<<h),g=.5*d,f=-g
var D=c.components[0],F=a-3
if(m=E.length,D.codingStyleParameters.reversibleTransformation)for(p=0;m>p;p++,T+=F)v=E[p]+u,b=R[p],y=O[p],k=v-(y+b>>2),w=k+y,C=k+b,P[T++]=0>=w?0:w>=d?255:w>>h,P[T++]=0>=k?0:k>=d?255:k>>h,P[T++]=0>=C?0:C>=d?255:C>>h
else for(p=0;m>p;p++,T+=F)v=E[p]+u,b=R[p],y=O[p],w=v+1.402*y,k=v-.34413*b-.71414*y,C=v+1.772*b,P[T++]=0>=w?0:w>=d?255:w>>h,P[T++]=0>=k?0:k>=d?255:k>>h,P[T++]=0>=C?0:C>=d?255:C>>h
if(L)for(p=0,T=3;m>p;p++,T+=4)x=M[p],P[T]=f>=x?0:x>=g?255:x+u>>h}else for(o=0;a>o;o++){var N=l[o].items
for(h=i[o].precision-8,u=(128<<h)+.5,d=127.5*(1<<h),f=-d,T=o,p=0,m=N.length;m>p;p++)A=N[p],P[T]=f>=A?0:A>=d?255:A+u>>h,T+=a}r.push(B)}return r}function I(e,t){for(var i=e.SIZ,a=i.Csiz,r=e.tiles[t],n=0;a>n;n++){var s=r.components[n],o=void 0!==e.currentTile.QCC[n]?e.currentTile.QCC[n]:e.currentTile.QCD
s.quantizationParameters=o
var c=void 0!==e.currentTile.COC[n]?e.currentTile.COC[n]:e.currentTile.COD
s.codingStyleParameters=c}r.codingStyleDefaultParameters=e.currentTile.COD}var P={LL:0,LH:1,HL:1,HH:2}
e.prototype={parse:function(e){var t=o(e,0)
if(65359===t)return void this.parseCodestream(e,0,e.length)
for(var i=0,s=e.length;s>i;){var l=8,h=c(e,i),u=c(e,i+4)
i+=l,1===h&&(h=4294967296*c(e,i)+c(e,i+4),i+=8,l+=8),0===h&&(h=s-i+l),l>h&&n("JPX Error: Invalid box field size")
var d=h-l,f=!0
switch(u){case 1785737832:f=!1
break
case 1668246642:var g=e[i]
if(1===g){var p=c(e,i+3)
switch(p){case 16:case 17:case 18:break
default:r("Unknown colorspace "+p)}}else 2===g&&a("ICC profile not supported")
break
case 1785737827:this.parseCodestream(e,i,i+d)
break
case 1783636e3:218793738!==c(e,i)&&r("Invalid JP2 signature")
break
case 1783634458:case 1718909296:case 1920099697:case 1919251232:case 1768449138:break
default:var m=String.fromCharCode(u>>24&255,u>>16&255,u>>8&255,255&u)
r("Unsupported header type "+u+" ("+m+")")}f&&(i+=d)}},parseImageProperties:function(e){for(var t=e.getByte();t>=0;){var i=t
t=e.getByte()
var a=i<<8|t
if(65361===a){e.skip(4)
var r=e.getInt32()>>>0,s=e.getInt32()>>>0,o=e.getInt32()>>>0,c=e.getInt32()>>>0
e.skip(16)
var l=e.getUint16()
return this.width=r-o,this.height=s-c,this.componentsCount=l,void(this.bitsPerComponent=8)}}n("JPX Error: No size marker found in JPX stream")},parseCodestream:function(e,a,s){var l={},h=!1
try{for(var u=a;s>u+1;){var d=o(e,u)
u+=2
var f,g,p,m,v,b,y=0
switch(d){case 65359:l.mainHeader=!0
break
case 65497:break
case 65361:y=o(e,u)
var w={}
w.Xsiz=c(e,u+4),w.Ysiz=c(e,u+8),w.XOsiz=c(e,u+12),w.YOsiz=c(e,u+16),w.XTsiz=c(e,u+20),w.YTsiz=c(e,u+24),w.XTOsiz=c(e,u+28),w.YTOsiz=c(e,u+32)
var x=o(e,u+36)
w.Csiz=x
var S=[]
f=u+38
for(var P=0;x>P;P++){var B={precision:(127&e[f])+1,isSigned:!!(128&e[f]),XRsiz:e[f+1],YRsiz:e[f+1]}
t(B,w),S.push(B)}l.SIZ=w,l.components=S,i(l,S),l.QCC=[],l.COC=[]
break
case 65372:y=o(e,u)
var T={}
switch(f=u+2,g=e[f++],31&g){case 0:m=8,v=!0
break
case 1:m=16,v=!1
break
case 2:m=16,v=!0
break
default:throw Error("Invalid SQcd value "+g)}for(T.noQuantization=8===m,T.scalarExpounded=v,T.guardBits=g>>5,p=[];y+u>f;){var L={}
8===m?(L.epsilon=e[f++]>>3,L.mu=0):(L.epsilon=e[f]>>3,L.mu=(7&e[f])<<8|e[f+1],f+=2),p.push(L)}T.SPqcds=p,l.mainHeader?l.QCD=T:(l.currentTile.QCD=T,l.currentTile.QCC=[])
break
case 65373:y=o(e,u)
var E={}
f=u+2
var R
switch(l.SIZ.Csiz<257?R=e[f++]:(R=o(e,f),f+=2),g=e[f++],31&g){case 0:m=8,v=!0
break
case 1:m=16,v=!1
break
case 2:m=16,v=!0
break
default:throw Error("Invalid SQcd value "+g)}for(E.noQuantization=8===m,E.scalarExpounded=v,E.guardBits=g>>5,p=[];y+u>f;)L={},8===m?(L.epsilon=e[f++]>>3,L.mu=0):(L.epsilon=e[f]>>3,L.mu=(7&e[f])<<8|e[f+1],f+=2),p.push(L)
E.SPqcds=p,l.mainHeader?l.QCC[R]=E:l.currentTile.QCC[R]=E
break
case 65362:y=o(e,u)
var O={}
f=u+2
var M=e[f++]
O.entropyCoderWithCustomPrecincts=!!(1&M),O.sopMarkerUsed=!!(2&M),O.ephMarkerUsed=!!(4&M),O.progressionOrder=e[f++],O.layersCount=o(e,f),f+=2,O.multipleComponentTransform=e[f++],O.decompositionLevelsCount=e[f++],O.xcb=(15&e[f++])+2,O.ycb=(15&e[f++])+2
var D=e[f++]
if(O.selectiveArithmeticCodingBypass=!!(1&D),O.resetContextProbabilities=!!(2&D),O.terminationOnEachCodingPass=!!(4&D),O.verticalyStripe=!!(8&D),O.predictableTermination=!!(16&D),O.segmentationSymbolUsed=!!(32&D),O.reversibleTransformation=e[f++],O.entropyCoderWithCustomPrecincts){for(var F=[];y+u>f;){var N=e[f++]
F.push({PPx:15&N,PPy:N>>4})}O.precinctsSizes=F}var j=[]
if(O.selectiveArithmeticCodingBypass&&j.push("selectiveArithmeticCodingBypass"),O.resetContextProbabilities&&j.push("resetContextProbabilities"),O.terminationOnEachCodingPass&&j.push("terminationOnEachCodingPass"),O.verticalyStripe&&j.push("verticalyStripe"),O.predictableTermination&&j.push("predictableTermination"),j.length>0)throw h=!0,Error("Unsupported COD options ("+j.join(", ")+")")
l.mainHeader?l.COD=O:(l.currentTile.COD=O,l.currentTile.COC=[])
break
case 65424:y=o(e,u),b={},b.index=o(e,u+2),b.length=c(e,u+4),b.dataEnd=b.length+u-2,b.partIndex=e[u+8],b.partsCount=e[u+9],l.mainHeader=!1,0===b.partIndex&&(b.COD=l.COD,b.COC=l.COC.slice(0),b.QCD=l.QCD,b.QCC=l.QCC.slice(0)),l.currentTile=b
break
case 65427:b=l.currentTile,0===b.partIndex&&(I(l,b.index),k(l)),y=b.dataEnd-u,C(l,e,u,y)
break
case 65365:case 65367:case 65368:case 65380:y=o(e,u)
break
case 65363:throw Error("Codestream code 0xFF53 (COC) is not implemented")
default:throw Error("Unknown codestream code: "+d.toString(16))}u+=y}}catch(U){h||this.failOnCorruptedImage?n("JPX Error: "+U.message):r("JPX: Trying to recover from: "+U.message)}this.tiles=A(l),this.width=l.SIZ.Xsiz-l.SIZ.XOsiz,this.height=l.SIZ.Ysiz-l.SIZ.YOsiz,this.componentsCount=l.SIZ.Csiz}}
var B=function(){function e(e,t){var i=s(Math.max(e,t))+1
this.levels=[]
for(var a=0;i>a;a++){var r={width:e,height:t,items:[]}
this.levels.push(r),e=Math.ceil(e/2),t=Math.ceil(t/2)}}return e.prototype={reset:function(e,t){for(var i,a=0,r=0;a<this.levels.length;){i=this.levels[a]
var n=e+t*i.width
if(void 0!==i.items[n]){r=i.items[n]
break}i.index=n,e>>=1,t>>=1,a++}a--,i=this.levels[a],i.items[i.index]=r,this.currentLevel=a,delete this.value},incrementValue:function(){var e=this.levels[this.currentLevel]
e.items[e.index]++},nextLevel:function(){var e=this.currentLevel,t=this.levels[e],i=t.items[t.index]
return e--,0>e?(this.value=i,!1):(this.currentLevel=e,t=this.levels[e],t.items[t.index]=i,!0)}},e}(),T=function(){function e(e,t,i){var a=s(Math.max(e,t))+1
this.levels=[]
for(var r=0;a>r;r++){for(var n=new Uint8Array(e*t),o=0,c=n.length;c>o;o++)n[o]=i
var l={width:e,height:t,items:n}
this.levels.push(l),e=Math.ceil(e/2),t=Math.ceil(t/2)}}return e.prototype={reset:function(e,t,i){for(var a=0;a<this.levels.length;){var r=this.levels[a],n=e+t*r.width
r.index=n
var s=r.items[n]
if(255===s)break
if(s>i)return this.currentLevel=a,this.propagateValues(),!1
e>>=1,t>>=1,a++}return this.currentLevel=a-1,!0},incrementValue:function(e){var t=this.levels[this.currentLevel]
t.items[t.index]=e+1,this.propagateValues()},propagateValues:function(){for(var e=this.currentLevel,t=this.levels[e],i=t.items[t.index];--e>=0;)t=this.levels[e],t.items[t.index]=i},nextLevel:function(){var e=this.currentLevel,t=this.levels[e],i=t.items[t.index]
return t.items[t.index]=255,e--,0>e?!1:(this.currentLevel=e,t=this.levels[e],t.items[t.index]=i,!0)}},e}(),L=function(){function e(e,t,i,n,o){this.width=e,this.height=t,this.contextLabelTable="HH"===i?s:"HL"===i?r:a
var c=e*t
this.neighborsSignificance=new Uint8Array(c),this.coefficentsSign=new Uint8Array(c),this.coefficentsMagnitude=o>14?new Uint32Array(c):o>6?new Uint16Array(c):new Uint8Array(c),this.processingFlags=new Uint8Array(c)
var l=new Uint8Array(c)
if(0!==n)for(var h=0;c>h;h++)l[h]=n
this.bitsDecoded=l,this.reset()}var t=17,i=18,a=new Uint8Array([0,5,8,0,3,7,8,0,4,7,8,0,0,0,0,0,1,6,8,0,3,7,8,0,4,7,8,0,0,0,0,0,2,6,8,0,3,7,8,0,4,7,8,0,0,0,0,0,2,6,8,0,3,7,8,0,4,7,8,0,0,0,0,0,2,6,8,0,3,7,8,0,4,7,8]),r=new Uint8Array([0,3,4,0,5,7,7,0,8,8,8,0,0,0,0,0,1,3,4,0,6,7,7,0,8,8,8,0,0,0,0,0,2,3,4,0,6,7,7,0,8,8,8,0,0,0,0,0,2,3,4,0,6,7,7,0,8,8,8,0,0,0,0,0,2,3,4,0,6,7,7,0,8,8,8]),s=new Uint8Array([0,1,2,0,1,2,2,0,2,2,2,0,0,0,0,0,3,4,5,0,4,5,5,0,5,5,5,0,0,0,0,0,6,7,7,0,7,7,7,0,7,7,7,0,0,0,0,0,8,8,8,0,8,8,8,0,8,8,8,0,0,0,0,0,8,8,8,0,8,8,8,0,8,8,8])
return e.prototype={setDecoder:function(e){this.decoder=e},reset:function(){this.contexts=new Int8Array(19),this.contexts[0]=8,this.contexts[t]=92,this.contexts[i]=6},setNeighborsSignificance:function(e,t,i){var a,r=this.neighborsSignificance,n=this.width,s=this.height,o=t>0,c=n>t+1
e>0&&(a=i-n,o&&(r[a-1]+=16),c&&(r[a+1]+=16),r[a]+=4),s>e+1&&(a=i+n,o&&(r[a-1]+=16),c&&(r[a+1]+=16),r[a]+=4),o&&(r[i-1]+=1),c&&(r[i+1]+=1),r[i]|=128},runSignificancePropagationPass:function(){for(var e=this.decoder,t=this.width,i=this.height,a=this.coefficentsMagnitude,r=this.coefficentsSign,n=this.neighborsSignificance,s=this.processingFlags,o=this.contexts,c=this.contextLabelTable,l=this.bitsDecoded,h=-2,u=1,d=2,f=0;i>f;f+=4)for(var g=0;t>g;g++)for(var p=f*t+g,m=0;4>m;m++,p+=t){var v=f+m
if(v>=i)break
if(s[p]&=h,!a[p]&&n[p]){var b=c[n[p]],y=e.readBit(o,b)
if(y){var w=this.decodeSignBit(v,g,p)
r[p]=w,a[p]=1,this.setNeighborsSignificance(v,g,p),s[p]|=d}l[p]++,s[p]|=u}}},decodeSignBit:function(e,t,i){var a,r,n,s,o,c,l=this.width,h=this.height,u=this.coefficentsMagnitude,d=this.coefficentsSign
s=t>0&&0!==u[i-1],l>t+1&&0!==u[i+1]?(n=d[i+1],s?(r=d[i-1],a=1-n-r):a=1-n-n):s?(r=d[i-1],a=1-r-r):a=0
var f=3*a
return s=e>0&&0!==u[i-l],h>e+1&&0!==u[i+l]?(n=d[i+l],s?(r=d[i-l],a=1-n-r+f):a=1-n-n+f):s?(r=d[i-l],a=1-r-r+f):a=f,a>=0?(o=9+a,c=this.decoder.readBit(this.contexts,o)):(o=9-a,c=1^this.decoder.readBit(this.contexts,o)),c},runMagnitudeRefinementPass:function(){for(var e,t=this.decoder,i=this.width,a=this.height,r=this.coefficentsMagnitude,n=this.neighborsSignificance,s=this.contexts,o=this.bitsDecoded,c=this.processingFlags,l=1,h=2,u=i*a,d=4*i,f=0;u>f;f=e){e=Math.min(u,f+d)
for(var g=0;i>g;g++)for(var p=f+g;e>p;p+=i)if(r[p]&&0===(c[p]&l)){var m=16
if(0!==(c[p]&h)){c[p]^=h
var v=127&n[p]
m=0===v?15:14}var b=t.readBit(s,m)
r[p]=r[p]<<1|b,o[p]++,c[p]|=l}}},runCleanupPass:function(){for(var e,a=this.decoder,r=this.width,n=this.height,s=this.neighborsSignificance,o=this.coefficentsMagnitude,c=this.coefficentsSign,l=this.contexts,h=this.contextLabelTable,u=this.bitsDecoded,d=this.processingFlags,f=1,g=2,p=r,m=2*r,v=3*r,b=0;n>b;b=e){e=Math.min(b+4,n)
for(var y=b*r,w=n>b+3,k=0;r>k;k++){var C,x=y+k,S=w&&0===d[x]&&0===d[x+p]&&0===d[x+m]&&0===d[x+v]&&0===s[x]&&0===s[x+p]&&0===s[x+m]&&0===s[x+v],A=0,I=x,P=b
if(S){var B=a.readBit(l,i)
if(!B){u[x]++,u[x+p]++,u[x+m]++,u[x+v]++
continue}A=a.readBit(l,t)<<1|a.readBit(l,t),0!==A&&(P=b+A,I+=A*r),C=this.decodeSignBit(P,k,I),c[I]=C,o[I]=1,this.setNeighborsSignificance(P,k,I),d[I]|=g,I=x
for(var T=b;P>=T;T++,I+=r)u[I]++
A++}for(P=b+A;e>P;P++,I+=r)if(!o[I]&&0===(d[I]&f)){var L=h[s[I]],E=a.readBit(l,L)
1===E&&(C=this.decodeSignBit(P,k,I),c[I]=C,o[I]=1,this.setNeighborsSignificance(P,k,I),d[I]|=g),u[I]++}}}},checkSegmentationSymbol:function(){var e=this.decoder,i=this.contexts,a=e.readBit(i,t)<<3|e.readBit(i,t)<<2|e.readBit(i,t)<<1|e.readBit(i,t)
10!==a&&n("JPX Error: Invalid segmentation symbol")}},e}(),E=function(){function e(){}return e.prototype.calculate=function(e,t,i){for(var a=e[0],r=1,n=e.length;n>r;r++)a=this.iterate(a,e[r],t,i)
return a},e.prototype.extend=function(e,t,i){var a=t-1,r=t+1,n=t+i-2,s=t+i
e[a--]=e[r++],e[s++]=e[n--],e[a--]=e[r++],e[s++]=e[n--],e[a--]=e[r++],e[s++]=e[n--],e[a]=e[r],e[s]=e[n]},e.prototype.iterate=function(e,t,i,a){var r,n,s,o,c,l,h=e.width,u=e.height,d=e.items,f=t.width,g=t.height,p=t.items
for(s=0,r=0;u>r;r++)for(o=2*r*f,n=0;h>n;n++,s++,o+=2)p[o]=d[s]
d=e.items=null
var m=4,v=new Float32Array(f+2*m)
if(1===f){if(0!==(1&i))for(l=0,s=0;g>l;l++,s+=f)p[s]*=.5}else for(l=0,s=0;g>l;l++,s+=f)v.set(p.subarray(s,s+f),m),this.extend(v,m,f),this.filter(v,m,f),p.set(v.subarray(m,m+f),s)
var b=16,y=[]
for(r=0;b>r;r++)y.push(new Float32Array(g+2*m))
var w,k=0
if(e=m+g,1===g){if(0!==(1&a))for(c=0;f>c;c++)p[c]*=.5}else for(c=0;f>c;c++){if(0===k){for(b=Math.min(f-c,b),s=c,o=m;e>o;s+=f,o++)for(w=0;b>w;w++)y[w][o]=p[s+w]
k=b}k--
var C=y[k]
if(this.extend(C,m,g),this.filter(C,m,g),0===k)for(s=c-b+1,o=m;e>o;s+=f,o++)for(w=0;b>w;w++)p[s+w]=y[w][o]}return{width:f,height:g,items:p}},e}(),R=function(){function e(){E.call(this)}return e.prototype=Object.create(E.prototype),e.prototype.filter=function(e,t,i){var a=i>>1
t=0|t
var r,n,s,o,c=-1.586134342059924,l=-.052980118572961,h=.882911075530934,u=.443506852043971,d=1.230174104914001,f=1/d
for(r=t-3,n=a+4;n--;r+=2)e[r]*=f
for(r=t-2,s=u*e[r-1],n=a+3;n--&&(o=u*e[r+1],e[r]=d*e[r]-s-o,n--);r+=2)r+=2,s=u*e[r+1],e[r]=d*e[r]-s-o
for(r=t-1,s=h*e[r-1],n=a+2;n--&&(o=h*e[r+1],e[r]-=s+o,n--);r+=2)r+=2,s=h*e[r+1],e[r]-=s+o
for(r=t,s=l*e[r-1],n=a+1;n--&&(o=l*e[r+1],e[r]-=s+o,n--);r+=2)r+=2,s=l*e[r+1],e[r]-=s+o
if(0!==a)for(r=t+1,s=c*e[r-1],n=a;n--&&(o=c*e[r+1],e[r]-=s+o,n--);r+=2)r+=2,s=c*e[r+1],e[r]-=s+o},e}(),O=function(){function e(){E.call(this)}return e.prototype=Object.create(E.prototype),e.prototype.filter=function(e,t,i){var a=i>>1
t=0|t
var r,n
for(r=t,n=a+1;n--;r+=2)e[r]-=e[r-1]+e[r+1]+2>>2
for(r=t+1,n=a;n--;r+=2)e[r]+=e[r-1]+e[r+1]>>1},e}()
return e}()
e.JpxImage=h}),function(e,t){t(e.pdfjsCoreMetrics={},e.pdfjsSharedUtil)}(this,function(e,t){var i=t.getLookupTableFactory,a=i(function(e){e.Courier=600,e["Courier-Bold"]=600,e["Courier-BoldOblique"]=600,e["Courier-Oblique"]=600,e.Helvetica=i(function(e){e.space=278,e.exclam=278,e.quotedbl=355,e.numbersign=556,e.dollar=556,e.percent=889,e.ampersand=667,e.quoteright=222,e.parenleft=333,e.parenright=333,e.asterisk=389,e.plus=584,e.comma=278,e.hyphen=333,e.period=278,e.slash=278,e.zero=556,e.one=556,e.two=556,e.three=556,e.four=556,e.five=556,e.six=556,e.seven=556,e.eight=556,e.nine=556,e.colon=278,e.semicolon=278,e.less=584,e.equal=584,e.greater=584,e.question=556,e.at=1015,e.A=667,e.B=667,e.C=722,e.D=722,e.E=667,e.F=611,e.G=778,e.H=722,e.I=278,e.J=500,e.K=667,e.L=556,e.M=833,e.N=722,e.O=778,e.P=667,e.Q=778,e.R=722,e.S=667,e.T=611,e.U=722,e.V=667,e.W=944,e.X=667,e.Y=667,e.Z=611,e.bracketleft=278,e.backslash=278,e.bracketright=278,e.asciicircum=469,e.underscore=556,e.quoteleft=222,e.a=556,e.b=556,e.c=500,e.d=556,e.e=556,e.f=278,e.g=556,e.h=556,e.i=222,e.j=222,e.k=500,e.l=222,e.m=833,e.n=556,e.o=556,e.p=556,e.q=556,e.r=333,e.s=500,e.t=278,e.u=556,e.v=500,e.w=722,e.x=500,e.y=500,e.z=500,e.braceleft=334,e.bar=260,e.braceright=334,e.asciitilde=584,e.exclamdown=333,e.cent=556,e.sterling=556,e.fraction=167,e.yen=556,e.florin=556,e.section=556,e.currency=556,e.quotesingle=191,e.quotedblleft=333,e.guillemotleft=556,e.guilsinglleft=333,e.guilsinglright=333,e.fi=500,e.fl=500,e.endash=556,e.dagger=556,e.daggerdbl=556,e.periodcentered=278,e.paragraph=537,e.bullet=350,e.quotesinglbase=222,e.quotedblbase=333,e.quotedblright=333,e.guillemotright=556,e.ellipsis=1e3,e.perthousand=1e3,e.questiondown=611,e.grave=333,e.acute=333,e.circumflex=333,e.tilde=333,e.macron=333,e.breve=333,e.dotaccent=333,e.dieresis=333,e.ring=333,e.cedilla=333,e.hungarumlaut=333,e.ogonek=333,e.caron=333,e.emdash=1e3,e.AE=1e3,e.ordfeminine=370,e.Lslash=556,e.Oslash=778,e.OE=1e3,e.ordmasculine=365,e.ae=889,e.dotlessi=278,e.lslash=222,e.oslash=611,e.oe=944,e.germandbls=611,e.Idieresis=278,e.eacute=556,e.abreve=556,e.uhungarumlaut=556,e.ecaron=556,e.Ydieresis=667,e.divide=584,e.Yacute=667,e.Acircumflex=667,e.aacute=556,e.Ucircumflex=722,e.yacute=500,e.scommaaccent=500,e.ecircumflex=556,e.Uring=722,e.Udieresis=722,e.aogonek=556,e.Uacute=722,e.uogonek=556,e.Edieresis=667,e.Dcroat=722,e.commaaccent=250,e.copyright=737,e.Emacron=667,e.ccaron=500,e.aring=556,e.Ncommaaccent=722,e.lacute=222,e.agrave=556,e.Tcommaaccent=611,e.Cacute=722,e.atilde=556,e.Edotaccent=667,e.scaron=500,e.scedilla=500,e.iacute=278,e.lozenge=471,e.Rcaron=722,e.Gcommaaccent=778,e.ucircumflex=556,e.acircumflex=556,e.Amacron=667,e.rcaron=333,e.ccedilla=500,e.Zdotaccent=611,e.Thorn=667,e.Omacron=778,e.Racute=722,e.Sacute=667,e.dcaron=643,e.Umacron=722,e.uring=556,e.threesuperior=333,e.Ograve=778,e.Agrave=667,e.Abreve=667,e.multiply=584,e.uacute=556,e.Tcaron=611,e.partialdiff=476,e.ydieresis=500,e.Nacute=722,e.icircumflex=278,e.Ecircumflex=667,e.adieresis=556,e.edieresis=556,e.cacute=500,e.nacute=556,e.umacron=556,e.Ncaron=722,e.Iacute=278,e.plusminus=584,e.brokenbar=260,e.registered=737,e.Gbreve=778,e.Idotaccent=278,e.summation=600,e.Egrave=667,e.racute=333,e.omacron=556,e.Zacute=611,e.Zcaron=611,e.greaterequal=549,e.Eth=722,e.Ccedilla=722,e.lcommaaccent=222,e.tcaron=317,e.eogonek=556,e.Uogonek=722,e.Aacute=667,e.Adieresis=667,e.egrave=556,e.zacute=500,e.iogonek=222,e.Oacute=778,e.oacute=556,e.amacron=556,e.sacute=500,e.idieresis=278,e.Ocircumflex=778,e.Ugrave=722,e.Delta=612,e.thorn=556,e.twosuperior=333,e.Odieresis=778,e.mu=556,e.igrave=278,e.ohungarumlaut=556,e.Eogonek=667,e.dcroat=556,e.threequarters=834,e.Scedilla=667,e.lcaron=299,e.Kcommaaccent=667,e.Lacute=556,e.trademark=1e3,e.edotaccent=556,e.Igrave=278,e.Imacron=278,e.Lcaron=556,e.onehalf=834,e.lessequal=549,e.ocircumflex=556,e.ntilde=556,e.Uhungarumlaut=722,e.Eacute=667,e.emacron=556,e.gbreve=556,e.onequarter=834,e.Scaron=667,e.Scommaaccent=667,e.Ohungarumlaut=778,e.degree=400,e.ograve=556,e.Ccaron=722,e.ugrave=556,e.radical=453,e.Dcaron=722,e.rcommaaccent=333,e.Ntilde=722,e.otilde=556,e.Rcommaaccent=722,e.Lcommaaccent=556,e.Atilde=667,e.Aogonek=667,e.Aring=667,e.Otilde=778,e.zdotaccent=500,e.Ecaron=667,e.Iogonek=278,e.kcommaaccent=500,e.minus=584,e.Icircumflex=278,e.ncaron=556,e.tcommaaccent=278,e.logicalnot=584,e.odieresis=556,e.udieresis=556,e.notequal=549,e.gcommaaccent=556,e.eth=556,e.zcaron=500,e.ncommaaccent=556,e.onesuperior=333,e.imacron=278,e.Euro=556}),e["Helvetica-Bold"]=i(function(e){e.space=278,e.exclam=333,e.quotedbl=474,e.numbersign=556,e.dollar=556,e.percent=889,e.ampersand=722,e.quoteright=278,e.parenleft=333,e.parenright=333,e.asterisk=389,e.plus=584,e.comma=278,e.hyphen=333,e.period=278,e.slash=278,e.zero=556,e.one=556,e.two=556,e.three=556,e.four=556,e.five=556,e.six=556,e.seven=556,e.eight=556,e.nine=556,e.colon=333,e.semicolon=333,e.less=584,e.equal=584,e.greater=584,e.question=611,e.at=975,e.A=722,e.B=722,e.C=722,e.D=722,e.E=667,e.F=611,e.G=778,e.H=722,e.I=278,e.J=556,e.K=722,e.L=611,e.M=833,e.N=722,e.O=778,e.P=667,e.Q=778,e.R=722,e.S=667,e.T=611,e.U=722,e.V=667,e.W=944,e.X=667,e.Y=667,e.Z=611,e.bracketleft=333,e.backslash=278,e.bracketright=333,e.asciicircum=584,e.underscore=556,e.quoteleft=278,e.a=556,e.b=611,e.c=556,e.d=611,e.e=556,e.f=333,e.g=611,e.h=611,e.i=278,e.j=278,e.k=556,e.l=278,e.m=889,e.n=611,e.o=611,e.p=611,e.q=611,e.r=389,e.s=556,e.t=333,e.u=611,e.v=556,e.w=778,e.x=556,e.y=556,e.z=500,e.braceleft=389,e.bar=280,e.braceright=389,e.asciitilde=584,e.exclamdown=333,e.cent=556,e.sterling=556,e.fraction=167,e.yen=556,e.florin=556,e.section=556,e.currency=556,e.quotesingle=238,e.quotedblleft=500,e.guillemotleft=556,e.guilsinglleft=333,e.guilsinglright=333,e.fi=611,e.fl=611,e.endash=556,e.dagger=556,e.daggerdbl=556,e.periodcentered=278,e.paragraph=556,e.bullet=350,e.quotesinglbase=278,e.quotedblbase=500,e.quotedblright=500,e.guillemotright=556,e.ellipsis=1e3,e.perthousand=1e3,e.questiondown=611,e.grave=333,e.acute=333,e.circumflex=333,e.tilde=333,e.macron=333,e.breve=333,e.dotaccent=333,e.dieresis=333,e.ring=333,e.cedilla=333,e.hungarumlaut=333,e.ogonek=333,e.caron=333,e.emdash=1e3,e.AE=1e3,e.ordfeminine=370,e.Lslash=611,e.Oslash=778,e.OE=1e3,e.ordmasculine=365,e.ae=889,e.dotlessi=278,e.lslash=278,e.oslash=611,e.oe=944,e.germandbls=611,e.Idieresis=278,e.eacute=556,e.abreve=556,e.uhungarumlaut=611,e.ecaron=556,e.Ydieresis=667,e.divide=584,e.Yacute=667,e.Acircumflex=722,e.aacute=556,e.Ucircumflex=722,e.yacute=556,e.scommaaccent=556,e.ecircumflex=556,e.Uring=722,e.Udieresis=722,e.aogonek=556,e.Uacute=722,e.uogonek=611,e.Edieresis=667,e.Dcroat=722,e.commaaccent=250,e.copyright=737,e.Emacron=667,e.ccaron=556,e.aring=556,e.Ncommaaccent=722,e.lacute=278,e.agrave=556,e.Tcommaaccent=611,e.Cacute=722,e.atilde=556,e.Edotaccent=667,e.scaron=556,e.scedilla=556,e.iacute=278,e.lozenge=494,e.Rcaron=722,e.Gcommaaccent=778,e.ucircumflex=611,e.acircumflex=556,e.Amacron=722,e.rcaron=389,e.ccedilla=556,e.Zdotaccent=611,e.Thorn=667,e.Omacron=778,e.Racute=722,e.Sacute=667,e.dcaron=743,e.Umacron=722,e.uring=611,e.threesuperior=333,e.Ograve=778,e.Agrave=722,e.Abreve=722,e.multiply=584,e.uacute=611,e.Tcaron=611,e.partialdiff=494,e.ydieresis=556,e.Nacute=722,e.icircumflex=278,e.Ecircumflex=667,e.adieresis=556,e.edieresis=556,e.cacute=556,e.nacute=611,e.umacron=611,e.Ncaron=722,e.Iacute=278,e.plusminus=584,e.brokenbar=280,e.registered=737,e.Gbreve=778,e.Idotaccent=278,e.summation=600,e.Egrave=667,e.racute=389,e.omacron=611,e.Zacute=611,e.Zcaron=611,e.greaterequal=549,e.Eth=722,e.Ccedilla=722,e.lcommaaccent=278,e.tcaron=389,e.eogonek=556,e.Uogonek=722,e.Aacute=722,e.Adieresis=722,e.egrave=556,e.zacute=500,e.iogonek=278,e.Oacute=778,e.oacute=611,e.amacron=556,e.sacute=556,e.idieresis=278,e.Ocircumflex=778,e.Ugrave=722,e.Delta=612,e.thorn=611,e.twosuperior=333,e.Odieresis=778,e.mu=611,e.igrave=278,e.ohungarumlaut=611,e.Eogonek=667,e.dcroat=611,e.threequarters=834,e.Scedilla=667,e.lcaron=400,e.Kcommaaccent=722,e.Lacute=611,e.trademark=1e3,e.edotaccent=556,e.Igrave=278,e.Imacron=278,e.Lcaron=611,e.onehalf=834,e.lessequal=549,e.ocircumflex=611,e.ntilde=611,e.Uhungarumlaut=722,e.Eacute=667,e.emacron=556,e.gbreve=611,e.onequarter=834,e.Scaron=667,e.Scommaaccent=667,e.Ohungarumlaut=778,e.degree=400,e.ograve=611,e.Ccaron=722,e.ugrave=611,e.radical=549,e.Dcaron=722,e.rcommaaccent=389,e.Ntilde=722,e.otilde=611,e.Rcommaaccent=722,e.Lcommaaccent=611,e.Atilde=722,e.Aogonek=722,e.Aring=722,e.Otilde=778,e.zdotaccent=500,e.Ecaron=667,e.Iogonek=278,e.kcommaaccent=556,e.minus=584,e.Icircumflex=278,e.ncaron=611,e.tcommaaccent=333,e.logicalnot=584,e.odieresis=611,e.udieresis=611,e.notequal=549,e.gcommaaccent=611,e.eth=611,e.zcaron=500,e.ncommaaccent=611,e.onesuperior=333,e.imacron=278,e.Euro=556}),e["Helvetica-BoldOblique"]=i(function(e){e.space=278,e.exclam=333,e.quotedbl=474,e.numbersign=556,e.dollar=556,e.percent=889,e.ampersand=722,e.quoteright=278,e.parenleft=333,e.parenright=333,e.asterisk=389,e.plus=584,e.comma=278,e.hyphen=333,e.period=278,e.slash=278,e.zero=556,e.one=556,e.two=556,e.three=556,e.four=556,e.five=556,e.six=556,e.seven=556,e.eight=556,e.nine=556,e.colon=333,e.semicolon=333,e.less=584,e.equal=584,e.greater=584,e.question=611,e.at=975,e.A=722,e.B=722,e.C=722,e.D=722,e.E=667,e.F=611,e.G=778,e.H=722,e.I=278,e.J=556,e.K=722,e.L=611,e.M=833,e.N=722,e.O=778,e.P=667,e.Q=778,e.R=722,e.S=667,e.T=611,e.U=722,e.V=667,e.W=944,e.X=667,e.Y=667,e.Z=611,e.bracketleft=333,e.backslash=278,e.bracketright=333,e.asciicircum=584,e.underscore=556,e.quoteleft=278,e.a=556,e.b=611,e.c=556,e.d=611,e.e=556,e.f=333,e.g=611,e.h=611,e.i=278,e.j=278,e.k=556,e.l=278,e.m=889,e.n=611,e.o=611,e.p=611,e.q=611,e.r=389,e.s=556,e.t=333,e.u=611,e.v=556,e.w=778,e.x=556,e.y=556,e.z=500,e.braceleft=389,e.bar=280,e.braceright=389,e.asciitilde=584,e.exclamdown=333,e.cent=556,e.sterling=556,e.fraction=167,e.yen=556,e.florin=556,e.section=556,e.currency=556,e.quotesingle=238,e.quotedblleft=500,e.guillemotleft=556,e.guilsinglleft=333,e.guilsinglright=333,e.fi=611,e.fl=611,e.endash=556,e.dagger=556,e.daggerdbl=556,e.periodcentered=278,e.paragraph=556,e.bullet=350,e.quotesinglbase=278,e.quotedblbase=500,e.quotedblright=500,e.guillemotright=556,e.ellipsis=1e3,e.perthousand=1e3,e.questiondown=611,e.grave=333,e.acute=333,e.circumflex=333,e.tilde=333,e.macron=333,e.breve=333,e.dotaccent=333,e.dieresis=333,e.ring=333,e.cedilla=333,e.hungarumlaut=333,e.ogonek=333,e.caron=333,e.emdash=1e3,e.AE=1e3,e.ordfeminine=370,e.Lslash=611,e.Oslash=778,e.OE=1e3,e.ordmasculine=365,e.ae=889,e.dotlessi=278,e.lslash=278,e.oslash=611,e.oe=944,e.germandbls=611,e.Idieresis=278,e.eacute=556,e.abreve=556,e.uhungarumlaut=611,e.ecaron=556,e.Ydieresis=667,e.divide=584,e.Yacute=667,e.Acircumflex=722,e.aacute=556,e.Ucircumflex=722,e.yacute=556,e.scommaaccent=556,e.ecircumflex=556,e.Uring=722,e.Udieresis=722,e.aogonek=556,e.Uacute=722,e.uogonek=611,e.Edieresis=667,e.Dcroat=722,e.commaaccent=250,e.copyright=737,e.Emacron=667,e.ccaron=556,e.aring=556,e.Ncommaaccent=722,e.lacute=278,e.agrave=556,e.Tcommaaccent=611,e.Cacute=722,e.atilde=556,e.Edotaccent=667,e.scaron=556,e.scedilla=556,e.iacute=278,e.lozenge=494,e.Rcaron=722,e.Gcommaaccent=778,e.ucircumflex=611,e.acircumflex=556,e.Amacron=722,e.rcaron=389,e.ccedilla=556,e.Zdotaccent=611,e.Thorn=667,e.Omacron=778,e.Racute=722,e.Sacute=667,e.dcaron=743,e.Umacron=722,e.uring=611,e.threesuperior=333,e.Ograve=778,e.Agrave=722,e.Abreve=722,e.multiply=584,e.uacute=611,e.Tcaron=611,e.partialdiff=494,e.ydieresis=556,e.Nacute=722,e.icircumflex=278,e.Ecircumflex=667,e.adieresis=556,e.edieresis=556,e.cacute=556,e.nacute=611,e.umacron=611,e.Ncaron=722,e.Iacute=278,e.plusminus=584,e.brokenbar=280,e.registered=737,e.Gbreve=778,e.Idotaccent=278,e.summation=600,e.Egrave=667,e.racute=389,e.omacron=611,e.Zacute=611,e.Zcaron=611,e.greaterequal=549,e.Eth=722,e.Ccedilla=722,e.lcommaaccent=278,e.tcaron=389,e.eogonek=556,e.Uogonek=722,e.Aacute=722,e.Adieresis=722,e.egrave=556,e.zacute=500,e.iogonek=278,e.Oacute=778,e.oacute=611,e.amacron=556,e.sacute=556,e.idieresis=278,e.Ocircumflex=778,e.Ugrave=722,e.Delta=612,e.thorn=611,e.twosuperior=333,e.Odieresis=778,e.mu=611,e.igrave=278,e.ohungarumlaut=611,e.Eogonek=667,e.dcroat=611,e.threequarters=834,e.Scedilla=667,e.lcaron=400,e.Kcommaaccent=722,e.Lacute=611,e.trademark=1e3,e.edotaccent=556,e.Igrave=278,e.Imacron=278,e.Lcaron=611,e.onehalf=834,e.lessequal=549,e.ocircumflex=611,e.ntilde=611,e.Uhungarumlaut=722,e.Eacute=667,e.emacron=556,e.gbreve=611,e.onequarter=834,e.Scaron=667,e.Scommaaccent=667,e.Ohungarumlaut=778,e.degree=400,e.ograve=611,e.Ccaron=722,e.ugrave=611,e.radical=549,e.Dcaron=722,e.rcommaaccent=389,e.Ntilde=722,e.otilde=611,e.Rcommaaccent=722,e.Lcommaaccent=611,e.Atilde=722,e.Aogonek=722,e.Aring=722,e.Otilde=778,e.zdotaccent=500,e.Ecaron=667,e.Iogonek=278,e.kcommaaccent=556,e.minus=584,e.Icircumflex=278,e.ncaron=611,e.tcommaaccent=333,e.logicalnot=584,e.odieresis=611,e.udieresis=611,e.notequal=549,e.gcommaaccent=611,e.eth=611,e.zcaron=500,e.ncommaaccent=611,e.onesuperior=333,e.imacron=278,e.Euro=556}),e["Helvetica-Oblique"]=i(function(e){e.space=278,e.exclam=278,e.quotedbl=355,e.numbersign=556,e.dollar=556,e.percent=889,e.ampersand=667,e.quoteright=222,e.parenleft=333,e.parenright=333,e.asterisk=389,e.plus=584,e.comma=278,e.hyphen=333,e.period=278,e.slash=278,e.zero=556,e.one=556,e.two=556,e.three=556,e.four=556,e.five=556,e.six=556,e.seven=556,e.eight=556,e.nine=556,e.colon=278,e.semicolon=278,e.less=584,e.equal=584,e.greater=584,e.question=556,e.at=1015,e.A=667,e.B=667,e.C=722,e.D=722,e.E=667,e.F=611,e.G=778,e.H=722,e.I=278,e.J=500,e.K=667,e.L=556,e.M=833,e.N=722,e.O=778,e.P=667,e.Q=778,e.R=722,e.S=667,e.T=611,e.U=722,e.V=667,e.W=944,e.X=667,e.Y=667,e.Z=611,e.bracketleft=278,e.backslash=278,e.bracketright=278,e.asciicircum=469,e.underscore=556,e.quoteleft=222,e.a=556,e.b=556,e.c=500,e.d=556,e.e=556,e.f=278,e.g=556,e.h=556,e.i=222,e.j=222,e.k=500,e.l=222,e.m=833,e.n=556,e.o=556,e.p=556,e.q=556,e.r=333,e.s=500,e.t=278,e.u=556,e.v=500,e.w=722,e.x=500,e.y=500,e.z=500,e.braceleft=334,e.bar=260,e.braceright=334,e.asciitilde=584,e.exclamdown=333,e.cent=556,e.sterling=556,e.fraction=167,e.yen=556,e.florin=556,e.section=556,e.currency=556,e.quotesingle=191,e.quotedblleft=333,e.guillemotleft=556,e.guilsinglleft=333,e.guilsinglright=333,e.fi=500,e.fl=500,e.endash=556,e.dagger=556,e.daggerdbl=556,e.periodcentered=278,e.paragraph=537,e.bullet=350,e.quotesinglbase=222,e.quotedblbase=333,e.quotedblright=333,e.guillemotright=556,e.ellipsis=1e3,e.perthousand=1e3,e.questiondown=611,e.grave=333,e.acute=333,e.circumflex=333,e.tilde=333,e.macron=333,e.breve=333,e.dotaccent=333,e.dieresis=333,e.ring=333,e.cedilla=333,e.hungarumlaut=333,e.ogonek=333,e.caron=333,e.emdash=1e3,e.AE=1e3,e.ordfeminine=370,e.Lslash=556,e.Oslash=778,e.OE=1e3,e.ordmasculine=365,e.ae=889,e.dotlessi=278,e.lslash=222,e.oslash=611,e.oe=944,e.germandbls=611,e.Idieresis=278,e.eacute=556,e.abreve=556,e.uhungarumlaut=556,e.ecaron=556,e.Ydieresis=667,e.divide=584,e.Yacute=667,e.Acircumflex=667,e.aacute=556,e.Ucircumflex=722,e.yacute=500,e.scommaaccent=500,e.ecircumflex=556,e.Uring=722,e.Udieresis=722,e.aogonek=556,e.Uacute=722,e.uogonek=556,e.Edieresis=667,e.Dcroat=722,e.commaaccent=250,e.copyright=737,e.Emacron=667,e.ccaron=500,e.aring=556,e.Ncommaaccent=722,e.lacute=222,e.agrave=556,e.Tcommaaccent=611,e.Cacute=722,e.atilde=556,e.Edotaccent=667,e.scaron=500,e.scedilla=500,e.iacute=278,e.lozenge=471,e.Rcaron=722,e.Gcommaaccent=778,e.ucircumflex=556,e.acircumflex=556,e.Amacron=667,e.rcaron=333,e.ccedilla=500,e.Zdotaccent=611,e.Thorn=667,e.Omacron=778,e.Racute=722,e.Sacute=667,e.dcaron=643,e.Umacron=722,e.uring=556,e.threesuperior=333,e.Ograve=778,e.Agrave=667,e.Abreve=667,e.multiply=584,e.uacute=556,e.Tcaron=611,e.partialdiff=476,e.ydieresis=500,e.Nacute=722,e.icircumflex=278,e.Ecircumflex=667,e.adieresis=556,e.edieresis=556,e.cacute=500,e.nacute=556,e.umacron=556,e.Ncaron=722,e.Iacute=278,e.plusminus=584,e.brokenbar=260,e.registered=737,e.Gbreve=778,e.Idotaccent=278,e.summation=600,e.Egrave=667,e.racute=333,e.omacron=556,e.Zacute=611,e.Zcaron=611,e.greaterequal=549,e.Eth=722,e.Ccedilla=722,e.lcommaaccent=222,e.tcaron=317,e.eogonek=556,e.Uogonek=722,e.Aacute=667,e.Adieresis=667,e.egrave=556,e.zacute=500,e.iogonek=222,e.Oacute=778,e.oacute=556,e.amacron=556,e.sacute=500,e.idieresis=278,e.Ocircumflex=778,e.Ugrave=722,e.Delta=612,e.thorn=556,e.twosuperior=333,e.Odieresis=778,e.mu=556,e.igrave=278,e.ohungarumlaut=556,e.Eogonek=667,e.dcroat=556,e.threequarters=834,e.Scedilla=667,e.lcaron=299,e.Kcommaaccent=667,e.Lacute=556,e.trademark=1e3,e.edotaccent=556,e.Igrave=278,e.Imacron=278,e.Lcaron=556,e.onehalf=834,e.lessequal=549,e.ocircumflex=556,e.ntilde=556,e.Uhungarumlaut=722,e.Eacute=667,e.emacron=556,e.gbreve=556,e.onequarter=834,e.Scaron=667,e.Scommaaccent=667,e.Ohungarumlaut=778,e.degree=400,e.ograve=556,e.Ccaron=722,e.ugrave=556,e.radical=453,e.Dcaron=722,e.rcommaaccent=333,e.Ntilde=722,e.otilde=556,e.Rcommaaccent=722,e.Lcommaaccent=556,e.Atilde=667,e.Aogonek=667,e.Aring=667,e.Otilde=778,e.zdotaccent=500,e.Ecaron=667,e.Iogonek=278,e.kcommaaccent=500,e.minus=584,e.Icircumflex=278,e.ncaron=556,e.tcommaaccent=278,e.logicalnot=584,e.odieresis=556,e.udieresis=556,e.notequal=549,e.gcommaaccent=556,e.eth=556,e.zcaron=500,e.ncommaaccent=556,e.onesuperior=333,e.imacron=278,e.Euro=556}),e.Symbol=i(function(e){e.space=250,e.exclam=333,e.universal=713,e.numbersign=500,e.existential=549,e.percent=833,e.ampersand=778,e.suchthat=439,e.parenleft=333,e.parenright=333,e.asteriskmath=500,e.plus=549,e.comma=250,e.minus=549,e.period=250,e.slash=278,e.zero=500,e.one=500,e.two=500,e.three=500,e.four=500,e.five=500,e.six=500,e.seven=500,e.eight=500,e.nine=500,e.colon=278,e.semicolon=278,e.less=549,e.equal=549,e.greater=549,e.question=444,e.congruent=549,e.Alpha=722,e.Beta=667,e.Chi=722,e.Delta=612,e.Epsilon=611,e.Phi=763,e.Gamma=603,e.Eta=722,e.Iota=333,e.theta1=631,e.Kappa=722,e.Lambda=686,e.Mu=889,e.Nu=722,e.Omicron=722,e.Pi=768,e.Theta=741,e.Rho=556,e.Sigma=592,e.Tau=611,e.Upsilon=690,e.sigma1=439,e.Omega=768,e.Xi=645,e.Psi=795,e.Zeta=611,e.bracketleft=333,e.therefore=863,e.bracketright=333,e.perpendicular=658,e.underscore=500,e.radicalex=500,e.alpha=631,e.beta=549,e.chi=549,e.delta=494,e.epsilon=439,e.phi=521,e.gamma=411,e.eta=603,e.iota=329,e.phi1=603,e.kappa=549,e.lambda=549,e.mu=576,e.nu=521,e.omicron=549,e.pi=549,e.theta=521,e.rho=549,e.sigma=603,e.tau=439,e.upsilon=576,e.omega1=713,e.omega=686,e.xi=493,e.psi=686,e.zeta=494,e.braceleft=480,e.bar=200,e.braceright=480,e.similar=549,e.Euro=750,e.Upsilon1=620,e.minute=247,e.lessequal=549,e.fraction=167,e.infinity=713,e.florin=500,e.club=753,e.diamond=753,e.heart=753,e.spade=753,e.arrowboth=1042,e.arrowleft=987,e.arrowup=603,e.arrowright=987,e.arrowdown=603,e.degree=400,e.plusminus=549,e.second=411,e.greaterequal=549,e.multiply=549,e.proportional=713,e.partialdiff=494,e.bullet=460,e.divide=549,e.notequal=549,e.equivalence=549,e.approxequal=549,e.ellipsis=1e3,e.arrowvertex=603,e.arrowhorizex=1e3,e.carriagereturn=658,e.aleph=823,e.Ifraktur=686,e.Rfraktur=795,e.weierstrass=987,e.circlemultiply=768,e.circleplus=768,e.emptyset=823,e.intersection=768,e.union=768,e.propersuperset=713,e.reflexsuperset=713,e.notsubset=713,e.propersubset=713,e.reflexsubset=713,e.element=713,e.notelement=713,e.angle=768,e.gradient=713,e.registerserif=790,e.copyrightserif=790,e.trademarkserif=890,e.product=823,e.radical=549,e.dotmath=250,e.logicalnot=713,e.logicaland=603,e.logicalor=603,e.arrowdblboth=1042,e.arrowdblleft=987,e.arrowdblup=603,e.arrowdblright=987,e.arrowdbldown=603,e.lozenge=494,e.angleleft=329,e.registersans=790,e.copyrightsans=790,e.trademarksans=786,e.summation=713,e.parenlefttp=384,e.parenleftex=384,e.parenleftbt=384,e.bracketlefttp=384,e.bracketleftex=384,e.bracketleftbt=384,e.bracelefttp=494,e.braceleftmid=494,e.braceleftbt=494,e.braceex=494,e.angleright=329,e.integral=274,e.integraltp=686,e.integralex=686,e.integralbt=686,e.parenrighttp=384,e.parenrightex=384,e.parenrightbt=384,e.bracketrighttp=384,e.bracketrightex=384,e.bracketrightbt=384,e.bracerighttp=494,e.bracerightmid=494,e.bracerightbt=494,e.apple=790}),e["Times-Roman"]=i(function(e){e.space=250,e.exclam=333,e.quotedbl=408,e.numbersign=500,e.dollar=500,e.percent=833,e.ampersand=778,e.quoteright=333,e.parenleft=333,e.parenright=333,e.asterisk=500,e.plus=564,e.comma=250,e.hyphen=333,e.period=250,e.slash=278,e.zero=500,e.one=500,e.two=500,e.three=500,e.four=500,e.five=500,e.six=500,e.seven=500,e.eight=500,e.nine=500,e.colon=278,e.semicolon=278,e.less=564,e.equal=564,e.greater=564,e.question=444,e.at=921,e.A=722,e.B=667,e.C=667,e.D=722,e.E=611,e.F=556,e.G=722,e.H=722,e.I=333,e.J=389,e.K=722,e.L=611,e.M=889,e.N=722,e.O=722,e.P=556,e.Q=722,e.R=667,e.S=556,e.T=611,e.U=722,e.V=722,e.W=944,e.X=722,e.Y=722,e.Z=611,e.bracketleft=333,e.backslash=278,e.bracketright=333,e.asciicircum=469,e.underscore=500,e.quoteleft=333,e.a=444,e.b=500,e.c=444,e.d=500,e.e=444,e.f=333,e.g=500,e.h=500,e.i=278,e.j=278,e.k=500,e.l=278,e.m=778,e.n=500,e.o=500,e.p=500,e.q=500,e.r=333,e.s=389,e.t=278,e.u=500,e.v=500,e.w=722,e.x=500,e.y=500,e.z=444,e.braceleft=480,e.bar=200,e.braceright=480,e.asciitilde=541,e.exclamdown=333,e.cent=500,e.sterling=500,e.fraction=167,e.yen=500,e.florin=500,e.section=500,e.currency=500,e.quotesingle=180,e.quotedblleft=444,e.guillemotleft=500,e.guilsinglleft=333,e.guilsinglright=333,e.fi=556,e.fl=556,e.endash=500,e.dagger=500,e.daggerdbl=500,e.periodcentered=250,e.paragraph=453,e.bullet=350,e.quotesinglbase=333,e.quotedblbase=444,e.quotedblright=444,e.guillemotright=500,e.ellipsis=1e3,e.perthousand=1e3,e.questiondown=444,e.grave=333,e.acute=333,e.circumflex=333,e.tilde=333,e.macron=333,e.breve=333,e.dotaccent=333,e.dieresis=333,e.ring=333,e.cedilla=333,e.hungarumlaut=333,e.ogonek=333,e.caron=333,e.emdash=1e3,e.AE=889,e.ordfeminine=276,e.Lslash=611,e.Oslash=722,e.OE=889,e.ordmasculine=310,e.ae=667,e.dotlessi=278,e.lslash=278,e.oslash=500,e.oe=722,e.germandbls=500,e.Idieresis=333,e.eacute=444,e.abreve=444,e.uhungarumlaut=500,e.ecaron=444,e.Ydieresis=722,e.divide=564,e.Yacute=722,e.Acircumflex=722,e.aacute=444,e.Ucircumflex=722,e.yacute=500,e.scommaaccent=389,e.ecircumflex=444,e.Uring=722,e.Udieresis=722,e.aogonek=444,e.Uacute=722,e.uogonek=500,e.Edieresis=611,e.Dcroat=722,e.commaaccent=250,e.copyright=760,e.Emacron=611,e.ccaron=444,e.aring=444,e.Ncommaaccent=722,e.lacute=278,e.agrave=444,e.Tcommaaccent=611,e.Cacute=667,e.atilde=444,e.Edotaccent=611,e.scaron=389,e.scedilla=389,e.iacute=278,e.lozenge=471,e.Rcaron=667,e.Gcommaaccent=722,e.ucircumflex=500,e.acircumflex=444,e.Amacron=722,e.rcaron=333,e.ccedilla=444,e.Zdotaccent=611,e.Thorn=556,e.Omacron=722,e.Racute=667,e.Sacute=556,e.dcaron=588,e.Umacron=722,e.uring=500,e.threesuperior=300,e.Ograve=722,e.Agrave=722,e.Abreve=722,e.multiply=564,e.uacute=500,e.Tcaron=611,e.partialdiff=476,e.ydieresis=500,e.Nacute=722,e.icircumflex=278,e.Ecircumflex=611,e.adieresis=444,e.edieresis=444,e.cacute=444,e.nacute=500,e.umacron=500,e.Ncaron=722,e.Iacute=333,e.plusminus=564,e.brokenbar=200,e.registered=760,e.Gbreve=722,e.Idotaccent=333,e.summation=600,e.Egrave=611,e.racute=333,e.omacron=500,e.Zacute=611,e.Zcaron=611,e.greaterequal=549,e.Eth=722,e.Ccedilla=667,e.lcommaaccent=278,e.tcaron=326,e.eogonek=444,e.Uogonek=722,e.Aacute=722,e.Adieresis=722,e.egrave=444,e.zacute=444,e.iogonek=278,e.Oacute=722,e.oacute=500,e.amacron=444,e.sacute=389,e.idieresis=278,e.Ocircumflex=722,e.Ugrave=722,e.Delta=612,e.thorn=500,e.twosuperior=300,e.Odieresis=722,e.mu=500,e.igrave=278,e.ohungarumlaut=500,e.Eogonek=611,e.dcroat=500,e.threequarters=750,e.Scedilla=556,e.lcaron=344,e.Kcommaaccent=722,e.Lacute=611,e.trademark=980,e.edotaccent=444,e.Igrave=333,e.Imacron=333,e.Lcaron=611,e.onehalf=750,e.lessequal=549,e.ocircumflex=500,e.ntilde=500,e.Uhungarumlaut=722,e.Eacute=611,e.emacron=444,e.gbreve=500,e.onequarter=750,e.Scaron=556,e.Scommaaccent=556,e.Ohungarumlaut=722,e.degree=400,e.ograve=500,e.Ccaron=667,e.ugrave=500,e.radical=453,e.Dcaron=722,e.rcommaaccent=333,e.Ntilde=722,e.otilde=500,e.Rcommaaccent=667,e.Lcommaaccent=611,e.Atilde=722,e.Aogonek=722,e.Aring=722,e.Otilde=722,e.zdotaccent=444,e.Ecaron=611,e.Iogonek=333,e.kcommaaccent=500,e.minus=564,e.Icircumflex=333,e.ncaron=500,e.tcommaaccent=278,e.logicalnot=564,e.odieresis=500,e.udieresis=500,e.notequal=549,e.gcommaaccent=500,e.eth=500,e.zcaron=444,e.ncommaaccent=500,e.onesuperior=300,e.imacron=278,e.Euro=500}),e["Times-Bold"]=i(function(e){e.space=250,e.exclam=333,e.quotedbl=555,e.numbersign=500,e.dollar=500,e.percent=1e3,e.ampersand=833,e.quoteright=333,e.parenleft=333,e.parenright=333,e.asterisk=500,e.plus=570,e.comma=250,e.hyphen=333,e.period=250,e.slash=278,e.zero=500,e.one=500,e.two=500,e.three=500,e.four=500,e.five=500,e.six=500,e.seven=500,e.eight=500,e.nine=500,e.colon=333,e.semicolon=333,e.less=570,e.equal=570,e.greater=570,e.question=500,e.at=930,e.A=722,e.B=667,e.C=722,e.D=722,e.E=667,e.F=611,e.G=778,e.H=778,e.I=389,e.J=500,e.K=778,e.L=667,e.M=944,e.N=722,e.O=778,e.P=611,e.Q=778,e.R=722,e.S=556,e.T=667,e.U=722,e.V=722,e.W=1e3,e.X=722,e.Y=722,e.Z=667,e.bracketleft=333,e.backslash=278,e.bracketright=333,e.asciicircum=581,e.underscore=500,e.quoteleft=333,e.a=500,e.b=556,e.c=444,e.d=556,e.e=444,e.f=333,e.g=500,e.h=556,e.i=278,e.j=333,e.k=556,e.l=278,e.m=833,e.n=556,e.o=500,e.p=556,e.q=556,e.r=444,e.s=389,e.t=333,e.u=556,e.v=500,e.w=722,e.x=500,e.y=500,e.z=444,e.braceleft=394,e.bar=220,e.braceright=394,e.asciitilde=520,e.exclamdown=333,e.cent=500,e.sterling=500,e.fraction=167,e.yen=500,e.florin=500,e.section=500,e.currency=500,e.quotesingle=278,e.quotedblleft=500,e.guillemotleft=500,e.guilsinglleft=333,e.guilsinglright=333,e.fi=556,e.fl=556,e.endash=500,e.dagger=500,e.daggerdbl=500,e.periodcentered=250,e.paragraph=540,e.bullet=350,e.quotesinglbase=333,e.quotedblbase=500,e.quotedblright=500,e.guillemotright=500,e.ellipsis=1e3,e.perthousand=1e3,e.questiondown=500,e.grave=333,e.acute=333,e.circumflex=333,e.tilde=333,e.macron=333,e.breve=333,e.dotaccent=333,e.dieresis=333,e.ring=333,e.cedilla=333,e.hungarumlaut=333,e.ogonek=333,e.caron=333,e.emdash=1e3,e.AE=1e3,e.ordfeminine=300,e.Lslash=667,e.Oslash=778,e.OE=1e3,e.ordmasculine=330,e.ae=722,e.dotlessi=278,e.lslash=278,e.oslash=500,e.oe=722,e.germandbls=556,e.Idieresis=389,e.eacute=444,e.abreve=500,e.uhungarumlaut=556,e.ecaron=444,e.Ydieresis=722,e.divide=570,e.Yacute=722,e.Acircumflex=722,e.aacute=500,e.Ucircumflex=722,e.yacute=500,e.scommaaccent=389,e.ecircumflex=444,e.Uring=722,e.Udieresis=722,e.aogonek=500,e.Uacute=722,e.uogonek=556,e.Edieresis=667,e.Dcroat=722,e.commaaccent=250,e.copyright=747,e.Emacron=667,e.ccaron=444,e.aring=500,e.Ncommaaccent=722,e.lacute=278,e.agrave=500,e.Tcommaaccent=667,e.Cacute=722,e.atilde=500,e.Edotaccent=667,e.scaron=389,e.scedilla=389,e.iacute=278,e.lozenge=494,e.Rcaron=722,e.Gcommaaccent=778,e.ucircumflex=556,e.acircumflex=500,e.Amacron=722,e.rcaron=444,e.ccedilla=444,e.Zdotaccent=667,e.Thorn=611,e.Omacron=778,e.Racute=722,e.Sacute=556,e.dcaron=672,e.Umacron=722,e.uring=556,e.threesuperior=300,e.Ograve=778,e.Agrave=722,e.Abreve=722,e.multiply=570,e.uacute=556,e.Tcaron=667,e.partialdiff=494,e.ydieresis=500,e.Nacute=722,e.icircumflex=278,e.Ecircumflex=667,e.adieresis=500,e.edieresis=444,e.cacute=444,e.nacute=556,e.umacron=556,e.Ncaron=722,e.Iacute=389,e.plusminus=570,e.brokenbar=220,e.registered=747,e.Gbreve=778,e.Idotaccent=389,e.summation=600,e.Egrave=667,e.racute=444,e.omacron=500,e.Zacute=667,e.Zcaron=667,e.greaterequal=549,e.Eth=722,e.Ccedilla=722,e.lcommaaccent=278,e.tcaron=416,e.eogonek=444,e.Uogonek=722,e.Aacute=722,e.Adieresis=722,e.egrave=444,e.zacute=444,e.iogonek=278,e.Oacute=778,e.oacute=500,e.amacron=500,e.sacute=389,e.idieresis=278,e.Ocircumflex=778,e.Ugrave=722,e.Delta=612,e.thorn=556,e.twosuperior=300,e.Odieresis=778,e.mu=556,e.igrave=278,e.ohungarumlaut=500,e.Eogonek=667,e.dcroat=556,e.threequarters=750,e.Scedilla=556,e.lcaron=394,e.Kcommaaccent=778,e.Lacute=667,e.trademark=1e3,e.edotaccent=444,e.Igrave=389,e.Imacron=389,e.Lcaron=667,e.onehalf=750,e.lessequal=549,e.ocircumflex=500,e.ntilde=556,e.Uhungarumlaut=722,e.Eacute=667,e.emacron=444,e.gbreve=500,e.onequarter=750,e.Scaron=556,e.Scommaaccent=556,e.Ohungarumlaut=778,e.degree=400,e.ograve=500,e.Ccaron=722,e.ugrave=556,e.radical=549,e.Dcaron=722,e.rcommaaccent=444,e.Ntilde=722,e.otilde=500,e.Rcommaaccent=722,e.Lcommaaccent=667,e.Atilde=722,e.Aogonek=722,e.Aring=722,e.Otilde=778,e.zdotaccent=444,e.Ecaron=667,e.Iogonek=389,e.kcommaaccent=556,e.minus=570,e.Icircumflex=389,e.ncaron=556,e.tcommaaccent=333,e.logicalnot=570,e.odieresis=500,e.udieresis=556,e.notequal=549,e.gcommaaccent=500,e.eth=500,e.zcaron=444,e.ncommaaccent=556,e.onesuperior=300,e.imacron=278,e.Euro=500}),e["Times-BoldItalic"]=i(function(e){e.space=250,e.exclam=389,e.quotedbl=555,e.numbersign=500,e.dollar=500,e.percent=833,e.ampersand=778,e.quoteright=333,e.parenleft=333,e.parenright=333,e.asterisk=500,e.plus=570,e.comma=250,e.hyphen=333,e.period=250,e.slash=278,e.zero=500,e.one=500,e.two=500,e.three=500,e.four=500,e.five=500,e.six=500,e.seven=500,e.eight=500,e.nine=500,e.colon=333,e.semicolon=333,e.less=570,e.equal=570,e.greater=570,e.question=500,e.at=832,e.A=667,e.B=667,e.C=667,e.D=722,e.E=667,e.F=667,e.G=722,e.H=778,e.I=389,e.J=500,e.K=667,e.L=611,e.M=889,e.N=722,e.O=722,e.P=611,e.Q=722,e.R=667,e.S=556,e.T=611,e.U=722,e.V=667,e.W=889,e.X=667,e.Y=611,e.Z=611,e.bracketleft=333,e.backslash=278,e.bracketright=333,e.asciicircum=570,e.underscore=500,e.quoteleft=333,e.a=500,e.b=500,e.c=444,e.d=500,e.e=444,e.f=333,e.g=500,e.h=556,e.i=278,e.j=278,e.k=500,e.l=278,e.m=778,e.n=556,e.o=500,e.p=500,e.q=500,e.r=389,e.s=389,e.t=278,e.u=556,e.v=444,e.w=667,e.x=500,e.y=444,e.z=389,e.braceleft=348,e.bar=220,e.braceright=348,e.asciitilde=570,e.exclamdown=389,e.cent=500,e.sterling=500,e.fraction=167,e.yen=500,e.florin=500,e.section=500,e.currency=500,e.quotesingle=278,e.quotedblleft=500,e.guillemotleft=500,e.guilsinglleft=333,e.guilsinglright=333,e.fi=556,e.fl=556,e.endash=500,e.dagger=500,e.daggerdbl=500,e.periodcentered=250,e.paragraph=500,e.bullet=350,e.quotesinglbase=333,e.quotedblbase=500,e.quotedblright=500,e.guillemotright=500,e.ellipsis=1e3,e.perthousand=1e3,e.questiondown=500,e.grave=333,e.acute=333,e.circumflex=333,e.tilde=333,e.macron=333,e.breve=333,e.dotaccent=333,e.dieresis=333,e.ring=333,e.cedilla=333,e.hungarumlaut=333,e.ogonek=333,e.caron=333,e.emdash=1e3,e.AE=944,e.ordfeminine=266,e.Lslash=611,e.Oslash=722,e.OE=944,e.ordmasculine=300,e.ae=722,e.dotlessi=278,e.lslash=278,e.oslash=500,e.oe=722,e.germandbls=500,e.Idieresis=389,e.eacute=444,e.abreve=500,e.uhungarumlaut=556,e.ecaron=444,e.Ydieresis=611,e.divide=570,e.Yacute=611,e.Acircumflex=667,e.aacute=500,e.Ucircumflex=722,e.yacute=444,e.scommaaccent=389,e.ecircumflex=444,e.Uring=722,e.Udieresis=722,e.aogonek=500,e.Uacute=722,e.uogonek=556,e.Edieresis=667,e.Dcroat=722,e.commaaccent=250,e.copyright=747,e.Emacron=667,e.ccaron=444,e.aring=500,e.Ncommaaccent=722,e.lacute=278,e.agrave=500,e.Tcommaaccent=611,e.Cacute=667,e.atilde=500,e.Edotaccent=667,e.scaron=389,e.scedilla=389,e.iacute=278,e.lozenge=494,e.Rcaron=667,e.Gcommaaccent=722,e.ucircumflex=556,e.acircumflex=500,e.Amacron=667,e.rcaron=389,e.ccedilla=444,e.Zdotaccent=611,e.Thorn=611,e.Omacron=722,e.Racute=667,e.Sacute=556,e.dcaron=608,e.Umacron=722,e.uring=556,e.threesuperior=300,e.Ograve=722,e.Agrave=667,e.Abreve=667,e.multiply=570,e.uacute=556,e.Tcaron=611,e.partialdiff=494,e.ydieresis=444,e.Nacute=722,e.icircumflex=278,e.Ecircumflex=667,e.adieresis=500,e.edieresis=444,e.cacute=444,e.nacute=556,e.umacron=556,e.Ncaron=722,e.Iacute=389,e.plusminus=570,e.brokenbar=220,e.registered=747,e.Gbreve=722,e.Idotaccent=389,e.summation=600,e.Egrave=667,e.racute=389,e.omacron=500,e.Zacute=611,e.Zcaron=611,e.greaterequal=549,e.Eth=722,e.Ccedilla=667,e.lcommaaccent=278,e.tcaron=366,e.eogonek=444,e.Uogonek=722,e.Aacute=667,e.Adieresis=667,
e.egrave=444,e.zacute=389,e.iogonek=278,e.Oacute=722,e.oacute=500,e.amacron=500,e.sacute=389,e.idieresis=278,e.Ocircumflex=722,e.Ugrave=722,e.Delta=612,e.thorn=500,e.twosuperior=300,e.Odieresis=722,e.mu=576,e.igrave=278,e.ohungarumlaut=500,e.Eogonek=667,e.dcroat=500,e.threequarters=750,e.Scedilla=556,e.lcaron=382,e.Kcommaaccent=667,e.Lacute=611,e.trademark=1e3,e.edotaccent=444,e.Igrave=389,e.Imacron=389,e.Lcaron=611,e.onehalf=750,e.lessequal=549,e.ocircumflex=500,e.ntilde=556,e.Uhungarumlaut=722,e.Eacute=667,e.emacron=444,e.gbreve=500,e.onequarter=750,e.Scaron=556,e.Scommaaccent=556,e.Ohungarumlaut=722,e.degree=400,e.ograve=500,e.Ccaron=667,e.ugrave=556,e.radical=549,e.Dcaron=722,e.rcommaaccent=389,e.Ntilde=722,e.otilde=500,e.Rcommaaccent=667,e.Lcommaaccent=611,e.Atilde=667,e.Aogonek=667,e.Aring=667,e.Otilde=722,e.zdotaccent=389,e.Ecaron=667,e.Iogonek=389,e.kcommaaccent=500,e.minus=606,e.Icircumflex=389,e.ncaron=556,e.tcommaaccent=278,e.logicalnot=606,e.odieresis=500,e.udieresis=556,e.notequal=549,e.gcommaaccent=500,e.eth=500,e.zcaron=389,e.ncommaaccent=556,e.onesuperior=300,e.imacron=278,e.Euro=500}),e["Times-Italic"]=i(function(e){e.space=250,e.exclam=333,e.quotedbl=420,e.numbersign=500,e.dollar=500,e.percent=833,e.ampersand=778,e.quoteright=333,e.parenleft=333,e.parenright=333,e.asterisk=500,e.plus=675,e.comma=250,e.hyphen=333,e.period=250,e.slash=278,e.zero=500,e.one=500,e.two=500,e.three=500,e.four=500,e.five=500,e.six=500,e.seven=500,e.eight=500,e.nine=500,e.colon=333,e.semicolon=333,e.less=675,e.equal=675,e.greater=675,e.question=500,e.at=920,e.A=611,e.B=611,e.C=667,e.D=722,e.E=611,e.F=611,e.G=722,e.H=722,e.I=333,e.J=444,e.K=667,e.L=556,e.M=833,e.N=667,e.O=722,e.P=611,e.Q=722,e.R=611,e.S=500,e.T=556,e.U=722,e.V=611,e.W=833,e.X=611,e.Y=556,e.Z=556,e.bracketleft=389,e.backslash=278,e.bracketright=389,e.asciicircum=422,e.underscore=500,e.quoteleft=333,e.a=500,e.b=500,e.c=444,e.d=500,e.e=444,e.f=278,e.g=500,e.h=500,e.i=278,e.j=278,e.k=444,e.l=278,e.m=722,e.n=500,e.o=500,e.p=500,e.q=500,e.r=389,e.s=389,e.t=278,e.u=500,e.v=444,e.w=667,e.x=444,e.y=444,e.z=389,e.braceleft=400,e.bar=275,e.braceright=400,e.asciitilde=541,e.exclamdown=389,e.cent=500,e.sterling=500,e.fraction=167,e.yen=500,e.florin=500,e.section=500,e.currency=500,e.quotesingle=214,e.quotedblleft=556,e.guillemotleft=500,e.guilsinglleft=333,e.guilsinglright=333,e.fi=500,e.fl=500,e.endash=500,e.dagger=500,e.daggerdbl=500,e.periodcentered=250,e.paragraph=523,e.bullet=350,e.quotesinglbase=333,e.quotedblbase=556,e.quotedblright=556,e.guillemotright=500,e.ellipsis=889,e.perthousand=1e3,e.questiondown=500,e.grave=333,e.acute=333,e.circumflex=333,e.tilde=333,e.macron=333,e.breve=333,e.dotaccent=333,e.dieresis=333,e.ring=333,e.cedilla=333,e.hungarumlaut=333,e.ogonek=333,e.caron=333,e.emdash=889,e.AE=889,e.ordfeminine=276,e.Lslash=556,e.Oslash=722,e.OE=944,e.ordmasculine=310,e.ae=667,e.dotlessi=278,e.lslash=278,e.oslash=500,e.oe=667,e.germandbls=500,e.Idieresis=333,e.eacute=444,e.abreve=500,e.uhungarumlaut=500,e.ecaron=444,e.Ydieresis=556,e.divide=675,e.Yacute=556,e.Acircumflex=611,e.aacute=500,e.Ucircumflex=722,e.yacute=444,e.scommaaccent=389,e.ecircumflex=444,e.Uring=722,e.Udieresis=722,e.aogonek=500,e.Uacute=722,e.uogonek=500,e.Edieresis=611,e.Dcroat=722,e.commaaccent=250,e.copyright=760,e.Emacron=611,e.ccaron=444,e.aring=500,e.Ncommaaccent=667,e.lacute=278,e.agrave=500,e.Tcommaaccent=556,e.Cacute=667,e.atilde=500,e.Edotaccent=611,e.scaron=389,e.scedilla=389,e.iacute=278,e.lozenge=471,e.Rcaron=611,e.Gcommaaccent=722,e.ucircumflex=500,e.acircumflex=500,e.Amacron=611,e.rcaron=389,e.ccedilla=444,e.Zdotaccent=556,e.Thorn=611,e.Omacron=722,e.Racute=611,e.Sacute=500,e.dcaron=544,e.Umacron=722,e.uring=500,e.threesuperior=300,e.Ograve=722,e.Agrave=611,e.Abreve=611,e.multiply=675,e.uacute=500,e.Tcaron=556,e.partialdiff=476,e.ydieresis=444,e.Nacute=667,e.icircumflex=278,e.Ecircumflex=611,e.adieresis=500,e.edieresis=444,e.cacute=444,e.nacute=500,e.umacron=500,e.Ncaron=667,e.Iacute=333,e.plusminus=675,e.brokenbar=275,e.registered=760,e.Gbreve=722,e.Idotaccent=333,e.summation=600,e.Egrave=611,e.racute=389,e.omacron=500,e.Zacute=556,e.Zcaron=556,e.greaterequal=549,e.Eth=722,e.Ccedilla=667,e.lcommaaccent=278,e.tcaron=300,e.eogonek=444,e.Uogonek=722,e.Aacute=611,e.Adieresis=611,e.egrave=444,e.zacute=389,e.iogonek=278,e.Oacute=722,e.oacute=500,e.amacron=500,e.sacute=389,e.idieresis=278,e.Ocircumflex=722,e.Ugrave=722,e.Delta=612,e.thorn=500,e.twosuperior=300,e.Odieresis=722,e.mu=500,e.igrave=278,e.ohungarumlaut=500,e.Eogonek=611,e.dcroat=500,e.threequarters=750,e.Scedilla=500,e.lcaron=300,e.Kcommaaccent=667,e.Lacute=556,e.trademark=980,e.edotaccent=444,e.Igrave=333,e.Imacron=333,e.Lcaron=611,e.onehalf=750,e.lessequal=549,e.ocircumflex=500,e.ntilde=500,e.Uhungarumlaut=722,e.Eacute=611,e.emacron=444,e.gbreve=500,e.onequarter=750,e.Scaron=500,e.Scommaaccent=500,e.Ohungarumlaut=722,e.degree=400,e.ograve=500,e.Ccaron=667,e.ugrave=500,e.radical=453,e.Dcaron=722,e.rcommaaccent=389,e.Ntilde=667,e.otilde=500,e.Rcommaaccent=611,e.Lcommaaccent=556,e.Atilde=611,e.Aogonek=611,e.Aring=611,e.Otilde=722,e.zdotaccent=389,e.Ecaron=611,e.Iogonek=333,e.kcommaaccent=444,e.minus=675,e.Icircumflex=333,e.ncaron=500,e.tcommaaccent=278,e.logicalnot=675,e.odieresis=500,e.udieresis=500,e.notequal=549,e.gcommaaccent=500,e.eth=500,e.zcaron=389,e.ncommaaccent=500,e.onesuperior=300,e.imacron=278,e.Euro=500}),e.ZapfDingbats=i(function(e){e.space=278,e.a1=974,e.a2=961,e.a202=974,e.a3=980,e.a4=719,e.a5=789,e.a119=790,e.a118=791,e.a117=690,e.a11=960,e.a12=939,e.a13=549,e.a14=855,e.a15=911,e.a16=933,e.a105=911,e.a17=945,e.a18=974,e.a19=755,e.a20=846,e.a21=762,e.a22=761,e.a23=571,e.a24=677,e.a25=763,e.a26=760,e.a27=759,e.a28=754,e.a6=494,e.a7=552,e.a8=537,e.a9=577,e.a10=692,e.a29=786,e.a30=788,e.a31=788,e.a32=790,e.a33=793,e.a34=794,e.a35=816,e.a36=823,e.a37=789,e.a38=841,e.a39=823,e.a40=833,e.a41=816,e.a42=831,e.a43=923,e.a44=744,e.a45=723,e.a46=749,e.a47=790,e.a48=792,e.a49=695,e.a50=776,e.a51=768,e.a52=792,e.a53=759,e.a54=707,e.a55=708,e.a56=682,e.a57=701,e.a58=826,e.a59=815,e.a60=789,e.a61=789,e.a62=707,e.a63=687,e.a64=696,e.a65=689,e.a66=786,e.a67=787,e.a68=713,e.a69=791,e.a70=785,e.a71=791,e.a72=873,e.a73=761,e.a74=762,e.a203=762,e.a75=759,e.a204=759,e.a76=892,e.a77=892,e.a78=788,e.a79=784,e.a81=438,e.a82=138,e.a83=277,e.a84=415,e.a97=392,e.a98=392,e.a99=668,e.a100=668,e.a89=390,e.a90=390,e.a93=317,e.a94=317,e.a91=276,e.a92=276,e.a205=509,e.a85=509,e.a206=410,e.a86=410,e.a87=234,e.a88=234,e.a95=334,e.a96=334,e.a101=732,e.a102=544,e.a103=544,e.a104=910,e.a106=667,e.a107=760,e.a108=760,e.a112=776,e.a111=595,e.a110=694,e.a109=626,e.a120=788,e.a121=788,e.a122=788,e.a123=788,e.a124=788,e.a125=788,e.a126=788,e.a127=788,e.a128=788,e.a129=788,e.a130=788,e.a131=788,e.a132=788,e.a133=788,e.a134=788,e.a135=788,e.a136=788,e.a137=788,e.a138=788,e.a139=788,e.a140=788,e.a141=788,e.a142=788,e.a143=788,e.a144=788,e.a145=788,e.a146=788,e.a147=788,e.a148=788,e.a149=788,e.a150=788,e.a151=788,e.a152=788,e.a153=788,e.a154=788,e.a155=788,e.a156=788,e.a157=788,e.a158=788,e.a159=788,e.a160=894,e.a161=838,e.a163=1016,e.a164=458,e.a196=748,e.a165=924,e.a192=748,e.a166=918,e.a167=927,e.a168=928,e.a169=928,e.a170=834,e.a171=873,e.a172=828,e.a173=924,e.a162=924,e.a174=917,e.a175=930,e.a176=931,e.a177=463,e.a178=883,e.a179=836,e.a193=836,e.a180=867,e.a199=867,e.a181=696,e.a200=696,e.a182=874,e.a201=874,e.a183=760,e.a184=946,e.a197=771,e.a185=865,e.a194=771,e.a198=888,e.a186=967,e.a195=888,e.a187=831,e.a188=873,e.a189=927,e.a190=970,e.a191=918})})
e.getMetrics=a}),function(e,t){t(e.pdfjsCoreMurmurHash3={},e.pdfjsSharedUtil)}(this,function(e,t){var i=t.Uint32ArrayView,a=function(e){function t(e){var t=3285377520
this.h1=e?4294967295&e:t,this.h2=e?4294967295&e:t}var a=4294901760,r=65535,n=!1
try{new Uint32Array(new Uint8Array(5).buffer,0,1)}catch(s){n=!0}return t.prototype={update:function(e){var t,s=n
if("string"==typeof e){var o=new Uint8Array(2*e.length),c=0
for(t=0;t<e.length;t++){var l=e.charCodeAt(t)
255>=l?o[c++]=l:(o[c++]=l>>>8,o[c++]=255&l)}}else if(e instanceof Uint8Array)o=e,c=o.length
else{if(!("object"==typeof e&&"length"in e))throw Error("Wrong data format in MurmurHash3_64_update. Input must be a string or array.")
o=e,c=o.length,s=!0}var h=c>>2,u=c-4*h,d=s?new i(o,h):new Uint32Array(o.buffer,0,h),f=0,g=0,p=this.h1,m=this.h2,v=3432918353,b=461845907,y=v&r,w=b&r
for(t=0;h>t;t++)1&t?(f=d[t],f=f*v&a|f*y&r,f=f<<15|f>>>17,f=f*b&a|f*w&r,p^=f,p=p<<13|p>>>19,p=5*p+3864292196):(g=d[t],g=g*v&a|g*y&r,g=g<<15|g>>>17,g=g*b&a|g*w&r,m^=g,m=m<<13|m>>>19,m=5*m+3864292196)
switch(f=0,u){case 3:f^=o[4*h+2]<<16
case 2:f^=o[4*h+1]<<8
case 1:f^=o[4*h],f=f*v&a|f*y&r,f=f<<15|f>>>17,f=f*b&a|f*w&r,1&h?p^=f:m^=f}return this.h1=p,this.h2=m,this},hexdigest:function(){var e=this.h1,t=this.h2
e^=t>>>1,e=3981806797*e&a|36045*e&r,t=4283543511*t&a|(2950163797*(t<<16|e>>>16)&a)>>>16,e^=t>>>1,e=444984403*e&a|60499*e&r,t=3301882366*t&a|(3120437893*(t<<16|e>>>16)&a)>>>16,e^=t>>>1
for(var i=0,n=[e,t],s="";i<n.length;i++){for(var o=(n[i]>>>0).toString(16);o.length<8;)o="0"+o
s+=o}return s}},t}()
e.MurmurHash3_64=a}),function(e,t){t(e.pdfjsCorePrimitives={},e.pdfjsSharedUtil)}(this,function(e,t){function i(e,t){return e instanceof l&&(void 0===t||e.name===t)}function a(e,t){return e instanceof h&&(void 0===t||e.cmd===t)}function r(e,t){return e instanceof u&&(void 0===t||i(e.get("Type"),t))}function n(e){return e instanceof d}function s(e,t){return e.num===t.num&&e.gen===t.gen}function o(e){return"object"==typeof e&&null!==e&&void 0!==e.getBytes}var c=t.isArray,l=function(){function e(e){this.name=e}e.prototype={}
var t=Object.create(null)
return e.get=function(i){var a=t[i]
return a?a:t[i]=new e(i)},e}(),h=function(){function e(e){this.cmd=e}e.prototype={}
var t=Object.create(null)
return e.get=function(i){var a=t[i]
return a?a:t[i]=new e(i)},e}(),u=function(){function e(e){this.map=Object.create(null),this.xref=e,this.objId=null,this.suppressEncryption=!1,this.__nonSerializable__=t}var t=function(){return t}
return e.prototype={assignXref:function(e){this.xref=e},get:function(e,t,i){var a,r=this.xref,n=this.suppressEncryption
return void 0!==(a=this.map[e])||e in this.map||void 0===t?r?r.fetchIfRef(a,n):a:void 0!==(a=this.map[t])||t in this.map||void 0===i?r?r.fetchIfRef(a,n):a:(a=this.map[i]||null,r?r.fetchIfRef(a,n):a)},getAsync:function(e,t,i){var a,r=this.xref,n=this.suppressEncryption
return void 0!==(a=this.map[e])||e in this.map||void 0===t?r?r.fetchIfRefAsync(a,n):Promise.resolve(a):void 0!==(a=this.map[t])||t in this.map||void 0===i?r?r.fetchIfRefAsync(a,n):Promise.resolve(a):(a=this.map[i]||null,r?r.fetchIfRefAsync(a,n):Promise.resolve(a))},getArray:function(e,t,i){var a=this.get(e,t,i),r=this.xref,s=this.suppressEncryption
if(!c(a)||!r)return a
a=a.slice()
for(var o=0,l=a.length;l>o;o++)n(a[o])&&(a[o]=r.fetch(a[o],s))
return a},getRaw:function(e){return this.map[e]},getKeys:function(){return Object.keys(this.map)},set:function(e,t){this.map[e]=t},has:function(e){return e in this.map},forEach:function(e){for(var t in this.map)e(t,this.get(t))}},e.empty=new e(null),e.merge=function(t,i){for(var a=new e(t),n=0,s=i.length;s>n;n++){var o=i[n]
if(r(o))for(var c in o.map)a.map[c]||(a.map[c]=o.map[c])}return a},e}(),d=function(){function e(e,t){this.num=e,this.gen=t}return e.prototype={toString:function(){var e=this.num+"R"
return 0!==this.gen&&(e+=this.gen),e}},e}(),f=function(){function e(){this.dict=Object.create(null)}return e.prototype={has:function(e){return""+e in this.dict},put:function(e){this.dict[""+e]=!0},remove:function(e){delete this.dict[""+e]}},e}(),g=function(){function e(){this.dict=Object.create(null)}return e.prototype={get:function(e){return this.dict[""+e]},has:function(e){return""+e in this.dict},put:function(e,t){this.dict[""+e]=t},putAlias:function(e,t){this.dict[""+e]=this.get(t)},forEach:function(e,t){for(var i in this.dict)e.call(t,this.dict[i])},clear:function(){this.dict=Object.create(null)}},e}()
e.Cmd=h,e.Dict=u,e.Name=l,e.Ref=d,e.RefSet=f,e.RefSetCache=g,e.isCmd=a,e.isDict=r,e.isName=i,e.isRef=n,e.isRefsEqual=s,e.isStream=o}),function(e,t){t(e.pdfjsCoreStandardFonts={},e.pdfjsSharedUtil)}(this,function(e,t){var i=t.getLookupTableFactory,a=i(function(e){e.ArialNarrow="Helvetica",e["ArialNarrow-Bold"]="Helvetica-Bold",e["ArialNarrow-BoldItalic"]="Helvetica-BoldOblique",e["ArialNarrow-Italic"]="Helvetica-Oblique",e.ArialBlack="Helvetica",e["ArialBlack-Bold"]="Helvetica-Bold",e["ArialBlack-BoldItalic"]="Helvetica-BoldOblique",e["ArialBlack-Italic"]="Helvetica-Oblique",e["Arial-Black"]="Helvetica",e["Arial-Black-Bold"]="Helvetica-Bold",e["Arial-Black-BoldItalic"]="Helvetica-BoldOblique",e["Arial-Black-Italic"]="Helvetica-Oblique",e.Arial="Helvetica",e["Arial-Bold"]="Helvetica-Bold",e["Arial-BoldItalic"]="Helvetica-BoldOblique",e["Arial-Italic"]="Helvetica-Oblique",e["Arial-BoldItalicMT"]="Helvetica-BoldOblique",e["Arial-BoldMT"]="Helvetica-Bold",e["Arial-ItalicMT"]="Helvetica-Oblique",e.ArialMT="Helvetica",e["Courier-Bold"]="Courier-Bold",e["Courier-BoldItalic"]="Courier-BoldOblique",e["Courier-Italic"]="Courier-Oblique",e.CourierNew="Courier",e["CourierNew-Bold"]="Courier-Bold",e["CourierNew-BoldItalic"]="Courier-BoldOblique",e["CourierNew-Italic"]="Courier-Oblique",e["CourierNewPS-BoldItalicMT"]="Courier-BoldOblique",e["CourierNewPS-BoldMT"]="Courier-Bold",e["CourierNewPS-ItalicMT"]="Courier-Oblique",e.CourierNewPSMT="Courier",e.Helvetica="Helvetica",e["Helvetica-Bold"]="Helvetica-Bold",e["Helvetica-BoldItalic"]="Helvetica-BoldOblique",e["Helvetica-BoldOblique"]="Helvetica-BoldOblique",e["Helvetica-Italic"]="Helvetica-Oblique",e["Helvetica-Oblique"]="Helvetica-Oblique",e["Symbol-Bold"]="Symbol",e["Symbol-BoldItalic"]="Symbol",e["Symbol-Italic"]="Symbol",e.TimesNewRoman="Times-Roman",e["TimesNewRoman-Bold"]="Times-Bold",e["TimesNewRoman-BoldItalic"]="Times-BoldItalic",e["TimesNewRoman-Italic"]="Times-Italic",e.TimesNewRomanPS="Times-Roman",e["TimesNewRomanPS-Bold"]="Times-Bold",e["TimesNewRomanPS-BoldItalic"]="Times-BoldItalic",e["TimesNewRomanPS-BoldItalicMT"]="Times-BoldItalic",e["TimesNewRomanPS-BoldMT"]="Times-Bold",e["TimesNewRomanPS-Italic"]="Times-Italic",e["TimesNewRomanPS-ItalicMT"]="Times-Italic",e.TimesNewRomanPSMT="Times-Roman",e["TimesNewRomanPSMT-Bold"]="Times-Bold",e["TimesNewRomanPSMT-BoldItalic"]="Times-BoldItalic",e["TimesNewRomanPSMT-Italic"]="Times-Italic"}),r=i(function(e){e.CenturyGothic="Helvetica",e["CenturyGothic-Bold"]="Helvetica-Bold",e["CenturyGothic-BoldItalic"]="Helvetica-BoldOblique",e["CenturyGothic-Italic"]="Helvetica-Oblique",e.ComicSansMS="Comic Sans MS",e["ComicSansMS-Bold"]="Comic Sans MS-Bold",e["ComicSansMS-BoldItalic"]="Comic Sans MS-BoldItalic",e["ComicSansMS-Italic"]="Comic Sans MS-Italic",e.LucidaConsole="Courier",e["LucidaConsole-Bold"]="Courier-Bold",e["LucidaConsole-BoldItalic"]="Courier-BoldOblique",e["LucidaConsole-Italic"]="Courier-Oblique",e["MS-Gothic"]="MS Gothic",e["MS-Gothic-Bold"]="MS Gothic-Bold",e["MS-Gothic-BoldItalic"]="MS Gothic-BoldItalic",e["MS-Gothic-Italic"]="MS Gothic-Italic",e["MS-Mincho"]="MS Mincho",e["MS-Mincho-Bold"]="MS Mincho-Bold",e["MS-Mincho-BoldItalic"]="MS Mincho-BoldItalic",e["MS-Mincho-Italic"]="MS Mincho-Italic",e["MS-PGothic"]="MS PGothic",e["MS-PGothic-Bold"]="MS PGothic-Bold",e["MS-PGothic-BoldItalic"]="MS PGothic-BoldItalic",e["MS-PGothic-Italic"]="MS PGothic-Italic",e["MS-PMincho"]="MS PMincho",e["MS-PMincho-Bold"]="MS PMincho-Bold",e["MS-PMincho-BoldItalic"]="MS PMincho-BoldItalic",e["MS-PMincho-Italic"]="MS PMincho-Italic",e.NuptialScript="Times-Italic",e.Wingdings="ZapfDingbats"}),n=i(function(e){e["Adobe Jenson"]=!0,e["Adobe Text"]=!0,e.Albertus=!0,e.Aldus=!0,e.Alexandria=!0,e.Algerian=!0,e["American Typewriter"]=!0,e.Antiqua=!0,e.Apex=!0,e.Arno=!0,e.Aster=!0,e.Aurora=!0,e.Baskerville=!0,e.Bell=!0,e.Bembo=!0,e["Bembo Schoolbook"]=!0,e.Benguiat=!0,e["Berkeley Old Style"]=!0,e["Bernhard Modern"]=!0,e["Berthold City"]=!0,e.Bodoni=!0,e["Bauer Bodoni"]=!0,e["Book Antiqua"]=!0,e.Bookman=!0,e["Bordeaux Roman"]=!0,e["Californian FB"]=!0,e.Calisto=!0,e.Calvert=!0,e.Capitals=!0,e.Cambria=!0,e.Cartier=!0,e.Caslon=!0,e.Catull=!0,e.Centaur=!0,e["Century Old Style"]=!0,e["Century Schoolbook"]=!0,e.Chaparral=!0,e["Charis SIL"]=!0,e.Cheltenham=!0,e["Cholla Slab"]=!0,e.Clarendon=!0,e.Clearface=!0,e.Cochin=!0,e.Colonna=!0,e["Computer Modern"]=!0,e["Concrete Roman"]=!0,e.Constantia=!0,e["Cooper Black"]=!0,e.Corona=!0,e.Ecotype=!0,e.Egyptienne=!0,e.Elephant=!0,e.Excelsior=!0,e.Fairfield=!0,e["FF Scala"]=!0,e.Folkard=!0,e.Footlight=!0,e.FreeSerif=!0,e["Friz Quadrata"]=!0,e.Garamond=!0,e.Gentium=!0,e.Georgia=!0,e.Gloucester=!0,e["Goudy Old Style"]=!0,e["Goudy Schoolbook"]=!0,e["Goudy Pro Font"]=!0,e.Granjon=!0,e["Guardian Egyptian"]=!0,e.Heather=!0,e.Hercules=!0,e["High Tower Text"]=!0,e.Hiroshige=!0,e["Hoefler Text"]=!0,e["Humana Serif"]=!0,e.Imprint=!0,e["Ionic No. 5"]=!0,e.Janson=!0,e.Joanna=!0,e.Korinna=!0,e.Lexicon=!0,e["Liberation Serif"]=!0,e["Linux Libertine"]=!0,e.Literaturnaya=!0,e.Lucida=!0,e["Lucida Bright"]=!0,e.Melior=!0,e.Memphis=!0,e.Miller=!0,e.Minion=!0,e.Modern=!0,e["Mona Lisa"]=!0,e["Mrs Eaves"]=!0,e["MS Serif"]=!0,e["Museo Slab"]=!0,e["New York"]=!0,e["Nimbus Roman"]=!0,e["NPS Rawlinson Roadway"]=!0,e.NuptialScript=!0,e.Palatino=!0,e.Perpetua=!0,e.Plantin=!0,e["Plantin Schoolbook"]=!0,e.Playbill=!0,e["Poor Richard"]=!0,e["Rawlinson Roadway"]=!0,e.Renault=!0,e.Requiem=!0,e.Rockwell=!0,e.Roman=!0,e["Rotis Serif"]=!0,e.Sabon=!0,e.Scala=!0,e.Seagull=!0,e.Sistina=!0,e.Souvenir=!0,e.STIX=!0,e["Stone Informal"]=!0,e["Stone Serif"]=!0,e.Sylfaen=!0,e.Times=!0,e.Trajan=!0,e["Trinité"]=!0,e["Trump Mediaeval"]=!0,e.Utopia=!0,e["Vale Type"]=!0,e["Bitstream Vera"]=!0,e["Vera Serif"]=!0,e.Versailles=!0,e.Wanted=!0,e.Weiss=!0,e["Wide Latin"]=!0,e.Windsor=!0,e.XITS=!0}),s=i(function(e){e.Dingbats=!0,e.Symbol=!0,e.ZapfDingbats=!0}),o=i(function(e){e[2]=10,e[3]=32,e[4]=33,e[5]=34,e[6]=35,e[7]=36,e[8]=37,e[9]=38,e[10]=39,e[11]=40,e[12]=41,e[13]=42,e[14]=43,e[15]=44,e[16]=45,e[17]=46,e[18]=47,e[19]=48,e[20]=49,e[21]=50,e[22]=51,e[23]=52,e[24]=53,e[25]=54,e[26]=55,e[27]=56,e[28]=57,e[29]=58,e[30]=894,e[31]=60,e[32]=61,e[33]=62,e[34]=63,e[35]=64,e[36]=65,e[37]=66,e[38]=67,e[39]=68,e[40]=69,e[41]=70,e[42]=71,e[43]=72,e[44]=73,e[45]=74,e[46]=75,e[47]=76,e[48]=77,e[49]=78,e[50]=79,e[51]=80,e[52]=81,e[53]=82,e[54]=83,e[55]=84,e[56]=85,e[57]=86,e[58]=87,e[59]=88,e[60]=89,e[61]=90,e[62]=91,e[63]=92,e[64]=93,e[65]=94,e[66]=95,e[67]=96,e[68]=97,e[69]=98,e[70]=99,e[71]=100,e[72]=101,e[73]=102,e[74]=103,e[75]=104,e[76]=105,e[77]=106,e[78]=107,e[79]=108,e[80]=109,e[81]=110,e[82]=111,e[83]=112,e[84]=113,e[85]=114,e[86]=115,e[87]=116,e[88]=117,e[89]=118,e[90]=119,e[91]=120,e[92]=121,e[93]=122,e[94]=123,e[95]=124,e[96]=125,e[97]=126,e[98]=196,e[99]=197,e[100]=199,e[101]=201,e[102]=209,e[103]=214,e[104]=220,e[105]=225,e[106]=224,e[107]=226,e[108]=228,e[109]=227,e[110]=229,e[111]=231,e[112]=233,e[113]=232,e[114]=234,e[115]=235,e[116]=237,e[117]=236,e[118]=238,e[119]=239,e[120]=241,e[121]=243,e[122]=242,e[123]=244,e[124]=246,e[125]=245,e[126]=250,e[127]=249,e[128]=251,e[129]=252,e[130]=8224,e[131]=176,e[132]=162,e[133]=163,e[134]=167,e[135]=8226,e[136]=182,e[137]=223,e[138]=174,e[139]=169,e[140]=8482,e[141]=180,e[142]=168,e[143]=8800,e[144]=198,e[145]=216,e[146]=8734,e[147]=177,e[148]=8804,e[149]=8805,e[150]=165,e[151]=181,e[152]=8706,e[153]=8721,e[154]=8719,e[156]=8747,e[157]=170,e[158]=186,e[159]=8486,e[160]=230,e[161]=248,e[162]=191,e[163]=161,e[164]=172,e[165]=8730,e[166]=402,e[167]=8776,e[168]=8710,e[169]=171,e[170]=187,e[171]=8230,e[210]=218,e[223]=711,e[224]=321,e[225]=322,e[227]=353,e[229]=382,e[234]=253,e[252]=263,e[253]=268,e[254]=269,e[258]=258,e[260]=260,e[261]=261,e[265]=280,e[266]=281,e[268]=283,e[269]=313,e[275]=323,e[276]=324,e[278]=328,e[284]=345,e[285]=346,e[286]=347,e[292]=367,e[295]=377,e[296]=378,e[298]=380,e[305]=963,e[306]=964,e[307]=966,e[308]=8215,e[309]=8252,e[310]=8319,e[311]=8359,e[312]=8592,e[313]=8593,e[337]=9552,e[493]=1039,e[494]=1040,e[705]=1524,e[706]=8362,e[710]=64288,e[711]=64298,e[759]=1617,e[761]=1776,e[763]=1778,e[775]=1652,e[777]=1764,e[778]=1780,e[779]=1781,e[780]=1782,e[782]=771,e[783]=64726,e[786]=8363,e[788]=8532,e[790]=768,e[791]=769,e[792]=768,e[795]=803,e[797]=64336,e[798]=64337,e[799]=64342,e[800]=64343,e[801]=64344,e[802]=64345,e[803]=64362,e[804]=64363,e[805]=64364,e[2424]=7821,e[2425]=7822,e[2426]=7823,e[2427]=7824,e[2428]=7825,e[2429]=7826,e[2430]=7827,e[2433]=7682,e[2678]=8045,e[2679]=8046,e[2830]=1552,e[2838]=686,e[2840]=751,e[2842]=753,e[2843]=754,e[2844]=755,e[2846]=757,e[2856]=767,e[2857]=848,e[2858]=849,e[2862]=853,e[2863]=854,e[2864]=855,e[2865]=861,e[2866]=862,e[2906]=7460,e[2908]=7462,e[2909]=7463,e[2910]=7464,e[2912]=7466,e[2913]=7467,e[2914]=7468,e[2916]=7470,e[2917]=7471,e[2918]=7472,e[2920]=7474,e[2921]=7475,e[2922]=7476,e[2924]=7478,e[2925]=7479,e[2926]=7480,e[2928]=7482,e[2929]=7483,e[2930]=7484,e[2932]=7486,e[2933]=7487,e[2934]=7488,e[2936]=7490,e[2937]=7491,e[2938]=7492,e[2940]=7494,e[2941]=7495,e[2942]=7496,e[2944]=7498,e[2946]=7500,e[2948]=7502,e[2950]=7504,e[2951]=7505,e[2952]=7506,e[2954]=7508,e[2955]=7509,e[2956]=7510,e[2958]=7512,e[2959]=7513,e[2960]=7514,e[2962]=7516,e[2963]=7517,e[2964]=7518,e[2966]=7520,e[2967]=7521,e[2968]=7522,e[2970]=7524,e[2971]=7525,e[2972]=7526,e[2974]=7528,e[2975]=7529,e[2976]=7530,e[2978]=1537,e[2979]=1538,e[2980]=1539,e[2982]=1549,e[2983]=1551,e[2984]=1552,e[2986]=1554,e[2987]=1555,e[2988]=1556,e[2990]=1623,e[2991]=1624,e[2995]=1775,e[2999]=1791,e[3002]=64290,e[3003]=64291,e[3004]=64292,e[3006]=64294,e[3007]=64295,e[3008]=64296,e[3011]=1900,e[3014]=8223,e[3015]=8244,e[3017]=7532,e[3018]=7533,e[3019]=7534,e[3075]=7590,e[3076]=7591,e[3079]=7594,e[3080]=7595,e[3083]=7598,e[3084]=7599,e[3087]=7602,e[3088]=7603,e[3091]=7606,e[3092]=7607,e[3095]=7610,e[3096]=7611,e[3099]=7614,e[3100]=7615,e[3103]=7618,e[3104]=7619,e[3107]=8337,e[3108]=8338,e[3116]=1884,e[3119]=1885,e[3120]=1885,e[3123]=1886,e[3124]=1886,e[3127]=1887,e[3128]=1887,e[3131]=1888,e[3132]=1888,e[3135]=1889,e[3136]=1889,e[3139]=1890,e[3140]=1890,e[3143]=1891,e[3144]=1891,e[3147]=1892,e[3148]=1892,e[3153]=580,e[3154]=581,e[3157]=584,e[3158]=585,e[3161]=588,e[3162]=589,e[3165]=891,e[3166]=892,e[3169]=1274,e[3170]=1275,e[3173]=1278,e[3174]=1279,e[3181]=7622,e[3182]=7623,e[3282]=11799,e[3316]=578,e[3379]=42785,e[3393]=1159,e[3416]=8377}),c=i(function(e){e[227]=322,e[264]=261,e[291]=346})
e.getStdFontMap=a,e.getNonStdFontMap=r,e.getSerifFonts=n,e.getSymbolsFonts=s,e.getGlyphMapForStandardFonts=o,e.getSupplementalGlyphMapForArialBlack=c}),function(e,t){t(e.pdfjsCoreUnicode={},e.pdfjsSharedUtil)}(this,function(e,t){function i(e){return e>=65520&&65535>=e?0:e>=62976&&63743>=e?c()[e]||e:e}function a(e,t){var i=t[e]
if(void 0!==i)return i
if(!e)return-1
if("u"===e[0]){var a,r=e.length
if(7===r&&"n"===e[1]&&"i"===e[2])a=e.substr(3)
else{if(!(r>=5&&7>=r))return-1
a=e.substr(1)}if(a===a.toUpperCase()&&(i=parseInt(a,16),i>=0))return i}return-1}function r(e){for(var t=0,i=l.length;i>t;t++){var a=l[t]
if(e>=a.begin&&e<a.end)return t}return-1}function n(e){var t=l[13]
return e>=t.begin&&e<t.end?!0:(t=l[11],e>=t.begin&&e<t.end?!0:!1)}function s(e){var t=e.length
if(1>=t||!n(e.charCodeAt(0)))return e
for(var i="",a=t-1;a>=0;a--)i+=e[a]
return i}var o=t.getLookupTableFactory,c=o(function(e){e[63721]=169,e[63193]=169,e[63720]=174,e[63194]=174,e[63722]=8482,e[63195]=8482,e[63729]=9127,e[63730]=9128,e[63731]=9129,e[63740]=9131,e[63741]=9132,e[63742]=9133,e[63726]=9121,e[63727]=9122,e[63728]=9123,e[63737]=9124,e[63738]=9125,e[63739]=9126,e[63723]=9115,e[63724]=9116,e[63725]=9117,e[63734]=9118,e[63735]=9119,e[63736]=9120}),l=[{begin:0,end:127},{begin:128,end:255},{begin:256,end:383},{begin:384,end:591},{begin:592,end:687},{begin:688,end:767},{begin:768,end:879},{begin:880,end:1023},{begin:11392,end:11519},{begin:1024,end:1279},{begin:1328,end:1423},{begin:1424,end:1535},{begin:42240,end:42559},{begin:1536,end:1791},{begin:1984,end:2047},{begin:2304,end:2431},{begin:2432,end:2559},{begin:2560,end:2687},{begin:2688,end:2815},{begin:2816,end:2943},{begin:2944,end:3071},{begin:3072,end:3199},{begin:3200,end:3327},{begin:3328,end:3455},{begin:3584,end:3711},{begin:3712,end:3839},{begin:4256,end:4351},{begin:6912,end:7039},{begin:4352,end:4607},{begin:7680,end:7935},{begin:7936,end:8191},{begin:8192,end:8303},{begin:8304,end:8351},{begin:8352,end:8399},{begin:8400,end:8447},{begin:8448,end:8527},{begin:8528,end:8591},{begin:8592,end:8703},{begin:8704,end:8959},{begin:8960,end:9215},{begin:9216,end:9279},{begin:9280,end:9311},{begin:9312,end:9471},{begin:9472,end:9599},{begin:9600,end:9631},{begin:9632,end:9727},{begin:9728,end:9983},{begin:9984,end:10175},{begin:12288,end:12351},{begin:12352,end:12447},{begin:12448,end:12543},{begin:12544,end:12591},{begin:12592,end:12687},{begin:43072,end:43135},{begin:12800,end:13055},{begin:13056,end:13311},{begin:44032,end:55215},{begin:55296,end:57343},{begin:67840,end:67871},{begin:19968,end:40959},{begin:57344,end:63743},{begin:12736,end:12783},{begin:64256,end:64335},{begin:64336,end:65023},{begin:65056,end:65071},{begin:65040,end:65055},{begin:65104,end:65135},{begin:65136,end:65279},{begin:65280,end:65519},{begin:65520,end:65535},{begin:3840,end:4095},{begin:1792,end:1871},{begin:1920,end:1983},{begin:3456,end:3583},{begin:4096,end:4255},{begin:4608,end:4991},{begin:5024,end:5119},{begin:5120,end:5759},{begin:5760,end:5791},{begin:5792,end:5887},{begin:6016,end:6143},{begin:6144,end:6319},{begin:10240,end:10495},{begin:40960,end:42127},{begin:5888,end:5919},{begin:66304,end:66351},{begin:66352,end:66383},{begin:66560,end:66639},{begin:118784,end:119039},{begin:119808,end:120831},{begin:1044480,end:1048573},{begin:65024,end:65039},{begin:917504,end:917631},{begin:6400,end:6479},{begin:6480,end:6527},{begin:6528,end:6623},{begin:6656,end:6687},{begin:11264,end:11359},{begin:11568,end:11647},{begin:19904,end:19967},{begin:43008,end:43055},{begin:65536,end:65663},{begin:65856,end:65935},{begin:66432,end:66463},{begin:66464,end:66527},{begin:66640,end:66687},{begin:66688,end:66735},{begin:67584,end:67647},{begin:68096,end:68191},{begin:119552,end:119647},{begin:73728,end:74751},{begin:119648,end:119679},{begin:7040,end:7103},{begin:7168,end:7247},{begin:7248,end:7295},{begin:43136,end:43231},{begin:43264,end:43311},{begin:43312,end:43359},{begin:43520,end:43615},{begin:65936,end:65999},{begin:66e3,end:66047},{begin:66208,end:66271},{begin:127024,end:127135}],h=o(function(e){e["¨"]=" ̈",e["¯"]=" ̄",e["´"]=" ́",e["µ"]="μ",e["¸"]=" ̧",e["Ĳ"]="IJ",e["ĳ"]="ij",e["Ŀ"]="L·",e["ŀ"]="l·",e["ŉ"]="ʼn",e["ſ"]="s",e["Ǆ"]="DŽ",e["ǅ"]="Dž",e["ǆ"]="dž",e["Ǉ"]="LJ",e["ǈ"]="Lj",e["ǉ"]="lj",e["Ǌ"]="NJ",e["ǋ"]="Nj",e["ǌ"]="nj",e["Ǳ"]="DZ",e["ǲ"]="Dz",e["ǳ"]="dz",e["˘"]=" ̆",e["˙"]=" ̇",e["˚"]=" ̊",e["˛"]=" ̨",e["˜"]=" ̃",e["˝"]=" ̋",e["ͺ"]=" ͅ",e["΄"]=" ́",e["ϐ"]="β",e["ϑ"]="θ",e["ϒ"]="Υ",e["ϕ"]="φ",e["ϖ"]="π",e["ϰ"]="κ",e["ϱ"]="ρ",e["ϲ"]="ς",e["ϴ"]="Θ",e["ϵ"]="ε",e["Ϲ"]="Σ",e["և"]="եւ",e["ٵ"]="اٴ",e["ٶ"]="وٴ",e["ٷ"]="ۇٴ",e["ٸ"]="يٴ",e["ำ"]="ํา",e["ຳ"]="ໍາ",e["ໜ"]="ຫນ",e["ໝ"]="ຫມ",e["ཷ"]="ྲཱྀ",e["ཹ"]="ླཱྀ",e["ẚ"]="aʾ",e["᾽"]=" ̓",e["᾿"]=" ̓",e["῀"]=" ͂",e["῾"]=" ̔",e[" "]=" ",e[" "]=" ",e[" "]=" ",e[" "]=" ",e[" "]=" ",e[" "]=" ",e[" "]=" ",e[" "]=" ",e["‗"]=" ̳",e["․"]=".",e["‥"]="..",e["…"]="...",e["″"]="′′",e["‴"]="′′′",e["‶"]="‵‵",e["‷"]="‵‵‵",e["‼"]="!!",e["‾"]=" ̅",e["⁇"]="??",e["⁈"]="?!",e["⁉"]="!?",e["⁗"]="′′′′",e[" "]=" ",e["₨"]="Rs",e["℀"]="a/c",e["℁"]="a/s",e["℃"]="°C",e["℅"]="c/o",e["℆"]="c/u",e["ℇ"]="Ɛ",e["℉"]="°F",e["№"]="No",e["℡"]="TEL",e["ℵ"]="א",e["ℶ"]="ב",e["ℷ"]="ג",e["ℸ"]="ד",e["℻"]="FAX",e["Ⅰ"]="I",e["Ⅱ"]="II",e["Ⅲ"]="III",e["Ⅳ"]="IV",e["Ⅴ"]="V",e["Ⅵ"]="VI",e["Ⅶ"]="VII",e["Ⅷ"]="VIII",e["Ⅸ"]="IX",e["Ⅹ"]="X",e["Ⅺ"]="XI",e["Ⅻ"]="XII",e["Ⅼ"]="L",e["Ⅽ"]="C",e["Ⅾ"]="D",e["Ⅿ"]="M",e["ⅰ"]="i",e["ⅱ"]="ii",e["ⅲ"]="iii",e["ⅳ"]="iv",e["ⅴ"]="v",e["ⅵ"]="vi",e["ⅶ"]="vii",e["ⅷ"]="viii",e["ⅸ"]="ix",e["ⅹ"]="x",e["ⅺ"]="xi",e["ⅻ"]="xii",e["ⅼ"]="l",e["ⅽ"]="c",e["ⅾ"]="d",e["ⅿ"]="m",e["∬"]="∫∫",e["∭"]="∫∫∫",e["∯"]="∮∮",e["∰"]="∮∮∮",e["⑴"]="(1)",e["⑵"]="(2)",e["⑶"]="(3)",e["⑷"]="(4)",e["⑸"]="(5)",e["⑹"]="(6)",e["⑺"]="(7)",e["⑻"]="(8)",e["⑼"]="(9)",e["⑽"]="(10)",e["⑾"]="(11)",e["⑿"]="(12)",e["⒀"]="(13)",e["⒁"]="(14)",e["⒂"]="(15)",e["⒃"]="(16)",e["⒄"]="(17)",e["⒅"]="(18)",e["⒆"]="(19)",e["⒇"]="(20)",e["⒈"]="1.",e["⒉"]="2.",e["⒊"]="3.",e["⒋"]="4.",e["⒌"]="5.",e["⒍"]="6.",e["⒎"]="7.",e["⒏"]="8.",e["⒐"]="9.",e["⒑"]="10.",e["⒒"]="11.",e["⒓"]="12.",e["⒔"]="13.",e["⒕"]="14.",e["⒖"]="15.",e["⒗"]="16.",e["⒘"]="17.",e["⒙"]="18.",e["⒚"]="19.",e["⒛"]="20.",e["⒜"]="(a)",e["⒝"]="(b)",e["⒞"]="(c)",e["⒟"]="(d)",e["⒠"]="(e)",e["⒡"]="(f)",e["⒢"]="(g)",e["⒣"]="(h)",e["⒤"]="(i)",e["⒥"]="(j)",e["⒦"]="(k)",e["⒧"]="(l)",e["⒨"]="(m)",e["⒩"]="(n)",e["⒪"]="(o)",e["⒫"]="(p)",e["⒬"]="(q)",e["⒭"]="(r)",e["⒮"]="(s)",e["⒯"]="(t)",e["⒰"]="(u)",e["⒱"]="(v)",e["⒲"]="(w)",e["⒳"]="(x)",e["⒴"]="(y)",e["⒵"]="(z)",e["⨌"]="∫∫∫∫",e["⩴"]="::=",e["⩵"]="==",e["⩶"]="===",e["⺟"]="母",e["⻳"]="龟",e["⼀"]="一",e["⼁"]="丨",e["⼂"]="丶",e["⼃"]="丿",e["⼄"]="乙",e["⼅"]="亅",e["⼆"]="二",e["⼇"]="亠",e["⼈"]="人",e["⼉"]="儿",e["⼊"]="入",e["⼋"]="八",e["⼌"]="冂",e["⼍"]="冖",e["⼎"]="冫",e["⼏"]="几",e["⼐"]="凵",e["⼑"]="刀",e["⼒"]="力",e["⼓"]="勹",e["⼔"]="匕",e["⼕"]="匚",e["⼖"]="匸",e["⼗"]="十",e["⼘"]="卜",e["⼙"]="卩",e["⼚"]="厂",e["⼛"]="厶",e["⼜"]="又",e["⼝"]="口",e["⼞"]="囗",e["⼟"]="土",e["⼠"]="士",e["⼡"]="夂",e["⼢"]="夊",e["⼣"]="夕",e["⼤"]="大",e["⼥"]="女",e["⼦"]="子",e["⼧"]="宀",e["⼨"]="寸",e["⼩"]="小",e["⼪"]="尢",e["⼫"]="尸",e["⼬"]="屮",e["⼭"]="山",e["⼮"]="巛",e["⼯"]="工",e["⼰"]="己",e["⼱"]="巾",e["⼲"]="干",e["⼳"]="幺",e["⼴"]="广",e["⼵"]="廴",e["⼶"]="廾",e["⼷"]="弋",e["⼸"]="弓",e["⼹"]="彐",e["⼺"]="彡",e["⼻"]="彳",e["⼼"]="心",e["⼽"]="戈",e["⼾"]="戶",e["⼿"]="手",e["⽀"]="支",e["⽁"]="攴",e["⽂"]="文",e["⽃"]="斗",e["⽄"]="斤",e["⽅"]="方",e["⽆"]="无",e["⽇"]="日",e["⽈"]="曰",e["⽉"]="月",e["⽊"]="木",e["⽋"]="欠",e["⽌"]="止",e["⽍"]="歹",e["⽎"]="殳",e["⽏"]="毋",e["⽐"]="比",e["⽑"]="毛",e["⽒"]="氏",e["⽓"]="气",e["⽔"]="水",e["⽕"]="火",e["⽖"]="爪",e["⽗"]="父",e["⽘"]="爻",e["⽙"]="爿",e["⽚"]="片",e["⽛"]="牙",e["⽜"]="牛",e["⽝"]="犬",e["⽞"]="玄",e["⽟"]="玉",e["⽠"]="瓜",e["⽡"]="瓦",e["⽢"]="甘",e["⽣"]="生",e["⽤"]="用",e["⽥"]="田",e["⽦"]="疋",e["⽧"]="疒",e["⽨"]="癶",e["⽩"]="白",e["⽪"]="皮",e["⽫"]="皿",e["⽬"]="目",e["⽭"]="矛",e["⽮"]="矢",e["⽯"]="石",e["⽰"]="示",e["⽱"]="禸",e["⽲"]="禾",e["⽳"]="穴",e["⽴"]="立",e["⽵"]="竹",e["⽶"]="米",e["⽷"]="糸",e["⽸"]="缶",e["⽹"]="网",e["⽺"]="羊",e["⽻"]="羽",e["⽼"]="老",e["⽽"]="而",e["⽾"]="耒",e["⽿"]="耳",e["⾀"]="聿",e["⾁"]="肉",e["⾂"]="臣",e["⾃"]="自",e["⾄"]="至",e["⾅"]="臼",e["⾆"]="舌",e["⾇"]="舛",e["⾈"]="舟",e["⾉"]="艮",e["⾊"]="色",e["⾋"]="艸",e["⾌"]="虍",e["⾍"]="虫",e["⾎"]="血",e["⾏"]="行",e["⾐"]="衣",e["⾑"]="襾",e["⾒"]="見",e["⾓"]="角",e["⾔"]="言",e["⾕"]="谷",e["⾖"]="豆",e["⾗"]="豕",e["⾘"]="豸",e["⾙"]="貝",e["⾚"]="赤",e["⾛"]="走",e["⾜"]="足",e["⾝"]="身",e["⾞"]="車",e["⾟"]="辛",e["⾠"]="辰",e["⾡"]="辵",e["⾢"]="邑",e["⾣"]="酉",e["⾤"]="釆",e["⾥"]="里",e["⾦"]="金",e["⾧"]="長",e["⾨"]="門",e["⾩"]="阜",e["⾪"]="隶",e["⾫"]="隹",e["⾬"]="雨",e["⾭"]="靑",e["⾮"]="非",e["⾯"]="面",e["⾰"]="革",e["⾱"]="韋",e["⾲"]="韭",e["⾳"]="音",e["⾴"]="頁",e["⾵"]="風",e["⾶"]="飛",e["⾷"]="食",e["⾸"]="首",e["⾹"]="香",e["⾺"]="馬",e["⾻"]="骨",e["⾼"]="高",e["⾽"]="髟",e["⾾"]="鬥",e["⾿"]="鬯",e["⿀"]="鬲",e["⿁"]="鬼",e["⿂"]="魚",e["⿃"]="鳥",e["⿄"]="鹵",e["⿅"]="鹿",e["⿆"]="麥",e["⿇"]="麻",e["⿈"]="黃",e["⿉"]="黍",e["⿊"]="黑",e["⿋"]="黹",e["⿌"]="黽",e["⿍"]="鼎",e["⿎"]="鼓",e["⿏"]="鼠",e["⿐"]="鼻",e["⿑"]="齊",e["⿒"]="齒",e["⿓"]="龍",e["⿔"]="龜",e["⿕"]="龠",e["〶"]="〒",e["〸"]="十",e["〹"]="卄",e["〺"]="卅",e["゛"]=" ゙",e["゜"]=" ゚",e["ㄱ"]="ᄀ",e["ㄲ"]="ᄁ",e["ㄳ"]="ᆪ",e["ㄴ"]="ᄂ",e["ㄵ"]="ᆬ",e["ㄶ"]="ᆭ",e["ㄷ"]="ᄃ",e["ㄸ"]="ᄄ",e["ㄹ"]="ᄅ",e["ㄺ"]="ᆰ",e["ㄻ"]="ᆱ",e["ㄼ"]="ᆲ",e["ㄽ"]="ᆳ",e["ㄾ"]="ᆴ",e["ㄿ"]="ᆵ",e["ㅀ"]="ᄚ",e["ㅁ"]="ᄆ",e["ㅂ"]="ᄇ",e["ㅃ"]="ᄈ",e["ㅄ"]="ᄡ",e["ㅅ"]="ᄉ",e["ㅆ"]="ᄊ",e["ㅇ"]="ᄋ",e["ㅈ"]="ᄌ",e["ㅉ"]="ᄍ",e["ㅊ"]="ᄎ",e["ㅋ"]="ᄏ",e["ㅌ"]="ᄐ",e["ㅍ"]="ᄑ",e["ㅎ"]="ᄒ",e["ㅏ"]="ᅡ",e["ㅐ"]="ᅢ",e["ㅑ"]="ᅣ",e["ㅒ"]="ᅤ",e["ㅓ"]="ᅥ",e["ㅔ"]="ᅦ",e["ㅕ"]="ᅧ",e["ㅖ"]="ᅨ",e["ㅗ"]="ᅩ",e["ㅘ"]="ᅪ",e["ㅙ"]="ᅫ",e["ㅚ"]="ᅬ",e["ㅛ"]="ᅭ",e["ㅜ"]="ᅮ",e["ㅝ"]="ᅯ",e["ㅞ"]="ᅰ",e["ㅟ"]="ᅱ",e["ㅠ"]="ᅲ",e["ㅡ"]="ᅳ",e["ㅢ"]="ᅴ",e["ㅣ"]="ᅵ",e["ㅤ"]="ᅠ",e["ㅥ"]="ᄔ",e["ㅦ"]="ᄕ",e["ㅧ"]="ᇇ",e["ㅨ"]="ᇈ",e["ㅩ"]="ᇌ",e["ㅪ"]="ᇎ",e["ㅫ"]="ᇓ",e["ㅬ"]="ᇗ",e["ㅭ"]="ᇙ",e["ㅮ"]="ᄜ",e["ㅯ"]="ᇝ",e["ㅰ"]="ᇟ",e["ㅱ"]="ᄝ",e["ㅲ"]="ᄞ",e["ㅳ"]="ᄠ",e["ㅴ"]="ᄢ",e["ㅵ"]="ᄣ",e["ㅶ"]="ᄧ",e["ㅷ"]="ᄩ",e["ㅸ"]="ᄫ",e["ㅹ"]="ᄬ",e["ㅺ"]="ᄭ",e["ㅻ"]="ᄮ",e["ㅼ"]="ᄯ",e["ㅽ"]="ᄲ",e["ㅾ"]="ᄶ",e["ㅿ"]="ᅀ",e["ㆀ"]="ᅇ",e["ㆁ"]="ᅌ",e["ㆂ"]="ᇱ",e["ㆃ"]="ᇲ",e["ㆄ"]="ᅗ",e["ㆅ"]="ᅘ",e["ㆆ"]="ᅙ",e["ㆇ"]="ᆄ",e["ㆈ"]="ᆅ",e["ㆉ"]="ᆈ",e["ㆊ"]="ᆑ",e["ㆋ"]="ᆒ",e["ㆌ"]="ᆔ",e["ㆍ"]="ᆞ",e["ㆎ"]="ᆡ",e["㈀"]="(ᄀ)",e["㈁"]="(ᄂ)",e["㈂"]="(ᄃ)",e["㈃"]="(ᄅ)",e["㈄"]="(ᄆ)",e["㈅"]="(ᄇ)",e["㈆"]="(ᄉ)",e["㈇"]="(ᄋ)",e["㈈"]="(ᄌ)",e["㈉"]="(ᄎ)",e["㈊"]="(ᄏ)",e["㈋"]="(ᄐ)",e["㈌"]="(ᄑ)",e["㈍"]="(ᄒ)",e["㈎"]="(가)",e["㈏"]="(나)",e["㈐"]="(다)",e["㈑"]="(라)",e["㈒"]="(마)",e["㈓"]="(바)",e["㈔"]="(사)",e["㈕"]="(아)",e["㈖"]="(자)",e["㈗"]="(차)",e["㈘"]="(카)",e["㈙"]="(타)",e["㈚"]="(파)",e["㈛"]="(하)",e["㈜"]="(주)",e["㈝"]="(오전)",e["㈞"]="(오후)",e["㈠"]="(一)",e["㈡"]="(二)",e["㈢"]="(三)",e["㈣"]="(四)",e["㈤"]="(五)",e["㈥"]="(六)",e["㈦"]="(七)",e["㈧"]="(八)",e["㈨"]="(九)",e["㈩"]="(十)",e["㈪"]="(月)",e["㈫"]="(火)",e["㈬"]="(水)",e["㈭"]="(木)",e["㈮"]="(金)",e["㈯"]="(土)",e["㈰"]="(日)",e["㈱"]="(株)",e["㈲"]="(有)",e["㈳"]="(社)",e["㈴"]="(名)",e["㈵"]="(特)",e["㈶"]="(財)",e["㈷"]="(祝)",e["㈸"]="(労)",e["㈹"]="(代)",e["㈺"]="(呼)",e["㈻"]="(学)",e["㈼"]="(監)",e["㈽"]="(企)",e["㈾"]="(資)",e["㈿"]="(協)",e["㉀"]="(祭)",e["㉁"]="(休)",e["㉂"]="(自)",e["㉃"]="(至)",e["㋀"]="1月",e["㋁"]="2月",e["㋂"]="3月",e["㋃"]="4月",e["㋄"]="5月",e["㋅"]="6月",e["㋆"]="7月",e["㋇"]="8月",e["㋈"]="9月",e["㋉"]="10月",e["㋊"]="11月",e["㋋"]="12月",e["㍘"]="0点",e["㍙"]="1点",e["㍚"]="2点",e["㍛"]="3点",e["㍜"]="4点",e["㍝"]="5点",e["㍞"]="6点",e["㍟"]="7点",e["㍠"]="8点",e["㍡"]="9点",e["㍢"]="10点",e["㍣"]="11点",e["㍤"]="12点",e["㍥"]="13点",e["㍦"]="14点",e["㍧"]="15点",e["㍨"]="16点",e["㍩"]="17点",e["㍪"]="18点",e["㍫"]="19点",e["㍬"]="20点",e["㍭"]="21点",e["㍮"]="22点",e["㍯"]="23点",e["㍰"]="24点",e["㏠"]="1日",e["㏡"]="2日",e["㏢"]="3日",e["㏣"]="4日",e["㏤"]="5日",e["㏥"]="6日",e["㏦"]="7日",e["㏧"]="8日",e["㏨"]="9日",e["㏩"]="10日",e["㏪"]="11日",e["㏫"]="12日",e["㏬"]="13日",e["㏭"]="14日",e["㏮"]="15日",e["㏯"]="16日",e["㏰"]="17日",e["㏱"]="18日",e["㏲"]="19日",e["㏳"]="20日",e["㏴"]="21日",e["㏵"]="22日",e["㏶"]="23日",e["㏷"]="24日",e["㏸"]="25日",e["㏹"]="26日",e["㏺"]="27日",e["㏻"]="28日",e["㏼"]="29日",e["㏽"]="30日",e["㏾"]="31日",e["ﬀ"]="ff",e["ﬁ"]="fi",e["ﬂ"]="fl",e["ﬃ"]="ffi",e["ﬄ"]="ffl",e["ﬅ"]="ſt",e["ﬆ"]="st",e["ﬓ"]="մն",e["ﬔ"]="մե",e["ﬕ"]="մի",e["ﬖ"]="վն",e["ﬗ"]="մխ",e["ﭏ"]="אל",e["ﭐ"]="ٱ",e["ﭑ"]="ٱ",e["ﭒ"]="ٻ",e["ﭓ"]="ٻ",e["ﭔ"]="ٻ",e["ﭕ"]="ٻ",e["ﭖ"]="پ",e["ﭗ"]="پ",e["ﭘ"]="پ",e["ﭙ"]="پ",e["ﭚ"]="ڀ",e["ﭛ"]="ڀ",e["ﭜ"]="ڀ",e["ﭝ"]="ڀ",e["ﭞ"]="ٺ",e["ﭟ"]="ٺ",e["ﭠ"]="ٺ",e["ﭡ"]="ٺ",e["ﭢ"]="ٿ",e["ﭣ"]="ٿ",e["ﭤ"]="ٿ",e["ﭥ"]="ٿ",e["ﭦ"]="ٹ",e["ﭧ"]="ٹ",e["ﭨ"]="ٹ",e["ﭩ"]="ٹ",e["ﭪ"]="ڤ",e["ﭫ"]="ڤ",e["ﭬ"]="ڤ",e["ﭭ"]="ڤ",e["ﭮ"]="ڦ",e["ﭯ"]="ڦ",e["ﭰ"]="ڦ",e["ﭱ"]="ڦ",e["ﭲ"]="ڄ",e["ﭳ"]="ڄ",e["ﭴ"]="ڄ",e["ﭵ"]="ڄ",e["ﭶ"]="ڃ",e["ﭷ"]="ڃ",e["ﭸ"]="ڃ",e["ﭹ"]="ڃ",e["ﭺ"]="چ",e["ﭻ"]="چ",e["ﭼ"]="چ",e["ﭽ"]="چ",e["ﭾ"]="ڇ",e["ﭿ"]="ڇ",e["ﮀ"]="ڇ",e["ﮁ"]="ڇ",e["ﮂ"]="ڍ",e["ﮃ"]="ڍ",e["ﮄ"]="ڌ",e["ﮅ"]="ڌ",e["ﮆ"]="ڎ",e["ﮇ"]="ڎ",e["ﮈ"]="ڈ",e["ﮉ"]="ڈ",e["ﮊ"]="ژ",e["ﮋ"]="ژ",e["ﮌ"]="ڑ",e["ﮍ"]="ڑ",e["ﮎ"]="ک",e["ﮏ"]="ک",e["ﮐ"]="ک",e["ﮑ"]="ک",e["ﮒ"]="گ",e["ﮓ"]="گ",e["ﮔ"]="گ",e["ﮕ"]="گ",e["ﮖ"]="ڳ",e["ﮗ"]="ڳ",e["ﮘ"]="ڳ",e["ﮙ"]="ڳ",e["ﮚ"]="ڱ",e["ﮛ"]="ڱ",e["ﮜ"]="ڱ",e["ﮝ"]="ڱ",e["ﮞ"]="ں",e["ﮟ"]="ں",e["ﮠ"]="ڻ",e["ﮡ"]="ڻ",e["ﮢ"]="ڻ",e["ﮣ"]="ڻ",e["ﮤ"]="ۀ",e["ﮥ"]="ۀ",e["ﮦ"]="ہ",e["ﮧ"]="ہ",e["ﮨ"]="ہ",e["ﮩ"]="ہ",e["ﮪ"]="ھ",e["ﮫ"]="ھ",e["ﮬ"]="ھ",e["ﮭ"]="ھ",e["ﮮ"]="ے",e["ﮯ"]="ے",e["ﮰ"]="ۓ",e["ﮱ"]="ۓ",e["ﯓ"]="ڭ",e["ﯔ"]="ڭ",e["ﯕ"]="ڭ",e["ﯖ"]="ڭ",e["ﯗ"]="ۇ",e["ﯘ"]="ۇ",e["ﯙ"]="ۆ",e["ﯚ"]="ۆ",e["ﯛ"]="ۈ",e["ﯜ"]="ۈ",e["ﯝ"]="ٷ",e["ﯞ"]="ۋ",e["ﯟ"]="ۋ",e["ﯠ"]="ۅ",e["ﯡ"]="ۅ",e["ﯢ"]="ۉ",e["ﯣ"]="ۉ",e["ﯤ"]="ې",e["ﯥ"]="ې",e["ﯦ"]="ې",e["ﯧ"]="ې",e["ﯨ"]="ى",e["ﯩ"]="ى",e["ﯪ"]="ئا",e["ﯫ"]="ئا",e["ﯬ"]="ئە",e["ﯭ"]="ئە",e["ﯮ"]="ئو",e["ﯯ"]="ئو",e["ﯰ"]="ئۇ",e["ﯱ"]="ئۇ",e["ﯲ"]="ئۆ",e["ﯳ"]="ئۆ",e["ﯴ"]="ئۈ",e["ﯵ"]="ئۈ",e["ﯶ"]="ئې",e["ﯷ"]="ئې",e["ﯸ"]="ئې",e["ﯹ"]="ئى",e["ﯺ"]="ئى",e["ﯻ"]="ئى",e["ﯼ"]="ی",e["ﯽ"]="ی",e["ﯾ"]="ی",e["ﯿ"]="ی",e["ﰀ"]="ئج",e["ﰁ"]="ئح",e["ﰂ"]="ئم",e["ﰃ"]="ئى",e["ﰄ"]="ئي",e["ﰅ"]="بج",e["ﰆ"]="بح",e["ﰇ"]="بخ",e["ﰈ"]="بم",e["ﰉ"]="بى",e["ﰊ"]="بي",e["ﰋ"]="تج",e["ﰌ"]="تح",e["ﰍ"]="تخ",e["ﰎ"]="تم",e["ﰏ"]="تى",e["ﰐ"]="تي",e["ﰑ"]="ثج",e["ﰒ"]="ثم",e["ﰓ"]="ثى",e["ﰔ"]="ثي",e["ﰕ"]="جح",e["ﰖ"]="جم",e["ﰗ"]="حج",e["ﰘ"]="حم",e["ﰙ"]="خج",e["ﰚ"]="خح",e["ﰛ"]="خم",e["ﰜ"]="سج",e["ﰝ"]="سح",e["ﰞ"]="سخ",e["ﰟ"]="سم",e["ﰠ"]="صح",e["ﰡ"]="صم",e["ﰢ"]="ضج",e["ﰣ"]="ضح",e["ﰤ"]="ضخ",e["ﰥ"]="ضم",e["ﰦ"]="طح",e["ﰧ"]="طم",e["ﰨ"]="ظم",e["ﰩ"]="عج",e["ﰪ"]="عم",e["ﰫ"]="غج",e["ﰬ"]="غم",e["ﰭ"]="فج",e["ﰮ"]="فح",e["ﰯ"]="فخ",e["ﰰ"]="فم",e["ﰱ"]="فى",e["ﰲ"]="في",e["ﰳ"]="قح",e["ﰴ"]="قم",e["ﰵ"]="قى",e["ﰶ"]="قي",e["ﰷ"]="كا",e["ﰸ"]="كج",e["ﰹ"]="كح",e["ﰺ"]="كخ",e["ﰻ"]="كل",e["ﰼ"]="كم",e["ﰽ"]="كى",e["ﰾ"]="كي",e["ﰿ"]="لج",e["ﱀ"]="لح",e["ﱁ"]="لخ",e["ﱂ"]="لم",e["ﱃ"]="لى",e["ﱄ"]="لي",e["ﱅ"]="مج",e["ﱆ"]="مح",e["ﱇ"]="مخ",e["ﱈ"]="مم",e["ﱉ"]="مى",e["ﱊ"]="مي",e["ﱋ"]="نج",e["ﱌ"]="نح",e["ﱍ"]="نخ",e["ﱎ"]="نم",e["ﱏ"]="نى",e["ﱐ"]="ني",e["ﱑ"]="هج",e["ﱒ"]="هم",e["ﱓ"]="هى",e["ﱔ"]="هي",e["ﱕ"]="يج",e["ﱖ"]="يح",e["ﱗ"]="يخ",e["ﱘ"]="يم",e["ﱙ"]="يى",e["ﱚ"]="يي",e["ﱛ"]="ذٰ",e["ﱜ"]="رٰ",e["ﱝ"]="ىٰ",e["ﱞ"]=" ٌّ",e["ﱟ"]=" ٍّ",e["ﱠ"]=" َّ",e["ﱡ"]=" ُّ",e["ﱢ"]=" ِّ",e["ﱣ"]=" ّٰ",e["ﱤ"]="ئر",e["ﱥ"]="ئز",e["ﱦ"]="ئم",e["ﱧ"]="ئن",e["ﱨ"]="ئى",e["ﱩ"]="ئي",e["ﱪ"]="بر",e["ﱫ"]="بز",e["ﱬ"]="بم",e["ﱭ"]="بن",e["ﱮ"]="بى",e["ﱯ"]="بي",e["ﱰ"]="تر",e["ﱱ"]="تز",e["ﱲ"]="تم",e["ﱳ"]="تن",e["ﱴ"]="تى",e["ﱵ"]="تي",e["ﱶ"]="ثر",e["ﱷ"]="ثز",e["ﱸ"]="ثم",e["ﱹ"]="ثن",e["ﱺ"]="ثى",e["ﱻ"]="ثي",e["ﱼ"]="فى",e["ﱽ"]="في",e["ﱾ"]="قى",e["ﱿ"]="قي",e["ﲀ"]="كا",e["ﲁ"]="كل",e["ﲂ"]="كم",e["ﲃ"]="كى",e["ﲄ"]="كي",e["ﲅ"]="لم",e["ﲆ"]="لى",e["ﲇ"]="لي",e["ﲈ"]="ما",e["ﲉ"]="مم",e["ﲊ"]="نر",e["ﲋ"]="نز",e["ﲌ"]="نم",e["ﲍ"]="نن",e["ﲎ"]="نى",e["ﲏ"]="ني",e["ﲐ"]="ىٰ",e["ﲑ"]="ير",e["ﲒ"]="يز",e["ﲓ"]="يم",e["ﲔ"]="ين",e["ﲕ"]="يى",e["ﲖ"]="يي",e["ﲗ"]="ئج",e["ﲘ"]="ئح",e["ﲙ"]="ئخ",e["ﲚ"]="ئم",e["ﲛ"]="ئه",e["ﲜ"]="بج",e["ﲝ"]="بح",e["ﲞ"]="بخ",e["ﲟ"]="بم",e["ﲠ"]="به",e["ﲡ"]="تج",e["ﲢ"]="تح",e["ﲣ"]="تخ",e["ﲤ"]="تم",e["ﲥ"]="ته",e["ﲦ"]="ثم",e["ﲧ"]="جح",e["ﲨ"]="جم",e["ﲩ"]="حج",e["ﲪ"]="حم",e["ﲫ"]="خج",e["ﲬ"]="خم",e["ﲭ"]="سج",e["ﲮ"]="سح",e["ﲯ"]="سخ",e["ﲰ"]="سم",e["ﲱ"]="صح",e["ﲲ"]="صخ",e["ﲳ"]="صم",e["ﲴ"]="ضج",e["ﲵ"]="ضح",e["ﲶ"]="ضخ",e["ﲷ"]="ضم",e["ﲸ"]="طح",e["ﲹ"]="ظم",e["ﲺ"]="عج",e["ﲻ"]="عم",e["ﲼ"]="غج",e["ﲽ"]="غم",e["ﲾ"]="فج",e["ﲿ"]="فح",e["ﳀ"]="فخ",e["ﳁ"]="فم",e["ﳂ"]="قح",e["ﳃ"]="قم",e["ﳄ"]="كج",e["ﳅ"]="كح",e["ﳆ"]="كخ",e["ﳇ"]="كل",e["ﳈ"]="كم",e["ﳉ"]="لج",e["ﳊ"]="لح",e["ﳋ"]="لخ",e["ﳌ"]="لم",e["ﳍ"]="له",e["ﳎ"]="مج",e["ﳏ"]="مح",e["ﳐ"]="مخ",e["ﳑ"]="مم",e["ﳒ"]="نج",e["ﳓ"]="نح",e["ﳔ"]="نخ",e["ﳕ"]="نم",e["ﳖ"]="نه",e["ﳗ"]="هج",e["ﳘ"]="هم",e["ﳙ"]="هٰ",e["ﳚ"]="يج",e["ﳛ"]="يح",e["ﳜ"]="يخ",e["ﳝ"]="يم",e["ﳞ"]="يه",e["ﳟ"]="ئم",e["ﳠ"]="ئه",e["ﳡ"]="بم",e["ﳢ"]="به",e["ﳣ"]="تم",e["ﳤ"]="ته",e["ﳥ"]="ثم",e["ﳦ"]="ثه",e["ﳧ"]="سم",e["ﳨ"]="سه",e["ﳩ"]="شم",e["ﳪ"]="شه",e["ﳫ"]="كل",e["ﳬ"]="كم",e["ﳭ"]="لم",e["ﳮ"]="نم",e["ﳯ"]="نه",e["ﳰ"]="يم",e["ﳱ"]="يه",e["ﳲ"]="ـَّ",e["ﳳ"]="ـُّ",e["ﳴ"]="ـِّ",e["ﳵ"]="طى",e["ﳶ"]="طي",e["ﳷ"]="عى",e["ﳸ"]="عي",e["ﳹ"]="غى",e["ﳺ"]="غي",e["ﳻ"]="سى",e["ﳼ"]="سي",e["ﳽ"]="شى",e["ﳾ"]="شي",e["ﳿ"]="حى",e["ﴀ"]="حي",e["ﴁ"]="جى",e["ﴂ"]="جي",e["ﴃ"]="خى",e["ﴄ"]="خي",e["ﴅ"]="صى",e["ﴆ"]="صي",e["ﴇ"]="ضى",e["ﴈ"]="ضي",e["ﴉ"]="شج",e["ﴊ"]="شح",e["ﴋ"]="شخ",e["ﴌ"]="شم",e["ﴍ"]="شر",e["ﴎ"]="سر",e["ﴏ"]="صر",e["ﴐ"]="ضر",e["ﴑ"]="طى",e["ﴒ"]="طي",e["ﴓ"]="عى",e["ﴔ"]="عي",e["ﴕ"]="غى",e["ﴖ"]="غي",e["ﴗ"]="سى",e["ﴘ"]="سي",e["ﴙ"]="شى",e["ﴚ"]="شي",e["ﴛ"]="حى",e["ﴜ"]="حي",e["ﴝ"]="جى",e["ﴞ"]="جي",e["ﴟ"]="خى",e["ﴠ"]="خي",e["ﴡ"]="صى",e["ﴢ"]="صي",e["ﴣ"]="ضى",e["ﴤ"]="ضي",e["ﴥ"]="شج",e["ﴦ"]="شح",e["ﴧ"]="شخ",e["ﴨ"]="شم",e["ﴩ"]="شر",e["ﴪ"]="سر",e["ﴫ"]="صر",e["ﴬ"]="ضر",e["ﴭ"]="شج",e["ﴮ"]="شح",e["ﴯ"]="شخ",e["ﴰ"]="شم",e["ﴱ"]="سه",e["ﴲ"]="شه",e["ﴳ"]="طم",e["ﴴ"]="سج",e["ﴵ"]="سح",e["ﴶ"]="سخ",e["ﴷ"]="شج",e["ﴸ"]="شح",e["ﴹ"]="شخ",e["ﴺ"]="طم",e["ﴻ"]="ظم",e["ﴼ"]="اً",e["ﴽ"]="اً",e["ﵐ"]="تجم",e["ﵑ"]="تحج",e["ﵒ"]="تحج",e["ﵓ"]="تحم",e["ﵔ"]="تخم",e["ﵕ"]="تمج",e["ﵖ"]="تمح",e["ﵗ"]="تمخ",e["ﵘ"]="جمح",e["ﵙ"]="جمح",e["ﵚ"]="حمي",e["ﵛ"]="حمى",e["ﵜ"]="سحج",e["ﵝ"]="سجح",e["ﵞ"]="سجى",e["ﵟ"]="سمح",e["ﵠ"]="سمح",e["ﵡ"]="سمج",e["ﵢ"]="سمم",e["ﵣ"]="سمم",e["ﵤ"]="صحح",e["ﵥ"]="صحح",e["ﵦ"]="صمم",e["ﵧ"]="شحم",e["ﵨ"]="شحم",e["ﵩ"]="شجي",e["ﵪ"]="شمخ",e["ﵫ"]="شمخ",e["ﵬ"]="شمم",e["ﵭ"]="شمم",e["ﵮ"]="ضحى",e["ﵯ"]="ضخم",e["ﵰ"]="ضخم",e["ﵱ"]="طمح",e["ﵲ"]="طمح",e["ﵳ"]="طمم",e["ﵴ"]="طمي",e["ﵵ"]="عجم",e["ﵶ"]="عمم",e["ﵷ"]="عمم",e["ﵸ"]="عمى",e["ﵹ"]="غمم",e["ﵺ"]="غمي",e["ﵻ"]="غمى",e["ﵼ"]="فخم",e["ﵽ"]="فخم",e["ﵾ"]="قمح",e["ﵿ"]="قمم",e["ﶀ"]="لحم",e["ﶁ"]="لحي",e["ﶂ"]="لحى",e["ﶃ"]="لجج",e["ﶄ"]="لجج",e["ﶅ"]="لخم",e["ﶆ"]="لخم",e["ﶇ"]="لمح",e["ﶈ"]="لمح",e["ﶉ"]="محج",e["ﶊ"]="محم",e["ﶋ"]="محي",e["ﶌ"]="مجح",e["ﶍ"]="مجم",e["ﶎ"]="مخج",e["ﶏ"]="مخم",e["ﶒ"]="مجخ",e["ﶓ"]="همج",e["ﶔ"]="همم",e["ﶕ"]="نحم",e["ﶖ"]="نحى",e["ﶗ"]="نجم",e["ﶘ"]="نجم",e["ﶙ"]="نجى",e["ﶚ"]="نمي",e["ﶛ"]="نمى",e["ﶜ"]="يمم",e["ﶝ"]="يمم",e["ﶞ"]="بخي",e["ﶟ"]="تجي",e["ﶠ"]="تجى",e["ﶡ"]="تخي",e["ﶢ"]="تخى",e["ﶣ"]="تمي",e["ﶤ"]="تمى",e["ﶥ"]="جمي",e["ﶦ"]="جحى",e["ﶧ"]="جمى",e["ﶨ"]="سخى",e["ﶩ"]="صحي",e["ﶪ"]="شحي",e["ﶫ"]="ضحي",e["ﶬ"]="لجي",e["ﶭ"]="لمي",e["ﶮ"]="يحي",e["ﶯ"]="يجي",e["ﶰ"]="يمي",e["ﶱ"]="ممي",e["ﶲ"]="قمي",e["ﶳ"]="نحي",e["ﶴ"]="قمح",e["ﶵ"]="لحم",e["ﶶ"]="عمي",e["ﶷ"]="كمي",e["ﶸ"]="نجح",e["ﶹ"]="مخي",e["ﶺ"]="لجم",e["ﶻ"]="كمم",e["ﶼ"]="لجم",e["ﶽ"]="نجح",e["ﶾ"]="جحي",e["ﶿ"]="حجي",e["ﷀ"]="مجي",e["ﷁ"]="فمي",e["ﷂ"]="بحي",e["ﷃ"]="كمم",e["ﷄ"]="عجم",e["ﷅ"]="صمم",e["ﷆ"]="سخي",e["ﷇ"]="نجي",e["﹉"]="‾",e["﹊"]="‾",e["﹋"]="‾",e["﹌"]="‾",e["﹍"]="_",e["﹎"]="_",e["﹏"]="_",e["ﺀ"]="ء",e["ﺁ"]="آ",e["ﺂ"]="آ",e["ﺃ"]="أ",e["ﺄ"]="أ",e["ﺅ"]="ؤ",e["ﺆ"]="ؤ",e["ﺇ"]="إ",e["ﺈ"]="إ",e["ﺉ"]="ئ",e["ﺊ"]="ئ",e["ﺋ"]="ئ",e["ﺌ"]="ئ",e["ﺍ"]="ا",e["ﺎ"]="ا",e["ﺏ"]="ب",e["ﺐ"]="ب",e["ﺑ"]="ب",e["ﺒ"]="ب",e["ﺓ"]="ة",e["ﺔ"]="ة",e["ﺕ"]="ت",e["ﺖ"]="ت",e["ﺗ"]="ت",e["ﺘ"]="ت",e["ﺙ"]="ث",e["ﺚ"]="ث",e["ﺛ"]="ث",e["ﺜ"]="ث",e["ﺝ"]="ج",e["ﺞ"]="ج",e["ﺟ"]="ج",e["ﺠ"]="ج",e["ﺡ"]="ح",e["ﺢ"]="ح",e["ﺣ"]="ح",e["ﺤ"]="ح",e["ﺥ"]="خ",e["ﺦ"]="خ",e["ﺧ"]="خ",e["ﺨ"]="خ",e["ﺩ"]="د",e["ﺪ"]="د",e["ﺫ"]="ذ",e["ﺬ"]="ذ",e["ﺭ"]="ر",e["ﺮ"]="ر",e["ﺯ"]="ز",e["ﺰ"]="ز",e["ﺱ"]="س",e["ﺲ"]="س",e["ﺳ"]="س",e["ﺴ"]="س",e["ﺵ"]="ش",e["ﺶ"]="ش",e["ﺷ"]="ش",e["ﺸ"]="ش",e["ﺹ"]="ص",e["ﺺ"]="ص",e["ﺻ"]="ص",e["ﺼ"]="ص",e["ﺽ"]="ض",e["ﺾ"]="ض",e["ﺿ"]="ض",e["ﻀ"]="ض",e["ﻁ"]="ط",e["ﻂ"]="ط",e["ﻃ"]="ط",e["ﻄ"]="ط",e["ﻅ"]="ظ",e["ﻆ"]="ظ",e["ﻇ"]="ظ",e["ﻈ"]="ظ",e["ﻉ"]="ع",e["ﻊ"]="ع",e["ﻋ"]="ع",e["ﻌ"]="ع",e["ﻍ"]="غ",e["ﻎ"]="غ",e["ﻏ"]="غ",e["ﻐ"]="غ",e["ﻑ"]="ف",e["ﻒ"]="ف",e["ﻓ"]="ف",e["ﻔ"]="ف",e["ﻕ"]="ق",e["ﻖ"]="ق",e["ﻗ"]="ق",e["ﻘ"]="ق",e["ﻙ"]="ك",e["ﻚ"]="ك",e["ﻛ"]="ك",e["ﻜ"]="ك",e["ﻝ"]="ل",e["ﻞ"]="ل",e["ﻟ"]="ل",e["ﻠ"]="ل",e["ﻡ"]="م",e["ﻢ"]="م",e["ﻣ"]="م",e["ﻤ"]="م",e["ﻥ"]="ن",e["ﻦ"]="ن",e["ﻧ"]="ن",e["ﻨ"]="ن",e["ﻩ"]="ه",e["ﻪ"]="ه",e["ﻫ"]="ه",e["ﻬ"]="ه",e["ﻭ"]="و",e["ﻮ"]="و",e["ﻯ"]="ى",e["ﻰ"]="ى",e["ﻱ"]="ي",e["ﻲ"]="ي",e["ﻳ"]="ي",e["ﻴ"]="ي",e["ﻵ"]="لآ",e["ﻶ"]="لآ",e["ﻷ"]="لأ",e["ﻸ"]="لأ",e["ﻹ"]="لإ",e["ﻺ"]="لإ",e["ﻻ"]="لا",e["ﻼ"]="لا"})
e.mapSpecialUnicodeValues=i,e.reverseIfRtl=s,e.getUnicodeRangeFor=r,e.getNormalizedUnicodes=h,e.getUnicodeForGlyph=a}),function(e,t){t(e.pdfjsCoreStream={},e.pdfjsSharedUtil,e.pdfjsCorePrimitives,e.pdfjsCoreJbig2,e.pdfjsCoreJpg,e.pdfjsCoreJpx)}(this,function(e,t,i,a,r,n){var s=t.Util,o=t.error,c=t.info,l=t.isInt,h=t.isArray,u=t.createObjectURL,d=t.shadow,f=(t.warn,t.isSpace),g=i.Dict,p=i.isDict,m=i.isStream,v=a.Jbig2Image,b=r.JpegImage,y=n.JpxImage,w=function(){function e(e,t,i,a){this.bytes=e instanceof Uint8Array?e:new Uint8Array(e),this.start=t||0,this.pos=this.start,this.end=t+i||this.bytes.length,this.dict=a}return e.prototype={get length(){return this.end-this.start},get isEmpty(){return 0===this.length},getByte:function(){return this.pos>=this.end?-1:this.bytes[this.pos++]},getUint16:function(){var e=this.getByte(),t=this.getByte()
return-1===e||-1===t?-1:(e<<8)+t},getInt32:function(){var e=this.getByte(),t=this.getByte(),i=this.getByte(),a=this.getByte()
return(e<<24)+(t<<16)+(i<<8)+a},getBytes:function(e){var t=this.bytes,i=this.pos,a=this.end
if(!e)return t.subarray(i,a)
var r=i+e
return r>a&&(r=a),this.pos=r,t.subarray(i,r)},peekByte:function(){var e=this.getByte()
return this.pos--,e},peekBytes:function(e){var t=this.getBytes(e)
return this.pos-=t.length,t},skip:function(e){e||(e=1),this.pos+=e},reset:function(){this.pos=this.start},moveStart:function(){this.start=this.pos},makeSubStream:function(t,i,a){return new e(this.bytes.buffer,t,i,a)},isStream:!0},e}(),k=function(){function e(e){for(var t=e.length,i=new Uint8Array(t),a=0;t>a;++a)i[a]=e.charCodeAt(a)
w.call(this,i)}return e.prototype=w.prototype,e}(),C=function(){function e(e){if(this.pos=0,this.bufferLength=0,this.eof=!1,this.buffer=t,this.minBufferLength=512,e)for(;this.minBufferLength<e;)this.minBufferLength*=2}var t=new Uint8Array(0)
return e.prototype={get isEmpty(){for(;!this.eof&&0===this.bufferLength;)this.readBlock()
return 0===this.bufferLength},ensureBuffer:function(e){var t=this.buffer
if(e<=t.byteLength)return t
for(var i=this.minBufferLength;e>i;)i*=2
var a=new Uint8Array(i)
return a.set(t),this.buffer=a},getByte:function(){for(var e=this.pos;this.bufferLength<=e;){if(this.eof)return-1
this.readBlock()}return this.buffer[this.pos++]},getUint16:function(){var e=this.getByte(),t=this.getByte()
return-1===e||-1===t?-1:(e<<8)+t},getInt32:function(){var e=this.getByte(),t=this.getByte(),i=this.getByte(),a=this.getByte()
return(e<<24)+(t<<16)+(i<<8)+a},getBytes:function(e){var t,i=this.pos
if(e){for(this.ensureBuffer(i+e),t=i+e;!this.eof&&this.bufferLength<t;)this.readBlock()
var a=this.bufferLength
t>a&&(t=a)}else{for(;!this.eof;)this.readBlock()
t=this.bufferLength}return this.pos=t,this.buffer.subarray(i,t)},peekByte:function(){var e=this.getByte()
return this.pos--,e},peekBytes:function(e){var t=this.getBytes(e)
return this.pos-=t.length,t},makeSubStream:function(e,t,i){for(var a=e+t;this.bufferLength<=a&&!this.eof;)this.readBlock()
return new w(this.buffer,e,t,i)},skip:function(e){e||(e=1),this.pos+=e},reset:function(){this.pos=0},getBaseStreams:function(){return this.str&&this.str.getBaseStreams?this.str.getBaseStreams():[]}},e}(),x=function(){function e(e){this.streams=e,C.call(this,null)}return e.prototype=Object.create(C.prototype),e.prototype.readBlock=function(){var e=this.streams
if(0===e.length)return void(this.eof=!0)
var t=e.shift(),i=t.getBytes(),a=this.bufferLength,r=a+i.length,n=this.ensureBuffer(r)
n.set(i,a),this.bufferLength=r},e.prototype.getBaseStreams=function(){for(var e=[],t=0,i=this.streams.length;i>t;t++){var a=this.streams[t]
a.getBaseStreams&&s.appendToArray(e,a.getBaseStreams())}return e},e}(),S=function(){function e(e,t){this.str=e,this.dict=e.dict
var i=e.getByte(),a=e.getByte();(-1===i||-1===a)&&o("Invalid header in flate stream: "+i+", "+a),8!==(15&i)&&o("Unknown compression method in flate stream: "+i+", "+a),((i<<8)+a)%31!==0&&o("Bad FCHECK in flate stream: "+i+", "+a),32&a&&o("FDICT bit set in flate stream: "+i+", "+a),this.codeSize=0,this.codeBuf=0,C.call(this,t)}var t=new Int32Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),i=new Int32Array([3,4,5,6,7,8,9,10,65547,65549,65551,65553,131091,131095,131099,131103,196643,196651,196659,196667,262211,262227,262243,262259,327811,327843,327875,327907,258,258,258]),a=new Int32Array([1,2,3,4,65541,65543,131081,131085,196625,196633,262177,262193,327745,327777,393345,393409,459009,459137,524801,525057,590849,591361,657409,658433,724993,727041,794625,798721,868353,876545]),r=[new Int32Array([459008,524368,524304,524568,459024,524400,524336,590016,459016,524384,524320,589984,524288,524416,524352,590048,459012,524376,524312,589968,459028,524408,524344,590032,459020,524392,524328,59e4,524296,524424,524360,590064,459010,524372,524308,524572,459026,524404,524340,590024,459018,524388,524324,589992,524292,524420,524356,590056,459014,524380,524316,589976,459030,524412,524348,590040,459022,524396,524332,590008,524300,524428,524364,590072,459009,524370,524306,524570,459025,524402,524338,590020,459017,524386,524322,589988,524290,524418,524354,590052,459013,524378,524314,589972,459029,524410,524346,590036,459021,524394,524330,590004,524298,524426,524362,590068,459011,524374,524310,524574,459027,524406,524342,590028,459019,524390,524326,589996,524294,524422,524358,590060,459015,524382,524318,589980,459031,524414,524350,590044,459023,524398,524334,590012,524302,524430,524366,590076,459008,524369,524305,524569,459024,524401,524337,590018,459016,524385,524321,589986,524289,524417,524353,590050,459012,524377,524313,589970,459028,524409,524345,590034,459020,524393,524329,590002,524297,524425,524361,590066,459010,524373,524309,524573,459026,524405,524341,590026,459018,524389,524325,589994,524293,524421,524357,590058,459014,524381,524317,589978,459030,524413,524349,590042,459022,524397,524333,590010,524301,524429,524365,590074,459009,524371,524307,524571,459025,524403,524339,590022,459017,524387,524323,589990,524291,524419,524355,590054,459013,524379,524315,589974,459029,524411,524347,590038,459021,524395,524331,590006,524299,524427,524363,590070,459011,524375,524311,524575,459027,524407,524343,590030,459019,524391,524327,589998,524295,524423,524359,590062,459015,524383,524319,589982,459031,524415,524351,590046,459023,524399,524335,590014,524303,524431,524367,590078,459008,524368,524304,524568,459024,524400,524336,590017,459016,524384,524320,589985,524288,524416,524352,590049,459012,524376,524312,589969,459028,524408,524344,590033,459020,524392,524328,590001,524296,524424,524360,590065,459010,524372,524308,524572,459026,524404,524340,590025,459018,524388,524324,589993,524292,524420,524356,590057,459014,524380,524316,589977,459030,524412,524348,590041,459022,524396,524332,590009,524300,524428,524364,590073,459009,524370,524306,524570,459025,524402,524338,590021,459017,524386,524322,589989,524290,524418,524354,590053,459013,524378,524314,589973,459029,524410,524346,590037,459021,524394,524330,590005,524298,524426,524362,590069,459011,524374,524310,524574,459027,524406,524342,590029,459019,524390,524326,589997,524294,524422,524358,590061,459015,524382,524318,589981,459031,524414,524350,590045,459023,524398,524334,590013,524302,524430,524366,590077,459008,524369,524305,524569,459024,524401,524337,590019,459016,524385,524321,589987,524289,524417,524353,590051,459012,524377,524313,589971,459028,524409,524345,590035,459020,524393,524329,590003,524297,524425,524361,590067,459010,524373,524309,524573,459026,524405,524341,590027,459018,524389,524325,589995,524293,524421,524357,590059,459014,524381,524317,589979,459030,524413,524349,590043,459022,524397,524333,590011,524301,524429,524365,590075,459009,524371,524307,524571,459025,524403,524339,590023,459017,524387,524323,589991,524291,524419,524355,590055,459013,524379,524315,589975,459029,524411,524347,590039,459021,524395,524331,590007,524299,524427,524363,590071,459011,524375,524311,524575,459027,524407,524343,590031,459019,524391,524327,589999,524295,524423,524359,590063,459015,524383,524319,589983,459031,524415,524351,590047,459023,524399,524335,590015,524303,524431,524367,590079]),9],n=[new Int32Array([327680,327696,327688,327704,327684,327700,327692,327708,327682,327698,327690,327706,327686,327702,327694,0,327681,327697,327689,327705,327685,327701,327693,327709,327683,327699,327691,327707,327687,327703,327695,0]),5]
return e.prototype=Object.create(C.prototype),e.prototype.getBits=function(e){for(var t,i=this.str,a=this.codeSize,r=this.codeBuf;e>a;)-1===(t=i.getByte())&&o("Bad encoding in flate stream"),r|=t<<a,a+=8
return t=r&(1<<e)-1,this.codeBuf=r>>e,this.codeSize=a-=e,t},e.prototype.getCode=function(e){for(var t,i=this.str,a=e[0],r=e[1],n=this.codeSize,s=this.codeBuf;r>n&&-1!==(t=i.getByte());)s|=t<<n,n+=8
var c=a[s&(1<<r)-1],l=c>>16,h=65535&c
return(1>l||l>n)&&o("Bad encoding in flate stream"),this.codeBuf=s>>l,this.codeSize=n-l,h},e.prototype.generateHuffmanTable=function(e){var t,i=e.length,a=0
for(t=0;i>t;++t)e[t]>a&&(a=e[t])
for(var r=1<<a,n=new Int32Array(r),s=1,o=0,c=2;a>=s;++s,o<<=1,c<<=1)for(var l=0;i>l;++l)if(e[l]===s){var h=0,u=o
for(t=0;s>t;++t)h=h<<1|1&u,u>>=1
for(t=h;r>t;t+=c)n[t]=s<<16|l;++o}return[n,a]},e.prototype.readBlock=function(){var e,s,c=this.str,l=this.getBits(3)
if(1&l&&(this.eof=!0),l>>=1,0!==l){var h,u
if(1===l)h=r,u=n
else if(2===l){var d,f=this.getBits(5)+257,g=this.getBits(5)+1,p=this.getBits(4)+4,m=new Uint8Array(t.length)
for(d=0;p>d;++d)m[t[d]]=this.getBits(3)
var v=this.generateHuffmanTable(m)
s=0,d=0
for(var b,y,w,k=f+g,C=new Uint8Array(k);k>d;){var x=this.getCode(v)
if(16===x)b=2,y=3,w=s
else if(17===x)b=3,y=3,w=s=0
else{if(18!==x){C[d++]=s=x
continue}b=7,y=11,w=s=0}for(var S=this.getBits(b)+y;S-- >0;)C[d++]=w}h=this.generateHuffmanTable(C.subarray(0,f)),u=this.generateHuffmanTable(C.subarray(f,k))}else o("Unknown block type in flate stream")
e=this.buffer
for(var A=e?e.length:0,I=this.bufferLength;;){var P=this.getCode(h)
if(256>P)I+1>=A&&(e=this.ensureBuffer(I+1),A=e.length),e[I++]=P
else{if(256===P)return void(this.bufferLength=I)
P-=257,P=i[P]
var B=P>>16
B>0&&(B=this.getBits(B)),s=(65535&P)+B,P=this.getCode(u),P=a[P],B=P>>16,B>0&&(B=this.getBits(B))
var T=(65535&P)+B
I+s>=A&&(e=this.ensureBuffer(I+s),A=e.length)
for(var L=0;s>L;++L,++I)e[I]=e[I-T]}}}else{var E;-1===(E=c.getByte())&&o("Bad block header in flate stream")
var R=E;-1===(E=c.getByte())&&o("Bad block header in flate stream"),R|=E<<8,-1===(E=c.getByte())&&o("Bad block header in flate stream")
var O=E;-1===(E=c.getByte())&&o("Bad block header in flate stream"),O|=E<<8,O===(65535&~R)||0===R&&0===O||o("Bad uncompressed block length in flate stream"),this.codeBuf=0,this.codeSize=0
var M=this.bufferLength
e=this.ensureBuffer(M+R)
var D=M+R
if(this.bufferLength=D,0===R)-1===c.peekByte()&&(this.eof=!0)
else for(var F=M;D>F;++F){if(-1===(E=c.getByte())){this.eof=!0
break}e[F]=E}}},e}(),A=function(){function e(e,t,i){if(!p(i))return e
var a=this.predictor=i.get("Predictor")||1
if(1>=a)return e
2!==a&&(10>a||a>15)&&o("Unsupported predictor: "+a),2===a?this.readBlock=this.readBlockTiff:this.readBlock=this.readBlockPng,this.str=e,this.dict=e.dict
var r=this.colors=i.get("Colors")||1,n=this.bits=i.get("BitsPerComponent")||8,s=this.columns=i.get("Columns")||1
return this.pixBytes=r*n+7>>3,this.rowBytes=s*r*n+7>>3,C.call(this,t),this}return e.prototype=Object.create(C.prototype),e.prototype.readBlockTiff=function(){var e=this.rowBytes,t=this.bufferLength,i=this.ensureBuffer(t+e),a=this.bits,r=this.colors,n=this.str.getBytes(e)
if(this.eof=!n.length,!this.eof){var s,o=0,c=0,l=0,h=0,u=t
if(1===a&&1===r)for(s=0;e>s;++s){var d=n[s]^o
d^=d>>1,d^=d>>2,d^=d>>4,o=(1&d)<<7,i[u++]=d}else if(8===a){for(s=0;r>s;++s)i[u++]=n[s]
for(;e>s;++s)i[u]=i[u-r]+n[s],u++}else{var f=new Uint8Array(r+1),g=(1<<a)-1,p=0,m=t,v=this.columns
for(s=0;v>s;++s)for(var b=0;r>b;++b)a>l&&(o=o<<8|255&n[p++],l+=8),f[b]=f[b]+(o>>l-a)&g,l-=a,c=c<<a|f[b],h+=a,h>=8&&(i[m++]=c>>h-8&255,h-=8)
h>0&&(i[m++]=(c<<8-h)+(o&(1<<8-h)-1))}this.bufferLength+=e}},e.prototype.readBlockPng=function(){var e=this.rowBytes,t=this.pixBytes,i=this.str.getByte(),a=this.str.getBytes(e)
if(this.eof=!a.length,!this.eof){var r=this.bufferLength,n=this.ensureBuffer(r+e),s=n.subarray(r-e,r)
0===s.length&&(s=new Uint8Array(e))
var c,l,h,u=r
switch(i){case 0:for(c=0;e>c;++c)n[u++]=a[c]
break
case 1:for(c=0;t>c;++c)n[u++]=a[c]
for(;e>c;++c)n[u]=n[u-t]+a[c]&255,u++
break
case 2:for(c=0;e>c;++c)n[u++]=s[c]+a[c]&255
break
case 3:for(c=0;t>c;++c)n[u++]=(s[c]>>1)+a[c]
for(;e>c;++c)n[u]=(s[c]+n[u-t]>>1)+a[c]&255,u++
break
case 4:for(c=0;t>c;++c)l=s[c],h=a[c],n[u++]=l+h
for(;e>c;++c){l=s[c]
var d=s[c-t],f=n[u-t],g=f+l-d,p=g-f
0>p&&(p=-p)
var m=g-l
0>m&&(m=-m)
var v=g-d
0>v&&(v=-v),h=a[c],m>=p&&v>=p?n[u++]=f+h:v>=m?n[u++]=l+h:n[u++]=d+h}break
default:o("Unsupported predictor: "+i)}this.bufferLength+=e}},e}(),I=function(){function e(e,t,i,a){for(var r;-1!==(r=e.getByte());)if(255===r){e.skip(-1)
break}this.stream=e,this.maybeLength=t,this.dict=i,this.params=a,C.call(this,t)}return e.prototype=Object.create(C.prototype),Object.defineProperty(e.prototype,"bytes",{get:function(){return d(this,"bytes",this.stream.getBytes(this.maybeLength))},configurable:!0}),e.prototype.ensureBuffer=function(e){if(!this.bufferLength){var t=new b,i=this.dict.getArray("Decode","D")
if(this.forceRGB&&h(i)){for(var a=this.dict.get("BitsPerComponent")||8,r=i.length,n=new Int32Array(r),s=!1,o=(1<<a)-1,c=0;r>c;c+=2)n[c]=256*(i[c+1]-i[c])|0,n[c+1]=i[c]*o|0,(256!==n[c]||0!==n[c+1])&&(s=!0)
s&&(t.decodeTransform=n)}if(p(this.params)){var u=this.params.get("ColorTransform")
l(u)&&(t.colorTransform=u)}t.parse(this.bytes)
var d=t.getData(this.drawWidth,this.drawHeight,this.forceRGB)
this.buffer=d,this.bufferLength=d.length,this.eof=!0}},e.prototype.getBytes=function(e){return this.ensureBuffer(),this.buffer},e.prototype.getIR=function(e){return u(this.bytes,"image/jpeg",e)},e}(),P=function(){function e(e,t,i,a){this.stream=e,this.maybeLength=t,this.dict=i,this.params=a,C.call(this,t)}return e.prototype=Object.create(C.prototype),Object.defineProperty(e.prototype,"bytes",{get:function(){return d(this,"bytes",this.stream.getBytes(this.maybeLength))},configurable:!0}),e.prototype.ensureBuffer=function(e){if(!this.bufferLength){var t=new y
t.parse(this.bytes)
var i=t.width,a=t.height,r=t.componentsCount,n=t.tiles.length
if(1===n)this.buffer=t.tiles[0].items
else{for(var s=new Uint8Array(i*a*r),o=0;n>o;o++)for(var c=t.tiles[o],l=c.width,h=c.height,u=c.left,d=c.top,f=c.items,g=0,p=(i*d+u)*r,m=i*r,v=l*r,b=0;h>b;b++){var w=f.subarray(g,g+v)
s.set(w,p),g+=v,p+=m}this.buffer=s}this.bufferLength=this.buffer.length,this.eof=!0}},e}(),B=function(){function e(e,t,i,a){this.stream=e,this.maybeLength=t,this.dict=i,this.params=a,C.call(this,t)}return e.prototype=Object.create(C.prototype),Object.defineProperty(e.prototype,"bytes",{get:function(){return d(this,"bytes",this.stream.getBytes(this.maybeLength))},configurable:!0}),e.prototype.ensureBuffer=function(e){if(!this.bufferLength){var t=new v,i=[]
if(p(this.params)){var a=this.params.get("JBIG2Globals")
if(m(a)){var r=a.getBytes()
i.push({data:r,start:0,end:r.length})}}i.push({data:this.bytes,start:0,end:this.bytes.length})
for(var n=t.parseChunks(i),s=n.length,o=0;s>o;o++)n[o]^=255
this.buffer=n,this.bufferLength=s,this.eof=!0}},e}(),T=function(){function e(e,t,i){this.str=e,this.dict=e.dict,this.decrypt=i,this.nextChunk=null,this.initialized=!1,C.call(this,t)}var t=512
return e.prototype=Object.create(C.prototype),e.prototype.readBlock=function(){var e
if(this.initialized?e=this.nextChunk:(e=this.str.getBytes(t),this.initialized=!0),!e||0===e.length)return void(this.eof=!0)
this.nextChunk=this.str.getBytes(t)
var i=this.nextChunk&&this.nextChunk.length>0,a=this.decrypt
e=a(e,!i)
var r,n=this.bufferLength,s=e.length,o=this.ensureBuffer(n+s)
for(r=0;s>r;r++)o[n++]=e[r]
this.bufferLength=n},e}(),L=function(){function e(e,t){this.str=e,this.dict=e.dict,this.input=new Uint8Array(5),t&&(t=.8*t),C.call(this,t)}return e.prototype=Object.create(C.prototype),e.prototype.readBlock=function(){for(var e=126,t=122,i=-1,a=this.str,r=a.getByte();f(r);)r=a.getByte()
if(r===i||r===e)return void(this.eof=!0)
var n,s,o=this.bufferLength
if(r===t){for(n=this.ensureBuffer(o+4),s=0;4>s;++s)n[o+s]=0
this.bufferLength+=4}else{var c=this.input
for(c[0]=r,s=1;5>s;++s){for(r=a.getByte();f(r);)r=a.getByte()
if(c[s]=r,r===i||r===e)break}if(n=this.ensureBuffer(o+s-1),this.bufferLength+=s-1,5>s){for(;5>s;++s)c[s]=117
this.eof=!0}var l=0
for(s=0;5>s;++s)l=85*l+(c[s]-33)
for(s=3;s>=0;--s)n[o+s]=255&l,l>>=8}},e}(),E=function(){function e(e,t){this.str=e,this.dict=e.dict,this.firstDigit=-1,t&&(t=.5*t),C.call(this,t)}return e.prototype=Object.create(C.prototype),e.prototype.readBlock=function(){var e=8e3,t=this.str.getBytes(e)
if(!t.length)return void(this.eof=!0)
for(var i=t.length+1>>1,a=this.ensureBuffer(this.bufferLength+i),r=this.bufferLength,n=this.firstDigit,s=0,o=t.length;o>s;s++){var c,l=t[s]
if(l>=48&&57>=l)c=15&l
else{if(!(l>=65&&70>=l||l>=97&&102>=l)){if(62===l){this.eof=!0
break}continue}c=(15&l)+9}0>n?n=c:(a[r++]=n<<4|c,n=-1)}n>=0&&this.eof&&(a[r++]=n<<4,n=-1),this.firstDigit=n,this.bufferLength=r},e}(),R=function(){function e(e,t){this.str=e,this.dict=e.dict,C.call(this,t)}return e.prototype=Object.create(C.prototype),e.prototype.readBlock=function(){var e=this.str.getBytes(2)
if(!e||e.length<2||128===e[0])return void(this.eof=!0)
var t,i=this.bufferLength,a=e[0]
if(128>a){if(t=this.ensureBuffer(i+a+1),t[i++]=e[1],a>0){var r=this.str.getBytes(a)
t.set(r,i),i+=a}}else{a=257-a
var n=e[1]
t=this.ensureBuffer(i+a+1)
for(var s=0;a>s;s++)t[i++]=n}this.bufferLength=i},e}(),O=function(){function e(e,t,i){this.str=e,this.dict=e.dict,i=i||g.empty,this.encoding=i.get("K")||0,this.eoline=i.get("EndOfLine")||!1,this.byteAlign=i.get("EncodedByteAlign")||!1,this.columns=i.get("Columns")||1728,this.rows=i.get("Rows")||0
var a=i.get("EndOfBlock");(null===a||void 0===a)&&(a=!0),this.eoblock=a,this.black=i.get("BlackIs1")||!1,this.codingLine=new Uint32Array(this.columns+1),this.refLine=new Uint32Array(this.columns+2),this.codingLine[0]=this.columns,this.codingPos=0,this.row=0,this.nextLine2D=this.encoding<0,this.inputBits=0,this.inputBuf=0,this.outputBits=0
for(var r;0===(r=this.lookBits(12));)this.eatBits(1)
1===r&&this.eatBits(12),this.encoding>0&&(this.nextLine2D=!this.lookBits(1),this.eatBits(1)),C.call(this,t)}var t=-2,i=-1,a=0,r=1,n=2,s=3,o=4,l=5,h=6,u=7,d=8,f=[[-1,-1],[-1,-1],[7,d],[7,u],[6,h],[6,h],[6,l],[6,l],[4,a],[4,a],[4,a],[4,a],[4,a],[4,a],[4,a],[4,a],[3,r],[3,r],[3,r],[3,r],[3,r],[3,r],[3,r],[3,r],[3,r],[3,r],[3,r],[3,r],[3,r],[3,r],[3,r],[3,r],[3,o],[3,o],[3,o],[3,o],[3,o],[3,o],[3,o],[3,o],[3,o],[3,o],[3,o],[3,o],[3,o],[3,o],[3,o],[3,o],[3,s],[3,s],[3,s],[3,s],[3,s],[3,s],[3,s],[3,s],[3,s],[3,s],[3,s],[3,s],[3,s],[3,s],[3,s],[3,s],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n],[1,n]],p=[[-1,-1],[12,t],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[11,1792],[11,1792],[12,1984],[12,2048],[12,2112],[12,2176],[12,2240],[12,2304],[11,1856],[11,1856],[11,1920],[11,1920],[12,2368],[12,2432],[12,2496],[12,2560]],m=[[-1,-1],[-1,-1],[-1,-1],[-1,-1],[8,29],[8,29],[8,30],[8,30],[8,45],[8,45],[8,46],[8,46],[7,22],[7,22],[7,22],[7,22],[7,23],[7,23],[7,23],[7,23],[8,47],[8,47],[8,48],[8,48],[6,13],[6,13],[6,13],[6,13],[6,13],[6,13],[6,13],[6,13],[7,20],[7,20],[7,20],[7,20],[8,33],[8,33],[8,34],[8,34],[8,35],[8,35],[8,36],[8,36],[8,37],[8,37],[8,38],[8,38],[7,19],[7,19],[7,19],[7,19],[8,31],[8,31],[8,32],[8,32],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,12],[6,12],[6,12],[6,12],[6,12],[6,12],[6,12],[6,12],[8,53],[8,53],[8,54],[8,54],[7,26],[7,26],[7,26],[7,26],[8,39],[8,39],[8,40],[8,40],[8,41],[8,41],[8,42],[8,42],[8,43],[8,43],[8,44],[8,44],[7,21],[7,21],[7,21],[7,21],[7,28],[7,28],[7,28],[7,28],[8,61],[8,61],[8,62],[8,62],[8,63],[8,63],[8,0],[8,0],[8,320],[8,320],[8,384],[8,384],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[7,27],[7,27],[7,27],[7,27],[8,59],[8,59],[8,60],[8,60],[9,1472],[9,1536],[9,1600],[9,1728],[7,18],[7,18],[7,18],[7,18],[7,24],[7,24],[7,24],[7,24],[8,49],[8,49],[8,50],[8,50],[8,51],[8,51],[8,52],[8,52],[7,25],[7,25],[7,25],[7,25],[8,55],[8,55],[8,56],[8,56],[8,57],[8,57],[8,58],[8,58],[6,192],[6,192],[6,192],[6,192],[6,192],[6,192],[6,192],[6,192],[6,1664],[6,1664],[6,1664],[6,1664],[6,1664],[6,1664],[6,1664],[6,1664],[8,448],[8,448],[8,512],[8,512],[9,704],[9,768],[8,640],[8,640],[8,576],[8,576],[9,832],[9,896],[9,960],[9,1024],[9,1088],[9,1152],[9,1216],[9,1280],[9,1344],[9,1408],[7,256],[7,256],[7,256],[7,256],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[6,16],[6,16],[6,16],[6,16],[6,16],[6,16],[6,16],[6,16],[6,17],[6,17],[6,17],[6,17],[6,17],[6,17],[6,17],[6,17],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[6,14],[6,14],[6,14],[6,14],[6,14],[6,14],[6,14],[6,14],[6,15],[6,15],[6,15],[6,15],[6,15],[6,15],[6,15],[6,15],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7]],v=[[-1,-1],[-1,-1],[12,t],[12,t],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[11,1792],[11,1792],[11,1792],[11,1792],[12,1984],[12,1984],[12,2048],[12,2048],[12,2112],[12,2112],[12,2176],[12,2176],[12,2240],[12,2240],[12,2304],[12,2304],[11,1856],[11,1856],[11,1856],[11,1856],[11,1920],[11,1920],[11,1920],[11,1920],[12,2368],[12,2368],[12,2432],[12,2432],[12,2496],[12,2496],[12,2560],[12,2560],[10,18],[10,18],[10,18],[10,18],[10,18],[10,18],[10,18],[10,18],[12,52],[12,52],[13,640],[13,704],[13,768],[13,832],[12,55],[12,55],[12,56],[12,56],[13,1280],[13,1344],[13,1408],[13,1472],[12,59],[12,59],[12,60],[12,60],[13,1536],[13,1600],[11,24],[11,24],[11,24],[11,24],[11,25],[11,25],[11,25],[11,25],[13,1664],[13,1728],[12,320],[12,320],[12,384],[12,384],[12,448],[12,448],[13,512],[13,576],[12,53],[12,53],[12,54],[12,54],[13,896],[13,960],[13,1024],[13,1088],[13,1152],[13,1216],[10,64],[10,64],[10,64],[10,64],[10,64],[10,64],[10,64],[10,64]],b=[[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[11,23],[11,23],[12,50],[12,51],[12,44],[12,45],[12,46],[12,47],[12,57],[12,58],[12,61],[12,256],[10,16],[10,16],[10,16],[10,16],[10,17],[10,17],[10,17],[10,17],[12,48],[12,49],[12,62],[12,63],[12,30],[12,31],[12,32],[12,33],[12,40],[12,41],[11,22],[11,22],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[9,15],[9,15],[9,15],[9,15],[9,15],[9,15],[9,15],[9,15],[12,128],[12,192],[12,26],[12,27],[12,28],[12,29],[11,19],[11,19],[11,20],[11,20],[12,34],[12,35],[12,36],[12,37],[12,38],[12,39],[11,21],[11,21],[12,42],[12,43],[10,0],[10,0],[10,0],[10,0],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12]],y=[[-1,-1],[-1,-1],[-1,-1],[-1,-1],[6,9],[6,8],[5,7],[5,7],[4,6],[4,6],[4,6],[4,6],[4,5],[4,5],[4,5],[4,5],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,4],[3,4],[3,4],[3,4],[3,4],[3,4],[3,4],[3,4],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2]]
return e.prototype=Object.create(C.prototype),e.prototype.readBlock=function(){for(;!this.eof;){var e=this.lookChar()
this.ensureBuffer(this.bufferLength+1),this.buffer[this.bufferLength++]=e}},e.prototype.addPixels=function(e,t){var i=this.codingLine,a=this.codingPos
e>i[a]&&(e>this.columns&&(c("row is wrong length"),this.err=!0,e=this.columns),1&a^t&&++a,i[a]=e),this.codingPos=a},e.prototype.addPixelsNeg=function(e,t){var i=this.codingLine,a=this.codingPos
if(e>i[a])e>this.columns&&(c("row is wrong length"),this.err=!0,e=this.columns),1&a^t&&++a,i[a]=e
else if(e<i[a]){for(0>e&&(c("invalid code"),this.err=!0,e=0);a>0&&e<i[a-1];)--a
i[a]=e}this.codingPos=a},e.prototype.lookChar=function(){var e,t,f,g,p=this.refLine,m=this.codingLine,v=this.columns
if(0===this.outputBits){if(this.eof)return null
this.err=!1
var b,y,w
if(this.nextLine2D){for(g=0;m[g]<v;++g)p[g]=m[g]
for(p[g++]=v,p[g]=v,m[0]=0,this.codingPos=0,e=0,t=0;m[this.codingPos]<v;)switch(b=this.getTwoDimCode()){case a:this.addPixels(p[e+1],t),p[e+1]<v&&(e+=2)
break
case r:if(b=y=0,t){do b+=w=this.getBlackCode()
while(w>=64)
do y+=w=this.getWhiteCode()
while(w>=64)}else{do b+=w=this.getWhiteCode()
while(w>=64)
do y+=w=this.getBlackCode()
while(w>=64)}for(this.addPixels(m[this.codingPos]+b,t),m[this.codingPos]<v&&this.addPixels(m[this.codingPos]+y,1^t);p[e]<=m[this.codingPos]&&p[e]<v;)e+=2
break
case u:if(this.addPixels(p[e]+3,t),t^=1,m[this.codingPos]<v)for(++e;p[e]<=m[this.codingPos]&&p[e]<v;)e+=2
break
case l:if(this.addPixels(p[e]+2,t),t^=1,m[this.codingPos]<v)for(++e;p[e]<=m[this.codingPos]&&p[e]<v;)e+=2
break
case s:if(this.addPixels(p[e]+1,t),t^=1,m[this.codingPos]<v)for(++e;p[e]<=m[this.codingPos]&&p[e]<v;)e+=2
break
case n:if(this.addPixels(p[e],t),t^=1,m[this.codingPos]<v)for(++e;p[e]<=m[this.codingPos]&&p[e]<v;)e+=2
break
case d:if(this.addPixelsNeg(p[e]-3,t),t^=1,m[this.codingPos]<v)for(e>0?--e:++e;p[e]<=m[this.codingPos]&&p[e]<v;)e+=2
break
case h:if(this.addPixelsNeg(p[e]-2,t),t^=1,m[this.codingPos]<v)for(e>0?--e:++e;p[e]<=m[this.codingPos]&&p[e]<v;)e+=2
break
case o:if(this.addPixelsNeg(p[e]-1,t),t^=1,m[this.codingPos]<v)for(e>0?--e:++e;p[e]<=m[this.codingPos]&&p[e]<v;)e+=2
break
case i:this.addPixels(v,0),this.eof=!0
break
default:c("bad 2d code"),this.addPixels(v,0),this.err=!0}}else for(m[0]=0,this.codingPos=0,t=0;m[this.codingPos]<v;){if(b=0,t){do b+=w=this.getBlackCode()
while(w>=64)}else do b+=w=this.getWhiteCode()
while(w>=64)
this.addPixels(m[this.codingPos]+b,t),t^=1}var k=!1
if(this.byteAlign&&(this.inputBits&=-8),this.eoblock||this.row!==this.rows-1){if(b=this.lookBits(12),this.eoline)for(;b!==i&&1!==b;)this.eatBits(1),b=this.lookBits(12)
else for(;0===b;)this.eatBits(1),b=this.lookBits(12)
1===b?(this.eatBits(12),k=!0):b===i&&(this.eof=!0)}else this.eof=!0
if(!this.eof&&this.encoding>0&&(this.nextLine2D=!this.lookBits(1),this.eatBits(1)),this.eoblock&&k&&this.byteAlign){if(b=this.lookBits(12),1===b){if(this.eatBits(12),this.encoding>0&&(this.lookBits(1),this.eatBits(1)),this.encoding>=0)for(g=0;4>g;++g)b=this.lookBits(12),1!==b&&c("bad rtc code: "+b),this.eatBits(12),this.encoding>0&&(this.lookBits(1),this.eatBits(1))
this.eof=!0}}else if(this.err&&this.eoline){for(;;){if(b=this.lookBits(13),b===i)return this.eof=!0,null
if(b>>1===1)break
this.eatBits(1)}this.eatBits(12),this.encoding>0&&(this.eatBits(1),this.nextLine2D=!(1&b))}m[0]>0?this.outputBits=m[this.codingPos=0]:this.outputBits=m[this.codingPos=1],this.row++}var C
if(this.outputBits>=8)C=1&this.codingPos?0:255,this.outputBits-=8,0===this.outputBits&&m[this.codingPos]<v&&(this.codingPos++,this.outputBits=m[this.codingPos]-m[this.codingPos-1])
else{f=8,C=0
do this.outputBits>f?(C<<=f,1&this.codingPos||(C|=255>>8-f),this.outputBits-=f,f=0):(C<<=this.outputBits,1&this.codingPos||(C|=255>>8-this.outputBits),f-=this.outputBits,this.outputBits=0,m[this.codingPos]<v?(this.codingPos++,this.outputBits=m[this.codingPos]-m[this.codingPos-1]):f>0&&(C<<=f,f=0))
while(f)}return this.black&&(C^=255),C},e.prototype.findTableCode=function(e,t,a,r){for(var n=r||0,s=e;t>=s;++s){var o=this.lookBits(s)
if(o===i)return[!0,1,!1]
if(t>s&&(o<<=t-s),!n||o>=n){var c=a[o-n]
if(c[0]===s)return this.eatBits(s),[!0,c[1],!0]}}return[!1,0,!1]},e.prototype.getTwoDimCode=function(){var e,t=0
if(this.eoblock){if(t=this.lookBits(7),e=f[t],e&&e[0]>0)return this.eatBits(e[0]),e[1]}else{var a=this.findTableCode(1,7,f)
if(a[0]&&a[2])return a[1]}return c("Bad two dim code"),i},e.prototype.getWhiteCode=function(){var e,t=0
if(this.eoblock){if(t=this.lookBits(12),t===i)return 1
if(e=t>>5===0?p[t]:m[t>>3],e[0]>0)return this.eatBits(e[0]),e[1]}else{var a=this.findTableCode(1,9,m)
if(a[0])return a[1]
if(a=this.findTableCode(11,12,p),a[0])return a[1]}return c("bad white code"),this.eatBits(1),1},e.prototype.getBlackCode=function(){var e,t
if(this.eoblock){if(e=this.lookBits(13),e===i)return 1
if(t=e>>7===0?v[e]:e>>9===0&&e>>7!==0?b[(e>>1)-64]:y[e>>7],t[0]>0)return this.eatBits(t[0]),t[1]}else{var a=this.findTableCode(2,6,y)
if(a[0])return a[1]
if(a=this.findTableCode(7,12,b,64),a[0])return a[1]
if(a=this.findTableCode(10,13,v),a[0])return a[1]}return c("bad black code"),this.eatBits(1),1},e.prototype.lookBits=function(e){for(var t;this.inputBits<e;){if(-1===(t=this.str.getByte()))return 0===this.inputBits?i:this.inputBuf<<e-this.inputBits&65535>>16-e
this.inputBuf=this.inputBuf<<8|t,this.inputBits+=8}return this.inputBuf>>this.inputBits-e&65535>>16-e},e.prototype.eatBits=function(e){(this.inputBits-=e)<0&&(this.inputBits=0)},e}(),M=function(){function e(e,t,i){this.str=e,this.dict=e.dict,this.cachedData=0,this.bitsCached=0
for(var a=4096,r={earlyChange:i,codeLength:9,nextCode:258,dictionaryValues:new Uint8Array(a),dictionaryLengths:new Uint16Array(a),dictionaryPrevCodes:new Uint16Array(a),currentSequence:new Uint8Array(a),currentSequenceLength:0},n=0;256>n;++n)r.dictionaryValues[n]=n,r.dictionaryLengths[n]=1
this.lzwState=r,C.call(this,t)}return e.prototype=Object.create(C.prototype),e.prototype.readBits=function(e){for(var t=this.bitsCached,i=this.cachedData;e>t;){var a=this.str.getByte()
if(-1===a)return this.eof=!0,null
i=i<<8|a,t+=8}return this.bitsCached=t-=e,this.cachedData=i,this.lastCode=null,i>>>t&(1<<e)-1},e.prototype.readBlock=function(){var e,t,i,a=512,r=2*a,n=a,s=this.lzwState
if(s){var o=s.earlyChange,c=s.nextCode,l=s.dictionaryValues,h=s.dictionaryLengths,u=s.dictionaryPrevCodes,d=s.codeLength,f=s.prevCode,g=s.currentSequence,p=s.currentSequenceLength,m=0,v=this.bufferLength,b=this.ensureBuffer(this.bufferLength+r)
for(e=0;a>e;e++){var y=this.readBits(d),w=p>0
if(256>y)g[0]=y,p=1
else{if(!(y>=258)){if(256===y){d=9,c=258,p=0
continue}this.eof=!0,delete this.lzwState
break}if(c>y)for(p=h[y],t=p-1,i=y;t>=0;t--)g[t]=l[i],i=u[i]
else g[p++]=g[0]}if(w&&(u[c]=f,h[c]=h[f]+1,l[c]=g[0],c++,d=c+o&c+o-1?d:0|Math.min(Math.log(c+o)/.6931471805599453+1,12)),f=y,m+=p,m>r){do r+=n
while(m>r)
b=this.ensureBuffer(this.bufferLength+r)}for(t=0;p>t;t++)b[v++]=g[t]}s.nextCode=c,s.codeLength=d,s.prevCode=f,s.currentSequenceLength=p,this.bufferLength=v}},e}(),D=function(){function e(){w.call(this,new Uint8Array(0))}return e.prototype=w.prototype,e}()
e.Ascii85Stream=L,e.AsciiHexStream=E,e.CCITTFaxStream=O,e.DecryptStream=T,e.DecodeStream=C,e.FlateStream=S,e.Jbig2Stream=B,e.JpegStream=I,e.JpxStream=P,e.NullStream=D,e.PredictorStream=A,e.RunLengthStream=R,e.Stream=w,e.StreamsSequenceStream=x,e.StringStream=k,e.LZWStream=M}),function(e,t){t(e.pdfjsCoreCrypto={},e.pdfjsSharedUtil,e.pdfjsCorePrimitives,e.pdfjsCoreStream)}(this,function(e,t,i,a){var r=t.PasswordException,n=t.PasswordResponses,s=t.bytesToString,o=t.warn,c=t.error,l=t.assert,h=t.isInt,u=t.stringToBytes,d=t.utf8StringToString,f=i.Name,g=i.isName,p=i.isDict,m=a.DecryptStream,v=function(){function e(e){this.a=0,this.b=0
var t,i,a=new Uint8Array(256),r=0,n=e.length
for(t=0;256>t;++t)a[t]=t
for(t=0;256>t;++t)i=a[t],r=r+i+e[t%n]&255,a[t]=a[r],a[r]=i
this.s=a}return e.prototype={encryptBlock:function(e){var t,i,a,r=e.length,n=this.a,s=this.b,o=this.s,c=new Uint8Array(r)
for(t=0;r>t;++t)n=n+1&255,i=o[n],s=s+i&255,a=o[s],o[n]=a,o[s]=i,c[t]=e[t]^o[i+a&255]
return this.a=n,this.b=s,c}},e.prototype.decryptBlock=e.prototype.encryptBlock,e}(),b=function(){function e(e,a,r){var n,s,o,c=1732584193,l=-271733879,h=-1732584194,u=271733878,d=r+72&-64,f=new Uint8Array(d)
for(n=0;r>n;++n)f[n]=e[a++]
for(f[n++]=128,o=d-8;o>n;)f[n++]=0
f[n++]=r<<3&255,f[n++]=r>>5&255,f[n++]=r>>13&255,f[n++]=r>>21&255,f[n++]=r>>>29&255,f[n++]=0,f[n++]=0,f[n++]=0
var g=new Int32Array(16)
for(n=0;d>n;){for(s=0;16>s;++s,n+=4)g[s]=f[n]|f[n+1]<<8|f[n+2]<<16|f[n+3]<<24
var p,m,v=c,b=l,y=h,w=u
for(s=0;64>s;++s){16>s?(p=b&y|~b&w,m=s):32>s?(p=w&b|~w&y,m=5*s+1&15):48>s?(p=b^y^w,m=3*s+5&15):(p=y^(b|~w),m=7*s&15)
var k=w,C=v+p+i[s]+g[m]|0,x=t[s]
w=y,y=b,b=b+(C<<x|C>>>32-x)|0,v=k}c=c+v|0,l=l+b|0,h=h+y|0,u=u+w|0}return new Uint8Array([255&c,c>>8&255,c>>16&255,c>>>24&255,255&l,l>>8&255,l>>16&255,l>>>24&255,255&h,h>>8&255,h>>16&255,h>>>24&255,255&u,u>>8&255,u>>16&255,u>>>24&255])}var t=new Uint8Array([7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21]),i=new Int32Array([-680876936,-389564586,606105819,-1044525330,-176418897,1200080426,-1473231341,-45705983,1770035416,-1958414417,-42063,-1990404162,1804603682,-40341101,-1502002290,1236535329,-165796510,-1069501632,643717713,-373897302,-701558691,38016083,-660478335,-405537848,568446438,-1019803690,-187363961,1163531501,-1444681467,-51403784,1735328473,-1926607734,-378558,-2022574463,1839030562,-35309556,-1530992060,1272893353,-155497632,-1094730640,681279174,-358537222,-722521979,76029189,-640364487,-421815835,530742520,-995338651,-198630844,1126891415,-1416354905,-57434055,1700485571,-1894986606,-1051523,-2054922799,1873313359,-30611744,-1560198380,1309151649,-145523070,-1120210379,718787259,-343485551])
return e}(),y=function(){function e(e,t){this.high=0|e,this.low=0|t}return e.prototype={and:function(e){this.high&=e.high,this.low&=e.low},xor:function(e){this.high^=e.high,this.low^=e.low},or:function(e){this.high|=e.high,this.low|=e.low},shiftRight:function(e){e>=32?(this.low=this.high>>>e-32|0,this.high=0):(this.low=this.low>>>e|this.high<<32-e,this.high=this.high>>>e|0)},shiftLeft:function(e){e>=32?(this.high=this.low<<e-32,this.low=0):(this.high=this.high<<e|this.low>>>32-e,this.low=this.low<<e)},rotateRight:function(e){var t,i
32&e?(i=this.low,t=this.high):(t=this.low,i=this.high),e&=31,this.low=t>>>e|i<<32-e,this.high=i>>>e|t<<32-e},not:function(){this.high=~this.high,this.low=~this.low},add:function(e){var t=(this.low>>>0)+(e.low>>>0),i=(this.high>>>0)+(e.high>>>0)
t>4294967295&&(i+=1),this.low=0|t,this.high=0|i},copyTo:function(e,t){e[t]=this.high>>>24&255,e[t+1]=this.high>>16&255,e[t+2]=this.high>>8&255,e[t+3]=255&this.high,e[t+4]=this.low>>>24&255,e[t+5]=this.low>>16&255,e[t+6]=this.low>>8&255,e[t+7]=255&this.low},assign:function(e){this.high=e.high,this.low=e.low}},e}(),w=function(){function e(e,t){return e>>>t|e<<32-t}function t(e,t,i){return e&t^~e&i}function i(e,t,i){return e&t^e&i^t&i}function a(t){return e(t,2)^e(t,13)^e(t,22)}function r(t){return e(t,6)^e(t,11)^e(t,25)}function n(t){return e(t,7)^e(t,18)^t>>>3}function s(t){return e(t,17)^e(t,19)^t>>>10}function o(e,o,l){var h,u,d,f=1779033703,g=3144134277,p=1013904242,m=2773480762,v=1359893119,b=2600822924,y=528734635,w=1541459225,k=64*Math.ceil((l+9)/64),C=new Uint8Array(k)
for(h=0;l>h;++h)C[h]=e[o++]
for(C[h++]=128,d=k-8;d>h;)C[h++]=0
C[h++]=0,C[h++]=0,C[h++]=0,C[h++]=l>>>29&255,C[h++]=l>>21&255,C[h++]=l>>13&255,C[h++]=l>>5&255,C[h++]=l<<3&255
var x=new Uint32Array(64)
for(h=0;k>h;){for(u=0;16>u;++u)x[u]=C[h]<<24|C[h+1]<<16|C[h+2]<<8|C[h+3],h+=4
for(u=16;64>u;++u)x[u]=s(x[u-2])+x[u-7]+n(x[u-15])+x[u-16]|0
var S,A,I=f,P=g,B=p,T=m,L=v,E=b,R=y,O=w
for(u=0;64>u;++u)S=O+r(L)+t(L,E,R)+c[u]+x[u],A=a(I)+i(I,P,B),O=R,R=E,E=L,L=T+S|0,T=B,B=P,P=I,I=S+A|0
f=f+I|0,g=g+P|0,p=p+B|0,m=m+T|0,v=v+L|0,b=b+E|0,y=y+R|0,w=w+O|0}return new Uint8Array([f>>24&255,f>>16&255,f>>8&255,255&f,g>>24&255,g>>16&255,g>>8&255,255&g,p>>24&255,p>>16&255,p>>8&255,255&p,m>>24&255,m>>16&255,m>>8&255,255&m,v>>24&255,v>>16&255,v>>8&255,255&v,b>>24&255,b>>16&255,b>>8&255,255&b,y>>24&255,y>>16&255,y>>8&255,255&y,w>>24&255,w>>16&255,w>>8&255,255&w])}var c=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]
return o}(),k=function(){function e(e,t,i,a,r){e.assign(t),e.and(i),r.assign(t),r.not(),r.and(a),e.xor(r)}function t(e,t,i,a,r){e.assign(t),e.and(i),r.assign(t),r.and(a),e.xor(r),r.assign(i),r.and(a),e.xor(r)}function i(e,t,i){e.assign(t),e.rotateRight(28),i.assign(t),i.rotateRight(34),e.xor(i),i.assign(t),i.rotateRight(39),e.xor(i)}function a(e,t,i){e.assign(t),e.rotateRight(14),i.assign(t),i.rotateRight(18),e.xor(i),i.assign(t),i.rotateRight(41),e.xor(i)}function r(e,t,i){e.assign(t),e.rotateRight(1),i.assign(t),i.rotateRight(8),e.xor(i),i.assign(t),i.shiftRight(7),e.xor(i)}function n(e,t,i){e.assign(t),e.rotateRight(19),i.assign(t),i.rotateRight(61),e.xor(i),i.assign(t),i.shiftRight(6),e.xor(i)}function s(s,c,l,h){h=!!h
var u,d,f,g,p,m,v,b
h?(u=new y(3418070365,3238371032),d=new y(1654270250,914150663),f=new y(2438529370,812702999),g=new y(355462360,4144912697),p=new y(1731405415,4290775857),m=new y(2394180231,1750603025),v=new y(3675008525,1694076839),b=new y(1203062813,3204075428)):(u=new y(1779033703,4089235720),d=new y(3144134277,2227873595),f=new y(1013904242,4271175723),g=new y(2773480762,1595750129),p=new y(1359893119,2917565137),m=new y(2600822924,725511199),v=new y(528734635,4215389547),b=new y(1541459225,327033209))
var w,k,C,x=128*Math.ceil((l+17)/128),S=new Uint8Array(x)
for(w=0;l>w;++w)S[w]=s[c++]
for(S[w++]=128,C=x-16;C>w;)S[w++]=0
S[w++]=0,S[w++]=0,S[w++]=0,S[w++]=0,S[w++]=0,S[w++]=0,S[w++]=0,S[w++]=0,S[w++]=0,S[w++]=0,S[w++]=0,S[w++]=l>>>29&255,S[w++]=l>>21&255,S[w++]=l>>13&255,S[w++]=l>>5&255,S[w++]=l<<3&255
var A=Array(80)
for(w=0;80>w;w++)A[w]=new y(0,0)
var I,P=new y(0,0),B=new y(0,0),T=new y(0,0),L=new y(0,0),E=new y(0,0),R=new y(0,0),O=new y(0,0),M=new y(0,0),D=new y(0,0),F=new y(0,0),N=new y(0,0),j=new y(0,0)
for(w=0;x>w;){for(k=0;16>k;++k)A[k].high=S[w]<<24|S[w+1]<<16|S[w+2]<<8|S[w+3],A[k].low=S[w+4]<<24|S[w+5]<<16|S[w+6]<<8|S[w+7],w+=8
for(k=16;80>k;++k)I=A[k],n(I,A[k-2],j),I.add(A[k-7]),r(N,A[k-15],j),I.add(N),I.add(A[k-16])
for(P.assign(u),B.assign(d),T.assign(f),L.assign(g),E.assign(p),R.assign(m),O.assign(v),M.assign(b),k=0;80>k;++k)D.assign(M),a(N,E,j),D.add(N),e(N,E,R,O,j),D.add(N),D.add(o[k]),D.add(A[k]),i(F,P,j),t(N,P,B,T,j),F.add(N),I=M,M=O,O=R,R=E,L.add(D),E=L,L=T,T=B,B=P,I.assign(D),I.add(F),P=I
u.add(P),d.add(B),f.add(T),g.add(L),p.add(E),m.add(R),v.add(O),b.add(M)}var U
return h?(U=new Uint8Array(48),u.copyTo(U,0),d.copyTo(U,8),f.copyTo(U,16),g.copyTo(U,24),p.copyTo(U,32),m.copyTo(U,40)):(U=new Uint8Array(64),u.copyTo(U,0),d.copyTo(U,8),f.copyTo(U,16),g.copyTo(U,24),p.copyTo(U,32),m.copyTo(U,40),v.copyTo(U,48),b.copyTo(U,56)),U}var o=[new y(1116352408,3609767458),new y(1899447441,602891725),new y(3049323471,3964484399),new y(3921009573,2173295548),new y(961987163,4081628472),new y(1508970993,3053834265),new y(2453635748,2937671579),new y(2870763221,3664609560),new y(3624381080,2734883394),new y(310598401,1164996542),new y(607225278,1323610764),new y(1426881987,3590304994),new y(1925078388,4068182383),new y(2162078206,991336113),new y(2614888103,633803317),new y(3248222580,3479774868),new y(3835390401,2666613458),new y(4022224774,944711139),new y(264347078,2341262773),new y(604807628,2007800933),new y(770255983,1495990901),new y(1249150122,1856431235),new y(1555081692,3175218132),new y(1996064986,2198950837),new y(2554220882,3999719339),new y(2821834349,766784016),new y(2952996808,2566594879),new y(3210313671,3203337956),new y(3336571891,1034457026),new y(3584528711,2466948901),new y(113926993,3758326383),new y(338241895,168717936),new y(666307205,1188179964),new y(773529912,1546045734),new y(1294757372,1522805485),new y(1396182291,2643833823),new y(1695183700,2343527390),new y(1986661051,1014477480),new y(2177026350,1206759142),new y(2456956037,344077627),new y(2730485921,1290863460),new y(2820302411,3158454273),new y(3259730800,3505952657),new y(3345764771,106217008),new y(3516065817,3606008344),new y(3600352804,1432725776),new y(4094571909,1467031594),new y(275423344,851169720),new y(430227734,3100823752),new y(506948616,1363258195),new y(659060556,3750685593),new y(883997877,3785050280),new y(958139571,3318307427),new y(1322822218,3812723403),new y(1537002063,2003034995),new y(1747873779,3602036899),new y(1955562222,1575990012),new y(2024104815,1125592928),new y(2227730452,2716904306),new y(2361852424,442776044),new y(2428436474,593698344),new y(2756734187,3733110249),new y(3204031479,2999351573),new y(3329325298,3815920427),new y(3391569614,3928383900),new y(3515267271,566280711),new y(3940187606,3454069534),new y(4118630271,4000239992),new y(116418474,1914138554),new y(174292421,2731055270),new y(289380356,3203993006),new y(460393269,320620315),new y(685471733,587496836),new y(852142971,1086792851),new y(1017036298,365543100),new y(1126000580,2618297676),new y(1288033470,3409855158),new y(1501505948,4234509866),new y(1607167915,987167468),new y(1816402316,1246189591)]
return s}(),C=function(){function e(e,t,i){return k(e,t,i,!0)}return e}(),x=function(){function e(){}return e.prototype={decryptBlock:function(e){return e}},e}(),S=function(){function e(e){var t=176,i=new Uint8Array(t)
i.set(e)
for(var a=16,r=1;t>a;++r){var o=i[a-3],c=i[a-2],l=i[a-1],h=i[a-4]
o=s[o],c=s[c],l=s[l],h=s[h],o^=n[r]
for(var u=0;4>u;++u)i[a]=o^=i[a-16],a++,i[a]=c^=i[a-16],a++,i[a]=l^=i[a-16],a++,i[a]=h^=i[a-16],a++}return i}function t(e,t){var i=new Uint8Array(16)
i.set(e)
var a,r,n,s,c,l
for(r=0,n=160;16>r;++r,++n)i[r]^=t[n]
for(a=9;a>=1;--a){for(s=i[13],i[13]=i[9],i[9]=i[5],i[5]=i[1],i[1]=s,s=i[14],c=i[10],i[14]=i[6],i[10]=i[2],i[6]=s,i[2]=c,s=i[15],c=i[11],l=i[7],i[15]=i[3],i[11]=s,i[7]=c,i[3]=l,r=0;16>r;++r)i[r]=o[i[r]]
for(r=0,n=16*a;16>r;++r,++n)i[r]^=t[n]
for(r=0;16>r;r+=4){var u=h[i[r]],d=h[i[r+1]],f=h[i[r+2]],g=h[i[r+3]]
s=u^d>>>8^d<<24^f>>>16^f<<16^g>>>24^g<<8,i[r]=s>>>24&255,i[r+1]=s>>16&255,i[r+2]=s>>8&255,i[r+3]=255&s}}for(s=i[13],i[13]=i[9],i[9]=i[5],i[5]=i[1],i[1]=s,s=i[14],c=i[10],i[14]=i[6],i[10]=i[2],i[6]=s,i[2]=c,s=i[15],c=i[11],l=i[7],i[15]=i[3],i[11]=s,i[7]=c,i[3]=l,r=0;16>r;++r)i[r]=o[i[r]],i[r]^=t[r]
return i}function i(e,t){var i,a,r,n,o=new Uint8Array(16)
for(o.set(e),h=0;16>h;++h)o[h]^=t[h]
for(l=1;10>l;l++){for(h=0;16>h;++h)o[h]=s[o[h]]
r=o[1],o[1]=o[5],o[5]=o[9],o[9]=o[13],o[13]=r,r=o[2],a=o[6],o[2]=o[10],o[6]=o[14],o[10]=r,o[14]=a,r=o[3],a=o[7],i=o[11],o[3]=o[15],o[7]=r,o[11]=a,o[15]=i
for(var h=0;16>h;h+=4){var u=o[h+0],d=o[h+1],f=o[h+2],g=o[h+3]
i=u^d^f^g,o[h+0]^=i^c[u^d],o[h+1]^=i^c[d^f],o[h+2]^=i^c[f^g],o[h+3]^=i^c[g^u]}for(h=0,n=16*l;16>h;++h,++n)o[h]^=t[n]}for(h=0;16>h;++h)o[h]=s[o[h]]
for(r=o[1],o[1]=o[5],o[5]=o[9],o[9]=o[13],o[13]=r,r=o[2],a=o[6],o[2]=o[10],o[6]=o[14],o[10]=r,o[14]=a,r=o[3],a=o[7],i=o[11],o[3]=o[15],o[7]=r,o[11]=a,o[15]=i,h=0,n=160;16>h;++h,++n)o[h]^=t[n]
return o}function a(t){this.key=e(t),this.buffer=new Uint8Array(16),this.bufferPosition=0}function r(e,i){var a,r,n,s=e.length,o=this.buffer,c=this.bufferPosition,l=[],h=this.iv
for(a=0;s>a;++a)if(o[c]=e[a],++c,!(16>c)){var u=t(o,this.key)
for(r=0;16>r;++r)u[r]^=h[r]
h=o,l.push(u),o=new Uint8Array(16),c=0}if(this.buffer=o,this.bufferLength=c,this.iv=h,0===l.length)return new Uint8Array([])
var d=16*l.length
if(i){var f=l[l.length-1],g=f[15]
if(16>=g){for(a=15,n=16-g;a>=n;--a)if(f[a]!==g){g=0
break}d-=g,l[l.length-1]=f.subarray(0,16-g)}}var p=new Uint8Array(d)
for(a=0,r=0,n=l.length;n>a;++a,r+=16)p.set(l[a],r)
return p}for(var n=new Uint8Array([141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141]),s=new Uint8Array([99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22]),o=new Uint8Array([82,9,106,213,48,54,165,56,191,64,163,158,129,243,215,251,124,227,57,130,155,47,255,135,52,142,67,68,196,222,233,203,84,123,148,50,166,194,35,61,238,76,149,11,66,250,195,78,8,46,161,102,40,217,36,178,118,91,162,73,109,139,209,37,114,248,246,100,134,104,152,22,212,164,92,204,93,101,182,146,108,112,72,80,253,237,185,218,94,21,70,87,167,141,157,132,144,216,171,0,140,188,211,10,247,228,88,5,184,179,69,6,208,44,30,143,202,63,15,2,193,175,189,3,1,19,138,107,58,145,17,65,79,103,220,234,151,242,207,206,240,180,230,115,150,172,116,34,231,173,53,133,226,249,55,232,28,117,223,110,71,241,26,113,29,41,197,137,111,183,98,14,170,24,190,27,252,86,62,75,198,210,121,32,154,219,192,254,120,205,90,244,31,221,168,51,136,7,199,49,177,18,16,89,39,128,236,95,96,81,127,169,25,181,74,13,45,229,122,159,147,201,156,239,160,224,59,77,174,42,245,176,200,235,187,60,131,83,153,97,23,43,4,126,186,119,214,38,225,105,20,99,85,33,12,125]),c=new Uint8Array(256),l=0;256>l;l++)128>l?c[l]=l<<1:c[l]=l<<1^27
var h=new Uint32Array([0,235474187,470948374,303765277,941896748,908933415,607530554,708780849,1883793496,2118214995,1817866830,1649639237,1215061108,1181045119,1417561698,1517767529,3767586992,4003061179,4236429990,4069246893,3635733660,3602770327,3299278474,3400528769,2430122216,2664543715,2362090238,2193862645,2835123396,2801107407,3035535058,3135740889,3678124923,3576870512,3341394285,3374361702,3810496343,3977675356,4279080257,4043610186,2876494627,2776292904,3076639029,3110650942,2472011535,2640243204,2403728665,2169303058,1001089995,899835584,666464733,699432150,59727847,226906860,530400753,294930682,1273168787,1172967064,1475418501,1509430414,1942435775,2110667444,1876241833,1641816226,2910219766,2743034109,2976151520,3211623147,2505202138,2606453969,2302690252,2269728455,3711829422,3543599269,3240894392,3475313331,3843699074,3943906441,4178062228,4144047775,1306967366,1139781709,1374988112,1610459739,1975683434,2076935265,1775276924,1742315127,1034867998,866637845,566021896,800440835,92987698,193195065,429456164,395441711,1984812685,2017778566,1784663195,1683407248,1315562145,1080094634,1383856311,1551037884,101039829,135050206,437757123,337553864,1042385657,807962610,573804783,742039012,2531067453,2564033334,2328828971,2227573024,2935566865,2700099354,3001755655,3168937228,3868552805,3902563182,4203181171,4102977912,3736164937,3501741890,3265478751,3433712980,1106041591,1340463100,1576976609,1408749034,2043211483,2009195472,1708848333,1809054150,832877231,1068351396,766945465,599762354,159417987,126454664,361929877,463180190,2709260871,2943682380,3178106961,3009879386,2572697195,2538681184,2236228733,2336434550,3509871135,3745345300,3441850377,3274667266,3910161971,3877198648,4110568485,4211818798,2597806476,2497604743,2261089178,2295101073,2733856160,2902087851,3202437046,2968011453,3936291284,3835036895,4136440770,4169408201,3535486456,3702665459,3467192302,3231722213,2051518780,1951317047,1716890410,1750902305,1113818384,1282050075,1584504582,1350078989,168810852,67556463,371049330,404016761,841739592,1008918595,775550814,540080725,3969562369,3801332234,4035489047,4269907996,3569255213,3669462566,3366754619,3332740144,2631065433,2463879762,2160117071,2395588676,2767645557,2868897406,3102011747,3069049960,202008497,33778362,270040487,504459436,875451293,975658646,675039627,641025152,2084704233,1917518562,1615861247,1851332852,1147550661,1248802510,1484005843,1451044056,933301370,967311729,733156972,632953703,260388950,25965917,328671808,496906059,1206477858,1239443753,1543208500,1441952575,2144161806,1908694277,1675577880,1842759443,3610369226,3644379585,3408119516,3307916247,4011190502,3776767469,4077384432,4245618683,2809771154,2842737049,3144396420,3043140495,2673705150,2438237621,2203032232,2370213795])
return a.prototype={decryptBlock:function(e,t){var i,a=e.length,n=this.buffer,s=this.bufferPosition
for(i=0;16>s&&a>i;++i,++s)n[s]=e[i]
return 16>s?(this.bufferLength=s,new Uint8Array([])):(this.iv=n,this.buffer=new Uint8Array(16),this.bufferLength=0,this.decryptBlock=r,this.decryptBlock(e.subarray(16),t))},encrypt:function(e,t){var a,r,n,s=e.length,o=this.buffer,c=this.bufferPosition,l=[]
for(t||(t=new Uint8Array(16)),a=0;s>a;++a)if(o[c]=e[a],++c,!(16>c)){for(r=0;16>r;++r)o[r]^=t[r]
var h=i(o,this.key)
t=h,l.push(h),o=new Uint8Array(16),c=0}if(this.buffer=o,this.bufferLength=c,this.iv=t,0===l.length)return new Uint8Array([])
var u=16*l.length,d=new Uint8Array(u)
for(a=0,r=0,n=l.length;n>a;++a,r+=16)d.set(l[a],r)
return d}},a}(),A=function(){function e(e){var t=240,i=new Uint8Array(t),a=1
i.set(e)
for(var r=32,s=1;t>r;++s){if(r%32===16)o=n[o],c=n[c],l=n[l],h=n[h]
else if(r%32===0){var o=i[r-3],c=i[r-2],l=i[r-1],h=i[r-4]
o=n[o],c=n[c],l=n[l],h=n[h],o^=a,(a<<=1)>=256&&(a=255&(27^a))}for(var u=0;4>u;++u)i[r]=o^=i[r-32],r++,i[r]=c^=i[r-32],r++,i[r]=l^=i[r-32],r++,i[r]=h^=i[r-32],r++}return i}function t(e,t){var i=new Uint8Array(16)
i.set(e)
var a,r,n,o,c,h
for(r=0,n=224;16>r;++r,++n)i[r]^=t[n]
for(a=13;a>=1;--a){for(o=i[13],i[13]=i[9],i[9]=i[5],i[5]=i[1],i[1]=o,o=i[14],c=i[10],i[14]=i[6],i[10]=i[2],i[6]=o,i[2]=c,o=i[15],c=i[11],h=i[7],i[15]=i[3],i[11]=o,i[7]=c,i[3]=h,r=0;16>r;++r)i[r]=s[i[r]]
for(r=0,n=16*a;16>r;++r,++n)i[r]^=t[n]
for(r=0;16>r;r+=4){var u=l[i[r]],d=l[i[r+1]],f=l[i[r+2]],g=l[i[r+3]]
o=u^d>>>8^d<<24^f>>>16^f<<16^g>>>24^g<<8,i[r]=o>>>24&255,i[r+1]=o>>16&255,i[r+2]=o>>8&255,i[r+3]=255&o}}for(o=i[13],i[13]=i[9],i[9]=i[5],i[5]=i[1],i[1]=o,o=i[14],c=i[10],i[14]=i[6],i[10]=i[2],i[6]=o,i[2]=c,o=i[15],c=i[11],h=i[7],i[15]=i[3],i[11]=o,i[7]=c,i[3]=h,r=0;16>r;++r)i[r]=s[i[r]],i[r]^=t[r]
return i}function i(e,t){var i,a,r,s,l=new Uint8Array(16)
for(l.set(e),h=0;16>h;++h)l[h]^=t[h]
for(c=1;14>c;c++){for(h=0;16>h;++h)l[h]=n[l[h]]
r=l[1],l[1]=l[5],l[5]=l[9],l[9]=l[13],l[13]=r,r=l[2],a=l[6],l[2]=l[10],l[6]=l[14],l[10]=r,l[14]=a,r=l[3],a=l[7],i=l[11],l[3]=l[15],l[7]=r,l[11]=a,l[15]=i
for(var h=0;16>h;h+=4){var u=l[h+0],d=l[h+1],f=l[h+2],g=l[h+3]
i=u^d^f^g,l[h+0]^=i^o[u^d],l[h+1]^=i^o[d^f],l[h+2]^=i^o[f^g],l[h+3]^=i^o[g^u]}for(h=0,s=16*c;16>h;++h,++s)l[h]^=t[s]}for(h=0;16>h;++h)l[h]=n[l[h]]
for(r=l[1],l[1]=l[5],l[5]=l[9],l[9]=l[13],l[13]=r,r=l[2],a=l[6],l[2]=l[10],l[6]=l[14],l[10]=r,l[14]=a,r=l[3],a=l[7],i=l[11],l[3]=l[15],l[7]=r,l[11]=a,l[15]=i,h=0,s=224;16>h;++h,++s)l[h]^=t[s]
return l}function a(t){this.key=e(t),this.buffer=new Uint8Array(16),this.bufferPosition=0}function r(e,i){var a,r,n,s=e.length,o=this.buffer,c=this.bufferPosition,l=[],h=this.iv
for(a=0;s>a;++a)if(o[c]=e[a],++c,!(16>c)){var u=t(o,this.key)
for(r=0;16>r;++r)u[r]^=h[r]
h=o,l.push(u),o=new Uint8Array(16),c=0}if(this.buffer=o,this.bufferLength=c,this.iv=h,0===l.length)return new Uint8Array([])
var d=16*l.length
if(i){var f=l[l.length-1],g=f[15]
if(16>=g){for(a=15,n=16-g;a>=n;--a)if(f[a]!==g){g=0
break}d-=g,l[l.length-1]=f.subarray(0,16-g)}}var p=new Uint8Array(d)
for(a=0,r=0,n=l.length;n>a;++a,r+=16)p.set(l[a],r)
return p}for(var n=(new Uint8Array([141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141]),new Uint8Array([99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22])),s=new Uint8Array([82,9,106,213,48,54,165,56,191,64,163,158,129,243,215,251,124,227,57,130,155,47,255,135,52,142,67,68,196,222,233,203,84,123,148,50,166,194,35,61,238,76,149,11,66,250,195,78,8,46,161,102,40,217,36,178,118,91,162,73,109,139,209,37,114,248,246,100,134,104,152,22,212,164,92,204,93,101,182,146,108,112,72,80,253,237,185,218,94,21,70,87,167,141,157,132,144,216,171,0,140,188,211,10,247,228,88,5,184,179,69,6,208,44,30,143,202,63,15,2,193,175,189,3,1,19,138,107,58,145,17,65,79,103,220,234,151,242,207,206,240,180,230,115,150,172,116,34,231,173,53,133,226,249,55,232,28,117,223,110,71,241,26,113,29,41,197,137,111,183,98,14,170,24,190,27,252,86,62,75,198,210,121,32,154,219,192,254,120,205,90,244,31,221,168,51,136,7,199,49,177,18,16,89,39,128,236,95,96,81,127,169,25,181,74,13,45,229,122,159,147,201,156,239,160,224,59,77,174,42,245,176,200,235,187,60,131,83,153,97,23,43,4,126,186,119,214,38,225,105,20,99,85,33,12,125]),o=new Uint8Array(256),c=0;256>c;c++)128>c?o[c]=c<<1:o[c]=c<<1^27
var l=new Uint32Array([0,235474187,470948374,303765277,941896748,908933415,607530554,708780849,1883793496,2118214995,1817866830,1649639237,1215061108,1181045119,1417561698,1517767529,3767586992,4003061179,4236429990,4069246893,3635733660,3602770327,3299278474,3400528769,2430122216,2664543715,2362090238,2193862645,2835123396,2801107407,3035535058,3135740889,3678124923,3576870512,3341394285,3374361702,3810496343,3977675356,4279080257,4043610186,2876494627,2776292904,3076639029,3110650942,2472011535,2640243204,2403728665,2169303058,1001089995,899835584,666464733,699432150,59727847,226906860,530400753,294930682,1273168787,1172967064,1475418501,1509430414,1942435775,2110667444,1876241833,1641816226,2910219766,2743034109,2976151520,3211623147,2505202138,2606453969,2302690252,2269728455,3711829422,3543599269,3240894392,3475313331,3843699074,3943906441,4178062228,4144047775,1306967366,1139781709,1374988112,1610459739,1975683434,2076935265,1775276924,1742315127,1034867998,866637845,566021896,800440835,92987698,193195065,429456164,395441711,1984812685,2017778566,1784663195,1683407248,1315562145,1080094634,1383856311,1551037884,101039829,135050206,437757123,337553864,1042385657,807962610,573804783,742039012,2531067453,2564033334,2328828971,2227573024,2935566865,2700099354,3001755655,3168937228,3868552805,3902563182,4203181171,4102977912,3736164937,3501741890,3265478751,3433712980,1106041591,1340463100,1576976609,1408749034,2043211483,2009195472,1708848333,1809054150,832877231,1068351396,766945465,599762354,159417987,126454664,361929877,463180190,2709260871,2943682380,3178106961,3009879386,2572697195,2538681184,2236228733,2336434550,3509871135,3745345300,3441850377,3274667266,3910161971,3877198648,4110568485,4211818798,2597806476,2497604743,2261089178,2295101073,2733856160,2902087851,3202437046,2968011453,3936291284,3835036895,4136440770,4169408201,3535486456,3702665459,3467192302,3231722213,2051518780,1951317047,1716890410,1750902305,1113818384,1282050075,1584504582,1350078989,168810852,67556463,371049330,404016761,841739592,1008918595,775550814,540080725,3969562369,3801332234,4035489047,4269907996,3569255213,3669462566,3366754619,3332740144,2631065433,2463879762,2160117071,2395588676,2767645557,2868897406,3102011747,3069049960,202008497,33778362,270040487,504459436,875451293,975658646,675039627,641025152,2084704233,1917518562,1615861247,1851332852,1147550661,1248802510,1484005843,1451044056,933301370,967311729,733156972,632953703,260388950,25965917,328671808,496906059,1206477858,1239443753,1543208500,1441952575,2144161806,1908694277,1675577880,1842759443,3610369226,3644379585,3408119516,3307916247,4011190502,3776767469,4077384432,4245618683,2809771154,2842737049,3144396420,3043140495,2673705150,2438237621,2203032232,2370213795])
return a.prototype={decryptBlock:function(e,t,i){var a,n=e.length,s=this.buffer,o=this.bufferPosition
if(i)this.iv=i
else{for(a=0;16>o&&n>a;++a,++o)s[o]=e[a]
if(16>o)return this.bufferLength=o,new Uint8Array([])
this.iv=s,e=e.subarray(16)}return this.buffer=new Uint8Array(16),this.bufferLength=0,this.decryptBlock=r,this.decryptBlock(e,t)},encrypt:function(e,t){var a,r,n,s=e.length,o=this.buffer,c=this.bufferPosition,l=[]
for(t||(t=new Uint8Array(16)),a=0;s>a;++a)if(o[c]=e[a],++c,!(16>c)){for(r=0;16>r;++r)o[r]^=t[r]
var h=i(o,this.key)
this.iv=h,l.push(h),o=new Uint8Array(16),c=0}if(this.buffer=o,this.bufferLength=c,this.iv=t,0===l.length)return new Uint8Array([])
var u=16*l.length,d=new Uint8Array(u)
for(a=0,r=0,n=l.length;n>a;++a,r+=16)d.set(l[a],r)
return d}},a}(),I=function(){function e(e,t){if(e.length!==t.length)return!1
for(var i=0;i<e.length;i++)if(e[i]!==t[i])return!1
return!0}function t(){}return t.prototype={checkOwnerPassword:function(t,i,a,r){var n=new Uint8Array(t.length+56)
n.set(t,0),n.set(i,t.length),n.set(a,t.length+i.length)
var s=w(n,0,n.length)
return e(s,r)},checkUserPassword:function(t,i,a){var r=new Uint8Array(t.length+8)
r.set(t,0),r.set(i,t.length)
var n=w(r,0,r.length)
return e(n,a)},getOwnerKey:function(e,t,i,a){var r=new Uint8Array(e.length+56)
r.set(e,0),r.set(t,e.length),r.set(i,e.length+t.length)
var n=w(r,0,r.length),s=new A(n)
return s.decryptBlock(a,!1,new Uint8Array(16))},getUserKey:function(e,t,i){var a=new Uint8Array(e.length+8)
a.set(e,0),a.set(t,e.length)
var r=w(a,0,a.length),n=new A(r)
return n.decryptBlock(i,!1,new Uint8Array(16))}},t}(),P=function(){function e(e,t){var i=new Uint8Array(e.length+t.length)
return i.set(e,0),i.set(t,e.length),i}function t(t,i,a){for(var r=w(i,0,i.length).subarray(0,32),n=[0],s=0;64>s||n[n.length-1]>s-32;){var o=t.length+r.length+a.length,c=new Uint8Array(64*o),l=e(t,r)
l=e(l,a)
for(var h=0,u=0;64>h;h++,u+=o)c.set(l,u)
var d=new S(r.subarray(0,16))
n=d.encrypt(c,r.subarray(16,32))
for(var f=0,g=0;16>g;g++)f*=1,f%=3,f+=(n[g]>>>0)%3,f%=3
0===f?r=w(n,0,n.length):1===f?r=C(n,0,n.length):2===f&&(r=k(n,0,n.length)),s++}return r.subarray(0,32)}function i(){}function a(e,t){if(e.length!==t.length)return!1
for(var i=0;i<e.length;i++)if(e[i]!==t[i])return!1
return!0}return i.prototype={hash:function(e,i,a){return t(e,i,a)},checkOwnerPassword:function(e,i,r,n){var s=new Uint8Array(e.length+56)
s.set(e,0),s.set(i,e.length),s.set(r,e.length+i.length)
var o=t(e,s,r)
return a(o,n)},checkUserPassword:function(e,i,r){var n=new Uint8Array(e.length+8)
n.set(e,0),n.set(i,e.length)
var s=t(e,n,[])
return a(s,r)},getOwnerKey:function(e,i,a,r){var n=new Uint8Array(e.length+56)
n.set(e,0),n.set(i,e.length),n.set(a,e.length+i.length)
var s=t(e,n,a),o=new A(s)
return o.decryptBlock(r,!1,new Uint8Array(16))},getUserKey:function(e,i,a){var r=new Uint8Array(e.length+8)
r.set(e,0),r.set(i,e.length)
var n=t(e,r,[]),s=new A(n)
return s.decryptBlock(a,!1,new Uint8Array(16))}},i}(),B=function(){function e(e,t){this.StringCipherConstructor=e,this.StreamCipherConstructor=t}return e.prototype={createStream:function(e,t){var i=new this.StreamCipherConstructor
return new m(e,t,function(e,t){return i.decryptBlock(e,t)})},decryptString:function(e){var t=new this.StringCipherConstructor,i=u(e)
return i=t.decryptBlock(i,!0),s(i)}},e}(),T=function(){function e(e,t,i,a,r,n,s,o,c,l,h,u){if(t){var d=Math.min(127,t.length)
t=t.subarray(0,d)}else t=[]
var f
return f=6===e?new P:new I,f.checkUserPassword(t,o,s)?f.getUserKey(t,c,h):t.length&&f.checkOwnerPassword(t,a,n,i)?f.getOwnerKey(t,r,n,l):null}function t(e,t,i,a,r,n,s,o){var c,l,h=40+i.length+e.length,u=new Uint8Array(h),d=0
if(t)for(l=Math.min(32,t.length);l>d;++d)u[d]=t[d]
for(c=0;32>d;)u[d++]=y[c++]
for(c=0,l=i.length;l>c;++c)u[d++]=i[c]
for(u[d++]=255&r,u[d++]=r>>8&255,u[d++]=r>>16&255,u[d++]=r>>>24&255,c=0,l=e.length;l>c;++c)u[d++]=e[c]
n>=4&&!o&&(u[d++]=255,u[d++]=255,u[d++]=255,u[d++]=255)
var f=b(u,0,d),g=s>>3
if(n>=3)for(c=0;50>c;++c)f=b(f,0,g)
var p,m,w=f.subarray(0,g)
if(n>=3){for(d=0;32>d;++d)u[d]=y[d]
for(c=0,l=e.length;l>c;++c)u[d++]=e[c]
p=new v(w),m=p.encryptBlock(b(u,0,d)),l=w.length
var k,C=new Uint8Array(l)
for(c=1;19>=c;++c){for(k=0;l>k;++k)C[k]=w[k]^c
p=new v(C),m=p.encryptBlock(m)}for(c=0,l=m.length;l>c;++c)if(a[c]!==m[c])return null}else for(p=new v(w),m=p.encryptBlock(y),c=0,l=m.length;l>c;++c)if(a[c]!==m[c])return null
return w}function i(e,t,i,a){var r,n,s=new Uint8Array(32),o=0
for(n=Math.min(32,e.length);n>o;++o)s[o]=e[o]
for(r=0;32>o;)s[o++]=y[r++]
var c=b(s,0,o),l=a>>3
if(i>=3)for(r=0;50>r;++r)c=b(c,0,c.length)
var h,u
if(i>=3){u=t
var d,f=new Uint8Array(l)
for(r=19;r>=0;r--){for(d=0;l>d;++d)f[d]=c[d]^r
h=new v(f),u=h.encryptBlock(u)}}else h=new v(c.subarray(0,l)),u=h.encryptBlock(t)
return u}function a(a,s,l){var f=a.get("Filter")
g(f,"Standard")||c("unknown encryption method"),this.dict=a
var m=a.get("V");(!h(m)||1!==m&&2!==m&&4!==m&&5!==m)&&c("unsupported encryption algorithm"),this.algorithm=m
var v=a.get("Length")
if(!v)if(3>=m)v=40
else{var b=a.get("CF"),y=a.get("StmF")
if(p(b)&&g(y)){b.suppressEncryption=!0
var k=b.get(y.name)
v=k&&k.get("Length")||128,40>v&&(v<<=3)}}(!h(v)||40>v||v%8!==0)&&c("invalid key length")
var C=u(a.get("O")).subarray(0,32),x=u(a.get("U")).subarray(0,32),S=a.get("P"),A=a.get("R"),I=(4===m||5===m)&&a.get("EncryptMetadata")!==!1
this.encryptMetadata=I
var P,B=u(s)
if(l){if(6===A)try{l=d(l)}catch(T){o("CipherTransformFactory: Unable to convert UTF8 encoded password.")}P=u(l)}var L
if(5!==m)L=t(B,P,C,x,S,A,v,I)
else{var E=u(a.get("O")).subarray(32,40),R=u(a.get("O")).subarray(40,48),O=u(a.get("U")).subarray(0,48),M=u(a.get("U")).subarray(32,40),D=u(a.get("U")).subarray(40,48),F=u(a.get("OE")),N=u(a.get("UE")),j=u(a.get("Perms"))
L=e(A,P,C,E,R,O,x,M,D,F,N,j)}if(!L&&!l)throw new r("No password given",n.NEED_PASSWORD)
if(!L&&l){var U=i(P,C,A,v)
L=t(B,U,C,x,S,A,v,I)}if(!L)throw new r("Incorrect Password",n.INCORRECT_PASSWORD)
if(this.encryptionKey=L,m>=4){var _=a.get("CF")
p(_)&&(_.suppressEncryption=!0),this.cf=_,this.stmf=a.get("StmF")||w,this.strf=a.get("StrF")||w,this.eff=a.get("EFF")||this.stmf}}function s(e,t,i,a){var r,n,s=new Uint8Array(i.length+9)
for(r=0,n=i.length;n>r;++r)s[r]=i[r]
s[r++]=255&e,s[r++]=e>>8&255,s[r++]=e>>16&255,s[r++]=255&t,s[r++]=t>>8&255,a&&(s[r++]=115,s[r++]=65,s[r++]=108,s[r++]=84)
var o=b(s,0,r)
return o.subarray(0,Math.min(i.length+5,16))}function m(e,t,i,a,r){l(g(t),"Invalid crypt filter name.")
var n,o=e.get(t.name)
return null!==o&&void 0!==o&&(n=o.get("CFM")),n&&"None"!==n.name?"V2"===n.name?function(){return new v(s(i,a,r,!1))}:"AESV2"===n.name?function(){return new S(s(i,a,r,!0))}:"AESV3"===n.name?function(){return new A(r)}:void c("Unknown crypto method"):function(){return new x}}var y=new Uint8Array([40,191,78,94,78,117,138,65,100,0,78,86,255,250,1,8,46,46,0,182,208,104,62,128,47,12,169,254,100,83,105,122]),w=f.get("Identity")
return a.prototype={createCipherTransform:function(e,t){if(4===this.algorithm||5===this.algorithm)return new B(m(this.cf,this.stmf,e,t,this.encryptionKey),m(this.cf,this.strf,e,t,this.encryptionKey))
var i=s(e,t,this.encryptionKey,!1),a=function(){return new v(i)}
return new B(a,a)}},a}()
e.AES128Cipher=S,e.AES256Cipher=A,e.ARCFourCipher=v,e.CipherTransformFactory=T,e.PDF17=I,e.PDF20=P,e.calculateMD5=b,e.calculateSHA256=w,e.calculateSHA384=C,e.calculateSHA512=k}),function(e,t){t(e.pdfjsCoreFontRenderer={},e.pdfjsSharedUtil,e.pdfjsCoreStream,e.pdfjsCoreGlyphList,e.pdfjsCoreEncodings,e.pdfjsCoreCFFParser)}(this,function(e,t,i,a,r,n){var s=t.Util,o=t.bytesToString,c=t.error,l=i.Stream,h=a.getGlyphsUnicode,u=r.StandardEncoding,d=n.CFFParser,f=function(){function e(e,t){return e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3]}function t(e,t){return e[t]<<8|e[t+1]}function i(i,a,r){var n,s,o,l,h=1===t(i,a+2)?e(i,a+8):e(i,a+16),u=t(i,a+h)
if(4===u){n=t(i,a+h+2)
var d=t(i,a+h+6)>>1
for(o=a+h+14,s=[],l=0;d>l;l++,o+=2)s[l]={end:t(i,o)}
for(o+=2,l=0;d>l;l++,o+=2)s[l].start=t(i,o)
for(l=0;d>l;l++,o+=2)s[l].idDelta=t(i,o)
for(l=0;d>l;l++,o+=2){var f=t(i,o)
if(0!==f){s[l].ids=[]
for(var g=0,p=s[l].end-s[l].start+1;p>g;g++)s[l].ids[g]=t(i,o+f),f+=2}}return s}if(12===u){n=e(i,a+h+4)
var m=e(i,a+h+12)
for(o=a+h+16,s=[],l=0;m>l;l++)s.push({start:e(i,o),end:e(i,o+4),idDelta:e(i,o+8)-e(i,o)}),o+=12
return s}c("not supported cmap: "+u)}function a(e,t,i,a){var r={},n=new d(new l(e,t,i-t),r,a),s=n.parse()
return{glyphs:s.charStrings.objects,subrs:s.topDict.privateDict&&s.topDict.privateDict.subrsIndex&&s.topDict.privateDict.subrsIndex.objects,gsubrs:s.globalSubrIndex&&s.globalSubrIndex.objects}}function r(e,t,i){var a,r
i?(a=4,r=function(e,t){return e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3]}):(a=2,r=function(e,t){return e[t]<<9|e[t+1]<<1})
for(var n=[],s=r(t,0),o=a;o<t.length;o+=a){var c=r(t,o)
n.push(e.subarray(s,c)),s=c}return n}function n(e,t){for(var i=t.charCodeAt(0),a=0,r=0,n=e.length-1;n>r;){var s=r+n+1>>1
i<e[s].start?n=s-1:r=s}return e[r].start<=i&&i<=e[r].end&&(a=e[r].idDelta+(e[r].ids?e[r].ids[i-e[r].start]:i)&65535),{charCode:i,glyphId:a}}function f(e,t,i){function a(e,i){t.push({cmd:"moveTo",args:[e,i]})}function r(e,i){t.push({cmd:"lineTo",args:[e,i]})}function n(e,i,a,r){t.push({cmd:"quadraticCurveTo",args:[e,i,a,r]})}var s,o=0,c=(e[o]<<24|e[o+1]<<16)>>16,l=0,h=0
if(o+=10,0>c){do{s=e[o]<<8|e[o+1]
var u=e[o+2]<<8|e[o+3]
o+=4
var d,g
1&s?(d=(e[o]<<24|e[o+1]<<16)>>16,g=(e[o+2]<<24|e[o+3]<<16)>>16,o+=4):(d=e[o++],g=e[o++]),2&s?(l=d,h=g):(l=0,h=0)
var p=1,m=1,v=0,b=0
8&s?(p=m=(e[o]<<24|e[o+1]<<16)/1073741824,o+=2):64&s?(p=(e[o]<<24|e[o+1]<<16)/1073741824,m=(e[o+2]<<24|e[o+3]<<16)/1073741824,o+=4):128&s&&(p=(e[o]<<24|e[o+1]<<16)/1073741824,v=(e[o+2]<<24|e[o+3]<<16)/1073741824,b=(e[o+4]<<24|e[o+5]<<16)/1073741824,m=(e[o+6]<<24|e[o+7]<<16)/1073741824,o+=8)
var y=i.glyphs[u]
y&&(t.push({cmd:"save"}),t.push({cmd:"transform",args:[p,v,b,m,l,h]}),f(y,t,i),t.push({cmd:"restore"}))}while(32&s)}else{var w,k,C=[]
for(w=0;c>w;w++)C.push(e[o]<<8|e[o+1]),o+=2
var x=e[o]<<8|e[o+1]
o+=2+x
for(var S=C[C.length-1]+1,A=[];A.length<S;){s=e[o++]
var I=1
for(8&s&&(I+=e[o++]);I-- >0;)A.push({flags:s})}for(w=0;S>w;w++){switch(18&A[w].flags){case 0:l+=(e[o]<<24|e[o+1]<<16)>>16,o+=2
break
case 2:l-=e[o++]
break
case 18:l+=e[o++]}A[w].x=l}for(w=0;S>w;w++){switch(36&A[w].flags){case 0:h+=(e[o]<<24|e[o+1]<<16)>>16,o+=2
break
case 4:h-=e[o++]
break
case 36:h+=e[o++]}A[w].y=h}var P=0
for(o=0;c>o;o++){var B=C[o],T=A.slice(P,B+1)
if(1&T[0].flags)T.push(T[0])
else if(1&T[T.length-1].flags)T.unshift(T[T.length-1])
else{var L={flags:1,x:(T[0].x+T[T.length-1].x)/2,y:(T[0].y+T[T.length-1].y)/2}
T.unshift(L),T.push(L)}for(a(T[0].x,T[0].y),w=1,k=T.length;k>w;w++)1&T[w].flags?r(T[w].x,T[w].y):1&T[w+1].flags?(n(T[w].x,T[w].y,T[w+1].x,T[w+1].y),w++):n(T[w].x,T[w].y,(T[w].x+T[w+1].x)/2,(T[w].y+T[w+1].y)/2)
P=B+1}}}function g(e,t,i){function a(e,i){t.push({cmd:"moveTo",args:[e,i]})}function r(e,i){t.push({cmd:"lineTo",args:[e,i]})}function s(e,i,a,r,n,s){t.push({cmd:"bezierCurveTo",args:[e,i,a,r,n,s]})}function o(e){for(var p=0;p<e.length;){var m,v,b,y,w,k,C,x,S,A=!1,I=e[p++]
switch(I){case 1:f+=l.length>>1,A=!0
break
case 3:f+=l.length>>1,A=!0
break
case 4:d+=l.pop(),a(h,d),A=!0
break
case 5:for(;l.length>0;)h+=l.shift(),d+=l.shift(),r(h,d)
break
case 6:for(;l.length>0&&(h+=l.shift(),r(h,d),0!==l.length);)d+=l.shift(),r(h,d)
break
case 7:for(;l.length>0&&(d+=l.shift(),r(h,d),0!==l.length);)h+=l.shift(),r(h,d)
break
case 8:for(;l.length>0;)m=h+l.shift(),b=d+l.shift(),v=m+l.shift(),y=b+l.shift(),h=v+l.shift(),d=y+l.shift(),s(m,b,v,y,h,d)
break
case 10:x=l.pop()+i.subrsBias,S=i.subrs[x],S&&o(S)
break
case 11:return
case 12:switch(I=e[p++]){case 34:m=h+l.shift(),v=m+l.shift(),w=d+l.shift(),h=v+l.shift(),s(m,d,v,w,h,w),m=h+l.shift(),v=m+l.shift(),h=v+l.shift(),s(m,w,v,d,h,d)
break
case 35:m=h+l.shift(),b=d+l.shift(),v=m+l.shift(),y=b+l.shift(),h=v+l.shift(),d=y+l.shift(),s(m,b,v,y,h,d),m=h+l.shift(),b=d+l.shift(),v=m+l.shift(),y=b+l.shift(),h=v+l.shift(),d=y+l.shift(),s(m,b,v,y,h,d),l.pop()
break
case 36:m=h+l.shift(),w=d+l.shift(),v=m+l.shift(),k=w+l.shift(),h=v+l.shift(),s(m,w,v,k,h,k),m=h+l.shift(),v=m+l.shift(),C=k+l.shift(),h=v+l.shift(),s(m,k,v,C,h,d)
break
case 37:var P=h,B=d
m=h+l.shift(),b=d+l.shift(),v=m+l.shift(),y=b+l.shift(),h=v+l.shift(),d=y+l.shift(),s(m,b,v,y,h,d),m=h+l.shift(),b=d+l.shift(),v=m+l.shift(),y=b+l.shift(),h=v,d=y,Math.abs(h-P)>Math.abs(d-B)?h+=l.shift():d+=l.shift(),s(m,b,v,y,h,d)
break
default:c("unknown operator: 12 "+I)}break
case 14:if(l.length>=4){var T=l.pop(),L=l.pop()
d=l.pop(),h=l.pop(),t.push({cmd:"save"}),t.push({cmd:"translate",args:[h,d]})
var E=n(i.cmap,String.fromCharCode(i.glyphNameMap[u[T]]))
g(i.glyphs[E.glyphId],t,i),t.push({cmd:"restore"}),E=n(i.cmap,String.fromCharCode(i.glyphNameMap[u[L]])),g(i.glyphs[E.glyphId],t,i)}return
case 18:f+=l.length>>1,A=!0
break
case 19:f+=l.length>>1,p+=f+7>>3,A=!0
break
case 20:f+=l.length>>1,p+=f+7>>3,A=!0
break
case 21:d+=l.pop(),h+=l.pop(),a(h,d),A=!0
break
case 22:h+=l.pop(),a(h,d),A=!0
break
case 23:f+=l.length>>1,A=!0
break
case 24:for(;l.length>2;)m=h+l.shift(),b=d+l.shift(),v=m+l.shift(),y=b+l.shift(),h=v+l.shift(),d=y+l.shift(),s(m,b,v,y,h,d)
h+=l.shift(),d+=l.shift(),r(h,d)
break
case 25:for(;l.length>6;)h+=l.shift(),d+=l.shift(),r(h,d)
m=h+l.shift(),b=d+l.shift(),v=m+l.shift(),y=b+l.shift(),h=v+l.shift(),d=y+l.shift(),s(m,b,v,y,h,d)
break
case 26:for(l.length%2&&(h+=l.shift());l.length>0;)m=h,b=d+l.shift(),v=m+l.shift(),y=b+l.shift(),h=v,d=y+l.shift(),s(m,b,v,y,h,d)
break
case 27:for(l.length%2&&(d+=l.shift());l.length>0;)m=h+l.shift(),b=d,v=m+l.shift(),y=b+l.shift(),h=v+l.shift(),d=y,s(m,b,v,y,h,d)
break
case 28:l.push((e[p]<<24|e[p+1]<<16)>>16),p+=2
break
case 29:x=l.pop()+i.gsubrsBias,S=i.gsubrs[x],S&&o(S)
break
case 30:for(;l.length>0&&(m=h,b=d+l.shift(),v=m+l.shift(),y=b+l.shift(),h=v+l.shift(),d=y+(1===l.length?l.shift():0),s(m,b,v,y,h,d),0!==l.length);)m=h+l.shift(),b=d,v=m+l.shift(),y=b+l.shift(),d=y+l.shift(),h=v+(1===l.length?l.shift():0),s(m,b,v,y,h,d)
break
case 31:for(;l.length>0&&(m=h+l.shift(),b=d,v=m+l.shift(),y=b+l.shift(),d=y+l.shift(),h=v+(1===l.length?l.shift():0),s(m,b,v,y,h,d),0!==l.length);)m=h,b=d+l.shift(),v=m+l.shift(),y=b+l.shift(),h=v+l.shift(),d=y+(1===l.length?l.shift():0),s(m,b,v,y,h,d)
break
default:32>I&&c("unknown operator: "+I),247>I?l.push(I-139):251>I?l.push(256*(I-247)+e[p++]+108):255>I?l.push(256*-(I-251)-e[p++]-108):(l.push((e[p]<<24|e[p+1]<<16|e[p+2]<<8|e[p+3])/65536),p+=4)}A&&(l.length=0)}}var l=[],h=0,d=0,f=0
o(e)}function p(e){this.compiledGlyphs=Object.create(null),this.compiledCharCodeToGlyphId=Object.create(null),this.fontMatrix=e}function m(e,t,i){i=i||[488e-6,0,0,488e-6,0,0],p.call(this,i),this.glyphs=e,this.cmap=t}function v(e,t,i,a){i=i||[.001,0,0,.001,0,0],p.call(this,i),this.glyphs=e.glyphs,this.gsubrs=e.gsubrs||[],this.subrs=e.subrs||[],this.cmap=t,this.glyphNameMap=a||h(),this.gsubrsBias=this.gsubrs.length<1240?107:this.gsubrs.length<33900?1131:32768,this.subrsBias=this.subrs.length<1240?107:this.subrs.length<33900?1131:32768}var b=""
return p.prototype={getPathJs:function(e){var t=n(this.cmap,e),i=this.compiledGlyphs[t.glyphId]
return i||(i=this.compileGlyph(this.glyphs[t.glyphId]),this.compiledGlyphs[t.glyphId]=i),void 0===this.compiledCharCodeToGlyphId[t.charCode]&&(this.compiledCharCodeToGlyphId[t.charCode]=t.glyphId),i},compileGlyph:function(e){if(!e||0===e.length||14===e[0])return b
var t=[]
return t.push({cmd:"save"}),t.push({cmd:"transform",args:this.fontMatrix.slice()}),t.push({cmd:"scale",args:["size","-size"]}),this.compileGlyphImpl(e,t),t.push({cmd:"restore"}),t},compileGlyphImpl:function(){c("Children classes should implement this.")},hasBuiltPath:function(e){var t=n(this.cmap,e)
return void 0!==this.compiledGlyphs[t.glyphId]&&void 0!==this.compiledCharCodeToGlyphId[t.charCode]}},s.inherit(m,p,{compileGlyphImpl:function(e,t){f(e,t,this)}}),s.inherit(v,p,{compileGlyphImpl:function(e,t){g(e,t,this)}}),{create:function(n,s){for(var c,l,h,u,d,f,g=new Uint8Array(n.data),p=t(g,4),b=0,y=12;p>b;b++,y+=16){var w=o(g.subarray(y,y+4)),k=e(g,y+8),C=e(g,y+12)
switch(w){case"cmap":c=i(g,k,k+C)
break
case"glyf":l=g.subarray(k,k+C)
break
case"loca":h=g.subarray(k,k+C)
break
case"head":f=t(g,k+18),d=t(g,k+50)
break
case"CFF ":u=a(g,k,k+C,s)}}if(l){var x=f?[1/f,0,0,1/f,0,0]:n.fontMatrix
return new m(r(l,h,d),c,x)}return new v(u,c,n.fontMatrix,n.glyphNameMap)}}}()
e.FontRendererFactory=f}),function(e,t){t(e.pdfjsCoreParser={},e.pdfjsSharedUtil,e.pdfjsCorePrimitives,e.pdfjsCoreStream)}(this,function(e,t,i,a){function r(e){return e===O}var n=t.MissingDataException,s=t.StreamType,o=t.assert,c=t.error,l=t.info,h=t.isArray,u=t.isInt,d=t.isNum,f=t.isString,g=t.warn,p=i.Cmd,m=i.Dict,v=i.Name,b=i.Ref,y=i.isCmd,w=i.isDict,k=i.isName,C=a.Ascii85Stream,x=a.AsciiHexStream,S=a.CCITTFaxStream,A=a.FlateStream,I=a.Jbig2Stream,P=a.JpegStream,B=a.JpxStream,T=a.LZWStream,L=a.NullStream,E=a.PredictorStream,R=a.RunLengthStream,O={},M=1e3,D=function(){function e(e,t,i,a){this.lexer=e,this.allowStreams=t,this.xref=i,this.recoveryMode=a||!1,this.imageCache=Object.create(null),this.refill()}return e.prototype={refill:function(){this.buf1=this.lexer.getObj(),this.buf2=this.lexer.getObj()},shift:function(){y(this.buf2,"ID")?(this.buf1=this.buf2,this.buf2=null):(this.buf1=this.buf2,this.buf2=this.lexer.getObj())},tryShift:function(){try{return this.shift(),!0}catch(e){if(e instanceof n)throw e
return!1}},getObj:function(e){var t=this.buf1
if(this.shift(),t instanceof p)switch(t.cmd){case"BI":return this.makeInlineImage(e)
case"[":for(var i=[];!y(this.buf1,"]")&&!r(this.buf1);)i.push(this.getObj(e))
return r(this.buf1)?(this.recoveryMode||c("End of file inside array"),i):(this.shift(),i)
case"<<":for(var a=new m(this.xref);!y(this.buf1,">>")&&!r(this.buf1);)if(k(this.buf1)){var n=this.buf1.name
if(this.shift(),r(this.buf1))break
a.set(n,this.getObj(e))}else l("Malformed dictionary: key must be a name object"),this.shift()
return r(this.buf1)?(this.recoveryMode||c("End of file inside dictionary"),a):y(this.buf2,"stream")?this.allowStreams?this.makeStream(a,e):a:(this.shift(),a)
default:return t}if(u(t)){var s=t
if(u(this.buf1)&&y(this.buf2,"R")){var o=new b(s,this.buf1)
return this.shift(),this.shift(),o}return s}if(f(t)){var h=t
return e&&(h=e.decryptString(h)),h}return t},findDefaultInlineStreamEnd:function(e){for(var t,i,a,r,n=69,s=73,c=32,l=10,h=13,u=e.pos,d=0;-1!==(t=e.getByte());)if(0===d)d=t===n?1:0
else if(1===d)d=t===s?2:0
else if(o(2===d),t===c||t===l||t===h){for(a=5,r=e.peekBytes(a),i=0;a>i;i++)if(t=r[i],t!==l&&t!==h&&(c>t||t>127)){d=0
break}if(2===d)break}else d=0
return e.pos-4-u},findDCTDecodeInlineStreamEnd:function(e){for(var t,i,a,r=e.pos,n=!1;-1!==(t=e.getByte());)if(255===t){switch(e.getByte()){case 0:break
case 255:e.skip(-1)
break
case 217:n=!0
break
case 192:case 193:case 194:case 195:case 197:case 198:case 199:case 201:case 202:case 203:case 205:case 206:case 207:case 196:case 204:case 218:case 219:case 220:case 221:case 222:case 223:case 224:case 225:case 226:case 227:case 228:case 229:case 230:case 231:case 232:case 233:case 234:case 235:case 236:case 237:case 238:case 239:case 254:i=e.getUint16(),i>2?e.skip(i-2):e.skip(-2)}if(n)break}return a=e.pos-r,-1===t?(g("Inline DCTDecode image stream: EOI marker not found, searching for /EI/ instead."),e.skip(-a),this.findDefaultInlineStreamEnd(e)):(this.inlineStreamSkipEI(e),a)},findASCII85DecodeInlineStreamEnd:function(e){for(var t,i,a=126,r=62,n=e.pos;-1!==(t=e.getByte());)if(t===a&&e.peekByte()===r){e.skip()
break}return i=e.pos-n,-1===t?(g("Inline ASCII85Decode image stream: EOD marker not found, searching for /EI/ instead."),e.skip(-i),this.findDefaultInlineStreamEnd(e)):(this.inlineStreamSkipEI(e),i)},findASCIIHexDecodeInlineStreamEnd:function(e){for(var t,i,a=62,r=e.pos;-1!==(t=e.getByte())&&t!==a;);return i=e.pos-r,-1===t?(g("Inline ASCIIHexDecode image stream: EOD marker not found, searching for /EI/ instead."),e.skip(-i),this.findDefaultInlineStreamEnd(e)):(this.inlineStreamSkipEI(e),i)},inlineStreamSkipEI:function(e){for(var t,i=69,a=73,r=0;-1!==(t=e.getByte());)if(0===r)r=t===i?1:0
else if(1===r)r=t===a?2:0
else if(2===r)break},makeInlineImage:function(e){for(var t=this.lexer,i=t.stream,a=new m(this.xref);!y(this.buf1,"ID")&&!r(this.buf1);){k(this.buf1)||c("Dictionary key must be a name object")
var n=this.buf1.name
if(this.shift(),r(this.buf1))break
a.set(n,this.getObj(e))}var s,o=a.get("Filter","F")
if(k(o))s=o.name
else if(h(o)){var l=this.xref.fetchIfRef(o[0])
k(l)&&(s=l.name)}var u,d,f,g=i.pos
u="DCTDecode"===s||"DCT"===s?this.findDCTDecodeInlineStreamEnd(i):"ASCII85Decide"===s||"A85"===s?this.findASCII85DecodeInlineStreamEnd(i):"ASCIIHexDecode"===s||"AHx"===s?this.findASCIIHexDecodeInlineStreamEnd(i):this.findDefaultInlineStreamEnd(i)
var v,b=i.makeSubStream(g,u,a)
if(M>u){var w=b.getBytes()
b.reset()
var C=1,x=0
for(d=0,f=w.length;f>d;++d)C+=255&w[d],x+=C
if(v=x%65521<<16|C%65521,this.imageCache.adler32===v)return this.buf2=p.get("EI"),this.shift(),this.imageCache[v].reset(),this.imageCache[v]}return e&&(b=e.createStream(b,u)),b=this.filter(b,a,u),b.dict=a,void 0!==v&&(b.cacheKey="inline_"+u+"_"+v,this.imageCache[v]=b),this.buf2=p.get("EI"),this.shift(),b},makeStream:function(e,t){var i=this.lexer,a=i.stream
i.skipToNextLine()
var r=a.pos-1,n=e.get("Length")
if(u(n)||(l("Bad "+n+" attribute in stream"),n=0),a.pos=r+n,i.nextChar(),this.tryShift()&&y(this.buf2,"endstream"))this.shift()
else{a.pos=r
for(var s,o,h=2048,d=9,f=[101,110,100,115,116,114,101,97,109],g=0,p=!1;a.pos<a.end;){var m=a.peekBytes(h),v=m.length-d
if(0>=v)break
for(p=!1,s=0;v>s;){for(o=0;d>o&&m[s+o]===f[o];)o++
if(o>=d){p=!0
break}s++}if(p){g+=s,a.pos+=s
break}g+=v,a.pos+=v}p||c("Missing endstream"),n=g,i.nextChar(),this.shift(),this.shift()}return this.shift(),a=a.makeSubStream(r,n,e),t&&(a=t.createStream(a,n)),a=this.filter(a,e,n),a.dict=e,a},filter:function(e,t,i){var a=t.get("Filter","F"),r=t.get("DecodeParms","DP")
if(k(a))return h(r)&&(r=this.xref.fetchIfRef(r[0])),this.makeFilter(e,a.name,i,r)
var n=i
if(h(a))for(var s=a,o=r,l=0,u=s.length;u>l;++l)a=this.xref.fetchIfRef(s[l]),k(a)||c("Bad filter name: "+a),r=null,h(o)&&l in o&&(r=this.xref.fetchIfRef(o[l])),e=this.makeFilter(e,a.name,n,r),n=null
return e},makeFilter:function(e,t,i,a){if(0===i)return g('Empty "'+t+'" stream.'),new L(e)
try{var r=this.xref.stats.streamTypes
if("FlateDecode"===t||"Fl"===t)return r[s.FLATE]=!0,a?new E(new A(e,i),i,a):new A(e,i)
if("LZWDecode"===t||"LZW"===t){r[s.LZW]=!0
var o=1
return a?(a.has("EarlyChange")&&(o=a.get("EarlyChange")),new E(new T(e,i,o),i,a)):new T(e,i,o)}return"DCTDecode"===t||"DCT"===t?(r[s.DCT]=!0,new P(e,i,e.dict,a)):"JPXDecode"===t||"JPX"===t?(r[s.JPX]=!0,new B(e,i,e.dict,a)):"ASCII85Decode"===t||"A85"===t?(r[s.A85]=!0,new C(e,i)):"ASCIIHexDecode"===t||"AHx"===t?(r[s.AHX]=!0,new x(e,i)):"CCITTFaxDecode"===t||"CCF"===t?(r[s.CCF]=!0,new S(e,i,a)):"RunLengthDecode"===t||"RL"===t?(r[s.RL]=!0,new R(e,i)):"JBIG2Decode"===t?(r[s.JBIG]=!0,new I(e,i,e.dict,a)):(g('filter "'+t+'" not supported yet'),e)}catch(c){if(c instanceof n)throw c
return g('Invalid stream: "'+c+'"'),new L(e)}}},e}(),F=function(){function e(e,t){this.stream=e,this.nextChar(),this.strBuf=[],this.knownCommands=t}function t(e){return e>=48&&57>=e?15&e:e>=65&&70>=e||e>=97&&102>=e?(15&e)+9:-1}var i=[1,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,2,0,0,2,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
return e.prototype={nextChar:function(){return this.currentChar=this.stream.getByte()},peekChar:function(){return this.stream.peekByte()},getNumber:function(){var e=this.currentChar,t=!1,i=0,a=1
if(45===e?(a=-1,e=this.nextChar(),45===e&&(e=this.nextChar())):43===e&&(e=this.nextChar()),46===e&&(i=10,e=this.nextChar()),48>e||e>57)return c("Invalid number: "+String.fromCharCode(e)),0
for(var r=e-48,n=0,s=1;(e=this.nextChar())>=0;)if(e>=48&&57>=e){var o=e-48
t?n=10*n+o:(0!==i&&(i*=10),r=10*r+o)}else if(46===e){if(0!==i)break
i=1}else if(45===e)g("Badly formatted number")
else{if(69!==e&&101!==e)break
if(e=this.peekChar(),43===e||45===e)s=45===e?-1:1,this.nextChar()
else if(48>e||e>57)break
t=!0}return 0!==i&&(r/=i),t&&(r*=Math.pow(10,s*n)),a*r},getString:function(){var e=1,t=!1,i=this.strBuf
i.length=0
for(var a=this.nextChar();;){var r=!1
switch(0|a){case-1:g("Unterminated string"),t=!0
break
case 40:++e,i.push("(")
break
case 41:0===--e?(this.nextChar(),t=!0):i.push(")")
break
case 92:switch(a=this.nextChar()){case-1:g("Unterminated string"),t=!0
break
case 110:i.push("\n")
break
case 114:i.push("\r")
break
case 116:i.push("	")
break
case 98:i.push("\b")
break
case 102:i.push("\f")
break
case 92:case 40:case 41:i.push(String.fromCharCode(a))
break
case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:var n=15&a
a=this.nextChar(),r=!0,a>=48&&55>=a&&(n=(n<<3)+(15&a),a=this.nextChar(),a>=48&&55>=a&&(r=!1,n=(n<<3)+(15&a))),i.push(String.fromCharCode(n))
break
case 13:10===this.peekChar()&&this.nextChar()
break
case 10:break
default:i.push(String.fromCharCode(a))}break
default:i.push(String.fromCharCode(a))}if(t)break
r||(a=this.nextChar())}return i.join("")},getName:function(){var e,a,r=this.strBuf
for(r.length=0;(e=this.nextChar())>=0&&!i[e];)if(35===e){if(e=this.nextChar(),i[e]){g("Lexer_getName: NUMBER SIGN (#) should be followed by a hexadecimal number."),r.push("#")
break}var n=t(e)
if(-1!==n){a=e,e=this.nextChar()
var s=t(e)
if(-1===s){if(g("Lexer_getName: Illegal digit ("+String.fromCharCode(e)+") in hexadecimal number."),r.push("#",String.fromCharCode(a)),i[e])break
r.push(String.fromCharCode(e))
continue}r.push(String.fromCharCode(n<<4|s))}else r.push("#",String.fromCharCode(e))}else r.push(String.fromCharCode(e))
return r.length>127&&g("name token is longer than allowed by the spec: "+r.length),v.get(r.join(""))},getHexString:function(){var e=this.strBuf
e.length=0
for(var a,r,n=this.currentChar,s=!0;;){if(0>n){g("Unterminated hex string")
break}if(62===n){this.nextChar()
break}if(1!==i[n]){if(s){if(a=t(n),-1===a){g('Ignoring invalid character "'+n+'" in hex string'),n=this.nextChar()
continue}}else{if(r=t(n),-1===r){g('Ignoring invalid character "'+n+'" in hex string'),n=this.nextChar()
continue}e.push(String.fromCharCode(a<<4|r))}s=!s,n=this.nextChar()}else n=this.nextChar()}return e.join("")},getObj:function(){for(var e=!1,t=this.currentChar;;){if(0>t)return O
if(e)(10===t||13===t)&&(e=!1)
else if(37===t)e=!0
else if(1!==i[t])break
t=this.nextChar()}switch(0|t){case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 43:case 45:case 46:return this.getNumber()
case 40:return this.getString()
case 47:return this.getName()
case 91:return this.nextChar(),p.get("[")
case 93:return this.nextChar(),p.get("]")
case 60:return t=this.nextChar(),60===t?(this.nextChar(),p.get("<<")):this.getHexString()
case 62:return t=this.nextChar(),62===t?(this.nextChar(),p.get(">>")):p.get(">")
case 123:return this.nextChar(),p.get("{")
case 125:return this.nextChar(),p.get("}")
case 41:c("Illegal character: "+t)}for(var a=String.fromCharCode(t),r=this.knownCommands,n=r&&void 0!==r[a];(t=this.nextChar())>=0&&!i[t];){var s=a+String.fromCharCode(t)
if(n&&void 0===r[s])break
128===a.length&&c("Command token too long: "+a.length),a=s,n=r&&void 0!==r[a]}return"true"===a?!0:"false"===a?!1:"null"===a?null:p.get(a)},skipToNextLine:function(){for(var e=this.currentChar;e>=0;){if(13===e){e=this.nextChar(),10===e&&this.nextChar()
break}if(10===e){this.nextChar()
break}e=this.nextChar()}}},e}(),N={create:function(e){function t(e,t){var i=l.get(e)
if(u(i)&&(t?i>=0:i>0))return i
throw Error('The "'+e+'" parameter in the linearization dictionary is invalid.')}function i(){var e,t,i=l.get("H")
if(h(i)&&(2===(e=i.length)||4===e)){for(var a=0;e>a;a++)if(!(u(t=i[a])&&t>0))throw Error("Hint ("+a+") in the linearization dictionary is invalid.")
return i}throw Error("Hint array in the linearization dictionary is invalid.")}var a,r,n=new D(new F(e),!1,null),s=n.getObj(),o=n.getObj(),c=n.getObj(),l=n.getObj()
if(!(u(s)&&u(o)&&y(c,"obj")&&w(l)&&d(a=l.get("Linearized"))&&a>0))return null
if((r=t("L"))!==e.length)throw Error('The "L" parameter in the linearization dictionary does not equal the stream length.')
return{length:r,hints:i(),objectNumberFirst:t("O"),endFirst:t("E"),numPages:t("N"),mainXRefEntriesOffset:t("T"),pageFirst:l.has("P")?t("P",!0):0}}}
e.EOF=O,e.Lexer=F,e.Linearization=N,e.Parser=D,e.isEOF=r}),function(e,t){t(e.pdfjsCoreType1Parser={},e.pdfjsSharedUtil,e.pdfjsCoreStream,e.pdfjsCoreEncodings)}(this,function(e,t,i,a){var r=t.warn,n=t.isSpace,s=i.Stream,o=a.getEncoding,c=!1,l=function(){function e(){this.width=0,this.lsb=0,this.flexing=!1,this.output=[],this.stack=[]}var t={hstem:[1],vstem:[3],vmoveto:[4],rlineto:[5],hlineto:[6],vlineto:[7],rrcurveto:[8],callsubr:[10],flex:[12,35],drop:[12,18],endchar:[14],rmoveto:[21],hmoveto:[22],vhcurveto:[30],hvcurveto:[31]}
return e.prototype={convert:function(e,i,a){for(var n,s,o,l=e.length,h=!1,u=0;l>u;u++){var d=e[u]
if(32>d){switch(12===d&&(d=(d<<8)+e[++u]),d){case 1:if(!c){this.stack=[]
break}h=this.executeCommand(2,t.hstem)
break
case 3:if(!c){this.stack=[]
break}h=this.executeCommand(2,t.vstem)
break
case 4:if(this.flexing){if(this.stack.length<1){h=!0
break}var f=this.stack.pop()
this.stack.push(0,f)
break}h=this.executeCommand(1,t.vmoveto)
break
case 5:h=this.executeCommand(2,t.rlineto)
break
case 6:h=this.executeCommand(1,t.hlineto)
break
case 7:h=this.executeCommand(1,t.vlineto)
break
case 8:h=this.executeCommand(6,t.rrcurveto)
break
case 9:this.stack=[]
break
case 10:if(this.stack.length<1){h=!0
break}o=this.stack.pop(),h=this.convert(i[o],i,a)
break
case 11:return h
case 13:if(this.stack.length<2){h=!0
break}n=this.stack.pop(),s=this.stack.pop(),this.lsb=s,this.width=n,this.stack.push(n,s),h=this.executeCommand(2,t.hmoveto)
break
case 14:this.output.push(t.endchar[0])
break
case 21:if(this.flexing)break
h=this.executeCommand(2,t.rmoveto)
break
case 22:if(this.flexing){this.stack.push(0)
break}h=this.executeCommand(1,t.hmoveto)
break
case 30:h=this.executeCommand(4,t.vhcurveto)
break
case 31:h=this.executeCommand(4,t.hvcurveto)
break
case 3072:this.stack=[]
break
case 3073:if(!c){this.stack=[]
break}h=this.executeCommand(2,t.vstem)
break
case 3074:if(!c){this.stack=[]
break}h=this.executeCommand(2,t.hstem)
break
case 3078:a?(this.seac=this.stack.splice(-4,4),h=this.executeCommand(0,t.endchar)):h=this.executeCommand(4,t.endchar)
break
case 3079:if(this.stack.length<4){h=!0
break}this.stack.pop()
n=this.stack.pop()
var g=this.stack.pop()
s=this.stack.pop(),this.lsb=s,this.width=n,this.stack.push(n,s,g),h=this.executeCommand(3,t.rmoveto)
break
case 3084:if(this.stack.length<2){h=!0
break}var p=this.stack.pop(),m=this.stack.pop()
this.stack.push(m/p)
break
case 3088:if(this.stack.length<2){h=!0
break}o=this.stack.pop()
var v=this.stack.pop()
if(0===o&&3===v){var b=this.stack.splice(this.stack.length-17,17)
this.stack.push(b[2]+b[0],b[3]+b[1],b[4],b[5],b[6],b[7],b[8],b[9],b[10],b[11],b[12],b[13],b[14]),h=this.executeCommand(13,t.flex,!0),this.flexing=!1,this.stack.push(b[15],b[16])}else 1===o&&0===v&&(this.flexing=!0)
break
case 3089:break
case 3105:this.stack=[]
break
default:r('Unknown type 1 charstring command of "'+d+'"')}if(h)break}else 246>=d?d-=139:d=250>=d?256*(d-247)+e[++u]+108:254>=d?-(256*(d-251))-e[++u]-108:(255&e[++u])<<24|(255&e[++u])<<16|(255&e[++u])<<8|(255&e[++u])<<0,this.stack.push(d)}return h},executeCommand:function(e,t,i){var a=this.stack.length
if(e>a)return!0
for(var r=a-e,n=r;a>n;n++){var s=this.stack[n]
s===(0|s)?this.output.push(28,s>>8&255,255&s):(s=65536*s|0,this.output.push(255,s>>24&255,s>>16&255,s>>8&255,255&s))}return this.output.push.apply(this.output,t),i?this.stack.splice(r,e):this.stack.length=0,!1}},e}(),h=function(){function e(e){return e>=48&&57>=e||e>=65&&70>=e||e>=97&&102>=e}function t(e,t,i){if(i>=e.length)return new Uint8Array(0)
var a,r,n=0|t,s=52845,o=22719
for(a=0;i>a;a++)n=(e[a]+n)*s+o&65535
var c=e.length-i,l=new Uint8Array(c)
for(a=i,r=0;c>r;a++,r++){var h=e[a]
l[r]=h^n>>8,n=(h+n)*s+o&65535}return l}function i(t,i,a){var r,n,s=0|i,o=52845,c=22719,l=t.length,h=l>>>1,u=new Uint8Array(h)
for(r=0,n=0;l>r;r++){var d=t[r]
if(e(d)){r++
for(var f;l>r&&!e(f=t[r]);)r++
if(l>r){var g=parseInt(String.fromCharCode(d,f),16)
u[n++]=g^s>>8,s=(g+s)*o+c&65535}}}return Array.prototype.slice.call(u,a,n)}function a(e){return 47===e||91===e||93===e||123===e||125===e||40===e||41===e}function r(a,r,n){if(r){var o=a.getBytes(),c=!(e(o[0])&&e(o[1])&&e(o[2])&&e(o[3]))
a=new s(c?t(o,h,4):i(o,h,4))}this.seacAnalysisEnabled=!!n,this.stream=a,this.nextChar()}var h=55665,u=4330
return r.prototype={readNumberArray:function(){this.getToken()
for(var e=[];;){var t=this.getToken()
if(null===t||"]"===t||"}"===t)break
e.push(parseFloat(t||0))}return e},readNumber:function(){var e=this.getToken()
return parseFloat(e||0)},readInt:function(){var e=this.getToken()
return 0|parseInt(e||0,10)},readBoolean:function(){var e=this.getToken()
return"true"===e?1:0},nextChar:function(){return this.currentChar=this.stream.getByte()},getToken:function(){for(var e=!1,t=this.currentChar;;){if(-1===t)return null
if(e)(10===t||13===t)&&(e=!1)
else if(37===t)e=!0
else if(!n(t))break
t=this.nextChar()}if(a(t))return this.nextChar(),String.fromCharCode(t)
var i=""
do i+=String.fromCharCode(t),t=this.nextChar()
while(t>=0&&!n(t)&&!a(t))
return i},extractFontProgram:function(){var e=this.stream,i=[],a=[],r=Object.create(null)
r.lenIV=4
for(var n,s,o,h,d,f={subrs:[],charstrings:[],properties:{privateData:r}};null!==(n=this.getToken());)if("/"===n)switch(n=this.getToken()){case"CharStrings":for(this.getToken(),this.getToken(),this.getToken(),this.getToken();;){if(n=this.getToken(),null===n||"end"===n)break
if("/"===n){var g=this.getToken()
s=this.readInt(),this.getToken(),o=e.makeSubStream(e.pos,s),h=f.properties.privateData.lenIV,d=t(o.getBytes(),u,h),e.skip(s),this.nextChar(),n=this.getToken(),"noaccess"===n&&this.getToken(),a.push({glyph:g,encoded:d})}}break
case"Subrs":this.readInt()
for(this.getToken();"dup"===(n=this.getToken());){var p=this.readInt()
s=this.readInt(),this.getToken(),o=e.makeSubStream(e.pos,s),h=f.properties.privateData.lenIV,d=t(o.getBytes(),u,h),e.skip(s),this.nextChar(),n=this.getToken(),"noaccess"===n&&this.getToken(),i[p]=d}break
case"BlueValues":case"OtherBlues":case"FamilyBlues":case"FamilyOtherBlues":var m=this.readNumberArray()
m.length>0&&m.length%2===0&&c&&(f.properties.privateData[n]=m)
break
case"StemSnapH":case"StemSnapV":f.properties.privateData[n]=this.readNumberArray()
break
case"StdHW":case"StdVW":f.properties.privateData[n]=this.readNumberArray()[0]
break
case"BlueShift":case"lenIV":case"BlueFuzz":case"BlueScale":case"LanguageGroup":case"ExpansionFactor":f.properties.privateData[n]=this.readNumber()
break
case"ForceBold":f.properties.privateData[n]=this.readBoolean()}for(var v=0;v<a.length;v++){g=a[v].glyph,d=a[v].encoded
var b=new l,y=b.convert(d,i,this.seacAnalysisEnabled),w=b.output
y&&(w=[14]),f.charstrings.push({glyphName:g,charstring:w,width:b.width,lsb:b.lsb,seac:b.seac})}return f},extractFontHeader:function(e){for(var t;null!==(t=this.getToken());)if("/"===t)switch(t=this.getToken()){case"FontMatrix":var i=this.readNumberArray()
e.fontMatrix=i
break
case"Encoding":var a,r=this.getToken()
if(/^\d+$/.test(r)){a=[]
var n=0|parseInt(r,10)
this.getToken()
for(var s=0;n>s;s++){for(t=this.getToken();"dup"!==t&&"def"!==t;)if(t=this.getToken(),null===t)return
if("def"===t)break
var c=this.readInt()
this.getToken()
var l=this.getToken()
a[c]=l,this.getToken()}}else a=o(r)
e.builtInEncoding=a
break
case"FontBBox":var h=this.readNumberArray()
e.ascent=h[3],e.descent=h[1],e.ascentScaled=!0}}},r}()
e.Type1Parser=h}),function(e,t){t(e.pdfjsCoreCMap={},e.pdfjsSharedUtil,e.pdfjsCorePrimitives,e.pdfjsCoreStream,e.pdfjsCoreParser)}(this,function(e,t,i,a,r){var n=t.Util,s=t.assert,o=t.warn,c=t.error,l=t.isInt,h=t.isString,u=t.MissingDataException,d=i.isName,f=i.isCmd,g=i.isStream,p=a.StringStream,m=r.Lexer,v=r.isEOF,b=["Adobe-GB1-UCS2","Adobe-CNS1-UCS2","Adobe-Japan1-UCS2","Adobe-Korea1-UCS2","78-EUC-H","78-EUC-V","78-H","78-RKSJ-H","78-RKSJ-V","78-V","78ms-RKSJ-H","78ms-RKSJ-V","83pv-RKSJ-H","90ms-RKSJ-H","90ms-RKSJ-V","90msp-RKSJ-H","90msp-RKSJ-V","90pv-RKSJ-H","90pv-RKSJ-V","Add-H","Add-RKSJ-H","Add-RKSJ-V","Add-V","Adobe-CNS1-0","Adobe-CNS1-1","Adobe-CNS1-2","Adobe-CNS1-3","Adobe-CNS1-4","Adobe-CNS1-5","Adobe-CNS1-6","Adobe-GB1-0","Adobe-GB1-1","Adobe-GB1-2","Adobe-GB1-3","Adobe-GB1-4","Adobe-GB1-5","Adobe-Japan1-0","Adobe-Japan1-1","Adobe-Japan1-2","Adobe-Japan1-3","Adobe-Japan1-4","Adobe-Japan1-5","Adobe-Japan1-6","Adobe-Korea1-0","Adobe-Korea1-1","Adobe-Korea1-2","B5-H","B5-V","B5pc-H","B5pc-V","CNS-EUC-H","CNS-EUC-V","CNS1-H","CNS1-V","CNS2-H","CNS2-V","ETHK-B5-H","ETHK-B5-V","ETen-B5-H","ETen-B5-V","ETenms-B5-H","ETenms-B5-V","EUC-H","EUC-V","Ext-H","Ext-RKSJ-H","Ext-RKSJ-V","Ext-V","GB-EUC-H","GB-EUC-V","GB-H","GB-V","GBK-EUC-H","GBK-EUC-V","GBK2K-H","GBK2K-V","GBKp-EUC-H","GBKp-EUC-V","GBT-EUC-H","GBT-EUC-V","GBT-H","GBT-V","GBTpc-EUC-H","GBTpc-EUC-V","GBpc-EUC-H","GBpc-EUC-V","H","HKdla-B5-H","HKdla-B5-V","HKdlb-B5-H","HKdlb-B5-V","HKgccs-B5-H","HKgccs-B5-V","HKm314-B5-H","HKm314-B5-V","HKm471-B5-H","HKm471-B5-V","HKscs-B5-H","HKscs-B5-V","Hankaku","Hiragana","KSC-EUC-H","KSC-EUC-V","KSC-H","KSC-Johab-H","KSC-Johab-V","KSC-V","KSCms-UHC-H","KSCms-UHC-HW-H","KSCms-UHC-HW-V","KSCms-UHC-V","KSCpc-EUC-H","KSCpc-EUC-V","Katakana","NWP-H","NWP-V","RKSJ-H","RKSJ-V","Roman","UniCNS-UCS2-H","UniCNS-UCS2-V","UniCNS-UTF16-H","UniCNS-UTF16-V","UniCNS-UTF32-H","UniCNS-UTF32-V","UniCNS-UTF8-H","UniCNS-UTF8-V","UniGB-UCS2-H","UniGB-UCS2-V","UniGB-UTF16-H","UniGB-UTF16-V","UniGB-UTF32-H","UniGB-UTF32-V","UniGB-UTF8-H","UniGB-UTF8-V","UniJIS-UCS2-H","UniJIS-UCS2-HW-H","UniJIS-UCS2-HW-V","UniJIS-UCS2-V","UniJIS-UTF16-H","UniJIS-UTF16-V","UniJIS-UTF32-H","UniJIS-UTF32-V","UniJIS-UTF8-H","UniJIS-UTF8-V","UniJIS2004-UTF16-H","UniJIS2004-UTF16-V","UniJIS2004-UTF32-H","UniJIS2004-UTF32-V","UniJIS2004-UTF8-H","UniJIS2004-UTF8-V","UniJISPro-UCS2-HW-V","UniJISPro-UCS2-V","UniJISPro-UTF8-V","UniJISX0213-UTF32-H","UniJISX0213-UTF32-V","UniJISX02132004-UTF32-H","UniJISX02132004-UTF32-V","UniKS-UCS2-H","UniKS-UCS2-V","UniKS-UTF16-H","UniKS-UTF16-V","UniKS-UTF32-H","UniKS-UTF32-V","UniKS-UTF8-H","UniKS-UTF8-V","V","WP-Symbol"],y=function(){function e(e){this.codespaceRanges=[[],[],[],[]],this.numCodespaceRanges=0,this._map=[],this.name="",this.vertical=!1,this.useCMap=null,this.builtInCMap=e}return e.prototype={addCodespaceRange:function(e,t,i){this.codespaceRanges[e-1].push(t,i),this.numCodespaceRanges++},mapCidRange:function(e,t,i){for(;t>=e;)this._map[e++]=i++},mapBfRange:function(e,t,i){for(var a=i.length-1;t>=e;)this._map[e++]=i,i=i.substr(0,a)+String.fromCharCode(i.charCodeAt(a)+1)},mapBfRangeToArray:function(e,t,i){for(var a=0,r=i.length;t>=e&&r>a;)this._map[e]=i[a++],++e},mapOne:function(e,t){this._map[e]=t},lookup:function(e){return this._map[e]},contains:function(e){return void 0!==this._map[e]},forEach:function(e){var t,i=this._map,a=i.length
if(65536>=a)for(t=0;a>t;t++)void 0!==i[t]&&e(t,i[t])
else for(t in this._map)e(t,i[t])},charCodeOf:function(e){return this._map.indexOf(e)},getMap:function(){return this._map},readCharCode:function(e,t,i){for(var a=0,r=this.codespaceRanges,n=this.codespaceRanges.length,s=0;n>s;s++){a=(a<<8|e.charCodeAt(t+s))>>>0
for(var o=r[s],c=0,l=o.length;l>c;){var h=o[c++],u=o[c++]
if(a>=h&&u>=a)return i.charcode=a,void(i.length=s+1)}}i.charcode=0,i.length=1},get length(){return this._map.length},get isIdentityCMap(){if("Identity-H"!==this.name&&"Identity-V"!==this.name)return!1
if(65536!==this._map.length)return!1
for(var e=0;65536>e;e++)if(this._map[e]!==e)return!1
return!0}},e}(),w=function(){function e(e,t){y.call(this),this.vertical=e,this.addCodespaceRange(t,0,65535)}return n.inherit(e,y,{}),e.prototype={addCodespaceRange:y.prototype.addCodespaceRange,mapCidRange:function(e,t,i){c("should not call mapCidRange")},mapBfRange:function(e,t,i){c("should not call mapBfRange")},mapBfRangeToArray:function(e,t,i){c("should not call mapBfRangeToArray")},mapOne:function(e,t){c("should not call mapCidOne")},lookup:function(e){return l(e)&&65535>=e?e:void 0},contains:function(e){return l(e)&&65535>=e},forEach:function(e){for(var t=0;65535>=t;t++)e(t,t)},charCodeOf:function(e){return l(e)&&65535>=e?e:-1},getMap:function(){for(var e=Array(65536),t=0;65535>=t;t++)e[t]=t
return e},readCharCode:y.prototype.readCharCode,get length(){return 65536},get isIdentityCMap(){c("should not access .isIdentityCMap")}},e}(),k=function(){function e(e){return new Promise(function(t,i){var a=new XMLHttpRequest
a.open("GET",e,!0),a.responseType="arraybuffer",a.onreadystatechange=function(){a.readyState===XMLHttpRequest.DONE&&(!a.response||200!==a.status&&0!==a.status?i(Error("Unable to get binary cMap at: "+e)):t(new Uint8Array(a.response)))},a.send(null)})}function t(e,t){for(var i=0,a=0;t>=a;a++)i=i<<8|e[a]
return i>>>0}function i(e,t){return 1===t?String.fromCharCode(e[0],e[1]):3===t?String.fromCharCode(e[0],e[1],e[2],e[3]):String.fromCharCode.apply(null,e.subarray(0,t+1))}function a(e,t,i){for(var a=0,r=i;r>=0;r--)a+=e[r]+t[r],e[r]=255&a,a>>=8}function r(e,t){for(var i=1,a=t;a>=0&&i>0;a--)i+=e[a],e[a]=255&i,i>>=8}function n(e){this.buffer=e,this.pos=0,this.end=e.length,this.tmpBuf=new Uint8Array(u)}function o(o,l,u){return e(o).then(function(e){var o=new n(e),d=o.readByte()
l.vertical=!!(1&d)
for(var f,g,p=null,m=new Uint8Array(h),v=new Uint8Array(h),b=new Uint8Array(h),y=new Uint8Array(h),w=new Uint8Array(h);(g=o.readByte())>=0;){var k=g>>5
if(7!==k){var C=!!(16&g),x=15&g
s(h>=x+1)
var S,A=1,I=o.readNumber()
switch(k){case 0:for(o.readHex(m,x),o.readHexNumber(v,x),a(v,m,x),l.addCodespaceRange(x+1,t(m,x),t(v,x)),S=1;I>S;S++)r(v,x),o.readHexNumber(m,x),a(m,v,x),o.readHexNumber(v,x),a(v,m,x),l.addCodespaceRange(x+1,t(m,x),t(v,x))
break
case 1:for(o.readHex(m,x),o.readHexNumber(v,x),a(v,m,x),f=o.readNumber(),S=1;I>S;S++)r(v,x),o.readHexNumber(m,x),a(m,v,x),o.readHexNumber(v,x),a(v,m,x),f=o.readNumber()
break
case 2:for(o.readHex(b,x),f=o.readNumber(),l.mapOne(t(b,x),f),S=1;I>S;S++)r(b,x),C||(o.readHexNumber(w,x),a(b,w,x)),f=o.readSigned()+(f+1),l.mapOne(t(b,x),f)
break
case 3:for(o.readHex(m,x),o.readHexNumber(v,x),a(v,m,x),f=o.readNumber(),l.mapCidRange(t(m,x),t(v,x),f),S=1;I>S;S++)r(v,x),C?m.set(v):(o.readHexNumber(m,x),a(m,v,x)),o.readHexNumber(v,x),a(v,m,x),f=o.readNumber(),l.mapCidRange(t(m,x),t(v,x),f)
break
case 4:for(o.readHex(b,A),o.readHex(y,x),l.mapOne(t(b,A),i(y,x)),S=1;I>S;S++)r(b,A),C||(o.readHexNumber(w,A),a(b,w,A)),r(y,x),o.readHexSigned(w,x),a(y,w,x),l.mapOne(t(b,A),i(y,x))
break
case 5:for(o.readHex(m,A),o.readHexNumber(v,A),a(v,m,A),o.readHex(y,x),l.mapBfRange(t(m,A),t(v,A),i(y,x)),S=1;I>S;S++)r(v,A),C?m.set(v):(o.readHexNumber(m,A),a(m,v,A)),o.readHexNumber(v,A),a(v,m,A),o.readHex(y,x),l.mapBfRange(t(m,A),t(v,A),i(y,x))
break
default:c("Unknown type: "+k)}}else switch(31&g){case 0:o.readString()
break
case 1:p=o.readString()}}return p?u(p):l})}function l(){}var h=16,u=19
return n.prototype={readByte:function(){return this.pos>=this.end?-1:this.buffer[this.pos++]},readNumber:function(){var e,t=0
do{var i=this.readByte()
0>i&&c("unexpected EOF in bcmap"),e=!(128&i),t=t<<7|127&i}while(!e)
return t},readSigned:function(){var e=this.readNumber()
return 1&e?~(e>>>1):e>>>1},readHex:function(e,t){e.set(this.buffer.subarray(this.pos,this.pos+t+1)),this.pos+=t+1},readHexNumber:function(e,t){var i,a=this.tmpBuf,r=0
do{var n=this.readByte()
0>n&&c("unexpected EOF in bcmap"),i=!(128&n),a[r++]=127&n}while(!i)
for(var s=t,o=0,l=0;s>=0;){for(;8>l&&a.length>0;)o=a[--r]<<l|o,l+=7
e[s]=255&o,s--,o>>=8,l-=8}},readHexSigned:function(e,t){this.readHexNumber(e,t)
for(var i=1&e[t]?255:0,a=0,r=0;t>=r;r++)a=(1&a)<<8|e[r],e[r]=a>>1^i},readString:function(){for(var e=this.readNumber(),t="",i=0;e>i;i++)t+=String.fromCharCode(this.readNumber())
return t}},l.prototype={read:o},l}(),C=function(){function e(e){for(var t=0,i=0;i<e.length;i++)t=t<<8|e.charCodeAt(i)
return t>>>0}function t(e){h(e)||c("Malformed CMap: expected string.")}function i(e){l(e)||c("Malformed CMap: expected int.")}function a(i,a){for(;;){var r=a.getObj()
if(v(r))break
if(f(r,"endbfchar"))return
t(r)
var n=e(r)
r=a.getObj(),t(r)
var s=r
i.mapOne(n,s)}}function r(i,a){for(;;){var r=a.getObj()
if(v(r))break
if(f(r,"endbfrange"))return
t(r)
var n=e(r)
r=a.getObj(),t(r)
var s=e(r)
if(r=a.getObj(),l(r)||h(r)){var o=l(r)?String.fromCharCode(r):r
i.mapBfRange(n,s,o)}else{if(!f(r,"["))break
r=a.getObj()
for(var u=[];!f(r,"]")&&!v(r);)u.push(r),r=a.getObj()
i.mapBfRangeToArray(n,s,u)}}c("Invalid bf range.")}function n(a,r){for(;;){var n=r.getObj()
if(v(n))break
if(f(n,"endcidchar"))return
t(n)
var s=e(n)
n=r.getObj(),i(n)
var o=n
a.mapOne(s,o)}}function C(a,r){for(;;){var n=r.getObj()
if(v(n))break
if(f(n,"endcidrange"))return
t(n)
var s=e(n)
n=r.getObj(),t(n)
var o=e(n)
n=r.getObj(),i(n)
var c=n
a.mapCidRange(s,o,c)}}function x(t,i){for(;;){var a=i.getObj()
if(v(a))break
if(f(a,"endcodespacerange"))return
if(!h(a))break
var r=e(a)
if(a=i.getObj(),!h(a))break
var n=e(a)
t.addCodespaceRange(a.length,r,n)}c("Invalid codespace range.")}function S(e,t){var i=t.getObj()
l(i)&&(e.vertical=!!i)}function A(e,t){var i=t.getObj()
d(i)&&h(i.name)&&(e.name=i.name)}function I(e,t,i,s){var c,l
e:for(;;)try{var h=t.getObj()
if(v(h))break
if(d(h))"WMode"===h.name?S(e,t):"CMapName"===h.name&&A(e,t),c=h
else if(f(h))switch(h.cmd){case"endcmap":break e
case"usecmap":d(c)&&(l=c.name)
break
case"begincodespacerange":x(e,t)
break
case"beginbfchar":a(e,t)
break
case"begincidchar":n(e,t)
break
case"beginbfrange":r(e,t)
break
case"begincidrange":C(e,t)}}catch(g){if(g instanceof u)throw g
o("Invalid cMap data: "+g)
continue}return!s&&l&&(s=l),s?P(e,i,s):Promise.resolve(e)}function P(e,t,i){return T(i,t).then(function(t){if(e.useCMap=t,0===e.numCodespaceRanges){for(var i=e.useCMap.codespaceRanges,a=0;a<i.length;a++)e.codespaceRanges[a]=i[a].slice()
e.numCodespaceRanges=e.useCMap.numCodespaceRanges}return e.useCMap.forEach(function(t,i){e.contains(t)||e.mapOne(t,e.useCMap.lookup(t))}),e})}function B(e,t){var i=t.url+e+".bcmap",a=new y(!0)
return(new k).read(i,a,function(e){return P(a,t,e)})}function T(e,t){return"Identity-H"===e?Promise.resolve(new w(!1,2)):"Identity-V"===e?Promise.resolve(new w(!0,2)):-1===b.indexOf(e)?Promise.reject(Error("Unknown cMap name: "+e)):(s(t,"built-in cMap parameters are not provided"),t.packed?B(e,t):new Promise(function(i,a){var r=t.url+e,n=new XMLHttpRequest
n.onreadystatechange=function(){if(n.readyState===XMLHttpRequest.DONE)if(200===n.status||0===n.status){var e=new y(!0),s=new m(new p(n.responseText))
I(e,s,t,null).then(function(e){i(e)})}else a(Error("Unable to get cMap at: "+r))},n.open("GET",r,!0),n.send(null)}))}return{create:function(e,t,i){if(d(e))return T(e.name,t)
if(g(e)){var a=new y,r=new m(e)
return I(a,r,t,i).then(function(e){return e.isIdentityCMap?T(e.name,t):e})}return Promise.reject(Error("Encoding required."))}}}()
e.CMap=y,e.CMapFactory=C,e.IdentityCMap=w}),function(e,t){t(e.pdfjsCoreFonts={},e.pdfjsSharedUtil,e.pdfjsCorePrimitives,e.pdfjsCoreStream,e.pdfjsCoreGlyphList,e.pdfjsCoreFontRenderer,e.pdfjsCoreEncodings,e.pdfjsCoreStandardFonts,e.pdfjsCoreUnicode,e.pdfjsCoreType1Parser,e.pdfjsCoreCFFParser)}(this,function(e,t,i,a,r,n,s,o,c,l,h){function u(e){if(e.fontMatrix&&e.fontMatrix[0]!==m[0]){var t=.001/e.fontMatrix[0],i=e.widths
for(var a in i)i[a]*=t
e.defaultWidth*=t}}function d(e,t){if(!e.hasIncludedToUnicodeMap&&!(e.hasEncoding||t===e.defaultEncoding||e.toUnicode instanceof fe)){var i=[],a=R()
for(var r in t){var n=t[r],s=W(n,a);-1!==s&&(i[r]=String.fromCharCode(s))}e.toUnicode.amend(i)}}function f(e,t){switch(e){case"Type1":return"Type1C"===t?v.TYPE1C:v.TYPE1
case"CIDFontType0":return"CIDFontType0C"===t?v.CIDFONTTYPE0C:v.CIDFONTTYPE0
case"OpenType":return v.OPENTYPE
case"TrueType":return v.TRUETYPE
case"CIDFontType2":return v.CIDFONTTYPE2
case"MMType1":return v.MMTYPE1
case"Type0":return v.TYPE0
default:return v.UNKNOWN}}function g(e,t){if(void 0!==t[e])return e
var i=W(e,t)
if(-1!==i)for(var a in t)if(t[a]===i)return a
return k("Unable to recover a standard glyph name for: "+e),e}function p(e,t,i){var a,r,n,s=Object.create(null),o=!!(e.flags&le.Symbolic)
if(e.baseEncodingName)for(n=U(e.baseEncodingName),r=0;r<n.length;r++)a=i.indexOf(n[r]),a>=0?s[r]=a:s[r]=0
else if(o)for(r in t)s[r]=t[r]
else for(n=D,r=0;r<n.length;r++)a=i.indexOf(n[r]),a>=0?s[r]=a:s[r]=0
var c,l=e.differences
if(l)for(r in l){var h=l[r]
if(a=i.indexOf(h),-1===a){c||(c=R())
var u=g(h,c)
u!==h&&(a=i.indexOf(u))}a>=0?s[r]=a:s[r]=0}return s}var m=t.FONT_IDENTITY_MATRIX,v=t.FontType,b=t.assert,y=t.bytesToString,w=t.error,k=t.info,C=t.isArray,x=t.isInt,S=t.isNum,A=t.readUint32,I=t.shadow,P=t.string32,B=t.warn,T=t.MissingDataException,L=t.isSpace,E=a.Stream,R=r.getGlyphsUnicode,O=r.getDingbatsGlyphsUnicode,M=n.FontRendererFactory,D=s.StandardEncoding,F=s.MacRomanEncoding,N=s.SymbolSetEncoding,j=s.ZapfDingbatsEncoding,U=s.getEncoding,_=o.getStdFontMap,q=o.getNonStdFontMap,H=o.getGlyphMapForStandardFonts,z=o.getSupplementalGlyphMapForArialBlack,V=c.getUnicodeRangeFor,G=c.mapSpecialUnicodeValues,W=c.getUnicodeForGlyph,X=l.Type1Parser,K=h.CFFStandardStrings,Y=h.CFFParser,J=h.CFFCompiler,Z=h.CFF,Q=h.CFFHeader,$=h.CFFTopDict,ee=h.CFFPrivateDict,te=h.CFFStrings,ie=h.CFFIndex,ae=h.CFFCharset,re=57344,ne=63743,se=!1,oe=1e3,ce=!1,le={FixedPitch:1,Serif:2,Symbolic:4,Script:8,Nonsymbolic:32,Italic:64,AllCap:65536,SmallCap:131072,ForceBold:262144},he=[".notdef",".null","nonmarkingreturn","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","Adieresis","Aring","Ccedilla","Eacute","Ntilde","Odieresis","Udieresis","aacute","agrave","acircumflex","adieresis","atilde","aring","ccedilla","eacute","egrave","ecircumflex","edieresis","iacute","igrave","icircumflex","idieresis","ntilde","oacute","ograve","ocircumflex","odieresis","otilde","uacute","ugrave","ucircumflex","udieresis","dagger","degree","cent","sterling","section","bullet","paragraph","germandbls","registered","copyright","trademark","acute","dieresis","notequal","AE","Oslash","infinity","plusminus","lessequal","greaterequal","yen","mu","partialdiff","summation","product","pi","integral","ordfeminine","ordmasculine","Omega","ae","oslash","questiondown","exclamdown","logicalnot","radical","florin","approxequal","Delta","guillemotleft","guillemotright","ellipsis","nonbreakingspace","Agrave","Atilde","Otilde","OE","oe","endash","emdash","quotedblleft","quotedblright","quoteleft","quoteright","divide","lozenge","ydieresis","Ydieresis","fraction","currency","guilsinglleft","guilsinglright","fi","fl","daggerdbl","periodcentered","quotesinglbase","quotedblbase","perthousand","Acircumflex","Ecircumflex","Aacute","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Oacute","Ocircumflex","apple","Ograve","Uacute","Ucircumflex","Ugrave","dotlessi","circumflex","tilde","macron","breve","dotaccent","ring","cedilla","hungarumlaut","ogonek","caron","Lslash","lslash","Scaron","scaron","Zcaron","zcaron","brokenbar","Eth","eth","Yacute","yacute","Thorn","thorn","minus","multiply","onesuperior","twosuperior","threesuperior","onehalf","onequarter","threequarters","franc","Gbreve","gbreve","Idotaccent","Scedilla","scedilla","Cacute","cacute","Ccaron","ccaron","dcroat"],ue=function(){function e(e,t,i,a,r,n,s,o){this.fontChar=e,this.unicode=t,this.accent=i,this.width=a,this.vmetric=r,this.operatorListId=n,this.isSpace=s,this.isInFont=o}return e.prototype.matchesForCache=function(e,t,i,a,r,n,s,o){return this.fontChar===e&&this.unicode===t&&this.accent===i&&this.width===a&&this.vmetric===r&&this.operatorListId===n&&this.isSpace===s&&this.isInFont===o},e}(),de=function(){function e(e){this._map=e}return e.prototype={get length(){return this._map.length},forEach:function(e){for(var t in this._map)e(t,this._map[t].charCodeAt(0))},has:function(e){return void 0!==this._map[e]},get:function(e){return this._map[e]},charCodeOf:function(e){return this._map.indexOf(e)},amend:function(e){for(var t in e)this._map[t]=e[t]}},e}(),fe=function(){function e(e,t){this.firstChar=e,this.lastChar=t}return e.prototype={get length(){return this.lastChar+1-this.firstChar},forEach:function(e){for(var t=this.firstChar,i=this.lastChar;i>=t;t++)e(t,t)},has:function(e){return this.firstChar<=e&&e<=this.lastChar},get:function(e){return this.firstChar<=e&&e<=this.lastChar?String.fromCharCode(e):void 0},charCodeOf:function(e){return x(e)&&e>=this.firstChar&&e<=this.lastChar?e:-1},amend:function(e){w("Should not call amend()")}},e}(),ge=function(){function e(e,t,i){e[t]=i>>8&255,e[t+1]=255&i}function t(e,t,i){e[t]=i>>24&255,e[t+1]=i>>16&255,e[t+2]=i>>8&255,e[t+3]=255&i}function i(e,t,i){var a,r
if(i instanceof Uint8Array)e.set(i,t)
else if("string"==typeof i)for(a=0,r=i.length;r>a;a++)e[t++]=255&i.charCodeAt(a)
else for(a=0,r=i.length;r>a;a++)e[t++]=255&i[a]}function a(e){this.sfnt=e,this.tables=Object.create(null)}a.getSearchParams=function(e,t){for(var i=1,a=0;(i^e)>i;)i<<=1,a++
var r=i*t
return{range:r,entry:a,rangeShift:t*e-r}}
var r=12,n=16
return a.prototype={toArray:function(){var s=this.sfnt,o=this.tables,c=Object.keys(o)
c.sort()
var l,h,u,d,f,g=c.length,p=r+g*n,m=[p]
for(l=0;g>l;l++){d=o[c[l]]
var v=(d.length+3&-4)>>>0
p+=v,m.push(p)}var b=new Uint8Array(p)
for(l=0;g>l;l++)d=o[c[l]],i(b,m[l],d)
"true"===s&&(s=P(65536)),b[0]=255&s.charCodeAt(0),b[1]=255&s.charCodeAt(1),b[2]=255&s.charCodeAt(2),b[3]=255&s.charCodeAt(3),e(b,4,g)
var y=a.getSearchParams(g,16)
for(e(b,6,y.range),e(b,8,y.entry),e(b,10,y.rangeShift),p=r,l=0;g>l;l++){f=c[l],b[p]=255&f.charCodeAt(0),b[p+1]=255&f.charCodeAt(1),b[p+2]=255&f.charCodeAt(2),b[p+3]=255&f.charCodeAt(3)
var w=0
for(h=m[l],u=m[l+1];u>h;h+=4){var k=A(b,h)
w=w+k>>>0}t(b,p+4,w),t(b,p+8,m[l]),t(b,p+12,o[f].length),p+=n}return b},addTable:function(e,t){if(e in this.tables)throw Error("Table "+e+" already exists")
this.tables[e]=t}},a}(),pe=new Int32Array([0,32,127,161,173,174,1536,1920,2208,4256,6016,6144,7168,7248,8192,8208,8209,8210,8232,8240,8287,8304,9676,9677,12288,12289,43616,43648,65520,65536]),me=function(){function e(e,t,i){var a,r,n
this.name=e,this.loadedName=i.loadedName,this.isType3Font=i.isType3Font,this.sizes=[],this.missingFile=!1,this.glyphCache=Object.create(null)
var h=e.split("+")
h=h.length>1?h[1]:h[0],h=h.split(/[-,_]/g)[0],this.isSerifFont=!!(i.flags&le.Serif),this.isSymbolicFont=!!(i.flags&le.Symbolic),this.isMonospace=!!(i.flags&le.FixedPitch)
var d=i.type,g=i.subtype
if(this.type=d,this.fallbackName=this.isMonospace?"monospace":this.isSerifFont?"serif":"sans-serif",this.differences=i.differences,this.widths=i.widths,this.defaultWidth=i.defaultWidth,this.composite=i.composite,this.wideChars=i.wideChars,this.cMap=i.cMap,this.ascent=i.ascent/oe,this.descent=i.descent/oe,this.fontMatrix=i.fontMatrix,this.bbox=i.bbox,this.toUnicode=i.toUnicode,this.toFontChar=[],"Type3"===i.type){for(a=0;256>a;a++)this.toFontChar[a]=this.differences[a]||i.defaultEncoding[a]
return void(this.fontType=v.TYPE3)}this.cidEncoding=i.cidEncoding,this.vertical=i.vertical,this.vertical&&(this.vmetrics=i.vmetrics,this.defaultVMetrics=i.defaultVMetrics)
var p
if(!t||t.isEmpty){t&&B('Font file is empty in "'+e+'" ('+this.loadedName+")"),this.missingFile=!0
var m=e.replace(/[,_]/g,"-"),b=_(),y=q(),C=!!b[m]||!(!y[m]||!b[y[m]])
if(m=b[m]||y[m]||m,this.bold=-1!==m.search(/bold/gi),this.italic=-1!==m.search(/oblique/gi)||-1!==m.search(/italic/gi),this.black=-1!==e.search(/Black/g),this.remeasure=Object.keys(this.widths).length>0,C&&"CIDFontType2"===d&&0===i.cidEncoding.indexOf("Identity-")){var x=H(),S=[]
for(a in x)S[+a]=x[a]
if(/Arial-?Black/i.test(e)){var A=z()
for(a in A)S[+a]=A[a]}var I=this.toUnicode instanceof fe
I||this.toUnicode.forEach(function(e,t){S[+e]=t}),this.toFontChar=S,this.toUnicode=new de(S)}else/Symbol/i.test(m)?this.toFontChar=l(N,R(),i.differences):/Dingbats/i.test(m)?(/Wingdings/i.test(e)&&B("Non-embedded Wingdings font, falling back to ZapfDingbats."),this.toFontChar=l(j,O(),i.differences)):C?this.toFontChar=l(i.defaultEncoding,R(),i.differences):(p=R(),this.toUnicode.forEach(function(e,t){this.composite||(r=i.differences[e]||i.defaultEncoding[e],n=W(r,p),-1!==n&&(t=n)),this.toFontChar[e]=t}.bind(this)))
return this.loadedName=m.split("-")[0],this.loading=!1,void(this.fontType=f(d,g))}"Type1C"===g&&("Type1"!==d&&"MMType1"!==d?s(t)?g="TrueType":d="Type1":o(t)&&(d=g="OpenType")),"CIDFontType0C"===g&&"CIDFontType0"!==d&&(d="CIDFontType0"),"OpenType"===g&&(d="OpenType"),"CIDFontType0"===d&&(c(t)?g="CIDFontType0":o(t)?d=g="OpenType":g="CIDFontType0C")
var P
switch(d){case"MMType1":k("MMType1 font ("+e+"), falling back to Type1.")
case"Type1":case"CIDFontType0":this.mimetype="font/opentype"
var T="Type1C"===g||"CIDFontType0C"===g?new ye(t,i):new be(e,t,i)
u(i),P=this.convert(e,T,i)
break
case"OpenType":case"TrueType":case"CIDFontType2":this.mimetype="font/opentype",P=this.checkAndRepair(e,t,i),this.isOpenType&&(u(i),d="OpenType")
break
default:w("Font "+d+" is not supported")}this.data=P,this.fontType=f(d,g),this.fontMatrix=i.fontMatrix,this.widths=i.widths,this.defaultWidth=i.defaultWidth,this.toUnicode=i.toUnicode,this.encoding=i.baseEncoding,this.seacMap=i.seacMap,this.loading=!0}function t(e,t){return(e<<8)+t}function i(e,t){var i=(e<<8)+t
return 32768&i?i-65536:i}function a(e,t,i,a){return(e<<24)+(t<<16)+(i<<8)+a}function r(e){return String.fromCharCode(e>>8&255,255&e)}function n(e){return e=e>32767?32767:-32768>e?-32768:e,String.fromCharCode(e>>8&255,255&e)}function s(e){var t=e.peekBytes(4)
return 65536===A(t,0)}function o(e){var t=e.peekBytes(4)
return"OTTO"===y(t)}function c(e){var t=e.peekBytes(2)
return 37===t[0]&&33===t[1]?!0:128===t[0]&&1===t[1]?!0:!1}function l(e,t,i){for(var a,r=[],n=0,s=e.length;s>n;n++)a=W(e[n],t),-1!==a&&(r[n]=a)
for(var o in i)a=W(i[o],t),-1!==a&&(r[+o]=a)
return r}function h(e){for(var t=0,i=pe.length-1;i>t;){var a=t+i+1>>1
e<pe[a]?i=a-1:t=a}return!(1&t)}function p(e,t){var i=t.toUnicode,a=!!(t.flags&le.Symbolic),r=t.toUnicode instanceof fe,n=Object.create(null),s=[],o=[],c=re
for(var l in e){l|=0
var u=e[l],d=l,f=!1
if(!r&&i.has(l)){f=!0
var g=i.get(d)
1===g.length&&(d=g.charCodeAt(0))}if((void 0!==o[d]||h(d)||a&&!f)&&ne>=c)do d=c++,se&&61440===d&&(d=61472,c=d+1)
while(void 0!==o[d]&&ne>=c)
n[d]=u,s[l]=d,o[d]=!0}return{toFontChar:s,charCodeToGlyphId:n,nextAvailableFontCharCode:c}}function C(e,t){var i=[]
for(var a in e)e[a]>=t||i.push({fontCharCode:0|a,glyphId:e[a]})
i.sort(function(e,t){return e.fontCharCode-t.fontCharCode})
for(var r=[],n=i.length,s=0;n>s;){var o=i[s].fontCharCode,c=[i[s].glyphId];++s
for(var l=o;n>s&&l+1===i[s].fontCharCode&&(c.push(i[s].glyphId),++l,++s,65535!==l););r.push([o,l,c])}return r}function x(e,t){var i,a,n,s,o=C(e,t),c=o[o.length-1][1]>65535?2:1,l="\x00\x00"+r(c)+"\x00\x00"+P(4+8*c)
for(i=o.length-1;i>=0&&!(o[i][0]<=65535);--i);var h=i+1
o[i][0]<65535&&65535===o[i][1]&&(o[i][1]=65534)
var u,d,f,g,p=o[i][1]<65535?1:0,m=h+p,v=ge.getSearchParams(m,2),b="",y="",w="",k="",x="",S=0
for(i=0,a=h;a>i;i++){u=o[i],d=u[0],f=u[1],b+=r(d),y+=r(f),g=u[2]
var A=!0
for(n=1,s=g.length;s>n;++n)if(g[n]!==g[n-1]+1){A=!1
break}if(A){var I=g[0]
w+=r(I-d&65535),k+=r(0)}else{var B=2*(m-i)+2*S
for(S+=f-d+1,w+=r(0),k+=r(B),n=0,s=g.length;s>n;++n)x+=r(g[n])}}p>0&&(y+="ÿÿ",b+="ÿÿ",w+="\x00",k+="\x00\x00")
var T="\x00\x00"+r(2*m)+r(v.range)+r(v.entry)+r(v.rangeShift)+y+"\x00\x00"+b+w+k+x,L="",E=""
if(c>1){for(l+="\x00\x00\n"+P(4+8*c+4+T.length),L="",i=0,a=o.length;a>i;i++){u=o[i],d=u[0],g=u[2]
var R=g[0]
for(n=1,s=g.length;s>n;++n)g[n]!==g[n-1]+1&&(f=u[0]+n-1,L+=P(d)+P(f)+P(R),d=f+1,R=g[n])
L+=P(d)+P(u[1])+P(R)}E="\x00\f\x00\x00"+P(L.length+16)+"\x00\x00\x00\x00"+P(L.length/12)}return l+"\x00"+r(T.length+4)+T+E+L}function T(e){var t=new E(e.data),i=t.getUint16()
t.getBytes(60)
var a=t.getUint16()
if(4>i&&768&a)return!1
var r=t.getUint16(),n=t.getUint16()
if(r>n)return!1
t.getBytes(6)
var s=t.getUint16()
return 0===s?!1:(e.data[8]=e.data[9]=0,!0)}function L(e,t,i){i=i||{unitsPerEm:0,yMax:0,yMin:0,ascent:0,descent:0}
var a=0,n=0,s=0,o=0,c=null,l=0
if(t)for(var h in t){h|=0,(c>h||!c)&&(c=h),h>l&&(l=h)
var u=V(h)
32>u?a|=1<<u:64>u?n|=1<<u-32:96>u?s|=1<<u-64:123>u?o|=1<<u-96:w("Unicode ranges Bits > 123 are reserved for internal usage")}else c=0,l=255
var d=e.bbox||[0,0,0,0],f=i.unitsPerEm||1/(e.fontMatrix||m)[0],g=e.ascentScaled?1:f/oe,p=i.ascent||Math.round(g*(e.ascent||d[3])),v=i.descent||Math.round(g*(e.descent||d[1]))
v>0&&e.descent>0&&d[1]<0&&(v=-v)
var b=i.yMax||p,y=-i.yMin||-v
return"\x00$ô\x00\x00\x00»\x00\x00\x00»\x00\x00ß\x001\x00\x00\x00\x00"+String.fromCharCode(e.fixedPitch?9:0)+"\x00\x00\x00\x00\x00\x00"+P(a)+P(n)+P(s)+P(o)+"*21*"+r(e.italicAngle?1:0)+r(c||e.firstChar)+r(l||e.lastChar)+r(p)+r(v)+"\x00d"+r(b)+r(y)+"\x00\x00\x00\x00\x00\x00\x00\x00"+r(e.xHeight)+r(e.capHeight)+r(0)+r(c||e.firstChar)+"\x00"}function X(e){var t=Math.floor(e.italicAngle*Math.pow(2,16))
return"\x00\x00\x00"+P(t)+"\x00\x00\x00\x00"+P(e.fixedPitch)+"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"}function K(e,t){t||(t=[[],[]])
var i,a,n,s,o,c=[t[0][0]||"Original licence",t[0][1]||e,t[0][2]||"Unknown",t[0][3]||"uniqueID",t[0][4]||e,t[0][5]||"Version 0.11",t[0][6]||"",t[0][7]||"Unknown",t[0][8]||"Unknown",t[0][9]||"Unknown"],l=[]
for(i=0,a=c.length;a>i;i++){o=t[1][i]||c[i]
var h=[]
for(n=0,s=o.length;s>n;n++)h.push(r(o.charCodeAt(n)))
l.push(h.join(""))}var u=[c,l],d=["\x00","\x00"],f=["\x00\x00","\x00"],g=["\x00\x00","	"],p=c.length*d.length,m="\x00\x00"+r(p)+r(12*p+6),v=0
for(i=0,a=d.length;a>i;i++){var b=u[i]
for(n=0,s=b.length;s>n;n++){o=b[n]
var y=d[i]+f[i]+g[i]+r(n)+r(o.length)+r(v)
m+=y,v+=o.length}}return m+=c.join("")+l.join("")}return e.getFontID=function(){var e=1
return function(){return e++ +""}}(),e.prototype={name:null,font:null,mimetype:null,encoding:null,get renderer(){var e=M.create(this,ce)
return I(this,"renderer",e)},exportData:function(){var e={}
for(var t in this)this.hasOwnProperty(t)&&(e[t]=this[t])
return e},checkAndRepair:function(e,r,n){function s(e){var t=y(e.getBytes(4)),i=e.getInt32()>>>0,a=e.getInt32()>>>0,r=e.getInt32()>>>0,n=e.pos
e.pos=e.start?e.start:0,e.skip(a)
var s=e.getBytes(r)
return e.pos=n,"head"===t&&(s[8]=s[9]=s[10]=s[11]=0,s[17]|=32),{tag:t,checksum:i,length:r,offset:a,data:s}}function o(e){return{version:y(e.getBytes(4)),numTables:e.getUint16(),searchRange:e.getUint16(),entrySelector:e.getUint16(),rangeShift:e.getUint16()}}function c(e,t,i,a){if(!e)return B("No cmap table available."),{platformId:-1,encodingId:-1,mappings:[],hasShortCmap:!1}
var r,n=(t.start?t.start:0)+e.offset
t.pos=n
for(var s,o=(t.getUint16(),t.getUint16()),c=!1,l=0;o>l;l++){var h=t.getUint16(),u=t.getUint16(),d=t.getInt32()>>>0,f=!1
if(0===h&&0===u?f=!0:1===h&&0===u?f=!0:3!==h||1!==u||(i||!a)&&s?i&&3===h&&0===u&&(f=!0,c=!0):(f=!0,i||(c=!0)),f&&(s={platformId:h,encodingId:u,offset:d}),c)break}if(s&&(t.pos=n+s.offset),!s||-1===t.peekByte())return B("Could not find a preferred cmap table."),{platformId:-1,encodingId:-1,mappings:[],hasShortCmap:!1}
var g,p,m=t.getUint16(),v=(t.getUint16(),t.getUint16(),!1),b=[]
if(0===m){for(g=0;256>g;g++){var y=t.getByte()
y&&b.push({charCode:g,glyphId:y})}v=!0}else if(4===m){var w=t.getUint16()>>1
t.getBytes(6)
var k,C=[]
for(k=0;w>k;k++)C.push({end:t.getUint16()})
for(t.getUint16(),k=0;w>k;k++)C[k].start=t.getUint16()
for(k=0;w>k;k++)C[k].delta=t.getUint16()
var x=0
for(k=0;w>k;k++){r=C[k]
var S=t.getUint16()
if(S){var A=(S>>1)-(w-k)
r.offsetIndex=A,x=Math.max(x,A+r.end-r.start+1)}else r.offsetIndex=-1}var I=[]
for(g=0;x>g;g++)I.push(t.getUint16())
for(k=0;w>k;k++){r=C[k],n=r.start
var P=r.end,T=r.delta
for(A=r.offsetIndex,g=n;P>=g;g++)65535!==g&&(p=0>A?g:I[A+g-n],p=p+T&65535,0!==p&&b.push({charCode:g,glyphId:p}))}}else{if(6!==m)return B("cmap table has unsupported format: "+m),{platformId:-1,encodingId:-1,mappings:[],hasShortCmap:!1}
var L=t.getUint16(),E=t.getUint16()
for(g=0;E>g;g++){p=t.getUint16()
var R=L+g
b.push({charCode:R,glyphId:p})}}for(b.sort(function(e,t){return e.charCode-t.charCode}),l=1;l<b.length;l++)b[l-1].charCode===b[l].charCode&&(b.splice(l,1),l--)
return{platformId:s.platformId,encodingId:s.encodingId,mappings:b,hasShortCmap:v}}function l(e,t,i,a){if(!t)return void(i&&(i.data=null))
e.pos=(e.start?e.start:0)+t.offset,e.pos+=t.length-2
var r=e.getUint16()
r>a&&(k("The numOfMetrics ("+r+") should not be greater than the numGlyphs ("+a+")"),r=a,t.data[34]=(65280&r)>>8,t.data[35]=255&r)
var n=a-r,s=n-(i.length-4*r>>1)
if(s>0){var o=new Uint8Array(i.length+2*s)
o.set(i.data),i.data=o}}function h(e,t,i,a,r,n){if(12>=i-t)return 0
var s=e.subarray(t,i),o=s[0]<<8|s[1]
if(32768&o)return a.set(s,r),s.length
var c,l=10,h=0
for(c=0;o>c;c++){var u=s[l]<<8|s[l+1]
h=u+1,l+=2}var d=l,f=s[l]<<8|s[l+1]
l+=2+f
var g=l,p=0
for(c=0;h>c;c++){var m=s[l++]
192&m&&(s[l-1]=63&m)
var v=(2&m?1:16&m?0:2)+(4&m?1:32&m?0:2)
if(p+=v,8&m){var b=s[l++]
c+=b,p+=b*v}}if(0===p)return 0
var y=l+p
return y>s.length?0:!n&&f>0?(a.set(s.subarray(0,d),r),a.set([0,0],r+d),a.set(s.subarray(g,y),r+d+2),y-=f,s.length-y>3&&(y=y+3&-4),y):s.length-y>3?(y=y+3&-4,a.set(s.subarray(0,y),r),y):(a.set(s,r),s.length)}function d(e,i,r){var n=e.data,s=a(n[0],n[1],n[2],n[3])
s>>16!==1&&(k("Attempting to fix invalid version in head table: "+s),n[0]=0,n[1]=1,n[2]=0,n[3]=0)
var o=t(n[50],n[51])
if(0>o||o>1){k("Attempting to fix invalid indexToLocFormat in head table: "+o)
var c=i+1
r===c<<1?(n[50]=0,n[51]=0):r===c<<2?(n[50]=0,n[51]=1):B("Could not fix indexToLocFormat: "+o)}}function f(e,t,i,a,r,n){var s,o,c
a?(s=4,o=function(e,t){return e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3]},c=function(e,t,i){e[t]=i>>>24&255,e[t+1]=i>>16&255,e[t+2]=i>>8&255,e[t+3]=255&i}):(s=2,o=function(e,t){return e[t]<<9|e[t+1]<<1},c=function(e,t,i){e[t]=i>>9&255,e[t+1]=i>>1&255})
var l=e.data,u=s*(1+i)
l.length!==u&&(l=new Uint8Array(u),l.set(e.data.subarray(0,u)),e.data=l)
var d=t.data,f=d.length,g=new Uint8Array(f),p=o(l,0),m=0,v=Object.create(null)
c(l,0,m)
var b,y
for(b=0,y=s;i>b;b++,y+=s){var w=o(l,y)
if(w>f&&(f+3&-4)===w&&(w=f),w>f)c(l,y,m),p=w
else{p===w&&(v[b]=!0)
var k=h(d,p,w,g,m,r)
m+=k,c(l,y,m),p=w}}if(0===m){var C=new Uint8Array([0,1,0,0,0,0,0,0,0,0,0,0,0,0,49,0])
for(b=0,y=s;i>b;b++,y+=s)c(l,y,C.length)
return t.data=C,v}if(n){var x=o(l,s)
g.length>x+m?t.data=g.subarray(0,x+m):(t.data=new Uint8Array(x+m),t.data.set(g.subarray(0,m))),t.data.set(g.subarray(0,x),m),c(e.data,l.length-s,m+x)}else t.data=g.subarray(0,m)
return v}function m(e,t,i){var a=(r.start?r.start:0)+e.offset
r.pos=a
var n=e.length,s=a+n,o=r.getInt32()
r.getBytes(28)
var c,l,h=!0
switch(o){case 65536:c=he
break
case 131072:var u=r.getUint16()
if(u!==i){h=!1
break}var d=[]
for(l=0;u>l;++l){var f=r.getUint16()
if(f>=32768){h=!1
break}d.push(f)}if(!h)break
for(var g=[],p=[];r.pos<s;){var m=r.getByte()
for(p.length=m,l=0;m>l;++l)p[l]=String.fromCharCode(r.getByte())
g.push(p.join(""))}for(c=[],l=0;u>l;++l){var v=d[l]
258>v?c.push(he[v]):c.push(g[v-258])}break
case 196608:break
default:B("Unknown/unsupported post table version "+o),h=!1,t.defaultEncoding&&(c=t.defaultEncoding)}return t.glyphNames=c,h}function v(e){var t=(r.start?r.start:0)+e.offset
r.pos=t
var i=[[],[]],a=e.length,n=t+a,s=r.getUint16(),o=6
if(0!==s||o>a)return i
var c,l,h=r.getUint16(),u=r.getUint16(),d=[],f=12
for(c=0;h>c&&r.pos+f<=n;c++){var g={platform:r.getUint16(),encoding:r.getUint16(),language:r.getUint16(),name:r.getUint16(),length:r.getUint16(),offset:r.getUint16()};(1===g.platform&&0===g.encoding&&0===g.language||3===g.platform&&1===g.encoding&&1033===g.language)&&d.push(g)}for(c=0,l=d.length;l>c;c++){var p=d[c]
if(!(p.length<=0)){var m=t+u+p.offset
if(!(m+p.length>n)){r.pos=m
var v=p.name
if(p.encoding){for(var b="",w=0,k=p.length;k>w;w+=2)b+=String.fromCharCode(r.getUint16())
i[1][v]=b}else i[0][v]=y(r.getBytes(p.length))}}}return i}function C(e,t){for(var i,a,r,n,s,o=e.data,c=0,l=0,h=0,u=[],d=[],f=[],g=t.tooComplexToFollowFunctions,p=!1,m=0,v=0,b=o.length;b>c;){var y=o[c++]
if(64===y)if(a=o[c++],p||v)c+=a
else for(i=0;a>i;i++)u.push(o[c++])
else if(65===y)if(a=o[c++],p||v)c+=2*a
else for(i=0;a>i;i++)r=o[c++],u.push(r<<8|o[c++])
else if(176===(248&y))if(a=y-176+1,p||v)c+=a
else for(i=0;a>i;i++)u.push(o[c++])
else if(184===(248&y))if(a=y-184+1,p||v)c+=2*a
else for(i=0;a>i;i++)r=o[c++],u.push(r<<8|o[c++])
else if(43!==y||g)if(44!==y||g){if(45===y)if(p)p=!1,l=c
else{if(s=d.pop(),!s)return B("TT: ENDF bad stack"),void(t.hintsValid=!1)
n=f.pop(),o=s.data,c=s.i,t.functionsStackDeltas[n]=u.length-s.stackTop}else if(137===y)(p||v)&&(B("TT: nested IDEFs not allowed"),g=!0),p=!0,h=c
else if(88===y)++m
else if(27===y)v=m
else if(89===y)v===m&&(v=0),--m
else if(28===y&&!p&&!v){var w=u[u.length-1]
w>0&&(c+=w-1)}}else(p||v)&&(B("TT: nested FDEFs not allowed"),g=!0),p=!0,h=c,n=u.pop(),t.functionsDefined[n]={data:o,i:c}
else if(!p&&!v)if(n=u[u.length-1],t.functionsUsed[n]=!0,n in t.functionsStackDeltas)u.length+=t.functionsStackDeltas[n]
else if(n in t.functionsDefined&&f.indexOf(n)<0){if(d.push({data:o,i:c,stackTop:u.length-1}),f.push(n),s=t.functionsDefined[n],!s)return B("TT: CALL non-existent function"),void(t.hintsValid=!1)
o=s.data,c=s.i}if(!p&&!v){var k=142>=y?M[y]:y>=192&&223>=y?-1:y>=224?-2:0
for(y>=113&&117>=y&&(a=u.pop(),isNaN(a)||(k=2*-a));0>k&&u.length>0;)u.pop(),k++
for(;k>0;)u.push(NaN),k--}}t.tooComplexToFollowFunctions=g
var C=[o]
c>o.length&&C.push(new Uint8Array(c-o.length)),h>l&&(B("TT: complementing a missing function tail"),C.push(new Uint8Array([34,45]))),I(e,C)}function A(e,t){if(!e.tooComplexToFollowFunctions){if(e.functionsDefined.length>t)return B("TT: more functions defined than expected"),void(e.hintsValid=!1)
for(var i=0,a=e.functionsUsed.length;a>i;i++){if(i>t)return B("TT: invalid function id: "+i),void(e.hintsValid=!1)
if(e.functionsUsed[i]&&!e.functionsDefined[i])return B("TT: undefined function: "+i),void(e.hintsValid=!1)}}}function I(e,t){if(t.length>1){var i,a,r=0
for(i=0,a=t.length;a>i;i++)r+=t[i].length
r=r+3&-4
var n=new Uint8Array(r),s=0
for(i=0,a=t.length;a>i;i++)n.set(t[i],s),s+=t[i].length
e.data=n,e.length=r}}function P(e,t,i,a){var r={functionsDefined:[],functionsUsed:[],functionsStackDeltas:[],tooComplexToFollowFunctions:!1,hintsValid:!0}
if(e&&C(e,r),t&&C(t,r),e&&A(r,a),i&&1&i.length){var n=new Uint8Array(i.length+1)
n.set(i.data),i.data=n}return r.hintsValid}function O(e,t,i){return ae[e]?!pe&&t>=0&&ue.has(t)?!0:de&&i>=0&&S(de[i])?!0:!1:!0}var M=[0,0,0,0,0,0,0,0,-2,-2,-2,-2,0,0,-2,-5,-1,-1,-1,-1,-1,-1,-1,-1,0,0,-1,0,-1,-1,-1,-1,1,-1,-999,0,1,0,-1,-2,0,-1,-2,-1,-1,0,-1,-1,0,0,-999,-999,-1,-1,-1,-1,-2,-999,-2,-2,-999,0,-2,-2,0,0,-2,0,-2,0,0,0,-2,-1,-1,1,1,0,0,-1,-1,-1,-1,-1,-1,-1,0,0,-1,0,-1,-1,0,-999,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,-2,-999,-999,-999,-999,-999,-1,-1,-2,-2,0,0,0,0,-1,-1,-999,-2,-2,0,0,-1,-2,-2,0,0,0,-1,-1,-1,-2]
r=new E(new Uint8Array(r.getBytes()))
var N,j,_=["OS/2","cmap","head","hhea","hmtx","maxp","name","post","loca","glyf","fpgm","prep","cvt ","CFF "],q=o(r),H=q.numTables,z=Object.create(null)
z["OS/2"]=null,z.cmap=null,z.head=null,z.hhea=null,z.hmtx=null,z.maxp=null,z.name=null,z.post=null
for(var V,G=0;H>G;G++)V=s(r),_.indexOf(V.tag)<0||0!==V.length&&(z[V.tag]=V)
var W=!z["CFF "]
if(W)z.loca||w('Required "loca" table is not found'),z.glyf||(B('Required "glyf" table is not found -- trying to recover.'),z.glyf={tag:"glyf",data:new Uint8Array(0)}),this.isOpenType=!1
else{if("OTTO"===q.version&&!n.composite||!z.head||!z.hhea||!z.maxp||!z.post)return j=new E(z["CFF "].data),N=new ye(j,n),u(n),this.convert(e,N,n)
delete z.glyf,delete z.loca,delete z.fpgm,delete z.prep,delete z["cvt "],this.isOpenType=!0}z.maxp||w('Required "maxp" table is not found'),r.pos=(r.start||0)+z.maxp.offset
var Z=r.getInt32(),Q=r.getUint16(),$=0
if(Z>=65536&&z.maxp.length>=22){r.pos+=8
var ee=r.getUint16()
ee>2&&(z.maxp.data[14]=0,z.maxp.data[15]=2),r.pos+=4,$=r.getUint16()}var te=!1
"CIDFontType2"===n.type&&n.toUnicode&&n.toUnicode.get(0)>"\x00"&&(te=!0,Q++,z.maxp.data[4]=Q>>8,z.maxp.data[5]=255&Q)
var ie=P(z.fpgm,z.prep,z["cvt "],$)
ie||(delete z.fpgm,delete z.prep,delete z["cvt "]),l(r,z.hhea,z.hmtx,Q),z.head||w('Required "head" table is not found'),d(z.head,Q,W?z.loca.length:0)
var ae=Object.create(null)
if(W){var re=t(z.head.data[50],z.head.data[51])
ae=f(z.loca,z.glyf,Q,re,ie,te)}z.hhea||w('Required "hhea" table is not found'),0===z.hhea.data[10]&&0===z.hhea.data[11]&&(z.hhea.data[10]=255,z.hhea.data[11]=255)
var ne={unitsPerEm:t(z.head.data[18],z.head.data[19]),yMax:t(z.head.data[42],z.head.data[43]),yMin:i(z.head.data[38],z.head.data[39]),ascent:t(z.hhea.data[4],z.hhea.data[5]),descent:i(z.hhea.data[6],z.hhea.data[7])}
if(this.ascent=ne.ascent/ne.unitsPerEm,this.descent=ne.descent/ne.unitsPerEm,z.post){var se=m(z.post,n,Q)
se||(z.post=null)}var oe,le=[],ue=n.toUnicode,de=n.widths,pe=ue instanceof fe||65536===ue.length
if(n.composite){var me=n.cidToGidMap||[],ve=0===me.length
n.cMap.forEach(function(e,t){b(65535>=t,"Max size of CID is 65,535")
var i=-1
ve?i=t:void 0!==me[t]&&(i=me[t]),i>=0&&Q>i&&O(i,e,t)&&(le[e]=i)}),!te||!ve&&le[0]||(le[0]=Q-1)}else{var be=c(z.cmap,r,this.isSymbolicFont,n.hasEncoding),we=be.platformId,ke=be.encodingId,Ce=be.mappings,xe=Ce.length
if(n.hasEncoding&&(3===we&&1===ke||1===we&&0===ke)||-1===we&&-1===ke&&U(n.baseEncodingName)){var Se=[];("MacRomanEncoding"===n.baseEncodingName||"WinAnsiEncoding"===n.baseEncodingName)&&(Se=U(n.baseEncodingName))
var Ae=R()
for(oe=0;256>oe;oe++){var Ie,Pe
if(Ie=this.differences&&oe in this.differences?this.differences[oe]:oe in Se&&""!==Se[oe]?Se[oe]:D[oe]){Pe=g(Ie,Ae)
var Be,Te=!1
3===we&&1===ke?(Be=Ae[Pe],Te=!0):1===we&&0===ke&&(Be=F.indexOf(Pe))
var Le=!1
for(G=0;xe>G;++G)if(Ce[G].charCode===Be){var Ee=Te?oe:Be
if(O(Ce[G].glyphId,Ee,-1)){le[oe]=Ce[G].glyphId,Le=!0
break}}if(!Le&&n.glyphNames){var Re=n.glyphNames.indexOf(Ie);-1===Re&&Pe!==Ie&&(Re=n.glyphNames.indexOf(Pe)),Re>0&&O(Re,-1,-1)&&(le[oe]=Re,Le=!0)}Le||(le[oe]=0)}}}else if(0===we&&0===ke)for(G=0;xe>G;++G)le[Ce[G].charCode]=Ce[G].glyphId
else for(G=0;xe>G;++G)oe=255&Ce[G].charCode,le[oe]=Ce[G].glyphId}0===le.length&&(le[0]=0)
var Oe=p(le,n)
if(this.toFontChar=Oe.toFontChar,z.cmap={tag:"cmap",data:x(Oe.charCodeToGlyphId,Q)},z["OS/2"]&&T(z["OS/2"])||(z["OS/2"]={tag:"OS/2",data:L(n,Oe.charCodeToGlyphId,ne)}),z.post||(z.post={tag:"post",data:X(n)}),!W)try{j=new E(z["CFF "].data)
var Me=new Y(j,n,ce)
N=Me.parse()
var De=new J(N)
z["CFF "].data=De.compile()}catch(Fe){B("Failed to compile font "+n.loadedName)}if(z.name){var Ne=v(z.name)
z.name.data=K(e,Ne)}else z.name={tag:"name",data:K(this.name)}
var je=new ge(q.version)
for(var Ue in z)je.addTable(Ue,z[Ue].data)
return je.toArray()},convert:function(e,t,i){function a(e,t){var i=null
for(var a in e)t===e[a]&&(i||(i=[]),i.push(0|a))
return i}function s(e,t){for(var i in e)if(t===e[i])return 0|i
return c.charCodeToGlyphId[c.nextAvailableFontCharCode]=t,c.nextAvailableFontCharCode++}i.fixedPitch=!1,i.builtInEncoding&&d(i,i.builtInEncoding)
var o=t.getGlyphMapping(i),c=p(o,i)
this.toFontChar=c.toFontChar
var l=t.numGlyphs,h=t.seacs
if(ce&&h&&h.length){var u=i.fontMatrix||m,f=t.getCharset(),g=Object.create(null)
for(var v in h){v|=0
var b=h[v],y=D[b[2]],w=D[b[3]],k=f.indexOf(y),C=f.indexOf(w)
if(!(0>k||0>C)){var S={x:b[0]*u[0]+b[1]*u[2]+u[4],y:b[0]*u[1]+b[1]*u[3]+u[5]},A=a(o,v)
if(A)for(var I=0,P=A.length;P>I;I++){var B=A[I],T=c.charCodeToGlyphId,E=s(T,k),R=s(T,C)
g[B]={baseFontCharCode:E,accentFontCharCode:R,accentOffset:S}}}}i.seacMap=g}var O=1/(i.fontMatrix||m)[0],M=new ge("OTTO")
return M.addTable("CFF ",t.data),M.addTable("OS/2",L(i,c.charCodeToGlyphId)),M.addTable("cmap",x(c.charCodeToGlyphId,l)),M.addTable("head","\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00_<õ\x00\x00"+n(O)+"\x00\x00\x00\x00\x0B~'\x00\x00\x00\x00\x0B~'\x00\x00"+n(i.descent)+"ÿ"+n(i.ascent)+r(i.italicAngle?2:0)+"\x00\x00\x00\x00\x00\x00\x00"),M.addTable("hhea","\x00\x00\x00"+n(i.ascent)+n(i.descent)+"\x00\x00ÿÿ\x00\x00\x00\x00\x00\x00"+n(i.capHeight)+n(Math.tan(i.italicAngle)*i.xHeight)+"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"+r(l)),M.addTable("hmtx",function(){for(var e=t.charstrings,i=t.cff?t.cff.widths:null,a="\x00\x00\x00\x00",n=1,s=l;s>n;n++){var o=0
if(e){var c=e[n-1]
o="width"in c?c.width:0}else i&&(o=Math.ceil(i[n]||0))
a+=r(o)+r(0)}return a}()),M.addTable("maxp","\x00\x00P\x00"+r(l)),M.addTable("name",K(e)),M.addTable("post",X(i)),M.toArray()},get spaceWidth(){if("_shadowWidth"in this)return this._shadowWidth
for(var e,t=["space","minus","one","i","I"],i=0,a=t.length;a>i;i++){var r=t[i]
if(r in this.widths){e=this.widths[r]
break}var n=R(),s=n[r],o=0
if(this.composite&&this.cMap.contains(s)&&(o=this.cMap.lookup(s)),!o&&this.toUnicode&&(o=this.toUnicode.charCodeOf(s)),0>=o&&(o=s),e=this.widths[o])break}return e=e||this.defaultWidth,this._shadowWidth=e,e},charToGlyph:function(e,t){var i,a,r,n=e
this.cMap&&this.cMap.contains(e)&&(n=this.cMap.lookup(e)),a=this.widths[n],a=S(a)?a:this.defaultWidth
var s=this.vmetrics&&this.vmetrics[n],o=this.toUnicode.get(e)||e
"number"==typeof o&&(o=String.fromCharCode(o))
var c=e in this.toFontChar
i=this.toFontChar[e]||e,this.missingFile&&(i=G(i)),this.isType3Font&&(r=i)
var l=null
if(this.seacMap&&this.seacMap[e]){c=!0
var h=this.seacMap[e]
i=h.baseFontCharCode,l={fontChar:String.fromCharCode(h.accentFontCharCode),offset:h.accentOffset}}var u=String.fromCharCode(i),d=this.glyphCache[e]
return d&&d.matchesForCache(u,o,l,a,s,r,t,c)||(d=new ue(u,o,l,a,s,r,t,c),this.glyphCache[e]=d),d},charsToGlyphs:function(e){var t,i,a,r=this.charsCache
if(r&&(t=r[e]))return t
r||(r=this.charsCache=Object.create(null)),t=[]
var n,s=e,o=0
if(this.cMap)for(var c=Object.create(null);o<e.length;){this.cMap.readCharCode(e,o,c),a=c.charcode
var l=c.length
o+=l
var h=1===l&&32===e.charCodeAt(o-1)
i=this.charToGlyph(a,h),t.push(i)}else for(o=0,n=e.length;n>o;++o)a=e.charCodeAt(o),i=this.charToGlyph(a,32===a),t.push(i)
return r[s]=t}},e}(),ve=function(){function e(e){this.error=e,this.loadedName="g_font_error",this.loading=!1}return e.prototype={charsToGlyphs:function(){return[]},exportData:function(){return{error:this.error}}},e}(),be=function(){function e(e,t,i){for(var a,r=e.length,n=t.length,s=r-n,o=i,c=!1;s>o;){for(a=0;n>a&&e[o+a]===t[a];)a++
if(a>=n){for(o+=a;r>o&&L(e[o]);)o++
c=!0
break}o++}return{found:c,length:o}}function t(t,i){var a,r,n,s=[101,101,120,101,99],o=t.pos
try{a=t.getBytes(i),r=a.length}catch(c){if(c instanceof T)throw c}if(r===i&&(n=e(a,s,i-2*s.length),n.found&&n.length===i))return{stream:new E(a),length:i}
B('Invalid "Length1" property in Type1 font -- trying to recover.'),t.pos=o
for(var l,h=2048;;){var u=t.peekBytes(h)
if(n=e(u,s,0),0===n.length)break
if(t.pos+=n.length,n.found){l=t.pos-o
break}}return t.pos=o,l?{stream:new E(t.getBytes(l)),length:l}:(B('Unable to recover "Length1" property in Type1 font -- using as is.'),{stream:new E(t.getBytes(i)),length:i})}function i(e,t){var i=e.getBytes()
return{stream:new E(i),length:i.length}}function a(e,a,r){var n=6,s=r.length1,o=r.length2,c=a.peekBytes(n),l=128===c[0]&&1===c[1]
l&&(a.skip(n),s=c[5]<<24|c[4]<<16|c[3]<<8|c[2])
var h=t(a,s)
s=h.length
var u=new X(h.stream,!1,ce)
u.extractFontHeader(r),l&&(c=a.getBytes(n),o=c[5]<<24|c[4]<<16|c[3]<<8|c[2])
var d=i(a,o)
o=d.length
var f=new X(d.stream,!0,ce),g=f.extractFontProgram()
for(var p in g.properties)r[p]=g.properties[p]
var m=g.charstrings,v=this.getType2Charstrings(m),b=this.getType2Subrs(g.subrs)
this.charstrings=m,this.data=this.wrap(e,v,this.charstrings,b,r),this.seacs=this.getSeacs(g.charstrings)}return a.prototype={get numGlyphs(){return this.charstrings.length+1},getCharset:function(){for(var e=[".notdef"],t=this.charstrings,i=0;i<t.length;i++)e.push(t[i].glyphName)
return e},getGlyphMapping:function(e){var t,i=this.charstrings,a=[".notdef"]
for(t=0;t<i.length;t++)a.push(i[t].glyphName)
var r=e.builtInEncoding
if(r){var n=Object.create(null)
for(var s in r)t=a.indexOf(r[s]),t>=0&&(n[s]=t)}return p(e,n,a)},getSeacs:function(e){var t,i,a=[]
for(t=0,i=e.length;i>t;t++){var r=e[t]
r.seac&&(a[t+1]=r.seac)}return a},getType2Charstrings:function(e){for(var t=[],i=0,a=e.length;a>i;i++)t.push(e[i].charstring)
return t},getType2Subrs:function(e){var t=0,i=e.length
t=1133>i?107:33769>i?1131:32768
var a,r=[]
for(a=0;t>a;a++)r.push([11])
for(a=0;i>a;a++)r.push(e[a])
return r},wrap:function(e,t,i,a,r){var n=new Z
n.header=new Q(1,0,4,4),n.names=[e]
var s=new $
s.setByName("version",391),s.setByName("Notice",392),s.setByName("FullName",393),s.setByName("FamilyName",394),s.setByName("Weight",395),s.setByName("Encoding",null),s.setByName("FontMatrix",r.fontMatrix),s.setByName("FontBBox",r.bbox),s.setByName("charset",null),s.setByName("CharStrings",null),s.setByName("Private",null),n.topDict=s
var o=new te
o.add("Version 0.11"),o.add("See original notice"),o.add(e),o.add(e),o.add("Medium"),n.strings=o,n.globalSubrIndex=new ie
var c,l,h=t.length,u=[0]
for(c=0;h>c;c++){var d=K.indexOf(i[c].glyphName);-1===d&&(d=0),u.push(d>>8&255,255&d)}n.charset=new ae(!1,0,[],u)
var f=new ie
for(f.add([139,14]),c=0;h>c;c++){var g=t[c]
0!==g.length?f.add(g):f.add([139,14])}n.charStrings=f
var p=new ee
p.setByName("Subrs",null)
var m=["BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StemSnapH","StemSnapV","BlueShift","BlueFuzz","BlueScale","LanguageGroup","ExpansionFactor","ForceBold","StdHW","StdVW"]
for(c=0,l=m.length;l>c;c++){var v=m[c]
if(v in r.privateData){var b=r.privateData[v]
if(C(b))for(var y=b.length-1;y>0;y--)b[y]-=b[y-1]
p.setByName(v,b)}}n.topDict.privateDict=p
var w=new ie
for(c=0,l=a.length;l>c;c++)w.add(a[c])
p.subrsIndex=w
var k=new J(n)
return k.compile()}},a}(),ye=function(){function e(e,t){this.properties=t
var i=new Y(e,t,ce)
this.cff=i.parse()
var a=new J(this.cff)
this.seacs=this.cff.seacs
try{this.data=a.compile()}catch(r){B("Failed to compile font "+t.loadedName),this.data=e}}return e.prototype={get numGlyphs(){return this.cff.charStrings.count},getCharset:function(){return this.cff.charset.charset},getGlyphMapping:function(){var e,t,i=this.cff,a=this.properties,r=i.charset.charset
if(a.composite){if(e=Object.create(null),i.isCIDFont)for(t=0;t<r.length;t++){var n=r[t],s=a.cMap.charCodeOf(n)
e[s]=t}else for(t=0;t<i.charStrings.count;t++)e[t]=t
return e}var o=i.encoding?i.encoding.encoding:null
return e=p(a,o,r)}},e}()
!function(){"undefined"!=typeof navigator&&/Windows/.test(navigator.userAgent)&&(ce=!0)}(),function(){"undefined"!=typeof navigator&&/Windows.*Chrome/.test(navigator.userAgent)&&(se=!0)}(),e.ErrorFont=ve,e.Font=me,e.FontFlags=le,e.IdentityToUnicodeMap=fe,e.ToUnicodeMap=de,e.getFontType=f}),function(e,t){t(e.pdfjsCorePsParser={},e.pdfjsSharedUtil,e.pdfjsCoreParser)}(this,function(e,t,i){var a=t.error,r=t.isSpace,n=i.EOF,s=function(){function e(e){this.lexer=e,this.operators=[],this.token=null,this.prev=null}return e.prototype={nextToken:function(){this.prev=this.token,this.token=this.lexer.getToken()},accept:function(e){return this.token.type===e?(this.nextToken(),!0):!1},expect:function(e){return this.accept(e)?!0:void a("Unexpected symbol: found "+this.token.type+" expected "+e+".")},parse:function(){return this.nextToken(),this.expect(o.LBRACE),this.parseBlock(),this.expect(o.RBRACE),this.operators},parseBlock:function(){for(;;)if(this.accept(o.NUMBER))this.operators.push(this.prev.value)
else if(this.accept(o.OPERATOR))this.operators.push(this.prev.value)
else{if(!this.accept(o.LBRACE))return
this.parseCondition()}},parseCondition:function(){var e=this.operators.length
if(this.operators.push(null,null),this.parseBlock(),this.expect(o.RBRACE),this.accept(o.IF))this.operators[e]=this.operators.length,this.operators[e+1]="jz"
else if(this.accept(o.LBRACE)){var t=this.operators.length
this.operators.push(null,null)
var i=this.operators.length
this.parseBlock(),this.expect(o.RBRACE),this.expect(o.IFELSE),this.operators[t]=this.operators.length,this.operators[t+1]="j",this.operators[e]=i,this.operators[e+1]="jz"}else a("PS Function: error parsing conditional.")}},e}(),o={LBRACE:0,RBRACE:1,NUMBER:2,OPERATOR:3,IF:4,IFELSE:5},c=function(){function e(e,t){this.type=e,this.value=t}var t=Object.create(null)
return e.getOperator=function(i){var a=t[i]
return a?a:t[i]=new e(o.OPERATOR,i)},e.LBRACE=new e(o.LBRACE,"{"),e.RBRACE=new e(o.RBRACE,"}"),e.IF=new e(o.IF,"IF"),e.IFELSE=new e(o.IFELSE,"IFELSE"),e}(),l=function(){function e(e){this.stream=e,this.nextChar(),this.strBuf=[]}return e.prototype={nextChar:function(){return this.currentChar=this.stream.getByte()},getToken:function(){for(var e=!1,t=this.currentChar;;){if(0>t)return n
if(e)(10===t||13===t)&&(e=!1)
else if(37===t)e=!0
else if(!r(t))break
t=this.nextChar()}switch(0|t){case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 43:case 45:case 46:return new c(o.NUMBER,this.getNumber())
case 123:return this.nextChar(),c.LBRACE
case 125:return this.nextChar(),c.RBRACE}var i=this.strBuf
for(i.length=0,i[0]=String.fromCharCode(t);(t=this.nextChar())>=0&&(t>=65&&90>=t||t>=97&&122>=t);)i.push(String.fromCharCode(t))
var a=i.join("")
switch(a.toLowerCase()){case"if":return c.IF
case"ifelse":return c.IFELSE
default:return c.getOperator(a)}},getNumber:function(){var e=this.currentChar,t=this.strBuf
for(t.length=0,t[0]=String.fromCharCode(e);(e=this.nextChar())>=0&&(e>=48&&57>=e||45===e||46===e);)t.push(String.fromCharCode(e))
var i=parseFloat(t.join(""))
return isNaN(i)&&a("Invalid floating point number: "+i),i}},e}()
e.PostScriptLexer=l,e.PostScriptParser=s}),function(e,t){t(e.pdfjsCoreFunction={},e.pdfjsSharedUtil,e.pdfjsCorePrimitives,e.pdfjsCorePsParser)}(this,function(e,t,i,a){function r(e){var t
if("object"!=typeof e)return!1
if(l(e))t=e
else{if(!h(e))return!1
t=e.dict}return t.has("FunctionType")}var n=t.error,s=t.info,o=t.isArray,c=t.isBool,l=i.isDict,h=i.isStream,u=a.PostScriptLexer,d=a.PostScriptParser,f=function(){var e=0,t=2,i=3,a=4
return{getSampleArray:function(e,t,i,a){var r,n,s=1
for(r=0,n=e.length;n>r;r++)s*=e[r]
s*=t
var o=Array(s),c=0,l=0,h=1/(Math.pow(2,i)-1),u=a.getBytes((s*i+7)/8),d=0
for(r=0;s>r;r++){for(;i>c;)l<<=8,l|=u[d++],c+=8
c-=i,o[r]=(l>>c)*h,l&=(1<<c)-1}return o},getIR:function(e,t){var i=t.dict
i||(i=t)
var a=[this.constructSampled,null,this.constructInterpolated,this.constructStiched,this.constructPostScript],r=i.get("FunctionType"),s=a[r]
return s||n("Unknown type of function"),s.call(this,t,i,e)},fromIR:function(a){var r=a[0]
switch(r){case e:return this.constructSampledFromIR(a)
case t:return this.constructInterpolatedFromIR(a)
case i:return this.constructStichedFromIR(a)
default:return this.constructPostScriptFromIR(a)}},parse:function(e,t){var i=this.getIR(e,t)
return this.fromIR(i)},parseArray:function(e,t){if(!o(t))return this.parse(e,t)
for(var i=[],a=0,r=t.length;r>a;a++){var n=e.fetchIfRef(t[a])
i.push(f.parse(e,n))}return function(e,t,a,r){for(var n=0,s=i.length;s>n;n++)i[n](e,t,a,r+n)}},constructSampled:function(t,i){function a(e){for(var t=e.length,i=[],a=0,r=0;t>r;r+=2)i[a]=[e[r],e[r+1]],++a
return i}var r=i.getArray("Domain"),o=i.getArray("Range")
r&&o||n("No domain or range")
var c=r.length/2,l=o.length/2
r=a(r),o=a(o)
var h=i.get("Size"),u=i.get("BitsPerSample"),d=i.get("Order")||1
1!==d&&s("No support for cubic spline interpolation: "+d)
var f=i.getArray("Encode")
if(!f){f=[]
for(var g=0;c>g;++g)f.push(0),f.push(h[g]-1)}f=a(f)
var p=i.getArray("Decode")
p=p?a(p):o
var m=this.getSampleArray(h,l,u,t)
return[e,c,r,f,p,m,h,l,Math.pow(2,u)-1,o]},constructSampledFromIR:function(e){function t(e,t,i,a,r){return a+(e-t)*((r-a)/(i-t))}return function(i,a,r,n){var s,o,c=e[1],l=e[2],h=e[3],u=e[4],d=e[5],f=e[6],g=e[7],p=e[9],m=1<<c,v=new Float64Array(m),b=new Uint32Array(m)
for(o=0;m>o;o++)v[o]=1
var y=g,w=1
for(s=0;c>s;++s){var k=l[s][0],C=l[s][1],x=Math.min(Math.max(i[a+s],k),C),S=t(x,k,C,h[s][0],h[s][1]),A=f[s]
S=Math.min(Math.max(S,0),A-1)
var I=A-1>S?Math.floor(S):S-1,P=I+1-S,B=S-I,T=I*y,L=T+y
for(o=0;m>o;o++)o&w?(v[o]*=B,b[o]+=L):(v[o]*=P,b[o]+=T)
y*=A,w<<=1}for(o=0;g>o;++o){var E=0
for(s=0;m>s;s++)E+=d[b[s]+o]*v[s]
E=t(E,0,1,u[o][0],u[o][1]),r[n+o]=Math.min(Math.max(E,p[o][0]),p[o][1])}}},constructInterpolated:function(e,i){var a=i.getArray("C0")||[0],r=i.getArray("C1")||[1],s=i.get("N")
o(a)&&o(r)||n("Illegal dictionary for interpolated function")
for(var c=a.length,l=[],h=0;c>h;++h)l.push(r[h]-a[h])
return[t,a,l,s]},constructInterpolatedFromIR:function(e){var t=e[1],i=e[2],a=e[3],r=i.length
return function(e,n,s,o){for(var c=1===a?e[n]:Math.pow(e[n],a),l=0;r>l;++l)s[o+l]=t[l]+c*i[l]}},constructStiched:function(e,t,a){var r=t.getArray("Domain")
r||n("No domain")
var s=r.length/2
1!==s&&n("Bad domain for stiched function")
for(var o=t.get("Functions"),c=[],l=0,h=o.length;h>l;++l)c.push(f.getIR(a,a.fetchIfRef(o[l])))
var u=t.getArray("Bounds"),d=t.getArray("Encode")
return[i,r,u,d,c]},constructStichedFromIR:function(e){for(var t=e[1],i=e[2],a=e[3],r=e[4],n=[],s=new Float32Array(1),o=0,c=r.length;c>o;o++)n.push(f.fromIR(r[o]))
return function(e,r,o,c){for(var l=function(e,t,i){return e>i?e=i:t>e&&(e=t),e},h=l(e[r],t[0],t[1]),u=0,d=i.length;d>u&&!(h<i[u]);++u);var f=t[0]
u>0&&(f=i[u-1])
var g=t[1]
u<i.length&&(g=i[u])
var p=a[2*u],m=a[2*u+1]
s[0]=f===g?p:p+(h-f)*(m-p)/(g-f),n[u](s,0,o,c)}},constructPostScript:function(e,t,i){var r=t.getArray("Domain"),s=t.getArray("Range")
r||n("No domain."),s||n("No range.")
var o=new u(e),c=new d(o),l=c.parse()
return[a,r,s,l]},constructPostScriptFromIR:function(e){var t=e[1],i=e[2],a=e[3],r=(new m).compile(a,t,i)
if(r)return Function("src","srcOffset","dest","destOffset",r)
s("Unable to compile PS function")
var n=i.length>>1,o=t.length>>1,c=new p(a),l=Object.create(null),h=8192,u=h,d=new Float32Array(o)
return function(e,t,a,r){var s,h,f="",g=d
for(s=0;o>s;s++)h=e[t+s],g[s]=h,f+=h+"_"
var p=l[f]
if(void 0!==p)return void a.set(p,r)
var m=new Float32Array(n),v=c.execute(g),b=v.length-n
for(s=0;n>s;s++){h=v[b+s]
var y=i[2*s]
y>h?h=y:(y=i[2*s+1],h>y&&(h=y)),m[s]=h}u>0&&(u--,l[f]=m),a.set(m,r)}}}}(),g=function(){function e(e){this.stack=e?Array.prototype.slice.call(e,0):[]}var t=100
return e.prototype={push:function(e){this.stack.length>=t&&n("PostScript function stack overflow."),this.stack.push(e)},pop:function(){return this.stack.length<=0&&n("PostScript function stack underflow."),this.stack.pop()},copy:function(e){this.stack.length+e>=t&&n("PostScript function stack overflow.")
for(var i=this.stack,a=i.length-e,r=e-1;r>=0;r--,a++)i.push(i[a])},index:function(e){this.push(this.stack[this.stack.length-e-1])},roll:function(e,t){var i,a,r,n=this.stack,s=n.length-e,o=n.length-1,c=s+(t-Math.floor(t/e)*e)
for(i=s,a=o;a>i;i++,a--)r=n[i],n[i]=n[a],n[a]=r
for(i=s,a=c-1;a>i;i++,a--)r=n[i],n[i]=n[a],n[a]=r
for(i=c,a=o;a>i;i++,a--)r=n[i],n[i]=n[a],n[a]=r}},e}(),p=function(){function e(e){this.operators=e}return e.prototype={execute:function(e){for(var t,i,a,r=new g(e),s=0,o=this.operators,l=o.length;l>s;)if(t=o[s++],"number"!=typeof t)switch(t){case"jz":a=r.pop(),i=r.pop(),i||(s=a)
break
case"j":i=r.pop(),s=i
break
case"abs":i=r.pop(),r.push(Math.abs(i))
break
case"add":a=r.pop(),i=r.pop(),r.push(i+a)
break
case"and":a=r.pop(),i=r.pop(),c(i)&&c(a)?r.push(i&&a):r.push(i&a)
break
case"atan":i=r.pop(),r.push(Math.atan(i))
break
case"bitshift":a=r.pop(),i=r.pop(),i>0?r.push(i<<a):r.push(i>>a)
break
case"ceiling":i=r.pop(),r.push(Math.ceil(i))
break
case"copy":i=r.pop(),r.copy(i)
break
case"cos":i=r.pop(),r.push(Math.cos(i))
break
case"cvi":i=0|r.pop(),r.push(i)
break
case"cvr":break
case"div":a=r.pop(),i=r.pop(),r.push(i/a)
break
case"dup":r.copy(1)
break
case"eq":a=r.pop(),i=r.pop(),r.push(i===a)
break
case"exch":r.roll(2,1)
break
case"exp":a=r.pop(),i=r.pop(),r.push(Math.pow(i,a))
break
case"false":r.push(!1)
break
case"floor":i=r.pop(),r.push(Math.floor(i))
break
case"ge":a=r.pop(),i=r.pop(),r.push(i>=a)
break
case"gt":a=r.pop(),i=r.pop(),r.push(i>a)
break
case"idiv":a=r.pop(),i=r.pop(),r.push(i/a|0)
break
case"index":i=r.pop(),r.index(i)
break
case"le":a=r.pop(),i=r.pop(),r.push(a>=i)
break
case"ln":i=r.pop(),r.push(Math.log(i))
break
case"log":i=r.pop(),r.push(Math.log(i)/Math.LN10)
break
case"lt":a=r.pop(),i=r.pop(),r.push(a>i)
break
case"mod":a=r.pop(),i=r.pop(),r.push(i%a)
break
case"mul":a=r.pop(),i=r.pop(),r.push(i*a)
break
case"ne":a=r.pop(),i=r.pop(),r.push(i!==a)
break
case"neg":i=r.pop(),r.push(-i)
break
case"not":i=r.pop(),c(i)?r.push(!i):r.push(~i)
break
case"or":a=r.pop(),i=r.pop(),c(i)&&c(a)?r.push(i||a):r.push(i|a)
break
case"pop":r.pop()
break
case"roll":a=r.pop(),i=r.pop(),r.roll(i,a)
break
case"round":i=r.pop(),r.push(Math.round(i))
break
case"sin":i=r.pop(),r.push(Math.sin(i))
break
case"sqrt":i=r.pop(),r.push(Math.sqrt(i))
break
case"sub":a=r.pop(),i=r.pop(),r.push(i-a)
break
case"true":r.push(!0)
break
case"truncate":i=r.pop(),i=0>i?Math.ceil(i):Math.floor(i),r.push(i)
break
case"xor":a=r.pop(),i=r.pop(),c(i)&&c(a)?r.push(i!==a):r.push(i^a)
break
default:n("Unknown operator "+t)}else r.push(t)
return r.stack}},e}(),m=function(){function e(e){this.type=e}function t(t,i,a){e.call(this,"args"),this.index=t,this.min=i,this.max=a}function i(t){e.call(this,"literal"),this.number=t,this.min=t,this.max=t}function a(t,i,a,r,n){e.call(this,"binary"),this.op=t,this.arg1=i,this.arg2=a,this.min=r,this.max=n}function r(t,i){e.call(this,"max"),this.arg=t,this.min=t.min,this.max=i}function n(t,i,a){e.call(this,"var"),this.index=t,this.min=i,this.max=a}function s(t,i){e.call(this,"definition"),this.variable=t,this.arg=i}function o(){this.parts=[]}function c(e,t){return"literal"===t.type&&0===t.number?e:"literal"===e.type&&0===e.number?t:"literal"===t.type&&"literal"===e.type?new i(e.number+t.number):new a("+",e,t,e.min+t.min,e.max+t.max)}function l(e,t){if("literal"===t.type){if(0===t.number)return new i(0)
if(1===t.number)return e
if("literal"===e.type)return new i(e.number*t.number)}if("literal"===e.type){if(0===e.number)return new i(0)
if(1===e.number)return t}var r=Math.min(e.min*t.min,e.min*t.max,e.max*t.min,e.max*t.max),n=Math.max(e.min*t.min,e.min*t.max,e.max*t.min,e.max*t.max)
return new a("*",e,t,r,n)}function h(e,t){if("literal"===t.type){if(0===t.number)return e
if("literal"===e.type)return new i(e.number-t.number)}return"binary"===t.type&&"-"===t.op&&"literal"===e.type&&1===e.number&&"literal"===t.arg1.type&&1===t.arg1.number?t.arg2:new a("-",e,t,e.min-t.max,e.max-t.min)}function u(e,t){return e.min>=t?new i(t):e.max<=t?e:new r(e,t)}function d(){}return e.prototype.visit=function(e){throw Error("abstract method")},t.prototype=Object.create(e.prototype),t.prototype.visit=function(e){e.visitArgument(this)},i.prototype=Object.create(e.prototype),i.prototype.visit=function(e){e.visitLiteral(this)},a.prototype=Object.create(e.prototype),a.prototype.visit=function(e){e.visitBinaryOperation(this)},r.prototype=Object.create(e.prototype),r.prototype.visit=function(e){e.visitMin(this)},n.prototype=Object.create(e.prototype),n.prototype.visit=function(e){e.visitVariable(this)},s.prototype=Object.create(e.prototype),s.prototype.visit=function(e){e.visitVariableDefinition(this)},o.prototype={visitArgument:function(e){this.parts.push("Math.max(",e.min,", Math.min(",e.max,", src[srcOffset + ",e.index,"]))")},visitVariable:function(e){this.parts.push("v",e.index)},visitLiteral:function(e){this.parts.push(e.number)},visitBinaryOperation:function(e){this.parts.push("("),e.arg1.visit(this),this.parts.push(" ",e.op," "),e.arg2.visit(this),this.parts.push(")")},visitVariableDefinition:function(e){this.parts.push("var "),e.variable.visit(this),this.parts.push(" = "),e.arg.visit(this),this.parts.push(";")},visitMin:function(e){this.parts.push("Math.min("),e.arg.visit(this),this.parts.push(", ",e.max,")")},toString:function(){return this.parts.join("")}},d.prototype={compile:function(e,a,r){var d,f,g,p,m,v,b,y,w,k,C=[],x=[],S=a.length>>1,A=r.length>>1,I=0
for(d=0;S>d;d++)C.push(new t(d,a[2*d],a[2*d+1]))
for(d=0,f=e.length;f>d;d++)if(k=e[d],"number"!=typeof k)switch(k){case"add":if(C.length<2)return null
v=C.pop(),m=C.pop(),C.push(c(m,v))
break
case"cvr":if(C.length<1)return null
break
case"mul":if(C.length<2)return null
v=C.pop(),m=C.pop(),C.push(l(m,v))
break
case"sub":if(C.length<2)return null
v=C.pop(),m=C.pop(),C.push(h(m,v))
break
case"exch":if(C.length<2)return null
b=C.pop(),y=C.pop(),C.push(b,y)
break
case"pop":if(C.length<1)return null
C.pop()
break
case"index":if(C.length<1)return null
if(m=C.pop(),"literal"!==m.type)return null
if(g=m.number,0>g||(0|g)!==g||C.length<g)return null
if(b=C[C.length-g-1],"literal"===b.type||"var"===b.type){C.push(b)
break}w=new n(I++,b.min,b.max),C[C.length-g-1]=w,C.push(w),x.push(new s(w,b))
break
case"dup":if(C.length<1)return null
if("number"==typeof e[d+1]&&"gt"===e[d+2]&&e[d+3]===d+7&&"jz"===e[d+4]&&"pop"===e[d+5]&&e[d+6]===e[d+1]){m=C.pop(),C.push(u(m,e[d+1])),d+=6
break}if(b=C[C.length-1],"literal"===b.type||"var"===b.type){C.push(b)
break}w=new n(I++,b.min,b.max),C[C.length-1]=w,C.push(w),x.push(new s(w,b))
break
case"roll":if(C.length<2)return null
if(v=C.pop(),m=C.pop(),"literal"!==v.type||"literal"!==m.type)return null
if(p=v.number,g=m.number,0>=g||(0|g)!==g||(0|p)!==p||C.length<g)return null
if(p=(p%g+g)%g,0===p)break
Array.prototype.push.apply(C,C.splice(C.length-g,g-p))
break
default:return null}else C.push(new i(k))
if(C.length!==A)return null
var P=[]
return x.forEach(function(e){var t=new o
e.visit(t),P.push(""+t)}),C.forEach(function(e,t){var i=new o
e.visit(i)
var a=r[2*t],n=r[2*t+1],s=[""+i]
a>e.min&&(s.unshift("Math.max(",a,", "),s.push(")")),n<e.max&&(s.unshift("Math.min(",n,", "),s.push(")")),s.unshift("dest[destOffset + ",t,"] = "),s.push(";"),P.push(s.join(""))}),P.join("\n")}},d}()
e.isPDFFunction=r,e.PDFFunction=f,e.PostScriptEvaluator=p,e.PostScriptCompiler=m}),function(e,t){t(e.pdfjsCoreColorSpace={},e.pdfjsSharedUtil,e.pdfjsCorePrimitives,e.pdfjsCoreFunction)}(this,function(e,t,i,a){var r=t.error,n=t.info,s=t.isArray,o=t.isString,c=t.shadow,l=t.warn,h=i.isDict,u=i.isName,d=i.isStream,f=a.PDFFunction,g=function(){function e(e,t,i,a,r,n,s,o){var c=3
s=1!==s?0:s
var l,h,u,d,f=i/r,g=a/n,p=0,m=new Uint16Array(r),v=i*c
for(l=0;r>l;l++)m[l]=Math.floor(l*f)*c
for(l=0;n>l;l++)for(u=Math.floor(l*g)*v,h=0;r>h;h++)d=u+m[h],o[p++]=e[d++],o[p++]=e[d++],o[p++]=e[d++],p+=s}function t(){r("should not call ColorSpace constructor")}return t.prototype={getRgb:function(e,t){var i=new Uint8Array(3)
return this.getRgbItem(e,t,i,0),i},getRgbItem:function(e,t,i,a){r("Should not call ColorSpace.getRgbItem")},getRgbBuffer:function(e,t,i,a,n,s,o){r("Should not call ColorSpace.getRgbBuffer")},getOutputLength:function(e,t){r("Should not call ColorSpace.getOutputLength")},isPassthrough:function(e){return!1},fillRgb:function(t,i,a,r,n,s,o,c,l){var h,u,d=i*a,f=null,g=1<<o,p=a!==n||i!==r
if(this.isPassthrough(o))f=c
else if(1===this.numComps&&d>g&&"DeviceGray"!==this.name&&"DeviceRGB"!==this.name){var m,v=8>=o?new Uint8Array(g):new Uint16Array(g)
for(h=0;g>h;h++)v[h]=h
var b=new Uint8Array(3*g)
this.getRgbBuffer(v,0,g,b,0,o,0)
var y,w
if(p)for(f=new Uint8Array(3*d),w=0,h=0;d>h;++h)m=3*c[h],f[w++]=b[m],f[w++]=b[m+1],f[w++]=b[m+2]
else for(y=0,h=0;d>h;++h)m=3*c[h],t[y++]=b[m],t[y++]=b[m+1],t[y++]=b[m+2],y+=l}else p?(f=new Uint8Array(3*d),this.getRgbBuffer(c,0,d,f,0,o,0)):this.getRgbBuffer(c,0,r*s,t,0,o,l)
if(f)if(p)e(f,o,i,a,r,n,l,t)
else for(w=0,y=0,h=0,u=r*s;u>h;h++)t[y++]=f[w++],t[y++]=f[w++],t[y++]=f[w++],y+=l},usesZeroToOneRange:!0},t.parse=function(e,i,a){var r=t.parseToIR(e,i,a)
return r instanceof p?r:t.fromIR(r)},t.fromIR=function(e){var i,a,n,o=s(e)?e[0]:e
switch(o){case"DeviceGrayCS":return this.singletons.gray
case"DeviceRgbCS":return this.singletons.rgb
case"DeviceCmykCS":return this.singletons.cmyk
case"CalGrayCS":return i=e[1],a=e[2],n=e[3],new k(i,a,n)
case"CalRGBCS":i=e[1],a=e[2],n=e[3]
var c=e[4]
return new C(i,a,n,c)
case"PatternCS":var l=e[1]
return l&&(l=t.fromIR(l)),new m(l)
case"IndexedCS":var h=e[1],u=e[2],d=e[3]
return new v(t.fromIR(h),u,d)
case"AlternateCS":var g=e[1],b=e[2],y=e[3]
return new p(g,t.fromIR(b),f.fromIR(y))
case"LabCS":i=e[1],a=e[2]
var w=e[3]
return new x(i,a,w)
default:r("Unknown name "+o)}return null},t.parseToIR=function(e,i,a){if(u(e)){var n=a.get("ColorSpace")
if(h(n)){var o=n.get(e.name)
o&&(e=o)}}if(e=i.fetchIfRef(e),u(e))switch(e.name){case"DeviceGray":case"G":return"DeviceGrayCS"
case"DeviceRGB":case"RGB":return"DeviceRgbCS"
case"DeviceCMYK":case"CMYK":return"DeviceCmykCS"
case"Pattern":return["PatternCS",null]
default:r("unrecognized colorspace "+e.name)}else if(s(e)){var c,g,p,m,v,b,y=i.fetchIfRef(e[0]).name
switch(y){case"DeviceGray":case"G":return"DeviceGrayCS"
case"DeviceRGB":case"RGB":return"DeviceRgbCS"
case"DeviceCMYK":case"CMYK":return"DeviceCmykCS"
case"CalGray":return g=i.fetchIfRef(e[1]),m=g.getArray("WhitePoint"),v=g.getArray("BlackPoint"),b=g.get("Gamma"),["CalGrayCS",m,v,b]
case"CalRGB":g=i.fetchIfRef(e[1]),m=g.getArray("WhitePoint"),v=g.getArray("BlackPoint"),b=g.getArray("Gamma")
var w=g.getArray("Matrix")
return["CalRGBCS",m,v,b,w]
case"ICCBased":var k=i.fetchIfRef(e[1]),C=k.dict
if(c=C.get("N"),p=C.get("Alternate")){var x=t.parseToIR(p,i,a),S=t.fromIR(x)
if(S.numComps===c)return x
l("ICCBased color space: Ignoring incorrect /Alternate entry.")}if(1===c)return"DeviceGrayCS"
if(3===c)return"DeviceRgbCS"
if(4===c)return"DeviceCmykCS"
break
case"Pattern":var A=e[1]||null
return A&&(A=t.parseToIR(A,i,a)),["PatternCS",A]
case"Indexed":case"I":var I=t.parseToIR(e[1],i,a),P=i.fetchIfRef(e[2])+1,B=i.fetchIfRef(e[3])
return d(B)&&(B=B.getBytes()),["IndexedCS",I,P,B]
case"Separation":case"DeviceN":var T=i.fetchIfRef(e[1])
c=s(T)?T.length:1,p=t.parseToIR(e[2],i,a)
var L=f.getIR(i,i.fetchIfRef(e[3]))
return["AlternateCS",c,p,L]
case"Lab":g=i.fetchIfRef(e[1]),m=g.getArray("WhitePoint"),v=g.getArray("BlackPoint")
var E=g.getArray("Range")
return["LabCS",m,v,E]
default:r('unimplemented color space object "'+y+'"')}}else r('unrecognized color space object: "'+e+'"')
return null},t.isDefaultDecode=function(e,t){if(!s(e))return!0
if(2*t!==e.length)return l("The decode map is not the correct length"),!0
for(var i=0,a=e.length;a>i;i+=2)if(0!==e[i]||1!==e[i+1])return!1
return!0},t.singletons={get gray(){return c(this,"gray",new b)},get rgb(){return c(this,"rgb",new y)},get cmyk(){return c(this,"cmyk",new w)}},t}(),p=function(){function e(e,t,i){this.name="Alternate",this.numComps=e,this.defaultColor=new Float32Array(e)
for(var a=0;e>a;++a)this.defaultColor[a]=1
this.base=t,this.tintFn=i,this.tmpBuf=new Float32Array(t.numComps)}return e.prototype={getRgb:g.prototype.getRgb,getRgbItem:function(e,t,i,a){var r=this.tmpBuf
this.tintFn(e,t,r,0),this.base.getRgbItem(r,0,i,a)},getRgbBuffer:function(e,t,i,a,r,n,s){var o,c,l=this.tintFn,h=this.base,u=1/((1<<n)-1),d=h.numComps,f=h.usesZeroToOneRange,g=(h.isPassthrough(8)||!f)&&0===s,p=g?r:0,m=g?a:new Uint8Array(d*i),v=this.numComps,b=new Float32Array(v),y=new Float32Array(d)
for(o=0;i>o;o++){for(c=0;v>c;c++)b[c]=e[t++]*u
if(l(b,0,y,0),f)for(c=0;d>c;c++)m[p++]=255*y[c]
else h.getRgbItem(y,0,m,p),p+=d}g||h.getRgbBuffer(m,0,i,a,r,8,s)},getOutputLength:function(e,t){return this.base.getOutputLength(e*this.base.numComps/this.numComps,t)},isPassthrough:g.prototype.isPassthrough,fillRgb:g.prototype.fillRgb,isDefaultDecode:function(e){return g.isDefaultDecode(e,this.numComps)},usesZeroToOneRange:!0},e}(),m=function(){function e(e){this.name="Pattern",this.base=e}return e.prototype={},e}(),v=function(){function e(e,t,i){this.name="Indexed",this.numComps=1,this.defaultColor=new Uint8Array(this.numComps),this.base=e,this.highVal=t
var a=e.numComps,n=a*t
if(d(i)){this.lookup=new Uint8Array(n)
var s=i.getBytes(n)
this.lookup.set(s)}else if(o(i)){this.lookup=new Uint8Array(n)
for(var c=0;n>c;++c)this.lookup[c]=i.charCodeAt(c)}else i instanceof Uint8Array||i instanceof Array?this.lookup=i:r("Unrecognized lookup table: "+i)}return e.prototype={getRgb:g.prototype.getRgb,getRgbItem:function(e,t,i,a){var r=this.base.numComps,n=e[t]*r
this.base.getRgbItem(this.lookup,n,i,a)},getRgbBuffer:function(e,t,i,a,r,n,s){for(var o=this.base,c=o.numComps,l=o.getOutputLength(c,s),h=this.lookup,u=0;i>u;++u){var d=e[t++]*c
o.getRgbBuffer(h,d,1,a,r,8,s),r+=l}},getOutputLength:function(e,t){return this.base.getOutputLength(e*this.base.numComps,t)},isPassthrough:g.prototype.isPassthrough,fillRgb:g.prototype.fillRgb,isDefaultDecode:function(e){return!0},usesZeroToOneRange:!0},e}(),b=function(){function e(){this.name="DeviceGray",this.numComps=1,this.defaultColor=new Float32Array(this.numComps)}return e.prototype={getRgb:g.prototype.getRgb,getRgbItem:function(e,t,i,a){var r=255*e[t]|0
r=0>r?0:r>255?255:r,i[a]=i[a+1]=i[a+2]=r},getRgbBuffer:function(e,t,i,a,r,n,s){for(var o=255/((1<<n)-1),c=t,l=r,h=0;i>h;++h){var u=o*e[c++]|0
a[l++]=u,a[l++]=u,a[l++]=u,l+=s}},getOutputLength:function(e,t){return e*(3+t)},isPassthrough:g.prototype.isPassthrough,fillRgb:g.prototype.fillRgb,isDefaultDecode:function(e){return g.isDefaultDecode(e,this.numComps)},usesZeroToOneRange:!0},e}(),y=function(){function e(){this.name="DeviceRGB",this.numComps=3,this.defaultColor=new Float32Array(this.numComps)}return e.prototype={getRgb:g.prototype.getRgb,getRgbItem:function(e,t,i,a){var r=255*e[t]|0,n=255*e[t+1]|0,s=255*e[t+2]|0
i[a]=0>r?0:r>255?255:r,i[a+1]=0>n?0:n>255?255:n,i[a+2]=0>s?0:s>255?255:s},getRgbBuffer:function(e,t,i,a,r,n,s){if(8===n&&0===s)return void a.set(e.subarray(t,t+3*i),r)
for(var o=255/((1<<n)-1),c=t,l=r,h=0;i>h;++h)a[l++]=o*e[c++]|0,a[l++]=o*e[c++]|0,a[l++]=o*e[c++]|0,l+=s},getOutputLength:function(e,t){return e*(3+t)/3|0},isPassthrough:function(e){return 8===e},fillRgb:g.prototype.fillRgb,isDefaultDecode:function(e){return g.isDefaultDecode(e,this.numComps)},usesZeroToOneRange:!0},e}(),w=function(){function e(e,t,i,a,r){var n=e[t+0]*i,s=e[t+1]*i,o=e[t+2]*i,c=e[t+3]*i,l=n*(-4.387332384609988*n+54.48615194189176*s+18.82290502165302*o+212.25662451639585*c+-285.2331026137004)+s*(1.7149763477362134*s-5.6096736904047315*o+-17.873870861415444*c-5.497006427196366)+o*(-2.5217340131683033*o-21.248923337353073*c+17.5119270841813)+c*(-21.86122147463605*c-189.48180835922747)+255|0,h=n*(8.841041422036149*n+60.118027045597366*s+6.871425592049007*o+31.159100130055922*c+-79.2970844816548)+s*(-15.310361306967817*s+17.575251261109482*o+131.35250912493976*c-190.9453302588951)+o*(4.444339102852739*o+9.8632861493405*c-24.86741582555878)+c*(-20.737325471181034*c-187.80453709719578)+255|0,u=n*(.8842522430003296*n+8.078677503112928*s+30.89978309703729*o-.23883238689178934*c+-14.183576799673286)+s*(10.49593273432072*s+63.02378494754052*o+50.606957656360734*c-112.23884253719248)+o*(.03296041114873217*o+115.60384449646641*c+-193.58209356861505)+c*(-22.33816807309886*c-180.12613974708367)+255|0
a[r]=l>255?255:0>l?0:l,a[r+1]=h>255?255:0>h?0:h,a[r+2]=u>255?255:0>u?0:u}function t(){this.name="DeviceCMYK",this.numComps=4,this.defaultColor=new Float32Array(this.numComps),this.defaultColor[3]=1}return t.prototype={getRgb:g.prototype.getRgb,getRgbItem:function(t,i,a,r){e(t,i,1,a,r)},getRgbBuffer:function(t,i,a,r,n,s,o){for(var c=1/((1<<s)-1),l=0;a>l;l++)e(t,i,c,r,n),i+=4,n+=3+o},getOutputLength:function(e,t){return e/4*(3+t)|0},isPassthrough:g.prototype.isPassthrough,fillRgb:g.prototype.fillRgb,isDefaultDecode:function(e){return g.isDefaultDecode(e,this.numComps)},usesZeroToOneRange:!0},t}(),k=function(){function e(e,t,i){this.name="CalGray",this.numComps=1,this.defaultColor=new Float32Array(this.numComps),e||r("WhitePoint missing - required for color space CalGray"),t=t||[0,0,0],i=i||1,this.XW=e[0],this.YW=e[1],this.ZW=e[2],this.XB=t[0],this.YB=t[1],this.ZB=t[2],this.G=i,(this.XW<0||this.ZW<0||1!==this.YW)&&r("Invalid WhitePoint components for "+this.name+", no fallback available"),(this.XB<0||this.YB<0||this.ZB<0)&&(n("Invalid BlackPoint for "+this.name+", falling back to default"),this.XB=this.YB=this.ZB=0),(0!==this.XB||0!==this.YB||0!==this.ZB)&&l(this.name+", BlackPoint: XB: "+this.XB+", YB: "+this.YB+", ZB: "+this.ZB+", only default values are supported."),this.G<1&&(n("Invalid Gamma: "+this.G+" for "+this.name+", falling back to default"),this.G=1)}function t(e,t,i,a,r,n){var s=t[i]*n,o=Math.pow(s,e.G),c=e.YW*o,l=0|Math.max(295.8*Math.pow(c,.3333333333333333)-40.8,0)
a[r]=l,a[r+1]=l,a[r+2]=l}return e.prototype={getRgb:g.prototype.getRgb,getRgbItem:function(e,i,a,r){t(this,e,i,a,r,1)},getRgbBuffer:function(e,i,a,r,n,s,o){for(var c=1/((1<<s)-1),l=0;a>l;++l)t(this,e,i,r,n,c),i+=1,n+=3+o},getOutputLength:function(e,t){return e*(3+t)},isPassthrough:g.prototype.isPassthrough,fillRgb:g.prototype.fillRgb,isDefaultDecode:function(e){return g.isDefaultDecode(e,this.numComps)},usesZeroToOneRange:!0},e}(),C=function(){function e(e,t,i,a){this.name="CalRGB",this.numComps=3,this.defaultColor=new Float32Array(this.numComps),e||r("WhitePoint missing - required for color space CalRGB"),t=t||new Float32Array(3),i=i||new Float32Array([1,1,1]),a=a||new Float32Array([1,0,0,0,1,0,0,0,1])
var s=e[0],o=e[1],c=e[2]
this.whitePoint=e
var l=t[0],h=t[1],u=t[2]
this.blackPoint=t,this.GR=i[0],this.GG=i[1],this.GB=i[2],this.MXA=a[0],this.MYA=a[1],this.MZA=a[2],this.MXB=a[3],this.MYB=a[4],this.MZB=a[5],this.MXC=a[6],this.MYC=a[7],this.MZC=a[8],(0>s||0>c||1!==o)&&r("Invalid WhitePoint components for "+this.name+", no fallback available"),(0>l||0>h||0>u)&&(n("Invalid BlackPoint for "+this.name+" ["+l+", "+h+", "+u+"], falling back to default"),this.blackPoint=new Float32Array(3)),(this.GR<0||this.GG<0||this.GB<0)&&(n("Invalid Gamma ["+this.GR+", "+this.GG+", "+this.GB+"] for "+this.name+", falling back to default"),this.GR=this.GG=this.GB=1),(this.MXA<0||this.MYA<0||this.MZA<0||this.MXB<0||this.MYB<0||this.MZB<0||this.MXC<0||this.MYC<0||this.MZC<0)&&(n("Invalid Matrix for "+this.name+" ["+this.MXA+", "+this.MYA+", "+this.MZA+this.MXB+", "+this.MYB+", "+this.MZB+this.MXC+", "+this.MYC+", "+this.MZC+"], falling back to default"),this.MXA=this.MYB=this.MZC=1,this.MXB=this.MYA=this.MZA=this.MXC=this.MYC=this.MZB=0)}function t(e,t,i){i[0]=e[0]*t[0]+e[1]*t[1]+e[2]*t[2],i[1]=e[3]*t[0]+e[4]*t[1]+e[5]*t[2],i[2]=e[6]*t[0]+e[7]*t[1]+e[8]*t[2]}function i(e,t,i){i[0]=1*t[0]/e[0],i[1]=1*t[1]/e[1],i[2]=1*t[2]/e[2]}function a(e,t,i){var a=.95047,r=1,n=1.08883
i[0]=t[0]*a/e[0],i[1]=t[1]*r/e[1],i[2]=t[2]*n/e[2]}function s(e){return.0031308>=e?o(0,1,12.92*e):o(0,1,1.055*Math.pow(e,1/2.4)-.055)}function o(e,t,i){return Math.max(e,Math.min(t,i))}function c(e){return 0>e?-c(-e):e>8?Math.pow((e+16)/116,3):e*k}function l(e,t,i){if(0===e[0]&&0===e[1]&&0===e[2])return i[0]=t[0],i[1]=t[1],void(i[2]=t[2])
var a=c(0),r=a,n=c(e[0]),s=a,o=c(e[1]),l=a,h=c(e[2]),u=(1-r)/(1-n),d=1-u,f=(1-s)/(1-o),g=1-f,p=(1-l)/(1-h),m=1-p
i[0]=t[0]*u+d,i[1]=t[1]*f+g,i[2]=t[2]*p+m}function h(e,a,r){if(1===e[0]&&1===e[2])return r[0]=a[0],r[1]=a[1],void(r[2]=a[2])
var n=r
t(f,a,n)
var s=b
i(e,n,s),t(p,s,r)}function u(e,i,r){var n=r
t(f,i,n)
var s=b
a(e,n,s),t(p,s,r)}function d(e,i,a,r,n,c){var d=o(0,1,i[a]*c),f=o(0,1,i[a+1]*c),g=o(0,1,i[a+2]*c),p=Math.pow(d,e.GR),b=Math.pow(f,e.GG),k=Math.pow(g,e.GB),C=e.MXA*p+e.MXB*b+e.MXC*k,x=e.MYA*p+e.MYB*b+e.MYC*k,S=e.MZA*p+e.MZB*b+e.MZC*k,A=y
A[0]=C,A[1]=x,A[2]=S
var I=w
h(e.whitePoint,A,I)
var P=y
l(e.blackPoint,I,P)
var B=w
u(v,P,B)
var T=y
t(m,B,T)
var L=s(T[0]),E=s(T[1]),R=s(T[2])
r[n]=Math.round(255*L),r[n+1]=Math.round(255*E),r[n+2]=Math.round(255*R)}var f=new Float32Array([.8951,.2664,-.1614,-.7502,1.7135,.0367,.0389,-.0685,1.0296]),p=new Float32Array([.9869929,-.1470543,.1599627,.4323053,.5183603,.0492912,-.0085287,.0400428,.9684867]),m=new Float32Array([3.2404542,-1.5371385,-.4985314,-.969266,1.8760108,.041556,.0556434,-.2040259,1.0572252]),v=new Float32Array([1,1,1]),b=new Float32Array(3),y=new Float32Array(3),w=new Float32Array(3),k=Math.pow(24/116,3)/8
return e.prototype={getRgb:function(e,t){var i=new Uint8Array(3)
return this.getRgbItem(e,t,i,0),i},getRgbItem:function(e,t,i,a){d(this,e,t,i,a,1)},getRgbBuffer:function(e,t,i,a,r,n,s){for(var o=1/((1<<n)-1),c=0;i>c;++c)d(this,e,t,a,r,o),t+=3,r+=3+s},getOutputLength:function(e,t){return e*(3+t)/3|0},isPassthrough:g.prototype.isPassthrough,fillRgb:g.prototype.fillRgb,isDefaultDecode:function(e){return g.isDefaultDecode(e,this.numComps)},usesZeroToOneRange:!0},e}(),x=function(){function e(e,t,i){this.name="Lab",this.numComps=3,this.defaultColor=new Float32Array(this.numComps),e||r("WhitePoint missing - required for color space Lab"),t=t||[0,0,0],i=i||[-100,100,-100,100],this.XW=e[0],this.YW=e[1],this.ZW=e[2],this.amin=i[0],this.amax=i[1],this.bmin=i[2],this.bmax=i[3],this.XB=t[0],this.YB=t[1],this.ZB=t[2],(this.XW<0||this.ZW<0||1!==this.YW)&&r("Invalid WhitePoint components, no fallback available"),(this.XB<0||this.YB<0||this.ZB<0)&&(n("Invalid BlackPoint, falling back to default"),this.XB=this.YB=this.ZB=0),(this.amin>this.amax||this.bmin>this.bmax)&&(n("Invalid Range, falling back to defaults"),this.amin=-100,this.amax=100,this.bmin=-100,this.bmax=100)}function t(e){var t
return t=e>=6/29?e*e*e:108/841*(e-4/29)}function i(e,t,i,a){return i+e*(a-i)/t}function a(e,a,r,n,s,o){var c=a[r],l=a[r+1],h=a[r+2]
n!==!1&&(c=i(c,n,0,100),l=i(l,n,e.amin,e.amax),h=i(h,n,e.bmin,e.bmax)),l=l>e.amax?e.amax:l<e.amin?e.amin:l,h=h>e.bmax?e.bmax:h<e.bmin?e.bmin:h
var u,d,f,g=(c+16)/116,p=g+l/500,m=g-h/200,v=e.XW*t(p),b=e.YW*t(g),y=e.ZW*t(m)
e.ZW<1?(u=3.1339*v+-1.617*b+y*-.4906,d=v*-.9785+1.916*b+.0333*y,f=.072*v+b*-.229+1.4057*y):(u=3.2406*v+-1.5372*b+y*-.4986,d=v*-.9689+1.8758*b+.0415*y,f=.0557*v+b*-.204+1.057*y),s[o]=0>=u?0:u>=1?255:255*Math.sqrt(u)|0,s[o+1]=0>=d?0:d>=1?255:255*Math.sqrt(d)|0,s[o+2]=0>=f?0:f>=1?255:255*Math.sqrt(f)|0}return e.prototype={getRgb:g.prototype.getRgb,getRgbItem:function(e,t,i,r){a(this,e,t,!1,i,r)},getRgbBuffer:function(e,t,i,r,n,s,o){for(var c=(1<<s)-1,l=0;i>l;l++)a(this,e,t,c,r,n),t+=3,n+=3+o},getOutputLength:function(e,t){return e*(3+t)/3|0},isPassthrough:g.prototype.isPassthrough,fillRgb:g.prototype.fillRgb,isDefaultDecode:function(e){return!0},usesZeroToOneRange:!1},e}()
e.ColorSpace=g}),function(e,t){t(e.pdfjsCoreImage={},e.pdfjsSharedUtil,e.pdfjsCorePrimitives,e.pdfjsCoreColorSpace,e.pdfjsCoreStream,e.pdfjsCoreJpx)}(this,function(e,t,i,a,r,n){var s=t.ImageKind,o=t.assert,c=t.error,l=t.info,h=t.isArray,u=t.warn,d=i.Name,f=i.isStream,g=a.ColorSpace,p=r.DecodeStream,m=r.JpegStream,v=n.JpxImage,b=function(){function e(e,t){return t&&t.canDecode(e)?t.decode(e):Promise.resolve(e)}function t(e,t,i,a){return e=t+e*i,0>e?0:e>a?a:e}function i(e,t,i,a,r,n){var s,o,c,l,h=r*n,u=8>=t?new Uint8Array(h):16>=t?new Uint16Array(h):new Uint32Array(h),d=i/r,f=a/n,g=0,p=new Uint16Array(r),m=i
for(s=0;r>s;s++)p[s]=Math.floor(s*d)
for(s=0;n>s;s++)for(c=Math.floor(s*f)*m,o=0;r>o;o++)l=c+p[o],u[g++]=e[l]
return u}function a(e,t,i,r,n,s,o){this.image=i
var h=i.dict
if(h.has("Filter")){var p=h.get("Filter").name
if("JPXDecode"===p){var m=new v
m.parseImageProperties(i.stream),i.stream.reset(),i.bitsPerComponent=m.bitsPerComponent,i.numComps=m.componentsCount}else"JBIG2Decode"===p&&(i.bitsPerComponent=1,i.numComps=1)}this.width=h.get("Width","W"),this.height=h.get("Height","H"),(this.width<1||this.height<1)&&c("Invalid image width: "+this.width+" or height: "+this.height),this.interpolate=h.get("Interpolate","I")||!1,this.imageMask=h.get("ImageMask","IM")||!1,this.matte=h.get("Matte")||!1
var b=i.bitsPerComponent
if(b||(b=h.get("BitsPerComponent","BPC"),b||(this.imageMask?b=1:c("Bits per component missing in image: "+this.imageMask))),this.bpc=b,!this.imageMask){var y=h.get("ColorSpace","CS")
if(!y)switch(l("JPX images (which do not require color spaces)"),i.numComps){case 1:y=d.get("DeviceGray")
break
case 3:y=d.get("DeviceRGB")
break
case 4:y=d.get("DeviceCMYK")
break
default:c("JPX images with "+this.numComps+" color components not supported.")}this.colorSpace=g.parse(y,e,t),this.numComps=this.colorSpace.numComps}if(this.decode=h.getArray("Decode","D"),this.needsDecode=!1,this.decode&&(this.colorSpace&&!this.colorSpace.isDefaultDecode(this.decode)||o&&!g.isDefaultDecode(this.decode,1))){this.needsDecode=!0
var w=(1<<b)-1
this.decodeCoefficients=[],this.decodeAddends=[]
for(var k=0,C=0;k<this.decode.length;k+=2,++C){var x=this.decode[k],S=this.decode[k+1]
this.decodeCoefficients[C]=S-x,this.decodeAddends[C]=w*x}}if(n)this.smask=new a(e,t,n,!1)
else if(s)if(f(s)){var A=s.dict,I=A.get("ImageMask","IM")
I?this.mask=new a(e,t,s,!1,null,null,!0):u("Ignoring /Mask in image without /ImageMask.")}else this.mask=s}return a.buildImage=function(t,i,r,n,s,o){var c,l,d=e(n,o),g=n.dict.get("SMask"),p=n.dict.get("Mask")
return g?(c=e(g,o),l=Promise.resolve(null)):(c=Promise.resolve(null),p?f(p)?l=e(p,o):h(p)?l=Promise.resolve(p):(u("Unsupported mask format."),l=Promise.resolve(null)):l=Promise.resolve(null)),Promise.all([d,c,l]).then(function(e){var t=e[0],n=e[1],o=e[2]
return new a(i,r,t,s,n,o)})},a.createMask=function(e,t,i,a,r){var n,s,o=(t+7>>3)*i,c=e.byteLength,l=o===c
if(!a||r&&!l)if(r)for(n=new Uint8Array(o),n.set(e),s=c;o>s;s++)n[s]=255
else n=new Uint8Array(c),n.set(e)
else n=e
if(r)for(s=0;c>s;s++)n[s]=~n[s]
return{data:n,width:t,height:i}},a.prototype={get drawWidth(){return Math.max(this.width,this.smask&&this.smask.width||0,this.mask&&this.mask.width||0)},get drawHeight(){return Math.max(this.height,this.smask&&this.smask.height||0,this.mask&&this.mask.height||0)},decodeBuffer:function(e){var i,a,r=this.bpc,n=this.numComps,s=this.decodeAddends,o=this.decodeCoefficients,c=(1<<r)-1
if(1!==r){var l=0
for(i=0,a=this.width*this.height;a>i;i++)for(var h=0;n>h;h++)e[l]=t(e[l],s[h],o[h],c),l++}else for(i=0,a=e.length;a>i;i++)e[i]=+!e[i]},getComponents:function(e){var t=this.bpc
if(8===t)return e
var i,a,r=this.width,n=this.height,s=this.numComps,o=r*n*s,c=0,l=8>=t?new Uint8Array(o):16>=t?new Uint16Array(o):new Uint32Array(o),h=r*s,u=(1<<t)-1,d=0
if(1===t)for(var f,g,p,m=0;n>m;m++){for(g=d+(-8&h),p=d+h;g>d;)a=e[c++],l[d]=a>>7&1,l[d+1]=a>>6&1,l[d+2]=a>>5&1,l[d+3]=a>>4&1,l[d+4]=a>>3&1,l[d+5]=a>>2&1,l[d+6]=a>>1&1,l[d+7]=1&a,d+=8
if(p>d)for(a=e[c++],f=128;p>d;)l[d++]=+!!(a&f),f>>=1}else{var v=0
for(a=0,d=0,i=o;i>d;++d){for(d%h===0&&(a=0,v=0);t>v;)a=a<<8|e[c++],v+=8
var b=v-t,y=a>>b
l[d]=0>y?0:y>u?u:y,a&=(1<<b)-1,v=b}}return l},fillOpacity:function(e,t,r,n,s){var o,l,u,d,f,g,p=this.smask,m=this.mask
if(p)l=p.width,u=p.height,o=new Uint8Array(l*u),p.fillGrayBuffer(o),(l!==t||u!==r)&&(o=i(o,p.bpc,l,u,t,r))
else if(m)if(m instanceof a){for(l=m.width,u=m.height,o=new Uint8Array(l*u),m.numComps=1,m.fillGrayBuffer(o),d=0,f=l*u;f>d;++d)o[d]=255-o[d];(l!==t||u!==r)&&(o=i(o,m.bpc,l,u,t,r))}else if(h(m)){o=new Uint8Array(t*r)
var v=this.numComps
for(d=0,f=t*r;f>d;++d){var b=0,y=d*v
for(g=0;v>g;++g){var w=s[y+g],k=2*g
if(w<m[k]||w>m[k+1]){b=255
break}}o[d]=b}}else c("Unknown mask format.")
if(o)for(d=0,g=3,f=t*n;f>d;++d,g+=4)e[g]=o[d]
else for(d=0,g=3,f=t*n;f>d;++d,g+=4)e[g]=255},undoPreblend:function(e,t,i){var a=this.smask&&this.smask.matte
if(a)for(var r,n,s,o=this.colorSpace.getRgb(a,0),c=o[0],l=o[1],h=o[2],u=t*i*4,d=0;u>d;d+=4){var f=e[d+3]
if(0!==f){var g=255/f
r=(e[d]-c)*g+c,n=(e[d+1]-l)*g+l,s=(e[d+2]-h)*g+h,e[d]=0>=r?0:r>=255?255:0|r,e[d+1]=0>=n?0:n>=255?255:0|n,e[d+2]=0>=s?0:s>=255?255:0|s}else e[d]=255,e[d+1]=255,e[d+2]=255}},createImageData:function(e){var t,i=this.drawWidth,a=this.drawHeight,r={width:i,height:a},n=this.numComps,c=this.width,l=this.height,h=this.bpc,u=c*n*h+7>>3
if(!e){var d
if("DeviceGray"===this.colorSpace.name&&1===h?d=s.GRAYSCALE_1BPP:"DeviceRGB"!==this.colorSpace.name||8!==h||this.needsDecode||(d=s.RGB_24BPP),d&&!this.smask&&!this.mask&&i===c&&a===l){if(r.kind=d,t=this.getImageBytes(l*u),this.image instanceof p)r.data=t
else{var f=new Uint8Array(t.length)
f.set(t),r.data=f}if(this.needsDecode){o(d===s.GRAYSCALE_1BPP)
for(var g=r.data,v=0,b=g.length;b>v;v++)g[v]^=255}return r}if(this.image instanceof m&&!this.smask&&!this.mask&&("DeviceGray"===this.colorSpace.name||"DeviceRGB"===this.colorSpace.name||"DeviceCMYK"===this.colorSpace.name))return r.kind=s.RGB_24BPP,r.data=this.getImageBytes(l*u,i,a,!0),r}t=this.getImageBytes(l*u)
var y,w,k=0|t.length/u*a/l,C=this.getComponents(t)
return e||this.smask||this.mask?(r.kind=s.RGBA_32BPP,r.data=new Uint8Array(i*a*4),y=1,w=!0,this.fillOpacity(r.data,i,a,k,C)):(r.kind=s.RGB_24BPP,r.data=new Uint8Array(i*a*3),y=0,w=!1),this.needsDecode&&this.decodeBuffer(C),this.colorSpace.fillRgb(r.data,c,l,i,a,k,h,C,y),w&&this.undoPreblend(r.data,i,k),r},fillGrayBuffer:function(e){var t=this.numComps
1!==t&&c("Reading gray scale from a color image: "+t)
var i,a,r=this.width,n=this.height,s=this.bpc,o=r*t*s+7>>3,l=this.getImageBytes(n*o),h=this.getComponents(l)
if(1!==s){this.needsDecode&&this.decodeBuffer(h),a=r*n
var u=255/((1<<s)-1)
for(i=0;a>i;++i)e[i]=u*h[i]|0}else if(a=r*n,this.needsDecode)for(i=0;a>i;++i)e[i]=h[i]-1&255
else for(i=0;a>i;++i)e[i]=255&-h[i]},getImageBytes:function(e,t,i,a){return this.image.reset(),this.image.drawWidth=t||this.width,this.image.drawHeight=i||this.height,this.image.forceRGB=!!a,this.image.getBytes(e)}},a}()
e.PDFImage=b}),function(e,t){t(e.pdfjsCoreObj={},e.pdfjsSharedUtil,e.pdfjsCorePrimitives,e.pdfjsCoreCrypto,e.pdfjsCoreParser,e.pdfjsCoreChunkedStream,e.pdfjsCoreColorSpace)}(this,function(e,t,i,a,r,n,s){var o=t.InvalidPDFException,c=t.MissingDataException,l=t.XRefParseException,h=t.assert,u=t.bytesToString,d=t.createPromiseCapability,f=t.error,g=t.info,p=t.isArray,m=t.isBool,v=t.isInt,b=t.isString,y=t.shadow,w=t.stringToPDFString,k=t.stringToUTF8String,C=t.warn,x=t.createValidAbsoluteUrl,S=t.Util,A=i.Ref,I=i.RefSet,P=i.RefSetCache,B=i.isName,T=i.isCmd,L=i.isDict,E=i.isRef,R=i.isRefsEqual,O=i.isStream,M=a.CipherTransformFactory,D=r.Lexer,F=r.Parser,N=n.ChunkedStream,j=s.ColorSpace,U=function(){function e(e,t,i){this.pdfManager=e,this.xref=t,this.catDict=t.getCatalogObj(),this.fontCache=new P,h(L(this.catDict),"catalog object is not a dictionary"),this.pageFactory=i,this.pagePromises=[]}return e.prototype={get metadata(){var e=this.catDict.getRaw("Metadata")
if(!E(e))return y(this,"metadata",null)
var t,i=this.xref.encrypt?this.xref.encrypt.encryptMetadata:!1,a=this.xref.fetch(e,!i)
if(a&&L(a.dict)){var r=a.dict.get("Type"),n=a.dict.get("Subtype")
if(B(r,"Metadata")&&B(n,"XML"))try{t=k(u(a.getBytes()))}catch(s){g("Skipping invalid metadata.")}}return y(this,"metadata",t)},get toplevelPagesDict(){var e=this.catDict.get("Pages")
return h(L(e),"invalid top-level pages dictionary"),y(this,"toplevelPagesDict",e)},get documentOutline(){var e=null
try{e=this.readDocumentOutline()}catch(t){if(t instanceof c)throw t
C("Unable to read document outline")}return y(this,"documentOutline",e)},readDocumentOutline:function(){var t=this.catDict.get("Outlines")
if(!L(t))return null
if(t=t.getRaw("First"),!E(t))return null
var i={items:[]},a=[{obj:t,parent:i}],r=new I
r.put(t)
for(var n=this.xref,s=new Uint8Array(3);a.length>0;){var o=a.shift(),c=n.fetchIfRef(o.obj)
if(null!==c){h(c.has("Title"),"Invalid outline item")
var l={url:null,dest:null}
e.parseDestDictionary({destDict:c,resultObj:l,docBaseUrl:this.pdfManager.docBaseUrl})
var u=c.get("Title"),d=c.get("F")||0,f=c.getArray("C"),g=s
!p(f)||3!==f.length||0===f[0]&&0===f[1]&&0===f[2]||(g=j.singletons.rgb.getRgb(f,0))
var m={dest:l.dest,url:l.url,unsafeUrl:l.unsafeUrl,newWindow:l.newWindow,title:w(u),color:g,count:c.get("Count"),bold:!!(2&d),italic:!!(1&d),items:[]}
o.parent.items.push(m),t=c.getRaw("First"),E(t)&&!r.has(t)&&(a.push({obj:t,parent:m}),r.put(t)),t=c.getRaw("Next"),E(t)&&!r.has(t)&&(a.push({obj:t,parent:o.parent}),r.put(t))}}return i.items.length>0?i.items:null},get numPages(){var e=this.toplevelPagesDict.get("Count")
return h(v(e),"page count in top level pages object is not an integer"),y(this,"num",e)},get destinations(){function e(e){return L(e)?e.get("D"):e}var t,i,a=this.xref,r={},n=this.catDict.get("Names")
if(n&&n.has("Dests")?t=n.getRaw("Dests"):this.catDict.has("Dests")&&(i=this.catDict.get("Dests")),i&&(n=i,n.forEach(function(t,i){i&&(r[t]=e(i))})),t){var s=new H(t,a),o=s.getAll()
for(var c in o)r[c]=e(o[c])}return y(this,"destinations",r)},getDestination:function(e){function t(e){return L(e)?e.get("D"):e}var i,a,r=this.xref,n=null,s=this.catDict.get("Names")
if(s&&s.has("Dests")?i=s.getRaw("Dests"):this.catDict.has("Dests")&&(a=this.catDict.get("Dests")),a){var o=a.get(e)
o&&(n=t(o))}if(i){var c=new H(i,r)
n=t(c.get(e))}return n},get pageLabels(){var e=null
try{e=this.readPageLabels()}catch(t){if(t instanceof c)throw t
C("Unable to read page labels.")}return y(this,"pageLabels",e)},readPageLabels:function(){var e=this.catDict.getRaw("PageLabels")
if(!e)return null
for(var t=Array(this.numPages),i=null,a="",r=new z(e,this.xref),n=r.getAll(),s="",o=1,c=0,l=this.numPages;l>c;c++){if(c in n){var u=n[c]
h(L(u),"The PageLabel is not a dictionary.")
var d=u.get("Type")
h(!d||B(d,"PageLabel"),"Invalid type in PageLabel dictionary.")
var f=u.get("S")
h(!f||B(f),"Invalid style in PageLabel dictionary."),i=f?f.name:null
var g=u.get("P")
h(!g||b(g),"Invalid prefix in PageLabel dictionary."),a=g?w(g):""
var p=u.get("St")
h(!p||v(p)&&p>=1,"Invalid start in PageLabel dictionary."),o=p||1}switch(i){case"D":s=o
break
case"R":case"r":s=S.toRoman(o,"r"===i)
break
case"A":case"a":for(var m=26,y=65,k=97,C="a"===i?k:y,x=o-1,A=String.fromCharCode(C+x%m),I=[],P=0,T=x/m|0;T>=P;P++)I.push(A)
s=I.join("")
break
default:h(!i,'Invalid style "'+i+'" in PageLabel dictionary.')}t[c]=a+s,s="",o++}return t},get attachments(){var e,t=this.xref,i=null,a=this.catDict.get("Names")
if(a&&(e=a.getRaw("EmbeddedFiles")),e){var r=new H(e,t),n=r.getAll()
for(var s in n){var o=new V(n[s],t)
i||(i=Object.create(null)),i[w(s)]=o.serializable}}return y(this,"attachments",i)},get javaScript(){function e(e){var t=e.get("S")
if(B(t,"JavaScript")){var i=e.get("JS")
if(O(i))i=u(i.getBytes())
else if(!b(i))return
a.push(w(i))}}var t=this.xref,i=this.catDict.get("Names"),a=[]
if(i&&i.has("JavaScript")){var r=new H(i.getRaw("JavaScript"),t),n=r.getAll()
for(var s in n){var o=n[s]
L(o)&&e(o)}}var c=this.catDict.get("OpenAction")
if(L(c,"Action")){var l=c.get("S")
if(B(l,"Named")){var h=c.get("N")
B(h,"Print")&&a.push("print({});")}else e(c)}return y(this,"javaScript",a)},cleanup:function(){var e=[]
return this.fontCache.forEach(function(t){e.push(t)}),Promise.all(e).then(function(e){for(var t=0,i=e.length;i>t;t++){var a=e[t].dict
delete a.translated}this.fontCache.clear()}.bind(this))},getPage:function(e){return e in this.pagePromises||(this.pagePromises[e]=this.getPageDict(e).then(function(t){var i=t[0],a=t[1]
return this.pageFactory.createPage(e,i,a,this.fontCache)}.bind(this))),this.pagePromises[e]},getPageDict:function(e){function t(){for(;a.length;){var o=a.pop()
if(E(o))return void n.fetchAsync(o).then(function(n){return L(n,"Page")||L(n)&&!n.has("Kids")?void(e===r?i.resolve([n,o]):(r++,t())):(a.push(n),void t())},i.reject)
h(L(o),"page dictionary kid reference points to wrong type of object")
var c=o.get("Count")
if(0===c&&(s=!0),e>=r+c)r+=c
else{var l=o.get("Kids")
if(h(p(l),"page dictionary kids object is not an array"),s||c!==l.length)for(var u=l.length-1;u>=0;u--)a.push(l[u])
else a=[l[e-r]],r=e}}i.reject("Page index "+e+" not found.")}var i=d(),a=[this.catDict.getRaw("Pages")],r=0,n=this.xref,s=!1
return t(),i.promise},getPageIndex:function(e){function t(t){var i,r=0
return a.fetchAsync(t).then(function(a){if(R(t,e)&&!L(a,"Page")&&(!L(a)||a.has("Type")||!a.has("Contents")))throw Error("The reference does not point to a /Page Dict.")
return a?(h(L(a),"node must be a Dict."),i=a.getRaw("Parent"),a.getAsync("Parent")):null}).then(function(e){return e?(h(L(e),"parent must be a Dict."),e.getAsync("Kids")):null}).then(function(e){if(!e)return null
for(var n=[],s=!1,o=0;o<e.length;o++){var c=e[o]
if(h(E(c),"kid must be a Ref."),c.num===t.num){s=!0
break}n.push(a.fetchAsync(c).then(function(e){if(e.has("Count")){var t=e.get("Count")
r+=t}else r++}))}return s||f("kid ref not found in parents kids"),Promise.all(n).then(function(){return[r,i]})})}function i(e){return t(e).then(function(e){if(!e)return r
var t=e[0],a=e[1]
return r+=t,i(a)})}var a=this.xref,r=0
return i(e)}},e.parseDestDictionary=function(e){function t(e){return 0===e.indexOf("www.")?"http://"+e:e}function i(e){try{return k(e)}catch(t){return e}}var a=e.destDict
if(!L(a))return void C('Catalog_parseDestDictionary: "destDict" must be a dictionary.')
var r=e.resultObj
if("object"!=typeof r)return void C('Catalog_parseDestDictionary: "resultObj" must be an object.')
var n,s,o=e.docBaseUrl||null,c=a.get("A")
if(L(c)){var l=c.get("S").name
switch(l){case"URI":n=c.get("URI"),B(n)?n="/"+n.name:b(n)&&(n=t(n))
break
case"GoTo":s=c.get("D")
break
case"Launch":case"GoToR":var h=c.get("F")
L(h)?n=h.get("F")||null:b(h)&&(n=h)
var d=c.get("D")
if(d&&(B(d)&&(d=d.name),b(n))){var f=n.split("#")[0]
b(d)?n=f+"#"+(/^\d+$/.test(d)?"nameddest=":"")+d:p(d)&&(n=f+"#"+JSON.stringify(d))}var g=c.get("NewWindow")
m(g)&&(r.newWindow=g)
break
case"Named":var v=c.get("N")
B(v)&&(r.action=v.name)
break
case"JavaScript":var y,S=c.get("JS")
if(O(S)?y=u(S.getBytes()):b(S)&&(y=S),y){var A=["app.launchURL","window.open"],I=RegExp("^(?:"+A.join("|")+")\\((?:'|\")(\\S+)(?:'|\")(?:,|\\))"),P=I.exec(w(y),"i")
if(P&&P[1]){n=P[1]
break}}default:C('Catalog_parseDestDictionary: Unrecognized link type "'+l+'".')}}else a.has("Dest")&&(s=a.get("Dest"))
if(b(n)){n=i(n)
var T=x(n,o)
T&&(r.url=T.href),r.unsafeUrl=n}s&&(B(s)&&(s=s.name),(b(s)||p(s))&&(r.dest=s))},e}(),_=function(){function e(e,t){this.stream=e,this.pdfManager=t,this.entries=[],this.xrefstms=Object.create(null),this.cache=[],this.stats={streamTypes:[],fontTypes:[]}}return e.prototype={setStartXRef:function(e){this.startXRefQueue=[e]},parse:function(e){var t
e?(C("Indexing all PDF objects"),t=this.indexObjects()):t=this.readXRef(),t.assignXref(this),this.trailer=t
var i=t.get("Encrypt")
if(L(i)){var a=t.get("ID"),r=a&&a.length?a[0]:""
i.suppressEncryption=!0,this.encrypt=new M(i,r,this.pdfManager.password)}(this.root=t.get("Root"))||f("Invalid root reference")},processXRefTable:function(e){"tableState"in this||(this.tableState={entryNum:0,streamPos:e.lexer.stream.pos,parserBuf1:e.buf1,parserBuf2:e.buf2})
var t=this.readXRefTable(e)
T(t,"trailer")||f("Invalid XRef table: could not find trailer dictionary")
var i=e.getObj()
return!L(i)&&i.dict&&(i=i.dict),L(i)||f("Invalid XRef table: could not parse trailer dictionary"),delete this.tableState,i},readXRefTable:function(e){var t=e.lexer.stream,i=this.tableState
t.pos=i.streamPos,e.buf1=i.parserBuf1,e.buf2=i.parserBuf2
for(var a;;){if(!("firstEntryNum"in i&&"entryCount"in i)){if(T(a=e.getObj(),"trailer"))break
i.firstEntryNum=a,i.entryCount=e.getObj()}var r=i.firstEntryNum,n=i.entryCount
v(r)&&v(n)||f("Invalid XRef table: wrong types in subsection header")
for(var s=i.entryNum;n>s;s++){i.streamPos=t.pos,i.entryNum=s,i.parserBuf1=e.buf1,i.parserBuf2=e.buf2
var o={}
o.offset=e.getObj(),o.gen=e.getObj()
var c=e.getObj()
T(c,"f")?o.free=!0:T(c,"n")&&(o.uncompressed=!0),v(o.offset)&&v(o.gen)&&(o.free||o.uncompressed)||f("Invalid entry in XRef subsection: "+r+", "+n),0===s&&o.free&&1===r&&(r=0),this.entries[s+r]||(this.entries[s+r]=o)}i.entryNum=0,i.streamPos=t.pos,i.parserBuf1=e.buf1,i.parserBuf2=e.buf2,delete i.firstEntryNum,delete i.entryCount}return this.entries[0]&&!this.entries[0].free&&f("Invalid XRef table: unexpected first object"),a},processXRefStream:function(e){if(!("streamState"in this)){var t=e.dict,i=t.get("W"),a=t.get("Index")
a||(a=[0,t.get("Size")]),this.streamState={entryRanges:a,byteWidths:i,entryNum:0,streamPos:e.pos}}return this.readXRefStream(e),delete this.streamState,e.dict},readXRefStream:function(e){var t,i,a=this.streamState
e.pos=a.streamPos
for(var r=a.byteWidths,n=r[0],s=r[1],o=r[2],c=a.entryRanges;c.length>0;){var l=c[0],h=c[1]
for(v(l)&&v(h)||f("Invalid XRef range fields: "+l+", "+h),v(n)&&v(s)&&v(o)||f("Invalid XRef entry fields length: "+l+", "+h),t=a.entryNum;h>t;++t){a.entryNum=t,a.streamPos=e.pos
var u=0,d=0,g=0
for(i=0;n>i;++i)u=u<<8|e.getByte()
for(0===n&&(u=1),i=0;s>i;++i)d=d<<8|e.getByte()
for(i=0;o>i;++i)g=g<<8|e.getByte()
var p={}
switch(p.offset=d,p.gen=g,u){case 0:p.free=!0
break
case 1:p.uncompressed=!0
break
case 2:break
default:f("Invalid XRef entry type: "+u)}this.entries[l+t]||(this.entries[l+t]=p)}a.entryNum=0,a.streamPos=e.pos,c.splice(0,2)}},indexObjects:function(){function e(e,t){for(var i="",n=e[t];n!==a&&n!==r&&n!==c&&!(++t>=e.length);)i+=String.fromCharCode(n),n=e[t]
return i}function t(e,t,i){for(var a=i.length,r=e.length,n=0;r>t;){for(var s=0;a>s&&e[t+s]===i[s];)++s
if(s>=a)break
t++,n++}return n}var i=9,a=10,r=13,n=32,s=37,c=60,l=/^(\d+)\s+(\d+)\s+obj\b/,h=new Uint8Array([116,114,97,105,108,101,114]),u=new Uint8Array([115,116,97,114,116,120,114,101,102]),d=new Uint8Array([101,110,100,111,98,106]),f=new Uint8Array([47,88,82,101,102])
this.entries.length=0
var g=this.stream
g.pos=0
for(var p=g.getBytes(),m=g.start,v=p.length,b=[],y=[];v>m;){var w=p[m]
if(w!==i&&w!==a&&w!==r&&w!==n)if(w!==s){var k,C=e(p,m)
if(0!==C.indexOf("xref")||4!==C.length&&!/\s/.test(C[4]))if(k=l.exec(C)){void 0===this.entries[k[1]]&&(this.entries[k[1]]={offset:m-g.start,gen:0|k[2],uncompressed:!0})
var x=t(p,m,d)+7,S=p.subarray(m,m+x),A=t(S,0,f)
x>A&&S[A+5]<64&&(y.push(m-g.start),this.xrefstms[m-g.start]=1),m+=x}else 0!==C.indexOf("trailer")||7!==C.length&&!/\s/.test(C[7])?m+=C.length+1:(b.push(m),m+=t(p,m,u))
else m+=t(p,m,h),b.push(m),m+=t(p,m,u)}else do{if(++m,m>=v)break
w=p[m]}while(w!==a&&w!==r)
else++m}var I,P
for(I=0,P=y.length;P>I;++I)this.startXRefQueue.push(y[I]),this.readXRef(!0)
var B
for(I=0,P=b.length;P>I;++I){g.pos=b[I]
var E=new F(new D(g),!0,this,!0),R=E.getObj()
if(T(R,"trailer")&&(B=E.getObj(),L(B)&&B.has("ID")))return B}if(B)return B
throw new o("Invalid PDF structure")},readXRef:function(e){var t=this.stream
try{for(;this.startXRefQueue.length;){var i=this.startXRefQueue[0]
t.pos=i+t.start
var a,r=new F(new D(t),!0,this),n=r.getObj()
if(T(n,"xref")){if(a=this.processXRefTable(r),this.topDict||(this.topDict=a),n=a.get("XRefStm"),v(n)){var s=n
s in this.xrefstms||(this.xrefstms[s]=1,this.startXRefQueue.push(s))}}else v(n)?(v(r.getObj())&&T(r.getObj(),"obj")&&O(n=r.getObj())||f("Invalid XRef stream"),a=this.processXRefStream(n),this.topDict||(this.topDict=a),a||f("Failed to read XRef stream")):f("Invalid XRef stream header")
n=a.get("Prev"),v(n)?this.startXRefQueue.push(n):E(n)&&this.startXRefQueue.push(n.num),this.startXRefQueue.shift()}return this.topDict}catch(o){if(o instanceof c)throw o
g("(while reading XRef): "+o)}if(!e)throw new l},getEntry:function(e){var t=this.entries[e]
return t&&!t.free&&t.offset?t:null},fetchIfRef:function(e,t){return E(e)?this.fetch(e,t):e},fetch:function(e,t){h(E(e),"ref object is not a reference")
var i=e.num
if(i in this.cache){var a=this.cache[i]
return a}var r=this.getEntry(i)
return null===r?this.cache[i]=null:(r=r.uncompressed?this.fetchUncompressed(e,r,t):this.fetchCompressed(r,t),L(r)?r.objId=""+e:O(r)&&(r.dict.objId=""+e),r)},fetchUncompressed:function(e,t,i){var a=e.gen,r=e.num
t.gen!==a&&f("inconsistent generation in XRef")
var n=this.stream.makeSubStream(t.offset+this.stream.start),s=new F(new D(n),!0,this),o=s.getObj(),c=s.getObj(),l=s.getObj()
if(v(o)&&parseInt(o,10)===r&&v(c)&&parseInt(c,10)===a&&T(l)||f("bad XRef entry"),!T(l,"obj")){if(0===l.cmd.indexOf("obj")&&(r=parseInt(l.cmd.substring(3),10),!isNaN(r)))return r
f("bad XRef entry")}return t=this.encrypt&&!i?s.getObj(this.encrypt.createCipherTransform(r,a)):s.getObj(),O(t)||(this.cache[r]=t),t},fetchCompressed:function(e,t){var i=e.offset,a=this.fetch(new A(i,0))
O(a)||f("bad ObjStm stream")
var r=a.dict.get("First"),n=a.dict.get("N")
v(r)&&v(n)||f("invalid first and n parameters for ObjStm stream")
var s=new F(new D(a),!1,this)
s.allowStreams=!0
var o,c,l=[],h=[]
for(o=0;n>o;++o){c=s.getObj(),v(c)||f("invalid object number in the ObjStm stream: "+c),h.push(c)
var u=s.getObj()
v(u)||f("invalid object offset in the ObjStm stream: "+u)}for(o=0;n>o;++o){l.push(s.getObj()),T(s.buf1,"endobj")&&s.shift(),c=h[o]
var d=this.entries[c]
d&&d.offset===i&&d.gen===o&&(this.cache[c]=l[o])}return e=l[e.gen],void 0===e&&f("bad XRef entry for compressed object"),e},fetchIfRefAsync:function(e,t){return E(e)?this.fetchAsync(e,t):Promise.resolve(e)},fetchAsync:function(e,t){var i=this.stream.manager,a=this
return new Promise(function r(n,s){try{n(a.fetch(e,t))}catch(o){if(o instanceof c)return void i.requestRange(o.begin,o.end).then(function(){r(n,s)},s)
s(o)}})},getCatalogObj:function(){return this.root}},e}(),q=function(){function e(e,t){throw Error("Cannot initialize NameOrNumberTree.")}return e.prototype={getAll:function(){var e=Object.create(null)
if(!this.root)return e
var t=this.xref,i=new I
i.put(this.root)
for(var a=[this.root];a.length>0;){var r,n,s=t.fetchIfRef(a.shift())
if(L(s))if(s.has("Kids")){var o=s.get("Kids")
for(r=0,n=o.length;n>r;r++){var c=o[r]
h(!i.has(c),'Duplicate entry in "'+this._type+'" tree.'),a.push(c),i.put(c)}}else{var l=s.get(this._type)
if(p(l))for(r=0,n=l.length;n>r;r+=2)e[t.fetchIfRef(l[r])]=t.fetchIfRef(l[r+1])}}return e},get:function(e){if(!this.root)return null
for(var t,i,a,r=this.xref,n=r.fetchIfRef(this.root),s=0,o=10;n.has("Kids");){if(++s>o)return C('Search depth limit reached for "'+this._type+'" tree.'),null
var c=n.get("Kids")
if(!p(c))return null
for(t=0,i=c.length-1;i>=t;){a=t+i>>1
var l=r.fetchIfRef(c[a]),h=l.get("Limits")
if(e<r.fetchIfRef(h[0]))i=a-1
else{if(!(e>r.fetchIfRef(h[1]))){n=r.fetchIfRef(c[a])
break}t=a+1}}if(t>i)return null}var u=n.get(this._type)
if(p(u))for(t=0,i=u.length-2;i>=t;){a=t+i&-2
var d=r.fetchIfRef(u[a])
if(d>e)i=a-2
else{if(!(e>d))return r.fetchIfRef(u[a+1])
t=a+2}}return null}},e}(),H=function(){function e(e,t){this.root=e,this.xref=t,this._type="Names"}return S.inherit(e,q,{}),e}(),z=function(){function e(e,t){this.root=e,this.xref=t,this._type="Nums"}return S.inherit(e,q,{}),e}(),V=function(){function e(e,t){e&&L(e)&&(this.xref=t,this.root=e,e.has("FS")&&(this.fs=e.get("FS")),this.description=e.has("Desc")?w(e.get("Desc")):"",e.has("RF")&&C("Related file specifications are not supported"),this.contentAvailable=!0,e.has("EF")||(this.contentAvailable=!1,C("Non-embedded file specifications are not supported")))}function t(e){return e.has("UF")?e.get("UF"):e.has("F")?e.get("F"):e.has("Unix")?e.get("Unix"):e.has("Mac")?e.get("Mac"):e.has("DOS")?e.get("DOS"):null}return e.prototype={get filename(){if(!this._filename&&this.root){var e=t(this.root)||"unnamed"
this._filename=w(e).replace(/\\\\/g,"\\").replace(/\\\//g,"/").replace(/\\/g,"/")}return this._filename},get content(){if(!this.contentAvailable)return null
!this.contentRef&&this.root&&(this.contentRef=t(this.root.get("EF")))
var e=null
if(this.contentRef){var i=this.xref,a=i.fetchIfRef(this.contentRef)
a&&O(a)?e=a.getBytes():C("Embedded file specification points to non-existing/invalid content")}else C("Embedded file specification does not have a content")
return e},get serializable(){return{filename:this.filename,content:this.content}}},e}(),G=function(){function e(e){return E(e)||L(e)||p(e)||O(e)}function t(t,i){var a
if(L(t)||O(t)){var r
r=L(t)?t.map:t.dict.map
for(var n in r)a=r[n],e(a)&&i.push(a)}else if(p(t))for(var s=0,o=t.length;o>s;s++)a=t[s],e(a)&&i.push(a)}function i(e,t,i){this.obj=e,this.keys=t,this.xref=i,this.refSet=null,this.capability=null}return i.prototype={load:function(){var e=this.keys
if(this.capability=d(),!(this.xref.stream instanceof N)||0===this.xref.stream.getMissingChunks().length)return this.capability.resolve(),this.capability.promise
this.refSet=new I
for(var t=[],i=0;i<e.length;i++)t.push(this.obj[e[i]])
return this._walk(t),this.capability.promise},_walk:function(e){for(var i=[],a=[];e.length;){var r=e.pop()
if(E(r)){if(this.refSet.has(r))continue
try{var n=r
this.refSet.put(n),r=this.xref.fetch(r)}catch(s){if(!(s instanceof c))throw s
i.push(r),a.push({begin:s.begin,end:s.end})}}if(r&&r.getBaseStreams){for(var o=r.getBaseStreams(),l=!1,h=0;h<o.length;h++){var u=o[h]
u.getMissingChunks&&u.getMissingChunks().length&&(l=!0,a.push({begin:u.start,end:u.end}))}l&&i.push(r)}t(r,e)}return a.length?void this.xref.stream.manager.requestRanges(a).then(function(){e=i
for(var t=0;t<i.length;t++){var a=i[t]
E(a)&&this.refSet.remove(a)}this._walk(e)}.bind(this),this.capability.reject):(this.refSet=null,void this.capability.resolve())}},i}()
e.Catalog=U,e.ObjectLoader=G,e.XRef=_,e.FileSpec=V}),function(e,t){t(e.pdfjsCorePattern={},e.pdfjsSharedUtil,e.pdfjsCorePrimitives,e.pdfjsCoreFunction,e.pdfjsCoreColorSpace)}(this,function(e,t,i,a,r){function n(e,t,i){var a=t.getArray("Matrix"),r=t.getArray("BBox"),n=t.get("XStep"),s=t.get("YStep"),o=t.get("PaintType"),c=t.get("TilingType")
return["TilingPattern",i,e,a,r,n,s,o,c]}var s=t.UNSUPPORTED_FEATURES,o=t.MissingDataException,c=t.Util,l=t.assert,h=t.error,u=t.info,d=t.warn,f=i.isStream,g=a.PDFFunction,p=r.ColorSpace,m={FUNCTION_BASED:1,AXIAL:2,RADIAL:3,FREE_FORM_MESH:4,LATTICE_FORM_MESH:5,COONS_PATCH_MESH:6,TENSOR_PATCH_MESH:7},v=function(){function e(){h("should not call Pattern constructor")}return e.prototype={getPattern:function(e){h("Should not call Pattern.getStyle: "+e)}},e.parseShading=function(e,t,i,a,r){var n=f(e)?e.dict:e,c=n.get("ShadingType")
try{switch(c){case m.AXIAL:case m.RADIAL:return new b.RadialAxial(n,t,i,a)
case m.FREE_FORM_MESH:case m.LATTICE_FORM_MESH:case m.COONS_PATCH_MESH:case m.TENSOR_PATCH_MESH:return new b.Mesh(e,t,i,a)
default:throw Error("Unsupported ShadingType: "+c)}}catch(l){if(l instanceof o)throw l
return r.send("UnsupportedFeature",{featureId:s.shadingPattern}),d(l),new b.Dummy}},e}(),b={}
b.SMALL_NUMBER=1e-6,b.RadialAxial=function(){function e(e,t,i,a){this.matrix=t,this.coordsArr=e.getArray("Coords"),this.shadingType=e.get("ShadingType"),this.type="Pattern"
var r=e.get("ColorSpace","CS")
r=p.parse(r,i,a),this.cs=r
var n=0,s=1
if(e.has("Domain")){var o=e.getArray("Domain")
n=o[0],s=o[1]}var l=!1,h=!1
if(e.has("Extend")){var f=e.getArray("Extend")
l=f[0],h=f[1]}if(!(this.shadingType!==m.RADIAL||l&&h)){var v=this.coordsArr[0],y=this.coordsArr[1],w=this.coordsArr[2],k=this.coordsArr[3],C=this.coordsArr[4],x=this.coordsArr[5],S=Math.sqrt((v-k)*(v-k)+(y-C)*(y-C))
x+S>=w&&w+S>=x&&d("Unsupported radial gradient.")}this.extendStart=l,this.extendEnd=h
var A=e.get("Function"),I=g.parseArray(i,A),P=s-n,B=P/10,T=this.colorStops=[]
if(n>=s||0>=B)return void u("Bad shading domain.")
for(var L,E=new Float32Array(r.numComps),R=new Float32Array(1),O=n;s>=O;O+=B){R[0]=O,I(R,0,E,0),L=r.getRgb(E,0)
var M=c.makeCssRgb(L[0],L[1],L[2])
T.push([(O-n)/P,M])}var D="transparent"
e.has("Background")&&(L=r.getRgb(e.get("Background"),0),D=c.makeCssRgb(L[0],L[1],L[2])),l||(T.unshift([0,D]),T[1][0]+=b.SMALL_NUMBER),h||(T[T.length-1][0]-=b.SMALL_NUMBER,T.push([1,D])),this.colorStops=T}return e.prototype={getIR:function(){var e,t,i,a,r,n=this.coordsArr,s=this.shadingType
s===m.AXIAL?(t=[n[0],n[1]],i=[n[2],n[3]],a=null,r=null,e="axial"):s===m.RADIAL?(t=[n[0],n[1]],i=[n[3],n[4]],a=n[2],r=n[5],e="radial"):h("getPattern type unknown: "+s)
var o=this.matrix
if(o&&(t=c.applyTransform(t,o),i=c.applyTransform(i,o),s===m.RADIAL)){var l=c.singularValueDecompose2dScale(o)
a*=l[0],r*=l[1]}return["RadialAxial",e,this.colorStops,t,i,a,r]}},e}(),b.Mesh=function(){function e(e,t){this.stream=e,this.context=t,this.buffer=0,this.bufferLength=0
var i=t.numComps
this.tmpCompsBuf=new Float32Array(i)
var a=t.colorSpace.numComps
this.tmpCsCompsBuf=t.colorFn?new Float32Array(a):this.tmpCompsBuf}function t(e,t){for(var i=e.coords,a=e.colors,r=[],n=[],s=0;t.hasData;){var o=t.readFlag(),c=t.readCoordinate(),h=t.readComponents()
if(0===s){switch(l(o>=0&&2>=o,"Unknown type4 flag"),o){case 0:s=3
break
case 1:n.push(n[n.length-2],n[n.length-1]),s=1
break
case 2:n.push(n[n.length-3],n[n.length-1]),s=1}r.push(o)}n.push(i.length),i.push(c),a.push(h),s--,t.align()}e.figures.push({type:"triangles",coords:new Int32Array(n),colors:new Int32Array(n)})}function i(e,t,i){for(var a=e.coords,r=e.colors,n=[];t.hasData;){var s=t.readCoordinate(),o=t.readComponents()
n.push(a.length),a.push(s),r.push(o)}e.figures.push({type:"lattice",coords:new Int32Array(n),colors:new Int32Array(n),verticesPerRow:i})}function a(e,t){var i=e.figures[t]
l("patch"===i.type,"Unexpected patch mesh figure")
var a=e.coords,r=e.colors,n=i.coords,s=i.colors,o=Math.min(a[n[0]][0],a[n[3]][0],a[n[12]][0],a[n[15]][0]),c=Math.min(a[n[0]][1],a[n[3]][1],a[n[12]][1],a[n[15]][1]),h=Math.max(a[n[0]][0],a[n[3]][0],a[n[12]][0],a[n[15]][0]),f=Math.max(a[n[0]][1],a[n[3]][1],a[n[12]][1],a[n[15]][1]),g=Math.ceil((h-o)*v/(e.bounds[2]-e.bounds[0]))
g=Math.max(u,Math.min(d,g))
var p=Math.ceil((f-c)*v/(e.bounds[3]-e.bounds[1]))
p=Math.max(u,Math.min(d,p))
for(var m=g+1,y=new Int32Array((p+1)*m),w=new Int32Array((p+1)*m),k=0,C=new Uint8Array(3),x=new Uint8Array(3),S=r[s[0]],A=r[s[1]],I=r[s[2]],P=r[s[3]],B=b(p),T=b(g),L=0;p>=L;L++){C[0]=(S[0]*(p-L)+I[0]*L)/p|0,C[1]=(S[1]*(p-L)+I[1]*L)/p|0,C[2]=(S[2]*(p-L)+I[2]*L)/p|0,x[0]=(A[0]*(p-L)+P[0]*L)/p|0,x[1]=(A[1]*(p-L)+P[1]*L)/p|0,x[2]=(A[2]*(p-L)+P[2]*L)/p|0
for(var E=0;g>=E;E++,k++)if(0!==L&&L!==p||0!==E&&E!==g){for(var R=0,O=0,M=0,D=0;3>=D;D++)for(var F=0;3>=F;F++,M++){var N=B[L][D]*T[E][F]
R+=a[n[M]][0]*N,O+=a[n[M]][1]*N}y[k]=a.length,a.push([R,O]),w[k]=r.length
var j=new Uint8Array(3)
j[0]=(C[0]*(g-E)+x[0]*E)/g|0,j[1]=(C[1]*(g-E)+x[1]*E)/g|0,j[2]=(C[2]*(g-E)+x[2]*E)/g|0,r.push(j)}}y[0]=n[0],w[0]=s[0],y[g]=n[3],w[g]=s[1],y[m*p]=n[12],w[m*p]=s[2],y[m*p+g]=n[15],w[m*p+g]=s[3],e.figures[t]={type:"lattice",coords:y,colors:w,verticesPerRow:m}}function r(e,t){for(var i=e.coords,a=e.colors,r=new Int32Array(16),n=new Int32Array(4);t.hasData;){var s=t.readFlag()
l(s>=0&&3>=s,"Unknown type6 flag")
var o,c,h=i.length
for(o=0,c=0!==s?8:12;c>o;o++)i.push(t.readCoordinate())
var u=a.length
for(o=0,c=0!==s?2:4;c>o;o++)a.push(t.readComponents())
var d,f,g,p
switch(s){case 0:r[12]=h+3,r[13]=h+4,r[14]=h+5,r[15]=h+6,r[8]=h+2,r[11]=h+7,r[4]=h+1,r[7]=h+8,r[0]=h,r[1]=h+11,r[2]=h+10,r[3]=h+9,n[2]=u+1,n[3]=u+2,n[0]=u,n[1]=u+3
break
case 1:d=r[12],f=r[13],g=r[14],p=r[15],r[12]=p,r[13]=h+0,r[14]=h+1,r[15]=h+2,r[8]=g,r[11]=h+3,r[4]=f,r[7]=h+4,r[0]=d,r[1]=h+7,r[2]=h+6,r[3]=h+5,d=n[2],f=n[3],n[2]=f,n[3]=u,n[0]=d,n[1]=u+1
break
case 2:d=r[15],f=r[11],r[12]=r[3],r[13]=h+0,r[14]=h+1,r[15]=h+2,r[8]=r[7],r[11]=h+3,r[4]=f,r[7]=h+4,r[0]=d,r[1]=h+7,r[2]=h+6,r[3]=h+5,d=n[3],n[2]=n[1],n[3]=u,n[0]=d,n[1]=u+1
break
case 3:r[12]=r[0],r[13]=h+0,r[14]=h+1,r[15]=h+2,r[8]=r[1],r[11]=h+3,r[4]=r[2],r[7]=h+4,r[0]=r[3],r[1]=h+7,r[2]=h+6,r[3]=h+5,n[2]=n[0],n[3]=u,n[0]=n[1],n[1]=u+1}r[5]=i.length,i.push([(-4*i[r[0]][0]-i[r[15]][0]+6*(i[r[4]][0]+i[r[1]][0])-2*(i[r[12]][0]+i[r[3]][0])+3*(i[r[13]][0]+i[r[7]][0]))/9,(-4*i[r[0]][1]-i[r[15]][1]+6*(i[r[4]][1]+i[r[1]][1])-2*(i[r[12]][1]+i[r[3]][1])+3*(i[r[13]][1]+i[r[7]][1]))/9]),r[6]=i.length,i.push([(-4*i[r[3]][0]-i[r[12]][0]+6*(i[r[2]][0]+i[r[7]][0])-2*(i[r[0]][0]+i[r[15]][0])+3*(i[r[4]][0]+i[r[14]][0]))/9,(-4*i[r[3]][1]-i[r[12]][1]+6*(i[r[2]][1]+i[r[7]][1])-2*(i[r[0]][1]+i[r[15]][1])+3*(i[r[4]][1]+i[r[14]][1]))/9]),r[9]=i.length,i.push([(-4*i[r[12]][0]-i[r[3]][0]+6*(i[r[8]][0]+i[r[13]][0])-2*(i[r[0]][0]+i[r[15]][0])+3*(i[r[11]][0]+i[r[1]][0]))/9,(-4*i[r[12]][1]-i[r[3]][1]+6*(i[r[8]][1]+i[r[13]][1])-2*(i[r[0]][1]+i[r[15]][1])+3*(i[r[11]][1]+i[r[1]][1]))/9]),r[10]=i.length,i.push([(-4*i[r[15]][0]-i[r[0]][0]+6*(i[r[11]][0]+i[r[14]][0])-2*(i[r[12]][0]+i[r[3]][0])+3*(i[r[2]][0]+i[r[8]][0]))/9,(-4*i[r[15]][1]-i[r[0]][1]+6*(i[r[11]][1]+i[r[14]][1])-2*(i[r[12]][1]+i[r[3]][1])+3*(i[r[2]][1]+i[r[8]][1]))/9]),e.figures.push({type:"patch",coords:new Int32Array(r),colors:new Int32Array(n)})}}function n(e,t){for(var i=e.coords,a=e.colors,r=new Int32Array(16),n=new Int32Array(4);t.hasData;){var s=t.readFlag()
l(s>=0&&3>=s,"Unknown type7 flag")
var o,c,h=i.length
for(o=0,c=0!==s?12:16;c>o;o++)i.push(t.readCoordinate())
var u=a.length
for(o=0,c=0!==s?2:4;c>o;o++)a.push(t.readComponents())
var d,f,g,p
switch(s){case 0:r[12]=h+3,r[13]=h+4,r[14]=h+5,r[15]=h+6,r[8]=h+2,r[9]=h+13,r[10]=h+14,r[11]=h+7,r[4]=h+1,r[5]=h+12,r[6]=h+15,r[7]=h+8,r[0]=h,r[1]=h+11,r[2]=h+10,r[3]=h+9,n[2]=u+1,n[3]=u+2,n[0]=u,n[1]=u+3
break
case 1:d=r[12],f=r[13],g=r[14],p=r[15],r[12]=p,r[13]=h+0,r[14]=h+1,r[15]=h+2,r[8]=g,r[9]=h+9,r[10]=h+10,r[11]=h+3,r[4]=f,r[5]=h+8,r[6]=h+11,r[7]=h+4,r[0]=d,r[1]=h+7,r[2]=h+6,r[3]=h+5,d=n[2],f=n[3],n[2]=f,n[3]=u,n[0]=d,n[1]=u+1
break
case 2:d=r[15],f=r[11],r[12]=r[3],r[13]=h+0,r[14]=h+1,r[15]=h+2,r[8]=r[7],r[9]=h+9,r[10]=h+10,r[11]=h+3,r[4]=f,r[5]=h+8,r[6]=h+11,r[7]=h+4,r[0]=d,r[1]=h+7,r[2]=h+6,r[3]=h+5,d=n[3],n[2]=n[1],n[3]=u,n[0]=d,n[1]=u+1
break
case 3:r[12]=r[0],r[13]=h+0,r[14]=h+1,r[15]=h+2,r[8]=r[1],r[9]=h+9,r[10]=h+10,r[11]=h+3,r[4]=r[2],r[5]=h+8,r[6]=h+11,r[7]=h+4,r[0]=r[3],r[1]=h+7,r[2]=h+6,r[3]=h+5,n[2]=n[0],n[3]=u,n[0]=n[1],n[1]=u+1}e.figures.push({type:"patch",coords:new Int32Array(r),colors:new Int32Array(n)})}}function s(e){for(var t=e.coords[0][0],i=e.coords[0][1],a=t,r=i,n=1,s=e.coords.length;s>n;n++){var o=e.coords[n][0],c=e.coords[n][1]
t=t>o?o:t,i=i>c?c:i,a=o>a?o:a,r=c>r?c:r}e.bounds=[t,i,a,r]}function o(e){var t,i,a,r,n=e.coords,s=new Float32Array(2*n.length)
for(t=0,a=0,i=n.length;i>t;t++){var o=n[t]
s[a++]=o[0],s[a++]=o[1]}e.coords=s
var c=e.colors,l=new Uint8Array(3*c.length)
for(t=0,a=0,i=c.length;i>t;t++){var h=c[t]
l[a++]=h[0],l[a++]=h[1],l[a++]=h[2]}e.colors=l
var u=e.figures
for(t=0,i=u.length;i>t;t++){var d=u[t],f=d.coords,g=d.colors
for(a=0,r=f.length;r>a;a++)f[a]*=2,g[a]*=3}}function c(c,u,d,v){l(f(c),"Mesh data is not a stream")
var b=c.dict
this.matrix=u,this.shadingType=b.get("ShadingType"),this.type="Pattern",this.bbox=b.getArray("BBox")
var y=b.get("ColorSpace","CS")
y=p.parse(y,d,v),this.cs=y,this.background=b.has("Background")?y.getRgb(b.get("Background"),0):null
var w=b.get("Function"),k=w?g.parseArray(d,w):null
this.coords=[],this.colors=[],this.figures=[]
var C={bitsPerCoordinate:b.get("BitsPerCoordinate"),bitsPerComponent:b.get("BitsPerComponent"),bitsPerFlag:b.get("BitsPerFlag"),decode:b.getArray("Decode"),colorFn:k,colorSpace:y,numComps:k?1:y.numComps},x=new e(c,C),S=!1
switch(this.shadingType){case m.FREE_FORM_MESH:t(this,x)
break
case m.LATTICE_FORM_MESH:var A=0|b.get("VerticesPerRow")
l(A>=2,"Invalid VerticesPerRow"),i(this,x,A)
break
case m.COONS_PATCH_MESH:r(this,x),S=!0
break
case m.TENSOR_PATCH_MESH:n(this,x),S=!0
break
default:h("Unsupported mesh type.")}if(S){s(this)
for(var I=0,P=this.figures.length;P>I;I++)a(this,I)}s(this),o(this)}e.prototype={get hasData(){if(this.stream.end)return this.stream.pos<this.stream.end
if(this.bufferLength>0)return!0
var e=this.stream.getByte()
return 0>e?!1:(this.buffer=e,this.bufferLength=8,!0)},readBits:function(e){var t=this.buffer,i=this.bufferLength
if(32===e){if(0===i)return(this.stream.getByte()<<24|this.stream.getByte()<<16|this.stream.getByte()<<8|this.stream.getByte())>>>0
t=t<<24|this.stream.getByte()<<16|this.stream.getByte()<<8|this.stream.getByte()
var a=this.stream.getByte()
return this.buffer=a&(1<<i)-1,(t<<8-i|(255&a)>>i)>>>0}if(8===e&&0===i)return this.stream.getByte()
for(;e>i;)t=t<<8|this.stream.getByte(),i+=8
return i-=e,this.bufferLength=i,this.buffer=t&(1<<i)-1,t>>i},align:function(){this.buffer=0,this.bufferLength=0},readFlag:function(){return this.readBits(this.context.bitsPerFlag)},readCoordinate:function(){var e=this.context.bitsPerCoordinate,t=this.readBits(e),i=this.readBits(e),a=this.context.decode,r=32>e?1/((1<<e)-1):2.3283064365386963e-10
return[t*r*(a[1]-a[0])+a[0],i*r*(a[3]-a[2])+a[2]]},readComponents:function(){for(var e=this.context.numComps,t=this.context.bitsPerComponent,i=32>t?1/((1<<t)-1):2.3283064365386963e-10,a=this.context.decode,r=this.tmpCompsBuf,n=0,s=4;e>n;n++,s+=2){var o=this.readBits(t)
r[n]=o*i*(a[s+1]-a[s])+a[s]}var c=this.tmpCsCompsBuf
return this.context.colorFn&&this.context.colorFn(r,0,c,0),this.context.colorSpace.getRgb(c,0)}}
var u=3,d=20,v=20,b=function(){function e(e){for(var t=[],i=0;e>=i;i++){var a=i/e,r=1-a
t.push(new Float32Array([r*r*r,3*a*r*r,3*a*a*r,a*a*a]))}return t}var t=[]
return function(i){return t[i]||(t[i]=e(i)),t[i]}}()
return c.prototype={getIR:function(){return["Mesh",this.shadingType,this.coords,this.colors,this.figures,this.bounds,this.matrix,this.bbox,this.background]}},c}(),b.Dummy=function(){function e(){this.type="Pattern"}return e.prototype={getIR:function(){return["Dummy"]}},e}(),e.Pattern=v,e.getTilingPatternIR=n}),function(e,t){t(e.pdfjsCoreEvaluator={},e.pdfjsSharedUtil,e.pdfjsCorePrimitives,e.pdfjsCoreStream,e.pdfjsCoreParser,e.pdfjsCoreImage,e.pdfjsCoreColorSpace,e.pdfjsCoreMurmurHash3,e.pdfjsCoreFonts,e.pdfjsCoreFunction,e.pdfjsCorePattern,e.pdfjsCoreCMap,e.pdfjsCoreMetrics,e.pdfjsCoreBidi,e.pdfjsCoreEncodings,e.pdfjsCoreStandardFonts,e.pdfjsCoreUnicode,e.pdfjsCoreGlyphList)}(this,function(e,t,i,a,r,n,s,o,c,l,h,u,d,f,g,p,m,v){var b=t.FONT_IDENTITY_MATRIX,y=t.IDENTITY_MATRIX,w=t.UNSUPPORTED_FEATURES,k=t.ImageKind,C=t.OPS,x=t.TextRenderingMode,S=t.Util,A=t.assert,I=t.createPromiseCapability,P=t.error,B=t.info,T=t.isArray,L=t.isNum,E=t.isString,R=t.getLookupTableFactory,O=t.warn,M=i.Dict,D=i.Name,F=i.isCmd,N=i.isDict,j=i.isName,U=i.isRef,_=i.isStream,q=a.DecodeStream,H=a.JpegStream,z=a.Stream,V=r.Lexer,G=r.Parser,W=r.isEOF,X=n.PDFImage,K=s.ColorSpace,Y=o.MurmurHash3_64,J=c.ErrorFont,Z=c.FontFlags,Q=c.Font,$=c.IdentityToUnicodeMap,ee=c.ToUnicodeMap,te=c.getFontType,ie=l.isPDFFunction,ae=l.PDFFunction,re=h.Pattern,ne=h.getTilingPatternIR,se=u.CMapFactory,oe=u.IdentityCMap,ce=d.getMetrics,le=f.bidi,he=g.WinAnsiEncoding,ue=g.StandardEncoding,de=g.MacRomanEncoding,fe=g.SymbolSetEncoding,ge=g.ZapfDingbatsEncoding,pe=g.getEncoding,me=p.getStdFontMap,ve=p.getSerifFonts,be=p.getSymbolsFonts,ye=m.getNormalizedUnicodes,we=m.reverseIfRtl,ke=m.getUnicodeForGlyph,Ce=v.getGlyphsUnicode,xe=function(){function e(e,t,i,a){this.xref=e,this.resources=t,this.handler=i,this.forceDataSchema=a}function t(e,t,i,r,n,s,o){this.pdfManager=e,this.xref=t,this.handler=i,this.pageIndex=r,this.idFactory=n,this.fontCache=s,this.options=o||a}function i(){this.reset()}var a={forceDataSchema:!1,maxImageSize:-1,disableFontFace:!1,cMapOptions:{url:null,packed:!1}}
e.prototype={canDecode:function(t){return t instanceof H&&e.isDecodable(t,this.xref,this.resources)},decode:function(e){var t=e.dict,i=t.get("ColorSpace","CS")
i=K.parse(i,this.xref,this.resources)
var a=i.numComps,r=this.handler.sendWithPromise("JpegDecode",[e.getIR(this.forceDataSchema),a])
return r.then(function(t){var i=t.data
return new z(i,0,i.length,e.dict)})}},e.isSupported=function(e,t,i){var a=e.dict
if(a.has("DecodeParms")||a.has("DP"))return!1
var r=K.parse(a.get("ColorSpace","CS"),t,i)
return("DeviceGray"===r.name||"DeviceRGB"===r.name)&&r.isDefaultDecode(a.getArray("Decode","D"))},e.isDecodable=function(e,t,i){var a=e.dict
if(a.has("DecodeParms")||a.has("DP"))return!1
var r=K.parse(a.get("ColorSpace","CS"),t,i)
return(1===r.numComps||3===r.numComps)&&r.isDefaultDecode(a.getArray("Decode","D"))}
var r=20,n=100
i.prototype={check:function(){return++this.checked<n?!1:(this.checked=0,this.endTime<=Date.now())},reset:function(){this.endTime=Date.now()+r,this.checked=0}}
var s=Promise.resolve(),o=1,c=2
return t.prototype={hasBlendModes:function(e){if(!N(e))return!1
var t=Object.create(null)
e.objId&&(t[e.objId]=!0)
for(var i=[e],a=this.xref;i.length;){var r,n,s,o=i.shift(),c=o.get("ExtGState")
if(N(c)){var l=c.getKeys()
for(n=0,s=l.length;s>n;n++){r=l[n]
var h=c.get(r),u=h.get("BM")
if(j(u)&&"Normal"!==u.name)return!0}}var d=o.get("XObject")
if(N(d)){var f=d.getKeys()
for(n=0,s=f.length;s>n;n++){r=f[n]
var g=d.getRaw(r)
if(U(g)){if(t[""+g])continue
g=a.fetch(g)}if(_(g)){if(g.dict.objId){if(t[g.dict.objId])continue
t[g.dict.objId]=!0}var p=g.dict.get("Resources")
!N(p)||p.objId&&t[p.objId]||(i.push(p),p.objId&&(t[p.objId]=!0))}}}}return!1},buildFormXObject:function(e,t,i,a,r,n){var s=t.dict.getArray("Matrix"),o=t.dict.getArray("BBox"),c=t.dict.get("Group")
if(c){var l,h={matrix:s,bbox:o,smask:i,isolated:!1,knockout:!1},u=c.get("S")
j(u,"Transparency")&&(h.isolated=c.get("I")||!1,h.knockout=c.get("K")||!1,l=c.has("CS")?K.parse(c.get("CS"),this.xref,e):null),i&&i.backdrop&&(l=l||K.singletons.rgb,i.backdrop=l.getRgb(i.backdrop,0)),a.addOp(C.beginGroup,[h])}return a.addOp(C.paintFormXObjectBegin,[s,o]),this.getOperatorList(t,r,t.dict.get("Resources")||e,a,n).then(function(){a.addOp(C.paintFormXObjectEnd,[]),c&&a.addOp(C.endGroup,[h])})},buildPaintImageXObject:function(t,i,a,r,n,s){var o=this,c=i.dict,l=c.get("Width","W"),h=c.get("Height","H")
if(!(l&&L(l)&&h&&L(h)))return void O("Image dimensions are missing, or not numbers.")
var u=this.options.maxImageSize
if(-1!==u&&l*h>u)return void O("Image exceeded maximum allowed size and was removed.")
var d,f,g=c.get("ImageMask","IM")||!1
if(g){var p=c.get("Width","W"),m=c.get("Height","H"),v=p+7>>3,b=i.getBytes(v*m),y=c.getArray("Decode","D"),w=!!y&&y[0]>0
return d=X.createMask(b,p,m,i instanceof q,w),d.cached=!0,f=[d],r.addOp(C.paintImageMaskXObject,f),void(n&&(s[n]={fn:C.paintImageMaskXObject,args:f}))}var k=c.get("SMask","SM")||!1,x=c.get("Mask")||!1,S=200
if(a&&!k&&!x&&!(i instanceof H)&&S>l+h){var A=new X(this.xref,t,i,a,null,null)
return d=A.createImageData(!0),void r.addOp(C.paintInlineImageXObject,[d])}var I="img_"+this.idFactory.createObjId()
if(r.addDependency(I),f=[I,l,h],!k&&!x&&i instanceof H&&e.isSupported(i,this.xref,t))return r.addOp(C.paintJpegXObject,f),void this.handler.send("obj",[I,this.pageIndex,"JpegStream",i.getIR(this.options.forceDataSchema)])
var P=null;(i instanceof H||x instanceof H||k instanceof H)&&(P=new e(o.xref,t,o.handler,o.options.forceDataSchema)),X.buildImage(o.handler,o.xref,t,i,a,P).then(function(e){var t=e.createImageData(!1)
o.handler.send("obj",[I,o.pageIndex,"Image",t],[t.data.buffer])}).then(void 0,function(e){O("Unable to decode image: "+e),o.handler.send("obj",[I,o.pageIndex,"Image",null])}),r.addOp(C.paintImageXObject,f),n&&(s[n]={fn:C.paintImageXObject,args:f})},handleSMask:function(e,t,i,a,r){var n=e.get("G"),s={subtype:e.get("S").name,backdrop:e.get("BC")},o=e.get("TR")
if(ie(o)){for(var c=ae.parse(this.xref,o),l=new Uint8Array(256),h=new Float32Array(1),u=0;256>u;u++)h[0]=u/255,c(h,0,h,0),l[u]=255*h[0]|0
s.transferMap=l}return this.buildFormXObject(t,n,s,i,a,r.state.clone())},handleTilingType:function(e,t,i,a,r,n,s){var o=new Ae,c=[r.get("Resources"),i],l=M.merge(this.xref,c)
return this.getOperatorList(a,s,l,o).then(function(){n.addDependencies(o.dependencies),n.addOp(e,ne({fnArray:o.fnArray,argsArray:o.argsArray},r,t))})},handleSetFont:function(e,t,i,a,r,n){var s
t&&(t=t.slice(),s=t[0].name)
var o=this
return this.loadFont(s,i,this.xref,e).then(function(t){return t.font.isType3Font?t.loadType3Data(o,e,a,r).then(function(){return t},function(e){return o.handler.send("UnsupportedFeature",{featureId:w.font}),new Se("g_font_error",new J("Type3 font load error: "+e),t.font)}):t}).then(function(e){return n.font=e.font,e.send(o.handler),e.loadedName})},handleText:function(e,t){var i=t.font,a=i.charsToGlyphs(e),r=!!(t.textRenderingMode&x.ADD_TO_PATH_FLAG)
if(i.data&&(r||this.options.disableFontFace))for(var n=function(e){if(!i.renderer.hasBuiltPath(e)){var t=i.renderer.getPathJs(e)
this.handler.send("commonobj",[i.loadedName+"_path_"+e,"FontPath",t])}}.bind(this),s=0,o=a.length;o>s;s++){var c=a[s]
n(c.fontChar)
var l=c.accent
l&&l.fontChar&&n(l.fontChar)}return a},setGState:function(e,t,i,a,r,n){for(var s=[],o=t.getKeys(),c=this,l=Promise.resolve(),h=0,u=o.length;u>h;h++){var d=o[h],f=t.get(d)
switch(d){case"Type":break
case"LW":case"LC":case"LJ":case"ML":case"D":case"RI":case"FL":case"CA":case"ca":s.push([d,f])
break
case"Font":l=l.then(function(){return c.handleSetFont(e,null,f[0],i,a,n.state).then(function(e){i.addDependency(e),s.push([d,[e,f[1]]])})})
break
case"BM":s.push([d,f])
break
case"SMask":if(j(f,"None")){s.push([d,!1])
break}N(f)?(l=l.then(function(t){return c.handleSMask(t,e,i,a,n)}.bind(this,f)),s.push([d,!0])):O("Unsupported SMask type")
break
case"OP":case"op":case"OPM":case"BG":case"BG2":case"UCR":case"UCR2":case"TR":case"TR2":case"HT":case"SM":case"SA":case"AIS":case"TK":B("graphic state operator "+d)
break
default:B("Unknown graphic state operator "+d)}}return l.then(function(){s.length>0&&i.addOp(C.setGState,[s])})},loadFont:function(e,t,i,a){function r(){return Promise.resolve(new Se("g_font_error",new J("Font "+e+" is not available"),t))}var n
if(t)A(U(t)),n=t
else{var s=a.get("Font")
if(!s)return O("fontRes not available"),r()
n=s.getRaw(e)}if(!n)return O("fontRef not available"),r()
if(this.fontCache.has(n))return this.fontCache.get(n)
if(t=i.fetchIfRef(n),!N(t))return r()
if(t.translated)return t.translated
var o,c=I(),l=this.preEvaluateFont(t,i),h=l.descriptor,u=U(n)
if(u&&(o=""+n),N(h)){h.fontAliases||(h.fontAliases=Object.create(null))
var d=h.fontAliases,f=l.hash
if(d[f]){var g=d[f].aliasRef
if(u&&g&&this.fontCache.has(g))return this.fontCache.putAlias(n,g),this.fontCache.get(n)}else d[f]={fontID:Q.getFontID()}
u&&(d[f].aliasRef=n),o=d[f].fontID}u?this.fontCache.put(n,c.promise):(o||(o=this.idFactory.createObjId()),this.fontCache.put("id_"+o,c.promise)),A(o,'The "fontID" must be defined.'),t.loadedName="g_"+this.pdfManager.docId+"_f"+o,t.translated=c.promise
var p
try{p=this.translateFont(l,i)}catch(m){p=Promise.reject(m)}var v=this
return p.then(function(e){if(void 0!==e.fontType){var a=i.stats.fontTypes
a[e.fontType]=!0}c.resolve(new Se(t.loadedName,e,t))},function(e){v.handler.send("UnsupportedFeature",{featureId:w.font})
try{var a=l.descriptor,r=a&&a.get("FontFile3"),n=r&&r.get("Subtype"),s=te(l.type,n&&n.name),o=i.stats.fontTypes
o[s]=!0}catch(h){}c.resolve(new Se(t.loadedName,new J(e instanceof Error?e.message:e),t))}),c.promise},buildPath:function(e,t,i){var a=e.length-1
if(i||(i=[]),0>a||e.fnArray[a]!==C.constructPath)e.addOp(C.constructPath,[[t],i])
else{var r=e.argsArray[a]
r[0].push(t),Array.prototype.push.apply(r[1],i)}},handleColorN:function(e,t,i,a,r,n,s,l){var h,u=i[i.length-1]
if(j(u)&&(h=r.get(u.name))){var d=_(h)?h.dict:h,f=d.get("PatternType")
if(f===o){var g=a.base?a.base.getRgb(i,0):null
return this.handleTilingType(t,g,n,h,d,e,s)}if(f===c){var p=d.get("Shading"),m=d.getArray("Matrix")
return h=re.parseShading(p,m,l,n,this.handler),e.addOp(t,h.getIR()),Promise.resolve()}return Promise.reject("Unknown PatternType: "+f)}return e.addOp(t,i),Promise.resolve()},getOperatorList:function(e,t,a,r,n){var o=this,c=this.xref,l=Object.create(null)
A(r),a=a||M.empty
var h=a.get("XObject")||M.empty,u=a.get("Pattern")||M.empty,d=new Ie(n||new Be),f=new Te(e,c,d),g=new i
return new Promise(function p(e,i){var n=function(t){t.then(function(){try{p(e,i)}catch(t){i(t)}},i)}
t.ensureNotTerminated(),g.reset()
for(var m,v,b,y,w={};!(m=g.check())&&(w.args=null,f.read(w));){var k=w.args,x=w.fn
switch(0|x){case C.paintXObject:if(k[0].code)break
var S=k[0].name
if(!S){O("XObject must be referred to by name.")
continue}if(void 0!==l[S]){r.addOp(l[S].fn,l[S].args),k=null
continue}var I=h.get(S)
if(I){A(_(I),"XObject should be a stream")
var T=I.dict.get("Subtype")
if(A(j(T),"XObject should have a Name subtype"),"Form"===T.name)return d.save(),void n(o.buildFormXObject(a,I,null,r,t,d.state.clone()).then(function(){d.restore()}))
if("Image"===T.name){o.buildPaintImageXObject(a,I,!1,r,S,l),k=null
continue}if("PS"===T.name){B("Ignored XObject subtype PS")
continue}P("Unhandled XObject subtype "+T.name)}break
case C.setFont:var R=k[1]
return void n(o.handleSetFont(a,k,null,r,t,d.state).then(function(e){r.addDependency(e),r.addOp(C.setFont,[e,R])}))
case C.endInlineImage:var D=k[0].cacheKey
if(D){var F=l[D]
if(void 0!==F){r.addOp(F.fn,F.args),k=null
continue}}o.buildPaintImageXObject(a,k[0],!0,r,D,l),k=null
continue
case C.showText:k[0]=o.handleText(k[0],d.state)
break
case C.showSpacedText:var U=k[0],q=[],H=U.length,z=d.state
for(v=0;H>v;++v){var V=U[v]
E(V)?Array.prototype.push.apply(q,o.handleText(V,z)):L(V)&&q.push(V)}k[0]=q,x=C.showText
break
case C.nextLineShowText:r.addOp(C.nextLine),k[0]=o.handleText(k[0],d.state),x=C.showText
break
case C.nextLineSetSpacingShowText:r.addOp(C.nextLine),r.addOp(C.setWordSpacing,[k.shift()]),r.addOp(C.setCharSpacing,[k.shift()]),k[0]=o.handleText(k[0],d.state),x=C.showText
break
case C.setTextRenderingMode:d.state.textRenderingMode=k[0]
break
case C.setFillColorSpace:d.state.fillColorSpace=K.parse(k[0],c,a)
continue
case C.setStrokeColorSpace:d.state.strokeColorSpace=K.parse(k[0],c,a)
continue
case C.setFillColor:y=d.state.fillColorSpace,k=y.getRgb(k,0),x=C.setFillRGBColor
break
case C.setStrokeColor:y=d.state.strokeColorSpace,k=y.getRgb(k,0),x=C.setStrokeRGBColor
break
case C.setFillGray:d.state.fillColorSpace=K.singletons.gray,k=K.singletons.gray.getRgb(k,0),x=C.setFillRGBColor
break
case C.setStrokeGray:d.state.strokeColorSpace=K.singletons.gray,k=K.singletons.gray.getRgb(k,0),x=C.setStrokeRGBColor
break
case C.setFillCMYKColor:d.state.fillColorSpace=K.singletons.cmyk,k=K.singletons.cmyk.getRgb(k,0),x=C.setFillRGBColor
break
case C.setStrokeCMYKColor:d.state.strokeColorSpace=K.singletons.cmyk,k=K.singletons.cmyk.getRgb(k,0),x=C.setStrokeRGBColor
break
case C.setFillRGBColor:d.state.fillColorSpace=K.singletons.rgb,k=K.singletons.rgb.getRgb(k,0)
break
case C.setStrokeRGBColor:d.state.strokeColorSpace=K.singletons.rgb,k=K.singletons.rgb.getRgb(k,0)
break
case C.setFillColorN:if(y=d.state.fillColorSpace,"Pattern"===y.name)return void n(o.handleColorN(r,C.setFillColorN,k,y,u,a,t,c))
k=y.getRgb(k,0),x=C.setFillRGBColor
break
case C.setStrokeColorN:if(y=d.state.strokeColorSpace,"Pattern"===y.name)return void n(o.handleColorN(r,C.setStrokeColorN,k,y,u,a,t,c))
k=y.getRgb(k,0),x=C.setStrokeRGBColor
break
case C.shadingFill:var G=a.get("Shading")
G||P("No shading resource found")
var W=G.get(k[0].name)
W||P("No shading object found")
var X=re.parseShading(W,null,c,a,o.handler),Y=X.getIR()
k=[Y],x=C.shadingFill
break
case C.setGState:var J=k[0],Z=a.get("ExtGState")
if(!N(Z)||!Z.has(J.name))break
var Q=Z.get(J.name)
return void n(o.setGState(a,Q,r,t,c,d))
case C.moveTo:case C.lineTo:case C.curveTo:case C.curveTo2:case C.curveTo3:case C.closePath:o.buildPath(r,x,k)
continue
case C.rectangle:o.buildPath(r,x,k)
continue
case C.markPoint:case C.markPointProps:case C.beginMarkedContent:case C.beginMarkedContentProps:case C.endMarkedContent:case C.beginCompat:case C.endCompat:continue
default:if(null!==k){for(v=0,b=k.length;b>v&&!(k[v]instanceof M);v++);if(b>v){O("getOperatorList - ignoring operator: "+x)
continue}}}r.addOp(x,k)}if(m)return void n(s)
for(v=0,b=f.savedStatesDepth;b>v;v++)r.addOp(C.restore,[])
e()})},getTextContent:function(e,t,a,r,n,o){function c(){if(v.initialized)return v
var e=B.font
e.loadedName in m.styles||(m.styles[e.loadedName]={fontFamily:e.fallbackName,ascent:e.ascent,descent:e.descent,vertical:e.vertical}),v.fontName=e.loadedName
var t=[B.fontSize*B.textHScale,0,0,B.fontSize,0,B.textRise]
if(e.isType3Font&&B.fontMatrix!==b&&1===B.fontSize){var i=e.bbox[3]-e.bbox[1]
i>0&&(i*=B.fontMatrix[3],t[3]*=i)}var a=S.transform(B.ctm,S.transform(B.textMatrix,t))
v.transform=a,e.vertical?(v.width=Math.sqrt(a[0]*a[0]+a[1]*a[1]),v.height=0,v.vertical=!0):(v.width=0,v.height=Math.sqrt(a[2]*a[2]+a[3]*a[3]),v.vertical=!1)
var r=B.textLineMatrix[0],n=B.textLineMatrix[1],s=Math.sqrt(r*r+n*n)
r=B.ctm[0],n=B.ctm[1]
var o=Math.sqrt(r*r+n*n)
v.textAdvanceScale=o*s,v.lastAdvanceWidth=0,v.lastAdvanceHeight=0
var c=e.spaceWidth/1e3*B.fontSize
return c?(v.spaceWidth=c,v.fakeSpaceMin=c*w,v.fakeMultiSpaceMin=c*k,v.fakeMultiSpaceMax=c*x,v.textRunBreakAllowed=!e.isMonospace):(v.spaceWidth=0,v.fakeSpaceMin=1/0,v.fakeMultiSpaceMin=1/0,v.fakeMultiSpaceMax=0,v.textRunBreakAllowed=!1),v.initialized=!0,v}function l(e){for(var t,i=0,a=e.length;a>i&&(t=e.charCodeAt(i))>=32&&127>=t;)i++
return a>i?e.replace(p," "):e}function h(e){var t=e.str.join(""),i=le(t,-1,e.vertical)
return{str:n?l(i.str):i.str,dir:i.dir,width:e.width,height:e.height,transform:e.transform,fontName:e.fontName}}function u(e,t){return I.loadFont(e,t,P,a).then(function(e){B.font=e.font,B.fontMatrix=e.font.fontMatrix||b})}function d(e){for(var t=B.font,i=c(),a=0,r=0,n=t.charsToGlyphs(e),s=t.defaultVMetrics,o=0;o<n.length;o++){var l=n[o],h=null,u=null,d=null
t.vertical?l.vmetric?(d=l.vmetric[0],h=l.vmetric[1],u=l.vmetric[2]):(d=l.width,h=.5*l.width,u=s[2]):d=l.width
var g=l.unicode,p=ye()
void 0!==p[g]&&(g=p[g]),g=we(g)
var m=B.charSpacing
if(l.isSpace){var v=B.wordSpacing
m+=v,v>0&&f(v,i.str)}var b=0,y=0
if(t.vertical){var w=d*B.fontMatrix[0]
y=w*B.fontSize+m,r+=y}else{var k=d*B.fontMatrix[0]
b=(k*B.fontSize+m)*B.textHScale,a+=b}B.translateTextMatrix(b,y),i.str.push(g)}return t.vertical?(i.lastAdvanceHeight=r,i.height+=Math.abs(r)):(i.lastAdvanceWidth=a,i.width+=a),i}function f(e,t){if(!(e<v.fakeSpaceMin)){if(e<v.fakeMultiSpaceMin)return void t.push(" ")
for(var i=Math.round(e/v.spaceWidth);i-- >0;)t.push(" ")}}function g(){v.initialized&&(v.width*=v.textAdvanceScale,v.height*=v.textAdvanceScale,m.items.push(h(v)),v.initialized=!1,v.str.length=0)}r=r||new Ie(new Pe)
var p=/\s/g,m={items:[],styles:Object.create(null)},v={initialized:!1,str:[],width:0,height:0,vertical:!1,lastAdvanceWidth:0,lastAdvanceHeight:0,textAdvanceScale:0,spaceWidth:0,fakeSpaceMin:1/0,fakeMultiSpaceMin:1/0,fakeMultiSpaceMax:-0,textRunBreakAllowed:!1,transform:null,fontName:null},w=.3,k=1.5,x=4,I=this,P=this.xref
a=P.fetchIfRef(a)||M.empty
var B,E=null,R=Object.create(null),O=new Te(e,P,r),D=new i
return new Promise(function F(e,i){var l=function(t){t.then(function(){try{F(e,i)}catch(t){i(t)}},i)}
t.ensureNotTerminated(),D.reset()
for(var h,p={},b=[];!(h=D.check())&&(b.length=0,p.args=b,O.read(p));){B=r.state
var w=p.fn
b=p.args
var k,x
switch(0|w){case C.setFont:var P=b[0].name,U=b[1]
if(B.font&&P===B.fontName&&U===B.fontSize)break
return g(),B.fontName=P,B.fontSize=U,void l(u(P,null))
case C.setTextRise:g(),B.textRise=b[0]
break
case C.setHScale:g(),B.textHScale=b[0]/100
break
case C.setLeading:g(),B.leading=b[0]
break
case C.moveText:var q=B.font?0===(B.font.vertical?b[0]:b[1]):!1
if(k=b[0]-b[1],o&&q&&v.initialized&&k>0&&k<=v.fakeMultiSpaceMax){B.translateTextLineMatrix(b[0],b[1]),v.width+=b[0]-v.lastAdvanceWidth,v.height+=b[1]-v.lastAdvanceHeight,x=b[0]-v.lastAdvanceWidth-(b[1]-v.lastAdvanceHeight),f(x,v.str)
break}g(),B.translateTextLineMatrix(b[0],b[1]),B.textMatrix=B.textLineMatrix.slice()
break
case C.setLeadingMoveText:g(),B.leading=-b[1],B.translateTextLineMatrix(b[0],b[1]),B.textMatrix=B.textLineMatrix.slice()
break
case C.nextLine:g(),B.carriageReturn()
break
case C.setTextMatrix:if(k=B.calcTextLineMatrixAdvance(b[0],b[1],b[2],b[3],b[4],b[5]),o&&null!==k&&v.initialized&&k.value>0&&k.value<=v.fakeMultiSpaceMax){B.translateTextLineMatrix(k.width,k.height),v.width+=k.width-v.lastAdvanceWidth,v.height+=k.height-v.lastAdvanceHeight,x=k.width-v.lastAdvanceWidth-(k.height-v.lastAdvanceHeight),f(x,v.str)
break}g(),B.setTextMatrix(b[0],b[1],b[2],b[3],b[4],b[5]),B.setTextLineMatrix(b[0],b[1],b[2],b[3],b[4],b[5])
break
case C.setCharSpacing:B.charSpacing=b[0]
break
case C.setWordSpacing:B.wordSpacing=b[0]
break
case C.beginText:g(),B.textMatrix=y.slice(),B.textLineMatrix=y.slice()
break
case C.showSpacedText:for(var H,z=b[0],V=0,G=z.length;G>V;V++)if("string"==typeof z[V])d(z[V])
else if(L(z[V])){c(),k=z[V]*B.fontSize/1e3
var W=!1
B.font.vertical?(H=k,B.translateTextMatrix(0,H),W=v.textRunBreakAllowed&&k>v.fakeMultiSpaceMax,W||(v.height+=H)):(k=-k,H=k*B.textHScale,B.translateTextMatrix(H,0),W=v.textRunBreakAllowed&&k>v.fakeMultiSpaceMax,W||(v.width+=H)),W?g():k>0&&f(k,v.str)}break
case C.showText:d(b[0])
break
case C.nextLineShowText:g(),B.carriageReturn(),d(b[0])
break
case C.nextLineSetSpacingShowText:g(),B.wordSpacing=b[0],B.charSpacing=b[1],B.carriageReturn(),d(b[2])
break
case C.paintXObject:if(g(),b[0].code)break
E||(E=a.get("XObject")||M.empty)
var X=b[0].name
if(R.key===X){R.texts&&(S.appendToArray(m.items,R.texts.items),S.extendObj(m.styles,R.texts.styles))
break}var K=E.get(X)
if(!K)break
A(_(K),"XObject should be a stream")
var Y=K.dict.get("Subtype")
if(A(j(Y),"XObject should have a Name subtype"),"Form"!==Y.name){R.key=X,R.texts=null
break}r.save()
var J=K.dict.getArray("Matrix")
return T(J)&&6===J.length&&r.transform(J),void l(I.getTextContent(K,t,K.dict.get("Resources")||a,r,n,o).then(function(e){S.appendToArray(m.items,e.items),S.extendObj(m.styles,e.styles),r.restore(),R.key=X,R.texts=e}))
case C.setGState:g()
var Z=b[0],Q=a.get("ExtGState")
if(!N(Q)||!j(Z))break
var $=Q.get(Z.name)
if(!N($))break
var ee=$.get("Font")
if(ee)return B.fontName=null,B.fontSize=ee[1],void l(u(null,ee[0]))}}return h?void l(s):(g(),void e(m))})},extractDataStructures:function(e,t,i,a){var r=e.get("ToUnicode")||t.get("ToUnicode"),n=r?this.readToUnicode(r):Promise.resolve(void 0)
if(a.composite){var s=e.get("CIDSystemInfo")
N(s)&&(a.cidSystemInfo={registry:s.get("Registry"),ordering:s.get("Ordering"),supplement:s.get("Supplement")})
var o=e.get("CIDToGIDMap")
_(o)&&(a.cidToGidMap=this.readCidToGidMap(o))}var c,l=[],h=null
if(e.has("Encoding")){if(c=e.get("Encoding"),N(c)){if(h=c.get("BaseEncoding"),h=j(h)?h.name:null,c.has("Differences"))for(var u=c.get("Differences"),d=0,f=0,g=u.length;g>f;f++){var p=i.fetchIfRef(u[f])
L(p)?d=p:j(p)?l[d++]=p.name:P("Invalid entry in 'Differences' array: "+p)}}else j(c)?h=c.name:P("Encoding is not a Name nor a Dict")
"MacRomanEncoding"!==h&&"MacExpertEncoding"!==h&&"WinAnsiEncoding"!==h&&(h=null)}if(h)a.defaultEncoding=pe(h).slice()
else{var m=!!(a.flags&Z.Symbolic),v=!!(a.flags&Z.Nonsymbolic)
c=ue,"TrueType"!==a.type||v||(c=he),m&&(c=de,a.file||(/Symbol/i.test(a.name)?c=fe:/Dingbats/i.test(a.name)&&(c=ge))),a.defaultEncoding=c}return a.differences=l,a.baseEncodingName=h,a.hasEncoding=!!h||l.length>0,a.dict=e,n.then(function(e){return a.toUnicode=e,this.buildToUnicode(a)}.bind(this)).then(function(e){return a.toUnicode=e,a})},buildToUnicode:function(e){if(e.hasIncludedToUnicodeMap=!!e.toUnicode&&e.toUnicode.length>0,e.hasIncludedToUnicodeMap)return Promise.resolve(e.toUnicode)
var t,i,a
if(!e.composite){t=[]
var r=e.defaultEncoding.slice(),n=e.baseEncodingName,s=e.differences
for(i in s)a=s[i],".notdef"!==a&&(r[i]=a)
var o=Ce()
for(i in r)if(a=r[i],""!==a)if(void 0!==o[a])t[i]=String.fromCharCode(o[a])
else{var c=0
switch(a[0]){case"G":3===a.length&&(c=parseInt(a.substr(1),16))
break
case"g":5===a.length&&(c=parseInt(a.substr(1),16))
break
case"C":case"c":a.length>=3&&(c=+a.substr(1))
break
default:var l=ke(a,o);-1!==l&&(c=l)}if(c){if(n&&c===+i){var h=pe(n)
if(h&&(a=h[i])){t[i]=String.fromCharCode(o[a])
continue}}t[i]=String.fromCharCode(c)}}return Promise.resolve(new ee(t))}if(e.composite&&(e.cMap.builtInCMap&&!(e.cMap instanceof oe)||"Adobe"===e.cidSystemInfo.registry&&("GB1"===e.cidSystemInfo.ordering||"CNS1"===e.cidSystemInfo.ordering||"Japan1"===e.cidSystemInfo.ordering||"Korea1"===e.cidSystemInfo.ordering))){var u=e.cidSystemInfo.registry,d=e.cidSystemInfo.ordering,f=D.get(u+"-"+d+"-UCS2")
return se.create(f,this.options.cMapOptions,null).then(function(i){var a=e.cMap
return t=[],a.forEach(function(e,a){A(65535>=a,"Max size of CID is 65,535")
var r=i.lookup(a)
r&&(t[e]=String.fromCharCode((r.charCodeAt(0)<<8)+r.charCodeAt(1)))}),new ee(t)})}return Promise.resolve(new $(e.firstChar,e.lastChar))},readToUnicode:function(e){var t=e
return j(t)?se.create(t,this.options.cMapOptions,null).then(function(e){return e instanceof oe?new $(0,65535):new ee(e.getMap())}):_(t)?se.create(t,this.options.cMapOptions,null).then(function(e){if(e instanceof oe)return new $(0,65535)
var t=Array(e.length)
return e.forEach(function(e,i){for(var a=[],r=0;r<i.length;r+=2){var n=i.charCodeAt(r)<<8|i.charCodeAt(r+1)
if(55296===(63488&n)){r+=2
var s=i.charCodeAt(r)<<8|i.charCodeAt(r+1)
a.push(((1023&n)<<10)+(1023&s)+65536)}else a.push(n)}t[e]=String.fromCharCode.apply(String,a)}),new ee(t)}):Promise.resolve(null)},readCidToGidMap:function(e){for(var t=e.getBytes(),i=[],a=0,r=t.length;r>a;a++){var n=t[a++]<<8|t[a]
if(0!==n){var s=a>>1
i[s]=n}}return i},extractWidths:function(e,t,i,a){var r,n,s,o,c,l,h,u,d=[],f=0,g=[]
if(a.composite){if(f=e.get("DW")||1e3,u=e.get("W"))for(n=0,s=u.length;s>n;n++)if(l=t.fetchIfRef(u[n++]),h=t.fetchIfRef(u[n]),T(h))for(o=0,c=h.length;c>o;o++)d[l++]=t.fetchIfRef(h[o])
else{var p=t.fetchIfRef(u[++n])
for(o=l;h>=o;o++)d[o]=p}if(a.vertical){var m=e.getArray("DW2")||[880,-1e3]
if(r=[m[1],.5*f,m[0]],m=e.get("W2"))for(n=0,s=m.length;s>n;n++)if(l=t.fetchIfRef(m[n++]),h=t.fetchIfRef(m[n]),T(h))for(o=0,c=h.length;c>o;o++)g[l++]=[t.fetchIfRef(h[o++]),t.fetchIfRef(h[o++]),t.fetchIfRef(h[o])]
else{var v=[t.fetchIfRef(m[++n]),t.fetchIfRef(m[++n]),t.fetchIfRef(m[++n])]
for(o=l;h>=o;o++)g[o]=v}}}else{var b=a.firstChar
if(u=e.get("Widths")){for(o=b,n=0,s=u.length;s>n;n++)d[o++]=t.fetchIfRef(u[n])
f=parseFloat(i.get("MissingWidth"))||0}else{var y=e.get("BaseFont")
if(j(y)){var w=this.getBaseFontMetrics(y.name)
d=this.buildCharCodeToWidth(w.widths,a),f=w.defaultWidth}}}var k=!0,C=f
for(var x in d){var S=d[x]
if(S)if(C){if(C!==S){k=!1
break}}else C=S}k&&(a.flags|=Z.FixedPitch),a.defaultWidth=f,a.widths=d,a.defaultVMetrics=r,a.vmetrics=g},isSerifFont:function(e){var t=e.split("-")[0]
return t in ve()||-1!==t.search(/serif/gi)},getBaseFontMetrics:function(e){var t=0,i=[],a=!1,r=me(),n=r[e]||e,s=ce()
n in s||(n=this.isSerifFont(e)?"Times-Roman":"Helvetica")
var o=s[n]
return L(o)?(t=o,a=!0):i=o(),{defaultWidth:t,monospace:a,widths:i}},buildCharCodeToWidth:function(e,t){for(var i=Object.create(null),a=t.differences,r=t.defaultEncoding,n=0;256>n;n++)n in a&&e[a[n]]?i[n]=e[a[n]]:n in r&&e[r[n]]&&(i[n]=e[r[n]])
return i},preEvaluateFont:function(e,t){var i=e,a=e.get("Subtype")
A(j(a),"invalid font Subtype")
var r,n=!1
if("Type0"===a.name){var s=e.get("DescendantFonts")
s||P("Descendant fonts are not specified"),e=T(s)?t.fetchIfRef(s[0]):s,a=e.get("Subtype"),A(j(a),"invalid font Subtype"),n=!0}var o=e.get("FontDescriptor")
if(o){var c=new Y,l=i.getRaw("Encoding")
if(j(l))c.update(l.name)
else if(U(l))c.update(""+l)
else if(N(l))for(var h=l.getKeys(),u=0,d=h.length;d>u;u++){var f=l.getRaw(h[u])
if(j(f))c.update(f.name)
else if(U(f))c.update(""+f)
else if(T(f)){for(var g=f.length,p=Array(g),m=0;g>m;m++){var v=f[m]
j(v)?p[m]=v.name:(L(v)||U(v))&&(p[m]=""+v)}c.update(p.join())}}var b=e.get("ToUnicode")||i.get("ToUnicode")
if(_(b)){var y=b.str||b
r=y.buffer?new Uint8Array(y.buffer.buffer,0,y.bufferLength):new Uint8Array(y.bytes.buffer,y.start,y.end-y.start),c.update(r)}else j(b)&&c.update(b.name)
var w=e.get("Widths")||i.get("Widths")
w&&(r=new Uint8Array(new Uint32Array(w).buffer),c.update(r))}return{descriptor:o,dict:e,baseDict:i,composite:n,type:a.name,hash:c?c.hexdigest():""}},translateFont:function(e,t){var i,a=e.baseDict,r=e.dict,n=e.composite,s=e.descriptor,o=e.type,c=n?65535:255,l=this.options.cMapOptions
if(!s){if("Type3"!==o){var h=r.get("BaseFont")
j(h)||P("Base font is not specified"),h=h.name.replace(/[,_]/g,"-")
var u=this.getBaseFontMetrics(h),d=h.split("-")[0],f=(this.isSerifFont(d)?Z.Serif:0)|(u.monospace?Z.FixedPitch:0)|(be()[d]?Z.Symbolic:Z.Nonsymbolic)
return i={type:o,name:h,widths:u.widths,defaultWidth:u.defaultWidth,flags:f,firstChar:0,lastChar:c},this.extractDataStructures(r,r,t,i).then(function(e){return e.widths=this.buildCharCodeToWidth(u.widths,e),new Q(h,null,e)}.bind(this))}s=new M(null),s.set("FontName",D.get(o)),s.set("FontBBox",r.getArray("FontBBox"))}var g=r.get("FirstChar")||0,p=r.get("LastChar")||c,m=s.get("FontName"),v=r.get("BaseFont")
if(E(m)&&(m=D.get(m)),E(v)&&(v=D.get(v)),"Type3"!==o){var y=m&&m.name,w=v&&v.name
y!==w&&(B("The FontDescriptor's FontName is \""+y+'" but should be the same as the Font\'s BaseFont "'+w+'"'),y&&w&&0===w.indexOf(y)&&(m=v))}m=m||v,A(j(m),"invalid font name")
var k=s.get("FontFile","FontFile2","FontFile3")
if(k&&k.dict){var C=k.dict.get("Subtype")
C&&(C=C.name)
var x=k.dict.get("Length1"),S=k.dict.get("Length2"),I=k.dict.get("Length3")}i={type:o,name:m.name,subtype:C,file:k,length1:x,length2:S,length3:I,loadedName:a.loadedName,composite:n,wideChars:n,fixedPitch:!1,fontMatrix:r.getArray("FontMatrix")||b,firstChar:g||0,lastChar:p||c,bbox:s.getArray("FontBBox"),ascent:s.get("Ascent"),descent:s.get("Descent"),xHeight:s.get("XHeight"),capHeight:s.get("CapHeight"),flags:s.get("Flags"),italicAngle:s.get("ItalicAngle"),coded:!1}
var T
if(n){var L=a.get("Encoding")
j(L)&&(i.cidEncoding=L.name),T=se.create(L,l,null).then(function(e){i.cMap=e,i.vertical=i.cMap.vertical})}else T=Promise.resolve(void 0)
return T.then(function(){return this.extractDataStructures(r,a,t,i)}.bind(this)).then(function(e){return this.extractWidths(r,t,s,e),"Type3"===o&&(e.isType3Font=!0),new Q(m.name,k,e)}.bind(this))}},t}(),Se=function(){function e(e,t,i){this.loadedName=e,this.font=t,this.dict=i,this.type3Loaded=null,this.sent=!1}return e.prototype={send:function(e){if(!this.sent){var t=this.font.exportData()
e.send("commonobj",[this.loadedName,"Font",t]),this.sent=!0}},loadType3Data:function(e,t,i,a){if(A(this.font.isType3Font),this.type3Loaded)return this.type3Loaded
for(var r=this.font,n=Promise.resolve(),s=this.dict.get("CharProcs"),o=this.dict.get("Resources")||t,c=s.getKeys(),l=Object.create(null),h=0,u=c.length;u>h;++h)n=n.then(function(t){var r=s.get(t),n=new Ae
return e.getOperatorList(r,a,o,n).then(function(){l[t]=n.getIR(),i.addDependencies(n.dependencies)},function(e){O('Type3 font resource "'+t+'" is not available')
var i=new Ae
l[t]=i.getIR()})}.bind(this,c[h]))
return this.type3Loaded=n.then(function(){r.charProcOperatorList=l}),this.type3Loaded}},e}(),Ae=function(){function e(e){for(var t=[],i=e.fnArray,a=e.argsArray,r=0,n=e.length;n>r;r++)switch(i[r]){case C.paintInlineImageXObject:case C.paintInlineImageXObjectGroup:case C.paintImageMaskXObject:var s=a[r][0]
s.cached||t.push(s.data.buffer)}return t}function t(e,t,i){this.messageHandler=t,this.fnArray=[],this.argsArray=[],this.dependencies=Object.create(null),this._totalLength=0,this.pageIndex=i,this.intent=e}var i=1e3,a=i-5
return t.prototype={get length(){return this.argsArray.length},get totalLength(){return this._totalLength+this.length},addOp:function(e,t){this.fnArray.push(e),this.argsArray.push(t),this.messageHandler&&(this.fnArray.length>=i?this.flush():this.fnArray.length>=a&&(e===C.restore||e===C.endText)&&this.flush())},addDependency:function(e){e in this.dependencies||(this.dependencies[e]=!0,this.addOp(C.dependency,[e]))},addDependencies:function(e){for(var t in e)this.addDependency(t)},addOpList:function(e){S.extendObj(this.dependencies,e.dependencies)
for(var t=0,i=e.length;i>t;t++)this.addOp(e.fnArray[t],e.argsArray[t])},getIR:function(){return{fnArray:this.fnArray,argsArray:this.argsArray,length:this.length}},flush:function(t){"oplist"!==this.intent&&(new Le).optimize(this)
var i=e(this),a=this.length
this._totalLength+=a,this.messageHandler.send("RenderPageChunk",{operatorList:{fnArray:this.fnArray,argsArray:this.argsArray,lastChunk:t,length:a},pageIndex:this.pageIndex,intent:this.intent},i),this.dependencies=Object.create(null),this.fnArray.length=0,this.argsArray.length=0}},t}(),Ie=function(){function e(e){this.state=e,this.stateStack=[]}return e.prototype={save:function(){var e=this.state
this.stateStack.push(this.state),this.state=e.clone()},restore:function(){var e=this.stateStack.pop()
e&&(this.state=e)},transform:function(e){this.state.ctm=S.transform(this.state.ctm,e)}},e}(),Pe=function(){function e(){this.ctm=new Float32Array(y),this.fontName=null,this.fontSize=0,this.font=null,this.fontMatrix=b,this.textMatrix=y.slice(),this.textLineMatrix=y.slice(),this.charSpacing=0,this.wordSpacing=0,this.leading=0,this.textHScale=1,this.textRise=0}return e.prototype={setTextMatrix:function(e,t,i,a,r,n){var s=this.textMatrix
s[0]=e,s[1]=t,s[2]=i,s[3]=a,s[4]=r,s[5]=n},setTextLineMatrix:function(e,t,i,a,r,n){var s=this.textLineMatrix
s[0]=e,s[1]=t,s[2]=i,s[3]=a,s[4]=r,s[5]=n},translateTextMatrix:function(e,t){var i=this.textMatrix
i[4]=i[0]*e+i[2]*t+i[4],i[5]=i[1]*e+i[3]*t+i[5]},translateTextLineMatrix:function(e,t){var i=this.textLineMatrix
i[4]=i[0]*e+i[2]*t+i[4],i[5]=i[1]*e+i[3]*t+i[5]},calcTextLineMatrixAdvance:function(e,t,i,a,r,n){var s=this.font
if(!s)return null
var o=this.textLineMatrix
if(e!==o[0]||t!==o[1]||i!==o[2]||a!==o[3])return null
var c=r-o[4],l=n-o[5]
if(s.vertical&&0!==c||!s.vertical&&0!==l)return null
var h,u,d=e*a-t*i
return s.vertical?(h=-l*i/d,u=l*e/d):(h=c*a/d,u=-c*t/d),{width:h,height:u,value:s.vertical?u:h}},calcRenderMatrix:function(e){var t=[this.fontSize*this.textHScale,0,0,this.fontSize,0,this.textRise]
return S.transform(e,S.transform(this.textMatrix,t))},carriageReturn:function(){this.translateTextLineMatrix(0,-this.leading),this.textMatrix=this.textLineMatrix.slice()},clone:function(){var e=Object.create(this)
return e.textMatrix=this.textMatrix.slice(),e.textLineMatrix=this.textLineMatrix.slice(),e.fontMatrix=this.fontMatrix.slice(),e}},e}(),Be=function(){function e(){this.ctm=new Float32Array(y),this.font=null,this.textRenderingMode=x.FILL,this.fillColorSpace=K.singletons.gray,this.strokeColorSpace=K.singletons.gray}return e.prototype={clone:function(){return Object.create(this)}},e}(),Te=function(){function e(e,i,a){this.opMap=t(),this.parser=new G(new V(e,this.opMap),!1,i),this.stateManager=a,this.nonProcessedArgs=[]}var t=R(function(e){e.w={id:C.setLineWidth,numArgs:1,variableArgs:!1},e.J={id:C.setLineCap,numArgs:1,variableArgs:!1},e.j={id:C.setLineJoin,numArgs:1,variableArgs:!1},e.M={id:C.setMiterLimit,numArgs:1,variableArgs:!1},e.d={id:C.setDash,numArgs:2,variableArgs:!1},e.ri={id:C.setRenderingIntent,numArgs:1,variableArgs:!1},e.i={id:C.setFlatness,numArgs:1,variableArgs:!1},e.gs={id:C.setGState,numArgs:1,variableArgs:!1},e.q={id:C.save,numArgs:0,variableArgs:!1},e.Q={id:C.restore,numArgs:0,variableArgs:!1},e.cm={id:C.transform,numArgs:6,variableArgs:!1},e.m={id:C.moveTo,numArgs:2,variableArgs:!1},e.l={id:C.lineTo,numArgs:2,variableArgs:!1},e.c={id:C.curveTo,numArgs:6,variableArgs:!1},e.v={id:C.curveTo2,numArgs:4,variableArgs:!1},e.y={id:C.curveTo3,numArgs:4,variableArgs:!1},e.h={id:C.closePath,numArgs:0,variableArgs:!1},e.re={id:C.rectangle,numArgs:4,variableArgs:!1},e.S={id:C.stroke,numArgs:0,variableArgs:!1},e.s={id:C.closeStroke,numArgs:0,variableArgs:!1},e.f={id:C.fill,numArgs:0,variableArgs:!1},e.F={id:C.fill,numArgs:0,variableArgs:!1},e["f*"]={id:C.eoFill,numArgs:0,variableArgs:!1},e.B={id:C.fillStroke,numArgs:0,variableArgs:!1},e["B*"]={id:C.eoFillStroke,numArgs:0,variableArgs:!1},e.b={id:C.closeFillStroke,numArgs:0,variableArgs:!1},e["b*"]={id:C.closeEOFillStroke,numArgs:0,variableArgs:!1},e.n={id:C.endPath,numArgs:0,variableArgs:!1},e.W={id:C.clip,numArgs:0,variableArgs:!1},e["W*"]={id:C.eoClip,numArgs:0,variableArgs:!1},e.BT={id:C.beginText,numArgs:0,variableArgs:!1},e.ET={id:C.endText,numArgs:0,variableArgs:!1},e.Tc={id:C.setCharSpacing,numArgs:1,variableArgs:!1},e.Tw={id:C.setWordSpacing,numArgs:1,variableArgs:!1},e.Tz={id:C.setHScale,numArgs:1,variableArgs:!1},e.TL={id:C.setLeading,numArgs:1,variableArgs:!1},e.Tf={id:C.setFont,numArgs:2,variableArgs:!1},e.Tr={id:C.setTextRenderingMode,numArgs:1,variableArgs:!1},e.Ts={id:C.setTextRise,numArgs:1,variableArgs:!1},e.Td={id:C.moveText,numArgs:2,variableArgs:!1},e.TD={id:C.setLeadingMoveText,numArgs:2,variableArgs:!1},e.Tm={id:C.setTextMatrix,numArgs:6,variableArgs:!1},e["T*"]={id:C.nextLine,numArgs:0,variableArgs:!1},e.Tj={id:C.showText,numArgs:1,variableArgs:!1},e.TJ={id:C.showSpacedText,numArgs:1,variableArgs:!1},e["'"]={id:C.nextLineShowText,numArgs:1,variableArgs:!1},e['"']={id:C.nextLineSetSpacingShowText,numArgs:3,variableArgs:!1},e.d0={id:C.setCharWidth,numArgs:2,variableArgs:!1},e.d1={id:C.setCharWidthAndBounds,numArgs:6,variableArgs:!1},e.CS={id:C.setStrokeColorSpace,numArgs:1,variableArgs:!1},e.cs={id:C.setFillColorSpace,numArgs:1,variableArgs:!1},e.SC={id:C.setStrokeColor,numArgs:4,variableArgs:!0},e.SCN={id:C.setStrokeColorN,numArgs:33,variableArgs:!0},e.sc={id:C.setFillColor,numArgs:4,variableArgs:!0},e.scn={id:C.setFillColorN,numArgs:33,variableArgs:!0},e.G={id:C.setStrokeGray,numArgs:1,variableArgs:!1},e.g={id:C.setFillGray,numArgs:1,variableArgs:!1},e.RG={id:C.setStrokeRGBColor,numArgs:3,variableArgs:!1},e.rg={id:C.setFillRGBColor,numArgs:3,variableArgs:!1},e.K={id:C.setStrokeCMYKColor,numArgs:4,variableArgs:!1},e.k={id:C.setFillCMYKColor,numArgs:4,variableArgs:!1},e.sh={id:C.shadingFill,numArgs:1,variableArgs:!1},e.BI={id:C.beginInlineImage,numArgs:0,variableArgs:!1},e.ID={id:C.beginImageData,numArgs:0,variableArgs:!1},e.EI={id:C.endInlineImage,numArgs:1,variableArgs:!1},e.Do={id:C.paintXObject,numArgs:1,variableArgs:!1},e.MP={id:C.markPoint,numArgs:1,variableArgs:!1},e.DP={id:C.markPointProps,numArgs:2,variableArgs:!1},e.BMC={id:C.beginMarkedContent,numArgs:1,variableArgs:!1},e.BDC={id:C.beginMarkedContentProps,numArgs:2,variableArgs:!1},e.EMC={id:C.endMarkedContent,numArgs:0,variableArgs:!1},e.BX={id:C.beginCompat,numArgs:0,variableArgs:!1},e.EX={id:C.endCompat,numArgs:0,variableArgs:!1},e.BM=null,e.BD=null,e["true"]=null,e.fa=null,e.fal=null,e.fals=null,e["false"]=null,e.nu=null,e.nul=null,e["null"]=null})
return e.prototype={get savedStatesDepth(){return this.stateManager.stateStack.length},read:function(e){for(var t=e.args;;){var i=this.parser.getObj()
if(F(i)){var a=i.cmd,r=this.opMap[a]
if(!r){O('Unknown command "'+a+'"')
continue}var n=r.id,s=r.numArgs,o=null!==t?t.length:0
if(r.variableArgs)o>s&&B("Command "+n+": expected [0,"+s+"] args, but received "+o+" args.")
else{if(o!==s){for(var c=this.nonProcessedArgs;o>s;)c.push(t.shift()),o--
for(;s>o&&0!==c.length;)null===t&&(t=[]),t.unshift(c.pop()),o++}if(s>o){O("Skipping command "+n+": expected "+s+" args, but received "+o+" args."),null!==t&&(t.length=0)
continue}}return this.preprocessCommand(n,t),e.fn=n,e.args=t,!0}if(W(i))return!1
null!==i&&(null===t&&(t=[]),t.push(i),A(t.length<=33,"Too many arguments"))}},preprocessCommand:function(e,t){switch(0|e){case C.save:this.stateManager.save()
break
case C.restore:this.stateManager.restore()
break
case C.transform:this.stateManager.transform(t)}}},e}(),Le=function(){function e(e,t,i){for(var a=e,r=0,n=t.length-1;n>r;r++){var s=t[r]
a=a[s]||(a[s]=[])}a[t[t.length-1]]=i}function t(e,t,i,a){for(var r=e+2,n=0;t>n;n++){var s=a[r+4*n],o=1===s.length&&s[0]
if(!o||1!==o.width||1!==o.height||o.data.length&&(1!==o.data.length||0!==o.data[0]))break
i[r+4*n]=C.paintSolidColorImageMask}return t-n}function i(){}var a=[]
return e(a,[C.save,C.transform,C.paintInlineImageXObject,C.restore],function(e){for(var t=10,i=200,a=1e3,r=1,n=e.fnArray,s=e.argsArray,o=e.iCurr,c=o-3,l=o-2,h=o-1,u=c+4,d=n.length;d>u+3&&n[u]===C.save&&n[u+1]===C.transform&&n[u+2]===C.paintInlineImageXObject&&n[u+3]===C.restore;)u+=4
var f=Math.min((u-c)/4,i)
if(t>f)return u
var g,p=0,m=[],v=0,b=r,y=r
for(g=0;f>g;g++){var w=s[l+(g<<2)],x=s[h+(g<<2)][0]
b+x.width>a&&(p=Math.max(p,b),y+=v+2*r,b=0,v=0),m.push({transform:w,x:b,y:y,w:x.width,h:x.height}),b+=x.width+2*r,v=Math.max(v,x.height)}var S=Math.max(p,b)+r,A=y+v+r,I=new Uint8Array(S*A*4),P=S<<2
for(g=0;f>g;g++){var B=s[h+(g<<2)][0].data,T=m[g].w<<2,L=0,E=m[g].x+m[g].y*S<<2
I.set(B.subarray(0,T),E-P)
for(var R=0,O=m[g].h;O>R;R++)I.set(B.subarray(L,L+T),E),L+=T,E+=P
for(I.set(B.subarray(L-T,L),E);E>=0;)B[E-4]=B[E],B[E-3]=B[E+1],B[E-2]=B[E+2],B[E-1]=B[E+3],B[E+T]=B[E+T-4],B[E+T+1]=B[E+T-3],B[E+T+2]=B[E+T-2],B[E+T+3]=B[E+T-1],E-=P}return n.splice(c,4*f,C.paintInlineImageXObjectGroup),s.splice(c,4*f,[{width:S,height:A,kind:k.RGBA_32BPP,data:I},m]),c+1}),e(a,[C.save,C.transform,C.paintImageMaskXObject,C.restore],function(e){for(var i=10,a=100,r=1e3,n=e.fnArray,s=e.argsArray,o=e.iCurr,c=o-3,l=o-2,h=o-1,u=c+4,d=n.length;d>u+3&&n[u]===C.save&&n[u+1]===C.transform&&n[u+2]===C.paintImageMaskXObject&&n[u+3]===C.restore;)u+=4
var f=(u-c)/4
if(f=t(c,f,n,s),i>f)return u
var g,p,m,v=!1,b=s[h][0]
if(0===s[l][1]&&0===s[l][2]){v=!0
var y=s[l][0],w=s[l][3]
p=l+4
var k=h+4
for(g=1;f>g;g++,p+=4,k+=4)if(m=s[p],s[k][0]!==b||m[0]!==y||0!==m[1]||0!==m[2]||m[3]!==w){i>g?v=!1:f=g
break}}if(v){f=Math.min(f,r)
var x=new Float32Array(2*f)
for(p=l,g=0;f>g;g++,p+=4)m=s[p],x[g<<1]=m[4],x[(g<<1)+1]=m[5]
n.splice(c,4*f,C.paintImageMaskXObjectRepeat),s.splice(c,4*f,[b,y,w,x])}else{f=Math.min(f,a)
var S=[]
for(g=0;f>g;g++){m=s[l+(g<<2)]
var A=s[h+(g<<2)][0]
S.push({data:A.data,width:A.width,height:A.height,transform:m})}n.splice(c,4*f,C.paintImageMaskXObjectGroup),s.splice(c,4*f,[S])}return c+1}),e(a,[C.save,C.transform,C.paintImageXObject,C.restore],function(e){var t=3,i=1e3,a=e.fnArray,r=e.argsArray,n=e.iCurr,s=n-3,o=n-2,c=n-1,l=n
if(0!==r[o][1]||0!==r[o][2])return l+1
for(var h=r[c][0],u=r[o][0],d=r[o][3],f=s+4,g=a.length;g>f+3&&a[f]===C.save&&a[f+1]===C.transform&&a[f+2]===C.paintImageXObject&&a[f+3]===C.restore&&r[f+1][0]===u&&0===r[f+1][1]&&0===r[f+1][2]&&r[f+1][3]===d&&r[f+2][0]===h;)f+=4
var p=Math.min((f-s)/4,i)
if(t>p)return f
for(var m=new Float32Array(2*p),v=o,b=0;p>b;b++,v+=4){var y=r[v]
m[b<<1]=y[4],m[(b<<1)+1]=y[5]}var w=[h,u,d,m]
return a.splice(s,4*p,C.paintImageXObjectRepeat),r.splice(s,4*p,w),s+1}),e(a,[C.beginText,C.setFont,C.setTextMatrix,C.showText,C.endText],function(e){for(var t=3,i=1e3,a=e.fnArray,r=e.argsArray,n=e.iCurr,s=n-4,o=n-3,c=n-2,l=n-1,h=n,u=r[o][0],d=r[o][1],f=s+5,g=a.length;g>f+4&&a[f]===C.beginText&&a[f+1]===C.setFont&&a[f+2]===C.setTextMatrix&&a[f+3]===C.showText&&a[f+4]===C.endText&&r[f+1][0]===u&&r[f+1][1]===d;)f+=5
var p=Math.min((f-s)/5,i)
if(t>p)return f
var m=s
s>=4&&a[s-4]===a[o]&&a[s-3]===a[c]&&a[s-2]===a[l]&&a[s-1]===a[h]&&r[s-4][0]===u&&r[s-4][1]===d&&(p++,m-=5)
for(var v=m+4,b=1;p>b;b++)a.splice(v,3),r.splice(v,3),v+=2
return v+1}),i.prototype={optimize:function(e){for(var t,i=e.fnArray,r=e.argsArray,n={iCurr:0,fnArray:i,argsArray:r},s=0,o=i.length;o>s;)t=(t||a)[i[s]],"function"==typeof t?(n.iCurr=s,s=t(n),t=void 0,o=n.fnArray.length):s++}},i}()
e.OperatorList=Ae,e.PartialEvaluator=xe}),function(e,t){t(e.pdfjsCoreAnnotation={},e.pdfjsSharedUtil,e.pdfjsCorePrimitives,e.pdfjsCoreStream,e.pdfjsCoreColorSpace,e.pdfjsCoreObj,e.pdfjsCoreEvaluator)}(this,function(e,t,i,a,r,n,s){function o(){}var c=t.AnnotationBorderStyleType,l=t.AnnotationFieldFlag,h=t.AnnotationFlag,u=t.AnnotationType,d=t.OPS,f=t.Util,g=(t.isString,t.isArray),p=t.isInt,m=t.stringToBytes,v=t.stringToPDFString,b=t.warn,y=i.Dict,w=i.isDict,k=i.isName,C=i.isRef,x=a.Stream,S=r.ColorSpace,A=n.Catalog,I=n.ObjectLoader,P=n.FileSpec,B=s.OperatorList
o.prototype={create:function(e,t,i,a){var r=e.fetchIfRef(t)
if(w(r)){var n=C(t)?""+t:"annot_"+a.createObjId(),s=r.get("Subtype")
s=k(s)?s.name:null
var o={xref:e,dict:r,ref:C(t)?t:null,subtype:s,id:n,pdfManager:i}
switch(s){case"Link":return new F(o)
case"Text":return new D(o)
case"Widget":var c=f.getInheritableProperty(r,"FT")
switch(c=k(c)?c.name:null){case"Tx":return new R(o)
case"Btn":return new O(o)
case"Ch":return new M(o)}return b('Unimplemented widget field type "'+c+'", falling back to base field type.'),new E(o)
case"Popup":return new N(o)
case"Highlight":return new j(o)
case"Underline":return new U(o)
case"Squiggly":return new _(o)
case"StrikeOut":return new q(o)
case"FileAttachment":return new H(o)
default:return b(s?'Unimplemented annotation type "'+s+'", falling back to base annotation.':"Annotation is missing the required /Subtype."),new T(o)}}}}
var T=function(){function e(e,t,i){var a=f.getAxialAlignedBoundingBox(t,i),r=a[0],n=a[1],s=a[2],o=a[3]
if(r===s||n===o)return[1,0,0,1,e[0],e[1]]
var c=(e[2]-e[0])/(s-r),l=(e[3]-e[1])/(o-n)
return[c,0,0,l,e[0]-r*c,e[1]-n*l]}function t(e){var t=e.get("AP")
if(w(t)){var i,a=t.get("N")
if(w(a)){var r=e.get("AS")
r&&a.has(r.name)&&(i=a.get(r.name))}else i=a
return i}}function i(e){var i=e.dict
this.setFlags(i.get("F")),this.setRectangle(i.getArray("Rect")),this.setColor(i.getArray("C")),this.setBorderStyle(i),this.appearance=t(i),this.data={},this.data.id=e.id,this.data.subtype=e.subtype,this.data.annotationFlags=this.flags,this.data.rect=this.rectangle,this.data.color=this.color,this.data.borderStyle=this.borderStyle,this.data.hasAppearance=!!this.appearance}return i.prototype={_hasFlag:function(e,t){return!!(e&t)},_isViewable:function(e){return!this._hasFlag(e,h.INVISIBLE)&&!this._hasFlag(e,h.HIDDEN)&&!this._hasFlag(e,h.NOVIEW)},_isPrintable:function(e){return this._hasFlag(e,h.PRINT)&&!this._hasFlag(e,h.INVISIBLE)&&!this._hasFlag(e,h.HIDDEN)},get viewable(){return 0===this.flags?!0:this._isViewable(this.flags)},get printable(){return 0===this.flags?!1:this._isPrintable(this.flags)},setFlags:function(e){this.flags=p(e)&&e>0?e:0},hasFlag:function(e){return this._hasFlag(this.flags,e)},setRectangle:function(e){g(e)&&4===e.length?this.rectangle=f.normalizeRect(e):this.rectangle=[0,0,0,0]},setColor:function(e){var t=new Uint8Array(3)
if(!g(e))return void(this.color=t)
switch(e.length){case 0:this.color=null
break
case 1:S.singletons.gray.getRgbItem(e,0,t,0),this.color=t
break
case 3:S.singletons.rgb.getRgbItem(e,0,t,0),this.color=t
break
case 4:S.singletons.cmyk.getRgbItem(e,0,t,0),this.color=t
break
default:this.color=t}},setBorderStyle:function(e){if(this.borderStyle=new L,w(e))if(e.has("BS")){var t=e.get("BS"),i=t.get("Type");(!i||k(i,"Border"))&&(this.borderStyle.setWidth(t.get("W")),this.borderStyle.setStyle(t.get("S")),this.borderStyle.setDashArray(t.getArray("D")))}else if(e.has("Border")){var a=e.getArray("Border")
g(a)&&a.length>=3&&(this.borderStyle.setHorizontalCornerRadius(a[0]),this.borderStyle.setVerticalCornerRadius(a[1]),this.borderStyle.setWidth(a[2]),4===a.length&&this.borderStyle.setDashArray(a[3]))}else this.borderStyle.setWidth(0)},_preparePopup:function(e){e.has("C")||(this.data.color=null),this.data.hasPopup=e.has("Popup"),this.data.title=v(e.get("T")||""),this.data.contents=v(e.get("Contents")||"")},loadResources:function(e){return new Promise(function(t,i){this.appearance.dict.getAsync("Resources").then(function(a){if(!a)return void t()
var r=new I(a.map,e,a.xref)
r.load().then(function(){t(a)},i)},i)}.bind(this))},getOperatorList:function(t,i,a){if(!this.appearance)return Promise.resolve(new B)
var r=this.data,n=this.appearance.dict,s=this.loadResources(["ExtGState","ColorSpace","Pattern","Shading","XObject","Font"]),o=n.getArray("BBox")||[0,0,1,1],c=n.getArray("Matrix")||[1,0,0,1,0,0],l=e(r.rect,o,c),h=this
return s.then(function(e){var a=new B
return a.addOp(d.beginAnnotation,[r.rect,l,c]),t.getOperatorList(h.appearance,i,e,a).then(function(){return a.addOp(d.endAnnotation,[]),h.appearance.reset(),a})})}},i.appendToOperatorList=function(e,t,i,a,r,n){for(var s=[],o=0,c=e.length;c>o;++o)("display"===r&&e[o].viewable||"print"===r&&e[o].printable)&&s.push(e[o].getOperatorList(i,a,n))
return Promise.all(s).then(function(e){t.addOp(d.beginAnnotations,[])
for(var i=0,a=e.length;a>i;++i)t.addOpList(e[i])
t.addOp(d.endAnnotations,[])})},i}(),L=function(){function e(){this.width=1,this.style=c.SOLID,this.dashArray=[3],this.horizontalCornerRadius=0,this.verticalCornerRadius=0}return e.prototype={setWidth:function(e){e===(0|e)&&(this.width=e)},setStyle:function(e){if(e)switch(e.name){case"S":this.style=c.SOLID
break
case"D":this.style=c.DASHED
break
case"B":this.style=c.BEVELED
break
case"I":this.style=c.INSET
break
case"U":this.style=c.UNDERLINE}},setDashArray:function(e){if(g(e)&&e.length>0){for(var t=!0,i=!0,a=0,r=e.length;r>a;a++){var n=e[a],s=+n>=0
if(!s){t=!1
break}n>0&&(i=!1)}t&&!i?this.dashArray=e:this.width=0}else e&&(this.width=0)},setHorizontalCornerRadius:function(e){e===(0|e)&&(this.horizontalCornerRadius=e)},setVerticalCornerRadius:function(e){e===(0|e)&&(this.verticalCornerRadius=e)}},e}(),E=function(){function e(e){T.call(this,e)
var t=e.dict,i=this.data
i.annotationType=u.WIDGET,i.fieldName=this._constructFieldName(t),i.fieldValue=f.getInheritableProperty(t,"V",!0),i.alternativeText=v(t.get("TU")||""),i.defaultAppearance=f.getInheritableProperty(t,"DA")||""
var a=f.getInheritableProperty(t,"FT")
i.fieldType=k(a)?a.name:null,this.fieldResources=f.getInheritableProperty(t,"DR")||y.empty,i.fieldFlags=f.getInheritableProperty(t,"Ff"),(!p(i.fieldFlags)||i.fieldFlags<0)&&(i.fieldFlags=0),i.readOnly=this.hasFieldFlag(l.READONLY),"Sig"===i.fieldType&&this.setFlags(h.HIDDEN)}return f.inherit(e,T,{_constructFieldName:function(e){if(!e.has("T")&&!e.has("Parent"))return b("Unknown field name, falling back to empty field name."),""
if(!e.has("Parent"))return v(e.get("T"))
var t=[]
e.has("T")&&t.unshift(v(e.get("T")))
for(var i=e;i.has("Parent");)i=i.get("Parent"),i.has("T")&&t.unshift(v(i.get("T")))
return t.join(".")},hasFieldFlag:function(e){return!!(this.data.fieldFlags&e)}}),e}(),R=function(){function e(e){E.call(this,e),this.data.fieldValue=v(this.data.fieldValue||"")
var t=f.getInheritableProperty(e.dict,"Q");(!p(t)||0>t||t>2)&&(t=null),this.data.textAlignment=t
var i=f.getInheritableProperty(e.dict,"MaxLen");(!p(i)||0>i)&&(i=null),this.data.maxLen=i,this.data.multiLine=this.hasFieldFlag(l.MULTILINE),this.data.comb=this.hasFieldFlag(l.COMB)&&!this.hasFieldFlag(l.MULTILINE)&&!this.hasFieldFlag(l.PASSWORD)&&!this.hasFieldFlag(l.FILESELECT)&&null!==this.data.maxLen}return f.inherit(e,E,{getOperatorList:function(e,t,i){var a=new B
if(i)return Promise.resolve(a)
if(this.appearance)return T.prototype.getOperatorList.call(this,e,t,i)
if(!this.data.defaultAppearance)return Promise.resolve(a)
var r=new x(m(this.data.defaultAppearance))
return e.getOperatorList(r,t,this.fieldResources,a).then(function(){return a})}}),e}(),O=function(){function e(e){if(E.call(this,e),this.data.checkBox=!this.hasFieldFlag(l.RADIO)&&!this.hasFieldFlag(l.PUSHBUTTON),this.data.checkBox){if(!k(this.data.fieldValue))return
this.data.fieldValue=this.data.fieldValue.name}if(this.data.radioButton=this.hasFieldFlag(l.RADIO)&&!this.hasFieldFlag(l.PUSHBUTTON),this.data.radioButton){this.data.fieldValue=this.data.buttonValue=null
var t=e.dict.get("Parent")
if(!w(t)||!t.has("V"))return
var i=t.get("V")
if(!k(i))return
this.data.fieldValue=i.name
var a=e.dict.get("AP")
if(!w(a))return
var r=a.get("N")
if(!w(r))return
for(var n=r.getKeys(),s=0,o=n.length;o>s;s++)if("Off"!==n[s]){this.data.buttonValue=n[s]
break}}}return f.inherit(e,E,{getOperatorList:function(e,t,i){var a=new B
return i?Promise.resolve(a):this.appearance?T.prototype.getOperatorList.call(this,e,t,i):Promise.resolve(a)}}),e}(),M=function(){function e(e){E.call(this,e),this.data.options=[]
var t=e.dict.get("Opt")
if(g(t))for(var i=e.xref,a=0,r=t.length;r>a;a++){var n=i.fetchIfRef(t[a]),s=g(n)
this.data.options[a]={exportValue:s?i.fetchIfRef(n[0]):n,displayValue:s?i.fetchIfRef(n[1]):n}}g(this.data.fieldValue)||(this.data.fieldValue=[this.data.fieldValue]),this.data.combo=this.hasFieldFlag(l.COMBO),this.data.multiSelect=this.hasFieldFlag(l.MULTISELECT)}return f.inherit(e,E,{getOperatorList:function(e,t,i){var a=new B
return i?Promise.resolve(a):T.prototype.getOperatorList.call(this,e,t,i)}}),e}(),D=function(){function e(e){T.call(this,e),this.data.annotationType=u.TEXT,this.data.hasAppearance?this.data.name="NoIcon":(this.data.rect[1]=this.data.rect[3]-t,this.data.rect[2]=this.data.rect[0]+t,this.data.name=e.dict.has("Name")?e.dict.get("Name").name:"Note"),this._preparePopup(e.dict)}var t=22
return f.inherit(e,T,{}),e}(),F=function(){function e(e){T.call(this,e)
var t=this.data
t.annotationType=u.LINK,A.parseDestDictionary({destDict:e.dict,resultObj:t,docBaseUrl:e.pdfManager.docBaseUrl})}return f.inherit(e,T,{}),e}(),N=function(){function e(e){T.call(this,e),this.data.annotationType=u.POPUP
var t=e.dict,i=t.get("Parent")
if(!i)return void b("Popup annotation has a missing or invalid parent annotation.")
if(this.data.parentId=""+t.getRaw("Parent"),this.data.title=v(i.get("T")||""),this.data.contents=v(i.get("Contents")||""),i.has("C")?(this.setColor(i.getArray("C")),this.data.color=this.color):this.data.color=null,!this.viewable){var a=i.get("F")
this._isViewable(a)&&this.setFlags(a)}}return f.inherit(e,T,{}),e}(),j=function(){function e(e){T.call(this,e),this.data.annotationType=u.HIGHLIGHT,this._preparePopup(e.dict),this.data.borderStyle.setWidth(0)}return f.inherit(e,T,{}),e}(),U=function(){function e(e){T.call(this,e),this.data.annotationType=u.UNDERLINE,this._preparePopup(e.dict),this.data.borderStyle.setWidth(0)}return f.inherit(e,T,{}),e}(),_=function(){function e(e){T.call(this,e),this.data.annotationType=u.SQUIGGLY,this._preparePopup(e.dict),this.data.borderStyle.setWidth(0)}return f.inherit(e,T,{}),e}(),q=function(){function e(e){T.call(this,e),this.data.annotationType=u.STRIKEOUT,this._preparePopup(e.dict),this.data.borderStyle.setWidth(0)}return f.inherit(e,T,{}),e}(),H=function(){function e(e){T.call(this,e)
var t=new P(e.dict.get("FS"),e.xref)
this.data.annotationType=u.FILEATTACHMENT,this.data.file=t.serializable,this._preparePopup(e.dict)}return f.inherit(e,T,{}),e}()
e.Annotation=T,e.AnnotationBorderStyle=L,e.AnnotationFactory=o}),function(e,t){t(e.pdfjsCoreDocument={},e.pdfjsSharedUtil,e.pdfjsCorePrimitives,e.pdfjsCoreStream,e.pdfjsCoreObj,e.pdfjsCoreParser,e.pdfjsCoreCrypto,e.pdfjsCoreEvaluator,e.pdfjsCoreAnnotation)}(this,function(e,t,i,a,r,n,s,o,c){var l=t.MissingDataException,h=t.Util,u=t.assert,d=t.error,f=t.info,g=t.isArray,p=t.isArrayBuffer,m=t.isNum,v=t.isString,b=t.shadow,y=t.stringToBytes,w=t.stringToPDFString,k=t.warn,C=t.isSpace,x=i.Dict,S=i.isDict,A=i.isName,I=i.isStream,P=a.NullStream,B=a.Stream,T=a.StreamsSequenceStream,L=r.Catalog,E=r.ObjectLoader,R=r.XRef,O=n.Linearization,M=s.calculateMD5,D=o.OperatorList,F=o.PartialEvaluator,N=c.Annotation,j=c.AnnotationFactory,U=function(){function e(e,t,i,a,r,n){this.pdfManager=e,this.pageIndex=i,this.pageDict=a,this.xref=t,this.ref=r,this.fontCache=n,this.evaluatorOptions=e.evaluatorOptions,this.resourcesPromise=null
var s="p"+this.pageIndex+"_",o={obj:0}
this.idFactory={createObjId:function(){return s+ ++o.obj}}}var t=1,i=[0,0,612,792]
return e.prototype={getPageProp:function(e){return this.pageDict.get(e)},getInheritedPageProp:function(e,t){var i=this.pageDict,a=null,r=0,n=100
for(t=t||!1;i;){var s=t?i.getArray(e):i.get(e)
if(s&&(a||(a=[]),a.push(s)),++r>n){k("Page_getInheritedPageProp: maximum loop count exceeded.")
break}i=i.get("Parent")}return a?1===a.length||!S(a[0])||r>n?a[0]:x.merge(this.xref,a):x.empty},get content(){return this.getPageProp("Contents")},get resources(){return b(this,"resources",this.getInheritedPageProp("Resources"))},get mediaBox(){var e=this.getInheritedPageProp("MediaBox",!0)
return g(e)&&4===e.length?b(this,"mediaBox",e):b(this,"mediaBox",i)},get cropBox(){var e=this.getInheritedPageProp("CropBox",!0)
return g(e)&&4===e.length?b(this,"cropBox",e):b(this,"cropBox",this.mediaBox)},get userUnit(){var e=this.getPageProp("UserUnit")
return(!m(e)||0>=e)&&(e=t),b(this,"userUnit",e)},get view(){var e=this.mediaBox,t=this.cropBox
if(e===t)return b(this,"view",e)
var i=h.intersect(t,e)
return b(this,"view",i||e)},get rotate(){var e=this.getInheritedPageProp("Rotate")||0
return e%90!==0?e=0:e>=360?e%=360:0>e&&(e=(e%360+360)%360),b(this,"rotate",e)},getContentStream:function(){var e,t=this.content
if(g(t)){var i,a=this.xref,r=t.length,n=[]
for(i=0;r>i;++i)n.push(a.fetchIfRef(t[i]))
e=new T(n)}else e=I(t)?t:new P
return e},loadResources:function(e){return this.resourcesPromise||(this.resourcesPromise=this.pdfManager.ensure(this,"resources")),this.resourcesPromise.then(function(){var t=new E(this.resources.map,e,this.xref)
return t.load()}.bind(this))},getOperatorList:function(e,t,i,a){var r=this,n=this.pdfManager,s=n.ensure(this,"getContentStream",[]),o=this.loadResources(["ExtGState","ColorSpace","Pattern","Shading","XObject","Font"]),c=new F(n,this.xref,e,this.pageIndex,this.idFactory,this.fontCache,this.evaluatorOptions),l=Promise.all([s,o]),h=l.then(function(a){var n=a[0],s=new D(i,e,r.pageIndex)
return e.send("StartRenderPage",{transparency:c.hasBlendModes(r.resources),pageIndex:r.pageIndex,intent:i}),c.getOperatorList(n,t,r.resources,s).then(function(){return s})}),u=n.ensure(this,"annotations")
return Promise.all([h,u]).then(function(e){var r=e[0],n=e[1]
if(0===n.length)return r.flush(!0),r
var s=N.appendToOperatorList(n,r,c,t,i,a)
return s.then(function(){return r.flush(!0),r})})},extractTextContent:function(e,t,i){var a={on:function(){},send:function(){}},r=this,n=this.pdfManager,s=n.ensure(this,"getContentStream",[]),o=this.loadResources(["ExtGState","XObject","Font"]),c=Promise.all([s,o])
return c.then(function(s){var o=s[0],c=new F(n,r.xref,a,r.pageIndex,r.idFactory,r.fontCache,r.evaluatorOptions)
return c.getTextContent(o,e,r.resources,null,t,i)})},getAnnotationsData:function(e){for(var t=this.annotations,i=[],a=0,r=t.length;r>a;++a)(!e||"display"===e&&t[a].viewable||"print"===e&&t[a].printable)&&i.push(t[a].data)
return i},get annotations(){for(var e=[],t=this.getInheritedPageProp("Annots")||[],i=new j,a=0,r=t.length;r>a;++a){var n=t[a],s=i.create(this.xref,n,this.pdfManager,this.idFactory)
s&&e.push(s)}return b(this,"annotations",e)}},e}(),_=function(){function e(e,t){var i
I(t)?i=t:p(t)?i=new B(t):d("PDFDocument: Unknown argument type"),u(i.length>0,"stream must have data"),this.pdfManager=e,this.stream=i,this.xref=new R(i,e)}function t(e,t,i,a){var r=e.pos,n=e.end,s=[]
r+i>n&&(i=n-r)
for(var o=0;i>o;++o)s.push(String.fromCharCode(e.getByte()))
var c=s.join("")
e.pos=r
var l=a?c.lastIndexOf(t):c.indexOf(t)
return-1===l?!1:(e.pos+=l,!0)}var i=1024,a="\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00",r={get entries(){return b(this,"entries",{Title:v,Author:v,Subject:v,Keywords:v,Creator:v,Producer:v,CreationDate:v,ModDate:v,Trapped:A})}}
return e.prototype={parse:function(e){this.setup(e)
var t=this.catalog.catDict.get("Version")
A(t)&&(this.pdfFormatVersion=t.name)
try{if(this.acroForm=this.catalog.catDict.get("AcroForm"),this.acroForm){this.xfa=this.acroForm.get("XFA")
var i=this.acroForm.get("Fields")
i&&g(i)&&0!==i.length||this.xfa||(this.acroForm=null)}}catch(a){f("Something wrong with AcroForm entry"),this.acroForm=null}},get linearization(){var e=null
if(this.stream.length)try{e=O.create(this.stream)}catch(t){if(t instanceof l)throw t
f(t)}return b(this,"linearization",e)},get startXRef(){var e=this.stream,i=0,a=this.linearization
if(a)e.reset(),t(e,"endobj",1024)&&(i=e.pos+6)
else{for(var r=1024,n=!1,s=e.end;!n&&s>0;)s-=r-9,0>s&&(s=0),e.pos=s,n=t(e,"startxref",r,!0)
if(n){e.skip(9)
var o
do o=e.getByte()
while(C(o))
for(var c="";o>=32&&57>=o;)c+=String.fromCharCode(o),o=e.getByte()
i=parseInt(c,10),isNaN(i)&&(i=0)}}return b(this,"startXRef",i)},get mainXRefEntriesOffset(){var e=0,t=this.linearization
return t&&(e=t.mainXRefEntriesOffset),b(this,"mainXRefEntriesOffset",e)},checkHeader:function(){var e=this.stream
if(e.reset(),t(e,"%PDF-",1024)){e.moveStart()
for(var i,a=12,r="";(i=e.getByte())>32&&!(r.length>=a);)r+=String.fromCharCode(i)
return void(this.pdfFormatVersion||(this.pdfFormatVersion=r.substring(5)))}},parseStartXRef:function(){var e=this.startXRef
this.xref.setStartXRef(e)},setup:function(e){this.xref.parse(e)
var t=this,i={createPage:function(e,i,a,r){return new U(t.pdfManager,t.xref,e,i,a,r)}}
this.catalog=new L(this.pdfManager,this.xref,i)},get numPages(){var e=this.linearization,t=e?e.numPages:this.catalog.numPages
return b(this,"numPages",t)},get documentInfo(){var e,t={PDFFormatVersion:this.pdfFormatVersion,IsAcroFormPresent:!!this.acroForm,IsXFAPresent:!!this.xfa}
try{e=this.xref.trailer.get("Info")}catch(i){f("The document information dictionary is invalid.")}if(e){var a=r.entries
for(var n in a)if(e.has(n)){var s=e.get(n)
a[n](s)?t[n]="string"!=typeof s?s:w(s):f('Bad value in document info for "'+n+'"')}}return b(this,"documentInfo",t)},get fingerprint(){var e,t=this.xref,r="",n=t.trailer.get("ID")
n&&g(n)&&n[0]&&v(n[0])&&n[0]!==a?e=y(n[0]):(this.stream.ensureRange&&this.stream.ensureRange(0,Math.min(i,this.stream.end)),e=M(this.stream.bytes.subarray(0,i),0,i))
for(var s=0,o=e.length;o>s;s++){var c=e[s].toString(16)
r+=1===c.length?"0"+c:c}return b(this,"fingerprint",r)},getPage:function(e){return this.catalog.getPage(e)},cleanup:function(){return this.catalog.cleanup()}},e}()
e.Page=U,e.PDFDocument=_}),function(e,t){t(e.pdfjsCorePdfManager={},e.pdfjsSharedUtil,e.pdfjsCoreStream,e.pdfjsCoreChunkedStream,e.pdfjsCoreDocument)}(this,function(e,t,i,a,r){var n=t.warn,s=t.createValidAbsoluteUrl,o=t.shadow,c=t.NotImplementedException,l=t.MissingDataException,h=t.createPromiseCapability,u=t.Util,d=i.Stream,f=a.ChunkedStreamManager,g=r.PDFDocument,p=function(){function e(){throw Error("Cannot initialize BaseManagerManager")}return e.prototype={get docId(){return this._docId},get password(){return this._password},get docBaseUrl(){var e=null
if(this._docBaseUrl){var t=s(this._docBaseUrl)
t?e=t.href:n('Invalid absolute docBaseUrl: "'+this._docBaseUrl+'".')}return o(this,"docBaseUrl",e)},onLoadedStream:function(){throw new c},ensureDoc:function(e,t){return this.ensure(this.pdfDocument,e,t)},ensureXRef:function(e,t){return this.ensure(this.pdfDocument.xref,e,t)},ensureCatalog:function(e,t){return this.ensure(this.pdfDocument.catalog,e,t)},getPage:function(e){return this.pdfDocument.getPage(e)},cleanup:function(){return this.pdfDocument.cleanup()},ensure:function(e,t,i){return new c},requestRange:function(e,t){return new c},requestLoadedStream:function(){return new c},sendProgressiveData:function(e){return new c},updatePassword:function(e){this._password=e},terminate:function(){return new c}},e}(),m=function(){function e(e,t,i,a,r){this._docId=e,this._password=i,this._docBaseUrl=r,this.evaluatorOptions=a
var n=new d(t)
this.pdfDocument=new g(this,n),this._loadedStreamCapability=h(),this._loadedStreamCapability.resolve(n)}return u.inherit(e,p,{ensure:function(e,t,i){return new Promise(function(a,r){try{var n,s=e[t]
n="function"==typeof s?s.apply(e,i):s,a(n)}catch(o){r(o)}})},requestRange:function(e,t){return Promise.resolve()},requestLoadedStream:function(){},onLoadedStream:function(){return this._loadedStreamCapability.promise},terminate:function(){}}),e}(),v=function(){function e(e,t,i,a,r){this._docId=e,this._password=i.password,this._docBaseUrl=r,this.msgHandler=i.msgHandler,this.evaluatorOptions=a
var n={msgHandler:i.msgHandler,url:i.url,length:i.length,disableAutoFetch:i.disableAutoFetch,rangeChunkSize:i.rangeChunkSize}
this.streamManager=new f(t,n),this.pdfDocument=new g(this,this.streamManager.getStream())}return u.inherit(e,p,{ensure:function(e,t,i){var a=this
return new Promise(function(r,n){function s(){try{var o,c=e[t]
o="function"==typeof c?c.apply(e,i):c,r(o)}catch(h){if(!(h instanceof l))return void n(h)
a.streamManager.requestRange(h.begin,h.end).then(s,n)}}s()})},requestRange:function(e,t){return this.streamManager.requestRange(e,t)},requestLoadedStream:function(){this.streamManager.requestAllChunks()},sendProgressiveData:function(e){this.streamManager.onReceiveData({chunk:e})},onLoadedStream:function(){return this.streamManager.onLoadedStream()},terminate:function(){this.streamManager.abort()}}),e}()
e.LocalPdfManager=m,e.NetworkPdfManager=v}),function(e,t){t(e.pdfjsCoreWorker={},e.pdfjsSharedUtil,e.pdfjsCorePrimitives,e.pdfjsCorePdfManager)}(this,function(e,t,i,a){function r(e){s=e}function n(){if(!("console"in I)){var e={},t={log:function(){var e=Array.prototype.slice.call(arguments)
I.postMessage({targetName:"main",action:"console_log",data:e})},error:function(){var e=Array.prototype.slice.call(arguments)
throw I.postMessage({targetName:"main",action:"console_error",data:e}),"pdf.js execution error"},time:function(t){e[t]=Date.now()},timeEnd:function(t){var i=e[t]
i||y("Unknown timer name "+t),this.log("Timer:",t,Date.now()-i)}}
I.console=t}var i=new l("worker","main",self)
T.setup(i,self),i.send("ready",null)}var s,o=t.UNSUPPORTED_FEATURES,c=t.InvalidPDFException,l=t.MessageHandler,h=t.MissingPDFException,u=t.UnexpectedResponseException,d=t.PasswordException,f=(t.PasswordResponses,t.UnknownErrorException),g=t.XRefParseException,p=t.arrayByteLength,m=t.arraysToBytes,v=t.assert,b=t.createPromiseCapability,y=t.error,w=t.info,k=t.warn,C=t.setVerbosityLevel,x=i.Ref,S=a.LocalPdfManager,A=a.NetworkPdfManager,I=t.globalScope,P=function(){function e(e){this.name=e,this.terminated=!1,this._capability=b()}return e.prototype={get finished(){return this._capability.promise},finish:function(){this._capability.resolve()},terminate:function(){this.terminated=!0},ensureNotTerminated:function(){if(this.terminated)throw Error("Worker task was terminated")}},e}(),B=function(){function e(e,t){this._queuedChunks=[]
var i=e.initialData
i&&i.length>0&&this._queuedChunks.push(i),this._msgHandler=t,this._isRangeSupported=!e.disableRange,this._isStreamingSupported=!e.disableStream,this._contentLength=e.length,this._fullRequestReader=null,this._rangeReaders=[],t.on("OnDataRange",this._onReceiveData.bind(this)),t.on("OnDataProgress",this._onProgress.bind(this))}function t(e,t){this._stream=e,this._done=!1,this._queuedChunks=t||[],this._requests=[],this._headersReady=Promise.resolve(),e._fullRequestReader=this,this.onProgress=null}function i(e,t,i){this._stream=e,this._begin=t,this._end=i,this._queuedChunk=null,this._requests=[],this._done=!1,this.onProgress=null}return e.prototype={_onReceiveData:function(e){if(void 0===e.begin)this._fullRequestReader?this._fullRequestReader._enqueue(e.chunk):this._queuedChunks.push(e.chunk)
else{var t=this._rangeReaders.some(function(t){return t._begin!==e.begin?!1:(t._enqueue(e.chunk),!0)})
v(t)}},_onProgress:function(e){if(this._rangeReaders.length>0){var t=this._rangeReaders[0]
t.onProgress&&t.onProgress({loaded:e.loaded})}},_removeRangeReader:function(e){var t=this._rangeReaders.indexOf(e)
t>=0&&this._rangeReaders.splice(t,1)},getFullReader:function(){v(!this._fullRequestReader)
var e=this._queuedChunks
return this._queuedChunks=null,new t(this,e)},getRangeReader:function(e,t){var a=new i(this,e,t)
return this._msgHandler.send("RequestDataRange",{begin:e,end:t}),this._rangeReaders.push(a),a},cancelAllRequests:function(e){this._fullRequestReader&&this._fullRequestReader.cancel(e)
var t=this._rangeReaders.slice(0)
t.forEach(function(t){t.cancel(e)})}},t.prototype={_enqueue:function(e){if(!this._done){if(this._requests.length>0){var t=this._requests.shift()
return void t.resolve({value:e,done:!1})}this._queuedChunks.push(e)}},get headersReady(){return this._headersReady},get isRangeSupported(){return this._stream._isRangeSupported},get isStreamingSupported(){return this._stream._isStreamingSupported},get contentLength(){return this._stream._contentLength},read:function(){if(this._queuedChunks.length>0){var e=this._queuedChunks.shift()
return Promise.resolve({value:e,done:!1})}if(this._done)return Promise.resolve({value:void 0,done:!0})
var t=b()
return this._requests.push(t),t.promise},cancel:function(e){this._done=!0,this._requests.forEach(function(e){e.resolve({value:void 0,done:!0})}),this._requests=[]}},i.prototype={_enqueue:function(e){if(!this._done){if(0===this._requests.length)this._queuedChunk=e
else{var t=this._requests.shift()
t.resolve({value:e,done:!1}),this._requests.forEach(function(e){e.resolve({value:void 0,done:!0})}),this._requests=[]}this._done=!0,this._stream._removeRangeReader(this)}},get isStreamingSupported(){return!1},read:function(){if(this._queuedChunk)return Promise.resolve({value:this._queuedChunk,done:!1})
if(this._done)return Promise.resolve({value:void 0,done:!0})
var e=b()
return this._requests.push(e),e.promise},cancel:function(e){this._done=!0,this._requests.forEach(function(e){e.resolve({value:void 0,done:!0})}),this._requests=[],this._stream._removeRangeReader(this)}},e}(),T={setup:function(e,t){var i=!1
e.on("test",function(t){if(!i){if(i=!0,!(t instanceof Uint8Array))return void e.send("test","main",!1)
var a=255===t[0]
e.postMessageTransfers=a
var r=new XMLHttpRequest,n="response"in r
try{r.responseType}catch(s){n=!1}return n?void e.send("test",{supportTypedArray:!0,supportTransfers:a}):void e.send("test",!1)}}),e.on("configure",function(e){C(e.verbosity)}),e.on("GetDocRequest",function(e){return T.createDocumentHandler(e,t)})},createDocumentHandler:function(e,t){function i(){if(T)throw Error("Worker was terminated")}function a(e){E.push(e)}function r(e){e.finish()
var t=E.indexOf(e)
E.splice(t,1)}function n(e){var t=b(),i=function(){var e=I.ensureDoc("numPages"),i=I.ensureDoc("fingerprint"),r=I.ensureXRef("encrypt")
Promise.all([e,i,r]).then(function(e){var i={numPages:e[0],fingerprint:e[1],encrypted:!!e[2]}
t.resolve(i)},a)},a=function(e){t.reject(e)}
return I.ensureDoc("checkHeader",[]).then(function(){I.ensureDoc("parseStartXRef",[]).then(function(){I.ensureDoc("parse",[e]).then(i,a)},a)},a),t.promise}function y(e,t){var a,r=b(),n=e.source
if(n.data){try{a=new S(R,n.data,n.password,t,O),r.resolve(a)}catch(o){r.reject(o)}return r.promise}var c
try{n.chunkedViewerLoading?c=new B(n,D):(v(s,"pdfjs/core/network module is not loaded"),c=new s(e))}catch(o){return r.reject(o),r.promise}var l=c.getFullReader()
l.headersReady.then(function(){if(l.isStreamingSupported&&l.isRangeSupported||(l.onProgress=function(e){D.send("DocProgress",{loaded:e.loaded,total:e.total})}),l.isRangeSupported){var e=n.disableAutoFetch||l.isStreamingSupported
a=new A(R,c,{msgHandler:D,url:n.url,password:n.password,length:l.contentLength,disableAutoFetch:e,rangeChunkSize:n.rangeChunkSize},t,O),r.resolve(a),L=null}})["catch"](function(e){r.reject(e),L=null})
var h=[],u=0,d=function(){var e=m(h)
n.length&&e.length!==n.length&&k("reported HTTP length is different from actual")
try{a=new S(R,e,n.password,t,O),r.resolve(a)}catch(i){r.reject(i)}h=[]},f=new Promise(function(e,t){var r=function(e){try{if(i(),e.done)return a||d(),void(L=null)
var n=e.value
u+=p(n),l.isStreamingSupported||D.send("DocProgress",{loaded:u,total:Math.max(u,l.contentLength||0)}),a?a.sendProgressiveData(n):h.push(n),l.read().then(r,t)}catch(s){t(s)}}
l.read().then(r,t)})
return f["catch"](function(e){r.reject(e),L=null}),L=function(){c.cancelAllRequests("abort")},r.promise}function C(e){function t(e){i(),D.send("GetDoc",{pdfInfo:e})}function s(e){if(e instanceof d){var t=new P("PasswordException: response "+e.code)
a(t),D.sendWithPromise("PasswordRequest",e).then(function(e){r(t),I.updatePassword(e.password),o()})["catch"](function(e){r(t),D.send("PasswordException",e)}.bind(null,e))}else e instanceof c?D.send("InvalidPDF",e):e instanceof h?D.send("MissingPDF",e):e instanceof u?D.send("UnexpectedResponse",e):D.send("UnknownError",new f(e.message,""+e))}function o(){i(),n(!1).then(t,function(e){return i(),e instanceof g?(I.requestLoadedStream(),void I.onLoadedStream().then(function(){i(),n(!0).then(t,s)})):void s(e)},s)}i()
var l={url:void 0===e.cMapUrl?null:e.cMapUrl,packed:e.cMapPacked===!0},p={forceDataSchema:e.disableCreateObjectURL,maxImageSize:void 0===e.maxImageSize?-1:e.maxImageSize,disableFontFace:e.disableFontFace,cMapOptions:l}
y(e,p).then(function(e){if(T)throw e.terminate(),Error("Worker was terminated")
I=e,D.send("PDFManagerReady",null),I.onLoadedStream().then(function(e){D.send("DataLoaded",{length:e.bytes.byteLength})})}).then(o,s)}var I,T=!1,L=null,E=[],R=e.docId,O=e.docBaseUrl,M=e.docId+"_worker",D=new l(M,R,t)
return D.postMessageTransfers=e.postMessageTransfers,D.on("GetPage",function(e){return I.getPage(e.pageIndex).then(function(e){var t=I.ensure(e,"rotate"),i=I.ensure(e,"ref"),a=I.ensure(e,"userUnit"),r=I.ensure(e,"view")
return Promise.all([t,i,a,r]).then(function(e){return{rotate:e[0],ref:e[1],userUnit:e[2],view:e[3]}})})}),D.on("GetPageIndex",function(e){var t=new x(e.ref.num,e.ref.gen),i=I.pdfDocument.catalog
return i.getPageIndex(t)}),D.on("GetDestinations",function(e){return I.ensureCatalog("destinations")}),D.on("GetDestination",function(e){return I.ensureCatalog("getDestination",[e.id])}),D.on("GetPageLabels",function(e){return I.ensureCatalog("pageLabels")}),D.on("GetAttachments",function(e){return I.ensureCatalog("attachments")}),D.on("GetJavaScript",function(e){return I.ensureCatalog("javaScript")}),D.on("GetOutline",function(e){return I.ensureCatalog("documentOutline")}),D.on("GetMetadata",function(e){return Promise.all([I.ensureDoc("documentInfo"),I.ensureCatalog("metadata")])}),D.on("GetData",function(e){return I.requestLoadedStream(),I.onLoadedStream().then(function(e){return e.bytes})}),D.on("GetStats",function(e){return I.pdfDocument.xref.stats}),D.on("GetAnnotations",function(e){return I.getPage(e.pageIndex).then(function(t){return I.ensure(t,"getAnnotationsData",[e.intent])})}),D.on("RenderPageRequest",function(e){var t=e.pageIndex
I.getPage(t).then(function(i){var n=new P("RenderPageRequest: page "+t)
a(n)
var s=t+1,c=Date.now()
i.getOperatorList(D,n,e.intent,e.renderInteractiveForms).then(function(e){r(n),w("page="+s+" - getOperatorList: time="+(Date.now()-c)+"ms, len="+e.totalLength)},function(t){if(r(n),!n.terminated){D.send("UnsupportedFeature",{featureId:o.unknown})
var i,a="worker.js: while trying to getPage() and getOperatorList()"
i="string"==typeof t?{message:t,stack:a}:"object"==typeof t?{message:t.message||""+t,stack:t.stack||a}:{message:"Unknown exception type: "+typeof t,stack:a},D.send("PageError",{pageNum:s,error:i,intent:e.intent})}})})},this),D.on("GetTextContent",function(e){var t=e.pageIndex,i=e.normalizeWhitespace,n=e.combineTextItems
return I.getPage(t).then(function(e){var s=new P("GetTextContent: page "+t)
a(s)
var o=t+1,c=Date.now()
return e.extractTextContent(s,i,n).then(function(e){return r(s),w("text indexing: page="+o+" - time="+(Date.now()-c)+"ms"),e},function(e){if(r(s),!s.terminated)throw e})})}),D.on("Cleanup",function(e){return I.cleanup()}),D.on("Terminate",function(e){T=!0,I&&(I.terminate(),I=null),L&&L()
var t=[]
return E.forEach(function(e){t.push(e.finished),e.terminate()}),Promise.all(t).then(function(){D.destroy(),D=null})}),D.on("Ready",function(t){C(e),e=null}),M}}
"undefined"!=typeof window||"undefined"!=typeof module&&module.require||n(),e.setPDFNetworkStreamClass=r,e.WorkerTask=P,e.WorkerMessageHandler=T}),function(e,t){t(e.pdfjsCoreNetwork={},e.pdfjsSharedUtil,e.pdfjsCoreWorker)}(this,function(e,t,i){function a(e,t){this.url=e,t=t||{},this.isHttp=/^https?:/i.test(e),this.httpHeaders=this.isHttp&&t.httpHeaders||{},this.withCredentials=t.withCredentials||!1,this.getXhr=t.getXhr||function(){return new XMLHttpRequest},this.currXhrId=0,this.pendingRequests=Object.create(null),this.loadedRequests=Object.create(null)}function r(e){var t=e.response
if("string"!=typeof t)return t
for(var i=t.length,a=new Uint8Array(i),r=0;i>r;r++)a[r]=255&t.charCodeAt(r)
return a.buffer}function n(e){this._options=e
var t=e.source
this._manager=new a(t.url,{httpHeaders:t.httpHeaders,withCredentials:t.withCredentials}),this._rangeChunkSize=t.rangeChunkSize,this._fullRequestReader=null,this._rangeRequestReaders=[]}function s(e,t){this._manager=e
var i=t.source,a={onHeadersReceived:this._onHeadersReceived.bind(this),onProgressiveData:i.disableStream?null:this._onProgressiveData.bind(this),onDone:this._onDone.bind(this),onError:this._onError.bind(this),onProgress:this._onProgress.bind(this)}
this._url=i.url,this._fullRequestId=e.requestFull(a),this._headersReceivedCapability=d(),this._disableRange=t.disableRange||!1,this._contentLength=i.length,this._rangeChunkSize=i.rangeChunkSize,this._rangeChunkSize||this._disableRange||(this._disableRange=!0),this._isStreamingSupported=!1,this._isRangeSupported=!1,this._cachedChunks=[],this._requests=[],this._done=!1,this._storedError=void 0,this.onProgress=null}function o(e,t,i){this._manager=e
var a={onDone:this._onDone.bind(this),onProgress:this._onProgress.bind(this)}
this._requestId=e.requestRange(t,i,a),this._requests=[],this._queuedChunk=null,this._done=!1,this.onProgress=null,this.onClosed=null}var c=200,l=206,h=function(){try{var e=new XMLHttpRequest
return e.open("GET","https://example.com"),e.responseType="moz-chunked-arraybuffer","moz-chunked-arraybuffer"===e.responseType}catch(t){return!1}}()
a.prototype={requestRange:function(e,t,i){var a={begin:e,end:t}
for(var r in i)a[r]=i[r]
return this.request(a)},requestFull:function(e){return this.request(e)},request:function(e){var t=this.getXhr(),i=this.currXhrId++,a=this.pendingRequests[i]={xhr:t}
t.open("GET",this.url),t.withCredentials=this.withCredentials
for(var r in this.httpHeaders){var n=this.httpHeaders[r]
void 0!==n&&t.setRequestHeader(r,n)}if(this.isHttp&&"begin"in e&&"end"in e){var s=e.begin+"-"+(e.end-1)
t.setRequestHeader("Range","bytes="+s),a.expectedStatus=206}else a.expectedStatus=200
var o=h&&!!e.onProgressiveData
return o?(t.responseType="moz-chunked-arraybuffer",a.onProgressiveData=e.onProgressiveData,a.mozChunked=!0):t.responseType="arraybuffer",e.onError&&(t.onerror=function(i){e.onError(t.status)}),t.onreadystatechange=this.onStateChange.bind(this,i),t.onprogress=this.onProgress.bind(this,i),a.onHeadersReceived=e.onHeadersReceived,a.onDone=e.onDone,a.onError=e.onError,a.onProgress=e.onProgress,t.send(null),i},onProgress:function(e,t){var i=this.pendingRequests[e]
if(i){if(i.mozChunked){var a=r(i.xhr)
i.onProgressiveData(a)}var n=i.onProgress
n&&n(t)}},onStateChange:function(e,t){var i=this.pendingRequests[e]
if(i){var a=i.xhr
if(a.readyState>=2&&i.onHeadersReceived&&(i.onHeadersReceived(),delete i.onHeadersReceived),4===a.readyState&&e in this.pendingRequests){if(delete this.pendingRequests[e],0===a.status&&this.isHttp)return void(i.onError&&i.onError(a.status))
var n=a.status||c,s=n===c&&i.expectedStatus===l
if(!s&&n!==i.expectedStatus)return void(i.onError&&i.onError(a.status))
this.loadedRequests[e]=!0
var o=r(a)
if(n===l){var h=a.getResponseHeader("Content-Range"),u=/bytes (\d+)-(\d+)\/(\d+)/.exec(h),d=parseInt(u[1],10)
i.onDone({begin:d,chunk:o})}else i.onProgressiveData?i.onDone(null):o?i.onDone({begin:0,chunk:o}):i.onError&&i.onError(a.status)}}},hasPendingRequests:function(){for(var e in this.pendingRequests)return!0
return!1},getRequestXhr:function(e){return this.pendingRequests[e].xhr},isStreamingRequest:function(e){return!!this.pendingRequests[e].onProgressiveData},isPendingRequest:function(e){return e in this.pendingRequests},isLoadedRequest:function(e){return e in this.loadedRequests},abortAllRequests:function(){for(var e in this.pendingRequests)this.abortRequest(0|e)},abortRequest:function(e){var t=this.pendingRequests[e].xhr
delete this.pendingRequests[e],t.abort()}}
var u=t.assert,d=t.createPromiseCapability,f=t.isInt,g=t.MissingPDFException,p=t.UnexpectedResponseException
n.prototype={_onRangeRequestReaderClosed:function(e){var t=this._rangeRequestReaders.indexOf(e)
t>=0&&this._rangeRequestReaders.splice(t,1)},getFullReader:function(){return u(!this._fullRequestReader),this._fullRequestReader=new s(this._manager,this._options),this._fullRequestReader},getRangeReader:function(e,t){var i=new o(this._manager,e,t)
return i.onClosed=this._onRangeRequestReaderClosed.bind(this),this._rangeRequestReaders.push(i),i},cancelAllRequests:function(e){this._fullRequestReader&&this._fullRequestReader.cancel(e)
var t=this._rangeRequestReaders.slice(0)
t.forEach(function(t){t.cancel(e)})}},s.prototype={_validateRangeRequestCapabilities:function(){if(this._disableRange)return!1
var e=this._manager
if(!e.isHttp)return!1
var t=this._fullRequestId,i=e.getRequestXhr(t)
if("bytes"!==i.getResponseHeader("Accept-Ranges"))return!1
var a=i.getResponseHeader("Content-Encoding")||"identity"
if("identity"!==a)return!1
var r=i.getResponseHeader("Content-Length")
return r=parseInt(r,10),f(r)?(this._contentLength=r,r<=2*this._rangeChunkSize?!1:!0):!1},_onHeadersReceived:function(){this._validateRangeRequestCapabilities()&&(this._isRangeSupported=!0)
var e=this._manager,t=this._fullRequestId
e.isStreamingRequest(t)?this._isStreamingSupported=!0:this._isRangeSupported&&e.abortRequest(t),this._headersReceivedCapability.resolve()},_onProgressiveData:function(e){if(this._requests.length>0){var t=this._requests.shift()
t.resolve({value:e,done:!1})}else this._cachedChunks.push(e)},_onDone:function(e){e&&this._onProgressiveData(e.chunk),this._done=!0,this._cachedChunks.length>0||(this._requests.forEach(function(e){e.resolve({value:void 0,done:!0})}),this._requests=[])},_onError:function(e){var t,i=this._url
t=404===e||0===e&&/^file:/.test(i)?new g('Missing PDF "'+i+'".'):new p("Unexpected server response ("+e+') while retrieving PDF "'+i+'".',e),this._storedError=t,this._headersReceivedCapability.reject(t),this._requests.forEach(function(e){e.reject(t)}),this._requests=[],this._cachedChunks=[]},_onProgress:function(e){this.onProgress&&this.onProgress({loaded:e.loaded,total:e.lengthComputable?e.total:this._contentLength})},get isRangeSupported(){return this._isRangeSupported},get isStreamingSupported(){return this._isStreamingSupported},get contentLength(){return this._contentLength},get headersReady(){return this._headersReceivedCapability.promise},read:function(){if(this._storedError)return Promise.reject(this._storedError)
if(this._cachedChunks.length>0){var e=this._cachedChunks.shift()
return Promise.resolve(e)}if(this._done)return Promise.resolve({value:void 0,done:!0})
var t=d()
return this._requests.push(t),t.promise},cancel:function(e){this._done=!0,this._headersReceivedCapability.reject(e),this._requests.forEach(function(e){e.resolve({value:void 0,done:!0})}),this._requests=[],this._manager.isPendingRequest(this._fullRequestId)&&this._manager.abortRequest(this._fullRequestId),this._fullRequestReader=null}},o.prototype={_close:function(){this.onClosed&&this.onClosed(this)},_onDone:function(e){var t=e.chunk
if(this._requests.length>0){var i=this._requests.shift()
i.resolve({value:t,done:!1})}else this._queuedChunk=t
this._done=!0,this._requests.forEach(function(e){e.resolve({value:void 0,done:!0})}),this._requests=[],this._close()},_onProgress:function(e){!this.isStreamingSupported&&this.onProgress&&this.onProgress({loaded:e.loaded})},get isStreamingSupported(){return!1},read:function(){if(null!==this._queuedChunk){var e=this._queuedChunk
return this._queuedChunk=null,Promise.resolve({value:e,done:!1})}if(this._done)return Promise.resolve({value:void 0,done:!0})
var t=d()
return this._requests.push(t),t.promise},cancel:function(e){this._done=!0,this._requests.forEach(function(e){e.resolve({value:void 0,done:!0})}),this._requests=[],this._manager.isPendingRequest(this._requestId)&&this._manager.abortRequest(this._requestId),this._close()}},i.setPDFNetworkStreamClass(n),e.PDFNetworkStream=n,e.NetworkManager=a})}).call(t),e.WorkerMessageHandler=t.pdfjsCoreWorker.WorkerMessageHandler})