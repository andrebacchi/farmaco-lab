/* ===== Tela 3 · Mecanismo ===== */
const MECH = [
  { t: 'Chega ao nervo', s: 'Base e cátion em equilíbrio', txt: 'Injetado no tecido, o anestésico se divide entre a <b style="color:var(--b)">base não ionizada (B)</b> e o <b style="color:var(--ion)">cátion ionizado (BH⁺)</b>. A proporção depende do pKa do fármaco e do pH do tecido.', pos: [150, 52], ion: false },
  { t: 'Atravessa', s: 'A base cruza a membrana', txt: 'Só a <b style="color:var(--b)">forma não ionizada</b>, lipossolúvel, atravessa a bicamada lipídica. O cátion fica do lado de fora.', pos: [205, 120], ion: false },
  { t: 'Reioniza', s: 'No citoplasma, recebe H⁺', txt: 'No citoplasma, a base recebe um H⁺ e volta a ser <b style="color:var(--ion)">cátion</b>. É a forma ionizada que se liga ao canal com maior afinidade.', pos: [262, 205], ion: true },
  { t: 'Bloqueia', s: 'Liga-se ao poro do NaV', txt: 'O cátion entra no poro do <b>canal de sódio voltagem-dependente</b> pelo lado de dentro. Sem influxo de Na⁺, não há potencial de ação. A condução para quando cerca de <b>três nodos de Ranvier consecutivos</b> estão bloqueados, por isso o volume importa.', pos: [390, 158], ion: true },
];
function mechSVG() {
  let heads = '';
  for (let x = 6; x < 554; x += 14) { if (x > 352 && x < 428) continue; heads += `<circle cx="${x}" cy="106" r="6" class="head"/><circle cx="${x}" cy="138" r="6" class="head"/>`; }
  return `<svg class="ch" viewBox="0 0 560 260" id="mechSvg" role="img" aria-label="Anestésico local atravessando a membrana e bloqueando o canal de sódio">
  <rect x="0" y="0" width="560" height="100" class="cell-out"/><rect x="0" y="144" width="560" height="116" class="cell-in"/>
  <rect x="0" y="100" width="560" height="44" class="lip"/>${heads}
  <text x="10" y="18" class="zone">Meio extracelular</text><text x="10" y="252" class="zone">Citoplasma (axônio)</text>
  <path d="M352 92 h28 v60 h-28 z M400 92 h28 v60 h-28 z" class="chan"/>
  <text x="436" y="164" style="font-size:11px" id="chanLbl">canal NaV</text>
  <g id="naFlow"><circle cx="390" cy="30" r="6" class="mk" style="opacity:.55"/><text x="404" y="34" style="font-size:11px">Na⁺</text>
    <path d="M390 44 V 200" class="inkst" style="stroke-dasharray:4 5;opacity:.6" id="naPath"/><path d="M384 194 l6 8 l6 -8" class="inkst" style="opacity:.6" id="naHead"/></g>
  <g id="naX" style="opacity:0"><path d="M372 60 l36 36 M408 60 l-36 36" style="stroke:var(--bad);stroke-width:4;stroke-linecap:round"/></g>
  <g id="hPlus" style="opacity:0"><circle r="6" class="ink" style="opacity:.8"/><text class="mtxt" style="font-size:8px">H⁺</text></g>
  <g id="mm" style="transition:transform .7s cubic-bezier(.5,0,.3,1)"><circle r="11" class="mb" id="mmC"/><text class="mtxt" id="mmT">B</text></g>
  <g style="opacity:.9"><circle cx="70" cy="60" r="9" class="mi"/><text x="70" y="60" class="mtxt">+</text><circle cx="250" cy="40" r="9" class="mi"/><text x="250" y="40" class="mtxt">+</text><circle cx="300" cy="70" r="9" class="mb"/></g>
</svg>`;
}
const STATES = {
  rest: { t: 'Repouso (fechado)', aff: 0.15, affT: 'Baixa', txt: 'Poro fechado: o fármaco tem pouco acesso e pouca afinidade. Pouco efeito, exceto em concentração alta (bloqueio tônico).' },
  open: { t: 'Aberto', aff: 0.9, affT: 'Alta', txt: 'O poro se abre a cada potencial de ação e o cátion alcança o sítio de ligação pelo lado de dentro, bloqueando o poro.' },
  inact: { t: 'Inativado', aff: 0.85, affT: 'Alta', txt: 'Logo após abrir, o canal se inativa. O anestésico estabiliza esse estado e prolonga o período refratário: o canal demora mais a ficar disponível de novo.' },
};
function chanSVG(st) {
  const open = st !== 'rest', inact = st === 'inact';
  return `<svg class="ch" viewBox="0 0 300 170" role="img" aria-label="Canal de sódio no estado ${STATES[st].t}">
  <rect x="0" y="0" width="300" height="55" class="cell-out"/><rect x="0" y="105" width="300" height="65" class="cell-in"/><rect x="0" y="55" width="300" height="50" class="lip"/>
  <path d="M110 40 h30 v80 h-30 z M160 40 h30 v80 h-30 z" class="chan"/>
  ${open ? '' : '<rect x="136" y="44" width="28" height="10" rx="3" class="ink"/>'}
  ${inact ? '<line x1="150" y1="150" x2="150" y2="132" class="inkst"/><circle cx="150" cy="126" r="11" class="ink"/>' : ''}
  ${open && !inact ? '<circle cx="150" cy="20" r="6" class="mk" style="opacity:.6"/><path d="M150 30 V 150" class="inkst" style="stroke-dasharray:4 5;opacity:.6"/><path d="M144 144 l6 8 l6 -8" class="inkst" style="opacity:.6"/>' : ''}
  <text x="10" y="16" class="zone">Fora</text><text x="10" y="164" class="zone">Dentro</text>
  <text x="200" y="${inact ? 130 : st === 'rest' ? 50 : 24}" style="font-size:11px">${st === 'rest' ? 'comporta fechada' : inact ? 'inativação' : 'Na⁺ entra'}</text>
</svg>`;
}
function useDep(f, drug) {
  const P = drug === 'bupi' ? { kon: 0.12, tau: 2.0 } : { kon: 0.10, tau: 0.3 }, tonic = 0.08, N = 30, out = [];
  let b = tonic;
  for (let n = 0; n < N; n++) { out.push(1 - b); b = b + P.kon * (1 - b); b = tonic + (b - tonic) * Math.exp(-(1 / f) / P.tau); }
  return out;
}
function renderMecanismo(g) {
  let step = 0, st = 'open', f = 2, drug = 'lido', timer = null;
  g.innerHTML =
    card('O alvo está do lado de dentro', `<div class="steps" id="mSteps">${MECH.map((m, i) => `<button class="stp${i === 0 ? ' on' : ''}" data-i="${i}"><i>${i + 1}</i><b>${m.t}</b><span>${m.s}</span></button>`).join('')}</div>
      <figure class="fig" style="margin-top:12px">${mechSVG()}</figure>
      <div class="row" style="justify-content:space-between;margin-top:6px"><div class="legend" style="margin:0"><span><span class="mol b">B</span> não ionizada</span><span><span class="mol i">+</span> ionizada (BH⁺)</span></div><button class="btn small" id="mPlay">▶ Animar a sequência</button></div>
      <div class="insight" id="mTxt"></div>`, { wide: true, more: 'mecanismo' }) +
    card('Três estados do canal de sódio', `${seg('stSeg', [['rest', 'Repouso'], ['open', 'Aberto'], ['inact', 'Inativado']], 'open')}
      <figure class="fig" id="chFig" style="margin-top:10px;max-width:420px"></figure>
      <div class="sub">Afinidade do anestésico <span id="affT"></span></div><div class="meter"><i id="affBar" style="background:var(--accent)"></i></div>
      <p class="note" id="stTxt" style="font-size:13.5px;color:var(--fg)"></p><p class="note">Hipótese do receptor modulado (Hille, 1977).</p>`) +
    card('Quanto mais o nervo dispara, mais é bloqueado', `<div class="stack">
      <div class="range"><label for="fRange">Frequência de disparo</label><output id="fOut"></output><input type="range" id="fRange" min="1" max="30" step="1" value="2"></div>
      ${seg('drugSeg', [['lido', 'Lidocaína'], ['bupi', 'Bupivacaína']], 'lido')}</div>
      <div id="udFig" style="margin-top:10px"></div>
      <div class="tiles" style="margin-top:8px"><div class="tile"><span>Corrente no 1º estímulo</span><b id="ud1"></b></div><div class="tile acc"><span>Corrente no 30º estímulo</span><b id="udN"></b></div></div>
      <div class="insight" id="udTxt"></div><p class="note">Modelo simplificado, para visualizar a tendência. Cada barra é a corrente de sódio de um estímulo.</p>`, { more: 'usodep' });
  const setStep = i => {
    step = i; const m = MECH[i], mm = $('mm');
    mm.style.transform = `translate(${m.pos[0]}px, ${m.pos[1]}px)`;
    $('mmC').setAttribute('class', m.ion ? 'mi' : 'mb'); $('mmT').textContent = m.ion ? '+' : 'B';
    const hp = $('hPlus'); hp.style.opacity = i === 2 ? 1 : 0; hp.style.transform = `translate(${m.pos[0] + 16}px, ${m.pos[1] - 12}px)`;
    const blocked = i === 3;
    ['naPath', 'naHead'].forEach(id => $(id).style.opacity = blocked ? 0 : .6); $('naX').style.opacity = blocked ? 1 : 0;
    $('mTxt').innerHTML = m.txt;
    $('mSteps').querySelectorAll('.stp').forEach(b => b.classList.toggle('on', +b.dataset.i === i));
  };
  $('mSteps').onclick = e => { const b = e.target.closest('.stp'); if (b) { stop(); setStep(+b.dataset.i); } };
  const stop = () => { if (timer) { clearInterval(timer); timer = null; $('mPlay').textContent = '▶ Animar a sequência'; } };
  $('mPlay').onclick = () => {
    if (timer) return stop();
    setStep(0); $('mPlay').textContent = '■ Parar';
    timer = setInterval(() => { if (step >= 3) { stop(); return; } setStep(step + 1); }, reduced() ? 1600 : 1300);
  };
  setStep(0);
  const drawSt = () => { $('chFig').innerHTML = chanSVG(st); const S = STATES[st]; $('affT').textContent = S.affT; $('affBar').style.width = (S.aff * 100) + '%'; $('stTxt').textContent = S.txt; };
  bindSeg('stSeg', v => { st = v; drawSt(); }); drawSt();
  const drawUD = () => {
    const y = useDep(f, drug), W = cw('udFig'), H = 190, L = 40, B = 160, bw = (W - L - 10) / y.length;
    let s = `<svg class="ch" viewBox="0 0 ${W} ${H}" role="img" aria-label="Corrente de sódio a cada estímulo">`;
    [0, 50, 100].forEach(v => { const yy = B - v / 100 * 140; s += `<line x1="${L}" x2="${W - 10}" y1="${yy}" y2="${yy}" class="gr"/><text x="${L - 6}" y="${yy + 4}" text-anchor="end">${v}%</text>`; });
    y.forEach((v, i) => { const h = v * 140; s += `<rect x="${L + i * bw + 2}" y="${B - h}" width="${bw - 4}" height="${h}" rx="2" class="bar"/>`; });
    s += `<text x="${L}" y="${H - 8}">1º estímulo</text><text x="${W - 10}" y="${H - 8}" text-anchor="end">30º estímulo</text></svg>`;
    $('udFig').innerHTML = s; $('fOut').textContent = f + ' Hz';
    $('ud1').textContent = pc(y[0], 0); $('udN').textContent = pc(y[y.length - 1], 0);
    const drop = 1 - y[y.length - 1] / y[0];
    $('udTxt').innerHTML = drug === 'lido'
      ? (f <= 3 ? `A ${f} Hz, a lidocaína se solta do canal entre um estímulo e outro: quase não acumula bloqueio. Aumente a frequência.` : `A ${f} Hz, não dá tempo de o canal se livrar do fármaco entre os estímulos: o bloqueio acumula (${pc(drop, 0)} a menos de corrente). Fibras que disparam muito, como as nociceptivas numa lesão, são mais bloqueadas.`)
      : `A bupivacaína <b>entra rápido e sai devagar</b>: acumula bloqueio mesmo em frequências baixas, como a do coração (~1 a 2 Hz). É por isso que ela é a mais cardiotóxica.`;
  };
  $('fRange').oninput = e => { f = +e.target.value; drawUD(); };
  bindSeg('drugSeg', v => { drug = v; drawUD(); }); drawUD();
  return stop;
}
