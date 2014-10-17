var map, infowindow;


$(document).ready(function () { 

function setMarkers(location, data, pintype) {
	var icon = {
		url: pintype,
		size: new google.maps.Size(30, 30),
		origin: new google.maps.Point(0, 0),
		//anchor: google.maps.Point(0, 30)
	};
	
	var iconVector = {
		path: google.maps.SymbolPath.CIRCLE,
		strokeWeight: 0,
		fillColor: pintype,
		fillOpacity: 1,
		scale: 3
	};
	var myLatLng = new google.maps.LatLng(location[0], location[1]);
	
	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		draggable:false,
		//animation: null,
    	animation: google.maps.Animation.DROP,
		icon: iconVector,
		title: data.user.screen_name
	});
		
	var contentString = '<div class="twitDetail"><table cellpadding="0" cellspacing="0"><tr><th>'
	+ data.user.screen_name
	+ '</th><th class="lang-code">'
	+ '</th></tr><tr><td colspan="2">'
	+ data.text
	+ '</td></tr></table></div>';

	google.maps.event.addListener(marker, 'click', function() {
		//map.setZoom(marker.zIndex);
		map.setCenter(marker.getPosition());
		marker.setAnimation(null);
		if (infowindow) infowindow.close();
      	infowindow = new google.maps.InfoWindow({content: contentString});
		infowindow.open(map,marker);
	});

	if (infowindow) infowindow.close();
	infowindow = new google.maps.InfoWindow({content: contentString});
	setTimeout(function() {
      infowindow.open(map,marker);
    }, 600);
}

function setDrops(location, data, pintype) {
	var icon = {
		url: pintype,
		size: new google.maps.Size(30, 30),
		origin: new google.maps.Point(0, 0),
		anchor: google.maps.Point(0, 30)
	};
	
	var iconVector = {
		path: google.maps.SymbolPath.CIRCLE,
		strokeWeight: 0,
		fillColor: pintype,
		fillOpacity: 1,
		scale: 10
	};
	var myLatLng = new google.maps.LatLng(location[0], location[1]);
	
	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		draggable:false,
		//animation: null,
    	animation: google.maps.Animation.DROP,
		icon: iconVector,
		title: data.user.screen_name
	});
		
	var contentString = '<div class="twitDetail"><table cellpadding="0" cellspacing="0"><tr><th>'
	+ data.user.screen_name
	+ '</th><th class="lang-code">'
	// + data.lang
	// + '</th></tr><tr><td colspan="2">'
	+ data.text
	+ '</td></tr></table></div>';

	google.maps.event.addListener(marker, 'click', function() {
		//map.setZoom(marker.zIndex);
		map.setCenter(marker.getPosition());
		marker.setAnimation(null);
		if (infowindow) infowindow.close();
      	infowindow = new google.maps.InfoWindow({content: contentString});
		infowindow.open(map,marker);
	});

	if (infowindow) infowindow.close();
	infowindow = new google.maps.InfoWindow({content: contentString});
	setTimeout(function() {
      infowindow.open(map,marker);
    }, 600);
}
function initialize() {
  var zoom = 2, nlat = 0, nlong = 0;
  
  var styles = [
		{
			stylers: [
			  { hue: "#FFFFFF" },
			  { saturation: -100 }
			]
			},{
			featureType: "road",
			elementType: "geometry",
			stylers: [
			  { lightness: 100 },
			  { visibility: "simplified" }
			]
			},{
			featureType: "road",
			elementType: "labels",
			stylers: [
			  { visibility: "off" }
			]
		}
	];
  var style3 = [{"featureType":"water","stylers":[{"color":"#f0e5f2"}]},{"featureType":"landscape","stylers":[{"color":"#001cff"}]},
  {"featureType":"poi","elementType":"geometry","stylers":[{"color":"#a46363"},{"lightness":5}]},
  {"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},
  {"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#a46363"},{"lightness":25}]},
  {"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},
  {"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},
  {"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},
  {"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},
  {"elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},
  {"featureType":"transit","stylers":[{"color":"#d6aaaa"}]},
  {"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},
  {"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#333333"},
  {"lightness":14},{"weight":1.4}]}];
  var style4 = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#eaece7"}]},
  {"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#333333"}]},
  {"featureType":"road","elementType":"geometry","stylers":[{"color":"#ccccc"},{"lightness":-37}]},
  {"featureType":"poi","elementType":"geometry","stylers":[{"color":"#cccccc"}]},
  {"featureType":"transit","elementType":"geometry","stylers":[{"color":"#fff100"}]},
  {"elementType":"labels.text","stylers":[{"visibility":"on"},{"color":"#001cff"},
  {"weight":2},{"gamma":0.84}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},
  {"featureType":"administrative","elementType":"geometry","stylers":[{"weight":0.6},{"color":"#eaece7"}]},
  {"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#333333"}]}];

  var myOptions = {
    zoom: zoom,
    center: new google.maps.LatLng(nlat, nlong),
	panControl: false,
	zoomControl: true,
	mapTypeControl: false,
	scaleControl: false,
	streetViewControl: false,
	overviewMapControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: style4
  }
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  console.log(map);
	
}

//$(document).ready(function () {

	initialize();
	var socket = io.connect('http://localhost:3000');

	socket.on('entrance', function  (data) {
		//console.log(data.message);
	});

	socket.on('update', function  (data) {
		if(data.geo){
			setMarkers(data.geo.coordinates, data,window[data.lang]); 
			//console.log(data);
		}
	});

	var otherWidth = $(window).width() - 810;
	$('div.lang#other').css('width', otherWidth);
});

$(window).resize(function(){
	var otherWidth = $(window).width() - 810;
	$('div.lang#other').css('width', otherWidth);	
});
