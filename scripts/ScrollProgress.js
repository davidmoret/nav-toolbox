import { utils } from "@insite/utils";

export class scrollProgress {

    /**
     * @constructor
     * @param {HTMLElement} post
     * @param {Object} options
     */
    constructor(post, options = {}) {

        this.options = Object.assign({}, {
            class: 'progressBar',
            topShift: 250,
            bottomShift: 100,
            destination: this.post,
        }, options);

        this.post = post
        this.inViewport = this.finish = false

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
            let height = coords.height - this.options.bottomShift;
            if(coordsTop < 0){
                progressPercentage = (Math.abs(coordsTop) / height) * 100;
            }
            if((progressPercentage > 100) || (Math.abs(coords.top) / height) > 1) {
                this.finish = true;
                this.progressBar.classList.add('full')
                this.post.classList.add('finished')
            }else {
                this.finish = false;
                this.progressBar.classList.remove('full')
                this.post.classList.remove('finished')
            }
        }
        console.log(this.finish)
        return progressPercentage;
    }

    showReadingProgress (that) {
        that.progressBarInner.setAttribute("style", `width: ${that.getScrollProgress(this.post, that)}%`);
    }

}