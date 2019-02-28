import React from 'react';
import classes from './BookCard.module.css';

const bookCard = (props) => {
    return (
        <div className={classes.BookCard}>
            <img src={props.imageUrl} alt=''></img>
            <div>
                <h2>{props.title}</h2>
                <p>By: {props.author}</p>
                <p>Published by: {props.publisher}</p>
                <a href = {props.link}>
                    <button>See this Book</button>
                </a>
            </div>
        </div>
    );
}

export default bookCard;