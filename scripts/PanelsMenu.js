import { utils } from "@insite/utils";

export class PanelsMenu {
    /**
     * @constructor
     * @param {HTMLElement} navigations
     * @param {Object} options
     */
    constructor(navigations, options = {}) {
        this.navigations = navigations
        this.options = Object.assign({}, {
            side: 'left-slide',
            title_panel: false,
            panelsDestination: '.overlay-menu'
        }, options)

        // On split le tout
        this.splitNavToPanels(this);

        // On bind les shift buttons
        this.bindSlideButtons()

        // On bind les back buttons
        this.bindBackButtons()

    }

    /**
     * @method closeAllNavPanels
     */
    closeAllNavPanels() {
        document.querySelectorAll('.panel-nav').forEach(function(item){
            item.classList.remove('is-open');
        })
    }

    /**
     * @method bindSlideButtons
     */
    bindSlideButtons() {
        document.querySelectorAll('.button--slide-panel').forEach(function(item){
            item.addEventListener("click", function(e){
                let activeLink = e.target.closest("li.menu-item--expanded").classList
                document.querySelector('div.panel-'+ activeLink[activeLink.length-1]).classList.add('is-open')
            });
        });
    }

    /**
     * @method bindBackButtons
     */
    bindBackButtons() {
        // Bind click mobile
        document.querySelectorAll('.button--back-panel').forEach(function(item){
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
        let ulsLoop = (uls, navIndex, depth, liClass, liLabel) => {
            uls.forEach(function(ul, ulIndex){
                if(navIndex === 0 && ulsIndexes === 0){
                    ul.parentNode.insertBefore(createLinkWithClass('button--back-home', "/", "Retour à l'accueil"), ul)
                }
                ul.classList.add(`nav${navIndex}-ul${ulIndex}`)
                if(liLabel){
                    let backFirst;
                    let panel = createDivWithCLass('panel-nav panel-depth'+depth + ' panel-'+liClass);
                    if(that.options.title_panel){
                        let panelTitle = createDivWithCLass('panel__title')
                        panelTitle.innerHTML = liLabel;
                        backFirst = createLinkWithClass('button--back-panel', "#", "Retour au menu principal");
                        panel.appendChild(panelTitle)
                    }else {
                        backFirst = createLinkWithClass('button--back-panel', "#", "Retour à " +liLabel)
                    }
                    panel.appendChild(ul)
                    panel.appendChild(backFirst)
                    document.querySelector(that.options.panelsDestination).appendChild(panel)
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
        let lisLoop = (lis, navIndex, ulIndex, depth) => {
            lis.forEach(function(li, liIndex){
                li.classList.add(`nav${navIndex}-ul${ulIndex}-li${liIndex}-depth${depth}`)
                if(li.classList.contains('menu-item--expanded')){
                    li.appendChild(that.createSlideButtons());
                }
                let liClass = `nav${navIndex}-ul${ulIndex}-li${liIndex}-depth${depth}`;
                let liLabel = li.children[0].innerHTML;
                ulsLoop(li.querySelectorAll(":scope > .menu"), navIndex, depth, liClass, liLabel);
            })
        }

        this.navigations.forEach(function (navigation, navIndex){
            let firstLevel = navigation.querySelectorAll(":scope > .menu")
            ulsLoop(firstLevel, navIndex, depth)
        })
    }

    /**
     * @method createSlideButtons
     */
    createSlideButtons() {
        let button = document.createElement('button')
        button.setAttribute('class', 'button--slide-panel')
        return button;
    }
}
