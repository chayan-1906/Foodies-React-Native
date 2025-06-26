import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICartCustomization, ICartItem, ICustomization, RestaurantItem} from '../../types';
import {RootState} from '@states/store.ts';
import {v4 as uuid} from 'uuid';

export interface RestaurantCart {
    restaurant: RestaurantItem;
    items: ICartItem[];
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
        addItemToCart: (state, action: PayloadAction<{restaurant: RestaurantItem; cartItem: ICartItem}>) => {
            const {restaurant, cartItem} = action.payload;
            const existingRestaurantCart = state.carts.find(cart => cart?.restaurant?.id === restaurant?.id);
            if (existingRestaurantCart) {
                const existingItem = existingRestaurantCart?.items?.find(item => item?.id === cartItem?.id) as ICartItem | undefined;
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
        addCustomizableItem: (state, action: PayloadAction<{restaurant: RestaurantItem; item: ICartItem; customization: ICustomization}>) => {
            const {restaurant, item, customization} = action.payload;
            const existingRestaurantCart = state.carts.find(cart => cart.restaurant.id === restaurant.id);
            if (existingRestaurantCart) {
                const existingItem = existingRestaurantCart?.items?.find(cartItem => cartItem?.id === item.id);

                if (existingItem) {
                    // Initialize customizations if needed
                    if (!existingItem.customizations) {
                        existingItem.customizations = [];
                    }

                    const existingCustomizationIndex = existingItem.customizations.findIndex((cust: ICartCustomization) => JSON.stringify(cust.customizationOptions) === JSON.stringify(customization.customizationOptions));

                    if (existingCustomizationIndex !== -1) {
                        const existingCustomization = existingItem.customizations[existingCustomizationIndex];
                        existingCustomization.quantity += customization?.quantity;
                        existingCustomization.cartPrice += customization?.price;
                    } else {
                        const newCustomizationId = uuid();
                        existingItem.customizations.push({
                            ...customization,
                            id: newCustomizationId,
                            quantity: customization?.quantity,
                            cartPrice: customization?.price,
                            price: customization?.price / customization?.quantity,
                        });
                    }

                    existingItem.quantity += customization?.quantity;
                    existingItem.cartPrice = (existingItem?.cartPrice || 0) + customization?.price;
                } else {
                    // Add new item to existing restaurant cart
                    const newCustomizationId = 'c1';
                    existingRestaurantCart.items.push({
                        ...item,
                        quantity: customization.quantity,
                        cartPrice: customization.price,
                        customizations: [
                            {
                                ...customization,
                                id: newCustomizationId,
                                quantity: customization.quantity,
                                cartPrice: customization?.price,
                                price: customization.price / customization.quantity,
                            },
                        ],
                    });
                }
            }
        },
        removeCustomizableItem: (state, action: PayloadAction<{restaurantId: number; cartItemId: string; customizationId: string}>) => {
            const {restaurantId, cartItemId, customizationId} = action.payload;
            const restaurantCart = state.carts.find(cart => cart?.restaurant?.id === restaurantId);
            if (!restaurantCart) return;
            const item = restaurantCart?.items?.find(cartItem => cartItem?.id === cartItemId);
            if (!item) return;
            const customizationIndex = item?.customizations?.findIndex((cust: ICartCustomization) => cust?.id === customizationId) as number;

            if (customizationIndex !== -1 && item?.customizations) {
                const customization = item.customizations[customizationIndex];
                if (customization?.quantity > 1) {
                    customization.quantity -= 1;
                    customization.cartPrice -= customization?.price;
                } else {
                    item?.customizations?.splice(customizationIndex, 1);
                }

                item.quantity -= 1;
                item.cartPrice = (item?.cartPrice || 0) - customization?.price;

                if (item?.quantity === 0 || item?.customizations?.length === 0) {
                    restaurantCart.items = restaurantCart?.items?.filter(cartItem => cartItem?.id !== cartItemId);
                }

                if (restaurantCart?.items?.length === 0) {
                    state.carts = state.carts?.filter(cartItem => cartItem?.restaurant?.id !== restaurantId);
                }
            }
        },
        updateCustomizableItem: (
            state,
            action: PayloadAction<{
                restaurantId: number;
                cartItemId: string;
                customizationId: string;
                newCustomization: {quantity: number; price: number; customizationOptions: any[]};
            }>,
        ) => {
            const {restaurantId, cartItemId, customizationId, newCustomization} = action.payload;
            const restaurantCart = state.carts.find(cart => cart?.restaurant?.id === restaurantId);
            if (!restaurantCart) return;

            const item = restaurantCart?.items?.find(cartItem => cartItem?.id === cartItemId);
            if (!item || !item.customizations) return;

            const matchingCustomizationIndex = item?.customizations?.findIndex((cust: ICartCustomization) => cust?.id !== customizationId && JSON.stringify(cust.customizationOptions) === JSON.stringify(newCustomization.customizationOptions));

            const targetCustomizationIndex = item?.customizations?.findIndex((cust: ICartCustomization) => cust?.id === customizationId);
            if (targetCustomizationIndex === -1) return;

            const targetCustomization = item?.customizations[targetCustomizationIndex];
            if (matchingCustomizationIndex !== -1) {
                const matchingCustomization = item?.customizations[matchingCustomizationIndex];
                matchingCustomization.quantity += newCustomization?.quantity;
                matchingCustomization.cartPrice += newCustomization?.price;
                item?.customizations?.splice(targetCustomizationIndex, 1);
            } else {
                targetCustomization.quantity = newCustomization.quantity;
                targetCustomization.cartPrice = newCustomization.price;
                targetCustomization.price = newCustomization.price / newCustomization.quantity;
                targetCustomization.customizationOptions = newCustomization.customizationOptions;
            }

            item.quantity = item?.customizations?.reduce((sum, cust) => sum + cust.quantity, 0);
            item.cartPrice = item?.customizations?.reduce((sum, cust) => sum + cust.cartPrice, 0);
        },
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
