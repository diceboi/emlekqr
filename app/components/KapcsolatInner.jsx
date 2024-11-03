import React from 'react'
import ContactForm from './UI/ContactForm'
import Paragraph from './UI/Paragraph'
import H4 from './UI/H4'
import H3 from './UI/H3'

export default function KapcsolatInner() {
  return (
    <div className='container m-auto flex flex-col gap-8 py-16'>
        <div className='flex flex-col gap-4 max-w-[600px] m-auto text-center'>
            <H3 classname={"text-[--rose]"}>Írj nekünk</H3>
            <Paragraph> Ha bármilyen kérdésed, kérésed, problémád lenne.</Paragraph>
        </div>
        <ContactForm />
    </div>
  )
}
