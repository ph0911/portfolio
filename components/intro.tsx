import Image from 'next/image'
import authorImage from '@/public/images/authors/author-apple.png'
import { FlipWords } from './ui/flip-words'
import Link from 'next/link'
import { Mail, User } from 'lucide-react'

export default function Intro() {
  return (
    <section className='flex flex-col items-center gap-y-4 pb-10 md:pb-24'>
      <div className='mt-21 flex-1 md:mt-34'>
        <Image  className='flex-1 rounded-3xl mb-21'
          src={authorImage}
          alt='Pascal Heue'
          width={100}
          height={100}
          priority
        />
        <h1 className='name-title no-underline'>Hi, ich bin Pascal :)</h1>
        <h2 className='name-subtitle '>Leidenschaftlicher
          <FlipWords words={['Frontend-Entwickler.', 'Grafik-Designer.', 'Web-Designer.']} duration={3000} />
        </h2>

        <p className='mt-21 font-light text-muted-foreground'>
          Ich bin ein Designer mit Entwickler-DNA. Ob visuelles Branding oder benutzerfreundliche Webanwendungen – ich bringe Kreativität und Technologie zusammen, um maßgeschneiderte Lösungen zu schaffen.
        </p>
        <div className="flex items-center gap-6 mt-2">
          <Link
            href='mailto:info@pascalheue.dev?subject=Kontakt%20Anfrage%20Website&body=Hey%2C%20'
            className='font-light inline-flex items-center gap-2 text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground'
          >
            <Mail size={16} className="animate-pulse" />
            <span>mail me</span>
          </Link>
          <Link
            href='/profil'
            className='font-light inline-flex items-center gap-2 text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground'
          >
            <User size={16} />
            <span>mehr über mich</span>
          </Link>
        </div>
      </div>
    </section>
  )
}