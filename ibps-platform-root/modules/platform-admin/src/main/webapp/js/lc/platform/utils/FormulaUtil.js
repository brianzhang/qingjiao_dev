/**
 * 公式计算帮助类
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2015-11-02-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
FormulaUtil ={
      //===============逻辑函数===================================	
			/**
			 * 并且
			 */
		  AND: function() {
				var args = $.flatten(arguments);
				for (var i = 0, c = args.length; i < c; i++){
				    if (!args[i]) return false;
				}
				return true;
	        },
	        /**
	         * 或者
	         */
	        OR: function() {
	        	var args = $.flatten(arguments);
	            for (var i = 0, c = args.length; i < c; i++){
	                if (args[i]) return true;
	            }
	            return false;
	        },
	        /**
	         * 返回逻辑值false
	         */
	        FALSE: function() { 
	            return false;
	        },
	        /**
	         * 返回逻辑值true
	         */
	        TRUE: function() {
	            return true;
	        },
	        /**
	         * IF(判断条件，结果为true的返回值, 结果为false的返回值)
	         * 判断一个条件能否满足；如果满足返回一个值，如果不满足则返回另外一个值。
	         */
	        IF: function(a, b, c) {
	            return a ? b : c;
	        },
	        /**
	         * 对参数逻辑值求反
	         */
	        NOT: function(a) {
	            return !a;
	        },
	        /**
	         * 返回所有参数的异或值.
	         * 异或的含义是:
	         * 		两个值相同，返回0，
	         * 		两个值不同，返回1。
	         */
	        XOR: function() {
	            for (var a = 0, b =$.flatten(arguments), c = 0, d = b.length; c < d; c++)
	                b[c] && a++;
	            return !!(1 & Math.floor(Math.abs(a)));
	        },
//===============文本函数===================================	        
	        /**
	         * 将多个文本字符串合并成一个文本字符串。
	         * 示例：CONCATENATE(A,B,C)，即返回值为ABC
	         */
	        CONCATENATE: function() {
	        	var args = $.flatten(arguments);
	            return args.join("");
	        },
	        /**
	         * 比较两个字符串是否完全相同（区分大小写）。完全相同则返回true，否则返回false
	         */
	        EXACT: function(a, b) {
	            return a === b;
	        },
	        /**
	         * 从一个文本字符串的第一个字符开始返回指定个数的字符。
	         */
	        LEFT: function(a, b) {
	        	b = $.isEmpty(b) ? 1 : b;
	            return    a ? a.substring(0, b) : "";
	        },
	        /**
	         * 返回文本字符串中的字符个数。
	         */
	        LEN: function(a) {
	            return _.isString(a) ? a ? a.length : 0 : a && a.length ? a.length : 0;
	        },
	        /**
	         * 将一个文本字符串中的所有大写字母转换为小写字母。
	         */
	        LOWER: function(a) {
	            return _.isString(a) ? a ? a.toLowerCase() : a : "";
	        },
	        /**
	         * 根据指定的字符数，将部分文本字符串替换为不同的文本字符串。
	         */
	        REPLACE: function(oldText, startNum,numChars, newText) {
	        	oldText = oldText ||"";
	        	newText = newText||"";
	        	if(_.isNumber(startNum) && _.isNumber(numChars) )
	        		oldText = oldText.substr(0, startNum - 1) + newText + oldText.substr(startNum - 1 + numChars);
	        	return  oldText;
	        },
	        /**
	         * 将文本重复一定次数。
	         */
	        REPT: function(a, b) {
	        	 b = b || 0;
	            return new Array(b + 1).join(a);
	        },
	        /**
	         * 返回文本值中最右边的字符。
	         * text: 必需。包含要提取字符的文本字符串。
	         * num_chars: 可选。指定希望提取的字符数。
	         */
	        RIGHT: function(a, b) {
	            return b = void 0 === b ? 1 : b,
	            a ? a.substring(a.length - b) : "";
	        },
	        /**
	         * 在第二个文本字符串中查找第一个文本字符串，并返回第一个文本字符串的起始位置的编号，该编号从第二个文本字符串的第一个字符算起。返回0则表示未查找到。
	         * find_text: 必需。要查找的文本。
	         * within_text: 必需。要在其中搜索find_text参数的值的文本。
	         * start_num: 可选。within_text参数中从之开始搜索的字符编号。
	         */
	        SEARCH: function(a, b, c) {
	            var d;
	            return _.isString(a) && _.isString(b) ? (c = _.isNull(c) ? 0 : c,
	            d = b.toLowerCase().indexOf(a.toLowerCase(), c - 1) + 1) : 0
	        },
	        /**
	         * 拆分
	         */
	        SPLIT: function(a, b) {
	            return _.isString(a) ? a.split(b) : [];
	        },
	        /**
	         * 删除字符串首尾的空格，但是会保留字符串内部作为词与词之间分隔的空格。
	         */
	        TRIM: function(a) {
	            return _.isString(a) ? a.replace(/ +/g, " ").trim() : "";
	        },
	        /**
	         * 将一个文本字符串中的所有小写字母转换为大写字母。
	         */
	        UPPER: function(a) {
	            return _.isString(a) ? a.toUpperCase() : "";
	        },
	        /**
	         * 返回文本字符串中从指定位置开始的特定数目的字符，该数目由用户指定。
	         * text: 必需。 包含要提取字符的文本字符串。
			*  start_num: 必需。 文本中要提取的第一个字符的位置。 文本中第一个字符的start_num为 1，以此类推。
			*  num_chars: 必需。 指定希望从文本中返回字符的个数。
	         */
	        MID: function(text, startNum, numChars) {
	             text = text || "";
	             return  _.isNumber(startNum) && _.isNumber(numChars) ? text.substr(startNum - 1, numChars) : text;
	        },
//=============== 数学函数===================================	        
	        AVERAGE: function() {
	            for (var a = $.flatten(arguments, function(a) {
	                return _.isNumber(a)
	            }), b = a.length, c = 0, d = 0, e = 0; e < b; e++)
	                c += a[e],
	                d += 1;
	            return c / d
	        },
	        COUNT: function() {
	            return $.flatten(arguments).length;
	        },
	        LARGE: function(a, b) {
	            return a = $.flatten(a, function(a) {
	                return _.isNumber(a)
	            }),
	            a.sort(function(a, b) {
	                return b - a
	            })[b - 1];
	        },
	        MAX: function() {
	            var a = $.flatten(arguments, function(a) {
	                return _.isNumber(a);
	            });
	            return 0 === a.length ? 0 : Math.max.apply(Math, a);
	        },
	        MIN: function() {
	            var a = $.flatten(arguments, function(a) {
	                return _.isNumber(a);
	            });
	            return 0 === a.length ? 0 : Math.min.apply(Math, a);
	        },
	        SMALL: function(a, b) {
	            return a = $.flatten(a, function(a) {
	                return _.isNumber(a);
	            }),
	            a.sort(function(a, b) {
	                return a - b
	            })[b - 1];
	        },
	        ABS: function(a) {
	            return _.isNumber(a) ? Math.abs(a) : 0;
	        },
	        ROUND: function(a, b) {
	            return Math.round(a * Math.pow(10, b)) / Math.pow(10, b);
	        },
	        CEILING: function(a, b) {
	            if (0 === b)
	                return 0;
	            var c = b < 0 ? -1 : 0;
	            b = Math.abs(b);
	            var d = b - Math.floor(b)
	              , e = 0;
	            return d > 0 && (e = -Math.floor(Math.log(d) / Math.log(10))),
	            a >= 0 ?FormulaUtil.ROUND(Math.ceil(a / b) * b, e) : 0 === c ? -FormulaUtil.ROUND(Math.floor(Math.abs(a) / b) * b, e) : -FormulaUtil.ROUND(Math.ceil(Math.abs(a) / b) * b, e)
	        },
	        FLOOR: function(a, b) {
	            if (0 === b)
	                return 0;
/*	            if (!(a > 0 && b > 0 || a < 0 && b < 0))
	                return 0;*/
	            b = Math.abs(b);
	            var c = b - Math.floor(b)
	              , d = 0;
	            return c > 0 && (d = -Math.floor(Math.log(c) / Math.log(10))),
	            a >= 0 ? FormulaUtil.ROUND(Math.floor(a / b) * b, d) : -FormulaUtil.ROUND(Math.floor(Math.abs(a) / b) * b, d);
	        },
	        INT: function(a) {
	            return _.isNumber(a) ? Math.floor(a) : 0;
	        },
	        LOG: function(a, b) {
	            return b = void 0 === b ? 10 : b,
	            _.isNumber(b) ? Math.log(a) / Math.log(b) : 0;
	        },
	        MOD: function(a, b) {
	            if (0 === b)
	                return 0;
	            var c = Math.abs(a % b);
	            return b > 0 ? c : -c;
	        },
	        POWER: function(a, b) {
	            var c = Math.pow(a, b);
	            return isNaN(c) ? 0 : c;
	        },
	        PRODUCT: function() {
	            for (var a = $.flatten(arguments, function(a) {
	                return _.isNumber(a)
	            }), b = 1, c = 0; c < a.length; c++)
	                b *= a[c];
	            return b
	        },
	        SQRT: function(a) {
	            return a < 0 ? 0 : Math.sqrt(a)
	        },
	        SUM: function() {
	        	var args = $.flatten(arguments, function(a) {
	                return _.isNumber(a);
	            });
	        	var v =0;
	            for (var i = 0, d = args.length; i < d; ++i){
	                v +=  args[i];
	            }
	            return v;
	        },
	        SUMPRODUCT: function() {
	            for (var a = 0, b = [], c = -1, d = 0; d < arguments.length; d++)
	                arguments[d]instanceof Array && (c = c < 0 ? arguments[d].length : Math.min(arguments[d].length, c),
	                b.push(arguments[d]));
	            for (var e, f, g, h = 0; h < c; h++) {
	                for (e = 1,
	                f = 0; f < b.length; f++)
	                    g = parseFloat(b[f][h]),
	                    isNaN(g) && (g = 0),
	                    e *= g;
	                a += e
	            }
	            return a;
	        },
	        /**
	         * 将数字舍入到指定的小数位数，以十进制数格式对该数进行格式设置，并以文本形式返回结果。
	         * number: 必需。 要进行舍入并转换为文本的数字。
	         * decimals: 可选。 小数点右边的位数。
	         */
	        FIXED: function(a, b) {
	            return b = void 0 === b ? 0 : b,
	            _.isNumber(b) && b >= 0 ? Number(a).toFixed(b) : "";
	        },
//=============== 日期函数===================================	  	        
	        DATE: function() {
	        	if($.isEmpty(arguments[0]))
	        		return null;
	            return 6 === arguments.length ? new Date(parseInt(arguments[0], 10),parseInt(arguments[1], 10) - 1,parseInt(arguments[2], 10),parseInt(arguments[3], 10),parseInt(arguments[4], 10),parseInt(arguments[5], 10)) : 3 === arguments.length ? new Date(parseInt(arguments[0], 10),parseInt(arguments[1], 10) - 1,parseInt(arguments[2], 10)) : new Date(arguments[0])
	        },
	        TIME: function(a, b, c) {
	            return (3600 * a + 60 * b + c) / 86400;
	        },
	        TIMESTAMP: function(a) {
	        	if($.isEmpty(a)) return 0;
	        	if(_.isString(a))  return  FormulaUtil.TIMESTAMP(FormulaUtil.DATE(a));
	            return _.isDate(a) ? a.getTime() : 0;
	        },
	        TODAY: function() {
	            return new Date();
	        },
	        NOW: function() {
	            return new Date();
	        },
	        DAY: function(a) {
	            return a.getDate();
	        },
	        MONTH: function(a) {
	            return a.getMonth() + 1;
	        },
	        YEAR: function(a) {
	            return a.getFullYear();
	        },
	        HOUR: function(a) {
	            return a.getHours();
	        },
	        MINUTE: function(a) {
	            return a.getMinutes();
	        },
	        SECOND: function(a) {
	            return a.getSeconds();
	        },
	        DAYS: function(a, b) {
	            var c = new Date(a.getFullYear(),a.getMonth(),a.getDate())
	              , d = new Date(b.getFullYear(),b.getMonth(),b.getDate());
	            return (c - d) / 864e5;
	        },
	        DAYS360: function(a, b, c) {
	            var d, e, f = b.getMonth(), g = a.getMonth();
	            if (c){
	                d = 31 === b.getDate() ? 30 : b.getDate();
	    	         e = 31 === a.getDate() ? 30 : a.getDate();
	            }else {
	                var h = new Date(b.getFullYear(),f + 1,0).getDate()
	                  , i = new Date(a.getFullYear(),g + 1,0).getDate();
	                d = b.getDate() === h ? 30 : b.getDate(),
	                a.getDate() === i ? d < 30 ? (g++,
	                e = 1) : e = 30 : e = a.getDate()
	            }
	            return 360 * (a.getFullYear() - b.getFullYear()) + 30 * (g - f) + (e - d)
	        },
	        DATEDELTA: function(a, b) {
	        	if ($.isEmpty(a)) return '';   
	        	if (!a instanceof Date) return '';   
	            return _.isNumber(b) || (b = 0),
	            new Date(a.getTime() + 864e5 * b)
	        },
	        ISOWEEKNUM: function(a) {
	            a.setHours(0, 0, 0),
	            a.setDate(a.getDate() + 4 - (a.getDay() || 7));
	            var b = new Date(a.getFullYear(),0,1);
	            return Math.ceil(((a - b) / 864e5 + 1) / 7)
	        },
	        WEEKNUM: function(a, b) {
	            if (void 0 === b && (b = 1),
	            21 === b)
	                return FormulaUtil.ISOWEEKNUM(a);
	            var c = [void 0, 0, 1, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, 1, 2, 3, 4, 5, 6, 0]
	              , d = c[b]
	              , e = new Date(a.getFullYear(),0,1)
	              , f = e.getDay() < d ? 1 : 0;
	            return e -= 24 * Math.abs(e.getDay() - d) * 60 * 60 * 1e3,
	            Math.floor((a - e) / 864e5 / 7 + 1) + f
	        },
	        FORMAT:function(a,b){
	        	return $.format(a, b);
	        },
	        TODATE:function(dateStr,format){
	        	return $.format(dateStr,format);
	        },
	        //===================高级函数===========================

	        TEXT: function(a, b) {
	            return _.isNull(a) ? "" : _.isDate(a) && !$.isEmpty(b) ? $.format(a, b) : $.num2Str(a, b)
	        },
	        VALUE: function(a) {
	            return $.isEmpty(a) ? 0 : isNaN(a) ? 0 : parseFloat(a)
	        },
	        FLATTEN:function(input, shallow, strict, startIndex){
	        	return  _.flatten(input, shallow, strict, startIndex);
	        },
	        UUID: function() {
	           return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	                return v.toString(16);
	            });
	        },
	        /**
	         * 是否为空
	         */
	        ISEMPTY: function (obj,allowBlank) {
	            return $.isEmpty(obj,allowBlank);
	        },
	        /**
	         * 人民币
	         */
	    	CURRENCY:function(a) {
	    		return $.currency(a);
			},
			/**
			 * 千分位
			 */
			THOUSANDS:function(num,opts){
				return $.thousands(num,opts);
			},
	        MAPX: function(a, b, c, d) {
	        	
	        },
	        MAP: function(a, b, c) {
	   
	        }
	    };
