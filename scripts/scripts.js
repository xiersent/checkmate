
document.addEventListener("DOMContentLoaded", function(){ 
	var lines = document.querySelectorAll('.aaa-runningLine__inner');
	for(i = 0; i < lines.length; ++i){
		var copy = lines[i].querySelector('.aaa-runningLine__items').cloneNode(true);
		lines[i].appendChild(copy);
	}

	//---
	
	function addClone(){
		var lastSlide = carouselContent.lastElementChild.cloneNode(true);
		lastSlide.style.left = (-lengthOfSlide) + "px";
		carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
	}
	function removeClone(){
		var firstSlide = carouselContent.firstElementChild;
		firstSlide.parentNode.removeChild(firstSlide);
	}
	function moveSlidesRight(){
		var slides = document.querySelectorAll('.slide');
		var slidesArray = Array.prototype.slice.call(slides);
		var width = 0;

		var currentSlideNum = parseInt(document.querySelector('.aaa-numSlides__current').innerHTML);
		if(currentSlideNum == 0){
			document.querySelector('.aaa-numSlides__current').innerHTML = '1';
		}
		else if(currentSlideNum == 1){
			document.querySelector('.aaa-numSlides__current').innerHTML = arrayOfSlides.length;
		}else{
			document.querySelector('.aaa-numSlides__current').innerHTML = currentSlideNum-1;
		}
	
		slidesArray.forEach(function(el, i){
			el.style.left = width + "px";
			width += lengthOfSlide;
		});
		addClone();
	}
	function moveSlidesLeft(){
		var slides = document.querySelectorAll('.slide');
		var slidesArray = Array.prototype.slice.call(slides);
		slidesArray = slidesArray.reverse();
		var maxWidth = (slidesArray.length - 1) * lengthOfSlide;

		var currentSlideNum = parseInt(document.querySelector('.aaa-numSlides__current').innerHTML);
		if(currentSlideNum == 0){
			document.querySelector('.aaa-numSlides__current').innerHTML = '1';
		}else if(currentSlideNum == arrayOfSlides.length){
			document.querySelector('.aaa-numSlides__current').innerHTML = '1';
		}else{
			document.querySelector('.aaa-numSlides__current').innerHTML = currentSlideNum+1;
		}
	
		slidesArray.forEach(function(el, i){
			maxWidth -= lengthOfSlide;
			el.style.left = maxWidth + "px";
		});
	}
	function setScreenSize(){
		if ( window.innerWidth >= 1366 ) {
			carouselDisplaying = 3;
		}
		if(window.innerWidth >= 876 && window.innerWidth < 1366){
			carouselDisplaying = 2;
		}
		if(window.innerWidth < 876){
			carouselDisplaying = 1;
		}
		getScreenSize();
	}
	function getScreenSize(){
		var slides = document.querySelectorAll('.slide');
		var slidesArray = Array.prototype.slice.call(slides);
		lengthOfSlide = ( carouselContent.offsetWidth  / carouselDisplaying );
		var initialWidth = -lengthOfSlide;
		slidesArray.forEach(function(el) {
			el.style.width = lengthOfSlide + "px";
			el.style.left = initialWidth + "px";
			initialWidth += lengthOfSlide;
		});
	}
	function moveRight(){
		if ( moving ) {
			moving = false;
			var lastSlide = carouselContent.lastElementChild;
			lastSlide.parentNode.removeChild(lastSlide);
			carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
			removeClone();
			var firstSlide = carouselContent.firstElementChild;
			firstSlide.addEventListener('transitionend', activateAgain);
			moveSlidesRight();
		}
	}
	function activateAgain(){
		var firstSlide = carouselContent.firstElementChild;
		moving = true;
		firstSlide.removeEventListener('transitionend', activateAgain);
	}
	function moveLeft(){
		if ( moving ) {
			moving = false;
			removeClone();
			var firstSlide = carouselContent.firstElementChild;
			firstSlide.addEventListener('transitionend', replaceToEnd);
			moveSlidesLeft();
		}
	}
	function replaceToEnd(){
		var firstSlide = carouselContent.firstElementChild;
		firstSlide.parentNode.removeChild(firstSlide);
		carouselContent.appendChild(firstSlide);
		firstSlide.style.left = ( (arrayOfSlides.length -1) * lengthOfSlide) + "px";
		addClone();
		moving = true;
		firstSlide.removeEventListener('transitionend', replaceToEnd);
	}
	

	var carousel = document.querySelector('.carousel');
	var carouselContent = document.querySelector('.carousel-content');
	var slides = document.querySelectorAll('.slide');
	var arrayOfSlides = Array.prototype.slice.call(slides);
	var carouselDisplaying;
	var lengthOfSlide;
	var rightNav = document.querySelector('.nav-right');
	var leftNav = document.querySelector('.nav-left');
	var moving = true;
	
	document.querySelector('.aaa-numSlides__all').innerHTML = arrayOfSlides.length;
	setScreenSize();
	moveSlidesRight();
	window.addEventListener('resize', setScreenSize);
	rightNav.addEventListener('click', moveLeft);
	leftNav.addEventListener('click', moveRight);
	setInterval(function(){
		moveLeft();
	}, 4000);

	//---
	var currentStage = 1;
	var leftStage = document.querySelector('.aaa-leftStage');
	var rightStage = document.querySelector('.aaa-rightStage');
	var allStageDots = document.querySelectorAll('.aaa-stageDot');
	var stagesSlider = document.querySelector('.aaa-stages__inner');

	rightStage.addEventListener('click', function(){

		if(currentStage < 5){
			currentStage = currentStage + 1;

			stagesSlider.classList.remove('aaa-stages__inner--stage1', 'aaa-stages__inner--stage2', 'aaa-stages__inner--stage3', 'aaa-stages__inner--stage4', 'aaa-stages__inner--stage5');
			stagesSlider.classList.add('aaa-stages__inner--stage'+currentStage);

			[].forEach.call(allStageDots, function(el) {
				el.classList.remove('aaa-stageDot--current');
			});

			allStageDots[currentStage-1].classList.add('aaa-stageDot--current');


			leftStage.removeAttribute('disabled');
			if(currentStage == 5){
				rightStage.setAttribute('disabled', true);
			}	
		}

	});


	leftStage.addEventListener('click', function(){
		if(currentStage > 1){
			currentStage = currentStage - 1;

			stagesSlider.classList.remove('aaa-stages__inner--stage1', 'aaa-stages__inner--stage2', 'aaa-stages__inner--stage3', 'aaa-stages__inner--stage4', 'aaa-stages__inner--stage5');
			stagesSlider.classList.add('aaa-stages__inner--stage'+currentStage);

			[].forEach.call(allStageDots, function(el) {
				el.classList.remove('aaa-stageDot--current');
			});

			allStageDots[currentStage-1].classList.add('aaa-stageDot--current');

			rightStage.removeAttribute('disabled');
			if(currentStage == 1){
				leftStage.setAttribute('disabled', true);
			}
		}

	});

});