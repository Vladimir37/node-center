$(document).ready(function() {
    $('.accord_head').click(function() {
        $(this).next('.accord_body').slideToggle();
    });
    $('.code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
});