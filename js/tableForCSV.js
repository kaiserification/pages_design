class TableForCSV {

	constructor (element) {	
		this.root = document.querySelector(element);
		console.log('tableforcsv loaded')
	}

	update(data, columns) {
		this.root.innerHTML = '';
		this.setHeader(columns).setContent(data);
	}

	prependCount(data) {
		const prependCountHTML = `
			<div class="row">
				<div class="col-md-6">
					<strong>${data.length} entrées</strong>
				</div>
			</div>
		`

		this.root.insertAdjacentHTML('beforebegin', prependCountHTML)
	}

	setHeader (headers) {
		const headerHTML = `
			<thead>
				<tr>
					${ headers.map(text => `<th>${text}</th>`).join('') }
				</tr>
			</thead>
		`
		this.root.insertAdjacentHTML('afterbegin', headerHTML)
		return this;
	}

	setContent(data) {
		this.prependCount(data)
		const bodyHTML = `
			<tbody>
				${ 
					data.map(row => `
						<tr>
							${ row.map(text => `<td>${text}</td>`).join('') }
						</tr>	
					`) 
				}
			</tbody>
		`
		this.root.insertAdjacentHTML('beforeend', bodyHTML)
	}
}