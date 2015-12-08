$(document).ready(function() {

	//Вывод проектов по группам

	$('.group').click(function(e){
		e.preventDefault();
		$('.group').each(function(){
			$(this).removeClass('active');
		});
		$(this).addClass('active');
		var proj_group = $(this).children('.title').text(),
		type_gr = $('#informa').data('grouptype');
		//console.log(tv);
		var data = {
            "proj_group" : proj_group,
            "type" : type_gr,
        	};
		$.ajax({
		   type: 'POST',
		   url: 'scp.html',
		   dataType: 'json',
		   data: data,
	       beforeSend: function(data) { // событие до отправки

	          },
	       success: function(data){ // событие после удачного обращения к серверу и получения ответа
	       		$('.getjs').html('');
				$('.getjs').append(data['acc']);
				if(type_gr=='proj'){
					convas_get_all();
				}

	         },
	       error: function (xhr, ajaxOptions, thrownError) { // в случае неудачного завершения запроса к серверу
	            alert(xhr.status); // покажем ответ сервера
	            alert(thrownError); // и текст ошибки
	         },
	       complete: function(data) { // событие после любого исхода

	         }
		});
	});



	// функция отрисовки конвасов =)
	function convas_get_all() {
			var ar = document.getElementsByClassName('canvas_rt');
			if (ar.length){
				for(var i in ar) {
					console.log(ar[i]);
					var rating = ar[i].getAttribute("data-rating");
					var rating_cof = eval(((rating / 100)*2) - 0.5);
					var c = ar[i];
					var ctx = c.getContext("2d");
					ctx.beginPath();
					ctx.lineWidth = 3;
					ctx.strokeStyle = "rgb(255,199,18)";
					ctx.arc(40,40,35,-0.5*Math.PI,rating_cof*Math.PI);
					ctx.stroke();
				}
			}
		}

		convas_get_all();

//При нажатии на инвестировать проект
$('.btn_invest').click(function(e){
	e.preventDefault();
	var err = 0;
	var field = new Array("name", "tel","mail","sum");
			$(".form").find(":input").each(function() {
				for(var i=0;i<field.length;i++){
					if($(this).attr("name")==field[i]){
						if(!$(this).val()){
							$(this).css('border', 'red 1px solid');
							err = 1;
						}
						else{
							$(this).css('border', 'gray 1px solid');
							err = 0;
						}
					}
				}
			});
	if(err == 0) {
		var data = {
            "isloggining" : 1,
        	};
		$.ajax({
		   type: 'POST',
		   url: 'scp.html',
		   dataType: 'json',
		   data: data,
	       beforeSend: function(data) { // событие до отправки

	          },
	       success: function(data){ // событие после удачного обращения к серверу и получения ответа
					 console.log(data['out']);
	         },
	       error: function (xhr, ajaxOptions, thrownError) { // в случае неудачного завершения запроса к серверу
	            alert(xhr.status); // покажем ответ сервера
	            alert(thrownError); // и текст ошибки
	         },
	       complete: function(data) { // событие после любого исхода

	         }
		});
	}
});




});
