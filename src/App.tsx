import { useState, useEffect } from "react";
import { uniq } from "./utils";

function App() {
  const [termList, setTermList] = useState<string[]>();
  const [inputValue, setInputValue] = useState<string>("");

  const deleteUrl = (index: number) => {
    setTermList((prev) => prev?.filter((_, i) => i !== index) ?? []);
  };

  // コンポーネント始動時にローカルストレージからURLリストを取得
  useEffect(() => {
    chrome.storage.local.get(["termList"]).then((res) => {
      setTermList(res.termList ?? []);
    });
  }, []);

  // URLリストが変更されたらローカルストレージに保存
  useEffect(() => {
    if (!termList) return;
    chrome.storage.local.set({ termList });
  }, [termList]);

  return (
    <div style={{ width: "300px" }}>
      <p style={{ backgroundColor: "black", color: "white" }}>
        🚨本番環境URL一覧(部分一致)🚨
      </p>
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

      <label htmlFor="url">対象文字列:</label>
      <input
        name="url"
        value={inputValue}
        autoFocus
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            setTermList((prev) => uniq([...(prev ?? []), inputValue]));
            setInputValue("");
          }
        }}
        style={{ marginLeft: "10px" }}
      />
    </div>
  );
}

export default App;
