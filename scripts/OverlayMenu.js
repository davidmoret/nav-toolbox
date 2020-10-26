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
            destination: 'body',
            buttonClass: 'button--overlay',
            buttonTexts: ['Ouvrir', 'Fermer'],
            buttonDestination: '.region-header',
            closeButton: false,
            transitionType: 'left-slide',
            viewportProportion: 100,
            withPanels : true,
            panelsSelector: 'nav',
            freezeScroll: true
        }, options)

        // On créé .menu-overlay
        this.overlayMenu = utils.createDivWithClass(this.options.class+' '+this.options.transitionType)

        // A applique le viewportProportion
        this.overlayMenu.style.width = this.options.viewportProportion+'%'


        // On créé button--menu--main-mobile
        this.overlayMenu.innerHTML += this.content

        // On créé button--burger
        this.createToggleButton(this.options.buttonClass);

        document.querySelector('body').appendChild(this.overlayMenu)

        // On créé l'overlay si besoin
        if (this.options.withPanels){
            this.navigations = document.querySelectorAll(`.${this.options.class} ${this.options.panelsSelector}`)
            this.panels = new PanelsMenu(this.navigations);
        }

        // On créé l'overlay si besoin
        if (this.options.viewportProportion !== 100){
            this.bgOverlay = utils.createDivWithClass(this.options.overlayClass);
            document.querySelector('body').appendChild(this.bgOverlay)
        }

        // On bind le click burger
        this.bindButtonClick(this);

    }

    /**
     * @method createButton
     * @param {string} className
     */
    createToggleButton(className) {
        let menuButton = document.createElement('button');
        menuButton.classList.add(className)
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
            that.button.classList.toggle('is-open');
            that.overlayMenu.classList.toggle('is-open');
            (this.options.viewportProportion !== 100) ? that.bgOverlay.classList.toggle('is-visible') : '';
            that.isOpen = !that.isOpen;
        })
    }
}