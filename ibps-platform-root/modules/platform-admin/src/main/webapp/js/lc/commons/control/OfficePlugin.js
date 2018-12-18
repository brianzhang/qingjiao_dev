/**
 * Office扩展插件。
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2017-07-28 11:11:11
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
OfficePlugin = {
	officeObjects:{},// 存储当前NTKO OfficeControl对象数组
	officeControlObj:{},// 存储当前IBPS OfficeControl控件对象数组
	saveToURLNum : 0,// 有几次回调文件了
	submitNum:0,
	bookMarkName: "content",
	
	submit : function(){
		for(var key in this.officeControlObj){
			var officeControlObj = this.officeControlObj[key];
			// 保存office
			officeControlObj.customMenuDeal("save");
		}
	},
	
	/**
	 * 火狐谷歌浏览器控件文档保存事件（异步的，IE是同步的）回调接管函数 <br>
	 * 注意不在OfficeControl类里面 一定是单独方法 是控件属性的ForOnSaveToURL对应的方法
	 * （SaveToURL保存后的回调函数） result 为后台返回的内容
	 */
	officeSaveToURL :function(type, code, result) {
		this.saveToURLNum =  this.saveToURLNum + 1;
		
		var arrys 		= result.split("##"),
			arryNum 	= arrys[0], // 保存对象的序号
			arryValue 	= arrys[1]; // 要保存的内容
		
		if (arryNum >= 0 && arryValue > 0) {
			this.fileObjs.get(arryNum).setAttribute("value", arryValue); // 保存到对象的值
			this.officeObjects[arryNum].config.fileId = arryValue; // 控件中config对象的fileId
			this.hasSubmitOffices[arryNum] = true; // 完成标志
			this.submitNewNum = this.submitNewNum + 1; // 每回调一次就提交数量的变量就加上1
			if (this.submitNum == this.submitNewNum) { // 当提交数据等于提交数量的变量时表示所有文档都提交了然后做
														// 业务相关的提交
				if (this.callback) {
					this.callback();
				} else {
				}
				this.submitNewNum = 0; // 重置 提交数量的变量
				thiss.aveToURLNum = 0; // 重置 回调用提交方法次数的变量
			}
		} else {
			if (this.saveToURLNum  == this.submitNum) {
				alert("提交失败,OFFICE控件没能正常使用，请重新安装 ！！！");
			}
		}
	},

	/**
	 * 新增模版
	 * 
	 * @param controlId
	 */
	officeAddTemplateFromURL : function(controlId) {
		var officeObj = this.officeControlObj[controlId]; // IBPS OfficeControl实例对象
		if (!officeObj.controlObj.ActiveDocument.BookMarks.Exists(this.bookMarkName)) {
			alert("Word 模板中不存在名称为：\"" + this.bookMarkName + "\"的书签！");
			return false;
		}
		// 书签
		var bookMarkObj = officeObj.controlObj.ActiveDocument.BookMarks.Item(this.bookMarkName); // 火狐和谷歌特有的
		var range = bookMarkObj.Range;
		range.Paste();
		officeObj.controlObj.ActiveDocument.Bookmarks.Add(BookMarkName, range);
	},

	/**
	 * 文档打开
	 * 
	 * @param controlId
	 */
	officeDocumentopened : function(controlId) {
		var officeObj = this.officeControlObj[controlId]; // IBPS OfficeControl实例对象
		// 文档要求为只读时，通过Office 实例对象设置文档为只读
		if ($.isNotEmpty(officeObj)) {
			officeObj.setFileReadOnly(false);
		}
		// 文档完成回调
		if (typeof this.documentOpenedOnCompleteCallback != 'undefined') {
			this.documentOpenedOnCompleteCallback(officeObj);
		}
	}
}
