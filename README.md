# vue-test
Vue.js CSS injecting test

See _app/index.html_, _app/scripts/main.js_ for implementation

---

This is the Vue template:

```html
<script type="text/x-template" id="screen">
	<div class="jumbotron" :style="{ 'background-image': 'url(' + background + ')' }">
		<slot name="title"></slot>
		<slot name="content"></slot>
	</div>
</script>
```

This is the component code:
```javascript
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

```

This is the HTML markup received from the CMS:

```html
<!-- rendered by the server-side template engine -->
<screen>
	<!-- this content comes from a WYSIWYG editor -->
	<template slot="title">
		<h2>Screen Title</h2>
	</template>

	<!-- this content comes from a WYSIWYG editor -->
	<template slot="content">
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ut beatae, maxime ipsum, cupiditate asperiores sed ipsa voluptatum reiciendis cumque culpa, quia voluptatem temporibus accusamus inventore quos, architecto mollitia quisquam!</p>
	</template>
</screen>
```

_title_ can vary:
```html
	<!-- this content comes from a WYSIWYG editor -->
	<template slot="title">
		<h2>Multiline<br/>Title</h2>
	</template>
```

so can _content_:
```html
	<!-- this content comes from a WYSIWYG editor -->
	<template slot="content">
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, eius?</p>
		<a class="btn btn-primary" href="#" role="button">CTA</a>
	</template>
```

This is an example of a _screen_ with (user) CSS overrides:
```html
<!-- rendered by the server-side template engine -->
<screen background="http://lorempixel.com/800/600/business" id="screen3">
	<!-- this content comes from a WYSIWYG editor -->
    <template slot="title">
    	<h2>Another Screen</h2>
	</template>

	<!-- this content comes from a WYSIWYG editor -->
	<template slot="content">
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, eius?</p>
		<a class="btn btn-primary" href="#" role="button">CTA</a>
	</template>

	<template slot="style">
		#screen3 {
        	color: #fff;
			text-shadow: 0px 0px 5px #000;
		}
	</template>
</screen>
```
