import React from 'react'
import WrappedRegistrationForm from '../components/registerComp'

class Register extends React.Component{
    render(){
        return(
            <div>
                <WrappedRegistrationForm history={this.props.history}/>
            </div>
        )
    }
}


export default Register;