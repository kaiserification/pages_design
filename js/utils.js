$('.prevent-click').click(function(event) {
    event.preventDefault();
});

var makeHighResScreenshot = function(srcEl, destIMG, dpi) {
    var scaleFactor = Math.floor(dpi / 96);
    // Save original size of element
    var originalWidth = srcEl.offsetWidth;
    var originalHeight = srcEl.offsetHeight;
    // Save original document size
    var originalBodyWidth = document.body.offsetWidth;
    var originalBodyHeight = document.body.offsetHeight;

    // Add style: transform: scale() to srcEl
    srcEl.style.transform = "scale(" + scaleFactor + ", " + scaleFactor + ")";
    srcEl.style.transformOrigin = "left top";

    // create wrapper for srcEl to add hardcoded height/width
    var srcElWrapper = document.createElement('div');
    srcElWrapper.id = srcEl.id + '-wrapper';
    srcElWrapper.style.height = originalHeight*scaleFactor + 'px';
    srcElWrapper.style.width = originalWidth*scaleFactor + 'px';
    // insert wrapper before srcEl in the DOM tree
    srcEl.parentNode.insertBefore(srcElWrapper, srcEl);
    // move srcEl into wrapper
    srcElWrapper.appendChild(srcEl);

    // Temporarily remove height/width constraints as necessary
    document.body.style.width = originalBodyWidth*scaleFactor +"px";
    document.body.style.height = originalBodyHeight*scaleFactor +"px";

    window.scrollTo(0, 0); // html2canvas breaks when we're not at the top of the doc, see html2canvas#820
    html2canvas(srcElWrapper, {
        onrendered: function(canvas) {
            destIMG.src = canvas.toDataURL("image/png");
            srcElWrapper.style.display = "none";
            // Reset height/width constraints
            document.body.style.width = originalBodyWidth + "px";
            document.body.style.height = originalBodyHeight + "px";
        }
    });
};