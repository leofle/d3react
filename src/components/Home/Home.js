import React, {Fragment} from 'react'
import {StoreContext} from '../../store'
import Form from '../Form/Form'
import {Card, Title} from '../../styles'

const Home = () => (
  <StoreContext.Consumer>
    {({state})=> (
      <Fragment>
        <Card>
          <Title>
            {state.msg || 'Welcome to React Graph YaY!'} <span role="img" aria-label="hands doing horns">🤘</span>
          </Title>
        </Card>
        <Card>
          <Form/>
        </Card>
      </Fragment>
    )
    }
  </StoreContext.Consumer>
)
export default Home;