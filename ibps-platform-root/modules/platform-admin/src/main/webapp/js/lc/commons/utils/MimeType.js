/**
 * 互联网媒体类型
 */
MimeType = {
	FILE_TYPES : {
		"images" : [ "bmp","gif","jpg","jpeg","png","psd","tif","tiff" ],
		"videos" : [ "mkv","mp4","avi","swf","wmv","rmvb","mov","mpg"],
		"audios" : ["mp3","flac","ape","wma","wav","aac","m4a","au","ram","mmf","ai" ],
		"docs" : [ "doc", "docx", "pdf", "rtf", "txt", "csv", "xls", "xlsx",
				"ppt", "pptx" ],
		"compress" : [ "rar", "zip", "7z", "gz", "arj", "z" ]
	},
	ACCEPT : {
		"images" : {
			title : 'Images',
			extensions : 'bmp,gif,jpg,jpeg,png,psd,tif,tiff',
			mimeTypes : '.bmp,.gif,.jpg,.jpeg,.png,.psd,.tif,.tiff'
		},
		"videos" : {
			title : 'Videos',
			extensions : 'mkv,mp4,avi,swf,wmv,rmvb,mov,mpg',
			mimeTypes : '.mkv,.mp4,.avi,.swf,.wmv,.rmvb,.mov,.mpg'
		},
		"audios" : {
			title : 'Audios',
			extensions : 'mp3,flac,ape,wma,wav,aac,m4a,au,ram,mmf,ai',
			mimeTypes : '.mp3,.flac,.ape,.wma,.wav,.aac,.m4a,.au,.ram,.mmf,.ai'
		},
		"docs" : {
			title : 'Docs',
			extensions : 'doc,docx,pdf,rtf,txt,csv,xls,xlsx,ppt,pptx',
			mimeTypes : '.doc,.docx,.pdf,.rtf,.txt,.csv,.xls,.xlsx,.ppt,.pptx'
		},
		"compress" : {
			title : 'Compress',
			extensions : 'rar,zip,7z,gz,arj,z',
			mimeTypes:'.rar,.zip,.7z,.gz,.arj,.z'
		}

	},
}