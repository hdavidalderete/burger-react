import React, { Component } from 'react';
import Aux from '../../hoc/AuxHoc';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENTS_PRICE = {
    cheese: 1.5,
    salad: 1,
    bacon: 1.8,
    meat: 0.6
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            cheese: 0,
            salad: 0,
            bacon: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        puchasing: false
    }

    updatePuchasable = (ingredientsUpdate) => {
        const ingredients = {
            ...ingredientsUpdate
        };
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((acu, el) => { return acu + el }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const ingredientsUpdate = { ...this.state.ingredients };
        ingredientsUpdate[type] = updateCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = priceAddition + this.state.totalPrice;
        this.setState({ ingredients: ingredientsUpdate, totalPrice: oldPrice })
        this.updatePuchasable(ingredientsUpdate);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] < 1) return;
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount - 1;
        const ingredientsUpdate = { ...this.state.ingredients };
        ingredientsUpdate[type] = updateCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice - priceAddition;
        this.setState({ ingredients: ingredientsUpdate, totalPrice: oldPrice })
        this.updatePuchasable(ingredientsUpdate);
    }

    puchasingHandler = () => {
        console.log('ingress')
        this.setState({ puchasing: !this.state.puchasing })
    }

    confirmOrder = () => {
        alert('You continue!');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] < 1;
        }
        return (
            <Aux>
                <Modal show={this.state.puchasing} modalClosed={this.puchasingHandler}>
                    <OrderSummary 
                    ingredients={this.state.ingredients} 
                    cancelOrder={this.puchasingHandler} 
                    confirmOrder={this.confirmOrder} 
                    totalPrice={this.state.totalPrice}/>
                </Modal>

                <Burger ingredients={this.state.ingredients} />
                <BurgerControls
                    ingredientAdd={this.addIngredientHandler}
                    ingedientDelete={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.puchasingHandler}
                    price={this.state.totalPrice} />
            </Aux>)
    }
}

export default BurgerBuilder;

