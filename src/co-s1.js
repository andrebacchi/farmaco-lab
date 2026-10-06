/* ===== Contraceptivos · Tela 1 (o ciclo) e Tela 2 (mecanismo) ===== */
const CY_PH = [[3, 'Menstruação'], [8, 'Folicular'], [13.2, 'Pico de LH'], [14.2, 'Ovulação'], [21, 'Lútea'], [27, 'Luteólise']];
function coTiles(pre) {
  return `<div class="tiles" style="margin-top:10px"><div class="tile"><span>Ovário</span><b id="${pre}T1"></b><small id="${pre}T1s"></small></div><div class="tile"><span>Endométrio</span><b id="${pre}T2"></b><small id="${pre}T2s"></small></div><div class="tile"><span>Muco cervical</span><b id="${pre}T3"></b><small id="${pre}T3s"></small></div></div>`;
}
function coTilesSet(pre, d, q) {
  const post = q.ovul && d >= 14;
  $(pre + 'T1').textContent = post ? (q.cl > 0.3 ? 'corpo lúteo' : 'regredindo') : nf(q.fol, 0) + ' mm';
  $(pre + 'T1s').textContent = post ? 'produz progesterona' : q.fol >= 18 ? 'pré-ovulatório' : q.fol >= 10 ? 'dominante' : 'sem dominante';
  $(pre + 'T2').textContent = nf(q.endo, 0) + ' mm'; $(pre + 'T2s').textContent = q.bleed ? 'descamando' : q.endo >= 9 ? 'secretor ou proliferado' : q.endo >= 5 ? 'proliferando' : 'fino';
  $(pre + 'T3').textContent = q.perm > 0.45 ? 'fluido' : 'espesso'; $(pre + 'T3s').textContent = q.perm > 0.45 ? 'penetrável' : 'impenetrável';
}
function renderCiclo(g) {
  g.innerHTML =
    card('Vinte e oito dias em quatro faixas', `
      <div class="chips wrapc" id="cyPh">${CY_PH.map(([d, l]) => `<button class="chip" data-d="${d}">${l}</button>`).join('')}</div>
      <div class="range" style="margin-top:12px"><label for="cyR">Dia do ciclo</label><output id="cyO"></output><input type="range" id="cyR" min="1" max="28" step="0.1"></div>
      <div id="cyCh" style="margin-top:8px"></div>${CO_LEG}
      <p class="note">Arraste o dedo sobre o gráfico para mudar o dia. Curvas em nível relativo (cada hormônio em proporção ao próprio pico), para um ciclo idealizado de 28 dias.</p>`, { eyebrow: 'Simulador', more: 'co_ciclo' }) +
    card('Eixo, ovário e útero', `<div id="cyFHost"></div>
      <div class="row" style="justify-content:space-between;margin-top:6px"><span class="note" style="margin:0">A espessura de cada seta acompanha o nível do hormônio.</span><button class="btn small" id="cyPlay" aria-pressed="false"></button></div>
      ${coTiles('cy')}<div class="insight" id="cyTell" aria-live="polite"></div>`, { eyebrow: 'Ao vivo' }) +
    card('O mesmo estradiol freia e dispara', `<div class="stack">
        <div class="range"><label for="fbE">Estradiol no sangue</label><output id="fbEo"></output><input type="range" id="fbE" min="20" max="400" step="10" value="80"></div>
        <div class="range"><label for="fbH">Há quanto tempo está nesse nível</label><output id="fbHo"></output><input type="range" id="fbH" min="0" max="72" step="2" value="12"></div></div>
      <div id="fbFig" style="margin-top:8px"></div><div class="verdict" id="fbV" style="margin-top:10px"></div>
      <p class="note">Limiar clássico de livro-texto: estradiol acima de cerca de 200 pg/mL, sustentado por cerca de 50 horas. Os valores variam entre mulheres e entre ciclos.</p>`,
      { lede: 'O sinal do feedback depende do nível e do tempo. Encontre a combinação que dispara o pico de LH.', more: 'co_feedback' }) +
    card('Roteiro do laboratório', roteiro([
      ['Vá ao dia 9. Por que o FSH está caindo se o folículo ainda está crescendo?', 'O estradiol produzido pelo próprio folículo dominante (e a inibina) freia a hipófise. O FSH cai e os folículos menores, que dependem mais dele, entram em atresia. É assim que, em geral, só um folículo chega à ovulação.'],
      ['Entre os dias 10 e 13, o que muda no colo do útero? Qual hormônio responde por isso?', 'O muco fica abundante, fluido e filante, e os espermatozoides passam. É efeito do <b>estradiol</b> alto. Depois da ovulação a <b>progesterona</b> desfaz isso em pouco tempo: o muco volta a ficar espesso.'],
      ['Onde, neste ciclo, uma dose constante de estrogênio com progestina impediria a ovulação?', 'Em dois pontos: mantendo o FSH baixo (nenhum folículo vira dominante) e, principalmente, impedindo o feedback positivo e o pico de LH. <button class="lnk" style="border:0;background:none;padding:0;font:inherit" data-go="pilula">Veja na tela 3.</button>'],
      ['Se houvesse gestação, o que você esperaria ver a partir do dia 24?', 'O hCG do embrião sustentaria o corpo lúteo. A progesterona não cairia, o endométrio não descamaria e o FSH continuaria freado: nenhum ciclo novo começaria.'],
    ]), { lede: 'Responda antes de abrir cada resposta.' });
  const sim = coSim({ chart: 'cyCh', fig: 'cyF', range: 'cyR', out: 'cyO', play: 'cyPlay', tell: 'cyTell', day: 9, onDay: (d, q) => coTilesSet('cy', d, q) });
  sim.play(false);
  $('cyPh').onclick = e => { const c = e.target.closest('.chip'); if (c) sim.day(+c.dataset.d); };
  const drawFb = () => {
    const E = +$('fbE').value, H = +$('fbH').value, W = cw('fbFig'), L = 44, R = 10, T = 10, B = 150, x = h => L + h / 72 * (W - L - R), y = v => B - v / 400 * (B - T), pos = E >= 200 && H >= 50;
    let s = `<svg class="ch" viewBox="0 0 ${W} 180" role="img" aria-label="Mapa do feedback do estradiol">`;
    [0, 100, 200, 300, 400].forEach(v => s += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" class="gr"/><text x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${v}</text>`);
    [0, 24, 48, 72].forEach(h => s += `<text x="${x(h)}" y="${B + 16}" text-anchor="middle">${h} h</text>`);
    s += `<rect x="${x(50)}" y="${y(400)}" width="${x(72) - x(50)}" height="${y(200) - y(400)}" class="acta" style="opacity:${pos ? .28 : .12}"/><text x="${(x(50) + x(72)) / 2}" y="${y(300) + 4}" text-anchor="middle" class="lbl" style="fill:var(--accent)">feedback +</text>`;
    s += `<text x="${x(22)}" y="${y(60)}" text-anchor="middle">feedback −</text><text x="${L}" y="${T - 1}" style="font-size:10px">pg/mL</text>`;
    s += `<line x1="${x(H)}" x2="${x(H)}" y1="${y(E)}" y2="${B}" class="dotst"/><line x1="${L}" x2="${x(H)}" y1="${y(E)}" y2="${y(E)}" class="dotst"/><circle cx="${x(H)}" cy="${y(E)}" r="7" class="fE2 ring"/></svg>`;
    $('fbFig').innerHTML = s; $('fbEo').textContent = E + ' pg/mL'; $('fbHo').textContent = H + ' h';
    const v = pos ? ['acc', 'Feedback positivo: pico de LH', 'O estradiol alto e sustentado sensibiliza a hipófise ao GnRH. O LH dispara e a ovulação acontece cerca de 36 horas depois do início do pico.']
      : E >= 200 ? ['warn', 'Ainda negativo: falta tempo', 'O nível já é alto, mas precisa se manter por cerca de dois dias. É o que o folículo dominante faz no fim da fase folicular.']
      : ['neu', 'Feedback negativo: hipófise freada', 'Em nível baixo ou moderado, o estradiol reduz a liberação de FSH e LH. É o regime de quase todo o ciclo, e é o regime que a pílula mantém o mês inteiro.'];
    $('fbV').className = 'verdict ' + v[0]; $('fbV').innerHTML = `<b>${v[1]}</b><span>${v[2]}</span>`;
  };
  $('fbE').oninput = drawFb; $('fbH').oninput = drawFb; drawFb();
  return () => sim.stop();
}

const CO_BARR = {
  nat: [[0, 'Livre', 'Um folículo amadurece e se rompe por volta do dia 14.', ''], [0, 'Fluido no período fértil', 'O estradiol alto abre o colo por alguns dias.', ''], [0, 'Receptivo', 'Prolifera, fica secretor e descama se não houver implantação.', ''], [0, 'Normal', 'Tubas levam o óvulo e os espermatozoides ao encontro.', '']],
  aoc: [[3, 'Bloqueada', 'O estrogênio suprime o FSH e nenhum folículo vira dominante; a progestina suprime o LH e abole o pico. É o mecanismo principal.', 'E + P'], [3, 'Espesso', 'A progestina deixa o muco escasso, viscoso e impenetrável.', 'P'], [2, 'Fino', 'Pouco receptivo. Mecanismo secundário: com a ovulação bloqueada, raramente é posto à prova.', 'P'], [1, 'Mais lentas', 'A progestina altera o transporte dos gametas. Contribuição pequena e difícil de medir.', 'P']],
  pop: [[1, 'Bloqueada só em parte', 'A dose não suprime o LH de forma consistente: há ovulação em cerca de metade dos ciclos.', 'P'], [3, 'Espesso', 'Mecanismo principal. Começa em poucas horas e se perde em cerca de 24 horas: por isso o horário importa tanto.', 'P'], [2, 'Fino e fora de fase', 'Menos receptivo, com sangramento irregular.', 'P'], [1, 'Mais lentas', 'Contribuição pequena e difícil de medir.', 'P']],
  pis: [[3, 'Bloqueada', 'O desogestrel 75 µg inibe a ovulação em cerca de 97% dos ciclos. A drospirenona 4 mg mantém a inibição mesmo com 24 horas de atraso.', 'P'], [3, 'Espesso', 'Como em toda pílula com progestina.', 'P'], [2, 'Fino', 'Sem estrogênio para estabilizá-lo: sangramento irregular ou ausente.', 'P'], [1, 'Mais lentas', 'Contribuição pequena e difícil de medir.', 'P']],
};
const CO_BN = ['Ovulação', 'Muco cervical', 'Endométrio', 'Tubas uterinas'];
const CO_OV100 = { aoc: [2, 'Pílula combinada: ovulação de escape em cerca de 2 de cada 100 ciclos (Milsom e Korver, 2008).'], pop: [50, 'Minipílula tradicional: ovulação em cerca de metade dos ciclos (CDC, 2024).'], pis: [3, 'Desogestrel 75 µg: ovulação em cerca de 3 de cada 100 ciclos (Rice et al., 1999).'] };
const CO_TAKES = { nat: 'Nada: o eixo funciona sozinho.', aoc: '<b>Estrogênio</b> (etinilestradiol 15 a 35 µg, estradiol ou estetrol) + <b>progestina</b>, 21 ou 24 dias, com pausa de 7 ou 4.', pop: '<b>Só progestina em dose baixa</b> (noretisterona 0,35 mg), todos os dias, sem pausa.', pis: '<b>Só progestina em dose anovulatória</b>: desogestrel 75 µg sem pausa, ou drospirenona 4 mg em esquema 24/4.' };
const CO_WHO = [['Suprime o FSH: nenhum folículo vira dominante', 'E', 'e'], ['Suprime o LH: sem pico, sem ovulação', 'P', 'p'], ['Espessa o muco cervical', 'P', 'p'], ['Afina o endométrio', 'P', 'p'], ['Estabiliza o endométrio: sangramento previsível', 'E', 'e'], ['Aumenta a síntese hepática de fatores de coagulação', 'E', 'e']];
function renderPilula(g) {
  const saved = store.get('co.pil', {});
  let m = CO_M[saved.m] ? saved.m : 'aoc', ov = saved.ov !== false, E = true, Pg = true;
  g.innerHTML =
    `<section class="card" style="min-width:0"><div class="card-h"><div><span class="eyebrow">Simulador</span><h3>Quais barreiras cada pílula ergue?</h3></div>${moreBtn('co_mec')}</div>
      <div class="sub">Formulação</div><div class="chips wrapc" id="plM">${Object.entries(CO_M).map(([k, v]) => `<button class="chip" data-m="${k}">${v.n}</button>`).join('')}</div>
      <p class="note" id="plTakes" style="font-size:13.5px;color:var(--fg)"></p>
      <div id="plOvWrap" hidden><div class="sub">Neste ciclo</div>${pick('plOv', [['1', 'Houve ovulação'], ['0', 'Não houve ovulação']], '1')}</div>
      <div class="sub" style="margin-top:16px">As quatro barreiras</div><div class="barr" id="plB"></div><p class="note">E = estrogênio · P = progestina: o componente responsável por cada barreira.</p>
      <div id="plCyc"></div>
    </section>` +
    card('Eixo, ovário e útero', `<div id="plFHost"></div>
      <div class="row" style="justify-content:space-between;margin-top:6px"><span class="note" style="margin:0">Linha pontilhada: hormônios da pílula.</span><button class="btn small" id="plPlay" aria-pressed="false"></button></div>
      ${coTiles('pl')}<div class="insight" id="plTell" aria-live="polite"></div>`, { eyebrow: 'Ao vivo' }) +
    card('O mês com e sem a pílula', `<div class="range"><label for="plR">Dia</label><output id="plO"></output><input type="range" id="plR" min="1" max="28" step="0.1"></div>
      <div id="plCh" style="margin-top:8px"></div><div class="legend"><span><i class="l-fsh"></i>FSH</span><span><i class="l-lh"></i>LH</span><span><i class="l-e2"></i>estradiol</span><span><i class="l-p4"></i>progesterona</span><span><i class="l-gh"></i>ciclo natural, para comparar</span></div>
      <p class="note">As curvas mostram os hormônios da própria mulher. Os hormônios da pílula aparecem como os pontos no alto do gráfico: cheio = pílula ativa, vazado = pausa. Modelo qualitativo.</p>`) +
    card('Quem faz o quê na pílula combinada', `<div class="row"><label class="toggle"><input type="checkbox" id="whoE" checked>Estrogênio</label><label class="toggle"><input type="checkbox" id="whoP" checked>Progestina</label></div>
      <div id="whoL" class="why"></div><div class="verdict" id="whoV" style="margin-top:12px"></div>`, { lede: 'Desligue um componente e veja o que a pílula perde.' }) +
    card('Roteiro do laboratório', roteiro([
      ['Com a pílula combinada, passe o mês inteiro. Em que dias o FSH sobe? O que isso significa?', 'Na pausa (dias 22 a 28). Sem hormônio exógeno, o freio some e os folículos voltam a crescer. Sete dias não bastam para ovular; mais do que isso, o risco aparece. <button class="lnk" style="border:0;background:none;padding:0;font:inherit" data-go="cartela">Teste na cartela.</button>'],
      ['Na minipílula tradicional, escolha “Houve ovulação”. Por que a mulher continua protegida?', 'Porque o muco espesso impede que os espermatozoides cheguem ao óvulo: na figura, o óvulo é liberado, mas fica sem espermatozoide. A proteção depende de o muco estar espesso todos os dias, e esse efeito dura cerca de 24 horas.'],
      ['Qual formulação sem estrogênio protege mais contra um atraso de horas? Por quê?', 'As progestinas em dose anovulatória (desogestrel 75 µg e drospirenona 4 mg): além do muco, bloqueiam a ovulação, então um atraso de algumas horas não desfaz a proteção. Janela de 12 horas para o desogestrel e de 24 horas para a drospirenona, contra 3 horas da noretisterona.'],
      ['O sangramento da pausa é uma menstruação?', 'Não. É um sangramento de privação: o endométrio fino descama porque os hormônios da pílula foram retirados. Não houve ovulação nem fase lútea. Por isso ele é mais curto e escasso, e pode ser suprimido em esquemas contínuos.'],
    ]), { wide: true, lede: 'Responda antes de abrir cada resposta.' });
  const sim = coSim({ chart: 'plCh', fig: 'plF', range: 'plR', out: 'plO', play: 'plPlay', tell: 'plTell', m, day: 10, onDay: (d, q) => coTilesSet('pl', d, q) });
  sim.play(false);
  const upd = () => {
    store.set('co.pil', { m, ov });
    $('plM').querySelectorAll('.chip').forEach(c => c.classList.toggle('on', c.dataset.m === m));
    $('plTakes').innerHTML = CO_TAKES[m]; $('plOvWrap').hidden = m !== 'pop';
    $('plB').innerHTML = CO_BARR[m].map(([lv, st, tx, ep], i) => `<div class="br"><b>${i + 1}. ${CO_BN[i]}${ep ? `<span class="ep">${ep}</span>` : ''}</b><span class="bs" style="color:${lv >= 3 ? 'var(--accent)' : lv ? 'var(--warn)' : 'var(--muted)'}">${st}</span><div class="meter"><i style="width:${[4, 34, 67, 100][lv]}%"></i></div><p>${tx}</p></div>`).join('');
    const c = CO_OV100[m];
    $('plCyc').innerHTML = c ? `<div class="sub" style="margin-top:16px">Em 100 ciclos de uso correto, em quantos há ovulação?</div><div class="dots100" role="img" aria-label="${c[0]} de 100 ciclos com ovulação">${Array.from({ length: 100 }, (_, i) => `<i class="${i < c[0] ? 'on' : ''}"></i>`).join('')}</div><p class="note">${c[1]}</p>` : '';
    sim.set(m, m === 'pop' ? ov : true);
  };
  $('plM').onclick = e => { const c = e.target.closest('.chip'); if (!c) return; m = c.dataset.m; upd(); };
  bindPick('plOv', v => { ov = v === '1'; upd(); });
  $('plOv').querySelectorAll('.chip').forEach(b => { const on = (b.dataset.v === '1') === ov; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
  const who = () => {
    E = $('whoE').checked; Pg = $('whoP').checked;
    $('whoL').innerHTML = CO_WHO.map(([t, tag, k]) => { const on = k === 'e' ? E : Pg; return `<div style="opacity:${on ? 1 : .35}"><span>${t}</span><span class="ep" style="margin:0">${tag}</span><span class="${on ? 'ok' : 'no'}">${on ? 'sim' : 'não'}</span></div>`; }).join('');
    const v = E && Pg ? ['neu', 'Pílula combinada', 'Ovulação bloqueada e sangramento previsível, ao custo do efeito hepático do estrogênio (coagulação, SHBG, angiotensinogênio).']
      : Pg ? ['neu', 'Pílula só de progestina', 'Mantém as barreiras da progestina e deixa de lado o efeito do estrogênio sobre a coagulação. Perde o controle do sangramento: escapes e amenorreia são comuns.']
      : E ? ['bad', 'Estrogênio sozinho não é contraceptivo', 'Freia o FSH, mas não garante o bloqueio do pico de LH, não espessa o muco e faz o endométrio proliferar sem oposição.']
      : ['neu', 'Sem hormônio', 'Ciclo natural: nenhuma barreira.'];
    $('whoV').className = 'verdict ' + v[0]; $('whoV').innerHTML = `<b>${v[1]}</b><span>${v[2]}</span>`;
  };
  $('whoE').onchange = who; $('whoP').onchange = who; who(); upd();
  return () => sim.stop();
}
