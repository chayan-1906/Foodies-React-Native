import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RestaurantItem} from '../../types';
import {RootState} from '@states/store.ts';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    cartPrice?: number;
    isVeg: boolean;
    isCustomizable: boolean;
    customizations?: any[];
}

interface RestaurantDetails {
    id: string;
    name: string;
    discount: string;
    discountAmount: string;
    time: string;
    distance: string;
    rating: number;
    imageUrl: string;
}

interface RestaurantCart {
    restaurant: RestaurantItem;
    items: CartItem[];
}

interface CartState {
    carts: RestaurantCart[];
}

const initialState: CartState = {
    carts: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<{restaurant: RestaurantItem; cartItem: CartItem}>) => {},
        removeItemFromCart: (state, action: PayloadAction<{restaurantId: string; cartItemId: string}>) => {},
        clearRestaurantCart: (state, action: PayloadAction<{restaurantId: number}>) => {
            const {restaurantId} = action.payload;
            state.carts = state.carts.filter(cart => cart?.restaurant?.id !== restaurantId);
        },
        clearAllCarts: state => {
            state.carts = [];
        },
    },
});

export const {addItemToCart, removeItemFromCart, clearRestaurantCart, clearAllCarts} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export const selectRestaurantCart = (restaurantId: number) =>
    createSelector(
        (state: RootState) => state.cart.carts.find(cart => cart.restaurant.id === restaurantId),
        restaurantCart => (restaurantCart ? [...restaurantCart.items] : []),
    );

export const selectRestaurantCartItem = (restaurantId: number, cartItemId: string) =>
    createSelector(
        (state: RootState) => state.cart.carts.find(cart => cart.restaurant.id === restaurantId)?.items,
        items => items?.find(cartItem => cartItem?.id === cartItemId) || null,
    );

export default cartSlice.reducer;
