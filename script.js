async function fetchBeatLinks() {
  try {
    const res = await fetch('/.netlify/functions/get-beats');
    const data = await res.json();

    if (data.links) {
      console.log("🎵 50 Beat Links:", data.links);
      const list = document.getElementById('beatList');
      data.links.forEach(link => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
        list.appendChild(li);
      });
    } else {
      console.error('No links returned:', data);
    }
  } catch (error) {
    console.error('Error calling Netlify function:', error);
  }
}

fetchBeatLinks();
