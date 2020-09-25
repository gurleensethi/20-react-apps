import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "./InfiniteImageGallery.module.css";

interface PhotoItem {
  id: string;
  urls: {
    regular: string;
  };
}

const URL = "https://api.unsplash.com/photos/?client_id=";

const InfiniteImageGallery: FunctionComponent = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [photos, setPhotos] = useState<PhotoItem[]>([]);

  useEffect(() => {
    const key = localStorage.getItem("api_key");
    setApiKey(key || "");
  }, []);

  useEffect(() => {
    if (!!apiKey) {
      fetch(URL + apiKey)
        .then((res) => res.json())
        .then((data) => {
          setPhotos(data);
        });
    }
  }, [apiKey]);

  const handleSetApiKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setApiKey(data);
    localStorage.setItem("api_key", data);
  };

  return (
    <div className={styles.app}>
      <div className={styles["top-bar"]}>
        <button className={styles["enter-api-key-btn"]}>
          Enter Unsplash API Key
        </button>
        <div className={styles["api-key-form"]}>
          <form>
            <input
              type="text"
              placeholder="Enter api key"
              onChange={handleSetApiKey}
              value={apiKey}
            />
          </form>
        </div>
      </div>

      <h1>Unsplash Image Gallery</h1>

      <form>
        <input type="text" placeholder="Search unsplash..." />
        <button>Search</button>
      </form>

      <div className={styles["image-grid"]}>
        {photos.map(({ urls: { regular } }, index) => (
          <div className={styles.image} key={index}>
            <img src={regular} alt="Sample" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteImageGallery;
