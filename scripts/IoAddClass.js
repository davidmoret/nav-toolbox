export class IoAddClass {

    /**
     * @constructor
     * @param {NodeList} elements
     * @param {Object} options
     */
    constructor(elements, options = {}) {

        this.elements = elements
        this.options = Object.assign({}, {
            classToAdd: null,
            once: false,
            observerOptions: {
                rootMargin: '-200px',
                threshold: .01
            }
        }, options);

        if(this.elements !== null){
            this.observeInit();
        }

    }

    observeInit() {
        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(this.options.classToAdd !== null){
                    if (entry.isIntersecting) {
                        entry.target.classList.add(this.options.classToAdd);
                        if(this.options.once){
                            observer.unobserve(entry.target)
                        }
                    } else {
                        entry.target.classList.remove(this.options.classToAdd);
                    }

                }
            });
        }, this.options.observerOptions);
        this.elements.forEach( (element) => {
            observer.observe(element);
        })
    }

}