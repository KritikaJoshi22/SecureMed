import React, { useState } from 'react';

const SearchBar = () => {

    const [query, setQuery] = useState("")

    function search(e){
        e.preventDefault()
        setQuery(e.target.value)

        
    }

    return (
        <div className="w-full max-w-xl flex mx-auto p-20 text-xl">
            <input
                type="text"
                className="w-full placeholder-gray-400 text-gray-900 p-4"
                placeholder="Search"
                onChange={search}
                value={query}
            />
            <button className="bg-white p-4">🔍</button>
        </div>
    );
};

export default SearchBar;