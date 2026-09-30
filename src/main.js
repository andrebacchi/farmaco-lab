/* ===== montagem ===== */
const SCREENS = [
  { id: 'conceito', t: 'Conceito', h: 'Bloquear a transmissão sem tocar na consciência', p: 'O que é um anestésico local e onde ele age no caminho da dor.', render: renderConceito },
  { id: 'quimica', t: 'Química', h: 'Três partes, duas famílias', p: 'A estrutura que decide o metabolismo, a potência e o comportamento no tecido.', render: renderQuimica },
  { id: 'mecanismo', t: 'Mecanismo', h: 'O alvo está do lado de dentro', p: 'Como o anestésico atravessa a membrana e bloqueia o canal de sódio.', render: renderMecanismo },
  { id: 'ph', t: 'pH e ionização', h: 'No tecido ácido, o anestésico fica preso do lado de fora', p: 'Simule pKa e pH e veja quanto do fármaco consegue chegar ao canal.', render: renderPH },
  { id: 'fibras', t: 'Fibras e bloqueio', h: 'Nem toda fibra é igual, e isso muda o bloqueio', p: 'A ordem em que as funções se perdem e voltam, e por que o ombro adormece antes da mão.', render: renderFibras },
  { id: 'agentes', t: 'Agentes', h: 'Os anestésicos locais da prática', p: 'Compare pKa, latência, duração e dose dos agentes mais usados.', render: renderAgentes },
  { id: 'dose', t: 'Dose e segurança', h: 'A conta que previne a toxicidade', p: 'Dose máxima por peso, vasoconstritores, LAST e emulsão lipídica.', render: renderDose },
];
$('subs').onclick = e => { const b = e.target.closest('.sb'); if (b) show(+b.dataset.i, false); };
$('labFoot').onclick = e => { const b = e.target.closest('button[data-i]'); if (b) show(+b.dataset.i, true); };
$('glossBtn').onclick = showGloss;
$('howBtn').onclick = showHow;
let deferredPrompt = null;
addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; });
if (matchMedia('(display-mode: standalone)').matches || navigator.standalone) $('instBtn').hidden = true;
$('instBtn').onclick = async () => { if (deferredPrompt) { try { deferredPrompt.prompt(); const r = await deferredPrompt.userChoice; deferredPrompt = null; if (r && r.outcome === 'accepted') return; } catch {} } showInstall(); };
(() => {
  const h = (location.hash || '').slice(1), hi = SCREENS.findIndex(s => s.id === (h === 'vaso' ? 'dose' : h));
  const si = SCREENS.findIndex(s => s.id === store.get('tela', ''));
  const first = !store.get('visto', false);
  show(hi >= 0 ? hi : si >= 0 ? si : 0, false);
  if (first) { $('welcome').hidden = false;
    const done = () => { $('welcome').hidden = true; store.set('visto', true); };
    $('wStart').onclick = () => { done(); go('ph'); };
    $('wClose').onclick = () => { done(); go('conceito'); }; }
})();
