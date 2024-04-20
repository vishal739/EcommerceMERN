import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCartById,addToCart,updateCart, deleteCart } from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};


export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (items) => {
    const response = await addToCart(items);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchCartByIdAsync = createAsyncThunk(
  "cart/fetchCartById",
  async (userId) => {
    const response = await fetchCartById(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const deleteCartAsync = createAsyncThunk(
  "cart/deleteCart",
  async (itemId) => {
    const response = await deleteCart(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (data) => {
    console.log("recieved quantity: ", data);
    const response = await updateCart(data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
   
  },
   extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchCartByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items=action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index= state.items.findIndex(item=>item.id===action.payload.id);
        state.items[index]=action.payload;
      })
      .addCase(deleteCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index= state.items.findIndex(item=>item.id===action.payload.id);
        state.items.splice(index,1);
      });
  },
});

export const { increment } = cartSlice.actions;


export const selectItems = (state) => state.cart.items;


export default cartSlice.reducer;
