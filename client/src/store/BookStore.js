import {makeAutoObservable} from "mobx";

export default class BookStore {
    constructor() {
        this._authors = []
        this._books = []
        this._janrs = []
        this._orders = []
        this._selectedJanr = {} 
        this._selectedAuthor = {}
        this._selectedBook = null;
        this._page=1
        this._totalCount=0
        this._limit=3
        makeAutoObservable(this) 
    }

    setAuthors(authors) {
        this._authors = authors
    }
    setBooks(books) {
        this._books = books
    }
    setJanrs(janrs) {
        this._janrs = janrs
    }
    setOrders(orders){
        this._orders = orders
    }
    setSelectedJanr(janr) {
        this.setPage(1)
        this._selectedJanr = janr
    }
    setSelectedAuthor(author) {
        this.setPage(1)
        this._selectedAuthor = author
    }
    setSelectedBook(book){
        this._selectedBook=book
    }
    setLimit(limit){
        this._limit = limit
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    get books() {
        return this._books
    }
    get orders() {
        return this._orders
    }
    get janrs() {
        return this._janrs
    }
    get authors() {
        return this._authors
    }
    get selectedJanr() {
        return this._selectedJanr
    }
    get selectedBook(){
        return this._selectedBook
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}