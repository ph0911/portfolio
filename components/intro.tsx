import Image from 'next/image'
import authorImage from '@/public/images/authors/author.jpg'

export default function Intro() {
  return (
    <section className='flex flex-col-reverse items-start gap-x-10 gap-y-4 pb-24 md:flex-row md:items-center'>
      <div className='mt-2 flex-1 md:mt-0'>
        <h1 className='title no-underline'>Hey, Ich bin Pascal.</h1>
        <p className='mt-3 font-light text-muted-foreground'>
          Ich bin ein Frontend-Entwickler aus Leipzig, Deutschland. Ich bin
          leidenschaftlich daran, neue Technologien zu erlernen und mein Wissen
          mit anderen zu teilen.
        </p>
      </div>
      <div className='relative'>
        <Image
          className='flex-1 rounded-lg '
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