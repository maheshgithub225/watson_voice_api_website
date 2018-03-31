import React from 'react';

document.getElementById('name').style.display = 'block';
	document.getElementById('challenge').style.display = 'none';
	document.getElementById('rating').style.display = 'none';
	document.getElementById('feedback').style.display = 'none';

	document.querySelector('#question2').onclick = function() {
		document.getElementById('name').style.display = 'none';
		document.getElementById('challenge').style.display = 'block';
		document.getElementById('rating').style.display = 'none';
		document.getElementById('feedback').style.display = 'none';
	};

	document.querySelector('#question3').onclick = function() {
		document.getElementById('name').style.display = 'none';
		document.getElementById('challenge').style.display = 'none';
		document.getElementById('rating').style.display = 'block';
		document.getElementById('feedback').style.display = 'none';
	};

	document.querySelector('#done').onclick = function() {
		document.getElementById('name').style.display = 'none';
		document.getElementById('challenge').style.display = 'none';
		document.getElementById('rating').style.display = 'none';
		document.getElementById('feedback').style.display = 'block';
		stream.stop();
	};