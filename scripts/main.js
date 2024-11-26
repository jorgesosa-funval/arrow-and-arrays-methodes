import data from "./data.js"
const filterOptions = document.querySelector('#filter-options')
const optionList = document.querySelector('#option-list')
// utiliza filter y realiza un filtro que muestre todos los libros cuya cantidad de pagina sea menor a 220 - bryan
function filtrar() {
    let books = data.filter((book) => book.pageCount < 220)
    console.log(books);
    return books
}


// utiliza (map-foreach) y muestra todas las categorias de libros que hay en el array sin repetir ninguna categoria - victor

function categories() {
    const ct = []
    data.forEach((libro) => {
        libro.categories.forEach((category) => {
            if (!ct.includes(category)) {
                ct.push(category)
            }
        })
    })
    loadFilterOptions(ct)
}
categories()

function loadFilterOptions(value) {
    optionList.innerHTML = ""
    value.forEach((element) =>{
        const itemtemplate = `
            <li class="list-group-item">${element}</li>
        `
        optionList.innerHTML += itemtemplate
    })  
}


// (map-foreach) Muestra todos los autores disponible en el array data sin repetir ninguno - guillermo
function autor() {
    const ct = []
    data.forEach((autor) => {
        autor.authors.forEach((autores) => {
            if (!ct.includes(autores)) {
                ct.push(autores)
            }

        })
    })
   loadFilterOptions(ct)
}


// // utiliza el metodo find y muestra un libro por su titulo - param titulo  -luis 
function findByTitle(titulo) {
    const encontrado = data.find((element) => element.title.toLowerCase() === titulo.toLowerCase())
    return encontrado;
}



/* const encontrado = findByTitle(prompt("Cual es el titulo que buscas?")) */
const encontrado = findByTitle("Android in Action, Second Edition")





// utiliza filter y muestra los libros que pertenezca a una categoria especifica - param: categoria - omner
function filtrarCategorias(category) {
    const categorias = data.filter((categoria) => categoria.categories.includes(category))
    console.log(categorias);

}


// utiliza filter y muestra los libros que le pertenezcan a un autor - param: autor - gustavo

function filterAutor(author) {
    let results = data.filter((element) => element.authors.includes(author));
    console.log(results);
    return autor
}
// filterAutor("W. Frank Ableson")

// utiliza findIndex y muestra el index del libro por su Id - param: id - moisesC


function miId(id) {
    const indexbook = data.findIndex((libro) => libro["_id"] === id)
    console.log(indexbook);
    return indexbook
}


filterOptions.addEventListener('change', (e) => {
    const value = e.target.value

    if(value=== 'categorias'){
        categories()
    }else{
        autor()
    }
})