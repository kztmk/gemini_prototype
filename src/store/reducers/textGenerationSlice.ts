import { GoogleGenerativeAI } from '@google/generative-ai';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { remark } from 'remark';
import breaks from 'remark-breaks';
import stringify from 'remark-stringify';

interface TextGenerationState {
  text: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: TextGenerationState = {
  text: '',
  isLoading: false,
  error: null,
};

// APIとの通信
export const generateText = createAsyncThunk<string, string>(
  'textGeneration/generateText',
  async (prompt) => {
    const genAI = new GoogleGenerativeAI(
      import.meta.env.VITE_GENERATIVE_API_KEY as string
    ); // APIキーを設定
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const result = await model.generateContent(prompt);

    console.log(`result:${result.response.text()}`);
    console.log('-------------------------------');

    const file = await remark()
      .use(breaks)
      .use(stringify)
      .process(result.response.text());

    console.log(file.toString());
    return file.toString();
    //return result.response.text();
  }
);

const textGenerationSlice = createSlice({
  name: 'textGeneration',
  initialState,
  reducers: {
    // 生成開始
    generateStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    // 生成失敗
    generateFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(generateText.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateText.fulfilled, (state, action) => {
        state.isLoading = false;
        state.text = action.payload;
        state.error = null;
      })
      .addCase(generateText.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '生成に失敗しました';
      });
  },
});

export const { generateStart, generateFailure } = textGenerationSlice.actions;

export default textGenerationSlice.reducer;
