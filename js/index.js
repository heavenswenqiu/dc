//首页js
$(function() {
	//颜色选择
	$('body').on('change', '#color_filter', function() {
		var selected = $(this).find(':selected').val();
		jQuery(".swatches").hide();
		jQuery('#' + selected).show();
	}).change();

})