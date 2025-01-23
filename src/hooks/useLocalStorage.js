import { useEffect, useState } from "react";

export function useLocalStorage() {
    const [items, setItems] = useState([]);
    function save(key, value) {
        setItems(prevItems => {
            const updatedItems = [...prevItems, value];
            localStorage.setItem(key, JSON.stringify(updatedItems));
            return updatedItems;
        });
    }
    function remove(id) {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems)
        localStorage.setItem("watchlist", JSON.stringify(updatedItems));
    }
    useEffect(() => {
        const storedItems = localStorage.getItem("watchlist");
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        }
    }, []);

    return { items, save, remove };
}
