import { utils } from '@insite/utils';
import { ScrollSpy } from "./ScrollSpy.js";

export class AnchorMenu {
    /**
     * @constructor
     * @param {HTMLElement} container
     * @param {Object} options
     */
    constructor(container, options = {}) {
        this.container = container;
        this.menu = document.createElement('nav');
        this.options = Object.assign({}, {
            ratio: '.7',
            dataSelector: 'data-heading'
        }, options);


        // On créé le html de la nav et on l'injecte dans le container
        this.menu.setAttribute('class', 'anchorMenu');
        this.container.prepend(this.menu);
        this.buildNav(this.menu, this.container.querySelectorAll(`[${this.options.dataSelector}]`), this.options.dataSelector);
        new ScrollSpy({
            ratio: this.options.ratio
        });

    }

    /**
     * @method splitNavToPanels
     * @param {HTMLElement} thatMenu
     * @param {NodeList} allHeadings
     */
    buildNav(thatMenu, allHeadings, dataSelector) {

        /**
         * @param {HTMLElement} item
         * @param {string} anchor
         */
        const setSectionHeight = function(item, el){
            const distance = utils.getDistanceBetweenElements(item, utils.getNextSibling(item, `[${dataSelector}]`));
            el.style.height = distance + 'px';
        };


        /**
         * @param {HTMLElement} item
         * @param {string} anchor
         */
        const buildSection = function(item, anchor){
            let el = document.createElement('div');
            el.classList.add('anchor-section');
            el.setAttribute('id', anchor);
            item.appendChild(el);
            if (utils.getNextSibling(item, `[${dataSelector}]`) !== undefined){
                // On reset la hauteur de la section fantôme si resize
                setSectionHeight(item, el);
                window.addEventListener('resize', utils.debounce(function(){
                    setSectionHeight(item, el);
                }, 500));
            }
        };

        allHeadings.forEach(function(item) {
            let txt = item.getAttribute(dataSelector);
            let id = txt.replace(/\W/g,'_');
            thatMenu.append(utils.createLinkWithClass('lvl-item' + item.tagName, '#' + id, txt));
            buildSection(item, id);
        });

    }

}
