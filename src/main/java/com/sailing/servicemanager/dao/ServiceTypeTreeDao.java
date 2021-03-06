
/**
 * 项目名称：SNAM_CLOUD_PLATFORM
 * 包名：com.sailing.servicemanager.dao
 * 文件名：ServiceBaseTree.java
 * 版本信息：@version 1.0
 * 日期：2017年11月10日-上午9:24:23
 * Copyright (c) 2017 Sailing. All Rights Reserved.
 */
package com.sailing.servicemanager.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.sailing.sdp.orm.hibernate.HibernateRepository;
import com.sailing.sdp.orm.hibernate.transformers.QueryResultTransformer;
import com.sailing.servicemanager.entity.BdspConfDataDictionary;
import com.sailing.servicemanager.entity.BdspServiceBase;

/**
 * 类名称：ServiceBaseTree
 * 类描述：TODO
 * 创建人：Administrator
 * 创建时间：2017年11月10日 上午9:24:23
 * 修改人：Administrator
 * 修改时间：2017年11月10日 上午9:24:23
 * 修改备注：
 */
@Repository
public class ServiceTypeTreeDao extends HibernateRepository<BdspServiceBase> {

    public List<Map> getAllService(String searchKey, String enumId, String treeLayer) {
        StringBuffer sb = new StringBuffer();
        List<String> list = new ArrayList<>();
        sb.append("SELECT t.*, t2.DIC_NAME AS dicname FROM bdsp_service_base t, bdsp_conf_enum_type t1, bdsp_conf_data_dictionary t2, bdsp_service_enum_relation t3"+ 
                " WHERE t.SERVICE_ID = t3.SERVICE_ID AND t1.ID = t3.ENUM_ID AND t2.ID = t3.DIC_ID");
        if (StringUtils.isNotBlank(enumId) && "1".equals(treeLayer)) {
            sb.append(" AND t1.ID = ?");
            list.add(enumId);

        }
        if (StringUtils.isNotBlank(enumId) && "2".equals(treeLayer)) {
            sb.append(" AND t2.ID = ?");
            list.add(enumId);
        }
        if (StringUtils.isNotBlank(searchKey)) {
            sb.append(" AND (t.SERVICE_NAME LIKE ? OR t.SERVICE_CODE LIKE ?)");
            list.add("%" + searchKey.trim() + "%");
            list.add("%" + searchKey.trim() + "%");
        }
        if ("0".equals(treeLayer) || StringUtils.isBlank(treeLayer)) {
            sb.append(" GROUP BY t.SERVICE_ID");
        }
        sb.append(" ORDER BY t.OPERATE_TIME DESC");
        return this.findBySql(sb.toString(), QueryResultTransformer.ALIAS_TO_ENTITY_MAP_CAMEL_CASE, Map.class, list.toArray());
    }
    
    public Map getServiceBaseForDetailById(String id){
        String sql = "SELECT t.SERVICE_CODE, t.SERVICE_NAME, t.SI_CODE, t3.DIC_NAME, t.SERVICE_STATUS, t.REMARK, t.OPERATE_PERSON, t.OPERATE_TIME, "+ 
                    "(SELECT DIC_NAME FROM bdsp_conf_data_dictionary t1 WHERE t.DEV_LANGUAGE = t1.ID) as DEV_LANGUAGE, "+ 
                    "(SELECT DIC_NAME FROM bdsp_conf_data_dictionary t1 WHERE t.BIZ_LINE = t1.ID ) as BIZ_LINE, "+
                    "(SELECT DIC_NAME FROM bdsp_conf_data_dictionary t1 WHERE t.TOPIC_TYPE = t1.ID ) as TOPIC_TYPE, "+
                    "(SELECT DIC_NAME FROM bdsp_conf_data_dictionary t1 WHERE t.KEY_ELEMENT = t1.ID ) as KEY_ELEMENT "+
                    "FROM bdsp_service_base t, bdsp_service_enum_relation t4, bdsp_conf_enum_type t2, bdsp_conf_data_dictionary t3 "+
                    "WHERE t.SERVICE_ID = t4.SERVICE_ID AND t2.ID = t4.ENUM_ID AND t3.ID = t4.DIC_ID AND t.SERVICE_ID = ?";
        List<Map> findBySql = this.findBySql(sql.toString(), QueryResultTransformer.ALIAS_TO_ENTITY_MAP_CAMEL_CASE, Map.class, id);
        return findBySql.get(0);
    }
    
    public Map getServiceBaseForUpdateById(String id){
        String sql = "SELECT t.*, t1.DIC_ID as SER_TYPE FROM bdsp_service_base t, bdsp_service_enum_relation t1 WHERE t.SERVICE_ID = t1.SERVICE_ID AND t.SERVICE_ID = ?";
        List<Map> findBySql = this.findBySql(sql.toString(), QueryResultTransformer.ALIAS_TO_ENTITY_MAP_CAMEL_CASE, Map.class, id);
        return findBySql.get(0);
    }
    
    public List<Map> getServiceType(){
        String sql = "SELECT t1.ID, t1.DIC_NAME as SERVICE_TYPE FROM bdsp_conf_enum_type t ,bdsp_conf_data_dictionary t1 WHERE t.ID = t1.ENUM_TYPE_ID AND t.PARENT_ID = '2c94a48a5f7193d5015f719520190000'";
        return this.findBySql(sql.toString(), QueryResultTransformer.ALIAS_TO_ENTITY_MAP_CAMEL_CASE, Map.class);
    }
    
    public List<Map> getDevLanguage(){
        String sql = "SELECT t.ID,t.DIC_NAME as DEV_LANGUAGE FROM bdsp_conf_data_dictionary t WHERE t.ENUM_TYPE_ID = '2c94a48a5f956f2a015f95713c890000'";
        return this.findBySql(sql.toString(), QueryResultTransformer.ALIAS_TO_ENTITY_MAP_CAMEL_CASE, Map.class);
    }
    
    public List<Map> getBizLine(){
        String sql = "SELECT t.ID,t.DIC_NAME as BIZ_LINE FROM bdsp_conf_data_dictionary t WHERE t.ENUM_TYPE_ID = '2c94a48c5f564912015f567046af0000'";
        return this.findBySql(sql.toString(), QueryResultTransformer.ALIAS_TO_ENTITY_MAP_CAMEL_CASE, Map.class);
    }
    
    public List<Map> getTopicType(){
        String sql = "SELECT t.ID,t.DIC_NAME as TOPIC_TYPE FROM bdsp_conf_data_dictionary t WHERE t.ENUM_TYPE_ID = '2c94a48a5f957861015f957fff0e0000'";
        return this.findBySql(sql.toString(), QueryResultTransformer.ALIAS_TO_ENTITY_MAP_CAMEL_CASE, Map.class);
    }
    
    public List<Map> getKeyElement(){
        String sql = "SELECT t.ID,t.DIC_NAME as KEY_ELEMENT FROM bdsp_conf_data_dictionary t WHERE t.ENUM_TYPE_ID = '2c94a48a5f957861015f9581ecff0001'";
        return this.findBySql(sql.toString(), QueryResultTransformer.ALIAS_TO_ENTITY_MAP_CAMEL_CASE, Map.class);
    }
    
    public Boolean checkNameExist(String serviceCode){
        String sql = "SELECT t.* FROM bdsp_service_base t WHERE t.SERVICE_CODE = ?";
        List<BdspServiceBase> findBySql = this.findBySql(sql.toString(), QueryResultTransformer.ALIAS_TO_BEAN, BdspServiceBase.class, serviceCode);
        if (findBySql.size() == 0) {
            return true;
        }else {
            return false;
        }
    }
    
    public BdspServiceBase updateServiceBase(String serviceId3, String serviceCode3, String serviceName3, 
            String devLanguage3, String bizLine3, String topicType3, String keyElement3, String remark3){
        //String sql = "UPDATE bdsp_service_base t SET t.SERVICE_CODE = ?, t.SERVICE_NAME= ?, t.SERVICE_NAME = ?, t.DEV_LANGUAGE = ?, t.BIZ_LINE =?, t.TOPIC_TYPE = ?, t.KEY_ELEMENT = ?, t.REMARK = ? WHERE t.SERVICE_ID = ?";
        
        return null;
    }
}
