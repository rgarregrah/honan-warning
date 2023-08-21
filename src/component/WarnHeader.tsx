import { useEffect, useState } from "react";

function WarnHeader() {
  const [termList, setTermList] = useState<string[]>([]);
  const [isTargetUrl, setIsTargetUrl] = useState<boolean>(false);

  useEffect(() => {
    for (const term of termList) {
      if (location.href.includes(term)) {
        setIsTargetUrl(true);
        return;
      }
    }
  }, [termList]);

  useEffect(() => {
    chrome.storage.local.get(["termList"]).then((res) => {
      if (res.termList) setTermList(res.termList);
    });
  }, []);

  return (
    isTargetUrl ? (
      <div className="warn-header">これは本番環境です！ご安全に！</div>
    ) : <></>
  );
}
export default WarnHeader;
