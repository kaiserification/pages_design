const errorMessage = (message) => {
	return Swal.fire({
		title: 'Oups!',
		text: message,
		icon: 'error',
		confirmButtonColor: 'var(--color-primary)',	
		showCloseButton: true,
		allowOutsideClick: false,
	});
}

const successMessage = (message) => {
	return Swal.fire({
		title: 'Félicitations !',
		text: message,
		imageUrl: successfullImage,
		imageWidth: '50%',
		imageHeight: 'auto',
		icon: 'success',
		confirmButtonColor: 'var(--color-primary)',
		allowOutsideClick: false,
	});
}

const confirmMessage = (message) => {
	return Swal.fire({
		text: message,
		icon: 'info',
		showCancelButton: true, 
		confirmButtonColor: 'var(--color-primary)',
		confirmButtonText: 'OUI',
		cancelButtonText: 'NON',
		cancelButtonColor: '#ccc',
		focusConfirm: false,
		allowOutsideClick: false,
	});
} 