/* ===== Tela 1 · Conceito ===== */
const NOCI = [
  { k: 'tr', t: 'Transdução', s: 'Estímulo vira sinal elétrico', what: 'O estímulo nocivo e os mediadores da lesão (bradicinina, prostaglandinas, H⁺, K⁺, ATP) geram potencial de receptor no terminal livre do nociceptor.', drugs: 'AINEs e dipirona (menos prostaglandinas); anestésico tópico.' },
  { k: 'tm', t: 'Transmissão', s: 'Condução pelas fibras Aδ e C', what: 'O potencial de ação percorre o axônio até o corno dorsal da medula. É aqui que age o anestésico local: o sinal nasce, mas não chega.', drugs: 'Anestésicos locais: infiltração, bloqueios de nervo, neuroeixo.', al: true },
  { k: 'md', t: 'Modulação', s: 'Filtro na medula e vias descendentes', what: 'Na medula, o sinal é amplificado ou inibido: interneurônios (teoria do portão) e vias descendentes com serotonina, noradrenalina e opioides endógenos.', drugs: 'Opioides, α₂-agonistas, cetamina, antidepressivos.' },
  { k: 'pc', t: 'Percepção', s: 'Experiência consciente', what: 'O córtex integra os componentes sensorial e afetivo: só aqui existe dor. Sob anestesia geral há nocicepção sem dor.', drugs: 'Anestésicos gerais, opioides.' },
];
function nociSVG(k) {
  const H = x => (x === k ? 'hlst' : 'dotst');
  return `<svg class="ch" viewBox="0 0 560 190" role="img" aria-label="Via da dor, com a etapa ${k} em destaque">
  <rect x="8" y="112" width="120" height="66" rx="10" class="soft"/><text x="68" y="170" text-anchor="middle">Pele / tecido</text>
  <path d="M40 132 l14 12 M56 128 l-2 16 M72 132 l-18 12" class="${H('tr')}" style="stroke-width:${k === 'tr' ? 3 : 1.4}"/>
  <path d="M54 144 C 120 146 200 146 300 142" class="${H('tm')}" style="stroke-width:${k === 'tm' ? 4 : 1.4}"/>
  <text x="180" y="134" text-anchor="middle" class="${k === 'tm' ? 'lbl' : ''}">nervo periférico (Aδ e C)</text>
  <rect x="300" y="100" width="72" height="80" rx="30" class="soft"/><rect x="300" y="100" width="72" height="80" rx="30" class="${H('md')}" style="stroke-width:${k === 'md' ? 3 : 1.2}"/>
  <text x="336" y="144" text-anchor="middle">Medula</text>
  <path d="M348 102 C 360 70 390 60 420 58" class="${H('tm')}" style="stroke-width:${k === 'tm' ? 3 : 1.2}"/>
  <path d="M428 82 C 400 90 372 100 360 118" class="${H('md')}" style="stroke-width:${k === 'md' ? 2.6 : 1.2};stroke-dasharray:5 4"/>
  <text x="404" y="112" text-anchor="middle" style="font-size:10.5px">via descendente</text>
  <ellipse cx="480" cy="50" rx="70" ry="38" class="soft"/><ellipse cx="480" cy="50" rx="70" ry="38" class="${H('pc')}" style="stroke-width:${k === 'pc' ? 3 : 1.2}"/>
  <text x="480" y="54" text-anchor="middle">Encéfalo</text>
</svg>`;
}
function renderConceito(g) {
  g.innerHTML =
    card('Três perguntas da prática', `<div class="qs">
      <button class="qbtn" data-go="ph"><b>Por que a lidocaína “não pega” num tecido infectado?</b><span>Tela 4 · pH e ionização →</span></button>
      <button class="qbtn" data-go="dose"><b>Posso usar anestésico com adrenalina no dedo?</b><span>Tela 7 · Vasoconstritores →</span></button>
      <button class="qbtn" data-go="dose"><b>Quantos mililitros de lidocaína posso injetar neste paciente?</b><span>Tela 7 · Dose segura →</span></button></div>`,
      { wide: true, lede: 'Toda sutura começa com uma injeção, e cada injeção de anestésico local é um ato farmacológico: tem dose, latência, duração e toxicidade. Responda de cabeça agora e confira ao longo do laboratório.' }) +
    card('O que é um anestésico local', `<p style="margin:0 0 12px;font-size:15px">Fármaco que <b>bloqueia de forma reversível a condução nervosa</b> no local em que é aplicado, <b>sem perda de consciência</b>.</p>
      <div class="stack">
        <div class="tile"><span>Analgesia</span><small style="font-size:13.5px;color:var(--fg)">Perda da sensação de dor, com as outras modalidades preservadas.</small></div>
        <div class="tile"><span>Anestesia</span><small style="font-size:13.5px;color:var(--fg)">Perda de todas as modalidades sensitivas, com ou sem bloqueio motor.</small></div>
        <div class="tile"><span>Não seletivo</span><small style="font-size:13.5px;color:var(--fg)">Bloqueia fibras sensitivas, motoras e autonômicas. A “seletividade” vem da dose, da concentração e da técnica.</small></div>
      </div>`, { more: 'conceito', eyebrow: 'an + aisthesis = sem sensação' }) +
    card('Onde cada fármaco interrompe a dor', `<div class="steps" id="nociSteps" style="grid-template-columns:repeat(auto-fit,minmax(112px,1fr))">${NOCI.map((x, i) => `<button class="stp${i === 1 ? ' on' : ''}" data-k="${x.k}"><i>${i + 1}</i><b>${x.t}</b><span>${x.s}</span></button>`).join('')}</div>
      <div id="nociFig" style="margin-top:12px"></div><div id="nociTxt"></div>`,
      { lede: 'A nocicepção tem quatro etapas. Toque em cada uma para ver o que acontece e quais fármacos agem ali.' }) +
    card('Da folha de coca à lidocaína', `<div class="tl">
      <div><b>1860</b>Niemann isola a cocaína e nota a língua dormente.</div>
      <div><b>1884</b>Freud publica “Über Coca”; Koller anestesia a córnea.</div>
      <div><b>1885</b>Halsted faz bloqueios de nervo e desenvolve dependência.</div>
      <div><b>1898</b>Bier faz a primeira raquianestesia.</div>
      <div><b>1904</b>Einhorn sintetiza a procaína, o primeiro éster sintético.</div>
      <div class="now"><b>1943</b>Löfgren sintetiza a lidocaína, a primeira amida de sucesso.</div>
      <div><b>1996</b>Ropivacaína: enantiômero puro, menos cardiotóxico.</div>
      <div><b>2025</b>Suzetrigina: bloqueador oral seletivo de NaV1.8 aprovado pela FDA.</div></div>
      <p class="note">Antes do uso anestésico, a cocaína era vendida como tônico para fadiga, insônia e “melancolia”.</p>`, { wide: true });
  const setK = k => {
    const x = NOCI.find(n => n.k === k);
    $('nociFig').innerHTML = nociSVG(k);
    $('nociTxt').innerHTML = `<div class="insight${x.al ? '' : ' warn'}"><b>${x.t}.</b> ${x.what}<br><span style="color:var(--muted)">Onde se atua:</span> <b>${x.drugs}</b></div>`;
    $('nociSteps').querySelectorAll('.stp').forEach(b => b.classList.toggle('on', b.dataset.k === k));
  };
  $('nociSteps').onclick = e => { const b = e.target.closest('.stp'); if (b) setK(b.dataset.k); };
  setK('tm');
}

/* ===== Tela 2 · Química ===== */
const CLASSIFY = [
  ['Lidocaína', 'A'], ['Procaína', 'E'], ['Bupivacaína', 'A'], ['Benzocaína', 'E'], ['Articaína', 'A*'], ['Tetracaína', 'E'],
  ['Prilocaína', 'A'], ['Cocaína', 'E'], ['Ropivacaína', 'A'], ['Cloroprocaína', 'E'], ['Mepivacaína', 'A'], ['Levobupivacaína', 'A'],
];
function molSVG(kind, part) {
  const on = p => part === p;
  const mid = kind === 'E' ? '–CO–O–' : '–NH–CO–';
  return `<svg class="ch" viewBox="0 0 560 150" role="img" aria-label="Estrutura geral de um anestésico local do tipo ${kind === 'E' ? 'éster' : 'amida'}">
  <g data-part="aro" style="cursor:pointer"><rect x="10" y="30" width="170" height="80" rx="16" class="${on('aro') ? 'hl' : 'soft'}" style="opacity:${on('aro') ? .18 : 1}"/><rect x="10" y="30" width="170" height="80" rx="16" class="${on('aro') ? 'accst' : 'dotst'}"/>
    <polygon points="95,48 118,61 118,87 95,100 72,87 72,61" class="inkst"/><circle cx="95" cy="74" r="12" class="inkst" style="stroke-width:1.2"/>
    <text x="95" y="128" text-anchor="middle" class="lbl">Anel aromático</text><text x="95" y="143" text-anchor="middle">lipofílico</text></g>
  <line x1="180" y1="70" x2="215" y2="70" class="inkst"/>
  <g data-part="lig" style="cursor:pointer"><rect x="215" y="40" width="130" height="60" rx="14" class="${on('lig') ? 'accst' : 'dotst'}"/>
    <text x="280" y="76" text-anchor="middle" class="lbl" style="font-family:var(--f-mono);font-size:16px">${mid}</text>
    <text x="280" y="128" text-anchor="middle" class="lbl">Cadeia intermediária</text><text x="280" y="143" text-anchor="middle">${kind === 'E' ? 'éster' : 'amida'}</text></g>
  <line x1="345" y1="70" x2="380" y2="70" class="inkst"/>
  <g data-part="ami" style="cursor:pointer"><rect x="380" y="30" width="170" height="80" rx="16" class="${on('ami') ? 'accst' : 'dotst'}"/>
    <text x="465" y="66" text-anchor="middle" class="lbl" style="font-family:var(--f-mono);font-size:16px">–N(R)₂</text>
    <text x="465" y="88" text-anchor="middle" style="font-family:var(--f-mono)">⇄ –N⁺H(R)₂</text>
    <text x="465" y="128" text-anchor="middle" class="lbl">Amina terciária</text><text x="465" y="143" text-anchor="middle">hidrofílica, ionizável</text></g>
</svg>`;
}
const PARTS = {
  aro: '<b>Anel aromático.</b> A parte lipofílica: determina a lipossolubilidade, que se traduz em <b>potência</b> (e toxicidade).',
  lig: '<b>Cadeia intermediária.</b> Define a família (éster ou amida) e, com ela, <b>como o fármaco é metabolizado</b> e o risco de alergia.',
  ami: '<b>Amina terciária.</b> A parte ionizável: recebe H⁺ e vira cátion. O equilíbrio entre as duas formas depende do <b>pKa</b> e do <b>pH</b>, tema da tela 4.',
};
function renderQuimica(g) {
  let kind = 'A', part = 'ami';
  g.innerHTML =
    card('Três partes, duas famílias', `<div class="row" style="justify-content:space-between">${seg('kindSeg', [['A', 'Amida'], ['E', 'Éster']], 'A')}<span class="note" style="margin:0">Toque em cada parte da molécula</span></div>
      <figure class="fig" id="molFig" style="margin-top:10px"></figure><div id="partTxt" class="insight"></div><div id="famTxt" style="margin-top:12px"></div>`, { wide: true, more: 'quimica' }) +
    card('Éster ou amida?', `<div class="cls-q"><div class="row" style="justify-content:space-between"><span class="eyebrow">Classifique</span><span class="score" id="clsScore">0 de 0</span></div>
      <div class="big-drug" id="clsDrug"></div><div class="row"><button class="btn" data-ans="E">Éster</button><button class="btn" data-ans="A">Amida</button></div><div id="clsFb"></div></div>`,
      { lede: 'Dica de bolso: nas amidas aparece um “i” antes de “-caína” (lIdocaína, bupIvacaína). Há uma exceção famosa.' }) +
    card('Da química à clínica', `<div class="stack">
      <div class="tile"><span>pKa → latência</span><small style="font-size:13.5px;color:var(--fg)">Quanto mais perto do pH do tecido, mais forma não ionizada e início mais rápido. <button class="lnk" style="border:0;background:none;padding:0" data-go="ph">Ver no simulador →</button></small></div>
      <div class="tile"><span>Lipossolubilidade → potência</span><small style="font-size:13.5px;color:var(--fg)">Maior lipossolubilidade, maior potência e maior toxicidade.</small></div>
      <div class="tile"><span>Ligação a proteínas → duração</span><small style="font-size:13.5px;color:var(--fg)">Maior ligação, mais tempo no canal e ação mais longa (bupivacaína ~95%, lidocaína ~65%).</small></div>
      </div><p class="note">Quase todos são vasodilatadores (a cocaína é a exceção): isso acelera a absorção e encurta o efeito. Daí o vasoconstritor.</p>`, { more: 'props' });
  const fam = () => kind === 'E'
    ? `<div class="tiles"><div class="tile"><span>Metabolismo</span><b style="font-size:16px">Esterases plasmáticas</b><small>hidrólise rápida · ação curta</small></div><div class="tile"><span>Alergia</span><b style="font-size:16px">Mais frequente</b><small>metabólito PABA (ainda assim rara)</small></div><div class="tile"><span>Exemplos</span><b style="font-size:16px">Procaína, tetracaína</b><small>cocaína, cloroprocaína, benzocaína</small></div></div>`
    : `<div class="tiles"><div class="tile"><span>Metabolismo</span><b style="font-size:16px">Fígado (CYP)</b><small>lidocaína: CYP1A2 e 3A4</small></div><div class="tile"><span>Alergia</span><b style="font-size:16px">Raríssima</b><small>desconfie de conservantes e reação vasovagal</small></div><div class="tile"><span>Exemplos</span><b style="font-size:16px">Lidocaína, bupivacaína</b><small>mepivacaína, prilocaína, ropivacaína, articaína*</small></div></div>`;
  const draw = () => {
    $('molFig').innerHTML = molSVG(kind, part);
    $('partTxt').innerHTML = PARTS[part];
    $('famTxt').innerHTML = fam();
    $('molFig').querySelectorAll('[data-part]').forEach(n => n.onclick = () => { part = n.dataset.part; draw(); });
  };
  bindSeg('kindSeg', v => { kind = v; draw(); });
  draw();
  // classificador
  let order = CLASSIFY.map((x, i) => i).sort(() => Math.random() - .5), qi = 0, ok = 0, tot = 0, answered = false;
  const next = () => { answered = false; $('clsDrug').textContent = CLASSIFY[order[qi % order.length]][0]; $('clsFb').innerHTML = ''; };
  g.querySelectorAll('[data-ans]').forEach(b => b.onclick = () => {
    if (answered) return; answered = true;
    const [nm, c] = CLASSIFY[order[qi % order.length]]; const right = c[0] === b.dataset.ans; tot++; if (right) ok++;
    $('clsScore').textContent = `${ok} de ${tot}`;
    const why = c === 'A*' ? 'É uma amida, mas com um grupamento éster no anel: por isso é hidrolisada no plasma e tem meia-vida curta.'
      : nm === 'Cocaína' ? 'Éster natural da folha de coca, o único anestésico local vasoconstritor.'
      : c === 'A' ? 'Amida: repare no “i” antes de “-caína”. Metabolismo hepático.' : 'Éster: sem “i” antes de “-caína”. Hidrólise por esterases plasmáticas.';
    $('clsFb').innerHTML = `<div class="fb"><b class="${right ? 'ok' : 'no'}">${right ? 'Certo.' : 'Não é.'}</b> ${esc(nm)} é ${c === 'E' ? 'um éster' : 'uma amida'}. ${why} <button class="btn small" id="clsNext" style="margin-left:6px">Próximo</button></div>`;
    $('clsNext').onclick = () => { qi++; next(); };
  });
  next();
}
