import type { Meta, StoryObj } from '@storybook/react-vite';
import { PisoDeLojaScreen } from './PisoDeLoja';

const docs = `
Tela completa reconstruída com máxima fidelidade ao Figma — serve de
referência pra uma IA se conectar aqui e montar a versão real em PO-UI.

**Origem:** Handoff Starship — Assistente Piso de Loja (Figma, node
\`2214:44338\`, "Tela de aterrissagem - Resumo de loja full width") — lida
diretamente via MCP do Figma.

**Marca própria — fora do Design System V&D.** Diferente de todo o resto
deste Storybook, esta tela **não usa nenhum \`--vd-color-*\`**. Todas as
cores abaixo são os hex exatos lidos nó a nó no Figma da Starship —
propositalmente, a pedido de quem trouxe o handoff.

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

Os ícones usados vieram do handoff local (\`Ani Button\`, \`Ani Context Bar\`,
\`Logo Lynn.svg\`, \`logo-totvs.svg\`) e o restante (fechar, aviso, anexar,
enviar, divisores) foi baixado direto dos assets do próprio node no Figma
— nenhum ícone foi desenhado ou aproximado.

### Divergência real — registrada

O ícone de "anexar" e o de "gravar áudio" no footer da IA apontam pro
**mesmo asset** no arquivo do Figma (\`imgAttach\` usado duas vezes) — não
foi um erro de leitura, é o que está no handoff. Mantido assim por
fidelidade; sinalizar pro time de design se for intencional.

O botão "Enviar" ("Ani Button/Primary") não tem nenhuma cor de fundo
definida nos nós lidos — só o ícone roxo (\`#4545a1\`). Implementado sem
preenchimento (ícone sobre fundo transparente) em vez de inventar uma cor
de fundo que não está no arquivo.
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
