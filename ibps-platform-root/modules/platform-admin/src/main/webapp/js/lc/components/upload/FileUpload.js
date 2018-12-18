/**
 * 上传附件
 * 
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2016-01-06-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 * 存在问题：1、上传进度问题
 * 		2、合并代码消耗时间。
 * 		3、秒传传输时间。
 * 		4、暂停问题
 */
$(function() {
	var params = frameElement.dialog.params;
	// 文件上传界面
	fileUpload = new FileUpload(params);
	fileUpload.init('queueList');

	// 在线附件
	onlineFile = new OnlineFile(params);
	onlineFile.init('fileList');
});

(function() {

	FileUpload = function(params) {
		this.params = params ? params : {};
	};

	FileUpload.prototype = { 
		// 初始化操作，绑定事件等
		init : function(target) {
			if (typeof this._initialized != "undefined") {
				return;
			}
			this._initialized = true;
			this.$wrap = target.constructor == String ? $('#' + target): $(target);
			this.fileList = [];
			this.initContainer();
		},
		/* 初始化容器 */
		initContainer : function() {
			var _this = this, $ = jQuery, // just in case. Make sure it's not an other libaray.
			$wrap = _this.$wrap,
			// 图片容器
			$queue = $wrap.find('.filelist'),
			// 状态栏，包括进度和控制按钮
			$statusBar = $wrap.find('.statusBar'),
			// 文件总体选择信息。
			$info = $statusBar.find('.info'),
			// 上传按钮
			$upload = $wrap.find('.uploadBtn'),
			// 删除上传
			$delUploadBtn = $wrap.find('.delUploadBtn'),
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
			thumbnailWidth = 113 * ratio, thumbnailHeight = 113 * ratio,
			// 可能有pedding, ready, uploading, confirm, done.
			state = '',
			// 所有文件的进度信息，key为file id
			percentages = {}, supportTransition = (function() {
				var s = document.createElement('p').style, r = 'transition' in s
						|| 'WebkitTransition' in s
						|| 'MozTransition' in s
						|| 'msTransition' in s || 'OTransition' in s;
				s = null;
				return r;
			})(),
			// WebUploader实例
			uploader, 
			actionUrl = __ctx + '/components/upload/upload.htm',
			acceptExtensions = (this.params.fileFormates || ''), 
			accept  = (this.params.accept || null), 
			pkField = this.params.pkField ? this.params.pkField	: 'id',
			formData = {
				uploadType : (this.params.uploadType || 'file'),
				paramJson : (this.params.paramJson || null)
			},
			chunkSize = this.params.chunkSize?this.params.chunkSize:(10 * 1024 * 1024);

			if (!WebUploader.Uploader.support()) {
				$('#filePickerReady').after(
						$('<div>').html("不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器")).hide();
				return;
			}
			
			

			// 监听分块上传过程中的三个时间点
			WebUploader.Uploader.register({
								"before-send-file" : "beforeSendFile",
								"before-send" : "beforeSend",
								"after-send-file" : "afterSendFile",
							},{
								// 时间点1：所有分块进行上传之前调用此函数
								beforeSendFile : function(file) {
									var deferred = WebUploader.Deferred(), owner = this.owner;
									// 1、计算文件的唯一标记，用于断点续传,
									// 如果.md5File(file)方法里只写一个file参数则计算MD5值会很慢 所以加了后面的参数：10*1024*1024
									(new WebUploader.Uploader())
											.md5File(file,0,10*1024*1024)
											.progress(function(percentage) {
												// console.info("正在读取文件信息...");
											})
											.then(function(fileMd5) {
														file.fileMd5 = fileMd5;
														owner.options.formData.fileMd5 = fileMd5;
														$.ajax({
																	type : "POST",
																	url : __ctx+ '/components/upload/checkMd5.htm',
																	data : {
																		fileMd5 : fileMd5
																	},
																	dataType : "json",
																	success : function(response) {
																		if (response.result == 1) { // 文件存在，跳过
																			owner.skipFile(file);
																			file.fileExists = 1;
																		} else {
																			file.fileExists = 0
																		}
																		deferred.resolve();
																	}
																});
													});
									return deferred.promise();
								},
								// 时间点2：如果有分块上传，则每个分块上传之前调用此函数
								beforeSend : function(block) {
									var deferred = WebUploader.Deferred(), 
										chunk = block.chunk, 
										chunkSize = block.end- block.start, 
										chunks = block.chunks, 
										fileMd5 = this.owner.options.formData.fileMd5,
										isChunk = chunks > 1 ? 1 : 0;

									var data = $.extend(formData, {
										// 文件唯一标记
										fileMd5 : fileMd5,
										// 当前分块下标
										chunk : chunk,
										// 当前分块大小
										chunkSize : chunkSize,
										isChunk : isChunk
									});
									
									$.ajax({
												type : "POST",
												url : __ctx
														+ '/components/upload/checkChunk.htm',
												data : data,
												dataType : "json",
												success : function(response) {
													if (response.result ==1) { // 分块存在，跳过
														deferred.reject();
													} else {
														// 分块不存在或不完整，重新发送该分块内容
														deferred.resolve();
													}
												}
											});
									// 是否分片
									this.owner.options.formData.isChunk = isChunk;
									// 当前分片
									this.owner.options.formData.chunk = chunk;
									 deferred.resolve();  
									return deferred.promise();
								},
								// 所有分块上传成功后调用此函数
								afterSendFile : function(file) {
									// 如果分块上传成功，则通知后台合并分块
									var data = $.extend(formData, {
										fileMd5 : this.owner.options.formData.fileMd5, // 文件唯一标记
										fileExists : file.fileExists,
										filename : file.name,
										fileSize : file.size
									});
									$.ajax({
												type : "POST",
												url : __ctx+ '/components/upload/mergeChunks.htm',
												data : data,
												success : function(ret) {
													var $file = $('#' + file.id);
													$file.find('.success').remove();
													try {
														if (ret.result == 1) {
															var $fileTemp = ret.fileInfo;
															_this.fileList.push($fileTemp);
															file._fileId = $fileTemp[pkField];
															$file.append('<span class="success"></span>');
														} else {
															$file.find('.error').text(ret.message).show();
														}
													} catch (e) {
														console.info(e);
														$file.find('.error').text("服务器返回出错").show();
													}
												}
											});
								}
							});


			//创建上传文件
			uploader = _this.uploader = WebUploader.create({
				pick : {
					id : '#filePickerReady',
					label : '选择文件'
				},
				dnd : '#upload #dndArea',// 可以拖拽的位置
				paste : '#dndArea',// QQ等截图工具粘贴的位置
				swf : __ctx + '/media/swf/webuploader/Uploader.swf',// flash支持的控件
				server : actionUrl,
				auto: true,
				formData : formData,
				duplicate : true,// 允许重复上传
				disableGlobalDnd : true, // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。

				chunked : true, // 是否开启分片上传
				chunkSize : chunkSize, // 分片大小是10M
				fileSingleSizeLimit : (this.params.maxUploadSize || undefined),// 限制上传文件的大小
				fileNumLimit : (this.params.maxUploadNum || undefined),// 限制上传文件的数量
				compress : (this.params.compress || false),
				accept:accept
			});
			// 上传按钮
			uploader.addButton({
				id : '#filePickerBlock' 
			});
			// 上传按钮
			uploader.addButton({
				id : '#filePickerBtn',
				label : '上传文件'
			});

			// 初始化状态设置
			setState('pedding');
			
			// 错误的状态
			function getShowErrorText(code) {
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
				var $li = $('<li id="' + file.id + '">'+
						'<p class="title" title="' + file.name + '">'+ file.name + '</p>' +
						'<p class="imgWrap"></p>'+
						'<p class="progress"><span></span></p>' + 
						'</li>'),

				$btns = $('<div class="file-panel">' +
								'<span class="cancel">'+ '删除' + '</span>'+
								'<span class="rotateRight">' + '向左旋转'+ '</span>' 
								+ '<span class="rotateLeft">'+ '向右旋转' + '</span></div>').appendTo($li), 
				$prgress = $li.find('p.progress span'), 
				$wrap = $li.find('p.imgWrap'),
				$info = $('<p class="error"></p>').hide().appendTo($li),
				showError = function(code) {
					text = getShowErrorText(code);
					$info.text(text).show();
				};
				 
				if (file.getStatus() === 'invalid') {
					showError(file.statusText);
				} else {
					$wrap.text("预览中");
					if ('|png|jpg|jpeg|bmp|gif|'.indexOf('|'+ file.ext.toLowerCase() + '|') == -1) {// 非图片
						$wrap.empty().addClass('notimage').append(
								'<i class="file-preview file-type-'+ file.ext.toLowerCase() + '"></i>'
										+ '<span class="file-title" title="'
										+ file.name + '">' + file.name+ '</span>');
					} else {
						uploader.makeThumb(file, function(error, src) {
							if (error || !src) {
								$wrap.text("不能预览");
							} else {
								var $img = $('<img src="' + src + '">');
								$wrap.empty().append($img);
								$img.on('error', function() {
									$wrap.text("不能预览");
								});
							}
						}, thumbnailWidth, thumbnailHeight);
					}
					percentages[file.id] = [ file.size, 0 ];
					file.rotation = 0;

					/* 检查文件格式 */
					if (acceptExtensions != ""&& (!file.ext || acceptExtensions.indexOf(file.ext
									.toLowerCase()) == -1)) {
						showError('not_allow_type');
						uploader.removeFile(file);
					}
				}

				//进度状态
				file.on('statuschange', function(cur, prev) {
					 
					if (prev === 'progress') {
						$prgress.hide().width(0);
					} else if (prev === 'queued') {
						// $li.off('mouseenter mouseleave');
						// $btns.remove();
					}
					// 成功
					if (cur === 'error' || cur === 'invalid') {
						showError(file.statusText);
						percentages[file.id][1] = 1;
					} else if (cur === 'interrupt') {
						showError('interrupt');
					} else if (cur === 'queued') {
						percentages[file.id][1] = 0;
					} else if (cur === 'progress') {
						$info.hide();
						$prgress.css('display', 'block');
					} else if (cur === 'complete') {
					} else if (cur == 'cancelled') {
						$prgress.hide();
					}

					$li.removeClass('state-' + prev).addClass('state-' + cur);
				});

				$li.on('mouseenter', function() {
					$btns.stop().animate({
						height : 30
					});
				});
				$li.on('mouseleave', function() {
					$btns.stop().animate({
						height : 0
					});
				});

				$btns.on('click','span',function() {
					 
						var index = $(this).index(), deg;
								switch (index) {
									case 0:
										uploader.removeFile(file, true);
										return;
									case 1:
										file.rotation += 90;
										break;
									case 2:
										file.rotation -= 90;
										break;
								}

								if (supportTransition) {
									deg = 'rotate(' + file.rotation
											+ 'deg)';
									$wrap.css({
										'-webkit-transform' : deg,
										'-mos-transform' : deg,
										'-o-transform' : deg,
										'transform' : deg
									});
								} else {
									$wrap.css('filter',
													'progid:DXImageTransform.Microsoft.BasicImage(rotation='
															+ (~~((file.rotation / 90) % 4 + 4) % 4)
															+ ')');
								}

							});

				$li.insertBefore($filePickerBlock);
				uploader.upload();
			}

			// 负责view的销毁
			function removeFile(file) {
				fileCount--;
				fileSize -= file.size;
				deleteRemoteFile(file);
				delete percentages[file.id];
				file.setStatus(File.cancelled, "cancelled")
				updateTotalProgress();
				var $li = $('#' + file.id);
				$li.off().find('.file-panel').off().end().remove();
				// 删除上传成功的
			}

			// 删除远程的附件
			function deleteRemoteFile(file) {
				var fileId = file._fileId;
				if (!fileId)
					return;
				// 删除数组
				_this.fileList = _this.removeAry(_this.fileList, pkField,
						fileId);

				$.ajax({
					type : "POST",
					url : __ctx + "/components/upload/delete.htm?deleteIds="
							+ fileId,
					dataType : "json",
					success : function(data) {

					},
					error : function(e) {
					}
				});
			}
			// 更新进度
			function updateTotalProgress() {
				 
				var loaded = 0, total = 0, spans = $progress.children(), percent;

				$.each(percentages, function(k, v) {
					total += v[0];
					loaded += v[0] * v[1];
				});

				percent = total ? loaded / total : 0;

				spans.eq(0).text(Math.round(percent * 100) + '%');
				spans.eq(1).css('width', Math.round(percent * 100) + '%');
				updateStatus();
			}

			// 设置状态
			function setState(val, files) {
				 
				if (val != state) {
					var stats = uploader.getStats();

					$upload.removeClass('state-' + state);
					$upload.addClass('state-' + val);

					switch (val) {

					/* 未选择文件 */
					case 'pedding':
						// $queue.addClass('element-invisible');
						// $statusBar.addClass('element-invisible');
						$placeHolder.removeClass('element-invisible');
						$delUploadBtn.addClass('disabled')
						$progress.hide();
						$info.hide();
						uploader.refresh();
						break;

					/* 可以开始上传 */
					case 'ready':
						$placeHolder.addClass('element-invisible');
						$queue.removeClass('element-invisible');
						$statusBar.removeClass('element-invisible');
						$progress.hide();
						$info.show();
						$upload.text("全部上传");
						uploader.refresh();
						break;

					/* 上传中 */
					case 'uploading':
						$progress.show();
						$info.hide();
						$upload.text("暂停上传");
						break;

					/* 暂停上传 */
					case 'paused':
						$progress.show();
						$info.hide();
						$upload.text("继续上传");
						break;

					case 'confirm':
						$progress.show();
						$info.hide();
						$delUploadBtn.removeClass('disabled')
						$upload.text("全部上传");

						stats = uploader.getStats();
						if (stats.successNum && !stats.uploadFailNum) {
							setState('finish');
							return;
						}
						break;

					case 'finish':
						$progress.hide();
						$info.show();
						if (stats.uploadFailNum) {
							$upload.text("重试上传");
						} else {
							$upload.text("全部上传");
						}
						break;
					}
					
					state = val;
					updateStatus();
				}

				if (!_this.getQueueCount()) {
					$upload.addClass('disabled')
				} else {
					$upload.removeClass('disabled')
				}

			}

			// 更新状态
			function updateStatus() {
				 
				var text = '', stats;
				if (state === 'ready') {
					text = "选中_个文件，共_KB。".replace('_', fileCount).replace(
							'_KB', WebUploader.formatSize(fileSize));
				} else if (state === 'confirm') {
					stats = uploader.getStats();
					if (stats.uploadFailNum) { 
						text = "已成功上传_个文件，_个文件上传失败".replace('_',
								stats.successNum).replace('_', stats.successNum);
					}
				} else {
					stats = uploader.getStats();
					text = '共_个(_KB)，_个成功上传'.replace('_', fileCount).replace(
							'_KB', WebUploader.formatSize(fileSize)).replace(
							'_', stats.successNum - stats.cancelNum);

					if (stats.uploadFailNum) {
						text += "，_张上传失败。".replace('_', stats.uploadFailNum);
					}
				}
				$info.html(text);
			}

			/**
			 * 当文件被加入队列以后触发。
			 */
			uploader.on('fileQueued', function(file) {
				 
				fileCount++;
				fileSize += file.size;

				if (fileCount === 1) {
					$placeHolder.addClass('element-invisible');
					$statusBar.show();
				}
				addFile(file);
			});
			/**
			 * 当文件被移除队列后触发
			 */
			uploader.on('fileDequeued', function(file) {
				removeFile(file);
				updateTotalProgress();
			});

			/**
			 * 当一批文件添加进队列以后触发。
			 */
			uploader.on('filesQueued', function(file) {
				 
				if (!uploader.isInProgress()
						&& (state == 'pedding' || state == 'finish'
								|| state == 'confirm' || state == 'ready')) {
					setState('ready');
				}
				updateTotalProgress();
			});

			uploader.on('all', function(type, files) {
				switch (type) {
				case 'uploadFinished':
					setState('confirm', files);
					break;
				case 'startUpload':
					setState('uploading', files);
					break;
				case 'stopUpload':
					setState('paused', files);
					break;
				}
			});

			uploader.on('uploadBeforeSend', function(file, data, header) {
				// 这里可以通过data对象添加POST参数
				header['X_Requested_With'] = 'XMLHttpRequest';
			});

			uploader.on('uploadProgress', function(file, percentage) {
				var $li = $('#' + file.id), $percent = $li.find('.progress span');

				$percent.css('width', percentage * 100 + '%');
				percentages[file.id][1] = percentage;
				updateTotalProgress();
			});

			// 上传后处理
			uploader.on('uploadSuccess', function(file, ret) {
				if (!ret) 
					return;
			});

			uploader.on('uploadError', function(file, code) {
			});
			uploader.on('error', function(code, file, file1) {
				switch (code) {
				case "Q_EXCEED_NUM_LIMIT":
					DialogUtil.msg("文件上传数量的超出限制");
					break;
				case "F_EXCEED_SIZE":
					DialogUtil.msg("“" + file1.name + "” 文件大小超出");
					break;
				case "F_DUPLICATE":
					DialogUtil.msg("重复上传文件！");
					break;
				default:
					break;
				}
			});
			uploader.on('uploadComplete', function(file, ret) {
				console.info(file);
			});
			// 上传处理
			$upload.on('click', function() {
				if ($(this).hasClass('disabled')) {
					return false;
				}
				if (state === 'ready') {
					uploader.upload();
				} else if (state === 'paused') {
					uploader.upload();
				} else if (state === 'uploading') {
					uploader.stop();
				}
			});

			$upload.addClass('state-' + state);
			// 删除处理
			$delUploadBtn.on('click', function() {
				if ($(this).hasClass('disabled')) {
					return false;
				}
				var i, files = uploader.getFiles('complete');
				if (files.length == 0) {
					return false;
				}
				DialogUtil.confirm("是否删除所有的文件？", "提示信息", function(rtn) {
					if (rtn) {
						for (i = 0; file = files[i++];) {
							uploader.removeFile(file, true);
						}
					}
				});
			});
			updateTotalProgress();
			
			
		},
		getQueueCount : function() {
			var file, i, status, readyFile = 0, files = this.uploader
					.getFiles();
			for (i = 0; file = files[i++];) {
				status = file.getStatus();
				if (status == 'inited' || status == 'queued'
						|| status == 'uploading' || status == 'progress')
					readyFile++;
			}
			return readyFile;
		},
		removeAry : function(ary, objPropery, objValue) {
			return $.grep(ary, function(cur, i) {
				return cur[objPropery] != objValue;
			});
		},
		getFileList : function() {
			var i, data, list = [];

			for (i = 0; i < this.fileList.length; i++) {
				data = this.fileList[i];
				list.push(data);
			}
			return list;
		},

		// /===========

		/* 获取表单数据 */
		getData : function() {
			var list = fileUpload.getFileList();
			if (list.length <= 0) {
				DialogUtil.msg("请上传文件！");
				return false;
			}
			var count = fileUpload.getQueueCount();
			if (count) {
				$('.info', '#queueList').html(
						'<span style="color:red;">'
								+ '还有_个未上传文件'.replace("_", count) + '</span>');
				return false;
			}
			var data = [];
			for (var i = 0, c; c = list[i++];) {
				var o = {
					fileName : c.fileName + "." + c.ext,
					id : c.id
				};
				data.push(o);
			}
			return data;
		},
		initConfirm : function() {
			var selectTab = $("div.tab-pane.active").attr("id");
			var list = [];
			if (selectTab == 'upload_tab') {
				list = fileUpload.getData();
			} else {
				list = onlineFile.getData();
			}
			return list;
		}
	};

	/* ========================= 在线附件========================== */
	OnlineFile = function(params) {
		this.params = params ? params : {};
	}
	OnlineFile.prototype = {
		constant : {
			fileManagerListSize : 20
		},
		init : function(target) {
			this.container = target.constructor == String ? $('#' + target)
					: $(target);
			this.initEvents();
			this.initData();
		},

		/* 初始化滚动事件,滚动到地步自动拉取数据 */
		initEvents : function() {
			var _this = this;
		},
		/* 初始化第一次的数据 */
		initData : function() {
			/* 拉取数据需要使用的值 */
			this.state = 0;
			this.listSize = this.constant.fileManagerListSize;
			this.listIndex = 0;
			this.pageIndex = 1;
			this.listEnd = false;

			/* 第一次拉取数据 */
			this.getFileData();
			this.initButton();
		},
		/* 向后台拉取附件列表数据 */
		getFileData : function() {
			// 加载数据
			this.loadFileData();
		},
		loadFileData : function(curr,rows) {
			var _this = this;
			$.getJSON(__ctx + "/platform/file/attachment/listJsonByUser.htm", {
				page : curr || 1, // 向服务端传的参数
				rows :  rows || 20, 
				"Q^file_name_^SL" : $("#fileName").val()
			}, function(data) {
				_this.pushData(data.rows);
				// 显示分页
				laypage({
					cont : 'filePage', // 容器。
					 pages: data.total, //通过后台拿到的总页数
	                records: data.records, //记录数
	                rows:rows,
	                curr: 	curr, //当前页
	                skip: true, //是否开启跳页
					jump : function(obj, first) { // 触发分页后的回调
						if (!first) { // 点击跳页触发函数自身，并传递当前页：obj.curr
							_this.loadFileData(obj.curr,obj.rows);
						}
					}
				});
			});
		},
		initButton : function() {
			var me = this, fileFormates = this.params.fileFormates || '', // 允许上传类型
			maxUploadNum = this.params.maxUploadNum, maxUploadSize = this.params.maxUploadSize, selectNum = 0;
			this.container
					.on("click", "li[data-url]",
							function() {
								var _this = $(this), isSel = _this
										.hasClass("selected"), size = _this
										.data("size"), ext = _this.data("ext");
								// 上传大小
								if ($.isNotEmpty(maxUploadSize)
										&& size > maxUploadSize) {
									DialogUtil.msg("该文件大小的超出上传限制！");
									return;
								}
								// 上传格式
								if (fileFormates != ""
										&& (!ext || fileFormates.indexOf(ext
												.toLowerCase()) == -1)) {
									DialogUtil.msg("选择该文件格式不允许！");
									return;
								}
								if (isSel) {
									_this.removeClass("selected");
									selectNum--;
								} else {
									if (selectNum >= maxUploadNum) {
										var li = _this.parent().find(
												"li.selected");
										if (li.length > 0) {
											$(li[0]).removeClass("selected");
											selectNum--;
										}
									}
									selectNum++;
									_this.addClass("selected");
								}
							});

			$("#search").click(function() {
				me.loadFileData();
			});

			$("#fileName").keydown(function(e) {
				if (e.keyCode == 13) {// 回车
					e.preventDefault();
					me.loadFileData();
				} else if (e.keyCode == 27) {// ESC
					e.preventDefault();
				}
			});

		},
		/* 添加附件到列表界面上 */
		pushData : function(list) {
			var i, item, items = [], img, filetype, preview, icon, _this = this;

			this.container.empty();

			for (i = 0; i < list.length; i++) {
				var fileObj = list[i];
				if (fileObj && fileObj.filePath) {
					item = $("<li></li>");
					icon = $("<span></span>");
					filetype = fileObj.ext;//

					if ("png|jpg|jpeg|gif|bmp".indexOf(filetype) != -1) {//
						preview = $("<img></img>");
						preview.width(113);
						var url = __ctx + "/components/upload/getFile.htm?id="
								+ fileObj.id + '&noCache='
								+ (new Date()).toString(36);
						preview.attr('src', url);
						item.append(preview);
						$("body").on(
								'load',
								preview,
								(function(image) {
									_this.scale(image, image.parent()
											.innerWidth(), image.parent()
											.innerWidth());
								})(preview));
					} else {
						var ic = $("<i></i>"), textSpan = $("<span></span>"), preview = $("<div></div>");
						textSpan.text(fileObj.fileName + "." + filetype);
						preview.append(ic);
						preview.append(textSpan);
						preview.addClass('file-wrapper');
						textSpan.addClass('file-title');
						ic.addClass('file-type-' + filetype + "  file-preview");
						item.append(preview);
					}
					icon.addClass('icon');
					item.attr('data-url',  fileObj.filePath);
					item.attr('data-title', fileObj.fileName);
					item.attr('title', fileObj.fileName + "." + filetype);
					item.attr('data-id', fileObj.id);
					item.attr('data-ext', filetype);
					item.attr('data-size', fileObj.totalBytes);
					item.append(icon);
					items.push(item);
					// this.clearFloat.before(item);
				}
			}
			_this.initContainer(items);
		},
		/* 初始化容器 */
		initContainer : function(items) {
			this.container.innerHTML = '';
			var list = $("<ul></ul>").addClass("onlineList"), clearFloat = $(
					"<li></li>").addClass("clearFloat");
			for (i = 0; i < items.length; i++) {
				list.append(items[i]);
			}
			list.append(clearFloat);
			this.container.append(list);
		},

		/* 改变图片大小 */
		scale : function(img, w, h, type) {
			var ow = img.width, oh = img.height;

			if (type == 'justify') {
				if (ow >= oh) {
					img.width = w;
					img.height = h * oh / ow;
					// img.style.marginLeft = '-' + parseInt((img.width - w) /
					// 2) + 'px';
					var val = '-' + parseInt((img.width - w) / 2) + 'px';
					img.css("marginLeft", val);
				} else {
					img.width = w * ow / oh;
					img.height = h;
					// img.style.marginTop = '-' + parseInt((img.height - h) /
					// 2) + 'px';
					var val = '-' + parseInt((img.height - h) / 2) + 'px';
					img.css("marginTop", val);
				}
			} else {
				if (ow >= oh) {
					img.width = w * ow / oh;
					img.height = h;
					// img.style.marginLeft = '-' + parseInt((img.width - w) /
					// 2) + 'px';
					var val = '-' + parseInt((img.width - w) / 2) + 'px';
					img.css("marginLeft", val);
				} else {
					img.width = w;
					img.height = h * oh / ow;
					// img.style.marginTop = '-' + parseInt((img.height - h) /
					// 2) + 'px';
					var val = '-' + parseInt((img.height - h) / 2) + 'px';
					img.css("marginTop", val);
				}
			}
		},
		getData : function() {
			var i, selecteds = this.container.find("li.selected"), list = [];
			if (selecteds.length <= 0) {
				DialogUtil.msg("请选择文件！");
				return;
			}
			for (i = 0; i < selecteds.length; i++) {
				var lisObj = $(selecteds[i]), title = lisObj.attr('data-title'), ext = lisObj
						.attr('data-ext'), id = lisObj.attr('data-id');
				list.push({
					fileName : title + ($.isEmpty(ext) ? "" : ("." + ext)),
					id : id
				});
			}
			return list;
		}
	};

})();
