import React from "react"
import { useRef } from "react"
import { useEffect } from "react"
import { useCallback } from "react"
import { useState } from "react"


function App() {

  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState("")

  //UseRef
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let passwo = ""
    let str = "abcdefghijklmnopqrstuvwxyzQWERTYUIOPASDFGHJKLZXCVBNM"
    if(numberAllowed) str += "1234567890"
    if(charAllowed) str += "!@#$%^&*()"

    for(let i = 0; i < length; i++){
      passwo += str.charAt(Math.floor(Math.random() * str.length))
    }
    setPassword(passwo)
  },[length,numberAllowed,charAllowed,setPassword])
  
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
   <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
    <h1 className="text-white text-center my-3">Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input type="text" 
      value={password}
      className="outline-none w-full py-1 px-3"
      placeholder="Password"
      readOnly
      ref={passwordRef}  
      />
      <button className="outline-none bg-orange-500 text-white py-0.5 px-3 shri" 
      onClick={copyPasswordToClipboard}
      >Copy</button>
    </div>
    <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
        <input type="range" 
        min={1}
        max={20}
        value={length}
        className="cursor-pointer"
        onChange={(e)=>setLength(e.target.value)}
        />
        <span>Length:{length}</span>
      </div >
      <div className="flex items-center gap-x-1">
        <input type="checkbox"
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={(e)=>{
          setNumberAllowed((prev)=> !prev)
        }}
        />
        <label htmlFor="numberInput">Number</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input type="checkbox"
        defaultChecked={charAllowed}
        id="charInput"
        onChange={(e)=>{
          setCharAllowed((prev)=> !prev)
          }}
          />
          <label htmlFor="charInput">Character</label>
      </div>
    </div>
   </div>
  )
}

export default App;
