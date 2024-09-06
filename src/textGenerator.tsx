import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/rtkhooks';
import { generateText } from './store/reducers/textGenerationSlice';

const TextGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const { text, isLoading, error } = useAppSelector(
    (state) => state.textGeneration
  );
  const dispatch = useAppDispatch();

  const handleGenerate = () => {
    dispatch(generateText(prompt));
  };

  return (
    <div>
      <h1>テキストジェネレーター</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="プロンプトを入力してください"
      />
      <button onClick={handleGenerate}>生成</button>
      {isLoading && <p>生成中...</p>}
      {error && <p>エラーが発生しました: {error}</p>}
      {text && <p>{text}</p>}
    </div>
  );
};

export default TextGenerator;
