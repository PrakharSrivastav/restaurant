$(document).ready(function() {
	// Code to toggle the arrow sign on click
		$(".collapsed").click(function() {
		change = $(this).find(".fa");
		if(change.hasClass('fa-angle-down'))
		{
			change.removeClass('fa-angle-down');
			change.addClass('fa-angle-up');
		}
		else
		{
			change.removeClass('fa-angle-up');
			change.addClass('fa-angle-down');
		}
	});


});
