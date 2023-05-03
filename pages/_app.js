import '../styles/css/tailwindConfig.css'
import '../styles/css/fonts.css'
import '../styles/css/parentTag.css'
import '../styles/css/index.scss'
import NavBar from "../components/LayOut/Nav.tsx"

export default function MyApp({ Component, pageProps }) {
    return (
      <div>
        <NavBar/>
        <Component {...pageProps} />
      </div>
    )
  }