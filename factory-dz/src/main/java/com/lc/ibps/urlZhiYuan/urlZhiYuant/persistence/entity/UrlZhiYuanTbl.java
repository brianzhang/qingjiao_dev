package com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;



/**
 * t_zyurl 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-04 23:52:06
 *</pre>
 */
 @SuppressWarnings("serial")
public class UrlZhiYuanTbl extends AbstractPo<String>{
	protected String  id; 		/*主键*/
	protected String  td1; 		/*团队1*/
	protected String  td1id; 		/*团队1ID*/
	protected String  js1; 		/*状态位*/
	protected String  js1id; 		/*是否启动任务书(状态位2)*/
	protected String  td2; 		/*团队2*/
	protected String  td2id; 		/*团队2ID*/
	protected String  js2; 		/*是否启动开题(状态位3）*/
	protected String  js2id; 		/*教师2ID*/
	protected String  td3; 		/*其他审批意见*/
	protected String  td3id; 	
	protected String  js3; 		/*交叉审核教师*/
	protected String  js3id; 		/*交叉审核教师3ID*/
	protected String  xh; 		/*学号*/
	protected String  classr; 		/*班级*/
	protected String  name; /*姓名*/
	protected String  finalteacher;  /*最终教师*/ 
	protected String  finalteacherId;   /*最终教师id*/ 
	protected String  finaltd;   /*最终团队*/ 
	protected String  finaltdId;    /*最终团队id*/ 
	//立题书
	protected String  yx; 		/*院系*/
	protected String  ktdbjhmd; 		/*课题的背景和目的*/
	protected String  zc; 		/*职称*/
	protected Date  sbsj; 		/*申报时间*/
	protected String  tmmc; 		/*题目名称*/
	protected String  tmly; 		/*题目来源*/
	protected String  tmlx; 		/*题目类型*/
	protected String  ktnjjdwt; 		/*课题拟解决的问题*/
	protected String  rjhj; 		/*软件环境*/
	protected String  yjhj; 		/*硬件环境*/
	protected String  ktyqmbhcg; 		/*课题预期目标和成果*/
	protected String  ktcgjzywcdgzrw; 		/*课题成果将主要完成的工作任务*/
	protected String  bktdcgxs; 		/*本课题的成果形式*/
	protected String  nf; 		/*年份*/
	protected String  tmdyzy; 		/*题目对应专业*/
	protected String  sjjs; 		/*上机机时*/
	protected String  ydwx; 		/*阅读文献*/
	protected String  jbyq; 		/*基本要求*/
	protected String  tzzs; /*图纸张数*/
	protected String  dlbks; /*电路板块数*/
	protected String  dsbjzs; /*读书笔记字数*/
	protected String  zyckzl; /*主要参考资料*/
	protected String fzx;/*论文复杂性1*/
	protected String litishufile;
	protected String renwushufile;
	/*任务书*/
	protected String gzmd;/*工作目的*/
	protected String gznrjjtyq;/*工作目的及具体要求*/
	protected String gzjdfp;/*工作进度分配*/
	protected String zddyfs;/*指导答疑方式*/
	protected String renwushu_zyzl;/*主要参考资料*/
	/*开题*/
	protected String kt_bgrq;/*开题报告日期*/
	protected String kt_bjsm;/*背景说明*/
	protected String kt_zynr;/*主要内容*/
	protected String kt_fajdjap;/*进度安排*/
	protected String kt_gzfa;/*工作方案*/
	protected String kaitifile;/*开题报告文件*/
	protected String kaiti_zyzl;/*开题报告主要参考资料*/
	protected String labelId; /*标签Id*/
	protected String orgId; /*院系id*/
	
	protected String zqBatch; /*中期批次*/
	protected String zqResult; /*中期结果*/
	protected byte[] zqGrade; /*中期成绩*/
	
	protected String dbBatch; /*答辩批次*/
	protected String dbResult; /*答辩结果*/
	protected byte[] dbGrade; /*答辩成绩*/
	
	protected String judgeTch;/*评审教师*/
	protected String finalTchOpinion;/*指导教师意见*/
	protected String judgeTchOpinion;/*评审教师意见*/
	protected String finalTchComment;/*指导教师评语*/
	protected String judgeTchComment;/*评审教师评语*/
	protected String normalPaperId;/*正常论文Id*/
	protected String anonymousPaperId;/*匿名论文Id*/
	protected String isDb;/*能否参加最终答辩*/
	protected Date finalTchDate;/*指导教师评审时间*/
	protected Date judgeTchDate;/*评审教师评审时间*/
	protected String judgeTchName;/*评审教师名*/

	protected String oneDb;/*答辩委员会第1项评分*/
	protected String twoDb;/*答辩委员会第2项评分*/
	protected String threeDb;/*答辩委员会第3项评分*/
	protected String fourDb;/*答辩委员会第4项评分*/
	protected String fiveDb;/*答辩委员会第5项评分*/
	protected String totalDb;/*答辩委员会总分*/
	protected String masterComment;/*答辩委员会评语*/
	protected String masterName;/*答辩委员会主席名字*/
	protected Date masterData;/*答辩委员会签字日期*/


	public String getOneDb() {
		return oneDb;
	}

	public void setOneDb(String oneDb) {
		this.oneDb = oneDb;
	}

	public String getTwoDb() {
		return twoDb;
	}

	public void setTwoDb(String twoDb) {
		this.twoDb = twoDb;
	}

	public String getThreeDb() {
		return threeDb;
	}

	public void setThreeDb(String threeDb) {
		this.threeDb = threeDb;
	}

	public String getFourDb() {
		return fourDb;
	}

	public void setFourDb(String fourDb) {
		this.fourDb = fourDb;
	}

	public String getFiveDb() {
		return fiveDb;
	}

	public void setFiveDb(String fiveDb) {
		this.fiveDb = fiveDb;
	}

	public String getTotalDb() {
		return totalDb;
	}

	public void setTotalDb(String totalDb) {
		this.totalDb = totalDb;
	}

	public String getMasterComment() {
		return masterComment;
	}

	public void setMasterComment(String masterComment) {
		this.masterComment = masterComment;
	}

	public String getMasterName() {
		return masterName;
	}

	public void setMasterName(String masterName) {
		this.masterName = masterName;
	}

	public Date getMasterData() {
		return masterData;
	}

	public void setMasterData(Date masterData) {
		this.masterData = masterData;
	}

	public String getJudgeTchName() {
		return judgeTchName;
	}

	public void setJudgeTchName(String judgeTchName) {
		this.judgeTchName = judgeTchName;
	}

	public Date getFinalTchDate() {
		return finalTchDate;
	}

	public void setFinalTchDate(Date finalTchDate) {
		this.finalTchDate = finalTchDate;
	}

	public Date getJudgeTchDate() {
		return judgeTchDate;
	}

	public void setJudgeTchDate(Date judgeTchDate) {
		this.judgeTchDate = judgeTchDate;
	}

	public String getIsDb() {
		return isDb;
	}

	public void setIsDb(String isDb) {
		this.isDb = isDb;
	}

	public String getJudgeTch() {
		return judgeTch;
	}
	public void setJudgeTch(String judgeTch) {
		this.judgeTch = judgeTch;
	}
	public String getFinalTchOpinion() {
		return finalTchOpinion;
	}
	public void setFinalTchOpinion(String finalTchOpinion) {
		this.finalTchOpinion = finalTchOpinion;
	}
	public String getJudgeTchOpinion() {
		return judgeTchOpinion;
	}
	public void setJudgeTchOpinion(String judgeTchOpinion) {
		this.judgeTchOpinion = judgeTchOpinion;
	}


	public String getNormalPaperId() {
		return normalPaperId;
	}
	public void setNormalPaperId(String normalPaperId) {
		this.normalPaperId = normalPaperId;
	}
	public String getAnonymousPaperId() {
		return anonymousPaperId;
	}
	public void setAnonymousPaperId(String anonymousPaperId) {
		this.anonymousPaperId = anonymousPaperId;
	}
	public String getDbBatch() {
		return dbBatch;
	}
	public void setDbBatch(String dbBatch) {
		this.dbBatch = dbBatch;
	}
	public String getDbResult() {
		return dbResult;
	}
	public void setDbResult(String dbResult) {
		this.dbResult = dbResult;
	}
	public byte[] getDbGrade() {
		return dbGrade;
	}
	public void setDbGrade(byte[] dbGrade) {
		this.dbGrade = dbGrade;
	}
	public byte[] getZqGrade() {
		return zqGrade;
	}
	public void setZqGrade(byte[] zqGrade) {
		this.zqGrade = zqGrade;
	}
	public String getZqResult() {
		return zqResult;
	}
	public void setZqResult(String zqResult) {
		this.zqResult = zqResult;
	}
	public String getRenwushu_zyzl() {
		return renwushu_zyzl;
	}
	public void setRenwushu_zyzl(String renwushu_zyzl) {
		this.renwushu_zyzl = renwushu_zyzl;
	}
	public String getKaiti_zyzl() {
		return kaiti_zyzl;
	}
	public void setKaiti_zyzl(String kaiti_zyzl) {
		this.kaiti_zyzl = kaiti_zyzl;
	}
	public String getKt_gzfa() {
		return kt_gzfa;
	}
	public String getKaitifile() {
		return kaitifile;
	}
	public void setKaitifile(String kaitifile) {
		this.kaitifile = kaitifile;
	}
	public void setKt_gzfa(String kt_gzfa) {
		this.kt_gzfa = kt_gzfa;
	}
	public String getKt_bgrq() {
		return kt_bgrq;
	}
	public void setKt_bgrq(String kt_bgrq) {
		this.kt_bgrq = kt_bgrq;
	}
	public String getKt_bjsm() {
		return kt_bjsm;
	}
	public void setKt_bjsm(String kt_bjsm) {
		this.kt_bjsm = kt_bjsm;
	}
	public String getKt_zynr() {
		return kt_zynr;
	}
	public void setKt_zynr(String kt_zynr) {
		this.kt_zynr = kt_zynr;
	}
	public String getKt_fajdjap() {
		return kt_fajdjap;
	}
	public void setKt_fajdjap(String kt_fajdjap) {
		this.kt_fajdjap = kt_fajdjap;
	}
	
	
	
	
	public String getZqBatch() {
		return zqBatch;
	}
	public void setZqBatch(String zqBatch) {
		this.zqBatch = zqBatch;
	}
	public String getGzmd() {
		return gzmd;
	}
	public void setGzmd(String gzmd) {
		this.gzmd = gzmd;
	}
	public String getgznrjjtyq() {
		return gznrjjtyq;
	}
	public void setgznrjjtyq(String gznrjjtyq) {
		this.gznrjjtyq = gznrjjtyq;
	}
	public String getGzjdfp() {
		return gzjdfp;
	}
	public void setGzjdfp(String gzjdfp) {
		this.gzjdfp = gzjdfp;
	}
	public String getZddyfs() {
		return zddyfs;
	}
	public void setZddyfs(String zddyfs) {
		this.zddyfs = zddyfs;
	}

	
	
	
	public String getLitishufile() {
		return litishufile;
	}
	public void setLitishufile(String litishufile) {
		this.litishufile = litishufile;
	}
	public String getRenwushufile() {
		return renwushufile;
	}
	public void setRenwushufile(String renwushufile) {
		this.renwushufile = renwushufile;
	}



	@Override
	public void setId(String id) 
	{
		this.id = id;
	}
	/**
	 * 返回 主键
	 * @return
	 */
	@Override
	public String getId() 
	{
		return this.id;
	}
	public void setTd1(String td1) 
	{
		this.td1 = td1;
	}
	/**
	 * 返回 团队1
	 * @return
	 */
	public String getTd1() 
	{
		return this.td1;
	}
	
	public void setZyckzl(String zyckzl) 
	{
		this.zyckzl = zyckzl;
	}

	public String getZyckzl() 
	{
		return this.zyckzl;
	}
	public void setFinalteacher(String finalteacher) 
	{
		this.finalteacher = finalteacher;
	}
	/**
	 * 返回 最终教师
	 * @return
	 */
	public String getFinalteacher() 
	{
		return this.finalteacher;
	}
	public void setFinalteacherId(String finalteacherId) 
	{
		this.finalteacherId = finalteacherId;
	}
	/**
	 * 返回 最终教师id
	 * @return
	 */
	public String getFinalteacherId() 
	{
		return this.finalteacherId;
	}
	
	public void setFinaltd(String finaltd) 
	{
		this.finaltd = finaltd;
	}
	/**
	 * 返回 最终团队
	 * @return
	 */
	public String getFinaltd() 
	{
		return this.finaltd;
	}
	
	
	public void setClassr(String classr) 
	{
		this.classr = classr;
	}
	/**返回班级
	 * @return
	 */
	public String getClassr() 
	{
		return this.classr;
	}
	public void setFinaltdId(String finaltdId) 
	{
		this.finaltdId = finaltdId;
	}
	/**
	 * 返回 最终团队
	 * @return
	 */
	public String getFinaltdId() 
	{
		return this.finaltdId;
	}
	
	public void setTd1id(String td1id) 
	{
		this.td1id = td1id;
	}
	/**
	 * 返回 团队1ID
	 * @return
	 */
	public String getTd1id() 
	{
		return this.td1id;
	}
	public void setJs1(String js1) 
	{
		this.js1 = js1;
	}
	/**
	 * 返回 教师1
	 * @return
	 */
	public String getJs1() 
	{
		return this.js1;
	}
	public void setJs1id(String js1id) 
	{
		this.js1id = js1id;
	}
	/**
	 * 返回 教师1ID
	 * @return
	 */
	public String getJs1id() 
	{
		return this.js1id;
	}
	public void setTd2(String td2) 
	{
		this.td2 = td2;
	}
	/**
	 * 返回 团队2
	 * @return
	 */
	public String getTd2() 
	{
		return this.td2;
	}
	public void setTd2id(String td2id) 
	{
		this.td2id = td2id;
	}
	/**
	 * 返回 团队2ID
	 * @return
	 */
	public String getTd2id() 
	{
		return this.td2id;
	}
	public void setJs2(String js2) 
	{
		this.js2 = js2;
	}
	/**
	 * 返回 教师2
	 * @return
	 */
	public String getJs2() 
	{
		return this.js2;
	}
	public void setJs2id(String js2id) 
	{
		this.js2id = js2id;
	}
	/**
	 * 返回 教师2ID
	 * @return
	 */
	public String getJs2id() 
	{
		return this.js2id;
	}
	public void setTd3(String td3) 
	{
		this.td3 = td3;
	}
	/**
	 * 返回 团队3
	 * @return
	 */
	public String getTd3() 
	{
		return this.td3;
	}
	public void setTd3id(String td3id) 
	{
		this.td3id = td3id;
	}
	/**
	 * 返回 团队3ID
	 * @return
	 */
	public String getTd3id() 
	{
		return this.td3id;
	}
	public void setJs3(String js3) 
	{
		this.js3 = js3;
	}
	/**
	 * 返回 教师3
	 * @return
	 */
	public String getJs3() 
	{
		return this.js3;
	}
	public void setJs3id(String js3id) 
	{
		this.js3id = js3id;
	}
	/**
	 * 返回 教师3ID
	 * @return
	 */
	public String getJs3id() 
	{
		return this.js3id;
	}
	public void setXh(String xh) 
	{
		this.xh = xh;
	}
	/**
	 * 返回 学号
	 * @return
	 */
	public String getXh() 
	{
		return this.xh;
	}
	/**
	 * 返回 姓名
	 * @return
	 */
	@Override
	public void setName(String name)
	{
		this.name = name;
	}
	
	@Override
	public String getName()
	{
		return this.name;
	}
	
	
	public void setTmdyzy(String tmdyzy) 
	{
		this.tmdyzy = tmdyzy;
	}
	/**
	 * 返回 
	 * @return
	 */
	public String getTmdyzy() 
	{
		return this.tmdyzy;
	}
	public void setKtdbjhmd(String ktdbjhmd) 
	{
		this.ktdbjhmd = ktdbjhmd;
	}
	/**
	 * 返回 课题的背景和目的
	 * @return
	 */
	public String getKtdbjhmd() 
	{
		return this.ktdbjhmd;
	}

	public void setYx(String yx) 
	{
		this.yx = yx;
	}
	/**
	 * 返回 院系
	 * @return
	 */
	public String getYx() 
	{
		return this.yx;
	}
	public void setZc(String zc) 
	{
		this.zc = zc;
	}
	/**
	 * 返回 职称
	 * @return
	 */
	public String getZc() 
	{
		return this.zc;
	}
	public void setSbsj(Date sbsj) 
	{
		this.sbsj = sbsj;
	}
	/**
	 * 返回 申报时间
	 * @return
	 */
	public Date getSbsj() 
	{
		return this.sbsj;
	}
	public void setTmmc(String tmmc) 
	{
		this.tmmc = tmmc;
	}
	/**
	 * 返回 题目名称
	 * @return
	 */
	public String getTmmc() 
	{
		return this.tmmc;
	}
	public void setTmly(String tmly) 
	{
		this.tmly = tmly;
	}
	/**
	 * 返回 题目来源
	 * @return
	 */
	public String getTmly() 
	{
		return this.tmly;
	}
	public void setTmlx(String tmlx) 
	{
		this.tmlx = tmlx;
	}
	/**
	 * 返回 题目类型
	 * @return
	 */
	public String getTmlx() 
	{
		return this.tmlx;
	}

	public void setKtnjjdwt(String ktnjjdwt) 
	{
		this.ktnjjdwt = ktnjjdwt;
	}
	/**
	 * 返回 课题拟解决的问题
	 * @return
	 */
	public String getKtnjjdwt() 
	{
		return this.ktnjjdwt;
	}
	public void setRjhj(String rjhj) 
	{
		this.rjhj = rjhj;
	}
	/**
	 * 返回 软件环境
	 * @return
	 */
	public String getRjhj() 
	{
		return this.rjhj;
	}
	public void setYjhj(String yjhj) 
	{
		this.yjhj = yjhj;
	}
	/**
	 * 返回 硬件环境
	 * @return
	 */
	public String getYjhj() 
	{
		return this.yjhj;
	}
	public void setKtyqmbhcg(String ktyqmbhcg) 
	{
		this.ktyqmbhcg = ktyqmbhcg;
	}
	/**
	 * 返回 课题预期目标和成果
	 * @return
	 */
	public String getKtyqmbhcg() 
	{
		return this.ktyqmbhcg;
	}
	public void setKtcgjzywcdgzrw(String ktcgjzywcdgzrw) 
	{
		this.ktcgjzywcdgzrw = ktcgjzywcdgzrw;
	}
	/**
	 * 返回 课题成果将主要完成的工作任务
	 * @return
	 */
	public String getKtcgjzywcdgzrw() 
	{
		return this.ktcgjzywcdgzrw;
	}
	public void setBktdcgxs(String bktdcgxs) 
	{
		this.bktdcgxs = bktdcgxs;
	}
	/**
	 * 返回 本课题的成果形式
	 * @return
	 */
	public String getBktdcgxs() 
	{
		return this.bktdcgxs;
	}
	public void setNf(String nf) 
	{
		this.nf = nf;
	}
	/**
	 * 返回 年份
	 * @return
	 */
	public String getNf() 
	{
		return this.nf;
	}
	/**
	 * 返回 上机机时
	 * @return
	 */
	public String getSjjs() 
	{
		return this.sjjs;
	}
	public void setSjjs(String sjjs) 
	{
		this.sjjs = sjjs;
	}
	/**
	 * 返回 阅读文献
	 * @return
	 */
	public String getYdwx() 
	{
		return this.ydwx;
	}
	public void setYdwx(String ydwx) 
	{
		this.ydwx = ydwx;
	}
	/**
	 * 返回 基本要求
	 * @return
	 */
	public String getJbyq() 
	{
		return this.jbyq;
	}
	public void setJbyq(String jbyq) 
	{
		this.jbyq =jbyq;
	}
	/**
	 * 返回 读书笔记字数
	 * @return
	 */
	public String getDsbjzs() 
	{
		return this.dsbjzs;
	}
	public void setDsbjzs(String dsbjzs) 
	{
		this.dsbjzs =dsbjzs;
	}
	/**
	 * 返回 图纸张数
	 * @return
	 */
	public String getTzzs() 
	{
		return this.tzzs;
	}
	public void setTzzs(String tzzs) 
	{
		this.tzzs =tzzs;
	}
	/**
	 * 返回 电路板块数
	 * @return
	 */
	public String getDlbks() 
	{
		return this.dlbks;
	}
	public void setDlbks(String dlbks) 
	{
		this.dlbks =dlbks;
	}
	/**
	 * 论文复杂性
	 * @return
	 */
	public String getFzx() 
	{
		return this.fzx;
	}
	public void setFzx(String fzx) 
	{
		this.fzx =fzx;
	}

	
	public String getOrgId() {
		return orgId;
	}
	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}
	
	
	public String getLabelId() {
		return labelId;
	}
	public void setLabelId(String labelId) {
		this.labelId = labelId;
	}
	/**
	 * 指导教师评语
	 * @return
	 */
	public String getFinalTchComment() {
		return finalTchComment;
	}
	public void setFinalTchComment(String finalTchComment) {
		this.finalTchComment = finalTchComment;
	}

	/**
	 * 评审教师评语
	 * @return
	 */
	public String getJudgeTchComment() {
		return judgeTchComment;
	}
	public void setJudgeTchComment(String judgeTchComment) {
		this.judgeTchComment = judgeTchComment;
	}


	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("td1", this.td1) 
		.append("td1id", this.td1id) 
		.append("js1", this.js1) 
		.append("js1id", this.js1id) 
		.append("td2", this.td2) 
		.append("td2id", this.td2id) 
		.append("js2", this.js2) 
		.append("js2id", this.js2id) 
		.append("td3", this.td3) 
		.append("td3id", this.td3id) 
		.append("js3", this.js3) 
		.append("js3id", this.js3id) 
		.append("xh", this.xh) 
		.append("name", this.name) 
		.append("ktdbjhmd", this.ktdbjhmd) 
		.append("yx", this.yx) 
		.append("zc", this.zc) 
		.append("tmmc", this.tmmc) 
		.append("tmly", this.tmly) 
		.append("tmlx", this.tmlx) 
		.append("ktnjjdwt", this.ktnjjdwt) 
		.append("rjhj", this.rjhj) 
		.append("yjhj", this.yjhj) 
		.append("ktyqmbhcg", this.ktyqmbhcg) 
		.append("ktcgjzywcdgzrw", this.ktcgjzywcdgzrw) 
		.append("bktdcgxs", this.bktdcgxs) 
		.append("nf", this.nf) 
		.append("sjjs", this.sjjs)
		.append("ydwx", this.ydwx)
		.append("jbyq", this.jbyq)
		.append("dsbjzs", this.dsbjzs)
		.append("tzzs", this.tzzs)
		.append("dlbks", this.dlbks)
		.append("zyckzl", this.zyckzl)	
		.append("gzmd",this.gzmd)
		.append("gznrjjtyq",this.gznrjjtyq)
		.append("gzjdfp",this.gzjdfp)
		.append("zddyfs",this.zddyfs)
		.append("fzx",this.fzx)
		.append("litishufile",this.litishufile)
		.append("renwushufile",this.renwushufile)
		.append("kt_bgrq",this.kt_bgrq)
		.append("kt_bjsm",this.kt_bjsm)
		.append("kt_zynr",this.kt_zynr)
		.append("kt_fajdjap",this.kt_fajdjap)
		.append("kaiti_zyzl",this.kaiti_zyzl)
		.append("renwushu_zyzl",this.renwushu_zyzl)
		.append("labelId",this.labelId)
		.append("orgId", this.orgId)
		.append("zqBatch",this.zqBatch)
		.append("zqResult",this.zqResult)
		.append("zqGrade",this.zqGrade)
		.append("dbBatch",this.dbBatch)
		.append("dbResult",this.dbResult)
		.append("dbGrade",this.dbGrade)
		.append("judgeTch",this.judgeTch)
		.append("finalTchOpinion",this.finalTchOpinion)
		.append("finalTchComment",this.finalTchComment)
		.append("judgeTchOpinion",this.judgeTchOpinion)
		.append("judgeTchComment",this.judgeTchComment)
		.append("normalPaperId",this.normalPaperId)
		.append("anonymousPaperId",this.anonymousPaperId)
		.append("finalTchDate",this.finalTchDate)
		.append("judgeTchDate",this.judgeTchDate)
		.append("judgeTchName",this.judgeTchName)
		.append("oneDb",this.oneDb)
		.append("twoDb",this.twoDb)
		.append("threeDb",this.threeDb)
		.append("fourDb",this.fourDb)
		.append("fiveDb",this.fiveDb)
		.append("totalDb",this.totalDb)
		.append("masterComment",this.masterComment)
		.append("masterName",this.masterName)
		.append("masterData",this.masterData)
		.toString();
	}
}
