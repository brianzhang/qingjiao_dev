
package com.lc.ibps.bishe.oldFile.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bishes.oldFile.domain.OldFile;
import com.lc.ibps.bishes.oldFile.persistence.entity.OldFilePo;
import com.lc.ibps.bishes.oldFile.repository.OldFileRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;

import net.sf.json.JSONObject;


/**
 * t_oldfile 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-29 16:49:23
 *</pre>
 */
@Controller
@RequestMapping("/bishe/oldFile/oldFile/")
public class OldFileController extends GenericController{
	@Resource
	private OldFileRepository oldFileRepository;
	@Resource
	UrlZhiYuanRepository urlZhiYuanRepository;
	
	/**
	 * 【t_oldfile】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		String id = RequestUtil.getString(request,"id" );
		String type = RequestUtil.getString(request,"type" );
		String xh =urlZhiYuanRepository.get(id).getXh();
		String whereSql="";
		if(type.equals("0")) {
			 whereSql="XH='"+xh+"'AND FILECATEGORY='"+"任务书'";
		}else if (type.equals("3")){
			whereSql="XH='"+xh+"'AND FILECATEGORY='"+"正常论文'";
		}else if (type.equals("4")){
			whereSql="XH='"+xh+"'AND FILECATEGORY='"+"匿名论文'";
		} else {
			whereSql="XH='"+xh+"'AND FILECATEGORY='"+"开题报告'";
		}
		
		queryFilter.addParamsFilter("whereSql", whereSql);
		PageList<OldFilePo> oldFileList=(PageList<OldFilePo>)oldFileRepository.query(queryFilter);
		return new PageJson(oldFileList);
	}
	
	@RequestMapping("list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		String type = RequestUtil.getString(request,"type" );
		return getAutoView().addObject("id", id).addObject("returnUrl", preUrl).addObject("type", type);
	}
	
	/**
	 * 编辑【t_oldfile】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		OldFilePo oldFile=null;
		if(StringUtils.isNotEmpty(id)){
			oldFile=oldFileRepository.get(id);
		}
		return getAutoView().addObject("oldFile", oldFile).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_oldfile】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("flowEdit")
	public ModelAndView flowEdit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		OldFilePo oldFile=null;
		if(StringUtils.isNotEmpty(id)){
			oldFile=oldFileRepository.get(id);
		}
		return getAutoView().addObject("oldFile", oldFile).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_oldfile】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		OldFilePo oldFile=null;
		if(StringUtils.isNotEmpty(id)){
			oldFile=oldFileRepository.get(id);
		}
		return getAutoView().addObject("oldFile", oldFile).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_oldfile】信息
	 *
	 * @param request
	 * @param response
	 * @param
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			OldFilePo oldFilePo = getFromRequest(request);
			//构造领域对象和保存数据
			OldFile oldFile =oldFileRepository.newInstance(oldFilePo);
			oldFile.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_oldfile成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_oldfile操作失败,"+e.getMessage());
			logger.error("对t_oldfile操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private OldFilePo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		OldFilePo oldFilePo = getOldFilePo(jsonObj);

		return oldFilePo;
	}
	
	/** 
	 * 获取t_oldfile数据
	 *
	 * @param jsonObj
	 */
	private OldFilePo getOldFilePo(JSONObject jsonObj){
		OldFilePo oldFilePo = (OldFilePo) JsonUtil.getDTO(jsonObj.toString(), OldFilePo.class);
		return oldFilePo;
	}
	
	
	/**
	 *  批量删除【t_oldfile】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			//获得待删除的id
			String[] ids=RequestUtil.getStringAryByStr(request, "id");
			//构造领域对象和保存数据
			OldFile oldFile =oldFileRepository.newInstance();
			oldFile.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_oldfile成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_oldfile失败，" + e.getMessage());
			logger.error("删除t_oldfile失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
