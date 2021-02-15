{
// Get elements //

  booksList = document.querySelector('.books-list');
  template = Handlebars.compile(document.querySelector('#template-book').innerHTML);

// Functions //

  function render(){
    for (let book of dataSource.books){
      console.log(dataSource.books)
      generatedHTML = template(dataSource.books);
      element = utils.createDOMFromHTML(generatedHTML);
      console.log(generatedHTML)
      console.log(element)
      booksList.appendChild(element);
    }
  }

  render();
}
