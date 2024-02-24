import React, { useContext, useEffect } from 'react'
import { PageContext } from '../Context/OptionPage'

export default function Account() {
  
const [ , , , SetIsMenuBar, , , InforAccount] = useContext(PageContext)

  useEffect(() => {
    SetIsMenuBar(SetIsMenuBar => ({
      ...SetIsMenuBar,
      OptionAccountBar: true
    }))
  })

  return (
    <div className='mt-7r'>
      
    </div>
  )
}
