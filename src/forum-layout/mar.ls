require! <[lib/lang lib/fetch-siblings ../forum-options ../tbody-regular]>
{node} = require 'lib/dom'

all-read = false

module.exports = button-mar = node 'a' innerHTML: 'MAR' title: lang.mar, onclick: !->
	return if all-read
	!:=all-read

	for row in tbody-regular.children
		continue if row.classList.contains 'read'

		topic-id = row.id.slice 'postRow'length
		siblings = fetch-siblings row.children.0, slice: 5

		localStorage~setItem
			.. "topic_#topic-id"    (siblings.last-post.children.0.href / '#')1
			.. "topic_lp_#topic-id" siblings.author.innerHTML.trim!

		row.classList.add 'read'

	forum-options.removeChild button-mar

button-mar
	..style.cursor = 'pointer'

	forum-options.appendChild ..