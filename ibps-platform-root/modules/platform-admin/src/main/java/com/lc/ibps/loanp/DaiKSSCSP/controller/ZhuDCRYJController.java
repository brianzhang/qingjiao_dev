
package com.lc.ibps.loanp.DaiKSSCSP.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.loans.DaiKSSCSP.repository.ZhuDCRYJRepository;
import com.lc.ibps.loans.daikuanInfo.persistence.entity.DaiKuanShenQingInfoPo;
import com.lc.ibps.loans.daikuanInfo.repository.DaiKuanShenQingInfoRepository;
import com.lc.ibps.platform.script.script.ScriptImpl;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.entity.XinDaiLiuChengPo;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.repository.XinDaiLiuChengRepository;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.ZhuDCRYJPo;
import com.lc.ibps.loans.DaiKSSCSP.domain.ZhuDCRYJ;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_zdcryj 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:34:46
 *</pre>
 */
@Controller
@RequestMapping("/loanp/DaiKSSCSP/zhuDCRYJ/")
public class ZhuDCRYJController extends GenericController{
	@Resource
	ZhuDCRYJRepository zhuDCRYJRepository;
	@Resource
	XinDaiLiuChengRepository xinDaiLiuChengRepository;
	@Resource
	DaiKuanShenQingInfoRepository daiKuanShenQingInfoRepository;
	@Resource
	ScriptImpl  scriptImpl;
	
	/**
	 * 【t_zdcryj】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<ZhuDCRYJPo> zhuDCRYJList=(PageList<ZhuDCRYJPo>)zhuDCRYJRepository.query(queryFilter);
		return new PageJson(zhuDCRYJList);
	}
	
	/**
	 * 编辑【t_zdcryj】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String Jdid = RequestUtil.getString(request, "jdid");
		XinDaiLiuChengPo po =xinDaiLiuChengRepository.get(Jdid);
		DaiKuanShenQingInfoPo daiKuanShenQingInfo=daiKuanShenQingInfoRepository.getByJdId(Jdid);
		String jkrlxfs = daiKuanShenQingInfo.getLxrsjh();
		String JieKuanRen = po.getCustomer();
		String zdcrqm = scriptImpl.getCurrentName();
//		String DanBaofangShi = "方式1";
//		String DaikuanFanghi = "个人";
		String GuihuanFanghi = "现金";
//		String zdcrqm = "李敏";
		ZhuDCRYJPo zhuDCRYJ=null;
		if(StringUtil.isNotEmpty(Jdid)){
			zhuDCRYJ=zhuDCRYJRepository.getByJdid(Jdid);
		}
		if(zhuDCRYJ==null){
			zhuDCRYJ = new ZhuDCRYJPo();
			zhuDCRYJ.setJkrmc(JieKuanRen);
			zhuDCRYJ.setJkrlxfs(jkrlxfs);
//			zhuDCRYJ.setDbfs(DanBaofangShi);
			zhuDCRYJ.setGhfs(GuihuanFanghi);
			zhuDCRYJ.setJdid(Jdid);
			//zhuDCRYJ.setZdcrid(zdcrid);主调查人id
			zhuDCRYJ.setZdcrqm(zdcrqm);//主调查人姓名
		}
		return getAutoView().addObject("zhuDCRYJ", zhuDCRYJ).addObject("Jdid", Jdid).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 编辑【t_zdcryj】信息页面
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
		ZhuDCRYJPo zhuDCRYJ=null;
		if(StringUtil.isNotEmpty(id)){
			zhuDCRYJ=zhuDCRYJRepository.get(id);
		}
		return getAutoView().addObject("zhuDCRYJ", zhuDCRYJ).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_zdcryj】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String jdid=RequestUtil.getString(request, "jdid");
		//String Jdid = "336565123424452608";
		ZhuDCRYJPo zhuDCRYJ=null;
		zhuDCRYJ=zhuDCRYJRepository.getByJdid(jdid);
		return getAutoView().addObject("zhuDCRYJ", zhuDCRYJ).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_zdcryj】信息
	 *
	 * @param request
	 * @param response
	 * @param  zhuDCRYJ
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			ZhuDCRYJPo zhuDCRYJPo = getFromRequest(request);
			//构造领域对象和保存数据
			ZhuDCRYJ zhuDCRYJ =zhuDCRYJRepository.newInstance(zhuDCRYJPo);
			zhuDCRYJ.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "操作失败,"+e.getMessage());
			logger.error("操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private ZhuDCRYJPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		ZhuDCRYJPo zhuDCRYJPo = getZhuDCRYJPo(jsonObj);

		return zhuDCRYJPo;
	}
	
	/** 
	 * 获取t_zdcryj数据
	 *
	 * @param jsonObj
	 */
	private ZhuDCRYJPo getZhuDCRYJPo(JSONObject jsonObj){
		ZhuDCRYJPo zhuDCRYJPo = (ZhuDCRYJPo) JsonUtil.getDTO(jsonObj.toString(), ZhuDCRYJPo.class);
		return zhuDCRYJPo;
	}
	
	
	/**
	 *  批量删除【t_zdcryj】记录
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
			ZhuDCRYJ zhuDCRYJ =zhuDCRYJRepository.newInstance();
			zhuDCRYJ.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_zdcryj成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_zdcryj失败，" + e.getMessage());
			logger.error("删除t_zdcryj失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
