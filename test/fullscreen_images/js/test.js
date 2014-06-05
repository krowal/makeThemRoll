$(function(){
	
	/**
	 * api:
	 * change - change slides by value (eg. -1 will go to previous slide, +3 will go 3 slides forward)
	 * set - goes directly to choosen slide
	 * updatePane - run this when you change size of a container
	 */
	
	var api = $('.scrollpane-container').makeThemRoll({loop:true});
	
	$(document).mousewheel(function(e, delta){
		api.change(delta < 0 ? 1 : -1);
	})
	
	$(window).resize(function(){
		api.updatePane();
	})
})
