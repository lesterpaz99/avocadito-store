const baseUrl = 'https://platzi-avo.vercel.app';
const APIurl = `${baseUrl}/api/avo`;

const appNode = document.querySelector('#app');
appNode.addEventListener('click', (event) => {
	if (event.target.nodeName === 'H2') {
		alert('Hey :D');
	}
});

const formatPrice = (price) => {
	return new Intl.NumberFormat('en-EN', {
		style: 'currency',
		currency: 'USD',
	}).format(price);
};

const fetchData = async () => {
	const response = await fetch(APIurl);
	const responseJson = await response.json();

	// Creates a new empty DocumentFragment into which DOM nodes can be added to build an offscreen DOM tree.
	const fragment = document.createDocumentFragment();

	responseJson.data.forEach((element) => {
		const image = document.createElement('img');
		const title = document.createElement('h2');
		const price = document.createElement('div');

		image.src = `${baseUrl}${element.image}`;
		image.setAttribute('alt', 'avocado');
		image.className = 'w-40 h-40 rounded-full border-green-200';

		title.innerText = element.name;
		title.className = 'text-xl font-bold text-opacity-90';
		price.innerText = formatPrice(element.price);
		price.className = 'text-sm text-opacity-50';

		const container = document.createElement('div');
		container.className =
			'bg-gray-50 shadow p-4 rounded-2xl transform hover:scale-110 duration-500 delay-100 cursor-pointer flex flex-col items-center';
		container.append(image, title, price);
		fragment.append(container);
	});

	appNode.append(fragment);
};

fetchData();
