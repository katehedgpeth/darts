$(function(){
	
	var heightOffset = $("#aiming-for").height() + $("#shots").height() + $("#progress").height() + 80;
	console.log(heightOffset);
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
			.attr("d", "m"+ p1 + " l" + p2	+ " a"+ circleradius + rotate + direction + p3)
			.attr("transform", function(){
				return "rotate("+ ((-18 * i)+9)+")"
			})
			.attr("class", function(){
				if (i % 2 == 0) {
					return thisClass + points +" "+ inOut +" any"+ points +" "+ color1 + " segment";
				} else { return thisClass + points +" "+ inOut +" any"+ points +" "+ color2 + " segment"; }
			});
		
			
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
		drawSegment(lessRadius * .93, "single", "outer", oddLarge, evenLarge, points);
		drawSegment(lessRadius * .5, "triple", "", oddSmall, evenSmall, points);
		drawSegment(lessRadius * .43, "single", "inner", oddLarge, evenLarge, points);
		numbers.append("g")
			.attr("class", "number")
			.attr("height", radius)
			.attr("transform", function(){ return "rotate("+ (180-(18 * i)) +")" })
			.append("text")
				.text(points).attr("transform", function(){
					return "translate(0,"+ (-radius - 5) +")";
				})
		
		i++;
	}
	segments.append("circle").attr("r", radius * .1).attr("class", "single21 any21 green segment");
	segments.append("circle").attr("r", radius * .05).attr("class", "double21 any21 red segment");

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
	var hit, new_turn, thisClass, thisSeg, thisNum, thisNumInt, originalColor;
	var aiming_for = "triple20"
	var inOut = "";
	var inOutString = "";
	d3.select("svg ."+ aiming_for).classed("aiming-for", true);

	$(".select-row h2").click(function(e){
		selectionState = 0;
		thisClass = e.toElement.classList;
		if (thisClass[0].substring(0,3) == "any") {
			thisSeg = "any";
			thisNum = thisClass[0].substring(3,5);
		} else {
			thisSeg = thisClass[0].substring(0,6);
			thisNum = thisClass[0].substring(6,8);			
		}
		if (thisClass.length == 2 && thisClass[1] != "any") {
			inOut = thisClass[1] +" ";
			inOutString = "." + inOut;
		}
		$(".selected-num").removeClass("selected-num");
		$(this).addClass("selected-num");
		$("#aim-number span").html(function(i,d){
			if (thisNum == "21") { numString = "Bull" } else { numString = thisNum }
			return inOut + thisSeg +" "+ numString
		});
		if (inOut != "") { inOutSt = "."+ inOut }
		aiming_for = thisSeg + thisNum + inOutString;
		d3.selectAll("svg .aiming-for").classed("aiming-for", false);
		d3.selectAll("svg ."+ aiming_for).classed("aiming-for", true);
		console.log(aiming_for);
		$(".number-select").slideUp(500);
	});


	function logClick(click){

		shots.append("circle").attr("r", 5).attr("class", "shot-marker").attr("transform", function(){
			return "translate("+ offsetX +","+ offsetY +")";			
		});
		thisClass = click.toElement.className.baseVal;
		thisSeg = thisClass.substring(0,1);
		thisSegString = thisClass.substring(0,6);
		thisNum = thisClass.substring(6,8);
		thisNumInt;
		if (thisNum == " b"){
			thisNum = thisClass.substring(7,8);
			thisNumInt = 21;
		} else if (thisSeg == "" ) {
			thisSeg = "None";
			thisNum = "";
			thisNumInt = 0;
		} else { thisNumInt = parseInt(thisNum); }
		$(".shot"+ (shotCounter + 1) +" h1").html(function(){
			return thisSeg + thisNum;
		});
		
		
		if ((inOut + thisSeg + thisNumInt) == aiming_for) {
			hit = 1
		} else { hit = 0 }

		shotCounter++;
		
		if (shotCounter == 3) {
			shotCounter = 0;
			new_turn = true;
		} else { new_turn = false; }
	}

	function postClick(){
		console.log(aiming_for, hit, thisNumInt, inOut + thisSegString)
		$.post( "practice#index", {
//			user_id:				,
//			practice_id:			,
//			turn_id:				,
			aiming_for:				aiming_for,
			hit:					hit,
			hit_number:				thisNumInt,
			hit_section:			inOut + thisSegString,
			hit_x:					offsetX, 
 			hit_y:					offsetY,
 			new_turn:				new_turn
		}, function(){
			if (new_turn == true) {
				$("div[class *= 'shot'] h1").delay(500).fadeTo(250, 0.0, function(){
					$(this).html("--").fadeTo(250, 1.0);
					$(".shots circle").fadeOut(250).remove();
				});
				
			}
		});
		$.get( "practice#index", function(data) {
			session_data = data;
			console.log(data);
		})
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
		console.log("click");
			logClick(e); 		
			postClick(e);
	});
	$(".no-hit").click(function(e){ 
		if (selectionState == 0) {
			logClick(e); 
			postClick(e);
		}
	});
	    


});




