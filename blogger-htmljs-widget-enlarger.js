// ==UserScript==
// @name         Blogger HTML/JavaScript Gadget Editor Widener
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Makes the HTML/JavaScript gadget editing dialog wider in Blogger
// @author       You
// @match        https://www.blogger.com/*
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // Define selectors for readability
    const dialogOverlay = '.MCcOAc.IqBfM.ecJEib.EWZcud.d8Etdd.cjGgHb.LcUz9d';
    const dialogContainer = '.g3VIld.O2kaM.Up8vH.J9Nfi.iWO5td[role="dialog"]';
    const dialogContentArea = '.R6Lfte.tOrNgd.qRUolc';
    const textareaField = '.KHxj8b.tL9Q4c';
    const contentWrapper = '.PbnGhe.oJeWuf.fb0g6';
    const formContainer = '.rFrNMe.FdysZd.zKHdkd.sdJrJc.Tyc9J.CDELXb';
    const inputWrappers = ['.aCsJod.oJeWuf', '.RpC4Ne.oJeWuf', '.aXBtI.Wic03c', '.Pc9Gce.Wic03c'];
    const buttonContainers = ['.OllbWe', '.XfpsVe.J9fJmf'];

    // Add a unique class to identify HTML/JavaScript dialogs
    const htmlJsDialogClass = 'blogger-html-js-dialog';
    
    // Function to check and mark HTML/JavaScript dialogs
    function checkAndMarkDialog(dialog) {
        // Check if this dialog contains the textarea field
        if (dialog.querySelector(textareaField) && !dialog.classList.contains(htmlJsDialogClass)) {
            dialog.classList.add(htmlJsDialogClass);
            const overlay = dialog.closest(dialogOverlay);
            if (overlay) {
                overlay.classList.add(htmlJsDialogClass);
            }
        }
    }
    
    // Function to check all dialogs
    function checkAllDialogs() {
        const dialogs = document.querySelectorAll(dialogContainer);
        dialogs.forEach(checkAndMarkDialog);
    }
    
    // Watch for dialogs being added to the DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    // Check if the added node is a dialog overlay
                    if (node.matches && node.matches(dialogOverlay)) {
                        setTimeout(() => {
                            const dialog = node.querySelector(dialogContainer);
                            if (dialog) {
                                checkAndMarkDialog(dialog);
                            }
                        }, 50);
                        // Check again after longer delay in case content loads slowly
                        setTimeout(() => {
                            const dialog = node.querySelector(dialogContainer);
                            if (dialog) {
                                checkAndMarkDialog(dialog);
                            }
                        }, 500);
                    }
                    // Check if the added node is a dialog
                    if (node.matches && node.matches(dialogContainer)) {
                        setTimeout(() => checkAndMarkDialog(node), 50);
                        setTimeout(() => checkAndMarkDialog(node), 500);
                    }
                    // Check if the added node is a textarea (content loaded into existing dialog)
                    if (node.matches && node.matches(textareaField)) {
                        const dialog = node.closest(dialogContainer);
                        if (dialog) {
                            checkAndMarkDialog(dialog);
                        }
                    }
                    // Check if the added node contains a dialog
                    if (node.querySelectorAll) {
                        const dialogs = node.querySelectorAll(dialogContainer);
                        if (dialogs.length > 0) {
                            setTimeout(() => dialogs.forEach(checkAndMarkDialog), 50);
                            setTimeout(() => dialogs.forEach(checkAndMarkDialog), 500);
                        }
                        // Check if the added node contains a textarea
                        const textareas = node.querySelectorAll(textareaField);
                        if (textareas.length > 0) {
                            textareas.forEach(textarea => {
                                const dialog = textarea.closest(dialogContainer);
                                if (dialog) {
                                    checkAndMarkDialog(dialog);
                                }
                            });
                        }
                    }
                }
            });
        });
    });
    
    // Listen for clicks anywhere on the page - when user clicks to open gadget
    document.addEventListener('click', () => {
        // Check for dialogs after a short delay to let them render
        setTimeout(checkAllDialogs, 100);
        setTimeout(checkAllDialogs, 300);
        setTimeout(checkAllDialogs, 500);
        setTimeout(checkAllDialogs, 1000);
    }, true);
    
    // Also listen on window for bubbled clicks
    window.addEventListener('click', () => {
        setTimeout(checkAllDialogs, 100);
        setTimeout(checkAllDialogs, 300);
        setTimeout(checkAllDialogs, 500);
    }, true);
    
    // Listen for mouseup events too (in case dialog opens on mouseup)
    document.addEventListener('mouseup', () => {
        setTimeout(checkAllDialogs, 100);
        setTimeout(checkAllDialogs, 300);
    }, true);
    
    // Start observing the entire document
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    } else {
        // If body doesn't exist yet, wait for it
        document.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }
    
    // Initial check and periodic checking
    checkAllDialogs();
    setTimeout(checkAllDialogs, 500);
    setTimeout(checkAllDialogs, 1000);
    setTimeout(checkAllDialogs, 2000);
    setTimeout(checkAllDialogs, 5000);
    setTimeout(checkAllDialogs, 10000);
    
    // Keep checking for a longer time in case of slow page loads
    let longCheckCount = 0;
    const longIntervalCheck = setInterval(() => {
        checkAllDialogs();
        longCheckCount++;
        if (longCheckCount >= 6) { // 6 times over 30 seconds
            clearInterval(longIntervalCheck);
        }
    }, 5000);
    
    GM_addStyle(`
        /* Only target dialogs marked with our custom class */
        /* Make the outer dialog overlay 80% of viewport width and height */
        ${dialogOverlay}.${htmlJsDialogClass} {
            width: 80vw !important;
            height: 80vh !important;
            max-width: 80vw !important;
            max-height: 80vh !important;
        }

        /* Make the dialog container 80% of viewport width and height */
        ${dialogContainer}.${htmlJsDialogClass} {
            max-width: 80vw !important;
            width: 80vw !important;
            max-height: 80vh !important;
            height: 80vh !important;
        }

        /* Make the content area fill available space without forcing 100% */
        ${dialogContainer}.${htmlJsDialogClass} ${dialogContentArea} {
            max-width: 100% !important;
            max-height: 100% !important;
        }

        /* Make textarea expand to fill available space */
        ${dialogContainer}.${htmlJsDialogClass} ${textareaField} {
            min-height: 50vh !important;
            max-width: 100% !important;
        }

        /* Ensure the content wrapper can expand */
        ${dialogContainer}.${htmlJsDialogClass} ${contentWrapper} {
            max-width: 100% !important;
        }

        /* Make the form container able to expand */
        ${dialogContainer}.${htmlJsDialogClass} ${formContainer} {
            max-width: 100% !important;
        }

        /* Allow input wrapper elements to expand */
        ${dialogContainer}.${htmlJsDialogClass} ${inputWrappers.join(`,\n        ${dialogContainer}.${htmlJsDialogClass} `)} {
            max-width: 100% !important;
        }

        /* Keep button containers at their default width (don't expand) */
        ${dialogContainer}.${htmlJsDialogClass} ${buttonContainers.join(`,\n        ${dialogContainer}.${htmlJsDialogClass} `)} {
            width: auto !important;
        }
    `);
})();
