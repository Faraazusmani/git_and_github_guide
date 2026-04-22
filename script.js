const CHAPTERS = 14;
const SECTIONS = ['Foundations','Foundations','Foundations','Daily Use','Daily Use','Daily Use','Branching','Branching','Branching','Recovery','GitHub Features','GitHub Features','GitHub Features','Your Workflow'];
const TITLES = ['Git vs GitHub','Core concepts','First-time setup','Your first repo','The commit loop','Push & pull','What is a branch','When to branch','Merge & conflicts','Undo & rollback','.gitignore','README & Issues','GitHub Actions','Your workflow'];

let current = 0;
let done = new Set(JSON.parse(localStorage.getItem('gh-done') || '[]'));

function go(i) {
  if (i < 0 || i >= CHAPTERS) return;
  document.querySelectorAll('.chapter').forEach((el, j) => el.classList.toggle('active', j === i));
  document.querySelectorAll('.nav-item').forEach((el, j) => el.classList.toggle('active', j === i));
  document.getElementById('tb-section').textContent = SECTIONS[i];
  document.getElementById('tb-title').textContent = TITLES[i];
  document.getElementById('scroll-area').scrollTop = 0;
  current = i;
  const navItem = document.querySelector(`.nav-item[data-i="${i}"]`);
  if (navItem) navItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function markDone(i) {
  if (done.has(i)) {
    undoDone(i);
  } else {
    done.add(i);
    localStorage.setItem('gh-done', JSON.stringify([...done]));
    updateProgress();
    const btn = document.querySelector(`.mark-done-btn[data-i="${i}"]`);
    if (btn) { btn.textContent = '✓ Complete'; btn.classList.add('done'); }
    const navItem = document.querySelector(`.nav-item[data-i="${i}"]`);
    if (navItem) {
      navItem.classList.add('done');
      navItem.querySelector('.nav-dot').textContent = '✓';
    }
  }
}

function undoDone(i) {
  done.delete(i);
  localStorage.setItem('gh-done', JSON.stringify([...done]));
  updateProgress();
  const btn = document.querySelector(`.mark-done-btn[data-i="${i}"]`);
  if (btn) { btn.textContent = '✦ Mark complete'; btn.classList.remove('done'); }
  const navItem = document.querySelector(`.nav-item[data-i="${i}"]`);
  if (navItem) {
    navItem.classList.remove('done');
    navItem.querySelector('.nav-dot').textContent = (i + 1);
  }
}

function updateProgress() {
  const count = done.size;
  document.getElementById('prog-count').textContent = `${count} / ${CHAPTERS}`;
  document.getElementById('prog-fill').style.width = `${(count / CHAPTERS) * 100}%`;
}

function applyStoredProgress() {
  done.forEach(i => {
    const btn = document.querySelector(`.mark-done-btn[data-i="${i}"]`);
    if (btn) { btn.textContent = '✓ Complete'; btn.classList.add('done'); }
    const navItem = document.querySelector(`.nav-item[data-i="${i}"]`);
    if (navItem) {
      navItem.classList.add('done');
      navItem.querySelector('.nav-dot').textContent = '✓';
    }
  });
  updateProgress();
}

document.querySelectorAll('.mark-done-btn').forEach(btn => {
  btn.addEventListener('click', () => markDone(+btn.dataset.i));
});

document.querySelectorAll('.nav-item').forEach(el => {
  el.addEventListener('click', () => go(+el.dataset.i));
});

document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const pre = btn.closest('.code-block').querySelector('pre');
    const text = pre.innerText || pre.textContent;
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1800);
    });
  });
});

document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.key === 'ArrowRight') go(current + 1);
  if (e.key === 'ArrowLeft') go(current - 1);
});

function toggleSidebar() {
  const sidebar = document.querySelector('aside');
  const main = document.querySelector('.main');
  sidebar.classList.toggle('mobile-open');
  main.classList.toggle('sidebar-open');
}

document.addEventListener('click', e => {
  const sidebar = document.querySelector('aside');
  const main = document.querySelector('.main');
  const toggle = document.getElementById('mobile-toggle');
  if (sidebar.classList.contains('mobile-open') && 
      !sidebar.contains(e.target) && 
      !toggle.contains(e.target)) {
    sidebar.classList.remove('mobile-open');
    main.classList.remove('sidebar-open');
  }
});

applyStoredProgress();