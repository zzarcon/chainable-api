(function(exports) {
	var api;
	var http = function(endpoint) {
		return {
			endpoint: endpoint,
			find: function() {
				console.log(this);
			}
		};
	};

	var chainableAPI = function(schema) {
		api = objAssign(schema);
		console.log('schema', schema);
		return schema;
	};

	var objAssign = function(obj, endpoint) {
		debugger;
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				if (typeof obj[prop] === 'object' && !objEmpty(obj[prop])) {
					endpoint += prop + '/';
					objAssign(obj[prop], endpoint);
				} else {
					endpoint = (endpoint || '') + prop;
					console.log('endpoint', endpoint);
					obj[prop] = http(endpoint);
					endpoint = '';
				}
			}
		};

		// return obj;
	};

	var objEmpty = function(obj) {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) return false;
		}
		return true;
	};
	exports.chainableAPI = chainableAPI;
})(window);