document.addEventListener('DOMContentLoaded', function() {
  const postBtn = document.getElementById('postBtn');
  const postModal = new bootstrap.Modal(document.getElementById('postModal'));
  const modalForm = document.getElementById('modal-form');
  const mainContainer = document.getElementById('main-container');

  // Open modal when post button is clicked
  postBtn.addEventListener('click', function(event) {
    event.preventDefault();
    postModal.show();
  });

  function updateNoPostsMessage() {
    const mainContainer = document.getElementById('main-container');
    const noPostsMessage = document.getElementById('no-posts-message'); 
    noPostsMessage.style.display = 'none';
  }
  

  // Create post card
  function createPostCard(course, holes, greens, fairways, comments) {
    const card = document.createElement('div');
    card.className = 'card post-card';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let html = `
      <h5 class="card-title">${course}</h5>
      <p class="card-text">
        <strong>Holes Played:</strong> ${holes}<br>
        ${greens !== "" ? `<strong>Greens Hit:</strong> ${greens}<br>` : ""}
        ${fairways !== "" ? `<strong>Fairways Hit:</strong> ${fairways}<br>` : ""}
        ${comments !== "" ? `<strong>Comments:</strong> ${comments}` : ""}
      </p>
    `;

    cardBody.innerHTML = html;
    card.appendChild(cardBody);

    return card;
  }

  // Handle form submit
  modalForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const course = document.getElementById('courseName').value.trim();
    const holes = document.getElementById('holesPlayed').value;
    const greens = document.getElementById('greensHit').value.trim();
    const fairways = document.getElementById('fairwaysHit').value.trim();
    const comments = document.getElementById('comments').value.trim();

    if (course && holes) {
      const newPost = createPostCard(course, holes, greens, fairways, comments);
      mainContainer.appendChild(newPost);

      modalForm.reset();
      postModal.hide();
      updateNoPostsMessage();

    }
  });
});
