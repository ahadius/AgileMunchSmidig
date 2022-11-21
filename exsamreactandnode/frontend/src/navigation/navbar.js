import {FaSignInAlt,FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import '../App.css';
const Navbar =() => {
  return (
    <div className="div">
         <div className="nav">
           <ul>
             <li>   <Link to='/'>Homepages</Link>
             </li>
           </ul>
         </div>
         <ul>
          <li><Link to="/login"><FaSignInAlt/>login</Link></li>
         <li><Link to="/register"><FaUser/>register</Link></li>
         </ul>
    </div>
  )
}

export default Navbar