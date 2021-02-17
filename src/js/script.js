{

  class BooksList{
    constructor(){
      const thisBookList = this;

      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initActions();
    }

    initData(){
      const thisBookList = this;

      thisBookList.data = dataSource.books;
    }

    getElements(){
      const thisBookList = this;

      thisBookList.wrapper = document.querySelector('.books-list');
      thisBookList.template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
      thisBookList.filtersWrapper = document.querySelector('.filters');

      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];
    }

    render(){
      const thisBookList = this;

      for (let book of thisBookList.data){
        book.ratingBgc = thisBookList.determineRatingBgc(book.rating);
        book.ratingWidth = parseInt(book.rating * 10);
        const generatedHTML = thisBookList.template(book);
        const element = utils.createDOMFromHTML(generatedHTML);
        thisBookList.wrapper.appendChild(element);
      }
    }

    filterBooks(){
      const thisBookList = this;

      for (let book of dataSource.books){
        const hiddenBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
        let shouldBeHidden = false;
        for (let filter of thisBookList.filters){
          if (book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden){
          hiddenBook.classList.add('hidden');
        } else {
          hiddenBook.classList.remove('hidden');
        }
      }
    }

    initActions(){
      const thisBookList = this;

      thisBookList.wrapper.addEventListener('dblclick', function(event){
        event.preventDefault();
        const bookId = event.target.offsetParent.getAttribute('data-id');
        if (!event.target.offsetParent.classList.contains('favorite')){
          event.target.offsetParent.classList.add('favorite');
          thisBookList.favoriteBooks.push(bookId);
        } else {
          event.target.offsetParent.classList.remove('favorite');
          thisBookList.favoriteBooks.splice(thisBookList.favoriteBooks.indexOf(bookId), 1);
        }
      });
      thisBookList.filtersWrapper.addEventListener('click', function(event){
        const clickedElement = event.target;
        if (clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter'){
          if (clickedElement.checked){
            thisBookList.filters.push(clickedElement.value);
            thisBookList.filterBooks();
          } else {
            thisBookList.filters.splice(thisBookList.filters.indexOf(clickedElement.value), 1);
            thisBookList.filterBooks();
          }
        }
      });
    }

    determineRatingBgc(rating){

      let bgc = '';
      if (rating < 6){
        bgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      }
      if (rating > 6 && rating <= 8){
        bgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      }
      if (rating > 8 && rating <= 9){
        bgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      }
      if (rating > 9){
        bgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
      return bgc;
    }
  }

  const app = {
    init: function(){
      new BooksList();
    }
  };
  app.init();
}
