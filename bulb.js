const miio = require('miio');

miio.device({
	address: '192.168.2.9',
    token: '53061a7d38870a8c6d6befa56b7e464a',
}).then(device => {
    device.setPower(true)
}).catch(err => console.log('Error occurred:', err));
