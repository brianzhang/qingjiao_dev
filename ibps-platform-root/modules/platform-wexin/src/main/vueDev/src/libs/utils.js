import {
	webapiUrl,
  secretId,
  corpId
} from '../config/base';

var qs = require('qs');

/**
 * 获得地址栏的某个参数
 * @param  element
 * @return
 */
var getQueryString = function(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

/**
 * 获取微信认证方式获取token和账号等信息
 * @param   http     axios实例
 * @return
 */
var getAccount = function(http,code,callback) {
	// var account = localStorage.getItem("account");
	// console.log("utils:"+account);
	// if(account){
	// 	return account;
	// }else{
		http.post(webapiUrl+"/loginService/wcLogin",
		qs.stringify({"code":code,"corpid":corpId,"corpsecret":secretId}),{
			herders: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			responseType: 'json',
		})
		.then(function(response){
			if(response.status==200){
				console.log("login success : ");
				console.log(response);
				var account = response.data.data;
				localStorage.setItem("account",account);
				callback(account);
				return account;
			}
			return '';
		})
		.catch(function(error){
			console.log(error);
			return '';
		})

	// }

}

Array.prototype.del=function(n) {　//n表示第几项，从0开始算起。
//prototype为对象原型，注意这里为对象增加自定义方法的方法。
　if(n<0)　//如果n<0，则不进行任何操作。
return this;
　else
return this.slice(0,n).concat(this.slice(n+1,this.length));
/*
　concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
 组成的新数组，这中间，刚好少了第n项。
　slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
*/
}

var deleteObject = function(arr, index){
	return arr.del(index);
}

var removeObj = function (_arr,_obj) {
    var length = _arr.length;
    for(var i = 0; i < length; i++)
    {
        if(_arr[i] == _obj)
        {
            if(i == 0)
            {
                _arr.shift(); //删除并返回数组的第一个元素
                return;
            }
            else if(i == length-1)
            {
                _arr.pop();  //删除并返回数组的最后一个元素
                return;
            }
            else
            {
                _arr.splice(i,1); //删除下标为i的元素
                return;
            }
        }
    }
};

var setHead = function(title){
	document.title=title?title:"广州流辰信息技术有限公司";
}

var getFileNames = function(json){
	if(!json){
		return [];
	}
	let fileAttach = JSON.parse(json);
	let files = [];
	for (var i = 0; i < fileAttach.length; i++) {
		if (fileAttach[i] instanceof Array) {
			for (var j = 0; j < fileAttach[i].length; j++) {
				files.push(fileAttach[i][j].fileName);
			}
		}else{
			files.push(fileAttach[i].fileName);
		}
	}
	return files;
}


export {
  getQueryString,
  getAccount,
	removeObj,
	getFileNames
}
