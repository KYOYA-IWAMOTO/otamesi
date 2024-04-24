document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const storyText = document.getElementById('storyText');
    const romajiText = document.getElementById('romajiText');
    const typingArea = document.getElementById('typingArea');
    const charCountDisplay = document.getElementById('charCountDisplay');
    const timerDisplay = document.getElementById('timerDisplay');
    let totalCharactersTyped = 0;
    let timer;
    let timeLeft = 30;

    const storyParts = [
        // 物語の部分をここに挿入
        "むかしむかし、あるところに、おじいさんとおばあさんが住んでいました。",
        "おじいさんは山へしばかりに、おばあさんは川へせんたくに行きました。",
        "おばあさんが川でせんたくをしていると、ドンブラコ、ドンブラコと、大きな桃が流れてきました。",
        "「おや、これは良いおみやげになるわ」とおばあさんは大きな桃をひろいあげて、家に持ち帰りました。",
        "そして、おじいさんとおばあさんが桃を食べようと桃を切ってみると、なんと中から元気の良い男の赤ちゃんが飛び出してきました。",
        "「これはきっと、神さまがくださったにちがいない」と子どものいなかったおじいさんとおばあさんは、大喜びです。",
        "桃から生まれた男の子を、おじいさんとおばあさんは桃太郎と名付けました。",
        "桃太郎はスクスク育って、やがて強い男の子になりました。",
        "そしてある日、桃太郎が言いました。",
        "「ぼく、鬼ヶ島へ行って、わるい鬼を退治します」",
        "おばあさんにきび団子を作ってもらうと、鬼ヶ島へ出かけました。",
        "旅の途中で、イヌに出会いました。",
        "「桃太郎さん、どこへ行くのですか？」",
        "「鬼ヶ島へ、鬼退治に行くんだ」",
        "「それでは、お腰に付けたきび団子を１つ下さいな。おともしますよ」",
        "イヌはきび団子をもらい、桃太郎のおともになりました。",
        "そして、こんどはサルに出会いました。",
        "「桃太郎さん、どこへ行くのですか？」",
        "「鬼ヶ島へ、鬼退治に行くんだ」",
        "「それでは、お腰に付けたきび団子を１つ下さいな。おともしますよ」",
        "そしてこんどは、キジに出会いました。",
        "「桃太郎さん、どこへ行くのですか？」",
        "「鬼ヶ島へ、鬼退治に行くんだ」",
        "「それでは、お腰に付けたきび団子を１つ下さいな。おともしますよ」",
        "こうして、イヌ、サル、キジの仲間を手に入れた桃太郎は、ついに鬼ヶ島へやってきました。",
        "鬼ヶ島では、鬼たちが近くの村からぬすんだ宝物やごちそうをならべて、酒盛りの真っ最中です。",
        "「みんな、ぬかるなよ。それ、かかれ！」",
        "イヌは鬼のおしりにかみつき、サルは鬼のせなかをひっかき、キジはくちばしで鬼の目をつつきました。",
        "そして桃太郎も、刀をふり回して大あばれです。",
        "とうとう鬼の親分が、「まいったぁ、まいったぁ。こうさんだ、助けてくれぇ」と、手をついてあやまりました。",
        "桃太郎とイヌとサルとキジは、鬼から取り上げた宝物をくるまにつんで、元気よく家に帰りました。",
        "おじいさんとおばあさんは、桃太郎の無事な姿を見て大喜びです。",
        "そして三人は、宝物のおかげでしあわせにくらしましたとさ。おしまい。"
        // 他の物語パーツ...
    ];
    let currentPartIndex = 0;

    startButton.addEventListener('click', function() {
        storyText.style.display = "block";
        storyText.textContent = storyParts[currentPartIndex]; // 初期テキストの設定
        typingArea.disabled = false;
        typingArea.focus();
        startTimer();
        startButton.style.display = 'none'; // ゲーム開始後はボタンを非表示にする
    });

    function convertToRomaji() {
        const input = typingArea.value;
        romajiText.textContent = Wanakana.toRomaji(input);
        checkInput(input);
    }

    function checkInput(input) {
        const currentPart = storyParts[currentPartIndex];
        if (input === currentPart) {
            nextPart();
        } else if (currentPart.slice(0, input.length) !== input) {
            typingArea.className = 'incorrect';
        } else {
            typingArea.className = '';
        }
    }

    function nextPart() {
        if (currentPartIndex < storyParts.length - 1) {
            totalCharactersTyped += typingArea.value.length;
            currentPartIndex++;
            storyText.textContent = storyParts[currentPartIndex];
            typingArea.value = '';
            resetTimer();
        } else {
            finishGame();
        }
    }

    function startTimer() {
        timer = setInterval(function() {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 0) {
                nextPart();
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timer);
        timeLeft = 30;
        startTimer();
    }

    function updateTimerDisplay() {
        timerDisplay.textContent = `残り時間: ${timeLeft} 秒`;
    }

    function updateCharCountDisplay() {
        charCountDisplay.textContent = `合計入力文字数: ${totalCharactersTyped}`;
    }

    function finishGame() {
        clearInterval(timer);
        storyText.textContent = "物語の終わりです。お疲れ様でした！";
        typingArea.disabled = true;
        updateCharCountDisplay();
        startButton.textContent = 'もう一度始める';
        startButton.style.display = 'block';
        startButton.onclick = function() {
            currentPartIndex = 0;
            totalCharactersTyped = 0;
            timeLeft = 30;
            updateCharCountDisplay();
            updateTimerDisplay();
            this.click();
        };
    }

    updateCharCountDisplay(); // 初期表示更新
    typingArea.addEventListener('input', convertTo ,Romaji); // 入力時にローマ字変換を実行
});
