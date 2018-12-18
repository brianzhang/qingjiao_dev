<#assign foreignKey=model.foreignKey>
<#-- 模板开始  -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="${namespace}">
	<resultMap id="${po}" type="${namespace}">
		<id property="${model.pkModel.colName}" column="${model.pkModel.columnName?upper_case}" jdbcType="${getJdbcType(model.pkModel.colDbType)}"/>
		<#list colList as col>
		<#if (!col.isPK)>
		<result property="${col.colName}" column="${col.columnName?upper_case}" jdbcType="${getJdbcType(col.colDbType)}"/>
		</#if>
		</#list>
	</resultMap>
	
	<sql id="columns">
		<#list colList as col>${col.columnName?upper_case}<#if col_has_next>,</#if></#list>
	</sql>
	
	<insert id="create" parameterType="${namespace}">
		INSERT INTO ${tableName?upper_case}
		(<include refid="columns"/>)
		VALUES 
		(<#list colList as col><#noparse>#{</#noparse>${col.colName},jdbcType=${getJdbcType(col.colDbType)}<#noparse>}</#noparse><#if col_has_next>, </#if></#list>)
	</insert>
	
	<select id="get"   parameterType="java.lang.String" resultMap="${po}">
		SELECT <include refid="columns"/> FROM ${tableName?upper_case} 
		WHERE 
		${pk?upper_case}=<#noparse>#{</#noparse>${model.pkModel.colName}}
	</select>
	
	<#--
	<select id="getLast" resultMap="${po}">
    	select <include refid="columns"/> from ${tableName} where ${pk} = (select max(${pk}) from ${tableName})
    </select>
	-->
	
	<select id="query" parameterType="java.util.Map" resultMap="${po}">
		SELECT <include refid="columns"/> FROM ${tableName?upper_case}
		<where>
			<if test="@Ognl@isNotEmpty(whereSql)">
				<#noparse>${</#noparse>whereSql}
			</if>
		</where>
		<if test="@Ognl@isNotEmpty(orderBySql)">
			ORDER BY <#noparse>${</#noparse>orderBySql}
		</if>
		<if test="@Ognl@isEmpty(orderBySql)">
			ORDER BY ${pk?upper_case} DESC
		</if>
	</select>
	
	<select id="findByIds"   resultMap="${po}">
		SELECT <include refid="columns"/> FROM ${tableName?upper_case}
			WHERE ${pk?upper_case} in 
			<foreach item="id" index="index" collection="ids" open="(" separator="," close=")">  
				<#noparse>#{id}  </#noparse>
			</foreach>  		
			ORDER BY ${pk?upper_case} DESC			
	</select>	
	
	<update id="update" parameterType="${namespace}">
		UPDATE ${tableName?upper_case} SET
		<#list commonList as col>
		${col.columnName?upper_case}=<#noparse>#{</#noparse>${col.colName},jdbcType=${getJdbcType(col.colDbType)}<#noparse>}</#noparse><#if col_has_next>,</#if>
		</#list>
		WHERE
		${pk?upper_case}=<#noparse>#{</#noparse>${model.pkModel.colName}}
	</update>
	
	<delete id="remove" parameterType="java.lang.String">
		DELETE FROM ${tableName?upper_case} 
		WHERE
		${pk?upper_case}=<#noparse>#{</#noparse>${model.pkModel.colName}}
	</delete>
	
	<#if sub?exists && sub==true>
	<delete id="deleteByMainId">
	    DELETE FROM ${tableName?upper_case}
	    WHERE
	    ${foreignKey?upper_case}=<#noparse>#{</#noparse>mainId}
	</delete>    
	
	<select id="findByMainId" resultMap="${po}">
	    SELECT *
	    FROM ${tableName?upper_case} 
	    WHERE ${foreignKey?upper_case}=<#noparse>#{</#noparse>mainId}
	</select>
	</#if>
	
</mapper>