function getItem(key) {

	if (!hasItem(key)) {
		return null;
	}

	let item;
	try {
		item = JSON.parse(window.localStorage[key]);
	} catch (err) {
		item = window.localStorage[key];
	}

	if (item && typeof item === 'object') {
		let timestamp = new Date().getTime();

		if (item.hasOwnProperty('expiresInTimestamp')) {

			if (item.expiresInTimestamp > timestamp) {
				return item.value;
			} else {
				removeItem(key);
				return null;
			}
		} else {
			return item;
		}

	} else {
		return item;
	}
}

function setItem(key, value, expiresIn) {
	if (expiresIn > 0) {
		window.localStorage[key] = JSON.stringify({
			expiresInTimestamp: new Date().getTime() + expiresIn,
			value: value
		});
	} else {
		if (typeof value === 'object') {
			value = JSON.stringify(value);
		}

		window.localStorage[key] = value;
	}
}

function hasItem(key) {
	return window.localStorage.hasOwnProperty(key) && typeof key !== 'undefined';
}

function removeItem(key) {
	try {
		window.localStorage.removeItem(key);
		return true;
	} catch (err) {
		return false;
	}
}

function clearAll() {
	window.localStorage.clear();
}


const localStorageWrapper = {
	getItem,
	setItem,
	hasItem,
	removeItem,
	clearAll,
};


export default localStorageWrapper;
