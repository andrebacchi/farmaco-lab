/* ===== Contraceptivos orais · núcleo: modelo didático do ciclo, gráfico e figura ao vivo ===== */
const gss = (d, m, s) => Math.exp(-((d - m) * (d - m)) / (2 * s * s));
const CO_M = {
  nat: { n: 'Sem método', s: 'ciclo natural' },
  aoc: { n: 'Pílula combinada', s: 'estrogênio + progestina, 21/7' },
  pop: { n: 'Minipílula tradicional', s: 'noretisterona 0,35 mg' },
  pis: { n: 'Progestina anovulatória', s: 'desogestrel 75 µg, drospirenona 4 mg' },
};
/* 0 = nenhuma pílula, 1 = pílula ativa, 2 = pausa */
const coPill = (m, d) => m === 'nat' ? 0 : m === 'aoc' ? (d <= 21.999 ? 1 : 2) : 1;

/* Estado do eixo no dia d (1 a 28). Níveis hormonais relativos (0 a 1): formas de livro-texto, não dosagens. */
function coState(m, ov, d) {
  const n = {
    fsh: 0.28 + 0.34 * gss(d, 3.5, 3) + 0.38 * gss(d, 13.7, 0.8) - 0.10 * gss(d, 21, 4.5) + 0.22 * gss(d, 29, 1.8),
    lh: 0.12 + 0.88 * gss(d, 13.6, 0.7),
    e2: 0.07 + 0.90 * gss(d, 12.9, d < 12.9 ? 2.3 : 0.9) + 0.42 * gss(d, 21, 3.6),
    p4: 0.03 + 0.95 * gss(d, 21.5, 3.3),
    fol: d < 14 ? (d < 5 ? 5 : 5 + 15 * Math.pow((d - 5) / 9, 1.3)) : 0,
    cl: d < 14 ? 0 : d < 23 ? Math.min(1, 0.5 + (d - 14) / 2) : Math.max(0.15, 1 - (d - 23) / 6),
    endo: d <= 5 ? 9 - 7 * (d - 1) / 4 : d <= 14 ? 2 + 7 * (d - 5) / 9 : d <= 22 ? 9 + 3 * (d - 14) / 8 : 12 - (d > 27 ? 3 * (d - 27) : 0),
    bleed: d < 5.5, perm: clamp(0.06 + 0.94 * gss(d, 13, 1.7), 0, 1), ovul: true, gn: d < 14 ? 1 : 0.55,
  };
  if (m === 'nat') return n;
  if (m === 'aoc') return { fsh: 0.13 + 0.14 * gss(d, 28.6, 2.6) + 0.12 * gss(d, 0.4, 2.6), lh: 0.08 + 0.03 * gss(d, 28.5, 3), e2: 0.06 + 0.07 * gss(d, 29, 2.8) + 0.06 * gss(d, 1, 2.5), p4: 0.02,
    fol: 4 + 5 * gss(d, 29, 3) + 4.5 * gss(d, 1, 3), cl: 0, endo: d <= 10 ? 2 + 1.5 * (d - 1) / 9 : d <= 23 ? 3.5 : 3.5 - 1.5 * (d - 23) / 5, bleed: d >= 24 && d <= 27.6, perm: 0.04, ovul: false, gn: d > 23 ? 0.5 : 0.22 };
  if (m === 'pop' && ov) return { fsh: n.fsh * 0.95, lh: 0.12 + 0.6 * gss(d, 13.6, 0.8), e2: n.e2 * 0.9, p4: 0.03 + 0.6 * gss(d, 21.5, 3.1),
    fol: n.fol, cl: n.cl * 0.8, endo: 1 + n.endo * 0.6, bleed: d < 4.5, perm: 0.07, ovul: true, gn: 0.8 };
  if (m === 'pop') return { fsh: 0.3 + 0.05 * Math.sin(d / 3), lh: 0.15 + 0.05 * Math.sin(d / 2.2 + 1), e2: 0.22 + 0.1 * Math.sin(d / 4.5), p4: 0.03,
    fol: 6 + 8 * clamp((d - 3) / 14, 0, 1), cl: 0, endo: 4 + 0.8 * Math.sin(d / 5), bleed: (d > 9 && d < 11) || (d > 20 && d < 22.5), perm: 0.07, ovul: false, gn: 0.7 };
  return { fsh: 0.22 + 0.02 * Math.sin(d / 3), lh: 0.09, e2: 0.13 + 0.04 * Math.sin(d / 4), p4: 0.02,
    fol: 6 + 2 * Math.sin(d / 5), cl: 0, endo: 3, bleed: d > 15 && d < 16.5, perm: 0.04, ovul: false, gn: 0.4 };
}
function coTag(m, d) {
  if (m === 'nat') return d < 5.5 ? 'menstruação' : d < 12.8 ? 'fase folicular' : d < 14.6 ? 'ovulação' : 'fase lútea';
  if (m === 'aoc') return d <= 21.999 ? `pílula ativa ${Math.min(21, Math.floor(d))} de 21` : `pausa, dia ${Math.min(7, Math.floor(d) - 21)} de 7`;
  return 'uma pílula por dia, sem pausa';
}
function coTell(m, ov, d) {
  if (m === 'nat') {
    if (d < 5.5) return 'Menstruação. Com estradiol e progesterona baixos, a hipófise fica sem freio: o <b>FSH</b> sobe e recruta um grupo de folículos.';
    if (d < 9.5) return 'Fase folicular. O FSH amadurece o folículo dominante, que passa a produzir <b>estradiol</b>. O estradiol freia a hipófise (feedback negativo) e o FSH cai: só o folículo dominante resiste.';
    if (d < 12.6) return 'O estradiol sobe depressa. O endométrio prolifera e o <b>muco cervical</b> fica fluido e filante: o colo se abre para os espermatozoides.';
    if (d < 13.6) return 'Estradiol alto e sustentado inverte o sinal: o feedback passa a ser <b>positivo</b>. A hipófise dispara o <b>pico de LH</b> (e um pico menor de FSH).';
    if (d < 14.8) return '<b>Ovulação</b>: cerca de 36 horas depois do início do pico de LH, o folículo se rompe e libera o óvulo, que sobrevive de 12 a 24 horas.';
    if (d < 24.5) return 'Fase lútea. O folículo rompido vira <b>corpo lúteo</b> e produz progesterona (e algum estradiol). O muco engrossa, o endométrio fica secretor e a hipófise é freada.';
    return 'Sem gestação, o corpo lúteo regride (luteólise). Os esteroides caem, o endométrio perde a sustentação e o FSH volta a subir: começa um novo ciclo.';
  }
  if (m === 'aoc') return d <= 21.999
    ? 'Pílula ativa. Estrogênio e progestina chegam todos os dias e mantêm o <b>feedback negativo</b> o tempo todo: FSH e LH ficam baixos, nenhum folículo amadurece e <b>não existe pico de LH</b>. No colo, a progestina mantém o muco espesso.'
    : 'Pausa. Sem hormônio, o endométrio fino descama: é um <b>sangramento de privação</b>, não uma menstruação. O FSH já começa a subir e os folículos voltam a crescer. É por isso que a pausa não pode passar de 7 dias.';
  if (m === 'pop') return ov
    ? 'Dose baixa de progestina, todos os dias. O eixo é pouco suprimido: <b>neste ciclo houve ovulação</b>, como em cerca de metade dos ciclos. A proteção vem do colo: o muco espesso barra os espermatozoides. O efeito no muco dura cerca de 24 horas, daí a janela de 3 horas.'
    : 'Dose baixa de progestina, todos os dias. <b>Neste ciclo não houve ovulação</b>: o pico de LH não aconteceu e o folículo persistiu sem se romper. O sangramento fica imprevisível. A barreira constante continua sendo o muco espesso.';
  return 'Progestina em dose que suprime o LH. <b>Não há pico de LH nem ovulação</b>, e o muco fica espesso. Sem estrogênio exógeno, o ovário mantém uma produção basal de estradiol. O sangramento costuma ser irregular ou ausente.';
}

/* ---------- gráfico: hormônios, ovário, endométrio e muco ao longo de 28 dias ---------- */
function coChartDraw(id, m, ov) {
  const el = $(id); if (!el) return;
  const W = cw(id), L = 8, R = 8, x = d => L + (d - 1) / 27 * (W - L - R), P = [[32, 104], [134, 206]];
  const y = (p, v) => P[p][1] - clamp(v, 0, 1.03) * (P[p][1] - P[p][0]);
  const S = []; for (let d = 1; d <= 28.001; d += 0.25) S.push([d, coState(m, ov, d), coState('nat', true, d)]);
  const pth = (k, p, src) => S.map((r, i) => (i ? 'L' : 'M') + x(r[0]).toFixed(1) + ' ' + y(p, r[src][k]).toFixed(1)).join('');
  const ghost = m !== 'nat';
  let s = `<svg class="ch co-ch" id="${id}-svg" viewBox="0 0 ${W} 366" role="img" aria-label="Hormônios, folículo, endométrio e muco ao longo de 28 dias: ${CO_M[m].n}">`;
  if (m !== 'nat') { for (let d = 1; d <= 28; d++) s += `<circle cx="${x(d).toFixed(1)}" cy="9" r="3.2" class="${coPill(m, d) === 1 ? 'pillon' : 'pilloff'}"/>`; }
  s += `<rect x="${L}" y="${P[0][0]}" width="${W - L - R}" height="${P[0][1] - P[0][0]}" rx="6" class="panel"/><rect x="${L}" y="${P[1][0]}" width="${W - L - R}" height="${P[1][1] - P[1][0]}" rx="6" class="panel"/>`;
  s += `<text x="${L}" y="${P[0][0] - 6}" class="sl">Hipófise</text><text x="${L}" y="${P[1][0] - 6}" class="sl">Ovário</text>`;
  if (m !== 'nat') s += `<text x="${W - R}" y="${P[0][0] - 6}" class="sl" text-anchor="end">${m === 'aoc' ? '21 pílulas + pausa' : 'pílula todos os dias'}</text>`;
  if (ghost) s += ['fsh', 'lh'].map(k => `<path d="${pth(k, 0, 2)}" class="ghost"/>`).join('') + ['e2', 'p4'].map(k => `<path d="${pth(k, 1, 2)}" class="ghost"/>`).join('');
  s += `<path d="${pth('fsh', 0, 1)}" class="sFSH"/><path d="${pth('lh', 0, 1)}" class="sLH"/><path d="${pth('e2', 1, 1)}" class="sE2"/><path d="${pth('p4', 1, 1)}" class="sP4"/>`;
  const st = d => coState(m, ov, d), lbl = (d, p, k, t, dy, a) => `<text x="${x(d).toFixed(1)}" y="${(y(p, st(d)[k]) + dy).toFixed(1)}" class="dl" text-anchor="${a || 'middle'}">${t}</text>`;
  if (m === 'nat' || (m === 'pop' && ov)) s += `<text x="${(x(14.7)).toFixed(1)}" y="${P[0][0] + 16}" class="dl">LH</text>` + lbl(3.5, 0, 'fsh', 'FSH', -8) + lbl(10.6, 1, 'e2', 'estradiol', -8, 'end') + lbl(21.5, 1, 'p4', 'progesterona', -7);
  else s += `<text x="${x(14)}" y="${P[0][1] - 26}" class="dl" text-anchor="middle">LH e FSH suprimidos${m === 'pop' ? ' em parte' : ''}</text><text x="${x(14)}" y="${P[1][1] - 30}" class="dl" text-anchor="middle">${m === 'aoc' ? 'ovário em repouso' : 'estradiol basal, sem progesterona'}</text>`;
  // ovário: folículos a cada 2 dias
  s += `<text x="${L}" y="228" class="sl">Folículo e corpo lúteo</text>`;
  for (let d = 1.5; d <= 28; d += 1.9) { const q = st(d), cx = x(d).toFixed(1);
    if (q.ovul && d >= 14) s += `<circle cx="${cx}" cy="247" r="${(3 + 7 * q.cl).toFixed(1)}" class="clf" opacity="${(0.35 + 0.65 * q.cl).toFixed(2)}"/>`;
    else s += `<circle cx="${cx}" cy="247" r="${(q.fol * 0.5).toFixed(1)}" class="folst"/>`; }
  if (st(14).ovul) s += `<path d="M${x(14)} 234 v26" class="ovl"/><text x="${x(14)}" y="268" class="ev" text-anchor="middle" style="font-size:10px">ovulação</text>`;
  // endométrio
  s += `<text x="${L}" y="278" class="sl">Endométrio</text>`;
  s += `<path d="M${x(1)} 308 ${S.map(r => 'L' + x(r[0]).toFixed(1) + ' ' + (308 - r[1].endo * 2.1).toFixed(1)).join(' ')} L${x(28)} 308 Z" class="endof"/>`;
  for (let d = 1; d <= 28; d += 0.5) if (st(d).bleed) s += `<circle cx="${x(d).toFixed(1)}" cy="313" r="2" class="bleed"/>`;
  // muco
  s += `<text x="${L}" y="330" class="sl">Muco cervical</text>`;
  for (let d = 1; d < 28; d += 0.5) { const q = st(d + 0.25); s += `<rect x="${x(d).toFixed(1)}" y="335" width="${(x(d + 0.5) - x(d) + 0.4).toFixed(1)}" height="9" class="mucof" opacity="${(0.12 + 0.82 * (1 - q.perm)).toFixed(2)}"/>`; }
  if (m === 'nat') s += `<text x="${x(13)}" y="330" class="ev" text-anchor="middle" style="font-size:10px">fluido</text>`;
  [1, 7, 14, 21, 28].forEach(d => s += `<text x="${x(d)}" y="361" text-anchor="${d === 1 ? 'start' : d === 28 ? 'end' : 'middle'}">${d === 1 ? 'dia 1' : d}</text>`);
  s += `<g id="${id}-cur"><line y1="22" y2="346" class="cursor"/><circle r="5" class="fFSH ring"/><circle r="5" class="fLH ring"/><circle r="5" class="fE2 ring"/><circle r="5" class="fP4 ring"/></g></svg>`;
  el.innerHTML = s; el._x = x; el._y = y; el._W = W; el._L = L; el._R = R;
}
function coChartCursor(id, m, ov, d) {
  const el = $(id), g = $(id + '-cur'); if (!el || !g || !el._x) return;
  const q = coState(m, ov, d), X = el._x(d), c = g.children;
  c[0].setAttribute('x1', X); c[0].setAttribute('x2', X);
  [['fsh', 0], ['lh', 0], ['e2', 1], ['p4', 1]].forEach(([k, p], i) => { c[i + 1].setAttribute('cx', X); c[i + 1].setAttribute('cy', el._y(p, q[k])); });
}
/* arrastar o dedo sobre o gráfico muda o dia */
function coChartScrub(id, fn) {
  const el = $(id); let down = false;
  const pick = e => { const svg = $(id + '-svg'); if (!svg) return; const r = svg.getBoundingClientRect(), px = (e.clientX - r.left) / r.width * el._W; fn(clamp(1 + (px - el._L) / (el._W - el._L - el._R) * 27, 1, 28)); };
  el.onpointerdown = e => { down = true; try { el.setPointerCapture(e.pointerId); } catch {} pick(e); };
  el.onpointermove = e => { if (down) pick(e); };
  el.onpointerup = el.onpointercancel = () => { down = false; };
}

/* ---------- figura ao vivo: hipotálamo, hipófise, ovários, útero e colo ---------- */
const CO_SP = [[200, 366], [200, 326], [200, 300], [200, 274], [208, 250], [226, 214], [246, 192], [262, 180], [282, 176], [304, 181]];
const CO_EGG = [[330, 202], [318, 194], [304, 181], [282, 176], [262, 180], [246, 192], [228, 212]];
const coAlong = (P, t) => { const k = clamp(t, 0, 0.9999) * (P.length - 1), i = Math.floor(k), f = k - i; return [P[i][0] + (P[i + 1][0] - P[i][0]) * f, P[i][1] + (P[i + 1][1] - P[i][1]) * f]; };
const CO_NS = 9;
function coFigSVG(id) {
  let sp = ''; for (let i = 0; i < CO_NS; i++) sp += `<g id="${id}S${i}"><path d="M0 2 q1.6 3 0 6" class="spermt"/><ellipse rx="1.6" ry="2.3" class="sperm"/></g>`;
  return `<svg class="ch" viewBox="0 0 400 372" role="img" aria-label="Eixo hipotálamo, hipófise e ovário, com útero, colo e muco">
  <g id="${id}Pill"><rect x="18" y="16" width="42" height="18" rx="9" class="pillg"/><line x1="39" y1="16" x2="39" y2="34" style="stroke:var(--fg);stroke-width:1.2"/><text x="39" y="48" class="fl" text-anchor="middle">pílula</text>
    <path d="M60 25 C 90 23, 112 22, 136 22" class="hEX" id="${id}X1" style="opacity:.75"/><path d="M30 54 C 0 130, 0 300, 186 304" class="hEX" id="${id}X2" style="opacity:.75"/><text x="14" y="340" class="fs" id="${id}X2t">progestina age direto</text><text x="14" y="353" class="fs">no colo e no endométrio</text></g>
  <rect x="140" y="8" width="120" height="28" rx="14" class="gland"/><text x="200" y="26" class="fl" text-anchor="middle">Hipotálamo</text>
  <circle cx="200" r="2.6" class="ink" id="${id}G0"/><circle cx="200" r="2.6" class="ink" id="${id}G1"/><circle cx="200" r="2.6" class="ink" id="${id}G2"/><text x="210" y="54" class="fs">GnRH</text>
  <ellipse cx="200" cy="76" rx="50" ry="16" class="gland"/><text x="200" y="80" class="fl" text-anchor="middle">Hipófise</text>
  <path d="M222 91 C 244 130, 316 140, 330 192" class="hFSH" id="${id}FSH"/><path d="M236 89 C 262 120, 334 128, 344 194" class="hLH" id="${id}LH"/>
  <text x="232" y="124" class="fl" text-anchor="end">FSH</text><text x="274" y="110" class="fl">LH</text>
  <path d="M356 208 C 388 166, 380 48, 262 26" class="hE2" id="${id}E2"/><path d="M359 220 C 400 170, 392 36, 262 15" class="hP4" id="${id}P4"/>
  <text x="314" y="11" class="fl" id="${id}Fb">feedback −</text><text x="314" y="24" class="fs" id="${id}Fb2"></text>
  <path d="M154 192 C 124 172, 96 172, 82 196" class="tube"/><path d="M154 192 C 124 172, 96 172, 82 196" class="tubei"/>
  <path d="M246 192 C 276 172, 304 172, 318 196" class="tube"/><path d="M246 192 C 276 172, 304 172, 318 196" class="tubei"/>
  <text x="118" y="164" class="fs" text-anchor="middle">tuba</text>
  <ellipse cx="72" cy="216" rx="26" ry="19" class="ovy"/><circle cx="62" cy="212" r="3" class="folst"/><circle cx="78" cy="222" r="2.4" class="folst"/><circle cx="82" cy="209" r="2" class="folst"/>
  <text x="72" y="250" class="fs" text-anchor="middle">ovário</text>
  <ellipse cx="330" cy="216" rx="28" ry="20" class="ovy"/><circle cx="315" cy="222" r="2.2" class="folst"/><circle cx="345" cy="224" r="2" class="folst"/>
  <circle cx="330" cy="215" r="6" class="folst" id="${id}Fol"/><circle cx="330" cy="215" r="0" class="clf" id="${id}CL"/>
  <text x="330" y="252" class="fl" text-anchor="middle" id="${id}Ov"></text><text x="330" y="266" class="fl" text-anchor="middle" id="${id}Fert" style="fill:var(--accent)"></text>
  <path d="M148 198 C 148 172, 252 172, 252 198 C 252 244, 222 262, 218 292 L 218 326 L 182 326 L 182 292 C 178 262, 148 244, 148 198 Z" class="myo"/>
  <path d="M168 200 L 232 200 L 203 268 L 197 268 Z" class="cav" id="${id}Cav"/>
  <rect x="196" y="266" width="8" height="60" style="fill:var(--surface)"/><rect x="196" y="266" width="8" height="60" class="mucof" id="${id}Muco"/>
  <path d="M184 326 V 372 M216 326 V 372" style="stroke:var(--myo-line);stroke-width:1.4;fill:none"/>
  <path d="M206 300 L 226 300" class="dotst"/><text x="230" y="298" class="fl" id="${id}Mu"></text><text x="230" y="311" class="fs" id="${id}Mu2"></text>
  <g id="${id}Bl"><circle cx="200" cy="338" r="2.6" class="bleed"/><circle cx="196" cy="349" r="2.2" class="bleed"/><circle cx="203" cy="359" r="2.4" class="bleed"/></g>
  <circle r="4" class="eggc" id="${id}Egg"/>
  ${sp}
</svg>`;
}
function coFigUpdate(id, m, ov, d, t) {
  const e = k => $(id + k); if (!e('Fol')) return;
  const q = coState(m, ov, d), sw = v => (1 + 7.5 * v).toFixed(1), pill = coPill(m, d);
  e('FSH').style.strokeWidth = sw(q.fsh); e('LH').style.strokeWidth = sw(q.lh); e('E2').style.strokeWidth = sw(q.e2); e('P4').style.strokeWidth = sw(q.p4);
  e('Pill').style.opacity = pill ? 1 : 0; e('X1').style.strokeWidth = pill === 1 ? 3 : 0.8; e('X2').style.strokeWidth = pill === 1 ? 3 : 0.8;
  e('X2t').textContent = m === 'aoc' && pill === 2 ? 'pausa: sem hormônio' : 'progestina age direto';
  const pos = m === 'nat' && d >= 12.4 && d < 13.9;
  e('Fb').textContent = pos ? 'feedback +' : 'feedback −'; e('Fb').style.fill = pos ? 'var(--accent)' : '';
  e('Fb2').textContent = pos ? 'estradiol alto' : pill === 1 ? 'com a pílula' : 'do ovário';
  for (let k = 0; k < 3; k++) { const g = e('G' + k), ph = ((t * (0.25 + 0.5 * q.gn)) + k / 3) % 1; g.setAttribute('cy', (39 + ph * 20).toFixed(1)); g.style.opacity = (q.gn * (1 - Math.abs(ph - 0.5) * 0.8)).toFixed(2); }
  e('Fol').setAttribute('r', q.ovul && d >= 14 ? 0 : (q.fol * 0.72).toFixed(1)); e('CL').setAttribute('r', (13 * q.cl).toFixed(1));
  e('Ov').textContent = q.ovul && d >= 14 ? (d < 14.8 ? 'ovulação' : q.cl > 0.3 ? 'corpo lúteo' : 'luteólise') : q.fol >= 10 ? `folículo ${nf(q.fol, 0)} mm` : 'folículos pequenos';
  e('Cav').style.strokeWidth = (q.endo * 0.9).toFixed(1);
  e('Muco').style.opacity = (0.12 + 0.82 * (1 - q.perm)).toFixed(2);
  const open = q.perm > 0.45;
  e('Mu').textContent = open ? 'muco fluido' : 'muco espesso'; e('Mu2').textContent = open ? 'espermatozoides passam' : 'espermatozoides barrados';
  e('Bl').style.opacity = q.bleed ? 1 : 0;
  const egg = e('Egg'), eggOn = q.ovul && d >= 14 && d < 18.6;
  if (eggOn) { const [ex, ey] = coAlong(CO_EGG, (d - 14) / 4.6); egg.setAttribute('cx', ex.toFixed(1)); egg.setAttribute('cy', ey.toFixed(1)); egg.style.opacity = d > 17.6 ? (18.6 - d).toFixed(2) : 1; } else egg.style.opacity = 0;
  const pass = open ? Math.round(CO_NS * clamp(q.perm, 0, 1) * 0.8) : 0;
  e('Fert').textContent = eggOn && d < 15.4 ? (pass ? 'fecundação possível' : 'óvulo sem espermatozoide') : '';
  for (let i = 0; i < CO_NS; i++) { const g = e('S' + i), ph = (t / 7 + i / CO_NS + (i % 3) * 0.07) % 1, wob = 3 * Math.sin(t * 2.3 + i * 1.9); let X, Y;
    if (i < pass) { [X, Y] = coAlong(CO_SP, ph); X += wob * 0.6; }
    else { const up = 1 - Math.abs(2 * ph - 1); X = 192 + (i * 37 % 17) + wob * 0.5; Y = 366 - 36 * up; }
    g.setAttribute('transform', `translate(${X.toFixed(1)} ${Y.toFixed(1)})`); }
}

/* ---------- controlador: dia, reprodução, gráfico e figura em sincronia ---------- */
function coSim(o) {
  let m = o.m || 'nat', ov = true, day = o.day || 9, playing = false, raf = 0, last = 0, t = 0;
  const paint = () => {
    coChartCursor(o.chart, m, ov, day); coFigUpdate(o.fig, m, ov, day, t);
    $(o.range).value = day; $(o.out).textContent = `Dia ${Math.floor(day)} · ${coTag(m, day)}`;
    const k = coTell(m, ov, day); if (k !== paint.k) { paint.k = k; $(o.tell).innerHTML = k; }
    o.onDay && o.onDay(day, coState(m, ov, day));
  };
  const redraw = () => { coChartDraw(o.chart, m, ov); paint.k = null; paint(); };
  const frame = now => { const dt = Math.min(0.1, (now - last) / 1000); last = now; t += dt;
    if (playing) { day += dt * 28 / 22; if (day > 28) day = 1; paint(); } else coFigUpdate(o.fig, m, ov, day, t);
    raf = requestAnimationFrame(frame); };
  const setPlay = p => { playing = p; $(o.play).textContent = p ? '❚❚ Pausar' : '▶ Passar o ciclo'; $(o.play).setAttribute('aria-pressed', p); };
  $(o.fig + 'Host').innerHTML = coFigSVG(o.fig);
  $(o.range).oninput = e => { setPlay(false); day = +e.target.value; paint(); };
  $(o.play).onclick = () => { if (reduced() && !playing) { day = day >= 27 ? 1 : Math.min(28, day + 3); paint(); return; } setPlay(!playing); };
  coChartScrub(o.chart, d => { setPlay(false); day = d; paint(); });
  redraw();
  if (!reduced()) { last = performance.now(); raf = requestAnimationFrame(frame); }
  return { set(mm, oo) { m = mm; if (oo !== undefined) ov = oo; redraw(); }, day(d) { setPlay(false); day = d; paint(); }, play: setPlay, get m() { return m; }, get ov() { return ov; }, stop() { cancelAnimationFrame(raf); } };
}
const CO_LEG = '<div class="legend"><span><i class="l-fsh"></i>FSH</span><span><i class="l-lh"></i>LH</span><span><i class="l-e2"></i>estradiol</span><span><i class="l-p4"></i>progesterona</span></div>';

/* escolha única em chips: quebra melhor que o seg no celular */
function pick(id, items, on) { return `<div class="chips wrapc" id="${id}" role="group">${items.map(([v, l]) => `<button class="chip${v == on ? ' on' : ''}" data-v="${v}" aria-pressed="${v == on}">${l}</button>`).join('')}</div>`; }
function bindPick(id, fn) { const el = $(id); el.onclick = e => { const b = e.target.closest('.chip'); if (!b) return; el.querySelectorAll('.chip').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); }); fn(b.dataset.v); }; }
/* roteiro de laboratório: perguntas com resposta recolhida */
function roteiro(items) { return `<div class="task">${items.map(([q, a]) => `<details class="fold"><summary><span class="ask">${q}</span></summary><div>${a}</div></details>`).join('')}</div>`; }
