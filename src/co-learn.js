/* ===== Contraceptivos orais · Saiba mais, glossário e dicas de aula ===== */
const REFS_CO = '<p class="src">Referências: Brunton & Knollmann (eds), Goodman & Gilman’s The Pharmacological Basis of Therapeutics, 14ª ed., 2023 · Vanderah (ed), Katzung’s Basic & Clinical Pharmacology, 16ª ed., 2024 · OMS, Medical eligibility criteria for contraceptive use, 6ª ed., 2025 · CDC, U.S. Selected Practice Recommendations for Contraceptive Use, 2024 · FSRH, Progestogen-only Pills, 2022 · EMA, revisão dos contraceptivos hormonais combinados, 2014, e atualização do dienogeste, 2018 · Trussell et al., Contraceptive Technology, 21ª ed., 2018 · Milsom & Korver, J Fam Plann Reprod Health Care, 2008 · Rice et al., Hum Reprod, 1999 · Douxfils et al., Contraception, 2020 · Mantha et al., BMJ, 2012 · Wilcox et al., NEJM, 1995 · Brache et al., Contraception, 2013 · Noé et al., Contraception, 2011 · OMS, Task Force on Postovulatory Methods, Lancet, 1998.</p>';
Object.assign(LEARN, {
  co_ciclo: { t: 'O ciclo em dez passos', h: `
    <ol><li>No início da fase folicular, o gerador de pulsos do hipotálamo secreta GnRH.</li><li>A hipófise responde com liberação pulsátil de LH e FSH.</li><li>O FSH amadurece o folículo de Graaf, que secreta estradiol.</li><li>O estradiol age na hipófise e inibe LH e FSH (feedback negativo).</li><li>A elevação persistente do estradiol inverte o sinal (feedback positivo) e provoca o pico pré-ovulatório de LH e FSH.</li><li>O pico provoca a ruptura folicular: ovulação.</li><li>O folículo rompido vira corpo lúteo, que produz progesterona e algum estradiol.</li><li>Sem gestação, o corpo lúteo regride (luteólise).</li><li>Os esteroides caem e a menstruação ocorre.</li><li>O gerador de pulsos volta ao padrão inicial e o sistema recomeça.</li></ol>
    <h4>O que cada esteroide faz fora do eixo</h4>
    <p><b>Estrogênios:</b> maturação sexual e manutenção do trato reprodutivo; osso (menos reabsorção, por apoptose de osteoclastos); lipídios (HDL sobe, LDL cai, triglicerídeos sobem); coagulação (sobem os fatores II, VII, IX, X, XII e o fibrinogênio; caem a antitrombina e a proteína S).</p>
    <p><b>Progesterona e progestinas:</b> endométrio secretor, manutenção da gestação, muco cervical espesso, aumento da temperatura basal; podem competir com a aldosterona no túbulo renal e aumentar a insulina basal.</p>
    <div class="trap"><h4>Sobre o simulador</h4><p>As curvas são formas de livro-texto para um ciclo idealizado de 28 dias, em nível relativo (cada hormônio em proporção ao próprio pico). Ciclos reais variam em duração e em amplitude, sobretudo na fase folicular.</p></div>${REFS_CO}` },
  co_feedback: { t: 'Feedback negativo e feedback positivo', h: `
    <p>Durante quase todo o ciclo, estradiol e progesterona freiam o hipotálamo e a hipófise: é o <b>feedback negativo</b>. No fim da fase folicular, o estradiol alto e sustentado sensibiliza as células produtoras de LH à ação do GnRH, e o sinal se inverte: é o <b>feedback positivo</b>, que gera o pico de LH do meio do ciclo.</p>
    <p>O limiar clássico é estradiol acima de cerca de 200 pg/mL por cerca de 50 horas. Só um folículo dominante maduro sustenta esse nível, o que amarra a ovulação à maturidade do folículo.</p>
    <h4>O que a pílula faz com isso</h4><p>Estrogênio e progestina em dose constante mantêm o feedback negativo o mês inteiro. Sem folículo dominante não há estradiol endógeno alto, e a progestina impede a resposta da hipófise: o pico de LH não acontece.</p>
    <p class="note">O mapa da tela mostra o conceito de limiar; os valores exatos variam entre mulheres.</p>${REFS_CO}` },
  co_receptor: { t: 'Receptores de esteroides', h: `
    <h4>Via genômica (a principal)</h4>
    <p>O estradiol atravessa a membrana por difusão passiva e se liga a receptores intracelulares, <b>ERα</b> e <b>ERβ</b>. Sem ligante, o receptor existe como monômero, associado a proteínas de choque térmico. O agonista muda a conformação do receptor, o que solta as chaperonas, facilita a <b>dimerização</b> e permite a ligação aos <b>elementos de resposta ao estrogênio (ERE)</b> no DNA. Daí vêm a regulação da transcrição, o mRNA, as proteínas mediadoras e o efeito.</p>
    <p>As progestinas seguem o mesmo roteiro com os receptores <b>PR-A</b> e <b>PR-B</b>, que têm distribuição citoplasmática e nuclear: homodimerização e ligação aos <b>elementos de resposta à progesterona (PRE)</b>. O efeito varia conforme o tecido-alvo e a progestina.</p>
    <h4>Via não genômica (rápida)</h4>
    <p>Receptores de membrana (mERα, GPER1) ativam cascatas de sinalização (PKA, PKC, MAPK, PI3K) em segundos a minutos, o que explica efeitos vasculares agudos. As progestinas também modulam canais iônicos e sinalização intracelular por vias rápidas.</p>
    <h4>O anel A</h4>
    <p>O anel fenólico A é o aspecto estrutural mais importante para a ligação seletiva e de alta afinidade ao receptor de estrogênio: a maior parte das substituições nesse anel compromete a ligação.</p>
    <h4>Agonista, antagonista e modulador seletivo</h4>
    <p>Coativadores e correpressores variam de tecido para tecido. Por isso um mesmo ligante pode ser agonista num tecido e antagonista em outro: os <b>SERMs</b>, como o tamoxifeno e o raloxifeno, são agonistas no osso e antagonistas na mama. A <b>mifepristona</b> ocupa o receptor de progesterona e recruta correpressores.</p>
    <h4>Seletividade das progestinas</h4>
    <p>As derivadas da 19-nortestosterona conservam alguma atividade androgênica (maior no levonorgestrel, menor no desogestrel e no gestodeno). A drospirenona, derivada da espironolactona, é antiandrogênica e antimineralocorticoide, com leve efeito natriurético. O dienogeste tem alta seletividade pelo receptor de progesterona e ação antiandrogênica, por competição com o receptor androgênico.</p>
    <div class="trap"><h4>Sobre a figura</h4><p>É um esquema. O receptor de estrogênio sem ligante fica sobretudo no núcleo, e o de progesterona, no citoplasma e no núcleo; a figura desenha os dois no citoplasma para separar os passos.</p></div>${REFS_CO}` },
  co_transporte: { t: 'Do comprimido à célula: farmacocinética', h: `
    <h4>Ligação a proteínas</h4>
    <p>Estradiol: albumina (cerca de 60%) e SHBG (38%); fração livre de 2%. Progesterona: albumina (80%) e CBG (18%). As progestinas 19-nor ligam-se também à SHBG, o levonorgestrel com alta afinidade. O etinilestradiol liga-se quase só à albumina (98,5%) e a drospirenona, só à albumina, com 3 a 5% livre.</p>
    <p>A hipótese do hormônio livre diz que só a fração não ligada atravessa o capilar e entra na célula. A fração presa à albumina se solta com facilidade; a presa à SHBG funciona como reservatório.</p>
    <h4>A pílula mexe nas próprias proteínas de transporte</h4>
    <p>O etinilestradiol aumenta a síntese hepática de SHBG, CBG e TBG. O aumento de SHBG depende da pílula como um todo: é menor com progestinas androgênicas. Mais SHBG significa menos testosterona livre, e também dosagens de cortisol e T4 totais mais altas, sem doença.</p>
    <h4>Primeira passagem</h4>
    <p>O estradiol oral sofre metabolismo intenso no intestino e no fígado (estradiol → estrona e estriol → conjugados glicuronídeos e sulfatos). O grupo etinil do etinilestradiol protege a molécula e garante alta biodisponibilidade oral, ao preço de um efeito hepático forte. A progesterona natural é quase toda inativada na primeira passagem: a saída foi a micronização (200 a 400 mg) ou as progestinas sintéticas.</p>
    <h4>Circulação êntero-hepática</h4>
    <p>Os conjugados são excretados na bile, hidrolisados por bactérias intestinais e reabsorvidos. Apesar disso, antibióticos que não são indutores enzimáticos <b>não</b> reduzem a eficácia da pílula (OMS e CDC). A exceção são a rifampicina e a rifabutina, por indução do CYP3A4.</p>
    <h4>Meias-vidas</h4>
    <p>Etinilestradiol, cerca de 13 horas; valerato de estradiol, 14; estetrol, 28; dienogeste, 10; drospirenona, 30 a 35; nomegestrol, 46. As fontes variam conforme a fase considerada.</p>
    <p class="note">O simulador de SHBG usa um modelo de equilíbrio com proteínas não saturadas e mantém albumina e CBG fixas. Serve para mostrar a direção do efeito; não reproduz dosagens. Valores de ligação: Dunn, Nisula e Rodbard, 1981 (estradiol e testosterona, fase folicular); aula e bulas para os demais. Testosterona livre com a pílula: Zimmerman et al., Hum Reprod Update, 2014.</p>${REFS_CO}` },
  co_mec: { t: 'Como a pílula evita a gestação', h: `
    <h4>Os quatro mecanismos da pílula combinada</h4>
    <ol><li><b>Inibição do eixo hipotálamo-hipófise-ovário</b> (principal): supressão do GnRH pulsátil, queda de LH e FSH, sem desenvolvimento folicular, sem pico de LH, sem ovulação.</li><li><b>Muco cervical:</b> a progestina o torna espesso, viscoso e hostil aos espermatozoides.</li><li><b>Endométrio:</b> fica fino e inadequado para a implantação. Mecanismo secundário, porque a ovulação raramente ocorre.</li><li><b>Motilidade tubária:</b> menor transporte de espermatozoides e do óvulo.</li></ol>
    <p>Na minipílula tradicional a ovulação não é inibida de forma consistente: predominam os mecanismos 2, 3 e 4.</p>
    <h4>Estrogênios em uso</h4><p><b>Etinilestradiol</b> (15 a 35 µg): o mais usado e o mais potente; alta biodisponibilidade oral e forte estímulo à síntese hepática de proteínas. <b>Valerato de estradiol</b> e <b>17β-estradiol</b>: perfil mais próximo do fisiológico. <b>Estetrol (E4)</b>: produzido pelo fígado fetal, meia-vida de cerca de 28 horas e menor impacto hepático; aprovado com drospirenona em 2021 nos EUA e na União Europeia.</p>
    <h4>Progestinas por geração</h4><p>1ª: noretisterona (atividade androgênica moderada). 2ª: levonorgestrel (alta). 3ª: desogestrel, gestodeno, norgestimato (baixa). 4ª: drospirenona, dienogeste, nomegestrol (nula ou antiandrogênica).</p>
    <div class="trap"><h4>Monofásica, bifásica, trifásica</h4><p>Não há vantagem comprovada das formulações multifásicas sobre as monofásicas (Van Vliet et al., Cochrane, 2006). Doses de etinilestradiol acima de 35 µg não se justificam na contracepção de rotina.</p></div>
    <p class="note">Ovulações de escape: cerca de 2% dos ciclos com pílulas de 30 a 35 µg de etinilestradiol (Milsom e Korver, 2008); desogestrel 75 µg inibe a ovulação em cerca de 97% dos ciclos (Rice et al., 1999); noretisterona e levonorgestrel em dose baixa, em cerca de metade (CDC, 2024).</p>${REFS_CO}` },
  co_cartela: { t: 'Esquecimento da pílula combinada', h: `
    <h4>A regra usada no simulador (CDC, 2024)</h4>
    <ul><li><b>Atraso de menos de 24 horas</b> ou <b>uma pílula esquecida</b> (de 24 a menos de 48 horas): tomar assim que lembrar, seguir a cartela, sem proteção adicional.</li><li><b>Duas ou mais pílulas seguidas</b> (48 horas ou mais): tomar a mais recente, descartar as demais, seguir a cartela e usar preservativo ou abstinência até completar 7 pílulas ativas seguidas.</li><li><b>Se foi na última semana de ativas</b> (dias 15 a 21 de uma cartela de 21): emendar a cartela seguinte, sem pausa.</li><li><b>Se foi na primeira semana</b> e houve relação desprotegida nos 5 dias anteriores: considerar contracepção de emergência.</li></ul>
    <h4>Por que 7 e 7</h4><p>Sete dias sem hormônio é o máximo que o ovário tolera sem levar um folículo perto da ovulação; sete dias seguidos de pílula é o mínimo para suprimir de novo o eixo. O risco real se concentra nos esquecimentos que <b>esticam a pausa</b>: no começo e no fim da cartela. Os esquemas 24/4 encurtam o intervalo sem hormônio e, com isso, deixam mais margem.</p>
    <h4>Diferenças entre diretrizes e bulas</h4><p>A OMS (Selected practice recommendations, 3ª ed., 2016) separa por dose: com 30 a 35 µg de etinilestradiol, a conduta de proteção adicional começa com 3 pílulas esquecidas; com 20 µg ou menos, com 2. As bulas podem ser mais restritivas: para etinilestradiol 15 µg com gestodeno (24/4), a tolerância é de 12 horas. Formulações com valerato de estradiol e dienogeste têm conduta própria, conforme o dia da cartela.</p>
    <h4>Vômitos e diarreia</h4><p>Episódio isolado: seguir normalmente. Por 48 horas ou mais: tratar como pílulas esquecidas, com proteção até 7 pílulas seguidas depois de resolvido o quadro.</p>
    <div class="trap"><h4>Regra geral da aula</h4><p>Ausência de sangramento de privação depois de esquecimentos: descartar gestação.</p></div>
    <p class="note">O gráfico de “atividade folicular” é um modelo didático construído sobre a regra dos 7 dias. Não representa dosagens nem prevê a ovulação de uma paciente.</p>${REFS_CO}` },
  co_mini: { t: 'Pílulas só de progestina', h: `
    <h4>Quando indicar</h4><ul><li>Contraindicação ao estrogênio: trombose prévia, enxaqueca com aura, hipertensão, tabagismo aos 35 anos ou mais.</li><li>Amamentação: não interfere na produção de leite (OMS: categoria 2 antes de 6 semanas; categoria 1 depois).</li><li>Intolerância ao estrogênio: náuseas, cefaleia hormonal.</li></ul>
    <h4>Três pílulas, três janelas</h4><p><b>Noretisterona 0,35 mg:</b> janela de 3 horas; pílula esquecida pede 2 dias de proteção adicional. <b>Desogestrel 75 µg:</b> janela de 12 horas; 2 dias de proteção (FSRH), 7 dias segundo a bula. <b>Drospirenona 4 mg, 24/4:</b> janela de 24 horas; pílula esquecida pede 7 dias, como na combinada.</p>
    <p>O que explica a diferença é o mecanismo: a tradicional depende do muco; as outras duas também bloqueiam a ovulação. A drospirenona tem meia-vida de 30 a 35 horas.</p>
    <div class="trap"><h4>Sangramento</h4><p>Sem estrogênio para estabilizar o endométrio, o padrão de sangramento é imprevisível: escapes, ciclos irregulares ou amenorreia. É a principal causa de abandono e deve ser avisada antes.</p></div>${REFS_CO}` },
  co_eficacia: { t: 'Uso perfeito e uso real', h: `
    <p><b>Uso perfeito</b> (índice de Pearl teórico): o método usado exatamente como indicado. <b>Uso real</b> (ou típico): o que acontece na vida, com esquecimentos, atrasos e interrupções.</p>
    <p>Para a pílula, 0,3 contra 7 a 9 gestações por 100 mulheres no primeiro ano. Para implante, DIU e esterilização, os dois números praticamente coincidem.</p>
    <h4>O acumulado</h4><p>Se o risco anual é p, a proporção com ao menos uma falha em n anos é 1 − (1 − p)<sup>n</sup>. Com 7% ao ano, pouco mais da metade em 10 anos. Esse cálculo supõe risco constante, e por isso superestima: o risco cai com o tempo de uso, porque as mulheres mais férteis e as que usam pior o método falham primeiro.</p>
    <div class="trap"><h4>Saúde pública</h4><p>A maioria das gestações não planejadas decorre do não uso ou do uso inconsistente, não da falha do método (Frost et al., 2008).</p></div>
    <p class="note">Valores de primeiro ano: tabela da aula. Estimativas pontuais para os métodos com faixa: Trussell et al., 2018.</p>${REFS_CO}` },
  co_pearl: { t: 'Índice de Pearl', h: `
    <p>Proposto por Raymond Pearl em 1933: número de gestações não planejadas por 100 mulheres em um ano de uso.</p>
    <p><b>IP = gestações × 1.200 ÷ meses-mulher de exposição.</b> O 1.200 converte meses em 100 mulheres-ano. Quando a exposição é contada em ciclos, usa-se 1.300.</p>
    <h4>Limitações</h4><ul><li>Depende da duração do estudo: as falhas se concentram nos primeiros meses, e estudos longos produzem índices menores.</li><li>Depende da população: idade, fertilidade e frequência de relações.</li><li>Não distingue falha do método de falha do uso, a menos que os dois índices sejam relatados.</li></ul>
    <h4>Tábua de vida (life-table)</h4><p>Divide o acompanhamento em intervalos. Em cada um, a probabilidade de falha é o número de gestações dividido pelo número de mulheres em risco no intervalo. A probabilidade de chegar ao fim sem gestação é o produto das probabilidades de cada intervalo; a falha acumulada é o complemento.</p>
    <p>Quem abandona o método ou se perde no seguimento conta enquanto esteve em risco e depois sai do denominador: é a <b>censura</b>. O resultado é uma probabilidade referida a um tempo fixo (por exemplo, 12 meses), que não muda se o estudo durar mais.</p>
    <div class="trap"><h4>Três contas, três respostas</h4><p>Gestações divididas pelas mulheres que começaram subestima a falha, porque ignora o abandono. O Pearl corrige a exposição, mas mistura meses de risco alto e baixo e depende da duração. A tábua de vida corrige as duas coisas.</p></div>
    <p class="note">O comparador usa uma coorte simulada, com censura no fim de cada mês. Estudos reais usam o método atuarial ou o de Kaplan-Meier, com intervalos de confiança.</p>${REFS_CO}` },
  co_tev: { t: 'Trombose venosa: números e mecanismo', h: `
    <h4>Os números</h4><p>Não usuárias: cerca de 2 casos por 10.000 mulheres por ano. Combinadas com levonorgestrel, noretisterona ou norgestimato: 5 a 7. Com desogestrel, gestodeno ou drospirenona: 9 a 12 (EMA, 2014). Gestação: 5 a 20. Puerpério (12 semanas): 40 a 65. Minipílula: sem aumento demonstrado.</p>
    <p>O risco é maior no primeiro ano de uso e ao recomeçar depois de uma pausa de 4 semanas ou mais. É <b>reversível</b>: volta ao basal em 3 a 4 meses depois da suspensão.</p>
    <h4>Mecanismo</h4><p>O estrogênio aumenta a síntese hepática de fatores de coagulação (II, VII, X, XII, fibrinogênio), reduz a proteína S e a antitrombina e aumenta a resistência à proteína C ativada. A progestina modula esse efeito: as androgênicas o atenuam.</p>
    <h4>Antes de prescrever</h4><p>Rastrear obesidade, imobilização, trombofilia hereditária, tabagismo e história pessoal ou familiar de trombose. Não se pede pesquisa de trombofilia de rotina.</p>
    <h4>Eventos arteriais</h4><p>Infarto e AVC isquêmico têm risco absoluto muito baixo em jovens sem fatores de risco. O risco cresce com hipertensão, tabagismo e idade, e de forma sinérgica com o tabagismo. Enxaqueca com aura é contraindicação absoluta. Segundo a EMA, o risco arterial não difere entre as progestinas.</p>
    <div class="trap"><h4>Risco relativo e risco absoluto</h4><p>Um risco relativo de 3 sobre um basal de 2 em 10.000 significa 4 casos a mais em 10.000 mulheres por ano. O mesmo risco relativo sobre o basal de uma mulher com trombofilia significa muito mais. O risco relativo só informa quando vem junto do basal.</p></div>${REFS_CO}` },
  co_elegib: { t: 'Critérios de elegibilidade da OMS', h: `
    <p>A OMS classifica cada combinação de método e condição clínica em quatro categorias: <b>1</b>, sem restrição; <b>2</b>, benefício supera o risco; <b>3</b>, risco supera o benefício; <b>4</b>, risco inaceitável.</p>
    <h4>Condições da aula, para a pílula combinada</h4><ul><li>Tabagismo: menos de 35 anos, categoria 2; 35 anos ou mais, 3 (menos de 15 cigarros por dia) ou 4 (15 ou mais).</li><li>Hipertensão: controlada ou 140–159 / 90–99, categoria 3; 160 / 100 ou mais, categoria 4.</li><li>Trombofilia conhecida ou trombose prévia: categoria 4.</li><li>Diabetes sem doença vascular: categoria 2.</li><li>Enxaqueca sem aura, menos de 35 anos: 2 para iniciar. Com aura, em qualquer idade: 4.</li><li>Câncer de mama: atual, 4; sem doença há 5 anos ou mais, 3; só história familiar, 1.</li><li>Amamentação com menos de 6 semanas de pós-parto: 4.</li></ul>
    <h4>Interações</h4><p>Antibióticos que não são indutores enzimáticos <b>não</b> reduzem a eficácia (OMS e CDC). A exceção são a rifampicina e a rifabutina, por indução do CYP3A4.</p>
    <h4>O exame mínimo</h4><p>Anamnese dirigida e medida da pressão arterial. Exame ginecológico, citologia e exames laboratoriais não são pré-requisito para iniciar a pílula.</p>
    <div class="trap"><h4>Não existe a pílula certa para cada perfil</h4><p>Não há dados suficientes para indicar uma combinada específica por perfil clínico: a escolha é individual, pesando risco e benefício com a paciente.</p></div>
    <p class="note">Na 6ª edição (2025), a OMS revisou, entre outros temas, progestagênios na amamentação e interações com antirretrovirais. As categorias da pílula combinada para as condições desta tela não mudaram em relação à 5ª edição.</p>${REFS_CO}` },
  co_ae: { t: 'Contracepção de emergência', h: `
    <p>Evita a gestação depois de uma relação desprotegida: violência sexual, relação sem método, falha ou erro de uso de outro método.</p>
    <h4>Levonorgestrel 1,5 mg, dose única</h4><p>Mecanismo principal: impedir ou adiar a ovulação, quando tomado <b>antes</b> do início do pico de LH. O efeito sobre muco e espermatozoides tem evidência fraca. Depois da ovulação, é ineficaz.</p>
    <p>Gestações evitadas: cerca de 95% com a tomada em até 24 horas, 85% entre 25 e 48 horas, 58% entre 49 e 72 horas (OMS, 1998). Pode ser usado até 120 horas, com eficácia menor. Há poucas contraindicações, por ser de uso agudo. Os dados sugerem menor eficácia com IMC de 25 kg/m² ou mais.</p>
    <h4>Outras opções</h4><p><b>DIU de cobre</b>, inserido até 5 dias depois da relação: é o método de emergência mais eficaz e continua como contraceptivo. <b>Acetato de ulipristal 30 mg</b>: modulador do receptor de progesterona que ainda adia a ovulação com o LH em ascensão; não está disponível no Brasil.</p>
    <div class="trap"><h4>Uso recorrente</h4><p>Se o uso está se repetindo, é sinal de que falta um método regular adequado: é hora de rever a orientação e oferecer opções mais eficazes.</p></div>
    <p class="note">As fases da tela (tamanho do folículo, início e pico do LH) são aproximações para ensinar a lógica. Os percentuais vêm de estudos com ultrassom e dosagens seriadas, com dezenas de ciclos por grupo.</p>${REFS_CO}` },
  co_abort: { t: 'Por que a confusão?', h: `
    <p>A expressão “pílula do dia seguinte” e a pílula abortiva foram politizadas juntas, mas são fármacos com mecanismos opostos: um impede que a gestação ocorra, o outro interrompe uma gestação estabelecida.</p>
    <p>A <b>mifepristona</b> é um antagonista do receptor de progesterona: bloqueia a progesterona, desestabiliza o endométrio que sustenta a gestação e, com o misoprostol, interrompe a gestação (OMS, 2022). Não tem registro na Anvisa.</p>
    <p>O <b>levonorgestrel</b> é um agonista do mesmo receptor. Age antes da fecundação, adiando a ovulação. Não tem efeito sobre um embrião implantado.</p>
    <h4>A evidência</h4><p>Noé et al. (2011) acompanharam mulheres que usaram levonorgestrel de emergência, com a data da ovulação determinada por ultrassom e dosagens hormonais. Tomado antes da ovulação: nenhuma gestação, onde se esperavam 16. Tomado no dia da ovulação ou depois: 8 gestações, onde se esperavam 8,7.</p>
    <p>Cerca de metade dos embriões não se implanta naturalmente. Ainda assim, a pílula de emergência não parece interferir nesse processo. A queda da eficácia com o passar das horas é o que se espera de um método que evita a gravidez, e não de um que a interrompe.</p>${REFS_CO}` },
});
const GLOSS_CO = [
  ['Eixo hipotálamo-hipófise-ovário', 'Circuito hormonal que comanda o ciclo: GnRH do hipotálamo, LH e FSH da hipófise, estradiol e progesterona do ovário.'],
  ['FSH', 'Hormônio folículo-estimulante. Recruta e amadurece os folículos.'],
  ['LH', 'Hormônio luteinizante. Seu pico, no meio do ciclo, dispara a ovulação.'],
  ['Feedback negativo', 'Estradiol e progesterona freiam a hipófise. É o regime de quase todo o ciclo, e o que a pílula mantém.'],
  ['Feedback positivo', 'Estradiol alto e sustentado passa a estimular a hipófise e gera o pico de LH.'],
  ['Corpo lúteo', 'O folículo depois de rompido. Produz progesterona por cerca de 14 dias.'],
  ['Receptor nuclear', 'Receptor intracelular de esteroides. Com o hormônio ligado, dimeriza, liga-se ao DNA e regula a transcrição.'],
  ['Elemento de resposta', 'Sequência do DNA, na região promotora de um gene, reconhecida pelo dímero hormônio-receptor (ERE, PRE).'],
  ['CBG', 'Globulina ligadora de corticosteroides (transcortina). Transporta cortisol e progesterona.'],
  ['Progestina', 'Progestagênio sintético. Classificada em gerações conforme a origem e a atividade androgênica.'],
  ['Etinilestradiol', 'Estrogênio sintético mais usado nas pílulas. Potente e com forte efeito hepático.'],
  ['Estetrol (E4)', 'Estrogênio natural de origem fetal, com menor impacto hepático. Combinado à drospirenona desde 2021.'],
  ['Pílula combinada', 'Estrogênio + progestina. Também chamada de anticoncepcional oral combinado (AOC).'],
  ['Minipílula', 'Pílula só de progestina. A tradicional age sobretudo no muco; desogestrel e drospirenona também bloqueiam a ovulação.'],
  ['Sangramento de privação', 'Sangramento da pausa da pílula, por retirada do hormônio. Não é menstruação.'],
  ['Intervalo sem hormônio', 'Dias seguidos sem pílula ativa: a pausa, somada aos esquecimentos vizinhos. Não deve passar de 7.'],
  ['Índice de Pearl', 'Gestações por 100 mulheres em um ano de uso do método.'],
  ['Tábua de vida', 'Método que calcula a probabilidade acumulada de falha até um tempo fixo, intervalo por intervalo, descontando quem saiu do estudo.'],
  ['Uso perfeito e uso real', 'Eficácia do método usado exatamente como indicado e eficácia nas condições da vida real.'],
  ['TEV', 'Tromboembolismo venoso: trombose venosa profunda e embolia pulmonar.'],
  ['SHBG', 'Globulina ligadora de hormônios sexuais. Produzida pelo fígado; sobe com o estrogênio e serve de marcador da estrogenicidade da pílula.'],
  ['Risco relativo e risco absoluto', 'Quantas vezes o risco aumenta, e quantos casos a mais isso representa. O primeiro só informa junto do segundo.'],
  ['Categorias da OMS', '1, sem restrição; 2, benefício supera o risco; 3, risco supera o benefício; 4, risco inaceitável.'],
  ['Contracepção de emergência', 'Método usado depois da relação para evitar a gestação. Adia a ovulação; não interrompe gestação.'],
];
const TIPS_CO = [
  'Na tela 2, peça que a turma narre os seis passos antes de animar; depois troque para a mifepristona.',
  'Projete a tela 3 em “Sem método” e peça à turma que desenhe o que espera ver com a pílula combinada antes de trocar.',
  'Na tela 4, entregue uma situação de esquecimento a cada grupo: o grupo resolve na cartela e defende a conduta.',
  'Na tela 5, estique a duração do estudo no comparador e pergunte por que o índice de Pearl cai.',
  'Na tela 6, mostre primeiro a manchete com risco relativo e pergunte quem prescreveria; depois, a de risco absoluto.',
  'Na tela 7, ative “Esconder o resultado” e use os casos prontos como quiz.',
  'Cada tela termina com um roteiro de laboratório: quatro perguntas para responder mexendo no simulador.',
];
