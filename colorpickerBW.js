var mouseDownOnSliderBar = false, onRGB = false;
var sliderBarOffsetInitial = 0, sliderBarOffset = 0, sliderEventDisplacement = 0;
$(document).ready(function(){
	//con( $('#container1').html() );
	sliderBarOffsetInitial = $('#sliderBar2').offset();
	$('#sliderBar2').mousedown(function(event){
		mouseDownOnSliderBar = true;
		sliderBarOffset = $('#sliderBar2').offset();
		sliderEventDisplacement = event.pageY - sliderBarOffset.top;
	});
	$(document).mousemove(function(event){
		if (mouseDownOnSliderBar){
			var num = 0;
			if (event.pageY <= (sliderBarOffsetInitial.top + sliderEventDisplacement)){
				$('#sliderBar2').offset({top:sliderBarOffsetInitial.top});		
			}
			else if((event.pageY - sliderEventDisplacement) >= (sliderBarOffsetInitial.top + 255)){
				$('#sliderBar2').offset({top:sliderBarOffsetInitial.top + 255});
			}
			else{
				$('#sliderBar2').offset({top:event.pageY - sliderEventDisplacement});
			}
			sliderBarOffset = $('#sliderBar2').offset();
			num = Math.floor(sliderBarOffset.top - sliderBarOffsetInitial.top);
			document.getElementById('colorBox2').style.backgroundColor = 'rgb('+num+','+num+','+num+')';
			
			$('#rgbTextarea2').val('rgb('+num+','+num+','+num+')');
			$('#rgbTextarea2').focus().select();
			
			//document.getElementById('rgbValue2').innerHTML = 'rgb('+num+','+num+','+num+')';
			//document.getElementById('rgbValue2').innerHTML = 'rgb('+num+','+num+','+num+')';
		}
	}).mouseup(function(){
		mouseDownOnSliderBar = false;
	}).click(function(){
		$('#rgbValue2').removeClass('selectAllow');
	});
	
	$('#rgbValue2').mousedown(function(){
		onRGB = true;
		$(this).addClass('selectAllow');
	}).mouseup(function(){
		
	});
});