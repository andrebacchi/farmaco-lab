/* ===== Saiba mais, glossário, como usar ===== */
const REFS = '<p class="src">Referências: Brunton & Knollmann (eds), Goodman & Gilman’s The Pharmacological Basis of Therapeutics, 14ª ed., 2023 · Gropper (ed), Miller’s Anesthesia, 10ª ed., 2024 · Raja et al., Pain, 2020 · Neal, Neal & Weinberg, Reg Anesth Pain Med, 2021 (checklist de LAST da ASRA) · Lalonde et al., J Hand Surg Am, 2005 · Cepeda et al., Cochrane, 2010.</p>';
const LEARN = {
  conceito: { t: 'Dor, nocicepção e anestesia', h: `
    <h4>Dor não é o mesmo que nocicepção</h4><p>A IASP (2020) define dor como “uma experiência sensorial e emocional desagradável associada, ou semelhante àquela associada, a uma lesão tecidual real ou potencial”. <b>Nocicepção</b> é o processo neural que detecta e codifica o estímulo nocivo; <b>dor</b> é a experiência consciente.</p>
    <p>Sob anestesia geral a nocicepção continua (taquicardia e hipertensão ao estímulo cirúrgico), mas não há percepção. Por isso a analgesia é um componente separado da anestesia geral.</p>
    <h4>O anestésico local não é um “analgésico”</h4><p>Ele bloqueia qualquer fibra que alcançar em concentração suficiente: sensitiva, motora ou autonômica. A seletividade clínica vem da concentração, do volume, do local de aplicação e das características das fibras (tela 5).</p>
    <div class="trap"><h4>Armadilha comum</h4><p>Achar que o anestésico local age na percepção da dor. Ele age na <b>transmissão</b>: o sinal nasce no nociceptor, mas não chega à medula.</p></div>${REFS}` },
  quimica: { t: 'Ésteres e amidas', h: `
    <h4>Estrutura</h4><p>Anel aromático (lipofílico) + cadeia intermediária (éster ou amida) + amina terciária (hidrofílica, ionizável). A amina é o que faz o fármaco existir nas duas formas, ionizada e não ionizada.</p>
    <h4>Ésteres</h4><p>Hidrolisados pela pseudocolinesterase plasmática: meia-vida curta. Geram ácido para-aminobenzoico (PABA), responsável pela maioria das alergias verdadeiras. Pacientes com deficiência de pseudocolinesterase metabolizam mal os ésteres.</p>
    <h4>Amidas</h4><p>Metabolismo hepático (lidocaína: CYP1A2 e 3A4; bupivacaína: 3A4; ropivacaína: 1A2). Alergia verdadeira é raríssima: muitas “alergias” são reações vasovagais, ansiedade, efeito da adrenalina ou reação a conservantes (metilparabeno, metabissulfito).</p>
    <div class="trap"><h4>A exceção</h4><p>A <b>articaína</b> é uma amida com um grupamento éster: cerca de 90% é hidrolisada no plasma, com meia-vida de cerca de 20 minutos.</p></div>${REFS}` },
  props: { t: 'Três propriedades explicam quase tudo', h: `
    <h4>pKa → latência</h4><p>Os anestésicos locais são bases fracas com pKa entre 7,6 e 9, acima do pH fisiológico. Quanto mais perto de 7,4, maior a fração não ionizada e mais rápido o início (lidocaína, pKa ~7,8–7,9, é rápida; bupivacaína, 8,1, é mais lenta). Exceção: a cloroprocaína tem pKa alto, mas é usada a 3%, e a quantidade compensa.</p>
    <h4>Lipossolubilidade → potência</h4><p>Mais lipossolúvel, mais fármaco na membrana e perto do canal: mais potência e mais toxicidade.</p>
    <h4>Ligação a proteínas → duração</h4><p>A ligação à α1-glicoproteína ácida acompanha a permanência no canal: bupivacaína ~95%, lidocaína ~65%.</p>
    <h4>Vasodilatação</h4><p>Quase todos os anestésicos locais são vasodilatadores (a cocaína é a exceção). Isso aumenta a absorção e encurta a ação, a razão para associar um vasoconstritor.</p>${REFS}` },
  mecanismo: { t: 'Como o anestésico bloqueia o canal', h: `
    <p>O sítio de ligação fica na face interna do poro do canal de sódio voltagem-dependente (NaV), principalmente no segmento S6 do domínio IV. Por isso a molécula precisa entrar na célula.</p>
    <p><b>Via hidrofóbica:</b> a base não ionizada atravessa a membrana e, no citoplasma, volta a se protonar; a forma ionizada é a que se liga com maior afinidade. <b>Via hidrofílica:</b> com o canal aberto, o cátion também alcança o sítio pelo próprio poro, vindo de dentro.</p>
    <p>Sem influxo de Na⁺, o potencial de ação não se propaga. Para interromper a condução numa fibra mielinizada é preciso bloquear cerca de três nodos de Ranvier consecutivos, e isso depende de volume suficiente.</p>
    <div class="trap"><h4>Correção frequente</h4><p>O canal tem <b>três estados funcionais</b>: repouso (fechado), aberto e inativado. “Fechado” e “repouso” não são estados diferentes.</p></div>${REFS}` },
  usodep: { t: 'Bloqueio dependente de uso', h: `
    <p>Hipótese do receptor modulado (Hille, 1977): o anestésico tem baixa afinidade pelo canal em repouso e alta pelos estados aberto e inativado. Ao se ligar, estabiliza o estado inativado e prolonga o período refratário.</p>
    <p>Resultado: bloqueio <b>fásico</b> ou dependente de uso. Fibras que disparam em alta frequência, como as nociceptivas durante a lesão, acumulam mais bloqueio.</p>
    <p>A mesma propriedade explica o uso da lidocaína como <b>antiarrítmico classe IB</b>: age mais em tecidos que despolarizam em frequência alta ou estão isquêmicos. A bupivacaína, ao contrário, entra rápido e sai devagar dos canais cardíacos (“fast-in, slow-out”), acumula bloqueio na frequência cardíaca e causa arritmias de difícil reversão.</p>
    <p class="note">O gráfico usa um modelo simplificado (ligação a cada estímulo e recuperação exponencial entre estímulos) apenas para mostrar a tendência.</p>${REFS}` },
  ph: { t: 'pH, pKa e ionização', h: `
    <h4>A equação</h4><p>Para uma base fraca: <b>pH = pKa + log [B]/[BH⁺]</b>. Quando pH = pKa, metade está em cada forma. Cada unidade de pH abaixo do pKa multiplica por 10 a razão a favor da forma ionizada.</p>
    <h4>Os números da aula</h4><p>Lidocaína, pKa 7,9: no pH 7,4 a fração não ionizada é 1/(1 + 10<sup>0,5</sup>) ≈ <b>24%</b>; no pH 6,4, 1/(1 + 10<sup>1,5</sup>) ≈ <b>3%</b>. Cerca de oito vezes menos base disponível para atravessar a membrana.</p>
    <h4>O pH do tecido inflamado varia</h4><p>Não existe um “pH inflamado” fixo. Em abscessos ele pode cair bastante, e mesmo quedas modestas reduzem muito a fração lipossolúvel. Os valores dos atalhos do simulador são ilustrativos.</p>
    <h4>Não é só o pH</h4><p>No tecido infectado, o edema dilui o anestésico, a hiperemia o remove mais depressa e os nociceptores sensibilizados expressam mais NaV1.8, relativamente resistente à lidocaína.</p>
    <h4>O que o simulador calcula</h4><p>As frações vêm da equação de Henderson-Hasselbalch. A figura é um retrato dos primeiros minutos: acompanha 30 moléculas injetadas, e a velocidade de entrada é proporcional à fração não ionizada do lado de fora (B). Fora, as moléculas que sobram se dividem em B e BH⁺ pelo pH do tecido; dentro, pelo pH do axônio. “Entraram no axônio” conta quantas das 30 já entraram. É um modelo didático: mostra a tendência, não tempos ou quantidades reais. A leitura clínica é qualitativa e serve para raciocinar, não para prever a resposta de um paciente.</p>
    <div class="trap"><h4>Conduta</h4><p>Não repita doses no mesmo foco. Prefira o bloqueio regional longe do foco (bloqueio digital na paroníquia; bloqueio do alveolar inferior em vez de infiltração local) e trate a infecção.</p></div>${REFS}` },
  fibras: { t: 'Bloqueio diferencial', h: `
    <p>Sequência clínica típica: autonômico (fibras B) → dor e temperatura (C e Aδ) → tato e pressão (Aβ) → propriocepção e motricidade (Aα). A recuperação ocorre, em geral, na ordem inversa.</p>
    <p><b>Nuance:</b> a regra do diâmetro é uma simplificação. Pesam também a mielinização (e a distância entre os nodos), a frequência de disparo (bloqueio dependente de uso) e o comprimento de nervo exposto. Em estudos experimentais, fibras Aδ finas mielinizadas estão entre as mais sensíveis.</p>
    <p><b>Aplicações:</b> hipotensão precoce na raquianestesia (bloqueio simpático); analgesia de parto com ropivacaína em baixa concentração, preservando a força motora.</p>
    <p class="note">As barras da tela mostram a ordem, não tempos reais: a latência depende do agente, da dose e da técnica.</p>${REFS}` },
  manto: { t: 'Manto e núcleo', h: `
    <p>A disposição das fibras no feixe explica a sequência <b>topográfica</b> do bloqueio: nos nervos mistos, as fibras do manto (periferia) inervam estruturas proximais e as do núcleo (centro), estruturas distais. Num bloqueio de plexo braquial, o ombro é anestesiado antes da mão, e o bloqueio motor proximal pode surgir antes da anestesia distal.</p>
    <div class="trap"><h4>Correção frequente</h4><p>A difusão da periferia para o centro <b>não</b> explica por que as fibras C são bloqueadas antes das A. Essa diferença vem das propriedades das fibras (tela 5, bloqueio diferencial).</p></div>
    <p>Barreiras à difusão: epineuro, perineuro (a principal) e endoneuro. Por isso volume e tempo de espera importam.</p>${REFS}` },
  agentes: { t: 'Escolha do agente', h: `
    <p>Doses máximas usuais para uma aplicação única em adultos (infiltração ou bloqueio periférico). As fontes divergem um pouco: use a bula do produto e ajuste ao paciente e ao local (áreas muito vascularizadas absorvem mais).</p>
    <p>Lidocaína sem adrenalina costuma ser citada como 4,5 mg/kg (máximo ~300 mg); com adrenalina, 7 mg/kg (máximo ~500 mg). Bupivacaína, 2,5 mg/kg (máximo 175 mg sem e 225 mg com adrenalina).</p>
    <p>A articaína é comercializada apenas com adrenalina. A benzocaína (pKa ~3,5) é quase totalmente não ionizada e pouco hidrossolúvel: uso exclusivamente tópico.</p>
    <p>Lipossolubilidade aparece em categorias (baixa, média, alta) porque os coeficientes de partição variam muito entre as fontes.</p>${REFS}` },
  dose: { t: 'A conta que previne a toxicidade', h: `
    <h4>Regra de bolso</h4><p>Concentração em % × 10 = mg/mL. Lidocaína 1% = 10 mg/mL; 2% = 20 mg/mL.</p>
    <h4>Exemplos</h4><p>Adulto de 70 kg, lidocaína sem adrenalina: 4,5 × 70 = 315 mg → teto prático 300 mg = 30 mL a 1% ou 15 mL a 2%. Com adrenalina: 7 × 70 = 490 mg ≈ 49 mL a 1%. Criança de 20 kg, sem adrenalina: 90 mg = 9 mL a 1%. Tubete odontológico de 1,8 mL a 2% = 36 mg.</p>
    <h4>Adrenalina</h4><p>1:100.000 = 10 µg/mL; 1:200.000 = 5 µg/mL.</p>
    <div class="trap"><h4>Some tudo</h4><p>Calcule antes de começar e some tudo o que for injetado, inclusive por outros profissionais. Em crianças, a margem é pequena.</p></div>
    <p class="note">A calculadora é didática: não substitui a bula nem protocolos institucionais.</p>${REFS}` },
  vaso: { t: 'Vasoconstritores', h: `
    <p>A adrenalina (1:200.000 a 1:100.000) reduz o pico plasmático do anestésico, prolonga a duração (efeito maior com lidocaína e mepivacaína do que com bupivacaína e ropivacaína), permite doses maiores e produz um campo com menos sangramento. O efeito vasoconstritor máximo pode levar cerca de 25 minutos.</p>
    <p>Alternativas: felipressina (odontologia, com prilocaína) e fenilefrina (em associações comerciais).</p>
    <p><b>Cuidados:</b> injeção intravascular (taquicardia, palpitações, hipertensão: a adrenalina funciona como “dose-teste”); cardiopatas (limitar a dose total; na odontologia, recomenda-se cerca de 40 µg, dois tubetes a 1:100.000); feocromocitoma; interação com cocaína.</p>
    <h4>Dedo, nariz, orelha, pênis</h4><p>Lalonde et al. (2005): estudo prospectivo multicêntrico com 3.110 casos de lidocaína com adrenalina em mãos e dedos, sem nenhuma necrose digital. É a base do WALANT (wide-awake local anesthesia no tourniquet). Cautela em doença vascular periférica grave, fenômeno de Raynaud importante e trauma com comprometimento vascular.</p>${REFS}` },
  last: { t: 'LAST: conduta', h: `
    <p>Local anesthetic systemic toxicity. A sequência clássica (sistema nervoso central antes do coração) nem sempre ocorre: apresentações só cardiovasculares ou tardias (> 5 min, até ~1 h, sobretudo com infusões contínuas) são comuns.</p>
    <p><b>Absorção por local</b> (maior → menor): intercostal > caudal > peridural > plexo braquial > subcutâneo. <b>Fatores de risco:</b> extremos de idade, baixa massa muscular, cardiopatia, hepatopatia, gestação, acidose, hipóxia.</p>
    <h4>Emulsão lipídica 20%</h4><p>Acima de 70 kg: bolus de ~100 mL em 2–3 min e ~250 mL em 15–20 min. Abaixo de 70 kg: bolus de 1,5 mL/kg em 2–3 min e 0,25 mL/kg/min. Se continuar instável, repetir o bolus 1 a 2 vezes e dobrar a infusão. Máximo ~12 mL/kg. Manter a infusão por pelo menos 10 min após a estabilidade.</p>
    <p>Convulsão: benzodiazepínico; propofol só em doses pequenas e com estabilidade hemodinâmica. Monitorar ≥ 2 h após convulsão e 4–6 h após instabilidade cardiovascular.</p>
    <p><b>Como o lipídio funciona:</b> sequestra o fármaco (“lipid sink”) e o redistribui para fígado e músculo, além de ter efeito cardiotônico direto e dar suporte metabólico ao miocárdio.</p>${REFS}` },
};
const GLOSS = [
  ['Base fraca', 'Substância que aceita um H⁺. Os anestésicos locais são bases fracas: existem como base (B) e como cátion (BH⁺).'],
  ['pKa', 'pH em que metade do fármaco está ionizada e metade não. Propriedade fixa de cada molécula.'],
  ['pH', 'Medida da acidez do meio. Tecido normal fica perto de 7,4; tecido inflamado ou infectado é mais ácido.'],
  ['Forma não ionizada (B)', 'Sem carga, lipossolúvel: atravessa membranas.'],
  ['Forma ionizada (BH⁺)', 'Com carga, hidrossolúvel: não atravessa a membrana, mas é a que se liga ao canal de sódio por dentro.'],
  ['Henderson-Hasselbalch', 'pH = pKa + log [B]/[BH⁺]. Relaciona pH, pKa e a proporção entre as formas.'],
  ['Canal NaV', 'Canal de sódio voltagem-dependente, responsável pela despolarização do potencial de ação. Alvo dos anestésicos locais.'],
  ['Latência', 'Tempo entre a aplicação e o início do bloqueio.'],
  ['Bloqueio dependente de uso', 'Quanto mais o canal abre, mais o fármaco se liga: fibras que disparam em alta frequência são mais bloqueadas.'],
  ['Nodo de Ranvier', 'Intervalo sem mielina no axônio, onde o potencial de ação se regenera. Bloquear ~3 nodos seguidos interrompe a condução.'],
  ['Bloqueio diferencial', 'Perda das funções nervosas numa ordem típica: autonômica, dor e temperatura, tato, motora.'],
  ['LAST', 'Toxicidade sistêmica por anestésico local: sinais neurológicos e cardiovasculares.'],
  ['WALANT', 'Wide-awake local anesthesia no tourniquet: cirurgia de mão com lidocaína e adrenalina, paciente acordado e sem garrote.'],
  ['Metemoglobinemia', 'Hemoglobina oxidada que não transporta oxigênio. Associada à prilocaína e à benzocaína.'],
];
function showGloss() { openSheet('Glossário', `<dl style="margin:0">${GLOSS.map(([t, d]) => `<dt style="font-weight:600;margin-top:12px">${t}</dt><dd style="margin:2px 0 0">${d}</dd>`).join('')}</dl>`); }
function showHow() {
  openSheet('Como usar', `<p>O FARMACO LAB reúne laboratórios interativos de farmacologia, uma aba por classe de fármacos. Este piloto traz a aba de <b>anestésicos locais</b>; farmacocinética, farmacodinâmica e outras classes vêm depois.</p>
    <h4>Telas</h4><ol>${SCREENS.map(s => `<li><button class="lnk" style="border:0;background:none;padding:0;font:inherit" data-go="${s.id}">${s.t}</button>: ${s.p}</li>`).join('')}</ol>
    <h4>Em aula</h4><ul><li>Projete a tela 4 e peça à turma que preveja o que acontece com a lidocaína no tecido infectado antes de arrastar o pH.</li><li>Na tela 6, compare lidocaína e bupivacaína no gráfico das três propriedades.</li><li>Na tela 7, calcule a dose máxima para os pacientes do caso clínico da aula.</li></ul>
    <p class="note">Ferramenta didática. Não substitui a bula, os protocolos institucionais nem o julgamento clínico.</p>`);
}
function showInstall() {
  const u = navigator.userAgent || ''; const plat = /iPhone|iPad|iPod/.test(u) || (/Macintosh/.test(u) && navigator.maxTouchPoints > 1) ? 'ios' : /Android/.test(u) ? 'android' : 'desktop';
  const ST = { ios: ['Abra esta página no <b>Safari</b>.', 'Toque em <b>Compartilhar</b> <kbd>⬆︎</kbd>.', 'Toque em <b>Adicionar à Tela de Início</b>.', 'Confirme o nome e toque em <b>Adicionar</b>.'],
    android: ['Abra esta página no <b>Chrome</b>.', 'Toque no menu <kbd>⋮</kbd>.', 'Toque em <b>Instalar app</b> ou <b>Adicionar à tela inicial</b>.', 'Confirme. O ícone aparece junto dos seus apps.'],
    desktop: ['<b>Chrome ou Edge:</b> use o ícone de instalar na barra de endereço, ou o menu <kbd>⋮</kbd> → <b>Transmitir, salvar e compartilhar</b> → <b>Instalar página como app</b>.', '<b>Safari (Mac):</b> menu <b>Arquivo</b> → <b>Adicionar ao Dock</b>.', '<b>Qualquer navegador:</b> salve nos favoritos com <kbd>Ctrl</kbd>+<kbd>D</kbd>.'] };
  const body = p => `<p>O FARMACO LAB pode ficar na tela inicial como um aplicativo e abrir em tela cheia.</p><div class="seg" id="iSeg">${[['ios', 'iPhone e iPad'], ['android', 'Android'], ['desktop', 'Computador']].map(([k, l]) => `<button data-v="${k}" class="${k === p ? 'on' : ''}">${l}</button>`).join('')}</div><ol style="margin-top:12px">${ST[p].map(s => `<li>${s}</li>`).join('')}</ol>`;
  openSheet('Instalar o FARMACO LAB', body(plat));
  const wire = () => { const s = $('iSeg'); if (s) s.onclick = e => { const b = e.target.closest('button'); if (b) { s.parentElement.innerHTML = body(b.dataset.v); wire(); } }; };
  wire();
}
