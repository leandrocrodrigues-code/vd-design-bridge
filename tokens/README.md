# Tokens

Design tokens exportados do Figma, em JSON simples (formato `{ value, type }`,
compatível com o padrão usado por plugins como Tokens Studio / Figma Variables
export). Sem Style Dictionary por enquanto — os componentes importam esses
JSONs diretamente via [`tokens/index.ts`](./index.ts).

- `colors.json` — paleta de cores
- `spacing.json` — escala de espaçamento
- `typography.json` — família, tamanhos e pesos de fonte

## Sincronização automática com Figma Variables

[`scripts/sync-figma-tokens.js`](../scripts/sync-figma-tokens.js) lê as
Variables nativas do Figma (`GET /v1/files/:file_key/variables/local`) e
regenera estes JSONs. Roda via polling a cada 15 min
([`.github/workflows/sync-tokens.yml`](../.github/workflows/sync-tokens.yml)),
ou manualmente:

```bash
FIGMA_ACCESS_TOKEN=... FIGMA_FILE_KEY=... npm run sync-tokens
```

**Convenção de nomes no Figma:** cada variable deve se chamar
`<grupo>/<...resto>`, onde `<grupo>` é `color`, `spacing` ou `typography` —
isso decide em qual arquivo ela cai e vira a chave de topo. O resto do nome
vira o caminho aninhado (ex. `color/brand/primary`,
`typography/font-size/lg`). Variables fora dessa convenção são ignoradas com
aviso no log, não quebram o sync.

**Importante — regeneração é por arquivo inteiro, não por chave:** se
qualquer variable mapear para `typography/*`, o `typography.json` inteiro é
regenerado só com o que veio do Figma naquela rodada. Durante uma migração
parcial (ex. você já criou `typography/font-weight/*` no Figma mas ainda não
`typography/font-size/*`), rodar o sync vai **descartar** as chaves que ainda
não existem como variable — não faz merge chave a chave. Migre um grupo
(`color`, `spacing` ou `typography`) por completo antes de deixar o cron
rodar sobre ele. Um arquivo só é preservado intacto se **nenhuma** variable
mapear pra ele naquela rodada (ex. você só populou `color/*` — `spacing.json`
e `typography.json` ficam como estão).

Apenas o modo padrão (`defaultModeId`) de cada Variable Collection é usado —
suporte a múltiplos modos (ex. tema light/dark) fica para depois.

## Secrets necessários (GitHub Actions)

O workflow de sync lê `FIGMA_ACCESS_TOKEN` e `FIGMA_FILE_KEY` de GitHub
Secrets do repositório — configure com:

```bash
gh secret set FIGMA_ACCESS_TOKEN --repo leandrocrodrigues-code/vd-design-bridge
gh secret set FIGMA_FILE_KEY --repo leandrocrodrigues-code/vd-design-bridge
```

O personal access token do Figma precisa de escopo de leitura de
file content / variables. A API de Variables historicamente exige que o
arquivo esteja em um plano Figma Organization/Enterprise — confirme se o seu
plano dá acesso a esse endpoint antes de depender do sync.
