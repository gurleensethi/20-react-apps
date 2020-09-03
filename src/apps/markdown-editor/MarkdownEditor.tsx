import React, { FunctionComponent, useState, useCallback, useRef } from "react";
import styles from "./MarkdownEditor.module.css";
import marked from "marked";

const MarkdownEditor: FunctionComponent = () => {
  const [markdown, setMarkdown] = useState<string>("# sup");
  const previewRef = useRef<HTMLDivElement | null>(null);
  const markdownRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      setMarkdown(value);
    },
    [setMarkdown]
  );

  const handlePreviewScrollPosition = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      if (previewRef.current && markdownRef.current) {
        markdownRef.current.scrollTop = previewRef.current.scrollTop;
      }
    },
    []
  );

  const handleMarkdownScrollPosition = useCallback(
    (e: React.UIEvent<HTMLTextAreaElement, UIEvent>) => {
      if (previewRef.current && markdownRef.current) {
        previewRef.current.scrollTop = markdownRef.current.scrollTop;
      }
    },
    []
  );

  return (
    <div className={styles.app}>
      <textarea
        ref={markdownRef}
        onChange={handleTextChange}
        value={markdown}
        onScroll={handleMarkdownScrollPosition}
      />
      <div
        className={styles.preview}
        ref={previewRef}
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        onScroll={handlePreviewScrollPosition}
      />
    </div>
  );
};

export default MarkdownEditor;
