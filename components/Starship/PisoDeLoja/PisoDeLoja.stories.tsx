import type { Meta, StoryObj } from '@storybook/react-vite';
import { PisoDeLojaScreen } from './PisoDeLoja';

const docs = `
Tela completa reconstruída com máxima fidelidade ao Figma — serve de
referência pra uma IA se conectar aqui e montar a versão real em PO-UI.

**Origem:** Handoff Starship — Assistente Piso de Loja (Figma, node
\`2214:44338\`, "Tela de aterrissagem - Resumo de loja full width") — lida
diretamente via MCP do Figma.

**Marca própria — fora do Design System V&D, mas reaproveitando os
componentes po-\* reais.** Esta tela usa \`PoButton\`, \`PoTag\`, \`PoTabs\` e
\`PoToaster\` — os mesmos componentes já catalogados neste Storybook, não
HTML cru. O que muda é a cor: os quatro componentes leem suas cores das
custom properties \`--vd-color-*\` (ver cada \`po-*.tokens.css\`), e este
projeto sobrescreve essas MESMAS variáveis localmente (\`starshipTheme\` em
\`PisoDeLoja.tsx\`) com os hex exatos lidos nó a nó no Figma da Starship —
sem tocar no tema V&D global do resto do catálogo. Único bloco sem
componente po-\* dedicado: o cabeçalho (logo + ícones + avatar juntos) e a
context bar, que não têm equivalente pronto ainda.

### Composição (de cima pra baixo)

1. **Ani Global Header** — logo TOTVS + tag "Homologação" + 4 ícones
   (apps, mais opções, notificação com badge "9+" embutido no próprio SVG,
   usuário)
2. **Ani Tabs** — "TOTVS News", "Meu TOTVS" e a aba ativa "Performance
   piso de loja" (fundo lilás \`#c2c2e5\`, com botão de fechar)
3. **Ani Context Bar** — botão "Exibir opções" + Data / Empresa / Filial
4. **Ani-Header do conteúdo** — logo Lynn (gradiente) + saudação + data da
   última atualização
5. **4× Metric Cards** — Faturamento, Ticket Médio, Margem Média, Desconto
   Médio (cada um com uma cor de valor diferente: roxo, neutro, verde,
   âmbar)
6. **Card de diagnóstico** — texto corrido gerado pela IA, com trechos em
   negrito e cor (âmbar pro desconto, verde pra margem)
7. **Ani Toaster** — alerta flutuante sobre os dois vendedores com margem
   crítica (fechável)
8. **IA-Footer** — campo de pergunta pra IA + anexar + gravar áudio +
   enviar

### Paleta Starship confirmada no Figma

| Uso | Hex |
|---|---|
| Marca / texto de ação | \`#4545a1\` |
| Texto padrão | \`#1d1d30\` |
| Aba ativa (fundo) | \`#c2c2e5\` |
| Fundo do conteúdo | \`#f2f5f8\` |
| Fundo do header/tabs | \`#f9f9fa\` |
| Sucesso (margem) | \`#059669\` |
| Atenção (desconto) | \`#b45309\` |
| Borda do assistente IA | \`#a650ff\` |
| Logo Lynn (gradiente) | \`#a650ff → #5e69ff → #00aeef\` |

### Ícones

Os ícones vieram do handoff local (\`Ani Button\`, \`Ani Context Bar\`,
\`Logo Lynn.svg\`, \`logo-totvs.svg\`) e o restante (fechar, aviso, enviar,
divisores) foi baixado direto dos assets do próprio node no Figma. Os
únicos dois desenhados à mão foram **anexar** e **gravar áudio** — o
Figma original aponta os dois pro mesmo asset genérico (\`imgAttach\`,
grupo \`agrobusiness\`), então foram substituídos pelos glyphs reais
(clipe de papel e microfone) em vez de replicar o erro do handoff.

Todo ícone usado tem um nome real confirmado na fonte de ícones da PO-UI
(\`an an-*\`) — ver o mapeamento completo no manifesto machine-readable
abaixo.

### Manifesto pra IA gerar em PO-UI (Angular)

[\`piso-de-loja.manifest.json\`](https://github.com/leandrocrodrigues-code/vd-design-bridge/blob/main/components/Starship/PisoDeLoja/piso-de-loja.manifest.json)
— arquivo estruturado com a paleta exata, o texto verbatim de cada bloco,
e o mapeamento de **cada ícone** pro nome real \`an an-*\` da PO-UI (ex.
\`an an-squares-four\`, \`an an-bell\`, \`an an-paperclip\`). Segue o mesmo
padrão dos manifestos Delphi (\`delphi/manifests/\`).

**Fluxo recomendado pra uma IA reconstruir esta tela com fidelidade:**
1. Ler o node do Figma (link em "Origem" acima) via MCP — pra confirmar
   que o handoff não mudou desde a última leitura.
2. Ler o manifesto inteiro — ele resolve de propósito as duas coisas que
   mais causam alucinação: qual ícone \`an-*\` usar em cada lugar, e que
   esta tela **não** usa os tokens \`--vd-color-*\` do resto do catálogo.
3. Gerar o Angular usando só os valores do manifesto — sem inventar cor,
   ícone ou texto que não estejam listados nele.

### Divergência real — registrada

O botão "Enviar" ("Ani Button/Primary") não tem nenhuma cor de fundo
definida nos nós lidos — só o ícone roxo (\`#4545a1\`). Implementado sem
preenchimento (ícone sobre fundo transparente) em vez de inventar uma cor
de fundo que não está no arquivo.

O SVG de notificação do handoff já vem com o badge "9+" desenhado dentro
do próprio ícone (viewBox 33×31, não 24×24) — em PO-UI real não existe
glyph "sino com badge", então o manifesto documenta isso: \`an an-bell\` +
badge separado, nunca uma única glyph.
`;

const meta = {
  title: 'Starship/Piso de Loja',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: docs } }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => <PisoDeLojaScreen />
};
