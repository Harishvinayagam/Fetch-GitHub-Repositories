document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
            const repoList = document.getElementById('repo-list');
            repoList.innerHTML = '';
            data.forEach(repo => {
                const repoItem = document.createElement('li');
                repoItem.className = 'repo list-group-item';
                repoItem.innerHTML = `
                    <h2>${repo.name}</h2>
                    <p><strong>Description:</strong> ${repo.description || 'No description'}</p>
                    <p><strong>URL:</strong> <a href="${repo.html_url}" target="_blank">${repo.html_url}</a></p>
                    <p><strong>Language:</strong> ${repo.language || 'Not specified'}</p>
                    <p><strong>Stars:</strong> ${repo.stargazers_count}</p>
                    <p><strong>Forks:</strong> ${repo.forks_count}</p>
                `;
                repoList.appendChild(repoItem);
            });
        })
        .catch(error => console.error('Error fetching repositories:', error));
});