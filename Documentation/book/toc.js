// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="index.html"><strong aria-hidden="true">1.</strong> What is this?</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">2.</strong> What is Chess?</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">2.1.</strong> Basic Movements</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">2.2.</strong> Special Movements</div></li></ol></li><li class="chapter-item expanded "><li class="part-title">Methods</li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.</strong> Board Representation</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">3.1.</strong> Bitboard Representation</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.</strong> Overview of Methods Used</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">4.1.</strong> Lookup Tables</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.2.</strong> Hashing Algorithms</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.3.</strong> Calculating on the fly</div></li></ol></li><li class="chapter-item expanded "><li class="part-title">Utilities</li><li class="chapter-item expanded "><div><strong aria-hidden="true">5.</strong> Square struct</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">6.</strong> Move struct</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">7.</strong> MoveType enum</div></li><li class="chapter-item expanded affix "><li class="part-title">Move Generation</li><li class="chapter-item expanded "><div><strong aria-hidden="true">8.</strong> Knight Moves</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">9.</strong> (Basic) King Moves</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">10.</strong> Sliding Piece Moves</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">10.1.</strong> Magic Bitboards</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">10.2.</strong> Bishop Moves</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">10.3.</strong> Rook Moves</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">10.4.</strong> Queen Moves</div></li></ol></li><li class="chapter-item expanded "><li class="part-title">But wait... there&#39;s more?</li><li class="chapter-item expanded "><div><strong aria-hidden="true">11.</strong> Additional King Behaviour</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">11.1.</strong> Castling</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">11.2.</strong> Checks</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">11.3.</strong> Pinned Pieces</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">12.</strong> Additional Pawn Behaviour</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">12.1.</strong> Promotions</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">12.2.</strong> En-Passant</div></li></ol></li><li class="chapter-item expanded "><li class="part-title">A few more rules...</li><li class="chapter-item expanded "><div><strong aria-hidden="true">13.</strong> Fifty-move Rule</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">14.</strong> Insufficient Material</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">15.</strong> Three-fold Repetition</div></li><li class="chapter-item expanded affix "><li class="part-title">Zobrist Hashing</li><li class="chapter-item expanded "><div><strong aria-hidden="true">16.</strong> Storing Chess Boards</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">16.1.</strong> Explanation of Zobrist Hashing</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">16.2.</strong> Implementation of Zobrist Hashing</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">16.3.</strong> Linking to Three-fold Repetition</div></li></ol></li><li class="chapter-item expanded "><li class="spacer"></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
