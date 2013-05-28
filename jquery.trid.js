/*
Copyright 2013 Best Value Technology Inc.
Distributed under the MIT license:
http://opensource.org/licenses/MIT
Authored by Chase Adams
*/
(function ( $ ) {
	$.fn.quadify = function(m3) {
		e = m3.elements;
		e[0].push(0);e[1].push(0);e[2].push(0);e.push([0,0,0,1]);
		return $M(e);
	}
	$.fn.tridView = function(options) {
		var settings = $.extend({
			"perspective": 300,
			"useMouse": false,
		}, options );
		$("html,body").css({"margin": "0px", "padding": "0px", "overflow":"hidden"});
		this.addClass('trid-viewport');
		priorDisplay = this.css('display');
		this.css({"display":"none"});
		this.css({"width": "0px", "height": "0px",
		"perspective": settings.perspective,
		"left":Math.round($(window).width()/2),
		"top":Math.round($(window).height()/2),
		"position":"absolute",
		"transform-style":"preserve-3d"});
		this.css({"display":priorDisplay});
		$(window).resize(function() {
			$(".trid-viewport").css({"width": "0px", "height": "0px",
					"perspective": settings.perspective,
					"left":Math.round($(window).width()/2),
					"top":Math.round($(window).height()/2),
					"position":"absolute",});
		});
		$('<style>.select-disabled { user-select:none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;}</style>').appendTo('head');
		innerHtml = this.html();
		this.html('<div class="trid-camera"></div>');
		$('.trid-camera').html(innerHtml);
		$('.trid-camera').camera({"useMouse": settings.useMouse});
		return this;
	}
	$.fn.cameraMouse = function(useIt) {
		if(useIt) {
			$('body').addClass('select-disabled');
			$('.trid-viewport').addClass('select-disabled');
			$(window).mousedown(function() {
				$('.trid').addClass('select-disabled');
				$('.trid').contents().addClass('select-disabled');
				$('.trid').children().addClass('select-disabled');
				$('.trid').children().contents().addClass('select-disabled');
				$(window).mousemove(function(e) {
					camera = $('.trid-camera').first();
					pmx = camera.data('pmx');
					pmy = camera.data('pmy');
					if(pmx == null) {
						pmx = e.pageX;
						pmy = e.pageY;
					}
					if(e.ctrlKey) { // "walking"
						camera.data('cz',camera.data('cz')+(e.pageY-pmy)*50);
						camera.data('cx',camera.data('cx')+(e.pageX-pmx)*-10);
					} else { // "looking"
						camera.data('cry',camera.data('cry')+(e.pageX-pmx)/-5.0);
						camera.data('crx',camera.data('crx')+(e.pageY-pmy)/5.0);
					}
					camera.data('pmx',e.pageX);
					camera.data('pmy',e.pageY);
					
					text = 'rotateY('+(camera.data('cry'))+'deg) '+
							'rotateX('+(camera.data('crx'))+'deg) '+
							'rotateZ('+(camera.data('crz'))+'deg) '+
							'translate3d('+(-camera.data('cx'))+'px,'+
										(-camera.data('cy'))+'px,'+
										(-camera.data('cz'))+'px)';
					camera.css({
						"transform": text,
						"-ms-transform": text,
						"-webkit-transform": text,
						"transform-style":"preserve-3d",
					});
					
				});
			});
			$(window).mouseup(function() {
				$(window).unbind("mousemove");
				camera = $('.trid-camera').first();
				camera.data('pmx',null);
				camera.data('pmy',null);
				$('.trid').removeClass('select-disabled');
				$('.trid').contents().removeClass('select-disabled');
				$('.trid').children().removeClass('select-disabled');
				$('.trid').children().contents().removeClass('select-disabled');
			});
		} else {
			$(window).unbind("mousemove");
			$(window).unbind("mousedown");
			$(window).unbind("mouseup");
			camera = $('.trid-camera').first();
			camera.data('pmx',null);
			camera.data('pmy',null);
			$('.trid').removeClass('select-disabled');
			$('.trid').contents().removeClass('select-disabled');
			$('.trid').children().removeClass('select-disabled');
			$('.trid').children().contents().removeClass('select-disabled');
		}
	}
	$.fn.camera = function(options) {
		var settings = $.extend({
			"useMouse": true,
			"perspective": 300,
			"-moz-perspective": 300,
		}, options );
		this.data('cx',0);
		this.data('cy',0);
		this.data('cz',0);
		this.data('crx',0);
		this.data('cry',0);
		this.data('crz',0);
		if(settings.useMouse) {
			this.cameraMouse(true);
		}
		return this;
	}
	$.fn.trid = function(options) {
		var settings = $.extend({
			"x": this.data('x'),
			"y": this.data('y'),
			"z": this.data('z'),
			"rx": this.data('rx'),
			"ry": this.data('ry'),
			"rz": this.data('rz'),
			"sx": this.data('sx'),
			"sy": this.data('sy'),
			"sz": this.data('sz'),
		}, options );
		if(settings.x == null) settings.x = 0
		if(settings.y == null) settings.y = 0
		if(settings.z == null) settings.z = 0
		if(settings.rx == null) settings.rx = 0
		if(settings.ry == null) settings.ry = 0
		if(settings.rz == null) settings.rz = 0
		if(settings.sx == null) settings.sx = 1
		if(settings.sy == null) settings.sy = 1
		if(settings.sz == null) settings.sz = 1
		this.data('x',settings.x);
		this.data('y',settings.y);
		this.data('z',settings.z);
		this.data('rx',settings.rx);
		this.data('ry',settings.ry);
		this.data('rz',settings.rz);
		this.data('sx',settings.sx);
		this.data('sy',settings.sy);
		this.data('sz',settings.sz);
		this.addClass('trid');
		$(this).css({'position':'absolute',
					'transform-origin':'50% 50%',
					'transform-style':'preserve-3d',});
		return this;
	};
}( jQuery ));

jQuery.tridTick = function() {
	$('.trid').each(function() {
		text = 'scale3d('+$(this).data('sx')+','+
						$(this).data('sy')+','+
						$(this).data('sz')+')'+
				'translate3d('+$(this).data('x')+'px,'+
						$(this).data('y')+'px,'+
						$(this).data('z')+'px) '+
				'rotateY('+$(this).data('ry')+'deg) '+
				'rotateX('+$(this).data('rx')+'deg) '+
				'rotateZ('+$(this).data('rz')+'deg)';
		
		$(this).css({
			"transform": text,
			"-ms-transform": text,
			"-webkit-transform": text,
		});
	});
}
