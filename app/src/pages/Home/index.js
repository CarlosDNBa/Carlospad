import { useState } from 'react'
import './styles.css'

const Home = () => {
  const [link, setLink] = useState('')
  console.log(link)
  return (
    <div className="container">

      <div id="title">
        <strong>CARLOSPAD</strong>
      </div>

      <div className="links-row">
        https://carlospad.link/
        <input type="textarea" id="link" onChange={e => setLink(e.target.value)} />
        <button type="submit" id="botao">Go!</button>
      </div>

      <div id="apresentacao">
        Seu próprio bloco de notas online!<br />
        Não precisa de login, é apenas um link<br />
        Preserve sua visão com o dark mode<br />
        Salve seu texto automaticamente<br />
        Edite online com seus amigos<br />
        Carlospad!<br />
      </div>
    </div>
  )
}

export default Home
