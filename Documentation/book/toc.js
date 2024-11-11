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
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="index.html"><strong aria-hidden="true">1.</strong> What is this?</a></li><li class="chapter-item expanded "><a href="What_is_Chess.html"><strong aria-hidden="true">2.</strong> What is Chess?</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="Movement_of_Pieces.html"><strong aria-hidden="true">2.1.</strong> How do the pieces move?</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">Methods</li><li class="chapter-item expanded "><a href="Board_Representation.html"><strong aria-hidden="true">3.</strong> Board Representation</a></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">3.1.</strong> Bitboard Representation</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.</strong> Overview of Methods Used</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">4.1.</strong> Lookup Tables</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.2.</strong> Hashing Algorithms</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.3.</strong> Calculating on the fly</div></li></ol></li><li class="chapter-item expanded "><li class="part-title">Layout</li><li class="chapter-item expanded "><div><strong aria-hidden="true">5.</strong> Square struct</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">6.</strong> Move struct</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">7.</strong> MoveType enum</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">8.</strong> PieceSet struct</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">9.</strong> Board struct</div></li><li class="chapter-item expanded affix "><li class="part-title">Move Generation</li><li class="chapter-item expanded "><div><strong aria-hidden="true">10.</strong> Knight Moves</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">11.</strong> (Basic) King Moves</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">12.</strong> (Basic) Pawn Moves</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">13.</strong> Sliding Piece Moves</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">13.1.</strong> Magic Bitboards</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">13.2.</strong> Bishop Moves</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">13.3.</strong> Rook Moves</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">13.4.</strong> Queen Moves</div></li></ol></li><li class="chapter-item expanded "><li class="part-title">Additional Behaviours</li><li class="chapter-item expanded "><div><strong aria-hidden="true">14.</strong> For the King</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">14.1.</strong> Castling</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">14.2.</strong> Checks</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">14.3.</strong> Pinned Pieces</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">15.</strong> For the Pawns</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">15.1.</strong> Promotions</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">15.2.</strong> En-Passant</div></li></ol></li><li class="chapter-item expanded "><li class="part-title">Outside the Pieces</li><li class="chapter-item expanded "><div><strong aria-hidden="true">16.</strong> Half-move Clock</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">17.</strong> Checkmates</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">18.</strong> Draw Rules</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">18.1.</strong> Fifty-move Rule</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">18.2.</strong> Insufficient Material</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">18.3.</strong> Three-fold Repetition</div></li></ol></li><li class="chapter-item expanded "><li class="part-title">Zobrist Hashing</li><li class="chapter-item expanded "><div><strong aria-hidden="true">19.</strong> Storing Chess Boards</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">19.1.</strong> Explanation of Zobrist Hashing</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">19.2.</strong> Implementation of Zobrist Hashing</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">19.3.</strong> Linking to Three-fold Repetition</div></li></ol></li><li class="chapter-item expanded "><li class="part-title">Perft Testing</li><li class="chapter-item expanded "><div><strong aria-hidden="true">20.</strong> What is Perft?</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">21.</strong> Implementing Perft</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">22.</strong> Comparing Perft Results</div></li><li class="chapter-item expanded affix "><li class="part-title">Going Further</li><li class="chapter-item expanded "><div><strong aria-hidden="true">23.</strong> Chess960 Support</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">23.1.</strong> How Castling Works</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">23.2.</strong> Implementing Castling</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">23.3.</strong> Adding FEN Support</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">24.</strong> PGN Support</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">25.</strong> Conclusion</div></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded "><a href="Contributors.html"><strong aria-hidden="true">26.</strong> Contributors</a></li></ol>';
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
