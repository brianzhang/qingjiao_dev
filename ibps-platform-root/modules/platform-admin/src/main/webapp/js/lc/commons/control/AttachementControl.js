/**
 * 附件管理。
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-02-26 15:07:33
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function(){
    AttachementControl = new AttachementControl();
    AttachementControl.init();  //初始化操作
});

(function() {

    var paths  = [
        "/js/lc/platform/dialog/common/UploadDialog.js",
        "/js/lc/commons/utils/MimeType.js"
    ];

    for (var i=0,pi;pi = paths[i++];) {
        document.write('<script type="text/javascript" src="'+ __ctx + pi +'"></script>');
    }

    AttachementControl = function() {
        //定义属性
        this.downloadUrl = __ctx +"/components/upload/download.htm?downloadId=";
        this.actionsTemplate ='<div class="actions file-actions pull-right  hidden" >'+
            ' <a class="rechoose-link"  data-toggle="file-rechoose" data-role="rechoose" href="javascript:void(0)">重新选择</a> | '+
            ' <a data-role="cancel" data-toggle="file-remove" class="delete-link" href="javascript:void(0)">删除</a>'+
            '</div>';

        this.readTemplate= ' <div class=\'fr-file\'  data-id="#fileId#"  data-name="#filename#">\n  <div class="preview-area pull-left">'+
            '<image src="'+__ctx+'/styles/commons/images/form/attachment.png"/></div>'+
            '<div class="status pull-left"><a href="'+this.downloadUrl+'#fileId#" target="_blank" class="file-name"  >#filename#</a></div></div>';

        this.template= ' <div class=\'fr-file\'  data-id="#fileId#"  data-name="#filename#">\n  <div class="preview-area pull-left">'+
            '<image src="'+__ctx+'/styles/commons/images/form/attachment.png"/></div>'+
            '<div class="status pull-left"><a href="'+this.downloadUrl+'#fileId#" target="_blank" class="file-name"  >#filename#</a></div>'+this.actionsTemplate
            +'</div>';

        this.addTemplate ='<div  class="file-select-trigger" data-toggle="file-upload">'+
            '<label>' +
            '<div class="plus">+</div> '+
            '<div class="select-text">   请选择上传文件</div>'+
            '</label>'+
            '</div>';
    };

    /**
     * 方法
     */
    AttachementControl.prototype = {

        /**
         * 初始化
         */
        init : function() {
            if (this.hasInit) // 是否已初始化
                return false;
            this.hasInit = true;

            this.initData();
            this.initActions();
        },
        initData:function(parent){
            var me = this;
            if(	$.isEmpty(parent))
                parent = $("div[name='div_attachment_container']");
            parent.each(function(){
                var self=$(this),
                    atta =$('textarea[data-control="attachment"]',self),
                    attas =me.getAttaVal(atta),
                    files=$("div.fr-files",self),
                    rights =self.data("rights")?self.data("rights"):"e";
                me.insertHtml(files,attas,rights);
                if(rights != 'r') self.append(me.addTemplate);
            });
        },
        /**
         * 获取附件的值
         */
        getAttaVal:function(atta){
            return $.isEmpty(atta.val())?[]: $.parseJSON(atta.val());
        },
        insertHtml:function(files,attas,rights){
            if($.isEmpty(attas))
                return;
            var html = this.getHtml(attas,rights);
            files.append($(html));
        },
        getHtml:function(data,rights){
            var str ="";
            debugger;
            for(var i=0,c;c=data[i++];){
                str+=this.getFileHtml(c,rights);
            }
            return str;
        },
        getFileHtml:function(file,rights){
            var t  = rights == 'r'?this.readTemplate:this.template;
            return t.replaceAll("#fileId#", file.id).replaceAll("#filename#",file.fileName);
        },
        initActions:function(){
            var me = this;
            // 附件事件
            $(document).on("mouseenter", ".fr-file:not(.error)", function() {
                return $(this).find(".file-actions").removeClass("hidden");
            });

            $(document).on("mouseleave", ".fr-file:not(.error)", function() {
                return $(this).find(".file-actions").addClass("hidden");
            });

            //上传
            $(document).on("click", "[data-toggle='file-upload']", function() {
                var _this = $(this),
                    parent = _this.closest("div[name='div_attachment_container']"),
                    files = $("div.fr-files",parent),
                    params = parent.data(),
                    atta=  $('textarea[data-control="attachment"]',parent),
                    cost = $('#cost' , parent).val();
                me.upload(files,atta,params,false,_this,cost);
            });

            $(document).on("click", "[data-toggle='file-prevrew']", function() {
                var _this = $(this),
                    parent = _this.closest("div[name='div_attachment_container']"),
                    params = parent.data(),
                    files = $("div.fr-files",parent),
                    file =  _this.closest("div.fr-file"),
                    atta=  $('textarea[data-control="attachment"]',parent);

            });

            //重选
            $(document).on("click", "[data-toggle='file-rechoose']", function() {
                var _this = $(this),
                    parent = _this.closest("div[name='div_attachment_container']"),
                    params = parent.data(),
                    files = $("div.fr-files",parent),
                    file =  _this.closest("div.fr-file"),
                    atta=  $('textarea[data-control="attachment"]',parent);
                cost = $('#cost').val();
                me.upload(files,atta,params,true,file,cost);
            });

            //删除
            $(document).on("click", "[data-toggle='file-remove']", function() {
                var _this = $(this),
                    parent = _this.closest("div[name='div_attachment_container']"),
                    params = parent.data(),
                    file =  _this.closest("div.fr-file"),
                    files = $("div.fr-files",parent),
                    atta=  $('textarea[data-control="attachment"]',parent),
                    fileUpload =   $('[data-toggle="file-upload"]',parent);
                me.remove(files,atta,params,file,fileUpload);
            });
        },
        /**
         * 上传
         *
         */
        upload:function(files,atta,params,isRechoose,file,cost){
            var me = this,
                //附件值
                attas =$.isEmpty(atta.val())?[]: $.parseJSON(atta.val()),
                // 最多上传个数
                maxFiles =  isRechoose?1: this.getMaxFiles(params.max_file_quantity,attas.length),
                // 文件格式
                fileFormates =(fileFormates =( this.getAcceptedExtensions(params.media_type,params.media)||[]).join(","))?fileFormates:null,
                //指定接受哪些类型的文件
                accept = this.getAccept(params.media_type,params.media),
                // 文件尺寸
                maxUploadSize = this.getMaxSize(params.max_file_quantity);

            if(!isRechoose && maxFiles<=0){//新增
                DialogUtil.msg("超出最多上传个数");
                return;
            }
            new UploadDialog({
                fileFormates:fileFormates,
                maxUploadSize:maxUploadSize,
                maxUploadNum:maxFiles,
                accept:accept,
                callback:function(data){
                    if(cost == '1'){
                        var jobStdId = $('#jobStdId').val() , url = '/gradp/course/jobStd/saveUploadFile.htm?file='+encodeURI(encodeURI(JSON.stringify(data[0])))+'&fileId='+data[0].id+'&jobStdId='+jobStdId;
                        $.post( url , function(msg){
                            DialogUtil.msg(msg);
                            options.data[page.curPage - 1]['file'] =  JSON.stringify(data[0]);
                            options.data[page.curPage - 1]['reUp'] = 1;
                            page.init(options.data.length, page.curPage , options) ;
                        })
                    }else if(cost == '2'){//教师上传模板
                        var  jobStdId = $('#jobStdId').val() ,url = '/gradp/course/crsJob/saveTemplateFile.htm?file='+encodeURI(encodeURI(JSON.stringify(data[0])))+'&jobStdId='+jobStdId;
                        $.post( url , function(msg){
                            DialogUtil.msg(msg);
                            options.data[page.curPage - 1]['templateFile'] =  JSON.stringify(data[0]);
                            page.init(options.data.length, page.curPage , options) ;
                        })
                    }
                    if(isRechoose){//重选
                        var  idx = files.find("div.fr-file").index(file);
                        data1 =data[0];//多选只取第一个
                        attas.splice(idx,1,data1);
                        file.replaceWith(me.getFileHtml(data1));
                    }else{ //新增
                        attas = attas.concat(data);
                        var html = me.getHtml(data);
                        files.append($(html));
                        var x =	maxFiles-data.length;
                        if(x <=0){
                            file.hide();
                        }
                    }
                    atta.val(JSON2.stringify(attas));
                }
            }).show();
        },
        // 最大上传个数
        getMaxFiles: function(maxFiles,length) {
            if (maxFiles && maxFiles !='-1') {
                return maxFiles - (length?length:0);
            } else {
                return 9999999999999999;
            }
        },
        // 最大上传文件尺寸
        getMaxSize: function(maxSize) {
            if ($.isEmpty(maxSize)) {
                return  parseInt(maxSize,10)*1024*1024;
            } else {
                return 100 *1024*1024;
            }
        },
        getAcceptedExtensions:function(mediaType,media){
            if($.isEmpty(mediaType))
                return [];
            var x;
            if(x = MimeType.FILE_TYPES[mediaType]){
                if (x) {
                    return _.map(x, function(x) {
                        return "." + x;
                    });
                }
            }else{
                return (media||"").split(",");
            }
        },
        getAccept:function(mediaType,media){
            if($.isEmpty(mediaType))
                return null;
            var x;
            if(x = MimeType.ACCEPT[mediaType]){
                return x;
            }else{
                return {
                    title: '自定义',
                    extensions: media,
                    mimeTypes: media
                };
            }
        },
        /**
         * 删除
         */
        remove:function(files,atta,params,file,fileUpload){
            var  idx = files.find("div.fr-file").index(file),
                attas =$.isEmpty( atta.val())?[]: $.parseJSON(atta.val());

            attas.splice(idx, 1);

            // 最多上传个数
            var	maxFiles = this.getMaxFiles(params.max_file_quantity,attas.length);
            if( maxFiles>0)
                fileUpload.show();

            atta.val(JSON2.stringify(attas));
            file.remove();
        }
    };
})();
