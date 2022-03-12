import React from 'react'
import styled from 'styled-components'

const Message = ({text}: {text: string}) => {
  return (
    <MessageComponent>
        <p>{text}</p>
    </MessageComponent>
  )
}

const MessageComponent = styled.div `
    padding: 1.5rem 0;
    color: #fff;
    background-color: #37BC14;
    text-align: center;
    border-radius: 1rem;
    margin-bottom: 2rem;

    p {
        color: #fff !important;
    }

    @media (min-width: 500px) {
      width: 70%;
      margin: 0 auto 2rem;
    }
`;
export default Message