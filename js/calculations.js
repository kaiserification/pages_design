let app = new Vue({
	el: '#app',
	data () {
		return {
			amount: '',
			length: '',
			height: '',
			width: '',
			weight: '',
			result: 0,

			is_boat: false,
			is_plane: false,

			is_france: false,
			is_usa: false,
			is_china: false,
			threshold_volume: 0.1
		}
	},

	methods: {
		onSelectPlane () {
			// this.eraseCalculation()
			this.is_plane = true
			this.is_boat  = false
		},

		onSelectBoat () {
			// this.eraseCalculation()
			this.is_plane = false
			this.is_boat  = true
		},

		onSelectFrance () {
			this.is_france = true
			this.is_usa    = false
			this.is_china  = false
		},
		onSelectUsa () {
			this.is_france = false
			this.is_usa    = true
			this.is_china  = false
		},

		onSelectChina () {
			this.is_france = false
			this.is_usa    = false
			this.is_china  = true
		},

		

		maxPriceForFrance () {
			let price1 = 0
			let price2 = 0

			if (this.volume > this.threshold_volume) {
				price1 = this.volume * 350
    			price2 = this.amount * 0.1
			} else if (this.volume < this.threshold_volume) {
				price1 = this.weight * 3.4
   				price2 = this.amount * 0.1
			}

			return Math.max(price1, price2).toFixed(2)
		},

		maxPriceForUsa () {
			let price1 = 0
			let price2 = 0

			if (this.volume > this.threshold_volume) {
				price1 = this.volume * 500
				price2 = this.amount * 0.2
			} else if (this.volume < this.threshold_volume) {
				price1 = this.weight * 4.5
   				price2 = this.amount * 0.2
			}

			return Math.max(price1, price2).toFixed(2)
		},
		maxPriceForChina () {
			let price1 = 0
			let price2 = 0

			if (this.volume > this.threshold_volume) {
				price1 = this.volume * 232500
    			price2 = this.amount * 0.1
			} else if (this.volume < this.threshold_volume) {
				price1 = this.weight * 2300
   				price2 = this.amount * 0.1
			}

			return Math.max(price1, price2).toFixed(2)
		},
		scrollTop() {
			if (document.body.scrollTop)
				document.body.scrollTop = 0; // For Safari
			
			if (document.documentElement.scrollTop) 
  				document.documentElement.scrollTop = 0
		},
		onSubmitBoat () {
			this.scrollTop()
			let devise = null
			let result = null

			if (this.is_usa) {
				result = this.maxPriceForUsa()
				devise = '$'
			} else if (this.is_france) {
				result = this.maxPriceForFrance()
				devise = '€'
			} else if (this.is_china) {
				result = this.maxPriceForChina()
				devise = 'FCFA'
			}

			this.result = `${result} ${devise}`
		},

		onSubmitPlane () {
			this.scrollTop()
			let computed_amount = 0
			let computed_weight = 0
			let result          = 0
			let devise          = null

			if (this.is_usa) {
				computed_amount = parseFloat(this.amount) * 0.25
				computed_weight = parseFloat(this.weight) * 23
				devise          = '$' 
			} else if (this.is_france) {
				computed_amount = parseFloat(this.amount) * 0.2
				computed_weight = parseFloat(this.weight) * 14
				devise          = '€' 
			} else if (this.is_china) {
				computed_amount = parseFloat(this.amount) * 0.15
				computed_weight = parseFloat(this.weight) * 7000 //13
				devise          = 'FCFA' 
			}
			result = Math.max(computed_amount, computed_weight).toFixed(2)
			this.result = `${result} ${devise}`
		},

		eraseCalculation () {
			this.amount    = ''
			this.length    = ''
			this.height    = ''
			this.width     = ''
			this.weight    = ''
			this.result    = 0
			this.is_boat   = false
			this.is_plane  = false
			this.is_france = false
			this.is_usa    = false
			this.is_china  = false
		}
	},

	computed: {
		selected_currency() {
			if (this.is_usa) {
				return '$'
			} else if (this.is_france) {
				return '€'
			} else if (this.is_china) {
				return 'FCFA'
			}
			return ''
		},
		is_valid () {
			return this.is_valid_plane || this.is_valid_boat
		},
		is_valid_plane () {
			return (this.is_plane && this.is_france) ||
				(this.is_plane && this.is_usa) || 
				(this.is_plane && this.is_china) 
		},
		is_valid_boat () {
			return (this.is_boat && this.is_france) ||
				(this.is_boat && this.is_usa) || 
				(this.is_boat && this.is_china) 
		},
		volume () {
			return this.length * this.width * this.height
		},
		is_form_for_plane_valid () {
			return this.amount > 0 && this.weight > 0 
		},
		is_form_for_boat_valid () {
			return this.amount > 0 && this.weight > 0 && this.length > 0 && this.width > 0 && this.height > 0
		}
	},

	mounted () {

	}
})


document.addEventListener('keydown', (event) => {
	if (event.key == 'Escape') {
		app.eraseCalculation()
	}
});

