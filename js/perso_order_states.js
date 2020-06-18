export const state = {
	added_elements: new Array(),
	selected_country: {},
	selected_transport: {},
	selected_website: {},

	category_name: '',
	product_name: '',
	currency: '',
	price: 0,
	quantity: 0,


	website: new Object(),
	products: new Array(),
	is_modal: false,
	cgu_visible: false,
	cgu_cookie_key: 'accepted_cgu_for_perso_order',
	website_link: '',
	country_name: '',
	websites: {
		france: [{
			name: 'Amazon',
			path: '/images/websites/amazon.png',
			domain: 'https://www.amazon.fr',
			type: 'website',
			is_website: true,
			},{
				name: 'VENTE PRIVE',
				path: '/images/websites/vente-privee.png',
				domain: 'https://www.ventesprivees-fr.com/shop/vente-privee-com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'SHOW ROOM PRIVE',
				path: '/images/websites/show-room-prive.png',
				domain: 'https://www.showroomprive.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'ASOS',
				path: '/images/websites/asos.png',
				domain: 'https://www.asos.com/fr',
				type: 'website',
				is_website: true,
			}, {
				name: 'EBAY',
				path: '/images/websites/ebay.png',
				domain: 'https://www.ebay.fr/',
				type: 'website',
				is_website: true,
			}, {
				name: 'Zara',
				path: '/images/websites/zara.png',
				domain: 'https://www.zara.com/fr',
				type: 'website',
				is_website: true,
			}, {
				name: 'ZALANDO',
				path: '/images/websites/zalando.png',
				domain: 'https://www.zalando.fr/',
				type: 'website',
				is_website: true
			}, {
				name: 'HM',
				path: '/images/websites/hm.jpg',
				domain: 'https://www2.hm.com/fr_fr/index.html',
				type: 'website',
				is_website: true,
			}, {
				name: 'BOOHOO',
				path: '/images/websites/boohoo.jpg',
				domain: 'https://fr.boohoo.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'NEXT DIRECT',
				path: '/images/websites/next.png',
				domain: 'https://www.nextdirect.com/fr/fr',
				type: 'website',
				is_website: true,
			}, {
				name: 'ALI EXPRESS',
				path: '/images/websites/aliexpress.png',
				domain: 'https://fr.aliexpress.com/',
				type: 'website',
				is_website: true
			}, {
				name: 'FOREVER 21',
				path: '/images/websites/forever-21.png',
				domain: 'https://www.forever21.com/us/shop',
				type: 'website',
				is_website: true,
			}, {
				name: 'CDISCOUNT',
				path: '/images/websites/cdiscount.jpg',
				domain: 'https://www.cdiscount.com',
				type: 'website',
				is_website: true,
			}, {
				name: 'RIVER ISLAND',
				path: '/images/websites/river-island.png',
				domain: 'https://www.riverisland.fr/',
				type: 'website',
				is_website: true,
			}, {
				name: 'SHE IN',
				path: '/images/websites/shein.png',
				domain: 'https://fr.shein.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'other-sites',
				is_website: false
			}],
		usa: [{
				name: 'AMAZON',
				path: '/images/websites/amazon.png',
				domain: 'https://www.amazon.com',
				type: 'website',
				is_website: true,
			}, {
				name: 'EBAY',
				path: '/images/websites/ebay.png',
				domain: 'https://www.ebay.com/',
				type: 'website',
				is_website: true,
			}, {
				name: "CARTER'S",
				path: '/images/websites/carters.png',
				domain: 'https://www.carters.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'APPLE',
				path: '/images/websites/apple.png',
				domain: 'https://www.apple.com/fr/',
				type: 'website',
				is_website: true,
			}, {
				name: 'FRAGRANCEX',
				path: '/images/websites/fragrancex.webp',
				domain: 'https://www.fragrancex.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'BEST BUY',
				path: '/images/websites/bestbuy.png',
				domain: 'https://www.bestbuy.ca/fr-ca',
				type: 'website',
				is_website: true,
			}, {
				name: 'BH PHOTO VIDEO',
				path: '/images/websites/bhphotovideo.png',
				domain: 'https://www.bhphotovideo.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'GEARBEST',
				path: '/images/websites/logo_gearbest.png',
				domain: 'https://www.gearbest.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'FASHION NOVA',
				path: '/images/websites/fashion-nova-logo.png',
				domain: 'https://www.fashionnova.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'RALPH LAUREN',
				path: '/images/websites/ralphlauren.png',
				domain: 'https://www.ralphlauren.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'WALMART',
				path: '/images/websites/walmart.jpg',
				domain: 'https://www.walmart.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'COLOR POP',
				path: '/images/websites/colorpop.png',
				domain: 'https://colourpop.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'KKW',
				path: '/images/websites/kkw.png',
				domain: 'https://kkwbeauty.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'other-sites',
				is_website: false
			}],
		chine: [{
				name: 'AMAZON',
				path: '/images/websites/amazon.png',
				domain: 'https://www.amazon.com',
				type: 'website',
				is_website: true,
			}, {
				name: 'EBAY',
				path: '/images/websites/ebay.png',
				domain: 'https://www.ebay.com/',
				type: 'website',
				is_website: true,
			}, {
				name: "CARTER'S",
				path: '/images/websites/carters.png',
				domain: 'https://www.carters.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'APPLE',
				path: '/images/websites/apple.png',
				domain: 'https://www.apple.com/fr/',
				type: 'website',
				is_website: true,
			}, {
				name: 'FRAGRANCEX',
				path: '/images/websites/fragrancex.webp',
				domain: 'https://www.fragrancex.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'BEST BUY',
				path: '/images/websites/bestbuy.png',
				domain: 'https://www.bestbuy.ca/fr-ca',
				type: 'website',
				is_website: true,
			}, {
				name: 'BH PHOTO VIDEO',
				path: '/images/websites/bhphotovideo.png',
				domain: 'https://www.bhphotovideo.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'GEARBEST',
				path: '/images/websites/logo_gearbest.png',
				domain: 'https://www.gearbest.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'FASHION NOVA',
				path: '/images/websites/fashion-nova-logo.png',
				domain: 'https://www.fashionnova.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'RALPH LAUREN',
				path: '/images/websites/ralphlauren.png',
				domain: 'https://www.ralphlauren.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'WALMART',
				path: '/images/websites/walmart.jpg',
				domain: 'https://www.walmart.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'COLOR POP',
				path: '/images/websites/colorpop.png',
				domain: 'https://colourpop.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'KKW',
				path: '/images/websites/kkw.png',
				domain: 'https://kkwbeauty.com/',
				type: 'website',
				is_website: true,
			}, {
				name: 'other-sites',
				is_website: false
			}],
	},

	// 
	first_step: true,
	second_step: false,
	third_step: false,
	fourth_step: false,
	fifth_step: false,
	sixth_step: false,
	added_elements: []
}
