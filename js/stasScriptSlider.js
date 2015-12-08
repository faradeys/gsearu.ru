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

});
