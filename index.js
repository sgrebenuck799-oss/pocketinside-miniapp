<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>POCKET INSIDER</title>

  <script src="https://telegram.org/js/telegram-web-app.js"></script>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      background: #0b0f19;
      color: white;
      font-family: Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .container {
      width: 100%;
      max-width: 500px;
      text-align: center;
    }

    h1 {
      margin-bottom: 10px;
    }

    p {
      color: #9ca3af;
      line-height: 1.5;
    }

    button {
      width: 100%;
      padding: 16px;
      margin-top: 20px;
      border: 0;
      border-radius: 12px;
      background: #229ed9;
      color: white;
      font-size: 17px;
      font-weight: bold;
      cursor: pointer;
    }

    #status {
      margin-top: 20px;
      color: #9ca3af;
    }
  </style>
</head>

<body>

  <div class="container">
    <h1>⚡ POCKET INSIDER</h1>

    <p>
      Аналітичний термінал для отримання торгових сигналів.
    </p>

    <button id="checkButton">
      🔐 ПЕРЕВІРИТИ ДОСТУП
    </button>

    <div id="status">
      Перевіряємо доступ...
    </div>
  </div>

  <script>
    const tg = window.Telegram.WebApp;

    tg.ready();
    tg.expand();

    const MINI_APP_URL =
  "https://tiny-wind-710a.sgrebenuck-799.workers.dev";


    const status = document.getElementById("status");
    const button = document.getElementById("checkButton");

    async function checkAccess() {

      const user = tg.initDataUnsafe?.user;

      if (!user) {
        status.textContent =
          "❌ Відкрий Mini App через Telegram.";
        return;
      }

      status.textContent =
        "⏳ Перевіряємо доступ...";

      try {

        const response = await fetch(
          `${API_URL}/api/check?telegram_id=${encodeURIComponent(user.id)}`
        );

        const data = await response.json();

        if (data.registered === true) {

          status.textContent =
            "✅ Доступ дозволено!";

          button.textContent =
            "🚀 ВІДКРИТИ ТЕРМІНАЛ";

          button.onclick = () => {
            status.textContent =
              "🚀 Термінал відкривається...";
          };

        } else {

          status.textContent =
            "🔒 Спочатку потрібно зареєструватися.";
        }

      } catch (error) {

        console.error(error);

        status.textContent =
          "❌ Помилка з'єднання з сервером.";
      }
    }

    button.onclick = checkAccess;

    checkAccess();
  </script>

</body>
</html>
