/* global kadenceHeaderConfig */

/**
 * The frontend class for the Kadence query block.
 */
class KBHeader {
	/**
	 * The collection of all component objects.
	 */
	components = {};

	/**
	 * The current state.
	 */
	_state;

	/**
	 * The root header container element.
	 */
	root;

	/**
	 * The root header container element.
	 */
	rootID;

	/**
	 * The auto transparent spacing setting.
	 */
	autoTransparentSpacing;

	/**
	 * The desktop style setting.
	 */
	sticky;

	/**
	 * The tablet style setting.
	 */
	stickyTablet;

	/**
	 * The mobile style setting.
	 */
	stickyMobile;

	/**
	 * The desktop style setting.
	 */
	transparent;

	/**
	 * The tablet style setting.
	 */
	transparentTablet;

	/**
	 * The mobile style setting.
	 */
	transparentMobile;

	/**
	 * The desktop sticky section setting.
	 */
	stickySection;

	/**
	 * The tablet sticky section setting.
	 */
	stickySectionTablet;

	/**
	 * The mobile sticky section setting.
	 */
	stickySectionMobile;

	/**
	 * activeSize.
	 */
	activeSize = 'mobile';

	/**
	 * lastScrollTop.
	 */
	lastScrollTop = 0;

	/**
	 * activeOffsetTop.
	 */
	activeOffsetTop = 0;

	/**
	 * shrinkStartHeight.
	 */
	shrinkMain = false;

	/**
	 * shrinkStartHeight.
	 */
	shrinkMainHeight = 0;

	/**
	 * shrinkStartHeight.
	 */
	shrinkMainHeightTablet = 0;

	/**
	 * shrinkStartHeight.
	 */
	shrinkMainHeightMobile = 0;

	/**
	 * shrinkStartHeight.
	 */
	shrinkStartHeight = 0;

	/**
	 * currentTopPosition.
	 */
	currentTopPosition = 0;

	/**
	 * anchorOffset.
	 */
	anchorOffset = 0;

	/**
	 * activeHeader.
	 */
	activeHeader;

	/**
	 * isSticking.
	 */
	isSticking = false;

	/**
	 * isTransparent.
	 */
	isTransparent = false;

	/**
	 * The main constructor.
	 *
	 * @param target  - The selector for the target element, or the element itself.
	 * @param options - Optional. An object with options.
	 */
	constructor(target, options = {}) {
		//target the target
		const self = this;
		this.root = 'string' === typeof target ? document.querySelector(target) : target;
		//TODO get a real root id parsed from the block unique id.
		this.rootID = 'aaa';
		this.autoTransparentSpacing = this.root.dataset?.autoTransparentSpacing === '1';
		this.sticky = this.root.dataset?.sticky == '1';
		this.stickyTablet = this.root.dataset?.stickyTablet == '1';
		this.stickyMobile = this.root.dataset?.stickyMobile == '1';
		this.transparent = this.root.dataset?.transparent == '1';
		this.transparentTablet = this.root.dataset?.transparentTablet == '1';
		this.transparentMobile = this.root.dataset?.transparentMobile == '1';
		this.stickySection = this.root.dataset?.stickySection;
		this.stickySectionTablet = this.root.dataset?.stickySectionTablet;
		this.stickySectionMobile = this.root.dataset?.stickySectionMobile;
		this.shrinkMain = this.root.dataset?.shrinkMain === '1';
		this.shrinkMainHeight = this.root.dataset?.shrinkMainHeight;
		this.shrinkMainHeightTablet = this.root.dataset?.shrinkMainHeightTablet;
		this.shrinkMainHeightMobile = this.root.dataset?.shrinkMainHeightMobile;
		this.revealScrollUp = this.root.dataset?.revealScrollUp === '1';
		this._state = 'CREATED';

		if (this.transparent && this.autoTransparentSpacing) {
			this.initAutoTransparentSpacing();
		}
		if ((this.sticky || this.stickyTablet || this.stickyMobile) && this.stickySection) {
			this.initStickyHeader();
		}

		var event = new Event('MOUNTED', {
			bubbles: true,
		});
		event.qlID = this.rootID;

		this.root.dispatchEvent(event);
		this._state = 'IDLE';
	}

	initAutoTransparentSpacing() {
		const self = this;

		this.setAutoTransparentSpacing();

		document.onresize = self.setAutoTransparentSpacing;
	}

	setAutoTransparentSpacing() {
		const self = this;

		const height = this.getHeight();

		const elementToApply = this.root.nextElementSibling;

		elementToApply.style.paddingTop = height + 'px';
	}

	getHeight() {
		return this.root.querySelector('div').clientHeight;
	}

	/**
	 * Initiate the script to stick the header.
	 * http://www.mattmorgante.com/technology/sticky-navigation-bar-javascript
	 */
	initStickyHeader() {
		const self = this;
		this.activeHeader = this.root.querySelector('.wp-block-kadence-header-desktop');

		if (parseInt(kadenceHeaderConfig.breakPoints.desktop) < window.innerWidth) {
			this.activeSize = 'desktop';
			if (this.sticky) {
				this.activeOffsetTop = this.getOffset(this.root).top;
			}
		} else if (parseInt(kadenceHeaderConfig.breakPoints.tablet) < window.innerWidth) {
			this.activeSize = 'tablet';
			if (this.stickyTablet) {
				this.activeOffsetTop = this.getOffset(this.root).top;
			}
		} else if (this.stickyMobile) {
			this.activeOffsetTop = this.getOffset(this.root).top;
		}
		window.addEventListener('resize', this.updateSticky.bind(this), false);
		window.addEventListener('scroll', this.updateSticky.bind(this), false);
		window.addEventListener('load', this.updateSticky.bind(this), false);
		window.addEventListener('orientationchange', this.updateSticky.bind(this));
		if (document.readyState === 'complete') {
			this.updateSticky('updateActive');
		}
		if (
			document.body.classList.contains('woocommerce-demo-store') &&
			document.body.classList.contains('kadence-store-notice-placement-above')
		) {
			this.respondToVisibility(document.querySelector('.woocommerce-store-notice'), (visible) => {
				this.updateSticky('updateActive').bind(this);
			});
		}
	}

	respondToVisibility(element, callback) {
		var options = {
			root: document.documentElement,
		};

		var observer = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				callback(entry.intersectionRatio > 0);
			});
		}, options);

		observer.observe(element);
	}

	updateSticky(e) {
		const self = this;
		if (!this.activeHeader) {
			return;
		}

		//TODO change wrapper to something that also applies to fse themes
		const wrapper = document.getElementById('wrapper');
		var offsetTop = this.getOffset(wrapper).top;
		this.anchorOffset = this.getOffset(this.root).top;
		var currScrollTop = window.scrollY;

		// Set current active screen size
		if (parseInt(kadenceHeaderConfig.breakPoints.desktop) < window.innerWidth) {
			this.activeSize = 'desktop';
		} else if (parseInt(kadenceHeaderConfig.breakPoints.tablet) < window.innerWidth) {
			this.activeSize = 'tablet';
		} else {
			this.activeSize = 'mobile';
		}
		this.activeOffsetTop = this.getOffset(this.activeHeader).top;

		//don't do sticky stuff if the current screen size is not set to style sticky
		if (
			!(
				(this.activeSize === 'desktop' && this.sticky) ||
				(this.activeSize === 'tablet' && this.stickyTablet) ||
				(this.activeSize === 'mobile' && this.stickyMobile)
			)
		) {
			//reset all state classes and end
			this.activeHeader.classList.remove('item-is-fixed');
			this.activeHeader.classList.remove('item-at-start');
			this.activeHeader.classList.remove('item-is-stuck');
			this.activeHeader.style.height = null;
			this.activeHeader.style.top = null;
			this.activeHeader.style.position = 'initial';
			parent.classList.remove('child-is-fixed');
			document.body.classList.remove('header-is-fixed');
			return;
		}

		//set current active header for current size
		if (this.activeSize === 'desktop') {
			this.activeHeader = this.root.querySelector('.wp-block-kadence-header-desktop');
		} else {
			this.activeHeader = this.root.querySelector('.wp-block-kadence-header-tablet');
		}
		if (e && e === 'updateActive') {
			this.activeHeader.style.top = 'auto';
		}

		//set the container anchor height to create a sized placeholder for the header (but only if we're not also transparent)
		var elHeight = this.activeHeader.offsetHeight;
		const activeSizeCased =
			this.activeSize === 'desktop' ? '' : this.activeSize.charAt(0).toUpperCase() + this.activeSize.slice(1);
		if (!this['transparent' + activeSizeCased]) {
			this.root.style.height = elHeight + 'px';
		}

		// Adjust offsetTop depending on certain top of page elements
		if (document.body.classList.toString().includes('boom_bar-static-top')) {
			var boomBar = document.querySelector('.boom_bar');
			offsetTop = this.getOffset(wrapper).top - boomBar.offsetHeight;
		}

		var proElements = document.querySelectorAll('.kadence-before-wrapper-item');
		if (proElements.length) {
			var proElementOffset = 0;
			for (let i = 0; i < proElements.length; i++) {
				proElementOffset = proElementOffset + proElements[i].offsetHeight;
			}
			offsetTop = this.getOffset(wrapper).top - proElementOffset;
		}

		var proSticky = document.querySelectorAll('.kadence-pro-fixed-above');
		if (proSticky.length) {
			var proOffset = 0;
			for (let i = 0; i < proSticky.length; i++) {
				proOffset = proOffset + proSticky[i].offsetHeight;
			}
			offsetTop = this.getOffset(wrapper).top + proOffset;
		}

		// set initial shrink starting height
		var parent = this.activeHeader.parentNode;
		if (!this.shrinkStartHeight || (e && undefined !== e.type && 'orientationchange' === e.type)) {
			this.shrinkStartHeight = this.activeHeader.offsetHeight;
		}

		// Run the shrinking / unshrinking processing
		if (this.shrinkMain) {
			var shrinkHeight =
				this.activeSize === 'mobile'
					? this.shrinkMainHeightMobile
					: this.activeSize === 'tablet'
					? this.shrinkMainHeightTablet
					: this.shrinkMainHeight;
			if (shrinkHeight) {
				// Set totalOffsetDelay
				var totalOffsetDelay = Math.floor(this.activeOffsetTop - offsetTop);
				if (this.revealScrollUp) {
					if (window.scrollY > this.lastScrollTop) {
						var totalOffsetDelay = Math.floor(
							Math.floor(this.activeOffsetTop) - Math.floor(offsetTop) + Math.floor(shrinkHeight)
						);
					} else {
						var totalOffsetDelay = Math.floor(this.activeOffsetTop - offsetTop);
					}
				}
				var shrinkLogos = this.activeHeader.querySelectorAll('.custom-logo');
				var shrinkHeader = this.activeHeader.querySelector('.wp-block-kadence-header-row-center');

				//set shrink starting height
				if (!this.shrinkStartHeight) {
					this.shrinkStartHeight = shrinkHeader.offsetHeight;
				}

				// either shrink or unshrink the header based on scroll position
				if (window.scrollY <= totalOffsetDelay) {
					//Unshrink
					shrinkHeader.style.height = this.shrinkStartHeight + 'px';
					shrinkHeader.style.minHeight = this.shrinkStartHeight + 'px';
					shrinkHeader.style.maxHeight = this.shrinkStartHeight + 'px';
					//also unshrink the logo
					if (shrinkLogos) {
						for (let i = 0; i < shrinkLogos.length; i++) {
							const shrinkLogo = shrinkLogos[i];
							shrinkLogo.style.maxHeight = '100%';
						}
					}
				} else if (window.scrollY > totalOffsetDelay) {
					//Shrink
					var shrinkingHeight = Math.max(
						shrinkHeight,
						this.shrinkStartHeight - (window.scrollY - (this.activeOffsetTop - offsetTop))
					);
					shrinkHeader.style.height = shrinkingHeight + 'px';
					shrinkHeader.style.minHeight = shrinkingHeight + 'px';
					shrinkHeader.style.maxHeight = shrinkingHeight + 'px';
					//also shrink the logo
					if (shrinkLogos) {
						for (let i = 0; i < shrinkLogos.length; i++) {
							const shrinkLogo = shrinkLogos[i];
							shrinkLogo.style.maxHeight = shrinkingHeight + 'px';
						}
					}
				}
			}
		}

		//set the position to absolute
		this.activeHeader.style.position = 'absolute';

		// Run the revealing / hidding processing or the sticky process
		if (this.revealScrollUp) {
			// Run the revealing / hidding processing
			var isScrollingDown = currScrollTop > this.lastScrollTop;
			var totalOffset = Math.floor(this.anchorOffset + elHeight);
			if (currScrollTop <= this.anchorOffset - offsetTop) {
				//above the header, ignore the header
				this.activeHeader.style.top = 0;
				this.currentTopPosition = 0;
				this.setStickyChanged(false);
			} else if (currScrollTop <= totalOffset) {
				//scrolling in the header area, ignore the header if scrolling down, keep sticking if scrolling up
				if (isScrollingDown) {
					this.activeHeader.style.top = 0;
					this.currentTopPosition = 0;
					this.setStickyChanged(false);
				} else {
					this.activeHeader.classList.remove('item-hidden-above');
					var topPos = currScrollTop - this.anchorOffset + offsetTop;
					this.activeHeader.style.top = topPos + 'px';
					this.currentTopPosition = topPos;
					this.setStickyChanged(true);
				}
			} else if (isScrollingDown) {
				//below the header and scrolling down, keep the header top just above the screen
				this.activeHeader.classList.add('item-hidden-above');
				var topPos = currScrollTop - this.anchorOffset + offsetTop - elHeight;
				this.activeHeader.style.top = topPos + 'px';
				this.currentTopPosition = topPos;
				this.setStickyChanged(true);
			} else {
				//below the header and scrolling up, keep the header top at scroll position
				this.activeHeader.classList.remove('item-hidden-above');
				var topPos = currScrollTop - this.anchorOffset + offsetTop;
				this.activeHeader.style.top = topPos + 'px';
				this.currentTopPosition = topPos;
				this.setStickyChanged(true);
			}
			this.activeHeader.style.top = topPos + 'px';
		} else {
			// Run the sticking process
			var totalOffset = Math.floor(this.anchorOffset - offsetTop);
			if (currScrollTop <= totalOffset) {
				//above the header anchor, ignore
				this.activeHeader.style.top = 0;
				this.currentTopPosition = 0;
				this.setStickyChanged(false);
			} else {
				//below the header anchor, match it's top to the scroll position
				var topPos = currScrollTop - this.anchorOffset + offsetTop;
				this.activeHeader.style.top = topPos + 'px';
				this.currentTopPosition = topPos;
				this.setStickyChanged(true);
			}
		}
		this.lastScrollTop = currScrollTop;

		// Set state classes on the header based on scroll position
		// TODO not sure if this is neccessary as a seperate block of logic, may be better integrated into the stickychanged function
		if (window.scrollY == totalOffset) {
			//this.activeHeader.style.top = offsetTop + 'px';
			this.activeHeader.classList.add('item-is-fixed');
			this.activeHeader.classList.add('item-at-start');
			this.activeHeader.classList.remove('item-is-stuck');
			parent.classList.add('child-is-fixed');
			document.body.classList.add('header-is-fixed');
		} else if (window.scrollY > totalOffset) {
			if (this.revealScrollUp) {
				if (window.scrollY < elHeight + 60 && this.activeHeader.classList.contains('item-at-start')) {
					this.activeHeader.style.height = null;
					//this.activeHeader.style.top = offsetTop + 'px';
					this.activeHeader.classList.add('item-is-fixed');
					this.activeHeader.classList.add('item-is-stuck');
					parent.classList.add('child-is-fixed');
					document.body.classList.add('header-is-fixed');
				} else {
					//this.activeHeader.style.top = offsetTop + 'px';
					this.activeHeader.classList.add('item-is-fixed');
					this.activeHeader.classList.add('item-is-stuck');
					this.activeHeader.classList.remove('item-at-start');
					parent.classList.add('child-is-fixed');
					document.body.classList.add('header-is-fixed');
				}
			} else {
				//this.activeHeader.style.top = offsetTop + 'px';
				this.activeHeader.classList.add('item-is-fixed');
				this.activeHeader.classList.remove('item-at-start');
				this.activeHeader.classList.add('item-is-stuck');
				parent.classList.add('child-is-fixed');
				document.body.classList.add('header-is-fixed');
			}
		} else if (this.activeHeader.classList.contains('item-is-fixed')) {
			this.activeHeader.classList.remove('item-is-fixed');
			this.activeHeader.classList.remove('item-at-start');
			this.activeHeader.classList.remove('item-is-stuck');
			this.activeHeader.style.height = null;
			//this.activeHeader.style.top = null;
			parent.classList.remove('child-is-fixed');
			document.body.classList.remove('header-is-fixed');
		}
	}

	setStickyChanged(isSticking) {
		if (this.isSticking != isSticking) {
			this.isSticking = isSticking;

			var event = new Event('KADENCE_HEADER_STICKY_CHANGED', {
				bubbles: true,
			});
			event.isSticking = this.isSticking;

			this.root.dispatchEvent(event);
		}
	}

	setTransparentChanged(isTransparent) {
		if (this.isTransparent != isTransparent) {
			this.isTransparent = isTransparent;

			var event = new Event('KADENCE_HEADER_STICKY_CHANGED', {
				bubbles: true,
			});
			event.isTransparent = this.isTransparent;

			this.root.dispatchEvent(event);
		}
	}

	/**
	 * Get element's offset.
	 */
	getOffset(el) {
		if (el instanceof HTMLElement) {
			var rect = el.getBoundingClientRect();

			return {
				top: rect.top + window.pageYOffset,
				left: rect.left + window.pageXOffset,
			};
		}

		return {
			top: null,
			left: null,
		};
	}

	/**
	 * Returns options.
	 *
	 * @return {string} An object with the latest options.
	 */
	get state() {
		return this._state;
	}

	/**
	 * Merges options to the current options and emits `updated` event.
	 *
	 * @param options - An object with new options.
	 */
	set state(val) {
		this._state = val;

		var event = new Event('STATE');
		event.val = val;
		event.qlID = this.rootID;

		this.root.dispatchEvent(event);
	}
}
window.KBHeader = KBHeader;

const initKBHeader = () => {
	// Testing var, can remove
	window.KBHeaderBlocks = [];

	var headerBlocks = document.querySelectorAll('.wp-block-kadence-header');

	for (let i = 0; i < headerBlocks.length; i++) {
		var headerBlock = headerBlocks[i];
		const kbHeaderBlock = new KBHeader(headerBlock);
		window.KBHeaderBlocks.push(kbHeaderBlock);
	}
};

if ('loading' === document.readyState) {
	// The DOM has not yet been loaded.
	document.addEventListener('DOMContentLoaded', initKBHeader);
} else {
	// The DOM has already been loaded.
	initKBHeader();
}
