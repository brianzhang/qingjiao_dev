if(!window.FormOptions){
	window.FormOptions ={
			options :{}
	};
}
	
FormOptions.t = {
      propertys:{
	      //名称
	      NAME:'name',
	      //key
	      KEY:'key',
	      TYPE_ID:'typeId',
	      //分类
	      TYPE_NAME:'typeName',
	      //描述
	      DESC: 'desc',
	      //前置脚本
	      BEFORE_SCRIPT:'attrs.before_script',
	      //后置脚本
	      AFTER_SCRIPT:'attrs.after_script',
	      //默认占比
	      GRIDS_TO_OCCUPY:'attrs.grids_to_occupy',
	      //默认显示标题
	      HIDE_NAME:'attrs.hide_name',
	      //默认显示描述
	      HIDE_DESC:'attrs.hide_desc',
	    //字段绑定带出字段名
	     OUT_OF_NAME:'attrs.out_of_name',
	     //表单验证
	     VERIFYS:'attrs.verifys',
	     //表单验证
	     RULES:'attrs.rules'
      },
      mappings: {
        //标题
        LABEL: 'label',
        //名称
        NAME:'name',
        SHOW_NAME:'showName',
        //字段类型
        FIELD_TYPE: 'field_type',
        CODE:'code',
        //描述
        DESC: 'desc',
        //字段选项
        FIELD_OPTIONS: 'field_options',
        
        IS_PK: 'field_options.is_pk',
        //=======默认值========
        //默认值类型
        DEFAULT_VALUE_TYPE: 'field_options.default_value_type',
        //默认值
        DEFAULT_VALUE: 'field_options.default_value',
        //=======选项========
        //选项的值来源
        DATASOURCE:'field_options.datasource',
        //选项
        OPTIONS: 'field_options.options',
        //包含其他选项
        INCLUDE_OTHER: 'field_options.include_other_option',
        //包含空白选项（下拉使用）
        INCLUDE_BLANK: 'field_options.include_blank_option',
      //  IS_PK: 'field_options.is_pk',
        
        //=======验证========
        //必填
        REQUIRED: 'field_options.required',
        //只能输入整数
        INTEGER: 'field_options.integer',
        //是否小数位
        IS_DECIMAL:'field_options.is_decimal',
        //小数位
        DECIMAL:'field_options.decimal',
        //只能是整数
        NUMBER: 'field_options.number',
        //最小值（一般数字）
        MIN: 'field_options.min',
        //最大值（一般数字）
        MAX: 'field_options.max',
        //最少字符（一般文本框）
        MINLENGTH: 'field_options.min_length',
        //最多字符（一般文本框）
        MAXLENGTH: 'field_options.max_length',
        MIN_MAX_LENGTH_UNITS: 'field_options.min_max_length_units',
        //最少选项（一般多选）
        MINMUM: 'field_options.min_mum',
        //最多选项
        MAXMUM: 'field_options.max_mum',
        //开始日期类型
        START_DATE_TYPE: 'field_options.start_date_type',
        //开始日期
        START_DATE: 'field_options.start_date',
        //时间间隔
        START_DATE_INTERVAL: 'field_options.start_date_interval',
        //结束日期类型
        END_DATE_TYPE: 'field_options.end_date_type',
        //结束日期
        END_DATE: 'field_options.end_date',
        
        END_DATE_INTERVAL: 'field_options.end_date_interval',
        
        
        
        //=======数据格式========
        //数据格式
        DATA_FORMAT:'field_options.data_format',
        //数据格式值
        DATA_FORMAT_VALUE:'field_options.data_format_value',
        //数据格式提示信息
        DATA_FORMAT_MSG:'field_options.data_format_msg',
        
        //=======文件常量========
        //最多文件数
        MAX_FILE_QUANTITY:'field_options.max_file_quantity',
        //单个最大文件尺寸
        MAX_FILE_SIZE:'field_options.max_file_size',
        //文件类型名
        MEDIA_TYPE:'field_options.media_type',
        //文件类型.逗号分割
        MEDIA:'field_options.media',
        //=======日期格式========
        //日期格式  eg：“yyyy-MM-dd”
        DATEFMT:'field_options.datefmt',
        //日期格式类型
        DATEFMT_TYPE:'field_options.datefmt_type',
        //选择器类型
        SELECTOR_TYPE :'field_options.selector_type',
        //选择器是否单选
        IS_SINGLE :'field_options.is_single',
        
        //绑定ID
        BIND_ID :'field_options.bind_id',
        //绑定名称 （冗余）
        BIND_NAME:'field_options.bind_name',
        
        //=======地址常量========
        //最大区域
        TOP:'field_options.top',
        //最小区域
        LEVEL:'field_options.level',
        //最小区域的值
        TOPVAL:'field_options.topval',
        //是否显示详细街道
        IS_STREET:'field_options.is_street',
        //详细街道的
        STREET:'field_options.street',
        //=======布局========
        //尺寸
        SIZE:'field_options.size',
        //排列方式
        ALIGN:'field_options.align',
        //宽度占比
        GRIDS_TO_OCCUPY:'field_options.grids_to_occupy',
        HEIGHT:'field_options.height',     
        //子表模式（行内、弹窗、块模式）
        MODE:'field_options.mode',
        
       //=======其他=========
        //隐藏
        HIDE:'field_options.hide',
        
        //流水号
        IDENTITY:'field_options.identity',
        //流水号名称
        IDENTITY_NAME:'field_options.identity_name',
        //初始化
        INIT:'field_options.init',
        //数字字典
        DICTIONARY:'field_options.dictionary',
        //数字字典
        DICTIONARY_NAME:'field_options.dictionary_name',
        //对话框
        DIALOG:'field_options.dialog',
        //对话框类型
        DIALOG_TYPE:'field_options.dialog_type',
        //对话框绑定字段
        BIND:'field_options.bind',
        //是否是子表
        IS_SUB:'is_sub',
        //子表名称
        SUB_NAME:'sub_name',
        //子表字段
        COLUMNS:'field_options.columns',
        COLUMN_TOTALS:'field_options.column_totals',
        MINROWS : 'field_options.minrows',
        MAXROWS: 'field_options.maxrows',
        PRESET_VALUES:'field_options.preset_values',
        //按钮
        BUTTONS:'field_options.buttons',
        //富文本框工具栏
        TOOLBARS:'field_options.toolbars',
        //单位，eg：货币￥$等
        UNITS: 'field_options.units',
        //分割线
        SPLIT_LINE: 'field_options.split_line',
       
        //=======显示条件=========
        
        RULES:'rules',
        //条件
        CONDITIONS:'field_options.conditions',
        //方法
        CONDITION_METHOD:'field_options.condition_method',
        
        
        //是否默认值
        IS_DEFAULT:	'isDefault' ,//是否是默认值
        
        //权限
        PERMISSION:'permission',
        //子表权限
        SUB_PERMISSION:'permission.rights'
      },
      table:{
    	  ROW:'row',//行---
    	  COLUMN:'column'//列 |||
      },
      //文件默认类型
     FILE_TYPES :{
    		  "images": ["bmp", "gif", "jpg", "jpeg", "png", "psd", "tif", "tiff"],
    		  "videos": ["m4v", "mp4", "mov", "mpg"],
    		  "audios": ["m4a", "mp3", "wav"],
    		  "docs": ["doc", "docx", "pdf", "rtf", "txt","csv", "xls", "xlsx","ppt", "pptx"]
    		},
     //日期格式
      DATE_FORMATS:{
    	  "date":"yyyy-MM-dd",
    	  "datetime":"yyyy-MM-dd HH:mm:ss",
    	  "time":"HH:mm:ss"
      },
      //默认值类型
      DEFAULT_VALUE_TYPE:[
    	  'fixed',
    	  'dynamic',
    	  'linkage',
    	  'formula'
      ],
      //数据格式
      DATA_FORMAT:{
            'phone':/^((\(\d{2,3}\))|(\d{3}\-))?1\d{10}$/,
            'telephone':/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
            'zip':/^\d{6}$/,
            'idcard':/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            'email':/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      },
      //权限
     PERMISSIONS:{
    	 READ_POST:'rp',//只读提交
    	 READ:'r',//只读
    	 EDIT:'e',//编辑
    	 REQUIRED:'b',//必填
    	 SHOW:'s',//显示，针对子表,
    	 HIDE:'h'//隐藏
     },
     //表单控件
	 FIELD_TYPE: {
	   	 HIDDEN:'hidden',
		 TEXT:"text",
    	 TEXTAREA:'textarea',
    	 EDITOR:'editor',
    	 NUMBER: 'number',
    	 RADIO:'radio',
    	 CHECKBOX:'checkbox',
     	 SELECT:'select',
     	 DICTIONARY:'dictionary',
     	 DATE_PICKER:'datePicker',
     	 AUTO_NUMBER:'autoNumber',
     	 ATTACHMENT:'attachment',
     	 SELECTOR :'selector',
     	 CUSTOM_DIALOG:"customDialog",
     	 ADDRESS:'address',
    	 TABLE :'table',
    	 DESC:'desc'
      },
	  // 字段类型
      INPUT_FIELD_TYPES:['hidden', 'text','textarea',
            		    	  'editor','number', 'radio', 'checkbox','select','dictionary',
            		     	 'datePicker','dateRange', 'autoNumber','attachment',
            		     	 'selector','customDialog', 'address',
            		    	 'signature','table'],
     // 不用输入字段类型，
     NON_INPUT_FIELD_TYPES : ['flow_diagram','approval_history','desc', 'page_break', 'section_break']
    };