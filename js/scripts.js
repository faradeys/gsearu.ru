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
	       beforeSend: function(data) {
	          },
	       success: function(data){
	       		$('.getjs').html('');
						$('.getjs').append(data['acc']);
						if(type_gr=='proj'){
							convas_get_all();
						}
	         },
	       error: function (xhr, ajaxOptions, thrownError) {
	            alert(xhr.status);
	            alert(thrownError);
	         },
	       complete: function(data) {
	         }
		});
	});



	// функция отрисовки конвасов =)
	function convas_get_all() {
			var ar = document.getElementsByClassName('canvas_rt');
			if (ar.length){
				for(var i=0;i<ar.length;i++) {
					var rating = ar[i].getAttribute("data-rating");
					//console.log(rating);
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
		       beforeSend: function(data) {

		          },
		       success: function(data){
						 if(data['out']== 'true'){
							 var data = $('input').serialize();
							 console.log(data);
							 $.ajax({
					 		   type: 'POST',
					 		   url: 'scp.html',
					 		   dataType: 'json',
					 		   data: data,
					 	       success: function(data){

					 	         },
					 		});
						 }
						 else {
							 	$('#facebook-authentifikation').css('display','block');
						 		$('.scrolled-overlay').css({
						 							'display': 'flex'
						 		});
						 }
		         },
		       error: function (xhr, ajaxOptions, thrownError) {
		            alert(xhr.status);
		            alert(thrownError);
		         },
		       complete: function(data) {
		         }
			});
		}
	});

	//Всплывающее окно логина
	$('.login').click(function (e) {
		e.preventDefault();
		$('#facebook-authentifikation').css('display','block');
		$('.scrolled-overlay').css({
							'display': 'flex'
		});
	});
function close_modal(){
	$('.close-pop-up').click('click', function(){
			$('#facebook-authentifikation').css({
					'display': 'none',
			});
			$('body').css({
					'overflow-y': 'visible'
			});
			$('.scrolled-overlay').css({
					'display': 'none'
			});
	});
}
close_modal();

		//авторизация через логин и пароль
		$("input[name='Login']").click(function(e) {
			e.preventDefault();
			var err = 0;
			var field = new Array("username", "password");
					$("#login_form").find(":input").each(function() {
						for(var i=0;i<field.length;i++){
							if($(this).attr("name")==field[i]){
								if(!$(this).val()){
									$(this).css('border', 'red 1px solid');
									err = 1;
								}
								else{
									$(this).css('border', '#c2c2c2 1px solid');
									err = 0;
								}
							}
						}
					});
			if(err == 0) {
				var data = {
		            "isloggin" : 1,
								"login" : $("input[name='username']").val(),
								"password" : $("input[name='password']").val(),
		        	};
					$.ajax({
					   type: 'POST',
					   url: 'scp.html',
					   dataType: 'json',
					   data: data,
				       success: function(data){
								 if(data['out']== 'true'){
									 $("#login_form").trigger('submit');
								 }
								 else if (data['out'] == 'false_login') {
								 	$("input[name='username']").css('border', 'red 1px solid');
								 }
								 else {
									 $("input[name='username']").css('border', '#c2c2c2 1px solid');
									 $("input[name='password']").css('border', 'red 1px solid');
								 }
				         },
					});
			}
			else {

			}
		});

//Анкета на участие в проекте
$("input[name='push']").click(function(e) {
	aaa = 0;

			if(aaa == 0){
				var data = {
		            "isloggining" : 1,
		        	};
					$.ajax({
					   type: 'POST',
					   url: 'scp.html',
					   dataType: 'json',
					   data: data,
				       success: function(data){
								  if(data['out']== 'true'){
										aaa = 1;
										var data = $('#pr_add').serialize();
											$.ajax({
												 type: 'POST',
												 url: 'scp.html',
												 dataType: 'json',
												 data: data,
													 success: function(data){
														 if(data['out_ins']== 'true'){

														 }
														 else {

														 }
														 if($('input[name="req_project"]').val()  == 1){
															 $('#facebook-authentifikation').css('display','block');
															 $('.scrolled-overlay').css({
																				 'display': 'flex'
															 });
															 $('#facebook-authentifikation').html('<div class="modal_all"><div class="modal_top">Ваша заявка отправлена, менеджер скоро свяжется с вами.</div><img class="close-pop-up" src="assets/img/close.png"/></div>');
															 close_modal();
													 	 }
														 if($('input[name="req_project"]').val() == 2){
															  window.location.href = "novyij-proekt.html#req_form2"
														 }
														 },
											});
									}
									else {
										$('#facebook-authentifikation').css('display','block');
								 		$('.scrolled-overlay').css({
								 							'display': 'flex'
								 		});
									}
				         },
					});
					return false;
			}
			else {
				return true;
			}
});


//2 Анкета на участие в проекте
$("input[name='req_form2']").click(function(e) {
	aaa = 0;

			if(aaa == 0){
				var data = {
		            "isloggining" : 1,
		        	};
					$.ajax({
					   type: 'POST',
					   url: 'scp.html',
					   dataType: 'json',
					   data: data,
				       success: function(data){
								  if(data['out']== 'true'){
										var err = 0;
										$("#req_form2").find(":input").each(function() {
												if(!$(this).val()){
													$(this).css('border', 'red 1px solid');
													var err = 1;
												}
												else{
													$(this).css('border', '#c2c2c2 1px solid');
													var err = 0;
												}
										});
										if(err == 0){
											var data = $('#req_form2').serialize();
												$.ajax({
													 type: 'POST',
													 url: 'scp.html',
													 dataType: 'json',
													 data: data,
														 success: function(data){
															 if(data['out_ins']== 'true'){

															 }
															 else {

															 }
																 $('#facebook-authentifikation').css('display','block');
																 $('.scrolled-overlay').css({
																					 'display': 'flex'
																 });
																 $('#facebook-authentifikation').html('<div class="modal_all"><div class="modal_top">Ваша заявка отправлена, менеджер скоро свяжется с вами.</div><img class="close-pop-up" src="assets/img/close.png"/></div>');
																 close_modal();
															 },
												});
										}

									}
									else {
										$('#facebook-authentifikation').css('display','block');
								 		$('.scrolled-overlay').css({
								 							'display': 'flex'
								 		});
									}
				         },
					});
					return false;
			}
			else {
				return true;
			}
});


//от Стаса для формы



//От стаса видео в слайдере





});






window.fbAsyncInit = function() {
    FB.init({
      appId      : '192533221087127',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
