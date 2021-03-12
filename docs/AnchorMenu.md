## [@insite](../../README.md)/[nav-toolbox](../README.md)/AnchorMenu.js

Construit un sommaire avec ancres suivant les 'data-heading' présents sur les h1, h2, h3... 

* *@param {HTMLElement} container*

* *@param {Object} options*
    * ratio: '.7'
    * dataSelector: 'data-heading'
    * menuClass: 'anchor-menu'

#

#### Usage :


```bash
new AnchorMenu(document.querySelector('.dossier'), {
    ratio: '.95',
    dataSelector: 'data-sommaire',
    menuClass: 'nav-sommaire'
});
```

 