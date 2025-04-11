import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UccxMetrics {
  timestamp: string;
  metrics: {
    activeCalls: number;
    averageWaitTime: number;
    queueSize: number;
  };
}

interface UccxState {
  currentMetrics: UccxMetrics | null;
  loading: boolean;
  error: string | null;
}

const initialState: UccxState = {
  currentMetrics: null,
  loading: false,
  error: null,
};

const uccxSlice = createSlice({
  name: 'uccx',
  initialState,
  reducers: {
    setMetrics: (state, action: PayloadAction<UccxMetrics>) => {
      state.currentMetrics = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setMetrics, setLoading, setError } = uccxSlice.actions;
export default uccxSlice.reducer; 