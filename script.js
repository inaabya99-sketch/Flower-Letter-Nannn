const flowers = [
  {id:'rose-red', name:'Mawar merah', meaning:'Cinta dan kasih sayang.', image:'https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=800&q=85', fallback:'rose'},
  {id:'tulip', name:'Tulip', meaning:'Perhatian dan kebahagiaan.', image:'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=85', fallback:'tulip'},
  {id:'sunflower', name:'Bunga matahari', meaning:'Persahabatan, kehangatan, dan semangat.', image:'https://images.unsplash.com/photo-1597848212624-e6dc6e33e9b9?auto=format&fit=crop&w=800&q=85', fallback:'sunflower'},
  {id:'daisy', name:'Daisy', meaning:'Ketulusan dan kepolosan.', image:'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=85', fallback:'daisy'},
  {id:'baby-breath', name:"Baby's breath", meaning:'Ketulusan dan kenangan yang indah.', image:'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=85', fallback:'baby'},
  {id:'lavender', name:'Lavender', meaning:'Ketenangan dan rasa nyaman.', image:'https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=800&q=85', fallback:'lavender'},
  {id:'sakura', name:'Sakura', meaning:'Keindahan momen dan awal yang baru.', image:'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=800&q=85', fallback:'sakura'},
  {id:'lotus', name:'Teratai', meaning:'Keteguhan dan kedamaian.', image:'https://images.unsplash.com/photo-1530968464165-7a1861cbaf9f?auto=format&fit=crop&w=800&q=85', fallback:'lotus'},
  {id:'pink-carnation', name:'Anyelir merah muda', meaning:'Rasa terima kasih dan penghargaan.', image:'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=85', fallback:'carnation'},
  {id:'rose-white', name:'Mawar putih', meaning:'Ketulusan dan kedamaian.', image:'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=85', fallback:'white-rose'}
];
function flowerIllustration(type) {
  const art = {
    sunflower: `<rect width="500" height="350" fill="#f7edcf"/><path d="M250 204v146m0-78q-65-39-91 4 48 30 91-4m0 25q62-45 91-5-44 38-91 5" fill="#7d9665"/><g fill="#f2bd43">${Array.from({length:16},(_,i)=>`<ellipse cx="250" cy="112" rx="20" ry="61" transform="rotate(${i*22.5} 250 145)"/>`).join('')}</g><circle cx="250" cy="145" r="58" fill="#76503a"/><circle cx="250" cy="145" r="46" fill="#503b2d"/><g fill="#c99b54" opacity=".8">${Array.from({length:30},(_,i)=>{const a=i*2.4;const x=250+Math.cos(a)*((i%3)*7+10);const y=145+Math.sin(a)*((i%3)*7+10);return `<circle cx="${x}" cy="${y}" r="2.5"/>`}).join('')}</g>`,
    'white-rose': `<rect width="500" height="350" fill="#f3eee7"/><path d="M250 190v160m0-70q-63-35-91 7 45 28 91-7m0 22q60-42 91-2-46 35-91 2" fill="#829674"/><g fill="#fffdf8" stroke="#d9d0c4" stroke-width="3"><ellipse cx="250" cy="117" rx="28" ry="67"/><ellipse cx="250" cy="117" rx="28" ry="67" transform="rotate(45 250 150)"/><ellipse cx="250" cy="117" rx="28" ry="67" transform="rotate(90 250 150)"/><ellipse cx="250" cy="117" rx="28" ry="67" transform="rotate(135 250 150)"/><ellipse cx="250" cy="141" rx="24" ry="48" transform="rotate(25 250 150)"/><ellipse cx="250" cy="141" rx="24" ry="48" transform="rotate(85 250 150)"/><ellipse cx="250" cy="141" rx="24" ry="48" transform="rotate(145 250 150)"/></g><path d="M237 155q-15-20 3-34 21-13 29 8 5 15-14 25 18-18 1-21-10-2-12 11" fill="none" stroke="#d4c8bb" stroke-width="5" stroke-linecap="round"/>`,
    lotus: `<rect width="500" height="350" fill="#e8f0e9"/><path d="M0 284q70-30 140 0t140 0 140 0 140 0v66H0z" fill="#b9d0c3"/><path d="M250 269q-70-80-130-7 66 39 130 7m0 0q70-80 130-7-66 39-130 7" fill="#6f9b7e"/><g fill="#f7dce4" stroke="#dbacba" stroke-width="2"><ellipse cx="250" cy="169" rx="27" ry="100"/><ellipse cx="250" cy="169" rx="27" ry="100" transform="rotate(32 250 220)"/><ellipse cx="250" cy="169" rx="27" ry="100" transform="rotate(-32 250 220)"/><ellipse cx="250" cy="181" rx="24" ry="78" transform="rotate(62 250 220)"/><ellipse cx="250" cy="181" rx="24" ry="78" transform="rotate(-62 250 220)"/><ellipse cx="250" cy="191" rx="21" ry="55" transform="rotate(90 250 220)"/></g><circle cx="250" cy="210" r="19" fill="#e5bb64"/><circle cx="250" cy="210" r="9" fill="#b98742"/>`
  }[type];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 350">${art}</svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}



const STORAGE_KEY = 'bloomLetters.v1';
let selectedFlower = null;
let modalFlower = null;
let lastCreatedCode = '';
let viewHistory = ['home'];
let toastTimer;

const $ = (selector) => document.querySelector(selector);
const views = [...document.querySelectorAll('.view')];

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}

function flowerById(id) { return flowers.find(flower => flower.id === id) || flowers[0]; }

function imageFallback(image) {
  if (image.dataset.fallbackDone) return;
  image.dataset.fallbackDone = 'true';
  if (image.dataset.fallback === 'sunflower') {
    image.src = 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&w=800&q=85';
    return;
  }
  const colors = {rose:['#e9c3c6','#b8797d'],tulip:['#f2d8c9','#cc8e85'],sunflower:['#f2dda6','#c99843'],daisy:['#f1ead6','#b8a879'],baby:['#eee3e7','#bd9daa'],lavender:['#e7ddec','#9984ad'],sakura:['#f4dfe5','#d39cac'],lotus:['#dce8df','#89a995'],carnation:['#f2d8df','#c78494'],'white-rose':['#f1eee6','#c7bdb1']};
  const pair = colors[image.dataset.fallback] || colors.rose;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 350"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="${pair[0]}"/><stop offset="1" stop-color="#fffaf3"/></linearGradient></defs><rect width="500" height="350" fill="url(#g)"/><circle cx="250" cy="160" r="54" fill="${pair[1]}" opacity=".82"/><g fill="${pair[1]}" opacity=".72">${[0,45,90,135,180,225,270,315].map(angle=>`<ellipse cx="250" cy="105" rx="23" ry="53" transform="rotate(${angle} 250 160)"/>`).join('')}</g><circle cx="250" cy="160" r="20" fill="#e8c879"/><path d="M250 214v120m0-70q-65-40-82 5 43 25 82-5m0 25q57-48 83-10-39 39-83 10" fill="none" stroke="#83957c" stroke-width="9" stroke-linecap="round"/></svg>`;
  image.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function attachImageFallbacks(root = document) {
  root.querySelectorAll('img[data-fallback]').forEach(image => image.addEventListener('error', () => imageFallback(image), {once:true}));
}

function renderFlowerGallery() {
  $('#flowerGrid').innerHTML = flowers.map(flower => `
    <article class="flower-card">
      <div class="flower-photo-wrap"><img src="${flower.image}" alt="${escapeHTML(flower.name)}" loading="lazy" data-fallback="${flower.fallback}"></div>
      <div class="flower-card-content"><h3 class="flower-name">${escapeHTML(flower.name)}</h3><p class="flower-meaning">${escapeHTML(flower.meaning)}</p><button class="btn btn-outline" type="button" data-flower-id="${flower.id}">Lihat makna <span aria-hidden="true">♡</span></button></div>
    </article>`).join('');
  attachImageFallbacks($('#flowerGrid'));
}

function showView(id, remember = true) {
  const target = document.getElementById(id);
  if (!target) return;
  if (remember && viewHistory[viewHistory.length - 1] !== id) viewHistory.push(id);
  views.forEach(view => view.classList.toggle('active', view.id === id));
  $('#backButton').hidden = viewHistory.length < 2;
  window.scrollTo({top:0, behavior:'smooth'});
  if (id === 'write') updatePreview();
}

function goBack() {
  if (viewHistory.length > 1) viewHistory.pop();
  showView(viewHistory[viewHistory.length - 1], false);
}

function openFlowerModal(id) {
  modalFlower = flowerById(id);
  const image = $('#modalFlowerImage');
  image.dataset.fallback = modalFlower.fallback;
  image.dataset.fallbackDone = '';
  image.src = modalFlower.image;
  image.alt = modalFlower.name;
  $('#modalFlowerName').textContent = modalFlower.name;
  $('#modalFlowerMeaning').textContent = `${modalFlower.meaning} Makna ini bisa menjadi inspirasi untuk pesanmu.`;
  $('#flowerModal').classList.add('open');
  $('#flowerModal').setAttribute('aria-hidden','false');
  $('#closeModal').focus();
}

function closeFlowerModal() {
  $('#flowerModal').classList.remove('open');
  $('#flowerModal').setAttribute('aria-hidden','true');
}

function chooseFlower() {
  if (!modalFlower) return;
  selectedFlower = modalFlower;
  $('#chosenFlower').innerHTML = `<img src="${selectedFlower.image}" alt="" data-fallback="${selectedFlower.fallback}"><span><strong>${escapeHTML(selectedFlower.name)}</strong><small>${escapeHTML(selectedFlower.meaning)}</small></span>`;
  $('#previewImage').dataset.fallback = selectedFlower.fallback;
  $('#previewImage').dataset.fallbackDone = '';
  $('#previewImage').src = selectedFlower.image;
  $('#previewImage').alt = selectedFlower.name;
  $('#previewMeaning').textContent = `Makna: ${selectedFlower.meaning}`;
  attachImageFallbacks($('#chosenFlower'));
  attachImageFallbacks($('#previewImage').parentElement);
  closeFlowerModal();
  $('#formError').textContent = '';
  showView('write');
}

function updatePreview() {
  $('#previewRecipient').textContent = $('#recipient').value.trim() || 'seseorang yang istimewa';
  $('#previewMessage').textContent = $('#message').value.trim() || 'Kata-katamu akan tumbuh di sini...';
  $('#characterCount').textContent = `${$('#message').value.length} / 2000`;
}

function readLetters() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function makeCode() {
  const random = window.crypto && crypto.getRandomValues ? Array.from(crypto.getRandomValues(new Uint8Array(4)), byte => byte.toString(16).padStart(2,'0')).join('').toUpperCase() : Math.random().toString(36).slice(2,10).toUpperCase();
  return `BLOOM-${random}`;
}

function submitLetter(event) {
  event.preventDefault();
  const recipient = $('#recipient').value.trim();
  const message = $('#message').value.trim();
  const showSender = $('#showSender').checked;
  const sender = showSender ? $('#sender').value.trim() : '';
  $('#recipientError').textContent = recipient ? '' : 'Nama panggilan penerima perlu diisi.';
  $('#messageError').textContent = message ? '' : 'Isi suratmu masih kosong. Tulis beberapa kata dari hati.';
  $('#formError').textContent = '';
  if (!selectedFlower) { $('#formError').textContent = 'Pilih bunga terlebih dahulu agar suratmu punya makna.'; return; }
  if (!recipient || !message) return;
  if (showSender && !sender) { $('#formError').textContent = 'Isi nama pengirim atau matikan pilihan tampilkan nama.'; return; }

  const letters = readLetters();
  let code = makeCode();
  while (letters.some(letter => letter.code === code)) code = makeCode();
  const letter = {code, recipient, message, flowerId:selectedFlower.id, flowerName:selectedFlower.name, flowerMeaning:selectedFlower.meaning, flowerImage:selectedFlower.image, sender:showSender ? sender : '', createdAt:new Date().toISOString()};
  try {
    letters.push(letter);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));
  } catch (error) {
    $('#formError').textContent = 'Surat tidak dapat disimpan. Penyimpanan browser mungkin penuh atau dinonaktifkan.';
    return;
  }
  lastCreatedCode = code;
  $('#letterCode').textContent = code;
  $('#successRecipient').textContent = `Surat ini dibuat untuk “${recipient}”. Penerima dapat mencari menggunakan nama panggilan tersebut.`;
  $('#letterForm').reset();
  $('#sender').disabled = true;
  $('#recipientError').textContent = '';
  $('#messageError').textContent = '';
  updatePreview();
  showView('success');
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Tanggal tidak tersedia';
  return new Intl.DateTimeFormat('id-ID', {day:'numeric',month:'long',year:'numeric'}).format(date);
}

function searchLetters(event) {
  event.preventDefault();
  const query = $('#searchName').value.trim();
  const results = $('#searchResults');
  results.innerHTML = '';
  if (!query) {
    results.innerHTML = '<p class="empty-search">Masukkan nama panggilan untuk mencari surat.</p>';
    return;
  }
  const matches = readLetters().filter(letter => String(letter.recipient || '').trim().toLocaleLowerCase('id') === query.toLocaleLowerCase('id')).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (!matches.length) {
    results.innerHTML = '<p class="empty-search">Belum ada bunga yang mekar untuk nama ini. Mungkin seseorang sedang menyiapkan kata-katanya.</p>';
    return;
  }
  results.innerHTML = matches.map((letter,index) => {
    const flower = flowerById(letter.flowerId);
    const image = flower.image;
    const meaning = letter.flowerMeaning || flower.meaning;
    const name = letter.flowerName || flower.name;
    return `<article class="found-card" data-index="${index}"><div class="found-card-head"><img src="${escapeHTML(image)}" alt="${escapeHTML(name)}" data-fallback="${flower.fallback}"><div><h3>${escapeHTML(name)}</h3><p>Surat kecil untuk ${escapeHTML(letter.recipient)}</p></div><button class="found-open" type="button" aria-label="Buka surat" aria-expanded="false">⌄</button></div><div class="found-details"><p class="found-meaning">Makna bunga · ${escapeHTML(meaning)}</p><p class="found-message">${escapeHTML(letter.message)}</p>${letter.sender ? `<p class="found-sender">Dengan hangat, ${escapeHTML(letter.sender)}</p>` : '<p class="found-sender">Dikirim secara anonim ♡</p>'}<p class="found-date">Dibuat pada ${formatDate(letter.createdAt)}</p><p class="found-code">Kode surat: ${escapeHTML(letter.code)}</p></div></article>`;
  }).join('');
  attachImageFallbacks(results);
}

async function copyCode() {
  if (!lastCreatedCode) return;
  try {
    await navigator.clipboard.writeText(lastCreatedCode);
    showToast('Kode surat berhasil disalin.');
  } catch (error) {
    const temporary = document.createElement('textarea');
    temporary.value = lastCreatedCode;
    temporary.style.position = 'fixed';
    temporary.style.opacity = '0';
    document.body.appendChild(temporary);
    temporary.select();
    const copied = document.execCommand('copy');
    temporary.remove();
    showToast(copied ? 'Kode surat berhasil disalin.' : 'Salin kode surat secara manual.');
  }
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function createPetals() {
  const container = $('#petals');
  for (let i=0;i<15;i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.left = `${Math.random()*100}%`;
    petal.style.animationDuration = `${12+Math.random()*14}s`;
    petal.style.animationDelay = `${-Math.random()*24}s`;
    petal.style.transform = `scale(${.55+Math.random()*.7})`;
    container.appendChild(petal);
  }
}

document.addEventListener('click', event => {
  const nav = event.target.closest('[data-view]');
  if (nav) { event.preventDefault(); showView(nav.dataset.view); return; }
  const flowerButton = event.target.closest('[data-flower-id]');
  if (flowerButton) { openFlowerModal(flowerButton.dataset.flowerId); return; }
  const openButton = event.target.closest('.found-open');
  if (openButton) {
    const card = openButton.closest('.found-card');
    const opening = !card.classList.contains('expanded');
    card.classList.toggle('expanded', opening);
    openButton.setAttribute('aria-expanded',String(opening));
    if (opening) { card.classList.remove('opening'); void card.offsetWidth; card.classList.add('opening'); }
  }
});

$('#backButton').addEventListener('click',goBack);
$('#closeModal').addEventListener('click',closeFlowerModal);
$('#chooseFlower').addEventListener('click',chooseFlower);
$('#flowerModal').addEventListener('click',event => {if(event.target === $('#flowerModal')) closeFlowerModal();});
document.addEventListener('keydown',event => {if(event.key === 'Escape') closeFlowerModal();});
$('#letterForm').addEventListener('submit',submitLetter);
$('#searchForm').addEventListener('submit',searchLetters);
$('#copyCode').addEventListener('click',copyCode);
$('#recipient').addEventListener('input',updatePreview);
$('#message').addEventListener('input',updatePreview);
$('#showSender').addEventListener('change',event => {
  $('#sender').disabled = !event.target.checked;
  if (event.target.checked) $('#sender').focus();
  else $('#sender').value = '';
});

renderFlowerGallery();
attachImageFallbacks(document);
createPetals();
updatePreview();
