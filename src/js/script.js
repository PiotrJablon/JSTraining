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
        book.classList.add('favorite');
        const bookId = book.getAttribute('data-id');
        favoriteBooks.push(bookId);
      });
    }
  }

  render();
  initActions();
}
