/* ===== montagem ===== */
const SCREENS_AL = [
  { id: 'conceito', t: 'Conceito', h: 'Bloquear a transmissão sem tocar na consciência', p: 'O que é um anestésico local e onde ele age no caminho da dor.', render: renderConceito },
  { id: 'quimica', t: 'Química', h: 'Três partes, duas famílias', p: 'A estrutura que decide o metabolismo, a potência e o comportamento no tecido.', render: renderQuimica },
  { id: 'mecanismo', t: 'Mecanismo', h: 'O alvo está do lado de dentro', p: 'Como o anestésico atravessa a membrana e bloqueia o canal de sódio.', render: renderMecanismo },
  { id: 'ph', t: 'pH e ionização', h: 'No tecido ácido, o anestésico fica preso do lado de fora', p: 'Simule pKa e pH e veja quanto do fármaco consegue chegar ao canal.', render: renderPH },
  { id: 'fibras', t: 'Fibras e bloqueio', h: 'Nem toda fibra é igual, e isso muda o bloqueio', p: 'A ordem em que as funções se perdem e voltam, e por que o ombro adormece antes da mão.', render: renderFibras },
  { id: 'agentes', t: 'Agentes', h: 'Os anestésicos locais da prática', p: 'Compare pKa, latência, duração e dose dos agentes mais usados.', render: renderAgentes },
  { id: 'dose', t: 'Dose e segurança', h: 'A conta que previne a toxicidade', p: 'Dose máxima por peso, vasoconstritores, LAST e emulsão lipídica.', render: renderDose },
];
const SCREENS_CO = [
  { id: 'ciclo', t: 'O ciclo', h: 'Um eixo que conversa por hormônios', p: 'Avance o dia do ciclo e acompanhe hipófise, ovário, endométrio e muco ao mesmo tempo.', render: renderCiclo },
  { id: 'receptor', t: 'Mecanismo', h: 'O alvo está no núcleo', p: 'Do sangue ao gene: como estrogênios e progestinas viajam, entram na célula, ligam-se ao receptor e mudam a transcrição.', render: renderReceptor },
  { id: 'pilula', t: 'Ação contraceptiva', h: 'A pílula silencia o eixo e fecha o colo', p: 'Escolha a formulação e veja quais barreiras ela ergue entre o espermatozoide e o óvulo.', render: renderPilula },
  { id: 'cartela', t: 'Cartela e esquecimento', h: 'O perigo mora ao lado da pausa', p: 'Toque nas pílulas para esquecê-las: veja o que acontece com o ovário e qual é a conduta.', render: renderCartela },
  { id: 'eficacia', t: 'Eficácia', h: 'Uso perfeito e uso real não são o mesmo método', p: 'Índice de Pearl, mil mulheres e o que acontece quando os anos passam.', render: renderEficacia },
  { id: 'trombose', t: 'Trombose em perspectiva', h: 'Risco relativo assusta, risco absoluto informa', p: 'Dez mil mulheres por um ano: quantas terão trombose com cada pílula, na gestação e no puerpério.', render: renderTrombose },
  { id: 'elegibilidade', t: 'Quem pode usar', h: 'A anamnese decide a categoria', p: 'Monte a paciente e veja a categoria da OMS para a pílula combinada e para a minipílula.', render: renderElegib },
  { id: 'emergencia', t: 'Emergência', h: 'A pílula do dia seguinte só funciona antes do pico de LH', p: 'Posicione a relação e a tomada no ciclo e veja quando o levonorgestrel ainda consegue agir.', render: renderEmergencia },
];
const LABS = [
  { id: 'al', n: 'Anestésicos locais', d: 'Mecanismo, pH e ionização, fibras, agentes e dose segura', screens: SCREENS_AL,
    foot: 'Ferramenta didática. Não substitui a bula, os protocolos institucionais nem o julgamento clínico. Doses: valores usuais para adultos; confira sempre a bula do produto.' },
  { id: 'co', n: 'Contraceptivos orais', d: 'Ciclo, receptor, ação contraceptiva, cartela, eficácia, trombose, elegibilidade e emergência', screens: SCREENS_CO,
    foot: 'Ferramenta didática. Os gráficos do ciclo e da cartela são modelos qualitativos; os números de risco e eficácia vêm das fontes citadas em cada Saiba mais. Não substitui a bula, os Critérios de Elegibilidade da OMS nem o julgamento clínico.' },
];
const SOON = [['Farmacocinética', 'Absorção, distribuição, metabolismo e eliminação'], ['Farmacodinâmica', 'Receptores, dose-resposta, potência e eficácia']];
$('blocks').onclick = e => { const b = e.target.closest('.blk[data-l]'); if (b && +b.dataset.l !== lab) goLab(+b.dataset.l); };
$('subs').onclick = e => { const b = e.target.closest('.sb'); if (b) show(+b.dataset.i, false); };
$('labFoot').onclick = e => { const b = e.target.closest('button[data-i]'); if (b) show(+b.dataset.i, true); };
$('glossBtn').onclick = showGloss;
$('howBtn').onclick = showHow;
addEventListener('hashchange', () => { const h = (location.hash || '').slice(1), f = findScreen(h === 'vaso' ? 'dose' : h); if (f && (f[0] !== lab || f[1] !== cur)) show(f[1], false, f[0]); });
let deferredPrompt = null;
addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; });
/* Janela em que o app está rodando: "navegador" (aba comum), "propria" (instalado, na janela dele) ou "outra"
   (aberto dentro de outro app instalado, como o BACCHI LAB). Neste último caso o Android também responde
   display-mode: standalone, e o botão Instalar sumia para quem ainda não tinha o app: a diferença é de onde a página veio. */
function janelaApp(k){
  if(!(matchMedia("(display-mode: standalone)").matches||navigator.standalone===true))return"navegador";
  let fora=false,marca=false;
  try{const r=document.referrer&&new URL(document.referrer);fora=!!r&&r.origin===location.origin&&!r.pathname.startsWith(new URL("./",location.href).pathname);}catch(e){}
  try{if(!document.referrer)localStorage.setItem(k,"1");if(!fora)sessionStorage.setItem(k,"1");marca=localStorage.getItem(k)==="1"||sessionStorage.getItem(k)==="1";}catch(e){}
  return !fora||marca?"propria":"outra";
}
/* Confirmação do próprio navegador, quando ele sabe responder (Chrome no Android, pelo related_applications do manifest). */
function appInstalado(k){
  if(!navigator.getInstalledRelatedApps)return Promise.resolve(false);
  return navigator.getInstalledRelatedApps().then(l=>{if(l.length){try{localStorage.setItem(k,"1");}catch(e){}}return l.length>0;}).catch(()=>false);
}
const JAN_K = 'farmaco-lab.instalado'; let janela = janelaApp(JAN_K);
$('instBtn').hidden = janela === 'propria';   // só some na janela do próprio app instalado
if (janela === 'outra') appInstalado(JAN_K).then(ok => { if (ok) { janela = 'propria'; $('instBtn').hidden = true; } });
addEventListener('appinstalled', () => { try { localStorage.setItem(JAN_K, '1'); } catch (e) {} $('instBtn').hidden = true; });
$('instBtn').onclick = async () => { if (deferredPrompt) { try { deferredPrompt.prompt(); const r = await deferredPrompt.userChoice; deferredPrompt = null; if (r && r.outcome === 'accepted') return; } catch {} } showInstall(); };
(() => {
  const h = (location.hash || '').slice(1), f = findScreen(h === 'vaso' ? 'dose' : h) || findScreen(store.get('tela', '')) || findScreen(window.FL_START || '') || [0, 0];   // FL_START: tela inicial opcional (usada em prévias)
  const first = !store.get('visto', false);
  show(f[1], false, f[0]);
  if (first) { $('welcome').hidden = false;
    const done = () => { $('welcome').hidden = true; store.set('visto', true); };
    $('wStart').onclick = () => { done(); go('ph'); };
    $('wPill').onclick = () => { done(); go('cartela'); };
    $('wClose').onclick = () => { done(); show(0, false); }; }
})();
