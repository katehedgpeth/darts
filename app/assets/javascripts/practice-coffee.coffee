$ ->
	
	heightOffset = $("#aiming-for").height() + $("#shots").height() + $("#progress").height() + 80
	pageHeight = $(window).height() - heightOffset
	pageWidth = $("body").width()
		
	smallest = Math.min pageHeight, pageWidth
	if smallest == pageHeight
		radius = smallest/2.5
	else
		radius = smallest/2


	$(".shots").css("margin-top", $("#header").height() + 20)


	rad9 = 9 * (Math.PI / 180)
	sin9 = Math.sin rad9 / (Math.PI / 180)
	rad18 = 18 * (Math.PI / 180)
	sin18 = Math.sin rad18 / (Math.PI / 180)
	rad81 = 81 * (Math.PI / 180)
	sin81 = Math.sin rad81 / (Math.PI / 180)

	
	getX = (degrees) ->
		radians = degrees * (Math.PI / 180)
		cosRadians = radius * Math.cos radians
		cosDegrees = cosRadians / (Math.PI / 180)
		cosDegrees
	getY = (degrees) ->
		radians = degrees * (Math.PI / 180)
		sinRadians = radius * Math.sin radians
		sinDegrees = sinRadians / (Math.PI / 180)
		sinDegrees


	diameter = radius * 2
	toRad = Math.PI * 180

	convertDegrees = Math.PI / 180

	innerdiameter = diameter / 3
	
	rad = diameter / 2
	innerRad = innerdiameter / 2
	
	topChordLength = (radius * sin9 ) * 2
	bottomChordLength = 2 * innerRad * sin18
	topHalflength = topChordLength / 2
	saggita = radius - Math.sqrt((radius * radius) - (topHalflength * topHalflength))
	#	arcOffsetX = topChordLength * sin81
	#	arcOffsetY = topChordLength * sin9	

	thirdSide = -((radius * sin18) /  sin81)

	offset = (topChordLength - bottomChordLength) / 2


	
	
	svg = d3.select("#svg").append("svg")
		.attr({
			height: diameter + 52,
			width: diameter + 52
		})


	board = svg.append("g").attr("class", "board")
	
	boardBg = board.append("circle").attr("r", radius + 24).style("fill", "#000")
	
	segments = board.append("g").attr("class", "segments")

	numbers = board.append("g").attr("class", "numbers")


	drawSegment = (radius, thisClass, inOut, color1, color2, points) ->

		sinDeg = (num) ->
			return Math.sin(num) / 180 * Math.PI

		getSideLength = (knownSide, angle) ->
		    sinDegree = sinDeg angle 
		    sideLength = knownSide * sinDegree
		    sideLength
	
		
		
		halfLength = getSideLength radius, 9
		chordLength = halfLength * 2
		arcOffsetX = getSideLength chordLength, 81
		arcOffsetY = getSideLength(chordLength, 9) * -1
	
	


		p1 = "0,4"
		p2x = 0
		p2y = radius
		p2 = "#{p2x}, #{p2y} "
		p3 = "#{arcOffsetX}, #{arcOffsetY} "
		circleradius = "#{radius}, #{radius} "
		rotate = 0
		direction = " 0,0 "

		segments.append("path")
			.attr({
				d: "m #{p1} l #{p2} a #{circleradius} #{rotate} #{direction} #{p3}"
				transform: -> 
					rotation = (-18 * i) + 9
					"rotate(#{rotation})"
				class: (i) ->
					if i % 2 == 0
						"#{thisClass}#{points} #{inOut} any#{points} #{color1} segment"
					else
						"#{thisClass}#{points} #{inOut} any#{points} #{color2} segment"
			})
		return		
		#end drawSegment

	i = 0
	while i<20
		if i == 0 then points = 20
		else if i == 1  then points = 5 
		else if i == 2  then points = 12 
		else if i == 3  then points = 9 
		else if i == 4  then points = 14 	
		else if i == 5	then points = 11 
		else if i == 6	then points = 8 
		else if i == 7	then points = 16 
		else if i == 8	then points = 7  
		else if i == 9	then points = 19 
		else if i == 10 then points = 3  
		else if i == 11 then points = 17 
		else if i == 12 then points = 2  
		else if i == 13 then points = 15 
		else if i == 14 then points = 10  
		else if i == 15 then points = 6 
		else if i == 16 then points = 13 
		else if i == 17 then points = 4  
		else if i == 18 then points = 18 
		else if i == 19 then points = 1 
		lessRadius = radius - 4
		oddSmall = "red"
		oddLarge = "black"
		evenSmall = "green"
		evenLarge = "white"
		drawSegment lessRadius, "double", "", oddSmall, evenSmall, points
		drawSegment lessRadius * .93, "single", "outer", oddLarge, evenLarge, points
		drawSegment lessRadius * .5, "triple", "", oddSmall, evenSmall, points
		drawSegment lessRadius * .43, "single", "inner", oddLarge, evenLarge, points
		numbers.append("g")
			.attr({
				class: "number",
				height: radius,
				transform: -> "rotate(#{180-(18 * i)})"

			})
			.append("text")
				.text(points).attr("transform", -> "translate(0, #{-radius - 5})")
		i++

	segments.append("circle").attr("r", radius * .1).attr("class", "single21 any21 green segment")
	segments.append("circle").attr("r", radius * .05).attr("class", "double21 any21 red segment")

	shots = svg.append("g").attr("class", "shots")

	buttonWidth = diameter/ 6
	buttonHeight = buttonWidth / 2.5

	noHitBtn = svg.append("g").attr({
		class: "no-hit",
		transform: -> "translate(#{diameter - 40},#{diameter})"
	})
	
	noHitBtn.append("rect")
		.attr({
			height: buttonHeight,
			width: buttonWidth,
			rx: 5
		})
	noHitBtn.append("text")
		.attr("transform", -> "translate( #{buttonWidth*0.5}, #{buttonHeight*0.6})")
		.text("Off Board")



	board.attr("transform", -> 
		translateRadius = -radius - 26
		"rotate(180) translate(#{translateRadius},#{translateRadius})")


	hoverCircle = svg.append("circle").attr({
		r: 5,
		id: "hoverCircle",
		class: "hidden"
	})

	selectionState = 0

	$(".aim-header").click ->
		if selectionState == 0
			selectionState = 1
			$(".number-select").slideDown(500)
			return
		else
			selectionState = 0
			$(".number-select").slideUp(500)
			return
	

	shotCounter = 0
	aimingInOutString = ""
	aimingInOutClass = ""
	aiming_for = "any20"
	d3.selectAll("svg ."+ aiming_for).classed("aiming-for", true)

	$(".select-row h2").click (e) ->
		selectionState = 0
		aimingClass = e.toElement.classList
		if aimingClass[0].substring(0,3) == "any"
			aimingSeg = "any"
			aimingNum = aimingClass[0].substring(3,5)
		else
			aimingSeg = aimingClass[0].substring(0,6)
			aimingNum = aimingClass[0].substring(6,8)			
		
		if aimingClass.length == 2 && aimingClass[1] != "any"
			aimingInOutString = aimingClass[1] +" "
			aimingInOutClass = "." + aimingInOutString
		
		$(".selected-num").removeClass("selected-num")
		$(this).addClass("selected-num")
		$("#aim-number span").html (i,d) ->
			if aimingNum == "21" then aimingNumString = "Bull" else aimingNumString = aimingNum
			"#{aimingInOutString}#{aimingSeg} #{aimingNumString}"
		
		aiming_for = aimingSeg + aimingNum + aimingInOutClass
		d3.selectAll("svg .aiming-for").classed("aiming-for", false)
		d3.selectAll("svg ."+ aiming_for).classed("aiming-for", true)
		$(".number-select").slideUp 500
		return


	logClick = (click) ->

		shots.append("circle").attr({
			r: 5,
			class: "shot-marker",
			transform: -> "translate(#{offsetX},#{offsetY})"
		})
		hitClass = click.toElement.classList
		hitSeg = hitClass[0].substring(0,6)
		hitNum = hitClass[0].substring(6,8)

		if hitSeg == ""
			thisSeg = "None"
			thisNum = ""
			thisNumInt = 0
		else thisNumInt = parseInt thisNum

		$(".shot#{shotCounter + 1} h1").html ->
			thisSeg + thisNum
		
		if inOut + thisSeg + thisNumInt == aiming_for then hit = 1
		else hit = 0

		shotCounter++
		
		if shotCounter == 3
			shotCounter = 0
			new_turn = true
			return
		else
			new_turn = false
			return

# 	postClick = ->
# 		$.post( "practice#index", {
# #			user_id:				,
# #			practice_id:			,
# #			turn_id:				,
# 			aiming_for:				aiming_for,
# 			hit:					hit,
# 			hit_number:				thisNumInt,
# 			hit_section:			inOut + thisSegString,
# 			hit_x:					offsetX, 
#  			hit_y:					offsetY,
#  			new_turn:				new_turn
# 		}, ->
# 			if new_turn == true
# 				$("div[class *= 'shot'] h1").delay(500).fadeTo 250, 0.0, ->
# 					$(this).html("--").fadeTo(250, 1.0)
# 					$(".shots circle").fadeOut(250).remove()
# 					return
# 			return
			
			
		
# 		$.get( "practice#index", (data) ->
# 			session_data = data
# 			return

# 		return


	$(".segment").mousemove (e) ->
		tempX = e.pageX 
		tempY = e.pageY
		offset = $("svg").offset()
		offsetX = tempX - offset.left - 5
		offsetY = tempY - offset.top - 5
		hoverCircle.attr("class", "")
		$("#hoverCircle").attr "transform", -> "translate(#{offsetX},#{offsetY})"
		$("svg").mouseleave (e) ->
			hoverCircle.attr("class", "hidden")
			return
		return
	$(".segment").click (e) ->
		logClick(e) 		
		postClick(e)
		return
	$(".no-hit").click (e) ->
		if selectionState == 0
			logClick(e) 
			postClick(e)
		return
	    
return



