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
	total = 0;
	grand_total = 0;
	var price_array = [];
	$(document).on('click', ".fa-plus-square-o", function() {
		price = parseFloat($(this).parent().parent().parent().find('span.price').text());
		item_name = $(this).parent().parent().parent().parent().find('div.item_name').text();

		if ($.inArray(item_name, price_array) > -1)
		{
			calculator_item = $("#calculatorItem").find("#" + changeToId(item_name));
			old_val = calculator_item.text();
			new_val = parseInt(old_val) + 1;
			calculator_item.text(new_val);
			price_item = $("#calculatorItem").find("#" + changeToId(item_name) + "_price");
			old_val = parseFloat(price_item.text());
			new_val = price + old_val;
			price_item.text(new_val.toFixed(2));
		} else
		{
			template = '<div class="template_added"  style="display: visible;">'+
							'<div class="col-xs-9 pull-left">' +
								'<i class="fa fa-minus-square-o font-11" data-price="__price__"></i>' +
								' <span class="font-11 count" id="the_count_id">1</span>' +
								'<span class="weight-400 font-11 text-dark"> * _item_name_</span>'+
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
			// $(template).show(1000);
			calculator_item.append(template);

			console.log(calculator_item.children(".template_added"));
		}
		price_array.push(item_name);
		total = parseFloat(total + price)
		$("#subtotal").text(total.toFixed(2));
		grand_total = total + (5 * total / 100);
		$("#vat").text((5 * total / 100).toFixed(2));
		grand_total = grand_total + (4.0);
		$("#delv_chg").text((4.0).toFixed(2));
		grand_total = grand_total + (10 * total / 100);
		$("#service_chg").text((10 * total / 100).toFixed(2));
		$("#grand_total").text(grand_total.toFixed(2));
		if (grand_total > 15) {
			$("#minimum_amount_msg").hide(100);
		} else {
			$('#minimum_amount_msg').show(100);
		}
	});


	$(document).on('click', ".fa-minus-square-o", function() {
		element_price = parseFloat($(this).attr('data-price'));
		count = $(this).parent().find(".count");
		count_val = parseInt(count.text());

		if (count_val == 1) {
			$(this).parent().parent().remove();
			removeItem(price_array,[item_name]);
		}
		else {
			count.text(count_val-1);
		}

		total = parseFloat(total - element_price)
		$("#subtotal").text(total.toFixed(2));
		grand_total = total + (5 * total / 100);
		$("#vat").text((5 * total / 100).toFixed(2));
		grand_total = grand_total + (4.0);
		$("#delv_chg").text((4.0).toFixed(2));
		grand_total = grand_total + (10 * total / 100);
		$("#service_chg").text((10 * total / 100).toFixed(2));
		$("#grand_total").text(grand_total.toFixed(2));
		if (grand_total > 15) {
			$("#minimum_amount_msg").hide(100);
		} else {
			$('#minimum_amount_msg').show(100);
		}
	})

});

function changeToId(temp_item_name) {
	return temp_item_name.toLowerCase().split(' ').join('_');
}

function removeItem(array,value){  //my clear function
  if(Array.isArray(array)){  //for multi remove
    for(var i = array.length - 1; i >= 0; i--) {
      for(var j = array.length - 1; j >= 0; j--) {
          if(array[i] === value[j]) {
             array.splice(i, 1);
          };
      }
    }
  } else { //for single remove

    for(var i = array.length - 1; i >= 0; i--) {
        if(array[i] === number) {
           array.splice(i, 1);
        }
    }
  }
}
