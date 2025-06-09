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
        addItemToCart: (state, action: PayloadAction<{restaurant: RestaurantItem; cartItem: CartItem}>) => {
            const {restaurant, cartItem} = action.payload;
            const existingRestaurantCart = state.carts.find(cart => cart?.restaurant?.id === restaurant?.id);
            if (existingRestaurantCart) {
                const existingItem = existingRestaurantCart?.items?.find(item => item?.id === cartItem?.id);
                if (existingItem) {
                    existingItem.quantity += 1;
                    existingItem.cartPrice = (existingItem.cartPrice || 0) + existingItem?.price;
                } else {
                    existingRestaurantCart?.items?.push({
                        ...cartItem,
                        quantity: 1,
                        cartPrice: cartItem.price,
                    });
                }
            } else {
                state.carts.push({
                    restaurant,
                    items: [
                        {
                            ...cartItem,
                            quantity: 1,
                            cartPrice: cartItem?.price,
                        },
                    ],
                });
            }
            // Alert.alert(`Cart item added: ${JSON.stringify(state.carts[0].items)}`);
        },
        removeItemFromCart: (state, action: PayloadAction<{restaurantId: number; cartItemId: string}>) => {
            const {cartItemId, restaurantId} = action.payload;
            const restaurantCart = state?.carts?.find(cart => cart?.restaurant?.id === restaurantId);
            if (!restaurantCart) return;
            const itemIndex = restaurantCart.items?.findIndex(item => item?.id === cartItemId);
            if (itemIndex !== -1) {
                const item = restaurantCart?.items[itemIndex];
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    item.cartPrice = (item.cartPrice || 0) - item?.price;
                } else {
                    restaurantCart.items.splice(itemIndex, 1);
                }
            }

            if (restaurantCart.items.length === 0) {
                state.carts = state.carts.filter(cart => cart.restaurant.id !== restaurantId);
            }
        },
        addCustomizableItem: (state, action: PayloadAction<{restaurant: RestaurantItem; item: CartItem; customization: {quantity: number; price: number; customizationOption: any[]}}>) => {},
        removeCustomizableItem: (state, action: PayloadAction<{restaurantId: number; cartItemId: string; customizationId: string}>) => {},
        updateCustomizableItem: (
            state,
            action: PayloadAction<{
                restaurantId: number;
                itemId: string;
                customizationId: string;
                newCustomization: {quantity: number; price: number; customizationOptions: any[]};
            }>,
        ) => {},
        clearRestaurantCart: (state, action: PayloadAction<{restaurantId: number}>) => {
            const {restaurantId} = action.payload;
            state.carts = state.carts.filter(cart => cart?.restaurant?.id !== restaurantId);
        },
        clearAllCarts: state => {
            state.carts = [];
        },
    },
});

export const {addItemToCart, removeItemFromCart, addCustomizableItem, removeCustomizableItem, updateCustomizableItem, clearRestaurantCart, clearAllCarts} = cartSlice.actions;

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
