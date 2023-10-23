import { useEffect, useState } from "react";

export function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setLoading(false);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay, loading]);

  return { debouncedValue, loading };
}

export function useClickOutside(ref: any, callback: () => void) {
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
}

export function usePagination<T>({
  loadMoreFn,
  pageSize = 10,
  initialPage = 1,
}: {
  loadMoreFn: (...args: any[]) => Promise<T[]>;
  pageSize?: number;
  initialPage?: number;
}) {
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState<T[]>([]);

  async function loadMore() {
    if (!hasMore) return;
    if (loading) return;

    setLoading(true);

    const newItems = await loadMoreFn(page, pageSize);

    if (newItems.length < pageSize) {
      setHasMore(false);
    }

    // setItems((prev) => [...prev, ...newItems]);

    setLoading(false);
    // setPage((prev) => prev + 1);
  }

  useEffect(() => {
    loadMore();
  }, []);

  return {
    page,
    setPage,
    loading,
    hasMore,
    items,
    loadMore,
  };
}

export function useLocalStorage<T>(keyName: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(initialValue));
        return initialValue;
      }
    } catch (err) {
      return initialValue;
    }
  });

  function setValue(newValue: T) {
    const store = () => {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
      setStoredValue(newValue);
    };

    try {
      store();
    } catch (err) {
      if (err === "QUOTA_EXCEEDED_ERR") {
        window.localStorage.clear();
        store();
      }
    }
  }

  return { storedValue, setValue };
}