# VD Token Sync (plugin Figma privado)

Plugin interno (TOTVS/V&D), não publicado na comunidade Figma. Lê as
**Variables locais** do arquivo Figma via Plugin API, converte pro mesmo
formato que `/tokens/*.json` já usa no repo, e grava no GitHub via
**Contents API** — sem passar por polling, webhook ou plugin de terceiros.

Não commita direto em `main`: os commits vão pra uma branch fixa
`tokens-sync` (criada automaticamente se não existir), e o plugin abre um
Pull Request `tokens-sync -> main` pra revisão. O deploy do Storybook só
dispara quando esse PR for mergeado — não a cada sincronização.

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

O plugin precisa de um PAT com permissão de leitura/escrita em conteúdo
(pra ler/gravar `tokens/*.json` e criar a branch `tokens-sync`) **e** em
Pull Requests (pra abrir o PR), no repo
`leandrocrodrigues-code/vd-design-bridge`. Duas opções:

**Fine-grained (recomendado — escopo mínimo):**
1. https://github.com/settings/personal-access-tokens/new
2. Resource owner: `leandrocrodrigues-code`
3. Repository access: **Only select repositories** → `vd-design-bridge`
4. Permissions → Repository permissions:
   - **Contents: Read and write** (arquivos + criação da branch `tokens-sync`)
   - **Pull requests: Read and write** (abrir/checar o PR)
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
3. Clique **"Sincronizar tokens"**. O plugin:
   1. Garante que a branch `tokens-sync` existe (cria a partir do HEAD
      atual de `main` se for a primeira vez).
   2. Pra cada um dos 5 arquivos (`colors.json`, `spacing.json`,
      `typography.json`, `radius.json`, `sizing.json`) que tiver mudança:
      faz `GET` (SHA atual na branch `tokens-sync`) + `PUT` na Contents
      API, e loga um resumo do diff por chave (quantas adicionadas,
      removidas, alteradas — com alguns exemplos).
   3. Se algum arquivo mudou, verifica se já existe um PR aberto
      `tokens-sync -> main`: se sim, não mexe nele (o commit que acabou de
      subir já atualiza o PR sozinho); se não, cria um novo PR (título
      `Sync de tokens do Figma - AAAA-MM-DD`, corpo listando os arquivos e
      o resumo do diff de cada um).
4. A área de log mostra, por arquivo, o resultado (atualizado / sem
   mudanças / erro com status HTTP e corpo da resposta), e no fim o link
   clicável do PR pra revisar (**"Revisar: https://github.com/.../pull/N"**).

Nenhum commit vai direto pra `main`. O `deploy-storybook.yml` só dispara
quando o PR for revisado e mergeado manualmente — sincronizar tokens no
Figma não republica o Storybook sozinho.

## Troubleshooting

- **Erro de rede/CORS ao chamar `api.github.com`**: confira se
  `networkAccess.allowedDomains` no `manifest.json` ainda lista
  `https://api.github.com` e se o token não expirou.
- **404 no GET de um arquivo**: normal se o arquivo ainda não existe no repo
  — o plugin cria via `PUT` sem `sha`.
- **401/403 no GET/PUT de arquivo**: token inválido, expirado, ou sem
  permissão de Contents no repo — gere um novo (passo 3) e use "trocar" na
  UI.
- **403/404 ao criar a branch ou o PR**: geralmente falta o escopo **Pull
  requests: Read and write** no token (Contents sozinho não basta pra abrir
  PR) — gere um novo token com os dois escopos do passo 3.
- **409 no PUT**: o plugin já tenta de novo automaticamente uma vez (rele o
  SHA mais recente na branch `tokens-sync` e reenvia). Se persistir depois
  do retry, o log mostra o erro real — normalmente indica outra escrita
  concorrente na mesma branch.
- **Nenhuma Variable convertida**: confira a convenção de nomes (`color/`,
  `spacing/`, `typography/` como primeiro segmento) — o log lista cada
  Variable ignorada e o motivo.
