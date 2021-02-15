{
// Get elements //

  booksList = document.querySelector('.books-list');
  template = Handlebars.compile(document.querySelector('#template-book').innerHTML);

// Functions //

  function render(){
    for (let book of dataSource.books){
      generatedHTML = template(book);
      element = utils.createDOMFromHTML(generatedHTML);
      booksList.appendChild(element);
    }
  }

  render();
}
