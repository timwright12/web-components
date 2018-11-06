class accordionMenu extends HTMLElement {

	constructor() {

		super();

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
			<div class="ui-card"></div>
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