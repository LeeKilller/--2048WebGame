module.exports = function(source) {
    //console.log(source);

    // return eval("export default sourse");
    // return eval("`" + source + "`");

    return `module.exports = \' ${source.replace(/[\r\n]/g,"")}\'`
}