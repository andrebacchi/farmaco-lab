/* ===== Contraceptivos · Tela 6 (elegibilidade OMS) e Tela 7 (contracepção de emergência) ===== */
const EL_G = {
  fumo: ['Tabagismo', [['n', 'Não fuma'], ['l', 'Menos de 15 cigarros por dia'], ['h', '15 ou mais por dia']]],
  pa: ['Pressão arterial', [['n', 'Normal'], ['c', 'Hipertensão controlada'], ['m', '140–159 / 90–99'], ['h', '160 / 100 ou mais']]],
  enx: ['Enxaqueca', [['n', 'Não tem'], ['s', 'Sem aura'], ['a', 'Com aura']]],
  pp: ['Pós-parto', [['n', 'Não'], ['b1', 'Amamenta, menos de 6 semanas'], ['b2', 'Amamenta, 6 semanas a 6 meses'], ['b3', 'Amamenta, 6 meses ou mais'], ['p1', 'Não amamenta, menos de 21 dias'], ['p2', 'Não amamenta, 21 a 42 dias']]],
  tev: ['Trombose venosa', [['n', 'Sem história'], ['f', 'Parente de 1º grau'], ['p', 'Trombose prévia'], ['t', 'Trombofilia conhecida']]],
  dm: ['Diabetes', [['n', 'Não tem'], ['s', 'Sem doença vascular'], ['v', 'Com doença vascular ou mais de 20 anos']]],
  mama: ['Câncer de mama', [['n', 'Não'], ['f', 'Só história familiar'], ['p', 'Tratado, sem doença há 5 anos ou mais'], ['a', 'Atual']]],
  med: ['Medicamentos em uso', [['n', 'Nenhum'], ['atb', 'Antibiótico comum'], ['rif', 'Rifampicina ou rifabutina'], ['ac', 'Carbamazepina, fenitoína ou topiramato'], ['ltg', 'Lamotrigina']]],
};
const EL_CASES = [
  ['Júlia, 22, saudável', { age: 22 }],
  ['Carla, 37, um maço por dia', { age: 37, fumo: 'h' }],
  ['Marina, 28, enxaqueca com aura', { age: 28, enx: 'a' }],
  ['Paula, 30, amamentando há 4 semanas', { age: 30, pp: 'b1' }],
  ['Renata, 41, hipertensão controlada', { age: 41, pa: 'c' }],
  ['Bia, 19, irmã teve trombose', { age: 19, tev: 'f' }],
  ['Lia, 26, tratando tuberculose', { age: 26, med: 'rif' }],
];
const EL_CAT = { 1: ['Sem restrição', 'Pode usar.'], 2: ['Benefício supera o risco', 'Pode usar, com acompanhamento.'], 3: ['Risco supera o benefício', 'Em geral não usar. Só se não houver alternativa aceitável.'], 4: ['Risco inaceitável', 'Não usar.'] };
/* Regras: [condição, categoria da combinada, categoria da minipílula, nota, texto da categoria quando é "3 ou 4"] */
function elRules(p) {
  const R = [], a = p.age;
  if (a >= 40) R.push(['Idade de 40 anos ou mais', 2, 1]);
  if (p.fumo !== 'n') R.push(a < 35 ? ['Tabagismo, menos de 35 anos', 2, 1] : p.fumo === 'l' ? ['Tabagismo aos 35 anos ou mais, menos de 15 cigarros por dia', 3, 1] : ['Tabagismo aos 35 anos ou mais, 15 ou mais cigarros por dia', 4, 1, 'Tabagismo e estrogênio somam mais do que a soma: o risco arterial é sinérgico.']);
  if (p.imc) R.push(['IMC de 30 kg/m² ou mais', 2, 1]);
  if (p.pa === 'c') R.push(['Hipertensão controlada', 3, 1]);
  if (p.pa === 'm') R.push(['Pressão de 140–159 / 90–99 mmHg', 3, 1]);
  if (p.pa === 'h') R.push(['Pressão de 160 / 100 mmHg ou mais', 4, 2]);
  if (p.enx === 's') R.push(a < 35 ? ['Enxaqueca sem aura, menos de 35 anos', 2, 1, 'Categoria para iniciar. Se a enxaqueca surgir ou piorar durante o uso da combinada: categoria 3.'] : ['Enxaqueca sem aura, 35 anos ou mais', 3, 1, 'Categoria para iniciar. Se surgir ou piorar durante o uso da combinada: categoria 4.']);
  if (p.enx === 'a') R.push(['Enxaqueca com aura, em qualquer idade', 4, 2, 'Risco de AVC isquêmico. Se a aura surgir durante o uso da minipílula: categoria 3.']);
  if (p.pp === 'b1') R.push(['Amamentando, menos de 6 semanas depois do parto', 4, 2]);
  if (p.pp === 'b2') R.push(['Amamentando, de 6 semanas a 6 meses depois do parto', 3, 1]);
  if (p.pp === 'b3') R.push(['Amamentando, 6 meses ou mais depois do parto', 2, 1]);
  if (p.pp === 'p1') R.push(['Pós-parto sem amamentar, menos de 21 dias', 3, 1, 'Com outros fatores de risco para trombose: categoria 4.']);
  if (p.pp === 'p2') R.push(['Pós-parto sem amamentar, de 21 a 42 dias', 2, 1, 'Com outros fatores de risco para trombose: categoria 3.']);
  if (p.tev === 'f') R.push(['Trombose venosa em parente de 1º grau', 2, 1]);
  if (p.tev === 'p') R.push(['Trombose venosa ou embolia pulmonar prévia', 4, 2]);
  if (p.tev === 't') R.push(['Trombofilia conhecida (fator V de Leiden, mutação da protrombina, deficiência de proteína C, S ou antitrombina)', 4, 2]);
  if (p.dm === 's') R.push(['Diabetes sem doença vascular', 2, 2]);
  if (p.dm === 'v') R.push(['Diabetes com nefropatia, retinopatia, neuropatia ou mais de 20 anos de doença', 3, 2, 'Para a combinada, 3 ou 4 conforme a gravidade.', '3 ou 4']);
  if (p.mama === 'f') R.push(['História familiar de câncer de mama', 1, 1, 'História familiar isolada não restringe o uso.']);
  if (p.mama === 'p') R.push(['Câncer de mama tratado, sem doença há 5 anos ou mais', 3, 3]);
  if (p.mama === 'a') R.push(['Câncer de mama atual', 4, 4]);
  if (p.med === 'atb') R.push(['Antibiótico de amplo espectro', 1, 1, 'Não reduz a eficácia da pílula.']);
  if (p.med === 'rif') R.push(['Rifampicina ou rifabutina', 3, 3, 'Indução do CYP3A4: os níveis hormonais caem e a eficácia também.']);
  if (p.med === 'ac') R.push(['Anticonvulsivante indutor enzimático', 3, 3, 'Carbamazepina, fenitoína, fenobarbital, primidona, topiramato e oxcarbazepina reduzem a eficácia.']);
  if (p.med === 'ltg') R.push(['Lamotrigina', 3, 1, 'A pílula combinada reduz o nível de lamotrigina e pode descontrolar as crises.']);
  if ((p.fumo !== 'n') + (p.dm !== 'n') + (p.pa !== 'n') >= 2) R.push(['Vários fatores de risco arterial ao mesmo tempo', 3, 2, 'Tabagismo, diabetes e hipertensão juntos: para a combinada, 3 ou 4 conforme o conjunto.', '3 ou 4']);
  if (!R.length) R.push(['Da menarca aos 39 anos, sem condição relevante', 1, 1]);
  return R;
}
function renderElegib(g) {
  const blank = () => ({ age: 22, imc: false, fumo: 'n', pa: 'n', enx: 'n', pp: 'n', tev: 'n', dm: 'n', mama: 'n', med: 'n' });
  let p = Object.assign(blank(), store.get('co.el', {})), hide = false, shown = true, cs = -1;
  g.innerHTML =
    `<section class="card" style="min-width:0"><div class="card-h"><div><span class="eyebrow">Simulador</span><h3>Monte a paciente</h3></div>${moreBtn('co_elegib')}</div>
      <div class="sub">Casos prontos</div><div class="chips wrapc" id="elC">${EL_CASES.map(([l], i) => `<button class="chip" data-i="${i}">${l}</button>`).join('')}</div>
      <div class="range" style="margin-top:14px"><label for="elA">Idade</label><output id="elAo"></output><input type="range" id="elA" min="15" max="50" step="1"></div>
      <label class="toggle" style="margin-top:6px"><input type="checkbox" id="elI">IMC de 30 kg/m² ou mais</label>
      ${Object.entries(EL_G).map(([k, [l, o]]) => `<div class="grp"><span>${l}</span><div class="chips wrapc" data-g="${k}">${o.map(([v, t]) => `<button class="chip" data-v="${v}">${t}</button>`).join('')}</div></div>`).join('')}
      <div class="row" style="margin-top:14px"><button class="btn small" id="elReset">Limpar tudo</button></div>
      <div class="elbar" id="elBar" aria-hidden="true"></div>
    </section>` +
    `<section class="card elres" style="min-width:0"><div class="card-h"><div><span class="eyebrow">Critérios de elegibilidade da OMS</span><h3>Qual pílula ela pode usar?</h3></div></div>
      <label class="toggle"><input type="checkbox" id="elH">Esconder o resultado: quero prever primeiro</label>
      <div class="stack" style="margin-top:10px"><div class="cat" id="elK1"></div><div class="cat" id="elK2"></div></div>
      <div class="row" id="elRevW" style="margin-top:10px" hidden><button class="btn primary" id="elRev">Revelar a categoria</button></div>
      <div id="elWhy"></div><div class="insight" id="elAdv"></div>
      <details class="fold"><summary>O que significa cada categoria</summary><div class="why" style="margin-top:6px">${[1, 2, 3, 4].map(k => `<div style="grid-template-columns:auto minmax(0,1fr)"><span class="kb k${k}">${k}</span><span><b>${EL_CAT[k][0]}.</b> ${EL_CAT[k][1]}</span></div>`).join('')}</div></details>
      <p class="note">OMS, Medical eligibility criteria for contraceptive use, 6ª edição, 2025. Quando há mais de uma condição, vale a categoria mais alta; o conjunto pode pesar mais do que cada item. A ferramenta cobre as condições mais comuns da aula, não a tabela inteira.</p>
    </section>` +
    card('Roteiro do laboratório', roteiro([
      ['Carla tem 37 anos e fuma um maço por dia. Preveja as duas categorias antes de revelar. Se ela tivesse 30 anos, mudaria?', 'Aos 37, com 15 ou mais cigarros por dia: categoria 4 para a combinada e 1 para a minipílula. Aos 30, a combinada cai para categoria 2. O corte dos 35 anos existe porque o risco arterial (infarto e AVC) do tabagismo com estrogênio cresce com a idade.'],
      ['Marina tem enxaqueca com aura. Por que a categoria é 4 se ela é jovem e saudável?', 'A enxaqueca com aura já aumenta o risco de AVC isquêmico, e o estrogênio multiplica esse risco. O risco absoluto é baixo em jovens, mas o desfecho é grave e existem alternativas sem estrogênio: por isso a OMS classifica como risco inaceitável.'],
      ['Paula amamenta e está com 4 semanas de pós-parto. Qual pílula? E com 8 semanas?', 'Com 4 semanas: combinada categoria 4, minipílula categoria 2. Com 8 semanas, ainda amamentando: combinada categoria 3, minipílula categoria 1. A pílula só de progestina não interfere na produção de leite.'],
      ['Uma paciente usa a pílula e vai tomar amoxicilina por 7 dias. Precisa de preservativo? E se fosse rifampicina?', 'Com antibióticos comuns, não: categoria 1, sem perda de eficácia (OMS e CDC). A exceção são a rifampicina e a rifabutina, indutoras do CYP3A4: categoria 3 para as duas pílulas. Vale também para anticonvulsivantes indutores.'],
    ]), { wide: true, lede: 'Use “Esconder o resultado” para prever antes de conferir.' });

  const draw = () => {
    store.set('co.el', p);
    $('elA').value = p.age; $('elAo').textContent = p.age + ' anos'; $('elI').checked = p.imc;
    g.querySelectorAll('[data-g]').forEach(w => w.querySelectorAll('.chip').forEach(c => c.classList.toggle('on', p[w.dataset.g] === c.dataset.v)));
    $('elC').querySelectorAll('.chip').forEach(c => c.classList.toggle('on', +c.dataset.i === cs));
    const R = elRules(p), kc = Math.max(...R.map(r => r[1])), kp = Math.max(...R.map(r => r[2])), vis = !hide || shown;
    const tx = k => R.find(r => r[k] === (k === 1 ? kc : kp) && r[4] && k === 1);
    const box = (elid, name, k, alt) => { $(elid).className = 'cat ' + (vis ? 'k' + k : ''); $(elid).style.background = vis ? '' : 'var(--sunk)';
      $(elid).innerHTML = vis ? `<span class="n">${k}</span><b>${name}: ${EL_CAT[k][0].toLowerCase()}</b><span>${alt ? 'Categoria ' + alt + '. ' : ''}${EL_CAT[k][1]}</span>` : `<span class="n" style="color:var(--muted)">?</span><b>${name}</b><span>Qual categoria você daria?</span>`; };
    box('elK1', 'Pílula combinada', kc, tx(1) ? tx(1)[4] : ''); box('elK2', 'Minipílula', kp, '');
    $('elRevW').hidden = vis;
    $('elBar').innerHTML = `<span>Combinada <span class="kb ${vis ? 'k' + kc : ''}">${vis ? kc : '?'}</span></span><span>Minipílula <span class="kb ${vis ? 'k' + kp : ''}">${vis ? kp : '?'}</span></span>`;
    $('elWhy').innerHTML = vis ? `<div class="why"><div class="hd"><span>O que pesou</span><span>Comb.</span><span>Mini</span></div>${R.map(r => `<div><span>${r[0]}${r[3] ? `<br><span style="color:var(--muted);font-size:12.5px">${r[3]}</span>` : ''}</span><span class="kb k${r[1]}">${r[1]}</span><span class="kb k${r[2]}">${r[2]}</span></div>`).join('')}</div>` : '';
    $('elAdv').hidden = !vis;
    $('elAdv').innerHTML = kc <= 2 && kp <= 2 ? (kc === 1 ? 'Sem restrição a nenhuma das duas. A escolha passa a ser de preferência, perfil de efeitos e adesão.' : 'As duas pílulas são aceitáveis. Registre o fator de risco e reavalie nas consultas: as categorias mudam com a idade e com novas condições.')
      : kp <= 2 ? `O problema é o <b>estrogênio</b>. A minipílula é a opção oral (categoria ${kp}); DIU e implante também não têm estrogênio.`
      : kp === 3 ? 'Nenhuma das pílulas é boa escolha aqui. Considere métodos que não dependem do metabolismo hepático nem de hormônio sistêmico, como o DIU.'
      : 'Hormônios estão contraindicados. O DIU de cobre é a alternativa de alta eficácia.';
  };
  const touch = () => { cs = -1; shown = false; draw(); };
  $('elC').onclick = e => { const c = e.target.closest('.chip'); if (!c) return; cs = +c.dataset.i; p = Object.assign(blank(), EL_CASES[cs][1]); shown = false; draw(); };
  $('elA').oninput = e => { p.age = +e.target.value; touch(); };
  $('elI').onchange = e => { p.imc = e.target.checked; touch(); };
  g.querySelectorAll('[data-g]').forEach(w => w.onclick = e => { const c = e.target.closest('.chip'); if (!c) return; p[w.dataset.g] = c.dataset.v; touch(); });
  $('elReset').onclick = () => { p = blank(); touch(); };
  $('elH').onchange = e => { hide = e.target.checked; shown = false; draw(); };
  $('elRev').onclick = () => { shown = true; draw(); };
  draw();
}

/* ---------- contracepção de emergência ---------- */
const AE_P = { '-5': 10, '-4': 16, '-3': 14, '-2': 27, '-1': 31, '0': 33 };   // Wilcox et al., 1995: % de concepção por dia da relação
const AE_ST = [
  ['Folículo ainda pequeno', 'mais de 2 dias e meio antes da ovulação', null, 'alta'],
  ['Folículo de 18 mm ou mais, LH ainda baixo', 'de 2,5 a 1,5 dia antes', { lng: 25, upa: 100, pl: 0 }],
  ['LH subindo', 'de 1,5 a 0,5 dia antes', { lng: 14, upa: 79, pl: 10 }],
  ['Pico de LH', 'últimas 12 horas', { lng: 9, upa: 8, pl: 4 }],
  ['Depois da ovulação', 'o óvulo já foi liberado', null, '—'],
];
const aeStage = t => t < -2.5 ? 0 : t < -1.5 ? 1 : t < -0.5 ? 2 : t < 0 ? 3 : 4;
const AE_D = { lng: 'O levonorgestrel', upa: 'O ulipristal', cu: 'O DIU de cobre' };
function renderEmergencia(g) {
  const saved = store.get('co.ae', {});
  let rel = saved.rel === undefined ? -4 : saved.rel, del = saved.del === undefined ? 12 : saved.del, drug = AE_D[saved.drug] ? saved.drug : 'lng';
  g.innerHTML =
    `<section class="card" style="min-width:0"><div class="card-h"><div><span class="eyebrow">Simulador</span><h3>A pílula chega antes do pico de LH?</h3></div>${moreBtn('co_ae')}</div>
      <div class="sub">Método</div>${pick('aeD', [['lng', 'Levonorgestrel 1,5 mg'], ['upa', 'Ulipristal 30 mg'], ['cu', 'DIU de cobre']], drug)}
      <div class="range" style="margin-top:14px"><label for="aeR">Dia da relação desprotegida</label><output id="aeRo"></output><input type="range" id="aeR" min="-7" max="2" step="0.5"></div>
      <div class="range" style="margin-top:6px"><label for="aeT" id="aeTl">Tomada da pílula</label><output id="aeTo"></output><input type="range" id="aeT" min="0" max="120" step="6"></div>
      <div class="tiles" style="margin-top:14px"><div class="tile"><span>Chance de gestação</span><b id="aeT1"></b><small>sem contracepção de emergência</small></div><div class="tile"><span>Momento da tomada</span><b id="aeT2" style="font-size:16px;line-height:1.25"></b><small id="aeT2s"></small></div><div class="tile acc"><span>Ovulação adiada</span><b id="aeT3"></b><small id="aeT3s"></small></div></div>
      <div class="verdict" id="aeV" style="margin-top:12px"></div>
      <p class="note">O ulipristal não está disponível no Brasil (SBRH, 2024); aparece aqui porque ajuda a entender o mecanismo.</p>
    </section>` +
    `<section class="card" style="min-width:0"><div class="card-h"><div><span class="eyebrow">Ao vivo</span><h3>A semana da ovulação</h3></div></div>
      <div id="aeFig"></div>
      <div class="legend"><span><i style="background:var(--accent);height:10px;opacity:.8"></i>chance de concepção por dia da relação</span><span><i style="background:var(--lh)"></i>pico de LH</span><span><i style="background:var(--fsh);height:8px;opacity:.35"></i>espermatozoides viáveis</span><span><i style="background:var(--cl)"></i>ovulação</span></div>
      <div class="why" id="aeStg" style="margin-top:12px"></div>
      <p class="note">Chance de concepção: Wilcox et al., NEJM, 1995. Ovulação adiada por 5 dias ou mais, conforme o momento da tomada: Brache et al., Contraception, 2013. Os limites entre as fases são aproximados: na vida real ninguém sabe em que dia está.</p>
    </section>` +
    card('Quanto antes, melhor', `<div id="aeEff"></div>
      <div class="insight">A pílula não perde força com as horas. O que acontece é que, a cada dia de espera, cresce a chance de a tomada cair <b>depois</b> do início do pico de LH, quando ela já não consegue adiar a ovulação.</div>
      <p class="note">Gestações evitadas com levonorgestrel, conforme o intervalo entre a relação e a tomada (OMS, Lancet, 1998). O uso é aceito até 120 horas, com eficácia menor.</p>`, { lede: 'Levonorgestrel: proporção das gestações esperadas que foi evitada.' }) +
    card('Pílula do dia seguinte não é pílula abortiva', `<div class="tw"><table class="t wrap"><thead><tr><th></th><th>Levonorgestrel</th><th>Mifepristona (RU-486)</th></tr></thead><tbody>
      <tr style="cursor:default"><td><b>Classe</b></td><td>Progestina: agonista do receptor de progesterona</td><td>Antiprogestina: antagonista do receptor de progesterona</td></tr>
      <tr style="cursor:default"><td><b>O que faz</b></td><td>Inibe ou adia a ovulação. Age antes da fecundação.</td><td>Bloqueia a progesterona e desestabiliza o endométrio que sustenta a gestação.</td></tr>
      <tr style="cursor:default"><td><b>Age sobre o embrião implantado?</b></td><td><span class="no">Não.</span> É ineficaz depois da ovulação.</td><td><span class="ok">Sim.</span> Interrompe gestação estabelecida.</td></tr>
      <tr style="cursor:default"><td><b>Uso</b></td><td>Contracepção de emergência, até 72 a 120 horas depois da relação.</td><td>Interrupção da gestação, com misoprostol (OMS, 2022).</td></tr>
      <tr style="cursor:default"><td><b>No Brasil</b></td><td>Disponível no SUS e em farmácias.</td><td>Sem registro na Anvisa.</td></tr></tbody></table></div>
      <div class="insight">Estudo de Noé et al. (2011): entre mulheres que tomaram levonorgestrel <b>antes</b> da ovulação, nenhuma gestação, onde se esperavam 16. Entre as que tomaram no dia da ovulação ou <b>depois</b>, 8 gestações, onde se esperavam 8,7. Depois da ovulação, a pílula não muda nada.</div>`, { more: 'co_abort' }) +
    card('Roteiro do laboratório', roteiro([
      ['Relação 4 dias antes da ovulação, levonorgestrel 12 horas depois. Funciona? E se a tomada for 60 horas depois?', 'Com 12 horas, a tomada cai com o folículo ainda pequeno: a ovulação é adiada e os espermatozoides não sobrevivem até ela. Com 60 horas, a tomada cai com o LH já subindo: o levonorgestrel adia a ovulação em 14% dos ciclos, o mesmo que o placebo (10%).'],
      ['Ponha a relação no dia da ovulação e a tomada 6 horas depois. O que a pílula faz? O que isso diz sobre ela ser abortiva?', 'Nada: a ovulação já aconteceu. Se houver fecundação, o levonorgestrel não impede a implantação nem interrompe a gestação. A eficácia que cai com o tempo é a assinatura de um método que evita a gravidez, e não de um que a interrompe.'],
      ['Uma paciente chega 4 dias depois da relação, que foi perto da ovulação. Qual método você ofereceria?', 'O DIU de cobre: pode ser inserido até 5 dias depois da relação, falha em cerca de 0,1% dos casos e é o único que ainda age depois da ovulação. De quebra, vira contracepção de longa duração.'],
      ['Por que a contracepção de emergência é oferecida mesmo quando a relação parece estar fora da janela fértil?', 'Porque a data da ovulação é incerta e varia de ciclo para ciclo, mesmo em mulheres com ciclos regulares. O custo de tomar sem precisar é baixo; o de não tomar precisando é alto.'],
    ]), { wide: true, lede: 'Posicione os controles antes de abrir cada resposta.' });

  const dd = v => v === 0 ? 'no dia da ovulação' : `${nf(Math.abs(v), v % 1 ? 1 : 0)} ${Math.abs(v) === 1 ? 'dia' : 'dias'} ${v < 0 ? 'antes' : 'depois'} da ovulação`;
  const draw = () => {
    store.set('co.ae', { rel, del, drug });
    const tk = rel + del / 24, st = aeStage(tk), k = Math.round(rel), p0 = rel >= -5.5 && rel <= 0.5 ? AE_P[String(k === 0 ? 0 : k)] || 0 : 0, S = AE_ST[st], cu = drug === 'cu';
    $('aeR').value = rel; $('aeT').value = del; $('aeRo').textContent = dd(rel); $('aeTl').textContent = cu ? 'Inserção do DIU' : 'Tomada da pílula'; $('aeTo').textContent = del ? `${del} horas depois` : 'logo depois';
    $('aeT1').textContent = p0 ? `≈ ${p0}%` : 'muito baixa';
    $('aeT2').textContent = S[0]; $('aeT2s').textContent = S[1];
    const pct = cu ? null : S[2] ? S[2][drug] : null;
    $('aeT3').textContent = cu ? 'não se aplica' : st === 0 ? 'na maioria' : st === 4 ? 'não há' : pct + '%'; $('aeT3s').textContent = cu ? 'o DIU age por outro mecanismo' : st === 0 ? 'dos ciclos (Croxatto et al., 2004)' : st === 4 ? 'ovulação a adiar' : `dos ciclos · placebo: ${S[2].pl}%`;
    let v;
    if (cu) v = ['good', 'O DIU de cobre funciona em qualquer ponto do ciclo', 'Inserido até 5 dias depois da relação, falha em cerca de 0,1% dos casos. O cobre é tóxico para espermatozoides e óvulo e impede a fecundação: é o único método de emergência que ainda age depois da ovulação.'];
    else if (!p0) v = ['neu', 'Relação fora da janela fértil', 'Neste dia do ciclo a chance de gestação é muito baixa, com ou sem pílula. Como ninguém sabe o dia exato da ovulação, a contracepção de emergência é oferecida sempre.'];
    else if (st === 0) v = ['good', 'Chega a tempo: ovulação adiada', `Folículo pequeno e LH baixo. ${AE_D[drug]} adia a ovulação por cerca de 5 dias; quando ela acontecer, os espermatozoides desta relação já não estarão viáveis.`];
    else if (st === 1) v = drug === 'lng' ? ['warn', 'A janela do levonorgestrel está se fechando', 'Com o folículo já grande, o levonorgestrel adiou a ovulação em 25% dos ciclos estudados (placebo: 0%). O ulipristal, em 100%.'] : ['good', 'O ulipristal ainda adia a ovulação', 'Antes do início do pico de LH, o ulipristal adiou a ovulação em 100% dos ciclos estudados (levonorgestrel: 25%).'];
    else if (st === 2) v = drug === 'lng' ? ['bad', 'Tarde demais para o levonorgestrel', 'Com o LH já subindo, o levonorgestrel adiou a ovulação em 14% dos ciclos, o mesmo que o placebo (10%). O ulipristal ainda conseguiu em 79%.'] : ['warn', 'O ulipristal ainda age na maioria dos ciclos', 'Com o LH já subindo, o ulipristal adiou a ovulação em 79% dos ciclos estudados (levonorgestrel: 14%; placebo: 10%).'];
    else if (st === 3) v = ['bad', 'No pico de LH, nenhuma pílula adia a ovulação', 'Ulipristal 8%, levonorgestrel 9%, placebo 4%: sem diferença. A chance de gestação é a mesma de não tomar nada.'];
    else v = ['bad', 'A ovulação já aconteceu', 'Nenhuma pílula de emergência age depois da ovulação. Se houver fecundação, o levonorgestrel não impede a implantação nem interrompe a gestação.'];
    $('aeV').className = 'verdict ' + v[0]; $('aeV').innerHTML = `<b>${v[1]}</b><span>${v[2]}</span>`;
    // figura
    const W = cw('aeFig'), L = 8, R = 8, x = t => L + (t + 7.5) / 15 * (W - L - R), B = 132, T = 44, yp = q => B - q / 42 * (B - T);
    const works = !cu && p0 && (st === 0 || (drug === 'upa' && st <= 2));
    let s = `<svg class="ch" viewBox="0 0 ${W} 228" role="img" aria-label="Linha do tempo em relação à ovulação">`;
    [[-7.5, -2.5], [-2.5, -1.5], [-1.5, -0.5], [-0.5, 0], [0, 7.5]].forEach(([a, b], i) => s += `<rect x="${x(a) + 1}" y="10" width="${x(b) - x(a) - 2}" height="18" rx="4" class="stg${i === st ? ' on' : ''}"/>${x(b) - x(a) > 16 ? `<text x="${(x(a) + x(b)) / 2}" y="23" text-anchor="middle" class="${i === st ? 'lbl' : ''}" style="font-size:11px">${i + 1}</text>` : ''}`);
    s += `<line x1="${L}" x2="${W - R}" y1="${B}" y2="${B}" class="ax"/>`;
    Object.entries(AE_P).forEach(([d, q]) => { const bw = (x(1) - x(0)) * 0.72; s += `<rect x="${x(+d) - bw / 2}" y="${yp(q)}" width="${bw}" height="${B - yp(q)}" rx="3" class="probb" style="opacity:${Math.round(rel) === +d && p0 ? 1 : .4}"/>${W > 420 || Math.round(rel) === +d ? `<text x="${x(+d)}" y="${yp(q) - 4}" text-anchor="middle" class="${Math.round(rel) === +d ? 'lbl' : ''}" style="font-size:10.5px">${q}%</text>` : ''}`; });
    let lh = ''; for (let t = -3; t <= 1.5; t += 0.1) lh += (lh ? 'L' : 'M') + x(t).toFixed(1) + ' ' + (B - 84 * gss(t, -0.55, 0.42)).toFixed(1);
    s += `<path d="${lh} L${x(1.5)} ${B} L${x(-3)} ${B} Z" class="lhc"/>`;
    s += `<line x1="${x(0)}" x2="${x(0)}" y1="34" y2="${B + 4}" class="ovl" ${works ? 'style="opacity:.35;stroke-dasharray:4 4"' : ''}/><text x="${x(0) + 5}" y="42" class="ev" style="font-size:10.5px">${works ? 'ovulação prevista' : 'ovulação'}</text>`;
    if (works) s += `<line x1="${x(5)}" x2="${x(5)}" y1="34" y2="${B + 4}" class="ovl"/><path d="M${x(0) + 6} 58 H${x(5) - 8} m-6 -5 l6 5 l-6 5" style="stroke:var(--fg);stroke-width:1.4;fill:none"/><text x="${x(5) - 5}" y="76" text-anchor="end" class="ev" style="font-size:10.5px">adiada ~5 dias</text>`;
    s += `<rect x="${x(rel)}" y="${B + 12}" width="${Math.max(0, Math.min(x(rel + 5), W - R) - x(rel))}" height="8" rx="4" class="spv"/>`;
    s += `<circle cx="${x(rel)}" cy="${B + 16}" r="9" class="mkR ring"/><text x="${x(rel)}" y="${B + 16}" class="mtxt">R</text>`;
    s += `<circle cx="${Math.min(x(tk), W - R - 9)}" cy="${B + 40}" r="9" class="mkT ring"/><text x="${Math.min(x(tk), W - R - 9)}" y="${B + 40}" class="mtxt" style="fill:var(--surface)">${cu ? 'D' : 'P'}</text><line x1="${Math.min(x(tk), W - R - 9)}" x2="${Math.min(x(tk), W - R - 9)}" y1="28" y2="${B + 30}" class="dotst"/>`;
    [-6, -4, -2, 0, 2, 4, 6].forEach(t => s += `<text x="${x(t)}" y="208" text-anchor="middle">${t > 0 ? '+' + t : t}</text>`);
    s += `<text x="${W / 2}" y="224" text-anchor="middle" style="font-size:11px">dias em relação à ovulação</text>`;
    $('aeFig').innerHTML = s + '</svg>';
    $('aeStg').innerHTML = `<div class="hd"><span>Fase no momento da tomada (R = relação, ${cu ? 'D = DIU' : 'P = pílula'})</span><span>LNG</span><span>UPA</span></div>` + AE_ST.map((q, i) => `<div style="opacity:${i === st ? 1 : .55}"><span><b>${i + 1}. ${q[0]}</b><br><span style="color:var(--muted);font-size:12.5px">${q[1]}</span></span><span class="num" style="font-weight:600">${q[2] ? q[2].lng + '%' : q[3]}</span><span class="num" style="font-weight:600">${q[2] ? q[2].upa + '%' : q[3]}</span></div>`).join('');
    // eficácia por tempo
    const E = [['até 24 h', 95, 0, 24], ['25 a 48 h', 85, 24, 48], ['49 a 72 h', 58, 48, 72]], W2 = cw('aeEff'), rh = 30, L2 = 84, R2 = 46;
    let t2 = `<svg class="ch" viewBox="0 0 ${W2} ${E.length * rh + 4}" role="img" aria-label="Gestações evitadas com levonorgestrel conforme o tempo até a tomada">`;
    E.forEach(([l, q, a, b], i) => { const yy = i * rh + 2, w = q / 100 * (W2 - L2 - R2), me = (del > a || (a === 0 && del === 0)) && del <= b;
      t2 += `<text x="${L2 - 8}" y="${yy + 17}" text-anchor="end" class="${me ? 'lbl' : ''}">${l}</text><rect x="${L2}" y="${yy + 4}" width="${W2 - L2 - R2}" height="18" rx="4" class="soft"/><rect x="${L2}" y="${yy + 4}" width="${w}" height="18" rx="4" class="hl" style="opacity:${me ? 1 : .4}"/><text x="${L2 + w + 6}" y="${yy + 17}" class="${me ? 'lbl' : ''}">${q}%</text>`; });
    $('aeEff').innerHTML = t2 + '</svg>';
  };
  bindPick('aeD', v => { drug = v; draw(); });
  $('aeR').oninput = e => { rel = +e.target.value; draw(); };
  $('aeT').oninput = e => { del = +e.target.value; draw(); };
  draw();
}
