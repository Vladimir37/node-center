$(document).ready(function() {
	var curPath = window.location.pathname;
	var arrPath = curPath.split('/');
	$('.menu > a[href=\"/' + arrPath[1] + '\"] > nav').css('color', '#80BD01');
	$('.panel > a[href=\"/' + arrPath[1] + '/' + arrPath[2] + '\"] > p').css('background', '#80BD01');
	if(arrPath[2] === undefined) {
		$('.panel > a[href="/' + arrPath[1] + '/about"] > p').css('background', '#80BD01');
	};
	$('.admin_head').click(function() {
		$(this).next('.admin_form').slideToggle();
	});
});