module.exports = {
  apps: [{
    name: 'mlmodel',
    script: '/var/www/green-farm-line/crop-disease-detection-ml-model/venv/bin/gunicorn',
    interpreter: 'python3', // Ensure this is the correct interpreter
    args: '-w 4 -b 0.0.0.0:5000 app:app'
  }]
};
