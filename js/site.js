/* ANACLA — comportamento global do site */
(function () {
    'use strict';

    window.toggleMenu = function () {
        const menu = document.getElementById('menuMobile');
        if (!menu) return;
        menu.classList.toggle('active');
    };

    window.toggleDropdown = function (el) {
        if (!el || !el.parentElement) return;
        const dropdown = el.parentElement;
        const wasOpen = dropdown.classList.contains('open');
        const menuMobile = document.getElementById('menuMobile');
        if (menuMobile) {
            menuMobile.querySelectorAll('.dropdown.open').forEach(function (d) {
                d.classList.remove('open');
            });
        }
        if (!wasOpen) dropdown.classList.add('open');
    };

    document.addEventListener('DOMContentLoaded', function () {
        const current = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-links a[href]').forEach(function (link) {
            const href = link.getAttribute('href');
            if (href && href.split('?')[0] === current) link.setAttribute('aria-current', 'page');
        });

        document.addEventListener('click', function (event) {
            const menu = document.getElementById('menuMobile');
            const button = document.querySelector('.hamburger');
            if (menu && menu.classList.contains('active') && !menu.contains(event.target) && !button?.contains(event.target)) {
                menu.classList.remove('active');
            }
        });
    });
})();
