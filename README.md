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

### Configuração manual necessária no GitHub (uma vez só)

1. **Settings → Pages → Build and deployment → Source**: selecionar
   **"GitHub Actions"** (não "Deploy from a branch").
2. **Settings → Actions → General → Workflow permissions**: garantir que
   "Read and write permissions" esteja habilitado (ou ao menos que Pages
   tenha permissão de deploy — o workflow já declara
   `permissions: pages: write, id-token: write` no próprio YAML, mas a
   configuração do repositório precisa permitir Actions rodarem).
3. Depois do primeiro push em `main`, conferir a aba **Actions** do repo
   para ver o workflow `Deploy Storybook to GitHub Pages` rodar com sucesso.

## Tokens

`/tokens` começa vazio/básico — populado manualmente por enquanto, formato
JSON simples (não Style Dictionary ainda). O próximo passo é conectar um
webhook que recebe o export de tokens do Figma e sobrescreve os JSONs desta
pasta automaticamente. Detalhes em [`tokens/README.md`](tokens/README.md).
