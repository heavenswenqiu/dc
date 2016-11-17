;(function($){
	$("[data-toggle='page']").on("click",function(e){
		var id = $(this).attr("href");
		$(id).toggleClass("active");
		e.preventDefault();
	})
})(window.jQuery||window.Zepto)
