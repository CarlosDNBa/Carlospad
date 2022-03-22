import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import './styles.css'

const Text = () => {
  const [text, setText] = useState('')
  const link = useLocation().pathname.replace('/', '')

  return (
    <div className="container">
      <div className="warning">
        <strong>Digite algo abaixo e o texto salva automaticamente! :)</strong>
      </div>
      <div className="textarea-container">
        <textarea id="textarea"/>
      </div>
    </div>
  )
}

export default Text
