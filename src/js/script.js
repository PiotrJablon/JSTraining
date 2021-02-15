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
      booksList.addEventListener('dblclick', function(event){
        event.preventDefault();
        const bookId = event.target.offsetParent.getAttribute('data-id');
        if (!event.target.offsetParent.classList.contains('favorite')){
          event.target.offsetParent.classList.add('favorite');
          favoriteBooks.push(bookId);
        } else {
          event.target.offsetParent.classList.remove('favorite');
          favoriteBooks.splice(favoriteBooks.indexOf(bookId));
        }
      });
    }
  }

  render();
  initActions();
}
