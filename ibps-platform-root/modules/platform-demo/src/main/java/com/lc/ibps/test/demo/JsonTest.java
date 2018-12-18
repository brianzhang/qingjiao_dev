package com.lc.ibps.test.demo;

import java.util.ArrayList;
import java.util.List;

import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.util.FastjsonUtil;
import com.lc.ibps.base.core.util.GsonUtil;
import com.lc.ibps.base.core.util.JacksonUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;

public class JsonTest {

	private static Person gdata(){
		Person person = new Person();
		
		person.setId("1");
		person.setName("x强");
		person.setAge(3L);
		person.setMoney(-110998.2D);
		person.setCreateTime(new java.util.Date());
		
		Address address = new Address();
		address.setCountry("中国");
		address.setProvince("广西");
		address.setCity("x市");
		address.setArea("y县");
		address.setStreet("z镇i街8号");
		person.setAddress(address);
		
		List<School> schoolList = new ArrayList<School>();
		School s1 = new School();
		s1.setName("x小学");
		s1.setNum("h1");
		s1.setBeginTime(new java.util.Date());
		s1.setEndTime(new java.util.Date());
		schoolList.add(s1);
		School s2 = new School();
		s2.setName("x初中");
		s2.setNum("d1");
		s2.setBeginTime(new java.util.Date());
		s2.setEndTime(new java.util.Date());
		schoolList.add(s2);
		School s3 = new School();
		s3.setName("y高中");
		s3.setNum("y1");
		s3.setBeginTime(new java.util.Date());
		s3.setEndTime(new java.util.Date());
		schoolList.add(s3);
		School s4 = new School();
		s4.setName("z大学");
		s4.setNum("b1");
		s4.setBeginTime(new java.util.Date());
		s4.setEndTime(new java.util.Date());
		schoolList.add(s4);
		person.setSchoolList(schoolList);
		
		return person;
	}
	
	public static void main(String[] args) {
		jackson();
//		jsonlib();
//		gson();
//		fastjson();
	}
	
	private static void jackson(){
		Person person = gdata();
		
		System.out.println("--------------Jackson:from bean to json string.-------------");
		String jackson = JacksonUtil.toJsonString(person);
		System.out.println(jackson);
		
		System.out.println("--------------Jackson:from json string to bean.-------------");
		Person tmpPerson = JacksonUtil.getDTO(jackson, Person.class);
		System.out.println(tmpPerson);
	}
	
	private static void jsonlib(){
		Person person = gdata();
		
		System.out.println("--------------Jsonlib:from bean to json string.-------------");
		String jsonlib = JsonUtil.getJSONString(person);
		System.out.println(jsonlib);
		
		System.out.println("--------------Jsonlib:from json string to bean.-------------");
		Person tmpPerson = JsonUtil.getDTO2(jsonlib, Person.class);
		System.out.println(tmpPerson);
	}
	
	private static void gson(){
		Person person = gdata();
		
		System.out.println("--------------Gson:from bean to json string.-------------");
		String gson = GsonUtil.toJsonString(person, StringPool.DATE_FORMAT_DATETIME);
		System.out.println(gson);
		
		System.out.println("--------------Gson:from json string to bean.-------------");
		Person tmpPerson = GsonUtil.getDTO(gson, Person.class, StringPool.DATE_FORMAT_DATETIME);
		System.out.println(tmpPerson);
	}
	
	private static void fastjson(){
		Person person = gdata();
		
		System.out.println("--------------Fastjson:from bean to json string.-------------");
		String fasstjson = FastjsonUtil.toJsonString(person);
		System.out.println(fasstjson);
		
		System.out.println("--------------Fastjson:from json string to bean.-------------");
		Person tmpPerson = FastjsonUtil.getDTO(fasstjson, Person.class);
		System.out.println(tmpPerson);
	}
	
}

class Person{
	private String id;
	private String name;
	private Long age;
	private Double money;
	private java.util.Date createTime;
	private Address address;
	private List<School> schoolList;
	
	@Override
	public String toString() {
		/*return "{" +
					"name:"+name + 
					",age:"+age + 
					",money:"+money + 
					",createTime:"+createTime + 
					",address:"+address + 
					",schoolList:"+schoolList + 
				"}";*/
		return name;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public java.util.Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(java.util.Date createTime) {
		this.createTime = createTime;
	}
	public Long getAge() {
		return age;
	}
	public void setAge(Long age) {
		this.age = age;
	}
	public Double getMoney() {
		return money;
	}
	public void setMoney(Double money) {
		this.money = money;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	public List<School> getSchoolList() {
		return schoolList;
	}
	public void setSchoolList(List<School> schoolList) {
		this.schoolList = schoolList;
	}
}

class Address{
	private String country;
	private String province;
	private String city;
	private String area;
	private String street;
	
	@Override
	public String toString() {
		return "{" +
					"country:"+country + 
					",province:"+province + 
					",city:"+city + 
					",area:"+area + 
					",street:"+street + 
				"}";
	}
	
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
}

class School{
	private String name;
	private String num;
	private java.util.Date beginTime;
	private java.util.Date endTime;
	
	@Override
	public String toString() {
		return "{" +
					"name:"+name + 
					",num:"+num + 
					",beginTime:"+beginTime + 
					",endTime:"+endTime + 
				"}";
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getNum() {
		return num;
	}
	public void setNum(String num) {
		this.num = num;
	}
	public java.util.Date getBeginTime() {
		return beginTime;
	}
	public void setBeginTime(java.util.Date beginTime) {
		this.beginTime = beginTime;
	}
	public java.util.Date getEndTime() {
		return endTime;
	}
	public void setEndTime(java.util.Date endTime) {
		this.endTime = endTime;
	}
}
