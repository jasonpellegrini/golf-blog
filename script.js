window.onload = initializeApp;


function initializeApp() {
  var postBtn = document.getElementById('postBtn');
  var postModal = new bootstrap.Modal(document.getElementById('postModal'));
  var modalForm = document.getElementById('modalForm');
  var mainContainer = document.getElementById('mainContainer');



  postBtn.addEventListener('click', function(event) {
    event.preventDefault();
    postModal.show();
  });



  modalForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var course = document.getElementById('courseName').value;
    var holes = document.getElementById('holesPlayed').value;
    var score = document.getElementById('score').value;
    var greens = document.getElementById('greensHit').value;
    var fairways = document.getElementById('fairwaysHit').value;
    var comments = document.getElementById('comments').value;

    if (course && holes && score) {
      var newPost = createPostCard(course, holes, score, greens, fairways, comments);
      mainContainer.appendChild(newPost);

      modalForm.reset();
      postModal.hide();
      updateNoPostsMessage();
    }
  });
}



function updateNoPostsMessage() {
  var noPostsMessage = document.getElementById('noPostsMessage');
  noPostsMessage.style.display = 'none';
}


function createPostCard(course, holes, score, greens, fairways, comments) {
  var card = document.createElement('div');
  card.className = 'card postCard mb-3';


  var cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  var html = `
    <h5 class="card-title">${course}</h5>
    <p class="card-text">
      <strong>Holes Played:</strong> ${holes}<br>
      <strong>Score:</strong> ${score}<br>
      ${greens !== "" ? `<strong>Greens Hit:</strong> ${greens}<br>` : ""}
      ${fairways !== "" ? `<strong>Fairways Hit:</strong> ${fairways}<br>` : ""}
      ${comments !== "" ? `<strong>Comments:</strong> ${comments}` : ""}
    </p>
  `;

  
  cardBody.innerHTML = html;
  card.appendChild(cardBody);

  return card;
}
