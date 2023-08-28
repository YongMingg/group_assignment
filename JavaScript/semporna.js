(() => {
    'use strict'

    // --------
    // Tooltips
    // --------
    // Instantiate all tooltips in a docs or StackBlitz
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
        .forEach(tooltip => {
            new bootstrap.Tooltip(tooltip)
        })

    // --------
    // Popovers
    // --------
    // Instantiate all popovers in docs or StackBlitz
    document.querySelectorAll('[data-bs-toggle="popover"]')
        .forEach(popover => {
            new bootstrap.Popover(popover)
        })

    // -------------------------------
    // Toasts
    // -------------------------------
    // Used by 'Placement' example in docs or StackBlitz
    const toastPlacement = document.getElementById('toastPlacement')
    if (toastPlacement) {
        document.getElementById('selectToastPlacement').addEventListener('change', function () {
            if (!toastPlacement.dataset.originalClass) {
                toastPlacement.dataset.originalClass = toastPlacement.className
            }

            toastPlacement.className = `${toastPlacement.dataset.originalClass} ${this.value}`
        })
    }

    // Instantiate all toasts in docs pages only
    document.querySelectorAll('.bd-example .toast')
        .forEach(toastNode => {
            const toast = new bootstrap.Toast(toastNode, {
                autohide: false
            })

            toast.show()
        })

    // Instantiate all toasts in docs pages only
    // js-docs-start live-toast
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')

    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
            toastBootstrap.show()
        })
    }
    // js-docs-end live-toast

    // -------------------------------
    // Alerts
    // -------------------------------
    // Used in 'Show live alert' example in docs or StackBlitz

    // js-docs-start live-alert
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }

    const alertTrigger = document.getElementById('liveAlertBtn')
    if (alertTrigger) {
        alertTrigger.addEventListener('click', () => {
            appendAlert('Nice, you triggered this alert message!', 'success')
        })
    }
    // js-docs-end live-alert

    // --------
    // Carousels
    // --------
    // Instantiate all non-autoplaying carousels in docs or StackBlitz
    document.querySelectorAll('.carousel:not([data-bs-ride="carousel"])')
        .forEach(carousel => {
            bootstrap.Carousel.getOrCreateInstance(carousel)
        })

    // -------------------------------
    // Checks & Radios
    // -------------------------------
    // Indeterminate checkbox example in docs and StackBlitz
    document.querySelectorAll('.bd-example-indeterminate [type="checkbox"]')
        .forEach(checkbox => {
            if (checkbox.id.includes('Indeterminate')) {
                checkbox.indeterminate = true
            }
        })

    // -------------------------------
    // Links
    // -------------------------------
    // Disable empty links in docs examples only
    document.querySelectorAll('.bd-content [href="#"]')
        .forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault()
            })
        })

    // -------------------------------
    // Modal
    // -------------------------------
    // Modal 'Varying modal content' example in docs and StackBlitz
    // js-docs-start varying-modal-content
    const exampleModal = document.getElementById('exampleModal')
    if (exampleModal) {
        exampleModal.addEventListener('show.bs.modal', event => {
            // Button that triggered the modal
            const button = event.relatedTarget
            // Extract info from data-bs-* attributes
            const recipient = button.getAttribute('data-bs-whatever')
            // If necessary, you could initiate an Ajax request here
            // and then do the updating in a callback.

            // Update the modal's content.
            const modalTitle = exampleModal.querySelector('.modal-title')
            const modalBodyInput = exampleModal.querySelector('.modal-body input')

            modalTitle.textContent = `New message to ${recipient}`
            modalBodyInput.value = recipient
        })
    }
    // js-docs-end varying-modal-content

    // -------------------------------
    // Offcanvas
    // -------------------------------
    // 'Offcanvas components' example in docs only
    const myOffcanvas = document.querySelectorAll('.bd-example-offcanvas .offcanvas')
    if (myOffcanvas) {
        myOffcanvas.forEach(offcanvas => {
            offcanvas.addEventListener('show.bs.offcanvas', event => {
                event.preventDefault()
            }, false)
        })
    }
})()

'use strict';

class TabsAutomatic {
    constructor(groupNode) {
        this.tablistNode = groupNode;

        this.tabs = [];

        this.firstTab = null;
        this.lastTab = null;

        this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
        this.tabpanels = [];

        for (var i = 0; i < this.tabs.length; i += 1) {
            var tab = this.tabs[i];
            var tabpanel = document.getElementById(tab.getAttribute('aria-controls'));

            tab.tabIndex = -1;
            tab.setAttribute('aria-selected', 'false');
            this.tabpanels.push(tabpanel);

            tab.addEventListener('keydown', this.onKeydown.bind(this));
            tab.addEventListener('click', this.onClick.bind(this));

            if (!this.firstTab) {
                this.firstTab = tab;
            }
            this.lastTab = tab;
        }

        this.setSelectedTab(this.firstTab, false);
    }

    setSelectedTab(currentTab, setFocus) {
        if (typeof setFocus !== 'boolean') {
            setFocus = true;
        }
        for (var i = 0; i < this.tabs.length; i += 1) {
            var tab = this.tabs[i];
            if (currentTab === tab) {
                tab.setAttribute('aria-selected', 'true');
                tab.removeAttribute('tabindex');
                this.tabpanels[i].classList.remove('is-hidden');
                if (setFocus) {
                    tab.focus();
                }
            } else {
                tab.setAttribute('aria-selected', 'false');
                tab.tabIndex = -1;
                this.tabpanels[i].classList.add('is-hidden');
            }
        }
    }

    setSelectedToPreviousTab(currentTab) {
        var index;

        if (currentTab === this.firstTab) {
            this.setSelectedTab(this.lastTab);
        } else {
            index = this.tabs.indexOf(currentTab);
            this.setSelectedTab(this.tabs[index - 1]);
        }
    }

    setSelectedToNextTab(currentTab) {
        var index;

        if (currentTab === this.lastTab) {
            this.setSelectedTab(this.firstTab);
        } else {
            index = this.tabs.indexOf(currentTab);
            this.setSelectedTab(this.tabs[index + 1]);
        }
    }

    /* EVENT HANDLERS */

    onKeydown(event) {
        var tgt = event.currentTarget,
            flag = false;

        switch (event.key) {
            case 'ArrowLeft':
                this.setSelectedToPreviousTab(tgt);
                flag = true;
                break;

            case 'ArrowRight':
                this.setSelectedToNextTab(tgt);
                flag = true;
                break;

            case 'Home':
                this.setSelectedTab(this.firstTab);
                flag = true;
                break;

            case 'End':
                this.setSelectedTab(this.lastTab);
                flag = true;
                break;

            default:
                break;
        }

        if (flag) {
            event.stopPropagation();
            event.preventDefault();
        }
    }

    onClick(event) {
        this.setSelectedTab(event.currentTarget);
    }
}

// Initialize tablist

window.addEventListener('load', function () {
    var tablists = document.querySelectorAll('[role=tablist].automatic');
    for (var i = 0; i < tablists.length; i++) {
        new TabsAutomatic(tablists[i]);
    }
});