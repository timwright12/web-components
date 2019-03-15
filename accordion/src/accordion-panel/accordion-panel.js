import { DOWNARROW, UPARROW, HOME, END } from '@barebones/keycodes';

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

				.accordion-action[disabled] {
					cursor: not-allowed;
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

		// If the aria-label is missing expose a visual error
		button.textContent ? '' : button.textContent = '(Please set a label for this panel)';

		// If disabled, disabled it
		self.disabled ? button.setAttribute( 'disabled', '' ) : null;

		// If open, open it
		self.open ? self.openPanel( button, self.shadowRoot.getElementById( 'content' ) ) : null;

		// Add button to term
		dt.appendChild( button );

		// Add term and trigger into the shadowRoot
		self.shadowRoot.insertBefore( dt, content );

		// Click event for trigger
		button.addEventListener( 'click', () => { self.open = true; }, false );

		// Keyup event for trigger
		button.addEventListener( 'keyup', ( e ) => {

			switch ( e.keyCode ) {
					case DOWNARROW:
						console.log( 'DOWN key was pressed, move to next panel' );
						break;
					case UPARROW:
						console.log( 'UP key was pressed, move to previous panel' );
						break;
					case HOME:
						console.log( 'HOME key was pressed, move to first panel' );
						break;
					case END:
						console.log( 'END key was pressed, move to last panel' );
						break;
			}
		}, false );

	} // constructor()

	togglePanel( self ) {

		const btn = self.shadowRoot.querySelector( '.accordion-action' );
		const controls = self.shadowRoot.querySelector( '.accordion-action' ).getAttribute( 'aria-controls' );
		const target = self.shadowRoot.getElementById( controls );
		const state = target.getAttribute( 'aria-hidden' );

		if ( 'true' === state ) {

			self.openPanel( btn, target );
			//target.focus();

		} else {

			self.closePanel( btn, target );

		}
	} // togglePanel ()

	openPanel( btn, target ) {

		btn.setAttribute( 'aria-expanded', 'true' );
		target.setAttribute( 'aria-hidden', 'false' );
		target.setAttribute( 'tabindex', '0' );

	} // openPanel()

	closePanel( btn, target ) {

		btn.setAttribute( 'aria-expanded', 'false' );
		target.setAttribute( 'aria-hidden', 'true' );
		target.removeAttribute( 'tabindex' );

	} // closePanel()

	// Getter for the open property
	get open() {
		return this.hasAttribute( 'open' );
	}

	set open( val ) {

		// Reflect the value of the open property as an HTML attribute.
		if ( val ) {
			this.setAttribute( 'open', '' );
		} else {
			this.removeAttribute( 'open' );
		}

		this.togglePanel( this );

	}

	// Getter for the disabled property
	get disabled() {
		return this.hasAttribute( 'disabled' );
	}

	set disabled( val ) {

		// Reflect the value of the disabled property as an HTML attribute.
		if ( val ) {
			this.setAttribute( 'disabled', '' );
		} else {
			this.removeAttribute( 'disabled' );
		}

	}

}

window.customElements.define( 'accordion-panel', accordionPanel );

export default accordionPanel;
