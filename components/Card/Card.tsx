import { useState, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { tokens } from '../../tokens';

/* ────────────────────────────────────────────────────────────────────────
 * TWTCard — componente pai. Todas as variantes abaixo (Data, Invoice,
 * Value, Dashboard, Copy, Uploader, Loading, ListItem) são FILHAS deste
 * mesmo componente, selecionadas pela prop `Variante` — não são
 * componentes separados. Esse é o padrão a seguir para qualquer família
 * de cards/variações futura: um componente pai no catálogo, variantes
 * internas por prop.
 * ──────────────────────────────────────────────────────────────────────── */

export type TCardVariante =
  | 'Status'
  | 'Data'
  | 'Invoice'
  | 'Value'
  | 'Dashboard'
  | 'Copy'
  | 'Uploader'
  | 'Loading'
  | 'ListItem';

/* ---------- Variante "Status" (TWTCard real, documentado no TDN) ---------- */

/** Nome do componente equivalente na biblioteca Delphi (Winthor Componentes). */
export type TCardColor = 'tcAzul' | 'tcVerde' | 'tcLaranja' | 'tcVermelho' | 'tcDesabilitado';
export type TWTCardPreviewState = 'Default' | 'Hover' | 'Focus';

export interface TWTCardStatusProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick' | 'color'> {
  Variante?: 'Status';
  /** Ícone padrão do Card (representa o índice de ImageList no Delphi). */
  Icone?: ReactNode;
  /** Ícone exibido quando o Card está selecionado (ImageList). Cai para `Icone` se omitido. */
  IconeSelecionado?: ReactNode;
  /** Tipo enumerado com o estilo de cor. */
  Cor?: TCardColor;
  /** Texto do título do Card. */
  Titulo?: ReactNode;
  /** Texto da descrição do Card. */
  Descricao?: ReactNode;
  /** Determina se o Card mantém-se selecionado quando clicado. */
  ManterSelecao?: boolean;
  /** Valor máximo da barra de progresso que determinará 100% do progresso. */
  ValorMaximo?: number;
  /** Valor do Card utilizado para determinar o progresso atual. */
  Valor?: number;
  /** Define se a barra de progresso é exibida (valor padrão do Delphi é exibir). */
  ExibeBarra?: boolean;
  /** Procedimento que responderá ao evento de um clique no componente. */
  OnClick?: () => void;
  /** Estado forçado apenas para documentação e inspeção no Storybook. */
  PreviewState?: TWTCardPreviewState;
}

const statusToneTokens = {
  tcAzul: tokens.color.feedback.informative,
  tcVerde: tokens.color.feedback.success,
  tcLaranja: tokens.color.feedback.warning,
  tcVermelho: tokens.color.feedback.alert,
} as const;

type StatusTone = { pure: string; container: string; card: string; highlight: string };

function resolveStatusTone(cor: TCardColor): StatusTone {
  if (cor === 'tcDesabilitado') {
    return {
      pure: tokens.color.content['03'].value,
      container: tokens.color.surface.container.value,
      card: tokens.color.surface.container.value,
      highlight: tokens.color.content['03'].value,
    };
  }
  const t = statusToneTokens[cor];
  return { pure: t.pure.value, container: t.container.value, card: t.card.value, highlight: t.highlight.value };
}

function CardStatus({
  Icone,
  IconeSelecionado,
  Cor = 'tcAzul',
  Titulo = 'Titulo',
  Descricao = 'Descricao',
  ManterSelecao = false,
  ValorMaximo = 100,
  Valor = 0,
  ExibeBarra = true,
  OnClick,
  PreviewState = 'Default',
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...rest
}: Omit<TWTCardStatusProps, 'Variante'>) {
  const [interactionState, setInteractionState] = useState<TWTCardPreviewState>('Default');
  const [isSelected, setIsSelected] = useState(false);
  const visibleState = PreviewState === 'Default' ? interactionState : PreviewState;
  const tone = resolveStatusTone(Cor);
  const progressPct = Math.max(0, Math.min(100, (Valor / Math.max(1, ValorMaximo)) * 100));
  const selected = ManterSelecao && isSelected;
  const displayedIcon = selected ? (IconeSelecionado ?? Icone) : Icone;

  const containerStyle: CSSProperties = {
    fontFamily: tokens.typography.family.paragraph.value,
    width: '256px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
    borderRadius: tokens.radius.xsm.value,
    cursor: 'pointer',
    outline: visibleState === 'Focus' ? `2px solid ${tone.pure}` : 'none',
    outlineOffset: '2px',
    transition: 'background-color .15s ease, border-color .15s ease',
    backgroundColor: selected ? tone.card : tokens.color.surface.card.value,
    border: selected
      ? `1px solid ${tone.pure}`
      : visibleState === 'Hover'
        ? `1px solid ${tone.pure}`
        : '1px solid transparent',
    ...style,
  };

  const rowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px' };

  const iconWrapStyle: CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: tokens.radius.smd.value,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: '16px',
    backgroundColor: tone.container,
    color: tone.pure,
  };

  const textColStyle: CSSProperties = { display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 };

  const titleStyle: CSSProperties = {
    fontSize: '12px',
    lineHeight: '16px',
    color: tokens.color.content['02'].value,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const descStyle: CSSProperties = {
    fontSize: '14px',
    lineHeight: '18px',
    color: tone.highlight,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const trackStyle: CSSProperties = {
    height: '4px',
    borderRadius: tokens.radius['3xsm'].value,
    backgroundColor: tokens.color.surface.container.value,
    overflow: 'hidden',
  };

  const fillStyle: CSSProperties = {
    height: '100%',
    width: `${progressPct}%`,
    borderRadius: tokens.radius['3xsm'].value,
    backgroundColor: tone.pure,
  };

  return (
    <div
      {...rest}
      role="button"
      tabIndex={0}
      className={className}
      style={containerStyle}
      onClick={() => {
        if (ManterSelecao) setIsSelected((v) => !v);
        OnClick?.();
      }}
      onMouseEnter={(event) => {
        setInteractionState('Hover');
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setInteractionState('Default');
        onMouseLeave?.(event);
      }}
      onFocus={(event) => {
        setInteractionState('Focus');
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setInteractionState('Default');
        onBlur?.(event);
      }}
    >
      <div style={rowStyle}>
        <span aria-hidden="true" style={iconWrapStyle}>
          {displayedIcon ?? (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
              <path d="M12 3l8 4v5c0 5-3.4 7.9-8 9-4.6-1.1-8-4-8-9V7l8-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span style={textColStyle}>
          <span style={titleStyle}>{Titulo}</span>
          <span style={descStyle}>{Descricao}</span>
        </span>
      </div>
      {ExibeBarra ? (
        <div style={trackStyle}>
          <div style={fillStyle} />
        </div>
      ) : null}
    </div>
  );
}

/* ---------- Variante "Data" ---------- */

export type TCardDataColor = 'tcAzul' | 'tcVerde' | 'tcLaranja' | 'tcVermelho' | 'tcMarca';

export interface TWTCardDataProps {
  Variante: 'Data';
  Icone?: ReactNode;
  Cor?: TCardDataColor;
  Titulo?: ReactNode;
  Valor?: ReactNode;
  TagTexto?: ReactNode;
  TagIcone?: ReactNode;
  Destacado?: boolean;
}

const dataToneTokens = {
  tcAzul: tokens.color.feedback.informative,
  tcVerde: tokens.color.feedback.success,
  tcLaranja: tokens.color.feedback.warning,
  tcVermelho: tokens.color.feedback.alert,
} as const;

function CardData({
  Icone,
  Cor = 'tcAzul',
  Titulo = 'Overline',
  Valor = 'Label Text',
  TagTexto = '100%',
  TagIcone,
  Destacado = false,
}: Omit<TWTCardDataProps, 'Variante'>) {
  const tone = Cor === 'tcMarca'
    ? { card: tokens.color.surface.brand.card.value }
    : { card: dataToneTokens[Cor].card.value };

  const containerStyle: CSSProperties = {
    fontFamily: tokens.typography.family.paragraph.value,
    width: '256px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
    borderRadius: tokens.radius.xsm.value,
    backgroundColor: Destacado ? tone.card : tokens.color.surface.card.value,
  };

  const rowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px' };
  const textColStyle: CSSProperties = { display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 };
  const overlineStyle: CSSProperties = { fontSize: '12px', lineHeight: '16px', color: tokens.color.content['02'].value };
  const valorStyle: CSSProperties = {
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '18px',
    color: tokens.color.content.pure.value,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };
  const tagStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    height: '32px',
    minWidth: '48px',
    padding: '8px 12px',
    borderRadius: '41px',
    backgroundColor: tokens.color.surface.pure.value,
    color: tokens.color.surface.inverse.value,
    fontSize: '14px',
    flexShrink: 0,
  };

  return (
    <div style={containerStyle}>
      <div style={rowStyle}>
        {Icone ? <span aria-hidden="true" style={{ width: 24, height: 24, flexShrink: 0 }}>{Icone}</span> : null}
        <span style={textColStyle}>
          <span style={overlineStyle}>{Titulo}</span>
          <span style={valorStyle}>{Valor}</span>
        </span>
        <span style={tagStyle}>
          <span>{TagTexto}</span>
          {TagIcone}
        </span>
      </div>
    </div>
  );
}

/* ---------- Variante "Invoice" ---------- */

export type TCardInvoiceColor = 'tcAzul' | 'tcVerde' | 'tcLaranja' | 'tcVermelho' | 'tcMarca';

export interface TWTCardInvoiceItem {
  Titulo: ReactNode;
  Valor: ReactNode;
}

export interface TWTCardInvoiceProps {
  Variante: 'Invoice';
  Cor?: TCardInvoiceColor;
  TagIcone?: ReactNode;
  TagTexto?: ReactNode;
  Itens?: TWTCardInvoiceItem[];
  Destacado?: boolean;
}

const invoiceToneTokens = {
  tcAzul: tokens.color.feedback.informative,
  tcVerde: tokens.color.feedback.success,
  tcLaranja: tokens.color.feedback.warning,
  tcVermelho: tokens.color.feedback.alert,
} as const;

function CardInvoice({
  Cor = 'tcAzul',
  TagIcone,
  TagTexto = 'Label Tag',
  Itens = [
    { Titulo: 'Overline', Valor: 'Label Text' },
    { Titulo: 'Overline', Valor: 'Label Text' },
  ],
  Destacado = false,
}: Omit<TWTCardInvoiceProps, 'Variante'>) {
  const tone = Cor === 'tcMarca'
    ? { card: tokens.color.surface.brand.card.value, container: tokens.color.surface.brand.container.value, highlight: tokens.color.surface.brand.highlight.value }
    : { card: invoiceToneTokens[Cor].card.value, container: invoiceToneTokens[Cor].container.value, highlight: invoiceToneTokens[Cor].highlight.value };

  const containerStyle: CSSProperties = {
    fontFamily: tokens.typography.family.paragraph.value,
    width: '256px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
    borderRadius: tokens.radius.xsm.value,
    backgroundColor: Destacado ? tone.card : tokens.color.surface.card.value,
  };

  const tagStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    height: '32px',
    width: '100%',
    padding: '0 12px',
    borderRadius: '41px',
    backgroundColor: tone.container,
    color: tone.highlight,
    fontSize: '14px',
  };

  const listStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' };
  const overlineStyle: CSSProperties = { fontSize: '12px', lineHeight: '16px', color: tokens.color.content['02'].value };
  const valorStyle: CSSProperties = { fontSize: '14px', lineHeight: '18px', color: tokens.color.content.pure.value };

  return (
    <div style={containerStyle}>
      <span style={tagStyle}>
        {TagIcone}
        <span>{TagTexto}</span>
      </span>
      <div style={listStyle}>
        {Itens.map((item, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={overlineStyle}>{item.Titulo}</span>
            <span style={valorStyle}>{item.Valor}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Variante "Value" ---------- */

export interface TWTCardValueProps {
  Variante: 'Value';
  Titulo?: ReactNode;
  Valor?: ReactNode;
  TagTexto?: ReactNode;
  Icone?: ReactNode;
  ValorSecundarioTitulo?: ReactNode;
  ValorSecundario?: ReactNode;
}

function CardValue({
  Titulo = 'Overline',
  Valor = 'R$ 9.999,99',
  TagTexto = 'Label Tag',
  Icone,
  ValorSecundarioTitulo = 'Overline',
  ValorSecundario = 'R$ 9.999,99',
}: Omit<TWTCardValueProps, 'Variante'>) {
  const containerStyle: CSSProperties = {
    fontFamily: tokens.typography.family.paragraph.value,
    width: '256px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
    borderRadius: tokens.radius.xsm.value,
    backgroundColor: tokens.color.surface.card.value,
  };

  const headerRow: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px' };
  const overlineStyle: CSSProperties = { fontSize: '12px', lineHeight: '16px', color: tokens.color.content['02'].value };
  const tituloValorStyle: CSSProperties = {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '24px',
    color: tokens.color.content.pure.value,
  };
  const tagStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '32px',
    minWidth: '48px',
    padding: '8px 12px',
    borderRadius: '41px',
    border: `1px solid ${tokens.color.surface.container.value}`,
    backgroundColor: tokens.color.surface.pure.value,
    color: tokens.color.surface.inverse.value,
    fontSize: '14px',
  };

  const secondaryRow: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px' };
  const secondaryValorStyle: CSSProperties = { fontSize: '14px', lineHeight: '18px', color: tokens.color.content.pure.value };

  return (
    <div style={containerStyle}>
      <div style={headerRow}>
        <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <span style={overlineStyle}>{Titulo}</span>
          <span style={tituloValorStyle}>{Valor}</span>
        </span>
        <span style={tagStyle}>{TagTexto}</span>
      </div>
      <div style={secondaryRow}>
        {Icone ? <span aria-hidden="true" style={{ width: 24, height: 24, flexShrink: 0 }}>{Icone}</span> : null}
        <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <span style={overlineStyle}>{ValorSecundarioTitulo}</span>
          <span style={secondaryValorStyle}>{ValorSecundario}</span>
        </span>
      </div>
    </div>
  );
}

/* ---------- Variante "Dashboard" ---------- */

export interface TWTCardDashboardProps {
  Variante: 'Dashboard';
  Icone?: ReactNode;
  Titulo?: ReactNode;
  AcoesIcone?: ReactNode;
  Valor?: ReactNode;
  TagTexto?: ReactNode;
  TagIcone?: ReactNode;
  TextoSuporteDestaque?: ReactNode;
  TextoSuporte?: ReactNode;
}

function CardDashboard({
  Icone,
  Titulo = 'Label Text',
  AcoesIcone,
  Valor = 'R$ 99.999,99',
  TagTexto = '+99%',
  TagIcone,
  TextoSuporteDestaque = '+R$ 99.999,99',
  TextoSuporte = 'Supporting Text',
}: Omit<TWTCardDashboardProps, 'Variante'>) {
  const containerStyle: CSSProperties = {
    fontFamily: tokens.typography.family.paragraph.value,
    width: '256px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '16px',
    borderRadius: tokens.radius.xsm.value,
    backgroundColor: tokens.color.surface.card.value,
  };

  const headerRow: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px' };
  const titleStyle: CSSProperties = { flex: 1, minWidth: 0, fontSize: '14px', lineHeight: '18px', color: tokens.color.content.pure.value };
  const valueRow: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px' };
  const valueStyle: CSSProperties = { flex: 1, minWidth: 0, fontSize: '20px', fontWeight: 700, lineHeight: '24px', color: tokens.color.content.pure.value };
  const tagStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    height: '32px',
    minWidth: '48px',
    padding: '8px 12px',
    borderRadius: '41px',
    border: `1px solid ${tokens.color.surface.container.value}`,
    backgroundColor: tokens.color.surface.pure.value,
    color: tokens.color.surface.inverse.value,
    fontSize: '14px',
    flexShrink: 0,
  };
  const supportingStyle: CSSProperties = { fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' };

  return (
    <div style={containerStyle}>
      <div style={headerRow}>
        {Icone ? <span aria-hidden="true" style={{ width: 24, height: 24, flexShrink: 0 }}>{Icone}</span> : null}
        <span style={titleStyle}>{Titulo}</span>
        {AcoesIcone ? <span aria-hidden="true" style={{ width: 24, height: 24, flexShrink: 0 }}>{AcoesIcone}</span> : null}
      </div>
      <div style={valueRow}>
        <span style={valueStyle}>{Valor}</span>
        <span style={tagStyle}>
          {TagIcone}
          <span>{TagTexto}</span>
        </span>
      </div>
      <div style={supportingStyle}>
        <span style={{ fontWeight: 700, color: tokens.color.feedback.success.pure.value }}>{TextoSuporteDestaque}</span>
        <span style={{ color: tokens.color.content['03'].value }}>{TextoSuporte}</span>
      </div>
    </div>
  );
}

/* ---------- Variante "Copy" ---------- */

export interface TWTCardCopyProps {
  Variante: 'Copy';
  Titulo?: ReactNode;
  Valor?: ReactNode;
  BotaoTexto?: ReactNode;
  BotaoIcone?: ReactNode;
  OnCopiar?: () => void;
}

function CardCopy({
  Titulo = 'Overline',
  Valor = '999999',
  BotaoTexto = 'Copiar',
  BotaoIcone,
  OnCopiar,
}: Omit<TWTCardCopyProps, 'Variante'>) {
  const containerStyle: CSSProperties = {
    fontFamily: tokens.typography.family.paragraph.value,
    width: '256px',
    padding: '16px',
    borderRadius: tokens.radius.xsm.value,
    backgroundColor: tokens.color.surface.card.value,
  };

  const rowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', height: '32px' };
  const overlineStyle: CSSProperties = { fontSize: '12px', lineHeight: '16px', color: tokens.color.content['02'].value };
  const valorStyle: CSSProperties = {
    fontSize: '14px',
    lineHeight: '18px',
    color: tokens.color.surface.brand.highlight.value,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };
  const buttonStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    height: '32px',
    padding: '8px 12px',
    borderRadius: tokens.radius['2xsm'].value,
    border: 'none',
    backgroundColor: tokens.color.surface.brand.container.value,
    color: tokens.color.surface.brand.highlight.value,
    fontSize: '15px',
    cursor: 'pointer',
    flexShrink: 0,
  };

  return (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <span style={overlineStyle}>{Titulo}</span>
          <span style={valorStyle}>{Valor}</span>
        </span>
        <button type="button" style={buttonStyle} onClick={OnCopiar}>
          <span>{BotaoTexto}</span>
          {BotaoIcone}
        </button>
      </div>
    </div>
  );
}

/* ---------- Variante "Uploader" ---------- */

export type TCardUploaderState = 'Default' | 'Uploading' | 'Alert';

export interface TWTCardUploaderProps {
  Variante: 'Uploader';
  Estado?: TCardUploaderState;
  Icone?: ReactNode;
  Titulo?: ReactNode;
  Subtitulo?: ReactNode;
  OnEscolherArquivo?: () => void;
}

function CardUploader({
  Estado = 'Default',
  Icone,
  Titulo = 'Escolha ou arraste arquivos para enviar',
  Subtitulo = 'Formatos: TXT, XSL, PDF, DOC, JPG, PNG (2MB)',
  OnEscolherArquivo,
}: Omit<TWTCardUploaderProps, 'Variante'>) {
  const isDefault = Estado === 'Default';
  const isAlert = Estado === 'Alert';

  const iconBg = isAlert ? tokens.color.feedback.alert.container.value : tokens.color.surface.brand.container.value;
  const titleColor = isAlert ? tokens.color.feedback.alert.highlight.value : tokens.color.surface.brand.highlight.value;

  const containerStyle: CSSProperties = {
    fontFamily: tokens.typography.family.paragraph.value,
    width: '416px',
    padding: '16px',
    borderRadius: tokens.radius.xsm.value,
    backgroundColor: tokens.color.surface.card.value,
    border: isDefault ? `1px dashed ${tokens.color.surface.brand.pure.value}` : undefined,
    cursor: isDefault ? 'pointer' : 'default',
  };

  const rowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px' };
  const avatarStyle: CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: tokens.radius.sm.value,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: iconBg,
    color: titleColor,
  };
  const titleStyle: CSSProperties = { fontSize: '14px', fontWeight: 700, lineHeight: '18px', color: titleColor };
  const subtitleStyle: CSSProperties = { fontSize: '12px', lineHeight: '16px', color: tokens.color.content['03'].value };

  const trackStyle: CSSProperties = {
    marginTop: '16px',
    height: '4px',
    borderRadius: tokens.radius['3xsm'].value,
    backgroundColor: tokens.color.surface.container.value,
    overflow: 'hidden',
  };

  return (
    <div style={containerStyle} onClick={isDefault ? OnEscolherArquivo : undefined} role={isDefault ? 'button' : undefined}>
      <div style={rowStyle}>
        <span aria-hidden="true" style={avatarStyle}>{Icone}</span>
        <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <span style={titleStyle}>{Titulo}</span>
          <span style={subtitleStyle}>{Subtitulo}</span>
        </span>
      </div>
      {Estado === 'Uploading' ? (
        <div style={trackStyle}>
          <div style={{ height: '100%', width: '50%', backgroundColor: tokens.color.surface.brand.pure.value }} />
        </div>
      ) : null}
    </div>
  );
}

/* ---------- Variante "Loading" ---------- */

export interface TWTCardLoadingProps {
  Variante: 'Loading';
  Titulo?: string;
  Subtitulo?: string;
  Valor?: number;
  OnCancelar?: () => void;
}

function CardLoading({
  Titulo = 'Atualizando...',
  Subtitulo = '4 minutos restantes',
  Valor = 50,
  OnCancelar,
}: Omit<TWTCardLoadingProps, 'Variante'>) {
  const containerStyle: CSSProperties = {
    fontFamily: tokens.typography.family.paragraph.value,
    width: '416px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
    borderRadius: tokens.radius.xsm.value,
    backgroundColor: tokens.color.surface.card.value,
  };

  const rowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', height: '32px' };
  const titleStyle: CSSProperties = { fontSize: '14px', fontWeight: 700, lineHeight: '18px', color: tokens.color.surface.brand.highlight.value };
  const subtitleStyle: CSSProperties = { fontSize: '12px', lineHeight: '16px', color: tokens.color.content['03'].value };
  const valueStyle: CSSProperties = { fontSize: '14px', lineHeight: '18px', color: tokens.color.content.pure.value, textAlign: 'right' };
  const closeButtonStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: tokens.radius['2xsm'].value,
    border: 'none',
    backgroundColor: tokens.color.surface.pure.value,
    color: tokens.color.content['01'].value,
    cursor: 'pointer',
    flexShrink: 0,
  };
  const trackStyle: CSSProperties = {
    height: '4px',
    borderRadius: tokens.radius['3xsm'].value,
    backgroundColor: tokens.color.surface.container.value,
    overflow: 'hidden',
  };

  return (
    <div style={containerStyle}>
      <div style={rowStyle}>
        <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <span style={titleStyle}>{Titulo}</span>
          <span style={subtitleStyle}>{Subtitulo}</span>
        </span>
        <span style={{ ...valueStyle, flex: 1 }}>{Valor}%</span>
        <button type="button" aria-label="Cancelar" style={closeButtonStyle} onClick={OnCancelar}>✕</button>
      </div>
      <div style={trackStyle}>
        <div style={{ height: '100%', width: `${Math.max(0, Math.min(100, Valor))}%`, backgroundColor: tokens.color.surface.brand.pure.value }} />
      </div>
    </div>
  );
}

/* ---------- Variante "ListItem" ---------- */

export interface TWTCardListItemProps {
  Variante: 'ListItem';
  Primario?: ReactNode;
  Secundario?: ReactNode;
  TagIcone?: ReactNode;
  TagTexto?: ReactNode;
}

function CardListItem({
  Primario = 'Texto primário',
  Secundario = 'Texto secundário',
  TagIcone,
  TagTexto = 'Tag',
}: Omit<TWTCardListItemProps, 'Variante'>) {
  const containerStyle: CSSProperties = {
    fontFamily: tokens.typography.family.paragraph.value,
    width: '416px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    padding: '16px',
    borderRadius: tokens.radius.xsm.value,
    backgroundColor: tokens.color.surface.card.value,
  };

  const textColumnStyle: CSSProperties = { display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 };
  const primaryStyle: CSSProperties = { fontSize: '14px', lineHeight: '18px', color: tokens.color.content.pure.value };
  const secondaryStyle: CSSProperties = { fontSize: '12px', lineHeight: '16px', color: tokens.color.content['03'].value };

  const tagStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 12px',
    borderRadius: '41px',
    border: `1px solid ${tokens.color.surface.container.value}`,
    backgroundColor: tokens.color.surface.pure.value,
    flexShrink: 0,
  };
  const tagIconStyle: CSSProperties = { width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: tokens.color.surface.inverse.value };
  const tagTextStyle: CSSProperties = { fontSize: '14px', lineHeight: '18px', color: tokens.color.surface.inverse.value };

  return (
    <div style={containerStyle}>
      <div style={textColumnStyle}>
        <span style={primaryStyle}>{Primario}</span>
        <span style={secondaryStyle}>{Secundario}</span>
      </div>
      <div style={tagStyle}>
        {TagIcone && <span style={tagIconStyle}>{TagIcone}</span>}
        <span style={tagTextStyle}>{TagTexto}</span>
      </div>
    </div>
  );
}

/* ---------- Componente pai público ---------- */

export type TWTCardProps =
  | TWTCardStatusProps
  | TWTCardDataProps
  | TWTCardInvoiceProps
  | TWTCardValueProps
  | TWTCardDashboardProps
  | TWTCardCopyProps
  | TWTCardUploaderProps
  | TWTCardLoadingProps
  | TWTCardListItemProps;

/**
 * **TWTCard** — componente pai. A variante **Status** é o `TWTCard` real,
 * documentado no PDF do TDN (`documentacaotdneng/Cards .pdf`,
 * https://tdn.totvs.com/display/DGP/Card — classe `TWTCard`, herda de
 * `TCustomControl`). As demais variantes (`Data`, `Invoice`, `Value`,
 * `Dashboard`, `Copy`, `Uploader`, `Loading`, `ListItem`) não têm classe
 * Delphi documentada — nascem da modernização do Design System V&D no
 * Figma e usam o prefixo `TWT` como proposta de contrato, não confirmada
 * pela documentação TDN. Todas são FILHAS deste mesmo componente: não
 * existem como componentes separados no catálogo, só como valores da
 * prop `Variante`. Ver notas de cada variante nos comentários acima de
 * cada função interna.
 *
 * Regra de fidelidade: o Figma é sempre a fonte da verdade visual; o PDF
 * do TDN só contribui o contrato de propriedades da variante Status.
 */
export function TWTCard(props: TWTCardProps) {
  switch (props.Variante) {
    case 'Data':
      return <CardData {...props} />;
    case 'Invoice':
      return <CardInvoice {...props} />;
    case 'Value':
      return <CardValue {...props} />;
    case 'Dashboard':
      return <CardDashboard {...props} />;
    case 'Copy':
      return <CardCopy {...props} />;
    case 'Uploader':
      return <CardUploader {...props} />;
    case 'Loading':
      return <CardLoading {...props} />;
    case 'ListItem':
      return <CardListItem {...props} />;
    case 'Status':
    default:
      return <CardStatus {...props} />;
  }
}

/** @deprecated Use TWTCard, nome oficial da biblioteca Delphi. */
export const Card = TWTCard;
