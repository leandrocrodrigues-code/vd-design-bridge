# Handoff — sessão 2: build em massa do menu POUi

Continuação de [`HANDOFF_CLAUDE_CODE.md`](./HANDOFF_CLAUDE_CODE.md) (leia
esse primeiro — tem os fundamentos do Design System, convenção de arquivo
por componente, como o POUi funciona de verdade, e o padrão de referência
construído no Button). Este documento é só o estado desta sessão específica,
pra continuar sem perder contexto.

## Estado atual — NADA foi enviado pro GitHub

Tudo está no branch local **`feat/poui-restante`**, criado a partir da
`main` (que já tem Fase 1 completa: fundamentos + Button/Checkbox/Switch
POUi, mergeados em sessões anteriores). **10 commits**, nenhum push.

```bash
cd ~/Desktop/vd-design-bridge
git branch --show-current   # feat/poui-restante
git log --oneline main..feat/poui-restante   # 10 commits, ver lista abaixo
npm run storybook            # pra conferir tudo com os próprios olhos
```

O usuário (Leandro) ainda **não revisou** este lote — ele pediu pra eu
seguir sozinho até o fim antes dele olhar. Quando ele disser **"pode
subir"**, aí sim: commit final se sobrar algo solto, push do branch, PR
pra `main`, deploy do Storybook dispara sozinho (workflow já configurado).

## Os 10 commits deste branch (ordem cronológica)

1. `9785f54` — Link Button + Buttons Group (extensões/composição)
2. `8521b07` — Input + Textarea
3. `507ac78` — Divider + Tag + Badge
4. `3a66056` — Avatar + Chips (divergências reais registradas)
5. `896709b` — Select (Dropdown) + Combo (Combobox) + Search
6. `6bd32da` — Tooltip + Loading + Progress Bar
7. `29f9609` — Accordion + Tabs + Toaster (Toast) + Breadcrumb
8. `c1c537d` — List Item + Stepper
9. `5c4fd38` — Scroll Bar + Section Header + Action Bar + Hero
10. `61ef254` — Modal (só variante Feedback)

## Componentes POUi fechados (32 pastas em `components/Po*`)

Todos seguem o padrão de 4 arquivos (`Componente.tsx`,
`Componente.stories.tsx`, `po-componente.tokens.css`, `index.ts`) e usam
`--vd-color-*` (não hex hardcoded), então acompanham o toggle light/dark
do Storybook automaticamente.

**Com componente oficial da PO-UI confirmado e tokens reais documentados:**
Button, Checkbox, Switch (Toggle), Buttons Group, Input, Textarea, Divider,
Tag, Select (Dropdown), Combo (Combobox), Search, Progress (Bar), Accordion,
Tabs, Toaster (Toast), Stepper, Modal (só Feedback)

**Com divergência real registrada na própria story (não bloqueia nada, só documentado):**
- **Badge** — doc oficial não lista tokens CSS por status
- **Avatar** — `po-avatar` só aceita imagem (`p-src`), sem iniciais/ícone/cor — Figma tem 4 tipos, só "Image" é real
- **Link Button, Chips** — confirmei que NÃO existe componente oficial equivalente na PO-UI (tentei os nomes prováveis em `po-ui.io/llms-generated/*.md`, nenhum resolveu)
- **Tooltip, Loading** — não consegui carregar a doc de tokens (página não respondeu); Tooltip provavelmente é a diretiva `p-tooltip`, não um wrapper como implementei
- **Breadcrumb** — a própria página do Figma está marcada "🚧 Web" (work-in-progress); doc oficial não lista tokens CSS
- **List Item** — o componente real é `po-list-view` (recebe array `p-items`); o que existe é uma linha isolada reaproveitável, não o componente Angular completo

**Puramente composição/estilo, sem `po-*` dedicado (documentado assim na própria story):**
Scroll Bar, Section Header, Action Bar, Hero — todos reaproveitam
`PoButton` internamente onde faz sentido.

## Pendências que exigem decisão do usuário (perguntei, ele ainda não respondeu ou eu não perguntei ainda)

1. **Radio** — ainda não implementado. A PO-UI não tem `po-radio` avulso,
   só `po-radio-group` (recebe array `options`, gerencia seleção única
   internamente). O Figma tem um "Radio" item-por-item, igual ao Checkbox.
   Perguntei ao usuário no meio da sessão 1 e ele **ainda não respondeu**
   essa pergunta específica — as outras 3 perguntas de arquitetura ele
   já respondeu (ver seção seguinte). Duas opções:
   - **A**: construir `PoRadioGroup` de verdade (API real, `options[]`)
   - **B**: construir `PoRadio` item isolado, simetria com Checkbox/Switch, documentando que na implementação real ele nunca existe sozinho

2. **Modal Progress e Modal Template** — as outras 2 variantes de Modal do
   Figma (`node 12138:2494` tem só Feedback; Progress é `12147:28264`,
   Template é `13095:53662`) não foram tocadas nesta sessão.

## Decisões já tomadas pelo usuário nesta sessão (não perguntar de novo)

- Seguir sozinho pelos componentes restantes, mesmo ritmo e rigor, até o fim, sem parar pra review a cada lote — só ao ficar sem espaço de contexto (agora)
- Commits separados por componente/pequeno grupo (não um commit gigante)
- Registrar divergência real na própria story quando achar, sem travar o lote inteiro
- Nada de push até o usuário mandar "pode subir"

## O que NÃO foi tocado ainda (a parte mais pesada da lista original)

Da lista de ~32 componentes do handoff original, ainda faltam:

- **Radio** (bloqueado, ver acima)
- **Date Picker, Calendar, Filter** (Forms — os 3 mais complexos que sobraram do grupo "campos de formulário")
- **Table (Grid) + células** (node `5321:52444`, mais os nós de Cells/Action, Cells/Content, Cells/Header, Columns, Rows — grid de dados completo)
- **Cards** — 8 subtipos no Figma (Status `321:7530`, Data `5132:9725`, Invoice `5214:11950`, Copy `2224:1879`, Uploader `12132:8593`, Dashboard `11955:3485`, Value `11955:4094`, Template `12386:31714`, mais "Card Loading" e "Card List Item")
- **Modal Progress, Modal Template** (ver pendência acima)
- **Drawer** (node `12316:13613` Template, `12382:34012` List Control)
- **Charts** — 4 subtipos (Bar `4719:8456`, Donut `4719:8827`, Cargo `4760:5108`, Progress Truck `4760:6144` — os 2 últimos parecem ilustrações customizadas de logística, não gráficos genéricos)
- **Menu (Web)** (node `12288:8434`, marcado 🚧 no Figma)
- **Side Menu** (node `316:4205`)
- **Top Bar** (node `5047:5411` Delphi / `11931:35705` Web, marcado 🚧)

Esses são genuinamente maiores/mais complexos que o que já foi feito —
Table e Cards em particular têm dezenas de variantes internas cada.

## Como retomar na sessão nova

1. Ler este arquivo + `HANDOFF_CLAUDE_CODE.md`
2. Rodar `git log --oneline main..feat/poui-restante` pra confirmar que os 10 commits ainda estão lá
3. Se o usuário revisou (`npm run storybook`) e dá sinal verde: perguntar
   se é pra dar push do branch `feat/poui-restante` e abrir PR, ou se tem
   ajuste antes
4. Se for continuar construindo: seguir a lista de "não tocado ainda"
   acima, mesma metodologia — `get_metadata` pra mapear variantes,
   `get_design_context` em 2-4 nós representativos (não precisa ler
   TODAS as combinações se o padrão já ficou óbvio), checar
   `po-ui.io/llms-generated/po-<nome>.md` pros tokens reais, registrar
   divergência quando não tiver componente oficial equivalente,
   `npx tsc -b --noEmit` + `npx oxlint` antes de cada commit
5. Perguntar ao usuário a decisão do Radio (opção A ou B) antes de tocar nele

## Ferramentas MCP do Figma usadas (fileKey fixo pra esse projeto)

`fileKey = LO37QXwojd3vklS4R2mGqJ` (arquivo "MCP Design System V&D — UI
KIT Desktop Versão Beta"). Sempre `get_metadata` primeiro pra listar as
variantes de um component set, depois `get_design_context` nos nós
específicos — nunca adivinhar nodeId.
