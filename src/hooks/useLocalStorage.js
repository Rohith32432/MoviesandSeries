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
        const update = items?.filter((e, index) => index != id)
        setItems(update)
        localStorage.setItem("watchlist", JSON.stringify(update));
    }
    useEffect(() => {
        const storedItems = localStorage.getItem("watchlist");
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        }
    }, []);

    return { items, save, remove };
}
