const text = document.body.innerText;
console.log('TEXT', text);

function addSideBar(summary) {
  const barWidth = 300;
  const stdMargin = 10;

  // Make sidebar
  const div = document.createElement('div');
  div.style.position = 'fixed';
  div.style.right = '0';
  div.style.bottom = '0';
  div.style.width = `${barWidth}px`;
  div.style.height = '30vh';
  div.style.zIndex = '9999';
  div.style.backgroundColor = '#252526';
  div.style.color = 'white';
  div.style.marginRight = `${stdMargin * 2}px`;
  div.style.marginBottom = `${stdMargin * 2}px`;
  div.style.padding = `${stdMargin * 2}px`;
  div.style.borderWidth = '1px';
  div.style.borderRadius = `${stdMargin * 2}px`;
  div.innerHTML = `<p>${summary}</p>`;

  // Inject to current page
  document.querySelector('body').prepend(div);
}

if (text) {
  fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { text: JSON.stringify(text) },
  }).then(
    (response) => {
      if (response.status !== 200) {
        console.log(`Looks like there was a problem. Status Code: ${response.status}`);
        return;
      }

      // Examine the text in the response
      response.json().then((data) => {
        const fakeData = 'THIS IS THE SUMMARY HERE';
        console.log('HERE', data);
        addSideBar(fakeData);
      });
    },
  ).catch((err) => {
    console.log('Fetch Error :-S', err);
  });
}
