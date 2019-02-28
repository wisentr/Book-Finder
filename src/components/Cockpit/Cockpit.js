import React, {useEffect, useRef} from 'react';

const cockpit = (props) =>{
    // let textInput = useRef();
    // useEffect(() => textInput.current.focus(), []);
    return(
        <div>
            <h2>BookSearch</h2>
            <input 
                type='text' 
                placeholder='Search by name or author'
                value={props.inputText}
                onChange={props.onInputChange}
            />
            <button
            onClick={props.onButtonClick}>Search</button>
        </div>
    );
}

export default cockpit;