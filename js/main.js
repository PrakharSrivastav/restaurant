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
	});
	total = 0;grand_total = 0;
	var price_array = [];
	$(".fa-plus-square-o").click(function() {
		price = parseFloat($(this).parent().parent().parent().find('span.price').text());
		item_name = $(this).parent().parent().parent().parent().find('div.item_name').text();

		if ($.inArray(item_name, price_array) > -1) {
			calculator_item = $("#calculatorItem").find("#"+changeToId(item_name));
			old_val = calculator_item.text();
			new_val = parseInt(old_val)+1;
			calculator_item.text(new_val);

			price_item = $("#calculatorItem").find("#"+changeToId(item_name)+"_price");
			old_val = parseFloat(price_item.text());
			new_val = price+old_val;
			price_item.text(new_val.toFixed(2));
		} else {
			template = '<div class="col-xs-9 pull-left"><span class="font-11 count" id="the_count_id">1</span><span class="weight-400 font-11 text-dark"> * _item_name_</span></div><div class="col-xs-3"><div class="margin-top-5 pull-right font-10">$<span id="the_count_id_price" class="price">__price__</span></div></div>';
			template = template.replace(/_item_name_/g, item_name);
			template = template.replace(/__price__/g, price.toFixed(2));
			template = template.replace(/the_count_id/g, changeToId(item_name));
			template = template.replace(/the_count_id/g, changeToId(item_name)); // not replacing the _price part
			calculator_item = $("#calculatorItem");
			calculator_item.append(template);
		}
		price_array.push(item_name);
		total = parseFloat(total + price)
		$("#subtotal").text(total.toFixed(2));
		grand_total = total+(5*total/100);
		$("#vat").text((5*total/100).toFixed(2));
		grand_total = grand_total+(4.0);
		$("#delv_chg").text((4.0).toFixed(2));
		grand_total = grand_total+(10*total/100);
		$("#service_chg").text((10*total/100).toFixed(2));
		console.log(grand_total);
		$("#grand_total").text(grand_total.toFixed(2));
		if(grand_total > 15){
			$("#minimum_amount_msg").hide(100);
		}
		else{
			$('#minimum_amount_msg').show(100);
		}
	});

});

function changeToId(temp_item_name){
	return temp_item_name.toLowerCase().split(' ').join('_');
}
