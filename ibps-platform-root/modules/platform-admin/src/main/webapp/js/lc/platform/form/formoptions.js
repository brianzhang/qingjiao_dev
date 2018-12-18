if (!window.FormOptions) {
	window.FormOptions = {
		t:{},
		options : {}
	};
}

FormOptions.t = {
	/**==========表单的属性======**/
	propertys : {
		// 名称
		NAME : 'name',
		// key
		KEY : 'key',
		TYPE_ID : 'typeId',
		// 分类
		TYPE_NAME : 'typeName',
		// 描述
		DESC : 'desc',
		// 脚本
		SCRIPT : 'attrs.script',
		// 默认显示标题
		HIDE_NAME : 'attrs.hide_name',
		// 默认显示描述
		HIDE_DESC : 'attrs.hide_desc',
		//是否开启冒号：
		COLON: 'attrs.colon',
		//只读样式
		READ_STYLE:'attrs.read_style',
		// 默认占比
		GRIDS_TO_OCCUPY : 'attrs.grids_to_occupy',
		// 字段绑定带出字段名
		OUT_OF_NAME : 'attrs.out_of_name',
		// 表单验证
		VERIFYS : 'attrs.verifys',
		// 表单验证
		RULES : 'attrs.rules',
		//工具类
		TOOLBAR : 'attrs.toolbar',
		//分页效果
		PAGE_STYLE:'attrs.page_style',
		//分页按钮位置
		PAGE_BUTTON_POSITION:'attrs.page_button_position',
		//后端验证
		VALIDATED:'attrs.validated',
		//提交冲突
		CONFLICT:'attrs.conflict'
	},
	/**==========字段的属性======**/
	mappings : {
		// =======基本属性========
		// 标题
		LABEL : 'label',
		// 名称
		NAME : 'name',
		//显示名称
		SHOW_NAME : 'showName',
		// 字段类型
		FIELD_TYPE : 'field_type',
		CODE : 'code',
		//文字提示
		PLACEHOLDER: 'field_options.placeholder',
		// 描述
		DESC : 'desc',
		// 字段选项
		FIELD_OPTIONS : 'field_options',
		//是否主键
		IS_PK : 'field_options.is_pk',
		//内容
		CONTENT: 'field_options.content',
		//树型字典-显示模式
		SELECT_MODE: 'field_options.select_mode',
		//树型字典-显示模式
		DISPLAY_MODE: 'field_options.display_mode',
		//树型字典-路径分隔符
		SPLIT: 'field_options.split',
		// =======默认值========
		// 默认值类型
		DEFAULT_VALUE_TYPE : 'field_options.default_value_type',
		// 默认值
		DEFAULT_VALUE : 'field_options.default_value',
		//默认值名 冗余
		DEFAULT_VALUE_NAME: 'field_options.default_value_name',
		// =======选项========
		// 选项的值来源
		DATASOURCE : 'field_options.datasource',
		// 选项【例如：选项一,选项二】
		OPTIONS : 'field_options.options',
		// 包含其他选项
		INCLUDE_OTHER : 'field_options.include_other_option',
		// 包含空白选项（下拉使用）
		INCLUDE_BLANK : 'field_options.include_blank_option',
		INCLUDE_BLANK_VALUE : 'field_options.include_blank_value',
		//选项--其他绑定的ID
		OPTION_OTHER_ID: 'field_options.option_other_id',
		//选项--其他绑定的名称
		OPTION_OTHER_NAME: 'field_options.option_other_name',
		// IS_PK: 'field_options.is_pk',

		// =======验证========
		// 必填
		REQUIRED : 'field_options.required',
		// 只能输入整数
		INTEGER : 'field_options.integer',
		// 是否小数位
		IS_DECIMAL : 'field_options.is_decimal',
		// 小数位
		DECIMAL : 'field_options.decimal',
		// 只能是整数
		NUMBER : 'field_options.number',
		// 是否最小值（一般数字）
		IS_MIN : 'field_options.is_min',
		// 最小值（一般数字）
		MIN : 'field_options.min',
		// 是否最大值（一般数字）
		IS_MAX : 'field_options.is_max',
		// 最大值（一般数字）
		MAX : 'field_options.max',
		// 是否最少字符（一般文本框、多行文本框）
		IS_MINLENGTH : 'field_options.is_min_length',
		// 最少字符（一般文本框、多行文本框）
		MINLENGTH : 'field_options.min_length',
		// 是否最多字符（一般文本框、多行文本框）
		IS_MAXLENGTH : 'field_options.is_max_length',
		// 最多字符（一般文本框、多行文本框）
		MAXLENGTH : 'field_options.max_length',
		// 是否最少选项（一般多选）
		IS_MINMUM : 'field_options.is_min_mum',
		// 最少选项（一般多选）
		MINMUM : 'field_options.min_mum',
		// 是否最多选项
		IS_MAXMUM : 'field_options.is_max_mum',
		// 最多选项
		MAXMUM : 'field_options.max_mum',
		// 开始日期类型
		START_DATE_TYPE : 'field_options.start_date_type',
		// 是否开始日期
		IS_START_DATE : 'field_options.is_start_date',
		// 开始日期
		START_DATE : 'field_options.start_date',
		// 开始时间间隔(年月日时分秒)
		START_DATE_INTERVAL : 'field_options.start_date_interval',
		// 结束日期类型
		END_DATE_TYPE : 'field_options.end_date_type',
		// 是否结束日期
		IS_END_DATE : 'field_options.is_end_date',
		// 结束日期
		END_DATE : 'field_options.end_date',
		// 结束时间间隔(年月日时分秒)
		END_DATE_INTERVAL : 'field_options.end_date_interval',

		// 结束字段
		FOLD_CARD_LABEL : 'field_options.fold_card_label',
		// 结束字段
		FOLD_CARD_END_FIELD : 'field_options.end_field',
		// 结束字段
		FOLD_CARD_OPEN : 'field_options.open',
		
		// ======字段权限========
		HIDE_RIGHTS: 'field_options.hide_rights',
		READ_RIGHTS: 'field_options.read_rights',
		
		// =======验证-数据格式（文本框）========
		// 数据格式
		DATA_FORMAT : 'field_options.data_format',
		// 数据格式值
		DATA_FORMAT_VALUE : 'field_options.data_format_value',
		// 数据格式提示信息
		DATA_FORMAT_MSG : 'field_options.data_format_msg',

		// =======生成文件常量========
		// 最多文件数
		MAX_FILE_QUANTITY : 'field_options.max_file_quantity',
		// 单个最大文件尺寸
		MAX_FILE_SIZE : 'field_options.max_file_size',
		// 文件类型名（图片、文档类）
		MEDIA_TYPE : 'field_options.media_type',
		// office文件类型名（文档类、表格类、文稿类）
		OFFICE_TYPE : 'field_options.office_type',
		// 文件类型--逗号分割
		MEDIA : 'field_options.media',
		// 文件类型--逗号分割
		OFFICE : 'field_options.office',
		// =======日期格式========
		// 日期格式 eg：“yyyy-MM-dd”
		DATEFMT : 'field_options.datefmt',
		// 日期格式类型（）
		DATEFMT_TYPE : 'field_options.datefmt_type',
		
		// =======选择器参数========
		// 选择器类型
		SELECTOR_TYPE : 'field_options.selector_type',
		// 是否单选
		IS_SINGLE : 'field_options.is_single',
		// 选择器范围
		RANGE : 'field_options.range',
		//存储格式
		STORE:'field_options.store',
		// 绑定ID
		BIND_ID : 'field_options.bind_id',
		// 绑定名称 （冗余）
		BIND_NAME : 'field_options.bind_name',

		// =======地址常量========
		// 最大区域
		TOP : 'field_options.top',
		// 最小区域
		LEVEL : 'field_options.level',
		// 最小区域的值
		TOPVAL : 'field_options.topval',
		// 是否显示详细街道
		IS_STREET : 'field_options.is_street',
		// 详细街道的
		STREET : 'field_options.street',
		// =======布局========
		// 尺寸
		SIZE : 'field_options.size',
		// 排列方式
		ARRANGEMENT : 'field_options.arrangement',
		// 对齐方式
		ALIGN : 'field_options.align',
		// 宽度占比
		GRIDS_TO_OCCUPY : 'field_options.grids_to_occupy',
		//高度
		HEIGHT : 'field_options.height',
		//宽度
		WIDTH : 'field_options.width',
		// 子表模式（行内、弹窗、块模式）
		MODE : 'field_options.mode',

		// =======其他=========
		// 隐藏
		HIDE : 'field_options.hide',

		// 流水号
		IDENTITY : 'field_options.identity',
		// 流水号名称
		IDENTITY_NAME : 'field_options.identity_name',
		// 初始化（是否初始）
		INIT : 'field_options.init',
		// 数字字典
		DICTIONARY : 'field_options.dictionary',
		// 数字字典名称
		DICTIONARY_NAME : 'field_options.dictionary_name',
		// =======自定义对话框=========
		// 对话框类型
		DIALOG_TYPE : 'field_options.dialog_type',
		// 对话框
		DIALOG : 'field_options.dialog',
		// 对话框
		DIALOG_NAME : 'field_options.dialog_name',
		//存储方式
		STORE_MODE: 'field_options.store_mode',
		// 对话框绑定字段
		BIND : 'field_options.bind',
		//参数
		PARAMS : 'field_options.params',
		//标题
		TITLE :'field_options.title',
		//图标
		ICON : 'field_options.icon',
		
		// =======关联数据=========
		//关联数据
		LINKDATA : 'field_options.linkdata',
		LINKDATA_NAME : 'field_options.linkdata_name',
		
		//关联配置
		LINK_CONFIG : 'field_options.link_config',
		//是否多选
		MULTIPLE : 'field_options.multiple',
		//关联条件
		LINK_CONDITION:'field_options.link_condition',
		//关联联动
		LINK_LINKAGE : 'field_options.link_linkage',
		//关联属性
		LINK_ATTR : 'field_options.link_attr',
		// =======其他=========
		// 是否是子表
		IS_SUB : 'is_sub',
		// 子表名称
		SUB_NAME : 'sub_name',
		// 子表字段
		COLUMNS : 'field_options.columns',
		// 子表按钮
		BUTTONS : 'field_options.buttons',
		
		COLUMN_TOTALS : 'field_options.column_totals',
		//最小
		MINROWS : 'field_options.minrows',
		//最大
		MAXROWS : 'field_options.maxrows',
		//预设值
		PRESET_VALUES : 'field_options.preset_values',

		// 富文本框工具栏
		TOOLBARS : 'field_options.toolbars',
		// office菜单栏
		MENUBARS : 'field_options.menubars',
		//显示模式
		SHOW_MODE : 'field_options.show_mode',
		// 单位，eg：货币￥$,元等
		UNITS : 'field_options.units',
		
		UNITS_POSITION : 'field_options.units_position',
		// 分割线
		SPLIT_LINE : 'field_options.split_line',
		//
		LINE_STYLE : 'field_options.line_style',
		
		
		//=======翻页设置=========
		PREV_PAGE: 'field_options.prev_page',
		NEXT_PAGE: 'field_options.next_page',
		// =======规则条件条件=========

		RULES : 'rules',
		// 条件
		CONDITIONS : 'field_options.conditions',
		// 方法
		CONDITION_METHOD : 'field_options.condition_method',

		// 是否默认值
		IS_DEFAULT : 'isDefault',

		// 权限
		PERMISSION : 'permission',
		
		// 子表权限
		SUB_PERMISSION : 'permission.rights',
		
		// 子表表单按钮权限
		BUTTONS_PERMISSION : 'permission.buttons',
		COLUMNS_PERMISSION : 'permission.columns',
		

		APP_LAYOUT : 'appLayout'
	},
	table : {
		ROW : 'row',// 行---
		COLUMN : 'column'// 列 |||
	},
	// 文件默认类型
	FILE_TYPES : {
		"images" : [ "bmp", "gif", "jpg", "jpeg", "png", "psd", "tif", "tiff" ],
		"videos" : [ "mkv", "mp4", "avi", "swf", "wmv", "rmvb", "mov", "mpg" ],
		"audios" : [ "mp3", "flac", "ape", "wma", "wav", "aac", "m4a", "au",
				"ram", "mmf", "ai" ],
		"docs" : [ "doc", "docx", "pdf", "rtf", "txt", "csv", "xls", "xlsx",
				"ppt", "pptx" ],
		"compress" : [ "rar", "zip", "7z", "gz", "arj", "z" ]
	},

	FILE_EXT:{
		images:["bmp","gif","jpg","jpeg","png","psd","tif","tiff"],
		not_images:["accdb", "avi", "css", "doc", "docx", "eml", "eps", "fla", "html",
		    		"ind", "ini", "jsf", "midi", "mov", "mp3", "mpeg", "pdf", "ppt", "pptx", "proj",
		    		"psd", "pst", "pub", "rar", "readme", "settings", "text", "txt", "tiff", "url", "vsd", "wav", "wma",
		    		"wmv", "xls", "xlsx", "zip"]
	},
	// office文件类型
	OFFICE_TYPES : {
		"doc" : [ "doc", "docx" ],
		"xls" : [ "xls", "xlsx" ],
		"ppt" : [ "ppt", "pptx" ]
	},
	// 默认日期格式
	DATE_FORMATS : {
		"date" : "yyyy-MM-dd",
		"datetime" : "yyyy-MM-dd HH:mm:ss",
		"time" : "HH:mm:ss"
	},
	// 默认值类型
	DEFAULT_VALUE_TYPE : [ 'fixed', 'dynamic', 'linkage', 'formula' ],
	// 数据格式(正则表达式)
	DATA_FORMAT : {
		'phone' : /^((\(\d{2,3}\))|(\d{3}\-))?1\d{10}$/,
		'telephone' : /^((\(0[0-9]{2,3}\))|(0[0-9]{2,3})\-)?([2-9][0-9]{6,7})(\-[0-9]{1,4})?$/,
		'zip' : /^\d{6}$/,
		'idcard' : /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
		'email' : /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
	},
	
	BUTTONS:{
		"add" : {
			label : "添加",
			style : "btn-primary",
			icon : "fa fa-add",
			position : 'toolbar'
		},
		"remove" : {
			label : "删除",
			style : "btn-danger",
			icon : "fa fa-remove",
			
			position : 'all'
		},
		"edit" : {
			label : "编辑",
			style : "btn-primary",
			icon : "fa fa-edit",
			position : 'all'
		},
	
	/*	'import' : {
			label : "导入",
			style : "btn-primary",
			icon : "fa fa-import",
			position : 'toolbar'
		},
		'export' : {
			label : "导出",
			style : "btn-primary",
			icon : "fa fa-export",
			position : 'toolbar'
		}*/
		"custom" : {
			label : "[自定义]",
			style : "btn-primary",
			icon : "fa fa-cogs",
			position : 'all'
		}
	},
	//选择器数据存储格式
	SELECTOR_STORE:{
		JSON:'json',//JSON存储
		ID:'id',//仅ID
		BIND:'bind'//绑定ID
	},
	DATA_KEY:{
		ID:"#id#",
		TITLE:"#title#"
	},
	// 权限
	PERMISSIONS : {
		READ_POST : 'rp',// 只读提交
		READ : 'r',// 只读
		EDIT : 'e',// 编辑
		REQUIRED : 'b',// 必填
		SHOW : 's',// 显示，针对子表按钮
		HIDE : 'h'// 隐藏
	},
	// 表单控件
	FIELD_TYPE : {
		HIDDEN : 'hidden',
		TEXT : "text",
		TEXTAREA : 'textarea',
		EDITOR : 'editor',
		NUMBER : 'number',
		RADIO : 'radio',
		CHECKBOX : 'checkbox',
		SELECT : 'select',
		DICTIONARY : 'dictionary',
		DATE_PICKER : 'datePicker',
		AUTO_NUMBER : 'autoNumber',
		ATTACHMENT : 'attachment',
		SELECTOR : 'selector',
		CUSTOM_DIALOG : "customDialog",
		ADDRESS : 'address',
		OFFICE:'office',
		TABLE : 'table',
		TAB_BREAK : 'tab_break',
		DESC : 'desc',
		LABEL:'label',
		FOLD_CARD:'fold_card'
	},
	// 字段类型
	INPUT_FIELD_TYPES : [ 'hidden', 'text', 'textarea', 'editor', 'number',
			'radio', 'checkbox', 'select', 'dictionary', 'datePicker',
			'dateRange', 'autoNumber', 'attachment', 'selector',
			'customDialog','linkdata', 'address', 'signature','office', 'table' ],
	//子表支持的字段类型
	SUBTABLE_FIELD_TYPE:["hidden","text","textarea","radio","checkbox","select","number","datePicker","dictionary","attachment","selector","customDialog"],
	// 不用输入字段类型，
	NON_INPUT_FIELD_TYPES : [ 'flow_diagram',
	                          'approval_history',
	                          'tab_break',
	                          'page_break',
	                          'desc',
	                          'label',
	                          'fold_card',
	                          'section_break' ]
};