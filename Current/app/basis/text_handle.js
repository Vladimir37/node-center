function handling(text) {
    text = text.replace(/</g, '&lt;');
    text = text.replace(/\[b\]([\s\S].[\s\S]+?)\[\\b\]/gm, '<b>$1</b>');
    text = text.replace(/\[h\](.+?)\[\\h\]/g, '<h3>$1</h3>');
    text = text.replace(/\[a\](.+?)\[\\a]/g, '<a href="$1">$1</a>');
    text = text.replace(/\[c\]([\s\S].[\s\S]+?)\[\\c\]/g, '<article class="code">$1</article>');
    return text;
}

module.exports = handling;