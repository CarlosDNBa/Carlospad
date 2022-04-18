import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { load } from '../../services/api'

import Autosave from '../../components/Autosave'

import './styles.css'

const Text = () => {
  const [text, setText] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [wasFetched, setWasFetched] = useState(false)
  const link = useLocation().pathname.replace('/', '')

  useEffect(() => {
    (async () => {
      const response = await load(link)
      setText(response.data || '')
      setWasFetched(true)
    })()
  }, [link])

  return (
    <div className="container">
      <div className="warning">
        <strong>Digite algo abaixo e o texto salva automaticamente! :)</strong>
      </div>
      <div className="textarea-container">
        {
          wasFetched
            ? (
              <>
                <textarea
                  id="textarea"
                  value={text}
                  onChange={(e) => wasFetched && setText(e.target.value)}
                />
                <Autosave
                  text={text}
                  link={link}
                  isSaving={isSaving}
                  setIsSaving={setIsSaving}
                />
              </>
            )
            : (
              <span>Carregando seu texto...</span>
            )
        }
      </div>

      <br />
      <br />
      {
        isSaving
          ? (
            <span>Salvando...</span>
          ) : (
            <span>Salvo!</span>
          )
      }
    </div>
  )
}

export default Text
