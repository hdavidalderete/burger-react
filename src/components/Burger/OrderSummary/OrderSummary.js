import React from 'react';
import Aux from '../../../hoc/AuxHoc';
import Button from '../../UI/Button/Button';
const orderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients).map((keys) => {
    return (<li key={keys} ><span style={{textTransform: 'capitalize'}}>{keys}</span>: {props.ingredients[keys]}</li>)
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicius burger with the following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p>Continue to checkout?</p>
            <p><strong>Total Price $ {props.totalPrice.toFixed(2)}</strong></p>
            <Button clicked={props.cancelOrder} btnType='Danger'>CANCEL</Button>
            <Button clicked={props.confirmOrder} btnType='Success'>CONFIRM</Button>
        </Aux>
    );
};

export default orderSummary;