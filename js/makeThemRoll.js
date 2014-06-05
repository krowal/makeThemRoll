(function($){
	$.fn.makeThemRoll = function(options){
		var options = $.extend({
			perspective:2000,
			time:1,
			loop:true
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
		}

		var updatePane = function(){
			recount();
			setPosition();
		}

		function recount(){
			translateZ = Math.round( ( $(self).height() / 2 ) / Math.tan( Math.PI / amount ) );
			$(self).find('.pane').each(function(i, e){
				$(e).css({
					'transform':'rotateX('+(angle*i)+'deg) translateZ('+(translateZ)+'px)'
				})
			});
		}

		function setPosition(){
			$('.inner', self).css('transform', 'translateZ('+(-translateZ)+'px) rotateX('+(angle*rot)+'deg)');
		}

		updatePane();

		$(this).css({
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

		return new (function(){
			this.change = change;
			this.set = set;
			this.updatePane = updatePane;
		})();
	}
})(jQuery);