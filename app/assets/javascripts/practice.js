

$(function(){

$.get("practice#index", function(data){ doEverything(data) }, "JSON");

function doEverything(json_data) {
	var heightOffset = $("#aiming-for").height() + $("#shots").height() + $("#progress").height() + 80;
	var pageHeight = $(window).height() - heightOffset;
	var pageWidth = $("body").width();
		
	var smallest = Math.min(pageHeight, pageWidth)
	if ( smallest == pageHeight ) {
		var radius = smallest/2.5;
	} else {
		var radius = smallest/2;
	}


	$(".shots").css("margin-top", $("#header").height() + 20);
//	$("#aiming-for").append("<h1>This goes in the aiming section</h1>");

//	$("#session-hits").html(json_data.total_hits);
//	$("#session-misses").html(json_data.total_misses);

//	var parsed = JSON.parse(json_data);
	var missesByTurn = json_data["turns"].map(function(d,i){
		return d["misses"];
	});
	var hitsByTurn = json_data["turns"].map(function(d,i){
		return d["hits"];
	})
	console.log(hitsByTurn);

	Highcharts.setOptions({
		chart: {
			type: 'line'
		},
		plotOptions: {
			 line: {
			 	lineWidth: 2,
			 	color:'rgba(0,51,96,.75)',
			 	marker: { enabled: false },
			 },
			series: {
				color: '#000'
			}
		},
		xAxis: {
			title: { text: '' },
			lineWidth: 0,
			tickLength: 0,
			labels: { enabled: false }
		},
		yAxis: {
			gridLineWidth:0,
			title: { text: '' },
			labels: { enabled: false }
		},
		tooltip: { enabled: false },
		title: { text: '' },
		legend: { enabled: false },
		credits: { enabled: false },
		exporting: { enabled: false },
	});

	var hits_sparkline = $("#hits-sparkline").highcharts({

		chart: {
			type: 'line',
			height: 100
		},
		series: [{
			name: "hits",
			data: hitsByTurn
		}]

	});



// degrees -> radians: DEGREE * (PI / 180)
// radians -> degrees: RADIAN * (180 / PI)





	rad9 = 9 * (Math.PI / 180);
	sin9 = Math.sin(rad9) / (Math.PI / 180);
	rad18 = 18 * (Math.PI / 180);
	sin18 = Math.sin(rad18) / (Math.PI / 180);
	rad81 = 81 * (Math.PI / 180);
	sin81 = Math.sin(rad81) / (Math.PI / 180);

	
	getX = function(degrees){
		var radians = degrees * (Math.PI / 180);
		var cosRadians = radius * Math.cos(radians);
		var cosDegrees = cosRadians / (Math.PI / 180);
		return cosDegrees;
	}
	getY = function(degrees){
		var radians = degrees * (Math.PI / 180);
		var sinRadians = radius * Math.sin(radians);
		var sinDegrees = sinRadians / (Math.PI / 180);
		return sinDegrees;
	}

	var diameter = radius * 2;
	var toRad = Math.PI * 180;

	var convertDegrees = (Math.PI / 180);

	var innerdiameter = diameter / 3;
	
	var rad = diameter / 2;
	var innerRad = innerdiameter / 2;
	
	var topChordLength = (radius * sin9 ) * 2;
	var bottomChordLength = 2 * innerRad * sin18;
	var topHalflength = topChordLength / 2;
	var saggita = radius - Math.sqrt((radius * radius) - (topHalflength * topHalflength))
//	var arcOffsetX = topChordLength * sin81;
//	var arcOffsetY = topChordLength * sin9;	

	var thirdSide = -((radius * sin18) /  sin81);

	var offset = (topChordLength - bottomChordLength) / 2;


	
	
	var svg = d3.select("#svg").append("svg")
		.attr("height", diameter + 52 )
		.attr("width", diameter + 52);


	var board = svg.append("g").attr("class", "board");
	
	var boardBg = board.append("circle").attr("r", radius + 24).style("fill", "#000")
	
	var segments = board.append("g").attr("class", "segments")

	var numbers = board.append("g").attr("class", "numbers");


	function drawSegment(radius, thisClass, inOut, color1, color2, points) {

		function getSideLength(knownSide, angle) {
	
			function sinDeg(num) {
				return Math.sin(num / 180 * Math.PI);
			};
		    sinDegree = sinDeg(angle);
		    sideLength = knownSide * sinDegree;
		    return sideLength;
	
		}
		
		halfLength = getSideLength(radius, 9)
		chordLength = halfLength * 2;
		arcOffsetX = getSideLength(chordLength, 81);
		arcOffsetY = getSideLength(chordLength, 9) * -1;
	
	
		var multiple;
		if (thisClass == "single") { multiple = 1 }
		else if (thisClass == "double") { multiple = 2 }
		else if (thisClass == "triple") { multiple = 3 }

		var p1 = "0,4";
		var p2x = 0
		var p2y = radius;
		var p2 = p2x + "," + p2y + " ";
		var p3 =  arcOffsetX + ", "+ arcOffsetY +" ";
	//	var p3 = arcOffsetX.toString() +",-"+ arcOffsetY.toString() + " ";			// topChordLength, -arcOffset
		var circleradius = radius + "," + radius+ " ";
		var rotate = 0;
		var direction = " 0,0 ";

		segments.append("path")
			.attr({
				d: "m"+ p1 + " l" + p2	+ " a"+ circleradius + rotate + direction + p3,
				transform: function(){ return "rotate("+ ((-18 * i)+9)+")" },
				class: function(){
					if (i % 2 == 0) {
						return thisClass + points +" "+ inOut +" any"+ points +" "+ color1 + " segment";
					} else { 
						return thisClass + points +" "+ inOut +" any"+ points +" "+ color2 + " segment"; 
					}
				},
				"data-points": points,
				"data-multiple": multiple,
				"data-score": multiple * points,
				"data-inout": function(){ if (inOut != "") { return inOut }}
			})
	}

	var i = 0;
	while (i<20) {
		var points;
		if (i == 0) { points = 20 }
		else if (i == 1 ) { points = 5 }
		else if (i == 2 ) { points = 12 }
		else if (i == 3 ) { points = 9 }
		else if (i == 4 ) { points = 14 }		
		else if (i == 5	) { points = 11 }
		else if (i == 6	) { points = 8 }
		else if (i == 7	) { points = 16 }
		else if (i == 8	) { points = 7  }
		else if (i == 9	) { points = 19 }
		else if (i == 10) { points = 3  }
		else if (i == 11) { points = 17 }
		else if (i == 12) { points = 2  }
		else if (i == 13) { points = 15 }
		else if (i == 14) { points = 10  }
		else if (i == 15) { points = 6 }		
		else if (i == 16) { points = 13 }
		else if (i == 17) { points = 4  }
		else if (i == 18) { points = 18 }
		else if (i == 19) { points = 1  }	
		var lessRadius = radius - 4;
		var oddSmall = "red"
		var oddLarge = "black"
		var evenSmall = "green"
		var evenLarge = "white"
		drawSegment(lessRadius, "double", "", oddSmall, evenSmall, points);
		drawSegment(lessRadius * .93, "single", "Outer", oddLarge, evenLarge, points);
		drawSegment(lessRadius * .5, "triple", "", oddSmall, evenSmall, points);
		drawSegment(lessRadius * .43, "single", "Inner", oddLarge, evenLarge, points);
		numbers.append("g")
			.attr({
				class: "number",
				height: radius,
				transform: function(){ 
					return "rotate("+ (180 - (18 * i)) +")" },
			})
			.append("text")
				.text(points).attr("transform", function(){
					if ( i > 5 && i < 15 ) { upDown = 180; move = 22; } else { upDown = 0; move = 5; }
					return "translate(0,"+ (-radius - move) +") rotate("+ upDown +")";
				})
		
		i++;
	}
	segments.append("circle").attr({
		r: radius * .1,
		class: "single25 any25 green segment",
		"data-points": 25,
		"data-multiple": 1
	});
	segments.append("circle").attr({
		r: radius * .05,
		class: "double25 any25 red segment",
		"data-points": 25,
		"data-multiple": 2

	});

	var shots = svg.append("g").attr("class", "shots")

	var buttonWidth = diameter/ 6;
	var buttonHeight = buttonWidth / 2.5

	var noHitBtn = svg.append("g").attr("class", "no-hit").attr("transform", function(){
		return "translate("+ (diameter - 40 ) +", "+ (diameter ) +")"
	});
	
	noHitBtn.append("rect")
		.attr("height", buttonHeight)
		.attr("width", buttonWidth)
		.attr("rx", 5)
	noHitBtn.append("text")
		.attr("transform", function(){
			return "translate("+ (buttonWidth*0.5) +", "+ (buttonHeight*0.6) +")"
		})
		.text("Off Board");



	board.attr("transform", "rotate(180) translate("+ (-radius - 26) +","+ (-radius -26) +")")


	var hoverCircle = svg.append("circle").attr("r", 5).attr("id", "hoverCircle").attr("class", "hidden")

	var selectionState = 0;

	$(".aim-header").click(function(){
		if (selectionState == 0) {
			selectionState = 1;
			$(".number-select").slideDown(500);
		} else {
			selectionState = 0;
			$(".number-select").slideUp(500);
		}
	});

	var shotCounter = 0;
	var aimingInOutString = "";
	var aimingInOutClass = "";
	var aiming_for = "any20";
	var aimingPoints = 20;
	var aimingMultiple = 0;
	var aimingMultipleString = "Any";
	var aimingInOut = ""
	var aimingInOutClass = ""
	var hit = 0;
	var new_turn, originalColor,  hitClass, hitPoints, hitMultiple, hitMultipleString, hitInOut;
	d3.selectAll("svg ."+ aiming_for).classed("aiming-for", true);

	$(".select-row h2").click(function(e){
		selectionState = 0;
		aimingPoints = parseInt($(this).attr("data-points"));
		aimingMultiple = parseInt($(this).attr("data-multiple"));
		if (aimingMultiple == 0) { aimingMultipleString = "Any" }
		else if (aimingMultiple == 1) { aimingMultipleString = "Single" }
		else if (aimingMultiple == 2) { aimingMultipleString = "Double" }
		else if (aimingMultiple == 3) { aimingMultipleString = "Triple" }
		aimingInOut = $(this).attr("data-inout");
		aimingInOutClass = "."+ aimingInOut;
		if (aimingInOut == undefined) { aimingInOut = ""; aimingInOutClass = ""}

		$(".selected-num").removeClass("selected-num");
		$(this).addClass("selected-num");
		$("#aim-number span").html(function(i,d){
			if (aimingPoints == 25) { aimingNumString = "Bull" } else { aimingNumString = aimingPoints }
			return aimingInOut + aimingMultipleString +" "+ aimingNumString
		});
		aiming_for = aimingMultipleString.toLowerCase() + aimingPoints + aimingInOutClass;
		d3.selectAll("svg .aiming-for").classed("aiming-for", false);
		d3.selectAll("svg ."+ aiming_for).classed("aiming-for", true);
		$(".number-select").slideUp(500);
	});

	function logClick(click){
		click = click.toElement;
		hitPoints = $(click).attr("data-points");

		hitMultiple = parseInt($(click).attr("data-multiple"));
		if (hitMultiple == 1) { hitMultipleString = "Single" }
		else if (hitMultiple == 2) { hitMultipleString = "Double" }
		else if (hitMultiple == 3) { hitMultipleString = "Triple" }
		hitInOut = $(click).attr("data-inout");
		if (hitInOut == undefined) { hitInOut = "" }
		if (hitPoints == aimingPoints) {
			if (aimingMultiple == 0 || aimingMultiple == hitMultiple) { hit = 1; }
		} else { 
			hit = 0
		}
		shotCounter++;
		shot = shotCounter % 3
		if ( shot == 0 ) { 
			shot = 3;
			new_turn = true;
		} else { new_turn = false}

		if (shot == 1 && shotCounter > 1) {
			$("div.shot2 h1").fadeTo(100, 0.0, function(){
				$(this).html("--").fadeTo(100, 1.0);
			});
			$("div.shot3 h1").fadeTo(100, 0.0, function(){
				$(this).html("--").fadeTo(100, 1.0);
			});
			$(".shot-marker").remove();
		}

		$(".shot"+ shot +" h1").html(function(){
//			if (hitPoints == 25) { hitPoints = "Bull"}
			return hitMultipleString.substring(0,1) + hitPoints
		});
		shots.append("circle").attr("r", 5).attr("class", "shot-marker").attr("transform", function(){
			return "translate("+ offsetX +","+ offsetY +")";			
		});

	}

	function postClick(event){
		event.preventDefault();
		$.post( "practice#create", {
//			user_id:				,
//			practice_id:			,
//			turn_id:				,
			aiming_for:				aiming_for,
			hit:					hit,
			hit_number:				hitPoints,
			hit_section:			hitInOut + hitMultipleString,
			hit_x:					offsetX, 
 			hit_y:					offsetY,
 			new_turn:				new_turn
		}, function(data) {
			event.preventDefault();
			$("#session-hits").html(data.total_hits);
			$("#session-misses").html(data.total_misses);
			accuracy = (data.total_hits / (data.total_misses + data.total_hits)) * 100;
			accuracy = accuracy.toFixed(2);
			$("#session-accuracy").html(accuracy + "%");
			chart = hits_sparkline.highcharts()
			chart.series[0].addPoint(data.total_hits);
			chart.update();
		});
	}

	$(".segment").mousemove(function(e){
		tempX = e.pageX; 
		tempY = e.pageY;
		offset = $("svg").offset();
		offsetX = tempX - offset.left - 5;
		offsetY = tempY - offset.top - 5;
//		if (selectionState == 0) {
			hoverCircle.attr("class", "");
			$("#hoverCircle").attr("transform", function(){
				return "translate("+ offsetX +","+ offsetY +")";
			})
			$("svg").mouseleave(function(e){
				hoverCircle.attr("class", "hidden")
			});
//		} else {
//			$("#aiming-for").css("background", "yellow");
//			$("#aiming-for h2").css("color", "#000");
//			originalColor = d3.select(this).style("fill");
//			d3.select(this).style("fill", "yellow");
//			var thisClass = this.className.baseVal;
//			var thisSeg = thisClass.substring(0,6);
//			var thisNum = thisClass.substring(6,8);
//			$("#aim-number span").html(function(){
//				return thisSeg +" "+ thisNum;
//			});
//		}
	});
	$(".segment").click(function(e){ 
			logClick(e); 		
			postClick(e);
	});
	$(".no-hit").click(function(e){ 
		if (selectionState == 0) {
			logClick(e); 
			postClick(e);
		}
	});
	    
}

});




