class Tippy {

	constructor (element) {
		this.element = element;
		this.tooltip = null;

		let tooltipTarget = this.element.getAttribute('data-tooltip');
		
		if (tooltipTarget) {
			this.title = document.querySelector(tooltipTarget).innerHTML;
		} else {
			this.title = this.element.getAttribute('title');
		}
		
		this.element.addEventListener('mouseover', this.mouseOver.bind(this));
		this.element.addEventListener('mouseleave', this.mouseLeave.bind(this));
	}

	mouseOver () {
		this.createTooltip();
		const width   = this.tooltip.offsetWidth; 
		const height  = this.tooltip.offsetHeight; 
		const top     = this.element.getBoundingClientRect().top - height - 15 - document.documentElement.scrollTop;
		const left    = this.element.offsetWidth / 2 - width / 2 + this.element.getBoundingClientRect().left;
		this.tooltip.style.top  = top + 'px';
		this.tooltip.style.left = left + 'px';
		
		this.tooltip.classList.add('visible');
	}

	mouseLeave () {
		if (this.tooltip !== null) {
			this.tooltip.classList.remove('tippy');
			document.body.removeChild(this.tooltip);
			this.tooltip = null;
		}	
	}

	createTooltip () {
		if (this.tooltip === null) {
			let tooltip       = document.createElement('div');
			tooltip.innerHTML = this.title; 
			tooltip.classList.add('tippy');
			document.body.appendChild(tooltip);
			this.tooltip      = tooltip;
		}
	}

	

	static bind (selector) {
		Array.from(document.querySelectorAll(selector)).forEach(element => new Tippy(element));
	}
}


Tippy.bind('a[title], span[title]');