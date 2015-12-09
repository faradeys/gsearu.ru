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
        $(".watch_btn").on('click', function(e){
        	e.preventDefault();
        	$("#top-video-container").removeClass( "top-video-off" );
        	$("#top-video-container").addClass( "top-video-on" );
        	$("#top-video-container").append('<iframe width="100%" allowfullscreen="" enablejsapi="1" height="100%" src="https://www.youtube.com/embed/z7rNk3wKDK8?autohide=1&iv_load_policy=3&modestbranding=1&showinfo=0&enablejsapi=1&autoplay=1&playerapiid=ytplayer" frameborder="0" allowfullscreen></iframe>');
        	setTimeout(function(){
        	$("#top-video-container").removeClass( "top-video-on" );
        	$("#top-video-container").addClass( "top-video-off" );
        	$("#top-video-container>iframe").remove();

        	}, 100000)
        });
});
