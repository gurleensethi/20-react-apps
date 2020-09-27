import React, {
  FunctionComponent,
  useEffect,
  useReducer,
  useRef,
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
  | { type: "IMAGES_LOADED"; photos: { results: PhotoItem[] } }
  | { type: "IMAGES_LOADED_NEXT_PAGE"; photos: { results: PhotoItem[] } }
  | { type: "INCREMENT_PAGE" }
  | { type: "RESET_PAGE" };

function buildUrl(apiKey: string, pageCount: number, query: string): string {
  return `https://api.unsplash.com/search/photos/?page=${pageCount}&client_id=${apiKey}&query=${query}`;
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
        photos: action.photos.results,
      };
    }
    case "IMAGES_LOADED_NEXT_PAGE": {
      return {
        ...state,
        isLoading: false,
        photos: [...state.photos, ...action.photos.results],
      };
    }
    case "INCREMENT_PAGE": {
      return { ...state, isLoading: false, pageCount: state.pageCount + 1 };
    }
    case "RESET_PAGE": {
      return {
        ...state,
        pageCount: 0,
      };
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
  const [query, setQuery] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [photosData, dispatch] = useReducer<PhotosReducer>(photosReducer, {
    isLoading: false,
    pageCount: 1,
    photos: [],
  });

  useEffect(() => {
    const key = localStorage.getItem("api_key");
    setApiKey(key || "");
  }, []);

  const loadImages = (query: string) => {
    dispatch({ type: "LOAD_IMAGES" });
    dispatch({ type: "RESET_PAGE" });
    if (!!apiKey) {
      fetch(buildUrl(apiKey, 0, query))
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "IMAGES_LOADED", photos: data });
        });
    }
  };

  const loadNextPage = (query: string) => {
    dispatch({ type: "LOAD_IMAGES" });
    if (!!apiKey) {
      fetch(buildUrl(apiKey, photosData.pageCount, query))
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "IMAGES_LOADED_NEXT_PAGE", photos: data });
        });
    }
  };

  const handleSetApiKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setApiKey(data);
    localStorage.setItem("api_key", data);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      loadImages(query);
    }, 300);
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

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search unsplash..."
          onChange={handleSearch}
          value={query}
        />
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
        {!isLoading && !!photos.length && (
          <button
            className={styles["view-more-btn"]}
            onClick={() => loadNextPage(query)}
          >
            View More
          </button>
        )}
      </div>
    </div>
  );
};

export default InfiniteImageGallery;
