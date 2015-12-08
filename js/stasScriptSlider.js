 $(document).ready(function(){
        $('.bxslider').bxSlider({
           mode: 'horizontal',           // тип перехода между слайдами может быть 'horizontal', 'vertical', 'fade'
            captions: true,         // отображение title
            easing: 'easeInOutQuad',// анимация слайда
            controls: true,         // отображение стрелки - вперед, назад
            startSlide: 0,          // Показ начнется с заданного слайда
            infiniteLoop: true,     // показывать первый слайд за последним 
            pager: true,            // показ номера страницы
            auto: true,             // сделать автоматический переход
            autoControls: true,     // показывает кнопку плей и стоп
            video: true,            // включить видео
            pause: 4000,            // время между сменой слайдов в м-сек
            speed: 1500,             // длительность перехода слайда в м-сек
            useCSS: false,           // CSS переходы
			pager: false,
			autoControls: false,
			minSlides: 1,
			maxSlides: 6,
			moveSlides: 1,
			slideWidth: 225,
			adaptiveHeight: true,
			responsive:false,
			ticker:false,
			tickerHover:true,
			slideMargin:20,
			nextSelector:'.next',
			prevSelector:'.prev',
        });
	});