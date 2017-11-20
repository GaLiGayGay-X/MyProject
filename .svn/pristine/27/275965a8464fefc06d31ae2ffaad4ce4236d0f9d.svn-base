
/**
 * 项目名称：SNAM_CLOUD_PLATFORM
 * 包名：com.sailing.ztree.controller
 * 文件名：ZtreeController.java
 * 版本信息：@version 1.0
 * 日期：2017年11月15日-下午2:53:54
 * Copyright (c) 2017 Sailing. All Rights Reserved.
 */
package com.sailing.ztree.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sailing.ztree.entity.EnumTypeZtree;
import com.sailing.ztree.service.ZtreeService;


/**
 * 类名称：ZtreeController
 * 类描述：TODO
 * 创建人：zhangkai
 * 创建时间：2017年11月15日 下午2:53:54
 * 修改人：zhangkai
 * 修改时间：2017年11月15日 下午2:53:54
 * 修改备注：
 */
@Controller
@RequestMapping(value="/ztreeController")
public class ZtreeController {
    @Autowired
    private ZtreeService ztreeService;
    
    @RequestMapping("getServiceTypeTree")
    @ResponseBody
    public List<EnumTypeZtree> getServiceTypeTree(String id, String name, String level){
        return ztreeService.getServiceTypeTree(id, name, level);
    }
}

