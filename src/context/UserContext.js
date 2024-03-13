import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';

const MainContext = createContext();

function UserContext({ children }) {
    const [watchlist, setwatchlist] = useState([]);

    useEffect(() => {
        if (watchlist.length > 0) {
            const filteredWatchlist = watchlist.filter(
                (e, i) => watchlist.indexOf(e) === i
            );
            if (filteredWatchlist.length !== watchlist.length) {
                setwatchlist(filteredWatchlist);
                console.log(filteredWatchlist);
            }
        }
    }, [watchlist]);

    return (
        <MainContext.Provider value={{ watchlist, setwatchlist }}>
            {children}
        </MainContext.Provider>
    );
}

export const UserGlobal = () => {
    return useContext(MainContext);
};

export default UserContext;
