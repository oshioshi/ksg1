enchant();
window.onload = function() {
 var game = new Game(320,480); //ゲーム準備、表示領域
 var scale_h = window.innerHeight/480;
 var scale_w = window.innerWidth/320;
 if(scale_h >= scale_w){
  game.scale = scale_w
 }
 else{
 	 game.scale = scale_h
 }

 game.preload('./img/003.png'); //ゲームに用いるリソース（画像）読み込み
 game.fps = 30;
 game.onload = function() {

 //タイトル画面

 var createTitleScene = function() {
	var scene = new Scene();
	var label = new Label('タッチでスタート');

	label.textAlign = 'center';
	label.y = 220;
	label.font = '28px sans-serif';

	scene.addChild(label);
	scene.backgroundColor = 'rgba(230,250,230,1)';
	scene.addEventListener(Event.TOUCH_START,function(e){
	
	 game.replaceScene(createGameScene());
	});
	return scene;
  };

//ゲーム画面

  var createGameScene = function() {
	var scene = new Scene();
	scene.backgroundColor = '#8fd3ef';

	var time = 450
	var score = 0;

	var label = new Label('スコア：'+score);
	label.font = '14px sans-serif';
	scene.addChild(label);

	var sec = Math.round(time/30);
	var timelimit = new Label('残り時間:'+sec);
	timelimit.font = '14px sans-serif';
	timelimit.y = 20;
	scene.addChild(timelimit);

	//タッチする対象物生成
	var player = new Sprite(295, 299);
	player.image = game.assets['./img/003.png'];
	player.x = Math.random()*200;
	player.y = Math.random()*300;
	scene.addChild(player);
	var speed = Math.random()*20-10;
	var speed2 = Math.random()*20-10;

	if (speed > 0){
		player.scaleX = -0.4;
	} else {
		player.scaleX = 0.4;
	}
		player.scaleY= 0.4;

	//毎フレームイベント
	scene.addEventListener(Event.ENTER_FRAME, function() {
	    time --;
		var sec = Math.round(time/30);
		timelimit.text = '残り時間：'+sec;

		if (time <= 0){
			game.replaceScene(createGameoverScene(score));
		}

		player.x +=speed;
		player.y +=speed2;
		
		player.frame +=0.5

		if(player.x >320){
			player.x = -190
		}else if(player.x < -190){
			player.x = 320;
		}

		if(player.y >480){
			player.y = -190
		}else if(player.y < -190){
			player.y = 480;
		}

	});

	
	player.addEventListener(Event.TOUCH_START, function(e) {
		
		score ++;
		label.text = 'スコア：'+score;
		
		player.x = Math.random()*200;
		player.y = Math.random()*300;
		speed = Math.random()*20-10;
		speed2 = Math.random()*20-10;
		if (speed > 0){
			player.scaleX = -0.4;
		} else {
			player.scaleX = 0.4;
		}

		if(player.y >480){
			player.y = -190
		}else if(player.y < -190){
			player.y = 480;
		}

			player.scaleY= 0.4;
	});
	return scene;
	};

//終了画面
var createGameoverScene = function(resultscore) {
	var scene = new Scene();
	scene.backgroundColor = '#000';

	var label = new Label(resultscore+'匹つぶした！');
	label.textAlign = 'center';
	label.color = '#fff';
	label.y = 220;
	label.font = '40px sans-serif';
	scene.addChild(label);

	var retry = new Label('リトライ');
	retry.color = '#fff';
	retry.x = 0;
	retry.y = 30;
	retry.font = '20px sans-serif';
	scene.addChild(retry);

	retry.addEventListener(Event.TOUCH_START, function(e) {
		game.replaceScene(createTitleScene());
	});
	return scene;

	};
  game.replaceScene(createTitleScene());
 }
 game.start(); //ゲーム開始
};