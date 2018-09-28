import React, {Fragment} from 'react'
import {StoreContext} from '../../store'

const Form = () => (
  <StoreContext.Consumer>
		{({changeText}) => (
		<Fragment>
			<label>Change the title</label>
			<input type="text" 
				name="title"
				onChange={changeText}
			/>
		</Fragment>
		)}
  </StoreContext.Consumer>
)
export default Form;