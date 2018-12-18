/**
 * Office控件。
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2017-07-28 11:11:11
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
(function() {
	var defaults = {
		type 			: 'doc',// doc,docx,xls,xlsx,ppt,pptx
		fileId 			: "",// 文件ID
		fileURL 		: __ctx + "/platform/file/attachment/getFileById.htm?fileId=",
		controlId 		: "officeField",// 控件ID
		fieldName 		: "",// 控件ID
		controlObjId 	: "officeObj",// 控件对象ID
		controlMode 	: "div",// 控件初始化模式iframe/div
		callback 		: null,

		officeNum 		: '0',
		rights 			: 'e',
		menuRights 		: '',
		btns 			: [],
		userInfo 		: {},
		height 			: "100%",
		width 			: "100%",
		pwd 			: "lc@ibps",
		docName 		: "新建文档",
		
		params : {
			Caption 			: "广州流辰信息技术有限公司",
			IsUseUTF8URL 		: "-1",
			IsUseUTF8Data 		: "-1",
			BorderStyle 		: "1",
			BorderColor 		: "14402205",
			TitlebarColor 		: "15658734",
			TitlebarTextColor 	: "0",
			MenubarColor 		: "14402205",
			MenuButtonColor 	: "16180947",
			MenuBarStyle 		: "3",
			MenuButtonStyle 	: "7",
			WebUserName 		: 'ibps'
		}
	};
	
	OfficeControl = function(options) {
		// 定义属性
		this.options = $.extend({}, defaults, options);
		this.browser = $.browser;
	};
	
	/**
	 * 方法
	 */
	OfficeControl.prototype = {
		consts : {
			CAB_PATH 			: __ctx + "/media/office/OfficeControl.cab#version=5,0,2,9",
			CAB64_PATH 			: __ctx + "/media/office/OfficeControlx64.cab#version=5,0,2,9",
			PDF_PATH 			: __ctx + "/media/office/ntkopdfdoc.cab",
			CLASSID 			: "A64E3073-2016-4baf-A89D-FFE1FAA10EC0",
			CLASSID64 			: "A64E3073-2016-4baf-A89D-FFE1FAA10EE0",
			PDF_PLUGIN_VERSION 	: "4.0.0.1"
		},
		isIE: function(){
			return this.browser.ie;
		},
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			this.isFileOpen = false;
			this.params = this.options.params;
			if("iframe" == this.options.controlMode){
				this.renderIframe();
			}else{
				this.render();
			}
			this.initBtn();
		},
		initBtn : function(){
			var me 		= this,
				type 	= this.options.type;
			
			// 监听office控件按钮点击事件
			$('.office-btn').off('click');
			$('.office-btn').on('click', function(e){
				var officeBtnDiv 			= $(this).parent(".office-tool-bar"),
					officeDiv 				= officeBtnDiv.next(),
					officeControlObjId 		= officeDiv.prop("id"),
					officeControlObj 		= OfficePlugin.officeControlObj[officeControlObjId],
					data 					= $(this).data(),
					action 					= data.action;
				
				me.customMenuDeal(action);
			});
		},
		renderIframe : function() {
			var options 		= this.options, 
				controlId 		= options.controlId;
			
			this.controlObjId 	= "office_" + controlId;
			
			// 权限按钮
			var btnhtml = this.getMenuBarHtml();
			$("#" + controlId).before(btnhtml);
			// iframe
			var iframehtml = this.randerIframeHtml();
			$("#" + controlId).html(iframehtml);
			
			var iframe = $("#" + this.controlObjId);
			iframe.params= this.options;
		},
		
		randerIframeHtml : function(){
			var iframeHtml = "";
			iframeHtml += '<iframe id="' + this.controlObjId + '"';
			
			if("r" == this.options.rights){
				iframeHtml += 'src="' + __ctx + '/platform/office/office/get.htm" ';
			}else{
				iframeHtml += 'src="' + __ctx + '/platform/office/office/edit.htm" ';
			}
			
			iframeHtml += 'allowtransparency="true" ';
			iframeHtml += 'scrolling="no" ';
			iframeHtml += 'frameborder="0" ';
			iframeHtml += 'width="100%" ';
			iframeHtml += 'height="100%" ';
			iframeHtml += '>';
			iframeHtml += '</iframe>';
			return iframeHtml;
		},
		
		getMenuBarHtml : function() {
			var btnsHtml 	= "",
				btns 		= this.options.btns,
				btns		= this.transBtns(btns);
			
			if($.isEmpty(btns)){
				return btnsHtml;
			}
			
			btnsHtml += '<div class="office-tool-bar">';
			for(var i = 0, len = btns.length; i < len; i ++){
				var btn = btns[i];
				var subBtns = btn.btns;
				btnsHtml += '<div class="btn-group dropdown office-menu">';
				
				btnsHtml += '<a href="javascript:void(0);" data-toggle="dropdown" class="btn btn-sm btn-primary dropdown-toggle" >' + btn.text 
				btnsHtml += '<i class="ace-icon fa fa-angle-down icon-on-right"></i>';
				btnsHtml += '</a>';
				
				if($.isNotEmpty(subBtns)){
					btnsHtml += '<ul class="dropdown-menu">';
					
					for(var si = 0, slen = subBtns.length; si < slen; si ++){
						var subBtn = subBtns[si];
						btnsHtml += '<li class="office-btn" data-action="' + subBtn.alias + '"><a class="office" href="javascript:void(0);">' + subBtn.text + '</a></li>';
					}
					
					btnsHtml += '</ul>';
				}
				
				btnsHtml += '</div>';
			}
			
			btnsHtml += '</div>';
			
			return btnsHtml;
		},
		
		transBtns : function(btns){
			/*
			 * {alias:'file', text:'文件', btns:[{alias:'save', text:'保存'},{alias:'print', text:'打印'},{alias:'printPreview', text:'打印预览'}]}
			 * ,{alias:'review', text:'审阅', btns:[{alias:'addComment', text:'新建批注'},{alias:'delAllComment', text:'删除所有批注'}]}
			 * ,{alias:'rights', text:'权限', btns:[{alias:'setReadOnly', text:'设置只读'},{alias:'cancelReadOnly', text:'取消只读'},{alias:'enCopy', text:'启用复制粘贴'},{alias:'disCopy', text:'禁用复制粘贴'}]}
			 */
			if(btns && btns.length > 0){
				return this.transData(btns, "alias", "parentAlias");
			}
			
			return [];
		},
		
		transData : function(list, idstr, pidstr){
		    var result = [],temp = {};
		    for(i = 0, len = list.length; i < len; i++){
		        temp[list[i][idstr]]=list[i];//将nodes数组转成对象类型
		    }
		    
		    for(j = 0, len = list.length; j < list.length; j ++){
		        tempVp = temp[list[j][pidstr]]; //获取每一个子对象的父对象
		        if(tempVp){//判断父对象是否存在，如果不存在直接将对象放到第一层
		            if(!tempVp["btns"]) {
		            	tempVp["btns"] = [];//如果父元素的nodes对象不存在，则创建数组
		            }
		            tempVp["btns"].push(list[j]);//将本对象压入父对象的nodes数组
		        }else{
		            result.push(list[j]);//将不存在父对象的对象直接放入一级目录
		        }
		    }
		    
		    return result;
		},
		
		/* TODO 单页面渲染 */
		render : function() {
			var options 		= this.options, 
				_this  			= this,
				fieldName  		= options.fieldName,
				controlId 		= options.controlId;
			
			this.controlObjId 	= "office_" + controlId;
			this.fieldName 		= fieldName;

			var $control = $("#" + controlId);
			$control.html(this.getControlHtml());
			// 权限按钮
			if(options.rights && 'e' == options.rights){
				$control.before(this.getMenuBarHtml());
				//创建iframe 要在创建时候加入
				$control.siblings().find(".dropdown-menu").append(this.createIframe());
			}
			
			this.controlObj = document.getElementById(this.controlObjId);
			
			OfficePlugin.officeObjects[controlId] 		= this.controlObj;
			OfficePlugin.officeControlObj[controlId] 	= this;
			
			// 隐藏菜单条
			this.controlObj.MenuBar 				= false;
			// 隐藏工具条
			this.controlObj.ToolBars 				= false;
			// 显示标题条
			this.controlObj.Titlebar 				= true;
			// 显示状态条
			this.controlObj.IsShowToolMenu 			= true;
			// 开启打印
			this.controlObj.FilePrint				= true;
			// 开启打印预览
			this.controlObj.FilePrintPreview		= true;
			
			// 初始化office控件
			if (this.browser.ie || this.browser.chrome || this.browser.firefox) {
				if (options.type == "pdf") {
					this.addPDFPlugin();
					this.isFileOpen = true;
				} else {
					this.initOffice();
				}
			} else {
				DialogUtil.alert('office控件只支持IE、Firefox 32位52以下版本和Chrome 32位55版本以下的浏览器!');
			}
		},
		createIframe:function(){
			return '<iframe frameborder=0 scrolling=no style="background-color:transparent; position: absolute; z-index: -1; width: 100%; height: 100%; top: 0;left:0;"></iframe>';
		},
		getControlHtml : function() {
			var html 		= "",
				codeBase 	= "",
				clsid 		= "";
			
			if (window.navigator.platform == "Win32") {
				codeBase 	= this.consts.CAB_PATH;
				clsid 		= this.consts.CLASSID;
			} else if (window.navigator.platform == "Win64") {
				codeBase 	= this.consts.CAB64_PATH;
				clsid 		= this.consts.CLASSID64;
			}
			
			if (this.isIE()) {// IE
				html = this.getIEHtml(codeBase, clsid);
			} else { // 谷歌和火狐
				html = this.getFirefoxChromeHtml(codeBase, clsid);
			}
			
			return html;
		},
		
		getFirefoxChromeHtml : function(codeBase, clsid){
			var html = "";
			if (this.options.type == 'pdf') {
				html = '<object id="'
						+ this.controlObjId
						+ '" codeBase="'
						+ codeBase
						+ '" height="'
						+ this.options.height
						+ '" width="'
						+ this.options.width
						+ '"  type="application/ntko-plug" ForOnSaveToURL="OfficeSaveToURL" ForOnDocumentOpened="OfficeDocumentopened'
						+ this.controlObjId
						+ '" ForOnAddTemplateFromURL="OfficeAddTemplateFromURL'
						+ this.controlObjId + '" ';
			} else {
				html = '<object id="'
						+ this.controlObjId
						+ '" codeBase="'
						+ this.consts.CAB_PATH
						+ '" height="'
						+ this.options.height
						+ '" width="'
						+ this.options.width
						+ '"  style="z-index:-1;"   type="application/ntko-plug" ForOnSaveAsOtherFormatToURL="OfficeSaveToURL" ForOnDocumentOpened="OfficeDocumentopened'
						+ this.controlObjId
						+ '" ForOnAddTemplateFromURL="OfficeAddTemplateFromUR'
						+ this.controlObjId + '" ';
			}
			
			for ( var key in this.params) {
				html += '_' + key + '="' + this.params[key] + '"	';
			}
			
			html += 'clsid="{' + clsid + '}">';
			html += '</object> ';
			
			return html;
		},
		
		getIEHtml : function(codeBase, clsid){
			var html = "";
			
			html = '<object  id="'
					+ this.controlObjId
					+ '" codeBase="'
					+ codeBase
					+ '" height="'
					+ this.options.height
					+ '" width="'
					+ this.options.width
					+ '" classid="clsid:'
					+ clsid
					+ '" '
					+'>';
			
			for ( var key in this.params) {
				html += '  <param name="' + key + '" value="' + this.params[key] + '"/>  ';
			}
			
			html += '</object>';
			
			return html;
		},

		initOffice : function() {
			// 指定了文件。
			if ($.isNotEmpty(this.options.fileId)) {
				var fileType = this.getFileType();
				try {
					this.controlObj.OpenFromURL(this.getFileUrl(), null, fileType);
					this.isFileOpen = true;
				} catch (err) {
					this.createOffice();
				}
			}
			// 新建文档。
			else {
				this.createOffice();
			}

			// IE浏览器是同步的 增加 设置文档是否只读，
			// 其它的为异步（由回调接管函数 OfficePlugin.js 中有 documentOpenedOnComplete 处理 ）
			if (this.browser.ie) {
				if($.isEmpty(this.options.rights)){
					this.options.rights = "e";
				}
				if("r" == this.options.rights){
					this.setFileReadOnly(true);
				}else{
					this.setFileReadOnly(false);
				}
			}
		},
		
		createOffice : function() {
			var fileType = this.getFileType();
			try {
				this.controlObj.CreateNew(fileType);
				this.isFileOpen = true;
			} catch (err) {
				try {
					this.controlObj.CreateNew("WPS.Document");
					this.isFileOpen = true;
				} catch (err) {
					DialogUtil.alert("不能创建office文档:" + err.name + ": " + err.message);
				}
			}
		},
		
		getFileType : function() {
			var fileType = "Word.Document", type = this.options.type;
			switch (type) {
			case "doc":
				fileType = "Word.Document";
				break;
			case "xls":
				fileType = "Excel.Sheet";
				break;
			case "ppt":
				fileType = "PowerPoint.Show";
				break;
			}
			return fileType;
		},
		
		/**
		 * 	0：所有OFFICE文档；				1：Word文件；
		 *	2：Excel文件；					3：PowerPoint演示文稿；
		 *	4：Visio文件；					5：Project文件；
		 *	6：金山WPS文件；				7：金山ET电子表文件；
		 *	11：中标字处理文件；				12：中标电子表格；
		 *	13：中标演示文稿。
		 */
		getExtByDocType:function(type){
			var ext= "doc";
			if (type == 1) {
				ext = "doc";
			}else if (type == 2) {
				ext = "xls";
			} else if (type == 3) {
				ext ="ppt";
			} else if (type == 51) {
				ext = "pdf";
			} else {
				ext = "doc";
			}
			return ext;
		},
		
		/**
		 * 把文件是否为只读 true 为只读 false 为可写
		 */
		setFileReadOnly : function(isRead) {
			var type = this.options.type;
			if ($.isEmpty(type) || type == 'pdf' || type == 'PDF')
				return;
			try {
				if (isRead) {
					this.controlObj.SetReadOnly(true, this.options.pwd, 0, 3);
					//this.options.rights = 'r';
				} else {
					if (this.options.rights != 'r'
							&& this.options.rights != 'b') {
						this.controlObj.SetReadOnly(false, this.options.pwd, 0, 3);
					}
				}
			} catch (err) {}
		},

		/**
		 * 增加pdf插件
		 */
		addPDFPlugin : function() {
			if (document.URL.indexOf("file://") >= 0) {
				if (!confirm("如果从本地磁盘打开的URL，需要手工运行命令'regsvr32 ntkopdfdoc.dll'注册插件文件.您确认已经注册了吗？")) {
					return;
				}
			}

			this.controlObj.AddDocTypePlugin(".pdf", "PDF.NtkoDocument",
					this.consts.PDF_PLUGIN_VERSION, this.consts.PDF_PATH, 51,
					true); // 引用pdf组件

			this.controlObj.OpenFromURL(this.getFileUrl());
		},
		
		getFileUrl : function() {
			if($.isEmpty(this.options.fileURL)){
				this.options.fileURL =  __ctx + "/platform/file/attachment/getFileById.htm?fileId=";//office文件查询url
			}
			return this.options.fileURL + this.options.fileId;
		},
		
		menu_consts : {
			menu : [ "编辑   ", "批注   ", "痕迹   ", "套红   ","签名批注   " ],
			subMenu : [ 
			    [ "编辑", "只读", "保存" ]
			    ,[ "新建批注", "删除所有批注" ]
				,[ "保留痕迹", "取消留痕", "显示痕迹", "隐藏痕迹", "接受修订" ]
				,["选择套红模板"]
				,["手写签名","全屏批注"]
			    /*,["选择印章","保护印章","取消保护印章","印章验证","接受验证"]*/
			]
		},
		initMenuBar : function() {
			var menu = this.menu_consts.menu;
			var subMenu = this.menu_consts.subMenu;
			// 添加菜单
			for (var pos = 0; pos < menu.length; pos++) {
				this.controlObj.AddCustomMenu2(pos, menu[pos]);
			}
			// 添加子菜单
			for (var pos = 0; pos < subMenu.length; pos++) {
				var subValue = subMenu[pos];
				for (var subPos = 0; subPos < subValue.length; subPos++) {
					this.controlObj.AddCustomMenuItem2(pos, subPos, -1, false,
							subValue[subPos], false, pos * 10 + subPos);
				}
			}
		},

		customMenuDeal : function(action) {
			var me = this;
			switch (action) {
			case "print"://打印
				this.print();
				break;
			case "printPreview"://打印预览
				this.printPreview();
				break;
			case "cancelReadOnly"://取消只读
				this.setFileReadOnly(false);
				break;
			case "setReadOnly"://设置只读
				this.setFileReadOnly(true);
				break;
			case "enCopy"://启用复制粘贴
				this.setCopy(false);
				break;
			case "disCopy"://禁用复制粘贴
				this.setCopy(true);
				break;
			case "save"://保存文档
				if("新建文档" === me.options.docName){
					DialogUtil.prompt({
							formType: 0,
							value: me.options.docName,
							title: '请输入文档名称'
						}, function(value, index, elem){
							if('' === value){
								DialogUtil.warn("请输入文档名称");
								return;
							}
							me.options.docName = value;
							DialogUtil.closeAll();
							me.saveFile();
						}
					);
				}else{
					return this.saveFile();
				}
				break;
			case "addComment"://添加批注
				this.addComment();
				break;
			case "delComment"://删除批注
				this.deleteComment();
				break;
			case "delAllComment"://删除所有批注
				this.deleteAllComment();
				break;
			case "setMark"://保留痕迹
				this.saveMark(true);
				break;
			case "cancelMark"://不保留痕迹
				this.saveMark(false);
				break;
			case "showMark"://显示痕迹
				this.showMark(true);
				break;
			case "hideMark"://隐藏痕迹
				this.showMark(false);
				break;
			case "acceptRevisions":
				this.acceptRevisions();
				break;
			case "sltRedTemplete":
				this.sltRedTemplete();
				break;
			case "doHandSign":
				this.doHandSign();
				break;
			case "doHandSign2":
				this.doHandSign2();
				break;
			default:
				DialogUtil.alert("未知指令："+action);
			}
		},
		
		print : function(){
			this.controlObj.PrintOut(true);
		},

		printPreview : function(){
			this.controlObj.PrintPreview();
		},
		
		setCopy : function(isNoCopy){
			this.controlObj.IsNoCopy 		= isNoCopy;
			this.controlObj.IsStrictNoCopy 	= isNoCopy;
		},
		
		/**
		 * 是否保留痕迹
		 */
		saveMark : function(flag) {
			this.controlObj.SetReadOnly(false);
			this.controlObj.TrackRevisions(flag);
		},

		/**
		 * 是否显示痕迹
		 */
		showMark : function(flag) {
			this.controlObj.SetReadOnly(false);
			this.controlObj.ActiveDocument.ShowRevisions = flag;
		},

		/**
		 * 接受修订
		 */
		acceptRevisions : function() {
			this.controlObj.SetReadOnly(false);
			this.controlObj.ActiveDocument.AcceptAllRevisions();
		},

		/**
		 * 添加批注
		 */
		addComment : function() {
			var range = this.controlObj.ActiveDocument.Application.Selection.Range;
			this.controlObj.ActiveDocument.Comments.Add(range)
		},

		/**
		 * 删除批注
		 */
		deleteComment : function(){
			//TODO 删除批注
			/*var curCommentText = this.controlObj.ActiveDocument.Comments.item(1).Range.text;
			var count = this.controlObj.ActiveDocument.Comments.Count;
			for (var i = 0; i < count; i++) {
				var itext = this.controlObj.ActiveDocument.Comments.item(i).Range.text;
				if(curCommentText == itext){
					this.controlObj.ActiveDocument.Comments.item(i).Delete();
				}
			}*/
		},
		 
		 /**
		 * 删除所有批注
		 */
		deleteAllComment : function() {
			var count = this.controlObj.ActiveDocument.Comments.Count;
			for (var i = 0; i < count; i++) {
				this.controlObj.ActiveDocument.Comments.item(i).Delete();
			}
		},

		/**
		 * 保存
		 */
		saveFile : function(cFileName, cType) {
			var result 			= null,
				docName 		= this.options.docName,
				callback 		= this.options.callback,
				docType 		= this.getExtByDocType(this.controlObj.DocType),
				fileName 		= docName+"."+docType,//文件名
				fileFieldName 	= this.controlObjId,//控件文件域名称
				url 			= __ctx + "/platform/file/attachment/uploadOffice.htm",
				params			= "fileId=" + this.options.fileId + "&fileFieldName="+ fileFieldName;
			
			// 文档保存
			if($.isNotEmpty(cFileName)){
				fileName = cFileName +"."+docType;//文件名
			}
			
			if($.isNotEmpty(this.options.saveURL) && $.isNotEmpty(cType)){
				url = this.options.saveURL;
				params= params + "&type="+cType;
			}
			
			try{
				if (this.isIE()) {// IE是同步的
					// SaveToURL
					if (this.options.type == 'pdf') {
						// 直接保存文档，不用转换成指定是什么格式的文件方法
						result = this.controlObj.SaveToURL(url, fileFieldName,fileName,true);
					} else {
						// 保存文档时要转换成指定兼容文档的的格式方法
						result = this.controlObj.SaveToURL(url,fileFieldName, params,fileName, true);
					}
					var msg = new com.lc.form.ResultMessage(result);
					if (msg.isSuccess()) {
						this.options.fileId = msg.getVar("fileInfo").id;
						if(callback){
							callback();
						}
					}
				} else { // 火狐谷歌浏览器控件文档保存事件（异步的）
					params += "&controlId=" + this.controlObjId; // 用于保存返回的值对象的名称（异步的才会有）
					// 当你用SaveToURL方法时，回调属性用：ForOnSaveToURL
					// 如果是SaveAsOtherFormatToURL的话，就用ForOnSaveAsOtherFormatToURL回调
					if (this.options.type == 'pdf') {
						// 直接保存文档，不用转换成指定是什么格式的文件方法
						this.controlObj.SaveToURL(url, fileFieldName, params, fileName, true);
					} else {
						// 保存文档时要转换成指定兼容文档的的格式方法
						this.controlObj.SaveToURL(url, fileFieldName, params, fileName, true);
					}
					result = -11;
				}
				return result;
			} catch (err) {
				if (this.isIE()) {
					return -12;
				}
				return -13; // 报错时表示火狐谷歌下OFFICE不正常
			}
		},
			
		/**
		 * 选择套红模板
		 */
		sltRedTemplete : function(){
			var me = this;
			var fileId = "";
			var url = __ctx + "/platform/office/officeTemplate/getFileById.htm?fileId=";
			new OfficeTemplateDialog({
				callback : function(data) {
					//业务代码处理
					if($.isEmpty(data)){
						return;
					}
					fileId = data;
					me.controlObj.SetReadOnly(false);
					me.controlObj.AddTemplateFromURL(url+fileId);
				}
			}).show();
		},
		/**
		 * 手写签名
		 */
		doHandSign : function(){
			this.setFileReadOnly(false);
			this.controlObj.DoHandSign("ibps");
		},
		/**
		 * 全屏批注
		 */
		doHandSign2 : function(){
			this.setFileReadOnly(false);
			this.controlObj.DoHandSign2("ibps");
		}
	}
})();


