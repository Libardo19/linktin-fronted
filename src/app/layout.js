import { AuthProvider } from '../context/AuthContext'
import { NotificationProvider } from '../context/NotificationContext'
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
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}