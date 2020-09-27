import React, {
  FunctionComponent,
  useEffect,
  useReducer,
  useState,
} from "react";
import styles from "./InfiniteImageGallery.module.css";

interface PhotoItem {
  id: string;
  urls: {
    regular: string;
  };
}

interface PhotosState {
  photos: PhotoItem[];
  isLoading: boolean;
  pageCount: number;
}

interface PhotosReducer {
  (state: PhotosState, action: PhotosReducerAction): PhotosState;
}

type PhotosReducerAction =
  | { type: "LOAD_IMAGES" }
  | { type: "IMAGES_LOADED"; photos: PhotoItem[] }
  | { type: "INCREMENT_PAGE" };

function buildUrl(apiKey: string, pageCount: number): string {
  return `https://api.unsplash.com/photos/?page=${pageCount}&client_id=${apiKey}`;
}

function photosReducer(
  state: PhotosState,
  action: PhotosReducerAction
): PhotosState {
  switch (action.type) {
    case "LOAD_IMAGES": {
      return { ...state, isLoading: true };
    }
    case "IMAGES_LOADED": {
      return {
        ...state,
        isLoading: false,
        photos: [...state.photos, ...action.photos],
      };
    }
    case "INCREMENT_PAGE": {
      return { ...state, isLoading: false, pageCount: state.pageCount + 1 };
    }
    default:
      return {
        isLoading: false,
        pageCount: 1,
        photos: [],
      };
  }
}

const InfiniteImageGallery: FunctionComponent = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [photosData, dispatch] = useReducer<PhotosReducer>(photosReducer, {
    isLoading: true,
    pageCount: 1,
    photos: [],
  });

  useEffect(() => {
    const key = localStorage.getItem("api_key");
    setApiKey(key || "");
  }, []);

  useEffect(() => {
    dispatch({ type: "LOAD_IMAGES" });
    if (!!apiKey) {
      fetch(buildUrl(apiKey, photosData.pageCount))
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "IMAGES_LOADED", photos: data });
        });
    }
  }, [apiKey, photosData.pageCount]);

  const handleSetApiKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setApiKey(data);
    localStorage.setItem("api_key", data);
  };

  const { photos, isLoading } = photosData;

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

      <div className={styles["footer"]}>
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          <button
            className={styles["view-more-btn"]}
            onClick={() => dispatch({ type: "INCREMENT_PAGE" })}
          >
            View More
          </button>
        )}
      </div>
    </div>
  );
};

export default InfiniteImageGallery;
