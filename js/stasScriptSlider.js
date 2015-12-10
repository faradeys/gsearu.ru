$(document).ready(function() {
        $('.bxslider').bxSlider({
           mode: 'horizontal',           // ��� �������� ����� �������� ����� ���� 'horizontal', 'vertical', 'fade'
            captions: true,         // ����������� title
            easing: 'easeInOutQuad',// �������� ������
            controls: true,         // ����������� ������� - ������, �����
            startSlide: 0,          // ����� �������� � ��������� ������
            infiniteLoop: true,     // ���������� ������ ����� �� ���������
            pager: true,            // ����� ������ ��������
            auto: true,             // ������� �������������� �������
            autoControls: true,     // ���������� ������ ���� � ����
            video: true,            // �������� �����
            pause: 4000,            // ����� ����� ������ ������� � �-���
            speed: 1500,             // ������������ �������� ������ � �-���
            useCSS: false,           // CSS ��������
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

		
		
		
		
        $('.bxsliderjuri').bxSlider({
           mode: 'horizontal',           // ��� �������� ����� �������� ����� ���� 'horizontal', 'vertical', 'fade'
            captions: true,         // ����������� title
            easing: 'easeInOutQuad',// �������� ������
            controls: true,         // ����������� ������� - ������, �����
            startSlide: 0,          // ����� �������� � ��������� ������
            infiniteLoop: true,     // ���������� ������ ����� �� ���������
            pager: true,            // ����� ������ ��������
            auto: true,             // ������� �������������� �������
            autoControls: true,     // ���������� ������ ���� � ����
            video: true,            // �������� �����
            pause: 4000,            // ����� ����� ������ ������� � �-���
            speed: 1500,             // ������������ �������� ������ � �-���
            useCSS: false,           // CSS ��������
      			pager: false,
      			autoControls: false,
      			minSlides: 1,
      			maxSlides: 4,
      			moveSlides: 1,
      			slideWidth: 225,
      			adaptiveHeight: true,
      			responsive:false,
      			ticker:false,
      			tickerHover:true,
      			slideMargin:20,
      			nextSelector:'.nextJuri',
      			prevSelector:'.prevJuri',
        });
		
		


        $('.bxslider-top').bxSlider({
				mode: 'horizontal',           // тип перехода между слайдами может быть 'horizontal', 'vertical', 'fade'
				captions: true,         // отображение title
				easing: 'easeInOutQuad',// анимация слайда
				controls: true,         // отображение стрелки - вперед, назад
				startSlide: 0,          // Показ начнется с заданного слайда
				infiniteLoop: true,     // показывать первый слайд за последним
				pager: true,            // показ номера страницы
				auto: true,             // сделать автоматический переход
				autoControls: false,    // показывает кнопку плей и стоп
				video: true,            // включить видео
				pause: 7000,            // время между сменой слайдов в м-сек
				speed: 2000,             // длительность перехода слайда в м-сек
				useCSS: false,           // CSS переходы
				responsive: false,
      			nextSelector:'.sl_next',
      			prevSelector:'.sl_pre',
				pager: false,
      			autoControls: false,
      			responsive:true,
      			ticker:false,
      			tickerHover:true,
		});
		
		
	

		
		
		
        $(".watch_btn").on('click', function(e){
        	e.preventDefault();
        	$("#top-video-container").removeClass( "top-video-off" );
        	$("#top-video-container").addClass( "top-video-on" );
        	$("#top-video-container").append('<img id="closeVideo" src="assets/img/closeVideo.png"/><iframe width="100%" allowfullscreen="" enablejsapi="1" height="100%" src="https://www.youtube.com/embed/z7rNk3wKDK8?autohide=1&iv_load_policy=3&modestbranding=1&showinfo=0&enablejsapi=1&autoplay=1&playerapiid=ytplayer" frameborder="0" allowfullscreen></iframe>');
        	setTimeout(function(){
        	$("#top-video-container").removeClass( "top-video-on" );
        	$("#top-video-container").addClass( "top-video-off" );
        	$("#top-video-container>iframe").remove();
          }, 105000);

			    $("#closeVideo").on('click', function(){
          	$("#top-video-container").removeClass( "top-video-on" );
          	$("#top-video-container").addClass( "top-video-off" );
          	$("#top-video-container>iframe").remove();
		      });
        });

});
