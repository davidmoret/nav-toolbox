## [@insite](../../README.md)/[nav-toolbox](../README.md)/OverlayMenu.js

Construit un menu en overlay et son bouton d'ouverture (menu burger, popin recherche...)


* *@param {InnerHTML} content*
* *@param {Object} options* 
    * class: 'overlay-menu'
    * overlayClass: 'overlay-menu__overlay'
    * overlayClassActive: 'is-open'
    * destination: 'body'
    * buttonClass: 'button--overlay'
    * buttonClassActive: 'is-open'
    * buttonTexts: ['Ouvrir', 'Fermer']
    * buttonDestination: '.region-header'
    * closeButtonText: false
    * closeButtonClass: 'button--close'
    * transitionType: 'left-slide'
    * viewportProportion: 100
    * withPanels : true
    * title_panel : false
    * panelsSelector: 'nav'
    * freezeScroll: true

#

#### Usage :


```bash
new OverlayMenu(settings.mobile_menu, {
    destination: '.dialog-off-canvas-main-canvas',
    transitionType: 'right-slide',
    buttonDestination: '.region-header',
    buttonClass: ['hamburger--slider'],
    titlePanel: true,
    buttonClassActive: ['is-active'],
    buttonTexts: ['<span class="hamburger-box"><span class="hamburger-inner"></span></span>', '<span class="hamburger-box"><span class="hamburger-inner"></span></span>']
});
```

 