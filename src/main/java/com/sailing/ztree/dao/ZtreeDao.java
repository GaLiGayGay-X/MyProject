
/**
 * 项目名称：SNAM_CLOUD_PLATFORM
 * 包名：com.sailing.ztree.dao
 * 文件名：ZtreeDao.java
 * 版本信息：@version 1.0
 * 日期：2017年11月15日-下午2:56:35
 * Copyright (c) 2017 Sailing. All Rights Reserved.
 */
package com.sailing.ztree.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.sailing.sdp.orm.hibernate.HibernateRepository;
import com.sailing.sdp.orm.hibernate.transformers.QueryResultTransformer;
import com.sailing.ztree.entity.EnumTypeZtree;

/**
 * 类名称：ZtreeDao
 * 类描述：TODO
 * 创建人：zhangkai
 * 创建时间：2017年11月15日 下午2:56:35
 * 修改人：zhangkai
 * 修改时间：2017年11月15日 下午2:56:35
 * 修改备注：
 */
@Repository
public class ZtreeDao extends HibernateRepository<EnumTypeZtree> {
    public List<EnumTypeZtree> getRootServiceType(){
        String sql = "SELECT t.ID AS id, t.PARENT_ID AS pId, t.ENUM_NAME AS name FROM bdsp_conf_enum_type t WHERE t.ID = '2c94a48a5f7193d5015f719520190000'";
        return this.findBySql(sql.toString(), QueryResultTransformer.ALIAS_TO_BEAN, EnumTypeZtree.class);
    }
        
    public List<EnumTypeZtree> getLevelOneServiceType(String parentId){
        String sql = "SELECT t.ID AS id, t.PARENT_ID AS pId, t.ENUM_NAME AS name FROM bdsp_conf_enum_type t WHERE t.PARENT_ID = ?";
        return this.findBySql(sql.toString(), QueryResultTransformer.ALIAS_TO_BEAN, EnumTypeZtree.class, parentId);
    }
    
    public List<EnumTypeZtree> getLevelZeroServiceType(String parentId){
        String sql = "SELECT t.ID AS id, t.DIC_NAME AS name, t.ENUM_TYPE_ID AS pId FROM bdsp_conf_data_dictionary t, bdsp_conf_enum_type t2 WHERE t.ENUM_TYPE_ID=t2.ID AND t2.ID = ?";
        return this.findBySql(sql.toString(), QueryResultTransformer.ALIAS_TO_BEAN, EnumTypeZtree.class, parentId);
    }
}

