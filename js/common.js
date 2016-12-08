$(function() {
	//side click show
	$('#sidebar .sub-menu>a').click(function() {
		var className = "active";
		var $o = $(this).parent("li");
		if(!$o.hasClass(className)) {
			$o.addClass(className).siblings("li").removeClass(className);
		} else {
			$o.removeClass(className);
		}
	});
	//aside 
	$("#nav-tab").on("click", function(e) {
			$('#sidebar').toggleClass('active');
			$(document).on("click", sidebarHide);
			var w = $(window).width();
			if(w > 768) {
				//屏幕时 隐藏侧栏
				$("#main-content").toggleClass('active');
			}
			e.stopPropagation();
		})
		//去冒泡
	$("#sidebar").on("click", function(e) {
			e.stopPropagation();
		})
		//隐藏aside
	function sidebarHide() {
		var $sidebar = $('#sidebar');
		$sidebar.removeClass('active')
		$sidebar.find("li").removeClass('active');
		$(document).off("click", sidebarHide)

	}
	//jump_a go to src
	$(".jump_a").on("click", go_to_href);
	//试图加载 ajax
	function go_to_href(e) {
		var href = $(this).attr("href") || $(this).attr("data-src");

		if(href) {
			//要加载页面的链接
			var url = hrefSearch({
				"iframe": "",
				"load": href
			});
			setHistory(url); //设置历史
			//load dom
			load_html(href)
		}
		return false;
		e.preventDefault();
	}
	//ajax 加载
	function load_html(href) {
		$(".wrapper").load(href);
		if($("body").width() < 768) sidebarHide();
	}
	//链接外部链接
	$(".iframe_a").on("click", iframe_add);
	//试图打开 iframe；
	function iframe_add(e) {
		var href = $(this).attr("href") || $(this).attr("data-src");

		//设置url
		var url = hrefSearch({
			"iframe": href,
			"load": ""
		});
		setHistory(url); //录入历史
		iframe_show(href)
		e.preventDefault();
	}
	//iframe show
	function iframe_show(href) {
		var html = "<iframe width=\"100%\" src=\"" + href + "\" frameborder='0'></iframe>";
		$(".wrapper").html(html);
		var height = document.body.scrollHeight;
		document.querySelector("iframe").style.height = height + "px";
		if($("body").width() < 768) sidebarHide();
	}
	//添加一个参数
	function hrefSearch(obj) {
		if(typeof obj != 'object') {
			console.log("hrefSearch({参:值（空时去除）)}")
			return false;
		}
		var searchs = getUrlParams(); //获得所有传参
		var strs = ''; //预存字符串
		//当存在参时遍历
		if(searchs) {
			//添加参
			for(key in obj) {
				searchs[key] = obj[key];
			};
			//to string
			for(key in searchs) {
				if(searchs[key]) {
					//为空时不执行
					var s = '&';
					if(!strs) s = '?';
					strs += (s + key + "=" + searchs[key]);
				}
			}

		} else {
			//不存在任何参时
			strs = ("?" + search + "=" + value);
		}
		//还原链接
		return strs;
	}
	//获取url的参数
	function GetQueryString(name, str) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var search = str ? str : window.location.search;
		var r = search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	//获取url的参数s
	function getUrlParams() {
		var search = window.location.search;
		// 写入数据字典  
		var tmparray = search.substr(1, search.length).split("&");
		var paramsArray = new Array;
		if(tmparray != null) {
			for(var i = 0; i < tmparray.length; i++) {
				var reg = /[=|^==]/; // 用=进行拆分，但不包括==  
				var set1 = tmparray[i].replace(reg, '&');
				var tmpStr2 = set1.split('&');
				if(tmpStr2) paramsArray[tmpStr2[0]] = tmpStr2[1];
			}
		}
		// 将参数数组进行返回  
		return paramsArray;
	}
	//历史记录存储
	function setHistory(src) {
		if(src) {
			//添加浏览器历史记录
			window.history.pushState({
				'url': src
			}, "", src);
		}
	}
	//页面链接处理
	function windowLoad(str) {
		var href = GetQueryString("load", str); //get load value
		var iframe = GetQueryString("iframe", str); //get iframe value 
		if(href) {
			load_html(href); //调用 loade
		} else if(iframe) {
			iframe_show(iframe); //调用 iframe
		} else {
			
			//执行第一个
			$(".jump_a").eq(0).triggerHandler("click");
		}
	};
	windowLoad();
	//当触发浏览器历史时触发
	window.addEventListener("popstate", function() {
		//		var state = history.state;
		//		var href = state.url;
		windowLoad();

	});

})