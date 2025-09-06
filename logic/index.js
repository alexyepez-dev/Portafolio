const profileUrl = 'https://api.github.com/users/alexyepez-dev'

const loadUser = async () => {
    const cachedUser = localStorage.getItem('githubUser');

    if (cachedUser) {
        // Si hay datos en localStorage, los usamos
        const data = JSON.parse(cachedUser);
        document.getElementById('avatar').src = data.avatar_url;
        document.getElementById('name').textContent = data.name;
        document.getElementById('bio').textContent = data.bio;
        return;
    }

    try {
        const response = await fetch(profileUrl);
        const data = await response.json();

        document.getElementById('avatar').src = data.avatar_url;
        document.getElementById('name').textContent = data.name;
        document.getElementById('bio').textContent = data.bio;

        // Guardar en localStorage
        localStorage.setItem('githubUser', JSON.stringify(data));
    }
    catch (error) {
        console.error(`Error al cargar usuario: ${error}`);
    }
}

const repositoryUrl = 'https://api.github.com/users/alexyepez-dev/repos';

const loadRepos = async () => {
    const reposContainer = document.getElementById('repos');
    const cachedRepos = localStorage.getItem('githubRepos');

    if (cachedRepos) {
        displayRepos(JSON.parse(cachedRepos));
        return;
    }

    try {
        const response = await fetch(repositoryUrl);

        const data = await response.json();

        if (data.length === 0) {
            reposContainer.innerHTML = '<p>No hay repositorios</p>';
        }

        reposContainer.innerHTML =
            data.map(r => `
                <h5>${r.name}</h5>

                <p>${r.description}</p>

                <a 
                href="https://github.com/alexyepez-dev/Vmt-Ecommerce-Fullstack" 
                class="btn btn-primary" 
                target="_blank"
                >
                Ir al repositorio
                </a>`);

        // Guardar en localStorage
        localStorage.setItem('githubRepos', JSON.stringify(data));
    }
    catch (error) {
        reposContainer.innerHTML = '<p>No se pudieron cargar los repositorios</p>';
    }
}

const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');

// Abrir/cerrar sidebar al presionar botón
menuBtn.addEventListener('click', (e) => {
    sidebar.classList.toggle('active');
    e.stopPropagation(); // evita que se cierre inmediatamente
});

// Cerrar sidebar al hacer click fuera
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
});

// Evitar que clicks dentro del sidebar cierren el menú
sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
});

const form = document.querySelector('#contacto form');
const successMsg = document.getElementById('success-msg');

// form.addEventListener('submit', () => {
//     successMsg.style.display = 'block';
// });

loadUser();
loadRepos();

localStorage.setItem('UserUrl', profileUrl);
localStorage.setItem('RepoUrl', repositoryUrl);