/**
 * fetches nextElementSibling
 */
module.exports = function fetch-siblings(elem, {slice = 0, index-by = 'className'})
	{[elem[index-by]slice slice; elem] while elem?.=nextElementSibling}