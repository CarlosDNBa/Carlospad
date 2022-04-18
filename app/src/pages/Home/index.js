import { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const Home = () => {
  const [link, setLink] = useState('')

  return (
    <div className="container">

      <div id="title">
        <strong>CARLOSPAD</strong>
      </div>

      <div className="links-row">
        https://carlospad.link/
        <input type="textarea" id="link" onChange={e => setLink(e.target.value)} />
        <Link to={`/${link}`}>
          <button type="submit" id="botao">
            Go!
          </button>
        </Link>
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
