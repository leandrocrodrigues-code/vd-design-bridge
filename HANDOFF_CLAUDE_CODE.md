# Briefing — vd-design-bridge: cobertura completa do Design System no Storybook

Contexto acumulado de uma sessão de planejamento longa. Este documento é a fonte
de verdade pra continuar o trabalho no Claude Code, em escala, sem precisar
redescobrir as decisões já tomadas.

## Objetivo final (por que isso tudo existe)

Uma IA conectada ao Storybook deve conseguir: 1) instalar o POUi oficial num
projeto novo, 2) instalar nossa lib de tokens por cima, 3) ler o catálogo de
templates (header/body/footer + componentes disponíveis) no Storybook, 4) gerar
uma tela real em POUi seguindo isso — uma versão fechada, presa ao nosso Design
System, do que Figma Make / Lovable / v0 fazem. O Storybook nunca é onde o
código final roda — é catálogo de leitura (componentes + tokens + templates).

## Arquivo Figma de origem

`https://figma.com/design/LO37QXwojd3vklS4R2mGqJ/MCP-Design-System-V-D---UI-KIT-Desktop-Versão-Beta`
(MCP do Figma já conectado — dá pra ler direto por lá).

## Fundamentos já extraídos (fonte: PDFs do ZeroHeight)

**Grid** — Delphi (1024x704) e Web Desktop (1440): mesma spec — 24 colunas,
largura de coluna 32px, gutter 24px, margem 20px, grid horizontal 8px. Tablet/
Mobile: não seguir números do Figma — usar as convenções responsivas do
próprio POUi quando chegar a hora.

**Tipografia** — Lato, pesos Regular/Bold. Escala de tamanho: 12/14/16/18/20/24/32/40/48
(XSM/XSM+/SM/SM+/SMD/MD/LG/XLG/2XLG). Escala de line-height: 12/14/16/18/20/24/32/40/48/56
(mesma nomenclatura + 3XLG). Estilos semânticos prontos: Title, Subtitle, Overline,
Paragraph, Description, Caption.

**Spacing** (múltiplo de 4): 4/8/12/16/20/24/32/40/48/56/64 (3XSM a 4XLG).
**Border radius**: 4/8/12/16/20/24 (3XSM a MD).

**Cores** — valores completos abaixo (fonte: PDFs "Colors Token" e "Colors Charts"):

Light:
| Grupo | Pure | Card | Container | Highlight |
|---|---|---|---|---|
| Surface | #FFFFFF | #F7F9F9 | #D9D9D9 | Inverse: #121212 |
| Surface/Brand | #00DBFF | #EDFCFF | #A0F2FF | #1E3DA1 (On Brand: #002233) |
| Content | #121212 | Inverse: #FFFFFF | On Brand: #002233 | 01:#363636 02:#545454 03:#8E8E8E |
| Feedback/Informative | #5082FF | #F5F5FF | #BDCBFF | #2B2D57 |
| Feedback/Success | #5DBA80 | #F4FBF8 | #BEFADE | #075902 |
| Feedback/Warning | #FFC300 | #FEF9F1 | #FFE894 | #6D4008 |
| Feedback/Alert | #E66A5E | #FEF1F2 | #FCD6D8 | #781B12 |

Dark:
| Grupo | Pure | Card | Container | Highlight |
|---|---|---|---|---|
| Surface | #121212 | #292929 | #363636 | Inverse: #FFFFFF |
| Surface/Brand | #00DBFF | #002233 | #004761 | #A0F2FF (On Brand: #002233) |
| Content | #FFFFFF | Inverse: #121212 | On Brand: #002233 | 01:#DDDDDD 02:#ABABAB 03:#8E8E8E |
| Feedback/Informative | #5082FF | #1C1D38 | #2B2D57 | #BDCBFF |
| Feedback/Success | #5DBA80 | #172C23 | #075902 | #BEFADE |
| Feedback/Warning | #FFC300 | #2D2212 | #6D4008 | #FFE894 |
| Feedback/Alert | #E66A5E | #2D191A | #781B12 | #FCD6D8 |

14 cores de gráfico nomeadas (Brand/Accent, Green, Yellow, Blue, Orange, Teal,
Pink, Lime, Purple, Red, Violet, Red Alert, Brown, Rosé) — cada uma com
Pure/Container/Highlight em Light+Dark. Valores completos não couberam aqui;
se precisar, pedir pro usuário reenviar os PDFs "Colors Charts (Light/Dark)".

## Convenção de sincronização de tokens (Figma Variables → JSON)

O plugin `figma-plugin-token-sync` só reconhece Variables nomeadas
`<Grupo>/<resto>` (case-insensitive no grupo):

| Grupo no Figma | Arquivo de saída | Bucket |
|---|---|---|
| `Colors/*` | `tokens/colors.json` | `color` |
| `Font/*` | `tokens/typography.json` | `typography` |
| `Spacing/*` | `tokens/spacing.json` | `spacing` |
| `Corner radius/*` | `tokens/radius.json` | `radius` |
| `Widths/*` e `Heights/*` | `tokens/sizing.json` | `sizing` |

Regeneração é por arquivo inteiro, não por chave — sincronizar um grupo por
vez e completo, ou chaves não representadas como Variable são descartadas.
Formato de cada token: `{ value, type }` (compatível com Tokens Studio /
Figma Variables export).

⚠️ Os PDFs só dão Pure/Container/Highlight por cor — não especificam hover/pressed
por componente. Ao aplicar num componente, hover = Highlight (claro) ou Container
(escuro) por convenção nossa — validar caso a caso olhando o Figma real do
componente, não assumir cego.

## Repositório

`https://github.com/leandrocrodrigues-code/vd-design-bridge` — React + TypeScript +
Vite, Storybook (`@storybook/react-vite` + `@storybook/addon-docs`, autodocs).
Tokens em `/tokens/*.json`, sincronizados por um plugin Figma privado
(`figma-plugin-token-sync`) que grava numa branch `tokens-sync` via PR.

Convenção de arquivo por componente (já em uso):
```
/components/NomeDoComponente/
  NomeDoComponente.tsx          — preview React (só navegação, não é o real)
  NomeDoComponente.stories.tsx  — story com docs: mapeamento Figma→POUi,
                                   código Angular real, tokens aplicados
  NomeDoComponente.tokens.css   — as CSS custom properties REAIS do POUi
                                   (ver po-ui.io/llms-generated/po-<nome>.md
                                   pra pegar os nomes exatos, não inventar)
  index.ts                      — barrel export
```

## POUi — como funciona de verdade (confirmado na doc oficial)

POUi é **Angular** (`@po-ui/ng-components`), instalado via `ng add @po-ui/ng-components`.
Tema é customizado de duas formas oficiais:
1. `PoThemeService.setTheme(themeConfig: PoTheme, themeType, a11yLevel)` — objeto JS/TS.
2. CSS custom properties por componente (ex: `--color-action-default`,
   `--border-radius-md`, `--color-feedback-negative-dark`) — documentado em
   cada página `po-ui.io/documentation/po-<componente>`, seção "Tokens customizáveis".

**A lib de tokens do V&D precisa ser um pacote instalável de verdade**
(`npm install`, não copiar/colar) — no fluxo final é uma IA que instala sozinha.

Fonte de docs pra cada componente: `https://po-ui.io/llms-generated/po-<nome>.md`
— sempre puxar o real antes de gerar código, nunca supor nome de prop.

## Delphi

Página privada do Figma — o usuário manda componente por componente
conforme formos avançando. Sem essa limitação de ícone único (só acontece no
POUi); Delphi e HTML podem ter ícone nos dois lados.

## Estrutura do Storybook (Fase 1 + Fase 2)

**Fase 1** — todos os ~32 componentes reais do Figma (lista abaixo) + fundamentos,
com toggle light/dark nativo do Storybook (configurar em `.storybook/preview.ts`,
uma vez só, herdado por todo componente novo automaticamente).

**Fase 2** — duas seções novas na sidebar, criadas por prefixo no título da story:
- `title: 'POUi/Button'`, `title: 'POUi/Input'`, etc. — preview em React +
  bloco de código Angular real copiável, tokens aplicados.
- `title: 'Delphi/Button'`, etc. — mesma ideia, aguardando o usuário mandar
  cada componente (página privada).

## Padrão de referência já construído: Button

Já existe um exemplo completo seguindo esse padrão em
`/components/Button/` (Button.tsx, Button.stories.tsx, button.tokens.css,
index.ts) — usar como modelo pros próximos 31. Decisões já tomadas nele que
se aplicam a outros componentes quando o caso surgir de novo:
- Variante de cor sem equivalente oficial no POUi (ex: "success") → criar como
  classe CSS custom por cima do `p-kind` mais próximo, documentar isso na story
  como extensão nossa, não nativa.
- Prop do Figma sem equivalente no POUi (ex: ícone à direita no Button) →
  aceitar a limitação do POUi como está: não inventar prop que não existe.
  Delphi/HTML não têm essa restrição.
- Sub-estados (hover/pressed/focus) viram CSS (`:hover`, `:active`, `:focus`),
  não variante de componente separada.

⚠️ Pendente de validar: as cores exatas de cada Sub-state (hover/active/disabled)
do Button ainda não foram confirmadas pixel a pixel contra o Figma — só a cor
"Default" foi confirmada via screenshot. Vale conferir com `get_design_context`
node a node antes de finalizar.

## Code Connect

O Figma tem uma feature nativa (`get_code_connect_suggestions` /
`send_code_connect_mappings`) pra mapear node do Figma → componente no
código, reduzindo contexto e melhorando geração futura. Já iniciado pro Button
(nodeId `3624:6970`, fileKey `LO37QXwojd3vklS4R2mGqJ`) — mapeamento ainda não
confirmado/salvo. Vale fechar isso componente por componente conforme cada um
for criado.

## Lista dos ~32 componentes reais (exclui páginas de documentação interna do
Figma como "Documentation v1", "Fundamentals" enquanto ícones/swatch, e
"Research 🚧")

Marca, Botões (Button, Buttons Group, Link Button), Avatar, Chips, Tag, Badge,
Checkbox, Radio, Toggle, Divider, Search, Forms (Date Picker, Calendar, Filter,
Combobox, Dropdown, Text Area, Text Input), List Item (+ Group), Table (Grid) +
células, Tooltip, Scroll bar, Loading Icon, Toast, Side Menu, Top Bar, Hero,
Section Header, Action Bar, Accordion, Progress Status, Progress Bar, Stepper,
Tabs, Cards (Status/Data/Invoice/Copy/Uploader/Dashboard/Value/Template),
Modal (Feedback/Progress/Template), Drawer, Charts (Bar/Donut/Cargo/Progress
Truck), Menu (Web), Breadcrumb.

## Próximos passos sugeridos (ordem)

1. Fechar toggle light/dark no `.storybook/preview.ts`.
2. Validar e fechar o Button 100% (cores de estado + Code Connect).
3. Seguir pros próximos componentes na ordem: Marca → Botões restantes →
   seleção (Checkbox/Radio/Toggle) → campos de formulário → o resto.
4. Fase 2 (seções POUi/Delphi) só depois da Fase 1 completa.
5. Empacotar `/tokens` como lib instalável separada.
