/* ===== Contraceptivos · Mecanismo molecular: transporte no sangue, receptor intracelular, dimerização, DNA e transcrição ===== */
const RC_L = {
  e: { n: 'Estrogênio', k: 'E', cls: 'hmE', R: 'ER', RE: 'ERE', carr: 'SHBG' },
  p: { n: 'Progestina', k: 'P', cls: 'hmP', R: 'PR', RE: 'PRE', carr: 'SHBG, CBG' },
  a: { n: 'Antagonista: mifepristona', k: 'M', cls: 'hmA', R: 'PR', RE: 'PRE', carr: 'proteínas' },
};
const RC_ST = [
  ['No sangue', 'preso a proteínas'], ['Atravessa', 'difusão passiva'], ['Liga-se', 'receptor intracelular'],
  ['Dimeriza', 'dois complexos'], ['No DNA', 'elemento de resposta'], ['Transcreve', 'mRNA e proteína'],
];
/* posições por passo: hormônio (H), receptores (A, B) e segundo hormônio (H2) */
const RC_POS = [
  { H: [316, 48], A: [150, 166], B: [250, 166] },
  { H: [316, 134], A: [150, 166], B: [250, 166] },
  { H: [150, 152], A: [150, 166], B: [250, 166], H2: [250, 152] },
  { H: [186, 190], A: [186, 204], B: [214, 204], H2: [214, 190] },
  { H: [186, 290], A: [186, 304], B: [214, 304], H2: [214, 290] },
  { H: [186, 290], A: [186, 304], B: [214, 304], H2: [214, 290] },
];
function rcText(l, i) {
  const ag = l !== 'a';
  return [
    l === 'e' ? 'No sangue, quase todo o estradiol viaja preso: cerca de 60% à albumina e 38% à <b>SHBG</b>. Só os <b>2% livres</b> saem do vaso e entram nas células. O etinilestradiol liga-se quase só à albumina.'
      : l === 'p' ? 'A progesterona viaja ligada à albumina (cerca de 80%) e à <b>CBG</b> (18%). As progestinas derivadas da 19-nortestosterona, como o levonorgestrel, ligam-se também à <b>SHBG</b>. Só a <b>fração livre</b> entra nas células.'
      : 'A mifepristona circula ligada a proteínas e entra na célula como qualquer esteroide. A diferença aparece adiante, no receptor.',
    'Esteroides são lipossolúveis: a molécula livre atravessa a membrana por <b>difusão passiva</b>, sem transportador e sem receptor de superfície.',
    ag ? `Dentro da célula, o hormônio encontra o receptor (${l === 'e' ? 'ERα ou ERβ' : 'PR-A ou PR-B'}), que estava inativo: um monômero preso a chaperonas, as proteínas de choque térmico. A ligação <b>muda a forma do receptor</b> e solta as chaperonas.`
      : 'A mifepristona ocupa o mesmo sítio do receptor de progesterona, com alta afinidade, e <b>compete com a progesterona</b>. O receptor muda de forma, mas para uma conformação diferente da que o agonista produz.',
    ag ? 'Dois complexos hormônio-receptor se unem: <b>dimerização</b>. É o dímero que reconhece o DNA.' : 'O receptor ocupado pelo antagonista ainda dimeriza e ainda segue para o DNA.',
    ag ? `No núcleo, o dímero se liga a sequências específicas do DNA, os <b>elementos de resposta ${l === 'e' ? 'ao estrogênio (ERE)' : 'à progesterona (PRE)'}</b>, na região promotora dos genes-alvo, e recruta <b>coativadores</b>.`
      : 'O dímero se liga ao PRE, mas, em vez de coativadores, recruta <b>correpressores</b>.',
    ag ? 'A transcrição dos genes-alvo aumenta ou diminui. O mRNA é traduzido em <b>proteínas</b>, e são elas que produzem o efeito. Por isso a resposta leva <b>horas</b> para aparecer e dura mais do que o hormônio no sangue.'
      : 'A transcrição dos genes que dependem de progesterona fica <b>bloqueada</b>. No endométrio que sustenta uma gestação, isso desestabiliza a decídua: é o mecanismo da mifepristona, oposto ao do levonorgestrel. <button class="lnk" style="border:0;background:none;padding:0;font:inherit" data-go="emergencia">Compare na tela de emergência.</button>',
  ][i];
}
function rcSVG() {
  let heads = ''; for (let x = 6; x < 400; x += 13) heads += `<circle cx="${x}" cy="78" r="5" class="head"/><circle cx="${x}" cy="94" r="5" class="head"/>`;
  const rec = 'M-15 -4 a8 8 0 0 1 8 -8 h1 a6 6 0 0 0 12 0 h1 a8 8 0 0 1 8 8 v8 a8 8 0 0 1 -8 8 h-14 a8 8 0 0 1 -8 -8 z';
  const mv = 'style="transition:transform .7s cubic-bezier(.5,0,.3,1),opacity .4s"';
  return `<svg class="ch" viewBox="0 0 400 372" role="img" aria-label="Hormônio esteroide do sangue ao núcleo da célula-alvo">
  <rect x="0" y="0" width="400" height="74" class="bloodf"/><rect x="0" y="98" width="400" height="274" class="cell-in"/><rect x="0" y="74" width="400" height="24" class="lip"/>${heads}
  <text x="10" y="16" class="zone">Sangue</text><text x="390" y="116" class="zone" text-anchor="end">Citoplasma</text>
  <rect x="20" y="32" width="84" height="26" rx="13" class="carr1"/><text x="62" y="49" class="mtxt" id="rcCarr" style="font-size:10.5px">SHBG</text>
  <rect x="124" y="32" width="96" height="26" rx="13" class="carr2"/><text x="172" y="49" class="fl" text-anchor="middle" style="font-size:10.5px">albumina</text>
  <g id="rcBound"></g>
  <text x="330" y="52" class="fs" id="rcFree">livre</text>
  <rect x="30" y="240" width="340" height="124" rx="40" class="nuc"/><text x="54" y="262" class="zone">Núcleo</text>
  <path d="M56 318 H344 M56 326 H344" class="dna"/><rect x="166" y="314" width="68" height="16" rx="5" class="ere"/><text x="200" y="346" class="fl" text-anchor="middle" id="rcRE">ERE</text>
  <g id="rcFast" style="opacity:0;transition:opacity .3s"><rect x="40" y="68" width="16" height="36" rx="6" class="rec"/><path d="M48 106 V136 m-4 -6 l4 6 l4 -6 M48 158 V176 m-4 -6 l4 6 l4 -6" class="dotst" style="stroke:var(--fg)"/>
    <text x="62" y="120" class="fs">GPER1, mER</text><text x="48" y="152" class="fl" text-anchor="middle">quinases</text><text x="48" y="192" class="fl" text-anchor="middle">efeito em</text><text x="48" y="205" class="fl" text-anchor="middle">segundos</text></g>
  <g id="rcHsp" style="transition:opacity .5s"><ellipse cx="176" cy="172" rx="12" ry="8" class="hsp"/><ellipse cx="224" cy="172" rx="12" ry="8" class="hsp"/><text x="200" y="198" class="fs" text-anchor="middle">chaperonas</text></g>
  <g id="rcCo" style="opacity:0;transition:opacity .4s"><rect x="146" y="291" width="20" height="14" rx="6" id="rcCo1"/><rect x="234" y="291" width="20" height="14" rx="6" id="rcCo2"/><text x="140" y="302" class="fl" text-anchor="end" id="rcCoT">coativadores</text></g>
  <g id="rcRna" style="opacity:0;transition:opacity .5s"><path d="M246 322 C 300 318, 356 300, 338 214" class="mrna"/><text x="318" y="290" class="fs" text-anchor="end">mRNA</text>
    <ellipse cx="336" cy="204" rx="14" ry="9" class="hsp"/><text x="336" y="228" class="fs" text-anchor="middle">ribossomo</text>
    <circle cx="300" cy="172" r="5" class="hl"/><circle cx="313" cy="163" r="5" class="hl"/><circle cx="326" cy="172" r="5" class="hl"/><text x="313" y="148" class="fl" text-anchor="middle">proteínas novas</text><text x="313" y="135" class="fs" text-anchor="middle">efeito em horas</text></g>
  <g id="rcBlock" style="opacity:0;transition:opacity .4s"><path d="M262 312 l18 20 M280 312 l-18 20" style="stroke:var(--bad);stroke-width:4;stroke-linecap:round"/><text x="366" y="350" class="fl" text-anchor="end" style="fill:var(--bad)">transcrição bloqueada</text></g>
  <g id="rcA" ${mv}><path d="${rec}" class="rec"/><text y="3" class="mtxt" style="font-size:9.5px" id="rcAt">ER</text></g>
  <g id="rcB" ${mv}><path d="${rec}" class="rec"/><text y="3" class="mtxt" style="font-size:9.5px" id="rcBt">ER</text></g>
  <g id="rcH2" ${mv}><circle r="6.5" id="rcH2c"/><text class="mtxt" style="font-size:8.5px" id="rcH2t">E</text></g>
  <g id="rcH" ${mv}><circle r="7.5" id="rcHc" style="stroke:var(--surface);stroke-width:1.5"/><text class="mtxt" style="font-size:9px" id="rcHt">E</text></g>
</svg>`;
}
/* [nome, % livre, % albumina, % SHBG, % CBG, fonte] */
const TR_H = {
  e2: ['Estradiol', 1.81, 60.8, 37.3, 0, 'Dunn et al., 1981'],
  ee: ['Etinilestradiol', 1.5, 98.5, 0, 0, 'bula'],
  lng: ['Levonorgestrel', 1.1, 33.9, 65, 0, 'bula'],
  drsp: ['Drospirenona', 4, 96, 0, 0, 'bula: 3 a 5% livre'],
  p4: ['Progesterona', 2, 80, 0, 18, 'valores da aula'],
  t: ['Testosterona', 1.36, 30.4, 66, 2.26, 'Dunn et al., 1981'],
};
const trFrac = (h, x) => { const [, f, a, s, c] = TR_H[h], tot = f + a + s * x + c; return { f: f / tot, a: a / tot, s: s * x / tot, c: c / tot }; };
const RC_TIS = [
  ['Hipotálamo e hipófise', 'E + P', 'Menos GnRH pulsátil e menor resposta da hipófise: caem o LH e o FSH. É a base do bloqueio da ovulação.', 'pilula', 'Ver a ação contraceptiva'],
  ['Colo do útero', 'P', 'Muda a secreção das glândulas endocervicais: muco escasso, viscoso e impenetrável.', 'pilula', 'Ver a ação contraceptiva'],
  ['Endométrio', 'E + P', 'O estrogênio faz proliferar e induz a síntese de receptores de progesterona. A progestina transforma, afina e, em uso contínuo, atrofia.', '', ''],
  ['Fígado', 'E', 'Aumenta a síntese de SHBG, CBG, TBG, angiotensinogênio e fatores de coagulação; reduz antitrombina e proteína S. Pela via oral, o fígado recebe a dose mais alta.', 'trombose', 'Ver trombose em perspectiva'],
  ['Osso', 'E', 'Menos reabsorção, por apoptose de osteoclastos.', '', ''],
  ['Outros receptores', 'P', 'Além do receptor de progesterona, cada progestina se liga em grau diferente a outros receptores de esteroides. O levonorgestrel ativa o receptor androgênico; a drospirenona e o dienogeste competem com os androgênios; a drospirenona também bloqueia o receptor mineralocorticoide. É o que separa as gerações.', 'trombose', 'Ver as progestinas'],
];
const RC_HL = [['Dienogeste', 10, '~10 h'], ['Etinilestradiol', 13, '~13 h'], ['Valerato de estradiol', 14, '~14 h'], ['Estetrol', 28, '~28 h'], ['Drospirenona', 32.5, '30 a 35 h'], ['Nomegestrol', 46, '~46 h']];
function renderReceptor(g) {
  let l = 'e', step = 0, timer = null, fast = false, th = 't', x = 1, tis = 0;
  g.innerHTML =
    card('Do sangue ao gene em seis passos', `<div class="rcx">
        <div class="rc-ctl"><div class="sub">Quem se liga ao receptor</div>${pick('rcL', Object.entries(RC_L).map(([k, v]) => [k, v.n]), 'e')}
          <div class="steps rcsteps" id="rcSteps" style="margin-top:12px">${RC_ST.map((s, i) => `<button class="stp${i === 0 ? ' on' : ''}" data-i="${i}"><i>${i + 1}</i><b>${s[0]}</b><span>${s[1]}</span></button>`).join('')}</div></div>
        <figure class="fig rc-fig">${rcSVG()}</figure>
        <div class="rc-txt"><div class="row" style="justify-content:space-between"><button class="btn small" id="rcPlay">▶ Animar a sequência</button><label class="toggle" style="font-size:13px"><input type="checkbox" id="rcFastT">Mostrar a via rápida</label></div>
          <div class="insight" id="rcTxt" aria-live="polite"></div><p class="note" id="rcFastN" hidden>Via não genômica: receptores na membrana (mERα, GPER1) ativam cascatas de quinases (PKA, PKC, MAPK, PI3K) em segundos a minutos, sem passar pelo DNA. Explica efeitos vasculares agudos do estrogênio.</p></div>
      </div>
      <div class="legend"><span><span class="mol" style="background:var(--e2)">E</span> estrogênio</span><span><span class="mol" style="background:var(--p4)">P</span> progestina</span><span><span class="mol" style="background:var(--anta)">M</span> mifepristona</span><span><i style="background:var(--ion);width:12px;height:10px;border-radius:3px"></i>receptor</span></div>`,
      { wide: true, more: 'co_receptor', eyebrow: 'Via genômica' }) +
    card('No sangue, só a fração livre entra na célula', `<div class="sub">Hormônio</div>${pick('trH', Object.entries(TR_H).map(([k, v]) => [k, v[0]]), 't')}
      <div class="range" style="margin-top:12px"><label for="trX">SHBG no sangue</label><output id="trXo"></output><input type="range" id="trX" min="1" max="4" step="0.1" value="1"></div>
      <div class="chips wrapc" id="trP"><button class="chip" data-x="1">Sem pílula</button><button class="chip" data-x="1.7">EE + levonorgestrel</button><button class="chip" data-x="3.5">EE + drospirenona</button></div>
      <div class="dots200" id="trW" style="margin-top:12px"></div>
      <div class="legend"><span><i class="w-fr"></i>livre</span><span><i class="w-sh"></i>SHBG</span><span><i class="w-cb"></i>CBG</span><span><i class="w-al"></i>albumina</span></div>
      <div class="tiles" style="margin-top:10px"><div class="tile acc"><span>Livre</span><b id="trT1"></b><small id="trT1s"></small></div><div class="tile"><span>Presa à SHBG</span><b id="trT2"></b><small>ligação forte e específica</small></div><div class="tile"><span>Albumina</span><b id="trT3"></b><small>ligação fraca</small></div></div>
      <div class="insight" id="trI"></div>
      <p class="note">Cada quadrado é 0,5% do hormônio no sangue. Valores de partida: <span id="trSrc"></span>. O efeito da SHBG usa um modelo simples de equilíbrio (proteínas longe da saturação): mostra a direção e a ordem de grandeza. Aumento de SHBG com cada pílula: Douxfils et al., 2020.</p>`,
      { lede: 'O etinilestradiol faz o fígado produzir mais SHBG. Veja quem sente isso.', more: 'co_transporte', eyebrow: 'Simulador' }) +
    card('O mesmo mecanismo, tecidos diferentes', `<div class="chips wrapc" id="rcTis">${RC_TIS.map((t, i) => `<button class="chip" data-i="${i}">${t[0]}</button>`).join('')}</div><div id="rcTisT" style="margin-top:10px"></div>
      <div class="sub" style="margin-top:18px">Meia-vida: quanto tempo cada um fica</div><div id="rcHL"></div>
      <p class="note">Meias-vidas da aula. Meia-vida longa dá margem para atrasos: nomegestrol e drospirenona toleram mais.</p>`,
      { lede: 'O receptor é o mesmo; os genes que ele regula mudam de célula para célula.' }) +
    card('Roteiro do laboratório', roteiro([
      ['Passe os seis passos com o estrogênio. Em qual deles um fármaco pode competir com o hormônio? Troque para a mifepristona e confira.', 'No passo 3, a ligação ao receptor. O antagonista ocupa o mesmo sítio, com alta afinidade. O curioso é que o receptor ainda dimeriza e ainda vai ao DNA: a diferença aparece nos passos 5 e 6, quando ele recruta correpressores em vez de coativadores.'],
      ['A pílula atinge o pico no sangue em 1 a 2 horas. Por que o efeito não é imediato?', 'Porque a via principal é genômica: é preciso transcrever o gene, traduzir o mRNA e acumular a proteína. Leva horas, e o efeito persiste depois que o hormônio caiu. Marque “Mostrar a via rápida” para ver a exceção.'],
      ['Com etinilestradiol e drospirenona, o que acontece com a testosterona livre? E com a própria drospirenona?', 'A SHBG mais que triplica e prende a testosterona: no modelo, a fração livre cai mais de 60%. A drospirenona não se liga à SHBG e não é afetada. É uma das razões da melhora da acne, e do possível efeito sobre a libido.'],
      ['Levonorgestrel e drospirenona ativam o mesmo receptor de progesterona. Por que os perfis clínicos são diferentes?', 'Porque nenhuma progestina é seletiva só para ele. O levonorgestrel também ativa o receptor androgênico; a drospirenona bloqueia o androgênico e o mineralocorticoide. Veja “Outros receptores” no cartão dos tecidos.'],
    ]), { wide: true, lede: 'Responda antes de abrir cada resposta.' });

  const T = (id, p) => { $(id).style.transform = `translate(${p[0]}px, ${p[1]}px)`; };
  const setStep = i => {
    step = i; const P = RC_POS[i], L = RC_L[l], ag = l !== 'a';
    T('rcH', P.H); T('rcA', P.A); T('rcB', P.B); T('rcH2', P.H2 || [P.B[0], P.B[1] - 14]);
    $('rcH2').style.opacity = P.H2 ? 1 : 0;
    $('rcHsp').style.opacity = i < 2 ? 1 : 0; $('rcFree').style.opacity = i === 0 ? 1 : 0;
    $('rcCo').style.opacity = i >= 4 ? 1 : 0; $('rcRna').style.opacity = i === 5 && ag ? 1 : 0; $('rcBlock').style.opacity = i === 5 && !ag ? 1 : 0;
    ['rcHc', 'rcH2c'].forEach(k => $(k).setAttribute('class', L.cls)); $('rcHt').textContent = L.k; $('rcH2t').textContent = L.k;
    $('rcAt').textContent = L.R; $('rcBt').textContent = L.R; $('rcRE').textContent = L.RE; $('rcCarr').textContent = l === 'p' ? 'SHBG, CBG' : l === 'e' ? 'SHBG' : 'proteínas';
    ['rcCo1', 'rcCo2'].forEach(k => $(k).setAttribute('class', ag ? 'coa' : 'cor')); $('rcCoT').textContent = ag ? 'coativadores' : 'correpressores'; $('rcCoT').style.fill = ag ? '' : 'var(--bad)';
    $('rcBound').innerHTML = [[36, 32], [88, 32], [142, 32], [172, 32], [202, 32]].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="5.5" class="${L.cls}" style="opacity:.75"/>`).join('');
    $('rcTxt').innerHTML = `<b>${i + 1}. ${RC_ST[i][0]}.</b> ${rcText(l, i)}`;
    $('rcTxt').querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
    $('rcSteps').querySelectorAll('.stp').forEach(b => b.classList.toggle('on', +b.dataset.i === i));
  };
  const stop = () => { if (timer) { clearInterval(timer); timer = null; $('rcPlay').textContent = '▶ Animar a sequência'; } };
  $('rcSteps').onclick = e => { const b = e.target.closest('.stp'); if (b) { stop(); setStep(+b.dataset.i); } };
  $('rcPlay').onclick = () => { if (timer) return stop(); setStep(0); $('rcPlay').textContent = '■ Parar'; timer = setInterval(() => { if (step >= 5) { stop(); return; } setStep(step + 1); }, reduced() ? 2200 : 1900); };
  bindPick('rcL', v => { l = v; setStep(step); });
  $('rcFastT').onchange = e => { fast = e.target.checked; $('rcFast').style.opacity = fast ? 1 : 0; $('rcFastN').hidden = !fast; };
  setStep(0);

  const drawTr = () => {
    const H = TR_H[th], F = trFrac(th, x), F0 = trFrac(th, 1), rel = F.f / F0.f - 1, binds = H[3] > 0;
    $('trXo').textContent = x === 1 ? 'basal' : `${nf(x, 1)} vezes o basal`; $('trX').value = x;
    $('trP').querySelectorAll('.chip').forEach(c => c.classList.toggle('on', Math.abs(+c.dataset.x - x) < 0.05));
    // 200 quadrados, pelo método dos maiores restos, com pelo menos 1 para a fração livre
    const raw = [['fr', F.f], ['sh', F.s], ['cb', F.c], ['al', F.a]].map(([k, v]) => [k, v * 200]), cnt = raw.map(([k, v]) => [k, Math.floor(v), v - Math.floor(v)]);
    if (cnt[0][1] === 0) { cnt[0][1] = 1; cnt[0][2] = 0; }
    let left = 200 - cnt.reduce((n, c) => n + c[1], 0); [...cnt].sort((a, b) => b[2] - a[2]).forEach(c => { if (left > 0) { c[1]++; left--; } });
    if (left < 0) cnt[3][1] += left;
    $('trW').innerHTML = cnt.map(([k, n]) => `<i class="w-${k}"></i>`.repeat(Math.max(0, n))).join('');
    $('trW').setAttribute('role', 'img'); $('trW').setAttribute('aria-label', `Livre ${pc(F.f)}, SHBG ${pc(F.s)}, albumina ${pc(F.a)}`);
    $('trT1').textContent = pc(F.f, F.f < 0.01 ? 2 : 1); $('trT1s').textContent = x === 1 ? 'é a que age' : Math.abs(rel) < 0.005 ? 'não muda com a SHBG' : `${nf(Math.abs(rel) * 100, 0)}% ${rel < 0 ? 'a menos' : 'a mais'} que no basal`;
    $('trT2').textContent = binds ? pc(F.s, 0) : 'não se liga'; $('trT3').textContent = pc(F.a, 0); $('trSrc').textContent = `${H[0].toLowerCase()}, ${H[5]}`;
    $('trI').innerHTML = th === 't' ? (x === 1 ? 'A testosterona é o esteroide que a SHBG prende com mais força: dois terços dela circulam ligados à globulina. Aumente a SHBG e veja a fração livre.' : `Com a SHBG em ${nf(x, 1)} vezes o basal, a testosterona livre cai <b>${nf(-rel * 100, 0)}%</b>. Em metanálise, a pílula combinada reduziu a testosterona livre em 61% (Zimmerman et al., 2014): parte por esse efeito, parte por frear a produção ovariana. Ajuda a explicar a melhora da acne.`)
      : th === 'lng' ? (x === 1 ? 'O levonorgestrel se liga fortemente à SHBG: cerca de 65% circula preso a ela.' : `A SHBG induzida pelo estrogênio prende mais levonorgestrel: a fração livre cai <b>${nf(-rel * 100, 0)}%</b>. Um componente da pílula muda a farmacocinética do outro. (O próprio levonorgestrel, androgênico, freia o aumento da SHBG.)`)
      : th === 'e2' ? (x === 1 ? 'O estradiol se liga à SHBG com menos força que a testosterona: a maior parte fica na albumina.' : `A fração livre de estradiol cai <b>${nf(-rel * 100, 0)}%</b>, menos que a da testosterona: a SHBG prefere os androgênios. Por isso mais SHBG desloca o balanço para o lado estrogênico.`)
      : th === 'ee' ? 'O etinilestradiol <b>não se liga à SHBG</b>: circula quase todo na albumina, e mexer na SHBG não muda sua fração livre. Mas é ele que manda o fígado produzir mais SHBG e mais CBG.'
      : th === 'drsp' ? 'A drospirenona <b>não se liga à SHBG nem à CBG</b>: só à albumina, com 3 a 5% livre. O aumento de SHBG causado pelo etinilestradiol não a afeta.'
      : 'A progesterona usa a <b>CBG</b> (transcortina), a mesma globulina do cortisol, e a albumina. A SHBG não entra na conta.';
  };
  bindPick('trH', v => { th = v; drawTr(); });
  $('trX').oninput = e => { x = +e.target.value; drawTr(); };
  $('trP').onclick = e => { const c = e.target.closest('.chip'); if (!c) return; x = +c.dataset.x; drawTr(); };
  drawTr();

  const drawTis = () => { const t = RC_TIS[tis];
    $('rcTis').querySelectorAll('.chip').forEach(c => c.classList.toggle('on', +c.dataset.i === tis));
    $('rcTisT').innerHTML = `<div class="insight" style="margin-top:0"><b>${t[0]}</b><span class="ep">${t[1]}</span><br>${t[2]}${t[3] ? ` <button class="lnk" style="border:0;background:none;padding:0;font:inherit" data-go="${t[3]}">${t[4]}.</button>` : ''}</div>`;
    $('rcTisT').querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go)); };
  $('rcTis').onclick = e => { const c = e.target.closest('.chip'); if (!c) return; tis = +c.dataset.i; drawTis(); };
  drawTis();
  const W = cw('rcHL'), rh = 24, L = W < 420 ? 136 : 170, Rr = 70;
  let s = `<svg class="ch" viewBox="0 0 ${W} ${RC_HL.length * rh + 4}" role="img" aria-label="Meia-vida de estrogênios e progestinas">`;
  RC_HL.forEach(([n, v, t], i) => { const yy = i * rh + 2, w = v / 46 * (W - L - Rr); s += `<text x="${L - 8}" y="${yy + 15}" text-anchor="end">${n}</text><rect x="${L}" y="${yy + 3}" width="${W - L - Rr}" height="16" rx="4" class="soft"/><rect x="${L}" y="${yy + 3}" width="${w.toFixed(1)}" height="16" rx="4" class="hl" style="opacity:.75"/><text x="${(L + w + 6).toFixed(1)}" y="${yy + 15}" class="lbl">${t}</text>`; });
  $('rcHL').innerHTML = s + '</svg>';
  return stop;
}
