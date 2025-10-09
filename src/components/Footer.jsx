import React from 'react'
import MissedArticles from './MissedArticles'
import ButtonBar from './BottomBar'

const Footer = () => {
  return (
    <footer>
        <div>
            <MissedArticles />
        </div>
        <div>
            <ButtonBar />
        </div>
    </footer>
  )
}

export default Footer