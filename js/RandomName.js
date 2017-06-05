/**
 * Created by Orthopoxvirus on 05.06.2017.
 */

$(function() {
	$('#placeholder').onEnter(function(obj, e) {
		if($(this).val().trim() === '') return;
		var input = $('<input />').insertBefore($(this));
		input.addClass('name').val($(this).val().trim());
		$(this).val('');
	});

	$('button.randomize').on('click', function() {
		if($('input.name').not('#placeholder').length === 0) return;
		$('input.name#placeholder').hide();
		$('button.randomize').animate({
			opacity: 0
		}, 500);
		$('input.name').not('#placeholder').drawRandom(50, $('input.name').not('#placeholder').length * 3, 50, function() {this.showSelected()});
	})
});

$.fn.onEnter = function(_callback) {
	return this.each(function() {
		$(this).on('keypress', function(e) {
			var keyCode = e.keyCode ? e.keyCode : e.which;
			if(keyCode === 13 ) _callback.call(this, e);
		})
	})
};

$.fn.drawRandom = function(millsPerElement = 50, maxIterations = 50, currentIteration = maxIterations, _callback) {
	setTimeout(() => {
		// ensure we don't draw the same element twice in a row
		do {
			var newElement = this.eq(Math.floor(Math.random() * this.length));
		} while (newElement.hasClass('selected'));
		$('input.name.selected').removeClass('selected');
		newElement.addClass('selected');

		//this.eq(Math.floor(Math.random() * this.length)).addClass('selected'); // without insurance

		if(currentIteration <= maxIterations / 2) millsPerElement = Math.ceil(millsPerElement * 1.13);
		if(--currentIteration > 0) this.drawRandom(millsPerElement, maxIterations, currentIteration, _callback);
		else if(currentIteration === 0) _callback.call(this);
	}, millsPerElement);
};

$.fn.showSelected = function() {
	setTimeout(() => {
		this.not('.selected').remove();
		this.filter('.selected').first().removeClass('selected').animate({
			fontSize: "5em",
			backgroundColor: "#FFFFFF"
		}, 1500);
	}, 1000); // wait before show animation
};