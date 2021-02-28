import Button from '@material-ui/core/Button';
import React from 'react';

export default function button(props) {

    const { children, buttonClassName, buttonOnClick, buttonStyle } = props;
    return (
        <Button style={{ height: '5em', width: '20em', ...buttonStyle }} variant="contained" size="large" onClick={() => buttonOnClick()} className={buttonClassName}>
            {children}
        </Button>
    );
}