import '../styles/css/tailwindConfig.css'
import '../styles/css/fonts.css'
import '../styles/css/parentTag.css'
import '../styles/css/index.scss'
import 'react-loading-skeleton/dist/skeleton.css'
import 'animate.css';
import NavBar from "../components/LayOut/Nav.tsx"
import App from 'next/app'
export default function MyApp({ Component, pageProps }) {
  
  
    return (
      <div className=' h-screen overflow-hidden'>
        {/* <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
        <NavBar/>
        <Component {...pageProps} />
      </div>
    )
  }