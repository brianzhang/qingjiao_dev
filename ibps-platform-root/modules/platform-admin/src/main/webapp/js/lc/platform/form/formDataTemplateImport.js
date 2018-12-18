$(function(){
	formDataTemplateImport = new FormDataTemplateImport();
	formDataTemplateImport.init()
});

(function($ , undefined) {
	$.fn.ibps_wizard = function(options) {

		this.each(function() {
			var $this = $(this);
			$this.wizard();

			var buttons = $this.siblings('.wizard-actions').eq(0);
			var $wizard = $this.data('wizard');
			
			$wizard.$prevBtn.remove();
			$wizard.$nextBtn.remove();
			
			$wizard.$prevBtn = buttons.find('.btn-prev').eq(0).on('click',  function(){
				$wizard.previous();
			}).attr('disabled', 'disabled');
			
			$wizard.$nextBtn = buttons.find('.btn-next').eq(0).on('click',  function(){
				$wizard.next();
			}).removeAttr('disabled');
			
			$wizard.nextText = $wizard.$nextBtn.text();
			
			var step = options && ((options.selectedItem && options.selectedItem.step) || options.step);
			if(step) {
				$wizard.currentStep = step;
				$wizard.setState();
			}
		});

		return this;
	}

})(window.jQuery);

(function() {
	/**
	 * 对象
	 * @returns {FormDataTemplateImport}
	 */
	FormDataTemplateImport = function() {
		
	};

	/**
	 * 方法
	 */
	FormDataTemplateImport.prototype = {
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			
			this.$wizard =null;
			
			this.fields = frameElement.dialog.params.fields;
			this.formKey = frameElement.dialog.params.formKey;
			
			this.initWizard();
			
			this.initUploadFile();
			
		},
		initUploadFile:function(){
				new UploadFile('queueList').init(	this.$wizard);	
		},
		qtip:function(){
			$('[data-tip]')	.each(function() {
				var setting = {
						content : $(this).attr("data-tip"),
						position : {
							target : 'mouse', 
							my : 'top center',
							at : 'bottom center'
						},
						hide: {
							event:'mouseleave',
				        	leave: false,
				        	fixed:true,
				        	delay:100
				        },
						style: {
							classes: 'qtip-default  qtip qtip-bootstrap qtip-shadow'
					    }
					  };
				$(this).qtip(setting);
				});
		},
		initWizard:function(){
			var _this =this;
			var isSuccess =false;
			var buttons = $('#fuelux-wizard-container').siblings('.wizard-actions').eq(0);
			this.$wizard = 	$('#fuelux-wizard-container').ibps_wizard();
			var excelRow = 1;
			this.$wizard.on('change', function(e, data) {
				if(!data)
					return;
				var step = data.step, direction = data.direction;
				// 第1步的下一步操作
				var excel = _this.$wizard.data("excel");
				if (step == 1 && direction == 'next'){
					buttons.show();
					var html = template('excelTableTemp',  {list :excel,excelRow:excelRow});
					$("#excelTable").html(html);
				}else if (step == 2 && direction == 'next'){
					excelRow = $('#excelRow').val()
					var	excelRowFields =  excel[excelRow-1];
					
					if($.isEmpty(excelRowFields)){
						return true;
					}
					var fields ={},excelFields =[];
					$.each(_this.fields,function(i,n){
						fields[n.label] =n;
					});
					
					$.each(excelRowFields,function(i,n){
						var field =  fields[n],excelField  ={};
						if(field){
							excelField ={
									name:field.name,
									label:n,
									field_type:field.field_type,
									isExist:true
							};
						}else{
							excelField ={
									label:n,
									field_type:"",
									isExist:false
							};
						}
						excelFields.push(excelField);
					});
					
					var html = template('importFieldTemp',  {list :excelFields});
					$("#importField tbody").html(html);
					
					_this.qtip();
				}else if (step == 3 && direction == 'next'){
					if(isSuccess){
						buttons.hide();
						return true;
					}
					e.preventDefault();
					var f ={};
					$("#importField").find("[type='checkbox']:checked").each(function(i,n){
						var $this = $(n),column = $this.data("column");
						f[column] =	$this.attr("name");
					});
					
					var importData = [];
					for (var i = 1; i < excel.length; i++) {
						var da = excel[i],d ={};
						for (var j = 0; j < da.length; j++) {
							if(!f[j] ||!da[j] || null == da[j])
								continue;
							d[f[j]] = da[j];
						}
						importData.push(d);
					}
		
					var loading = DialogUtil.load("导入数据中");
					$.post(__ctx+"/platform/form/formDataTemplate/saveUpload.htm", {
						data: JSON.stringify(importData),
						formKey:_this.formKey
					},function(r){
						DialogUtil.close(loading);
						if(r.result == 1){
							isSuccess = true;
				         	_this.$wizard.wizard("next");
							frameElement.dialog.callback(true);
						}else{
							DialogUtil.error(r.message,r.cause);
						}
					}, "json");
				
				}
				
				if (step == 2 && direction == 'previous'){
					buttons.hide();
				}
			})
			.on('stepclick', function(e, data) {
				if(!data)
					return true;
				var step = data.step;
				if (step == 2  || step == 3){
					buttons.show();
				}
				if (step == 1 || step == 4){
					buttons.hide();
				}
			});
		}
	}
})();


(function(){
	/* 上传附件 */
	UploadFile = function(target) {
	    this.$wrap = target.constructor == String ? $('#' + target) : $(target);
	};

	UploadFile.prototype = {
	    init: function ($wizard) {
	    	this.$wizard =$wizard;
	        this.fileList = [];
	        this.initUploader();
	    },
	    /* 初始化容器 */
	    initUploader: function () {
	        var _this = this,
	            $ = jQuery,    // just in case. Make sure it's not an other libaray.
	            $wrap = _this.$wrap,
	        // 图片容器
	            $queue = $wrap.find('.filelist'),
	        // 状态栏，包括进度和控制按钮
	            $statusBar = $wrap.find('.statusBar'),
	        // 文件总体选择信息。
	            $info = $statusBar.find('.info'),
	        // 上传按钮
	            $filePickerBtn = $wrap.find('.filePickerBtn'),
	        // 上传按钮
	            $filePickerBlock = $wrap.find('.filePickerBlock'),
	        // 没选择文件之前的内容。
	            $placeHolder = $wrap.find('.placeholder'),
	        // 总体进度条
	            $progress = $statusBar.find('.progress').hide(),
	        // 添加的文件数量
	            fileCount = 0,
	        // 添加的文件总大小
	            fileSize = 0,
	        // 优化retina, 在retina下这个值是2
	            ratio = window.devicePixelRatio || 1,
	        // 缩略图大小
	            thumbnailWidth = 113 * ratio,
	            thumbnailHeight = 113 * ratio,
	        // 可能有pedding, ready, uploading, confirm, done.
	            state = '',
	        // 所有文件的进度信息，key为file id
	            percentages = {},
	        // WebUploader实例
	            uploader,
	            actionUrl = __ctx+"/platform/form/formDataTemplate/upload.htm",
	            fileMaxSize = 1024*1024,
	            acceptExtensions = ".xls,.xlsx";

	        if (!WebUploader.Uploader.support()) {
	            $('#filePickerReady').after($('<div>').html(lang.errorNotSupport)).hide();
	            return;
	        } 
	        uploader = _this.uploader = WebUploader.create({
	            pick: {
	                id: '#filePickerReady',
	                label: '选择文件'
	            },
                dnd: '#upload #dndArea',//可以拖拽的位置
                paste: '#dndArea',//QQ等截图工具粘贴的位置
	            swf: __ctx+'/media/swf/webuploader/Uploader.swf',//flash 支持的控件
	            server: actionUrl,
	            duplicate: true,
	            fileSingleSizeLimit: fileMaxSize,
	            compress: false,
	            accept: {
	                title: 'excel',
	                extensions: 'xls,xlsx',
	                mimeTypes: '.xls,.xlsx'
	            }
	        });
	        uploader.addButton({
	            id: '#filePickerBlock'
	        });
	        //错误的状态
	         var getShowErrorText = function (code) {
	                switch (code) {
	                    case 'exceed_size':
	                        text = '文件大小超出';
	                        break;
	                    case 'interrupt':
	                        text = '文件传输中断';
	                        break;
	                    case 'http':
	                        text = 'http请求错误';
	                        break;
	                    case 'not_allow_type':
	                        text = '文件格式不允许';
	                        break;
	                    default:
	                        text = '上传失败，请重试';
	                        break;
	                }
	                return text;
	            };

	        // 当有文件添加进来时执行，负责view的创建
	        function addFile(file) {
	            
	            showError = function (code) {
            		text = getShowErrorText(code);
            		DialogUtil.msg(text);
                };

	            if (file.getStatus() === 'invalid') {
	                showError(file.statusText);
	            } else {
	                /* 检查文件格式 */
	                if (!file.ext || acceptExtensions.indexOf(file.ext.toLowerCase()) == -1) {
	                    showError('not_allow_type');
	                    uploader.removeFile(file);
	                    return;
	                }
	            }
	            var  $prgress = $('.progress span');
                percentages[ file.id ] = [ file.size, 0 ];
                
	            file.on('statuschange', function (cur, prev) {
                    if (prev === 'progress') {
                        $prgress.hide().width(0);
                    } else if (prev === 'queued') {
                       // $li.off('mouseenter mouseleave');
                      // $btns.remove();
                    }
                    // 成功
                    if (cur === 'error' || cur === 'invalid') {
                        showError(file.statusText);
                        percentages[ file.id ][ 1 ] = 1;
                    } else if (cur === 'interrupt') {
                        showError('interrupt');
                    } else if (cur === 'queued') {
                        percentages[ file.id ][ 1 ] = 0;
                    } else if (cur === 'progress') {
                        $prgress.css('display', 'block');
                    } else if (cur === 'complete') {
                    	
                    }else if(cur ==  'cancelled'){
                    	 $prgress.hide();
                    }

                });
	            
	            uploader.upload();
	        }

	        // 负责view的销毁
	        function removeFile(file) {
	            var $li = $('#' + file.id);
	            delete percentages[ file.id ];
	            updateTotalProgress();
	            $li.off().find('.file-panel').off().end().remove();
	        }

	        function updateTotalProgress() {
	            var loaded = 0,
	                total = 0,
	                spans = $progress.children(),
	                percent;

	            $.each(percentages, function (k, v) {
	                total += v[ 0 ];
	                loaded += v[ 0 ] * v[ 1 ];
	            });

	            percent = total ? loaded / total : 0;

	            spans.eq(0).text(Math.round(percent * 100) + '%');
	            spans.eq(1).css('width', Math.round(percent * 100) + '%');
	          //  updateStatus();
	        }

	        /**
	         *    当文件被加入队列以后触发。
	         */
	        uploader.on('fileQueued', function (file) {
	            fileCount++;

	            if (fileCount === 1) {
	                $placeHolder.addClass('element-invisible');
	                $statusBar.show();
	            }

	            addFile(file);
	        });

	        uploader.on('fileDequeued', function (file) {
	            fileCount--;
	            fileSize -= file.size;

	            removeFile(file);
	            updateTotalProgress();
	        });

	        uploader.on('filesQueued', function (file) {
                if (!uploader.isInProgress() && (state == 'pedding' || state == 'finish' || state == 'confirm' || state == 'ready')) {
                    setState('ready');
                }
                updateTotalProgress();
	        });

	        uploader.on('all', function (type, files) {
	            switch (type) {
	                case 'uploadFinished'://完成
	                    break;
	                case 'startUpload':
	                    break;
	                case 'stopUpload':
	                    break;
	            }
	        });

	        uploader.on('uploadBeforeSend', function (file, data, header) {
	            //这里可以通过data对象添加POST参数
	            header['X_Requested_With'] = 'XMLHttpRequest';
	        });

	        uploader.on('uploadProgress', function (file, percentage) {
	            var $li = $('#' + file.id),
	                $percent = $li.find('.progress span');

	            $percent.css('width', percentage * 100 + '%');
	            percentages[ file.id ][ 1 ] = percentage;
	            updateTotalProgress();
	        });

	        uploader.on('uploadSuccess', function (file, ret) {
	        	_this.$wizard.data({
	        		excel:ret
	        	});
	        	console.info(ret);
	    		if($.isEmpty(ret)){
	    			 DialogUtil.msg("导入的数据不符合规范！"); 
				}else{
				 	_this.$wizard.wizard("next");
				}
	       
	        });

	        uploader.on('uploadError', function (file, code) {
	        	
	        });
	        uploader.on('error', function (code, file) {
	            if (code == 'Q_TYPE_DENIED' || code == 'F_EXCEED_SIZE') {
	                addFile(file);
	            }
	        });
	        
	    }
	};
	
})();



