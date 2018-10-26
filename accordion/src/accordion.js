class accordionMenu extends HTMLElement {

	constructor() {

		super();
		const template = document.getElementById( 'accordion-menu' );
		const templateContent = template.content;
		const self = this;

		const shadowRoot = this.attachShadow( {
			mode: 'open'
		} ).appendChild( templateContent.cloneNode( true ) );

	}

}

class accordionPanel extends HTMLElement {

	constructor() {

		super();

		const template = document.getElementById( 'accordion-panel' );
		const templateContent = template.content;
		const self = this;
		const button = document.createElement( 'button' );
		const dt = document.createElement( 'dt' );

		const shadowRoot = this.attachShadow( {
			mode: 'open'
		} ).appendChild( templateContent.cloneNode( true ) );

		const content = this.shadowRoot.getElementById( 'content' );

		// Set up definition term
		dt.setAttribute( 'class', 'accordion-trigger' );

		// Set up accordion trigger
		button.setAttribute( 'class', 'accordion-action' );
		button.setAttribute( 'aria-controls', 'content' );
		button.setAttribute( 'aria-expanded', 'false' );
		button.textContent=self.getAttribute( 'aria-label' );

		// Add button to term
		dt.appendChild( button );

		// Add term and trigger into the shadowRoot
		self.shadowRoot.insertBefore( dt, content );

		// Click event for trigg er
		button.addEventListener( 'click', function() {

			var controls = this.getAttribute( 'aria-controls' );
			var target = self.shadowRoot.getElementById(controls);
			var state = target.getAttribute( 'aria-hidden' );
			
			if ( state === 'true' ) {
				this.setAttribute( 'aria-expanded', 'true' );
				target.setAttribute( 'aria-hidden', 'false' );
				target.setAttribute( 'tabindex', '-1' );
				target.focus();
			} else {
				this.setAttribute( 'aria-expanded', 'false' );
				target.setAttribute( 'aria-hidden', 'true' );
				target.removeAttribute( 'tabindex' );
			}
			
		} );

	}

}

window.customElements.define( 'accordion-menu', accordionMenu );
window.customElements.define( 'accordion-panel', accordionPanel );