$(function(){
	
	var pageHeight = $(window).height();
	var pageWidth = $("body").width();
	var smallest = Math.min(pageHeight, pageWidth)
	if ( smallest == pageHeight ) {
		var radius = smallest/2.5;
	} else {
		var radius = smallest/2;
	}
	var diam = radius * 2;

	var sine = Math.sin(9);

	var innerDiam = diam / 3;
	
	var rad = diam / 2;
	var innerRad = innerDiam / 2;
	
	var topChordLength = diam * sine;
	var bottomChordLength = 2 * innerRad * sine;
	var topHalflength = topChordLength / 2;
	var saggita = radius - Math.sqrt((radius * radius) - (topHalflength * topHalflength))
	var arcOffsetX = -(topChordLength * Math.sin(81));
	console.log(arcOffsetX);
	var arcOffsetY = topChordLength * sine;

	var x = radius * Math.cos(18)
	var y = radius * Math.sin(18)

	var offset = (topChordLength - bottomChordLength) / 2;


	var buttonWidth = diam/ 4.56;
	var buttonHeight = buttonWidth / 2
	
	
	var svg = d3.select("#svg").append("svg")
		.attr("height", diam)
		.attr("width", diam);

	var g = svg.append("g").attr("transform", function(){
		return "translate("+ radius +", "+ radius +")"
	});
	g.append("circle").attr("r", radius);

	g.append("circle").attr("r", 6).attr("transform", "translate(0,0)").attr("id", "centerpoint")
	
	g.append("path")
		.attr("d", "m0,0 l0,"+ radius)
		.attr("transform", "translate(0,-"+ radius +")");
	
/*
	g.append("path")
	    .attr("d", "m0,0 a"+ diam +","+ diam +" 0 0,1 "+ topChordLength +",0 L"+ (offset + bottomChordLength) +","+ innerDiam +" a"+ innerDiam +","+ innerDiam +" 0 0,0 -"+ offset +",0 Z")
	    .attr("transform", "translate(0, -"+ radius +") rotate(18)");
	
	g.append("path")
	    .attr("d", "m0,0 a"+ diam +","+ diam +" 0 0,1 "+ topChordLength +",0 L"+ (offset + bottomChordLength) +","+ innerDiam +" a"+ innerDiam +","+ innerDiam +" 0 0,0 -"+ offset +",0 Z")
	    .attr("transform", "rotate(18 0 200)");
*/

	var p1 = "0,0";
	var p2x = 0;
	var p2y = radius
	var p2 = p2x.toString() + "," + p2y.toString() + " ";
	var p3 = arcOffsetX.toString() +",-"+ arcOffsetY.toString() + " ";
	var circleDiam = diam.toString() + "," + diam.toString()+ " ";
	var rotate = 0;
	var direction = " 0,0 ";

	g.append("path")
//		.attr("d", "m0,0 l0,"+ radius +" a"+ diam +","+ diam +" 0 0,0 "+ topChordLength +",-"+ arcOffset)
		.attr("d", "m"+ p1 + " l" + p2	+ " a"+ circleDiam + rotate + direction + p3);
		
//	    .attr("d", "m0,0 a"+ diam +","+ diam +" 0 0,1 "+ topChordLength +",0 L"+ (topChordLength / 2) +","+ (radius - saggita) +" Z")
//	    .attr("transform", "translate(-"+ (topChordLength / 2) +", -"+ (radius - saggita) +")");


	var noHitBtn = svg.append("g").attr("class", "no-hit");
	
	noHitBtn.append("rect").attr("height", buttonHeight).attr("width", buttonWidth).attr("rx", 5).attr("transform", function(){
		return "translate("+ (diam + buttonWidth) +", "+ (diam - buttonHeight) +")"
	});
	noHitBtn.append("text").attr("transform", function(){
		return "translate("+ (diam + (buttonWidth*1.5)) +", "+ (diam - 20) +")"
	});
	
	    


});
