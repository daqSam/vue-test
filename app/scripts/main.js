Vue.component('screen', {
	template: '#screen',
	props: ['background'],
	mounted: function() {
		var hasCSSSlot = this.$slots.style != null;
		if( hasCSSSlot )
			this.injectCSS( this.$slots.style[0].text.trim() );
	},
	methods: {
		injectCSS: function( cssText ) {
			var node = document.createElement('style');
			node.innerHTML = cssText;
			document.body.appendChild(node);
		}
	}
});

var app = new Vue({
	el: '#app'
});
