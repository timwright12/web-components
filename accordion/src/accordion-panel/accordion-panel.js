import { DOWNARROW, UPARROW, HOME, END } from '@barebones/keycodes';

class accordionPanel extends HTMLElement {

	constructor() {

		super();

		const templateContent = `
			<style>
				@import "./src/accordion-panel/accordion-panel.css";
			</style>
			<dd aria-hidden="true" class="accordion-panel" id="content" role="region" aria-labelledby="trigger-button">
				<slot></slot>
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
		button.setAttribute( 'id', 'trigger-button' );
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

			const firstElement = self.parentNode.firstElementChild;
			const lastElement = self.parentNode.lastElementChild;

			switch ( e.keyCode ) {
					case DOWNARROW:
						if ( null !== self.nextElementSibling ) {
							self.nextElementSibling.shadowRoot.querySelector( 'button' ).focus();
						} else {
							firstElement.shadowRoot.querySelector( 'button' ).focus();
						}
						break;

					case UPARROW:
						if ( null !== self.previousElementSibling ) {
							self.previousElementSibling.shadowRoot.querySelector( 'button' ).focus();
						} else {
							lastElement.shadowRoot.querySelector( 'button' ).focus();
						}
						break;

					case HOME:
						firstElement.shadowRoot.querySelector( 'button' ).focus();
						break;

					case END:
						lastElement.shadowRoot.querySelector( 'button' ).focus();
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
