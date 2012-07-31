/**
 * JsonUtil
 * Contains functions to support the display of JSON data in various html formats. 
 * 
 * @author John Henry Rosocha
 */
var JsonUtil = function() {
		
		/**
		 * Given a provided object, return a string representation of the object type.
		 */
		var isType = function(obj_) {
			if (obj_ === null) {return "null";}
			if (obj_ === NaN) {return "Nan";}
			var _type = typeof obj_;
			switch(_type) {
				case "undefined" : return "undefined";
				case "number" : return "number";
				case "boolean" : return "boolean";
				case "string" : return "string";
				case "function" : return "function";
				case "object" : if (isArray(obj_)) {return "array";}
				return "associative";
			}
		};
		
		/**
		 * Recursively search and display array as an HTML table.
		 */
		var tableifyArray = function(array_) {
			if (array_.length === 0) {
				return "[ empty ]";
			}

			var _out = "<table class='arrayTable'>";
			_out += "<tr class='label arrayTr'><td class='arrayTd'><span>array</span></td></tr>";
			for (var i = array_.length - 1; i >= 0; i--) {
				_out += "<tr class='label arrayTr'><td class='arrayTd'><span>index: " + i + "</span></td></tr>";
				_out += "<tr class='arrayTr'><td class='arrayTd'>" +
				tableifyObject(array_[i]) +
				"</td></tr>";
			}
			_out += "</table>";
			return _out;
		};
		
		/**
		 * Recursively search and display common javascript types as an HTML table.
		 */
		 var tableifyObject = function(obj_) {
		   /*
			if (obj_ === '') {
		      return "[ empty ]";
		   }
		   */
		   switch(isType(obj_)) {
		   		   case "null" : return "null";
		           case "undefined" : return "undefined";
		           case "number" : return obj_;
		           case "boolean" : return obj_;
		           case "string" : return obj_;
		           case "array" : return tableifyArray(obj_);
		           case "associative" : return tableifyAssociative(obj_);
		   }
		   return "!error converting object!";
		};
		
		/**
		 * Recursively search and display associative array as an HTML table.
		 */
		var tableifyAssociative = function(array_) {
		  if (isEmpty(array_)) {
		    return "{ empty }";
		  }
		  var _out = "<table class='associativeTable'>";
		  _out += "<tr class='label associativeTr'><td class='associativeTd' colspan='2'><span>associative</span></td></tr>";
	      _out += "<tr class='label associativeTr'><td class='associativeTd'><span>key</span></td><td ><span>value</span></td></tr>";
		  for(var _index in array_) {
		      _out += "<tr class='associativeTr'><td class='associativeTd'>" + tableifyObject(_index) + "</td><td class='associativeTd'>" + tableifyObject(array_[_index]) + "</td></tr>";
		  }
		  _out += "</table>";
		  return _out;
		};
		
		/**
		* identify if an associative array is empty
		*/
		var isEmpty = function(map_) {
			for(var _key in map_) {
				if (map_.hasOwnProperty(_key)) {
					return false;
				}
			}
			return true;
		};
		
		/**
		 * Identify is an array is a 'normal' (not associative) array
		 */
		var isArray = function(v_) {
		    return Object.prototype.toString.call(v_) == "[object Array]";
		};
		
		/**
		 * given the desire to populate a map of maps, adds a master key, and child key and value to a provided object.
		 */
		var addToMapOfMaps = function(map_, mkey_, key_, value_) {
			if (map_ === undefined) {
			  map_ = {};
			}
			if (map_[mkey_] === undefined) {
			  map_[mkey_] = {};
			}
			if (map_[mkey_][key_] === undefined) {
			  map_[mkey_][key_] = null;
			}
			map_[mkey_][key_] = value_;
		    return map_;
		};
		
		/**
		* interface to json-template.js
		*/
		var templateifyData = function(map_, template_) {
			if (jsontemplate === undefined) {
				return "json-template.js not installed.";
			}
			var _t = jsontemplate.Template(template_);
			var _s = _t.expand(map_);
			return _s;
		};
		
		/** expose these objects **/
		return {
			templateifyData : templateifyData,
			tableifyObject : tableifyObject,
			addToMapOfMaps : addToMapOfMaps
		};		

}();
