import React, { Component } from "react";
import Button from "./components/button";
import './index.css';

const styles = {
    light: {
        page: { backgroundColor: "#fff" },
        buttons: { backgroundColor: "#f0f0f0", color: "#000" },
        fonts: { color: "#000" },
    },
    dark: {
        page: { backgroundColor: "#000" },
        buttons: { backgroundColor: "#666", color: "#fff" },
        fonts: { color: "#fff" },
    }
}

class Calculator extends Component {
    state = {
        currentValue: 0,
        x: 0,
        y: 0,
        sign: null,
        scientificMode: false,
        theme: "light"
    }

    constructor(props) {
        super(props);
    }

    setDisplay = (x, y, currentValue) => {
        this.setState({
            x,
            y,
            currentValue
        })
    }

    clickNumber = (num) => {
        let { x = 0, y = 0, sign = null } = this.state;
        let currentValue = 0;
        if (sign == null) {
            x = x * 10;
            currentValue = x >= 0 ? x + num : x - num;
            x = currentValue;
        } else {
            y = y * 10;
            currentValue = y >= 0 ? y + num : y - num;
            y = currentValue;
        }
        this.setDisplay(x, y, currentValue);
    }

    toggle = () => {
        let { scientificMode } = this.state;
        this.setState({ scientificMode: !scientificMode })
    }

    setTheme = (theme) => {
        this.setState({ theme })
    }

    reset = () => {
        this.setState({
            currentValue: 0,
            x: 0,
            y: 0,
            sign: null
        })
    }

    toggleValue = () => {
        let { x, y, currentValue, sign } = this.state;
        currentValue = currentValue * (-1);
        if (sign == null) {
            this.setDisplay(currentValue, y, currentValue);
        } else {
            this.setDisplay(x, currentValue, currentValue);
        }
    }

    square = () => {
        let { currentValue } = this.state;
        let updatedValue = currentValue * currentValue;
        this.setState({
            currentValue: updatedValue,
            x: updatedValue,
            sign: null,
            y: 0
        })
    }

    squareRoot = () => {
        let { currentValue } = this.state;
        let updatedValue = Math.sqrt(currentValue);
        this.setState({
            currentValue: updatedValue,
            x: updatedValue,
            sign: null,
            y: 0
        })
    }

    clickOperator = (operator) => {
        let { currentValue, x, y, sign } = this.state;
        if (sign != null) {
            if (y != 0) {
                switch (sign) {
                    case 'add':
                        x = x + y;
                        break;
                    case 'multiply':
                        x = x * y;
                        break;
                    case 'divide':
                        x = x / y;
                        break;
                    case 'sub':
                        x = x - y;
                        break;
                    case 'equal':
                        return this.clickOperator(sign);
                }
                currentValue = x;
            }
        }
        sign = operator == 'equal' ? null : operator;
        this.setState({
            currentValue,
            x,
            sign,
            y: 0
        })
    }

    render() {
        let { currentValue = 0, scientificMode, theme } = this.state;
        let inputStyle = { ...styles[theme].buttons, ...styles[theme].page, border: '0px', borderBottom: '3px solid grey' };
        let buttonStyle = styles[theme].buttons;
        const { toggleValue, square, squareRoot, toggle, setTheme, clickNumber, reset, clickOperator } = this;

        let calculatorConfig = [{
            rowElements: [{
                buttonName: 'Light Theme',
                buttonStyle: theme == 'light' ? { ...buttonStyle, backgroundColor: '#bbb' } : { ...buttonStyle },
                buttonOnClick: () => {
                    setTheme('light')
                }
            }, {
                buttonName: 'Dark Theme',
                buttonStyle: theme == 'dark' ? { ...buttonStyle, backgroundColor: '#444' } : { ...buttonStyle },
                buttonOnClick: () => {
                    setTheme('dark')
                }
            }, {
                buttonName: 'Scientific Mode',
                buttonStyle: scientificMode ? { ...buttonStyle, backgroundColor: theme == 'light' ? '#bbb' : '#444' } : { ...buttonStyle },
                buttonOnClick: toggle
            }]
        }, {
            rowElements: [{
                buttonName: '1',
                buttonStyle,
                buttonOnClick: () => { clickNumber(1) }
            }, {
                buttonName: '2',
                buttonStyle,
                buttonOnClick: () => { clickNumber(2) }
            }, {
                buttonName: '3',
                buttonStyle,
                buttonOnClick: () => { clickNumber(3) }
            }, {
                buttonName: 'Add (+)',
                buttonStyle,
                buttonOnClick: () => {
                    clickOperator('add');
                }
            }]
        }, {
            rowElements: [{
                buttonName: '4',
                buttonStyle,
                buttonOnClick: () => { clickNumber(4) }
            }, {
                buttonName: '5',
                buttonStyle,
                buttonOnClick: () => { clickNumber(5) }
            }, {
                buttonName: '6',
                buttonStyle,
                buttonOnClick: () => { clickNumber(6) }
            }, {
                buttonName: 'Subtract (-)',
                buttonStyle,
                buttonOnClick: () => {
                    clickOperator('sub');
                }
            }]
        }, {
            rowElements: [{
                buttonName: '7',
                buttonStyle,
                buttonOnClick: () => { clickNumber(7) }
            }, {
                buttonName: '8',
                buttonStyle,
                buttonOnClick: () => { clickNumber(8) }
            }, {
                buttonName: '9',
                buttonStyle,
                buttonOnClick: () => { clickNumber(9) }
            }, {
                buttonName: 'Multiply (*)',
                buttonStyle,
                buttonOnClick: () => {
                    clickOperator('multiply');
                }
            }]
        }, {
            rowElements: [{
                buttonName: 'Clear',
                buttonStyle,
                buttonOnClick: reset
            }, {
                buttonName: '0',
                buttonStyle,
                buttonOnClick: () => { clickNumber(0) }
            }, {
                buttonName: 'Equal (=)',
                buttonStyle,
                buttonOnClick: () => { clickOperator('equal') }
            }, {
                buttonName: 'Divide (/)',
                buttonStyle,
                buttonOnClick: () => {
                    clickOperator('divide');
                }
            }]
        }]
        if (scientificMode) {
            calculatorConfig.unshift({
                rowElements: [{
                    buttonName: '+/-',
                    buttonStyle,
                    buttonOnClick: toggleValue
                }, {
                    buttonName: 'Square (x^2)',
                    buttonStyle,
                    buttonOnClick: square
                }, {
                    buttonName: 'Square root (x^(1/2))',
                    buttonStyle,
                    buttonOnClick: squareRoot
                }],

            })
        }

        return (
            <div className={'home'}>
                <div className={'header'}>CALCULATOR</div>
                <div style={{
                    ...styles[theme].page,
                }} className={'calculator-view'}>
                    <div className={'input-class'}> <input value={currentValue} style={inputStyle} ></input></div>
                    {calculatorConfig.map(rowConfig => {
                        return (<div className={'row-class'}>
                            {rowConfig.rowElements.map(rowElement => {
                                return (<div className={'row-element'}>
                                    <Button {...rowElement}>{rowElement.buttonName}</Button>
                                </div>)
                            })}
                        </div>)
                    })}
                </div>
            </div>
        )
    }
}

export default Calculator;
