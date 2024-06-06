document.getElementById('toggleSenha').addEventListener('click', function() {
    var senhaInput = document.getElementById('senha');
    var olhoIcon = document.getElementById('olhoIcon');
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        olhoIcon.classList.remove('far', 'fa-eye');
        olhoIcon.classList.add('fas', 'fa-eye-slash');
    } else {
        senhaInput.type = 'password';
        olhoIcon.classList.remove('fas', 'fa-eye-slash');
        olhoIcon.classList.add('far', 'fa-eye');
    }
});