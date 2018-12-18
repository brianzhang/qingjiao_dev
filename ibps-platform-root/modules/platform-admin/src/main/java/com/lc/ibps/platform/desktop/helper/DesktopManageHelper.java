package com.lc.ibps.platform.desktop.helper;

import java.util.List;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.common.desktop.persistence.entity.DesktopManagePo;
import com.lc.ibps.org.party.builder.PartyEntityBuilder;

/** 桌面布局帮助工具类
 *
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2016年10月21日-下午5:03:01
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class DesktopManageHelper {

	/**
	 * 填充桌面布局所属组织名称
	 *
	 * @param desktops 
	 */
	public static void fillGroupName(List<DesktopManagePo> desktops){
		for(DesktopManagePo po : desktops){
			fillGroupName(po);
		}
	}
	
	/**
	 * 填充桌面布局所属组织名称
	 *
	 * @param desktop	
	 */
	public static void fillGroupName(DesktopManagePo desktop){
		if(BeanUtils.isEmpty(desktop)) return;
		if(BeanUtils.isEmpty(desktop.getGroupId())) return;
		desktop.setGroupName(PartyEntityBuilder.buildPathName(desktop.getGroupId()));
	}
}
