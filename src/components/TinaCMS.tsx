import { TinaCMS } from 'tinacms'
import { TinaEditProvider } from 'tinacms/dist/edit-state'

// This is a React component that wraps your content with TinaCMS
export const TinaWrapper = ({ children }: { children: React.ReactNode }) => {
  const cms = new TinaCMS({
    sidebar: true,
    enabled: true,
    apiUrl: '/api/tina',
  })

  return (
    <TinaEditProvider cms={cms}>
      {children}
    </TinaEditProvider>
  )
}
