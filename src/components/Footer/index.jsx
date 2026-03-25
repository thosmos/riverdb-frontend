import React from 'react'
import './Footer.scss'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <div id="footer" className="flex-row">
      <span>
        <h4>RiverDB &copy; {year}</h4>
      </span>
      <span>
        <h4>
          <a href="mailto:info@riverdb.org">Contact: info@riverdb.org</a>
        </h4>
      </span>
    </div>
  )
}

export default Footer
