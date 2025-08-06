import React from 'react'
import MissedArticles from './MissedArticles'
import ButtonBar from './BottomBar'

const Footer = () => {
  return (
    <div>
        <div>
            <MissedArticles />
        </div>
        <div>
            <ButtonBar />
        </div>
    </div>
  )
}

export default Footer