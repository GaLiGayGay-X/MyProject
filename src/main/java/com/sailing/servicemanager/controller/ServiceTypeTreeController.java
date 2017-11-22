
/**
 * 项目名称：SNAM_CLOUD_PLATFORM
 * 包名：com.sailing.servicemanager.controller
 * 文件名：ServiceTypeTreeController.java
 * 版本信息：@version 1.0
 * 日期：2017年11月10日-上午9:28:46
 * Copyright (c) 2017 Sailing. All Rights Reserved.
 */
package com.sailing.servicemanager.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sailing.servicemanager.entity.BdspServiceBase;
import com.sailing.servicemanager.service.ServiceTypeZtreeService;

/**
 * 类名称：ServiceTypeTreeController
 * 类描述：TODO
 * 创建人：Administrator
 * 创建时间：2017年11月10日 上午9:28:46
 * 修改人：Administrator
 * 修改时间：2017年11月10日 上午9:28:46
 * 修改备注：
 */
@Controller
public class ServiceTypeTreeController {
    
    @Autowired
    private ServiceTypeZtreeService serviceTypeZtreeService;
    
    @RequestMapping("index")
    public String goToTree(){
        return "servicebasetree/ServiceBaseTRee";
    }
    /**
     * 
     * getAllService[这里用一句话描述这个方法的作用]
     * 创建人:  zhangkai
     * 创建时间: 2017年11月20日 上午10:02:22
     *
     * @Title: getAllService
     * @param searchKey
     * @param enumId
     * @param treeLayer
     * @return
     * @since  CodingExample　Ver(编码范例查看) 1.1
     */
    @RequestMapping("getAllService")
    @ResponseBody
    public List<Map> getAllService(String searchKey, String enumId, String treeLayer){
        List<Map> findRootServiceType = serviceTypeZtreeService.getAllService(searchKey, enumId, treeLayer);
        return findRootServiceType;
    }
    @RequestMapping("getServiceBaseForDetailById")
    @ResponseBody
    public Map getServiceBaseForDetailById(String id){
        return serviceTypeZtreeService.getServiceBaseForDetailById(id);
    }
    
    @RequestMapping("getServiceBaseForUpdateById")
    @ResponseBody
    public Map getServiceBaseForUpdateById(String id){
        return serviceTypeZtreeService.getServiceBaseForUpdateById(id);
    }
    
    @RequestMapping("getServiceType")
    @ResponseBody
    public List<Map> getServiceType(){
        return serviceTypeZtreeService.getServiceType();
     }
     
    @RequestMapping("getDevLanguage")
    @ResponseBody
     public List<Map> getDevLanguage(){
         return serviceTypeZtreeService.getDevLanguage();
     }
     
    @RequestMapping("getBizLine")
    @ResponseBody
     public List<Map> getBizLine(){
         return serviceTypeZtreeService.getBizLine();
     }
     
    @RequestMapping("getTopicType")
    @ResponseBody
     public List<Map> getTopicType(){
         return serviceTypeZtreeService.getTopicType();
     }
     
    @RequestMapping("getKeyElement")
    @ResponseBody
     public List<Map> getKeyElement(){
         return serviceTypeZtreeService.getKeyElement();
     }
    
}

