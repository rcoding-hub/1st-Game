// Ergebnis-Element
const ergebnis = document.getElementById("ergebnis");

// Array mit den möglichen Optionen
const optionen = ["Schere", "Stein", "Papier"];

// Alle Buttons auswählen
const buttons = document.querySelectorAll(".wahl");

// Eventlistener für jeden Button
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const spieler = button.getAttribute("data-wahl");
        const computer = optionen[Math.floor(Math.random() * optionen.length)];

        let text = `Du: ${spieler} - Computer: ${computer} → `;

        // Spielregeln
        if (spieler === computer) {
            text += "Unentschieden!";
        } else if (
            (spieler === "Schere" && computer === "Papier") ||
            (spieler === "Stein" && computer === "Schere") ||
            (spieler === "Papier" && computer === "Stein")
        ) {
            text += "Du gewinnst! 🎉";
        } else {
            text += "Computer gewinnt! 💻";
        }

        ergebnis.textContent = text;
    });
});
