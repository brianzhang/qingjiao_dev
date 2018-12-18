/*!
 * jQuery QueryBuilder 2.4.0
 * Locale: Simplified Chinese (zh_CN)
 * Author: shadowwind, shatteredwindgo@gmail.com
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

(function(root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(['jquery', 'query-builder'], factory);
    }
    else {
        factory(root.jQuery);
    }
}(this, function($) {
" ";

var QueryBuilder = $.fn.queryBuilder;

QueryBuilder.regional['zh_CN'] = {
  "__locale": "Simplified Chinese (zh_CN)",
  
  "add_rule": "添加条件",
  "add_group": "添加组",
  "delete_rule": "删除",
  "delete_group": "删除组",
  "conditions": {
		 "any": "任何一个条件【或者】",
		 "all": "所有条件【并且】"
  },
  "operators": {
    "eq": "等于",
    "not": "不等于",
    "contains":"包含",
    "not_contains":"不包含",
    "gt":"大于(包含)",
    "lt":"小于(包含)",
    "between": "在...之间",
    "not_between": "不在...之间",
    'present':'包含任何',
    "shorter":"不超过..字符",
    "longer":"不少于..字符",
    "blank":"为空",
    "is_blank":"不为空"
  },
  "errors": {
    "no_filter": "没有选择过滤器",
    "empty_group": "该组为空",
    "radio_empty": "没有选中项",
    "checkbox_empty": "没有选中项",
    "select_empty": "没有选中项",
    "string_empty": "没有输入值",
    "string_exceed_min_length": "必须至少包含{0}个字符",
    "string_exceed_max_length": "必须不超过{0}个字符",
    "string_invalid_format": "无效格式({0})",
    "number_nan": "值不是数字",
    "number_not_integer": "不是整数",
    "number_not_double": "不是浮点数",
    "number_exceed_min": "必须大于{0}",
    "number_exceed_max": "必须小于{0}",
    "number_wrong_step": "必须是{0}的倍数",
    "datetime_empty": "值为空",
    "datetime_invalid": "不是有效日期({0})",
    "datetime_exceed_min": "必须在{0}之后",
    "datetime_exceed_max": "必须在{0}之前",
    "boolean_not_valid": "不是布尔值",
    "operator_not_multiple": "选项{0}无法接受多个值"
  },
  "invert": "倒置"
};



QueryBuilder.defaults({ lang_code: 'zh_CN' });
}));