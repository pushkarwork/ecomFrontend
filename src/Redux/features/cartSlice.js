import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cartItems: localStorage.getItem("CartItems") ? JSON.parse(localStorage.getItem("CartItems")) : [],
    shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}
};
export const cartSlice = createSlice({
    initialState,
    name: "cartSlice",
    reducers: {
        setCartItem: (state, action) => {
            const item = action.payload;
            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            )

            if (isItemExist) {
                state.cartItems = state.cartItems.map((i) => (i.product === isItemExist.product ? item : i))
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            localStorage.setItem("CartItems", JSON.stringify(state.cartItems))
        },
        removeCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter((i) => i.product !== action.payload);
            localStorage.setItem("CartItems", JSON.stringify(state.cartItems))
        },
        clearCart: (state, action) => {
            localStorage.removeItem("CartItems");
            state.cartItems = []
        },
        SaveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload;
            localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo))
        }
    },
});
export default cartSlice.reducer;
export const { setCartItem, removeCartItem, SaveShippingInfo, clearCart } = cartSlice.actions