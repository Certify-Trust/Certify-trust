import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Design = {
  id: number;
  name: string;
  createdAt: string;
};

type DesignsState = {
  designs: Design[];
};

const initialState: DesignsState = {
  designs: [],
};

const designsSlice = createSlice({
  name: "designs",
  initialState,
  reducers: {
    addDesign: (state, action: PayloadAction<Design>) => {
      state.designs.unshift(action.payload);
    },

    removeDesign: (state, action: PayloadAction<number>) => {
      state.designs = state.designs.filter(
        (design) => design.id !== action.payload,
      );
    },
  },
});

export const { addDesign, removeDesign } = designsSlice.actions;

export default designsSlice.reducer;
