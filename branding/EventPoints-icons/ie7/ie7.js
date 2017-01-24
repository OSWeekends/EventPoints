/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'EventPoints\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-icon-01': '&#xe900;',
		'icon-icon-02': '&#xe901;',
		'icon-icon-03': '&#xe902;',
		'icon-icon-04': '&#xe903;',
		'icon-icon-05': '&#xe904;',
		'icon-icon-06': '&#xe905;',
		'icon-icon-07': '&#xe906;',
		'icon-icon-08': '&#xe907;',
		'icon-icon-09': '&#xe908;',
		'icon-icon-10': '&#xe909;',
		'icon-icon-11': '&#xe90a;',
		'icon-icon-12': '&#xe90b;',
		'icon-icon-13': '&#xe90c;',
		'icon-icon-14': '&#xe90d;',
		'icon-icon-15': '&#xe90e;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
