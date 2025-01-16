$(document).ready(function () {
    // Initialisation de DataTables
    let table = $('#example').DataTable({
        "language": {
            "lengthMenu": "Afficher _MENU_ entrées",
            "zeroRecords": "Aucune donnée trouvée",
            "info": "Page _PAGE_ sur _PAGES_",
            "infoEmpty": "Aucune donnée disponible",
            "infoFiltered": "(filtré sur _MAX_ entrées)",
            "search": "Rechercher :",
            "paginate": {
                "next": "Suivant",
                "previous": "Précédent"
            }
        }
    });

    // Gestion de l'importation de fichier CSV
    $('#fileInput').on('change', function (event) {
        let file = event.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (e) {
                let csvData = e.target.result;
                let rows = csvData.split('\n');

                rows.forEach((row, index) => {
                    let columns = row.split(',');
                    if (columns.length === 6) { // Vérifie que les colonnes sont valides
                        table.row.add([
                            index + 1, // Numéro automatique
                            ...columns,
                            `<button class="action-btn btn-edit">Modifier</button>
                             <button class="action-btn btn-delete">Supprimer</button>`
                        ]).draw();
                    }
                });

                alert("Les données du fichier ont été importées avec succès !");
            };
            reader.readAsText(file);
        }
    });

    // Événement pour "Supprimer"
    $('#example').on('click', '.btn-delete', function () {
        // if (confirm("Voulez-vous vraiment supprimer cette ligne ?")) {
        //     table.row($(this).parents('tr')).remove().draw();
        // }
        alert("Fonction de suppresion en cours de développement.");
    });

    // Événement pour "Modifier"
    $('#example').on('click', '.btn-edit', function () {
        alert("Fonction de modification en cours de développement.");
    });

    // Fonction pour télécharger les données du tableau au format CSV
    $('#downloadBtn').on('click', function () {
        let csv = 'N°,Désignation,Administration, Pédagogie  ,Total ';
        table.rows().data().each(function (row) {
            csv += row.slice(0, 6).join(',') + '\n'; // Exclure les boutons d'action
        });

        // Créer un fichier blob et le télécharger
        let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        let url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = 'tableau.csv';
        a.click();
        URL.revokeObjectURL(url);
    });
});
