
package com.lc.ibps.lyzygl.DanWeiGK.controller;

import java.util.List;

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
import com.lc.ibps.lyzygls.DanWeiGK.repository.DanWeiGKRepository;
import com.lc.ibps.lyzygls.DiChuPY.persistence.entity.DiChuPYPo;
import com.lc.ibps.lyzygls.DiChuPY.repository.DiChuPYRepository;
import com.lc.ibps.lyzygls.DiChuSX.persistence.entity.DiChuSXPo;
import com.lc.ibps.lyzygls.DiChuSX.repository.DiChuSXRepository;
import com.lc.ibps.lyzygls.Shengzhanglv.domain.Shangzhanglv;
import com.lc.ibps.lyzygls.Shengzhanglv.persistence.entity.ShangzhanglvPo;
import com.lc.ibps.lyzygls.Shengzhanglv.repository.ShangzhanglvRepository;
import com.lc.ibps.lyzygls.Xiuzheng.persistence.entity.XiuzhengPo;
import com.lc.ibps.lyzygls.Xiuzheng.repository.XiuzhengRepository;
import com.lc.ibps.lyzygls.ZhuYaoTuRang.persistence.entity.ZhuYaoTuRangPo;
import com.lc.ibps.lyzygls.ZhuYaoTuRang.repository.ZhuYaoTuRangRepository;
import com.lc.ibps.lyzygls.DanWeiGK.persistence.entity.DanWeiGKPo;
import com.lc.ibps.lyzygls.DDiChuSX.persistence.entity.DDiChuSXPo;
import com.lc.ibps.lyzygls.DDiChuSX.repository.DDiChuSXRepository;
import com.lc.ibps.lyzygls.DanWeiGK.domain.DanWeiGK;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_dwgk 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 15:09:26
 *</pre>
 */
@Controller
@RequestMapping("/lyzygl/DanWeiGK/danWeiGK/")
public class DanWeiGKController extends GenericController{
	@Resource
	private DanWeiGKRepository danWeiGKRepository;
	
	@Resource
	private DiChuSXRepository diChuSXRepository;
	
	@Resource
	private DDiChuSXRepository dDiChuSXRepository;
	
	@Resource
	private DiChuPYRepository diChuPYRepository;
	
	@Resource
	private ShangzhanglvRepository shangzhanglvRepository;
	
	@Resource
	private XiuzhengRepository xiuzhengRepository;
	
	@Resource
	private ZhuYaoTuRangRepository zhuYaoTuRangRepository;
	/**
	 * 【t_dwgk】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<DanWeiGKPo> danWeiGKList=(PageList<DanWeiGKPo>)danWeiGKRepository.query(queryFilter);
		return new PageJson(danWeiGKList);
	}
	
	/**
	 * 编辑【t_dwgk】信息页面
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
		DanWeiGKPo danWeiGK=null;
		if(StringUtil.isNotEmpty(id)){
			danWeiGK=danWeiGKRepository.get(id);
		}
		
		List<DiChuSXPo> diChuSXData=diChuSXRepository.findAll();//地处山系
		List<DDiChuSXPo> dDiChuSXData=dDiChuSXRepository.findAll();//地处水系
		List<DiChuPYPo> diChuPYData=diChuPYRepository.findAll();//地处平原
		List<ShangzhanglvPo> shangzhanglvData=shangzhanglvRepository.findAll();//生长率
		List<ZhuYaoTuRangPo> zhuyaoturangData=zhuYaoTuRangRepository.findAll();//主要土壤
		/*ShangzhanglvPo shangzhanglvPo = new ShangzhanglvPo();
		for(int i=0; i<shangzhanglvData.size();i++){
			shangzhanglvPo.setId(null);
			shangzhanglvPo.setBianHao(shangzhanglvData.get(i).getBianHao());
			shangzhanglvPo.setLinFenLeiXing(shangzhanglvData.get(i).getLinFenLeiXing());
			shangzhanglvPo.setLingZu(shangzhanglvData.get(i).getLingZu());
			shangzhanglvPo.setShengZhangLu(shangzhanglvData.get(i).getShengZhangLu());
			Shangzhanglv shangzhanglv =shangzhanglvRepository.newInstance(shangzhanglvPo);
			shangzhanglv.save();
		}
		*/
		List<XiuzhengPo> xiuzhengData=xiuzhengRepository.findAll();//修正率
		
/*		java.util.Collections.sort(handanList, new Comparator<HandanPo>() {
			public int compare(HandanPo handanList, HandanPo o2) {
				return o2.getPm10().compareTo(handanList.getPm10());
			}
		});*/
		
		
		return getAutoView()
				.addObject("danWeiGK", danWeiGK).addObject("returnUrl", preUrl)
				.addObject("diChuSXData", diChuSXData).addObject("dDiChuSXData", dDiChuSXData)
				.addObject("diChuPYData", diChuPYData).addObject("shangzhanglvData", shangzhanglvData)
				.addObject("xiuzhengData", xiuzhengData).addObject("zhuyaoturangData", zhuyaoturangData);
	}
	
	/**
	 * 编辑【t_dwgk】信息页面
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
		DanWeiGKPo danWeiGK=null;
		if(StringUtil.isNotEmpty(id)){
			danWeiGK=danWeiGKRepository.get(id);
		}
		return getAutoView().addObject("danWeiGK", danWeiGK).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_dwgk】明细页面
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
		DanWeiGKPo danWeiGK=null;
		if(StringUtil.isNotEmpty(id)){
			danWeiGK=danWeiGKRepository.get(id);
		}
		return getAutoView().addObject("danWeiGK", danWeiGK).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_dwgk】信息
	 *
	 * @param request
	 * @param response
	 * @param  danWeiGK
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			DanWeiGKPo danWeiGKPo = getFromRequest(request);
			//构造领域对象和保存数据
			DanWeiGK danWeiGK =danWeiGKRepository.newInstance(danWeiGKPo);
			danWeiGK.save();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存t_dwgk成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_dwgk操作失败,"+e.getMessage());
			logger.error("对t_dwgk操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private DanWeiGKPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		DanWeiGKPo danWeiGKPo = getDanWeiGKPo(jsonObj);

		return danWeiGKPo;
	}
	
	/** 
	 * 获取t_dwgk数据
	 *
	 * @param jsonObj
	 */
	private DanWeiGKPo getDanWeiGKPo(JSONObject jsonObj){
		DanWeiGKPo danWeiGKPo = (DanWeiGKPo) JsonUtil.getDTO(jsonObj.toString(), DanWeiGKPo.class);
		return danWeiGKPo;
	}
	
	
	/**
	 *  批量删除【t_dwgk】记录
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
			DanWeiGK danWeiGK =danWeiGKRepository.newInstance();
			danWeiGK.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_dwgk成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_dwgk失败，" + e.getMessage());
			logger.error("删除t_dwgk失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	
}
