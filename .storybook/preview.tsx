import { useEffect, type CSSProperties, type ReactNode } from 'react'
import type { Decorator, Preview } from '@storybook/react-vite'
import { colorCssVars, type ThemeMode } from '../tokens'
import '../src/index.css'
import './theme.css'

/**
 * Aplica o tema escolhido na toolbar. As custom properties `--vd-color-*` vão
 * tanto no <html> do iframe (pro fundo da página acompanhar) quanto no wrapper
 * local, que é o que os componentes enxergam. Fica no preview global, então
 * toda story nova herda o toggle sem configurar nada.
 */
function ThemeRoot({ theme, children }: { theme: ThemeMode; children: ReactNode }) {
  const vars = colorCssVars(theme)

  useEffect(() => {
    const root = document.documentElement
    for (const [name, value] of Object.entries(vars)) {
      root.style.setProperty(name, value)
    }
    root.style.colorScheme = theme
    root.style.backgroundColor = 'var(--vd-color-surface-pure)'

    return () => {
      for (const name of Object.keys(vars)) {
        root.style.removeProperty(name)
      }
      root.style.removeProperty('color-scheme')
      root.style.removeProperty('background-color')
    }
  }, [theme, vars])

  return (
    <div
      className="vd-theme-root"
      data-vd-theme={theme}
      style={{ ...(vars as CSSProperties), padding: '16px' }}
    >
      {children}
    </div>
  )
}

const withTheme: Decorator = (Story, context) => (
  <ThemeRoot theme={(context.globals.vdTheme ?? 'light') as ThemeMode}>
    <Story />
  </ThemeRoot>
)

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [withTheme],
  initialGlobals: {
    vdTheme: 'light',
  },
  globalTypes: {
    vdTheme: {
      description: 'Tema do Design System V&D',
      toolbar: {
        title: 'Tema',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Guia de Uso',
          'Fundamentals',
          'Componentes',
          ['Delphi', 'POUi'],
          'Templates POUi',
          'Templates Delphi',
        ],
      },
    },
  },
};

export default preview;
