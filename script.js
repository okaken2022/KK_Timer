// タイマーの設定
let countdown;
let remainingTime = 0; // カウントダウンする残り秒数
let repeatCount = 0;
let initialRepeatCount = 0; // 初期繰り返し回数を保持

const countdownDisplay = document.getElementById('countdownDisplay');
const repeatCountDisplay = document.getElementById('repeatCount');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const minutesSelect = document.getElementById('minutesSelect');
const secondsSelect = document.getElementById('secondsSelect');
const repeatSelect = document.getElementById('repeatSelect'); // 繰り返し回数を指定するセレクトボックスを追加

// 音の再生
function playSound() {
    const audio = new Audio('timer_sound.mp3'); // タイマー音のファイルパスを指定
    audio.play();
}

// タイマーの表示を更新
function updateCountdownDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    countdownDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// カウントダウン処理
function startCountdown() {
    countdown = setInterval(() => {
        if (remainingTime === 0) {
            if (repeatCount === 1) { // 1回にする場合、ここを1に変更
                clearInterval(countdown);
                playSound();
                repeatCountDisplay.textContent = '残り回数: 0';
                stopButton.click(); // カウントダウン終了時にストップボタンを自動的にクリック
            } else {
                repeatCount--;
                remainingTime = parseInt(minutesSelect.value) * 60 + parseInt(secondsSelect.value);
                updateCountdownDisplay(remainingTime);
                repeatCountDisplay.textContent = `残り回数: ${repeatCount}`;
                playSound();
            }
        } else {
            remainingTime--;
            updateCountdownDisplay(remainingTime);
        }
    }, 1000);
}

// スタートボタンのクリック処理
startButton.addEventListener('click', () => {
    if (!countdown && repeatSelect.value > 0) { // 0以下の繰り返し回数を無効にする
        initialRepeatCount = parseInt(repeatSelect.value);
        repeatCount = initialRepeatCount;
        remainingTime = parseInt(minutesSelect.value) * 60 + parseInt(secondsSelect.value);
        updateCountdownDisplay(remainingTime);
        repeatCountDisplay.textContent = `残り回数: ${repeatCount}`;
        startCountdown();
    }
});

// ストップボタンのクリック処理
stopButton.addEventListener('click', () => {
    if (countdown) {
        clearInterval(countdown);
        countdown = null;
        updateCountdownDisplay(remainingTime);
        repeatCount = initialRepeatCount;
        repeatCountDisplay.textContent = `残り回数: ${repeatCount}`;
    }
});
