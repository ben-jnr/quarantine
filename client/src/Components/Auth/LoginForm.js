import React from 'react';

function LoginForm(props){
    return(
        <div id="login">
            <div className="container col-md-4" id="Login">
                <h1 className="text-center loginH1">LOGIN</h1>
                <form id="loginForm">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" onChange={props.handleChangeParent} name="username" id="username" className="form-control"  placeholder="Enter username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={props.handleChangeParent} name="password" id="password" className="form-control" placeholder="Password" />
                    </div>
                    <button type="submit" onClick={props.handleSubmitParent} value="Login" id="loginButton" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;