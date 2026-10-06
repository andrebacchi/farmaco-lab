/* ===== FARMACO LAB · núcleo ===== */
const $ = id => document.getElementById(id);
const nf = (x, d = 0) => Number(x).toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });
const pc = (f, d) => { const v = f * 100; if (d === undefined) d = v < 1 ? 2 : v < 10 ? 1 : 0; return nf(v, d) + '%'; };
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
/* largura real do gráfico: o texto fica legível no celular e no projetor */
const cw = id => { const el = $(id); return Math.round(clamp(el && el.clientWidth ? el.clientWidth : 560, 300, 640)); };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = { get(k, d) { try { const v = localStorage.getItem('farmacolab.' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('farmacolab.' + k, JSON.stringify(v)); } catch {} } };

/* Henderson-Hasselbalch para base fraca: pH = pKa + log([B]/[BH+]) */
const fracB = (pKa, pH) => 1 / (1 + Math.pow(10, pKa - pH));   // fração não ionizada

/* ---------- dados dos agentes ---------- */
const AGENTS = [
  { id: 'lido',  n: 'Lidocaína',    c: 'A', pKa: 7.9, lipo: 2, lipoT: 'Média',      pb: 65, lat: 'Rápida', dur: 'Intermediária', dose: [4.5, 7], cap: [300, 500], conc: [0.5, 1, 2], uso: 'Infiltração, bloqueios, tópico', nota: 'Referência entre as amidas. Também é antiarrítmico classe IB. pKa citado entre 7,7 e 7,9 conforme a fonte.' },
  { id: 'mepi',  n: 'Mepivacaína',  c: 'A', pKa: 7.6, lipo: 2, lipoT: 'Média',      pb: 77, lat: 'Rápida', dur: 'Intermediária', dose: [4.4, 4.4], conc: [2, 3], dental: true, uso: 'Odontologia, bloqueios', nota: 'O pKa mais próximo do pH fisiológico entre as amidas usuais: início rápido. Vasodilata pouco, por isso existe a apresentação a 3% sem vasoconstritor.' },
  { id: 'prilo', n: 'Prilocaína',   c: 'A', pKa: 7.9, lipo: 2, lipoT: 'Média',      pb: 55, lat: 'Rápida', dur: 'Intermediária', dose: [6, 8], conc: [3, 4], dental: true, uso: 'Odontologia (com felipressina), EMLA', nota: 'Metabólito o-toluidina: metemoglobinemia em doses altas. Componente do EMLA com a lidocaína.' },
  { id: 'arti',  n: 'Articaína',    c: 'A*', pKa: 7.8, lipo: 2, lipoT: 'Média',     pb: 94, lat: 'Rápida', dur: 'Intermediária', dose: [null, 7], conc: [4], dental: true, epiOnly: true, uso: 'Odontologia', nota: 'Amida com um grupamento éster: cerca de 90% é hidrolisada no plasma (meia-vida ≈ 20 min). Comercializada apenas com adrenalina.' },
  { id: 'bupi',  n: 'Bupivacaína',  c: 'A', pKa: 8.1, lipo: 3, lipoT: 'Alta',       pb: 95, lat: 'Lenta',  dur: 'Longa', dose: [2.5, 3], cap: [175, 225], conc: [0.25, 0.5, 0.75], uso: 'Raqui, peridural, bloqueios', nota: 'A mais cardiotóxica: entra rápido e sai devagar dos canais de sódio cardíacos. Nunca em anestesia regional intravenosa.' },
  { id: 'ropi',  n: 'Ropivacaína',  c: 'A', pKa: 8.1, lipo: 2.5, lipoT: 'Média-alta', pb: 94, lat: 'Lenta',  dur: 'Longa', dose: [3, 3], conc: [0.2, 0.5, 0.75], uso: 'Bloqueios, peridural', nota: 'Enantiômero S puro (1996): menos cardiotóxico que a bupivacaína racêmica. Em baixa concentração, bloqueio sensitivo com pouco bloqueio motor.' },
  { id: 'tetra', n: 'Tetracaína',   c: 'E', pKa: 8.5, lipo: 3, lipoT: 'Alta',       pb: 76, lat: 'Lenta',  dur: 'Longa', doseT: 'tópico, raqui', uso: 'Tópico (LET), oftalmologia, raqui', nota: 'Éster potente e lipossolúvel. Componente do LET (lidocaína, adrenalina e tetracaína) usado em feridas de crianças.' },
  { id: 'cloro', n: 'Cloroprocaína', c: 'E', pKa: 8.7, lipo: 1, lipoT: 'Baixa',     pb: null, lat: 'Rápida', dur: 'Curta', doseT: '—', uso: 'Raqui de curta duração, obstetrícia', nota: 'Exceção à regra do pKa: pKa alto, mas início rápido porque é usada em concentração alta (3%). Hidrolisada muito depressa no plasma.' },
  { id: 'proc',  n: 'Procaína',     c: 'E', pKa: 8.9, lipo: 1, lipoT: 'Baixa',      pb: 6,  lat: 'Lenta',  dur: 'Curta', doseT: '—', uso: 'Histórico (1904)', nota: 'Primeiro éster sintético (Einhorn, 1904). Pouco usado hoje: baixa potência e metabólito PABA, ligado a alergias.' },
  { id: 'benzo', n: 'Benzocaína',   c: 'E', pKa: 3.5, lipo: null, lipoT: '—',       pb: null, lat: 'Rápida', dur: 'Curta', topical: true, doseT: 'só tópico', uso: 'Somente tópico (mucosas)', nota: 'pKa muito baixo: quase toda não ionizada e pouco hidrossolúvel, por isso só serve como tópico. Causa metemoglobinemia; a FDA desaconselha produtos para dentição em menores de 2 anos.' },
];
const AG = Object.fromEntries(AGENTS.map(a => [a.id, a]));

/* ---------- folhas (Saiba mais, glossário, como usar) ---------- */
function openSheet(title, html) {
  const root = $('sheetRoot'), prev = document.activeElement;
  root.innerHTML = `<div class="scrim" id="scrim"><div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="sheet-h"><h3>${title}</h3><button class="x" id="sheetX" aria-label="Fechar">×</button></div><div class="learn">${html}</div></div></div>`;
  const close = () => { root.innerHTML = ''; document.removeEventListener('keydown', onKey); prev && prev.focus && prev.focus(); };
  const onKey = e => { if (e.key === 'Escape') close(); };
  $('scrim').addEventListener('click', e => { if (e.target.id === 'scrim') close(); });
  $('sheetX').onclick = close; $('sheetX').focus();
  document.addEventListener('keydown', onKey);
  root.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { close(); go(b.dataset.go); });
}
function toast(msg) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 1900); }

const MORE_ICON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="8" cy="8" r="6.2"/><path d="M8 7.2v4M8 4.9v.1"/></svg>';
const moreBtn = key => `<button class="more-btn" data-more="${key}">${MORE_ICON}Saiba mais</button>`;
function card(title, body, opts = {}) {
  return `<section class="card${opts.wide ? ' wide' : ''}"${opts.id ? ` id="${opts.id}"` : ''}><div class="card-h"><div>${opts.eyebrow ? `<span class="eyebrow">${opts.eyebrow}</span>` : ''}<h3>${title}</h3></div>${opts.more ? moreBtn(opts.more) : ''}</div>${opts.lede ? `<p class="lede">${opts.lede}</p>` : ''}${body}</section>`;
}
function seg(id, items, on) { return `<div class="seg" id="${id}" role="group">${items.map(([v, l]) => `<button data-v="${v}" class="${v == on ? 'on' : ''}" aria-pressed="${v == on}">${l}</button>`).join('')}</div>`; }
function bindSeg(id, fn) { const el = $(id); el.onclick = e => { const b = e.target.closest('button'); if (!b) return; el.querySelectorAll('button').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); }); fn(b.dataset.v); }; }

/* ---------- navegação: classes de fármacos (LABS, em main.js) e telas de cada classe ---------- */
let lab = 0, cur = 0, cleanup = null, lastW = innerWidth;
addEventListener('resize', () => { if (Math.abs(innerWidth - lastW) < 40) return; lastW = innerWidth; clearTimeout(window._rz); window._rz = setTimeout(() => show(cur, false), 200); });
function findScreen(id) { for (let l = 0; l < LABS.length; l++) { const i = LABS[l].screens.findIndex(s => s.id === id); if (i >= 0) return [l, i]; } return null; }
function go(id) { const f = findScreen(id); if (f) show(f[1], true, f[0]); }
function goLab(l) { const f = findScreen(store.get('tela.' + LABS[l].id, '')); show(f && f[0] === l ? f[1] : 0, false, l); }
function show(i, scroll, l = lab) {
  if (cleanup) { cleanup(); cleanup = null; }
  lab = l; cur = i;
  const L = LABS[l], SC = L.screens, S = SC[i];
  store.set('tela', S.id); store.set('tela.' + L.id, S.id);
  $('blocks').innerHTML = LABS.map((x, k) => `<button class="blk${k === l ? ' on' : ''}" data-l="${k}"${k === l ? ' aria-current="true"' : ''}><b>${x.n}</b><span>${x.d}</span></button>`).join('') + SOON.map(([n, d]) => `<button class="blk soon" disabled><em>Em breve</em><b>${n}</b><span>${d}</span></button>`).join('');
  $('subs').innerHTML = SC.map((s, k) => `<button class="sb${k === i ? ' on' : ''}" data-i="${k}"${k === i ? ' aria-current="page"' : ''}><i>${k + 1}</i>${s.t}</button>`).join('');
  $('labs').innerHTML = `<section class="lab" aria-labelledby="h-${S.id}"><div class="intro"><span class="eyebrow">${L.n} · tela ${i + 1} de ${SC.length}</span><h2 id="h-${S.id}">${S.h}</h2><p>${S.p}</p></div><div class="grid two" id="g"></div></section>`;
  cleanup = S.render($('g')) || null;
  $('labs').querySelectorAll('[data-more]').forEach(b => b.onclick = () => { const M = LEARN[b.dataset.more]; openSheet(M.t, M.h); });
  $('labs').querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  const pv = SC[i - 1], nx = SC[i + 1];
  $('labFoot').innerHTML = (pv ? `<button data-i="${i - 1}"><span>Anterior</span><b>${pv.t}</b></button>` : '') + (nx ? `<button class="nx" data-i="${i + 1}"><span>Próxima</span><b>${nx.t}</b></button>` : '');
  $('sitefootNote').textContent = L.foot;
  try { history.replaceState(null, '', '#' + S.id); } catch {}
  if (scroll) document.querySelector('.labnav').scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
}
