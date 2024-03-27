const colorPicker = document.getElementById('colorPicker');

function toggle() {
    button.addEventListener("click", function() {
        fetch("https://6155-37-204-52-76.ngrok-free.app/toggle");
      });
}

let currentColor = colorPicker.value

function setColor() {
    const selectedColorHex = colorPicker.value;
    const color = tinycolor(selectedColorHex)
    const hsv = color.toHsv()
    console.log(hsv)
    
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
    })
}

setInterval(() => {
    if(colorPicker.value !== currentColor) {
        currentColor = colorPicker.value
        setColor()
    }
}, 500)
