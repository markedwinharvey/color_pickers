var mouseDownOnSliderBar = false, onRGB = false;
var sliderBarOffsetInitial = 0, sliderBarOffset = 0, sliderEventDisplacement = 0;
$(document).ready(function(){
	sliderBarOffsetInitial = $('#sliderBar').offset();
	$('#sliderBar').mousedown(function(event){
		mouseDownOnSliderBar = true;
		sliderBarOffset = $('#sliderBar').offset();
		sliderEventDisplacement = event.pageY - sliderBarOffset.top;
	});
	$(document).mousemove(function(event){
		if (mouseDownOnSliderBar){
			var num = 0;
			if (event.pageY <= (sliderBarOffsetInitial.top + sliderEventDisplacement)){
				$('#sliderBar').offset({top:sliderBarOffsetInitial.top});		
			}
			else if((event.pageY - sliderEventDisplacement) >= (sliderBarOffsetInitial.top + 255)){
				$('#sliderBar').offset({top:sliderBarOffsetInitial.top + 255});
			}
			else{
				$('#sliderBar').offset({top:event.pageY - sliderEventDisplacement});
			}
			sliderBarOffset = $('#sliderBar').offset();
			num = Math.floor(sliderBarOffset.top - sliderBarOffsetInitial.top);
			document.getElementById('colorBox').style.backgroundColor = 'rgb('+num+','+num+','+num+')';
			document.getElementById('rgbValue').innerHTML = 'rgb('+num+','+num+','+num+')';
		}
	}).mouseup(function(){
		mouseDownOnSliderBar = false;
	}).click(function(){
		$('#rgbValue').removeClass('selectAllow');
	});
	
	$('#rgbValue').mousedown(function(){
		onRGB = true;
		$(this).addClass('selectAllow');
	}).mouseup(function(){
		
	});
});