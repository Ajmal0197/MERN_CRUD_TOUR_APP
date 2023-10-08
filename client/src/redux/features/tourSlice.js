import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createTour = createAsyncThunk(
  "tour/createTour",
  async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createTour(updatedTourData);
      toast.success("Tour Added Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTours = createAsyncThunk(
  "tour/getTours",
  async ({ page, pageSize }, { rejectWithValue }) => {
    try {
      const response = await api.getTours(page, pageSize);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTour = createAsyncThunk(
  "tour/getTour",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTour(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getToursByUser = createAsyncThunk(
  "tour/getToursByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getToursByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTour = createAsyncThunk(
  "tour/deleteTour",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteTour(id);
      toast.success("Tour Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const updatedTour = createAsyncThunk(
  "tour/updateTour",
  async ({ id, updatedTourData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateTour(updatedTourData, id);
      toast.success("Tour Updated Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchTours = createAsyncThunk(
  "tour/searchTours",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getToursBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getToursByTag = createAsyncThunk(
  "tour/getToursByTag",
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.getToursByTag(tag);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRelatedTours = createAsyncThunk(
  "tour/getRelatedTours",
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedTours(tags);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const likeDislikeTour = createAsyncThunk(
  "tour/likeDislikeTour",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likeDislikeTour(_id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {},
    tours: [],
    currentPage: 1,
    numberOfPages: null,
    userTours: [],
    tagTours: [],
    error: "",
    loading: false,
    relatedTours: [],
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTour.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTour.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = [action.payload];
      })
      .addCase(createTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getTours.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTours.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
      })
      .addCase(getTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getTour.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTour.fulfilled, (state, action) => {
        state.loading = false;
        state.tour = action.payload;
      })
      .addCase(getTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getToursByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getToursByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userTours = action.payload;
      })
      .addCase(getToursByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteTour.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTour.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta; // action.meta contains param value
        if (id) {
          state.userTours = state.userTours.filter((item) => item._id !== id);
          state.tours = state.tours.filter((item) => item._id !== id);
        }
      })
      .addCase(deleteTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updatedTour.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatedTour.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta; // action.meta contains param value of createAsyncThunk
        if (id) {
          state.userTours = state.userTours.map((item) =>
            item._id === id ? action.payload : item
          );
          state.tours = state.tours.map((item) =>
            item._id === id ? action.payload : item
          );
        }
      })
      .addCase(updatedTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(searchTours.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchTours.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = action.payload;
      })
      .addCase(searchTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getToursByTag.pending, (state) => {
        state.loading = true;
      })
      .addCase(getToursByTag.fulfilled, (state, action) => {
        state.loading = false;
        state.tagTours = action.payload;
      })
      .addCase(getToursByTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getRelatedTours.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRelatedTours.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedTours = action.payload;
      })
      .addCase(getRelatedTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(likeDislikeTour.pending, (state) => {})
      .addCase(likeDislikeTour.fulfilled, (state, action) => {
        state.loading = false;

        const {
          arg: { _id }, // Destructuring '_id' from the 'arg' property of action.meta
        } = action.meta; // action.meta contains additional metadata of the action

        if (_id) {
          // Check if '_id' is truthy (not null or undefined)
          state.tours = state.tours.map((item) =>
            item._id === _id ? action.payload : item
          );
          // Map through the 'state.tours' array and update the item with matching '_id' with 'action.payload'
          // This code is typically used to update a specific tour in the state with new data after an action
        }
      })
      .addCase(likeDislikeTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { setCurrentPage } = tourSlice.actions;

export default tourSlice.reducer;
