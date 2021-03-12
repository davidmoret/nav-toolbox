[<-- Retour à @insite/nav-toolbox](../README.md)

# ScrollProgress

@param {HTMLElement} post

@param {Object} options 
- class: 'progress'
- topShift: 250
- bottomShift: 100
- destination: this.post
- finishCallback: null

#

#### Usage :


```bash
new ScrollProgress(body, {
    class: 'progress',
    destination: '#header',
    bottomShift: window.innerHeight,
    finishCallback: false
});
```

 