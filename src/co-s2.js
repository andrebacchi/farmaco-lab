/* ===== Contraceptivos · Tela 3 · Cartela e esquecimento ===== */
const POPW = {
  net: ['Noretisterona 0,35 mg', 3, 2, 'CDC, 2024', 'Protege quase só pelo muco, e o efeito no muco se perde em cerca de 24 horas. A janela de 3 horas é a margem de segurança.'],
  dsg: ['Desogestrel 75 µg', 12, 2, 'FSRH, 2022; a bula pede 7 dias', 'Também bloqueia a ovulação, o que dá folga: a inibição se mantém com atrasos de até 12 horas.'],
  drsp: ['Drospirenona 4 mg (24/4)', 24, 7, 'CDC, 2024', 'Meia-vida de cerca de 30 horas e bloqueio da ovulação: tolera 24 horas de atraso. Passou disso, vale a regra da combinada.'],
};
function renderCartela(g) {
  const saved = store.get('co.cart', {}), N = 35;
  let reg = saved.reg === '24' ? '24' : '21', miss = new Set(Array.isArray(saved.miss) ? saved.miss : [1, 2]), join = !!saved.join, sex = false, pop = 'net', late = 5;
  const act = () => reg === '21' ? 21 : 24;
  const kind = d => d <= act() ? 'a' : d <= 28 ? (join ? 'n' : 'p') : 'n';          // ativa · pausa/placebo · nova cartela
  const hormone = d => kind(d) !== 'p' && !miss.has(d);
  const idx = d => kind(d) === 'a' ? d : join ? d - act() : d - 28;                    // número da pílula dentro da cartela
  g.innerHTML =
    `<section class="card" style="min-width:0"><div class="card-h"><div><span class="eyebrow">Simulador</span><h3>Toque nas pílulas para esquecê-las</h3></div>${moreBtn('co_cartela')}</div>
      <div class="sub">Esquema</div>${pick('ctReg', [['21', '21 ativas + 7 de pausa'], ['24', '24 ativas + 4 placebos']], reg)}
      <div class="sub">Situações para testar</div><div class="chips wrapc" id="ctSc"></div>
      <div class="pack" id="ctPack" style="margin-top:14px"></div>
      <div class="legend"><span><i style="background:var(--accent);width:10px;height:10px;border-radius:50%"></i>tomada</span><span><i style="border:1.5px dashed var(--bad);width:10px;height:10px;border-radius:50%;background:none"></i>esquecida</span><span><i style="background:var(--ink);width:10px;height:10px;border-radius:50%"></i>nova cartela</span><span><i style="background:var(--warn);width:10px;height:10px;border-radius:50%;opacity:.5"></i>proteção reduzida</span></div>
      <div class="stack" style="margin-top:12px"><label class="toggle"><input type="checkbox" id="ctJoin">Emendar: começar a nova cartela sem pausa</label><label class="toggle"><input type="checkbox" id="ctSex">Houve relação desprotegida nos 5 dias anteriores</label></div>
    </section>` +
    `<section class="card" style="min-width:0"><div class="card-h"><div><span class="eyebrow">Ao vivo</span><h3>O que acontece no ovário</h3></div></div>
      <div class="tiles"><div class="tile" id="ctK1"><span>Maior intervalo sem hormônio</span><b id="ctT1"></b><small>limite: 7 dias</small></div><div class="tile" id="ctK2"><span>Atividade folicular</span><b id="ctT2"></b><small>do limiar de escape, no pico</small></div><div class="tile" id="ctK3"><span>Proteção reduzida</span><b id="ctT3"></b><small id="ctT3s"></small></div></div>
      <div id="ctFig" style="margin-top:10px"></div>
      <div class="legend"><span><i style="background:var(--accent)"></i>atividade folicular (modelo)</span><span><i style="background:repeating-linear-gradient(90deg,var(--bad) 0 5px,transparent 5px 9px)"></i>limiar de escape</span><span><i style="background:var(--warn);height:10px;opacity:.35"></i>proteção reduzida</span></div>
      <div class="verdict" id="ctV" style="margin-top:12px"></div><ol class="cond" id="ctC"></ol>
      <div class="insight" id="ctI"></div>
      <p class="note">Conduta: CDC, Selected Practice Recommendations, 2024, a mesma regra da aula. A curva é um modelo didático: sobe a cada dia sem hormônio e leva 7 pílulas seguidas para voltar a zero. Mostra a lógica, não prevê a ovulação de uma paciente.</p>
    </section>` +
    card('E a minipílula? A janela é contada em horas', `${pick('ctPop', Object.entries(POPW).map(([k, v]) => [k, v[0]]), pop)}
      <div class="range" style="margin-top:12px"><label for="ctLate">Atraso em relação ao horário habitual</label><output id="ctLateO"></output><input type="range" id="ctLate" min="0" max="36" step="0.5" value="5"></div>
      <div class="win" id="ctWin"></div><div class="verdict" id="ctPV" style="margin-top:10px"></div><p class="note" id="ctPN"></p>`,
      { lede: 'Sem estrogênio e, na tradicional, sem bloqueio confiável da ovulação: o que protege é o muco, e ele depende do horário.', more: 'co_mini' }) +
    card('Roteiro do laboratório', roteiro([
      ['Esqueça só a pílula 11. Depois, só a pílula 1. A conduta é a mesma. O risco também?', 'A conduta é a mesma: tomar assim que lembrar e seguir, sem proteção adicional. Mas o gráfico mostra a diferença: a pílula 1 encosta na pausa e estica o intervalo sem hormônio para 8 dias. A margem acabou: outro esquecimento por perto já cruza o limiar.'],
      ['Esqueça as pílulas 20 e 21 e olhe o gráfico. Agora marque “Emendar”. O que mudou?', 'Sem emendar, a pausa vira um intervalo de 9 dias sem hormônio e a atividade folicular cruza o limiar. Emendando, as duas pílulas esquecidas ficam cercadas de pílulas ativas e o ovário continua suprimido. É por isso que a conduta da terceira semana é pular a pausa.'],
      ['Esqueça as pílulas 10 e 11. O modelo quase não se mexe, mas a regra pede 7 dias de preservativo. Por quê?', 'A regra é simples de propósito: a mesma conduta para qualquer semana, fácil de lembrar e de ensinar. No meio da cartela o ovário está bem suprimido e o risco real é baixo; ao lado da pausa, é alto. A regra cobre o pior caso.'],
      ['Por que são 7 pílulas seguidas para recuperar a proteção?', 'Estudos com ultrassom e dosagens hormonais mostram que 7 dias seguidos de pílula bastam para suprimir de novo o eixo e interromper o crescimento folicular. É a lógica da pausa, ao contrário: 7 dias sem pílula é o máximo; 7 dias com pílula é o mínimo.'],
    ]), { lede: 'Faça cada passo na cartela antes de abrir a resposta.' });

  const compute = () => {
    const pauseLen = 28 - act(), pts = [[0, pauseLen / 9]];
    let A = pauseLen / 9, base = A, run = 0, hf = pauseLen, maxHF = pauseLen, peak = A;
    for (let d = 1; d <= N; d++) {
      if (hormone(d)) { if (run === 0) base = A; run++; A = base * Math.max(0, 1 - run / 7); hf = 0; }
      else { run = 0; A += 1 / 9; hf++; maxHF = Math.max(maxHF, hf); }
      pts.push([d, A]); peak = Math.max(peak, A);
    }
    // sequências de pílulas esquecidas
    const runs = []; let c = null;
    for (let d = 1; d <= N + 1; d++) {
      if (d <= N && miss.has(d) && kind(d) !== 'p') { if (c && c.to === d - 1 && (kind(d) === kind(c.to) || join)) c.to = d; else { c = { from: d, to: d }; runs.push(c); } }
    }
    const unprot = new Set();
    runs.forEach(r => { r.len = r.to - r.from + 1; r.first = idx(r.from); r.last = idx(r.to); r.pack1 = kind(r.to) === 'a';
      r.w1 = r.first <= 7; r.w3 = r.pack1 && r.last >= act() - 6;
      if (r.len >= 2) { for (let d = r.from; d <= r.to; d++) unprot.add(d); let k = 0; for (let d = r.to + 1; d <= N && k < 7; d++) { unprot.add(d); k = hormone(d) ? k + 1 : 0; } } });
    return { pts, maxHF, peak, runs, unprot, pauseLen };
  };
  const draw = () => {
    store.set('co.cart', { reg, miss: [...miss], join });
    const R = compute(), a = act();
    // cartela
    const rows = [['Semana 1', 1], ['Semana 2', 8], ['Semana 3', 15], [reg === '21' ? (join ? 'Nova cartela' : 'Pausa') : 'Semana 4', 22], [join ? 'Segue' : 'Nova cartela', 29]];
    $('ctPack').innerHTML = rows.map(([l, d0]) => `<div class="wk"><span>${l}</span>${Array.from({ length: 7 }, (_, i) => { const d = d0 + i, k = kind(d), ms = miss.has(d) && k !== 'p', up = R.unprot.has(d) && !ms;
      if (k === 'p') return `<span class="pl ${reg === '21' ? 'pause' : 'plac'}" title="${reg === '21' ? 'pausa' : 'placebo'}">${reg === '21' ? '' : 'pl'}</span>`;
      return `<button class="pl${k === 'n' ? ' next' : ''}${ms ? ' miss' : ''}${up ? ' unprot' : ''}" data-d="${d}" aria-pressed="${ms}" aria-label="Pílula ${idx(d)}${k === 'n' ? ' da nova cartela' : ''}${ms ? ', esquecida' : ', tomada'}">${ms ? '' : idx(d)}</button>`; }).join('')}</div>`).join('');
    $('ctJoin').checked = join; $('ctSex').checked = sex;
    const SC = [[[1, 2], 'Esqueci a 1ª e a 2ª'], [[10, 11], 'Esqueci 2 no meio'], [[a - 1, a], 'Esqueci as 2 últimas'], [[29, 30], 'Voltei da pausa 2 dias atrasada'], [[12], 'Esqueci só 1'], [[], 'Nenhuma esquecida']];
    $('ctSc').innerHTML = SC.map(([m, l]) => `<button class="chip${m.length === miss.size && m.every(x => miss.has(x)) ? ' on' : ''}" data-s="${m.join(',')}">${l}</button>`).join('');
    // números
    const nUn = R.unprot.size, bad = R.peak >= 0.999;
    $('ctT1').textContent = R.maxHF + (R.maxHF === 1 ? ' dia' : ' dias'); $('ctK1').className = 'tile' + (R.maxHF > 8 ? ' bad' : R.maxHF > 7 ? ' alt' : ' good');
    $('ctT2').textContent = pc(R.peak, 0); $('ctK2').className = 'tile' + (bad ? ' bad' : R.peak > 0.8 ? ' alt' : ' good');
    $('ctT3').textContent = nUn ? nUn + ' dias' : 'nenhum dia'; $('ctT3s').textContent = nUn ? 'preservativo ou abstinência' : 'proteção mantida'; $('ctK3').className = 'tile' + (nUn ? ' bad' : ' good');
    // gráfico
    const W = cw('ctFig'), L = 8, Rr = 8, T = 16, B = 150, x = d => L + d / N * (W - L - Rr), y = v => B - Math.min(v, 1.32) / 1.32 * (B - T);
    let s = `<svg class="ch" viewBox="0 0 ${W} 186" role="img" aria-label="Atividade folicular ao longo de 35 dias">`;
    for (let d = 1; d <= N; d++) { if (kind(d) === 'p') s += `<rect x="${x(d - 1)}" y="${T}" width="${x(d) - x(d - 1) + .3}" height="${B - T}" class="soft"/>`; if (R.unprot.has(d)) s += `<rect x="${x(d - 1)}" y="${T}" width="${x(d) - x(d - 1) + .3}" height="${B - T}" class="unp"/>`; }
    [7, 14, 21, 28].forEach(d => s += `<line x1="${x(d)}" x2="${x(d)}" y1="${T}" y2="${B}" class="gr"/>`);
    s += `<line x1="${L}" x2="${W - Rr}" y1="${B}" y2="${B}" class="ax"/><line x1="${L}" x2="${W - Rr}" y1="${y(1)}" y2="${y(1)}" class="thr"/><text x="${W - Rr}" y="${y(1) - 5}" text-anchor="end" style="fill:var(--bad);font-weight:600">limiar de escape</text>`;
    const line = R.pts.map(([d, v], i) => (i ? 'L' : 'M') + x(d).toFixed(1) + ' ' + y(v).toFixed(1)).join('');
    s += `<path d="${line} L${x(N)} ${B} L${x(0)} ${B} Z" class="acta"/><path d="${line}" class="actl"/>`;
    for (let d = 1; d <= N; d++) { const cx = (x(d - 1) + x(d)) / 2;
      if (miss.has(d) && kind(d) !== 'p') s += `<path d="M${cx - 3.5} ${B + 6} l7 7 m0 -7 l-7 7" style="stroke:var(--bad);stroke-width:2;fill:none"/>`;
      else if (kind(d) !== 'p') s += `<circle cx="${cx}" cy="${B + 9.5}" r="${W < 420 ? 2.2 : 2.8}" class="${kind(d) === 'n' ? 'ink' : 'hl'}"/>`; }
    [[3.5, 'semana 1'], [10.5, '2'], [17.5, '3'], [24.5, reg === '21' && !join ? 'pausa' : '4'], [31.5, 'nova cartela']].forEach(([d, t]) => s += `<text x="${x(d)}" y="181" text-anchor="middle">${t}</text>`);
    const pk = R.pts.reduce((m, p) => p[1] > m[1] ? p : m, R.pts[0]);
    if (pk[0] > 0) s += `<circle cx="${x(pk[0])}" cy="${y(pk[1])}" r="5" class="hl ring"/>`;
    $('ctFig').innerHTML = s + '</svg>';
    // conduta
    const multi = R.runs.filter(r => r.len >= 2), one = R.runs.filter(r => r.len === 1), C = [];
    if (multi.length) {
      C.push('Tome a pílula esquecida mais recente assim que lembrar e descarte as outras esquecidas. Siga a cartela no horário habitual.');
      C.push('Use preservativo ou evite relações até completar <b>7 pílulas ativas seguidas</b>.');
      if (multi.some(r => r.w3) && !join) C.push(`O esquecimento foi na última semana de pílulas ativas: <b>emende</b>. Termine as ativas e comece a nova cartela no dia seguinte, sem ${reg === '21' ? 'pausa' : 'os placebos'}. <button class="lnk" style="border:0;background:none;padding:0;font:inherit" id="ctDoJoin">Emendar agora</button>`);
      if (join) C.push('Cartela emendada: a pausa foi eliminada e as 7 pílulas seguidas vêm sem interrupção.');
      if (multi.some(r => r.w1)) C.push(sex ? 'Houve relação desprotegida nos 5 dias anteriores a um esquecimento de primeira semana: <b>considere a anticoncepção de emergência</b>.' : 'Esquecimento na primeira semana: se houve relação desprotegida nos 5 dias anteriores, considere a anticoncepção de emergência.');
      C.push('Sem sangramento de privação na próxima pausa: descartar gestação.');
    } else if (one.length) {
      C.push(`${one.length === 1 ? `Pílula ${one[0].first} esquecida` : 'Pílulas esquecidas em dias separados'} (menos de 48 horas desde o horário): tome assim que lembrar, mesmo que sejam duas no mesmo dia.`);
      C.push('Siga a cartela no horário habitual. Não é preciso proteção adicional.');
      if (one.some(r => r.first === 1 || (r.pack1 && r.last === a)) && !join) C.push(`Esta pílula encosta na pausa: o intervalo sem hormônio foi de ${R.maxHF} dias. Se houve outros esquecimentos no fim da cartela anterior ou no começo desta, considere a anticoncepção de emergência.`);
    }
    const v = multi.length ? ['bad', 'Proteção reduzida', `${multi.reduce((n, r) => n + r.len, 0)} pílulas esquecidas em sequência (48 horas ou mais sem pílula).`] : one.length ? ['warn', 'Proteção mantida, com atenção', 'Uma pílula isolada não derruba a proteção.'] : ['good', 'Proteção mantida', 'Nenhuma pílula esquecida. Toque em qualquer pílula para ver o que muda.'];
    $('ctV').className = 'verdict ' + v[0]; $('ctV').innerHTML = `<b>${v[1]}</b><span>${v[2]}</span>`;
    $('ctC').innerHTML = C.map(t => `<li>${t}</li>`).join('');
    $('ctI').innerHTML = bad ? `O intervalo sem hormônio chegou a <b>${R.maxHF} dias</b> e, no modelo, a atividade folicular cruzou o limiar: um folículo pode amadurecer e ovular.`
      : multi.length ? 'No modelo, o ovário continuou suprimido: havia pílulas suficientes antes e depois do esquecimento. A regra pede proteção mesmo assim, porque vale para qualquer semana.'
      : `Maior intervalo sem hormônio: <b>${R.maxHF} dias</b>. Com até 7 dias, o ovário não tem tempo de levar um folículo à ovulação.`;
    const dj = $('ctDoJoin'); if (dj) dj.onclick = () => { join = true; draw(); };
  };
  $('ctPack').onclick = e => { const b = e.target.closest('button.pl'); if (!b) return; const d = +b.dataset.d; miss.has(d) ? miss.delete(d) : miss.add(d); draw(); };
  $('ctSc').onclick = e => { const c = e.target.closest('.chip'); if (!c) return; miss = new Set(c.dataset.s ? c.dataset.s.split(',').map(Number) : []); join = false; draw(); };
  bindPick('ctReg', v => { reg = v; miss = new Set([...miss].filter(d => kind(d) !== 'p')); draw(); });
  $('ctJoin').onchange = e => { join = e.target.checked; if (!join) miss = new Set([...miss].filter(d => kind(d) !== 'p')); draw(); };
  $('ctSex').onchange = e => { sex = e.target.checked; draw(); };
  draw();

  const drawPop = () => {
    const [n, win, days, src, why] = POPW[pop], ok = late <= win;
    $('ctLateO').textContent = late ? `${nf(late, late % 1 ? 1 : 0)} h de atraso` : 'no horário';
    $('ctWin').innerHTML = `<i style="width:${win / 36 * 100}%"></i>${win >= 12 ? '<span style="left:8px">dentro da janela</span>' : ''}${win <= 12 ? '<span style="right:8px">pílula esquecida</span>' : ''}<b style="left:${late / 36 * 100}%"></b>`;
    $('ctPV').className = 'verdict ' + (ok ? 'good' : 'bad');
    $('ctPV').innerHTML = ok ? `<b>Dentro da janela</b><span>Tome agora e siga no horário habitual. Proteção mantida.</span>`
      : `<b>Pílula esquecida</b><span>Tome agora, siga no horário habitual e use preservativo por <strong>${days} dias</strong> (${src}). Se houve relação desprotegida, considere a anticoncepção de emergência.</span>`;
    $('ctPN').textContent = `${n}: janela de ${win} horas (faixa verde; a barra vai até 36 horas). ${why}`;
  };
  bindPick('ctPop', v => { pop = v; drawPop(); });
  $('ctLate').oninput = e => { late = +e.target.value; drawPop(); };
  drawPop();
}
