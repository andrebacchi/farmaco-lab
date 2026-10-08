/* ===== Contraceptivos · Tela 4 (eficácia) e Tela 5 (trombose em perspectiva) ===== */
/* [id, nome, % uso perfeito, % uso real, nome curto] · gestações por 100 mulheres no 1º ano */
const CO_EFF = [
  ['none', 'Sem método', 85, 85, 'Sem método'],
  ['ritmo', 'Ritmo (tabelinha)', 3, 15, 'Ritmo'],
  ['cond', 'Preservativo masculino', 2, 13, 'Preservativo'],
  ['aoc', 'Pílula combinada', 0.3, 7, 'Pílula combinada'],
  ['pop', 'Minipílula', 0.3, 7, 'Minipílula'],
  ['cu', 'DIU de cobre', 0.6, 0.8, 'DIU de cobre'],
  ['laq', 'Laqueadura tubária', 0.5, 0.5, 'Laqueadura'],
  ['lng', 'DIU com levonorgestrel', 0.2, 0.2, 'DIU hormonal'],
  ['vas', 'Vasectomia', 0.10, 0.15, 'Vasectomia'],
  ['imp', 'Implante subdérmico', 0.05, 0.05, 'Implante'],
];
const effCum = (p, n) => 1 - Math.pow(1 - p / 100, n);
/* Coorte de 2.000 mulheres, mês a mês: mesma amostra, duas contas.
   seed = 0: valores esperados (sem acaso); seed > 0: coorte sorteada, para ver a oscilação de um estudo real.
   Com heterogeneidade: 1 em cada 5 mulheres tem risco mensal de 3% e as demais, de 0,1% (cerca de 7% de falha em 12 meses nos dois cenários). */
function ltCohort(seed, het, cm) {
  const N = 2000, M = 36, n = Array(M + 1).fill(0), d = Array(M + 1).fill(0), w = Array(M + 1).fill(0), hi = Array(M + 1).fill(0), HH = 0.03, HL = het ? 0.001 : 0.0061;
  if (!seed) { let nh = het ? N * 0.2 : 0, nl = N - nh;
    for (let t = 1; t <= M; t++) { n[t] = nh + nl; hi[t] = nh; d[t] = nh * HH + nl * HL; w[t] = (nh * (1 - HH) + nl * (1 - HL)) * cm; nh *= (1 - HH) * (1 - cm); nl *= (1 - HL) * (1 - cm); } }
  else { const rnd = prng(seed);
    for (let i = 0; i < N; i++) { const H = het && i < N * 0.2, h = H ? HH : HL;
      for (let t = 1; t <= M; t++) { n[t]++; if (H) hi[t]++; if (rnd() < h) { d[t]++; break; } if (rnd() < cm) { w[t]++; break; } } } }
  const S = [1], F = [0], WM = [0], D = [0];
  for (let t = 1; t <= M; t++) { S[t] = S[t - 1] * (n[t] ? 1 - d[t] / n[t] : 1); F[t] = 1 - S[t]; WM[t] = WM[t - 1] + n[t]; D[t] = D[t - 1] + d[t]; }
  return { N, M, n, d, w, hi, F, D, WM, pearl: t => D[t] * 1200 / WM[t] };
}

function renderEficacia(g) {
  const saved = store.get('co.eff', {});
  let id = CO_EFF.some(e => e[0] === saved.id) ? saved.id : 'aoc', real = saved.real !== false, yrs = saved.y || 1;
  g.innerHTML =
    `<section class="card" style="min-width:0"><div class="card-h"><div><span class="eyebrow">Simulador</span><h3>Mil mulheres, o mesmo método</h3></div>${moreBtn('co_eficacia')}</div>
      <div class="sub">Método</div><div class="chips wrapc" id="efM">${CO_EFF.map(e => `<button class="chip" data-m="${e[0]}">${e[1]}</button>`).join('')}</div>
      <div class="sub">Uso</div>${seg('efU', [['1', 'Uso real'], ['0', 'Uso perfeito']], real ? '1' : '0')}
      <div class="range" style="margin-top:14px"><label for="efY">Tempo de uso</label><output id="efYo"></output><input type="range" id="efY" min="1" max="10" step="1"></div>
      <div class="tiles" style="margin-top:12px"><div class="tile acc"><span>Engravidam</span><b id="efT1"></b><small id="efT1s"></small></div><div class="tile"><span>Risco no 1º ano</span><b id="efT2"></b><small id="efT2s"></small></div><div class="tile"><span>Proporção</span><b id="efT3"></b><small id="efT3s"></small></div></div>
      <div class="insight" id="efI"></div>
    </section>` +
    `<section class="card" style="min-width:0"><div class="card-h"><div><span class="eyebrow">Ao vivo</span><h3 id="efH"></h3></div></div>
      <div id="efFig"></div><div class="legend"><span><i style="background:var(--accent);width:9px;height:9px;border-radius:50%"></i>ao menos uma gestação não planejada</span><span><i style="background:var(--dot);width:9px;height:9px;border-radius:50%"></i>nenhuma</span></div>
      <p class="note">Cada ponto é uma mulher. O acumulado supõe o mesmo risco a cada ano, o que superestima um pouco: na vida real, quem continua com o método tende a falhar menos.</p></section>` +
    card('Todos os métodos na mesma régua', `<div id="efCmp"></div><p class="note">Valores de primeiro ano da tabela da aula. Onde a aula traz uma faixa, o simulador usa a estimativa mais recente (Trussell et al., Contraceptive Technology, 2018): pílula 7%, preservativo 13%, ritmo 15%.</p>`, { lede: 'Gestações em mil mulheres, no tempo e no tipo de uso escolhidos acima.' }) +
    card('Índice de Pearl: faça a conta', `<div class="fields">
        <div class="inp"><label for="peG">Gestações<small>não planejadas</small></label><div class="box"><input id="peG" type="number" inputmode="numeric" min="0" max="9999" value="7"></div></div>
        <div class="inp"><label for="peW">Mulheres<small>no estudo</small></label><div class="box"><input id="peW" type="number" inputmode="numeric" min="1" max="99999" value="100"></div></div>
        <div class="inp"><label for="peM">Meses de uso<small>por mulher</small></label><div class="box"><input id="peM" type="number" inputmode="numeric" min="1" max="120" value="12"></div></div></div>
      <div class="hh" id="peF" aria-live="polite"></div>
      <p class="note">Pearl (1933): gestações por 100 mulheres em 1 ano de uso. Hoje se preferem as tábuas de vida, que corrigem o efeito do tempo de acompanhamento.</p>`, { more: 'co_pearl' }) +
    card('Pearl ou tábua de vida? A mesma coorte, duas contas', `<div class="split"><div>
        <div class="range"><label for="ltD">Duração do estudo</label><output id="ltDo"></output><input type="range" id="ltD" min="3" max="36" step="1" value="12"></div>
        <div class="range" style="margin-top:6px"><label for="ltC">Abandono do método, por mês</label><output id="ltCo"></output><input type="range" id="ltC" min="0" max="8" step="0.5" value="3"></div>
        <label class="toggle" style="margin-top:6px"><input type="checkbox" id="ltHet" checked>Usuárias diferentes entre si: 1 em cada 5 com risco alto</label>
        <div class="tiles" style="margin-top:12px"><div class="tile" id="ltK1"><span>Índice de Pearl</span><b id="ltT1"></b><small id="ltT1s"></small></div><div class="tile acc"><span>Tábua de vida</span><b id="ltT2"></b><small id="ltT2s"></small></div><div class="tile"><span>Conta ingênua</span><b id="ltT3"></b><small id="ltT3s"></small></div></div>
        <div class="insight" id="ltI"></div>
        <div class="row" style="margin-top:12px"><button class="btn small" id="ltNew">Sortear uma coorte</button><button class="btn small" id="ltExp" hidden>Voltar ao esperado</button><span class="note" id="ltMode" style="margin:0"></span></div>
        <p class="note" style="margin-top:10px">A tábua de vida é parente da curva de Kaplan-Meier, que também conta a censura. <a href="https://andrebacchi.github.io/stat-lab/#testes-km" target="_blank" rel="noopener" style="color:var(--accent);font-weight:600">Monte uma no STAT LAB ›</a></p>
      </div><div>
        <div class="sub">Falha estimada para o primeiro ano, conforme a duração do estudo</div><div id="ltFig"></div>
        <div class="legend"><span><i style="background:repeating-linear-gradient(90deg,var(--fsh) 0 6px,transparent 6px 9px)"></i>índice de Pearl (por 100 mulheres-ano)</span><span><i style="background:var(--accent)"></i>tábua de vida em 12 meses (%)</span><span><i style="background:repeating-linear-gradient(90deg,var(--accent) 0 2px,transparent 2px 6px)"></i>antes de 12 meses: falha acumulada até ali</span></div>
        <div class="sub" style="margin-top:16px">A tábua de vida deste estudo</div><div class="tw"><table class="t" id="ltTab"></table></div>
      </div></div>
      <p class="note">Coorte simulada de 2.000 mulheres, calibrada para cerca de 7% de falha em 12 meses (pílula em uso real). No cenário com usuárias diferentes, 1 em cada 5 tem risco mensal de 3% (uso irregular ou fertilidade maior) e as demais, de 0,1%: são premissas didáticas. A cada mês, quem engravida sai como evento e quem abandona o método sai como censura. A tábua de vida multiplica, mês a mês, a probabilidade de continuar sem gestação (método de Kaplan-Meier).</p>`,
      { wide: true, more: 'co_pearl', eyebrow: 'Simulador', lede: 'O índice de Pearl depende de quanto tempo o estudo dura. A tábua de vida responde sempre à mesma pergunta: qual a probabilidade de falha em 12 meses.' }) +
    card('Roteiro do laboratório', roteiro([
      ['Pílula combinada, uso real, 10 anos. Quantas de mil mulheres engravidam ao menos uma vez? E com o implante?', 'Cerca de 516 com a pílula e 5 com o implante. O fármaco da pílula é excelente (0,3% em uso perfeito); o que falha é o uso. Métodos que não dependem de lembrar todos os dias quase não têm diferença entre uso perfeito e uso real.'],
      ['Um estudo acompanhou 250 mulheres por 6 meses e registrou 3 gestações. Qual é o índice de Pearl?', '3 × 1.200 ÷ (250 × 6) = <b>2,4</b> gestações por 100 mulheres-ano. Confira na calculadora.'],
      ['No comparador, estique o estudo de 6 para 36 meses. O que acontece com o Pearl? E com a tábua de vida em 12 meses? Depois desmarque “Usuárias diferentes entre si”.', 'O Pearl cai, sem que o método tenha mudado: as mulheres mais férteis e as que usam pior o método engravidam primeiro e saem, e sobra um grupo que falha menos. A tábua de vida em 12 meses não se mexe. Com usuárias iguais, o Pearl para de cair: é a heterogeneidade que o torna dependente da duração. Por isso índices de Pearl de estudos com durações diferentes não são comparáveis.'],
      ['Ainda no comparador, leve o abandono a 8% ao mês. Qual das três contas mais se afasta?', 'A conta ingênua (gestações divididas pelas mulheres que começaram): ela trata quem abandonou como se tivesse ficado o ano inteiro sem engravidar, e por isso subestima a falha. O Pearl e a tábua de vida contam cada mulher só enquanto ela esteve em risco.'],
      ['A maioria das gestações não planejadas vem de falha do método?', 'Não. A maior parte decorre de não usar método nenhum ou de usá-lo de forma inconsistente (Frost et al., 2008). Escolher um método que a paciente consiga usar pesa mais do que escolher o mais eficaz no papel.'],
    ]), { wide: true, lede: 'Responda antes de abrir cada resposta.' });

  const draw = () => {
    store.set('co.eff', { id, real, y: yrs });
    const e = CO_EFF.find(x => x[0] === id), p = real ? e[3] : e[2], cum = effCum(p, yrs), n = Math.round(cum * 1000);
    $('efM').querySelectorAll('.chip').forEach(c => c.classList.toggle('on', c.dataset.m === id));
    $('efY').value = yrs; $('efYo').textContent = yrs === 1 ? '1 ano' : yrs + ' anos';
    $('efH').textContent = `${e[1]}, ${real ? 'uso real' : 'uso perfeito'}, ${yrs === 1 ? '1 ano' : yrs + ' anos'}`;
    $('efT1').textContent = `${nf(n)} de 1.000`; $('efT1s').textContent = yrs === 1 ? 'no primeiro ano' : `ao menos uma vez em ${yrs} anos`;
    $('efT2').textContent = String(p).replace('.', ',') + '%'; $('efT2s').textContent = real ? 'uso real' : 'uso perfeito';
    $('efT3').textContent = cum >= 0.995 ? 'quase todas' : cum < 0.0005 ? '—' : `1 em ${nf(Math.max(1, Math.round(1 / cum)))}`; $('efT3s').textContent = 'mulheres';
    const gap = e[3] / e[2];
    $('efI').innerHTML = id === 'none' ? 'Sem método, cerca de 85 de cada 100 mulheres sexualmente ativas engravidam em um ano. É contra esse número que todo método deve ser comparado.'
      : gap >= 3 ? `Em uso perfeito, ${String(e[2]).replace('.', ',')}%. Em uso real, ${String(e[3]).replace('.', ',')}%: <b>${nf(gap, 0)} vezes mais</b>. A diferença não é do método, é do uso: esquecimentos, atrasos, interrupções.`
      : `Uso perfeito e uso real quase coincidem (${String(e[2]).replace('.', ',')}% e ${String(e[3]).replace('.', ',')}%): depois de colocado ou realizado, o método <b>não depende da memória</b> de ninguém.`;
    // arranjo de ícones: 1.000 mulheres
    const W = cw('efFig'), cols = W >= 520 ? 50 : 40, rows = 1000 / cols, c = W / cols, r = c * 0.36;
    let s = `<svg class="ch" viewBox="0 0 ${W} ${(rows * c).toFixed(1)}" role="img" aria-label="${n} de 1.000 mulheres com gestação não planejada">`;
    for (let i = 0; i < 1000; i++) s += `<circle cx="${((i % cols) * c + c / 2).toFixed(1)}" cy="${(Math.floor(i / cols) * c + c / 2).toFixed(1)}" r="${r.toFixed(1)}" class="${i < n ? 'ic1' : 'ic0'}"/>`;
    $('efFig').innerHTML = s + '</svg>';
    // comparação
    const W2 = cw('efCmp'), rowsC = CO_EFF.map(x => ({ k: x[0], n: W2 < 460 ? x[4] : x[1], v: effCum(real ? x[3] : x[2], yrs) * 1000 })).sort((a, b) => b.v - a.v);
    const rh = 24, L = W2 < 460 ? 124 : 176, Rr = 46, H = rowsC.length * rh + 4;
    let t = `<svg class="ch" viewBox="0 0 ${W2} ${H}" role="img" aria-label="Gestações em mil mulheres, por método">`;
    rowsC.forEach((q, i) => { const yy = i * rh + 2, w = Math.max(1.5, q.v / 1000 * (W2 - L - Rr)), me = q.k === id;
      t += `<text x="${L - 8}" y="${yy + 15}" text-anchor="end" class="${me ? 'lbl' : ''}">${q.n}</text><rect x="${L}" y="${yy + 3}" width="${W2 - L - Rr}" height="16" rx="4" class="soft"/><rect x="${L}" y="${yy + 3}" width="${w}" height="16" rx="${Math.min(4, w / 2)}" class="hl" style="opacity:${me ? 1 : .4}"/><text x="${L + w + 6}" y="${yy + 15}" class="${me ? 'lbl' : ''}">${nf(q.v, q.v < 10 && q.v % 1 ? 1 : 0)}</text>`; });
    $('efCmp').innerHTML = `<div class="tw">${t}</svg></div>`;
  };
  $('efM').onclick = e => { const c = e.target.closest('.chip'); if (!c) return; id = c.dataset.m; draw(); };
  bindSeg('efU', v => { real = v === '1'; draw(); });
  $('efY').oninput = e => { yrs = +e.target.value; draw(); };
  draw();
  const pearl = () => {
    const G = Math.max(0, +$('peG').value || 0), Wn = Math.max(1, +$('peW').value || 1), M = Math.max(1, +$('peM').value || 1), P = G * 1200 / (Wn * M);
    $('peF').innerHTML = `<div class="hh-h"><span class="eyebrow">Gestações por 100 mulheres-ano</span></div>
      <div class="hh-row hh-sol" style="border-top:0;padding-top:0"><span>IP</span><i>=</i><span class="frac"><span>gestações × 1.200</span><span>mulheres × meses</span></span></div>
      <div class="hh-row hh-sol"><span class="frac"><span>${nf(G)} × 1.200</span><span>${nf(Wn)} × ${nf(M)}</span></span><i>=</i><span class="frac"><span>${nf(G * 1200)}</span><span>${nf(Wn * M)}</span></span><i>=</i><span class="v vpk">${nf(P, P < 10 ? 2 : 1)}</span></div>
      <p class="hh-words">${nf(Wn * M)} meses-mulher de exposição equivalem a ${nf(Wn * M / 12, (Wn * M) % 12 ? 1 : 0)} mulheres-ano. ${P < 1 ? 'Abaixo de 1: faixa dos métodos mais eficazes.' : P < 10 ? 'Entre 1 e 10: faixa do uso real dos métodos que dependem da usuária.' : 'Acima de 10: eficácia baixa.'}</p>`;
  };
  ['peG', 'peW', 'peM'].forEach(k => $(k).oninput = pearl); pearl();
  // comparador Pearl × tábua de vida
  let seed = 0, C = null, key = '';
  const lt = () => {
    const D = +$('ltD').value, cm = +$('ltC').value / 100, het = $('ltHet').checked, k = [seed, het, cm].join();
    if (k !== key) { C = ltCohort(seed, het, cm); key = k; }
    const T = Math.min(D, 12), P = C.pearl(D), F = C.F[T], naive = C.D[T] / C.N;
    $('ltDo').textContent = D + ' meses'; $('ltCo').textContent = nf(cm * 100, 1) + '%';
    $('ltT1').textContent = nf(P, 1); $('ltT1s').textContent = `${nf(C.D[D])} gestações em ${nf(C.WM[D])} meses-mulher`;
    $('ltExp').hidden = !seed; $('ltMode').textContent = seed ? 'Coorte sorteada: os números oscilam, como num estudo real.' : 'Valores esperados, sem o acaso.';
    $('ltT2').textContent = pc(F, 1); $('ltT2s').textContent = `falha acumulada em ${T} meses`;
    $('ltT3').textContent = pc(naive, 1); $('ltT3s').textContent = `${nf(C.D[T])} gestações ÷ ${nf(C.N)} que começaram`;
    const h0 = C.hi[1] / C.n[1], hD = C.n[D] ? C.hi[D] / C.n[D] : 0;
    $('ltI').innerHTML = (het ? `Com ${D} meses de estudo, o Pearl é <b>${nf(P, 1)}</b>. Com 6 meses seria ${nf(C.pearl(6), 1)}; com 36, ${nf(C.pearl(36), 1)}. O método é o mesmo: muda quem ainda está no estudo. No primeiro mês, ${pc(h0, 0)} das mulheres em risco eram de risco alto; no mês ${D}, ${pc(hD, 0)}.`
      : `Com usuárias iguais, o Pearl não depende da duração: ${nf(C.pearl(6), 1)} com 6 meses, ${nf(C.pearl(36), 1)} com 36${seed ? ' (a diferença é oscilação da amostra)' : ''}. Fica um pouco acima da tábua de vida porque é uma taxa, e não uma probabilidade.`)
      + (D < 12 ? ' Com menos de 12 meses de estudo, não existe estimativa de 12 meses na tábua de vida.' : ` A tábua de vida em 12 meses dá <b>${pc(C.F[12], 1)}</b>, dure o estudo ${D} ou 36 meses.`);
    // gráfico: duas estimativas em função da duração do estudo
    const W = cw('ltFig'), L = 30, R = 12, Tp = 10, B = 150, ymax = Math.max(10, Math.ceil(Math.max(...Array.from({ length: 34 }, (_, i) => C.pearl(i + 3)), C.F[12] * 100) + 1)), x = t => L + (t - 3) / 33 * (W - L - R), y = v => B - v / ymax * (B - Tp);
    let s = `<svg class="ch" viewBox="0 0 ${W} 184" role="img" aria-label="Índice de Pearl e tábua de vida conforme a duração do estudo">`;
    for (let v = 0; v <= ymax; v += ymax > 12 ? 4 : 2) s += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" class="gr"/><text x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${v}</text>`;
    [6, 12, 18, 24, 30, 36].forEach(t => s += `<text x="${x(t)}" y="${B + 16}" text-anchor="middle">${t}</text>`);
    s += `<text x="${W - R}" y="180" text-anchor="end">meses de estudo</text>`;
    let pp = '', pd = ''; for (let t = 3; t <= 36; t++) pp += (pp ? 'L' : 'M') + x(t).toFixed(1) + ' ' + y(C.pearl(t)).toFixed(1);
    for (let t = 3; t <= 12; t++) pd += (pd ? 'L' : 'M') + x(t).toFixed(1) + ' ' + y(C.F[t] * 100).toFixed(1);
    s += `<path d="${pd}" class="ltd"/><path d="M${x(12)} ${y(C.F[12] * 100)} H${x(36)}" class="ltl"/><path d="${pp}" class="prl"/>`;
    s += `<line x1="${x(D)}" x2="${x(D)}" y1="${Tp}" y2="${B}" class="cursor"/><circle cx="${x(D)}" cy="${y(P)}" r="5.5" class="fFSH ring"/><circle cx="${x(D)}" cy="${y(C.F[T] * 100)}" r="5.5" class="hl ring"/>`;
    $('ltFig').innerHTML = s + '</svg>';
    // a tábua, por trimestre
    let rows = '';
    for (let a = 1; a <= D; a += 3) { const b = Math.min(a + 2, D); let dd = 0, ww = 0; for (let t = a; t <= b; t++) { dd += C.d[t]; ww += C.w[t]; }
      rows += `<tr style="cursor:default"><td>${a === b ? a : a + ' a ' + b}</td><td>${nf(C.n[a])}</td><td>${nf(dd)}</td><td>${nf(ww)}</td><td>${pc(C.F[b], 1)}</td></tr>`; }
    $('ltTab').innerHTML = `<thead><tr><th>Meses</th><th>Em risco</th><th>${W > 420 ? 'Gestações' : 'Gest.'}</th><th>Saídas</th><th>${W > 420 ? 'Falha acumulada' : 'Acum.'}</th></tr></thead><tbody>${rows}</tbody>`;
  };
  $('ltD').oninput = lt; $('ltC').oninput = lt; $('ltHet').onchange = lt; $('ltNew').onclick = () => { seed += 13; lt(); }; $('ltExp').onclick = () => { seed = 0; lt(); };
  lt();
}

/* [id, nome curto, nome completo, casos por 10.000 mulheres-ano (mín, máx), fonte] */
const CO_VTE = [
  ['non', 'Não usa pílula', 'Mulher que não usa contraceptivo hormonal e não está grávida', 2, 2, 'EMA, 2014'],
  ['pop', 'Minipílula', 'Pílula só de progestina', 2, 2, 'sem aumento demonstrado (Mantha et al., 2012)'],
  ['lng', 'Combinada com levonorgestrel', 'Combinada com levonorgestrel, noretisterona ou norgestimato', 5, 7, 'EMA, 2014'],
  ['dsg', 'Combinada com drospirenona', 'Combinada com drospirenona, desogestrel ou gestodeno', 9, 12, 'EMA, 2014'],
  ['preg', 'Gestação', 'Durante a gestação', 5, 20, 'faixa da aula'],
  ['pp', 'Puerpério', 'Nas 12 semanas depois do parto', 40, 65, 'faixa da aula'],
];
const CO_MARK = { shbg: ['SHBG', [['Estetrol + drospirenona', 55], ['Etinilestradiol + levonorgestrel', 74], ['Etinilestradiol + drospirenona', 251]]], apc: ['Resistência à proteína C ativada', [['Estetrol + drospirenona', 30], ['Etinilestradiol + levonorgestrel', 165], ['Etinilestradiol + drospirenona', 219]]] };
const CO_PROG = [
  ['Levonorgestrel', '2ª', 'Alta', '5 a 7', 'Referência: o menor risco entre as combinadas com etinilestradiol.'],
  ['Norgestimato', '3ª', 'Baixa', '5 a 7', 'Semelhante ao levonorgestrel.'],
  ['Desogestrel, gestodeno', '3ª', 'Baixa', '9 a 12', 'O paradoxo: menos androgênicas, mais trombose.'],
  ['Drospirenona', '4ª', 'Antiandrogênica', '9 a 12', 'Antimineralocorticoide. Útil em acne e TDPM; pesar contra o risco.'],
  ['Dienogeste + etinilestradiol', '4ª', 'Antiandrogênica', '8 a 11', 'EMA, 2018.'],
  ['Dienogeste + valerato de estradiol', '4ª', 'Antiandrogênica', '≈ levonorgestrel', 'INAS-SCORE: risco não superior ao do levonorgestrel.'],
  ['Nomegestrol + estradiol', '4ª', 'Nula', '≈ levonorgestrel', 'PRO-E2 (Reed et al., 2021).'],
  ['Drospirenona + estetrol', '4ª', 'Antiandrogênica', 'ainda sem dado', 'Marcadores de coagulação favoráveis; desfecho clínico em estudo.'],
  ['Progestina isolada (minipílula)', '—', 'Varia', '≈ 2 (sem aumento)', 'Opção quando o estrogênio é contraindicado.'],
];
function renderTrombose(g) {
  const saved = store.get('co.tev', {});
  let id = CO_VTE.some(v => v[0] === saved.id) ? saved.id : 'lng', frame = 'abs', mk = 'shbg';
  const rnd = prng(41), ORD = [];
  while (ORD.length < 70) { const q = [3 + Math.floor(rnd() * 119), 3 + Math.floor(rnd() * 74)]; if (ORD.every(o => Math.hypot(o[0] - q[0], o[1] - q[1]) > 7)) ORD.push(q); }   // casos espalhados, sem sobreposição
  g.innerHTML =
    `<section class="card" style="min-width:0"><div class="card-h"><div><span class="eyebrow">Simulador</span><h3>Dez mil mulheres, um ano</h3></div>${moreBtn('co_tev')}</div>
      <div class="sub">Situação</div><div class="chips wrapc" id="tvS">${CO_VTE.map(v => `<button class="chip" data-s="${v[0]}">${v[1]}</button>`).join('')}</div>
      <div class="tiles" style="margin-top:14px"><div class="tile acc"><span>Trombose venosa</span><b id="tvT1"></b><small>casos em 10.000 mulheres por ano</small></div><div class="tile"><span>Risco relativo</span><b id="tvT2"></b><small>contra quem não usa</small></div><div class="tile"><span>Casos a mais</span><b id="tvT3"></b><small id="tvT3s"></small></div></div>
      <div class="sub" style="margin-top:16px">O mesmo dado, duas manchetes</div>${seg('tvFr', [['abs', 'Risco absoluto'], ['rel', 'Risco relativo']], 'abs')}
      <div class="headline" id="tvH" style="margin-top:10px"></div>
      <div class="insight" id="tvI"></div>
      <div class="row" style="margin-top:12px"><a class="btn small" href="https://andrebacchi.github.io/study-lab/#medidas" target="_blank" rel="noopener">Risco relativo, absoluto e NNT no STUDY LAB ›</a></div>
    </section>` +
    `<section class="card" style="min-width:0"><div class="card-h"><div><span class="eyebrow">Ao vivo</span><h3 id="tvTt"></h3></div></div>
      <div id="tvFig"></div><div class="legend"><span><i style="background:var(--accent);width:10px;height:10px;border-radius:50%"></i>caso de trombose (estimativa mínima)</span><span><i style="border:1.6px solid var(--accent);width:10px;height:10px;border-radius:50%;background:none"></i>até a estimativa máxima</span><span><i style="background:var(--dot);width:6px;height:6px;border-radius:50%"></i>sem trombose</span></div>
      <p class="note" id="tvN"></p></section>` +
    card('Por que a progestina muda o risco de uma pílula com estrogênio?', `${pick('tvMk', [['shbg', 'SHBG'], ['apc', 'Resistência à proteína C ativada']], 'shbg')}
      <div id="tvMkFig" style="margin-top:10px"></div>
      <div class="insight">O etinilestradiol estimula o fígado a produzir fatores de coagulação. Uma progestina androgênica, como o levonorgestrel, <b>se opõe</b> a esse efeito; a drospirenona não. Trocar o etinilestradiol pelo estetrol reduz o impacto hepático mesmo com drospirenona.</div>
      <p class="note">Variação mediana depois de 6 ciclos, em estudo randomizado (Douxfils et al., Contraception, 2020). São marcadores substitutos: indicam o mecanismo, não substituem a contagem de eventos clínicos.</p>`, { lede: 'A “estrogenicidade total” da pílula pode ser medida no sangue.' }) +
    card('Progestinas: geração, perfil e trombose', `<div class="why"><div class="hd" style="grid-template-columns:minmax(0,1fr) auto"><span>Progestina · geração · atividade androgênica</span><span>Casos por 10.000 por ano</span></div>${CO_PROG.map(p => `<div style="grid-template-columns:minmax(0,1fr) minmax(84px,auto)"><span><b>${p[0]}</b> <span class="tag">${p[1] === '—' ? 'sem estrogênio' : p[1] + ' geração'}</span> <span class="tag">${p[2].toLowerCase()}</span><br><span style="color:var(--muted);font-size:12.5px">${p[4]}</span></span><span class="num" style="font-weight:600;text-align:right">${p[3]}</span></div>`).join('')}</div>
      <p class="note">Quem não usa: cerca de 2 por 10.000 por ano. Fontes: EMA (2014, 2018); Lidegaard et al., 2011; Vinogradova et al., 2015; Dinger et al., 2016; Reed et al., 2021.</p>`) +
    card('Roteiro do laboratório', roteiro([
      ['Uma manchete diz que as pílulas com drospirenona “dobram o risco de trombose” em relação às com levonorgestrel. Traduza em números absolutos.', 'De 5 a 7 para 9 a 12 casos em cada 10.000 mulheres por ano: cerca de 4 a 5 casos a mais. É preciso que umas 2.000 mulheres usem a pílula com drospirenona, em vez da com levonorgestrel, por um ano, para ocorrer um caso adicional. O risco relativo é real; o absoluto diz o tamanho dele.'],
      ['Compare a pílula combinada com a gestação e com o puerpério. O que isso muda na conversa com a paciente?', 'A alternativa à contracepção não é risco zero. A gestação e, sobretudo, o puerpério aumentam o risco de trombose mais do que qualquer pílula. Uma mulher que abandona a pílula por medo de trombose e engravida sem planejar passa a correr um risco maior.'],
      ['Por que uma progestina menos androgênica se associa a mais trombose?', 'Porque a androgenicidade se opõe ao efeito hepático do etinilestradiol. Veja a SHBG: sobe 74% com levonorgestrel e 251% com drospirenona, ambas com etinilestradiol. A pílula como um todo fica mais “estrogênica”.'],
      ['Em quem esse risco pequeno deixa de ser pequeno?', 'Em quem já parte de um risco basal alto: trombofilia, trombose prévia, puerpério, imobilização prolongada, obesidade, tabagismo. O risco relativo multiplica o basal. É para isso que servem os critérios de elegibilidade. <button class="lnk" style="border:0;background:none;padding:0;font:inherit" data-go="elegibilidade">Monte a paciente na tela 7.</button>'],
    ]), { wide: true, lede: 'Responda antes de abrir cada resposta.' });

  const rng = (a, b, u) => a === b ? nf(a) + (u || '') : `${nf(a)} a ${nf(b)}${u || ''}`;
  const draw = () => {
    store.set('co.tev', { id });
    const v = CO_VTE.find(x => x[0] === id), lo = v[3], hi = v[4], base = id === 'non' || id === 'pop';
    $('tvS').querySelectorAll('.chip').forEach(c => c.classList.toggle('on', c.dataset.s === id));
    $('tvTt').textContent = v[2];
    $('tvT1').textContent = rng(lo, hi);
    $('tvT2').textContent = base ? '1×' : `${nf(lo / 2, lo % 2 ? 1 : 0)}× a ${nf(hi / 2, hi % 2 ? 1 : 0)}×`;
    $('tvT3').textContent = base ? 'nenhum' : rng(lo - 2, hi - 2);
    $('tvT3s').textContent = base ? 'em relação a quem não usa' : `1 caso a mais a cada ${nf(Math.round(10000 / (hi - 2) / 10) * 10)} a ${nf(Math.round(10000 / (lo - 2) / 10) * 10)} mulheres por ano`;
    const mid = (lo + hi) / 4, who = id === 'preg' ? 'A gestação' : id === 'pp' ? 'O puerpério' : id === 'pop' ? 'A minipílula' : id === 'non' ? '' : 'Esta pílula';
    $('tvH').innerHTML = base ? `<span>Manchete</span><b>${id === 'pop' ? 'A pílula só de progestina não aumenta o risco de trombose' : 'Trombose venosa acontece mesmo sem pílula: 2 em 10.000 mulheres por ano'}</b><small>É o risco basal de uma mulher jovem. Toda comparação parte daqui.</small>`
      : frame === 'rel' ? `<span>Manchete com risco relativo</span><b>${who} ${hi / lo > 1.5 ? `multiplica por ${nf(lo / 2, lo / 2 < 10 && lo % 2 ? 1 : 0)} a ${nf(hi / 2, 0)}` : mid < 3.5 ? 'triplica' : 'multiplica por ' + nf(mid, 0)} o risco de trombose</b><small>Verdadeira, e assustadora. Não diz de quanto para quanto.</small>`
      : `<span>Manchete com risco absoluto</span><b>De 2 para ${rng(lo, hi)} casos de trombose em cada 10.000 mulheres por ano</b><small>O mesmo dado. Agora dá para pesar contra os benefícios.</small>`;
    $('tvI').innerHTML = id === 'preg' || id === 'pp' ? 'Este é o comparador que costuma faltar: <b>engravidar aumenta o risco de trombose mais do que tomar a pílula</b>, e o puerpério é o período de maior risco.'
      : id === 'dsg' ? 'Risco maior que o das pílulas com levonorgestrel, e ainda assim menor que o da gestação e muito menor que o do puerpério. O risco é mais alto no primeiro ano de uso e volta ao basal poucos meses depois de parar.'
      : id === 'lng' ? 'A combinada de menor risco trombótico. O risco é mais alto no primeiro ano de uso (e ao recomeçar depois de uma pausa de 4 semanas ou mais) e volta ao basal poucos meses depois de parar.'
      : id === 'pop' ? 'Sem estrogênio, o fígado não é estimulado a produzir mais fatores de coagulação. É a opção oral quando o estrogênio é contraindicado.'
      : 'O risco basal não é zero. Idade, obesidade, tabagismo, trombofilias e imobilização o aumentam, com ou sem pílula.';
    // 10.000 pontos: malha de fundo + casos destacados
    const W = cw('tvFig'), c = W / 125, H = c * 80;
    let s = `<svg class="ch" viewBox="0 0 ${W} ${H.toFixed(1)}" role="img" aria-label="${rng(lo, hi)} casos de trombose em 10.000 mulheres por ano"><defs><pattern id="tvP" width="${c}" height="${c}" patternUnits="userSpaceOnUse"><circle cx="${c / 2}" cy="${c / 2}" r="${(c * 0.3).toFixed(2)}" class="ic0"/></pattern></defs><rect width="${W}" height="${H.toFixed(1)}" fill="url(#tvP)"/>`;
    ORD.slice(0, hi).forEach(([cx, cy], i) => s += `<circle cx="${(cx * c + c / 2).toFixed(1)}" cy="${(cy * c + c / 2).toFixed(1)}" r="${Math.max(4.2, c * 1.4).toFixed(1)}" class="${i < lo ? 'ic1' : 'ic2'}" style="${i < lo ? 'stroke:var(--surface);stroke-width:1.5' : 'fill:var(--surface)'}"/>`);
    $('tvFig').innerHTML = s + '</svg>';
    $('tvN').textContent = `Cada ponto pequeno é uma mulher: são 10.000. Fonte desta situação: ${v[5]}. As faixas refletem a incerteza das estimativas.`;
  };
  const drawMk = () => {
    const [n, rows] = CO_MARK[mk], W = cw('tvMkFig'), rh = 44, Rr = 54, mx = 251;
    let s = `<svg class="ch" viewBox="0 0 ${W} ${rows.length * rh + 4}" role="img" aria-label="${n}: variação percentual por formulação">`;
    rows.forEach(([l, v], i) => { const yy = i * rh, w = v / mx * (W - Rr);
      s += `<text x="0" y="${yy + 14}" class="lbl">${l}</text><rect x="0" y="${yy + 20}" width="${W - Rr}" height="16" rx="4" class="soft"/><rect x="0" y="${yy + 20}" width="${w.toFixed(1)}" height="16" rx="4" class="hl" style="opacity:${i === 0 ? .45 : i === 1 ? .7 : 1}"/><text x="${(w + 6).toFixed(1)}" y="${yy + 33}" class="lbl">+${v}%</text>`; });
    $('tvMkFig').innerHTML = s + '</svg>';
  };
  $('tvS').onclick = e => { const c = e.target.closest('.chip'); if (!c) return; id = c.dataset.s; draw(); };
  bindSeg('tvFr', v => { frame = v; draw(); });
  bindPick('tvMk', v => { mk = v; drawMk(); });
  draw(); drawMk();
}
