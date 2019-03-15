import { DOWNARROW, UPARROW, HOME, END } from '@barebones/keycodes';

/**
 * Accordion Panel Component Class
 */
class accordionPanel extends HTMLElement {

	/**
	 * Constructor
	 */
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
		button.textContent ? '' : button.textContent = '(!#ERR Please set a label for this panel)';

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
						self.nextElementSibling ? self.findNextElement( this ) : self.findFirstElement( this );
						break;

					case UPARROW:
						self.previousElementSibling ? self.findPreviousElement( this ) : self.findLastElement( this );
						break;

					case HOME:
						self.findFirstElement( this );
						break;

					case END:
						self.findLastElement();
						break;
			}
		}, false );

	} // constructor()

	/**
	 * Open and close a panel
	 */
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

	/**
	 * Utility to open the current panel
	 */
	openPanel( btn, target ) {

		btn.setAttribute( 'aria-expanded', 'true' );
		target.setAttribute( 'aria-hidden', 'false' );
		target.setAttribute( 'tabindex', '0' );

	} // openPanel()

	/**
	 * Utility to close the current panel
	 */
	closePanel( btn, target ) {

		btn.setAttribute( 'aria-expanded', 'false' );
		target.setAttribute( 'aria-hidden', 'true' );
		target.removeAttribute( 'tabindex' );

	} // closePanel()

	/**
	 * Helper function to get the next accordionPanel
	 * @param {Object} block the current panel
	 */
	findNextElement( block ) {

		let nextSibling = block.nextElementSibling;
		const siblings = [];

		while ( nextSibling ) {
			if ( !nextSibling.disabled ) break;
			siblings.push( nextSibling );
			nextSibling = nextSibling.nextElementSibling;
		}

		if( null !== nextSibling ) {
			nextSibling.shadowRoot.querySelector( 'button' ).focus();
		} else {
			this.findFirstElement( block );
		}

	}

	/**
	* Helper function to get the previous accordionPanel
	* @param {Object} block the current panel
	 */
	findPreviousElement( block ) {
		let prevSibling = block.previousElementSibling;
		const siblings = [];

		while ( prevSibling ) {
			if ( !prevSibling.disabled ) break;
			siblings.push( prevSibling );
			prevSibling = prevSibling.previousElementSibling;
		}

		if( null !== prevSibling ) {
			prevSibling.shadowRoot.querySelector( 'button' ).focus();
		} else {
			this.findLastElement( block );
		}

	}

	/**
	* Helper function to get the last accordionPanel
	* @param {Object} block the current panel
	 */
	findLastElement( block ) {
		const lastElement = block.parentNode.lastElementChild;
		if ( lastElement.disabled ) {
			this.findPreviousElement( lastElement );
		} else {
			lastElement.shadowRoot.querySelector( 'button' ).focus();
		}
	}

	/**
	* Helper function to get the first accordionPanel
	* @param {Object} block the current panel
	 */
	findFirstElement( block ) {
		const firstElement = block.parentNode.firstElementChild;
		if ( firstElement.disabled ) {
			this.findNextElement( firstElement );
		} else {
			firstElement.shadowRoot.querySelector( 'button' ).focus();
		}
	}

	/**
	 * Getter for the open property
	 */
	get open() {
		return this.hasAttribute( 'open' );
	}

	/**
	 * Setter for the open property
	 */
	set open( val ) {

		// Reflect the value of the open property as an HTML attribute.
		if ( val ) {
			this.setAttribute( 'open', '' );
		} else {
			this.removeAttribute( 'open' );
		}

		this.togglePanel( this );

	}

	/**
	 * Getter for the disabled property
	 */
	get disabled() {
		return this.hasAttribute( 'disabled' );
	}

	/**
	 * Setter for the disabled property
	 */
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
