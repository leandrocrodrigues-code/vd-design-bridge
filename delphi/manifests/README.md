# Manifestos de tela — Delphi

JSON estruturado por tela do Figma, pensado pra ser lido por qualquer
ferramenta/dev do lado Delphi sem precisar abrir o Figma: cada elemento com
nome, posição, tamanho, e o componente mais próximo já disponível no
catálogo (Delphi quando existe, POUi como referência quando ainda não tem
equivalente Delphi).

Gaps reais (componente sem equivalente em nenhum catálogo ainda) ficam
listados explicitamente no campo `gaps` — não são preenchidos com
aproximação silenciosa.

## Arquivos

- [`landing-page-demo-1.json`](./landing-page-demo-1.json) — tela
  "Landing page demo 1" (Figma node `20545:43164`), a mesma reconstruída
  em React/POUi em `Templates POUi/Dashboard Financeiro` e
  `Construtor de Template ao Vivo` no Storybook publicado.
