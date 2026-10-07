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
/* QR code do app (padrão do BACCHI LAB). O desenho é fixo: aponta para o endereço do app no ar.
   Foi gerado com o qrcode.js do repositório bacchilab (nível M); se o endereço mudar, gere de novo. */
const QR_URL="https://andrebacchi.github.io/farmaco-lab/",QR_SVG="<svg viewBox=\"0 0 33 33\" shape-rendering=\"crispEdges\" role=\"img\" aria-label=\"QR code para andrebacchi.github.io/farmaco-lab\"><rect width=\"33\" height=\"33\" fill=\"#fff\"/><path d=\"M2 2h7v1h-7zM10 2h2v1h-2zM14 2h2v1h-2zM18 2h1v1h-1zM21 2h2v1h-2zM24 2h7v1h-7zM2 3h1v1h-1zM8 3h1v1h-1zM10 3h1v1h-1zM13 3h1v1h-1zM15 3h1v1h-1zM18 3h3v1h-3zM24 3h1v1h-1zM30 3h1v1h-1zM2 4h1v1h-1zM4 4h3v1h-3zM8 4h1v1h-1zM11 4h1v1h-1zM13 4h1v1h-1zM15 4h4v1h-4zM21 4h1v1h-1zM24 4h1v1h-1zM26 4h3v1h-3zM30 4h1v1h-1zM2 5h1v1h-1zM4 5h3v1h-3zM8 5h1v1h-1zM10 5h1v1h-1zM12 5h1v1h-1zM14 5h2v1h-2zM17 5h1v1h-1zM19 5h1v1h-1zM21 5h1v1h-1zM24 5h1v1h-1zM26 5h3v1h-3zM30 5h1v1h-1zM2 6h1v1h-1zM4 6h3v1h-3zM8 6h1v1h-1zM11 6h1v1h-1zM15 6h4v1h-4zM21 6h1v1h-1zM24 6h1v1h-1zM26 6h3v1h-3zM30 6h1v1h-1zM2 7h1v1h-1zM8 7h1v1h-1zM11 7h6v1h-6zM21 7h2v1h-2zM24 7h1v1h-1zM30 7h1v1h-1zM2 8h7v1h-7zM10 8h1v1h-1zM12 8h1v1h-1zM14 8h1v1h-1zM16 8h1v1h-1zM18 8h1v1h-1zM20 8h1v1h-1zM22 8h1v1h-1zM24 8h7v1h-7zM10 9h2v1h-2zM13 9h2v1h-2zM19 9h1v1h-1zM21 9h1v1h-1zM2 10h1v1h-1zM4 10h2v1h-2zM7 10h3v1h-3zM14 10h1v1h-1zM16 10h1v1h-1zM18 10h4v1h-4zM24 10h1v1h-1zM27 10h1v1h-1zM29 10h2v1h-2zM3 11h1v1h-1zM5 11h1v1h-1zM7 11h1v1h-1zM10 11h2v1h-2zM15 11h1v1h-1zM18 11h1v1h-1zM21 11h6v1h-6zM30 11h1v1h-1zM3 12h1v1h-1zM5 12h1v1h-1zM8 12h1v1h-1zM10 12h2v1h-2zM13 12h2v1h-2zM18 12h3v1h-3zM22 12h2v1h-2zM25 12h2v1h-2zM28 12h2v1h-2zM4 13h2v1h-2zM7 13h1v1h-1zM11 13h1v1h-1zM13 13h3v1h-3zM20 13h1v1h-1zM22 13h3v1h-3zM30 13h1v1h-1zM2 14h3v1h-3zM8 14h9v1h-9zM19 14h1v1h-1zM21 14h1v1h-1zM25 14h1v1h-1zM27 14h2v1h-2zM5 15h3v1h-3zM10 15h1v1h-1zM12 15h3v1h-3zM16 15h4v1h-4zM21 15h2v1h-2zM24 15h1v1h-1zM28 15h3v1h-3zM4 16h1v1h-1zM8 16h4v1h-4zM15 16h1v1h-1zM18 16h2v1h-2zM21 16h2v1h-2zM24 16h1v1h-1zM28 16h3v1h-3zM2 17h2v1h-2zM5 17h1v1h-1zM16 17h1v1h-1zM20 17h1v1h-1zM23 17h4v1h-4zM29 17h1v1h-1zM4 18h2v1h-2zM7 18h2v1h-2zM10 18h2v1h-2zM14 18h2v1h-2zM18 18h1v1h-1zM21 18h3v1h-3zM25 18h3v1h-3zM29 18h1v1h-1zM4 19h1v1h-1zM6 19h1v1h-1zM12 19h1v1h-1zM15 19h1v1h-1zM17 19h1v1h-1zM19 19h1v1h-1zM22 19h1v1h-1zM25 19h1v1h-1zM27 19h3v1h-3zM2 20h1v1h-1zM4 20h5v1h-5zM10 20h1v1h-1zM13 20h3v1h-3zM17 20h3v1h-3zM23 20h1v1h-1zM28 20h1v1h-1zM5 21h2v1h-2zM9 21h1v1h-1zM11 21h4v1h-4zM16 21h1v1h-1zM19 21h1v1h-1zM22 21h2v1h-2zM26 21h1v1h-1zM28 21h1v1h-1zM3 22h2v1h-2zM7 22h5v1h-5zM13 22h1v1h-1zM18 22h3v1h-3zM22 22h7v1h-7zM10 23h4v1h-4zM15 23h1v1h-1zM18 23h3v1h-3zM22 23h1v1h-1zM26 23h5v1h-5zM2 24h7v1h-7zM10 24h1v1h-1zM14 24h2v1h-2zM19 24h1v1h-1zM21 24h2v1h-2zM24 24h1v1h-1zM26 24h2v1h-2zM29 24h1v1h-1zM2 25h1v1h-1zM8 25h1v1h-1zM10 25h1v1h-1zM12 25h6v1h-6zM20 25h1v1h-1zM22 25h1v1h-1zM26 25h2v1h-2zM2 26h1v1h-1zM4 26h3v1h-3zM8 26h1v1h-1zM12 26h1v1h-1zM14 26h1v1h-1zM17 26h1v1h-1zM19 26h1v1h-1zM22 26h5v1h-5zM28 26h3v1h-3zM2 27h1v1h-1zM4 27h3v1h-3zM8 27h1v1h-1zM10 27h1v1h-1zM13 27h6v1h-6zM21 27h1v1h-1zM23 27h1v1h-1zM25 27h3v1h-3zM30 27h1v1h-1zM2 28h1v1h-1zM4 28h3v1h-3zM8 28h1v1h-1zM10 28h5v1h-5zM19 28h3v1h-3zM25 28h1v1h-1zM28 28h1v1h-1zM30 28h1v1h-1zM2 29h1v1h-1zM8 29h1v1h-1zM12 29h4v1h-4zM18 29h1v1h-1zM22 29h2v1h-2zM25 29h3v1h-3zM29 29h1v1h-1zM2 30h7v1h-7zM10 30h1v1h-1zM12 30h2v1h-2zM15 30h3v1h-3zM21 30h5v1h-5zM29 30h1v1h-1z\" fill=\"#161a22\"/></svg>";
function showQR(){
  openSheet("QR code do FARMACO LAB",`<div class="qr-wrap"><p>Aponte a câmera do celular para o código.</p><div class="qr-box">${QR_SVG}</div><p class="qr-url" id="qrUrl">andrebacchi.github.io/farmaco-lab</p><div class="qr-acts"><button class="btn primary" id="qrCopy">Copiar link</button>${navigator.share?'<button class="btn" id="qrShare">Compartilhar</button>':''}</div><p class="qr-nota">QR Code é marca registrada da DENSO WAVE INCORPORATED.</p></div>`);
  const g=id=>document.getElementById(id);
  g("qrCopy").onclick=async e=>{const b=e.currentTarget;
    try{await navigator.clipboard.writeText(QR_URL);b.textContent="Link copiado";}
    catch(_){const r=document.createRange();r.selectNodeContents(g("qrUrl"));const s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent="Selecionado: copie";}
    setTimeout(()=>{if(b.isConnected)b.textContent="Copiar link";},2200);};
  if(g("qrShare"))g("qrShare").onclick=()=>navigator.share({title:"FARMACO LAB",url:QR_URL}).catch(()=>{});
}
document.getElementById("qrBtn").onclick=showQR;
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
