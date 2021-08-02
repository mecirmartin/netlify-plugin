const fs = require('fs');

const linkHrefs = [
  'https://unpkg.com/@iteria-app/wysiwyg@1.3.3/public/export/index.css',
  'https://unpkg.com/@iteria-app/wysiwyg@1.3.3/public/global.css'
];

const scriptSrcs = [
  'https://unpkg.com/@iteria-app/wysiwyg@1.3.3/public/export/index.umd.js',
  'https://serene-leavitt-3e0702.netlify.app/vite-ide.umd.js'
];

const findIndexHtml = () => {
  const possibleIndexes = ['./public/index.html', './index.html'];

  const indexFile = possibleIndexes.find((i) => fs.existsSync(i));
  return indexFile;
};

const addStyleLinks = (el) => {
  const head = [...el.getElementsByTagName('head')][0];

  linkHrefs.forEach((sH) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = sH;
    head.appendChild(link);
  });

  console.log('head', head.innerHTML);

  el.getElementsByTagName('head')[0].innerHTML = head.innerHTML;
};

const addScripts = (el) => {
  const body = [...el.getElementsByTagName('body')][0];

  scriptSrcs.forEach((sS) => {
    const script = document.createElement('script');
    script.src = sS;
    body.appendChild(script);
  });
  console.log('body', body.innerHTML);

  el.getElementsByTagName('body')[0].innerHTML = body.innerHTML;
};

exports.addScriptsToIndex = () => {
  const indexPath = findIndexHtml();
  const htmlString = fs.readFileSync(indexPath, 'utf-8');
  const el = document.createElement('html');

  el.innerHTML = htmlString;
  addStyleLinks(el);
  addScripts(el);
  console.log('final', el.innerHTML);
};
