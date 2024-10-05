import React from 'react'

export default async function Impressum() {
  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl '>
        <h1 className='title mb-12'>Impressum</h1>
        <p>Pascal Heue<br />
          D&ouml;lziger Weg 9<br />
          04205 Leipzig</p>

        <h2 className='subtitle mt-8 mb-2'>Kontakt</h2>
        <p>Telefon: &#91;Telefonnummer&#93;<br />
          E-Mail: pascal.heue@gmail.com</p>

        <h2 className='subtitle mt-8 mb-2'>Redaktionell verantwortlich</h2>
        <p>Pascal Heue<br />
          D&ouml;lziger Weg 9<br />
          04205 Leipzig</p>

        <p className='text-xs mt-8 text-muted-foreground'>Quelle: <a href="https://www.e-recht24.de">https://www.e-recht24.de</a></p>

      </div>
    </section>
  )
}
