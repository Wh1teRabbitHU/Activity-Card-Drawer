import { cards } from './cards.js';
import { locales } from './locales.js';

const pantomimeCards = cards.filter(({ category }) => category == 'pantomime');
const describeCards = cards.filter(({ category }) => category == 'describe');
const paintCards = cards.filter(({ category }) => category == 'paint');

function pickCard(sourceList) {
	const index = Math.floor(Math.random() * sourceList.length);

	return sourceList.splice(index, 1)[0];
}

const categoryButtonElements = document.querySelectorAll('.btn.category');
const googleSearchElement = document.querySelector('#google-search');
const cardCategoryElement = document.querySelector('.card-details > .card-category');
const cardTopicElement = document.querySelector('.card-details > .card-topic');
const cardPointElement = document.querySelector('.card-details > .card-point');
const cardCountValueElement = document.querySelector('.card-count > .statistic-value');
const lastTopicValueElement = document.querySelector('.last-topic > .statistic-value');
const lastCategoryValueElement = document.querySelector('.last-category > .statistic-value');

[ ...categoryButtonElements ].forEach((btn) => {
	btn.addEventListener('click', () => {
		const category = btn.id;
		let sourceList;

		switch(category) {
			case 'pantomime':
				sourceList = pantomimeCards;
				break;
			case 'describe':
				sourceList = describeCards;
				break;
			case 'paint':
				sourceList = paintCards;
				break;
			default:
				console.error(`Unknown category type: ${category}`);
		}

		if (sourceList.length === 0) {
			window.alert(`Oops, no more elements in the ${category} category, it's time to refresh your browser!`)

			return;
		}

		const newCard = pickCard(sourceList);

		lastCategoryValueElement.innerHTML = cardCategoryElement.innerHTML;
		lastTopicValueElement.innerHTML = cardTopicElement.innerHTML;

		cardCategoryElement.innerHTML = locales[category];
		cardTopicElement.innerHTML = newCard.topic;
		cardPointElement.innerHTML = newCard.point;

		cardCountValueElement.innerHTML = parseInt(cardCountValueElement.innerHTML, 10) + 1;

		googleSearchElement.classList.remove('hidden');
	});
});

googleSearchElement.addEventListener('click', () => {
	window.open(`https://www.google.com/search?q=${cardTopicElement.innerHTML}`);
});

console.log(`Data is loaded: \n` +
			`${pantomimeCards.length} pantomime cards, ` +
			`${describeCards.length} describe cards and ` +
			`${paintCards.length} paint cards are present.`);