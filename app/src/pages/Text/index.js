import { v4 as uuid } from 'uuid'
import { useState, useEffect } from 'react'
import Sockette from 'sockette'
import { useLocation } from 'react-router-dom'
import { load } from '../../services/api'

import Autosave from '../../components/Autosave'

import './styles.css'

const connId = uuid()

const openConnection = async ({
  link,
  setText,
  connId
}) => {
  await new Sockette(`${process.env.REACT_APP_WS_URL}?link=${link}&connId=${connId}`, {
    timeout: 53,
    maxAttempts: 10,
    onopen: e => {
      console.log('WebSocket Connected!')
    },
    onmessage: async e => {
      console.log('WebSocket Message Received!')
      const { text } = JSON.parse(e.data)
      setText(text)
    },
    onreconnect: e => console.log('WebSocket Reconnecting...'),
    onmaximum: e => console.log('WebSocket Stop Attempting!'),
    onclose: e => console.log('WebSocket Closed!'),
    onerror: e => console.log('WebSocket Error:')
  })
}

const Text = () => {
  const [text, setText] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [wasFetched, setWasFetched] = useState(false)
  const link = useLocation().pathname.replace('/', '')

  useEffect(() => {
    (async () => {
      const response = await load(link)
      await openConnection({ link, setText, connId })
      setText(response.data || '')
      setWasFetched(true)
    })()
  }, [link])

  return (
    <div className="text-container">
      <div className="is-loading">
        {
          isSaving
            ? (
              <strong>Salvando...</strong>
            ) : (
              <strong>Texto salvo com sucesso.</strong>
            )
        }
      </div>

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
                connId={connId}
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
  )
}

export default Text
