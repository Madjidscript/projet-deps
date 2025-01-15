function loadContent(page, event) {
    event.preventDefault();

    // Supprimer la classe active de tous les liens
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => link.classList.remove('active'));

    // Ajouter la classe active au lien cliqué
    event.target.classList.add('active');

    // Charger le contenu depuis la page spécifiée
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById('main-content').innerHTML = data;
        })
        .catch(error => {
            console.error('Erreur lors du chargement du contenu :', error);
            document.getElementById('main-content').innerHTML = '<p>Erreur lors du chargement du contenu.</p>';
        });
}