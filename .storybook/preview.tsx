import { useEffect } from 'react'
import type { Decorator, Preview } from '@storybook/react-vite'
import '../src/index.css'
import './theme.css'

type VdTheme = 'light' | 'dark'

/**
 * Aplica o tema escolhido na toolbar tanto no <html> do iframe (para o fundo
 * da página) quanto num wrapper local. Fica no preview global, então todo
 * componente novo herda o toggle sem configurar nada.
 */
function ThemeRoot({ theme, children }: { theme: VdTheme; children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-vd-theme', theme)
    return () => document.documentElement.removeAttribute('data-vd-theme')
  }, [theme])

  return (
    <div className="vd-theme-root" data-vd-theme={theme} style={{ padding: '16px' }}>
      {children}
    </div>
  )
}

const withTheme: Decorator = (Story, context) => (
  <ThemeRoot theme={(context.globals.vdTheme ?? 'light') as VdTheme}>
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
  },
};

export default preview;
