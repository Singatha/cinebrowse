import { Link } from "react-router-dom"
import { ReactComponent as FacebookIcon } from "../assets/images/icons/facebook.svg"
import { ReactComponent as TwitterIcon } from "../assets/images/icons/twitter.svg"
import { ReactComponent as InstagramIcon } from "../assets/images/icons/instagram.svg"

const Footer = () => {

  return (
    <footer className="footer">
      <div className="footer__nav-links">
          <Link className="footer__link footer__link--hovered" to="/list/tv">TV Series</Link>
          <Link className="footer__link footer__link--hovered" to="/list/movies">Movies</Link>
      </div>
      <div className="footer__social-media-links">
        <p className="footer__title">Follow us</p>
        <div className="footer__social-media-wrapper">
          <a className="footer__social-media-link footer__social-media-link--hovered" href="#"><FacebookIcon className="footer__icon"/></a>
          <a className="footer__social-media-link footer__social-media-link--hovered" href="#"><TwitterIcon className="footer__icon"/></a>
          <a className="footer__social-media-link footer__social-media-link--hovered" href="#"><InstagramIcon className="footer__icon"/></a>
        </div>
      </div>
    </footer>
  )
}
  
export default Footer
