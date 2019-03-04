import React from 'react';
import classes from './BookCard.module.css';
import { Card, GridColumn } from 'semantic-ui-react';

const bookCard = (props) => {
    // let assignedClasses = [];
    // assignedClasses.push(classes.BookCard, classes.Capitalize);

    return (
        <GridColumn>
                <div className={classes.Book}>
                    <div className={classes.Img}>
                        <img src={props.imageUrl} alt=''/>
                    </div>
                    <div className={classes.Info}>
                        <Card.Content>
                            <Card.Header>{props.title}</Card.Header>
                            <Card.Meta>By: {props.author}</Card.Meta>
                            <Card.Description>Published by: {props.publisher}</Card.Description>
                        </Card.Content>
                        <a href={props.link} target='_blank' rel="noopener noreferrer">
                            <button>See this Book</button>
                        </a>
                    </div>
                </div>
        </GridColumn>
        
    );
}

export default bookCard;