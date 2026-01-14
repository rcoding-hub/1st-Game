// Canvas-Größe
const CANVAS_SIZE = 64;

// Setze das CSS-Grid dynamisch
document.getElementById("canvas").style.gridTemplateColumns = `repeat(${CANVAS_SIZE}, 20px)`;

// Verfügbare Farben
const COLORS = [
    "#FFFFFF", "#E4E4E4", "#888888", "#222222", "#FF0000", "#FF9E00",
    "#FFFF00", "#00FF00", "#0000FF", "#FF00FF", "#8B4513", "#FFC0CB",
    "#00FFFF", "#800080", "#A52A2A", "#008000"
];

// Aktuell ausgewählte Farbe
let selectedColor = "#0000FF";

// Farbrad-Elemente
const colorPicker = document.getElementById("color-picker");
const colorHexDisplay = document.getElementById("color-hex");

// Aktualisiere die ausgewählte Farbe und den Hex-Code
colorPicker.addEventListener("input", () => {
    selectedColor = colorPicker.value;
    colorHexDisplay.textContent = selectedColor.toUpperCase();
});

// Farbpalette erstellen
const colorPalette = document.getElementById("color-palette");
COLORS.forEach(color => {
    const colorOption = document.createElement("div");
    colorOption.className = "color-option";
    colorOption.style.backgroundColor = color;
    colorOption.addEventListener("click", () => {
        selectedColor = color;
        colorPicker.value = color;
        colorHexDisplay.textContent = color.toUpperCase();
        document.querySelectorAll(".color-option").forEach(el => {
            el.classList.remove("selected");
        });
        colorOption.classList.add("selected");
    });
    colorPalette.appendChild(colorOption);
});

// Canvas erstellen
const canvas = document.getElementById("canvas");
for (let i = 0; i < CANVAS_SIZE * CANVAS_SIZE; i++) {
    const pixel = document.createElement("div");
    pixel.className = "pixel";
    pixel.style.backgroundColor = "#FFFFFF";
    pixel.addEventListener("click", () => {
        pixel.style.backgroundColor = selectedColor;
    });
    canvas.appendChild(pixel);
}

// Canvas im localStorage speichern
function saveCanvas() {
    const pixels = document.querySelectorAll(".pixel");
    const pixelData = Array.from(pixels).map(pixel => pixel.style.backgroundColor);
    localStorage.setItem("miniPlaceCanvas", JSON.stringify(pixelData));
}

// Canvas aus localStorage laden
function loadCanvas() {
    const savedData = localStorage.getItem("miniPlaceCanvas");
    if (savedData) {
        const pixelData = JSON.parse(savedData);
        const pixels = document.querySelectorAll(".pixel");
        pixels.forEach((pixel, index) => {
            pixel.style.backgroundColor = pixelData[index];
        });
    }
}

// Beispiel-Pixel-Art: Feep (vereinfacht)
function generateFeepPattern() {
    const pattern = [];
    for (let y = 0; y < CANVAS_SIZE; y++) {
        const row = [];
        for (let x = 0; x < CANVAS_SIZE; x++) {
            // Vereinfachte Logik: Grüner Kopf, brauner Ast, weißer Hintergrund
            if (y < 40 && x > 15 && x < 48 && y > 10) {
                // Kopf (grün)
                row.push("#7CFC00");
            } else if (y > 35 && y < 45 && x > 20 && x < 44) {
                // Ast (braun)
                row.push("#8B4513");
            } else if (y > 25 && y < 35 && x > 25 && x < 35) {
                // Augen (weiß)
                row.push("#FFFFFF");
            } else {
                // Hintergrund (lila)
                row.push("#9370DB");
            }
        }
        pattern.push(row);
    }
    return pattern;
}

// Funktion, um das Canvas mit einer Pixel-Art zu füllen
function preloadCanvasWithArt(pixelArtArray) {
    console.log("Fülle Canvas mit Pixel-Art..."); // Debugging
    const pixels = document.querySelectorAll(".pixel");
    if (pixels.length === 0) {
        console.error("Keine Pixel gefunden! Canvas wurde nicht erstellt.");
        return;
    }
    for (let y = 0; y < CANVAS_SIZE; y++) {
        for (let x = 0; x < CANVAS_SIZE; x++) {
            const index = y * CANVAS_SIZE + x;
            if (index < pixels.length) {
                pixels[index].style.backgroundColor = pixelArtArray[y][x];
            }
        }
    }
    saveCanvas();
}


// Canvas beim Laden der Seite wiederherstellen
window.addEventListener("load", loadCanvas);

pixel.addEventListener("click", () => {
    pixel.style.backgroundColor = selectedColor;
    saveCanvas(); // Speichern nach jeder Änderung
});

document.getElementById("preload-button")?.addEventListener("click", () => {
    console.log("Button wurde geklickt!"); // Debugging
    const pixelArt = generateFeepPattern();
    preloadCanvasWithArt(pixelArt);
});

