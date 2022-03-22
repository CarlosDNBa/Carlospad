import { useState, useEffect, useCallback } from 'react'
import debounce from 'lodash/debounce'
import { useLocation } from 'react-router-dom'
import { load, save } from '../../services/api'

import './styles.css'

const Text = () => {
  const [text, setText] = useState('')
  const link = useLocation().pathname.replace('/', '')

  useEffect(() => {
    (async () => {
      const response = await load(link)
      setText(response.data || '')
    })()
  }, [link])

  const debounced = useCallback(debounce(() => {
    console.log('saving')
    console.log({ text })
    save(link, text)
  }, 500), [text])

  const handleSave = (e) => {
    e.preventDefault()
    console.log('before debounce', e.target.value)
    setText(e.target.value)
    debounced()
  }

  return (
    <div className="container">
      <div className="warning">
        <strong>Digite algo abaixo e o texto salva automaticamente! :)</strong>
      </div>
      <div className="textarea-container">
        <textarea
          id="textarea"
          value={text}
          onChange={handleSave}
        />
      </div>
    </div>
  )
}

export default Text
