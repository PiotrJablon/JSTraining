{
// Get elements //

  booksList = document.querySelector('.books-list');
  template = Handlebars.compile(document.querySelector('#template-book').innerHTML);

  const favoriteBooks = [];

// Functions //

  function render(){
    for (let book of dataSource.books){
      generatedHTML = template(book);
      element = utils.createDOMFromHTML(generatedHTML);
      booksList.appendChild(element);
    }
  }

  function initActions(){
    const bookImage = booksList.querySelectorAll('.book__image');
    for (let book of bookImage){
      book.addEventListener('dblclick', function(event){
        event.preventDefault();
        const bookId = book.getAttribute('data-id');
        if (!book.classList.contains('favorite')){
          book.classList.add('favorite');
          favoriteBooks.push(bookId);
        } else {
          book.classList.remove('favorite');
          favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
        }
        console.log(favoriteBooks)
      });
    }
  }

  render();
  initActions();
}
