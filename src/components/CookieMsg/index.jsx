import React from 'react'
import { Message, Button } from 'semantic-ui-react'
import useUiStore from '../../store/useUiStore'
import './CookieMsg.scss'

const CookieMsg = () => {
  const clearCookieMsg = useUiStore((state) => state.clearCookieMsg)

  const cookiesOKClick = () => {
    clearCookieMsg()
    localStorage.setItem('cookiesOK', 'true')
  }

  return (
    <div id="cookie-msg">
      <Message color="red">
        <Message.Header>We're using cookies in order to understand how people are using our site</Message.Header>
        <div className="m-t-md d-flex flex-row justify-content-center">
          <Button circular fluid color="red" onClick={cookiesOKClick}>
            Thanks, I'm OK with that.
          </Button>
        </div>
      </Message>
    </div>
  )
}

export default CookieMsg
