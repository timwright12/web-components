class accordionMenu extends HTMLElement {

	constructor() {

		super();

		const template = document.getElementById( 'accordion-menu' );
		const templateContent = `
			<style>
				:host {
					border: 1px solid rgba(0,0,0,.125);
					border-radius: 3px;
					display: block;
					font-family: sans-serif;
					overflow: hidden;
				}
				
				.accordion-menu {
					margin: 0;
				}
			</style>
			<dl class="accordion-menu">
				<slot name="panel"></slot>
			</dl>
		`;
		const self = this;

		const shadowRoot = this.attachShadow( {
			mode: 'open'
		} ).innerHTML = templateContent;

	}

}

window.customElements.define( 'accordion-menu', accordionMenu );

export default accordionMenu;