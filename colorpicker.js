var mouseIsDown = false; 
var offset, offsetInitial, displace, sliderId, color;

function con(msg){console.log(msg);}

$(document).on('click','.lock',function(){
	$(this).toggleClass('lock_clicked');
});

$(document).on('mousedown','.sliderBarContainer',function(e){	
	/* 	Handle clicks along .sliderBarContainer (clicks *not* on .sliderBar)
		Adjust .sliderBar to appropriate position
		UI improvement over (strictly) .sliderBar click+move option
	*/
	
	mouseIsDown = true;
	displace = 0;
	sliderId = $(this).children().first().attr('id');
	
	$('#'+sliderId).offset({top: e.pageY});
	
	var sliderValue = $('#' + sliderId).offset();
	
	sliderValue = sliderValue.top - offsetInitial.top;
	
	if (sliderValue > 255){
		sliderValue = 255;
		$('#'+sliderId).offset({top: parseInt($('.sliderGroove').offset().top) + $('.sliderGroove').height() - 12 });
	}
	
	numId = 'num' + sliderId.substring(sliderId.length - 1);
	document.getElementById(numId).innerHTML = parseInt(sliderValue);	
	showColor();
});


$(document).on('mousedown','.sliderBar',function(e){
	sliderId = $(this).attr('id');
	mouseIsDown = true;
	offset = $(this).offset();
	displace = e.pageY - offset.top;
});


$(document).on('mousemove',function(e){
	/*	Adjust .sliderbar position based on mousemove when mousedown
		Set to min (0) when <= min, max (255) when >= max or dynamic bar position based on user input
	*/
	if (mouseIsDown){						
				
		if (e.pageY <= (offsetInitial.top + displace)){
			$('#' + sliderId).offset({top:offsetInitial.top});
		}
		
		else if((e.pageY - displace) >= (offsetInitial.top + 255)){
			$('#' + sliderId).offset({top:offsetInitial.top + 255});
		}
		
		else{
			$('#' + sliderId).offset({top:e.pageY - displace});
		}
		
		var sliderValue = $('#' + sliderId).offset();
		sliderValue = sliderValue.top - offsetInitial.top;
		numId = 'num' + sliderId.substring(sliderId.length - 1);
		document.getElementById(numId).innerHTML = parseInt(sliderValue);					
		
		showColor();
	}
			
	
	
});


$(document).on('mouseup',function(){
	mouseIsDown = false;
	showColor();
});

$(document).ready(function(){
	$('#colorbox').css('backgroundColor','black');
	offsetInitial = $('.sliderBar').offset();			
});

function showColor(){
	color = 'rgb(' + 	
				$('#numR').html() + ',' + 
				$('#numG').html() + ',' + 
				$('#numB').html() + ')' ;
	document.getElementById('colorBox').style.backgroundColor = color;
	$('#rgbTextarea').val(color);
	$('#rgbTextarea').focus().select();
}

$(document).on('click','#rgbText',function(){
	$(this).select();
});