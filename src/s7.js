/* ===== Tela 7 · Dose e segurança ===== */
const cp = c => nf(c, c % 1 ? (Math.round(c * 100) % 10 ? 2 : 1) : 0);
const DOSE_AGENTS = ['lido', 'mepi', 'prilo', 'arti', 'bupi', 'ropi'];
function renderDose(g) {
  const sv = store.get('dose', {});
  let aid = DOSE_AGENTS.includes(sv.a) ? sv.a : 'lido', kg = sv.kg || 70, epi = sv.e ?? false, conc = sv.c || 1, epiC = 5, used = 0, lkg = 70;
  g.innerHTML =
    card('Quantos mililitros posso injetar?', `<div class="sub">Anestésico</div><div class="chips wrapc" id="dAg">${DOSE_AGENTS.map(k => `<button class="chip" data-a="${k}">${AG[k].n}</button>`).join('')}</div>
      <div class="fields" style="margin-top:12px">
        <div class="inp"><label for="dKg">Peso do paciente</label><div class="box"><input id="dKg" type="number" inputmode="decimal" min="1" max="200" step="1"><span>kg</span></div></div>
        <div class="inp"><label for="dUsed">Já injetado <small>somando todas as aplicações</small></label><div class="box"><input id="dUsed" type="number" inputmode="decimal" min="0" step="0.5" value="0"><span>mL</span></div></div>
      </div>
      <div class="row" style="margin-top:10px"><span class="chip" style="border:0;background:none;padding-left:0">Exemplos:</span><button class="chip" data-kg="70">Adulto 70 kg</button><button class="chip" data-kg="20">Criança 20 kg</button></div>
      <div class="sub">Concentração</div><div class="chips wrapc" id="dConc"></div>
      <div class="sub">Vasoconstritor</div><div class="row">${seg('dEpi', [['0', 'Sem adrenalina'], ['1', 'Com adrenalina']], epi ? '1' : '0')}<span id="dEpiC"></span></div>
      <div class="tiles" style="margin-top:14px"><div class="tile"><span>Dose máxima</span><b id="oMg"></b><small id="oMgS"></small></div><div class="tile acc big"><span>Volume máximo</span><b id="oMl"></b><small id="oMlS"></small></div><div class="tile" id="oRemT"><span>Ainda disponível</span><b id="oRem"></b><small id="oRemS"></small></div></div>
      <div class="eq" id="oEq" style="margin-top:10px"></div><div id="oWarn"></div>
      <p class="note">Dose máxima é teto, não meta. Calcule antes de começar e some tudo o que for injetado, inclusive por outros profissionais.</p>`, { wide: true, more: 'dose' }) +
    card('Adrenalina: menos absorção, mais efeito', `<div class="tiles"><div class="tile"><span>1:100.000</span><b>10 µg/mL</b></div><div class="tile"><span>1:200.000</span><b>5 µg/mL</b></div></div>
      <ul style="margin:12px 0 0;padding-left:18px;font-size:14px;display:grid;gap:4px"><li>Menos absorção sistêmica e pico plasmático menor</li><li>Mais duração do bloqueio e dose máxima maior</li><li>Campo com menos sangramento</li><li>Cuidado: injeção intravascular, cardiopatas (na odontologia, cerca de 40 µg no total), feocromocitoma</li></ul>
      <div class="sub" style="margin-top:16px">Mito × evidência: adrenalina no dedo</div>
      <div class="tiles"><div class="tile acc"><span>Casos em mãos e dedos</span><b>3.110</b><small>lidocaína com adrenalina</small></div><div class="tile good"><span>Necroses digitais</span><b>0</b><small>Lalonde et al., 2005</small></div></div>
      <p style="font-size:14px;margin:10px 0 0">O mito nasceu de relatos anteriores a 1950, ligados à procaína ácida e a soluções sem padronização. Adrenalina diluída é segura em extremidades de pacientes sem vasculopatia grave (base do WALANT). Se houver isquemia persistente, a fentolamina local reverte a vasoconstrição.</p>`, { id: 'vaso', more: 'vaso', wide: true }) +
    card('LAST: toxicidade sistêmica', `<div class="grid two" style="gap:12px"><div><div class="sub">Sistema nervoso central</div><ol style="margin:0;padding-left:18px;font-size:13.5px;display:grid;gap:3px"><li>Gosto metálico, dormência perioral, zumbido</li><li>Agitação, confusão, fala arrastada</li><li>Convulsões</li><li>Depressão do SNC, coma, apneia</li></ol></div>
      <div><div class="sub">Cardiovascular</div><ol style="margin:0;padding-left:18px;font-size:13.5px;display:grid;gap:3px"><li>Hipertensão e taquicardia iniciais</li><li>Bradicardia, hipotensão</li><li>Arritmias ventriculares</li><li>Colapso circulatório, assistolia</li></ol></div></div>
      <p class="note">Apresentações atípicas são comuns: só cardiovasculares ou tardias. A bupivacaína é a mais cardiotóxica.</p>
      <div class="sub" style="margin-top:14px">Conduta</div><div class="steps"><div class="stp"><i>1</i><b>Pare</b><span>Interrompa a injeção e peça ajuda</span></div><div class="stp"><i>2</i><b>Oxigene</b><span>O₂ a 100%, via aérea; evite hipóxia e acidose</span></div><div class="stp"><i>3</i><b>Convulsão</b><span>Benzodiazepínico</span></div><div class="stp"><i>4</i><b>Lipídio</b><span>Emulsão lipídica 20% ao primeiro sinal grave</span></div></div>
      <div class="sub" style="margin-top:14px">Emulsão lipídica 20%</div>
      <div class="fields" style="max-width:260px"><div class="inp"><label for="lKg">Peso</label><div class="box"><input id="lKg" type="number" inputmode="decimal" min="1" max="200" value="70"><span>kg</span></div></div></div>
      <div class="tiles" style="margin-top:10px"><div class="tile acc"><span>Bolus em 2–3 min</span><b id="lBol"></b></div><div class="tile"><span>Infusão</span><b id="lInf"></b><small id="lInfS"></small></div><div class="tile"><span>Máximo total</span><b id="lMax"></b><small>≈ 12 mL/kg</small></div></div>
      <p class="note">Instável: repetir o bolus 1 a 2 vezes e dobrar a infusão. Na parada: adrenalina ≤ 1 µg/kg; evitar vasopressina, bloqueadores de cálcio, betabloqueadores e outro anestésico local. Checklist da ASRA (Neal et al., 2020).</p>`, { wide: true, more: 'last' }) +
    card('Nem toda reação é toxicidade sistêmica', `<div class="stack">
      <div class="tile"><span>Metemoglobinemia</span><small style="font-size:13.5px;color:var(--fg)">Prilocaína e benzocaína. SpO₂ perto de 85% que não melhora com O₂, sangue “achocolatado”. Azul de metileno 1–2 mg/kg.</small></div>
      <div class="tile"><span>Alergia</span><small style="font-size:13.5px;color:var(--fg)">Rara. Mais com ésteres (PABA) e conservantes. A maioria das “alergias” é reação vasovagal, ansiedade ou efeito da adrenalina.</small></div>
      <div class="tile"><span>Neurotoxicidade</span><small style="font-size:13.5px;color:var(--fg)">Injeção intraneural; sintomas transitórios após lidocaína intratecal; síndrome da cauda equina.</small></div></div>`) +
    card('Mesmo fármaco, pacientes diferentes', `<div class="stack">
      <div class="tile"><span>Gestantes</span><small style="font-size:13.5px;color:var(--fg)">Mais sensibilidade e mais fração livre. Reduzir a dose no neuroeixo (~25–30%). Lidocaína é segura para sutura, inclusive na amamentação.</small></div>
      <div class="tile"><span>Crianças</span><small style="font-size:13.5px;color:var(--fg)">Dose por kg calculada antes. LET e EMLA ajudam. EMLA com cautela antes dos 3 meses; sem benzocaína antes dos 2 anos.</small></div>
      <div class="tile"><span>Idosos, hepatopatas e cardiopatas</span><small style="font-size:13.5px;color:var(--fg)">Menos depuração e reserva: doses menores, injeção lenta. As amidas se acumulam na hepatopatia e na ICC. Cardiopata: limitar a adrenalina total.</small></div></div>`);

  const upd = () => {
    const a = AG[aid]; if (a.epiOnly) epi = true;
    if (!a.conc.includes(conc)) conc = a.conc[Math.min(1, a.conc.length - 1)];
    store.set('dose', { a: aid, kg, e: epi, c: conc });
    $('dAg').querySelectorAll('.chip').forEach(c => c.classList.toggle('on', c.dataset.a === aid));
    $('dConc').innerHTML = a.conc.map(c => `<button class="chip${c === conc ? ' on' : ''}" data-c="${c}">${cp(c)}%<small>${cp(c * 10)} mg/mL</small></button>`).join('');
    const segB = $('dEpi').querySelectorAll('button'); segB[0].disabled = !!a.epiOnly; segB.forEach(b => { const on = (b.dataset.v === '1') === epi; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
    $('dEpiC').innerHTML = epi ? seg('dEpiConc', [['10', '1:100.000'], ['5', '1:200.000']], String(epiC)) : '';
    if (epi) bindSeg('dEpiConc', v => { epiC = +v; upd(); });
    if (document.activeElement !== $('dKg')) $('dKg').value = kg;
    const perKg = a.dose[epi ? 1 : 0], mgKg = perKg * kg, cap = a.cap ? a.cap[epi ? 1 : 0] : null, mg = cap ? Math.min(mgKg, cap) : mgKg;
    const mgmL = conc * 10, ml = mg / mgmL, rem = ml - used;
    $('oMg').textContent = nf(mg, 0) + ' mg'; $('oMgS').textContent = `${nf(perKg, 1)} mg/kg${cap && mgKg > cap ? ` · limitado ao teto de ${cap} mg` : cap ? ` · teto ${cap} mg` : ''}`;
    $('oMl').textContent = nf(ml, ml < 10 ? 1 : 0) + ' mL'; $('oMlS').textContent = a.dental ? `≈ ${nf(ml / 1.8, 1)} tubetes de 1,8 mL` : `de ${a.n.toLowerCase()} ${cp(conc)}%`;
    $('oRem').textContent = nf(Math.max(0, rem), 1) + ' mL'; $('oRemT').className = 'tile ' + (rem <= 0 ? 'bad' : rem < ml * 0.25 ? 'alt' : 'good');
    $('oRemS').textContent = used > 0 ? (rem <= 0 ? 'dose máxima atingida' : `já usado: ${nf(used * mgmL, 0)} mg`) : 'nada injetado ainda';
    $('oEq').innerHTML = `${cp(conc)}% × 10 = <b>${cp(mgmL)} mg/mL</b><br>${nf(perKg, 1)} mg/kg × ${nf(kg, 0)} kg = ${nf(mgKg, 0)} mg${cap && mgKg > cap ? ` → teto ${cap} mg` : ''}<br>${nf(mg, 0)} mg ÷ ${cp(mgmL)} mg/mL = <b>${nf(ml, 1)} mL</b>${epi ? `<br>adrenalina: ${nf(ml, 1)} mL × ${epiC} µg/mL = ${nf(ml * epiC, 0)} µg` : ''}`;
    let w = '';
    if (kg < 30) w += `<div class="insight warn">Em crianças a margem é pequena: ${nf(kg, 0)} kg permitem só ${nf(ml, 1)} mL nesta concentração.</div>`;
    if (epi && ml * epiC > 40) w += `<div class="insight warn">O volume máximo leva ${nf(ml * epiC, 0)} µg de adrenalina. Em cardiopatas, limite a adrenalina total (na odontologia, cerca de 40 µg, ou ${nf(40 / epiC, 0)} mL desta solução).</div>`;
    if (aid === 'prilo' && mg > 600) w += `<div class="insight warn">Prilocaína acima de ~600 mg aumenta o risco de metemoglobinemia.</div>`;
    $('oWarn').innerHTML = w;
  };
  $('dAg').onclick = e => { const c = e.target.closest('.chip'); if (c) { aid = c.dataset.a; upd(); } };
  $('dConc').onclick = e => { const c = e.target.closest('.chip'); if (c) { conc = +c.dataset.c; upd(); } };
  bindSeg('dEpi', v => { epi = v === '1'; upd(); });
  $('dKg').oninput = e => { const v = parseFloat(String(e.target.value).replace(',', '.')); if (v > 0 && v <= 250) { kg = v; upd(); } };
  $('dUsed').oninput = e => { const v = parseFloat(String(e.target.value).replace(',', '.')); used = v > 0 ? v : 0; upd(); };
  g.querySelectorAll('[data-kg]').forEach(b => b.onclick = () => { kg = +b.dataset.kg; upd(); });
  const lip = () => {
    const big = lkg > 70;
    $('lBol').textContent = big ? '≈ 100 mL' : nf(1.5 * lkg, 0) + ' mL';
    $('lInf').textContent = big ? '≈ 250 mL' : nf(0.25 * lkg, 1) + ' mL/min';
    $('lInfS').textContent = big ? 'em 15–20 min' : '0,25 mL/kg/min';
    $('lMax').textContent = nf(12 * lkg, 0) + ' mL';
  };
  $('lKg').oninput = e => { const v = parseFloat(String(e.target.value).replace(',', '.')); if (v > 0) { lkg = v; lip(); } };
  upd(); lip();
  if (location.hash === '#vaso') setTimeout(() => $('vaso').scrollIntoView(), 50);
}
