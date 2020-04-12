chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request == "Action") {
        showCutIn();
		executeZaiaPercent();
	}
});

// execute zaia percent
function executeZaiaPercent() {
    console.log('-------- Execute ZAIA percent --------');

    const percentPattern = /(-|−|マイナス|minus)?\s*([0-9,.０１２３４５６７８９．，]+)(\s*)(%|％|percent|パーセント|ﾊﾟｰｾﾝﾄ|㌫)/ig;
    const zaiaPercentText = '1000$3$4';

    $("*").contents().filter(function() {
        // filter only text node
        return this.nodeType === 3;
    }).each(function(){
        var nodeText = $(this).text();

        // check if the node contains percent patterns
        // note: avoid jQuery folter for this since it filters some nodes containing percent values
        var containsPercent = percentPattern.test(nodeText);
        if(containsPercent) {
            // replace percent values with 1000%
            var zaiaNodeText = nodeText.replace(percentPattern, zaiaPercentText);
            // console.log('Original text: ' + nodeText);
            // console.log('Replaced text: ' + zaiaNodeText);
            // replace the node. note: $().text(string) doesn't work
            $(this).replaceWith(document.createTextNode(zaiaNodeText));
        }
    });
}

// show cut-in
function showCutIn() {
    console.log('-------- Show cut in --------');

    // Modal HTML
    var modalHtml = `
        <div>
            <div class="JBOverlay">
                <p class="JBText01">JACKING</p>
                <p class="JBText02">BREAK</p>
                <p class="JBCopyright">&copy; ZAIA エンタープライズ</p>
            </div>
        </div>
    `;
    // add the modal HTML to DOM
    var modalElement = $(modalHtml).appendTo('body');

    // show the modal html, then wait a sec, then close it
    $(".JBOverlay").delay(200).fadeIn(600).delay(2000).fadeOut(400);
}

// execute once the page is loaded
window.onload = function () {
    // onload
};

