

import React from 'react'

const Inputs = ({title,setTitle}) => {
  return (
        <section>
        
        <div className="files flex flex-col mb-2">
            <label htmlFor="">Upload image</label>
            <input type='file'/>
        </div>
        
        <p>Title:</p>
        <input
          type="text"
          className="border-b-2 outline-none border-black focus:border-b-3"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
      </section>
  )
}

export default Inputs