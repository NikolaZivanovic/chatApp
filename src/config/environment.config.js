import CONFIG from './config';
const noOp = function () {};

export function initializeEnv() {

	if (!CONFIG.IS_CONSOLE_VISIBLE) {   //remove console.log, warn and errors

		if (window && window.console) {
			window.console = {
				log: noOp,
				info: noOp,
				warn: noOp,
				error: noOp,
			};
		}
	}
}
