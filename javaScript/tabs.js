window.onload = function() {
    var tabLinks = document.querySelectorAll('.tab-links li');
    var tabContentContainer = document.querySelector('.tab-content');
    var tabs = document.querySelectorAll('.tab');

    for (var i = 0; i < tabLinks.length; i++) {
        tabLinks[i].addEventListener('click', function(e) {
            e.preventDefault();
            var targetTab = this.querySelector('a').getAttribute('href').substring(1);
            var currentTab = document.getElementById(targetTab);

            // Si la pestaña ya está activa, alternar la visibilidad del contenedor padre
            if (this.classList.contains('active')) {
                tabContentContainer.style.display = (tabContentContainer.style.display === 'none' || tabContentContainer.style.display === '') ? 'block' : 'none';
            } else {
                // Remover clase 'active' de todas las pestañas y ocultar su contenido
                for (var j = 0; j < tabLinks.length; j++) {
                    tabLinks[j].classList.remove('active');
                    tabs[j].classList.remove('active');
                }

                // Agregar clase 'active' a la pestaña seleccionada
                this.classList.add('active');

                // Mostrar el contenedor padre y cambiar el contenido
                tabContentContainer.style.display = 'block';
                for (var j = 0; j < tabs.length; j++) {
                    tabs[j].style.display = (tabs[j].id === targetTab) ? 'block' : 'none';
                }
            }
        });
    }
};
