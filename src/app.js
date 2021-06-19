import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./screens/home";
import themeObject from './theme';
import Calculator from "./components/calculator"

class App extends Component {
  
    render() {
    
        return (
            <div>
                                        <Calculator></Calculator>
                
            </div>
        )
    }
}

export default App;





VUL-WEB-H003	Insecure Direct Object References (IDOR)
VUL-WEB-L002	Sensitive Information in URL
VUL-WEB-L006	Clickjacking
SCR-DIGIT-M007	It was observed that the application uses eval(code).
SCR-DIGIT-L010	Do not use dangerouslySetInnerHTML property in React components.
SCR-DIGIT-L009	Do not release debuggable apps
SCR-DIGIT-L004	Avoid post cross-document messages with an overly permissive target origin