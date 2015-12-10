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
	$('.close-pop-up,.close').click('click', function(){
			$('#facebook-authentifikation').css({
					'display': 'none',
			});
			$('.modal_block').css({
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
																 get_modal('Ваша заявка отправлена, менеджер скоро свяжется с вами.');
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


//Функция показа модального окна с ВАШИМ текстом
function get_modal(text){
	$('.modal_block').css('display','none');
	$('#facebook-authentifikation').css('display','block');
	$('.scrolled-overlay').css({
						'display': 'flex'
	});
	$('#facebook-authentifikation').html('<div class="modal_all"><div class="modal_top">'+text+'</div><img class="close-pop-up" src="assets/img/close.png"/></div>');
	close_modal();
}

//Функция открытия модального окна по типу помочь проекту
function get_modal_pr(title,text,type,appe){
	$('#facebook-authentifikation').css('display','none');
	$('.modal_block').css('display','block');
	$('.scrolled-overlay').css({
						'display': 'flex'
	});
	if(text){
		$('.help_pr').html(text);
	}
	if(title){
		$('.modal_block > .title').html(title);
	}
	if(type){
		$('.btn_block > a').attr('data-type',type)
	}
	if(appe){
		$('.modal_block').append(appe);
	}
}

//Голосовалка за проекты
$('.plus,.vote_bnt').click(function(e) {
	e.preventDefault();
	var percent = $('#canvas').attr('data-rating'),
	num = $('.num').text(),
	page_id = $("input[name='page_id']").val();
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
						get_vote_user();
					}
					else {
						$('#facebook-authentifikation').css('display','block');
							$('.scrolled-overlay').css({
				 							'display': 'flex'
							});
					}
         },
		});
});

//Функция проверки залогинен ли пользователь
function isloggining(func){
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
							func.call(this);
						}
						else {
							$('#facebook-authentifikation').css('display','block');
							$('.scrolled-overlay').css({
												'display': 'flex'
							});
						}
					},
		});
}

//При нажатии на помощь проекта
$('.help_progect_btn').click(function(e) {
	e.preventDefault();
	isloggining(function(){
		get_modal_pr('','','help_pr','');
	});
});
//Нажатие инвестировать
// $('.inv_btn').click(function(e) {
// 	e.preventDefault();
// 	isloggining(function(){
//
// 	});
// });

//Предложить новость
$('.news_add').click(function(e) {
	e.preventDefault();
	isloggining(function(){
		get_modal_pr('Предложить новость','','jude_add','');
	});
});

//Добавить событие
$('.addmeet').click(function(e) {
	e.preventDefault();
	isloggining(function(){
		var err = 0;
		var field = new Array("name", "date","text");
				$(".meets_my").find(":input").each(function() {
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
			var page_id = $("input[name='page_id']").val();
			if(!page_id){var page_id = 1;}
			var data = {
							"meet_add" : 1,
							"name" : $(".name_meet").val(),
							"data" : $(".data_meet").val(),
							"text" : $(".text_meet").val(),
						};
				$.ajax({
					 type: 'POST',
					 url: 'scp.html',
					 dataType: 'json',
					 data: data,
						 success: function(data){
							 get_modal('Ваша заявка отправлена, менеджер скоро свяжется с вами.');
							 },
				});
		}
	});
});

//Стать судьей
$('.jude_add').click(function(e) {
	e.preventDefault();
	isloggining(function(){
		get_modal_pr('Стать судьей','','jude_add','');
	});
});


//Отправка формы помощи проекту
$('.btn_block > a').click(function(e){
	e.preventDefault();
	var err = 0;
	var field = new Array("name", "mail","tel","text");
			$(".modal_block").find(":input").each(function() {
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
		var page_id = $("input[name='page_id']").val();
		if(!page_id){var page_id = 1;}
		var data = {
						"type" : $('.modal_block > .title').text(),
						"help_project" : page_id,
						"name" : $("input[name='name']").val(),
						"mail" : $("input[name='mail']").val(),
						"tel" : $("input[name='tel']").val(),
						"text" : $("textarea[name='text']").val(),
					};
			$.ajax({
				 type: 'POST',
				 url: 'scp.html',
				 dataType: 'json',
				 data: data,
					 success: function(data){
						 get_modal('Ваша заявка отправлена, менеджер скоро свяжется с вами.');
						 },
			});
	}
});

//функция проверки голосования пользователя
function get_vote_user(){
	var data ={
		"isvote" : $("input[name='page_id']").val(),
	};
		$.ajax({
			 type: 'POST',
			 url: 'scp.html',
			 dataType: 'json',
			 data: data,
				 success: function(data){
					 if(data['out'] == 'true'){
						 add_vote_user();
					 }
					 else {
						 get_modal('Извините, Вы уже голосовали.');
					 }
					 },
		});
}
//функция занесения голосования в базу, с внесением изменений в тв параметрах проекта
function add_vote_user() {
	var percent = $('#canvas').attr('data-rating'),
	num = $('.num').text(),
	page_id = $("input[name='page_id']").val(),
	data ={
		"addvote" : page_id,
		"percent" : percent,
		"num" : num,
	};
	$.ajax({
		type: 'POST',
		url: 'scp.html',
		dataType: 'json',
		data: data,
			success: function(data){
				 $('.plus').css('visibility','hidden');
				 $('#canvas').attr('data-rating',parseInt(percent)+11);
				 $('.num').text(parseInt(num)+11);
				 get_convas_pr();
			},
		});
}



//от Стаса для формы



//От стаса видео в слайдере





});

//Анимация коваса в проектах
function get_convas_pr() {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var rating = canvas.getAttribute("data-rating");
	var rating_cof = 360*rating / 100 - 90;
	canvas.style.width=180;
	canvas.style.height=180;
	canvas.width=180;
	canvas.height=180;
	var x = canvas.width / 2;
	var y = canvas.height / 2;
	var rat_x = 59.5*Math.cos(getRadians(rating_cof)) + x;
	var rat_y = 59.5*Math.sin(getRadians(rating_cof)) + y;
	var plus = document.querySelector('.plus');
	//console.log(rat_x - x,rat_y - y, rating_cof);
	plus.style.left = (rat_x - 12) + 'px';
	plus.style.top = (rat_y -41) + 'px';

	var counterClockwise = false;
	var run_black = function() {
		var radius = 59.5;
		var time = (new Date().getTime()- startTime)/ duration;
		var startAngle = getRadians(-90);
		var endAngle = getRadians(rating_cof);
		/*var x_n = endAngle.width;
		var y_n = endAngle.height;
		console.log(x_n,y_n);*/
		context.lineWidth = 4;
		context.strokeStyle = "rgb(255,199,18)";
		if(time < 1) {requestAnimationFrame(run_black);
				endAngle = startAngle +(endAngle - startAngle)* time;
		}
		else {
			document.querySelector('.plus').style.visibility='visible';
				duration = 1000,
				startTime = new Date().getTime();
		};
		context.clearRect(0, 0, 600, 300);
		context.beginPath();
		context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
		context.stroke();

	};
	var duration = 1500,
	startTime = new Date().getTime();
	run_black();
}
function get_convas_pr2(startAngle2) {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var rating = canvas.getAttribute("data-rating");
	var rating_cof = 360*rating / 100 - 90,
	start_new = 360*startAngle2 / 100 - 90;
	canvas.style.width=180;
	canvas.style.height=180;
	canvas.width=180;
	canvas.height=180;
	var x = canvas.width / 2;
	var y = canvas.height / 2;
	var rat_x = 59.5*Math.cos(getRadians(rating_cof)) + x;
	var rat_y = 59.5*Math.sin(getRadians(rating_cof)) + y;
	var plus = document.querySelector('.plus');
	//console.log(rat_x - x,rat_y - y, rating_cof);
	plus.style.left = (rat_x - 12) + 'px';
	plus.style.top = (rat_y -41) + 'px';

	var counterClockwise = false;
	var run_black = function() {
		var radius = 59.5;
		var time = (new Date().getTime()- startTime)/ duration;
		var startAngle = getRadians(start_new);
		var endAngle = getRadians(rating_cof);
		/*var x_n = endAngle.width;
		var y_n = endAngle.height;
		console.log(x_n,y_n);*/
		context.lineWidth = 4;
		context.strokeStyle = "rgb(255,199,18)";
		if(time < 1) {requestAnimationFrame(run_black);
				endAngle = startAngle +(endAngle - startAngle)* time;
		}
		else {
			document.querySelector('.plus').style.visibility='visible';
				duration = 1000,
				startTime = new Date().getTime();
		};
		context.clearRect(0, 0, 600, 300);
		context.beginPath();
		context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
		context.stroke();

	};
	var duration = 1500,
	startTime = new Date().getTime();
	run_black();
}

function getRadians(degrees) {
	return degrees * (Math.PI / 180);
}



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


  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-71258027-1', 'auto');
  ga('send', 'pageview');
