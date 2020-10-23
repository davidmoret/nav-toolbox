import utils from "@insite/utils";

class Menu {
    /**
     * @constructor
     * @param {HTMLElement} menuDesktop
     * @param {Object} options
     */
    constructor(menuDesktop, options = {}) {

        this.isOpen = false
        this.menuDesktop = menuDesktop
        this.options = Object.assign({}, {
            panelClass: 'mobile-panel',
            overlayClass: 'mobile-panel-overlay',
            buttonClass: 'button--burger',
            buttonDestination: '.region-header',
            side: 'left-side',
            viewportProportion: 100,
        }, options)

        // On créé le conteneur mobile-menu
        this.mobilePanel = utils.createDivWithClass(this.options.panelClass+' '+this.options.side)

        // A applique le viewportProportion
        this.mobilePanel.style.width = this.options.viewportProportion+'%'

        // On créé l'overlay
        this.mobileOverlay = utils.createDivWithClass(this.options.overlayClass);

        // On créé button--menu--main-mobile
        this.menuMobile = this.menuDesktop.cloneNode(true)

        // On créé button--burger
        this.createButton(this.options.buttonClass);

        this.mobilePanel.appendChild(this.menuMobile)

        document.querySelector('body').appendChild(this.mobilePanel)

        // On split le tout
        this.splitNavToPanels(this);

        document.querySelector('body').appendChild(this.mobileOverlay)

        // On bind le click burger
        this.bindButtonClick(this);

        // On bind les shift buttons
        this.bindButtonShift();

        // On bind les back buttons
        this.bindBackButtonShift();

    }

    /**
     * @method createButton
     * @param {string} className
     */
    createButton(className) {
        let menuButton = document.createElement('button');
        let span = document.createElement('span');
        let divSpans = document.createElement('div');
        divSpans.innerHTML += span.outerHTML + span.outerHTML + span.outerHTML
        menuButton.innerHTML +=  divSpans.outerHTML;
        menuButton.classList.add(className)
        this.mobileButton = document.querySelector(this.options.buttonDestination).appendChild(menuButton)
    }

    /**
     * @method bindButtonShift
     * @param {Object} that
     */
    bindButtonClick(that) {
        // Bind click mobile
        this.mobileButton.addEventListener("click", ()=> {
            that.mobilePanel.classList.toggle('is-open')
            that.mobileButton.classList.toggle('is-open')
            document.querySelector('body').classList.toggle('is-blocked')
            if (that.isOpen === true){
                utils.fadeOut(that.mobileOverlay)
                this.closeAllNavPanels();
            }else {
                utils.fadeIn(that.mobileOverlay, 'block')
            }
            that.isOpen = !that.isOpen;
        })
    }

    /**
     * @method cloezAllNavPanels
     */
    closeAllNavPanels() {
        this.mobilePanel.querySelectorAll('.panel-nav').forEach(function(item){
            item.classList.remove('is-open');
        })
    }

    /**
     * @method bindButtonShift
     */
    bindButtonShift() {
        document.querySelectorAll('.button--menu-shift').forEach(function(item){
            item.addEventListener("click", function(e){
                let activeLink = e.target.closest("li.menu-item--expanded").classList
                document.querySelector('div.panel-'+ activeLink[activeLink.length-1]).classList.add('is-open')
            });
        });
    }

    /**
     * @method bindBackButtonShift
     */
    bindBackButtonShift() {
        // Bind click mobile
        document.querySelectorAll('.back-shift').forEach(function(item){
            item.addEventListener("click", function(e){
                e.target.parentNode.classList.toggle('is-open');
            });
        });
    }

    /**
     * @method splitNavToPanels
     * @param {Object} that
     */
    splitNavToPanels(that) {

        let navigations = that.mobilePanel.querySelectorAll(".block-menu")
        let createLinkWithClass = utils.createLinkWithClass
        let createDivWithCLass = utils.createDivWithClass
        let ulsIndexes = 0;
        let depth = 0;

        /**
         * @function ulsLoop
         * @param {NodeList} uls
         * @param {number} navIndex
         * @param {number} depth
         * @param {string} liClass
         * @param {string} liLabel
         */
        let ulsLoop = function(uls, navIndex, depth, liClass, liLabel){
            uls.forEach(function(ul, ulIndex){
                if(navIndex === 0 && ulsIndexes === 0){
                    ul.parentNode.insertBefore(createLinkWithClass('back-home', "/", "Retour à l'accueil"), ul)
                }
                ul.classList.add(`nav${navIndex}-ul${ulIndex}`)
                if(liLabel){
                    let backFirst = createLinkWithClass('back-shift', "#", "Retour à " +liLabel)
                    let panel = createDivWithCLass('panel-nav panel-depth'+depth + ' panel-'+liClass);
                    panel.appendChild(backFirst)
                    panel.appendChild(ul)
                    that.mobilePanel.appendChild(panel)
                }
                ulsIndexes = ulsIndexes+1;
                depth = depth+1
                lisLoop(ul.querySelectorAll(":scope > li"), navIndex, ulIndex, depth)
            })
        }

        /**
         * @function lisLoop
         * @param {NodeList} lis
         * @param {number} navIndex
         * @param {number} ulIndex
         * @param {number} depth
         */
        let lisLoop = function(lis, navIndex, ulIndex, depth){
            lis.forEach(function(li, liIndex){
                li.classList.add(`nav${navIndex}-ul${ulIndex}-li${liIndex}-depth${depth}`)
                if(li.classList.contains('menu-item--expanded')){
                    li.appendChild(that.createShiftButtons());
                }
                let liClass = `nav${navIndex}-ul${ulIndex}-li${liIndex}-depth${depth}`;
                let liLabel = li.children[0].innerHTML;
                ulsLoop(li.querySelectorAll(":scope > .menu"), navIndex, depth, liClass, liLabel);
            })
        }

        navigations.forEach(function (navigation, navIndex){
            let firstLevel = navigation.querySelectorAll(":scope > .menu")
            ulsLoop(firstLevel, navIndex, depth)
        })
    }

    /**
     * @method createShiftButtons
     */
    createShiftButtons() {
        let button = document.createElement('button')
        button.setAttribute('class', 'button--menu-shift')
        return button;
    }

}

export default Menu;