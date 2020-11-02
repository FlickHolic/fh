//Youtube API呼び出し
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

/*
//se init
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

let sampleSource;
// 再生中のときはtrue
let isPlaying = false;

// 音源を取得しAudioBuffer形式に変換して返す関数
async function setupSample() {
  const response = await fetch("click3.mp3");
  const arrayBuffer = await response.arrayBuffer();
  // Web Audio APIで使える形式に変換
  const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

// AudioBufferをctxに接続し再生する関数
function playSample(ctx, audioBuffer) {
  sampleSource = ctx.createBufferSource();
  // 変換されたバッファーを音源として設定
  sampleSource.buffer = audioBuffer;
  // 出力につなげる
  sampleSource.connect(ctx.destination);
  sampleSource.mute();
  sampleSource.unMute();
  sampleSource.start();
  isPlaying = true;
}

async function play_se_click(){
  // 再生中なら二重に再生されないようにする
  //if (isPlaying) return;
  const sample = await setupSample();
  playSample(ctx, sample);
};
*/



//window.AudioContext = window.AudioContext || window.webkitAudioContext;
//var context = new AudioContext();
//var request

/*
window.addEventListener('load', function() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  //context.createBufferSource();

  request = new XMLHttpRequest();
  request.open("GET", "click3.mp3", true);
  request.responseType = "arraybuffer";
  request.onload = completeOnLoad;
  request.send();
})
*/

window.addEventListener('load', function() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
})

function clickPlay(file) {

  request = new XMLHttpRequest();
  request.open("GET", file, true);
  request.responseType = "arraybuffer";
  request.onload = completeOnLoad;
  request.send();
  
};

function completeOnLoad() {
  
  source = context.createBufferSource();

  context.decodeAudioData(request.response, function (buf) {
    source.buffer = buf;
    source.loop = false;
    source.connect(context.destination);
    source.start();
  });

}


/*
(function(window){

  console.log("window")
  var wa = {

    context: null,
    _buffers: {},

    _initialize: function() {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
    },

    playSilent: function() {
      var context = this.context;
      var buf = context.createBuffer(1, 1, 22050);
      var src = context.createBufferSource();
      src.buffer = buf;
      src.connect(context.destination);
      src.start(0);
    },

    play: function(buffer) {
      // ファイル名で指定
      if (typeof buffer === "string") {
        buffer = this._buffers[buffer];
        if (!buffer) {
          console.error('ファイルが用意できてません!');
          return;
        }
      }

      var context = this.context;
      var source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(0);
    },

    loadFile: function(src, cb) {
      var self = this;
      var context = this.context;
      var xml = new XMLHttpRequest();
      xml.open('GET', src);
      xml.onreadystatechange = function() {
        if (xml.readyState === 4) {
          if ([200, 201, 0].indexOf(xml.status) !== -1) {

            var data = xml.response;

            // webaudio 用に変換
            context.decodeAudioData(data, function(buffer) {
              // buffer登録
              var s = src.split('/');
              var key = s[s.length-1];
              self._buffers[key] = buffer;

              // コールバック
              cb(buffer);
            });

          } else if (xml.status === 404) {
            // not found
            console.error("not found");
          } else {
            // サーバーエラー
            console.error("server error");
          }
        }
      };

      xml.responseType = 'arraybuffer';

      xml.send(null);
    },

  };

  wa._initialize(); // audioContextを新規作成

  window.wa = wa;

}(window));

window.onload = function() {
  // ページ読み込みと同時にロード
  console.log("onload")
  wa.loadFile("click3.mp3", function(buffer) {
    // ユーザーイベント
    var event = "click";
    document.addEventListener(event, function() {
      wa.play("click3.mp3");
    });
    console.log("addEventlistener")
  });
}
*/


//Android ChromeはaudioのcurrentTimeがおかしいのかsettimeoutがおかしいのか、両方がおかしいのか
//歌詞表示・判定部分を書き換えないといけない
//Android Friefoxは3分くらいでズレがでてくる→どこかでcurrentTimeを補正すると直る
//Androidはあきらめる

//タッチデバイスかどうか確認する
isTouch = ('ontouchstart' in window)

//スマートフォン以外の場合ボリュームボタンを表示する
$(document).ready(function(){
 var agent = navigator.userAgent;
 if(agent.search(/iPhone/) != -1){
 $('#volumebutton').css({display : 'none'});
 }else if(agent.search(/iPad/) != -1){
 $('#volumebutton').css({display : 'none'});
 }else if(agent.search(/Android/) != -1){
 $('#volumebutton').css({display : 'none'});
 }
});

$(function(){
  $("#volumeoff").on({ 'touchstart mousedown': function () { volumeoff() } })
  $("#volumedown").on({ 'touchstart mousedown': function () { volumedown()   } })
  $("#volumeup").on({ 'touchstart mousedown': function () { volumeup() } })
})

function volumeoff() {
  player.mute()
  player.setVolume(0)
}
function volumedown() {
  if (player.getVolume() > 0) {
    player.setVolume(player.getVolume() - 10)
  }
}
function volumeup() {
  if (player.getVolume() < 100) {
    player.unMute()
    player.setVolume(player.getVolume() + 10)
  }
}
//スマートフォン以外の場合ボリュームボタンを表示する

//onload時にアドレスバーを隠す
function autoscroll() {
  target=0
  window.scrollTo(0,target)
}

function loadls_rankscore() {
  var len=title.length
  for(var i=0;i<len;i++){
    tmp_title=title[i]
    if(localStorage.getItem('highrank'+tmp_title)!=null){
      $('#highrank'+tmp_title).text(localStorage.getItem('highrank'+tmp_title))
      $('#highscore'+tmp_title).text(localStorage.getItem('highscore'+tmp_title))
      if(localStorage.getItem('highrank'+tmp_title)=="S"){
        $('#star'+tmp_title).addClass("fa fa-trophy")
    }
    else if(localStorage.getItem('highrank'+tmp_title)=="C" || localStorage.getItem('highrank'+tmp_title)=="B" || localStorage.getItem('highrank'+tmp_title)=="A" || localStorage.getItem('highrank'+tmp_title)=="AA"){
      $('#star'+tmp_title).addClass("fa fa-star-o")
    }
    else if(localStorage.getItem('highrank'+tmp_title)=="AAA"){
      $('#star'+tmp_title).addClass("fa fa-star")
    }
  }
  }
}

//フリックキーボード用文字マップ
map={"a":"あいうえお",
     "k":"かきくけこ",
     "s":"さしすせそ",
     "t":"たちつてと",
     "n":"なにぬねの",
     "h":"はひふへほ",
     "m":"まみむめも",
     "y":"や無ゆ無よ",
     "r":"らりるれろ",
     "w":"わをんー無",
     "rhy_li":"♪無無無無"
     }

var starttime
var startDate

//フリック文字パネルを操作した時の処理
$(function(){
  $('#flickdiv').on({ 'touchstart': function (e) { e.preventDefault(); } })
  $('.pause').on({ 'touchstart mousedown': function () { stopcheck(); } })
  $('#ten').on({ 'touchstart mousedown': function () { consloe.log(player.getCurrentTime()); } })
  
  $('.button').on({'touchstart mousedown': function(e) {
    e.preventDefault();
    if(isTouch==true){startY=e.originalEvent.touches[ 0 ].pageY}
    else{startY=e.pageY}
    if(isTouch==true){startX=e.originalEvent.touches[ 0 ].pageX}
    else{startX=e.pageX}
    endY = startY
    endX = startX

    starttime=player.getCurrentTime()

    if($('input[name="mojiflag"]:checked').val()=="panel"){

      $(this).css({'background-color':'rgba(230, 230, 255, 0.9)'})
      leftButton = $(this).clone();
      leftButton.css({
        'background-color':'PaleGreen',
        'position':'absolute',
        'z-index': 10
      }).addClass("temp")
      var rightButton = leftButton.clone();
      var topButton = leftButton.clone();
      var bottomButton = leftButton.clone();
      if(map[$(this).attr("id")].charAt(1)!="無"){
      leftButton.css({
        'left': ($(this).offset().left-$(this).width()-10) + 'px',
        'top' : ($(this).offset().top-4) + 'px'
      }).text(map[$(this).attr("id")].charAt(1))
      $(this).append(leftButton)}

      if(map[$(this).attr("id")].charAt(2)!="無"){
      topButton.css({
        'left': ($(this).offset().left-4) + 'px',
        'top' : ($(this).offset().top-$(this).height()-10) + 'px'
      }).text(map[$(this).attr("id")].charAt(2))
      $(this).append(topButton)}

      if(map[$(this).attr("id")].charAt(3)!="無"){
      rightButton.css({
        'left' : ($(this).offset().left+$(this).width()+2) + 'px',
        'top' : ($(this).offset().top-4) + 'px'
      }).text(map[$(this).attr("id")].charAt(3))
      $(this).append(rightButton)}

      if(map[$(this).attr("id")].charAt(4)!="無"){
      bottomButton.css({
        'left': ($(this).offset().left-4) + 'px',
        'top' : ($(this).offset().top+$(this).height()+2) + 'px'
      }).text(map[$(this).attr("id")].charAt(4))
      $(this).append(bottomButton)}

    }

    startbutton=this

  }
  })

  $('.button').on({'touchmove mousemove': function(e) {
    e.preventDefault();
    endY = (isTouch ? e.originalEvent.touches[ 0 ].pageY : e.pageY)
    endX = (isTouch ? e.originalEvent.touches[ 0 ].pageX : e.pageX)
  }
  })

  //android firefoxはmouseupにも反応してイベントが二度起こる？
  $('body').on({'touchend mouseup': function(e) {
    //判定に使うcurrentTime
    judge_time=player.getCurrentTime()
    //デバッグ用 touchendしたcurrentTime
    if(startbutton!=""){
      if(endX<$(startbutton).offset().left || endX>$(startbutton).offset().left*1+$(startbutton).width() || endY<$(startbutton).offset().top || endY>$(startbutton).offset().top*1+$(startbutton).width()){
        kakudo=Math.atan2(startX-endX,startY-endY)/(Math.PI/180)
        if(map[$(startbutton).attr("id")].charAt(1)!="無"){
          if(kakudo>44 && kakudo<135){$("#aarea").text(map[$(startbutton).attr("id")].charAt(1))}
        }
        if(map[$(startbutton).attr("id")].charAt(2)!="無"){
          if(kakudo>-46 && kakudo<45){$("#aarea").text(map[$(startbutton).attr("id")].charAt(2))}
        }
        if(map[$(startbutton).attr("id")].charAt(3)!="無"){
          if(kakudo>-146 && kakudo<-45){$("#aarea").text(map[$(startbutton).attr("id")].charAt(3))}
        }
        if(map[$(startbutton).attr("id")].charAt(4)!="無"){
          if(kakudo>134 || kakudo<-145){$("#aarea").text(map[$(startbutton).attr("id")].charAt(4))}
        }
      }
      else{$("#aarea").text(map[$(startbutton).attr("id")].charAt(0))}
      if($("#aarea").text()===$("#narea").text().charAt(0)){
        /*
        const se_click = document.querySelector("#se_click");
        se_click.pause()
        se_click.currentTime = 0;
        se_click.play();
        */

       //play_se_click()
       clickPlay("click3.mp3")

        $("#narea").attr("style","").css({"border":"1px solid #ccc"}).text($("#narea").text().substr(1))
        $("#qarea").attr("style","")

        //エモーショナル点数
        //押したタイミングか、もしくは離したタイミングが指定の秒数以内ならGREAT
        if(Math.abs(kasi_s[kasi_now]-judge_time)<kasi_emotime || Math.abs(kasi_s[kasi_now]-starttime)<kasi_emotime){
          emo_ten=emo_ten+1
          combo_ten=combo_ten+1
          if(max_combo<combo_ten){max_combo=combo_ten}
          if(Math.abs(kasi_s[kasi_now]-judge_time)<kasi_emotime){
            $("#combo1").css("color","blue").text(Math.round((kasi_s[kasi_now]-judge_time)*1000)/1000)
          }
          else{$("#combo1").css("color","blue").text(Math.round((kasi_s[kasi_now]-starttime)*1000)/1000)}
          $("#narea").attr("style","")
          setTimeout(colortest12,0)
          $("#comboarea1").text("GREAT "+combo_ten).css("animation","")
          $("#comboarea1").css("color","blue")
          setTimeout(colortest13,0)
          if($('input[name="timingflag"]:checked').val()=="fix"){          
            if(Math.abs(Math.abs(kasi_s[kasi_now]-judge_time)-kasi_emotime)<Math.abs(Math.abs(kasi_s[kasi_now]-starttime)<kasi_emotime)){
              input_bar_time=judge_time
            }
            else{
              input_bar_time=starttime
            }
            mm=((input_bar_time-kasi[act_time_t][0])/kasi[act_time_t][3])*100

            $("#timing_bar"+timing_bar_num).css({"border-left":"5px solid blue","right":"5px"}).transition({
              y:"10px",
              duration:0.4*1000,
              easing:"linear"
            })
            timing_bar_num=timing_bar_num+1
            //入力タイミングでバーを生成するのではなく、タイミング表示バーを動かしてみる
            //$("#input_bar"+input_bar_num).css({"width":mm+"%","border-left":"5px solid blue","right":"5px"})
            if(input_bar_num>39){
              input_bar_num=0
            }
            else{
              input_bar_num=input_bar_num*1+1
            }
          }
        }
        else{
            //$("#combo1").css({"color":"gray","text-shadow":"0 0 1px #fff,0 0 2px #fff,0 0 3px #fff,0 0 4px #ccc,0 0 7px #ccc,0 0 8px #ccc,0 0 9px #ccc,0 0 10px #ccc"})
            //$("#combo1").text("BAD")
            //setTimeout(comboclear,500)
            //$("#combo1").css({"color":"pink","text-shadow":"0 0 1px #fff,0 0 2px #fff,0 0 3px #fff,0 0 4px #ff00de,0 0 7px #ff00de,0 0 8px #ff00de,0 0 9px #ff00de,0 0 10px #ff00de"})
          $("#combo1").css("color","black").text(Math.round((kasi_s[kasi_now]-judge_time)*1000)/1000)
          $("#narea").attr("style","")
          $("#comboarea1").text("GOOD").css({"color":"black"})
          setTimeout(colortest4,0)
          if($('input[name="timingflag"]:checked').val()=="fix"){
            if(Math.abs(Math.abs(kasi_s[kasi_now]-judge_time)-kasi_emotime)<Math.abs(Math.abs(kasi_s[kasi_now]-starttime)<kasi_emotime)){
              input_bar_time=judge_time}
            else{
              input_bar_time=starttime
            }
            mm=((input_bar_time-kasi[act_time_t][0])/kasi[act_time_t][3])*100

            //入力タイミングでバーを生成するのではなく、タイミング表示バーを動かしてみる
            //$("#input_bar"+input_bar_num).css({"width":mm+"%","border-left":"5px solid gray","right":"5px"})
            $("#timing_bar"+timing_bar_num).css({"border-left":"5px solid gray","right":"5px"})
            timing_bar_num=timing_bar_num+1
            if(input_bar_num>39){
              input_bar_num=0
            }
            else{
              input_bar_num=input_bar_num*1+1
            }
          }
        }

        kasi_now=kasi_now+1
        
        $("#ten").text($("#ten").text()*1+1)
        //スコアシステムが変わったらここも変えること！clearscore/maxscore
        $("#ten2").text("SCORE:"+(emo_ten*1+$("#ten").text()*1))
        //全部入力し終わったら
        if($("#narea").text()==""){
          $("#narea").attr("style","")
          setTimeout(colortest3,0)
        }
      }
      else if($("#narea").text()!=""){
        clickPlay("miss.mp3")
        $("#narea").attr("style","")
        combo_ten=0
        //$("#combo1").css({"color":"gray","text-shadow":"0 0 1px #fff,0 0 2px #fff,0 0 3px #fff,0 0 4px #ccc,0 0 7px #ccc,0 0 8px #ccc,0 0 9px #ccc,0 0 10px #ccc"})
        $("#comboarea1").removeClass
        $("#comboarea1").css({"color":"red"}).text("MISS")
        //$("#comboarea1").css({"color":"red"}).text("MISS (You flicked "+$("#aarea").text()+")")
        $("#combo1").text("")
        //setTimeout(comboclear,500)
        setTimeout(colortest2,0)
      }
      $("#aarea").text("空")
      //タイムカウント確認用$("#qarea").text(score[Math.round(test.currentTime)])
      $('.button').css({'background-color':'rgba(255, 255, 255, 0.9)'})
      $('.temp').remove();

      $("#"+kasi_demo[kasi_now]).css({'background-color':'rgba(190, 190, 255, 0.9)'})
      startbutton=""

  }
  //デバッグ用
    if($('#debug').is(':checked')){
      $("#result10").html($("#result10").html()+"<br>"+Math.round(judge_time*1000)/1000)//デバッグ用
    }
  }
  })
})

//タッチデバイスならマウスを無効にする（要Winタブ検討）
if(isTouch==true){$(".pause").off("mousedown").off("mouseup")}
if(isTouch==true){$(".button").off("mousedown").off("mouseup")}
if(isTouch==true){$("body").off("mousedown").off("mouseup")}

function timing(score_head){
  //android_delay=test.currentTime-kasi[score_head][0]
  if($("#qarea_next").text()!=kasi[score_head][1]){
    //漢字問題文を表示する
    $("#qarea_next").text(kasi[score_head][1])
  }
}

function timing_bar_start(score_head){
    //FIXならまず綺麗にする
  if($('input[name="timingflag"]:checked').val()=="fix"){
    $(".timing_bar").css({"width":"100%","border-left":""})
  }
  if(kasi[score_head][2]!=null){
    var len=kasi[score_head][2].length

    //ここから歌詞表示タイミングBAR
    if($('input[name="timingflag"]:checked').val()=="bar"){
      for(var i=0;i<len;i++){
        if(kasi_demo!="" && $('#autoplay').is(':checked') && kasi[score_head][1]!="end"){
          setTimeout(function(v){demo(v)},(kasi_s[mozi_time_now2]-player.getCurrentTime()-0.1)*1000,kasi_demo[mozi_time_now2])
        }
        if(mozi_time_num2>80){mozi_time_num2=0}
        //本当はkasi_emotimeを引いた時間からsetTimeoutを実行するのがいいんだけど曲によってはズレが大きいので一律で0.2にしておく
          if(i==0){setTimeout(function(x,y,z){colortest7_1(x,y,z)},(kasi_s[mozi_time_now2]-player.getCurrentTime()-timing_bar_time-0.1)*1000,timing_bar_time,mozi_time_num2,kasi_s[mozi_time_now2])}
          else{setTimeout(function(x,y,z){colortest7(x,y,z)},(kasi_s[mozi_time_now2]-player.getCurrentTime()-timing_bar_time-0.1)*1000,timing_bar_time,mozi_time_num2,kasi_s[mozi_time_now2])}

          setTimeout(function(y){colortest8(y)},1,mozi_time_num2)
        mozi_time_num2=mozi_time_num2+1
        mozi_time_now2=mozi_time_now2+1
      }
    }
    //ここから歌詞表示タイミングスロット
    if($('input[name="timingflag"]:checked').val()=="slot"){
      for(var i=0;i<len;i++){
        if(kasi_demo!="" && $('#autoplay').is(':checked') && kasi[score_head][1]!="end"){
          setTimeout(function(v){demo(v)},(kasi_s[mozi_time_now2]-player.getCurrentTime()-0.1)*1000,kasi_demo[mozi_time_now2])
        }

        mozi_time_num=(i*1+1)%8
        setTimeout(function(x,y){colortest5(x,y)},(kasi_s[mozi_time_now2]-player.getCurrentTime()-0.1)*1000,timing_bar_time,mozi_time_num)
        setTimeout(function(y){colortest6(y)},(kasi_s[mozi_time_now2]-player.getCurrentTime()+kasi_emotime-0.1)*1000,mozi_time_num)
        mozi_time_num2=mozi_time_num2+1
        mozi_time_now2=mozi_time_now2+1
      }
    }
    //ここから歌詞表示タイミングFIX
    if($('input[name="timingflag"]:checked').val()=="fix"){
      
      $(".timing_bar").css({"transform":"none","transition":"none"})
      timing_bar_num=0
      for(var i=0;i<len;i++){
        if(kasi_demo!="" && $('#autoplay').is(':checked') && kasi[score_head][1]!="end"){
          setTimeout(function(v){demo(v)},(kasi_s[mozi_time_now2]-player.getCurrentTime()-0.1)*1000,kasi_demo[mozi_time_now2])
        }
        if(mozi_time_num2>80){mozi_time_num2=0}
        mm=((kasi_s[mozi_time_now2]-kasi[score_head][0])/kasi[score_head][3])*100
        if(i===0){$("#timing_bar"+i).css({"width":mm+"%","border-left":"5px solid black","right":"5px"})}
        else{$("#timing_bar"+i).css({"width":mm+"%","border-left":"5px solid green","right":"5px"})}
        mozi_time_num2=mozi_time_num2+1
        mozi_time_now2=mozi_time_now2+1
      }
    }
  }
}


function demo(v){
  var demoremovetimer
  clearTimeout(demoremovetimer)
  leftButton = $("#"+v).clone();

  $("#"+v).css({'background-color':'rgba(230, 230, 255, 0.9)'})
  leftButton.css({
    'background-color':'PaleGreen',
    'position':'absolute',
    'z-index': 10
  }).addClass("temp")
  var rightButton = leftButton.clone();
  var topButton = leftButton.clone();
  var bottomButton = leftButton.clone();
  if(map[$("#"+v).attr("id")].charAt(1)!="無"){
    leftButton.css({
      'left': ($("#"+v).offset().left-$("#"+v).width()-8) + 'px',
      'top' : ($("#"+v).offset().top-2) + 'px'
    }).text(map[$("#"+v).attr("id")].charAt(1))
    $("#"+v).append(leftButton)
  }

  if(map[$("#"+v).attr("id")].charAt(2)!="無"){
    topButton.css({
      'left': ($("#"+v).offset().left-2) + 'px',
      'top' : ($("#"+v).offset().top-$("#"+v).height()-8) + 'px'
    }).text(map[$("#"+v).attr("id")].charAt(2))
    $("#"+v).append(topButton)
  }

  if(map[$("#"+v).attr("id")].charAt(3)!="無"){
    rightButton.css({
      'left' : ($("#"+v).offset().left+$("#"+v).width()+4) + 'px',
      'top' : ($("#"+v).offset().top-2) + 'px'
    }).text(map[$("#"+v).attr("id")].charAt(3))
    $("#"+v).append(rightButton)
  }

  if(map[$("#"+v).attr("id")].charAt(4)!="無"){
    bottomButton.css({
      'left': ($("#"+v).offset().left-2) + 'px',
      'top' : ($("#"+v).offset().top+$("#"+v).height()+4) + 'px'
    }).text(map[$("#"+v).attr("id")].charAt(4))
    $("#"+v).append(bottomButton)
  }

  $("#comboarea1").text("GREAT")
  $("#comboarea1").attr("style","").css("color","blue")
  setTimeout(colortest13,0)
  demoremovetimer=setTimeout(function(v){demoremove(v)},150,v)
}

function demoremove(v) {
  $('#'+v+'.temp').remove()
  $('#'+v).css({'background-color':'rgba(255, 255, 255, 0.9)'})
}

function timing_n_before(score_head){
  
  if(player.getCurrentTime()>kasi[score_head][0] || Math.abs(player.getCurrentTime()-kasi[score_head][0])>1){
    timing_n(score_head)
  }
  else{setTimeout(timing_n,(kasi[act_time_n][0]-player.getCurrentTime())*1000,act_time_n)}
}

function timing_n(score_head){
  //ひらがな歌詞表示タイミングのデバッグ
  
  //fix用のinput_barの対象歌詞番号を更新する（入力可能になったタイミングでinput_barを残せる代わりに歌詞の終わり際のinput_barが消える）
  act_time_t = score_head

  kasi_emotime=kasi[score_head][4]

  if(kasi[score_head][1].charAt(0)=="♪"){
    $("#flicktable_str").hide()
    $("#flicktable_rhy").show()
    $("#w").hide()
    $("#w2").show()
  }
  else{
    $("#flicktable_str").show()
    $("#flicktable_rhy").hide()
    $("#w").show()
    $("#w2").hide()
  }    
  if(kasi[score_head][1].charAt(0)!="("){
    $("#qarea").text(kasi[score_head][1])
  }
  if(kasi[score_head][3]!=0){
    setTimeout(function(){colortest(kasi[score_head][3],kasi[score_head][0],score_head)},0)

    if($('input[name="timingflag"]:checked').val()=="fix"){
      setTimeout(function(){fixbar_anime(kasi[score_head][3],kasi[score_head][0],score_head)},0)
    }
  }
  //入力ひらがな問題文を表示する（×1）（undefinedだから実行されてないだけ？）
  $("#narea").text(kasi[score_head][2])

  //点数表示
  if(kasi[score_head][1]!="end"){
    if(kasi[score_head][1].charAt(0)!="("){
      $("#max_ten").text($("#max_ten").text()*1+kasi[score_head][2].length)
      //デバッグ！
      $("#comboarea1").text("")
      $("#combo1").text("")
      //今打つべき歌詞文字数をkasi_nowグローバル変数で保持
      kasi_now=$("#max_ten").text()-kasi[score_head][2].length
      $('.button').css({'background-color':'rgba(255, 255, 255, 0.9)'})
      $("#"+kasi_demo[kasi_now]).css({'background-color':'rgba(190, 190, 255, 0.9)'})
    }
  }
  else{stageclear()}
  //生ひらがな文を更新しておく
  $("#raw_narea").text(kasi[score_head][2])
}

function comboclear() {
  //$("#combo1").text("")
}

function start() {

}

function stopcheck() {

  if($("#pause").attr("class") == "fa fa-redo"){
    $("#pause").attr("class","fa fa-pause")
    player_play()
    return
  }
  if($("#pause").text()=="ok?"){
    if(player.getPlayerState() == 1){
      player.seekTo(0,true)
    }
    player.pauseVideo()
    stoptext()
    stageclear()
  }
  else if($("#pause").text()==""){
    $("#pause").attr("class","").text("ok?")
    setTimeout(stoptext,1500)
  }
}

function stoptext() {
  $("#pause").text("").attr("class","fa fa-pause")
}

function shortcut_bar_anime() {
  $("#qbar").css({"transform":"none","transition":"none"})
  
  player.seekTo(kasi["0"][5],true)
  n=kasi["0"][5]
  $("#qbar").transition({
    scale:[0,1],
    duration:n*1000,
    easing:"linear"
  })
}

function colortest(n,m,p) {
  $("#qbar").css({"transform":"none","transition":"none"})

  if($('#shortcut').is(':checked') && kasi[p][5] != void 0){
    return
  }
  else{
    n=n-(player.getCurrentTime()-m)
  }
  $("#qbar").transition({
    scale:[0,1],
    duration:n*1000,
    easing:"linear"
  })
}

function fixbar_anime(n,m,p) {
  $("#fixbar").css({"transform":"none","transition":"none"})
  //if($('#shortcut').is(':checked') && Object.keys(kasi[p]).length>5){
  if($('#shortcut').is(':checked') && kasi[p][5] != void 0){
    return
  }
  n=n-(player.getCurrentTime()-m)
  $("#fixbar").transition({
    x:"-100%",
    duration:n*1000,
    easing:"linear"
  })
  //console.log(player.getCurrentTime())
}

function colortest2() {
  $("#narea").css({
    "border":"1px solid red",
    "-moz-animation":"anime2 0.2s linear",
    "-webkit-animation":"anime2 0.2s linear",
    "animation":"anime2 0.2s linear"
  })
}

function colortest3() {
  $("#narea").css({
    "-moz-animation":"anime3 0.2s linear",
    "-webkit-animation":"anime3 0.2s linear",
    "animation":"anime3 0.2s linear"
  })
}

function colortest4() {
  $("#narea").css({
    "-moz-animation":"anime4 0.2s linear",
    "-webkit-animation":"anime4 0.2s linear",
    "animation":"anime4 0.2s linear"
  })
}

function colortest5(n,m) {
  $("#mozi_time"+m).css({
    "-moz-animation":"anime5 "+0.2+"s linear",
    "-webkit-animation":"anime5 "+0.2+"s linear",
    "animation":"anime5 "+0.2+"s linear"
  })
}

function colortest6(m) {
  $("#mozi_time"+m).attr("style","height:5px")
}

function colortest7(n,m,l) {
  var bartime=l-player.getCurrentTime()
  $("#timing_bar"+m).css({
    "-moz-animation":"timing1 "+bartime+"s linear",
    "-webkit-animation":"timing1 "+bartime+"s linear",
    "animation":"timing1 "+bartime+"s linear"
  })
}

function colortest7_1(n,m,l) {
  var bartime=l-player.getCurrentTime()
  $("#timing_bar"+m).css({
    "-moz-animation":"timing1_1 "+bartime+"s linear",
    "-webkit-animation":"timing1_1 "+bartime+"s linear",
    "animation":"timing1_1 "+bartime+"s linear"
  })
}

function colortest8(m) {
  $("#timing_bar"+m).css("-webkit-animation","none")
  $("#timing_bar"+m).css("-moz-animation","none")
  $("#timing_bar"+m).css("animation","none")
}

function colortest12() {
  $("#narea").css({
    "-moz-animation":"anime12 0.2s linear",
    "-webkit-animation":"anime12 0.2s linear",
    "animation":"anime12 0.2s linear"
  })
}

function colortest13() {

  $("#comboarea1").css({
  "-moz-animation":"anime13 0.1s linear",
  "-webkit-animation":"anime13 0.1s linear",
  "animation":"anime13 0.1s linear"
  })
}

function changetab(num) {
  $(".content").addClass('disnon');
  $(".content").eq(num).removeClass('disnon');
  $("#tab li").removeClass('select');
  $(".menubutton").eq(num).addClass('select')

  $("#qarea").text("")
  $("#qarea_next").text("")
  $("#narea").text("")
  $("#raw_narea").text("")
  $("#ten").text(0)
  $("#max_ten").text(0)
  $("#pause").attr("class","fa fa-pause")
  if(player.getCurrentTime()!=0 && test!=""){
    player.pauseVideo()
    //player.getCurrentTime()=0
    player.seekTo(0,true)
  }
  autoscroll()
}

function topchangetab() {
  if($(".menubutton").eq(0).hasClass('select')){
    changetab(2)
  } 
}

$(function() {
  $("#tab li").click(function() {
    var num = $("#tab li").index(this);
    $(".content").addClass('disnon');
    $(".content").eq(num).removeClass('disnon');
    $("#tab li").removeClass('select');
    $(this).addClass('select')

    $("#qarea").text("")
    $("#qarea_next").text("")
    $("#narea").text("")
    $("#raw_narea").text("")
    $("#ten").text(0)
    $("#max_ten").text(0)
    $("#pause").attr("class","fa fa-pause")

    autoscroll()
  });
});


function stageclear() {

  var num = 3;
    $(".content").addClass('disnon');
    $(".content").eq(num).removeClass('disnon');
    $("#tab li").removeClass('select');
    $("#tab li").eq(num).addClass('select')
  $("#backimg").css("background-image","")
  $('#backimg').css("height","0%")
  autoscroll()

  //点数計算
  //スコアシステム
  clearscore=emo_ten*1+$("#ten").text()*1
  maxscore=kasi_s.length*2


  if($('#autoplay').is(':checked')==true){$("#result1").text("AUTOPLAY END")}
  else if(clearscore/maxscore>$("#highscore"+playing).text()*1){}
  else if(clearscore/maxscore<2/9){$("#result1").text("Stage failure..."),$("#result2").text("Rank F")}
  else if(clearscore/maxscore<3/9){$("#result1").text("Stage failure..."),$("#result2").text("Rank E")}
  else if(clearscore/maxscore<4/9){$("#result1").text("Stage failure..."),$("#result2").text("Rank D")}
  else if(clearscore/maxscore<5/9){$("#result1").text("Stage Clear!"),$("#result2").text("Rank C")}
  else if(clearscore/maxscore<6/9){$("#result1").text("Stage Clear!"),$("#result2").text("Rank B")}
  else if(clearscore/maxscore<7/9){$("#result1").text("Stage Clear!"),$("#result2").text("Rank A")}
  else if(clearscore/maxscore<8/9){$("#result1").text("Stage Clear!"),$("#result2").text("Rank AA")}
  else if(clearscore/maxscore<1){$("#result1").text("Stage Clear!"),$("#result2").text("Rank AAA")}
  else if(emo_ten!=0 && clearscore/maxscore==1){$("#result1").text("Stage Clear!"),$("#result2").text("Rank S")}
  
  $("#result3").text("SCORE "+clearscore)
  $("#result5").text("MAX COMBO "+max_combo)

  if($("#highscore"+playing).text()=="-" || $("#highrank"+playing).text()==null || localStorage.getItem("highscore"+playing)<clearscore){

    $("#result4").text("HighScore!")
    localStorage.setItem("highrank"+playing, $("#result2").text().slice(5))
    localStorage.setItem("highscore"+playing, emo_ten*1+$("#ten").text()*1)
    $("#highrank"+playing).text($("#result2").text().slice(5))
    $("#highscore"+playing).text(clearscore)

    if($("#highscore"+playing).text()/maxscore<4/9){}
    else if($("#highscore"+playing).text()/maxscore<5/9){$("#star"+playing).addClass("fa fa-star-o")}
    else if($("#highscore"+playing).text()/maxscore<6/9){$("#star"+playing).addClass("fa fa-star-o")}
    else if($("#highscore"+playing).text()/maxscore<7/9){$("#star"+playing).addClass("fa fa-star-o")}
    else if($("#highscore"+playing).text()/maxscore<8/9){$("#star"+playing).addClass("fa fa-star-o")}
    else if($("#highscore"+playing).text()/maxscore<1){$("#star"+playing).removeClass().addClass("fa fa-star")}
    else if(emo_ten!=0 && $("#highscore"+playing).text()/maxscore==1){$("#star"+playing).removeClass().addClass("fa fa-trophy")}
  }
  
}

$(function(){
  $(window).bind("resize",function(){
    autoscroll()
});
})

function editstart() {
  var num = 4;
    $(".content").addClass('disnon');
    $(".content").eq(num).removeClass('disnon');
    $("#tab li").removeClass('select');
    $("#tab li").eq(num).addClass('select')
}

function editplay() {
  $("#edit source").remove()
  //sourceを動的に消してもAudioには影響がない　のでloadする
  edit.load()
  $("#edit").prepend('<source src="'+$("#editurl").val()+'">')
  $("#edit").prepend('<source src="'+$("#editurl").val()+'">')
  edit.play()
}

function editreset() {
  var edittime=new Array()
}

var edittime=new Array()
function editinput() {
  edittime.push(edit.currentTime)
  $("#edittime").html($("#edittime").html()+"<br>"+edit.currentTime)
}

function editcreate() {
  $("#editresult").html()
}


$(function () {
  if(window.applicationCache){

	applicationCache.addEventListener("checking",function (e){
		console.log("更新データが存在するかチェック中である");
	});

	applicationCache.addEventListener("downloading",function (e){
		console.log("更新を検出したので更新データをダウンロード中である");
	});

	applicationCache.addEventListener("progress",function (e){
		console.log("更新データのダウンロードの進捗状況 loaded:" + e.loaded + " total:" + e.total);
	});

	applicationCache.addEventListener("cached",function (e){
		console.log("リソースのキャッシュに成功した（初回のみ）");
	});

	applicationCache.addEventListener("noupdate",function (e){
		console.log("更新データが存在するかチェック後、更新データは見つからなかった");
	});

	applicationCache.addEventListener("updateready",function (e){
		console.log("更新データをダウンロード済みであり、キャッシュの更新が可能である");
	});

	applicationCache.addEventListener("error",function (e){
		console.log("エラーが発生した");
	});

	applicationCache.addEventListener("obsolete",function (e){
		console.log("マニフェストファイルへのアクセスに失敗したので、アプリケーションキャッシュを削除した");
	});

}
})

 
function checkcache() {
  // Check if a new cache is available on page load.
  window.addEventListener('load', function (e) {

    window.applicationCache.addEventListener('updateready', function (e) {
      if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
        // Browser downloaded a new app cache.
        // Swap it in and reload the page to get the new hotness.
        window.applicationCache.swapCache();
        if (confirm('新しいバージョンがあります。更新してください。')) {
          window.location.reload();
        }
      } else {
        // Manifest didn't changed. Nothing new to server.
      }
    }, false);

  }, false);
}




function onYouTubeIframeAPIReady(videoid) {
  if(videoid == void 0){
    return
  }
  player = new YT.Player('player', {
    playerVars: {
      'origin': location.protocol + '//' + location.hostname + "/",
      'playsinline': 1
      /*,
      'controls': 0,
      'disablekb': 1,
      'fs': 0,
      'modestbranding': 1
      */
    },
    height: Math.min(window.innerHeight - 410,$("#backimg").width()*0.5625),
    width: $("#backimg").width(),
    videoId: videoid,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
      'onError': onPlayerError
    }
  });
  console.log(location.protocol + location.hostname)
  console.log($("#player").width() + "," + $("#player").height())
  console.log("w iW" + window.innerWidth + ", w iH" + window.innerHeight)
}

function onPlayerError(event) {

  $("#flickcontents").hide()
}

function onPlayerReady(event) {
  player_play()

}

function player_play(){
  /*
  player.seekTo(0,true)
  player.mute()
  player.playVideo();
  player.unMute()
  */

  $.when(player.mute(),player.playVideo(),player.unMute()).done(function(){
    console.log(player.getPlayerState() + "player_play()")
  });


  //setTimeout( function() {playconfirm();}, 3000);
}

function playconfirm(){
  if(player.getPlayerState() != 1){
    ret = confirm("再読込");
    if (ret == true){
      //player.playVideo()
      //$('#hiddenplay').click()
      //$('#flicktable').append(('<div id="saiyomikomi" onclick="playyer_play()">再読込</div>'))
      if(player.getPlayerState() != 1){
        $("#pause").attr("class","fa fa-redo")
      }
    }
  }
}

function onPlayerStateChange(event) {
  console.log(player.getPlayerState())
  if (event.data == YT.PlayerState.PLAYING) {


    //var startTime = new Date().getTime();　//描画開始時刻を取得
    (function loop(){
        loop_playing = window.requestAnimationFrame(loop);

        /*
        //毎回のチェックになっちゃってるけど前奏飛ばしの設定があったら飛ばす
        if(kasi["0"] && $('#shortcut').is(':checked') && Object.keys(kasi["0"]).length>5){
          if(player.getCurrentTime()<kasi["0"][4]){
            shortcut_bar_anime()
            return
          }}
          */

        if (kasi[Math.round(player.getCurrentTime()) + timing_bar_time] && Math.round(player.getCurrentTime()) + timing_bar_time != kasi_s_count &&
            $('#shortcut').is(':checked') && kasi[String(Math.round(player.getCurrentTime()) + timing_bar_time)][5] != void 0) {
          
          kasi_s_count = Math.round(player.getCurrentTime()) + timing_bar_time
          act_time = kasi_s_count
          player.seekTo(kasi[act_time][5],true)          
          return
        }

        //各種タイミング表示関数を実行するsetTimeout
        if (kasi[Math.round(player.getCurrentTime()) + timing_bar_time] && Math.round(player.getCurrentTime()) + timing_bar_time != kasi_s_count &&
              $('input[name="timingflag"]:checked').val() != "none") {
          kasi_s_count = Math.round(player.getCurrentTime()) + timing_bar_time
          act_time = kasi_s_count
          setTimeout(timing_bar_start, (kasi[act_time][0] - timing_bar_time - player.getCurrentTime()) * 1000, act_time)
        }
        //次歌詞表示関数を実行するsetTimeout
        if (kasi[Math.round(player.getCurrentTime()) + 2] && Math.round(player.getCurrentTime()) + 2 != kasi_count) {
          kasi_count = Math.round(player.getCurrentTime()) + 2
          act_time = kasi_count
          setTimeout(timing, (kasi[act_time][0] - 2 - player.getCurrentTime()) * 1000, act_time)
        }
        //今歌詞と今ひらがな歌詞表示関数を実行するsettimeout
        if (kasi[Math.round(player.getCurrentTime())] && Math.round(player.getCurrentTime()) != kasi_n_count) {
            kasi_n_count = Math.round(player.getCurrentTime())
            act_time_n = kasi_n_count
            setTimeout(timing_n, (kasi[act_time_n][0] - player.getCurrentTime()) * 1000, act_time_n)
          //}
        }
    })();
  }
  else if (event.data == YT.PlayerState.ENDED || event.data == YT.PlayerState.PAUSED) {
    window.cancelAnimationFrame(loop_playing)
  }
}


function stopVideo() {
  player.stopVideo();
}


//STAGE SELECTをクリックしたら起動する
function musicstart(file,ls,videoid) {
  var num = 1;
    $(".content").addClass('disnon');
    $(".content").eq(num).removeClass('disnon');
    $("#tab li").removeClass('select');
    $("#tab li").eq(num).addClass('select')

    //$('#backimg').css("height","100%")
  

  
  eval("kasi=$.merge([], "+ls+")")
  eval("kasi_s="+ls+"_s")
  //eval("kasi_n="+ls+"_n")
  eval("kasi_demo="+ls+"_demo")

  kasi_now=0
  kasi_count=0
  kasi_s_count=0
  kasi_n_count=0
  emo_ten=0
  combo_ten=0
  max_combo=0
  playing=ls
  playagain1=file
  playagain2=ls
  playagain3 = videoid
  //mozi_time_now=0
  mozi_time_num2=0
  mozi_time_now2=0
  input_bar_num=0
  musicstarter="intro"
  //歌詞入力タイミングの秒速　/80の部分を調整する
  timing_bar_time=Math.min(Math.round($(window).width()/80),8,Math.floor(kasi_s[0])-2)
  if($('input[name="timingflag"]:checked').val()=="fix"){timing_bar_time=0}
  //$("#backimg").css({"background-image":"url("+file+".jpg)"})//背景画像邪魔ならコメントアウト
  //$('#backimg').css("height","100%")
  $("#qarea").text("")
  $("#qarea_next").text("読み込み中")
  $("#narea").text("")
  $("#raw_narea").text("")
  //$("#qbar").attr("style","")
  $("#qbar").remove()
  $("#qbar_cover").append('<div id="qbar"></div>')
  $("#qbar").css({"background-color":"green","height":"5px","transform-origin":"left"})
  $("#qarea").attr("style","")
  $("#narea").attr("style","")
  $("#ten").text(0)
  $("#max_ten").text(0)
  $("#pause").attr("class","fa fa-pause")
  $("#comboarea1").text("")
  $("#combo1").text("")
  $("#ten2").text("")
  $("#result4").html("")
  $("#result10").html("")
  $(".timing_bar").attr("style","")
  $(".button").css({'background-color':'rgba(255, 255, 255, 0.9)'})
  $("#"+kasi_demo[kasi_now]).css({'background-color':'rgba(190, 190, 255, 0.9)'})
  //$("#fixbar").attr("style","")
  //$("#fixbar").css("transform","none")
  $("#fixbar").remove()
  $("#fixbar_cover").append('<li id="fixbar"></li>')
  //$(".timing_bar").css("-moz-animation","none").css("-webkit-animation","none").css("animation","none")
  $('#timingstop').css("border-color","red")

  if($('input[name="mojiflag"]:checked').val()=="none"){
    $('#a').css("color","rgba(255,255,255,0)")
    $('#k').css("color","rgba(255,255,255,0)")
    $('#s').css("color","rgba(255,255,255,0)")
    $('#t').css("color","rgba(255,255,255,0)")
    $('#n').css("color","rgba(255,255,255,0)")
    $('#h').css("color","rgba(255,255,255,0)")
    $('#m').css("color","rgba(255,255,255,0)")
    $('#y').css("color","rgba(255,255,255,0)")
    $('#r').css("color","rgba(255,255,255,0)")
    $('#w').css("color","rgba(255,255,255,0)")
  }
  else{
    $('#a').css("color","")
    $('#k').css("color","")
    $('#s').css("color","")
    $('#t').css("color","")
    $('#n').css("color","")
    $('#h').css("color","")
    $('#m').css("color","")
    $('#y').css("color","")
    $('#r').css("color","")
    $('#w').css("color","")
  }
  if($('input[name="timingflag"]:checked').val()=="none"){
        $('#mozi_time').hide()
        $('#timingstop').hide()
        $('#fixbar').hide()
  }
  if($('input[name="timingflag"]:checked').val()=="slot"){
        $('#mozi_time').show()
        $('#timingstop').hide()
        $('#fixbar').hide()
  }
  if($('input[name="timingflag"]:checked').val()=="fix"){
        $('#mozi_time').hide()
        $('#timingstop').hide()
        $('#fixbar').show()
  }
  if($('input[name="timingflag"]:checked').val()=="bar"){
        $('#mozi_time').hide()
        $('#timingstop').show()
        $('#fixbar').hide()
  }

  start()
  target=$("#qarea_next").offset().top-2
  //window.scrollTo(0,target)
  /*
  if(player != void 0){
    player_play()
    return
  }
  */
 console.log(videoid)
  onYouTubeIframeAPIReady(videoid)
  console.log(window.outerWidth)
}