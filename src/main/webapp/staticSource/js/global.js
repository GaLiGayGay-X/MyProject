var UI = function(){
	return {
		ROOT_PATH:'',
		init: function(){
			UI.handleBaseURL();
			UI.handleIE();
			/*UI.handleSidebarResponsive();
			UI.handlePanelScroll();
			UI.handlePopover();
			UI.handleTooltip();
			UI.handlePanelToolAction();
			UI.initCopyrightYear();
			UI.chosenSelect();
			UI.textareaAutosize();
			UI.textareaMaxlength();
			UI.progressBar();
			UI.prettyCode();
			UI.iframeNiceScroll();
			UI.formValidateInit();*/
		},
		// =========================================================================
        // SET UP BASE URL
        // =========================================================================
		handleBaseURL: function () {
            var getUrl = window.location,
            ROOT_PATH = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
            return ROOT_PATH;
        },
		// =========================================================================
        // IE SUPPORT
        // =========================================================================
        handleIE: function () {
            // IE mode
            var isIE8 = false;
            var isIE9 = false;
            var isIE10 = false;

            // initializes main settings for IE
            isIE8 = !! navigator.userAgent.match(/MSIE 8.0/);
            isIE9 = !! navigator.userAgent.match(/MSIE 9.0/);
            isIE10 = !! navigator.userAgent.match(/MSIE 10.0/);

            if (isIE10) {
                $('html').addClass('ie10'); // detect IE10 version
            }

            if (isIE10 || isIE9 || isIE8) {
                $('html').addClass('ie'); // detect IE8, IE9, IE10 version
            }
            //just notify you to upgrade your browser or change another browser such as firefox or google chrome if the browser is ie8
            if(isIE8){
            	if($("#upgrade").length){
            		setTimeout(function(){
            			$("#upgrade").fadeOut("normal",function(){
            				$("#upgrade").remove();
            			});
            		},3000);
            	}
            }
            // Fix input placeholder issue for IE8 and IE9
            if (isIE8 || isIE9) { // ie8 & ie9
            	$(".navbar-minimize").hide();
            	if($(".navbar-setting").length)
            		$(".navbar-setting").hide();
            	// this is html5 placeholder fix for inputs, inputs with placeholder-no-fix class will be skipped(e.g: we need this for password fields)
            	$('input').placeholder();
            }
        },
        // =========================================================================
        // SIDEBAR RESPONSIVE
        // =========================================================================
        /*handleSidebarResponsive:function(){
        	// Optimalisation: Store the references outside the event handler:
        	var $window = $(window);
        	function checkWidth() {
        		var windowsize = $window.width();
        		// Check if view screen on greater then 720px and smaller then
        		// 1024px
        		if (windowsize > 768 && windowsize <= 1024) {
        			$('body').addClass('page-sidebar-minimize-auto');
        		} else if (windowsize <= 768) {
        			$('body').removeClass('page-sidebar-minimize');
        			$('body').removeClass('page-sidebar-minimize-auto');
        		} else {
        			$('body').removeClass('page-sidebar-minimize-auto');
        		}
        	}
        	// Execute on load
        	checkWidth();
        	// Bind event listener
        	$(window).resize(checkWidth);

        	// When the minimize trigger is clicked
        	$('.navbar-minimize a').on('click', function() {
        		// Check class sidebar right show
        		if ($('.page-sidebar-right-show').length) {
        			$('body').removeClass('page-sidebar-right-show');
        		}
        		// Check class sidebar minimize auto
        		if ($('.page-sidebar-minimize-auto').length) {
        			$('body').removeClass('page-sidebar-minimize-auto');
        		} else {
        			// Toggle the class to the body
        			$('body').toggleClass('page-sidebar-minimize');
        		}
        		// Check the current cookie value
        		// If the cookie is empty or set to not active, then add
        		// page_sidebar_minimize
        		if ($.cookie('page_sidebar_minimize') == "undefined"
        				|| $.cookie('page_sidebar_minimize') == "not_active") {

        			// Set cookie value to active
        			$.cookie('page_sidebar_minimize', 'active', {
        				expires : 1
        			});
        		}
        		// If the cookie was already set to active then remove it
        		else {
        			// Remove cookie with name page_sidebar_minimize
        			$.removeCookie('page_sidebar_minimize');
        			// Create cookie with value to not_active
        			$.cookie('page_sidebar_minimize', 'not_active', {
        				expires : 1
        			});
        		}
        	});

        	$('.navbar-setting a').on('click', function() {
        		if ($('.page-sidebar-minimize.page-sidebar-right-show').length) {
        			$('body').toggleClass('page-sidebar-minimize page-sidebar-right-show');
        		} else if ($('.page-sidebar-minimize').length) {
        			$('body').toggleClass('page-sidebar-right-show');
        		} else {
        			$('body').toggleClass('page-sidebar-minimize page-sidebar-right-show');
        		}
        	});

        	// This action available on mobile view
        	$('.navbar-minimize-mobile.left').on('click', function() {
        		if ($('body.page-sidebar-right-show').length) {
        			$('body').removeClass('page-sidebar-right-show');
        			$('body').removeClass('page-sidebar-minimize');
        		}
        		$('body').toggleClass('page-sidebar-left-show');
        	});
        	
        	$('.navbar-minimize-mobile.right').on('click', function() {
        		if ($('body.page-sidebar-left-show').length) {
        			$('body').removeClass('page-sidebar-left-show');
        			$('body').removeClass('page-sidebar-minimize');
        		}
        		$('body').toggleClass('page-sidebar-right-show');
        	});
        },
        // =========================================================================
        // PANEL NICESCROLL
        // =========================================================================
        handlePanelScroll: function () {
            if($('.panel-scrollable').length){
                $('.panel-scrollable .panel-body').niceScroll({
                    cursorwidth: '10px',
                    cursorborder: '0px'
                });
            }
        },
     // =========================================================================
        // PANEL TOOL ACTION
        // =========================================================================
        handlePanelToolAction: function () {
            // Collapse panel
            $('[data-action=collapse]').on('click', function(e){
                var targetCollapse = $(this).parents('.panel').find('.panel-body'),
                    targetCollapse2 = $(this).parents('.panel').find('.panel-sub-heading'),
                    targetCollapse3 = $(this).parents('.panel').find('.panel-footer');
                if((targetCollapse.is(':visible'))) {
                    $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
                    targetCollapse.slideUp();
                    targetCollapse2.slideUp();
                    targetCollapse3.slideUp();
                }else{
                    $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
                    targetCollapse.slideDown();
                    targetCollapse2.slideDown();
                    targetCollapse3.slideDown();
                }
                e.stopImmediatePropagation();
            });

            // Remove panel
            $('[data-action=remove]').on('click', function(){
                $(this).parents('.panel').fadeOut();
                // Remove backdrop element panel full size
                if($('body').find('.panel-fullsize').length)
                {
                    $('body').find('.panel-fullsize-backdrop').remove();
                }
            });

            // Expand panel
            $('[data-action=expand]').on('click', function(){
            	var resizeCallback = eval($(this).attr('resize-callback'));
                if($(this).parents(".panel").hasClass('panel-fullsize'))
                {
                    $('body').find('.panel-fullsize-backdrop').remove();
                    $(this).data('bs.tooltip').options.title = 'Expand';
                    $(this).find('i').removeClass('fa-compress').addClass('fa-expand');
                    $(this).parents(".panel").removeClass('panel-fullsize');
                }
                else
                {
                    $('body').append('<div class="panel-fullsize-backdrop"></div>');
                    $(this).data('bs.tooltip').options.title = 'Minimize';
                    $(this).find('i').removeClass('fa-expand').addClass('fa-compress');
                    $(this).parents(".panel").addClass('panel-fullsize');
                }
                if($.isFunction(eval(resizeCallback))){
                	resizeCallback();
                }
            });
            
         // Refresh panel
            $('[data-action=refresh]').on('click', function(){
            	var refreshCallback = eval($(this).attr('refresh-callback'));
                if($.isFunction(refreshCallback)){
                	refreshCallback();
                }
            });
        },
        // =========================================================================
        // PANEL MASK SHOW
        // =========================================================================
        
         * @param target
         * Jquery选择器，如：#id、.cssClassName...
         * 
        handlePanelMaskShow:function(target){
        	var targetElement = $(target).find('.panel-body');
            targetElement.append('<div class="indicator"><span class="spinner"></span></div>');
        },
        // =========================================================================
        // PANEL MASK HIDE
        // =========================================================================
        
         * @param target
         * Jquery选择器，如：#id、.cssClassName...
         * 
        handlePanelMaskHide:function(target){
        	var maskElement = $(target).find('.indicator');
        	maskElement.hide();
        },
        // =========================================================================
        // TOOLTIP
        // =========================================================================
        handleTooltip: function () {
            if($('[data-toggle=tooltip]').length){
                $('[data-toggle=tooltip]').tooltip({
                    animation: 'fade'
                });
            }
        },

        // =========================================================================
        // POPOVER
        // =========================================================================
        handlePopover: function () {
            if($('[data-toggle=popover]').length){
                $('[data-toggle=popover]').popover();
            }
        },
		// =========================================================================
        // COPYRIGHT YEAR
        // =========================================================================
        initCopyrightYear : function () {
            if($('#copyright-year').length){
                var today = new Date();
                $('#copyright-year').text(today.getFullYear());
            }
        },
        // =========================================================================
        // CHOSEN SELECT
        // =========================================================================
        chosenSelect: function () {
            if($('.chosen-select').length){
            	$('.chosen-select').each(function() {
            		// 判断是否从URL加载options
            		var select_obj = $(this);
            		var hidden_option = select_obj.find("option[name=" + $(this).attr("id") + "-url]");
            		
            		if(hidden_option.size() > 0) {
            			var url = hidden_option.val();
            			var value_key = hidden_option.attr('value-key');
            			var text_key = hidden_option.attr('text-key');
            			
            			$.ajax({
            			    url: url,
            			    type: "GET",
            			    dataType: "JSON",
            			    beforeSend: function() {
            			    	console.log("加载option数据...");
            			    },
            			    success: function(data) {
            			        if(data) {
            			        	for(var i = 0; i < data.length; i++) {
            			        		select_obj.append('<option value="' + data[i][value_key] + '">' + data[i][text_key] + '</option>');
            			        	}
            			        	hidden_option.remove();
            			        	select_obj.chosen({
                                    	//禁用search搜索框，{true|false},默认为false，不禁用
                                    	disable_search:false
                                    });
            			        }
            			    },
            			    error: function() {
            			        console.log("网络异常，请联系管理员！");
            			    }
            			});
            		}else {
			        	$(this).chosen({
                        	//禁用search搜索框，{true|false},默认为false，不禁用
                        	disable_search:false
                        });
            		}
            	});
            }
        },
        // =========================================================================
        // TEXTAREA MAXLENGTH
        // =========================================================================
        textareaMaxlength: function () {
            if($('.character-limit').length){
                $('.character-limit').maxlength({
                    alwaysShow: true,
                    threshold: 20,
                    warningClass: "label label-success",
                    limitReachedClass: "label label-danger",
                    separator: ' 至 ',
                    preText: '你已输入了',
                    postText: ' 个字符.',
                    placement: 'centered-right'
                });
            }
        },

        // =========================================================================
        // TEXTAREA AUTOSIZE
        // =========================================================================
        textareaAutosize: function () {
            if($('textarea.autosize').size()){
                autosize($('textarea.autosize'));
            }
        },
        // =========================================================================
        // PROGRESS BAR INIT
        // =========================================================================
        progressBar:function(){
        	if($('.progress .progress-bar').length){
        		$('.progress .progress-bar').progressbar({
        			transition_delay: 1000,
        			refresh_speed: 50,
        			display_text: 'fill'
        		});
        	}
        },
        // =========================================================================
        // PRETTY CODE:HTML JAVA CSS JAVASCRIPT XML SQL
        // =========================================================================
        prettyCode:function(){
        	//html格式
        	if($("pre.htmlCode").length){
        		$("pre.htmlCode").snippet("html",{
    				style:'matlab',
    				clipboard:UI.handleBaseURL()+"/static/showcase/js/ZeroClipboard.swf"
    			});
        	}
        	//java格式
        	if($("pre.java").length){
        		$("pre.java").snippet("java",{
        			style:'matlab',
        			clipboard:UI.handleBaseURL()+"/static/showcase/js/ZeroClipboard.swf"
        		});
        	}
        	//css格式
        	if($("pre.style").length){
        		$("pre.style").snippet("css",{
        			style:'matlab',
        			clipboard:UI.handleBaseURL()+"/static/showcase/js/ZeroClipboard.swf"
        		});
        	}
        	//javascript格式
        	if($("pre.javascript").length){
        		$("pre.javascript").snippet("javascript",{
        			style:'matlab',
        			clipboard:UI.handleBaseURL()+"/static/showcase/js/ZeroClipboard.swf"
        		});
        	}
        	//xml格式
        	if($("pre.xml").length){
        		
        		$("pre.xml").snippet("xml",{
        			style:'matlab',
        			clipboard:UI.handleBaseURL()+"/static/showcase/js/ZeroClipboard.swf"
        		});
        	}
        	//SQL格式
        	if($("pre.sql").length){
        		$("pre.sql").snippet("sql",{
        			style:'matlab',
        			clipboard:UI.handleBaseURL()+"/static/showcase/js/ZeroClipboard.swf"
        		});
        	}
        },
        // =========================================================================
        // IFRAME SCROLL
        // =========================================================================
        iframeNiceScroll:function(){
        	if($('html').length){
                $('html').niceScroll({
                    cursorwidth: '10px',
                    cursorborder: '0px'
                });
            }
        },
        // =========================================================================
        // JQUERY VALIDATION CONSTRUTORS INIT
        // =========================================================================
        formValidateInit:function(){
        	$.validator.setDefaults({
        	    errorElement: "label",
        	    errorClass: "error",
        	    highlight: function (element, errorClass, validClass) {
        	        $(element).closest('.form-group').addClass('has-error');
        	    },
        	    unhighlight: function (element, errorClass, validClass) {
        	        $(element).closest('.form-group').removeClass('has-error');
        	    },
        	    errorPlacement: function (error, element) {
        	    	if(element.parent().hasClass('ckbox')) {
        	    		// 高级复选框
        	    		error.insertAfter(element.parent().parent().find('.ckbox:last'));
        	    	}else if(element.parent().hasClass('rdio')) {
        	    		// 高级单选框
        	    		error.insertAfter(element.parent().parent().find('.rdio:last'));
        	    	}else if (element.parent('.input-group').length) {
        	    		// 一般表单元素
        	            error.insertAfter(element.parent());
        	        }else if(element.attr('type') === 'checkbox') {
        	        	// 一般复选框
        	        	if(element.parent().get(0).tagName == 'LABEL' && element.parent().hasClass('checkbox-inline')) {
        	        		// 横向排列复选框
        	        		element.parent().parent().append(error);
        	        	}else if(element.parent().get(0).tagName == 'LABEL' && element.parent().parent().hasClass('checkbox')){
        	        		// 纵向排列的复选框
        	        		element.parent().parent().parent().append(error);
        	        	}else {
        	        		// 默认复选框
        	        		element.parent().append(error);
        	        	}
        	        }else if(element.attr('type') === 'radio'){
        	        	// 一般单选框
        	        	if(element.parent().get(0).tagName == 'LABEL' && element.parent().hasClass('radio-inline')) {
        	        		// 横向排列单选框
        	        		element.parent().parent().append(error);
        	        	}else if(element.parent().get(0).tagName == 'LABEL' && element.parent().parent().hasClass('radio')){
        	        		// 纵向排列的单选框
        	        		element.parent().parent().parent().append(error);
        	        	}else {
        	        		// 默认单选框
        	        		element.parent().append(error);
        	        	}
        	        }else if(element.attr('type') === 'file'){
        	        	element.parent().parent().append(error);
        	        }else if(element.hasClass('chosen-select')){
        	        	$("#" + element.attr('id') + "_chosen").append(error);
        	        } else {
        	            error.insertAfter(element);
        	        }
        	    }
        	});

        }*/
	}; 
}();
	UI.init();