import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' }
]
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                disabled={props.disabled[ctrl.type]}
                added={() => props.ingredientAdd(ctrl.type)}
                purchasable={props.purchasable}
                delete={() => props.ingedientDelete(ctrl.type)}
            />
        ))}
        <button 
        className={classes.OrderButton} 
        disabled={!props.purchasable}
        onClick={props.ordered}>Order Now</button>
    </div>
);

export default buildControls;