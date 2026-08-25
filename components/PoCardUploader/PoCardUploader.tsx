import './po-card-uploader.tokens.css';

export interface PoCardUploaderFile {
  name: string;
  size: string;
  extension: string;
}

export interface PoCardUploaderProps {
  /** rótulo da dropzone */
  dropzoneLabel?: string;
  /** formatos/tamanho aceitos */
  hint?: string;
  /** progresso do upload em andamento (0-100), null = sem upload ativo */
  uploadProgress?: number | null;
  /** mensagem de erro — se definida, mostra o card de erro */
  errorMessage?: string;
  onRetry?: () => void;
  /** arquivos já enviados */
  files?: PoCardUploaderFile[];
  onRemoveFile?: (index: number) => void;
  onViewFile?: (index: number) => void;
  className?: string;
}

const UploadIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
    <path d="M8 11V2M4.5 5.5 8 2l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 11v1.5a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

/**
 * ⚠️ Não é um componente `po-*` — "Card Uploader" (PDF
 * `Componentespdf/Card Uploader.pdf`) é um card **Core/Composition**
 * cobrindo 4 estados: dropzone vazia, upload em progresso, erro, e
 * lista de arquivos enviados. Sem equivalente `po-upload` — a PO-UI tem
 * um componente de upload diferente (mais simples, sem esses estados
 * visuais); não confirmado como equivalente 1:1.
 */
export function PoCardUploader({
  dropzoneLabel = 'Escolha ou arraste arquivos para enviar',
  hint = 'Formatos: TXT, XSL, PDF, DOC, JPG, PNG (2MB)',
  uploadProgress = null,
  errorMessage,
  onRetry,
  files = [],
  onRemoveFile,
  onViewFile,
  className,
}: PoCardUploaderProps) {
  return (
    <div className={['vd-po-card-uploader', className ?? ''].filter(Boolean).join(' ')}>
      {uploadProgress === null && !errorMessage && files.length === 0 && (
        <div className="vd-po-card-uploader__dropzone">
          <span className="vd-po-card-uploader__icon vd-po-card-uploader__icon--brand"><UploadIcon /></span>
          <div>
            <p className="vd-po-card-uploader__title">{dropzoneLabel}</p>
            <p className="vd-po-card-uploader__hint">{hint}</p>
          </div>
        </div>
      )}

      {uploadProgress !== null && (
        <div className="vd-po-card-uploader__panel">
          <div className="vd-po-card-uploader__row">
            <span className="vd-po-card-uploader__icon vd-po-card-uploader__icon--brand"><UploadIcon /></span>
            <p className="vd-po-card-uploader__title">Fazendo o upload do arquivo...</p>
            <button type="button" className="vd-po-card-uploader__close" aria-label="Cancelar upload">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="vd-po-card-uploader__track">
            <div className="vd-po-card-uploader__fill" style={{ width: `${Math.max(0, Math.min(100, uploadProgress))}%` }} />
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="vd-po-card-uploader__panel vd-po-card-uploader__panel--error">
          <span className="vd-po-card-uploader__icon vd-po-card-uploader__icon--alert">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
              <path d="M4 2h6l2 2v10H4V2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="vd-po-card-uploader__title vd-po-card-uploader__title--alert">{errorMessage}</p>
          <button type="button" className="vd-po-card-uploader__retry" onClick={onRetry}>
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
              <path d="M13 8a5 5 0 1 1-1.6-3.65M13 2v3.5H9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Tentar novamente
          </button>
        </div>
      )}

      {files.length > 0 && (
        <div className="vd-po-card-uploader__list">
          {files.map((file, index) => (
            <div key={index} className="vd-po-card-uploader__file">
              <span className="vd-po-card-uploader__icon vd-po-card-uploader__icon--brand">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                  <path d="M4 2h5l3 3v9H4V2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="vd-po-card-uploader__file-text">
                <span className="vd-po-card-uploader__file-name">{file.name}</span>
                <span className="vd-po-card-uploader__file-meta">{file.size} • .{file.extension}</span>
              </div>
              <button type="button" className="vd-po-card-uploader__delete" aria-label="Remover arquivo" onClick={() => onRemoveFile?.(index)}>
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                  <path d="M3 4.5h10M6.5 4.5V3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1.5M4.5 4.5V13a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" className="vd-po-card-uploader__view" onClick={() => onViewFile?.(index)}>
                Ver arquivo
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                  <path d="M6.5 3h6.5v6.5M13 3 6 10M4 5H3.5a1 1 0 0 0-1 1V13a1 1 0 0 0 1 1H11a1 1 0 0 0 1-1v-.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
