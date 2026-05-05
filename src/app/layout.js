import { AuthProvider } from '../context/AuthContext'
import './globals.css'

export const metadata = {
  title: 'Linktin',
  description: 'Professional networking platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}