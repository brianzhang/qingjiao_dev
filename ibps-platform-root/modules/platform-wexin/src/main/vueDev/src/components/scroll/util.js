/**
 * 获取滚动位置信息
 * @param  element
 * @return
 */
var getScrollTop = function(e){
  if(e){
    return e.scrollTop;
  }else{
    return document.documentElement.scrollTop;
  }
}

/**
 * 获取可视高度
 * @param  element
 * @return
 */
var getVisibleHeight = function(e){
  if(e){
    return e.offsetHeight;
  }else{
    return document.documentElement.offsetHeight;
  }
}

/**
 * 获取滚动区域的高度信息
 * @param  element
 * @return
 */
var getScrollHeight = function(e){
  if(e){
    return e.scrollHeight;
  }else{
    return document.documentElement.scrollHeight;
  }
}

export {
  getScrollTop,
  getVisibleHeight,
  getScrollHeight
}
