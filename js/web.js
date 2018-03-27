$(function() {
	$(".engine .icon").bind("click", function(e) {
		var target = $(e.target);
		if (target.closest("#search-more").length == 0) {
			$("#search-more").toggle()
		}
	});
	$("body").bind("click", function(e) {
		var target = $(e.target);
		if (target.closest(".engine .icon").length == 0) {
			$("#search-more").hide()
		}
	});
	$(".auth .user .operation .edit").click(function() {
		$(".auth .user .operation").hide();
		$("main .all  .box .row .row-a").css("margin", "5px 0");
		$("main .all  .box .row .row-a").attr("draggable", "true");
		$("main .all  .box .row .row-a .show-drag").show();
		$("main .all  .edit").show()
	});
	var category_del = "";
	$(".show-drag .am-icon-close").click(function() {
		var cid = $(this).attr('cid');
		category_del = category_del + "," + cid;
		$('.row[cid=' + cid + ']').remove();
	});
	$(".all .edit .y").click(function() {
		var category = '[';
		$('.box .row').each(function(i) {
			var cid = $(this).attr('cid');
			var order = i + 1;
			var str = '{"id":' + cid + ',"order":' + order + '},';
			category = category + str
		});
		category = category + ']';
		$.ajax({
			url : editURL,
			dataType : 'json',
			type : 'post',
			data : {
				'category' : category,
				'category_del' : category_del
			},
			headers : {
				'X-CSRF-TOKEN' : $('meta[name="_token"]').attr('content')
			},
			beforeSubmit : function(arr, $form, options) {
			},
			success : function(response) {
				if (response.success) {
					showMessage('success', response.message);/* setTimeout(function(){window.location.href=index},1000) */
				} else {
					showMessage('warning', response.message)
				}
			}
		})
	});
	$(".all .edit .n").click(function() {
		window.location.href = index
	});
	$("#search-more ul li")
			.click(
					function() {
						var search = $(this).attr('search');
						$(".engine .icon").css(
								'background-image',
								"url('./assets/images/search/" + search
										+ ".png')");
						switch (search) {
						case 'baidu':
							$(".engine form").attr('action',
									'https://www.baidu.com/s');
							$(".engine form input").attr('name', 'wd');
							break;
						case 'google':
							$(".engine form").attr('action',
									'https://www.google.com/search');
							$(".engine form input").attr('name', 'q');
							break;
						case 'bing':
							$(".engine form").attr('action',
									'https://cn.bing.com/search');
							$(".engine form input").attr('name', 'q');
							break;
						case 'pansou':
							$(".engine form").attr('action',
									'http://pansou.com');
							$(".engine form input").attr('name', 'q');
							break;
						case 'soogif':
							$(".engine form").attr('action',
									'http://www.soogif.com/search');
							$(".engine form input").attr('name', 'q');
							break;
						case 'dianyingtiantang':
							$(".engine form").attr('method', 'post');
							$(".engine form").attr('action',
									'http://www.dy2018.com/e/search/index.php');
							$(".engine form input").attr('name', 'keyboard');
							break;
						default:
							$(".engine form").attr('action',
									'https://www.baidu.com/s');
							$(".engine form input").attr('name', 'wd')
						}
						$("#search-more").hide()
					});
	$(".row .more")
			.click(
					function() {
						$(this).next().slideToggle('fast');
						$(this).parent().siblings().find('.moresite').slideUp(
								'fast');
						$(this).parent().siblings().find('.more').attr(
								'isopen', '0');
						var html = '<a href="javascript:;">更多 <span class="am-icon-angle-down am-icon-sm"></a>';
						$(this).parent().siblings().find('.more').html(html);
						var open = $(this).attr('isopen');
						if (open == 0) {
							$(this).attr('isopen', '1');
							var html = '<a href="javascript:;">收起 <span class="am-icon-angle-up am-icon-sm"></a>';
							$(this).html(html)
						} else {
							$(this).attr('isopen', '0');
							var html = '<a href="javascript:;">更多 <span class="am-icon-angle-down am-icon-sm"></a>';
							$(this).html(html)
						}
					});
	$(".auth .user").bind("click", function(e) {
		var target = $(e.target);
		if (target.closest(".auth .user .operation").length == 0) {
			$(".auth .user .operation").toggle()
		}
	});
	$("body").bind("click", function(e) {
		var target = $(e.target);
		if (target.closest(".auth .user").length == 0) {
			$(".auth .user .operation").hide()
		}
	});
	$(".am-tabs-nav .register").click(function() {
		$("#modal-login").css('height', '570px')
	});
	$(".am-tabs-nav .login").click(function() {
		$("#modal-login").css('height', '335px')
	});
	$('#tab-login form')
			.ajaxForm(
					{
						dataType : 'json',
						type : 'post',
						beforeSubmit : function(arr, $form, options) {
							var email = $("#tab-login .email").val();
							var password = $("#tab-login .password").val();
							var check = true;
							var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
							if (!emailReg.test(email)) {
								$(".tishi-login-email").text("* 请输入正确的邮箱");
								check = check && false
							} else {
								$(".tishi-login-email").text(" ");
								check = check && true
							}
							if (password.length < 6 || password.length > 16) {
								$(".tishi-login-password").text("* 请输入正确的密码");
								check = check && false
							} else {
								$(".tishi-login-password").text(" ");
								check = check && true
							}
							return check
						},
						success : function(response) {
							if (response.success) {
								window.location.reload()
							} else {
								showMessage('warning', response.message)
							}
						}
					});
	$('#tab-register form')
			.ajaxForm(
					{
						dataType : 'json',
						type : 'post',
						beforeSubmit : function(arr, $form, options) {
							var name = $("#tab-register .name").val();
							var email = $("#tab-register .email").val();
							var password = $("#tab-register .password").val();
							var repassword = $("#tab-register .repassword")
									.val();
							var captcha = $("#tab-register .captcha").val();
							var check = true;
							if (name.length < 4 || name.length > 10) {
								$(".tishi-name").text("* 昵称长度为4-10字符");
								check = check && false
							} else {
								$(".tishi-name").text(" ");
								check = check && true
							}
							var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
							if (!emailReg.test(email)) {
								$(".tishi-email").text("* 请输入正确的邮箱");
								check = check && false
							} else {
								$(".tishi-email").text(" ");
								check = check && true
							}
							if (password.length < 6 || password.length > 16) {
								$(".tishi-password").text("* 密码长度为6-16字符");
								check = check && false
							} else {
								$(".tishi-password").text(" ");
								check = check && true
							}
							if (password != repassword) {
								$(".tishi-repassword").text("* 与原密码不相同");
								check = check && false
							} else {
								$(".tishi-repassword").text(" ");
								check = check && true
							}
							if (captcha.length != 5) {
								$(".tishi-captcha").text("* 请输入正确的验证码");
								check = check && false
							} else {
								$(".tishi-captcha").text(" ");
								check = check && true
							}
							return check
						},
						success : function(response) {
							if (response.success) {
								showMessage('success', response.message);
								setTimeout(function() {
									$('.am-tabs-nav .login a').click();
									$('#tab-register form')[0].reset();
									$('.captcha-img').click()
								}, 1000)
							} else {
								showMessage('warning', response.message);
								$('.captcha-img').click()
							}
						}
					});
	$("#page-find .operation")
			.click(
					function() {
						var e = $(this);
						$
								.ajax({
									url : findPost,
									dataType : 'json',
									type : 'post',
									data : {
										'cid' : $(this).attr('cid'),
										'state' : $(this).attr('state')
									},
									headers : {
										'X-CSRF-TOKEN' : $(
												'meta[name="_token"]').attr(
												'content')
									},
									beforeSubmit : function(arr, $form, options) {
									},
									success : function(response) {
										if (response.success) {
											if (e.attr('state') == 0) {
												e.attr('state', '1');
												e
														.html('<i class="am-icon-heart am-icon-fw"></i> 已添加到主页');
												e
														.parent()
														.parent()
														.find('.cover .title i')
														.attr('class',
																'am-icon-heart am-icon-fw')
											} else {
												e.attr('state', '0');
												e
														.html('<i class="am-icon-heart-o am-icon-fw"></i> 未添加到主页');
												e
														.parent()
														.parent()
														.find('.cover .title i')
														.attr('class',
																'am-icon-heart-o am-icon-fw')
											}
										} else {
										}
									}
								})
					});
	function showMessage(type, text) {
		var div = ".am-message-" + type;
		$(div + " .text").text(text);
		$(div).animate({
			top : "12px"
		}, 'fast');
		setTimeout(function() {
			$(div).animate({
				top : "-50px"
			}, 'fast')
		}, 3000)
	}
});