import '../styles/css/tailwindConfig.css'
import '../styles/css/fonts.css'
import '../styles/css/parentTag.css'
import '../styles/css/index.scss'
import 'react-loading-skeleton/dist/skeleton.css'
import 'animate.css';
import NavBar from "../components/LayOut/Nav.tsx"

export default function MyApp({ Component, pageProps }) {
    return (
      <div className=' h-screen overflow-hidden'>
        <NavBar/>
        <Component {...pageProps} />
      </div>
    )
  }