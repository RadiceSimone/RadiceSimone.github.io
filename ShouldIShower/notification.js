function startNotification() {
  if (Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        scheduleNotifications();
      }
    });
  } else {
    scheduleNotifications();
  }
}

function scheduleNotifications() {
  const orarioPianificato = parseOrarioInput("10:40");
  if (orarioPianificato) {
    setInterval(() => {
      const now = new Date();
      if (
        now.getHours() === orarioPianificato.getHours() &&
        now.getMinutes() === orarioPianificato.getMinutes()
      ) {
        sendNotification();
      }
    }, 60000); // Verifica ogni minuto
  } else {
    alert("Orario non valido. Inserisci l'orario nel formato HH:MM");
  }
}

function parseOrarioInput(input) {
  const [hours, minutes] = input.split(":").map(Number);
  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null;
  }
  const orarioPianificato = new Date();
  orarioPianificato.setHours(hours);
  orarioPianificato.setMinutes(minutes);
  return orarioPianificato;
}

function sendNotification() {
  const options = {
    body: "È ora di fare il test",
  };

  const notification = new Notification("Notifica dal Sito", options);

  notification.onclick = () => {
    window.open("https://radicesimone.github.io/ShouldIShower/index.html", "_blank");
  };
}
