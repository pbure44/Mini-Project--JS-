let postID = +sessionStorage.getItem('postID');
console.log('transferred post ID: ', postID);

let title=document.createElement('h2')
title.innerText='Post details';
document.body.append(title);
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(value => value.json())
  .then(posts => {
    for (const post of posts) {
      if (post.id === postID) {
        let postMap = new Map(Object.entries(post));
        console.log(postMap);
        let div = document.createElement('div');
        div.id='post-details';
        postMap.forEach(function (value, key) {
          let text = document.createElement('h4');
          text.innerHTML = `${key}: ${value}`;
          text.id='p-postDet';
          div.appendChild(text);
        })
        document.body.append(div);
        comments();
      }
    }
  })



function comments() {
  const details=document.createElement('details');
  details.innerHTML='<summary>Comments</summary>';
  document.body.appendChild(details);
  const article=document.createElement('article');
  details.appendChild(article);
  fetch('https://jsonplaceholder.typicode.com/comments')
    .then(value => value.json())
    .then(comments => {
      for (const comment of comments) {
        if (comment.postId === postID) {
          let div = document.createElement('div');
          div.innerHTML = `<h4>Comment:</h4><p>${comment.body}</p>`;
          div.id = 'comment';
          article.append(div);
        }
      }
    })
}
