import React, { useEffect } from 'react'
import Select from 'react-select'
import { apiHost } from '../utlitis/URLs';
type Props = {
  setValues: (value:any) => void
}

function ReactSelect({setValues}: Props) {
  const [options,setOptions] = React.useState<any>([]);
  const [value,setValue] = React.useState<any>([{value:1,label:'USD'}]);
  useEffect(()=>{
    fetch(apiHost+'api/getCurrency')
    .then(data => data.json())
    .then(data => setOptions(data.rates));
  },[]);
  console.log(options)
  const convert = ()=>{
    return Object.entries(options).map((x:any)=>{
      return {value:x[0],label:x[0] + '------ ' + x[1]}
    })
  };


  return (
    <div style={{minWidth:'200px'}}>
      <Select  options={convert()}
      className='text-start'
      placeholder="Select Currency"
      value={convert().filter(x=>x.label === value.label)} onChange={(value)=>{
      setValue(value);
      setValues(value);
      }} ></Select>
    </div>
  )
}

export default ReactSelect