/**
 * 电子邮箱校验
 * @param val
 * @returns {Boolean}
 */
function isValidMail(val) {
	var Regex = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;
	if (Regex.test(val)) {
		return true;
	} else {
		if (val == "") {
			DialogUtil.toastr("请输入电子邮件地址！");
			return false;
		} else {
			DialogUtil.toastr("输入的电子邮件地址不正确，请重新输入！");
			return false;
		}
	}
}

/**
 * 整数校验
 * @param val
 * @returns {Boolean}
 */
function isValidDigits(val) {
	var Regex = /^\d+$/
	if (Regex.test(val)) {
		return true;
	} else {
		if (val == "") {
			DialogUtil.toastr("请输入整数！");
			return false;
		} else {
			DialogUtil.toastr("输入的整数不正确，请重新输入！");
			return false;
		}
	}
}

/**
 * 数字校验
 * @param val
 * @returns {Boolean}
 */
function isValidNumber(val) {
	var Regex = /^(-?\d+)(\.\d+)?$/
	if (Regex.test(val)) {
		return true;
	} else {
		if (val == "") {
			DialogUtil.toastr("请输入数字！");
			return false;
		} else {
			DialogUtil.toastr("输入的数字不正确，请重新输入！");
			return false;
		}
	}
}


/**
 * 特殊字符校验
 * @param val
 * @returns {Boolean}
 */
function containsSpecial(val){
	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
	if (pattern.test(val)) {
		return true;
	}
	
	return false;
}

/**
 * Key校验
 * @param val
 * @returns {Boolean}
 */
function isValidKey(val){
	var msg = "输入的Key不正确，格式：由数字字母下划线组成，以字母开头。请重新输入！";
	if(containsSpecial()){
		DialogUtil.toastr(msg);
		return false;
	}
	var Regex = /^\w+$/;
	if (Regex.test(val)) {
		return true;
	} else {
		if (val == "") {
			DialogUtil.toastr("请输入Key！");
			return false;
		} else {
			DialogUtil.toastr(msg);
			return false;
		}
	}
}

/**
 * 用户名校验
 * @param val
 * @returns {Boolean}
 */
function isValidAccount(val){
	if(containsSpecial()){
		DialogUtil.toastr("输入的账号不正确，格式：由数字字母组成，以字母开头，至少3位。请重新输入！");
		return false;
	}
	var Regex = /^[a-zA-z][A-Za-z0-9]{2,49}$/;
	if (Regex.test(val)) {
		return true;
	} else {
		if (val == "") {
			DialogUtil.toastr("请输入账号！");
			return false;
		} else {
			DialogUtil.toastr("输入的账号不正确，格式：由数字字母组成，以字母开头，至少3位。请重新输入！");
			return false;
		}
	}
}

/**
 * 手机校验
 * @param val
 * @returns {Boolean}
 */
function isValidMobil(val){
	var Regex = /^1[34578]\d{9}$/;
	if (Regex.test(val)) {
		return true;
	} else {
		if (val == "") {
			DialogUtil.toastr("请输入手机号码！");
			return false;
		} else {
			DialogUtil.toastr("输入手机号码不正确，请重新输入！");
			return false;
		}
	}
}

/**
 * QQ校验
 * @param val
 * @returns {Boolean}
 */
function isValidQQ(val){
	var Regex = /^[1-9]\d{4,9}$/;
	if (Regex.test(val)) {
		return true;
	} else {
		if (val == "") {
			DialogUtil.toastr("请输入QQ！");
			return false;
		} else {
			DialogUtil.toastr("输入的QQ不正确，请重新输入！");
			return false;
		}
	}
}