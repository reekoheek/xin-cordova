async function isCordova () {
  if (!window.cordova) {
    return false;
  }

  if (window.CORDOVA_STATUS) {
    return window.CORDOVA_STATUS;
  }

  if (window.device) {
    window.CORDOVA_STATUS = window.device.available;
    return window.CORDOVA_STATUS;
  }

  return await new Promise(resolve => {
    let listener = () => {
      removeListener();
      resolve(true);
    };
    let removeListener = () => document.removeEventListener('deviceready', listener, false);

    document.addEventListener('deviceready', listener, false);

    setTimeout(() => {
      removeListener();
      window.CORDOVA_STATUS = false;
      resolve(window.CORDOVA_STATUS);
    }, isCordova.timeout);
  });
}

isCordova.timeout = 3000;

export default isCordova;
