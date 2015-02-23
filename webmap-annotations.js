// ==UserScript==
// @name        7DTD Webmap Annotations
// @namespace   http://fienen.com
// @match       http://*/static/index.html
// @downloadURL https://raw.githubusercontent.com/thequicksilver/7DTD-Webmap-Annotations/master/webmap-annotations.js
// @run-at      document-end
// @grant       GM_getValue
// @grant       GM_setValue
// @version     0.1
// ==/UserScript==

$(document).ready( function() {
	// Loading confirmation
	console.log('Initializing 7DTD Webmap Annotations script...');

	// ===============================================================================================
	// Add Marker control

	var AddMarkerBtn = L.Control.extend({
		options: {
			position: 'bottomleft'
		},

		onAdd: function (map) {
			var name = 'control-addmarkerbtn',
			    container = L.DomUtil.create('div', name + ' leaflet-bar');

			return container;
		},

		_createButton: function (html, title, className, container, fn, context) {
			var link = L.DomUtil.create('a', className, container);
			link.innerHTML = html;
			link.href = '#';
			link.title = title;

			var stop = L.DomEvent.stopPropagation;

			L.DomEvent
			    .on(link, 'click', stop)
			    .on(link, 'mousedown', stop)
			    .on(link, 'dblclick', stop)
			    .on(link, 'click', L.DomEvent.preventDefault)
			    .on(link, 'click', fn, context)
			    .on(link, 'click', this._refocusOnMap, context);

			return link;
		}

	});

	map.addControl(new AddMarkerBtn());

	// Loading complete confirmation
	console.log('7DTD Webmap Annotations initialization complete.');
});