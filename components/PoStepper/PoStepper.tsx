import './po-stepper.tokens.css';

export interface PoStepperItem {
  label: string;
}

export interface PoStepperProps {
  /** p-steps */
  steps: PoStepperItem[];
  /** p-step (1-indexed, como na PO-UI real) */
  step: number;
  className?: string;
}

type StepState = 'done' | 'current' | 'next';

/**
 * Preview web do po-stepper (PO-UI) usando os tokens do Design System
 * V&D. Espelha o Stepper do Figma (node `3624:6575`, página
 * "Stepper ✅") — 3 estados confirmados nó a nó.
 *
 * Doc oficial: https://po-ui.io/documentation/po-stepper
 */
export function PoStepper({ steps, step, className }: PoStepperProps) {
  return (
    <div className={['vd-po-stepper', className ?? ''].filter(Boolean).join(' ')}>
      {steps.map((item, index) => {
        const stepNumber = index + 1;
        const state: StepState = stepNumber < step ? 'done' : stepNumber === step ? 'current' : 'next';
        const lineFill = state === 'done' ? 100 : state === 'current' ? 50 : 0;
        return (
          <div key={item.label} className="vd-po-stepper__item" data-state={state}>
            <div className="vd-po-stepper__line">
              <div className="vd-po-stepper__line-fill" style={{ width: `${lineFill}%` }} />
            </div>
            <div className="vd-po-stepper__step">
              <div className="vd-po-stepper__circle">
                {state === 'done' ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <span className="vd-po-stepper__label">{item.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
