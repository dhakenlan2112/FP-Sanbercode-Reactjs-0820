import React from "react"
import { Route, Redirect } from "react-router-dom"
import { UserContext } from "../Context/UserContext"

class ProtectedRoute extends React.Component {
    static contextType = UserContext
    
    render() {
        const [user] = this.context

        if(user){
            return <Route {...this.props}>
                {this.props.children}
            </Route>
        }
        return <Redirect to="/login" />
        
    }
}

export default ProtectedRoute