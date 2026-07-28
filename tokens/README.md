# Tokens

Design tokens exportados do Figma, em JSON simples (formato `{ value, type }`,
compatível com o padrão usado por plugins como Tokens Studio / Figma Variables
export). Sem Style Dictionary por enquanto — os componentes importam esses
JSONs diretamente via [`tokens/index.ts`](./index.ts).

- `colors.json` — paleta de cores
- `spacing.json` — escala de espaçamento
- `typography.json` — família, tamanhos e pesos de fonte

## Próximo passo (não implementado ainda)

Esses arquivos serão substituídos automaticamente por um webhook que recebe o
export de tokens do Figma e sobrescreve os JSONs desta pasta. A estrutura de
chaves deve se manter estável para os componentes continuarem funcionando —
o webhook deve apenas atualizar os `value`, não renomear chaves sem avisar
quem consome (`components/*`).
