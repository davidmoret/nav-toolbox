import { utils } from "@insite/utils";

export class AnchorSpy {


    constructor(options = {}) {
        this.observer = null;
        this.options = Object.assign({}, {
            ratio: '.7',
            selector: 'div.anchor-section'
        }, options);
        this.spies = document.querySelectorAll(this.options.selector);


        let observe = function (elems, that) {
            function callback(entries, observer) {
                entries.forEach(function(entry){
                    if (entry.intersectionRatio > 0) {
                        that.activate(entry.target);
                    }
                });
            }
            // Si observer dejà présent on le delete
            if(that.observer !== null) {
                elems.forEach(elem => that.observer.unobserve(elem));
            }
            // Permet d'observer un trait d'1px à 30% du haut de l'écran
            const y = Math.round(window.innerHeight * that.options.ratio);
            that.observer = new IntersectionObserver(callback, {
                rootMargin: `-${window.innerHeight - y - 1 }px 0px -${y}px 0px`
            });
            that.spies.forEach(elem => that.observer.observe(elem));
        };

        // Si il y a des élements à observer
        if(this.spies.length > 0) {
            let that = this;
            observe(this.spies, this);
            window.addEventListener('resize', utils.debounce(function(){
                observe(that.spies, that);
            }, 500));
        }

    }


    activate(elem) {
        const id = elem.getAttribute('id');
        const anchor = document.querySelector(`a[href="#${id}"]`);
        if(anchor === null){
            return null;
        }
        anchor.parentElement
            .querySelectorAll('.active')
            .forEach(node => node.classList.remove('active'));
        anchor.classList.add('active');
    }

}