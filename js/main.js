$(document).ready(function() {
	// Code to toggle the arrow sign on click
	$(".collapsed").click(function() {
		change = $(this).find(".fa");
		if (change.hasClass('fa-angle-down')) {
			change.removeClass('fa-angle-down');
			change.addClass('fa-angle-up');
		} else {
			change.removeClass('fa-angle-up');
			change.addClass('fa-angle-down');
		}
		change = null;
	});

	// align the sidebars on the menu page on page scroll
	$(window).scroll(function() {
		fixAlignment()
	});
	fixAlignment()

	// setting for the select boxes
	$('.selectpicker').selectpicker({
		size: 4
	});

	// code to add and remove the items in the calculator
	total = 0;
	grand_total = 0;
	var price_array = [];
	times = ["00:00", "00:15", "00:30", "00:45", "01:00", "01:15", "01:30", "01:45", "02:00", "02:15", "02:30", "02:45", "03:00", "03:15", "03:30", "03:45", "04:00", "04:15", "04:30", "04:45", "05:00", "05:15", "05:30", "05:45", "06:00", "06:15", "06:30", "06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45"];
	$(document).on('click', ".fa-plus-circle", function() {
		// get the elements from dom
		price = parseFloat($(this).parent().parent().parent().find('span.price').text());
		item_name = $(this).parent().parent().parent().parent().find('div.item_name').text();

		// check if the current element is in the array
		if ($.inArray(item_name, price_array) > -1) {
			calculator_item = $("#calculatorItem").find("#" + changeToId(item_name));
			old_val = calculator_item.text();
			new_val = parseInt(old_val) + 1;
			calculator_item.text(new_val);
			price_item = $("#calculatorItem").find("#" + changeToId(item_name) + "_price");
			old_val = parseFloat(price_item.text());
			new_val = price + old_val;
			price_item.text(new_val.toFixed(2));
		} else {
			template = '<div class="template_added"  style="display: visible;">' +
				'<div class="col-xs-9 pull-left">' +
				'<i class="fa fa-minus-square-o font-11" data-price="__price__"></i>' +
				' <span class="font-11 count" id="the_count_id">1</span>' +
				'<span class="weight-400 font-11 text-dark"> * _item_name_</span>' +
				'</div>' +
				'<div class="col-xs-3">' +
				'<div class="margin-top-5 pull-right font-10">£<span id="the_count_id_price" class="price">__price__</span></div>' +
				'</div>' +
				'</div>';
			template = template.replace(/_item_name_/g, item_name);
			template = template.replace(/__price__/g, price.toFixed(2));
			template = template.replace(/the_count_id/g, changeToId(item_name));
			template = template.replace(/the_count_id/g, changeToId(item_name)); // not replacing the _price part
			calculator_item = $("#calculatorItem");
			calculator_item.append(template);
			template = null;
		}

		// adjust the values in the calculator
		price_array.push(item_name);
		total = parseFloat(total + price)
		$("#subtotal").text(total.toFixed(2));
		grand_total = total + (5 * total / 100);
		$("#vat").text((5 * total / 100).toFixed(2));
		grand_total = grand_total + (4.0);
		$("#delv_chg").text((4.0).toFixed(2));
		grand_total = grand_total + (10 * total / 100);
		$("#service_chg").text((10 * total / 100).toFixed(2));
		$(".grand_total").text(grand_total.toFixed(2));
		if (grand_total > 15) {
			$("#minimum_amount_msg").hide(100);
		} else {
			$('#minimum_amount_msg').show(100);
		}
		// uninitialize the variables
		price = null;
		item_name = null;
	});
	createHours();
	// code to activate the remove functionality in the calculator
	$(document).on('click', ".fa-minus-square-o", function() {
		// get the elements
		element_price = parseFloat($(this).attr('data-price'));
		count = $(this).parent().find(".count");
		count_val = parseInt(count.text());

		// check if the element is the last element . if yes the
		// delete the stuff from the calculator
		if (count_val == 1) {
			$(this).parent().parent().remove();
			removeItem(price_array, [item_name]);
		}
		// else just reducte the coount dont remove enything
		else {
			count.text(count_val - 1);
		}

		// adjust the reading in the calculator
		// this is the meat of the calculation
		total = parseFloat(total - element_price)
		$("#subtotal").text(total.toFixed(2));
		grand_total = total + (5 * total / 100);
		$("#vat").text((5 * total / 100).toFixed(2));
		grand_total = grand_total + (4.0);
		$("#delv_chg").text((4.0).toFixed(2));
		grand_total = grand_total + (10 * total / 100);
		$("#service_chg").text((10 * total / 100).toFixed(2));
		$(".grand_total").text(grand_total.toFixed(2));

		// check the minimum logic value
		if (grand_total > 15) {
			$("#minimum_amount_msg").hide(100);
		} else {
			$('#minimum_amount_msg').show(100);
		}

		//deinitialize
		element_price = null;
		count = null;
		count_val = null;
	})

	// click on the category name to scroll to the section in the menu
	$(".scroll-btn").click(function() {
		href = $(this).attr("href");
		$('html, body').animate({
			scrollTop: $(href).offset().top - 60
		}, 800);
		href = null;
	});


	// lightbox
	lightbox.option({
	 'resizeDuration': 100,
	 'wrapAround': true,
	 "alwaysShowNavOnTouchDevices":true,
	 "disableScrolling":true,
	 "albumLabel":"",
	 "fadeDuration":100
	//  "width":"300"
   })
	// this is fr the mobile view
	// when the screen width is small, the calculator is rezised to be at the
	// bottom of the page. this section helps is expanding and compacting the calculator
	if($("html").width() < 992)
	{
		$("#calculator").hide();
	}
	$(".sheet").click(function() {
		if ($(this).hasClass('fa-compress')) {
			$(this).removeClass('fa-compress')
			$(this).addClass('fa-expand')
			$("#calculator").slideToggle(400)
		} else {
			$(this).addClass('fa-compress')
			$(this).removeClass('fa-expand')
			$("#calculator").slideToggle(400)
		}
	})

	// this section takes care of the location selection logic
	$("#location").change(function() {
		loc = $(this).val();
		if (loc.indexOf("another") > -1) {
			$("#myModal").modal({
				keyboard: false,
				backdrop: "static",
			});
		} else if (loc.indexOf("current") > -1) {
			getLocation();
		}
		loc = null;
	});


	$("#type").change(function() {
		type = $(this).val();
		day = $("#day");
		day.empty();
		if (type.indexOf("book") > -1) {
			all_dates = getDates();
			$.each(all_dates, function(key, value) {
				template_dates = '<option class="default" value="_date_">_date_</option>';
				template_dates = template_dates.replace(/_date_/g, value);
				day.append(template_dates);
			});
			all_dates = [];
		} else {
			template_default_1 = '<option class="default" value="today">Today</option>';
			template_default_2 = '<option class="default" value="tomorrow">Tomorrow</option>';
			day.append(template_default_1);
			day.append(template_default_2);
			template_default_2 = null;
			template_default_1 = null;
		}
		type = null;
		day.selectpicker('refresh');
	});
	maintiainHeights();
});
// maintiain the height of the middle section and the left section same
function maintiainHeights(){
	page_width = $("html").width();
	if(page_width>992){
		left_height = $("#left-sidebar-parent").height();
		middle_height = $("#middle-section-parent").height();
		console.log(middle_height);
		console.log(left_height);
		if(middle_height > left_height){
			$("#left-sidebar-parent").height(middle_height);
			$("#middle-section-parent").height(middle_height);
		}
		else{
			$("#middle-section-parent").height(left_height);
			$("#left-sidebar-parent").height(left_height);
		}
	}
}
// create the list of time stamps
function createHours() {
	var $r = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
	var $m = ["00", 15, 30, 45];
	var timeNow = new Date();
	var hours = timeNow.getHours();
	var minutes = timeNow.getMinutes();
	var time = $("#time");
	time.empty();
	time.append('<option class="default" value="asap">ASAP</option>');
	var first_timestamp = "";
	var count = 0;
	$.each($r, function(key, $hour) {
		if(parseInt(hours) <= parseInt($hour)){
			$.each($m, function($key, $min) {
				if(count == 0){
					first_timestamp = $hour + ":" + $min;
					count++;
				}
				template = '<option value="__time__">__time__</option>';
				template = template.replace(/__time__/g,$hour + ":" + $min)
				time.append(template);
			})
		}
	});
	$.each($r, function(key, $hour) {
		$.each($m, function($key, $min) {
			if(first_timestamp.indexOf($hour + ":" + $min) != -1){
				return false;
			}
			template = '<option value="__time__">__time__</option>';
			template = template.replace(/__time__/g,$hour + ":" + $min)
			time.append(template);
		})
	});
	var $r = null;
	var $m = null;
	var timeNow = null;
	var hours = null;
	var minutes = null;
	var count = null;
	var first_timestamp = null;
	time.selectpicker('refresh');
}

function getDates() {
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth();
	var date = today.getDate();
	dates_array = [];
	for (var i = 0; i < 30; i++) {
		var day = new Date(year, month, date + i);
		dates_array.push(getFormattedDate(day));
	}
	return dates_array;
}

function getFormattedDate(date) {
	var year = date.getFullYear();
	var month = (1 + date.getMonth()).toString();
	month = month.length > 1 ? month : '0' + month;
	var day = date.getDate().toString();
	day = day.length > 1 ? day : '0' + day;
	return month + '/' + day + '/' + year;
}

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		alert("Geolocation is not supported by this browser.");
	}
}

function showPosition(position) {
	x = "Latitude: " + position.coords.latitude + "\nLongitude: " + position.coords.longitude;
	alert(x);
}


function changeToId(temp_item_name) {
	return temp_item_name.toLowerCase().split(' ').join('_');
}

function removeItem(array, value) { //my clear function
	if (Array.isArray(array)) { //for multi remove
		for (var i = array.length - 1; i >= 0; i--) {
			for (var j = array.length - 1; j >= 0; j--) {
				if (array[i] === value[j]) {
					array.splice(i, 1);
				};
			}
		}
	} else { //for single remove

		for (var i = array.length - 1; i >= 0; i--) {
			if (array[i] === number) {
				array.splice(i, 1);
			}
		}
	}
}

function fixAlignment() {
	page_width = $("html").width();
	if (window.pageYOffset > 40) {
		$(".navbar-fixed-top").addClass('affix')
	} else {
		$(".navbar-fixed-top").removeClass('affix')
	}
	if (page_width > 992) {
		$("#right-sidebar").removeClass("fixed-bottom-menu");
		$("#right-sidebar").removeClass("col-xs-12");
		if (window.pageYOffset > 380) {
			if (!$("#left-sidebar").hasClass("fixed-left-menu")) {
				$("#left-sidebar").addClass("fixed-left-menu")
				$("#left-sidebar").addClass("pull-left")
				$("#left-sidebar").width($("#left-sidebar").parent().width())
					// console.log($("#left-sidebar").parent().width())
			}
			if (!$("#right-sidebar").hasClass("fixed-right-menu")) {
				$("#right-sidebar").addClass("fixed-right-menu")
				$("#right-sidebar").addClass("pull-right")
				$("#right-sidebar").width($("#right-sidebar").parent().width())
			}
		} else {
			// console.log($("#left-sidebar").parent().width())
			$("#left-sidebar").removeClass("fixed-left-menu")
			$("#right-sidebar").removeClass("fixed-right-menu")
		}


	} else {
		$("#right-sidebar").removeClass("fixed-right-menu")
		$("#right-sidebar").addClass("fixed-bottom-menu")
		$("#right-sidebar").addClass("col-xs-12")
		$("#right-sidebar").width($("#right-sidebar").parent().width())
	}

}
