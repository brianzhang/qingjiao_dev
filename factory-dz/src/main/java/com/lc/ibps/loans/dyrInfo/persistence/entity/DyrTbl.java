package com.lc.ibps.loans.dyrInfo.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_dyr 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-08-08 21:14:39
 *</pre>
 */
 @SuppressWarnings("serial")
public class DyrTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  dyr; 		/*抵押人*/
	protected String  sfyhjzm; 		/*是否有户籍证明*/
	protected String  dyrzjlx; 		/*抵押人证件类型*/
	protected String  dyrzjhm; 		/*抵押人证件号码*/
	protected String  dyrdkkh; 		/*抵押人贷款卡号*/
	protected String  dywsfgy; 		/*抵押物是否共有*/
	protected String  dywgyqr; 		/*抵押物共有权人*/
	protected String  gyfs; 		/*共有方式*/
	protected String  dywmc; 		/*抵押物名称*/
	protected String  dywwz; 		/*抵押物位置*/
	protected String  dywzl; 		/*抵押物种类*/
	protected String  fwydj; 		/*房屋预登记*/
	protected String  fwjg; 		/*房屋结构*/
	protected String  fccs; 		/*房产层数*/
	protected String  fcszcs; 		/*房产所在层数*/
	protected String  dywbh; 		/*抵押物编号*/
	protected String  dywsfyytdsyqzs; 		/*抵押物是否拥有土地使用权证书*/
	protected String  dywfctdsyqrmc; 		/*抵押物房产土地使用权人名称*/
	protected String  dyfctdsyqzh; 		/*抵押房产土地使用权证号*/
	protected String  dyfctdsyqlx; 		/*抵押房产土地使用权类型*/
	protected String  dyfctdsyqmj; 		/*抵押房产土地使用权面积*/
	protected String  dyfctdsyqsf; 		/*抵押房产土地使用权是否*/
	protected String  dyfctdsyqdyfs; 		/*抵押房产土地使用权抵押方式*/
	protected String  dywxxms; 		/*抵押物详细描述*/
	protected String  dywxgzmwj; 		/*抵押物相关证明文件*/
	protected String  gfhtDywcqzhSyqzh; 		/*购房合同/抵押物产权证号/使用权证号*/
	protected String  fzjg; 		/*发证机关*/
	protected String  dywyzgzj; 		/*抵押物原置购置价*/
	protected String  mjS; 		/*面积/数*/
	protected String  jcGzsj; 		/*建成/购置时间*/
	protected String  dywsynx; 		/*抵押物使用年限*/
	protected String  sksynx; 		/*尚可使用年限*/
	protected String  zjl; 		/*折旧率*/
	protected String  dywsfpg; 		/*抵押物是否评估*/
	protected String  dywpgjg; 		/*抵押物评估机构*/
	protected String  pgff; 		/*评估方法*/
	protected Date  dywpgrq; 		/*抵押物评估日期*/
	protected String  pgjlsyyxqx; 		/*评估结论使用有效期限*/
	protected String  gdywdkje; 		/*该抵押物贷款金额*/
	protected String  pgjz; 		/*评估价值*/
	protected String  dyl; 		/*抵押率*/
	protected String  dywsfjxdydj; 		/*抵押物是否进行抵押登记*/
	protected String  dywdjjg; 		/*抵押物登记机构*/
	protected String  dydjwjhTxqr; 		/*抵押登记文件号/他项权人*/
	protected String  dyjz; 		/*抵押价值*/
	protected Date  dydjr; 		/*抵押登记日*/
	protected Date  dydqr; 		/*抵押到期日*/
	protected String  dywsfbx; 		/*抵押物是否保险*/
	protected String  bxjgmc; 		/*保险机构名称*/
	protected String  dywbxdh; 		/*抵押物保险单号*/
	protected String  bxje; 		/*保险金额*/
	protected Date  bxsxr; 		/*保险生效日*/
	protected Date  bxdqr; 		/*保险到期日*/
	protected String  dysyrmc; 		/*第一受益人名称*/
	protected String  dywsfblgz; 		/*抵押物是否办理公证*/
	protected String  gzjg; 		/*公证机关*/
	protected Date  gzrq; 		/*公证日期*/
	protected String  gzsbh; 		/*公证书编号*/
	protected String  bz; 		/*备注*/
	protected String  jdid; 		/*借贷id*/
	protected String  dyryjkrgx; 		/*抵押人与借款人关系*/
	protected String  dyrhyzk; 		/*抵押人婚姻状况*/
	protected String  dyrpomc; 		/*抵押人配偶名称*/
	protected String  dyrpozjlx; 		/*抵押人配偶证件类型*/
	protected String  dyrpozjhm; 		/*抵押人配偶证件号码*/
	protected String  dywqdfs; 		/*抵押物取得方式*/
	protected String  sfyxydyw; 		/*是否有协议抵押物*/
	protected String  xydywxxms; 		/*协议抵押物详细描述*/
	protected String  sfblgz; 		/*是否办理公证*/

	public void setId(String id) 
	{
		this.id = id;
	}
	/**
	 * 返回 主键
	 * @return
	 */
	public String getId() 
	{
		return this.id;
	}
	public void setDyr(String dyr) 
	{
		this.dyr = dyr;
	}
	/**
	 * 返回 抵押人
	 * @return
	 */
	public String getDyr() 
	{
		return this.dyr;
	}
	public void setSfyhjzm(String sfyhjzm) 
	{
		this.sfyhjzm = sfyhjzm;
	}
	/**
	 * 返回 是否有户籍证明
	 * @return
	 */
	public String getSfyhjzm() 
	{
		return this.sfyhjzm;
	}
	public void setDyrzjlx(String dyrzjlx) 
	{
		this.dyrzjlx = dyrzjlx;
	}
	/**
	 * 返回 抵押人证件类型
	 * @return
	 */
	public String getDyrzjlx() 
	{
		return this.dyrzjlx;
	}
	public void setDyrzjhm(String dyrzjhm) 
	{
		this.dyrzjhm = dyrzjhm;
	}
	/**
	 * 返回 抵押人证件号码
	 * @return
	 */
	public String getDyrzjhm() 
	{
		return this.dyrzjhm;
	}
	public void setDyrdkkh(String dyrdkkh) 
	{
		this.dyrdkkh = dyrdkkh;
	}
	/**
	 * 返回 抵押人贷款卡号
	 * @return
	 */
	public String getDyrdkkh() 
	{
		return this.dyrdkkh;
	}
	public void setDywsfgy(String dywsfgy) 
	{
		this.dywsfgy = dywsfgy;
	}
	/**
	 * 返回 抵押物是否共有
	 * @return
	 */
	public String getDywsfgy() 
	{
		return this.dywsfgy;
	}
	public void setDywgyqr(String dywgyqr) 
	{
		this.dywgyqr = dywgyqr;
	}
	/**
	 * 返回 抵押物共有权人
	 * @return
	 */
	public String getDywgyqr() 
	{
		return this.dywgyqr;
	}
	public void setGyfs(String gyfs) 
	{
		this.gyfs = gyfs;
	}
	/**
	 * 返回 共有方式
	 * @return
	 */
	public String getGyfs() 
	{
		return this.gyfs;
	}
	public void setDywmc(String dywmc) 
	{
		this.dywmc = dywmc;
	}
	/**
	 * 返回 抵押物名称
	 * @return
	 */
	public String getDywmc() 
	{
		return this.dywmc;
	}
	public void setDywwz(String dywwz) 
	{
		this.dywwz = dywwz;
	}
	/**
	 * 返回 抵押物位置
	 * @return
	 */
	public String getDywwz() 
	{
		return this.dywwz;
	}
	public void setDywzl(String dywzl) 
	{
		this.dywzl = dywzl;
	}
	/**
	 * 返回 抵押物种类
	 * @return
	 */
	public String getDywzl() 
	{
		return this.dywzl;
	}
	public void setFwydj(String fwydj) 
	{
		this.fwydj = fwydj;
	}
	/**
	 * 返回 房屋预登记
	 * @return
	 */
	public String getFwydj() 
	{
		return this.fwydj;
	}
	public void setFwjg(String fwjg) 
	{
		this.fwjg = fwjg;
	}
	/**
	 * 返回 房屋结构
	 * @return
	 */
	public String getFwjg() 
	{
		return this.fwjg;
	}
	public void setFccs(String fccs) 
	{
		this.fccs = fccs;
	}
	/**
	 * 返回 房产层数
	 * @return
	 */
	public String getFccs() 
	{
		return this.fccs;
	}
	public void setFcszcs(String fcszcs) 
	{
		this.fcszcs = fcszcs;
	}
	/**
	 * 返回 房产所在层数
	 * @return
	 */
	public String getFcszcs() 
	{
		return this.fcszcs;
	}
	public void setDywbh(String dywbh) 
	{
		this.dywbh = dywbh;
	}
	/**
	 * 返回 抵押物编号
	 * @return
	 */
	public String getDywbh() 
	{
		return this.dywbh;
	}
	public void setDywsfyytdsyqzs(String dywsfyytdsyqzs) 
	{
		this.dywsfyytdsyqzs = dywsfyytdsyqzs;
	}
	/**
	 * 返回 抵押物是否拥有土地使用权证书
	 * @return
	 */
	public String getDywsfyytdsyqzs() 
	{
		return this.dywsfyytdsyqzs;
	}
	public void setDywfctdsyqrmc(String dywfctdsyqrmc) 
	{
		this.dywfctdsyqrmc = dywfctdsyqrmc;
	}
	/**
	 * 返回 抵押物房产土地使用权人名称
	 * @return
	 */
	public String getDywfctdsyqrmc() 
	{
		return this.dywfctdsyqrmc;
	}
	public void setDyfctdsyqzh(String dyfctdsyqzh) 
	{
		this.dyfctdsyqzh = dyfctdsyqzh;
	}
	/**
	 * 返回 抵押房产土地使用权证号
	 * @return
	 */
	public String getDyfctdsyqzh() 
	{
		return this.dyfctdsyqzh;
	}
	public void setDyfctdsyqlx(String dyfctdsyqlx) 
	{
		this.dyfctdsyqlx = dyfctdsyqlx;
	}
	/**
	 * 返回 抵押房产土地使用权类型
	 * @return
	 */
	public String getDyfctdsyqlx() 
	{
		return this.dyfctdsyqlx;
	}
	public void setDyfctdsyqmj(String dyfctdsyqmj) 
	{
		this.dyfctdsyqmj = dyfctdsyqmj;
	}
	/**
	 * 返回 抵押房产土地使用权面积
	 * @return
	 */
	public String getDyfctdsyqmj() 
	{
		return this.dyfctdsyqmj;
	}
	public void setDyfctdsyqsf(String dyfctdsyqsf) 
	{
		this.dyfctdsyqsf = dyfctdsyqsf;
	}
	/**
	 * 返回 抵押房产土地使用权是否
	 * @return
	 */
	public String getDyfctdsyqsf() 
	{
		return this.dyfctdsyqsf;
	}
	public void setDyfctdsyqdyfs(String dyfctdsyqdyfs) 
	{
		this.dyfctdsyqdyfs = dyfctdsyqdyfs;
	}
	/**
	 * 返回 抵押房产土地使用权抵押方式
	 * @return
	 */
	public String getDyfctdsyqdyfs() 
	{
		return this.dyfctdsyqdyfs;
	}
	public void setDywxxms(String dywxxms) 
	{
		this.dywxxms = dywxxms;
	}
	/**
	 * 返回 抵押物详细描述
	 * @return
	 */
	public String getDywxxms() 
	{
		return this.dywxxms;
	}
	public void setDywxgzmwj(String dywxgzmwj) 
	{
		this.dywxgzmwj = dywxgzmwj;
	}
	/**
	 * 返回 抵押物相关证明文件
	 * @return
	 */
	public String getDywxgzmwj() 
	{
		return this.dywxgzmwj;
	}
	public void setGfhtDywcqzhSyqzh(String gfhtDywcqzhSyqzh) 
	{
		this.gfhtDywcqzhSyqzh = gfhtDywcqzhSyqzh;
	}
	/**
	 * 返回 购房合同/抵押物产权证号/使用权证号
	 * @return
	 */
	public String getGfhtDywcqzhSyqzh() 
	{
		return this.gfhtDywcqzhSyqzh;
	}
	public void setFzjg(String fzjg) 
	{
		this.fzjg = fzjg;
	}
	/**
	 * 返回 发证机关
	 * @return
	 */
	public String getFzjg() 
	{
		return this.fzjg;
	}
	public void setDywyzgzj(String dywyzgzj) 
	{
		this.dywyzgzj = dywyzgzj;
	}
	/**
	 * 返回 抵押物原置购置价
	 * @return
	 */
	public String getDywyzgzj() 
	{
		return this.dywyzgzj;
	}
	public void setMjS(String mjS) 
	{
		this.mjS = mjS;
	}
	/**
	 * 返回 面积/数
	 * @return
	 */
	public String getMjS() 
	{
		return this.mjS;
	}
	public void setJcGzsj(String jcGzsj) 
	{
		this.jcGzsj = jcGzsj;
	}
	/**
	 * 返回 建成/购置时间
	 * @return
	 */
	public String getJcGzsj() 
	{
		return this.jcGzsj;
	}
	public void setDywsynx(String dywsynx) 
	{
		this.dywsynx = dywsynx;
	}
	/**
	 * 返回 抵押物使用年限
	 * @return
	 */
	public String getDywsynx() 
	{
		return this.dywsynx;
	}
	public void setSksynx(String sksynx) 
	{
		this.sksynx = sksynx;
	}
	/**
	 * 返回 尚可使用年限
	 * @return
	 */
	public String getSksynx() 
	{
		return this.sksynx;
	}
	public void setZjl(String zjl) 
	{
		this.zjl = zjl;
	}
	/**
	 * 返回 折旧率
	 * @return
	 */
	public String getZjl() 
	{
		return this.zjl;
	}
	public void setDywsfpg(String dywsfpg) 
	{
		this.dywsfpg = dywsfpg;
	}
	/**
	 * 返回 抵押物是否评估
	 * @return
	 */
	public String getDywsfpg() 
	{
		return this.dywsfpg;
	}
	public void setDywpgjg(String dywpgjg) 
	{
		this.dywpgjg = dywpgjg;
	}
	/**
	 * 返回 抵押物评估机构
	 * @return
	 */
	public String getDywpgjg() 
	{
		return this.dywpgjg;
	}
	public void setPgff(String pgff) 
	{
		this.pgff = pgff;
	}
	/**
	 * 返回 评估方法
	 * @return
	 */
	public String getPgff() 
	{
		return this.pgff;
	}
	public void setDywpgrq(Date dywpgrq) 
	{
		this.dywpgrq = dywpgrq;
	}
	/**
	 * 返回 抵押物评估日期
	 * @return
	 */
	public Date getDywpgrq() 
	{
		return this.dywpgrq;
	}
	public void setPgjlsyyxqx(String pgjlsyyxqx) 
	{
		this.pgjlsyyxqx = pgjlsyyxqx;
	}
	/**
	 * 返回 评估结论使用有效期限
	 * @return
	 */
	public String getPgjlsyyxqx() 
	{
		return this.pgjlsyyxqx;
	}
	public void setGdywdkje(String gdywdkje) 
	{
		this.gdywdkje = gdywdkje;
	}
	/**
	 * 返回 该抵押物贷款金额
	 * @return
	 */
	public String getGdywdkje() 
	{
		return this.gdywdkje;
	}
	public void setPgjz(String pgjz) 
	{
		this.pgjz = pgjz;
	}
	/**
	 * 返回 评估价值
	 * @return
	 */
	public String getPgjz() 
	{
		return this.pgjz;
	}
	public void setDyl(String dyl) 
	{
		this.dyl = dyl;
	}
	/**
	 * 返回 抵押率
	 * @return
	 */
	public String getDyl() 
	{
		return this.dyl;
	}
	public void setDywsfjxdydj(String dywsfjxdydj) 
	{
		this.dywsfjxdydj = dywsfjxdydj;
	}
	/**
	 * 返回 抵押物是否进行抵押登记
	 * @return
	 */
	public String getDywsfjxdydj() 
	{
		return this.dywsfjxdydj;
	}
	public void setDywdjjg(String dywdjjg) 
	{
		this.dywdjjg = dywdjjg;
	}
	/**
	 * 返回 抵押物登记机构
	 * @return
	 */
	public String getDywdjjg() 
	{
		return this.dywdjjg;
	}
	public void setDydjwjhTxqr(String dydjwjhTxqr) 
	{
		this.dydjwjhTxqr = dydjwjhTxqr;
	}
	/**
	 * 返回 抵押登记文件号/他项权人
	 * @return
	 */
	public String getDydjwjhTxqr() 
	{
		return this.dydjwjhTxqr;
	}
	public void setDyjz(String dyjz) 
	{
		this.dyjz = dyjz;
	}
	/**
	 * 返回 抵押价值
	 * @return
	 */
	public String getDyjz() 
	{
		return this.dyjz;
	}
	public void setDydjr(Date dydjr) 
	{
		this.dydjr = dydjr;
	}
	/**
	 * 返回 抵押登记日
	 * @return
	 */
	public Date getDydjr() 
	{
		return this.dydjr;
	}
	public void setDydqr(Date dydqr) 
	{
		this.dydqr = dydqr;
	}
	/**
	 * 返回 抵押到期日
	 * @return
	 */
	public Date getDydqr() 
	{
		return this.dydqr;
	}
	public void setDywsfbx(String dywsfbx) 
	{
		this.dywsfbx = dywsfbx;
	}
	/**
	 * 返回 抵押物是否保险
	 * @return
	 */
	public String getDywsfbx() 
	{
		return this.dywsfbx;
	}
	public void setBxjgmc(String bxjgmc) 
	{
		this.bxjgmc = bxjgmc;
	}
	/**
	 * 返回 保险机构名称
	 * @return
	 */
	public String getBxjgmc() 
	{
		return this.bxjgmc;
	}
	public void setDywbxdh(String dywbxdh) 
	{
		this.dywbxdh = dywbxdh;
	}
	/**
	 * 返回 抵押物保险单号
	 * @return
	 */
	public String getDywbxdh() 
	{
		return this.dywbxdh;
	}
	public void setBxje(String bxje) 
	{
		this.bxje = bxje;
	}
	/**
	 * 返回 保险金额
	 * @return
	 */
	public String getBxje() 
	{
		return this.bxje;
	}
	public void setBxsxr(Date bxsxr) 
	{
		this.bxsxr = bxsxr;
	}
	/**
	 * 返回 保险生效日
	 * @return
	 */
	public Date getBxsxr() 
	{
		return this.bxsxr;
	}
	public void setBxdqr(Date bxdqr) 
	{
		this.bxdqr = bxdqr;
	}
	/**
	 * 返回 保险到期日
	 * @return
	 */
	public Date getBxdqr() 
	{
		return this.bxdqr;
	}
	public void setDysyrmc(String dysyrmc) 
	{
		this.dysyrmc = dysyrmc;
	}
	/**
	 * 返回 第一受益人名称
	 * @return
	 */
	public String getDysyrmc() 
	{
		return this.dysyrmc;
	}
	public void setDywsfblgz(String dywsfblgz) 
	{
		this.dywsfblgz = dywsfblgz;
	}
	/**
	 * 返回 抵押物是否办理公证
	 * @return
	 */
	public String getDywsfblgz() 
	{
		return this.dywsfblgz;
	}
	public void setGzjg(String gzjg) 
	{
		this.gzjg = gzjg;
	}
	/**
	 * 返回 公证机关
	 * @return
	 */
	public String getGzjg() 
	{
		return this.gzjg;
	}
	public void setGzrq(Date gzrq) 
	{
		this.gzrq = gzrq;
	}
	/**
	 * 返回 公证日期
	 * @return
	 */
	public Date getGzrq() 
	{
		return this.gzrq;
	}
	public void setGzsbh(String gzsbh) 
	{
		this.gzsbh = gzsbh;
	}
	/**
	 * 返回 公证书编号
	 * @return
	 */
	public String getGzsbh() 
	{
		return this.gzsbh;
	}
	public void setBz(String bz) 
	{
		this.bz = bz;
	}
	/**
	 * 返回 备注
	 * @return
	 */
	public String getBz() 
	{
		return this.bz;
	}
	public void setJdid(String jdid) 
	{
		this.jdid = jdid;
	}
	/**
	 * 返回 借贷id
	 * @return
	 */
	public String getJdid() 
	{
		return this.jdid;
	}
	public void setDyryjkrgx(String dyryjkrgx) 
	{
		this.dyryjkrgx = dyryjkrgx;
	}
	/**
	 * 返回 抵押人与借款人关系
	 * @return
	 */
	public String getDyryjkrgx() 
	{
		return this.dyryjkrgx;
	}
	public void setDyrhyzk(String dyrhyzk) 
	{
		this.dyrhyzk = dyrhyzk;
	}
	/**
	 * 返回 抵押人婚姻状况
	 * @return
	 */
	public String getDyrhyzk() 
	{
		return this.dyrhyzk;
	}
	public void setDyrpomc(String dyrpomc) 
	{
		this.dyrpomc = dyrpomc;
	}
	/**
	 * 返回 抵押人配偶名称
	 * @return
	 */
	public String getDyrpomc() 
	{
		return this.dyrpomc;
	}
	public void setDyrpozjlx(String dyrpozjlx) 
	{
		this.dyrpozjlx = dyrpozjlx;
	}
	/**
	 * 返回 抵押人配偶证件类型
	 * @return
	 */
	public String getDyrpozjlx() 
	{
		return this.dyrpozjlx;
	}
	public void setDyrpozjhm(String dyrpozjhm) 
	{
		this.dyrpozjhm = dyrpozjhm;
	}
	/**
	 * 返回 抵押人配偶证件号码
	 * @return
	 */
	public String getDyrpozjhm() 
	{
		return this.dyrpozjhm;
	}
	public void setDywqdfs(String dywqdfs) 
	{
		this.dywqdfs = dywqdfs;
	}
	/**
	 * 返回 抵押物取得方式
	 * @return
	 */
	public String getDywqdfs() 
	{
		return this.dywqdfs;
	}
	public void setSfyxydyw(String sfyxydyw) 
	{
		this.sfyxydyw = sfyxydyw;
	}
	/**
	 * 返回 是否有协议抵押物
	 * @return
	 */
	public String getSfyxydyw() 
	{
		return this.sfyxydyw;
	}
	public void setXydywxxms(String xydywxxms) 
	{
		this.xydywxxms = xydywxxms;
	}
	/**
	 * 返回 协议抵押物详细描述
	 * @return
	 */
	public String getXydywxxms() 
	{
		return this.xydywxxms;
	}
	public void setSfblgz(String sfblgz) 
	{
		this.sfblgz = sfblgz;
	}
	/**
	 * 返回 是否办理公证
	 * @return
	 */
	public String getSfblgz() 
	{
		return this.sfblgz;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("dyr", this.dyr) 
		.append("sfyhjzm", this.sfyhjzm) 
		.append("dyrzjlx", this.dyrzjlx) 
		.append("dyrzjhm", this.dyrzjhm) 
		.append("dyrdkkh", this.dyrdkkh) 
		.append("dywsfgy", this.dywsfgy) 
		.append("dywgyqr", this.dywgyqr) 
		.append("gyfs", this.gyfs) 
		.append("dywmc", this.dywmc) 
		.append("dywwz", this.dywwz) 
		.append("dywzl", this.dywzl) 
		.append("fwydj", this.fwydj) 
		.append("fwjg", this.fwjg) 
		.append("fccs", this.fccs) 
		.append("fcszcs", this.fcszcs) 
		.append("dywbh", this.dywbh) 
		.append("dywsfyytdsyqzs", this.dywsfyytdsyqzs) 
		.append("dywfctdsyqrmc", this.dywfctdsyqrmc) 
		.append("dyfctdsyqzh", this.dyfctdsyqzh) 
		.append("dyfctdsyqlx", this.dyfctdsyqlx) 
		.append("dyfctdsyqmj", this.dyfctdsyqmj) 
		.append("dyfctdsyqsf", this.dyfctdsyqsf) 
		.append("dyfctdsyqdyfs", this.dyfctdsyqdyfs) 
		.append("dywxxms", this.dywxxms) 
		.append("dywxgzmwj", this.dywxgzmwj) 
		.append("gfhtDywcqzhSyqzh", this.gfhtDywcqzhSyqzh) 
		.append("fzjg", this.fzjg) 
		.append("dywyzgzj", this.dywyzgzj) 
		.append("mjS", this.mjS) 
		.append("jcGzsj", this.jcGzsj) 
		.append("dywsynx", this.dywsynx) 
		.append("sksynx", this.sksynx) 
		.append("zjl", this.zjl) 
		.append("dywsfpg", this.dywsfpg) 
		.append("dywpgjg", this.dywpgjg) 
		.append("pgff", this.pgff) 
		.append("dywpgrq", this.dywpgrq) 
		.append("pgjlsyyxqx", this.pgjlsyyxqx) 
		.append("gdywdkje", this.gdywdkje) 
		.append("pgjz", this.pgjz) 
		.append("dyl", this.dyl) 
		.append("dywsfjxdydj", this.dywsfjxdydj) 
		.append("dywdjjg", this.dywdjjg) 
		.append("dydjwjhTxqr", this.dydjwjhTxqr) 
		.append("dyjz", this.dyjz) 
		.append("dydjr", this.dydjr) 
		.append("dydqr", this.dydqr) 
		.append("dywsfbx", this.dywsfbx) 
		.append("bxjgmc", this.bxjgmc) 
		.append("dywbxdh", this.dywbxdh) 
		.append("bxje", this.bxje) 
		.append("bxsxr", this.bxsxr) 
		.append("bxdqr", this.bxdqr) 
		.append("dysyrmc", this.dysyrmc) 
		.append("dywsfblgz", this.dywsfblgz) 
		.append("gzjg", this.gzjg) 
		.append("gzrq", this.gzrq) 
		.append("gzsbh", this.gzsbh) 
		.append("bz", this.bz) 
		.append("jdid", this.jdid) 
		.append("dyryjkrgx", this.dyryjkrgx) 
		.append("dyrhyzk", this.dyrhyzk) 
		.append("dyrpomc", this.dyrpomc) 
		.append("dyrpozjlx", this.dyrpozjlx) 
		.append("dyrpozjhm", this.dyrpozjhm) 
		.append("dywqdfs", this.dywqdfs) 
		.append("sfyxydyw", this.sfyxydyw) 
		.append("xydywxxms", this.xydywxxms) 
		.append("sfblgz", this.sfblgz) 
		.toString();
	}
}
