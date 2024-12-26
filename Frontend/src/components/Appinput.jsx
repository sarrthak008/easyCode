import React from 'react'

const Appinput = ({type,title="your title" ,onChange,value}) => {
  return (
    <div>
      <input type={type} placeholder={title} className=" bg-slate-600  p-2 w-full outline-none border-0 border-b-2 border-b-green-400 h-12" required value={value} onChange={onChange}/>
    </div>
  )
}

export default Appinput