// Set third party script tag and resolve promise after the script is ready to use.
// On resolve, return the reset function
// Reject after a couple of seconds.
const loadAskemScript = () => {
  return new Promise((resolve, reject) => {
    if (!document.getElementById('if-askem-script')) {
      document.body.append(getAskemScriptTag())
    }

    let i = 1;
    const max = 3;

    const intervalId = setInterval(()=> {
      if (window.askem.reset) {
        resolve(window.askem.reset);
        clearInterval(intervalId);
      }
      if (i > max) {
        reject(false);
        clearInterval(intervalId);
      }
      i++;
    }, 750);
  })
}

const removeAskemScript = () => {
  document.body.removeChild(getAskemScriptTag());
}

const getAskemScriptTag = () => {
  const script = document.createElement('script');
  script.src = 'https://cdn.askem.com/plugin/askem.js';
  script.type = 'text/javascript';
  script.id = 'if-askem-script';

  return script;
}

export {loadAskemScript, getAskemScriptTag, removeAskemScript};
