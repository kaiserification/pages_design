let buttons = Array.from(document.querySelectorAll('.ripple-btn'));

function buildRipple(event) {
	const target = event.target
	
	target.style.position = 'relative';
	const x = event.clientX - event.target.offsetLeft;
	const y = event.clientY - event.target.offsetTop;

	const ripples = document.createElement('span');
	ripples.classList.add('ripple-item');

	ripples.style.left = `${x}px`;
	ripples.style.top = `${y}px`;

	target.appendChild(ripples);
}

buttons.forEach(button => {
	button.addEventListener('click', buildRipple)
});