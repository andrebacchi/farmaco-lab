/* ===== Tela 4 · pH e ionização (simulador) ===== */
const PH_PRESETS = [[7.4, 'Tecido normal'], [6.9, 'Inflamação'], [6.4, 'Tecido infectado'], [5.8, 'Abscesso']];
const PH_AGENTS = ['lido', 'mepi', 'prilo', 'arti', 'bupi', 'ropi', 'tetra', 'cloro', 'proc', 'benzo'];
const SOLN = [[6.5, 'Solução simples', 'pH ~6,5'], [4.5, 'Com adrenalina', 'pH ~4,5'], [7.3, 'Tamponada com bicarbonato', 'pH ~7,3']];

/* pseudoaleatório fixo, para as moléculas não pularem de lugar a cada ajuste */
function prng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const R = prng(7);
const N_OUT = 30, N_IN = 48;   // cada bolinha de fora ≈ 3,3% da dose
const OUT_POS = Array.from({ length: N_OUT }, (_, i) => [20 + (i % 10) * 30 + R() * 10, 30 + Math.floor(i / 10) * 34 + R() * 8]);
const IN_POS = Array.from({ length: N_IN }, (_, i) => [16 + (i % 12) * 24 + R() * 6, 186 + Math.floor(i / 12) * 28 + R() * 6]);

function verdictFor(rel, pHo, a) {
  if (a.id === 'benzo') return ['good', 'Quase toda não ionizada', 'Com pKa de 3,5, a benzocaína fica não ionizada em qualquer pH do corpo. Atravessa bem, mas é pouco hidrossolúvel: por isso só serve como tópico.'];
  if (rel >= 1.15) return ['good', 'Início mais rápido', 'O tecido está mais alcalino que o normal: sobra mais forma não ionizada para atravessar a membrana.'];
  if (rel >= 0.8) return ['good', 'Latência habitual', 'É o cenário esperado para este agente: uma fração suficiente da dose atravessa a membrana e o bloqueio se instala no tempo habitual.'];
  if (rel >= 0.4) return ['warn', 'Latência maior', 'Menos base disponível para atravessar a membrana: o bloqueio demora mais e pode ficar incompleto.'];
  if (rel >= 0.15) return ['bad', 'Bloqueio lento e fraco', 'Só uma pequena parte da dose chega ao lado de dentro. Aumentar a dose no mesmo local eleva a carga sistêmica sem resolver o problema.'];
  return ['bad', 'Falha provável', 'Quase todo o anestésico fica ionizado e preso do lado de fora. Prefira um bloqueio regional longe do foco e trate a infecção.'];
}
function renderPH(g) {
  const saved = store.get('ph', {});
  let aid = (AG[saved.a] || saved.a === 'custom') ? saved.a : 'lido', pKa = saved.k || 7.9, pHo = saved.o || 7.4, pHi = 7.2, sol = 6.5, raf = 0, t0 = performance.now();
  g.innerHTML =
    `<section class="card" style="min-width:0"><div class="card-h"><div><span class="eyebrow">Simulador</span><h3>Quanto do anestésico consegue entrar?</h3></div>${moreBtn('ph')}</div>
      <div class="sub">Anestésico</div><div class="chips wrapc" id="agChips">${PH_AGENTS.map(k => `<button class="chip" data-a="${k}">${AG[k].n}<small>${nf(AG[k].pKa, 1)}</small></button>`).join('')}</div>
      <div class="range" style="margin-top:12px"><label for="pkR">pKa do fármaco</label><output id="pkO"></output><input type="range" id="pkR" min="3" max="10" step="0.1"></div>
      <div class="sub">pH do tecido</div><div class="chips wrapc" id="phChips">${PH_PRESETS.map(([v, l]) => `<button class="chip" data-p="${v}">${l}<small>${nf(v, 1)}</small></button>`).join('')}</div>
      <div class="range" style="margin-top:6px"><label for="phR">pH extracelular</label><output id="phO"></output><input type="range" id="phR" min="5" max="8" step="0.1"></div>
      <div class="tiles" style="margin-top:14px">
        <div class="tile b"><span>Não ionizada (B)</span><b id="tB"></b><small>atravessa a membrana</small></div>
        <div class="tile i"><span>Ionizada (BH⁺)</span><b id="tI"></b><small>fica do lado de fora</small></div>
        <div class="tile acc"><span>Entraram no axônio</span><b id="tRel"></b><small id="tRelS"></small></div>
      </div>
      <div class="verdict" id="verd" style="margin-top:10px"></div>
      <div class="sub" style="margin-top:16px">Proporção entre as formas</div>
      <div class="ratio" id="ratioBar"></div><p class="note" id="ratioTxt" style="font-size:13.5px;color:var(--fg)"></p>
    </section>` +
    `<section class="card" style="min-width:0"><div class="card-h"><div><span class="eyebrow">Ao vivo</span><h3>Transporte pela membrana do axônio</h3></div></div>
      <div id="memFig"></div>
      <div class="legend"><span><span class="mol b">B</span> não ionizada, lipossolúvel</span><span><span class="mol i">+</span> ionizada, hidrossolúvel</span><span><i style="background:var(--accent);height:10px;width:10px;border-radius:2px"></i> canal NaV</span></div>
      <p class="note" id="memNote"></p>
      <div class="hh" id="hh" aria-live="polite"></div>
      <details class="fold"><summary>E dentro do axônio?</summary><div>
        <div class="range"><label for="piR">pH intracelular</label><output id="piO"></output><input type="range" id="piR" min="6.8" max="7.4" step="0.1" value="7.2"></div>
        <p class="note">Dentro do axônio o pH fica perto de 7,2. A base que entra volta, em boa parte, a ser cátion: a forma que se liga ao canal e que não consegue atravessar a membrana de volta. Mude o pH intracelular e veja a divisão entre B e BH⁺ dentro do axônio mudar.</p></div></details></section>` +
    card('Ionização em toda a faixa de pH', `<div id="curveFig"></div><div class="legend"><span><i style="background:var(--b)"></i>não ionizada</span><span><i class="dash" style="background:var(--ion)"></i>ionizada</span><span><i style="background:var(--fg);width:8px;height:8px;border-radius:50%"></i>pH atual</span></div>
      <p class="note">No pH igual ao pKa, metade está em cada forma. Cada unidade de pH abaixo do pKa divide a forma não ionizada por cerca de 10.</p>`) +
    card('Todos os agentes no mesmo pH', `<div id="cmpFig"></div><p class="note">Quanto mais perto o pKa do pH do tecido, maior a fração não ionizada e mais rápido o início. Exceção: a cloroprocaína começa rápido porque é usada a 3%.</p>`, { lede: 'Fração não ionizada de cada anestésico no pH escolhido acima.' }) +
    card('E dentro da seringa?', `<div class="chips wrapc" id="solChips">${SOLN.map(([v, l, s]) => `<button class="chip" data-s="${v}">${l}<small>${s}</small></button>`).join('')}</div>
      <div class="tiles" style="margin-top:10px"><div class="tile b"><span>Não ionizada no frasco</span><b id="sB"></b><small id="sBs"></small></div></div>
      <div class="insight" style="margin-top:10px">As soluções com adrenalina são acidificadas para conservar a adrenalina: no frasco, quase tudo está ionizado, e a injeção arde. Depois de injetada, a solução é tamponada pelo tecido. Tamponar com bicarbonato (1 mL de bicarbonato 8,4% para 10 mL de lidocaína) <b>reduz a dor da injeção</b>. Se ajuda a vencer a acidez de um tecido infectado, a evidência é incerta.</div>
      <p class="note">Valores de pH aproximados; variam entre fabricantes. A bupivacaína precipita com bicarbonato.</p>`, { lede: 'O frasco também tem pH, e ele é ácido.' }) +
    card('Caso: paroníquia que “não pega”', `<p style="margin:0 0 10px;font-size:15px">Paciente com paroníquia (infecção ao redor da unha) precisa de drenagem. Foram infiltrados 3 mL de lidocaína 1% ao redor do foco. Dez minutos depois, ainda sente tudo.</p>
      <details class="fold" open><summary>O que o pH do tecido faz com o anestésico?</summary><div>Coloque o pH em <button class="lnk" style="border:0;background:none;padding:0" data-setph="6.4">6,4</button> no simulador: a fração não ionizada da lidocaína cai de cerca de 24% para 3%. Quase todo o fármaco fica ionizado do lado de fora da membrana.</div></details>
      <details class="fold"><summary>Por que mais dose no mesmo local não resolve?</summary><div>O problema não é a quantidade injetada, e sim a fração que atravessa. Além do pH: o edema dilui o fármaco, a hiperemia o remove mais depressa e os nociceptores sensibilizados expressam mais NaV1.8, menos sensível à lidocaína. Repetir doses só aumenta a carga sistêmica.</div></details>
      <details class="fold"><summary>Que alternativa existe?</summary><div><b>Bloqueio regional longe do foco:</b> aqui, o bloqueio digital na base do dedo, em tecido de pH normal. Em odontologia, o bloqueio do nervo alveolar inferior em vez da infiltração local. E tratar a infecção (drenagem).</div></details>
      <div class="sub" style="margin-top:16px">Teste rápido</div><p class="q" style="font-size:18px">Qual conduta tem mais probabilidade de funcionar?</p>
      <div class="opts" id="quizOpts">
        <button class="opt" data-ok="0" data-fb="Não. A fração não ionizada continua baixa, e a carga sistêmica sobe.">Repetir a infiltração no mesmo local</button>
        <button class="opt" data-ok="0" data-fb="Não. A bupivacaína tem pKa ainda mais alto (8,1): fica ainda mais ionizada no tecido ácido, e é mais tóxica.">Trocar por bupivacaína no mesmo local</button>
        <button class="opt" data-ok="1" data-fb="Isso. Longe do foco, o pH é normal e o anestésico atravessa a membrana do nervo que inerva a região.">Bloqueio digital, longe do foco</button>
        <button class="opt" data-ok="0" data-fb="Não. Mais concentração aumenta a toxicidade sem mudar a proporção entre as formas.">Usar lidocaína 2% no mesmo local</button></div><div id="quizFb"></div>`);

  const memBase = (() => {
    let heads = ''; for (let x = 6; x < 400; x += 13) { if (x > 318 && x < 372) continue; heads += `<circle cx="${x}" cy="136" r="5.5" class="head"/><circle cx="${x}" cy="164" r="5.5" class="head"/>`; }
    return `<rect x="0" y="0" width="400" height="132" class="cell-out"/><rect x="0" y="168" width="400" height="152" class="cell-in"/><rect x="0" y="132" width="400" height="36" class="lip"/>${heads}
      <path d="M322 120 h18 v60 h-18 z M360 120 h18 v60 h-18 z" class="chan" style="fill:var(--accent);fill-opacity:.25"/>
      <text x="8" y="15" class="zone2" id="zOut"></text><text x="8" y="313" class="zone2" id="zIn"></text><text x="8" y="154" class="memlbl">membrana do axônio</text>`;
  })();
  $('memFig').innerHTML = `<svg class="ch" viewBox="0 0 400 320" role="img" aria-label="Moléculas de anestésico dos dois lados da membrana" id="memSvg">${memBase}<g id="mols"></g><g id="trav" style="opacity:0"><circle r="8" class="mb"/><text class="mtxt">B</text></g></svg>`;
  let prevHH = {};
  const fmtR = r => r >= 10 ? nf(r, 0) : r >= 1 ? nf(r, 1) : r >= 0.01 ? nf(r, 3) : nf(r, 4);
  const drawHH = fb => {
    const d = pHo - pKa, ratio = Math.pow(10, d), ch = k => prevHH[k] !== undefined && prevHH[k] !== ({ ph: pHo, pk: pKa })[k] ? ' pulse' : '';
    const words = ratio < 1 ? `Para cada <b class="cb">1</b> molécula não ionizada, há <b class="ci">${fmtR(1 / ratio)}</b> ionizadas.` : `Para cada <b class="ci">1</b> molécula ionizada, há <b class="cb">${fmtR(ratio)}</b> não ionizadas.`;
    $('hh').innerHTML = `<div class="hh-h"><span class="eyebrow">Henderson-Hasselbalch</span><span class="note" style="margin:0">base fraca</span></div>
      <div class="hh-row hh-sym"><span>pH</span><i>=</i><span>pKa</span><i>+</i><span>log</span><span class="frac"><span class="cb">[B]</span><span class="ci">[BH⁺]</span></span></div>
      <div class="hh-row hh-num"><span class="v vph${ch('ph')}">${nf(pHo, 1)}</span><i>=</i><span class="v vpk${ch('pk')}">${nf(pKa, 1)}</span><i>+</i><span>log</span><span class="frac"><span class="cb">[B]</span><span class="ci">[BH⁺]</span></span></div>
      <div class="hh-row hh-sol"><span class="frac"><span class="cb">[B]</span><span class="ci">[BH⁺]</span></span><i>=</i><span>10<sup>${nf(pHo, 1)} − ${nf(pKa, 1)}</sup></span><i>=</i><span>10<sup>${d >= 0 ? '' : '−'}${nf(Math.abs(d), 1)}</sup></span><i>=</i><span class="v vr">${fmtR(ratio)}</span></div>
      <div class="hh-row hh-pct"><span>não ionizada</span><i>=</i><span class="frac"><span>${fmtR(ratio)}</span><span>1 + ${fmtR(ratio)}</span></span><i>=</i><span class="v vb">${pc(fb)}</span></div>
      <p class="hh-words">${words}</p>`;
    prevHH = { ph: pHo, pk: pKa };
    const pB = fb * 100;
    $('ratioBar').innerHTML = `<i class="rb" style="width:${pB}%"></i><i class="ri" style="width:${100 - pB}%"></i><span class="rl" style="left:6px">${pc(fb)}</span><span class="rr">${pc(1 - fb)}</span>`;
    $('ratioTxt').innerHTML = `<span class="mol b">B</span> não ionizada ${pc(fb)} · <span class="mol i">+</span> ionizada ${pc(1 - fb)}`;
  };
  const mol = (x, y, ion, i) => `<g data-j="${i}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="7" class="${ion ? 'mi' : 'mb'}"/><text class="mtxt">${ion ? '+' : 'B'}</text></g>`;

  const update = () => {
    const a = AG[aid] || { n: 'Personalizado' }, fb = fracB(pKa, pHo), fi = fracB(pKa, pHi);
    // retrato dos primeiros minutos: 30 moléculas injetadas; a entrada é proporcional à forma B disponível fora
    // (C calibrado para a lidocaína no pH 7,4 ter cerca de 40% dentro)
    const C = 2.13, entered = po => 1 - Math.exp(-C * fracB(pKa, po));
    const E = entered(pHo), rel = E / entered(7.4);
    store.set('ph', { a: aid, k: pKa, o: pHo });
    $('pkR').value = pKa; $('pkO').textContent = nf(pKa, 1); $('phR').value = pHo; $('phO').textContent = nf(pHo, 1); $('piO').textContent = nf(pHi, 1);
    $('agChips').querySelectorAll('.chip').forEach(c => c.classList.toggle('on', c.dataset.a === aid));
    $('phChips').querySelectorAll('.chip').forEach(c => c.classList.toggle('on', Math.abs(+c.dataset.p - pHo) < .01));
    $('tB').textContent = pc(fb); $('tI').textContent = pc(1 - fb);
    const inN = Math.round(N_OUT * E), outN = N_OUT - inN, outB = Math.round(outN * fb), inB = Math.round(inN * fi);
    $('tRel').textContent = `${inN} de ${N_OUT}`;
    $('tRelS').textContent = Math.abs(pHo - 7.4) < .01 ? 'nos primeiros minutos' : rel < 1 ? `${nf(1 / rel, 1)} vezes menos que no pH 7,4` : `${nf(rel, 1)} vezes mais que no pH 7,4`;
    const [cls, t, s] = verdictFor(rel, pHo, a.id ? a : {});
    $('verd').className = 'verdict ' + cls; $('verd').innerHTML = `<b>${t}</b><span>${s}</span><span class="note" style="margin:2px 0 0">Leitura didática e qualitativa.</span>`;
    drawHH(fb);
    // moléculas: fora, 30 bolinhas na proporção B : BH⁺; dentro, a mesma concentração de B e o cátion em equilíbrio com o pH intracelular
    let h = ''; OUT_POS.slice(0, outN).forEach(([x, y], i) => { h += mol(x, y, i >= outB, 'o' + i); });
    IN_POS.slice(0, inN).forEach(([x, y], i) => { const k = i - inB, bound = k >= 0 && k < 2; h += mol(bound ? 350 : x, bound ? 190 + k * 20 : y, k >= 0, 'i' + i); });
    $('mols').innerHTML = h;
    const cnt = (b, i) => `<tspan class="tb">${b} B</tspan> + <tspan class="ti">${i} BH⁺</tspan>`;
    $('zOut').innerHTML = `<tspan class="zt">Fora</tspan> · pH ${nf(pHo, 1)} · ${cnt(outB, outN - outB)}`;
    $('zIn').innerHTML = `<tspan class="zt">Dentro</tspan> · pH ${nf(pHi, 1)} · ${cnt(inB, inN - inB)}`;
    $('memNote').innerHTML = `Acompanhe <b>30 moléculas</b> de anestésico. Só a forma <b style="color:var(--b)">B</b> atravessa a membrana, e ela entra mais depressa quanto mais B houver do lado de fora. Dentro do axônio, ${a.id === 'benzo' ? 'quase nada reioniza' : 'parte vira <b style="color:var(--ion)">BH⁺</b>, que não consegue voltar e ocupa o canal'}. ${inN <= 2 ? 'Neste pH, quase todas ficam presas do lado de fora.' : `Resultado: ${inN} das 30 terminam dentro do axônio.`}`;
    drawCurve(); drawCmp();
  };
  const drawCurve = () => {
    const W = cw('curveFig'), H = 230, L = 44, Rr = 12, T = 14, B = 190, x = p => L + (p - 5) / 4 * (W - L - Rr), y = f => B - f * (B - T);
    let s = `<svg class="ch" viewBox="0 0 ${W} ${H}" role="img" aria-label="Fração não ionizada conforme o pH">`;
    [0, .25, .5, .75, 1].forEach(v => s += `<line x1="${L}" x2="${W - Rr}" y1="${y(v)}" y2="${y(v)}" class="gr"/><text x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${v * 100}%</text>`);
    for (let p = 5; p <= 9; p++) s += `<text x="${x(p)}" y="${B + 18}" text-anchor="middle">${p}</text>`;
    s += `<text x="${W - Rr}" y="${H - 2}" text-anchor="end">pH</text>`;
    s += `<rect x="${x(7.35)}" y="${T}" width="${x(7.45) - x(7.35)}" height="${B - T}" class="soft" style="opacity:.9"/>`;
    let pb = '', pi = ''; for (let p = 5; p <= 9.001; p += 0.05) { const f = fracB(pKa, p); pb += (pb ? 'L' : 'M') + x(p).toFixed(1) + ' ' + y(f).toFixed(1); pi += (pi ? 'L' : 'M') + x(p).toFixed(1) + ' ' + y(1 - f).toFixed(1); }
    s += `<path d="${pi}" class="curveI"/><path d="${pb}" class="curveB"/>`;
    if (pKa >= 5 && pKa <= 9) s += `<line x1="${x(pKa)}" x2="${x(pKa)}" y1="${T}" y2="${B}" class="ax" style="stroke-dasharray:3 4"/><text x="${x(pKa) + 5}" y="${T + 12}">pKa ${nf(pKa, 1)}</text>`;
    const f = fracB(pKa, pHo);
    s += `<line x1="${x(pHo)}" x2="${x(pHo)}" y1="${T}" y2="${B}" style="stroke:var(--fg);stroke-width:1.4"/><circle cx="${x(pHo)}" cy="${y(f)}" r="6" class="mb" style="stroke:var(--surface);stroke-width:2"/><circle cx="${x(pHo)}" cy="${y(1 - f)}" r="6" class="mi" style="stroke:var(--surface);stroke-width:2"/>`;
    const lx = x(pHo) > W - 120 ? x(pHo) - 8 : x(pHo) + 8, anc = x(pHo) > W - 120 ? 'end' : 'start';
    s += `<text x="${lx}" y="${clamp(y(f) - 8, T + 10, B - 4)}" text-anchor="${anc}" class="lbl" style="fill:var(--b)">${pc(f)}</text>`;
    s += `<text x="${x(7.4)}" y="${H - 2}" text-anchor="middle" style="font-size:10px">faixa fisiológica</text>`;
    $('curveFig').innerHTML = s + '</svg>';
  };
  const drawCmp = () => {
    const rows = PH_AGENTS.map(k => ({ k, n: AG[k].n, p: AG[k].pKa, f: fracB(AG[k].pKa, pHo) })).sort((a, b) => b.f - a.f);
    const W = cw('cmpFig'), rh = 24, L = W < 420 ? 118 : 150, Rr = 50, H = rows.length * rh + 6;
    let s = `<svg class="ch" viewBox="0 0 ${W} ${H}" role="img" aria-label="Fração não ionizada de cada agente">`;
    rows.forEach((r, i) => { const yy = i * rh + 4, w = Math.max(2, r.f * (W - L - Rr)), me = r.k === aid;
      s += `<text x="${L - 8}" y="${yy + 15}" text-anchor="end" class="${me ? 'lbl' : ''}">${r.n} <tspan style="font-family:var(--f-mono);font-size:10.5px">${nf(r.p, 1)}</tspan></text><rect x="${L}" y="${yy + 3}" width="${W - L - Rr}" height="16" rx="4" class="soft"/><rect x="${L}" y="${yy + 3}" width="${w}" height="16" rx="4" class="barb" style="opacity:${me ? 1 : .45}"/><text x="${L + w + 6}" y="${yy + 15}" class="${me ? 'lbl' : ''}">${pc(r.f)}</text>`; });
    $('cmpFig').innerHTML = `<div class="tw">${s}</svg></div>`;
  };
  const drawSol = () => { const f = fracB(pKa, sol); $('sB').textContent = pc(f); $('sBs').textContent = `${AG[aid] ? AG[aid].n : 'agente'} em pH ${nf(sol, 1)}`; $('solChips').querySelectorAll('.chip').forEach(c => c.classList.toggle('on', +c.dataset.s === sol)); };
  $('agChips').onclick = e => { const c = e.target.closest('.chip'); if (!c) return; aid = c.dataset.a; pKa = AG[aid].pKa; update(); drawSol(); };
  $('phChips').onclick = e => { const c = e.target.closest('.chip'); if (!c) return; pHo = +c.dataset.p; update(); };
  $('solChips').onclick = e => { const c = e.target.closest('.chip'); if (!c) return; sol = +c.dataset.s; drawSol(); };
  $('pkR').oninput = e => { pKa = +e.target.value; const m = AGENTS.find(a => a.pKa === pKa && a.id === aid); if (!m) aid = 'custom'; update(); drawSol(); };
  $('phR').oninput = e => { pHo = +e.target.value; update(); };
  $('piR').oninput = e => { pHi = +e.target.value; update(); };
  g.querySelectorAll('[data-setph]').forEach(b => b.onclick = () => { pHo = +b.dataset.setph; update(); $('phR').scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'center' }); });
  $('quizOpts').onclick = e => { const b = e.target.closest('.opt'); if (!b) return; $('quizOpts').querySelectorAll('.opt').forEach(o => o.classList.remove('right', 'wrong')); b.classList.add(b.dataset.ok === '1' ? 'right' : 'wrong'); $('quizFb').innerHTML = `<div class="fb">${b.dataset.fb}</div>`; };
  update(); drawSol();

  // movimento: agitação térmica e uma base atravessando de vez em quando
  const tick = now => {
    const t = (now - t0) / 1000, mols = $('mols'); if (!mols) return;
    mols.querySelectorAll('g').forEach((el, i) => { const [a, b] = el.getAttribute('transform').match(/-?[\d.]+/g).map(Number); if (!el.dataset.bx) { el.dataset.bx = a; el.dataset.by = b; }
      el.setAttribute('transform', `translate(${(+el.dataset.bx + 3 * Math.sin(t * 1.3 + i)).toFixed(1)} ${(+el.dataset.by + 3 * Math.cos(t * 1.1 + i * 1.7)).toFixed(1)})`); });
    const tr = $('trav'), fb = fracB(pKa, pHo), cyc = t % 2.6;
    if (fb > 0.02 && cyc < 1.6) { const k = cyc / 1.6, x0 = 60 + (Math.floor(t / 2.6) * 97) % 220; tr.style.opacity = k < .1 ? k * 10 : k > .9 ? (1 - k) * 10 : 1; tr.setAttribute('transform', `translate(${x0 + 20 * k} ${60 + 150 * k})`); }
    else tr.style.opacity = 0;
    raf = requestAnimationFrame(tick);
  };
  if (!reduced()) raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}
