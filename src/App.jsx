import { useState, useEffect } from 'react'
import './App.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import CadastroFormulario from './componentes/CadastroFormulario.jsx';
import Message from './componentes/Message.jsx';
import MenuHome from './componentes/MenuHome.jsx'

import { Menu, X} from 'lucide-react';

function App() {

  const [displayFormVoluntario, setDisplayFormVoluntario] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [isMessageError, setIsMessageError] = useState(false);

  const [windowScreenSize, setWindowScreenSize] = useState(window.innerWidth)
  const [displayMenu, setDisplayMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowScreenSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
      {/* cabeçalho */}

      <header className="cabecalho">
        <div className="logo-cabecalho">
          <img src="../src/img/logo.png" className="logo" />
        </div>

        <nav className="cabecalho-navegacao">
          {windowScreenSize <= 720 ? (
            <>
            <button id="mobileNavbar" type='button' onClick={() => {
              setDisplayMenu(!displayMenu);
            }}><Menu className='menuIcon'/></button>
            </>
          ) : (
            <>
            <a href="#quem-somos">Quem Somos</a>
            <a href="#acoes">Ações</a>
            <a href="#cards">Missões & Valores</a>
            <a href="#voluntario">Voluntarie-se</a>
            <a href="#apoio" id="doe">Doar</a>
            </>
          )}
        </nav>
      </header>
          {/* imagem */}
        <main>
        <section className="historia-ong">
          
           <div className="imagem">
            <Swiper
              modules={[Navigation]}
              navigation
              loop={true}
              spaceBetween={50}
              slidesPerView={1}
              className='img'
            >
              <SwiperSlide><img className='imgCarrossel' src="../src/img/imagem.png" /></SwiperSlide>
              <SwiperSlide><img className='imgCarrossel' src="../src/img/carrossel1.jpg" /></SwiperSlide>
              <SwiperSlide><img className='imgCarrossel' src="../src/img/carrossel2.jpg" /></SwiperSlide>
            </Swiper>
          </div>
          
          <div className="transformando">
            <div className="transformando-texto">
              <h2>Transformamos <br /> <span className="vulnerabilidade">Vulnerabilidade</span> em <br />Esperança</h2>

              <p className="transformando-info">Há quase 3 anos, o Coração Quentinho atua no Recife, levando refeições, cestas básicas, cadeiras de rodas, aulas de artesanato e apoio socioemocional para crianças. Somos movidos pela solidariedade e pelo amor ao próximo.
              </p>

            </div>
          </div>
          {/* imagem */}

         
        </section>

        <section className="quem-somos" id="quem-somos">
          <h2>Quem somos</h2>
          <div>
            <p>O Coração Quentinho é uma ONG formada por voluntários que distribuem jantas para pessoas em situação de rua,
              doam alimentos, cadeiras de rodas e de banho, e promovem aulas de artesanato e apoio socioemocional.
              Nosso trabalho é 100% voluntário e baseado no amor ao próximo.
            </p>
          </div>
        </section>

        <section className="cards" id="cards">
          <div className="missao">
            <h2>Missão</h2>
            <p>Assistir pessoas em situação de vulnerabilidade,<br /> com foco no acolhimento,
              desenvolvimento humano e respeito, através de doações e ações sociais.
            </p>
          </div>

          <div className="visao">
            <h2>Visão</h2>
            <p>Ser referência em acolhimento e <br /> desenvolvimento humano,
              reconhecida pelo impacto positivo nas comunidades atendidas.
            </p>
          </div>

          <div className="valores">
            <h2>Valores</h2>
            <p>Ética, dignidade humana, cidadania, empatia, solidariedade e integridade.</p>
          </div>
        </section>

        <section className="acoes" id="acoes">
          <h2>Nossas Ações</h2>
          <p>Conheça os principais projetos que transformam realidades e impactam vidas.</p>

          <div className="acoes-cards">
            <div className="acoes-1">

              <div className="entrega">
                <h2>Entrega de Refeições</h2>
                <p>Distribuição de jantas para pessoas em situação de rua.</p>
              </div>

              <div className="cestas">
                <h2>Cestas Básicas</h2>
                <p>Entrega de alimentos e itens essenciais às famílias vulneráveis.</p>
              </div>

              <div className="aulas">
                <h2>Aulas de Artesanato</h2>
                <p>Oficinas para meninas do Bongi, incentivando o empreendedorismo.</p>
              </div>


            </div>

            <div className="acoes-2">

              <div className="cadeiras">
                <h2>Doação de Cadeiras</h2>
                <p>Cadeiras de rodas e de banho para quem necessita.</p>
              </div>

              <div className="socioemocional">
                <h2>Apoio Socioemocional</h2>
                <p>Estudos e debates com crianças, usando o livro 'Eu Lidero'.</p>
              </div>

            </div>

          </div>
        </section>
        <section className="voluntario" id="voluntario">
          <h2>Voluntarie-se</h2>
          <p>Ser voluntário no Coração Quentinho é aprender, crescer, transformar vidas e viver a empatia de forma prática.</p>

          <div className="vantagens">
            <div className="parte1">
              <ul> Aprender algo novo</ul>
              <ul> Promover o bem-estar</ul>
              <ul>Fortalecer o emocional</ul>
            </div>
            <div className="parte2">

              <ul>Ampliar a visão de mundo</ul>
              <ul>Abrir portas para novas oportunidades</ul>
              <ul>Transformar vidas e tornar o mundo melhor</ul>
            </div>
          </div>

          <button onClick={() => setDisplayFormVoluntario(!displayFormVoluntario)}>Quero ser voluntário</button>
        </section>

        {/* apoie nosso trabalho */}

        <section className="apoio" id="apoio">
          <h2>Apoie a Nossa Causa</h2>
          <p>Sua contribuição mantém nossos projetos vivos e impactando vidas todos os dias.</p>

          <div className="pix">
            <div className="pix-texto">
              <p>PIX para doações:</p>
            </div>
            <div className="pix-qrcode">
              <img src="../src/img/qrcode.png" alt="pix doações" />
              <p>Titular: Gilma Galvão Mendes</p>
            </div>

          </div>
          <a href="https://www.instagram.com/ongcoracaoquentinhorecife/?igsh=d2Q4bjF6eHR3dzd6#" target='_blank'>
            <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/instagram-white-icon.png" alt="instagram" id="ig" />Instagram
          </a>
        </section>

        {/* localização e redes sociais */}

        <section className="saiba-mais">
          <div className="saiba-mais-todo">
            <div className="localizacao">
              <h2>Nossa Localização</h2>
              <p>Recife - PE - ONG Voluntária - Desde 2020</p>
            </div>
            <div className="redes">
              <h2>Nossas Redes Sociais</h2>
              <p>
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/instagram-white-icon.png" />@ongcoracaoquentinho</p>
              <img src="../src/img/ig_qrcode.png" id="ig_qrcode" alt="qrcode instagram" />
            </div>
          </div>
          <footer className="rodape">

          </footer>
        </section>

      </main>
      {displayFormVoluntario ?
        <CadastroFormulario
          setDisplayFormVoluntario={setDisplayFormVoluntario}
          setMessageContent={setMessageContent}
          setDisplayMessage={setDisplayMessage}
          setIsMessageError={setIsMessageError} />
        : null}

      {displayMessage ? <Message message={messageContent} isMessageError={isMessageError} setDisplayMessage={setDisplayMessage} /> : null}

      {displayMenu ? <MenuHome setDisplayMenu={setDisplayMenu}/> : null}
    </>
  )
}

export default App
