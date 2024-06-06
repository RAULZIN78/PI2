// Array para armazenar os posts
let posts = [];

// Função para adicionar um novo post
function addPost(author, text) {
    posts.push({
        id: Date.now(),
        author: author,
        text: text,
        replies: []
    });
    renderPosts();
}

// Função para renderizar os posts
function renderPosts() {
    const postContainer = document.getElementById('postContainer');
    postContainer.innerHTML = '';

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        // Autor do post com ícone
        const authorText = document.createElement('p');
        authorText.style.fontWeight = 'bold';
        authorText.innerHTML = `<img class="icone-customizado" src="img/usuarioIcone.png"> ${post.author}`;
        postDiv.appendChild(authorText);


        // Texto do post
        const postText = document.createElement('p');
        postText.textContent = post.text;
        postDiv.appendChild(postText);

        // Div para os botões de editar e excluir
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button-container');

        // Botões para editar e excluir post
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('btn', 'btn-primary', 'edit-btn');
        editButton.addEventListener('click', () => editPost(post.id));
        buttonDiv.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('btn', 'btn-danger', 'delete-btn');
        deleteButton.addEventListener('click', () => deletePost(post.id));
        buttonDiv.appendChild(deleteButton);

        postDiv.appendChild(buttonDiv);

        // Formulário para responder ao post
        const replyForm = document.createElement('form');
        replyForm.innerHTML = `
            <textarea class="replyText form-control" placeholder="Responda a este post"></textarea>
            <br>
            <button type="submit" class="btn btn-primary">Responder</button>
        `;
        replyForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const replyText = replyForm.querySelector('.replyText').value;
            addReply(post.id, replyText);
        });
        postDiv.appendChild(replyForm);

        // Mostrar as respostas
        post.replies.forEach(reply => {
            const replyDiv = document.createElement('div');
            replyDiv.classList.add('reply');
            const replyText = document.createElement('p');
            replyText.textContent = `Resposta: ${reply}`;
            replyDiv.appendChild(replyText);
            postDiv.appendChild(replyDiv);
        });

        postContainer.appendChild(postDiv);
    });
}

// Função para editar um post
function editPost(postId) {
    const newText = prompt('Digite o novo texto:');
    const post = posts.find(post => post.id === postId);
    if (post) {
        post.text = newText;
        renderPosts();
    }
}

// Função para excluir um post
function deletePost(postId) {
    posts = posts.filter(post => post.id !== postId);
    renderPosts();
}

// Função para adicionar uma resposta a um post
function addReply(postId, replyText) {
    const post = posts.find(post => post.id === postId);
    if (post) {
        post.replies.push(replyText);
        renderPosts();
    }
}

// Adiciona um event listener para o formulário de postagem
document.getElementById('postForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const author = document.getElementById('author').value;
    const postText = document.getElementById('postText').value;
    if (author.trim() !== '' && postText.trim() !== '') {
        addPost(author, postText);
        document.getElementById('author').value = '';
        document.getElementById('postText').value = '';
    }
});

