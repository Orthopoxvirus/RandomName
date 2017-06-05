/**
 * Created by Orthopoxvirus on 05.06.2017.
 */

$(function() {
	/*
	Detect Enter key, and insert the entered name in a new input before the #placeholder.
	 */
	$('#placeholder').onEnter(function(obj, e) {
		if($(this).val().trim() === '') return;
		var input = $('<input />').insertBefore($(this));
		input.addClass('name').val($(this).val().trim());
		$(this).val('');
	});

	/*
	Starts randomization by clicking on the .randomize Button.
	This removes the #placeholder and the .randomize button.
	 */
	$('button.randomize').on('click', function() {
		if($('input.name').not('#placeholder').length === 0) return;
		$('input.name#placeholder').hide();
		$('button.randomize').animate({
			opacity: 0
		}, 500);
		$('input.name').not('#placeholder').drawRandom(50, $('input.name').not('#placeholder').length * 3, function() {this.showSelected()});
	})
});

/**
 * Detects keypress Enter and calls _callback.
 *
 * @param _callback Callback Function
 * @returns _callback return
 */
$.fn.onEnter = function(_callback) {
	return this.each(function() {
		$(this).on('keypress', function(e) {
			const keyCode = e.keyCode ? e.keyCode : e.which;
			if(keyCode === 13 ) return _callback.call(this, e);
		})
	})
};

/**
 * Draws a random Element of a jQuery set.
 *
 * @param millsPerElement Wait time per Element before next Element will be drawn.
 * @param maxIterations Number of drawn elements before it's done
 * @param _callback Callback after final element drawn.
 * @param currentIteration Used for recursive call.
 */
$.fn.drawRandom = function(millsPerElement = 50, maxIterations = 50, _callback, currentIteration = maxIterations) {

	setTimeout(() => {
		// without insurance:
		// this.filter('.selected').removeClass('selected');
		// this.eq(Math.floor(Math.random() * this.length)).addClass('selected');

		// ensure we don't draw the same element twice in a row
		let newElement;
		do {
			newElement = this.eq(Math.floor(Math.random() * this.length));
		} while (newElement.hasClass('selected'));
		$('input.name.selected').removeClass('selected');
		newElement.addClass('selected');

		// 6 seems to be a good number (by experience) play with this, if you dont like the slowdown.
		// the higher the number the stronger the slowdown
		const slowdown = 6;
		const slowdownStart = maxIterations / 2;
		if(currentIteration <= slowdownStart) millsPerElement = Math.ceil(millsPerElement * (1 + slowdown / maxIterations));
		if(--currentIteration > 0) this.drawRandom(millsPerElement, maxIterations, _callback, currentIteration);
		else if(currentIteration === 0) _callback.call(this);
	}, millsPerElement);
};


/**
 * Shows .selected element of a set big. Removes the rest.
 */
$.fn.showSelected = function() {
	setTimeout(() => {
		this.not('.selected').remove();
		this.filter('.selected').first().removeClass('selected').animate({
			fontSize: "5em",
			backgroundColor: "#FFFFFF"
		}, 1500);
	}, 1000); // wait before show animation
};