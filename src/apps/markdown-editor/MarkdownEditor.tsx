import React, { FunctionComponent, useState, useCallback, useRef } from "react";
import styles from "./MarkdownEditor.module.css";
import marked from "marked";

const MarkdownEditor: FunctionComponent = () => {
  const [markdown, setMarkdown] = useState<string>("# sup");

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      setMarkdown(value);
    },
    [setMarkdown]
  );

  console.log(marked(markdown));

  return (
    <div className={styles.app}>
      <textarea onChange={handleTextChange} value={markdown} />
      <div
        className={styles.preview}
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
      />
    </div>
  );
};

export default MarkdownEditor;
