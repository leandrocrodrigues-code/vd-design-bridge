# vd-design-bridge

Design system web do projeto IARA (TOTVS). Pipeline: **Figma → GitHub →
Storybook → ZeroHeight**.

Componentes React puros (sem espelhar a API do POUi por enquanto), consumindo
design tokens que virão do Figma, documentados automaticamente no Storybook.

## Stack

- **React + TypeScript + Vite** — build da lib de componentes
- **Storybook** (`@storybook/react-vite` + `@storybook/addon-docs`) — cada
  story vira uma página de documentação automática: componente vivo,
  controles interativos, tabela de props e código de exemplo, sem
  ferramenta externa
- **Tailwind CSS v4** — utilitários de layout/estrutura

## Estrutura

```
/components   componentes React (um diretório por componente,
              Componente.tsx + Componente.stories.tsx + index.ts)
/tokens       design tokens em JSON (colors, spacing, typography)
              — ver tokens/README.md
/.storybook   configuração do Storybook
/.github/workflows
              CI/CD: build + deploy do Storybook
/figma-plugin-token-sync
              plugin Figma privado que sincroniza tokens pro repo
              (projeto Node separado, própria build) — ver seção abaixo
```

Nomenclatura dos componentes é própria deste design system, não espelha a
API do POUi.

## Rodando localmente

```bash
npm install
npm run storybook
```

Abre em `http://localhost:6006`. Cada componente com uma story tagueada
`autodocs` (padrão neste repo) já gera a aba **Docs** automaticamente.

Outros comandos:

```bash
npm run dev              # app Vite de smoke-test (renderiza os componentes)
npm run build             # build de produção do app Vite
npm run build-storybook   # build estático do Storybook em storybook-static/
```

## Deploy automático

A cada push na branch `main`, o workflow
[`.github/workflows/deploy-storybook.yml`](.github/workflows/deploy-storybook.yml)
builda o Storybook estático (`npm run build-storybook`) e publica em GitHub
Pages:

**https://leandrocrodrigues-code.github.io/vd-design-bridge/**

Decisão consciente: sem Chromatic nesta fase. A aba Docs nativa do
Storybook já cobre a necessidade de visualizar o componente vivo com
controles; Chromatic entra depois, numa fase futura de Design QA (regressão
visual automatizada).

**Repo é público**: GitHub Pages no plano Free só funciona em repositórios
públicos (Pages em repo privado exige plano pago). Já configurado — Pages
está habilitado com source "GitHub Actions" e o workflow já rodou com
sucesso.

## Sincronização de tokens (Figma → GitHub)

**Caminho atual**: [`figma-plugin-token-sync/`](figma-plugin-token-sync/) — um
plugin Figma privado que lê as Variables locais direto no Figma e sincroniza
`/tokens/*.json` sob demanda (botão "Sincronizar tokens" na UI do plugin),
via GitHub Contents API. Não commita em `main` diretamente: grava numa
branch `tokens-sync` e abre/atualiza um Pull Request pra revisão — o deploy
do Storybook só dispara quando esse PR é mergeado. Ver
[`figma-plugin-token-sync/README.md`](figma-plugin-token-sync/README.md) pra
instalar e usar.

**Caminho anterior (inativo)**: [`.github/workflows/sync-tokens.yml`](.github/workflows/sync-tokens.yml)
+ [`scripts/sync-figma-tokens.js`](scripts/sync-figma-tokens.js) faziam
polling a cada 15 min contra a REST API de Variables do Figma
(`GET /v1/files/:key/variables/local`). Descobrimos que esse endpoint exige
plano Figma **Enterprise** — nossa conta é Organization, sem acesso. Os
arquivos continuam no repo como referência (a lógica de conversão foi
reaproveitada no plugin), mas não funcionam nesse plano; o cron vai
continuar rodando e falhando até serem desativados/removidos.

Detalhes, convenção de nomes das variables no Figma (igual nos dois
caminhos) e formato dos JSONs estão em [`tokens/README.md`](tokens/README.md).

## Tokens

`/tokens` em formato JSON simples (não Style Dictionary ainda), sincronizado
a partir das Figma Variables via o plugin — ver seção acima e
[`tokens/README.md`](tokens/README.md).
