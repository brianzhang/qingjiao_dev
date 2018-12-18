package com.utils;

import java.util.Arrays;

import org.apache.commons.lang3.StringUtils;


public interface Constants {
	
	
	//base
	String SUMMER="07-06",WINTER="01-06";
	String __role_id[] = {"","357920019021037568","357966595638689792"};
			//导入类型名称
	String __course = "课程",__tch = "教师" , __std ="学生",__crs_tch = "教师授课表",__crs_std= "学生上课表",__more_info = "补充信息",__org="组织信息",__udgrad_std = "毕设学生名单", __udgrad_tch="毕设教师名单",__udgrad_leadteam="毕设-院学士学位论文领导小组",
			//字段名称集合
			__crs_tch_id="通知单编号",__crs_num = "课程编号" , __crs_name = "课程名称" , __crs_period = "计划学时" , __crs_college = "开课院系" , __crs_category = "课程性质" , __crs_method = "考核方式" , __crs_credit = "学分",
			__tch_num = "教工号" , __tch_name = "教师姓名",__crs_term = "上课学期" , __crs_location = "上课地点" , __crs_time = "上课时间" , __crs_class =  "上课班级",
			__std_num = "学号" , __std_name = "学生姓名" , __std_class = "班级" , __std_pro = "专业" , __std_college = "院系",__std_score = "学生成绩",__crs_manage="课程管理",_crs_mon = "星期",_crs_section = "节次";
			;
			
	
	//import data
	int COURSE = 0,TEACHER = 1,STUDENT = 2,CRSTCH = 3,CRSSTD = 4 ,TCH_IMPORT_STD = 5 , MORE_INFO_S = 6, MORE_INFO_T = 7 ,ORG=8, UDGRAD_STD = 9 , UDGRAD_TCH=10,UDGRAD_lEADTEAM=11;
	String[] __in_ty = { __course , __tch , __std, __crs_tch ,__crs_std,__std , __more_info ,__more_info , __org ,__udgrad_std , __udgrad_tch,__udgrad_leadteam};
	String[] __in_fields = { 
				StringUtils.join(Arrays.asList(__crs_num , __crs_name , __crs_period , __crs_college , __crs_category , __crs_method , __crs_credit ), ',' ) ,
				StringUtils.join(Arrays.asList(__tch_num , __tch_name ), ',' ),
				StringUtils.join(Arrays.asList(__std_num , __std_name ,__std_class) , ','),
				StringUtils.join(Arrays.asList(__tch_num , __crs_num , __crs_term , __crs_location , __crs_time , __crs_class ,__crs_tch_id,__crs_manage,_crs_mon,_crs_section), ',' ),
				StringUtils.join(Arrays.asList(__std_num , __crs_tch_id) , ',' ),
				StringUtils.join(Arrays.asList(__std_num ,__std_name) , ',' ),
				StringUtils.join(Arrays.asList(__std_num ,__std_class) , ',' ),
				StringUtils.join(Arrays.asList(__tch_num ) , ',' ),
				StringUtils.join(Arrays.asList(__std_class) , ',' ),
				StringUtils.join(Arrays.asList(__std_num ) , ',' ),
				StringUtils.join(Arrays.asList(__tch_num ) , ',' ),
				StringUtils.join(Arrays.asList(__tch_num ) , ',' )

			};
	String[] __out_fields = { 
			StringUtils.join(Arrays.asList(__crs_num , __crs_name , __crs_period , __crs_college , __crs_category , __crs_method , __crs_credit ), ',' ) ,
			StringUtils.join(Arrays.asList(__tch_num , __tch_name ), ',' ),
			StringUtils.join(Arrays.asList(__std_num , __std_name ) , ','),
			StringUtils.join(Arrays.asList( __crs_num , __crs_name , __crs_term , __crs_location , __crs_time , __crs_class ,__crs_tch_id), ',' ),
			StringUtils.join(Arrays.asList(__std_num , __std_name , __std_score) , ',' ),
			StringUtils.join(Arrays.asList(__std_num ,__std_name) , ',' )
		};
	
	//practise->crsTch
	String[] STATUSLIST = {"未开始","进行中","已结束"};
	
	//role
	String __tch_rid = "357920019021037568",__std_rid="357966595638689792",__admin_rid="357966512222371840",
			__tch_url="/crsTch/list.htm",__std_url="/crsStd/list.htm?admin=false",__admin_url="/course/list.htm";
	
	String[]  __term_list = {	
									   "2017-2018-1"
									   ,"2016-2017-暑假"
									   };
	
	
}
