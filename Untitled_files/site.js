
document.addEventListener('DOMContentLoaded', function () {
  // Process text once so that names are never nested or link markup changed.
  const namePattern = /\b(?:Nguyen,\s*Hien\s+D(?:uy)?\.?(?!\w)|Nguyen,\s*H\.?\s*D\.?(?!\w)|Nguyen,\s*H\.?(?![\w.]|\s*[A-Z])|Hien\s+Duy\s+Nguyen\b|Nguyen\s+HD\b)/g;
  const entries = document.querySelectorAll('#refs .csl-entry, #preprint-entries p');
  entries.forEach(entry => {
    const walker = document.createTreeWalker(entry, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      if (!walker.currentNode.parentElement.closest('a, .self-name')) nodes.push(walker.currentNode);
    }
    nodes.forEach(node => {
      const text = node.textContent;
      const fragment = document.createDocumentFragment();
      let previous = 0;
      for (const match of text.matchAll(namePattern)) {
        fragment.appendChild(document.createTextNode(text.slice(previous, match.index)));
        const span = document.createElement('span');
        span.className = 'self-name';
        span.textContent = match[0];
        fragment.appendChild(span);
        previous = match.index + match[0].length;
      }
      if (previous) {
        fragment.appendChild(document.createTextNode(text.slice(previous)));
        node.replaceWith(fragment);
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const themeButton = document.querySelector('.theme-toggle');
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeButton.textContent = theme === 'dark' ? 'Light' : 'Dark';
    themeButton.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' theme');
  }
  let initialTheme = 'dark';
  try {
    if (localStorage.getItem('hdn-theme') === 'light') initialTheme = 'light';
  } catch (_) { /* Storage can be disabled by the visitor. */ }
  applyTheme(initialTheme);
  themeButton.addEventListener('click', function () {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    try { localStorage.setItem('hdn-theme', theme); } catch (_) { /* Theme still works without storage. */ }
  });

  const notes = JSON.parse(document.getElementById('publication-notes').textContent);
  Object.entries(notes).forEach(([id, text]) => {
    const entry = document.getElementById(id);
    if (entry) {
      const note = document.createElement('span');
      note.className = 'publication-status';
      note.textContent = text;
      entry.appendChild(note);
    }
  });
  const entries = [
    ...Array.from(document.querySelectorAll('#preprint-entries p')).map(element => ({element, type: 'preprint'})),
    ...Array.from(document.querySelectorAll('#refs .csl-entry')).map(element => ({element, type: 'published'}))
  ].map(record => {
    const text = record.element.textContent;
    const year = text.match(/\((\d{4})\)/);
    return {...record, text: text.toLocaleLowerCase(), year: year ? year[1] : ''};
  });
  const search = document.getElementById('publication-search');
  const yearSelect = document.getElementById('publication-year');
  const buttons = Array.from(document.querySelectorAll('.filter-button'));
  const count = document.getElementById('publication-count');
  let activeFilter = 'all';
  Array.from(new Set(entries.map(record => record.year).filter(Boolean))).sort().reverse().forEach(year => {
    const option = document.createElement('option');
    option.value = year; option.textContent = year; yearSelect.appendChild(option);
  });
  function filterEntries() {
    const terms = search.value.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    let visible = 0;
    const visibleTypes = new Set();
    entries.forEach(record => {
      const show = (activeFilter === 'all' || record.type === activeFilter) &&
        (yearSelect.value === 'all' || record.year === yearSelect.value) &&
        terms.every(term => record.text.includes(term));
      record.element.hidden = !show;
      if (show) { visible++; visibleTypes.add(record.type); }
    });
    document.getElementById('recent-preprints').hidden = !visibleTypes.has('preprint');
    document.getElementById('published-work').hidden = !visibleTypes.has('published');
    document.getElementById('publication-empty').hidden = visible !== 0;
    count.textContent = visible + (visible === 1 ? ' work' : ' works') + ' / ' + entries.length;
  }
  buttons.forEach(button => button.addEventListener('click', function () {
    activeFilter = button.dataset.filter;
    buttons.forEach(candidate => {
      const active = candidate === button;
      candidate.classList.toggle('active', active);
      candidate.setAttribute('aria-pressed', String(active));
    });
    filterEntries();
  }));
  search.addEventListener('input', filterEntries);
  yearSelect.addEventListener('change', filterEntries);
  document.querySelector('.publication-tools').hidden = false;
  filterEntries();
});
