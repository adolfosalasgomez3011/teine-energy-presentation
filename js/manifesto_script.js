
document.addEventListener('DOMContentLoaded', function() {
    const manifestoImage = document.getElementById('manifesto-image');
    const highlightBox = document.getElementById('highlight-box');
    const toggleBtn = document.getElementById('toggle-highlight');
    const resetBtn = document.getElementById('reset-highlight');
    const resizeHandle = highlightBox?.querySelector('.resize-handle');
    const manifestoContainer = document.querySelector('.manifesto-container');

    if (manifestoImage && highlightBox && manifestoContainer) {
        let isDragging = false;
        let isResizing = false;
        let startX, startY, startLeft, startTop, startWidth, startHeight;

        // Toggle highlight box visibility
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function() {
                const isHidden = highlightBox.style.display === 'none' || highlightBox.style.display === '';
                highlightBox.style.display = isHidden ? 'block' : 'none';
                toggleBtn.textContent = isHidden ? 'Hide Highlight' : 'Show Highlight Box';
            });
        }

        // Reset highlight box position and size
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                highlightBox.style.top = '50px';
                highlightBox.style.left = '50px';
                highlightBox.style.width = '150px';
                highlightBox.style.height = '100px';
            });
        }

        // Dragging functionality
        highlightBox.addEventListener('mousedown', function(e) {
            if (e.target !== resizeHandle) {
                isDragging = true;
                startX = e.clientX - highlightBox.offsetLeft;
                startY = e.clientY - highlightBox.offsetTop;
                highlightBox.style.cursor = 'grabbing';
            }
        });

        // Resizing functionality
        if (resizeHandle) {
            resizeHandle.addEventListener('mousedown', function(e) {
                isResizing = true;
                startWidth = highlightBox.offsetWidth;
                startHeight = highlightBox.offsetHeight;
                startX = e.clientX;
                startY = e.clientY;
                e.stopPropagation(); // Prevent dragging the whole box
            });
        }

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                const x = e.clientX - startX;
                const y = e.clientY - startY;
                highlightBox.style.left = `${x}px`;
                highlightBox.style.top = `${y}px`;
            }
            if (isResizing) {
                const width = startWidth + (e.clientX - startX);
                const height = startHeight + (e.clientY - startY);
                highlightBox.style.width = `${width > 50 ? width : 50}px`;
                highlightBox.style.height = `${height > 50 ? height : 50}px`;
            }
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
            isResizing = false;
            highlightBox.style.cursor = 'move';
        });
    }
});
