$(function(){
	
	var pageHeight = $(window).height();
	var pageWidth = $("body").width();
	var smallest = Math.min(pageHeight, pageWidth)
	if ( smallest == pageHeight ) {
		var radius = smallest/2.5;
	} else {
		var radius = smallest/2;
	}







// degrees -> radians: DEGREE * (PI / 180)
// radians -> degrees: RADIAN * (180 / PI)







	var selectionState = 1	




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
	console.log("topChordLength = "+ topChordLength);
	console.log("thirdSide = "+thirdSide);

	var offset = (topChordLength - bottomChordLength) / 2;


	
	
	var svg = d3.select("#svg").append("svg")
		.attr("height", diameter + 2)
		.attr("width", diameter + 2);


	var g = svg.append("g").attr("transform", function(){
//		return "translate("+ (radius - 5) +", "+ (radius - 5) +")"
	});



	function drawSegment(radius, thisClass, color1, color2) {
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

		g.append("path")
			.attr("d", "m"+ p1 + " l" + p2	+ " a"+ circleradius + rotate + direction + p3)
			.attr("transform", function(){
				return "rotate("+ ((-18 * i)+9)+")"
			})
			.attr("class", function(){
				if (i % 2 == 0) {
					return thisClass + points +" "+ color1 + " segment";
				} else { return thisClass + points +" "+ color2 + " segment"; }
			})
			
	}

	var i = 0;
	while (i<20) {
		var lessRadius = radius - 4;
		var oddSmall = "red"
		var oddLarge = "black"
		var evenSmall = "green"
		var evenLarge = "white"
		drawSegment(lessRadius, "double", oddSmall, evenSmall);
		drawSegment(lessRadius * .93, "single", oddLarge, evenLarge);
		drawSegment(lessRadius * .5, "triple", oddSmall, evenSmall);
		drawSegment(lessRadius * .43, "single", oddLarge, evenLarge);
		
		i++;
	}
	g.append("circle").attr("r", radius * .1).attr("class", "single bull green segment");
	g.append("circle").attr("r", radius * .05).attr("class", "double bull red segment");
	var shots = svg.append("g").attr("class", "shots")

	var buttonWidth = diameter/ 5;
	var buttonHeight = buttonWidth / 2.5

	var noHitBtn = svg.append("g").attr("class", "no-hit");
	
	noHitBtn.append("rect").attr("height", buttonHeight).attr("width", buttonWidth).attr("rx", 5).attr("transform", function(){
		return "translate("+ (diameter - buttonWidth ) +", "+ (diameter - buttonHeight) +")"
	});
	noHitBtn.append("text").attr("transform", function(){
		return "translate("+ (diameter - (buttonWidth*0.68)) +", "+ (diameter - (buttonHeight*0.4)) +")"
	}).text("No Hit");



	g.attr("transform", "rotate(180) translate("+ (-radius - 1) +","+ (-radius -1) +")")


	var hoverCircle = svg.append("circle").attr("r", 5).attr("id", "hoverCircle").attr("class", "hidden")

	$("svg").mousemove(function(e){
		tempX = e.pageX; 
		tempY = e.pageY;
		offset = $("svg").offset();
		offsetX = tempX - offset.left - 5;
		offsetY = tempY - offset.top - 5;
		hoverCircle.attr("class", "");
		$("#hoverCircle").attr("transform", function(){
			return "translate("+ offsetX +","+ offsetY +")";
		})
	});
	$("svg").mouseleave(function(e){
		hoverCircle.attr("class", "hidden")
	});
	
	var shotCounter = 0;
	
	$(".segment").click(function(e){
		shotCounter++;
		tempX = e.pageX; 
		tempY = e.pageY;
		offset = $("svg").offset();
		offsetX = tempX - offset.left - 5;
		offsetY = tempY - offset.top - 5;
		shots.append("circle").attr("r", 5).attr("class", "shot-marker").attr("transform", function(){
			return "translate("+ offsetX +","+ offsetY +")";			
		});
		var thisClass = this.className.baseVal;
		thisSeg = thisClass.substring(0,1);
		thisNum = thisClass.substring(6,8);
		if (thisNum == " b"){
			thisNum = thisClass.substring(7,8);
		}
		
		console.log(thisSeg);
		console.log(thisNum);
		$(".shot"+ shotCounter +" h1").html(function(){
			return thisSeg + thisNum;
		});
		
	});		
	

	
	    


});
