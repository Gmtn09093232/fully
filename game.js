const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe.user;

const userId = user.id;

function loadBalance() {
  fetch(`/balance?userId=${userId}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("balance").innerText =
        "Coins: " + data.balance;
    });
}

function play() {
  fetch("/play", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      userId: userId,
      cost: 10
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("Game started!");

      // simulate win
      setTimeout(() => {
        fetch("/win", {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({
            userId: userId,
            reward: 20
          })
        });

        alert("You won 20 coins!");
        loadBalance();

      }, 3000);

    } else {
      alert("Not enough coins");
    }
  });
}

loadBalance();