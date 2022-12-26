const text = document.body.innerText;

function addSideBar(summary) {
  const barWidth = 300;
  const stdMargin = 10;

  // Make sidebar
  const div = document.createElement('div');
  div.className = 'extension-frame';
  div.style.position = 'fixed';
  div.style.right = '0';
  div.style.bottom = '0';
  div.style.width = `${barWidth}px`;
  div.style.maxHeight = '50vh';
  div.style.zIndex = '10000000';
  div.style.backgroundColor = '#252526';
  div.style.color = 'white';
  div.style.marginRight = `${stdMargin * 2}px`;
  div.style.marginBottom = `${stdMargin * 2}px`;
  div.style.padding = `${stdMargin * 2}px`;
  div.style.borderWidth = '1px';
  div.style.borderRadius = `${stdMargin * 2}px`;
  div.style.display = 'flex';

  const ul = document.createElement('ul');
  ul.className = 'extension-scroll';
  ul.style.overflowY = 'scroll';
  ul.style.paddingRight = `${stdMargin}px`;
  ul.style.margin = '0px';
  const bullets = summary.split('\u2022');
  bullets.slice(1).forEach(bullet => {
    const li = document.createElement('li');
    li.innerHTML = `${bullet}<br><br>`;
    ul.appendChild(li);
  });
  div.appendChild(ul);

  // Inject to current page
  document.querySelector('body').prepend(div);
}

if (text) {
  fetch('http://localhost:3000/api/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
    mode: 'cors',
  }).then(
    (response) => {
      if (response.status !== 200) {
        console.error(`Looks like there was a problem. Status Code: ${response.status}`);
        return;
      }
      // Examine the text in the response
      response.json().then((data) => {
        addSideBar(data.summary);
      });
    },
  ).catch((err) => {
    console.error('Fetch Error :-S', err);
  });
}
