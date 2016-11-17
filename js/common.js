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
		if(w>768){
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

	function go_to_href(e) {
		var href = $(this).attr("href") || $(this).attr("data-src");
		if(href) $(".wrapper").load(href);
		if($("body").width() < 768) sidebarHide();
		e.preventDefault();
	}
	//链接外部链接
	$(".iframe_a").on("click", iframe_add);
	function iframe_add(e) {
		var href = $(this).attr("href") || $(this).attr("data-src");
		var html = "<iframe width=\"100%\" src=\"" + href + "\" frameborder='0'></iframe>";
		$(".wrapper").html(html);
		var height = document.body.scrollHeight;
		document.querySelector("iframe").style.height = height + "px";
		
		if($("body").width() < 768) sidebarHide();
		e.preventDefault();
	}
})