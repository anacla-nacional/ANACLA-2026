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
        // Verificar status do site ANTES de qualquer coisa
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        if (currentPage !== 'offline.html' && window.sheets && window.sheets.buscarStatus) {
            window.sheets.buscarStatus().then(function (status) {
                if (status === 'offline') {
                    window.location.href = 'offline.html';
                    return;
                }
            }).catch(function () {
                // Fail-open: se erro ao ler status, permite acesso
            });
        }

        // Menu mobile (alt-header)
        var menuButton = document.querySelector('.alt-menu-button');
        var mobileMenu = document.getElementById('altMobileMenu');
        if (menuButton && mobileMenu) {
            menuButton.addEventListener('click', function () {
                var open = mobileMenu.classList.toggle('open');
                menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
            });
        }

        // Botão topo
        var btnTopo = document.createElement('button');
        btnTopo.className = 'btn-topo';
        btnTopo.innerHTML = '<i class="fas fa-chevron-up"></i>';
        btnTopo.setAttribute('aria-label', 'Voltar ao topo');
        btnTopo.onclick = function () { window.scrollTo({ top: 0, behavior: 'smooth' }); };
        document.body.appendChild(btnTopo);

        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) btnTopo.classList.add('visible');
            else btnTopo.classList.remove('visible');
        });

        // Fechar menu mobile ao clicar fora
        document.addEventListener('click', function (event) {
            var menu = document.getElementById('altMobileMenu');
            var button = document.querySelector('.alt-menu-button');
            if (menu && menu.classList.contains('open') && !menu.contains(event.target) && !button?.contains(event.target)) {
                menu.classList.remove('open');
            }
        });
    });
})();
