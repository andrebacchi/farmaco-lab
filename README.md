# FARMACO LAB

Laboratório interativo de farmacologia, uma aba por classe de fármacos.

- **Anestésicos locais:** conceito, química, mecanismo, simulador de pKa/pH/ionização com Henderson-Hasselbalch ao vivo, fibras, agentes, dose e segurança.
- **Contraceptivos orais:** ciclo menstrual e eixo ao vivo, mecanismo molecular (transporte, receptor, DNA e transcrição), ação contraceptiva por formulação, cartela com esquecimento de pílulas, eficácia (uso perfeito × uso real, índice de Pearl × tábua de vida), trombose em risco absoluto, elegibilidade da OMS e contracepção de emergência.

**https://andrebacchi.github.io/farmaco-lab/** · parte do [BACCHI LAB](https://andrebacchi.github.io/bacchilab/)

## Como editar

O código fica em `src/`. `core.js` tem a navegação e os dados dos anestésicos; `main.js` lista as classes (`LABS`) e as telas de cada uma.
Anestésicos locais: uma tela por arquivo `s*.js`, textos do Saiba mais em `learn.js`.
Contraceptivos orais: `co-core.js` (modelo do ciclo e figura ao vivo), `co-s1.js` a `co-s5.js` (telas), `co-learn.js` (Saiba mais, glossário) e `co.css`.
Para criar outra classe, acrescente um item em `LABS` com suas telas e inclua os novos arquivos no `build.sh`.
Depois de editar: `sh build.sh` gera o `index.html`; aumente `VERSION` no `sw.js`.
`sh build.sh artifact` gera a versão para visualizar como artefato no Claude.

Ferramenta didática. Não substitui a bula, os protocolos institucionais nem o julgamento clínico.

© 2026 André Demambre Bacchi. Todos os direitos reservados.
