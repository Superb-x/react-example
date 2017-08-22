import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import '_/styles/index.scss'

import Author from '_/components/author'
import Category from '_/components/category'
import Book from '_/components/book'

import _header from '_/styles/header.scss'
import _menu from '_/styles/menu.scss'

function App () {
    return (
        <Router>
            <div>
                <div className={_header.container}>
                    React Example
                </div>
                <div>
                <Link to="/author">作者</Link>
                <Link to="/category">分类</Link>
                <Link to="/book">书籍</Link>
                </div>

                <div>
                <Route path="/author" component={Author} />
                <Route path="/category" component={Category} />
                <Route path="/book" component={Book} />
                </div>
            </div>
        </Router>
    )
}

export default App
