// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// 字段模式
(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
" ";
CodeMirror.defineMode("field", function() {
	 function b(a) {
         for (var b = {}, c = 0, d = a.length; c < d; ++c)
             b[a[c]] = !0;
         return b
     }
     function c(a, b) {
         if (a.eatSpace())
             return null ;
         var c = a.next();
         if ('"' === c || "'" === c){
        	 d(a, c);
             return "string";
         }
         if ("​" === c){
        	   d(a, c);
        	 return    "field";
         }
 
         a.eatWhile(/[\w]/);
         var e = a.current();
         return f.hasOwnProperty(e) ? "atom" : g.hasOwnProperty(e) ? "keyword" : h.hasOwnProperty(e) ? "deprecate" : "other";
     }
     function d(a, b) {
         for (var c, d = !1; null != (c = a.next()); ) {
             if (c === b && !d)
                 return !1;
             d = !d && "\\" === c
         }
         return d
     }
     function e(a, b) {
         return (b.tokens[0] || c)(a, b)
     }
     var f = b(["false", "true"])
       , g = b(CodeMirror.keywords)
       , h = b(["MAP"]);
     return {
         startState: function() {
             return {
                 tokens: []
             }
         },
         token: function(a, b) {
             return e(a, b)
         },
         fold: "brace"
     }
 });

CodeMirror.defineMIME("text/fx-field", "field");
});
