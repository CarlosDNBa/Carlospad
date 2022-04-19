import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './styles.css'

const Home = () => {
  const [link, setLink] = useState('')
  const navigate = useNavigate()

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(`/${link}`)
    }
  }


  return (
    <div className="home-container">

      <div id="title">
        <strong>CARLOSPAD</strong>
      </div>

      <div className="links-box">
        <span id='link'>https://carlospad.link/</span>
        <div className='link-input-row'>
          <input type="textarea" id="link-input" onKeyDown={handleKeyDown} onChange={e => setLink(e.target.value)} />
          <Link id="button" to={`/${link}`}>
            <button type="submit" id="botao">
              Go!
            </button>
          </Link>
        </div>

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
