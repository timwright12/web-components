class accordionPanel extends HTMLElement {

	constructor() {

		super();

		const templateContent = `
			<style>
				:host {
					display: block;
					font-family: sans-serif;
				}
				
				[aria-hidden="true"] {
					display: none;
				}
				
				.accordion-trigger {
					background-color: rgba(0,0,0,.03);
					border-bottom: 1px solid rgba(0,0,0,.125);
					padding: .75rem 1.25rem;
					margin-bottom: 0;
				}
				
				.accordion-action {
					background: transparent;
					border: 1px solid transparent;
					color: #007bff;
					cursor: pointer;
					display: inline-block;
					font-family: inherit;
					font-size: 1em;
					font-weight: 400;
					line-height: 1.5;
					padding: .375rem .75rem;
					text-align: center;
					user-select: none;
					vertical-align: middle;
					white-space: nowrap;
				}
				
				.accordion-panel {
					color: #333;
					padding: 1em;
					margin: 0;
				}
				
			</style>
			<dd aria-hidden="true" class="accordion-panel" id="content" >
				<slot name="content">My default text</slot>
			</dd>
		`;
		const self = this;
		const button = document.createElement( 'button' );
		const dt = document.createElement( 'dt' );
		const shadowRoot = self.attachShadow( {
			mode: 'open'
		} );
		
		shadowRoot.innerHTML = templateContent;

		const content = self.shadowRoot.getElementById( 'content' );

		// Set up definition term
		dt.setAttribute( 'class', 'accordion-trigger' );

		// Set up accordion trigger
		button.setAttribute( 'class', 'accordion-action' );
		button.setAttribute( 'aria-controls', 'content' );
		button.setAttribute( 'aria-expanded', 'false' );
		button.textContent = self.getAttribute( 'aria-label' );

		// Add button to term
		dt.appendChild( button );

		// Add term and trigger into the shadowRoot
		self.shadowRoot.insertBefore( dt, content );

		// Click event for trigger
		button.addEventListener( 'click', function() {
			
			var btn = this;
			var controls = btn.getAttribute( 'aria-controls' );
			var target = self.shadowRoot.getElementById( controls );
			var state = target.getAttribute( 'aria-hidden' );
			
			if ( state === 'true' ) {
				btn.setAttribute( 'aria-expanded', 'true' );
				target.setAttribute( 'aria-hidden', 'false' );
				target.setAttribute( 'tabindex', '-1' );
				target.focus();
			} else {
				btn.setAttribute( 'aria-expanded', 'false' );
				target.setAttribute( 'aria-hidden', 'true' );
				target.removeAttribute( 'tabindex' );
			}
			
		} , false );

	}

}

window.customElements.define( 'accordion-panel', accordionPanel );

export default accordionPanel;