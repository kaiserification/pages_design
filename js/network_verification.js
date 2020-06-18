window.addEventListener('online', updateStatus)
window.addEventListener('offline', updateStatus)

function updateStatus() {

    if (navigator.onLine) {
        alert('Vous êtes maintenant connecté(e).');
    } else {
        alert("Veuillez vérifier votre connexion internet SVP.");
    }

}