const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#new-comment').value.trim();
    const postId = document.querySelector('#postid').value.trim();
  
    if (content && postid) {
        const JSONBody = JSON.stringify({ content, postId });
        const response = await fetch(`/comments`, {
        method: 'POST',
        body: JSONBody,
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
    //alert('This function is not fully implemented at this time');
  };

document
  .querySelector('.addcomment-form')
  .addEventListener('submit', commentFormHandler);