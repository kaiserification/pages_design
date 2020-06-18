class Tooltip {

    constructor(element) {
        this.element = element
        let tooltipTarget = element.getAttribute('data-tooltip')

        if (tooltipTarget) {
            this.title = document.querySelector(tooltipTarget).innerHTML
        } else {
            this.title = element.getAttribute('title')
        }
        this.tooltip = null
        this.element.addEventListener('mouseover', this.mouseOver.bind(this))
        this.element.addEventListener('mouseleave', this.mouseLeave.bind(this))
    }

    mouseOver() {
        let tooltip = this.createTooltip()
        let width = tooltip.offsetWidth
        let height = tooltip.offsetHeight
        let top = this.element.getBoundingClientRect().top - height - 10
        let left = this.element.offsetWidth / 2 - width / 2 + this.element.getBoundingClientRect().left

        if (left < 0) {
            left = 5
        }

        this.tooltip.style.top = `${top}px`
        this.tooltip.style.left = `${left}px`
        this.tooltip.classList.add('visible')
    }

    createTooltip() {
        if (this.tooltip === null) {
            let tooltip = document.createElement('div')
            tooltip.innerHTML = this.title
            tooltip.classList.add('tippy')
            document.body.appendChild(tooltip)
            this.tooltip = tooltip
        }
        return this.tooltip
    }

    mouseLeave() {
        if (this.tooltip !== null) {
            document.body.removeChild(this.tooltip)
            this.tooltip = null
        }
    }

    static bind(selector) {
        Array.from(document.querySelectorAll(selector)).forEach(element => new Tooltip(element))
    }
}


Tooltip.bind('[data-toggle="tooltip"]')