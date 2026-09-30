/* ===== Tela 5 · Fibras ===== */
const FIBERS = [
  { k: 'B', n: 'Autonômico', f: 'Fibras B', on: 10, off: 92 },
  { k: 'C', n: 'Dor e temperatura', f: 'C e Aδ', on: 20, off: 82 },
  { k: 'Ab', n: 'Tato e pressão', f: 'Aβ', on: 32, off: 72, low: 'part' },
  { k: 'Aa', n: 'Propriocepção e motor', f: 'Aα', on: 44, off: 62, low: 'none' },
];
function painCurve(t, blk) {
  const first = Math.exp(-Math.pow((t - 0.25) / 0.09, 2));
  const u = (t - 0.7) / 0.55, second = t > 0.7 ? 0.72 * u * Math.exp(1 - u) : 0;
  return { first: blk === 'ad' ? 0 : first, second: blk === 'c' ? 0 : second, g1: first, g2: second };
}
function renderFibras(g) {
  let tm = 54, conc = 'hi', blk = 'none', dt = 30;
  g.innerHTML =
    card('Nem toda fibra é igual', `<div class="tw"><table class="t"><thead><tr><th>Fibra</th><th>Mielina</th><th>Diâmetro (µm)</th><th>Velocidade (m/s)</th><th style="text-align:left">Função principal</th></tr></thead><tbody>
      <tr><td><b>Aα</b></td><td>Espessa</td><td>12–20</td><td>70–120</td><td style="text-align:left;white-space:normal">Motora e propriocepção</td></tr>
      <tr><td><b>Aβ</b></td><td>Espessa</td><td>5–12</td><td>30–70</td><td style="text-align:left;white-space:normal">Tato e pressão</td></tr>
      <tr><td><b>Aδ</b></td><td>Fina</td><td>1–5</td><td>5–30</td><td style="text-align:left;white-space:normal">Dor “rápida”, frio</td></tr>
      <tr><td><b>B</b></td><td>Fina</td><td>&lt; 3</td><td>3–15</td><td style="text-align:left;white-space:normal">Autonômica pré-ganglionar</td></tr>
      <tr><td><b>C</b></td><td>Ausente</td><td>0,3–1,3</td><td>0,5–2</td><td style="text-align:left;white-space:normal">Dor “lenta”, calor, autonômica pós-ganglionar</td></tr>
      </tbody></table></div><p class="note">Classificação de Erlanger-Gasser; valores aproximados. Fibras finas, pouco ou não mielinizadas, que disparam em alta frequência tendem a ser bloqueadas primeiro.</p>`, { wide: true }) +
    card('O que se perde primeiro', `<div class="stack"><div class="range"><label for="tmR">Tempo depois da injeção</label><output id="tmO"></output><input type="range" id="tmR" min="0" max="100" value="54"></div>
      ${seg('concSeg', [['hi', 'Concentração usual'], ['lo', 'Baixa concentração']], 'hi')}</div>
      <div class="fib" id="fib" style="margin-top:14px"></div><div class="insight" id="fibTxt"></div>`, { more: 'fibras' }) +
    card('Primeira dor e segunda dor', `${seg('painSeg', [['none', 'Sem bloqueio'], ['ad', 'Bloquear Aδ'], ['c', 'Bloquear C']], 'none')}<div id="painFig" style="margin-top:10px"></div><div class="insight" id="painTxt"></div>`,
      { lede: 'Ao bater o dedo: primeiro a pontada, depois a queimação. Cada uma viaja por uma fibra diferente.' }) +
    card('O anestésico entra de fora para dentro', `<div class="range"><label for="dtR">Tempo de difusão</label><output id="dtO"></output><input type="range" id="dtR" min="0" max="100" value="30"></div>
      <div class="row" style="align-items:flex-start;gap:16px;margin-top:8px"><div style="flex:0 1 220px;min-width:160px" id="nerveFig"></div><div style="flex:1 1 220px;min-width:0" id="nerveTxt"></div></div>`,
      { wide: true, lede: 'Num nervo misto, as fibras da periferia do feixe (manto) inervam regiões proximais; as do centro (núcleo), regiões distais.', more: 'manto' });
  const drawFib = () => {
    $('tmO').textContent = tm < 45 ? 'instalação' : tm <= 58 ? 'efeito máximo' : 'recuperação';
    let h = ''; const lost = [];
    FIBERS.forEach(F => {
      let v = tm < 58 ? clamp((tm - F.on) / 6, 0, 1) : clamp((F.off - tm) / 6, 0, 1);
      let st = v > 0.95 ? 'on' : v > 0.05 ? 'part' : 'off';
      if (conc === 'lo') { if (F.low === 'none') { v = 0; st = 'off'; } else if (F.low === 'part') { v = Math.min(v, .4); st = v > .05 ? 'part' : 'off'; } }
      if (st === 'on') lost.push(F.n.toLowerCase());
      h += `<div class="fr"><div><b>${F.n}</b><small>${F.f}</small></div><div class="bar"><i style="width:${v * 100}%"></i></div><div class="st ${st}">${st === 'on' ? 'Bloqueado' : st === 'part' ? 'Parcial' : 'Preservado'}</div></div>`;
    });
    $('fib').innerHTML = h;
    $('fibTxt').innerHTML = conc === 'lo'
      ? '<b>Baixa concentração:</b> há analgesia com pouco bloqueio motor. É o princípio da analgesia de parto com ropivacaína ou bupivacaína diluídas.'
      : tm < 58 ? 'O bloqueio se instala na ordem <b>autonômico → dor e temperatura → tato → motor</b>. A hipotensão precoce na raquianestesia vem do bloqueio simpático (fibras B).'
      : 'A recuperação segue, em geral, a <b>ordem inversa</b>: o movimento volta antes da sensibilidade dolorosa.';
  };
  $('tmR').oninput = e => { tm = +e.target.value; drawFib(); };
  bindSeg('concSeg', v => { conc = v; drawFib(); }); drawFib();
  const drawPain = () => {
    const W = cw('painFig'), H = 190, L = 40, Rr = 12, T = 12, B = 160, x = t => L + t / 3 * (W - L - Rr), y = v => B - v * (B - T);
    let s = `<svg class="ch" viewBox="0 0 ${W} ${H}" role="img" aria-label="Intensidade da dor ao longo do tempo">`;
    s += `<line x1="${L}" x2="${W - Rr}" y1="${B}" y2="${B}" class="ax"/><line x1="${L}" x2="${L}" y1="${T}" y2="${B}" class="ax"/>`;
    [0, 1, 2, 3].forEach(t => s += `<text x="${x(t)}" y="${B + 16}" text-anchor="middle">${t} s</text>`);
    s += `<text x="${L - 6}" y="${T + 10}" text-anchor="end" style="font-size:10.5px">dor</text>`;
    let pg = '', pa = '';
    for (let t = 0; t <= 3.0001; t += 0.02) { const c = painCurve(t, blk); pg += (pg ? 'L' : 'M') + x(t).toFixed(1) + ' ' + y(Math.max(c.g1, c.g2)).toFixed(1); pa += (pa ? 'L' : 'M') + x(t).toFixed(1) + ' ' + y(Math.max(c.first, c.second)).toFixed(1); }
    s += `<path d="${pg}" class="ghost" style="stroke-dasharray:4 4"/><path d="${pa} L ${x(3)} ${B} L ${L} ${B} Z" style="fill:var(--accent);opacity:.14"/><path d="${pa}" class="curveA"/>`;
    s += `<text x="${x(0.25)}" y="${y(1) - 2 + 12}" text-anchor="start" dx="10" class="${blk === 'ad' ? '' : 'lbl'}">1ª dor · Aδ</text><text x="${x(1.25)}" y="${y(.72) - 8}" text-anchor="middle" class="${blk === 'c' ? '' : 'lbl'}">2ª dor · C</text></svg>`;
    $('painFig').innerHTML = s;
    $('painTxt').innerHTML = blk === 'none' ? '<b>Primeira dor (Aδ):</b> rápida, aguda, bem localizada. <b>Segunda dor (C):</b> lenta, difusa, em queimação, persiste depois do estímulo.'
      : blk === 'ad' ? 'Sem as fibras Aδ, some a pontada inicial; a queimação tardia continua.' : 'Sem as fibras C, some a dor tardia em queimação; a pontada inicial continua.';
  };
  bindSeg('painSeg', v => { blk = v; drawPain(); }); drawPain();
  const drawNerve = () => {
    const rf = 86 * (1 - dt / 100);
    $('dtO').textContent = dt < 20 ? 'recém-injetado' : dt < 70 ? 'difundindo' : 'bloqueio completo';
    $('nerveFig').innerHTML = `<svg class="ch" viewBox="0 0 200 200" role="img" aria-label="Corte transversal de um nervo com o anestésico difundindo da periferia para o centro">
      <circle cx="100" cy="100" r="96" class="lip"/><circle cx="100" cy="100" r="88" class="soft"/>
      <circle cx="100" cy="100" r="88" style="fill:var(--accent);opacity:.28"/><circle cx="100" cy="100" r="${Math.max(0, rf)}" class="soft"/>
      <circle cx="100" cy="100" r="58" class="dotst"/><text x="100" y="66" text-anchor="middle" style="font-size:10px">manto</text><text x="100" y="104" text-anchor="middle" class="lbl" style="font-size:11px">núcleo</text>
      <text x="100" y="12" text-anchor="middle" style="font-size:9.5px">perineuro</text></svg>`;
    const mantle = rf < 70, core = rf < 20;
    $('nerveTxt').innerHTML = `<div class="stack"><div class="tile"><span>Manto · região proximal (ombro)</span><b style="font-size:17px;color:${mantle ? 'var(--accent)' : 'var(--muted)'}">${mantle ? 'Anestesiado' : 'Ainda sensível'}</b></div>
      <div class="tile"><span>Núcleo · região distal (mão)</span><b style="font-size:17px;color:${core ? 'var(--accent)' : 'var(--muted)'}">${core ? 'Anestesiado' : 'Ainda sensível'}</b></div></div>
      <p class="note">No bloqueio do plexo braquial, o ombro fica anestesiado antes da mão. O perineuro é a principal barreira: volume e tempo de espera importam.</p>`;
  };
  $('dtR').oninput = e => { dt = +e.target.value; drawNerve(); }; drawNerve();
}

/* ===== Tela 6 · Agentes ===== */
function renderAgentes(g) {
  let filt = 'all', sel = store.get('ag', 'lido');
  if (!AG[sel]) sel = 'lido';
  g.innerHTML =
    card('Os anestésicos locais da prática', `${seg('agSeg', [['all', 'Todos'], ['A', 'Amidas'], ['E', 'Ésteres']], 'all')}
      <div class="tw" style="margin-top:10px"><table class="t" id="agTab"><thead><tr><th>Agente</th><th>Grupo</th><th>pKa</th><th>Latência</th><th>Duração</th><th>Ligação a proteínas</th><th>Dose máx. sem / com adrenalina</th></tr></thead><tbody></tbody></table></div>
      <p class="note">* Articaína: amida com grupamento éster. Doses usuais para adultos, dose única; confira a bula e ajuste ao paciente. Toque numa linha para ver os detalhes.</p>`, { wide: true, more: 'agentes' }) +
    card('Três propriedades num só gráfico', `<div id="bubFig"></div><div class="legend"><span><i style="background:var(--accent);width:10px;height:10px;border-radius:50%"></i>amida</span><span><i style="background:var(--b);width:10px;height:10px;border-radius:50%"></i>éster</span><span>Eixo horizontal: pKa (latência)</span><span>Eixo vertical: ligação a proteínas (duração)</span><span>Tamanho: lipossolubilidade (potência)</span></div>`,
      { lede: 'Mais à esquerda, início mais rápido. Mais alto, efeito mais longo. Maior, mais potente e mais tóxico.' }) +
    `<section class="card" id="agDet" style="min-width:0"></section>`;
  const draw = () => {
    const rows = AGENTS.filter(a => filt === 'all' || a.c[0] === filt);
    $('agTab').querySelector('tbody').innerHTML = rows.map(a => `<tr data-a="${a.id}" class="${a.id === sel ? 'sel' : ''}" tabindex="0"><td><b>${a.n}</b></td><td><span class="tag ${a.c[0] === 'A' ? 'a' : 'e'}">${a.c[0] === 'A' ? 'Amida' : 'Éster'}${a.c.length > 1 ? '*' : ''}</span></td><td>${nf(a.pKa, 1)}</td><td>${a.lat}</td><td>${a.dur}</td><td>${a.pb ? '~' + a.pb + '%' : '—'}</td><td>${a.dose ? (a.dose[0] ? nf(a.dose[0], 1) : '—') + ' / ' + nf(a.dose[1], 1) + ' mg/kg' : a.doseT}</td></tr>`).join('');
    const pts = AGENTS.filter(a => a.pb && a.lipo);
    const W = cw('bubFig'), H = 270, L = 46, Rr = 24, T = 16, B = 228, x = p => L + (p - 7.4) / 1.6 * (W - L - Rr), y = v => B - v / 100 * (B - T);
    let s = `<svg class="ch" viewBox="0 0 ${W} ${H}" role="img" aria-label="pKa, ligação a proteínas e lipossolubilidade dos agentes">`;
    [0, 25, 50, 75, 100].forEach(v => s += `<line x1="${L}" x2="${W - Rr}" y1="${y(v)}" y2="${y(v)}" class="gr"/><text x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${v}%</text>`);
    [7.5, 8, 8.5, 9].forEach(p => s += `<text x="${x(p)}" y="${B + 18}" text-anchor="middle">${nf(p, 1)}</text>`);
    s += `<text x="${L}" y="${H - 4}">← início mais rápido</text><text x="${W - Rr}" y="${H - 4}" text-anchor="end">pKa</text>`;
    // deslocamentos para pontos coincidentes: [dx do círculo, posição do rótulo]
    const LAY = { lido: [-11, 'l'], prilo: [11, 'r'], bupi: [-9, 'u'], ropi: [9, 'd'], arti: [0, 'u'], mepi: [0, 'u'], tetra: [0, 'r'], proc: [0, 'l'] };
    pts.forEach(a => { const [dx, lp] = LAY[a.id] || [0, 'r'], cx = x(a.pKa) + dx, cy = y(a.pb), r = 6 + a.lipo * 4, me = a.id === sel;
      const lx = lp === 'l' ? cx - r - 5 : lp === 'r' ? cx + r + 5 : cx, ly = lp === 'u' ? cy - r - 6 : lp === 'd' ? cy + r + 14 : cy + 4, an = lp === 'l' ? 'end' : lp === 'r' ? 'start' : 'middle';
      s += `<g data-a="${a.id}" style="cursor:pointer"><circle cx="${cx}" cy="${cy}" r="${r}" class="${a.c[0] === 'A' ? 'hl' : 'barb'}" style="opacity:${me ? .9 : .35}"/>${me ? `<circle cx="${cx}" cy="${cy}" r="${r + 3}" class="accst"/>` : ''}<text x="${lx}" y="${ly}" text-anchor="${an}" class="${me ? 'lbl' : ''}">${a.n}</text></g>`; });
    $('bubFig').innerHTML = s + '</svg>';
    const a = AG[sel];
    $('agDet').innerHTML = `<div class="card-h"><div><span class="eyebrow">${a.c[0] === 'A' ? 'Amida' : 'Éster'}${a.c.length > 1 ? ' com grupamento éster' : ''}</span><h3>${a.n}</h3></div><button class="more-btn" data-go2="ph">Ver no simulador</button></div>
      <div class="tiles" style="grid-template-columns:1fr 1fr"><div class="tile"><span>pKa</span><b>${nf(a.pKa, 1)}</b><small>não ionizada no pH 7,4: ${pc(fracB(a.pKa, 7.4))}</small></div><div class="tile"><span>Latência</span><b style="font-size:18px">${a.lat}</b></div><div class="tile"><span>Duração</span><b style="font-size:18px">${a.dur}</b></div><div class="tile"><span>Lipossolubilidade</span><b style="font-size:18px">${a.lipoT}</b></div></div>
      <p style="margin:12px 0 4px;font-size:14px"><b>Uso típico:</b> ${a.uso}.</p><p style="margin:0;font-size:14px">${a.nota}</p>`;
    $('agDet').querySelector('[data-go2]').onclick = () => { const s0 = store.get('ph', {}); store.set('ph', { ...s0, a: a.id, k: a.pKa }); go('ph'); };
  };
  const pick = id => { sel = id; store.set('ag', id); draw(); };
  bindSeg('agSeg', v => { filt = v; draw(); });
  $('agTab').onclick = e => { const r = e.target.closest('tr[data-a]'); if (r) pick(r.dataset.a); };
  $('agTab').onkeydown = e => { const r = e.target.closest('tr[data-a]'); if (r && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); pick(r.dataset.a); } };
  $('bubFig').onclick = e => { const n = e.target.closest('[data-a]'); if (n) pick(n.dataset.a); };
  draw();
}
