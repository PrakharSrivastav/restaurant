var markersArray = [];
// $('.submitbtn').on('click', function(e) {
// e.preventDefault();
// var locationval = $('#locationselect').val()
//     if (locationval == 1) {
//         function success(pos) {
//             var locationcoordinates = pos.coords;
// //            console.log(locationcoordinates);
//             //latitude and longitude from user's current location will come here;
//             var latitude = locationcoordinates.latitude;
//             var longitude = locationcoordinates.longitude;
//             $('#latitude').val(locationcoordinates.latitude);
//             $('#longitude').val(locationcoordinates.longitude);
//         }
//         ;
//         function error(err) {
//             console.log('error');
//             $("#mapmodal").modal("show");
//         }
//         ;
//         toastr.info('Please share your current location');
//         navigator.geolocation.getCurrentPosition(success, error);
//     }
// if (locationval == 2) {
//     $("#mapmodal").modal("show");
// }
// });

/*lslint browser: true*/
/*global $, jQuery*/
$("#locationselect").change(function(e) {
	var locationval = $(this).val();
	if (locationval == 1) {
		function success(pos) {
			var locationcoordinates = pos.coords;
			//            console.log(locationcoordinates);
			//latitude and longitude from user's current location will come here;
			var latitude = locationcoordinates.latitude;
			var longitude = locationcoordinates.longitude;
			$('#latitude').val(locationcoordinates.latitude);
			$('#longitude').val(locationcoordinates.longitude);
		};

		function error(err) {
			// console.log('error');
			$("#mapmodal").modal("show");
		};
		toastr.info('Please share your current location');
		navigator.geolocation.getCurrentPosition(success, error);
	}
	if (locationval == 2) {
		$("#mapmodal").modal("show");
	}
});

$('.confirmlocation').on('click', function(e) {
	e.preventDefault();
	$("#mapmodal").modal("hide");
});
$('#mapmodal').on('hidden.bs.modal', function() {
	$(this).removeClass('mgtp0');
})
$('#mapmodal').on('shown.bs.modal', function() {
	$(this).addClass('mgtp0');
})
var markersArray = [];

function initAutocomplete() {
	var geocoder = new google.maps.Geocoder;
	var latlng = new google.maps.LatLng(13.082118, 80.276283);
	var map = new google.maps.Map(document.getElementById('map'), {
		center: latlng,
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	//adding initial marker
	var marker = new google.maps.Marker({
		position: latlng,
		map: map,
		draggable: true
	});
	markersArray.push(marker);
	$('#latitude').val(latlng.lat());
	$('#longitude').val(latlng.lng());
	geocodeLatLng(geocoder, map, latlng.lat(), latlng.lng());
	google.maps.event.addListener(map, "click", function(event) {
		placeMarker(event.latLng);
		//        console.log(event);


	});
	google.maps.event.addListener(marker, 'dragend', function(e) {
		//        console.log('old marker dragged location=' + e.latLng);
		$('#latitude').val(marker.position.lat());
		$('#longitude').val(marker.position.lng());
		geocodeLatLng(geocoder, map, marker.position.lat(), marker.position.lng());
	});
	// Create the search box and link it to the UI element.
	var input = document.getElementById('pac-input');
	var searchBox = new google.maps.places.SearchBox(input);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	// Bias the SearchBox results towards current map's viewport.
	map.addListener('bounds_changed', function() {
		searchBox.setBounds(map.getBounds());
	});

	var markers = [];
	//Search box js
	searchBox.addListener('places_changed', function() {
		var places = searchBox.getPlaces();

		if (places.length == 0) {
			return;
		}

		// Clear out the old markers.
		deleteOverlays()
		markers.forEach(function(marker) {
			marker.setMap(null);
		});
		markers = [];
		// For each place, get the icon, name and location.
		var bounds = new google.maps.LatLngBounds();
		places.forEach(function(place) {
			var icon = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			};

			// Create a marker for each place.
			var marker = new google.maps.Marker({
				map: map,
				title: place.name,
				position: place.geometry.location,
				draggable: true
			});
			//            console.log('searched place location=' + place.geometry.location);
			$('#latitude').val(place.geometry.location.lat());
			$('#longitude').val(place.geometry.location.lng());
			google.maps.event.addListener(marker, 'dragend', function(e) {
				//                console.log('search marker dragged');
				$('#latitude').val(marker.position.lat());
				$('#longitude').val(marker.position.lng());
			});
			markersArray.push(marker);

			if (place.geometry.viewport) {
				// Only geocodes have viewport.
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		});
		map.fitBounds(bounds);
	});
	// Searchbox js end[END region_getplaces]

	//adding marker on clicking the map
	function placeMarker(location) {
		// first remove all markers if there are any
		deleteOverlays();
		var marker = new google.maps.Marker({
			position: location,
			map: map,
			draggable: true
		});
		//        console.log(location);
		$('#latitude').val(location.lat());
		$('#longitude').val(location.lng());
		markersArray.push(marker);
		geocodeLatLng(geocoder, map, location.lat(), location.lng());
		google.maps.event.addListener(marker, 'dragend', function(e) {
			//            console.log('new marker dragged');
			//            console.log(e.latLng);
			$('#latitude').val(marker.position.lat());
			$('#longitude').val(marker.position.lng());
			geocodeLatLng(geocoder, map, marker.position.lat(), marker.position.lng());
		});
	}
	//end adding marker

	// Deletes all markers in the array by removing references to them
	function deleteOverlays() {
		if (markersArray) {
			//            console.log(markersArray);
			for (i in markersArray) {
				markersArray[i].setMap(null);
			}
			markersArray.length = 0;
		}
	}

	function geocodeLatLng(geocoder, map, latitude, longitude) {
		//        var latlngStr = input.split(',', 2);
		var latlng = {
			lat: latitude,
			lng: longitude
		};
		geocoder.geocode({
			'location': latlng
		}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					$('#pac-input').val(results[1].formatted_address);
				} else {
					console.log('No results found');
				}
			} else {
				console.log('Geocoder failed due to: ' + status);
			}
		});
	}
	//end deleting marker
}
