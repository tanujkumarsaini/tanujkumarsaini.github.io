import React from 'react'
import CustomNavbar from './CustomNavbar'

function Base({children}) {
  return (
   <div>
    <CustomNavbar/>
    <div style={{marginTop:'50px'}}>
   {children}
    </div>
    </div>
  )
}

export default Base