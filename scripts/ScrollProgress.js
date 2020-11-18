import { utils } from "@insite/utils";

export class ScrollProgress {

    /**
     * @constructor
     * @param {HTMLElement} post
     * @param {Object} options
     */
    constructor(post, options = {}) {

        this.options = Object.assign({}, {
            class: 'progress',
            topShift: 250,
            bottomShift: 100,
            destination: this.post,
            finishCallback: null
        }, options);

        this.post = post
        this.inViewport = this.finish = this.callbackFired = false

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => this.inViewport = entry.isIntersecting)
        });

        this.observer.observe(post);

        this.progressBar = utils.createDivWithClass(this.options.class)
        this.progressBarInner = utils.createDivWithClass(this.options.class+'__inner')
        this.progressBar.append(this.progressBarInner)
        if (this.options.destination !== this.post){
            document.querySelector(this.options.destination).append(this.progressBar)
        }else {
            this.post.append(this.progressBar)
        }

        let timeout;

        window.onscroll = () => {
            if (timeout) {
                window.cancelAnimationFrame(timeout);
            }
            timeout = window.requestAnimationFrame( () => {
                this.showReadingProgress(this);
            });
        }
    }

    getScrollProgress (el, that) {
        let progressPercentage = 0;
        if (that.inViewport) {

            let coords = el.getBoundingClientRect();
            let coordsTop = coords.top - this.options.topShift;

            // On ajoute à la hauteur de l'element le topShift et on lui retire le bottomShift
            // pour que le pourcentage soit bien calculé en fonction des deux décalages
            let height = coords.height + this.options.topShift - this.options.bottomShift;

            if(coordsTop < 0){
                progressPercentage = (Math.abs(coordsTop) / height) * 100;
            }

            if (progressPercentage > 100) {
                this.finish = true;
                this.progressBar.classList.add('full')
                this.post.classList.add('finished')
            } else {
                this.finish = false;
                this.progressBar.classList.remove('full')
                this.post.classList.remove('finished')
            }
        }
        return progressPercentage;
    }

    showReadingProgress (that) {
        that.progressBarInner.setAttribute("style", `width: ${that.getScrollProgress(this.post, that)}%`);
    }

}
