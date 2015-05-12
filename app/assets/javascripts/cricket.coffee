# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$ ->
	top = $(".shooting .board ul").offset().top
	$("#score-input").css("top", top )

	allCanvas = $("canvas")
	canvasSize = Math.round ($("#score-input span").height() * .7)
	console.log canvasSize
	hypotenuse = Math.sqrt ((canvasSize * canvasSize) * 2)
	allCanvas.each (i,d) ->
#		$(this).attr("width", canvasSize)
		$(this).css "top", -> i * -canvasSize
		$(this).drawVector
			layer: true
			name: "hit1"
			strokeStyle: "#000"
			strokeWidth: 10
			rounded: true
			x: 0
			y: 0
			a1: 135
			l1: 0

		$(this).drawVector
			layer: true
			name: "hit2"
			strokeStyle: "#000"
			strokeWidth: 10
			rounded: true
			x: canvasSize
			y: 0
			a1: 225
			l1: 0

		$(this).drawArc
			layer: true
			name: "hit3"
			strokeStyle: "#000"
			strokeWidth: 10
			x: canvasSize / 2
			y: canvasSize / 2
			radius: canvasSize / 2
			start: 0
			end: 0

		$(this).translateCanvas
			translate: $("#score-input span").height() - canvasSize

		return


	drawHit = (number, score, count) ->
		multiple = score / number
		canvas = $(".shooting .mark" + number + " canvas")
		pointCount = parseInt $(".shooting .mark" + number).attr "data-points"
		newPointCount = pointCount + score
		points = parseInt $(".shooting .score").text()
		newPoints = points + score
		animationLength = 300
		
		drawHit1 = -> 
			canvas.animateLayer "hit1", l1: hypotenuse, animationLength
			return

		drawHit2 = ->
			canvas.animateLayer "hit2", l1: hypotenuse, animationLength
			return

		drawHit3 = -> 
			canvas.animateLayer "hit3", end: 360, animationLength
			return

		addPoints = =>
			$(".shooting .score").text(newPoints)
			$(".shooting .mark" + number).attr("data-points", newPointCount)
			$(".shooting .mark" + number + " .point-count").text(newPointCount)
			return

		if count < 3
			if count is 0
				if multiple is 1
					drawHit1()
				else if multiple is 2
					drawHit1()
					drawHit2()
				else if multiple is 3
					drawHit3()
			if count is 1
				if multiple is 1
					drawHit2()
				else if multiple is 2
					drawHit2()
					drawHit3()
				else if multiple >= 3
					drawHit3()
					addPoints()
			if count is 2
				drawHit3()
				if multiple > 1
					addPoints()
		else
			addPoints()


#		$(".score"+score).addClass "disabled"
		canvas.parent().attr "data-count", count+multiple
		return

	$(".score-cricket").click ->
		number = parseInt $(this).attr "data-val"
		score = parseInt $(this).attr "data-score"
		count = parseInt $(".shooting .mark"+ number).attr "data-count"
		(setTimeout drawHit(number, score, count), 1000) unless $(this).hasClass "disabled"
		return

	return
