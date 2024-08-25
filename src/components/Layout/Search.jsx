import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const nav = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            nav(`/?keyword=${keyword}`)
        } else {
            nav('/')
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        id="search_field"
                        aria-describedby="search_btn"
                        className="form-control"
                        placeholder="Enter Product Name ..."
                        name="keyword"
                        value={keyword}
                        onChange={(e) => { setKeyword(e.target.value) }}
                    />
                    <button id="search_btn" className="btn" type="submit">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Search
