import { useState, useEffect } from "react";
import { uniq } from "./utils";

function App() {
  const [termList, setTermList] = useState<string[]>();
  const [inputValue, setInputValue] = useState<string>("");

  const deleteUrl = (index: number) => {
    setTermList((prev) => prev.filter((_, i) => i !== index));
  };

  // コンポーネント始動時にローカルストレージからURLリストを取得
  useEffect(() => {
    chrome.storage.local
      .get(["termList"])
      .then(({ termList }: { termList: string }) => {
        setTermList(termList ?? []);
      });
  }, []);

  // URLリストが変更されたらローカルストレージに保存
  useEffect(() => {
    if (!termList) return;
    chrome.storage.local.set({ termList });
  }, [termList]);

  return (
    <div>
      <p>🚨本番環境一覧(部分一致)🚨</p>
      {termList && (
        <ul>
          {termList.map((url, index) => (
            <li key={url}>
              {url}
              <button type="button" onClick={() => deleteUrl(index)}>
                x
              </button>
            </li>
          ))}
        </ul>
      )}

      <label htmlFor="url">対象URL</label>
      <input
        name="url"
        value={inputValue}
        autoFocus
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            setTermList((prev) => uniq([...prev, inputValue]));
            setInputValue("");
          }
        }}
      />
    </div>
  );
}

export default App;
