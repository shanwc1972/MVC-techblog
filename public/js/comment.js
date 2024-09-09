const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#new-comment').value.trim();
    const postId = document.querySelector('#postid').value.trim();
  
    if (content && postId) {
        const JSONBody = JSON.stringify({ content, postId });
        const response = await fetch(`/comments`, {
        method: 'POST',
        body: JSONBody,
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else if (response.status === 401) {
        document.location.replace('/login');
      } else {
        alert(response.statusText);
      }
    }
  };

document
  .querySelector('.addcomment-form')
  .addEventListener('submit', commentFormHandler);