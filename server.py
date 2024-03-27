from flask import Flask, request, send_file, send_from_directory, abort
from miio import Device
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Включение CORS для всего приложения

device_ip = '192.168.2.9'
device_token = '53061a7d38870a8c6d6befa56b7e464a'
device_model = 'yeelink.light.color5'

device = Device(device_ip, device_token, model=device_model)

@app.route('/set-color', methods=['POST'])
def set_color():
    data = request.json
    if data:
        hue = data['hue']
        saturation = data['saturation']
        value = data['value']
        # Применяем цвет к лампе
        device.send('set_hsv', (hue, saturation, value))
        return 'Color set successfully'
    else:
        return 'No color data received'

@app.route('/set-brightness', methods=['POST'])
def set_brightness():
    data = request.json
    if data:
        brightness = int(data['brightness'])
        device.send('set_bright', [brightness])
        return 'brightness set successfully'
    else:
        return 'No brightness data received'

@app.route('/set-temperature', methods=['POST'])
def set_temperature():
    data = request.json
    if data:
        temperature = int(data['temperature'])
        device.send('set_ct_abx', [temperature])
        return 'temperature set successfully'
    else:
        return 'No temperature data received'

@app.route('/toggle', methods=['POST', 'GET'])
def toggle():
    device.send('toggle')
    return 'Device toggled'

if __name__ == '__main__':
    app.run(port=3000)
