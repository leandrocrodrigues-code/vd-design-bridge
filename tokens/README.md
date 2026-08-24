# Tokens

Design tokens exportados do Figma, em JSON simples (formato `{ value, type }`,
compatível com o padrão usado por plugins como Tokens Studio / Figma Variables
export). Sem Style Dictionary por enquanto — os componentes importam esses
JSONs diretamente via [`tokens/index.ts`](./index.ts).

- `colors.json` — paleta de cores
- `spacing.json` — escala de espaçamento
- `typography.json` — família, tamanhos e pesos de fonte
- `radius.json` — border radius (ainda vazio, aguardando sync)
- `sizing.json` — larguras e alturas fixas (ainda vazio, aguardando sync)

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

Cada Variable deve se chamar `<Grupo>/<...resto>`, onde `<Grupo>` é o nome
do grupo de topo usado no arquivo Figma da TOTVS (**case-insensitive**:
"Colors", "colors" e "COLORS" caem no mesmo lugar). O resto do nome vira o
caminho aninhado dentro do arquivo de destino. Mapeamento completo:

| Grupo no Figma       | Arquivo               | Bucket        |
| --------------------- | ---------------------- | ------------- |
| `Colors/*`            | `tokens/colors.json`   | `color`       |
| `Font/*`               | `tokens/typography.json` | `typography` |
| `Spacing/*`            | `tokens/spacing.json`  | `spacing`     |
| `Corner radius/*`     | `tokens/radius.json`   | `radius`      |
| `Widths/*` e `Heights/*` | `tokens/sizing.json` | `sizing`      |

`Widths/*` e `Heights/*` caem **juntos** em `sizing.json`, mas mantêm o
nome do grupo original como primeiro nível dentro do arquivo pra não
colidir (ex. `Widths/button/sm` → `sizing.json` →
`{ sizing: { widths: { button: { sm: {...} } } } }`, e `Heights/icon/lg` →
`{ sizing: { heights: { icon: { lg: {...} } } } }`).

Para os outros grupos, o nome do grupo é descartado do caminho de saída
(ele já virou a chave de topo do arquivo): `Colors/brand/primary` →
`colors.json` → `{ color: { brand: { primary: {...} } } }`.

Variable fora dessa convenção (grupo desconhecido, ou nome sem pelo menos
`Grupo/token`) é ignorada com aviso no log da UI do plugin — não quebra a
sincronização dos demais tokens.

**Importante — regeneração é por arquivo inteiro, não por chave:** se
qualquer Variable mapear pra um bucket, o arquivo correspondente é
regenerado inteiro só com o que veio do Figma naquela rodada — não faz
merge chave a chave. Migre um grupo (Colors, Font, Spacing, Corner radius,
ou Widths/Heights juntos) por completo antes de sincronizar, ou as chaves
ainda não representadas como Variable são descartadas. Um arquivo só é
preservado intacto se **nenhuma** Variable mapear pra ele naquela rodada.

Apenas o modo padrão (`defaultModeId`) de cada Variable Collection é usado —
suporte a múltiplos modos (ex. tema light/dark) fica para depois.

## Tema dark — solução temporária

**Pendência aberta:** estender o `figma-plugin-token-sync` para ler múltiplos
Modes das Variable Collections do Figma (hoje só o `defaultModeId`, como
descrito acima). Enquanto isso não acontece, `colors.json` carrega **apenas a
paleta light**.

Solução no lugar: [`colors.dark.override.json`](./colors.dark.override.json),
mantido **à mão** e fora do alcance do plugin — ele só regenera `colors.json`,
`typography.json`, `spacing.json`, `radius.json` e `sizing.json`. O merge é
recursivo e acontece em [`index.ts`](./index.ts) (`darkColors`), então o dark
só sobrepõe as chaves que declara; o que ele não cita (o grupo `chart`, por
exemplo) cai no valor light.

Consumo: `colorCssVars('light' | 'dark')` achata a árvore em custom properties
`--vd-color-*`, aplicadas pelo decorator global do Storybook
([`.storybook/preview.tsx`](../.storybook/preview.tsx)). Componente novo lê
`var(--vd-color-...)` no seu `.tokens.css` e acompanha o toggle de graça — não
importar `tokens.color.*` direto em JS, que é o que trava o tema.

Quando o plugin passar a ler os dois Modes, este arquivo deixa de ser
necessário e `colors.json` volta a ser fonte única.
