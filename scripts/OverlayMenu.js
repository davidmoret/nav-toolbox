import { utils } from "@insite/utils";
import { PanelsMenu } from "./PanelsMenu.js";

export class OverlayMenu {

    /**
     * @constructor
     * @param {InnerHTML} content
     * @param {Object} options
     */
    constructor(content, options = {}) {

        this.content = content
        this.options = Object.assign({}, {
            class: 'overlay-menu',
            overlayClass: 'overlay-menu__overlay',
            overlayClassActive: 'is-open',
            destination: 'body',
            buttonClass: 'button--overlay',
            buttonClassActive: 'is-open',
            buttonTexts: ['Ouvrir', 'Fermer'],
            buttonDestination: '.region-header',
            closeButtonText: false,
            closeButtonClass: 'button--close',
            transitionType: 'left-slide',
            viewportProportion: 100,
            withPanels : true,
            title_panel : false,
            panelsSelector: 'nav',
            freezeScroll: true
        }, options)

        // On créé .menu-overlay
        this.overlayMenu = utils.createDivWithClass(this.options.class+' '+this.options.transitionType)

        // A applique le viewportProportion
        this.overlayMenu.style.width = this.options.viewportProportion+'%'

        // On insère le bouton close si besoin
        if (this.options.closeButtonText !== false){
            let closeButton = utils.createButton(this.options.closeButtonClass)
            closeButton.innerHTML = this.options.closeButtonText
            this.closeButton = this.overlayMenu.append(closeButton)
        }

        // On insère le contenu dans le menu
        this.overlayMenu.innerHTML += this.content

        // On créé button--burger
        this.createToggleButton(this.options.buttonClass);

        // On insère l'overlayMenu dans le body'
        document.querySelector(this.options.destination).appendChild(this.overlayMenu)

        // Si options menu par panels
        if (this.options.withPanels){
            this.navigations = document.querySelectorAll(`.${this.options.class} ${this.options.panelsSelector}`)
            this.panels = new PanelsMenu(this.navigations, options = {
                "title_panel": this.options.title_panel
            });
        }

        // On créé l'overlay si besoin
        if (this.options.viewportProportion !== 100){
            this.bgOverlay = utils.createDivWithClass(this.options.overlayClass);
            document.querySelector('body').appendChild(this.bgOverlay)
        }

        // On bind le click burger
        this.bindButtonClick(this);

        if (this.options.closeButtonText !== false) {
            this.bindCloseButton(this)
        }

    }

    /**
     * @method createButton
     * @param {string} className
     */
    createToggleButton(className) {
        let menuButton = document.createElement('button');
        menuButton.setAttribute('class', className)
        menuButton.innerHTML = this.options.buttonTexts[0]
        this.button = document.querySelector(this.options.buttonDestination).appendChild(menuButton)
    }


    /**
     * @method bindButtonClick
     * @param {Object} that
     */
    bindButtonClick(that) {
        // Bind click mobile
        this.button.addEventListener("click", () => {
            if (this.options.freezeScroll){
                document.querySelector('body').classList.toggle('is-blocked')
            }
            if (that.isOpen === true){
                if (this.options.buttonTexts[0] !== this.options.buttonTexts[1]){
                    this.button.innerHTML = this.options.buttonTexts[0]
                }
                if (this.options.withPanels){
                    this.panels.closeAllNavPanels();
                }
            }else {
                if (this.options.buttonTexts[0] !== this.options.buttonTexts[1]){
                    this.button.innerHTML = this.options.buttonTexts[1]
                }
            }
            that.button.classList.toggle(this.options.buttonClassActive);
            that.overlayMenu.classList.toggle(this.options.overlayClassActive);
            (this.options.viewportProportion !== 100) ? that.bgOverlay.classList.toggle('is-visible') : '';
            that.isOpen = !that.isOpen;
        })
    }


    /**
     * @method bindCloseButton
     * @param {Object} that
     */
    bindCloseButton(that) {
        // Bind click mobile
        document.querySelector('.'+this.options.closeButtonClass).addEventListener("click", () => {
            if (this.options.freezeScroll){
                document.querySelector('body').classList.remove('is-blocked')
            }
            if (this.options.buttonTexts[0] !== this.options.buttonTexts[1]){
                this.button.innerHTML = this.options.buttonTexts[0]
            }
            if (this.options.withPanels){
                this.panels.closeAllNavPanels();
            }
            that.button.classList.toggle(this.options.buttonClassActive);
            that.overlayMenu.classList.toggle(this.options.overlayClassActive);
            (this.options.viewportProportion !== 100) ? that.bgOverlay.classList.toggle('is-visible') : '';
            that.isOpen = !that.isOpen;
        })
    }
}
