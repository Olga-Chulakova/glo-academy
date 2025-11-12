const booksContainer = document.querySelector('.books');
const books = document.querySelectorAll('.book');
const body = document.querySelector('body');
const titleBook3 = books[4];
const adv = document.querySelector('.adv')

/* 1. Восстановить порядок книг */

booksContainer.prepend(books[1]);
booksContainer.append(books[0]);
booksContainer.append(books[4]);
booksContainer.append(books[3])
booksContainer.append(books[5]); 
booksContainer.append(books[2]);

/* 2. Заменить картинку заднего фона на другую из папки image*/ 

body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

/* 3. Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")*/

const link = titleBook3.querySelector('h2 a')
link.innerHTML = 'Книга 3. this и <strong>Прототипы</strong> Объектов';

/* 4. Удалить рекламу со страницы*/

adv.remove();

/* 5. Восстановить порядок глав во второй и пятой книге*/

const book2 = Array.from(books).find(book => 
    book.querySelector('h2').textContent.includes('Книга 2')
);

const itemsBook2 = book2.querySelectorAll('ul li')

itemsBook2[1].after(itemsBook2[3])
itemsBook2[3].after(itemsBook2[6])
itemsBook2[6].after(itemsBook2[8])
itemsBook2[8].after(itemsBook2[4])
itemsBook2[9].after(itemsBook2[2])

const book5 = Array.from(books).find(book => 
    book.querySelector('h2').textContent.includes('Книга 5')
);

const itemsBook5 = book5.querySelectorAll('ul li')

itemsBook5[1].after(itemsBook5[9])
itemsBook5[9].after(itemsBook5[3])
itemsBook5[3].after(itemsBook5[4])
itemsBook5[7].after(itemsBook5[5])

/* 6. В шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место*/

const book6 = Array.from(books).find(book => 
    book.querySelector('h2').textContent.includes('Книга 6')
);

const itemsBook6 = book6.querySelectorAll('ul li')

const chapter8 = document.createElement('li')
chapter8.textContent = "Глава 8: За пределами ES6"
itemsBook6[8].append(chapter8);



