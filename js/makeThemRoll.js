/**
 * Author: Łukasz Kowalski
 * http://devbricks.com
 */

(function($){
	$.fn.makeThemRoll = function(options){
		var options = $.extend({
			perspective:2000,
			time:1,
			loop:true,
			onchange:function(){}
		}, options)

		var amount = $(this).find('.pane').length;
		var angle = 360/amount;
		var translateZ;
		var self = this;
		var rot = 0;

		var change = function(direction){
			set(rot+direction);
			setPosition();
		}

		var set = function(index){
			rot = parseInt(index);
			if(!options.loop){
				if(rot>amount-1) rot = amount-1;
				if(rot<0) rot = 0;
			}
			setPosition();
			options.onchange();
		}

		var updatePane = function(){
			recount();
			setPosition();
		}

		var goToClosest = function(idx){
			
			var idx = idx%amount;
			var diff = idx - rot%amount;
			if(Math.abs(diff) > amount/2){
				change((amount-Math.abs(diff))*(diff < 0 ? 1 : -1))
			}else{
				change(diff);
			}
		}

		function recount(){
			translateZ = Math.round( ( $(self).height() / 2 ) / Math.tan( Math.PI / amount ) );
			$(self).find('.pane').each(function(i, e){
				$(e).css({
					'transform':'rotateX('+(-angle*i)+'deg) translateZ('+(translateZ)+'px)'
				})
			});
		}

		function setPosition(){
			$('.inner', self).css('transform', 'translateZ('+(-translateZ)+'px) rotateX('+(angle*rot)+'deg)');
		}

		updatePane();
		
		setTimeout(function(){
			$(self).css({
				perspective:options.perspective+'px',
			}).find('.inner').css({
				'transform-style': 'preserve-3d',
				'transition': 'transform '+options.time+'s',
				'-webkit-transition': '-webkit-transform '+options.time+'s',
				'-moz-transition': '-moz-transform '+options.time+'s',
				'-ms-transition': '-ms-transform '+options.time+'s'
			}).find('.pane').css({
				'backface-visibility':'hidden'
			});
		},100);
		

		return new (function(){
			this.change = change;
			this.set = set;
			this.goToClosest = goToClosest;
			this.updatePane = updatePane;
			this.getRot = function(){return rot}
			this.getAmount = function(){return amount}
		})();
	}
})(jQuery);