
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/commons/include/html_doctype.html"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/commons/page/codegen.jsp"%>
<script type="text/javascript" src="${ctx}/js/lc/loanp/demo/demoFile.js"></script>
<title>t_demo_file_管理列表</title>
</head>
<body>

	<input type="hidden" id="loanId"
		value="<%=request.getParameter("loanId")%>" />
		<input type="hidden" id="ty"
		value="<%=request.getParameter("ty")%>" />
	<div class="wrapper wrapper-content  animated fadeInRight col-sm-12">
		<div class="toolbar-panel ">
			<div class="toolbar-box">
				<div class="toolbar-head clearfix">
					<!-- 顶部按钮 -->
					<div class="buttons">
						<a class="btn btn-primary fa fa-search" href="javascript:void(0);"><span>搜索</span></a>
						<a class="btn btn-primary fa fa-add"
							href="${ctx}/loanp/demo/demoFile/edit.htm"><span>添加</span></a> <a
							class="btn btn-primary fa fa-edit" href="javascript:void(0);"
							action="${ctx}/loanp/demo/demoFile/edit.htm"><span>编辑</span></a>
						<a class="btn btn-primary fa fa-remove" href="javascript:void(0);"
							action="${ctx}/loanp/demo/demoFile/remove.htm"><span>删除</span></a>
					</div>
					<!-- 收缩 -->
					<div class="tools">
						<a href="javascript:void(0);" class="collapse"> <i
							class="bigger-180 fa  fa-angle-double-up"></i>
						</a>
					</div>
				</div>
				<!-- #查询条件-->
				<div class="toolbar-body">
					<form role="form" class="search-form">
						<div class="form-inline p-xxs">
							<div class="form-group">
								<label class="search-label">文件名</label>: <input type="text"
									name="Q^NAME^SL" class="form-control" />
							</div>
							<div class="form-group">
								<label class="search-label">所属贷款</label>: <input type="text"
									name="Q^LOANID^SL" class="form-control" />
							</div>
							<div class="form-group">
								<label class="search-label">文件串</label>: <input type="text"
									name="Q^FILE^SL" class="form-control" />
							</div>
						</div>
					</form>
				</div>
				<!--/ 查询条件-->
			</div>
		</div>
		<!--/ 操作、查询-->
		<div class="jqGrid_wrapper">
			<table id="demoFileGrid"></table>
			<div id="demoFilePager"></div>
		</div>
	</div> 

	<OBJECT ID="ocx" CLASSID="CLSID:49903B72-9F44-41E1-A79B-B85A8BCEB89A">
	</OBJECT>
	<script language="javascript">
		function Open() {
			ocx.DSMode(9);
			var pp = ocx.openScanner();
			if (1 == pp) {
				DialogUtil.alert("扫描仪初始化完成！");
			} else {
				var Error = ocx.GetErrorCode();
				alert(Error);
			} 
		}

		function Scan(id,name,loanid) {
			
			var path = 'c:\\temp',file = path+'\\00000.pdf',url = __ctx+'/loanp/demo/demoFile/fileReciever.htm';
		
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
				SaveAttachment(url,name+'.pdf',file,id);
				ocx.DeleteImageFile(file);
			} 
		}

		function SaveAttachment(upload_target_url,upload_filename,localPath,id){  
	        // 创建XML对象，组合XML文档数据  
	        var xmlDOM = createDocument();  
	        xmlDOM.loadXML('<?xml version="1.0" encoding="GBK" ?> <root/>');  
	      
	        // 创建ADODB.Stream对象  
	        var as = new ActiveXObject("adodb.stream") , fileSize , unitSize = 1024 , read_count , node , root;  
	        
	        // 设置流数据类型为二进制类型  
	        as.Type = 1; // adTypeBinary  
	        // 打开ADODB.Stream对象  
	        as.Open();  
	        // 将本地文件装载到ADODB.Stream对象中  
	        as.LoadFromFile(localPath);  
	        // 获取文件大小（以字节为单位）  
	        fileSize = as.Size;  
	        // 获取文件分割数据单元的数量  
	        read_count = parseInt((fileSize/unitSize).toString())+parseInt(((fileSize%unitSize)==0)?0:1);  
	        // 创建XML元素节点，保存上传文件名称  
	        node = xmlDOM.createElement("uploadfilename");  
	        node.text = upload_filename.toString();  
	        root =  xmlDOM.documentElement;  
	        root.appendChild(node);  
  
	        node = xmlDOM.createElement("id");  
	        node.text = id.toString();
	        root.appendChild(node);
	      
	        // 创建XML元素节点，保存上传文件大小  
	        node = xmlDOM.createElement("uploadfilesize");  
	        node.text = fileSize.toString();  
	        root.appendChild(node);  
	      
	        // 创建XML元素节点，保存上传文件内容  
	        for(var i=0;i<read_count;i++)  
	        {  
	            node = xmlDOM.createElement("uploadcontent");
	            // 文件内容编码方式为Base64  
	            node.dataType = "bin.base64";
	            // 判断当前保存的数据节点大小，根据条件进行分类操作
	            if((parseInt(fileSize%unitSize)!=0)&&(i==parseInt(read_count-1)))  
	            {  
	                // 当数据包大小不是数据单元的整数倍时，读取最后剩余的小于数据单元的所有数据  
	                node.nodeTypedValue = as.Read();  
	            }
	            else  
	            {  
	                // 读取一个完整数据单元的数据  
	                node.nodeTypedValue = as.Read(unitSize);  
	            }  
	            root.appendChild(node);  
	        }  
	      
	        // 关闭ADODB.Stream对象  
	        as.Close();  
	        delete as;  
	        // 创建Microsoft.XMLHTTP对象  
	        var xhr= window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHttp");  
	        // 打开Microsoft.XMLHTP对象  
	        xhr.open("post", targetUrl , false);  
	        // 使用Microsoft.XMLHTP对象上传文件  
	        xhr.send(xmlDOM);  
	        var state = xhr.readyState;  
	        var success_state = state == 4;
	        return success_state;  
	  }  
	    
	  // 创建DOMdocuemnt  
	    function createDocument() {  
	        var xmldom;  
	        var versions = ['MSXML2.DOMDocument.6.0', 'MSXML2.DOMDocument.5.0','MSXML2.DOMDocument.4.0','MSXML2.DOMDocument.3.0', 'MSXML2.DOMDocument'],  
	            i, len;  
	        for (i = 0, len = versions.length; i < len; i++) {  
	            try {  
	                xmldom = new ActiveXObject(versions[i]);  
	                if(xmldom != null)  
	                    break;  
	            } catch (ex) {  
	                //跳过  
	                console.log('创建document对象失败！');  
	            }  
	        }  
	        return xmldom;  
	    }  
	</script>
	<script LANGUAGE=Javascript FOR="ocx"
		EVENT="PostScanEveryPage(bSuccess)" defer>
	</script>
	<div style="display:none">
	<input id="Resolution" type="text" value="200" />
	<input id="CompressRate" type="text" value="20" /> 
	<input id="Contrast" type="text" value="0" />
	<input type="checkbox" id="SetSmooth" value="1" >
	<input type="checkbox" id="removeBG" value="1" >
	<input id="Angle" type="text" value="0" /></div>
	
<!--  图标保存格式
	<select id="PicTypeEx">
		<option value="1">bmp</option>
		<option value="2">jpg</option>
		<option value="3">tif</option>
		<option value="4">multitif</option>
		<option value="5">pdf</option>
		<option value="6">multipdf</option>
		<option value="7">可检索的单页PDF</option>
	</select>  Tiff压缩
	<select id="TiffCom">
		<option value="1">NULL</option>
		<option value="2">JPG压缩</option>
		<option value="3">G4压缩</option>
	</select>
	平滑强度
	<select id="smoothStrength">
		<option value="1">默认</option>
		<option value="2">低</option>
		<option value="3">中</option>
		<option value="4">高</option>
	</select> -->




</body>
</html>
