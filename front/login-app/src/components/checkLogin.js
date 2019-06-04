import React from 'react'
import axios from 'axios'

class CheckLogin extends React.Component{

    check = () => {
        let url = 'http://127.0.0.1:8000/login'
        axios.get(url).then(res => {
            if(res.status === 200){

            }
            else{
                this.props.history.push('/login')
            }
        })
    }

    render(){
        return(
            null
        )
    }
}


export default CheckLogin;