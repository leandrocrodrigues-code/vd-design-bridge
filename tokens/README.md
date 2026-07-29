# Tokens

Design tokens exportados do Figma, em JSON simples (formato `{ value, type }`,
compatível com o padrão usado por plugins como Tokens Studio / Figma Variables
export). Sem Style Dictionary por enquanto — os componentes importam esses
JSONs diretamente via [`tokens/index.ts`](./index.ts).

- `colors.json` — paleta de cores
- `spacing.json` — escala de espaçamento
- `typography.json` — família, tamanhos e pesos de fonte

## Sincronização com Figma Variables

**Caminho ativo:** [`figma-plugin-token-sync/`](../figma-plugin-token-sync/) —
plugin Figma privado que lê as Variables locais via Plugin API
(`figma.variables.getLocalVariablesAsync()`) dentro do próprio Figma e grava
os JSONs no repo via GitHub Contents API, sob demanda. Instruções completas
em [`figma-plugin-token-sync/README.md`](../figma-plugin-token-sync/README.md).

**Caminho anterior (inativo — não usar):**
[`scripts/sync-figma-tokens.js`](../scripts/sync-figma-tokens.js) +
[`.github/workflows/sync-tokens.yml`](../.github/workflows/sync-tokens.yml)
faziam a mesma conversão, mas lendo a REST API do Figma
(`GET /v1/files/:file_key/variables/local`) via polling a cada 15 min. Esse
endpoint exige plano Figma **Enterprise** — nossa conta é Organization, sem
acesso (erro 403 na prática). Os arquivos ficam no repo só como referência;
a lógica de conversão foi portada quase 1:1 para o plugin (mesma resolução
de alias, mesma classificação por tipo/unidade — só a fonte dos dados
mudou, de `fetch` pra `figma.variables.*`).

## Convenção de nomes das Variables no Figma

Vale para os dois caminhos acima: cada Variable/token deve se chamar
`<grupo>/<...resto>`, onde `<grupo>` é `color`, `spacing` ou `typography` —
isso decide em qual arquivo ela cai e vira a chave de topo. O resto do nome
vira o caminho aninhado (ex. `color/brand/primary`,
`typography/font-size/lg`). Fora dessa convenção, o token é ignorado com
aviso no log, não quebra a sincronização.

**Importante — regeneração é por arquivo inteiro, não por chave:** se
qualquer variable mapear para `typography/*`, o `typography.json` inteiro é
regenerado só com o que veio do Figma naquela rodada — não faz merge chave a
chave. Migre um grupo (`color`, `spacing` ou `typography`) por completo
antes de sincronizar, ou as chaves ainda não representadas como Variable são
descartadas. Um arquivo só é preservado intacto se **nenhuma** Variable
mapear pra ele naquela rodada.

Apenas o modo padrão (`defaultModeId`) de cada Variable Collection é usado —
suporte a múltiplos modos (ex. tema light/dark) fica para depois.
