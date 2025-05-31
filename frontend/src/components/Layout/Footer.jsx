import React, { useContext } from 'react'
import {Context} from "../../main"
import {Link} from "react-router-dom"
import { FaGithub } from "react-icons/fa"

function Footer() {
  const {isAuthorized}  = useContext(Context)
  return (
    <footer className= {isAuthorized ? "footerShow" : "footerHide"}>
<div>&copy; All Rights Reserved by Ayush.</div>
<div>
  <Link to={'https://github.com/PatelAyush3265'} target='github'><FaGithub></FaGithub></Link>
</div>
      
    </footer>
  )
}

export default Footer