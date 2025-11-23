// script.js
document.getElementById('connect-button').addEventListener('click', async function() {
  const macAddress = document.getElementById('mac-address').value.trim();
  
  if (!macAddress) {
    document.getElementById('status').textContent = 'Введите корректный MAC-адрес.';
    return;
  }

  try {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ['battery_service'] // Укажите UUID сервиса устройства
    });

    // Проверка соответствия MAC-адреса (Web Bluetooth API не предоставляет прямой доступ к MAC)
    if (device.name && device.name.includes(macAddress)) {
      const server = await device.gatt.connect();
      document.getElementById('status').textContent = `Успешное подключение к устройству ${device.name}`;
    } else {
      document.getElementById('status').textContent = 'Устройство с указанным MAC-адресом не найдено.';
    }
    
  } catch (error) {
    document.getElementById('status').textContent = `Ошибка подключения: ${error.message}`;
  }
});
