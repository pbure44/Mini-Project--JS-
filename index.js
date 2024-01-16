const main = document.createElement('main');
document.body.append(main);
fetch('https://jsonplaceholder.typicode.com/users')
  .then(value => value.json())
  .then(users => {
    console.log(users);
    for (const user of users) {
      let div = document.createElement('div');
      div.innerHTML = `<p>User ID: ${user.id}</p> <p>User Name: ${user.name}</p>`;
      div.className = 'cl-index-div';
      div.id = 'index-div';
      let button = document.createElement('button');
      button.innerHTML = '<a href="user-details.html">User Details</a>'
      button.addEventListener('click', () => sessionStorage.setItem('userID', user.id))
      button.className = 'index-btn';
      div.appendChild(button);
      main.append(div);

    }
  })
