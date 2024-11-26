import data from "./data.js"
const filterOptions = document.querySelector('#filter-options')
const optionList = document.querySelector('#option-list')
const searchFilter = document.querySelector('#search-filter')
const bookElement = document.querySelector('#book-list')
const loadMore = document.querySelector('#load-more')
const searchBook = document.querySelector('#search-book')
const categoryList = categories()
const authorList = authors()


let selectedFilter = 'categorias'
let loadLimit = 10

function filtrar() {
    let books = data.filter((book) => book.pageCount < 220)
    console.log(books);
    return books
}

function categories() {
    const ct = []
    data.forEach((libro) => {
        libro.categories.forEach((category) => {
            if (!ct.includes(category)) {
                ct.push(category)
            }
        })
    })
    return ct
}

/**
 * Itera el array y muestra los resultado en la lista para los filtros
 * @param {Array} value 
 */
function loadFilterOptions(value) {
    optionList.innerHTML = ""
    value.forEach((element) => {
        const itemtemplate = `
            <li class="list-group-item">${element}</li>
        `
        optionList.innerHTML += itemtemplate
    })
}

/**
 * Itera el array y muestra los resultado en la lista de libros
 * @param {Array} value 
 */
function loadBooks(value) {
    bookElement.innerHTML = ""
    value.slice(0,loadLimit).forEach((book) => {
        const {_id, title ,thumbnailUrl ,shortDescription } = book
        const itemtemplate = `
             <div class="col" id="${_id}" >
                <div class="card">
                    <img src="${thumbnailUrl}" class="card-img-top object-fit-cover" alt="${title}" height="260">
                    <div class="card-body" style="height: 160px;">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${""}</p>
                    </div>
                </div>
            </div>
        `
        bookElement.innerHTML += itemtemplate
    })
}

function authors() {
    const ats = []
    data.forEach((autor) => {
        autor.authors.forEach((autores) => {
            if (!ats.includes(autores)) {
                ats.push(autores)
            }

        })
    })
    return ats
}

function findByTitle(titulo) {
    const encontrado = data.find((element) => element.title.toLowerCase() === titulo.toLowerCase())
    return encontrado;
}

function filtrarCategorias(category) {
    const categorias = data.filter((categoria) => categoria.categories.includes(category))
    console.log(categorias);

}

function filterAutor(author) {
    let results = data.filter((element) => element.authors.includes(author));
    return results
}

function miId(id) {
    const indexbook = data.findIndex((libro) => libro["_id"] === id)
    console.log(indexbook);
    return indexbook
}

filterOptions.addEventListener('change', (e) => {
    const value = e.target.value

    if (value === 'categorias') {
        selectedFilter = 'categorias'
        loadFilterOptions(categoryList)
    } else {
        selectedFilter = 'autores'
        loadFilterOptions(authorList)
    }
})

searchFilter.addEventListener('input', (e) => {
    const value = e.target.value

    if (selectedFilter === 'categorias') {
        const filteredCategories = categoryList.filter((category) => {
            return category.toLowerCase().includes(value.toLowerCase())
        })
        loadFilterOptions(filteredCategories)
    } else {
        const filteredAuthors = authorList.filter((author) => {
            return author.toLowerCase().includes(value.toLowerCase())
        })
        loadFilterOptions(filteredAuthors)
    }
})

loadMore.addEventListener('click', ()=>{
    loadLimit+=10
    loadBooks(data)
})

loadFilterOptions(categoryList)
loadBooks(data)