const friendsListContainier = document.querySelector('#friends');
const friendsChoosenListContainier = document.querySelector('#friendsChoosen');

/* D&D */
function handleDragOver(e) {
    console.log('handleDragOver');
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'copy';  // See the section on the DataTransfer object.

    return false;
}

function handleDrop(e) {
    var elHtml = e.dataTransfer.getData('text/html');

    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }

    this.innerHTML += elHtml;

    return false;
}

function init() {
    var friendsList = document.querySelector('#friends').querySelectorAll('.friend');

    [].forEach.call(friendsList, function(friend) {
        friend.addEventListener('dragstart', handleDragStart, false);
    });

    friendsChoosenListContainier.addEventListener('dragover', handleDragOver, false);
    friendsChoosenListContainier.addEventListener('drop', handleDrop, false);
}

function handleDragStart(e) {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/html', this.outerHTML);
}
