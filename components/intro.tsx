import Image from 'next/image'
import authorImage from '@/public/images/authors/author.jpg'
import { FlipWords } from './ui/flip-words'

export default function Intro() {
  return (
    <section className='flex flex-col-reverse items-start gap-x-10 gap-y-4 pb-10 md:pb-24 md:flex-row md:items-center'>
      <div className='mt-2 flex-1 md:mt-0'>
        <h1 className='title no-underline'>Hi, ich bin Pascal.</h1>
        <h2 className='subtitle mt-1'>Leidenschaftlicher
          <FlipWords words={['Frontend-Entwickler.', 'Grafik-Designer.', 'Web-Designer.']} duration={3000} />
        </h2>

        <p className='mt-3 font-light text-muted-foreground'>

          Ich bin ein Designer mit Entwickler-DNA. Ob visuelles Branding oder benutzerfreundliche Webanwendungen – ich bringe Kreativität und Technologie zusammen, um maßgeschneiderte Lösungen zu schaffen.
        </p>
      </div>
      <div className='relative'>
        <Image
          className='flex-1 rounded-3xl '
          src={authorImage}
          alt='Pascal Heue'
          width={175}
          height={175}
          priority
        />
      </div>
    </section>
  )
}