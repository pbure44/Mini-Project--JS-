let userID = +sessionStorage.getItem('userID');
console.log('transferred user ID: ', userID);

let title = document.createElement('h2')
title.innerText = 'User details';
document.body.append(title);
fetch('https://jsonplaceholder.typicode.com/users')
  .then(value => value.json())
  .then(users => {
    for (const user of users) {
      if (user.id === userID) {
        console.log(user);
        const div = document.createElement('div');
        console.log(div);
        flatter(user, div);
        document.body.append(div);
        div.className = 'user-details-div';
        createPostsButton(userID);
      }
    }
  })


function createPostsButton(userID) {

  let button = document.createElement('button');
  button.innerText = 'Post of current user';
  button.className = 'user-details-btn';
  button.id = 'posts-btn';
  button.addEventListener('click', () => {showPostsTitles(userID)},{once:true});
  document.body.append(button);

}

function showPostsTitles(userID) {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(value => value.json())
    .then(users => {
      for (const user of users) {
        if (user.id === userID) {
          let section = document.createElement('section');
          fetch("https://jsonplaceholder.typicode.com/posts?postId=" + user.id)
            .then(value => value.json())
            .then(posts => {
              for (const post of posts) {
                if (post.userId === userID) {
                  let div = document.createElement('div');
                  div.innerHTML = `<h4>Post title:</h4><p>${post.title}</p>`;
                  div.id = 'post-title-div';
                  createPostDetailsButton(post.id, div);
                  section.appendChild(div);
                  document.body.append(section);
                }
              }
            })
        }
      }
    })
}

function createPostDetailsButton(postID, div) {
  let button = document.createElement('button');
  button.className = 'user-details-btn';
  button.id = 'post-details-btn';
  button.innerText = 'Button';
  button.innerHTML = '<a href="post-details.html">Post Details</a>'
  button.addEventListener('click', () => sessionStorage.setItem('postID', postID));
  div.append(button);
}


function flatter(obj, divElement) {
  console.log(divElement);
  for (const key in obj) {
    console.log(key);
    console.log(obj[key]);
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      flatter(obj[key], divElement);
    } else {
      const p = document.createElement('p');
      p.innerHTML = `<h4>${key}: ${obj[key]}</h4>`;
      divElement.appendChild(p);
    }
  }
}
