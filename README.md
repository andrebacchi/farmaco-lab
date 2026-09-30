# FARMACO LAB

Laboratório interativo de farmacologia, uma aba por classe de fármacos. Piloto: **anestésicos locais**
(conceito, química, mecanismo, simulador de pKa/pH/ionização com Henderson-Hasselbalch ao vivo, fibras, agentes, dose e segurança).

**https://andrebacchi.github.io/farmaco-lab/** · parte do [BACCHI LAB](https://andrebacchi.github.io/bacchilab/)

## Como editar

O código fica em `src/` (`core.js` tem os dados dos agentes; uma tela por arquivo `s*.js`; textos do Saiba mais em `learn.js`).
Depois de editar: `sh build.sh` gera o `index.html`; aumente `VERSION` no `sw.js`.
`sh build.sh artifact` gera a versão para visualizar como artefato no Claude.

Ferramenta didática. Não substitui a bula, os protocolos institucionais nem o julgamento clínico.

© 2026 André Demambre Bacchi. Todos os direitos reservados.
