
/**
 * t_file
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-08-26 11:50:51
 *</pre>
 */
$(function() {
	file  = new File();
	file.init();
	
	formUrl = file.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#fileGrid",// 列表对象
			PAGER : "#filePager",// 列表分页
			FORM : '#fileForm'// 表单form
	};
	/**
	 * t_file 对象
	 * @returns {File}
	 */
	File = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	File.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)//列表
				this._initGridList();
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
			}
			if($('#ty').val()==0)this.openScanner();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this, loanId = $('#loanId').val() , ty=$('#ty').val(),ifTyEqual0IsScan=ty==0;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/loanp/files/file/listJson.htm?loanId=' + loanId,
						pager :this.consts.PAGER,
						colNames: ['主键','文件名','文件地址','借贷id','viewer','uploader','上传日期','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:!0,key:!0
				                	 	}, {
				                 	   name:'name',
				                	   index: 'name'

				                	 					                	 	}, {
				                 	   name:'filePath',
				                	   index: 'file_path'
			                		   ,hidden:!0
				                	 					                	 	}, {
				                 	   name:'jdid',
				                	   index: 'jdid'
			                		   ,hidden:!0
				                	 					                	 	}, {
				                 	   name:'viewer',
				                	   index: 'viewer'
			                		   ,hidden:!0
				                	 					                	 	}, {
				                 	   name:'uploader',
				                	   index: 'uploader'
			                		   ,hidden:!0
				                	 					                	 	}, {
				                 	   name:'time',
				                	   index: 'time'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:0,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[ {
										label : '扫描文件',
										classes : 'btn btn-primary fa fa-detail',
										action : 'javascript:file.scan("{id}","{name}","{loanid}")',
										hidden : !ifTyEqual0IsScan
									},{
										label : '审阅',
										classes : 'btn btn-primary fa fa-detail',
										action : 'javascript:file.review("{id}","{name}","{filePath}")',
										hidden : ifTyEqual0IsScan
									}]
								} ],
								loadComplete: function(){
									try{
										$('.rowOps').each(function() {
											$(this).rowOps();
										});
									}catch(e){}
								}
	
					});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me.formUrl = new com.lc.form.FormData(form);
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				me.formUrl.submit(me._showResponse);
			});
		},
		/**
		 * 初始化数据
		 */
		_initData : function(){
			if(!$.isEmpty(frameElement) 
				&& !$.isEmpty(frameElement.dialog) 
				&& !$.isEmpty(frameElement.dialog.params)
				&& !$.isEmpty(frameElement.dialog.params.data)){
				var data = frameElement.dialog.params.data;
				this.formUrl.setData("[name^='m:']", data);
			}
			this.formUrl.validate();
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/loanp/files/file/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		review: function(a,b,c){
			var url = '/loanp/demo/demoFile/review.htm?file='+c;
			DialogUtil.dialog({
				content : url,
				area : ['100%','100%'],
				btn:[{
					label:'保存',
					iconCls:'btn btn-success fa fa-ok',
					action:function(dialog,index){
						
					}
				},{
					label:'取消',
					iconCls:'btn btn-success fa fa-cancel',
					action:function(dialog,index){
						DialogUtil.close(index);
					}
					
				}
				]
			})
		},
		openScanner : function() {
			ocx.DSMode(9);
			var pp = ocx.openScanner();
			if (1 == pp) {
				DialogUtil.msg("扫描仪初始化完成！");
			} else {
				var Error = ocx.GetErrorCode();
				alert(Error);
			} 
		},
		scan : function(id,name,loanid) {
			var me=this,path = 'c:\\temp',file = path+'\\00000.pdf',url = __ctx+'/loanp/files/file/reciever.htm';
			ocx.AutoDiscardBlankPages = -1;
			ocx.GetPageNum(0);
			ocx.ShowUI = 0;
			ocx.AutoScan = 0;
			ocx.SetImageName(path, '', 0, 5);
			ocx.ScanResolution = $("#Resolution").val();
			ocx.ScanPixelType = 2;
			ocx.ImageFormat =5; //图像保存格式 multipdf
			ocx.ScanSourceType = 0;
			ocx.TiffCompressType = 0;
			ocx.CompressionRate =$("#CompressRate").val();
			ocx.AutoDeskew = 1;
			ocx.Contrast =$("#Contrast").val();
			if (1 == ocx.Scan(-1, 0)) {
				DialogUtil.msg('扫描完成！');
				me.saveAttachment(url,name+'.pdf',file,id);
				ocx.DeleteImageFile(file);
				$('.fa-.search').click();
			} 
		},
		saveAttachment : function(upload_target_url,upload_filename,localFilePath,id){  
	        var me=this,strTempFile = localFilePath, xml_dom = me.createDocument();// 创建XML对象，组合XML文档数据    
	        xml_dom.loadXML('<?xml version="1.0" encoding="GBK" ?> <root/>');  
	        // 创建ADODB.Stream对象  
	        var ado_stream = new ActiveXObject("adodb.stream");  
	        
	        // 设置流数据类型为二进制类型  
	        ado_stream.Type = 1; // adTypeBinary  
	        // 打开ADODB.Stream对象  
	        ado_stream.Open();  
	        // 将本地文件装载到ADODB.Stream对象中  
	        ado_stream.LoadFromFile(strTempFile);  
	        // 获取文件大小（以字节为单位）  
	        var byte_size = ado_stream.Size;  
	        // 设置数据传输单元大小为1KB  
	        var byte_unit = 1024;  
	        // 获取文件分割数据单元的数量  
	        var read_count = parseInt((byte_size/byte_unit).toString())+parseInt(((byte_size%byte_unit)==0)?0:1);  
	        // 创建XML元素节点，保存上传文件名称  
	        var node = xml_dom.createElement("uploadfilename");  
	        node.text = upload_filename.toString();  
	        var root =  xml_dom.documentElement;  
	        root.appendChild(node);  
	      
	        // 创建XML元素节点，procId  
	        var node = xml_dom.createElement("procid");  
	        node.text = "123";  
	        root.appendChild(node);  
	          
	        // 创建XML元素节点，签发人  
	        var node = xml_dom.createElement("qfPerson");  
	        var qfPerson =  $("#person").val();  
	        if(qfPerson == "99"){  
	            qfPerson = $("#o_person").val();  
	        }  
	        node.text = qfPerson;  
	        root.appendChild(node);  
	          
	        // 签发时间  
	        var node = xml_dom.createElement("qfTime");  
	        var qfTime =  $("#qfTime").val();  
	        node.text = qfTime;  
	        root.appendChild(node);  
	          
	        // 创建XML元素节点，保存上传文件路径  
	        var node = xml_dom.createElement("id");  
	        node.text = id.toString();  
	        root.appendChild(node);  
	      
	        // 创建XML元素节点，保存上传文件大小  
	        var node = xml_dom.createElement("uploadfilesize");  
	        node.text = byte_size.toString();  
	        root.appendChild(node);  
	      
	        // 创建XML元素节点，保存上传文件内容  
	        for(var i=0;i<read_count;i++)  
	        {  
	            var node = xml_dom.createElement("uploadcontent");  
	            // 文件内容编码方式为Base64  
	            node.dataType = "bin.base64";  
	            // 判断当前保存的数据节点大小，根据条件进行分类操作  
	            if((parseInt(byte_size%byte_unit)!=0)&&(i==parseInt(read_count-1)))  
	            {  
	                // 当数据包大小不是数据单元的整数倍时，读取最后剩余的小于数据单元的所有数据  
	                node.nodeTypedValue = ado_stream.Read();  
	            }  
	            else  
	            {  
	                // 读取一个完整数据单元的数据  
	                node.nodeTypedValue = ado_stream.Read(byte_unit);  
	            }  
	            root.appendChild(node);  
	        }  
	      
	        // 关闭ADODB.Stream对象  
	        ado_stream.Close();  
	        delete ado_stream;  
	        // 创建Microsoft.XMLHTTP对象  
	        // var xmlhttp = new ActiveXObject("microsoft.xmlhttp");  
	        var xmlhttp= window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHttp");  
	        // 打开Microsoft.XMLHTP对象  
	        xmlhttp.open("post",upload_target_url,false);  
	        // 使用Microsoft.XMLHTP对象上传文件  
	        xmlhttp.send(xml_dom);  
	        console.log(xml_dom);
	        var state = xmlhttp.readyState;  
	        var success_state = true;  
	        if(state != 4){  
	            success_state = false;  
	        }  
	          
	        delete xmlhttp;  
	          
	        return success_state;  
	  } ,
	  // 创建DOMdocuemnt  
	  createDocument : function() {  
	        var xmldom;  
	        var versions = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.5.0","MSXML2.DOMDocument.4.0","MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument"],  
	            i, len;  
	        for (i = 0, len = versions.length; i < len; i++) {  
	            try {  
	                xmldom = new ActiveXObject(versions[i]);  
	                if(xmldom != null)  
	                    break;  
	            } catch (ex) {  
	                //跳过  
	                alert("创建document对象失败！");  
	            }  
	        }  
	        return xmldom;  
	    }  
	};
})();


