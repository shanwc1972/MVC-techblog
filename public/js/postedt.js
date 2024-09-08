const posteditFormHandler = async (event) => {
    event.preventDefault();
  
    const id = document.querySelector('#postedit-id').value.trim();
    const title = document.querySelector('#postedit-title').value.trim();
    const content = document.querySelector('#postedit-content').value.trim();
  
    if (title && content) {
        const JSONBody = JSON.stringify({ title, content });
        console.log(JSONBody);
        const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSONBody,
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.postedit-form')
  .addEventListener('submit', posteditFormHandler);