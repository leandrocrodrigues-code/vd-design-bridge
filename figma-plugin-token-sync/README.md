# VD Token Sync (plugin Figma privado)

Plugin interno (TOTVS/V&D), não publicado na comunidade Figma. Lê as
**Variables locais** do arquivo Figma via Plugin API, converte pro mesmo
formato que `/tokens/*.json` já usa no repo, e grava direto no GitHub via
**Contents API** — sem passar por polling, webhook ou plugin de terceiros.

Reaproveita a mesma lógica de conversão de
[`scripts/sync-figma-tokens.js`](../scripts/sync-figma-tokens.js) (que lia a
REST API do Figma); aqui a fonte dos dados é `figma.variables.getLocalVariablesAsync()`
em vez de um `fetch` — a forma de resolver aliases, classificar tipo/unidade
e montar os JSONs é a mesma.

## Convenção de nomes das Variables no Figma

Cada Variable deve se chamar `<Grupo>/<...resto>`, onde `<Grupo>` é o nome
do grupo de topo usado no arquivo Figma da TOTVS (**case-insensitive**).
Mapeamento pro arquivo de destino:

| Grupo no Figma           | Arquivo                  |
| ------------------------- | ------------------------- |
| `Colors/*`                | `tokens/colors.json`      |
| `Font/*`                   | `tokens/typography.json`  |
| `Spacing/*`                | `tokens/spacing.json`     |
| `Corner radius/*`         | `tokens/radius.json`      |
| `Widths/*` e `Heights/*`  | `tokens/sizing.json` (os dois juntos) |

Detalhes de como o caminho aninhado é montado (inclusive o caso especial de
`Widths`/`Heights` dividindo o mesmo arquivo) estão em
[`../tokens/README.md`](../tokens/README.md). Variables fora dessa
convenção são ignoradas (aparecem no log da UI como "Ignorado: ..."), não
quebram a sincronização. Aliases entre variables são resolvidos
automaticamente. Só o modo padrão de cada Variable Collection é usado (sem
suporte a light/dark ainda).

Cada arquivo de destino só é sobrescrito se pelo menos uma Variable mapear
pra ele nesta sincronização, e mesmo assim só grava se o conteúdo realmente
mudou (evita commits vazios).

## 1. Build local

```bash
cd figma-plugin-token-sync
npm install
npm run build       # compila code.ts -> dist/code.js (esbuild) e copia ui.html -> dist/ui.html
npm run typecheck   # opcional, só checagem de tipos
```

`dist/` é gerada (git-ignorada) — precisa existir antes de importar o
plugin no Figma, já que `manifest.json` aponta `main`/`ui` pra lá
(`dist/code.js`, `dist/ui.html`). Durante desenvolvimento, `npm run watch`
recompila a cada mudança em `code.ts` (se editar `ui.html`, rode `npm run
build` de novo pra copiar a versão nova pra `dist/`).

## 2. Instalar localmente no Figma

1. Abra o **Figma Desktop app** (plugins de desenvolvimento não rodam no
   Figma web).
2. Menu **Plugins → Development → Import plugin from manifest…**
3. Selecione `figma-plugin-token-sync/manifest.json` deste repo.
4. O plugin "VD Token Sync" aparece em **Plugins → Development**.

Se o Figma pedir pra gerar um novo `id` de plugin ao importar, deixe — o
`id` no `manifest.json` é só um placeholder de desenvolvimento local.

## 3. Gerar o GitHub Personal Access Token

O plugin precisa de um PAT com permissão de leitura/escrita em
`tokens/*.json` no repo `leandrocrodrigues-code/vd-design-bridge`. Duas
opções:

**Fine-grained (recomendado — escopo mínimo):**
1. https://github.com/settings/personal-access-tokens/new
2. Resource owner: `leandrocrodrigues-code`
3. Repository access: **Only select repositories** → `vd-design-bridge`
4. Permissions → Repository permissions → **Contents: Read and write**
5. Gerar e copiar o token (só aparece uma vez)

**Classic (mais simples, escopo mais largo):**
1. https://github.com/settings/tokens/new
2. Escopo: **`repo`**
3. Gerar e copiar o token

O token nunca é commitado nem sai do Figma: fica salvo só localmente via
`figma.clientStorage` (por arquivo Figma, neste computador).

## 4. Usar

1. Abra o plugin dentro do arquivo Figma **"MCP Design System V&D"**
   (Plugins → Development → VD Token Sync).
2. Na primeira vez, cole o PAT no campo e clique **"Salvar token"** — não
   pede de novo depois nesse arquivo/computador. Pra trocar, use o link
   "trocar" que aparece ao lado de "Token salvo ✓".
3. Clique **"Sincronizar tokens"**. O plugin lê as Variables locais,
   converte e faz um `GET` (pra pegar o SHA atual) + `PUT` na Contents API
   pra cada um dos 5 arquivos (`colors.json`, `spacing.json`,
   `typography.json`, `radius.json`, `sizing.json`) que tiver mudança.
4. A área de log mostra, por arquivo: atualizado / sem mudanças / erro (com
   status HTTP e corpo da resposta do GitHub).

Cada arquivo alterado vira um commit separado em `main` (mensagem `chore:
sync design tokens from Figma plugin`), assinado como o dono do token. Isso
dispara o `deploy-storybook.yml` normalmente (push de usuário real, não do
`GITHUB_TOKEN` do Actions — não tem o problema de loop que o workflow
`sync-tokens.yml` precisou contornar).

## Troubleshooting

- **Erro de rede/CORS ao chamar `api.github.com`**: confira se
  `networkAccess.allowedDomains` no `manifest.json` ainda lista
  `https://api.github.com` e se o token não expirou.
- **404 no GET de um arquivo**: normal se o arquivo ainda não existe no repo
  — o plugin cria via `PUT` sem `sha`.
- **401/403 no GET ou PUT**: token inválido, expirado, ou sem permissão de
  Contents no repo — gere um novo (passo 3) e use "trocar" na UI.
- **Nenhuma Variable convertida**: confira a convenção de nomes (`color/`,
  `spacing/`, `typography/` como primeiro segmento) — o log lista cada
  Variable ignorada e o motivo.
