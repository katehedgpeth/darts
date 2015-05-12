hit = (aimingAt, trainerLevel) ->
  getRandomArbitrary = (min, max) ->
    number = Math.random() * (max - min) + min;
    return Math.round(number);

  if trainerLevel == 1 then min = 1; max = 100
  else 
    if trainerLevel == 2 then deviation = 50; boardMiss = 90
    else if trainerLevel == 3 then deviation = 30; boardMiss = 85
    else if trainerLevel == 4 then deviation = 10; boardMiss = 82
    else if trainerLevel == 5 then deviation = 3; boardMiss = 82
  
    min = aimingAt - deviation
    min = Math.max(min, 1)
    max = aimingAt + deviation
    max = Math.min(max, boardMiss) 



  pct = getRandomArbitrary(min, max)
  remainder = pct % 4
  hitGroup = (pct - remainder) / 4

  if hitGroup == 0 then bed = 20
  else if hitGroup == 1  then bed = 1 
  else if hitGroup == 2  then bed = 18 
  else if hitGroup == 3  then bed = 4
  else if hitGroup == 4  then bed = 13 	
  else if hitGroup == 5	then bed = 6
  else if hitGroup == 6	then bed = 10 
  else if hitGroup == 7	then bed = 15 
  else if hitGroup == 8	then bed = 2 
  else if hitGroup == 9	then bed = 16 
  else if hitGroup == 10 then bed = 3  
  else if hitGroup == 11 then bed = 19 
  else if hitGroup == 12 then bed = 7  
  else if hitGroup == 13 then bed = 16 
  else if hitGroup == 14 then bed = 8  
  else if hitGroup == 15 then bed = 11 
  else if hitGroup == 16 then bed = 14 
  else if hitGroup == 17 then bed = 9 
  else if hitGroup == 18 then bed = 12 
  else if hitGroup == 19 then bed = 5
  else if hitGroup == 20 then bed = 25
  else if hitGroup > 20 then bed = 0

  if remainder == 1 then pointVal = bed; bedName = "Single #{bed}"
  else if remainder == 2 
      if bed == 25 then pointVal = bed * 2; bedName = "Double #{bed}" else pointVal = bed; bedName = "Single #{bed}"
  else if remainder == 3 then pointVal = bed * 2; bedName = "Double #{bed}"
  else if remainder == 0 then pointVal = bed * 3; bedName = "Triple #{bed}"
  
  if bed == 0 then bedName = "Missed the Board"
  
  "#{bedName}, #{pointVal} points; max = #{max}, min = #{min}"