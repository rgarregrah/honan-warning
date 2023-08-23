import { useCallback, useEffect, useState } from "react";
import "./WarnHeader.css";

function WarnHeader() {
  const [termList, setTermList] = useState<string[]>([]); // 警告を表示する条件のリスト
  const [isTargetUrl, setIsTargetUrl] = useState<boolean>(false); // 警告を表示するかどうか
  const [beforeUrl, setBeforeUrl] = useState<string>(location.href); // URLが変更されたかどうかを判定するためのステート

  /**
   * 現在のURLが警告を表示する条件を満たしているかどうかを判定する
   */
  const checkUrl = useCallback(() => {
    for (const term of termList) {
      if (location.href.includes(term)) {
        setIsTargetUrl(true);
        return;
      }
    }
    setIsTargetUrl(false);
  }, [termList]);

  // URLの変更チェック(MutationObserver用)
  const checkMutation = useCallback(() => {
    if (beforeUrl !== location.href) {
      checkUrl();
      setBeforeUrl(location.href);
    }
  }, [beforeUrl, checkUrl]);

  useEffect(() => {
    checkUrl();

    // DOMを監視して、変更があったらURLを再チェック(SPA対応)
    const observer = new MutationObserver(checkMutation);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [beforeUrl, checkMutation, checkUrl, termList]);

  useEffect(() => {
    chrome.storage.local.get(["termList"]).then((res) => {
      if (res.termList) setTermList(res.termList);
    });
  }, []);

  return isTargetUrl ? (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "20px",
        backgroundColor: "#F44336",
        zIndex: 999,
        color: "white",
        textAlign: "center",
        lineHeight: "20px",
        fontSize: "13px",
        fontWeight: "bold",
      }}
    >
      これは本番環境です！ご安全に！
    </div>
  ) : (
    <></>
  );
}
export default WarnHeader;
