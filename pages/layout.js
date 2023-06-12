import '../app/globals.scss'
import { Inter } from 'next/font/google'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>test</title>
      </head>
      <body className='w-full'>
        <div id='appWrap'>
          <div className='topBar'></div>
          <header className='mb-3 px-4'>
            <Image 
              className='w-1/3 h-auto'
              width={384} 
              height={86} 
              src='/images/logo.png'
              alt='LOGO'
            />
          </header> 
          
          <div className='w-full'>
            {children}
          </div>
        
        </div>
      </body>
    </html>
  )
}
