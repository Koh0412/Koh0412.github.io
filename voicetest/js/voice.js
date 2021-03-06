// this is test
(() => {
  'use strict';

  const speech = new webkitSpeechRecognition();
  speech.lang = 'ja-JP';

  const start_btn = document.getElementById('start_btn');
  const end_btn = document.getElementById('end_btn');
  const content = document.getElementById('content');

  let isClick = false;

  start_btn.addEventListener('click', () => {
    // 音声認識をスタート
    speech.start();
  });

  speech.onend = () => {
    if (isClick) {
      isClick = false;
    } else {
      speech.start();
    }
  };

  end_btn.onclick = () => {
    isClick = true;
    speech.abort();
    console.log('音声認識サービスを停止します');
  };

  //音声自動文字起こし機能
  speech.onresult = function (e) {
    // speech.stop();
    if (e.results[0].isFinal) {
      var autotext = e.results[0][0].transcript;
      content.innerHTML += '<p>' + autotext + '</p>';
    }
  };

})();