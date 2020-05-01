import React from 'react';

function LoginForm(props){
    return(
        <div id="login">
            <div className="container col-lg-4 " id="Login">
                <h1 className="text-center loginH1">Swagatham</h1>
                <form id="loginForm"> 
                    <div className="form-group">
                        <input type="text" onChange={props.handleChangeParent} name="username" id="username" className="form-control"  placeholder="Unique id"/>
                    </div>
                    <div className="form-group">
                        <input type="password" onChange={props.handleChangeParent} name="password" id="password" className="form-control" placeholder="Password" />
                    </div>
                    <div className="input-row loaderDiv">
                        <button type="submit" onClick={props.handleSubmitParent} value="Login" id="loginButton" className="btn btn-primary float-right">Login</button>
                        <div className="loader" id="loader"></div>
                        <div className="loaderText" id="loaderText"> Verifying Credentials...</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;