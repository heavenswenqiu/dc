$(function(){
	$("body").scroll(function(){
			
	})
	function loadeHtml($o){
		var html = $o.attr('data-href');
		$o.load(html);
	}
	function scrollfun(){
		var top = $("body").scrollTop();
		console.log(top);
	}
})
