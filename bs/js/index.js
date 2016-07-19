//首页js
$(function() {
	//导航
	$(".nav a").click(function() {
		//点击触发导航按钮事件
		if(window.innerWidth < 750) {
			$(".navbar-toggle").trigger('click');
		}

	})
	//颜色选择
	$('body').on('change','#color_filter',function() {
		var selected = $(this).find(':selected').val();
		jQuery(".swatches").hide();
		jQuery('#' + selected).show();
	}).change();

})