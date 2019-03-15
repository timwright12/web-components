/**
 * Accordion Menu Component Class
 */
class accordionMenu extends HTMLElement {

	/**
	 * Constructor
	 */
	constructor() {

		super();

		const templateContent = `
			<style>
				@import "./src/accordion-menu/accordion-menu.css";
			</style>
			<dl class="accordion-menu">
				<slot></slot>
			</dl>
		`;
		const self = this;
		const shadowRoot = self.attachShadow( {
			mode: 'open'
		} );

		shadowRoot.innerHTML = templateContent;

	}

}

window.customElements.define( 'accordion-menu', accordionMenu );

export default accordionMenu;
