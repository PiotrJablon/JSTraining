{
// Get elements //

  const booksListWrapper = document.querySelector('.books-list');
  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  const filtersWrapper = document.querySelector('.filters');

  const favoriteBooks = [];
  const filters = [];

  // Functions //

  function render(){
    for (let book of dataSource.books){
      const generatedHTML = template(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      booksListWrapper.appendChild(element);
    }
  }

  function filterBooks(){
    for (let book of dataSource.books){
      const hiddenBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
      let shouldBeHidden = false;
      for(let filter of filters){
        if(book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      if(shouldBeHidden){
        hiddenBook.classList.add('hidden')
      } else {
        hiddenBook.classList.remove('hidden')
      }
    }
  }

  function initActions(){
    booksListWrapper.addEventListener('dblclick', function(event){
      event.preventDefault();
      const bookId = event.target.offsetParent.getAttribute('data-id');
      if (!event.target.offsetParent.classList.contains('favorite')){
        event.target.offsetParent.classList.add('favorite');
        favoriteBooks.push(bookId);
      } else {
        event.target.offsetParent.classList.remove('favorite');
        favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
      }
    });
    filtersWrapper.addEventListener('click', function(event){
      const clickedElement = event.target;
      if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter'){
        if (clickedElement.checked){
          filters.push(clickedElement.value)
          console.log(filters)
          filterBooks();
        } else {
          filters.splice(filters.indexOf(clickedElement.value), 1);
          console.log(filters)
          filterBooks();
        }
      }
    });
  }

  render();
  initActions();
}
