/*!
 * Chainable JavaScript Library v0.1
 * https://github.com/zzarcon/chainable-api
 *
 * Copyright (c) 2014 @zzarcon <hezarco@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Date: 2014-02-02
 */

(function(exports) {
	var api;
	/**
	 * Transform object to query string
	 * @param  {Object} object
	 * @return {String}
	 */
	var parametrize = function(object) {
		var str = "";
		for (var key in object) {
			if (str != "") {
				str += "&";
			}
			str += key + "=" + object[key];
		}
		return str;
	};
	/**
	 * Abstraction to make a XMLHttpRequest
	 * @param  {String} method  HTTP method [GET,POST,PUT,DELETE]
	 * @param  {String} url
	 * @param  {Object} params  Data to send in the request
	 * @param  {Function} success Success callback
	 */
	var request = function(method, url, params, success) {
		console.log('request', arguments);
		var xhr = new XMLHttpRequest;
		var async = true;
		//Parse parameters dependent of the method type
		if (params) {
			if (method === 'GET') {
				params = parametrize(params);
				url += '?' + params;
			} else if (method === 'POST' || method === 'PUT') {
				params = JSON.stringify(params);
			}
		}
		//TODO: Remove in production
		url = ["fake_api/", url, '.json'].join('');
		xhr.open(method, url, async);
		xhr.send(params);

		xhr.onload = function() {
			try {
				data = JSON.parse(this.response);
			} catch (e) {
				data = {};
			}

			if (success) success(data);
		};
		//TODO: Implement onerror callback
		xhr.onerror = function() {};
	};
	/**
	 * Wrapper for make request
	 * @param  {String} endpoint Uri against make the request
	 * @return {Object} Object with all the functions
	 */
	var http = function(endpoint) {

		return {
			endpoint: endpoint,
			/**
			 * Find a record in the Api
			 * @param  {Number}   id
			 * @param  {Object}   [params]
			 * @param  {Function} [callback] Success callback
			 */
			find: function(id, params, callback) {
				var args = Array.prototype.slice.call(arguments, 0);
				var endpoint = this.endpoint;
				//polymorphism
				if (typeof args[0] === 'function') {
					callback = args[0];
				} else if (typeof args[0] === 'object') {
					params = args[0];
					callback = typeof args[1] === 'function' ? args[1] : null;
				} else if (typeof args[0] === 'string' || typeof args[0] === 'number') {
					endpoint += '/' + id;
				}

				request('GET', endpoint, params, callback);
			},
			/**
			 * Create's a record
			 * @param  {Object}   params
			 * @param  {Function} [callback]
			 */
			create: function(params, callback) {
				request('POST', this.endpoint, params, callback);
			},
			/**
			 * Update a record
			 * @param  {Number}   id Record id
			 * @param  {Object}   [params]
			 * @param  {Function} [callback]
			 */
			save: function(id, params, callback) {
				var endpoint = [this.endpoint, id].join('/');
				request('PUT', endpoint, params, callback);
			},
			/**
			 * Delete record
			 * @param  {Number}   id
			 * @param  {Function} [callback]
			 */
			delete: function(id, callback) {
				var endpoint = [this.endpoint, id].join('/');
				request('DELETE', endpoint, {}, callback);
			}
		};
	};
	/**
	 * Chainable api Object
	 * @param  {Object} schema Describes the api schema
	 * @return {Object} A chainableApi object
	 */
	var chainableApi = function(schema) {
		api = setHttp(schema);
		return schema;
	};
	/**
	 * Set http methods to each property in the object
	 * @param  {Object} schema Defines the Api schema
	 * @param  {String} endpoint Apply methods for the passed endpoint
	 */
	var setHttp = function(schema, endpoint) {
		endpoint = endpoint || '';

		for (var prop in schema) {
			if (schema.hasOwnProperty(prop)) {
				if (typeof schema[prop] === 'object' && !objEmpty(schema[prop])) {
					endpoint += prop;
					setHttp(schema[prop], endpoint + '/');
					schema[prop] = extend(schema[prop], http(endpoint));
					endpoint = '';
				} else {
					endpoint += prop;
					schema[prop] = http(endpoint);
					endpoint = '';
				}
			}
		};
	};
	/**
	 * Apply properties from the destination to the source objects
	 * @param  {Object} source
	 * @param  {Object} destination ]
	 * @return {Object}
	 */
	var extend = function(source, destination) {
		for (var prop in destination) {
			source[prop] = destination[prop];
		}
		return source;
	};
	/**
	 * Return true if the passed object is empty
	 * @param  {Object} obj
	 * @return {Boolean}     [description]
	 */
	var objEmpty = function(obj) {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) return false;
		}
		return true;
	};

	exports.chainableApi = chainableApi;

})(window);