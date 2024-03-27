const colorPicker = document.getElementById('colorPicker');
const button = document.getElementById('toggleButton');
const brightnessSlider = document.getElementById('BrightnessSlider');
const temperatureSlider = document.getElementById('TemperatureSlider');

function toggle() {
    fetch("https://6155-37-204-52-76.ngrok-free.app/toggle", {
        method: 'POST'
    });
}

let currentColor = colorPicker.value;
let currentBrightness = brightnessSlider.value;
let currentTemperature = temperatureSlider.value;

function setColor() {
    const selectedColorHex = colorPicker.value;
    const color = tinycolor(selectedColorHex);
    const hsv = color.toHsv();
    console.log(hsv);
    
    fetch('https://6155-37-204-52-76.ngrok-free.app/set-color', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            hue: hsv.h,
            saturation: hsv.s * 100,
            value: hsv.v * 100
        })
    });
}

function setBrightness() {
    const selectedBrightness = brightnessSlider.value;
    console.log("Текущее значение ползунка:", selectedBrightness);
    
    fetch('https://6155-37-204-52-76.ngrok-free.app/set-brightness', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            brightness: selectedBrightness
        })
    });
}

function setTemperature() {
    const selectedTemperature = temperatureSlider.value;
    console.log("Текущее значение ползунка:", selectedTemperature);
    
    fetch('https://6155-37-204-52-76.ngrok-free.app/set-temperature', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            temperature: selectedTemperature
        })
    });
}

setBrightness(); // Вызываем функцию setBrightness для установки обработчика события input на ползунок яркости
setTemperature();

setInterval(() => {
    if (colorPicker.value !== currentColor) {
        currentColor = colorPicker.value;
        setColor();
    }
    if (brightnessSlider.value !== currentBrightness) {
        currentBrightness = brightnessSlider.value;
        setBrightness();
    }
    if (temperatureSlider.value !== currentTemperature) {
        currentTemperature = temperatureSlider.value;
        setTemperature();
    }
}, 500);
